import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import TableOne from "../components/TableOne";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import axios from "axios";

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

  const handleDeleteRecord = async (selectedDomains) => {
    const response = await fetch(`${BASE_URL}/blacklist`, {
      body: JSON.stringify({ domains: selectedDomains }),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.blacklist_deleted) {
      toast.success(
        `Successfully removed ${data.blacklist_deleted} URLs for the selected domains`
      );
    }
    if (data.detections_deleted) {
      toast.success(
        `Successfully removed ${data.detections_deleted} detections from the database`
      );
    }
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
