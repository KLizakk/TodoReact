import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <p>Task ID: {id}</p>
      {/* Tutaj możesz dodać więcej szczegółów dotyczących zadania */}
    </div>
  );
};

export default TaskDetails;
