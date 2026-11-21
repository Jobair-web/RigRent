"use client";
import { ThemeProvider, useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toasts() {
  const { resolvedTheme } = useTheme();
  return <ToastContainer position="bottom-right" autoClose={3500} newestOnTop theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="rigrent-theme" disableTransitionOnChange>
      {children}
      <Toasts />
    </ThemeProvider>
  );
}
