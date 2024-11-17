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
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  Cog6ToothIcon,
  GlobeAmericasIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  NewspaperIcon,
  PhoneIcon,
  PowerIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/__root";
import CartUser from "../CartUser";
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/profile",
  },
  {
    label: "Edit Profile",
    link: "/profile/edit",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    link: "/inbox",

    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    link: "/help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    link: null,
    icon: PowerIcon,
  },
];
const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Link to="/products">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Product
          </ListItem>
        </Typography>
      </Link>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

export function MainMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();
  const { authentication } = Route.useRouteContext();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const handleLogout = () => {
    authentication.signOut();
    navigate({ to: "/login" });
  };

  return (
    <Navbar className="mx-auto rounded-none top-0 z-999 min-w-full sticky">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            as="a"
            href="#"
            variant="h4"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            Clothes Shop
          </Typography>
        </Link>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <div className="flex items-center gap-2">
            {authentication.isLogged() ? (
              <div className="flex gap-8 items-center">
                <CartUser />
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
                                  onClick={
                                    isLastItem ? handleLogout : closeMenu
                                  }
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
                  <Button
                    variant="outlined"
                    size="sm"
                    color="blue-gray"
                    fullWidth
                  >
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
          </div>
        </div>
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
        <NavList />

        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
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
        </div>
      </Collapse>
    </Navbar>
  );
}
