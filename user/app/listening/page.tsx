import PassageCard from "@/components/ui/passage-card";
import { getListeningPassages } from "@/lib/actions/listening.action";

export default async function ListeningPage() {
    const passages = await getListeningPassages();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-green-700">IELTS Listening Tests</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {passages.map((passage) => (
                    <div key={passage._id}>
                        <PassageCard {...passage} linkPrefix="/listening" />
                    </div>
                ))}
            </div>
        </div>
    );
}
