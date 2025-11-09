import type { VehicleEntry } from "@/components/types";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from "react-router-dom";

export default function Selected() {
    const navigate = useNavigate();
    const [selectedVehicle, setSelectedVehicle] = useLocalStorage<VehicleEntry | null>("vehicle", null);
    
    if (!selectedVehicle) {
        navigate("/");
        return <></>
    }

    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

    async function handleGenerateFilters() {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: ""
        });
    }

    return (
        <>
        <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <div className="font-bold text-2xl">Lease</div>
                <div className="grid grid-cols-6">
                    <div className="border border-gray-300 p-3 col-span-2 font-bold">Term length (months)</div>
                    <div className="border border-gray-300 p-3">12</div>
                    <div className="border border-gray-300 p-3">24</div>
                    <div className="border border-gray-300 p-3">36</div>
                    <div className="border border-gray-300 p-3">48</div>
                    <div className="border border-gray-300 p-3 col-span-2 font-bold">Cost per month</div>
                    <div className="border border-gray-300 p-3">12</div>
                    <div className="border border-gray-300 p-3">24</div>
                    <div className="border border-gray-300 p-3">36</div>
                    <div className="border border-gray-300 p-3">48</div>
                </div>
            </div>
        </div>
        </>
    )
}