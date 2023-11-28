import axios from "axios";
import { useEffect, useState } from "react";
// const CONTEXT_KEY = "59824745a3126805a";
// const API_KEY = "AIzaSyCK9VkNmSiSUu-s9VUaH9VIBnIbqISjlqQ";

function useGoogleSearch(term) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "https://aymanemalih-qdrant-flask.hf.space/chat",
        {
          messages: [{ role: "user", content: term }],
        }
      );

      console.log("resulats:", response.data);
      setData(response.data);
    };
    fetchData();
  }, [term]);

  return { data };
}

export default useGoogleSearch;
