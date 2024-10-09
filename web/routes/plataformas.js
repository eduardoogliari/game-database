const express = require('express');
const format = require('pg-format');
const { validateQueryAttribute, validateQuerySortOrder } = require('../validation');

module.exports = function(pool) {
    const router = express.Router();
    const port = process.env.PORT;

    router.get('/', async (req, res) => {
        try {
            const sortAttribute = validateQueryAttribute(req.query.sortBy, 'nome');
            const sortOrder     = validateQuerySortOrder(req.query.sortOrder);
            const limitOption   = req.query.limit ?? 50;
            const offsetOption  = req.query.offset ?? 0;
            const nomePlataforma = req.query.nome;

            const whereQuery = (nomePlataforma)
                ? format("WHERE UPPER(nome) LIKE UPPER(%L)", '%' + nomePlataforma + '%')
                : '';

            const query = `SELECT id, nome, nome_popular, abreviacao, foto_url, descricao FROM plataforma \
                ${ whereQuery }`;

            const result = await pool.query(`${query} ORDER BY ${sortAttribute} ${sortOrder} LIMIT $1 OFFSET $2`, [limitOption, offsetOption]);
            const contagemResult = await pool.query(`SELECT COUNT(*) AS contagem FROM ${query} AS q`);

            let plataformas = [];
            for (let i = 0; i < result.rowCount; ++i) {
                plataformas.push({
                    'id': result.rows[i].id,
                    'nome': result.rows[i].nome,
                    'nome_popular': result.rows[i].nome_popular,
                    'abreviacao': result.rows[i].abreviacao,
                    'foto_url': 'http://localhost:' + port + '/' +result.rows[i].foto_url,
                    'descricao': result.rows[i].descricao,
                });
            }

            res.status(200)
                .set({
                    'Content-Type': 'application/json',
                    'Pagination-Count': contagemResult.rows[0].contagem,
                })
                .send(plataformas);

        } catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    });

    router.get('/:plataformaId', async (req, res) => {
        try {
            const id = req.params.plataformaId;
            const result = await pool.query("SELECT id, nome, nome_popular, abreviacao, foto_url, descricao FROM plataforma WHERE plataforma.id=$1", [id]);
            // const formattedResponse = { rowCount: result.rowCount, rows: result.rows };

            let plataforma = {
                'id': undefined,
                'nome': '',
                'nome_popular': '',
                'abreviacao': '',
                'foto_url': '',
                'descricao': '',
            };

            if (result.rowCount > 0) {
                plataforma.id           = result.rows[0].id;
                plataforma.nome         = result.rows[0].nome;
                plataforma.nome_popular = result.rows[0].nome_popular;
                plataforma.abreviacao   = result.rows[0].abreviacao;
                plataforma.foto_url = 'http://localhost:' + port + '/' +result.rows[0].foto_url;
                plataforma.descricao    = result.rows[0].descricao;
            }
            res.status(200).send(plataforma);

        } catch(e) {
            console.error(e);
            res.status(500).send("Erro interno do servidor");
        }
    });

    return router;
};