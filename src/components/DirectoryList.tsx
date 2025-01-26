const DirectoryList = () => {
  return (
    <div className="w-auto h-full bg-inherit p-2 border-r-2 border-white">
      <h1 className="text-3xl text-center text-neutral-50">Directory</h1>
      <ul className="text-center">
        <li>
          <a
            className="text-md text-blue-800 hover:text-blue-300 underline"
            href="./"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            className="text-md text-blue-800 hover:text-blue-300 underline"
            href="./equipment/"
          >
            Equipment
          </a>
        </li>
        <li>
          <a
            className="text-md text-blue-800 hover:text-blue-300 underline"
            href="./maintenance/"
          >
            Maintenance
          </a>
        </li>
      </ul>
    </div>
  );
};

export { DirectoryList };
