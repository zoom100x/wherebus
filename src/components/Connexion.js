import React, {useState, useEffect} from "react";
import "./Connexion.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Connexion() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    if (loading) {
      console.log(loading);
      return;
    }
    if (user) {
      console.log(user.email)
      navigate("/dashboard")
    };
  }, [user, loading]);
  function submitConnexion(data) {
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then()
    .catch((e)=>{
      alert(e.message);
      reset()
    })
  }
  return (
    <div className="container-connexion">
      <div className="bar-img"></div>
      <Link to="/" className="logo">
        <img
          src="./Assets/images/WhereBus_logo-01.png"
          alt="wherebus logo"
          width="70px"
        />
      </Link>
      <div className="connexion-form">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit(submitConnexion)}>
          <input
            type="email"
            {...register("email", {required:true})}
            id="email"
            placeholder="Adresse courriel"
          />
          <input
            type="password"
            {...register("password", {required:true})}
            id="password"
            placeholder="Mot de passe"
          />
          <input
            type="submit"
            id="submit"
            value="Se connecter"
          />
        </form>
        <p>
          Vous n'avez pas de compte ?{" "}
          <Link to="/ste-inscription">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
