import { Pool } from "pg";
import { Router } from "express";
const express = require('express');
const format = require('pg-format');
const { validateQueryAttribute, validateQuerySortOrder } = require('../validation');

module.exports = function(pool : Pool) {
    const router : Router = express.Router();
    const port = process.env.PORT;

    router.get("/", async (req, res) => {
        try {
            const sortAttribute  = validateQueryAttribute(req.query.sortBy, 'nome');
            const sortOrder      = validateQuerySortOrder(req.query.sortOrder);
            // const limitOption = Number.isInteger(parseInt(req.query.limit)) ? req.query.limit : '10';
            // const pageOption = Number.isInteger(parseInt(req.query.pagina)) ? req.query.pagina : '1';

            let limitOption = Number.parseInt(req.query.limit?.toString() ?? '');
            limitOption = isNaN(limitOption) ? 10 : limitOption;

            let pageOption = Number.parseInt(req.query.pagina?.toString() ?? '');
            pageOption = isNaN(pageOption) ? 1 : pageOption;

            const nomeJogo       = req.query.nome?.toString();
            const generoJogo     = req.query.genero?.toString();
            const plataformaJogo = req.query.plataforma?.toString();
            const devJogo        = req.query.desenvolvedora?.toString();
            const pubJogo        = req.query.publicadora?.toString();

            const arr = (nomeJogo) ? nomeJogo.replace(/\s+/g, ' ').trim().split(' ') : [];

            let whereQuery = '';

            const count = arr.length;
            if (count > 0 )  {
                whereQuery += 'WHERE ';
                for (let i = 0; i < count; ++i ) {
                    if( i > 0 ) { whereQuery += ' OR '; }
                    whereQuery += format(" UPPER(nome) LIKE UPPER(%L) ", '%' + arr[i] + '%');
                }
            }

            const generoQuery = (generoJogo)
                ? format(" INNER JOIN (SELECT jogo_id, genero_id FROM jogo_generos WHERE genero_id IN (%L)) AS jogo_gen ON jogo_gen.jogo_id=jogo.id ", generoJogo.split(',') )
                : '';

            const plataformaQuery = (plataformaJogo)
                    ? format( " INNER JOIN (SELECT jogo_id, plataforma_id FROM jogo_plataformas WHERE plataforma_id IN (%L)) AS jogo_plat ON jogo_plat.jogo_id=jogo.id ", plataformaJogo.split(',') )
                    : '';

            const pubQuery = (pubJogo)
                ? format(" INNER JOIN (SELECT jogo_id, publicadora_id FROM jogo_publicadoras WHERE publicadora_id IN (%L)) AS jogo_pub ON jogo_pub.jogo_id=jogo.id ", pubJogo.split(',') )
                : '';

            const devQuery = (devJogo)
                ? format(" INNER JOIN (SELECT jogo_id, desenvolvedora_id FROM jogo_desenvolvedoras WHERE desenvolvedora_id IN (%L)) AS jogo_dev ON jogo_dev.jogo_id=jogo.id ", devJogo.split(','))
                : '';


            const sqlQuery = `SELECT DISTINCT id, nome, imagem_capa_url, data_lancamento, descricao FROM jogo \
                ${generoQuery} \
                ${plataformaQuery} \
                ${pubQuery} \
                ${devQuery} \
                ${whereQuery }`;

            const contagemResult = await pool.query(`SELECT COUNT(*) AS contagem FROM (${sqlQuery}) AS q` );
            const contagem       = contagemResult.rows[0].contagem;
            const pageSize       = limitOption;
            const pageTotalCount = (pageSize > 0) ? Math.ceil(contagem / pageSize) : 1;
            const currentPage    = (pageOption > pageTotalCount) ? pageTotalCount : pageOption;
            const offset         = (currentPage > 1) ? pageSize * (currentPage-1) : 0;
            const result         = await pool.query(`${sqlQuery} ORDER BY ${sortAttribute} ${sortOrder} LIMIT $1 OFFSET $2`, [limitOption, offset]);

            let jogosArray = [];

            // TODO: tratamento de erros
            // for( let i = 0; i < result.rowCount; ++i ) {
            for (const row of result.rows) {
                const jogoId = row.id;
                const jogoNome = row.nome;
                const dataLancamento = row.data_lancamento;
                const descricao = row.descricao;
                const jogoCapaUrl = 'http://localhost:' + port + '/' + row.imagem_capa_url;
                const pubResult = await pool.query( `SELECT jogo_publicadoras.publicadora_id AS id, emp.emp_nome AS nome FROM jogo_publicadoras INNER JOIN jogo ON jogo.id=jogo_publicadoras.jogo_id INNER JOIN (SELECT empresa.id AS emp_id, empresa.nome as emp_nome FROM empresa) AS emp ON emp.emp_id=jogo_publicadoras.publicadora_id WHERE jogo_id=$1;` ,[jogoId]);
                const devResult = await pool.query(`SELECT jogo_desenvolvedoras.desenvolvedora_id AS id, emp.emp_nome AS nome FROM jogo_desenvolvedoras INNER JOIN jogo ON jogo.id=jogo_desenvolvedoras.jogo_id INNER JOIN (SELECT empresa.id AS emp_id, empresa.nome as emp_nome FROM empresa) AS emp ON emp.emp_id=jogo_desenvolvedoras.desenvolvedora_id WHERE jogo_id=$1;`, [jogoId]);
                const genResult = await pool.query(`SELECT genero_id AS id, gen.gen_nome AS nome FROM jogo INNER JOIN jogo_generos ON jogo_generos.jogo_id=jogo.id INNER JOIN (SELECT genero.nome AS gen_nome, genero.id AS gen_id FROM genero) AS gen ON gen.gen_id=jogo_generos.genero_id WHERE jogo_id=$1;`, [jogoId]);
                const plataformaResult = await pool.query(`SELECT jogo_plataformas.plataforma_id AS id, plat.plat_nome AS nome FROM jogo INNER JOIN jogo_plataformas ON jogo.id=jogo_plataformas.jogo_id INNER JOIN (SELECT plataforma.nome_popular AS plat_nome, plataforma.id AS plat_id FROM plataforma) AS plat ON plat.plat_id=jogo_plataformas.plataforma_id WHERE jogo_id=$1;`, [jogoId]);


                jogosArray.push({
                    'jogoId'         : jogoId,
                    'jogoNome'       : jogoNome,
                    'dataLancamento' : dataLancamento,
                    'descricao'      : descricao,
                    'jogoCapaUrl'    : jogoCapaUrl,
                    'publicadoras'   : pubResult.rows,
                    'desenvolvedoras': devResult.rows,
                    'generos'        : genResult.rows,
                    'plataformas'    : plataformaResult.rows,
                });
            }



            res.status(200)
            .set({
                'Content-Type' : 'application/json',
                'Total-Item-Count': contagem,
                'Total-Pages': pageTotalCount,
                'Page-Size': pageSize,
                'Page-Index' : currentPage,
            })
            .send(jogosArray);

        } catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    });






    router.get("/:jogoId", async (req, res) => {
        try {
            const id = req.params.jogoId;
            const result = await pool.query("SELECT id, nome, imagem_capa_url, data_lancamento, descricao FROM jogo WHERE jogo.id=$1", [id]);

            // function Jogo() {
            //     return {
            //         'jogoId': '',
            //         'jogoNome': '',
            //         'dataLancamento': '',
            //         'descricao': '',
            //         'jogoCapaUrl': '',
            //         'publicadoras': [],
            //         'desenvolvedoras': [],
            //         'generos': [],
            //         'plataformas': [],
            //         'imagens': [],
            //     };
            // };

            type Jogo = {
                jogoId : string | undefined;
                jogoNome : string;
                dataLancamento : string;
                descricao : string;
                jogoCapaUrl : string;
                publicadoras : any[];
                desenvolvedoras : any[];
                generos : any[];
                plataformas : any[];
                imagens : any[];
            };

            let jogo : Jogo = {
                jogoId : undefined,
                jogoNome : '',
                dataLancamento : '',
                descricao : '',
                jogoCapaUrl : '',
                publicadoras : [],
                desenvolvedoras : [],
                generos : [],
                plataformas : [],
                imagens : []
            };

            if (result.rowCount && result.rowCount > 0 )  {
                const jogoId           = result.rows[0].id;
                const jogoNome         = result.rows[0].nome;
                const dataLancamento   = result.rows[0].data_lancamento;
                const descricao = result.rows[0].descricao;
                const jogoCapaUrl      = 'http://localhost:' + port + '/' + result.rows[0].imagem_capa_url;
                const pubResult        = await pool.query(`SELECT jogo_publicadoras.publicadora_id AS id, emp.emp_nome AS nome FROM jogo_publicadoras INNER JOIN jogo ON jogo.id=jogo_publicadoras.jogo_id INNER JOIN (SELECT empresa.id AS emp_id, empresa.nome as emp_nome FROM empresa) AS emp ON emp.emp_id=jogo_publicadoras.publicadora_id WHERE jogo_id=$1;`, [jogoId]);
                const devResult        = await pool.query(`SELECT jogo_desenvolvedoras.desenvolvedora_id AS id, emp.emp_nome AS nome FROM jogo_desenvolvedoras INNER JOIN jogo ON jogo.id=jogo_desenvolvedoras.jogo_id INNER JOIN (SELECT empresa.id AS emp_id, empresa.nome as emp_nome FROM empresa) AS emp ON emp.emp_id=jogo_desenvolvedoras.desenvolvedora_id WHERE jogo_id=$1;`, [jogoId]);
                const genResult        = await pool.query(`SELECT genero_id AS id, gen.gen_nome AS nome FROM jogo INNER JOIN jogo_generos ON jogo_generos.jogo_id=jogo.id INNER JOIN (SELECT genero.nome AS gen_nome, genero.id AS gen_id FROM genero) AS gen ON gen.gen_id=jogo_generos.genero_id WHERE jogo_id=$1;`, [jogoId]);
                const plataformaResult = await pool.query(`SELECT jogo_plataformas.plataforma_id AS id, plat.plat_nome AS nome FROM jogo INNER JOIN jogo_plataformas ON jogo.id=jogo_plataformas.jogo_id INNER JOIN (SELECT plataforma.nome_popular AS plat_nome, plataforma.id AS plat_id FROM plataforma) AS plat ON plat.plat_id=jogo_plataformas.plataforma_id WHERE jogo_id=$1;`, [jogoId]);
                const imagensResult    = await pool.query(`SELECT jogo_imagens.imagem_url as url, jogo_imagens.legenda FROM jogo_imagens WHERE jogo_id=$1;`, [jogoId]);

                let imagens = [];
                // for (let i = 0; i < imagensResult.rowCount; ++i) {
                for (const imgRow of imagensResult.rows) {
                    imagens.push( {
                        'url': 'http://localhost:' + port + '/' + imgRow.url,
                        'legenda': imgRow.legenda
                    });
                }
                // console.log('imagens: ' + imagens);

                jogo.jogoId          = jogoId;
                jogo.jogoNome        = jogoNome;
                jogo.dataLancamento  = dataLancamento;
                jogo.descricao = descricao;
                jogo.jogoCapaUrl     = jogoCapaUrl;
                jogo.publicadoras    = pubResult.rows;
                jogo.desenvolvedoras = devResult.rows;
                jogo.generos         = genResult.rows;
                jogo.plataformas     = plataformaResult.rows;
                jogo.imagens         = imagens;
            }
            res.status(200).send( jogo );

        } catch(e) {
            console.error(e);
            res.status(500).send("Erro interno de servidor");
        }
    });

    return router;
};