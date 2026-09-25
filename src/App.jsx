import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import AppRoutes from "./AppRoutes";

/** The browser application: the shared route tree behind a BrowserRouter. */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
