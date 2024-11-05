import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../QueryKeys";
import { IUserPayload, User } from "../service/PDetailService";
import { toast } from "react-toastify";
import { useEffect } from "react";


export const listAllUser = async() => {
  const {data,isLoading,isError} =   useQuery({
    queryKey: [QueryKeys.LIST_USER],
    queryFn: () => User.fetchAllUser()
  })

  return {data,isLoading,isError}
}

export const UserById = (id: number | null) => {
  const {data,isLoading,refetch} = useQuery({
    queryKey: [QueryKeys.GET_USER,`ID-${id}`],
    queryFn: () => User.fetchUserById(id),
    enabled: false,
  })

  useEffect(()=>{
    if(id){
      refetch();
    }
  },[id])

  return {data,isLoading}
}

export const createUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_USER],
    mutationFn: (data: IUserPayload) => User.create(data),
    onSuccess: () => {
      toast.dark("User Created Successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIST_USER],
      });
    },
    onError: (error: any) => {
      if (error?.response?.data?.length === 0) {
        toast.error("Failed to create Level");
      }
    },
  });
};

export const updateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_USER],
    mutationFn: ({ id, data }: { id: number; data: IUserPayload }) =>
      User.update(id, data),
    onSuccess: () => {
      toast.dark("User Updated Successfully"),
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.LIST_USER],
        });
    },
    onError: (error: any) => {
      if (error?.response?.data?.length === 0) {
        toast.error("Failed to Update User");
      }
    },
  });
};

export const deleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.DELETE_USER],
    mutationFn: (id: number) => User.delete(id),
    onSuccess: () => {
      toast.dark("User Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIST_USER],
      });
    },
    onError: (error: any) => {
      if (error?.response?.data?.length === 0) {
        toast.error("Failed to Delete User");
      }
    },
  });
};


