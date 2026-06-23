function PreviewSection({ title, children }) {
  return (
    <div className="mt-5">
      <h2 className="text-lg font-bold border-b border-gray-400 mb-2 uppercase">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default PreviewSection;