const DirectoryList = () => {
  return (
    <div className="w-auto h-full bg-inherit p-2 border-r-2 border-white">
      <h1 className="text-3xl text-center text-neutral-50">Directory</h1>
      <ul className="text-center">
        <li>
          <a
            className="text-md text-blue-800 hover:text-blue-300 underline"
            href="./equipment/new-form/"
          >
            New Equipment
          </a>
        </li>
        <li>
          <a
            className="text-md text-blue-800 hover:text-blue-300 underline"
            href="./maintenance/new-record/"
          >
            New Maintenance Record
          </a>
        </li>
      </ul>
    </div>
  );
};

export { DirectoryList };
