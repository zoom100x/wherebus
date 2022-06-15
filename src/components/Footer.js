import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.scss'

export default function Footer() {
    console.log();
  return (
    <footer className='footer-container'>
        <div className="container1">
            <h1>WhereBus</h1>
            <p>&copy;{new Date().getFullYear()} WhereBus Technologie Inc.</p>
        </div>
        <div className="container2">
            <img src="./Assets/images/WhereBus_logo_white.png" alt="wherebus logo" width='40px' />
            <div className="social-icon">
                <a href="#"><i className="fi fi-brands-facebook"></i></a>
                <a href="#"><i className="fi fi-brands-twitter"></i></a>
                <a href="#"><i className="fi fi-brands-youtube"></i></a>
                <a href="#"><i className="fi fi-brands-linkedin"></i></a>
                <a href="#"><i className="fi fi-brands-instagram"></i></a>
            </div>
        </div>
        <div className="container3">
            <ul>
                <li><Link to=''>Confidentialité</Link></li>
                <li><Link to=''>Accesibilité</Link></li>
                <li><Link to=''>Conditions</Link></li>
            </ul>
        </div>
    </footer>
  )
}
