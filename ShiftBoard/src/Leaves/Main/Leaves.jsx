import React from "react";
import Loading from "../../Utils/Loading";

import { useAllLeavesData } from "../Hooks/useLeaveData";
import SearchLeaves from "../Feature/SearchLeaves";

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
  const keys = [];
  leaves.map((l) => {
    keys.push(l.state);
    return;
  });

  //HTML
  return (
    <section className="main-Container">
      <div className="component-container">
        <span className="component-container-header">
          <p className="page-heading">Leaves</p>
        </span>

        <div className="component-container-body">
          <SearchLeaves leaves={leaves} key={keys} />
        </div>
      </div>
    </section>
  );
};

export default Leaves;
