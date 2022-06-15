import React, { useState, useEffect, useRef } from "react";
import "./Chauffeur.scss";
import { lignes } from "../Data";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { getDatabase, ref, set } from "firebase/database";

function Chauffeur({ signOut }) {
  const activeBtnRef = useRef();
  const [busLocation, setBusLocation] = useState({ latitude: 0, longitude: 0 });
  const [isLocationactive, setIsLocationActive] = useState(false);
  const [ligne, setLigne] = useState("");
  const [watchID, setWatchID] = useState(null);
  const db = getDatabase();

  const trackingLocation = () => {
    if (navigator.geolocation) {
      //navigator.permissions.query({ name: "geolocation" });
      const options = { enableHighAccuracy: false };
      const watchId = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        options
      );
      setWatchID(watchId);
    } else {
      alert("Allow location to use service.");
    }
  };

  const onSuccess = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    setBusLocation({
      latitude: latitude,
      longitude: longitude,
    });
  };
  const onError = (err) => {
    alert(err.message);
  };

  const activeBtnHandler = () => {
    if (ligne == "ligne" || ligne == "") {
      alert("Choose a ligne");
    } else {
      setIsLocationActive(true);
      trackingLocation();
    }
  };

  function stopBtnHandler() {
    setIsLocationActive(false);
    setBusLocation({ latitude: 0, longitude: 0 });
    if (watchID != null) {
      navigator.geolocation.clearWatch(watchID);
      watchID = null;
    } else {
      console.log("isNull");
    }
  }

  function selectedLigne(e) {
    setLigne(e.target.value);
  }

  function writeChauffeurData(busId, num_ligne, lntLng, status) {
    set(ref(db, "bus/" + busId), {
      num_ligne: num_ligne,
      lntLng: lntLng,
      status: status,
    });
  }
  if (ligne) {
    writeChauffeurData(ligne, ligne, busLocation, isLocationactive);
  }

  return (
    <div className="container">
      <h2>
        Bonjour :{" "}
        {busLocation.latitude + ", " + busLocation.longitude + isLocationactive}
      </h2>
      <label htmlFor="lignes">Choisir votre ligne :</label>
      <select
        name="lignes"
        id="select_lignes"
        required
        disabled={isLocationactive}
        onChange={selectedLigne}
      >
        <option value="none">none</option>
        {lignes.map(({ id, name }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button
        onClick={activeBtnHandler}
        ref={activeBtnRef}
        disabled={isLocationactive}
      >
        Activer localisation
      </button>
      <button onClick={stopBtnHandler} className="stopBtn">
        Arrêter la localisation
      </button>
      <button className="signout" onClick={signOut}>
        Se déconnecter
      </button>
    </div>
  );
}

export default withAuthenticator(Chauffeur);
