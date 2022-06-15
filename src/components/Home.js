import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./Home.scss";

export default function Home() {
    const [isActive, setIsActive] = useState(false);
    const sectionClickHandler = ()=>{
        setIsActive(!isActive);
    }
  return (
    <section className={isActive? "home-container": "home-container otherImage"}>
      <div className="card-container">
        <div className="sections">
          <div className="section1" onClick={sectionClickHandler}>
            <i className="fi fi-rr-bus"></i>
            <p>Localisez vos bus</p>
          </div>
          <div className="section1" onClick={sectionClickHandler}>
            <i className="fi fi-ss-user"></i>
            <p>Déplacez vous avec WhereBus</p>
          </div>
        </div>
        <div className="line">
          <span className={isActive ? "active-line" : "active-line otherSection"}></span>
        </div>
        <div className={isActive ? "title-container": "title-container otherTitle"}>
            <h1 className="title">{isActive? 'Localisez vos stations, simplifiez la vie à vos clients.':'Choisissez la ligne, et votre position.'}</h1>
            <p className="description">
                {isActive? 'Rejoignez la platforme qui vous donne accès au plus vaste réseau de passagers actifs.':'Ne perdez jamais du temps avec WhereBus.'}
            </p>
            <Link to={isActive ? "/ste-inscription": "/looking"} className='btn1'>{isActive? 'Inscrivez-vous pour ajouter vos bus': 'Accédez à la carte'}</Link>
            <Link to="/" className='btn2'>{isActive ? 'En savoir plus sur l\'inscription': 'En savoir plus'}</Link>
        </div>
      </div>
      <div className="phone-bg">
        {/* isActive ? <img src="./Assets/images/bus.jpg" alt="yello bus" />: <img src="./Assets/images/bus-station.jpg" alt="bus station" /> */}
      </div>
    </section>
  );
}
