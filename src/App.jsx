import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

/** The browser application: the shared route tree behind a BrowserRouter. */
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
