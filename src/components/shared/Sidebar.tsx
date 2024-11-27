import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

const Sidebar = () => {
  const menuItems = [
    { key: "home", label: "Home", href: "/" },
    { key: "income", label: "Income", href: "/income" },
    { key: "expense", label: "Expense", href: "/expense" },
    { key: "settings", label: "Settings", href: "/settings" },
    { key: "analytics", label: "Analytics", href: "/analytics" },
  ];

  return (
    <div className="w-64 h-screen bg-sky-900 text-white fixed flex flex-col z-20 justify-between overflow-hidden ">
      <div>
        <div className="p-10 text-xl font-bold text-center mt-1">Budget Tracker</div>
        <Navbar className="flex justify-center bg-sky-900">
          <NavbarContent className="flex flex-col mt-4 gap-2 text-center w-full">
            {menuItems.map((item) => (
              <NavbarItem key={item.key}>
                <Link
                  href={item.href}
                  color="primary"
                  className="w-full p-2 hover:bg-sky-700  text-white dark:te transition rounded-md"
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </Navbar>
      </div>
      <div className="p-4 text-center text-sm font-semibold">
        Enver Yeşilşiraz
      </div>
    </div>
  );
};

export default Sidebar;
