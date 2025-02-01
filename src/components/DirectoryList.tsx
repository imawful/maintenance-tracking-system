const DirectoryList = ({ linksToOmit }: { linksToOmit?: string[] }) => {
  const allLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/equipment/", label: "Equipment" },
    { href: "/equipment/new-form/", label: "New Equipment" },
    { href: "/maintenance/", label: "Maintenance" },
    { href: "/maintenance/new-record/", label: "New Maintenance Record" },
  ];

  const filteredLinks = allLinks.filter(
    (link) => !linksToOmit?.includes(link.href),
  );

  return (
    <ul className="w-full flex flex-row justify-between items-center text-center">
      {filteredLinks.map((link, index) => (
        <li key={index}>
          <a
            className="text-md text-blue-800 hover:text-blue-300 underline"
            href={link.href}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export { DirectoryList };
