import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../QueryKeys";
import { Hospital, IHospitalPayload } from "../service/HospitalService";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const fetchAllHospital = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.LIST_HOSPITAL],
    queryFn: () => Hospital.fetchAll(),
  });

  return { data, isError, isLoading };
};

export const useCreateHospital = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_HOSPITAL],
    mutationFn: (data: IHospitalPayload) => Hospital.create(data),
    onSuccess: () => {
      toast.dark("Hospital Created Successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIST_HOSPITAL],
      });
    },
    onError: (error: any) => {
      if (error?.response?.data?.length === 0) {
        toast.error("Failed to create Hospital");
      }
    },
  });
};

export const useFetchById = (id: number) => {
  console.log('serviceId',id);
  
  const {data,refetch} = useQuery({
    queryKey:[QueryKeys.GET_HOSPITAL_BY_ID],
    queryFn: () => Hospital.fetchById(id)
  })
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  console.log('responseById',data);

  return {data};
  
}
