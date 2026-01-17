function Pagination({ pageCount, updatePage }) {
  return (
    <div className="flex justify-center gap-2 mt-8 flex-wrap">
      {[...Array(pageCount).keys()].map((value) => (
        <button
          key={value}
          onClick={() => updatePage(value + 1)}
          className="
            px-4 py-2
            border border-gray-300
            rounded-lg
            text-sm font-medium
            text-gray-700
            hover:bg-black hover:text-white
            transition
          "
        >
          {value + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
