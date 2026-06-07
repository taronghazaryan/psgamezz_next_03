import axios from 'axios';

// Серверный модуль: токен берём из окружения, в браузер он не попадает.
const headers = {
  Authorization: process.env.API_TOKEN,
};

const BACKEND_URL = process.env.BACKEND_URL || 'https://psgamezz.ru';
const API_URL = `${BACKEND_URL}/api/games/`;

// Получение одной игры по slug/id
export const getGameBySlug = async (slug) => {
  const res = await axios.get(`${API_URL}?slug=${slug}`, { headers });
  return res.data.results[0] || null;
};

// Получение всех игр
export const getNewGames = async () => {
  const res = await axios.get(API_URL, { headers });
  return res.data.results || [];
};
