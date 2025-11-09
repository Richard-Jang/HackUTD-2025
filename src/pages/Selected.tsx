import type { VehicleEntry } from "@/components/types";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Selected() {
    const navigate = useNavigate();
    const [selectedVehicle] = useLocalStorage<VehicleEntry[]>("vehicle", []);
    const [costArray, setCostArray] = useState<number[][][]>(Array.from({ length: selectedVehicle.length }, () => [[], []]));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    if (!selectedVehicle) {
        navigate("/");
        return <></>
    }

    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

    async function handleGenerateFilters(): Promise<number[][][]> {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: selectedVehicle.toString() + "\nGenerate standard leasing prices for the specified vehicle in the format [cost, cost, cost, cost] for the cost per month for 12, 24, 36, 48 months of the vehicle. Then, generate standard finance prices for the vehicle 12 to 96 months in the same format. if not given, assume credit score of 750 and an average apr rate. DO NOT include any extra text or explanations. response should follow the exact formatting lease: [cost, cost, cost, cost] finance: [cost, cost, cost, cost, cost, cost, cost, cost] - lease: [cost, cost, cost, cost] finance: [cost, cost, cost, cost, cost, cost, cost, cost]"
        });
        let leaseArray: number[][][] = [];
        if (!response.text) return leaseArray;
        for (let i = 0; i < response.text?.split(" - ").length; i++) {
            leaseArray.push([]);
            const leaseString = response.text?.split(" - ")[i].substring(response.text.indexOf("lease: [") + "lease: [".length, response.text.indexOf("]")).split(", ");
            leaseArray[i].push([]);
            leaseString?.forEach(value => {
                leaseArray[i][0].push(parseInt(value));
            });
            const financeString = response.text?.split(" - ")[i].substring(response.text.indexOf("finance: [") + "finance: [".length, response.text.length - 1).split(", ");
            leaseArray[i].push([]);
            console.log(response.text?.split(" - ")[i].substring(response.text.indexOf("finance: [") + "finance: [".length, response.text.length - 1))
            financeString?.forEach(value => {
                console.log(value);
                leaseArray[i][1].push(parseInt(value));
            });
        }
        console.log(leaseArray);
        return leaseArray;
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const temp = await handleGenerateFilters();
            setCostArray(temp);
            setIsLoading(false);
        })();
    }, []);

    return (
        <>
        <div className="w-full flex flex-col gap-5 p-8">
            {selectedVehicle.map((value, index) => {
                return (
                    <>
                    <div className="w-full flex flex-col items-center justify-center gap-3" key={`Vehicle compare ${index}`}>
                        <div className="w-full text-start text-2xl font-bold border-b-1 border-gray-300">{value.name}{" "}{value.year}{" for "}{value.price}</div>
                        <img
                            className={`rounded-lg aspect-auto w-1/3`}
                            src={value.vehicleImage}
                        />
                    </div>
                    {isLoading ? <div className="flex items-center justify-center h-full">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    : <></>}
                    <div className={`${isLoading ? "hidden" : ""} flex flex-col gap-3`}>
                        <div className="font-bold text-2xl">Lease</div>
                        <div className="grid grid-cols-6">
                            <div className="border border-gray-300 p-3 col-span-2 font-bold">Term length (months)</div>
                            <div className="border border-gray-300 p-3">12</div>
                            <div className="border border-gray-300 p-3">24</div>
                            <div className="border border-gray-300 p-3">36</div>
                            <div className="border border-gray-300 p-3">48</div>
                            <div className="border border-gray-300 p-3 col-span-2 font-bold">Cost per month</div>
                            {costArray[index]?.[0]?.map((value, i) => {
                                return (
                                    <div key={`Car ${i}`} className={`border border-gray-300 p-3`}>
                                        ${value}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    
                    <div className={`${isLoading ? "hidden" : ""} flex flex-col gap-3`}>
                        <div className="font-bold text-2xl">Finance</div>
                        <div className="grid grid-cols-10 overflow-x-auto">
                            <div className="border border-gray-300 p-3 col-span-2 font-bold">Term length (months)</div>
                            <div className="border border-gray-300 p-3">12</div>
                            <div className="border border-gray-300 p-3">24</div>
                            <div className="border border-gray-300 p-3">36</div>
                            <div className="border border-gray-300 p-3">48</div>
                            <div className="border border-gray-300 p-3">60</div>
                            <div className="border border-gray-300 p-3">72</div>
                            <div className="border border-gray-300 p-3">84</div>
                            <div className="border border-gray-300 p-3">96</div>
                            <div className="border border-gray-300 p-3 col-span-2 font-bold">Cost per month</div>
                            {costArray[index]?.[1]?.map((value, index) => {
                                return (
                                    <div key={`Car ${index}`} className={`border border-gray-300 p-3`}>
                                        ${value}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
               </>
                )
            })}
       </div>
        </>
    )
}