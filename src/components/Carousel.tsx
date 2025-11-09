import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { VehicleEntry } from "./types";

export default function Carousel({
    data,
}: {
    data: VehicleEntry[];
}) {
    if (data.length == 0) return <></>;

    const [current, setCurrent] = useState<number>(0);
    const newData = [data[data.length - 1], ...data, data[0]];
    
    const prevSlide = () => setCurrent((current - 1 + data.length) % data.length);
    const nextSlide = () => setCurrent((current + 1) % data.length);

    
    return (
    <div className="relative w-full mx-auto overflow-hidden rounded-2xl">
        {/* Slides */}
        <div
            className="w-full flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 1 / 3 * 100}%)` }}
        >
            {newData.map((value, index) => {
                return <div
                    className="w-1/3 flex-shrink-0 object-cover"
                    style={{ transform: `translateY(${index == current ? "20" : "0"}%)` }}
                >
                    <img
                        key={`Slide ${index}`}
                        src={value.vehicleImage}
                        alt={`Slide ${index}`}
                        className="w-full"
                    />
                    <div className="w-full py-2 flex items-center justify-center text-lg font-bold">{value.name}</div>
                </div>
            })}
        </div>

        {/* Left Arrow */}
        <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 transition-all bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
            <FaChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 transition-all bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
            <FaChevronRight />
        </button>
    </div>
  );
}
