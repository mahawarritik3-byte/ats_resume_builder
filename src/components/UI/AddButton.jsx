function AddButton({ text, onClick }) {
  return (
    <button
      type="button"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default AddButton;