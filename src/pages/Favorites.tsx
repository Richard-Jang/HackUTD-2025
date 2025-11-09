import ModelCard from "@/components/ModelCard";
import Search from "@/components/Search";
import { useMemo, useState } from "react";
import useFavorites from "@/utils/useFavorites";
import vehicleData from "@/assets/data.json";
import type { VehicleEntry } from "@/components/types";
import { Link } from "react-router-dom";

function makeId(value: { name: string; year?: string }) {
  return `${value.name.replaceAll(" ", "_").toLowerCase()}-${value.year ?? ""}`;
  }

export default function Favorites() {
  const [sortBy, setSortBy] = useState<string>("Date");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [_, setSelectedVehicle] = useState<VehicleEntry | null>(null);
  const vehicles = vehicleData as VehicleEntry[];
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const favoritesList = useMemo(() => {
    const withId = vehicles.map((value) => ({ ...value, id: makeId(value) }));
    let list = withId.filter((value) => favoriteIds.includes(value.id));

    if (sortBy == "Alphabetical") {
      list = list.sort((first, second) => first.name.localeCompare(second.name));
    }

    if (sortBy == "Date") {
      list = list.sort((first, second) => {
        return favoriteIds.indexOf(second.id) - favoriteIds.indexOf(first.id);
      });
    }

    if (searchQuery) {
      const query = searchQuery.trim().toLowerCase();
      list = list.filter((item) => item.name.toLowerCase().includes(query));
    }

    return list;
  }, [vehicles, favoriteIds, sortBy, searchQuery]);

  return (
    <div className="w-full h-full text-black bg-white min-h-[calc(100vh-8rem)] pb-32">
      <div className="w-full p-3 border border-zinc-600 shadow-md">

        <div className="inline-block text-3xl py-3 font-bold">Favorites</div>
        <div className="inline-block ml-10">Sort by:
          <select className="ml-2 p-2 border bg-white border-zinc-600 rounded" onChange={(e) => setSortBy(e.target.value)}>
            <option value="Date">Date Added</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>
        <div className="float-right mr-5">
          <Search 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search" 
          />
        </div>

      </div>

      <div className="w-full grid grid-cols-5 gap-4 py-5 px-4">
          {favoritesList.length == 0 ? (
            <div className="col-span-3 p-8 text-center text-zinc-600">You have no favorites.</div>
          ) : (
            favoritesList.map((f) => (
              <Link
                key={f.id}
                to={"./selected"}
                className="aspect-3/2 px-3 py-2 w-full rounded-lg flex flex-col transition-all hover:scale-110 border border-gray-300"
                onClick={() => {setSelectedVehicle(f)}}
              >
              <ModelCard
                key={f.id}
                name={f.name}
                image={(f as any).vehicleImage || ""}
                favorite={isFavorite(f.id)}
                handleLike={() => toggleFavorite(f.id)}
              />
              </Link>
            )
            )
          )
        }
      </div>
    </div>
  )
}