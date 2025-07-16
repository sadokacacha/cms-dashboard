import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../services/axios-client";

export function useSeoMeta() {
  const [meta, setMeta] = useState(null);
  const { pathname } = useLocation();

useEffect(() => {
  if (pathname === "/login") return;

  axiosClient.get(`/meta?path=${pathname}`)
    .then(res => {
      console.log("Fetched meta:", res.data); // ✅ Log here
      setMeta(res.data);
    })
    .catch(() => setMeta(null));
}, [pathname]);


  return meta;
}
