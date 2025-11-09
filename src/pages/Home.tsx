import type { VehicleEntry } from "@/components/types"
import vehicleData from "@/assets/data.json"

import { useEffect, useState } from "react"
import Carousel from "@/components/Carousel";
import { useLocalStorage } from "@/utils/useLocalStorage";

export default function Home() {

    const [data, _] = useState<VehicleEntry[]>(vehicleData);
    const [count, setCount] = useLocalStorage<number>("test", 0);

    console.log(parseInt(data[0].price.replaceAll(",", "").replaceAll("$", "")));

  return (
    <div className="w-full h-full p-8">
      {/* <Carousel
          data={data.filter((value, index) => index == data.findIndex(v => v.name == value.name)).filter((_, index) => index < 5)}
      /> */}
      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>
    </div>
  )
}