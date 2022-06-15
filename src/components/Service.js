import React, { useState, useRef, useCallback, useEffect } from "react";
import "./Service.scss";
import SuggestionCard from "./SuggestionCard";
import { lignes, stations } from "../Data";
import { MapView, Heading, Divider, Text } from "@aws-amplify/ui-react";
import { Marker, Popup, Source, Layer } from "react-map-gl";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import config from "../aws-exports";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { Auth } from "aws-amplify";
import {
  LocationClient,
  CalculateRouteCommand,
} from "@aws-sdk/client-location";
import { createRequestTransformer } from "amazon-location-helpers";

Amplify.configure(awsExports);
const ROUTE_CALC_NAME = "wherebus-calculator";

export default function Service() {
  const db = getDatabase();
  const mapRef = useRef();
  const ligneInputRef = useRef();
  const stationInputRef = useRef();
  const [credentials, setCredentials] = useState();
  const [client, setClient] = useState(null);
  const [userPosition, setUserPosition] = useState({
    latitude: 33.9715904,
    longitude: -6.8498129,
  });
  var currentPosition = [
    {
      id: 1,
      name: "Your current location",
      adress: "Tap to move to your location",
      latitude: userPosition.latitude,
      longitude: userPosition.longitude,
    },
  ];
  const [suggestions, setSuggestions] = useState(currentPosition);
  const [bus, setBus] = useState({
    lntLng: { latitude: 0, longitude: 0 },
    num_ligne: "",
    status: false,
  });
  const [arrayBus, setArrayBus] = useState({});
  const [ligne, setLigne] = useState(false);
  const [departure, setDeparture] = useState({});
  const [numLigne, setNumLigne] = useState();
  const [routeLine, setRouteLine] = useState([]);
  const [routeLineShown, setRouteLineShown] = useState(false);
  const [timeEstimatedBus, setTimeEstimatedBus] = useState();

  const carrollRoute = {
    type: "geojson",
    id: "carrollroute",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [33.9715904, -6.8498129],
          [34.031799, -6.771526],
        ],
      },
    },
  };
  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: routeLine,
    },
  };

  //read data
  /* useEffect(()=>{
    onValue(ref(db, 'bus/'), (snapshot) =>{
      const data = snapshot.val();
      if(data !== null){
        Object.values(data).map((ligne)=>{
          setBusArray((oldItems)=> [...oldItems, ligne]);
        })
      }
    });
  },[]) */

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, "bus/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setArrayBus(snapshot.val());
        } else {
          alert("No bus is detected !!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    if (numLigne) {
      setRouteLineShown(arrayBus[numLigne].status);
      const to = {
        latitude: arrayBus[numLigne].lntLng.latitude,
        longitude: arrayBus[numLigne].lntLng.longitude,
      };
      /* if (routeLineShown) {
        findRoute(departure, to);
      } */
    } else {
      setRouteLineShown(false);
    }
  }, [arrayBus]);

  useEffect(() => {
    const fetchCredentials = async () => {
      setCredentials(await Auth.currentUserCredentials());
    };

    fetchCredentials();

    const createClient = async () => {
      const credentials = await Auth.currentCredentials();
      const client = new LocationClient({
        credentials,
        region: config.aws_project_region,
      });
      setClient(client);
    };

    createClient();

    stationInputRef.current.focus();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          currentPosition = [
            {
              id: 1,
              name: "Your current location",
              adress: "Tap to move to your location",
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ];
          setSuggestions(currentPosition);
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      alert("Allow location to use service.");
    }
  }, []);

  function secondsToString(s) {
    var h = 0;
    var min = 0;
    min = parseInt(s / 60);
    if (min > 59) {
      h = parseInt(min / 60);
      min = parseInt(min % 60);
      s = parseInt(s % 60);
    } else {
      s = parseInt(s % 60);
    }
    return h + "h" + min + "min" + s + "s";
  }

  const calculateRoute = async (routeCalculator, client, from, to) => {
    const params = {
      CalculatorName: routeCalculator,
      DeparturePosition: [from.longitude, from.latitude],
      DestinationPosition: [to.longitude, to.latitude],
      IncludeLegGeometry: true,
    };

    console.log(params);
    const command = new CalculateRouteCommand(params);
    try {
      const data = await client.send(command);
      return data;
    } catch (e) {
      console.log("error: " + e);
    }
  };
  const findRoute = async (from, to) => {
    const routeRes = await calculateRoute(ROUTE_CALC_NAME, client, from, to);
    console.log(routeRes);

    const route = routeRes.Legs[0].Geometry.LineString;
    const timeEstimted = routeRes.Summary.DurationSeconds;

    console.log(route);
    setRouteLine(route);
    setTimeEstimatedBus(secondsToString(timeEstimted));
  };

  const flyTo = (latitude, longitude) => {
    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 15,
    });
  };
  const handleSuggestionsClick = (name, latitude, longitude, busNum) => {
    if (ligne || name === "Your current location") {
      stationInputRef.current.value = name;
      setDeparture({ latitude, longitude });
      ligneInputRef.current.focus();
      flyTo(latitude, longitude);
    } else {
      ligneInputRef.current.value = name;
      setRouteLineShown(arrayBus[busNum].status);
      setNumLigne(busNum);
      if (arrayBus[busNum].status) {
        flyTo(
          arrayBus[busNum].lntLng.latitude,
          arrayBus[busNum].lntLng.longitude
        );
        const to = {
          latitude: arrayBus[busNum].lntLng.latitude,
          longitude: arrayBus[busNum].lntLng.longitude,
        };
        //arrayBus[busNum].watch(arrayBus[busNum].lntLng, findRoute(departure, to));
        findRoute(departure, to);
      } else {
        alert("This bus is offline");
      }
    }
  };

  useEffect(() => {
      if (numLigne && routeLineShown) {
        //findRoute(departure, arrayBus[numLigne].lntLng);
      }
  }, [arrayBus]);

  const handleSuggestions = (e) => {
    if (e.target.id === "station_input" && e.target.value !== "") {
      setSuggestions(stations);
      setLigne(true);
    } else if (e.target.id === "ligne_input" && e.target.value !== "") {
      setLigne(false);
      setSuggestions(lignes);
    } else {
      setSuggestions(currentPosition);
      setRouteLineShown(false);
      setNumLigne(null);
    }
  };

  return (
    <div className="service-container">
      {
        <div className="map-container">
          <MapView
            style={{ width: "100%", height: "100%" }}
            ref={mapRef}
            initialViewState={{
              latitude: userPosition.latitude,
              longitude: userPosition.longitude,
              zoom: 13,
            }}
          >
            <MarkerWithPopup
              title="Your current location"
              latitude={userPosition.latitude}
              longitude={userPosition.longitude}
              withDetail={false}
              children={<i className="fi fi-sr-user user-pin"></i>}
            />
            {Object.keys(arrayBus).map((keyName, i) => {
              return (
                arrayBus[keyName].status && (
                  <MarkerWithPopup
                    key={i}
                    title={arrayBus[keyName].num_ligne}
                    latitude={arrayBus[keyName].lntLng.latitude}
                    longitude={arrayBus[keyName].lntLng.longitude}
                    withDetail={true}
                    timeBus={timeEstimatedBus}
                    children={<i className="fi fi-ss-bus user-pin"></i>}
                  />
                )
              );
            })}

            {stations.map(({ id, name, latitude, longitude }) => (
              <MarkerWithPopup
                key={id}
                title={name}
                latitude={latitude}
                longitude={longitude}
                withDetail={false}
                children={<i className="fi fi-ss-map-marker-home user-pin"></i>}
              />
            ))}
            {routeLineShown && (
              <Source id="polylineLayer" type="geojson" data={dataOne}>
                <Layer
                  id="lineLayer"
                  type="line"
                  source="my-data"
                  layout={{
                    "line-join": "round",
                    "line-cap": "round",
                  }}
                  paint={{
                    "line-color": "rgba(0, 0, 0, 0.747)",
                    "line-width": 5,
                  }}
                />
              </Source>
            )}
          </MapView>
        </div>
      }
      <div className="card-container">
        <h1>Où pouvons-nous vous prendre en charge ?</h1>
        <div className="input-container">
          <span className="line"></span>
          <div className="input1">
            <input
              id="station_input"
              type="text"
              placeholder="Spécifier un lieu de prise en charge"
              className="input"
              ref={stationInputRef}
              onChange={handleSuggestions}
            />
            <i className="fi fi-bs-square square"></i>
          </div>
          <div className="input2">
            <input
              id="ligne_input"
              type="text"
              placeholder="Sélectionner une ligne"
              className="input"
              ref={ligneInputRef}
              onChange={handleSuggestions}
            />
            <i className="fi fi-bs-circle circle"></i>
          </div>
        </div>
        <div className="suggestions">
          {suggestions.map(({ id, name, adress, latitude, longitude }) => (
            <SuggestionCard
              key={id}
              name={name}
              adress={adress}
              onClick={() => {
                handleSuggestionsClick(
                  name === "Your current location" ? name : name + " " + adress,
                  latitude,
                  longitude,
                  name
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MarkerWithPopup({
  children,
  title,
  latitude,
  longitude,
  withDetail,
  timeBus,
}) {
  const [showPopup, setShowPopup] = useState(false);

  const markerClickHandler = ({ originalEvent }) => {
    originalEvent.stopPropagation();
    setShowPopup(true);
  };

  return (
    <>
      <Marker
        anchor="bottom"
        latitude={latitude}
        longitude={longitude}
        onClick={markerClickHandler}
        style={{ cursor: "pointer" }}
      >
        {children}
      </Marker>
      {showPopup && (
        <Popup
          className="popup"
          closeOnMove="true"
          latitude={latitude}
          longitude={longitude}
          offset={{ bottom: [0, -40] }}
          onClose={() => setShowPopup(false)}
        >
          <Heading level={6}>{title}</Heading>
          {withDetail && (
            <Divider className="divider" label="details" size="large" orientation="horizontal" />
          )}
          {withDetail && <Text>Time left : {timeBus}</Text>}
        </Popup>
      )}
    </>
  );
}
