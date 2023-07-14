import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className=" my-navbar  ">
      <div className="navbar-list">
        <NavLink
          title="Departments"
          className={
            "nav-icons " +
            (({ isActive }) => (isActive ? "active-style" : "none"))
          }
          to="/departments"
        >
          <span>
            <i className="fal fa-sitemap fa-xl"></i>
          </span>
          <span className="text">
            <b>Departments</b>
          </span>
        </NavLink>

        <NavLink
          title="Employees"
          className={
            "nav-icons " +
            (({ isActive }) => (isActive ? "active-style" : "none"))
          }
          to="/employees"
        >
          <span>
            <i className="fal fa-users fa-xl"></i>
          </span>
          <span className="text">
            <b>Employees</b>
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
