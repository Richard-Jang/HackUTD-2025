import ModelCard from "@/components/ModelCard";

export default function Home() {

  return (
    <div className="w-full h-full bg-black p-8">
        <div className="w-1/3">
            <ModelCard
                name="Model Name"
                image=""
                favorite={false}
                handleLike={() => {}}
            />
        </div>
    </div>
  )
}