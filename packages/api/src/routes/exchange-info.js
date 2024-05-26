import { binanceAxios } from "../lib/binance-axios.js";
async function routes(fastify) {
    fastify.get('/exchange-info', async () => binanceAxios.get('/exchangeInfo?permissions=SPOT').then(res => res.data).catch(err => console.log(err.response)));
}
export { routes };
