import { FastifyInstance } from "fastify";
import { binanceAxios } from "../lib/binance-axios.js";

async function routes (fastify: FastifyInstance ) {
  fastify.get('/exchange-info', async () => binanceAxios.get('/exchangeInfo?permissions=SPOT').then(res => res.data).catch(err => console.log(err.response)))

  fastify.get('/depth', async (req) => binanceAxios.get('/depth', { params: req.query }).then(res => res.data).catch(err => console.log(err.response)))

  fastify.get('/ticker/24hr', async (req) => binanceAxios.get('/ticker/24hr', { params: req.query }).then(res => res.data).catch(err => console.log(err.response)))
}

export { routes };
