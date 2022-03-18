import { Link } from "react-router-dom";
import "./Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faDumbbell, faUserFriends, faDoorOpen, faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import { useState } from "react";


export default function Navbar(children) {

  return (
    <>
      <header>
        <nav className="header">
          <div className="d-flex">
            <Link to="/">
              <img src="./logo192.png" className="logo"></img>
              {/* <h1 className="logo">REACT</h1> */}
              <span className="logo2">FitnessLite</span>
            </Link>
          </div>
          <ul>
            <li className="m-3">
              <Link to="/" >
                <FontAwesomeIcon icon={faHome} className="purple" />
                <span className="ml-1 purple">Home</span>
              </Link>
            </li>
            <li className="m-3">
              <Link to="/about">
                <FontAwesomeIcon icon={faUserFriends} className="purple" /><span className="ml-1 purple">
                  About
                </span>
              </Link>
            </li>

            <li className="m-3">
              <Link to="/workouts">
                <FontAwesomeIcon icon={faDumbbell} className="purple" />
                <span className="ml-1 purple">Workouts</span></Link>
            </li>

          </ul>
        </nav>

        <Footer />
      </header>
    </>
  );
}
