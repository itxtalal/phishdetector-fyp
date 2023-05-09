import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import TableOne from "../components/TableOne";
import useFetch from "../hooks/useFetch";
import { deleteItem } from "../utils/helperFunctions";
import { BASE_URL } from "../config";

const BlackListedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  //Add the currentpage in the url and onchange it will fetch the new records
  const {
    error,
    response: blacklistedSites,
    loading,
    fetchData: fetchBlackListedSites,
  } = useFetch(
    `${BASE_URL}/blacklist?page=${currentPage}&search=${searchText}`
  );

  const onPageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleDeleteRecord = async (recordIds) => {
    console.log("Selected Item Deleted with following ids");
    console.log(recordIds);
    const config = {
      url: "http://localhost:4000/blacklist/",
      paramsId: recordIds,
    };
    await deleteItem(config);
    await fetchBlackListedSites();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blacklisted Sites" />
      {!loading ? (
        <div className="flex flex-col gap-10">
          <TableOne
            title="Blacklisted"
            fetchedRecords={blacklistedSites}
            currentPage={currentPage}
            onPageChange={onPageChange}
            handleDeleteRecord={handleDeleteRecord}
            onSearch={setSearchText}
          />

          {/* <TableThree /> */}
        </div>
      ) : (
        <div className="mt-50 flex justify-center">Loading...</div>
      )}
    </DefaultLayout>
  );
};

export default BlackListedTable;
