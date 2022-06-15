import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar({ inscriptionBtnHandler, inMap, inDashboard }) {
  const [navInMap, setNavInMap] = useState(false);
  useEffect(() => {
    if (inMap === "/looking") {
      setNavInMap(true);
    } else {
      setNavInMap(false);
    }
  }, [inMap]);

  return (
    <div className={navInMap ? "navbar_container inMap" : "navbar_container"}>
      <div className="navbar_logo">
        <Link to="/">
          <h1>WhereBus</h1>
        </Link>
      </div>
      <div className="navbar_items">
        <ul>
          <li>
            <Link to="/" className={inDashboard? "hidden": ""}>
              <i className="fi fi-rr-apps-add"></i>
              <p>Produits</p>
            </Link>
          </li>
          <li>
            <Link to={inDashboard ? "/dashboard":"/connexion"} className={inDashboard? "dashboard": ""}>
              <i className="fi fi-rr-user"></i>
              <p>Connexion</p>
            </Link>
          </li>
          <li>
            <Link to='/connexion'>
              <i className="fi fi-sr-user"></i>
            </Link>
          </li>
          <li>
            <button onClick={inscriptionBtnHandler} className={inDashboard? "hidden": ""}>
              <p>S'inscrire</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
