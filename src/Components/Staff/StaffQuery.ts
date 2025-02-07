import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { Departments, IStaff, StaffService } from "./StaffService";

export const useStaffList = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QueryKeys.LIST_STAFF],
    queryFn: () => StaffService.fetchAll(),
  });
  return { data, isLoading, isFetching };
};

export const useStaffCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_STAFF],
    mutationFn: (payload: IStaff) => StaffService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIST_STAFF],
      });
    },
  });
};

export const useDepartments = () => {
  const { data } = useQuery({
    queryKey: [QueryKeys.LIST_DEPARTMENTS],
    queryFn: () => Departments.listDepartments(),
  });
  return { data };
};
