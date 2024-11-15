import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../QueryKeys"
import { Hospital } from "../service/HospitalService"



export const fetchAllHospital = () => {
    const {data,isLoading,isError} = useQuery({
        queryKey: [QueryKeys.LIST_HOSPITAL],
        queryFn: () => Hospital.fetchAll()
    })

    return {data,isError,isLoading}
}