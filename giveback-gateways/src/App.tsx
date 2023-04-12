import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import VolunteerProfilePage from "./pages/VolunteerProfilePage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import theme from "./theme";
import VolunteerBoardPage from "./pages/VolunteerBoardPage";
import MessageBoardPage from "./pages/MessageBoardPage";
import Footer from "./components/Footer";
import SignupVolunteerPage from "./pages/SignupVolunteerPage";
import SignupCompanyPage from "./pages/SignupCompanyPage";
import CustomProfileRoute from "./components/CustomProfileRoute";

const manager = createLocalStorageManager("chakra-ui-color-mode");
manager.set("light");

function App() {
  return (
    <Router>
      <ChakraProvider colorModeManager={manager} theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup-volunteer" element={<SignupVolunteerPage />} />
          <Route path="/signup-company" element={<SignupCompanyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id" element={<CustomProfileRoute />} />;
          <Route path="/volunteer-board" element={<VolunteerBoardPage />} />
          <Route path="/message-board" element={<MessageBoardPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </Router>
  );
}

export default App;
