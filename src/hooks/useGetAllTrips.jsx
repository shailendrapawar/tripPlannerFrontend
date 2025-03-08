import { useEffect } from "react"
import axios from "axios"
import { setExploreTrips } from "../store/slice/tripSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-hot-toast"
const useGetAllTrips = () => {
    const dispatch = useDispatch()

    useEffect(() => {

        const getAllTrips = async () => {

            try {
                const res = await axios.get(import.meta.env.VITE_API_URL + "/trip/getAllTrips")
                // console.log(res)
                if (res) {
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