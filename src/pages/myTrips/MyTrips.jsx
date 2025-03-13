import { useSelector } from "react-redux"
import useGetAuthUserTrips from "../../hooks/useGetAuthUserTrips"
import { useEffect, useState } from "react";
import MyTripsCard from "./MyTripsCard";
import Loader from "../../components/loader/Loader";
const MyTrips = () => {

    useGetAuthUserTrips()

    const { theme } = useSelector(state => state.theme);
    const userTrips = useSelector(state => state?.user?.userHostedTrips)

    return (
        <div className="min-h-screen h-auto bg-slate-100 flex flex-col justify-center items-center text-black">
            <section className="h-auto w-[100%] max-w-150 flex flex-col gap-5 pt-5 pb-5 items-center">
                {userTrips?.length > 0 ? (userTrips.map((v, i) => {
                    return <MyTripsCard key={i} data={v} />
                })) : (<>No Trips Hosted</>)}
            </section>
        </div>
    )
}
export default MyTrips