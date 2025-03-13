import { useEffect } from "react"
import axios from "axios"
import { setExploreTrips } from "../store/slice/tripSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
const useGetAllTrips = () => {
    const {authUser}=useSelector(s=>s.user)

    const dispatch = useDispatch()

    useEffect(() => {

        const getAllTrips = async () => {

            if(!authUser){
                return
            }
            try {
                const res = await axios.get(import.meta.env.VITE_API_URL + "/trip/getAllTrips", {
                    withCredentials:true
                })
                // console.log(res)
                if (res?.data?.trips) {
                    dispatch(setExploreTrips(res.data.trips));
                    // toast.success(res.data.msg)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getAllTrips()

    }, [])
}
export default useGetAllTrips