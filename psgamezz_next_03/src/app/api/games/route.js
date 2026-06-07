import axios from 'axios';

const headers = {
    Authorization: process.env.API_TOKEN,
};

// GET /api/games
export async function GET(req) {
    const url = `${process.env.BACKEND_URL || 'https://psgamezz.ru'}/api/games/`;
    try {
        const res = await axios.get(url, { headers });
        const results = res.data.results.map(game => ({
            ...game,
            slug: `${game.id}`,
        }));

        return new Response(
            JSON.stringify({ results, next: res.data.next }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Ошибка сервера' }), { status: 500 });
    }
}
