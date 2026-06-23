function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      className="w-full border border-gray-300 p-2 rounded mb-3 outline-none focus:border-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;