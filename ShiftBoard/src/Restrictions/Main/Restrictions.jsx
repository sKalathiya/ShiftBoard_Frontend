import React from "react";
import Loading from "../../Utils/Loading";

import { useAllRestrictionsData } from "../Hooks/useRestrictionData";
import SearchRestriction from "../Feature/SearchRestriction";

const Restrictions = () => {
  const { isLoading, isError, error, data } = useAllRestrictionsData();

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
  const restrictions = data?.data?.data;
  const keys = [];
  restrictions.map((l) => {
    keys.push(l.state);
    return;
  });
  return (
    <section className="main-Container">
      <div className="component-container">
        <span className="component-container-header">
          <p className="page-heading">Restrictions</p>
        </span>

        <div className="component-container-body">
          <SearchRestriction restrictions={restrictions} key={keys} />
        </div>
      </div>
    </section>
  );
};

export default Restrictions;
