import React from "react";
import './SuggestionCard.scss'

export default function SuggestionCard({name, adress, onClick}) {
  return (
    <div className="button-container" onClick={onClick}>
      <div className="icon-location">
        <i className="fi fi-ss-marker"></i>
      </div>
      <div className="info">
        <h2>{name}</h2>
        <p>{adress}</p>
      </div>
    </div>
  );
}
