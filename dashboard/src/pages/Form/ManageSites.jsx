import { toast } from "react-toastify";
import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { BASE_URL } from "../../config";

const ManageSites = () => {
  const [whitelist, setWhitelist] = useState("");
  const [blacklist, setBlacklist] = useState("");

  const handleWhitelist = async () => {
    const response = await fetch(`${BASE_URL}/whitelist`, {
      body: JSON.stringify({ domains: [whitelist] }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      toast.success("Successfully added to whitelist");
    } else {
      toast.error("failed to add to whitelist");
    }
  };
  const handleBlacklist = async () => {
    const response = await fetch(`${BASE_URL}/blacklist`, {
      body: JSON.stringify({ domains: [blacklist] }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      toast.success("Successfully added to blacklist");
    } else {
      toast.error("failed to add to blacklist");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Sites" />

      <div className="grid grid-cols-1 gap-9 px-[25%] sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Manage Sites
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Add to Black List
                </label>
                <input
                  type="text"
                  name="domain"
                  placeholder="Type Sites to Blacklist"
                  onChange={(e) => setBlacklist(e.target.value)}
                  value={blacklist}
                  className={`mb-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                />
                <button
                  className="ml-auto flex items-center justify-center rounded-md bg-primary px-3 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={handleBlacklist}
                >
                  Add to Blacklist
                </button>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Add to White List
                </label>
                <input
                  type="text"
                  name="domain"
                  placeholder="Type Sites to Whitelist"
                  onChange={(e) => setWhitelist(e.target.value)}
                  value={whitelist}
                  className={`mb-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                />
                <button
                  className="ml-auto flex items-center justify-center rounded-md bg-primary px-3 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={handleWhitelist}
                >
                  Add to Whitelist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ManageSites;
