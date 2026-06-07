import axios from "axios";

// Клиентский инстанс. Токена здесь НЕТ — все запросы идут через серверный
// прокси /api/proxy, который подставляет Authorization на сервере.
const Api = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Функция получения CSRF из cookie
const getCSRFToken = () => {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : "";
};

// Интерцептор запросов: нормализуем URL и заворачиваем в прокси.
Api.interceptors.request.use((config) => {
  let url = config.url || "";

  // Абсолютные ссылки на бэкенд (например, поле `next` из пагинации)
  // приводим к относительным.
  url = url.replace(/^https?:\/\/psgamezz\.ru/i, "");

  // Всё, что ещё не завёрнуто, отправляем через серверный прокси.
  if (!url.startsWith("/api/proxy")) {
    if (!url.startsWith("/")) url = "/" + url;
    url = "/api/proxy" + url;
  }

  config.url = url;
  config.baseURL = ""; // same-origin: запрос идёт на сам Next-сервер

  // CSRF к мутирующим запросам
  const method = config.method?.toLowerCase();
  if (method === "post" || method === "put" || method === "delete") {
    config.headers["X-CSRFToken"] = getCSRFToken();
  }
  return config;
}, (error) => Promise.reject(error));

// Интерцептор на ответы
Api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Api;
