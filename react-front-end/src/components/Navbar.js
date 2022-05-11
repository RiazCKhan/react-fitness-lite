import { Link } from "react-router-dom";
import "./Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faDumbbell } from "@fortawesome/free-solid-svg-icons";

export default function Navbar(children) {

  return (
    <>
      <header>
        <nav className="header">
          <div className="d-flex">
            <Link to="/">
              <span className="logo">ReactFitness Lite</span>
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
              <Link to="/workouts">
                <FontAwesomeIcon icon={faDumbbell} className="purple" />
                <span className="ml-1 purple">Workouts</span></Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
