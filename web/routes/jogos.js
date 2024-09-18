const express = require('express');
const format = require('pg-format');
const { validateQueryAttribute, validateQuerySortOrder } = require('../validation');

module.exports = function(pool) {
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            const sortAttribute = validateQueryAttribute(req.query.sortBy, 'nome');
            const sortOrder     = validateQuerySortOrder(req.query.sortOrder);
            const limitOption   = req.query.limit ?? 50;
            const offsetOption  = req.query.offset ?? 0;
            const nomeJogo = req.query.nome;

            const whereQuery = (nomeJogo)
                ? format("WHERE UPPER(nome) LIKE UPPER(%L)", '%' + nomeJogo + '%')
                : '';

            const result = await pool.query(`SELECT id, nome FROM jogo \
                ${whereQuery} \
                ORDER BY ${sortAttribute} ${sortOrder} LIMIT $1 OFFSET $2`, [limitOption, offsetOption]);

            let jogosArray = [];

            // TODO: tratamento de erros
            for( let i = 0; i < result.rowCount; ++i ) {
                const jogoId = result.rows[i].id;
                const jogoNome = result.rows[i].nome;
                const pubResult = await pool.query( `SELECT jogo_publicadoras.publicadora_id AS id, emp.emp_nome AS nome FROM jogo_publicadoras INNER JOIN jogo ON jogo.id=jogo_publicadoras.jogo_id INNER JOIN (SELECT empresa.id AS emp_id, empresa.nome as emp_nome FROM empresa) AS emp ON emp.emp_id=jogo_publicadoras.publicadora_id WHERE jogo_id=$1;` ,[jogoId]);
                const devResult = await pool.query(`SELECT jogo_desenvolvedoras.desenvolvedora_id AS id, emp.emp_nome AS nome FROM jogo_desenvolvedoras INNER JOIN jogo ON jogo.id=jogo_desenvolvedoras.jogo_id INNER JOIN (SELECT empresa.id AS emp_id, empresa.nome as emp_nome FROM empresa) AS emp ON emp.emp_id=jogo_desenvolvedoras.desenvolvedora_id WHERE jogo_id=$1;`, [jogoId]);
                const genResult = await pool.query(`SELECT genero_id AS id, gen.gen_nome AS nome FROM jogo INNER JOIN jogo_generos ON jogo_generos.jogo_id=jogo.id INNER JOIN (SELECT genero.nome AS gen_nome, genero.id AS gen_id FROM genero) AS gen ON gen.gen_id=jogo_generos.genero_id WHERE jogo_id=$1;`, [jogoId]);
                const plataformaResult = await pool.query(`SELECT jogo_plataformas.plataforma_id AS id, plat.plat_nome AS nome FROM jogo INNER JOIN jogo_plataformas ON jogo.id=jogo_plataformas.jogo_id INNER JOIN (SELECT plataforma.nome AS plat_nome, plataforma.id AS plat_id FROM plataforma) AS plat ON plat.plat_id=jogo_plataformas.plataforma_id WHERE jogo_id=$1;`, [jogoId]);


                jogosArray.push({
                    'jogoId' : jogoId,
                    'jogoNome': jogoNome,
                    'publicadoras' : pubResult.rows,
                    'desenvolvedoras': devResult.rows,
                    'generos': genResult.rows,
                    'plataformas': plataformaResult.rows,
                });
            }

            // const formattedResponse = { rowCount: result.rowCount, rows: result.rows };
            const formattedResponse = { jogosArray };
            res.status(200).send(formattedResponse);

        } catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    });

    router.get("/:jogoId", async (req, res) => {
        try {
            const id = req.params.jogoId;
            const result = await pool.query("SELECT id, nome FROM jogo WHERE jogo.id=$1", [id]);
            const formattedResponse = { rowCount: result.rowCount, rows: result.rows };
            res.status(200).send( formattedResponse );

        } catch(e) {
            console.error(e);
            res.status(500).send("Erro interno de servidor");
        }
    });

    return router;
};