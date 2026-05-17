import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query/queryClient";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>
);
