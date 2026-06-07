import axios from "axios";

// Прямые запросы к бэкенду. Токен берётся из NEXT_PUBLIC_API_TOKEN
// (инлайнится в клиентский бандл на этапе сборки).
const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://psgamezz.ru",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_API_TOKEN,
  },
});

// Функция получения CSRF из cookie
const getCSRFToken = () => {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : "";
};

// Интерцептор запросов: добавляем CSRF к POST/PUT/DELETE
Api.interceptors.request.use((config) => {
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
