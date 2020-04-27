const { Pool } = require('pg');
const url = require('url');

let configs;

if (process.env.DATABASE_URL) {

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    configs = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true
    };

} else {
    configs = {
        user: 'zachariah',
        host: '127.0.0.1',
        database: 'unit2_proj',
        port: 5432
    };
}


const pool = new Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {
    //make queries directly from here
    poolEnd: async () => {
        await pool.end();
        console.log('\nShut down db connection pool');
    },

    query: async (queryText, queryValues) => {

        try {

            const client = await pool.connect();
            console.log('connected!');

            const res = await client.query(queryText, queryValues);

            client.release();
            console.log('client released!');

            return res;

        } catch (e) {
            console.log(`Error\n` + e.message, e.stack);
        }
    },

    pool: pool,
};