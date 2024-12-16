import { GET_GENRES } from "@/constants/query-keys";
import { api } from "@/lib/api";
import { useQuery } from "react-query";

export const getGenres = async () => {
  const res = await api.get("/anime/genres");
  return res.data as string[];
};

export const useGetGenres = () => {
  return useQuery({
    queryFn: getGenres,
    queryKey: [GET_GENRES],
    refetchOnWindowFocus: false,
  });
};
