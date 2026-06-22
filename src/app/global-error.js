"use client";

// Глобальный error boundary: ловит ошибки даже в корневом layout.
// Должен сам рендерить <html>/<body>, т.к. заменяет корневой layout.
export default function GlobalError({ error, reset }) {
  return (
    <html lang="ru">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          textAlign: "center",
          padding: "24px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: 600 }}>
          Что-то пошло не так
        </h2>
        <p style={{ color: "#888" }}>
          Произошла ошибка. Попробуйте обновить страницу.
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#0047ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Обновить
        </button>
      </body>
    </html>
  );
}
