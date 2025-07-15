import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../services/axios-client";

export function useSeoMeta() {
  const [meta, setMeta] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/login") return;

    axiosClient.get(`/meta${pathname}`)
      .then(res => setMeta(res.data))
      .catch(() => setMeta(null));
  }, [pathname]);

  return meta;
}
