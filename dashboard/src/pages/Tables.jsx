import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import TableOne from "../components/TableOne";
import TableThree from "../components/TableThree";
import useFetch from "../hooks/useFetch";

const Tables = () => {
  const { error, response, loading } = useFetch(
    "https://642a2247b11efeb75993bc29.mockapi.io/blacklisted",
    "token"
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      {!loading ? (
        <div className="flex flex-col gap-10">
          <TableOne fetchedRecords={response} />
          
          {/* <TableThree /> */}
        </div>
      ) : (
        <div className="flex justify-center mt-50">Loading...</div>
      )}
    </DefaultLayout>
  );
};

export default Tables;
