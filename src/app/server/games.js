import axios from 'axios';

// Серверный модуль: токен берём из окружения, в браузер он не попадает.
const headers = {
  Authorization: process.env.API_TOKEN,
};

const BACKEND_URL = process.env.BACKEND_URL || 'https://psgamezz.ru';
const API_URL = `${BACKEND_URL}/api/games/`;
const TIMEOUT = 10000;

// Получение одной игры по slug/id
export const getGameBySlug = async (slug) => {
  try {
    const res = await axios.get(`${API_URL}?slug=${slug}`, { headers, timeout: TIMEOUT });
    return res.data.results[0] || null;
  } catch (e) {
    console.error('getGameBySlug error:', e.code || e.message);
    return null;
  }
};

// Получение всех игр
export const getNewGames = async () => {
  try {
    const res = await axios.get(API_URL, { headers, timeout: TIMEOUT });
    return res.data.results || [];
  } catch (e) {
    console.error('getNewGames error:', e.code || e.message);
    return [];
  }
};
