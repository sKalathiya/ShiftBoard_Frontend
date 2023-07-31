import React from "react";
import WhosOn from "./WhosOn";

const Dashboard = () => {
  return (
    <section className="main-Container">
      <div className="component-container">
        <span className="component-container-header">
          <p className="page-heading">Dashboard</p>
        </span>

        <div className="component-container-body">
          <WhosOn />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
