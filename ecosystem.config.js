module.exports = {
    apps: [{
        name: "gear log",
        script: "./app.js",
        instances: "max",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}