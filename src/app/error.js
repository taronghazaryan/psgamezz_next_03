"use client";

// Error boundary уровня сегмента: ловит ошибки рендера страниц,
// показывает фолбэк с кнопкой повтора вместо падения маршрута.
export default function Error({ error, reset }) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: 600 }}>
        Что-то пошло не так
      </h2>
      <p style={{ color: "#888" }}>
        Не удалось загрузить страницу. Попробуйте ещё раз.
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
        Повторить
      </button>
    </div>
  );
}
