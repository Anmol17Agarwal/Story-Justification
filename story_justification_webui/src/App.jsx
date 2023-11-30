import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Browser } from "./config";
import { DashboardPage, HomePage, Http404Page } from "./pages";

export default function App() {
  const routes = [
    { element: <HomePage />, path: Browser.HOME },
    { element: <DashboardPage />, path: Browser.DASHBOARD },
    { element: <Http404Page />, path: Browser.HTTP_404 },
    { element: <Http404Page />, path: Browser.ASTERISK },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          return <Route key={route.path} {...route} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}
