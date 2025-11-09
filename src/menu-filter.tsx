import React, { useState, useMemo, ChangeEvent } from "react";

const FILTER_DATA = {
  // year of car (user can pick from 2015 onwards).
  years: [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2,
    2022,
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015
  ],
  makes: ["Toyota"],
  models: ["Camry", "Corolla", "Corolla Hybrid", "Camry Hybrid", "Crown", "Prius",
          "RAV4", "RAV4 Hybrid", "Highlander", "Highlander Hybrid", 
            
          "Highlander", "Tacoma", "Tundra", "Sienna", ],
  colors: ["White", "Black", "Silver", "Red", "Blue", "Gray", "Green"],
};

// price range constants.
const MIN_PRICE_RANGE = 2000;
const MAX_PRICE_RANGE = 70000;

// money translator (in USD).
function currency(value: number): string {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// --- Main Component ---
function App() {
  // --- Filter States ---
  const [selectedYear, setSelectedYear] = useState <string> ("");
  const [selectedMake, setSelectedMake] = useState <string> ("");
  const [selectedModel, setSelectedModel] = useState <string> ("");
  const [selectedColor, setSelectedColor] = useState <string> ("");
  const [maxMileage, setMaxMileage] = useState <number | null> (null);
  const [maxPrice, setMaxPrice] = useState <number> (MAX_PRICE_RANGE);
  const [isLease, setIsLease] = useState <boolean> (false);

  // --- Handlers ---
  const handleStringChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value); 
    };

  type NumberSetter =
    | React.Dispatch<React.SetStateAction<number | null>>
    | React.Dispatch<React.SetStateAction<number>>;

  const handleNumberChange =
    (setter: NumberSetter) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const numValue = parseInt(value, 10);

      if (isNaN(numValue)) {
        if (setter === setMaxMileage) {
          (setter as React.Dispatch<React.SetStateAction<number | null>>)(null);
        }
      } else {
        (setter as React.Dispatch<React.SetStateAction<number>>)(numValue);
      }
    };

  // --- Computed Filter Summary ---
  const filterSummary = useMemo(() => {
    const filters: { label: string; value: string }[] = [];

    filters.push({
      label: "Purchase Type",
      value: isLease ? "Lease" : "Finance / Buy",
    });

    filters.push({
      label: "Max Price",
      value: `Up to ${currency(maxPrice)}`,
    });

    filters.push({
      label: "Make",
      value: selectedMake || "Any",
    });

    if (selectedModel) filters.push({ label: "Model", value: selectedModel });
    if (selectedYear) filters.push({ label: "Year", value: selectedYear });
    if (selectedColor) filters.push({ label: "Color", value: selectedColor });

    if (maxMileage !== null && maxMileage > 0) {
      filters.push({
        label: "Max Mileage",
        value: `${new Intl.NumberFormat().format(maxMileage)} miles`,
      });
    }

    // car count logic
    let carCount = 500;
    if (selectedYear) carCount = Math.max(10, carCount / 1.2);
    if (selectedModel) carCount = Math.max(5, carCount / 2);
    if (selectedColor) carCount = Math.max(2, carCount / 1.5);
    if (isLease) carCount = Math.max(1, carCount / 1.1);

    return {
      details: filters,
      carCount: Math.floor(carCount),
    };
  }, [
    selectedYear,
    selectedMake,
    selectedModel,
    selectedColor,
    maxMileage,
    maxPrice,
    isLease,
  ]);

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
        {/* Header */}
        <header className="pb-6 border-b border-gray-200 mb-6">
          <h1 className="text-3xl font-extrabold text-blue-800 flex items-center mb-1">
            <svg
              className="w-8 h-8 mr-3 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
          </h1>
        </header>

        {/* Filter Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-700">Vehicle Filters</h2>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Year */}
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={handleStringChange(setSelectedYear)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                <option value="">Any Year</option>
                {FILTER_DATA.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Make */}
            <div>
              <label
                htmlFor="make"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Make
              </label>
              <select
                id="make"
                value={selectedMake}
                onChange={handleStringChange(setSelectedMake)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                disabled
              >
                {FILTER_DATA.makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Model
              </label>
              <select
                id="model"
                value={selectedModel}
                onChange={handleStringChange(setSelectedModel)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                <option value="">Any Model</option>
                {FILTER_DATA.models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Color
              </label>
              <select
                id="color"
                value={selectedColor}
                onChange={handleStringChange(setSelectedColor)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                <option value="">Any Color</option>
                {FILTER_DATA.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Mileage */}
            <div>
              <label
                htmlFor="mileage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Max Mileage (Miles)
              </label>
              <input
                id="mileage"
                type="number"
                min="0"
                value={maxMileage === null ? "" : maxMileage}
                onChange={handleNumberChange(setMaxMileage as NumberSetter)}
                placeholder="e.g., 50,000"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
          </div>

          {/* Price + Purchase Type */}
          <div className="space-y-6 md:space-y-0 md:flex md:space-x-8">
            {/* Max Price */}
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Maximum Price:
                <span className="text-blue-600 font-extrabold ml-2">
                  {currency(maxPrice)}
                </span>
              </label>

              <div className="flex items-center space-x-4">
                <span className="text-gray-500 text-sm">
                  {currency(MIN_PRICE_RANGE)}
                </span>
                <input
                  id="max-price"
                  type="range"
                  min={MIN_PRICE_RANGE}
                  max={MAX_PRICE_RANGE}
                  step={2000}
                  value={maxPrice}
                  onChange={handleNumberChange(setMaxPrice)}
                  className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-red-600 [&::-moz-range-thumb]:bg-red-600"
                />
                <span className="text-gray-500 text-sm">
                  {currency(MAX_PRICE_RANGE)}
                </span>
              </div>
            </div>

            {/* Purchase Type Toggle */}
            <div className="md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Type
              </label>
              <div className="flex bg-gray-200 rounded-lg p-1.5">
                <button
                  onClick={() => setIsLease(false)}
                  type="button"
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                    !isLease
                      ? "bg-white text-blue-700 shadow-md"
                      : "text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  Finance / Buy
                </button>
                <button
                  onClick={() => setIsLease(true)}
                  type="button"
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                    isLease
                      ? "bg-white text-blue-700 shadow-md"
                      : "text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  Lease
                </button>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="button"
              className="w-full py-3 bg-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-700 transition duration-200 transform hover:scale-[1.01] active:scale-95"
            >
              Search {filterSummary.carCount} Vehicles
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-700 mb-3">
            Applied Filters
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filterSummary.details.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 p-3 rounded-lg border border-blue-200"
              >
                <p className="text-xs font-medium text-blue-700">
                  {item.label}
                </p>
                <p className="text-md font-semibold text-gray-800">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
