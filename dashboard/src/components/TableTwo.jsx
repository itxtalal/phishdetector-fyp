import React, { useEffect, useState } from "react";
import TrashLogo from "/src/assets/trash-solid.svg";
import { saveAs } from "file-saver";
import Papa from "papaparse";

import SearchSolid from "/src/images/icon/search-solid.svg";
import Pagination from "./Pagination";

const TableOne = ({
  title,
  fetchedRecords,
  onPageChange,
  currentPage,
  handleDeleteRecord,
  onSearch,
}) => {
  const [records, setRecords] = useState(fetchedRecords?.items ?? []);
  const [searchText, setSearchText] = useState("");

  const handleCSV = async () => {
    const csvDataUnparsed = Papa.unparse(records, { header: true });

    const blob = new Blob([csvDataUnparsed], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "mydata.csv");
  };

  const [selectedDomains, setSelectedDomains] = useState([]);

  const handleCheckboxChange = (event, domain_name) => {
    if (event.target.checked) {
      setSelectedDomains([...selectedDomains, domain_name]);
    } else {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain_name));
    }
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="bg-gray-50 h-screen w-full ">
      <div className="mx-auto max-w-7xl ">
        <div className="bg-gray-50 h-screen w-full ">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col">
              <div className="my-2.5 flex flex-grow flex-wrap justify-between rounded-lg bg-white px-2.5 py-2.5 shadow dark:border-strokedark dark:bg-boxdark">
                <div className="relative mr-auto flex items-center py-2">
                  <input
                    className="border-gray-200 bg-gray-100 text-gray-700 focus:border-gray-400 w-full rounded-lg border px-3 py-1 text-sm opacity-60 focus:outline-none"
                    id="search-project"
                    name="search-project"
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <img
                    src={SearchSolid}
                    onClick={handleSearch}
                    alt=""
                    width={12}
                    className="absolute right-3"
                  />
                </div>
                <h1 className="font-bolder text-gray-900 mx-auto flex -translate-x-22 items-center text-center text-3xl leading-tight ">
                  {title}
                </h1>

                <div className="bg-red-500 relative mx-4 flex w-8 items-center">
                  {selectedDomains.length > 0 && (
                    <img
                      src={TrashLogo}
                      alt="trash"
                      width={15}
                      onClick={handleDeleteRecord.bind(null, selectedDomains)}
                      className="inline cursor-pointer opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-75"
                      style={{ transitionDelay: "300ms" }}
                    />
                  )}
                </div>
                <div
                  className="font-sm relative flex w-fit items-center justify-center rounded-md bg-primary px-3 py-2 text-center text-white hover:bg-opacity-90"
                  onClick={handleCSV}
                >
                  <button>Download CSV</button>
                </div>
              </div>
              <div className="flex h-96 justify-center overflow-auto bg-white shadow dark:border-strokedark dark:bg-boxdark">
                {records?.length ? (
                  <div className="border-gray-200 inline-block h-fit w-full overflow-x-auto border-b align-middle sm:rounded-lg">
                    <table className="w-full min-w-full rounded">
                      <thead>
                        <tr className="border-gray-200 text-gray-500 border-b bg-white text-xs uppercase leading-4 tracking-wider dark:border-strokedark dark:bg-boxdark">
                          <th className="px-6 py-3 text-left text-center font-medium">
                            Name
                          </th>
                        </tr>
                      </thead>
                      <tbody className="overflow-auto bg-white">
                        {records ? (
                          records.map((item, index) => (
                            <tr
                              className="bg-white dark:border-strokedark dark:bg-boxdark"
                              key={index}
                            >
                              <td className="whitespace-no-wrap border-gray-100  border-b px-6 py-2 text-center">
                                <label class="custom-label relative flex items-center p-2">
                                  <div class="absolute flex h-4 w-4 -translate-x-1	items-center justify-center rounded border bg-transparent">
                                    <input
                                      type="checkbox"
                                      class="hidden"
                                      checked={selectedDomains.includes(
                                        item.name
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(event, item.name)
                                      }
                                    />
                                    <svg
                                      className={`text-purple pointer-events-none absolute h-4 w-4 ${
                                        selectedDomains.includes(item.name)
                                          ? ""
                                          : "hidden"
                                      }`}
                                      viewBox="0 0 172 172"
                                    >
                                      <g
                                        fill="none"
                                        strokeWidth="none"
                                        strokeLinecap="round"
                                      >
                                        <path d="M0 172V0h172v172z" />
                                        <path
                                          d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                                          fill="currentColor"
                                          strokeWidth="1"
                                        />
                                      </g>
                                    </svg>
                                  </div>
                                  <span class="mx-auto select-none">
                                    {item.name}
                                  </span>
                                </label>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colspan="3" class="col-span-3  p-2 text-center">
                              {error || "Not Found"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <>
                    <div
                      className="bg-red-100 border-red-500 text-red-700 mb-auto mt-20 flex flex-1 flex-col items-center border-b border-t px-4 py-3"
                      role="alert"
                    >
                      <p className="font-bold">No sites found</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Pagination
            totalPages={fetchedRecords?.pages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TableOne;
