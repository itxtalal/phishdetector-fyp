import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import TableTwo from "../components/TableTwo";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { error, response, loading, fetchData } = useFetch(
    `${BASE_URL}/whitelist?page=${currentPage}&search=${searchText}&size=10`
  );

  const onPageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleDeleteRecord = async (selectedDomains) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    const response = await fetch(`${BASE_URL}/whitelist`, {
      body: JSON.stringify({ domains: selectedDomains }),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.domains_removed) {
      toast.success(
        `Successfully removed ${data.domains_removed} domains from the whitelist`
      );
    }
    await fetchData();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Whitelisted Sites" />
      {!loading ? (
        <div className="flex flex-col gap-10">
          <TableTwo
            title="Whitelisted"
            fetchedRecords={response}
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

export default Tables;
