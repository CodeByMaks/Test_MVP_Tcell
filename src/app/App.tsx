import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PlusProvider } from "./contexts/PlusContext";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PlusProvider>
          <RouterProvider router={router} />
        </PlusProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}