import BrandOne from "../images/brand/brand-01.svg";
import BrandTwo from "../images/brand/brand-02.svg";
import BrandThree from "../images/brand/brand-03.svg";
import BrandFour from "../images/brand/brand-04.svg";
import BrandFive from "../images/brand/brand-05.svg";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import SearchLogo from "/src/assets/search-solid.svg";
import useSearch from "../hooks/useSearch";
import TableRow from "./TableRow";
import useFetch from "../hooks/useFetch";
import { highlight } from "../utils/helperFunctions";

import SearchSolid from "/src/images/icon/search-solid.svg";

const TableOne = ({ fetchedRecords }) => {
  const [records, setRecords] = useState(fetchedRecords);

  const { filteredRecords, handleSearch, searchRef } = useSearch(records);

  const recordsMap = filteredRecords || records;

  // useEffect(()=>{
  //   setRecords()
  // }, [fetchedRecords])

  return (
    <div className="bg-gray-50 h-screen w-full ">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-50 h-screen w-full ">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col">
              <div className="my-2.5 flex flex-grow flex-wrap justify-between rounded-lg bg-white px-2.5 py-2.5 shadow">
                <div className="relative mr-auto flex items-center py-2">
                  <input
                    className="border-gray-200 bg-gray-100 text-gray-700 focus:border-gray-400 w-full rounded-lg border py-1 px-3 text-sm opacity-60 focus:outline-none"
                    id="search-project"
                    name="search-project"
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search"
                  />
                  <img
                    src={SearchSolid}
                    alt=""
                    width={12}
                    className="absolute right-3"
                  />
                </div>
                <h1 className="font-bolder text-gray-900 mr-auto flex -translate-x-22 items-center text-center text-3xl leading-tight ">
                  Blacklisted
                </h1>
              </div>
              <div className="flex h-96 justify-center overflow-auto bg-white shadow">
                {records?.length ? (
                  <div className="border-gray-200 inline-block h-fit w-full overflow-x-auto border-b align-middle sm:rounded-lg">
                    <table className="w-full min-w-full">
                      <thead>
                        <tr className="border-gray-200 text-gray-500 border-b bg-white text-xs uppercase leading-4 tracking-wider">
                          <th className="px-6 py-3 text-left font-medium">
                            Name
                          </th>
                        </tr>
                      </thead>
                      <tbody className="overflow-auto bg-white">
                        {recordsMap.map((item) => (
                          <tr className="bg-white">
                            <td className="whitespace-no-wrap border-gray-100 border-b px-6 py-2">
                              <div className="text-blue-500 text-sm leading-5">
                                {highlight({
                                  search: searchRef.current,
                                  children: item.domain,
                                })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <>
                    <div
                      className="bg-red-100 border-red-500 text-red-700 mb-auto mt-20 flex flex-1 flex-col items-center border-t border-b px-4 py-3"
                      role="alert"
                    >
                      <p className="font-bold">No sites found</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
