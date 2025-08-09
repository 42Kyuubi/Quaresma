import WebSocket, { WebSocketServer } from 'ws';
import ping from 'ping';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', async (message) => {
        const target = message.toString();
        console.log(`Ping em: ${target}`);

        // Função para pingar continuamente
        const interval = setInterval(async () => {
            try {
                const res = await ping.promise.probe(target, {
                    timeout: 2,
                    extra: ['-c', '1'], // para Windows, '-n'; para Linux/Mac use '-c'
                });

                const response = {
                    target,
                    alive: res.alive,
                    time: res.time,
                    output: res.output,
                    timestamp: new Date().toISOString()
                };

                ws.send(JSON.stringify(response));
            } catch (err) {
                console.error('Erro ao pingar:', err);
                ws.send(JSON.stringify({ target, alive: false, error: err }));
            }
        }, 3000); // a cada 3 segundos

        ws.on('close', () => {
            clearInterval(interval);
            console.log('Cliente desconectado');
        });
    });
});

console.log('Servidor WebSocket iniciado na porta 8080');
