import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, get, child } from "firebase/database";

export default function Dashboard() {
  const auth = getAuth();
  const db = getDatabase();
  const [user] = useAuthState(auth);
  const [name, setName] = useState();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const dbRef = ref(db);
    get(child(dbRef, "users/" + user?.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setName(data.name);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!user) return navigate("/connexion");
    fetchUserData();
  }, [user]);

  function handleBtnSignOut() {
    signOut(auth)
      .then(() => {
        //signout success
      })
      .catch(() => {
        //signOut error
      });
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <h3>Name: {name}</h3>
      <h3>Email: {user?.email}</h3>
      <button onClick={handleBtnSignOut}>Se déconnecter</button>
    </div>
  );
}
