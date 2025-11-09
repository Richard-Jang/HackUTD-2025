import ModelCard from "@/components/ModelCard";

const favoritesList = [
  { name: "Mewo", image: "", favorite: true, handleLike: () => {} },
  { name: "Ball", image: "", favorite: true, handleLike: () => {} },
  { name: "Car", image: "", favorite: true, handleLike: () => {} },
  { name: "Apple", image: "", favorite: true, handleLike: () => {}},
];  

const sortBy = "Alphabetical";

function sortFavorites() {
  var displayList = [...favoritesList];

  if (sortBy == "Alphabetical") {
    displayList = displayList.sort((first, second) => first.name.localeCompare(second.name));
  }

  return displayList;
}

const sortedFavorites = sortFavorites();

export default function Favorites() {
  return (
    <div className="w-full h-full text-white bg-black">
      <div className="w-full p-3 border border-zinc-600 shadow-md">

        <div className="inline-block text-3xl py-3 font-bold">Favorites</div>

        <div className="inline-block ml-10">Sort by:
          <select className="ml-2 p-2 border bg-black border-zinc-600 rounded ">
            <option value="date">Date Added</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>

      </div>

      <div className="w-full aspect-3/2 grid grid-cols-3 gap-4 py-3 px-4">
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