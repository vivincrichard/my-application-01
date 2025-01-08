import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { IStaff, Staff } from "./staffService";

export const useStaffList = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QueryKeys.LIST_STAFF],
    queryFn: () => Staff.fetchAll(),
  });
  return { data, isLoading, isFetching };
};

export const useStaffCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_STAFF],
    mutationFn: (payload: IStaff) => Staff.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CREATE_STAFF],
      });
    },
  });
};
