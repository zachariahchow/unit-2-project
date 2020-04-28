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
        const queryV = [this.userId, this.name, this.type, this.notes];
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

    static async updateById(gearId, name, type, img, notes) {
        const queryT = `UPDATE gear SET name = '${name}', type = '${type}', img_link = '${img}', notes = '${notes}' WHERE id=${gearId} RETURNING *`

        const { rows } = await db.query(queryT);

        return rows;
    }

    static async deleteById(gearId) {
        const queryT = `DELETE from gear WHERE id=${gearId}`;
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
        const queryT = `DELETE from pedalboards_gear WHERE pedalboard_id=${pedalboardId} AND gear_id=${gearId}`
        const { rows } = await db.query(queryT);

        return rows;

    }
}