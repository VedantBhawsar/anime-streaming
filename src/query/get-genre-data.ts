import { GET_GENRES_DATA } from "@/constants/query-keys";
import { api } from "@/lib/api";
import { useQuery } from "react-query";

export const getGenreData = async (value: string) => {
  const res = await api.get(`/anime/genres/${value || "action"}`);
  return res.data.results as any;
};

export const useGetGenreData = (value: string) => {
  return useQuery({
    queryFn: () => getGenreData(value),
    queryKey: [GET_GENRES_DATA],
    refetchOnWindowFocus: false,
  });
};
