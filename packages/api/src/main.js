import Fastify from "fastify";
import { routes as v3 } from "./routes/v3.js";
import { fastifySocketIO } from "./socket.js";
import { WebSocket } from "ws";
const API_PORT = Number(process.env.API_PORT) || 5000;
const WS_PORT = Number(process.env.WS_PORT) || 6000;
const fastify = Fastify({
    logger: true
});
fastify.get("/", async () => ({ hello: "world" }));
fastify.register(v3);
fastify.register(fastifySocketIO);
fastify.ready().then(() => {
    fastify.io.on("connection", (socket) => {
        // get depth
        let ws;
        socket.on("connect_depth", (symbol) => {
            ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth@1000ms`);
            ws.on("message", (data) => {
                if (data) {
                    const depth = JSON.parse(data);
                    socket.emit("update_depth", depth);
                }
            });
        });
        // disconnect depth
        socket.on("disconnect_depth", () => {
            if (!ws)
                return;
            ws.terminate();
        });
    });
});
try {
    await fastify.listen({ port: API_PORT });
}
catch (err) {
    fastify.log.error(err);
}
