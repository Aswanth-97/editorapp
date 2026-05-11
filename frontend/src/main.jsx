import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./AuthProvider.jsx/AuthProvider.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TextProvider } from "./context/Textprovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TextProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </TextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
