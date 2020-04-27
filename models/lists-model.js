const db = require('../db.js');

module.exports = class List {

    constructor(userId, name) {
        this.userId = userId;
        this.name = name;
    }

    async add() {
        const queryT = `INSERT INTO lists (user_id, name) VALUES($1, $2)`;
        const queryV = [this.userId, this.name];
        const { rows } = await db.query(queryT, queryV);

        return rows;
    }

    static async getAll() {
        const query = `SELECT * FROM lists where user_id=${req.session.userId}`
        const { rows } = await db.query(query);

        return rows;
    }

    static async getById(listId) {
        const query = `SELECT * FROM lists WHERE id=${gearId}`;
        const { rows } = await db.query(query);

        return rows;
    }

}