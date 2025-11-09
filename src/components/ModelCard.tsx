import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function ModelCard({
    name,
    image,
    favorite,
    handleLike,
}: {
    name: string;
    image: string;
    favorite: boolean;
    handleLike: () => void;
}) {

    return <div className="flex flex-col rounded-lg border border-zinc-600 aspect-3/2">
        <div className="relative w-full grow">
            <div className="w-full h-full">
                <img
                    className="w-full h-full rounded-t-lg"
                    src={image ? image : "https://placehold.co/600x400"}
                />
            </div>
            {favorite ? (
                <div
                        className="p-3 absolute right-0 bottom-0 text-rose-600 hover:scale-125 transition-all text-xl"
                        onClick={(e) => { e.stopPropagation(); handleLike(); }}
                    >
                        <FaHeart />
                    </div>
            ) : (
                <div
                    className="p-3 absolute right-0 bottom-0 text-rose-600 hover:scale-125 transition-all text-xl"
                    onClick={(e) => { e.stopPropagation(); handleLike(); }}
                >
                    <FaRegHeart />
                </div>
            )}
        </div>
        <div className="flex items-center justify-start border-t-1 border-zinc-600 px-4 py-3">
            {name}
        </div>
    </div>
}