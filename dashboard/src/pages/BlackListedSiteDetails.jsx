import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import TableOne from "../components/TableOne";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlackListedSiteDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { id } = useParams();
  
  //TODO: change the url and fetch details
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
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    const response = await fetch(`${BASE_URL}/blacklist`, {
      body: JSON.stringify({ domains: selectedDomains }),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.domains_deleted) {
      toast.success(
        `Successfully removed ${data.domains_deleted} domains from the blacklist`
      );
    }
    await fetchBlackListedSites();
  };
  
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Site Details" />
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

export default BlackListedSiteDetails;
