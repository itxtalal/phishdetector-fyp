import React, { useRef, useState } from "react";

const useSearch = (records) => {
  const [filteredRecords, setFilteredRecords] = useState();
  const [error, setError] = useState();
  const searchRef = useRef();

  const handleSearch = async (e) => {
    // searchRef.current = e.target.value;
    e.preventDefault();
    console.log(searchRef.current.value);

    try {
      const fetchedRecord = await fetch(
        `https://localhost:8000/?search=${searchRef.current.value}`
      );
      setFilteredRecords(fetchedRecord);
    } catch (error) {
      setError("There was an error searching the database");
    }
    // setFilteredRecords(
    //   records.filter((record) =>
    //     record.domain
    //       .toLowerCase()
    //       .includes(e.target.value.toLowerCase().trim())
    //   )
    // );
  };

  return { filteredRecords, handleSearch, searchRef, error };
};

export default useSearch;
