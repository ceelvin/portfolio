import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
// import ImpressumPage from "./components/ImpressumPage/ImpressumPage";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ScrollToTop from "./components/common/ScrollToTop";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/impressum" element={<ImpressumPage />} /> */}
        </Routes>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
);
