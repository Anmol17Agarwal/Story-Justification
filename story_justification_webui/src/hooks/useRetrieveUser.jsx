import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { V1 } from "../config";
import { api } from "../services/axios";
import { getUser, setUser } from "../state/user";

export default function useRetrieveUser() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const retrieveUser = async () => {
      setLoading(true);
      try {
        const options = { cancelToken: source.token };
        const response = await api.get(V1.ACCOUNT_DETAIL, options);
        const data = await response.data;
        dispatch(setUser(data));
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled", err.message);
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    retrieveUser();

    return () => {
      source.cancel("Operation cancelled by the user.");
    };
  }, [dispatch]);

  return [user, loading];
}
