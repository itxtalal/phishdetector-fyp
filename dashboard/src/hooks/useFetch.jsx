import React, { useEffect, useState } from "react";

const useFetch = (url, token) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchJSON(body) {
    const reader = body.getReader();
    let chunks = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks += new TextDecoder().decode(value);
    }
    const json = JSON.parse(chunks);
    return json;
  }

  const fetchData = async () => {
    let config = {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    };

    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();

      setResponse(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return { response, error, loading };
};

export default useFetch;
