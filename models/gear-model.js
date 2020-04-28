const db = require('../db.js');

module.exports = class Gear {

    constructor(userId, name, type, img, notes) {
        this.userId = userId;
        this.name = name;
        this.type = type;
        this.img = img;
        this.notes = notes;
    }

    async add() {
        const queryT = `INSERT INTO gear (user_id, name, type, img_link, notes) VALUES($1, $2, $3, $4, $5) RETURNING *`;
        const queryV = [this.userId, this.name, this.type, this.img, this.notes];
        const { rows } = await db.query(queryT, queryV);

        return rows;
    }

    static async getAll(userId) {
        const query = `SELECT * FROM gear where user_id=${userId}`
        const { rows } = await db.query(query);

        return rows;
    }

    static async getById(gearId) {
        const query = `SELECT * FROM gear WHERE id=${gearId}`;
        const { rows } = await db.query(query);

        return rows;
    }

    static async getByType(userId, type) {

        let query = "";

        if (type == 'all') {
            query = `SELECT * FROM gear where user_id=${userId}`;
        } else {
            query = `SELECT * FROM gear WHERE user_id=${userId} AND type='${type}'`;
        }

        const { rows } = await db.query(query);

        return rows;

    }

    static async updateById(gearId, name, type, img, notes) {
        const query = `UPDATE gear SET name = '${name}', type = '${type}', img_link = '${img}', notes = '${notes}' WHERE id=${gearId} RETURNING *`

        const { rows } = await db.query(query);

        return rows;
    }

    static async deleteById(gearId) {
        const query = `DELETE from gear WHERE id=${gearId}`;
        const { rows } = await db.query(query);

        return rows;
    }

    static async addToPedalboard(pedalboardId, gearId, gearOrder) {

        const queryT = `INSERT INTO pedalboards_gear (pedalboard_id, gear_id, gear_order) VALUES($1, $2, $3) RETURNING *`;
        const queryV = [pedalboardId, gearId, gearOrder];
        const { rows } = await db.query(queryT, queryV);

        return rows;
    }

    static async removeFromPedalboard(pedalboardId, gearId) {
        const query = `DELETE from pedalboards_gear WHERE pedalboard_id=${pedalboardId} AND gear_id=${gearId} RETURNING *`
        const { rows } = await db.query(query);

        return rows;

    }
}