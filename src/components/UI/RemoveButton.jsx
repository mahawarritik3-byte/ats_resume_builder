function RemoveButton({ onClick }) {
  return (
    <button
      type="button"
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      onClick={onClick}
    >
      Remove
    </button>
  );
}

export default RemoveButton;