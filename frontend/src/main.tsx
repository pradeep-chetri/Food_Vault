import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserDataContext.tsx";
import { BookmarkProvider } from "./context/BookmarkContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <BookmarkProvider>
          <App />
        </BookmarkProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
