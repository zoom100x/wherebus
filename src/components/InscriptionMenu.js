import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./InscriptionMenu.scss";

export default function InscriptionMenu({
  isShown,
  inscriptionCloseBtnHandler,
}) {


  return (
    <div className={isShown ? "menu-container" : "menu-container hidden"}>
      <button className="close">
        <i className="fi fi-rs-cross" onClick={inscriptionCloseBtnHandler}></i>
      </button>
      <div className="item">
        <Link to="/ste-inscription" className="title" onClick={inscriptionCloseBtnHandler}>
          <h2>Inscrivez-vous pour mentionner vos stations</h2>
          <i className="fi fi-rr-arrow-right"></i>
        </Link>
        <span className="line"></span>
      </div>
      <div className="item">
        <Link to="/looking" className="title" onClick={inscriptionCloseBtnHandler}>
          <h2>Créer votre compte passager</h2>
          <i className="fi fi-rr-arrow-right"></i>
        </Link>
        <span className="line"></span>
      </div>
    </div>
  );
}
