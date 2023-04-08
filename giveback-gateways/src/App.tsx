import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import { ChakraProvider, ChakraProviderProps, localStorageManager, cookieStorageManager, createLocalStorageManager } from "@chakra-ui/react";
// import { StorageManager } from "@chakra-ui/color-mode";
import theme from "./theme";

const manager = createLocalStorageManager("chakra-ui-color-mode");
manager.set("light");

function App() {
  return (
    <Router>
      <ChakraProvider colorModeManager={manager} theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
}

export default App;
