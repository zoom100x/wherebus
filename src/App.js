import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  Home,
  Footer,
  InscriptionMenu,
  Service,
  Chauffeur,
  SteInscription,
  Connexion,
  Dashboard
} from "./components";
import React, { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" });
  }, []);

  const location = useLocation();
  const [isInscriptionMenuShown, setIsInscriptionMenuShown] = useState(false);
  const inscriptionBtnHandler = () => {
    setIsInscriptionMenuShown(true);
  };
  const inscriptionCloseBtnHandler = () => {
    setIsInscriptionMenuShown(false);
  };
  
  return (
    <>
      {(location.pathname !== "/chauffeur" && location.pathname !== "/connexion")  && (
        <Navbar inscriptionBtnHandler={inscriptionBtnHandler} inMap={location.pathname} inDashboard={(location.pathname === "/dashboard")} />
      )}
      <InscriptionMenu
        isShown={isInscriptionMenuShown}
        inscriptionCloseBtnHandler={inscriptionCloseBtnHandler}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/looking" element={<Service />} />
        <Route path="/chauffeur" element={<Chauffeur />} />
        <Route path="/ste-inscription" element={<SteInscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
      {(location.pathname !== "/chauffeur" && location.pathname !== "/looking") && <Footer />}
    </>
  );
}

export default App;
