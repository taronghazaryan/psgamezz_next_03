import { NextResponse } from "next/server";

// Серверный прокси к бэкенду psgamezz.ru.
// Токен подставляется здесь, на сервере, и НЕ попадает в браузер.
// Клиент (connectors) ходит на /api/proxy/<тот же путь, что и у бэкенда>.

const BACKEND_URL = process.env.BACKEND_URL || "https://psgamezz.ru";
const API_TOKEN = process.env.API_TOKEN;

async function handler(req, ctx) {
  const { path = [] } = await ctx.params;
  const search = req.nextUrl.search || "";
  // Бэкенд (Django) ожидает завершающий слэш.
  const target = `${BACKEND_URL}/${path.join("/")}/${search}`;

  const headers = {};
  if (API_TOKEN) headers["Authorization"] = API_TOKEN;

  // Пробрасываем нужные заголовки от клиента (CSRF, тип контента, куки сессии).
  const contentType = req.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;
  const csrf = req.headers.get("x-csrftoken");
  if (csrf) headers["X-CSRFToken"] = csrf;
  const cookie = req.headers.get("cookie");
  if (cookie) headers["Cookie"] = cookie;
  // Origin/Referer нужны Django для проверки CSRF на мутирующих запросах.
  const origin = req.headers.get("origin");
  if (origin) headers["Origin"] = origin;
  const referer = req.headers.get("referer");
  if (referer) headers["Referer"] = referer;

  const init = { method: req.method, headers, redirect: "manual" };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  try {
    const res = await fetch(target, init);
    const body = await res.text();

    const out = new NextResponse(body, { status: res.status });
    const resContentType = res.headers.get("content-type");
    if (resContentType) out.headers.set("Content-Type", resContentType);
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) out.headers.set("set-cookie", setCookie);
    return out;
  } catch (e) {
    return NextResponse.json({ error: "Ошибка обращения к бэкенду" }, { status: 502 });
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
