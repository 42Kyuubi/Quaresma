"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const targetIP = '10.13.200.129'; // IP ou domínio
const ws = new ws_1.default('ws://localhost:8080');
ws.on('open', () => {
    console.log(`Conectado ao servidor. Enviando alvo: ${targetIP}`);
    ws.send(targetIP);
});
ws.on('message', (data) => {
    const res = JSON.parse(data.toString());
    if (res.alive) {
        console.log(`[${res.timestamp}] ${res.target} está ONLINE - Tempo: ${res.time}ms`);
    }
    else {
        console.log(`[${res.timestamp}] ${res.target} está OFFLINE`);
    }
});
ws.on('close', () => {
    console.log('Conexão encerrada pelo servidor');
});
