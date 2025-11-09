export default function Footer() {
    return <div className="overflow-x-hidden bottom-0 w-full h-32 bg-rose-600 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-full flex items-center gap-5">
            <div className="grow h-0.5 border border-white"></div>
            <div className="text-xl">Toyota DreamFind</div>
            <div className="grow h-0.5 border border-white"></div>
        </div>
        <div className="absolute bottom-4 text-xs">© HackUTD 2025</div>
    </div>
}