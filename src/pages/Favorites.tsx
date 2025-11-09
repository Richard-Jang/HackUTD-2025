import ModelCard from "@/components/ModelCard";
import Search from "@/components/Search";
import { useMemo, useState } from "react";

const favoritesList = [
  { name: "Mewo", image: "", favorite: true, handleLike: () => {} },
  { name: "Ball", image: "", favorite: true, handleLike: () => {} },
  { name: "Car", image: "", favorite: true, handleLike: () => {} },
  { name: "Apple", image: "", favorite: true, handleLike: () => {} },
];

function sortFavorites(sortMethod: string) {
  const displayList = [...favoritesList];

  if (sortMethod === "Alphabetical") {
    return displayList.sort((first, second) => first.name.localeCompare(second.name));
  }

  return displayList;
}

export default function Favorites() {
  const [sortBy, setSortBy] = useState<string>("Alphabetical");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const sortedFavorites = useMemo(() => {
    var list = sortFavorites(sortBy);
    if (searchQuery)  {
      const query = searchQuery.trim().toLowerCase();
      list = list.filter((item) => item.name.toLowerCase().includes(query));
    }
    return list
  }, [sortBy, searchQuery]);

  return (
    <div className="w-full h-full text-black bg-white">
      <div className="w-full p-3 border border-zinc-600 shadow-md">

        <div className="inline-block text-3xl py-3 font-bold">Favorites</div>
        <div className="inline-block ml-10">Sort by:
          <select className="ml-2 p-2 border bg-white border-zinc-600 rounded" onChange={(e) => setSortBy(e.target.value)}>
            <option value="Date">Date Added</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>
        <div className="float-right">
          <Search 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search favorites" 
          />
        </div>

      </div>

      <div className="w-full grid grid-cols-3 gap-4 py-5 px-4">
          {sortedFavorites.map((f) => (
            <ModelCard
              name={f.name}
              image={f.image}
              favorite={f.favorite}
              handleLike={() => {}}
            />
          ))}
      </div>
    </div>
  )
}