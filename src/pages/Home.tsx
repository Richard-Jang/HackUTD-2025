import type { VehicleEntry } from "@/components/types"
import vehicleData from "@/assets/data.json"

import { useEffect, useState } from "react"
import Carousel from "@/components/Carousel";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { FaFilter, FaMessage, FaWandMagicSparkles, FaX } from "react-icons/fa6";
import { GoogleGenAI } from "@google/genai";
import { Link } from "react-router-dom";

export default function Home() {

  const [data] = useState<VehicleEntry[]>(vehicleData);
  const [_, setSelectedVehicle] = useLocalStorage<VehicleEntry | null>("vehicle", data[0]);
  const [search, setSearch] = useState<string>("");
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [year, setYear] = useState<number[]>([0, 3000]);
  const [price, setPrice] = useState<number[]>([0, 200000]);
  const [seats, setSeats] = useState<number[]>([0, 20]);
  const [mpg, setMpg] = useState<number[]>([0, 100]);
  const [type, setType] = useState<string>("");
  const [aiModal, setAIModal] = useState<boolean>(false);
  const [aiText, setAIText] = useState<string>("");

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  function handleYearLower(value: string) {
    if (isNaN(Number(value))) return;
    setYear(prev => [parseInt(value), prev[1]]);
  }
  function handleYearUpper(value: string) {
    if (isNaN(Number(value))) return;
    setYear(prev => [prev[0], parseInt(value)]);
  }
  function handlePriceLower(value: string) {
    if (isNaN(Number(value))) return;
    setPrice(prev => [parseInt(value), prev[1]]);
  }
  function handlePriceUpper(value: string) {
    if (isNaN(Number(value))) return;
    setPrice(prev => [prev[0], parseInt(value)]);
  }
  function handleSeatsLower(value: string) {
    if (isNaN(Number(value))) return;
    setSeats(prev => [parseInt(value), prev[1]]);
  }
  function handleSeatsUpper(value: string) {
    if (isNaN(Number(value))) return;
    setSeats(prev => [prev[0], parseInt(value)]);
  }
  function handleMpgLower(value: string) {
    if (isNaN(Number(value))) return;
    setMpg(prev => [parseInt(value), prev[1]]);
  }
  function handleMpgUpper(value: string) {
    if (isNaN(Number(value))) return;
    setMpg(prev => [prev[0], parseInt(value)]);
  }

  async function handleGenerateFilters() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate filters in the form of [year-year, price-price, seatCount-seatCount, mpg-mpg], exclude any extra text\n\n" + aiText,
    });
    const yearArr = response.text?.replaceAll(" ", "").split(",")[0];
    const priceArr = response.text?.replaceAll(" ", "").split(",")[1];
    const seatsArr = response.text?.replaceAll(" ", "").split(",")[2];
    const mpgArr = response.text?.replaceAll(" ", "").split(",")[3];
    setYear([parseInt(yearArr ? yearArr[0] : ""), parseInt(yearArr ? yearArr[1] : "")]);
    setPrice([parseInt(priceArr ? priceArr[0] : ""), parseInt(priceArr ? priceArr[1] : "")]);
    setSeats([parseInt(seatsArr ? seatsArr[0] : ""), parseInt(seatsArr ? seatsArr[1] : "")]);
    setMpg([parseInt(mpgArr ? mpgArr[0] : ""), parseInt(mpgArr ? mpgArr[1] : "")]);
    setAIModal(false);
  }

  useEffect(() => {
    setSelectedVehicle(data[0]);
  })

  return (
    <>
    {/* Filter Modal */}
    <div
      className={`${filterModal ? "" : "hidden"} w-full h-screen flex items-center justify-center absolute inset-0 bg-black/30 z-15 transition-opacity duration-300 ${filterModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={() => {setFilterModal(false)}}
    >
      <div
        className="flex flex-col gap-3 bg-white w-1/3 h-3/4 rounded-lg p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="w-full text-xl flex items-center justify-end">
          <FaX
            onClick={() => {setFilterModal(false)}}
            className="transition-all hover:scale-110"
          />
        </div>

        {/* Title */}
        <div className="w-full text-xl flex items-center justify-center font-bold">Filters</div>
        
        {/* Year */}
        <div className="flex items-center justify-evenly gap-8 px-6 py-1">
          <div className="">Year</div>
          <div className="grow gap-2 flex items-center justify-end">
            <input
              id="YearLowerInput"
              value={year[0]}
              onChange={e => handleYearLower(e.target.value)}
              className="w-16 py-1 px-2 rounded-lg border border-gray-300"
            />
            <span>-</span>
            <input
              id="YearUpperInput"
              value={year[1]}
              onChange={e => handleYearUpper(e.target.value)}
              className="w-16 py-1 px-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-evenly gap-8 px-6 py-1">
          <div className="">Price</div>
          <div className="grow gap-2 flex items-center justify-end">
            <input
              id="PriceLowerInput"
              value={price[0]}
              onChange={e => handlePriceLower(e.target.value)}
              className="w-16 py-1 px-2 rounded-lg border border-gray-300"
            />
            <span>-</span>
            <input
              id="PriceUpperInput"
              value={price[1]}
              onChange={e => handlePriceUpper(e.target.value)}
              className="w-16 py-1 px-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>
        {/* Seat Count */}
        <div className="flex items-center justify-evenly gap-8 px-6 py-1">
          <div className="">Seats</div>
          <div className="grow gap-2 flex items-center justify-end">
            <input
              id="SeatsLowerInput"
              value={seats[0]}
              onChange={e => handleSeatsLower(e.target.value)}
              className="w-16 py-1 px-2 rounded-lg border border-gray-300"
            />
            <span>-</span>
            <input
              id="SeatsUpperInput"
              value={seats[1]}
              onChange={e => handleSeatsUpper(e.target.value)}
              className="w-16 py-1 px-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>
        {/* MPG */}
        <div className="flex items-center justify-evenly gap-8 px-6 py-1">
          <div className="">MPG</div>
          <div className="grow gap-2 flex items-center justify-end">
            <input
              id="MpgLowerInput"
              value={mpg[0]}
              onChange={e => handleMpgLower(e.target.value)}
              className="w-16 py-1 px-2 rounded-lg border border-gray-300"
            />
            <span>-</span>
            <input
              id="MpgUpperInput"
              value={mpg[1]}
              onChange={e => handleMpgUpper(e.target.value)}
              className="w-16 py-1 px-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>
        {/* Type */}
        <div className="flex items-center justify-evenly gap-4 px-6 py-1">
          <div className="">Type</div>
          <div className="gap-2 flex items-center justify-between">
            <input
              id="TypeInput"
              value={type}
              onChange={e => setType(e.target.value)}
              className="grow py-1 px-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>

    {/* AI Modal */}
    <div
      className={`${aiModal ? "" : "hidden"} w-full h-screen flex items-center justify-center absolute inset-0 bg-black/30 z-15 transition-opacity duration-300 ${aiModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={() => {setAIModal(false)}}
    >
      <div
        className="flex flex-col gap-3 bg-white w-1/2 h-3/4 rounded-lg p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="w-full text-xl flex items-center justify-end">
          <FaX
            onClick={() => {setAIModal(false)}}
            className="transition-all hover:scale-110"
          />
        </div>

        {/* Title */}
        <div className="w-full text-xl flex items-center justify-center font-bold">AI Filters</div>
        {/* Text area */}
        <textarea
          className="w-full grow p-6 border border-gray-300 rounded-lg"
          placeholder="Describe your dream car"
          onChange={(e) => setAIText(e.target.value)}
        >
        </textarea>
        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 h-12">
          <button
            className="px-4 py-3 h-full rounded-lg border border-gray-300 flex items-center justify-center"
            onClick={() => setAIModal(false)}
          >
            Close
          </button>
          <button
            className={`${aiText.length > 10 ? "bg-black text-white" : ""} h-full transition-all px-4 py-3 gap-3 rounded-lg border border-gray-300 flex items-center justify-center`}
            onClick={handleGenerateFilters}
          >
            <span>Generate </span>
            <FaWandMagicSparkles />
          </button>
        </div>
      </div>
    </div>

    <div className="relative w-full h-full flex flex-col gap-6 p-8">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <div className="font-bold tracking-wide text-3xl">Welcome to Toyota DreamFind</div>
        <div>An AI powered tool to help <span className="italic font-bold">you</span> find your dream car!</div>
      </div>

      {/* Carousel */}
      <Carousel
        data={data.filter((value, index) => index == data.findIndex(v => v.name == value.name)).filter((_, index) => index < 5)}
      />

      {/* All Choices */}
      <div className="w-full flex flex-col gap-6">
        {/* Search and Filters */}
        <div className="w-full flex h-12 items-center justify-center gap-2">
          <input
            id="search"
            value={search}
            onChange={e => (setSearch(e.target.value))}
            className="h-full grow outline-none px-6 py-1 border border-gray-300 rounded-lg"
            placeholder="Search"
            />
          <button
            onClick={() => {setFilterModal(true)}}
            className="h-full aspect-square rounded-lg border border-gray-300 flex items-center justify-center p-3"
          >
            <FaFilter />
          </button>
          <button
            onClick={() => {setAIModal(true)}}
            className="h-full aspect-square rounded-lg border border-gray-300 flex items-center justify-center p-3"
          >
            <FaMessage />
          </button>
        </div>

        {/* Car Grid */}
        <div className="w-3/4 grid grid-cols-3 gap-6">
          {data
            .filter(value => value.name.includes(search))
            .filter(value => parseInt(value.year) >= year[0] && parseInt(value.year) <= year[1])
            .filter(value => parseInt(value.price.replaceAll(",", "").replaceAll("$", "")) >= price[0] && parseInt(value.price.replaceAll(",", "").replaceAll("$", "")) <= price[1])
            .filter(value => parseInt(value.seatCount) >= seats[0] && parseInt(value.seatCount) <= seats[1])
            .filter(value => parseInt(value.combinedMpg) >= mpg[0] && parseInt(value.combinedMpg) <= mpg[1])
            .filter(value => value.vehicleType.includes(type))
            .map((value, index) => {
            return (
              <Link
                key={`Vehicle grid: ${index}`}
                to={"./selected"}
                className="aspect-3/2 px-3 py-2 w-full rounded-lg flex flex-col transition-all hover:scale-110 border border-gray-300"
                onClick={() => {setSelectedVehicle(value)}}
              >
                <img
                  src={value.vehicleImage}
                  className="w-full aspect-auto"
                />
                <div className="w-full grow flex items-end justify-between">
                  <div className="font-bold">{value.name}{" "}{value.year}</div>
                  <div>{value.price}</div>
                </div>
              </Link>
            )
          })}
          <div
          className={`${data
            .filter(value => value.name.includes(search))
            .filter(value => parseInt(value.year) >= year[0] && parseInt(value.year) <= year[1])
            .filter(value => parseInt(value.price.replaceAll(",", "").replaceAll("$", "")) >= price[0] && parseInt(value.price.replaceAll(",", "").replaceAll("$", "")) <= price[1])
            .filter(value => parseInt(value.seatCount) >= seats[0] && parseInt(value.seatCount) <= seats[1])
            .filter(value => parseInt(value.combinedMpg) >= mpg[0] && parseInt(value.combinedMpg) <= mpg[1])
            .filter(value => value.vehicleType.includes(type)).length == 0 ? "" : "hidden"} w-full h-32 flex items-center justify-center font-bold`}
          >
            No vehicles available!
          </div>
        </div>
      </div>
    </div>
    </>
  )
}