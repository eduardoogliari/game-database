const express = require('express');
const { escapeIdentifier } = require('pg');
const format = require('pg-format');
const { validateQueryAttribute, validateQuerySortOrder } = require('../validation');

module.exports = function(pool) {
    const router = express.Router();

    router.get('/', async (req, res) => {

        try {
            const sortAttribute = validateQueryAttribute( req.query.sortBy, 'nome' );
            const sortOrder     = validateQuerySortOrder(req.query.sortOrder);
            const limitOption   = req.query.limit ?? 50;
            const offsetOption  = req.query.offset ?? 0;
            const nomeEmpresa  = req.query.nome;

            const whereQuery = (nomeEmpresa)
                                    ? format("WHERE UPPER(nome) LIKE UPPER(%L)", '%' + nomeEmpresa + '%' )
                                    : '';

            const result = await pool.query(`SELECT id, nome, logo_url, descricao FROM empresa \
                ${whereQuery} \
                ORDER BY ${sortAttribute} ${sortOrder} LIMIT $1 OFFSET $2`, [limitOption, offsetOption]);

            const formattedResponse = { rowCount: result.rowCount, rows: result.rows };
            res.status(200).send(formattedResponse);

        } catch (err) {
            console.error(err);
            res.status(500).send("Erro interno do servidor");
        }
    });

    router.get('/:empresaId', async (req, res) => {
        try {
            const id           = req.params.empresaId;
            const result = await pool.query("SELECT id, nome, logo_url, descricao FROM empresa WHERE empresa.id=$1", [id]);
            const formattedResponse = { rowCount: result.rowCount, rows: result.rows };
            res.status(200).send(formattedResponse);

        } catch (e) {
            console.error(e);
            res.status(500).send("Erro interno do servidor");
        }
    });

    return router;
};