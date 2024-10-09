const express = require('express');
const { escapeIdentifier } = require('pg');
const format = require('pg-format');
const { validateQueryAttribute, validateQuerySortOrder } = require('../validation');

module.exports = function (pool) {
    const router = express.Router();
    const port = process.env.PORT;

    router.get('/', async (req, res) => {

        try {
            const sortAttribute = validateQueryAttribute(req.query.sortBy, 'nome');
            const sortOrder = validateQuerySortOrder(req.query.sortOrder);
            // const limitOption = req.query.limit ?? 50;
            // const offsetOption = req.query.offset ?? 0;
            const nomeGenero = req.query.nome;

            const whereQuery = (nomeGenero)
                ? format("WHERE UPPER(nome) LIKE UPPER(%L)", '%' + nomeGenero + '%')
                : '';

            const query = `SELECT id, nome, abreviacao FROM genero ${ whereQuery }`;

            const result = await pool.query(`${query} ORDER BY ${sortAttribute} ${sortOrder}`);
            const contagemResult = await pool.query(`SELECT COUNT(*) AS contagem FROM ${query} AS q`);

            let generos = [];
            for (let i = 0; i < result.rowCount; ++i) {
                generos.push({
                    'id': result.rows[i].id,
                    'nome': result.rows[i].nome,
                    'abreviacao': result.rows[i].abreviacao,
                });
            }

            res.status(200)
                .set({
                    'Content-Type': 'application/json',
                    'Pagination-Count': contagemResult.rows[0].contagem,
                })
                .send(generos);

        } catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    });

    router.get('/:generoId', async (req, res) => {
        try {
            const id = req.params.generoId;
            const result = await pool.query("SELECT id, nome, abreviacao FROM genero WHERE genero.id=$1", [id]);

            let genero = {
                'id': undefined,
                'nome': '',
                'abreviacao': '',
            };

            if (result.rowCount > 0) {
                genero.id = result.rows[0].id;
                genero.nome = result.rows[0].nome;
                genero.abreviacao = result.rows[0].abreviacao;
            }
            res.status(200).send(genero);

        } catch (e) {
            console.error(e);
            res.status(500).send("Erro interno do servidor");
        }
    });

    return router;
};