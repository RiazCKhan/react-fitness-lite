import { Outlet } from "react-router-dom";
import "./Home.scss";

export default function Footer(children) {

  return (
    <section className="footer">
      <Outlet />
    </section>
  );
}
