const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-gray-400 text-6xl mb-4">📝</div>
      <h2 className="text-xl font-semibold text-gray-700">No notes found</h2>
      <p className="text-gray-500 mt-1">Start by creating your first note!</p>
    </div>
  );
};

export default EmptyState;
