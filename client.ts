import WebSocket from 'ws';

const targetIP = '10.13.200.129'; // IP ou domínio
const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log(`Conectado ao servidor. Enviando alvo: ${targetIP}`);
    ws.send(targetIP);
});

ws.on('message', (data) => {
    const res = JSON.parse(data.toString());

    if (res.alive) {
        console.log(`[${res.timestamp}] ${res.target} está ONLINE - Tempo: ${res.time}ms`);
    } else {
        console.log(`[${res.timestamp}] ${res.target} está OFFLINE`);
    }
});

ws.on('close', () => {
    console.log('Conexão encerrada pelo servidor');
});
