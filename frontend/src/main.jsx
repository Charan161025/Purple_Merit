import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js"; 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <div
  style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
    fontFamily: "Poppins, sans-serif",
    color: "#333"
  }}
>
  <App />
</div>
    </Provider>
  </React.StrictMode>
);
