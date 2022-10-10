import { useEffect, useState } from "react";
import api from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);
  const reFetch = async () => {
    try {
      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  return {
    data,
    loading,
    error,
    reFetch,
  };
};

export default useFetch;