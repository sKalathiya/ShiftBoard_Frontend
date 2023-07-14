import React from "react";
import Navbar from "../NavBar/Navbar";
import Department from "../Departments/Department";
import { Route, Routes } from "react-router-dom";
import AddEmployee from "../Employees/Features/AddEmployee";

import "./layout.css";
import ListDepartment from "../Departments/List/ListDepartments";

import Employees from "../Employees/Main/Employees";

const Layout = () => {
  return (
    <>
      <div id="parent">
        <div className="child" id="navbar">
          <Navbar />
        </div>

        <div className="child px-4" id="content">
          <Routes>
            <Route path="departments" element={<ListDepartment />}></Route>
            <Route path="departments/:id" element={<Department />}></Route>
            <Route
              path="/employees/add/:departmentId"
              element={<AddEmployee />}
            ></Route>

            <Route path="/employees/add" element={<AddEmployee />}></Route>
            <Route path="employees" element={<Employees />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Layout;
