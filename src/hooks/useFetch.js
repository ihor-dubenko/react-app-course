import { useState } from "react";
import { delayFn } from "../helpers/delayFn.js";

export const useFetch = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchFn = async (arg) => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();
      return await callback(arg);
    } catch(error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return [ fetchFn, isLoading, error ];
}
