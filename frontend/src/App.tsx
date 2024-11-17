import { useState } from "react";

import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuth } from "./hook/useAuth";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const queryClient = new QueryClient();
function App() {
  const authentication = useAuth();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ authentication }} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
