import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import "./SteInscription.scss";

export default function SteInscription() {
  const db = getDatabase();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [numPhone, setNumPhone] = useState("");

  const [isCreated, setIsCreated] = useState(false);

  const [block, setBlock] = useState(1);
  const blocksRef = useRef(null);

  function incrementBlock() {
    if (block >= 3) {
      setBlock(1);
      blocksRef.current.style.transform = "translateX(0)";
    } else if (block === 1) {
      setBlock(block + 1);
      blocksRef.current.style.transform = "translateX(-33.33%)";
    } else if (block === 2) {
      setBlock(block + 1);
      blocksRef.current.style.transform = "translateX(-66.66%)";
    }
  }
  function decrementBlock() {
    if (block <= 1) {
      setBlock(3);
      blocksRef.current.style.transform = "translateX(-66.66%)";
    } else if (block === 2) {
      setBlock(block - 1);
      blocksRef.current.style.transform = "translateX(0)";
    } else if (block === 3) {
      setBlock(block - 1);
      blocksRef.current.style.transform = "translateX(-33.33%)";
    }
  }

  function registerAccount(data, e) {
    if (data.password !== data.password_repeat || rePassword === "") {
      setError(
        "password_repeat",
        { type: "focus", message: "passwords isn't matching" },
        { shouldFocus: true }
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password, name, numPhone)
      .then((userCredential) => {
        const user = userCredential.user
        setIsCreated(true);
        reset();
        set(ref(db, "users/" + user.uid),{
          id:user.uid,
          email,
          name,
          numPhone
        })
      })
      .catch((e) => {
        alert(e.message);
        reset();
      });
  }
  return (
    <div className="inscription-container">
      <section>
        <div className="title-description">
          <h1>Identifiez vos bus, simplifiez la vie à vos clients.</h1>
          <p>
            Rejoindre la platforme qui vous donne accés au plus vaste réseau de
            passagers actifs.
          </p>
        </div>
        <div className="inscription-card">
          <h3 className={isCreated ? "invisible": ""}>Inscrivez-vous maintenant</h3>
          <form className={isCreated ? "invisible": ""} onSubmit={handleSubmit(registerAccount)}>
            <input
              type="text"
              {...register("stéName", { required: true })}
              id="stéName"
              placeholder="Nom de la société"
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <input
              type="email"
              {...register("email", { required: true })}
              id="email"
              placeholder="Adresse e-mail"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <input
              type="text"
              {...register("tel", { required: true })}
              id="telephone"
              placeholder="Numéro de téléphone: 06.xx.xx.xx.xx"
              onChange={(e) => setNumPhone(e.currentTarget.value)}
            />
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              id="password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <input
              type="password"
              {...register("password_repeat", { required: true, minLength: 6 })}
              id="password_repeat"
              placeholder="Répétez votre mot de passe"
              onChange={(e) => setRePassword(e.currentTarget.value)}
            />
            {errors.password_repeat && (
              <p style={{ color: "red" }}>{errors.password_repeat.message}</p>
            )}
            <p>
              En continuant, j'accepte les{" "}
              <a href="#">Conditions d'utilisation</a> Conditions d'utilisation
              de Wherebus et je reconnais avoir lu la{" "}
              <a href="#">politique de confidentialité</a>.
            </p>
            <div>
              <input type="submit" value="Suivant" />
              <p>
                Vous avez déjà un compte ?{" "}
                <Link to="/connexion">Se connecter</Link>
              </p>
            </div>
          </form>
          <div className={isCreated ? 'inscription-success shown':"inscription-success"}>
            <img src="./Assets/images/inscription_success.png" alt="success logo" />
            <p>Votre inscription a bien été enregistré</p>
            <Link to="/connexion">Allez se connecter maintenant</Link>
          </div>
        </div>
      </section>
      <div className="img-background"></div>
      <div className="avantage">
        <h2>Conduisez en toute liberté</h2>
        <div className="blocks" ref={blocksRef}>
          <div className="block">
            <i className="fi fi-rr-dollar"></i>
            <h3>Générer du chiffre d'affaires partout et à tout moment</h3>
          </div>
          <div className="block">
            <i className="fi fi-rs-calendar"></i>
            <h3>Choisissez vos horaires</h3>
          </div>
          <div className="block">
            <i className="fi fi-rr-shield-check"></i>
            <h3>Securité</h3>
          </div>
        </div>
        <div className="navigation">
          <p>{block}/3</p>
          <span onClick={decrementBlock}>
            <i className="fi fi-rr-angle-left"></i>
          </span>
          <span onClick={incrementBlock}>
            <i className="fi fi-rr-angle-right"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
