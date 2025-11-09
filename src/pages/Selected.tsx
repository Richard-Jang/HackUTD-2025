import type { VehicleEntry } from "@/components/types";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default function Selected() {
    const navigate = useNavigate();
    const [selectedVehicle, setSelectedVehicle] = useLocalStorage<VehicleEntry | null>("vehicle", null);
    
    if (!selectedVehicle) {
        navigate("/");
        return <></>
    }

    return (
        <>
        <div className="w-full">

        </div>
        </>
    )
}