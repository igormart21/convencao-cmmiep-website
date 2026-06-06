if (window.location.pathname.startsWith("/cart/c/")) {
  const target =
    "https://store-store-builder-joaax.myshopify.com" +
    window.location.pathname +
    window.location.search +
    window.location.hash;

  window.location.replace(target);
} else {
  void Promise.all([
    import("react-dom/client"),
    import("./App.tsx"),
    import("./index.css"),
  ]).then(([{ createRoot }, { default: App }]) => {
    createRoot(document.getElementById("root")!).render(<App />);
  });
}
