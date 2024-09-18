const express = require('express');
const format = require('pg-format');
const { validateQueryAttribute, validateQuerySortOrder } = require('../validation');

module.exports = function(pool) {
    const router = express.Router();

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

            const result = await pool.query(`SELECT id, nome, nome_popular, abreviacao, foto_url, descricao FROM plataforma \
                ${whereQuery} \
                ORDER BY ${sortAttribute} ${sortOrder} LIMIT $1 OFFSET $2`, [limitOption, offsetOption]);

            const formattedResponse = { rowCount: result.rowCount, rows: result.rows };
            res.status(200).send(formattedResponse);

        } catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    });

    router.get('/:plataformaId', async (req, res) => {
        try {
            const id = req.params.plataformaId;
            const result = await pool.query("SELECT id, nome, nome_popular, abreviacao, foto_url, descricao FROM plataforma WHERE plataforma.id=$1", [id]);
            const formattedResponse = { rowCount: result.rowCount, rows: result.rows };
            res.status(200).send(formattedResponse);

        } catch(e) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    });

    return router;
};