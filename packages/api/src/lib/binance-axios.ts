import axios from 'axios'

export const binanceAxios = axios.create({
  baseURL: process.env.BINANCE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})