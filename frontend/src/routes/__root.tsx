import * as React from "react";
import {
  Outlet,
  createRootRoute,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { SidebarWithLogo } from "../components/navbar/SideBar";
import { NavbarWithMegaMenu } from "../components/navbar/Menu";
import { Toaster } from "react-hot-toast";
import { MainMenu } from "../components/navbar/MainMenu";
import { AuthContext } from "../hook/useAuth";
import { Footer } from "../components/Footer";
type RouterContext = {
  authentication: AuthContext;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  var retval = ["/login", "/register"].some(isBigEnough);
  function isBigEnough(element: any) {
    return element === location.pathname;
  }
  const [admin, setAdmin] = React.useState<boolean>(
    location.pathname.includes("admin")
  );
  React.useEffect(() => {
    if (location.pathname.includes("admin")) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [location.pathname]);
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      {admin && !retval ? (
        <>
          <div className="bg-[#aeb7c0]">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Sidebar Start ===== --> */}
              <SidebarWithLogo />
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <NavbarWithMegaMenu />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    <Outlet />
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
          </div>
        </>
      ) : !admin && !retval ? (
        <>
          <div className="bg-blue-gray-50">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <MainMenu />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto top-12 left-3 py-10">
                    <Outlet />
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
            <Footer />
            {/* <!-- ===== Page Wrapper End ===== --> */}
          </div>
        </>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
}
