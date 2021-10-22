"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (app) => {
    app.get('/main', (req, res) => {
        res.sendStatus(200);
    });
};
exports.default = routes;
