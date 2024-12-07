import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { Doctor, IDoctors } from "./DoctorsService";
import { toast } from "react-toastify";

export const useDoctorList = () => {
  const { data } = useQuery({
    queryKey: [QueryKeys.LIST_DOCTOR],
    queryFn: () => Doctor.fetchAll(),
  });

  return { data };
};

export const useDoctorId = (id: string) => {
  const { data } = useQuery({
    queryKey: [QueryKeys.GET_DOCTOR_BY_ID],
    queryFn: () => Doctor.fetchId(id),
  });
  return { data };
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_HOSPITAL],
    mutationFn: (data: IDoctors) => Doctor.create(data),
    onSuccess: () => {
      toast.dark("Doctor Created Successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIST_DOCTOR],
      });
    },
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_DOCTOR],
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      Doctor.update(id, data),
    onSuccess: () => {
      toast.dark("Updated Successfully"),
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.LIST_DOCTOR],
        });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.DELETE_DOCTOR_BY_ID],
    mutationFn: (id: string) => Doctor.delete(id),
    onSuccess: () => {
      toast.dark("Deleted Successfully"),
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.LIST_DOCTOR],
        });
    },
  });
};
