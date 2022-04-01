import { useCallback, useState } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_MOCK_API;

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (config, loading, func) => {
    if (loading) setIsLoading(true);

    try {
      const res = await axios[config.method](
        URL + config.url,
        config.data || {}
      );
      const data = res.data;
      console.log(res.data);
      if (loading) setIsLoading(false);
      if (func) func(data);
    } catch (e) {
      if (loading) setIsLoading(false);
      console.log(e);
      alert(e);
    }
  }, []);

  return {
    sendRequest,
    isLoading,
  };
};

export default useHttp;
