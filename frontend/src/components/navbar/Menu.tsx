import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Route } from "../../routes/__root";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const profileMenuItems = [
  {
    label: "Sign Out",
    link: null,
    icon: PowerIcon,
  },
];

export function NavbarWithMegaMenu() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { authentication } = Route.useRouteContext();
  const handleLogout = () => {
    authentication.signOut();
    navigate({ to: "/login" });
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto rounded-none sticky top-0 z-999 min-w-full">
      <div className="flex items-center justify-end text-blue-gray-900">
        {authentication.isLogged() ? (
          <div className="flex gap-8 items-center">
            <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                  <div className="flex items-center gap-4">
                    <Avatar
                      variant="circular"
                      size="lg"
                      alt="tania andrew"
                      className="border border-gray-900 p-0.5"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <div>
                      <Typography variant="h6">
                        {authentication.isUser()?.username}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal uppercase"
                      >
                        {authentication.isUser()?.role}
                      </Typography>
                    </div>
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3 w-3 transition-transform ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </Button>
              </MenuHandler>
              <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, link }, key) => {
                  const isLastItem = key === profileMenuItems.length - 1;
                  return (
                    <>
                      {link && !isLastItem ? (
                        <>
                          <Link to={link}>
                            <MenuItem
                              key={label}
                              onClick={isLastItem ? handleLogout : closeMenu}
                              className={`flex items-center gap-2 rounded ${
                                isLastItem
                                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                  : ""
                              }`}
                            >
                              {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                              })}
                              <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                              >
                                {label}
                              </Typography>
                            </MenuItem>
                          </Link>
                        </>
                      ) : (
                        <>
                          <MenuItem
                            key={label}
                            onClick={isLastItem ? handleLogout : closeMenu}
                            className={`flex items-center gap-2 rounded ${
                              isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                            }`}
                          >
                            {React.createElement(icon, {
                              className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                              strokeWidth: 2,
                            })}
                            <Typography
                              as="span"
                              variant="small"
                              className="font-normal"
                              color={isLastItem ? "red" : "inherit"}
                            >
                              {label}
                            </Typography>
                          </MenuItem>
                        </>
                      )}
                    </>
                  );
                })}
              </MenuList>
            </Menu>
          </div>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
                Log In
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="gradient" color="blue" size="sm" fullWidth>
                Sign In
              </Button>
            </Link>
          </>
        )}
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Log In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign In
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
