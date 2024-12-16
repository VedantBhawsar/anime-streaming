import { GET_HOME_PAGE_DATA } from "@/constants/query-keys";
import { api } from "@/lib/api";
import { useQuery } from "react-query";

export const getHomePageData = async () => {
  const res = await api.get("/anime/home");
  return res.data as any;
};

export const useGetHomePageData = () => {
  return useQuery({
    queryFn: getHomePageData,
    queryKey: [GET_HOME_PAGE_DATA],
    refetchOnWindowFocus: false,
  });
};
