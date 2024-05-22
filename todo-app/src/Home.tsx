import React from 'react';
import TodoList from './TodoList';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <TodoList />
    </div>
  );
};

export default Home;
