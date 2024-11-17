import { Link, useLocation } from "@tanstack/react-router";

const BreadcumbTW = ({ pageName }: { pageName: String }) => {
  let currentLink = "";
  const location = useLocation();
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb: any, index: any, arr) => {
      currentLink += `/${crumb}`;
      if (index === arr.length - 1)
        return (
          <li aria-current="page" key={index}>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="font-medium text-primary">{crumb}</span>
            </div>
          </li>
        );

      return (
        <li key={index}>
          <div className="flex items-center gap-2">
            <svg
              className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <Link to={currentLink} className="font-medium">
              {crumb.slice(0, 3) + "..."}
            </Link>
          </div>
        </li>
      );
    });
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>
        <nav
          className="flex justify-end items-center gap-2"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link className="font-medium" to="/">
                Dashboard
              </Link>
            </li>
            {crumbs}
          </ol>
        </nav>
      </div>
    </>
  );
};

export default BreadcumbTW;
