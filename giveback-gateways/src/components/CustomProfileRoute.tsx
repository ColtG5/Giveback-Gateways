import React from "react";
import { useParams } from "react-router-dom";
import CompanyProfilePage from "../pages/CompanyProfilePage";
import VolunteerProfilePage from "../pages/VolunteerProfilePage";

interface Props {
  id: string;
}

const CustomProfileRoute: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const firstDigit = id.charAt(0);

  return firstDigit === "2" ? <VolunteerProfilePage /> : <CompanyProfilePage />;
};

export default CustomProfileRoute;
