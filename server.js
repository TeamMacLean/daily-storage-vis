const CONFIG = require("./config");
// const fetch = require("./lib/getData");
const express = require('express');
const next = require('next');
const {Base64} = require("./lib/base64");

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const config = require('./config');

function btoa(string) {
    return Base64.encode(string)
}

app.prepare()
    .then(() => {
        const server = express();


        server.get('/proxy/:year/:month/:day', async (req, res) => {

            const dateFull = `${req.params.year}/${req.params.month}/${req.params.day}`;

            const config = {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                // mode: 'no-cors',
                // credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(CONFIG.auth.username + ":" + CONFIG.auth.password),
                }
            };

            const url = `http://unified-monitor.nbi.ac.uk/Reports/TSL/storage/daily-json/${dateFull}/TSL_PrimaryData_Usage.json`;


            const fetchRes = await fetch(url, config);
            const json = await fetchRes.json();
            return res.json(json)

            // return res.json();
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(config.port, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        })
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });