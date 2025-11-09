import type { VehicleEntry } from "@/components/types"
import vehicleData from "@/assets/data.json"

import { useEffect, useState } from "react"
import Carousel from "@/components/Carousel";

export default function Home() {

    const [data, setData] = useState<VehicleEntry[]>([]);

    useEffect(() => {
        setData(vehicleData);
    }, []);

  return (
    <div className="w-full h-full p-8">
        <Carousel
            data={data.filter((value, index) => index == data.findIndex(v => v.name == value.name)).filter((_, index) => index < 5)}
        />
    </div>
  )
}