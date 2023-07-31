import React from "react";
import Navbar from "../NavBar/Navbar";

import { Route, Routes } from "react-router-dom";

import "./layout.css";

import Employees from "../Employees/Main/Employees";
import Department from "../Departments/Main/Department";
import Departments from "../Departments/Main/Departments";
import Employee from "../Employees/Main/Employee";
import Footer from "../Footer/Footer";
import Leaves from "../Leaves/Main/Leaves";
import Restrictions from "../Restrictions/Main/Restrictions";
import Schedules from "../Schedules/Main/Schedules";
import Error from "../Error/Error";
import Dashboard from "../Dashboard/Main/Dashboard";

const Layout = () => {
  return (
    <>
      <div id="parent">
        <div className="child" id="navbar">
          <Navbar />
        </div>

        <div className="child px-4" id="content">
          <Routes>
            <Route path="" element={<Dashboard />}></Route>
            <Route path="departments" element={<Departments />}></Route>
            <Route path="departments/:id" element={<Department />}></Route>
            <Route path="employees" element={<Employees />}></Route>
            <Route path="employees/:id" element={<Employee />}></Route>
            <Route path="leaves" element={<Leaves />}></Route>
            <Route path="restrictions" element={<Restrictions />}></Route>
            <Route path="schedules/:id?" element={<Schedules />}></Route>
            <Route path="error" element={<Error />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Layout;
