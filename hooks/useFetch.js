import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      // "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Key": "30cd62d1d9mshdc84945f1057df0p17b81ajsn9ea65e549943",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
    } catch (error) {
      setError(error);
      alert("Что-то пошло не так!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};
