import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import ListDepartment from "./Departments/List/ListDepartments";
import Department from "./Departments/Department";
import AddEmployee from "./Employees/Features/AddEmployee";
import { createContext, useContext } from "react";
import Navbar from "./NavBar/Navbar";
import Layout from "./Layout/Layout";
import { Notification } from "./Utils/Notification/Notification";

function App() {
  return (
    <>
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
