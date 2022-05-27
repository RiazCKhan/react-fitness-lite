import { Outlet } from "react-router-dom";
import "./Home.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Footer(children) {

  return (
    <section className="footer">
      <Outlet />
    </section>
  );
}
