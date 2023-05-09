import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import TableOne from "../components/TableOne";
import TableThree from "../components/TableThree";
import useFetch from "../hooks/useFetch";
import { deleteItem } from "../utils/helperFunctions";

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  //Add the currentpage in the url and onchange it will fetch the new records
  const { error, response, loading, fetchData } = useFetch(
    "https://642a2247b11efeb75993bc29.mockapi.io/whitelisted",
    "token"
  );

  const onPageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleDeleteRecord = async (recordIds) => {
    //TODO: change the url
    console.log("Selected Item Deleted with following ids");
    console.log(recordIds);
    const config = {
      url: "http://localhost:4000/project/",
      // token: state.token,
      paramsId: recordIds,
    };
    await deleteItem(config);
    await fetchData();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Whitelisted Sites" />
      {!loading ? (
        <div className="flex flex-col gap-10">
          <TableOne
            title="Whitelisted"
            fetchedRecords={response}
            currentPage={currentPage}
            onPageChange={onPageChange}
            handleDeleteRecord={handleDeleteRecord}
          />

          {/* <TableThree /> */}
        </div>
      ) : (
        <div className="mt-50 flex justify-center">Loading...</div>
      )}
    </DefaultLayout>
  );
};

export default Tables;
