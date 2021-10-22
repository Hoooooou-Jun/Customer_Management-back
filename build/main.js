"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router/router"));
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('Hello');
});
app.use("/router", router_1.default);
app.listen(5000, () => {
    console.log('Server Running');
});
