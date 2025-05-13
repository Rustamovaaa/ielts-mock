import React from 'react';
import PassageCard from "../../components/ui/passage-card";
import { getPassages } from '@/lib/actions/pessage.action';

const ReadingPage = async () => {
    const passages = await getPassages();
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {passages.map((passage) => (
            <PassageCard key={passage._id} {...passage} />
            ))}
        </div>
    );
}

export default ReadingPage;
