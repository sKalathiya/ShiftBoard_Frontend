import React, { useState } from "react";
import Loading from "../../Utils/Loading";

import SearchLeave from "../Feature/SearchLeave";
import { useAllLeavesData } from "../Hooks/useLeaveData";

const Leaves = () => {
  const { isLoading, isError, error, data } = useAllLeavesData();

  if (isLoading) {
    return (
      <div className="list">
        <Loading count={5} />
      </div>
    );
  }

  if (isError) {
    alert(error.message);
    return;
  }

  //leaves
  const leaves = data?.data?.data;

  //HTML
  return (
    <section className="main-Container">
      <div className="component-container">
        <span className="component-container-header">
          <p className="page-heading">Leaves</p>
        </span>

        <div className="component-container-body">
          <SearchLeave leaves={leaves} key={leaves} />
        </div>
      </div>
    </section>
  );
};

export default Leaves;
