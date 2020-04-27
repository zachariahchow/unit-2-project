const db = require('../db.js');

module.exports = class Pedalboard {

    constructor(name, userId) {
        this.userId = userId;
        this.name = name;
    }

    async add() {
        const queryT = `INSERT INTO pedalboards (user_id, name) VALUES($1, $2) RETURNING *`;
        const queryV = [this.userId, this.name];
        const { rows } = await db.query(queryT, queryV);

        return rows;
    }

    static async getAll() {
        const query = `SELECT * FROM pedalboards where user_id=${req.session.userId}`
        const { rows } = await db.query(query);

        return rows;
    }

    static async getById(pedalboardId) {
        const query = `SELECT * FROM pedalboards WHERE id=${pedalboardId}`;
        const { rows } = await db.query(query);

        return rows;
    }

    static async addToList(listId, pedalboardId) {

        const queryT = `INSERT INTO lists_pedalboards (list_id, pedalboard_id) VALUES($1, $2) RETURNING *`;
        const queryV = [listId, pedalboardId];
        const { rows } = await db.query(queryT, queryV);

        return rows;

    }

    static async deleteFromList(listId, pedalboardId) {
        const queryT = `DELETE from lists_pedalboards WHERE pedalboard_id=${pedalboardId} AND list_id=${listId}`
        const { rows } = await db.query(queryT);

        return rows;
    }
}