import ListeningCreateForm from '@/components/forms/listening-create.form';
import React from 'react';


export default function CreateListeningPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create Listening Test</h1>
      </div>
      <ListeningCreateForm />
    </div>
  );
}




































