import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css";
const Map = ({ data }) => {
    return (

        <div className="h-full w-full flex justify-center items-center p-1">
            <MapContainer center={[data.latitude, data.longitude]} zoom={13} style={{ height: "70%", width: "100%", borderRadius: "10px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[data.latitude, data.longitude]}>
                    <Popup></Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
export default Map