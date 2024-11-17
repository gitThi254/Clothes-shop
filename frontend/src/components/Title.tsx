import React, { Children } from "react";
import BreadcumbTW from "../Breadcrumbs/BreadcrumbTW";
import { Link, useLocation } from "@tanstack/react-router";

interface TitleIf {
  bread: string;
  name: string;
  children: React.ReactNode;
}

const Title: React.FC<TitleIf> = ({ bread, name, children }) => {
  const location = useLocation();
  return (
    <>
      <BreadcumbTW pageName={bread} />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
        <div className="relative z-20 h-full">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-4">
            <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
              <div className="font-semibold text-2xl text-black dark:text-white">
                {name + "List"}
              </div>
              <div>
                <Link
                  to={location.pathname + "/create"}
                  className="btn btn-primary btn-lg"
                >
                  Add {" " + name}
                </Link>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
