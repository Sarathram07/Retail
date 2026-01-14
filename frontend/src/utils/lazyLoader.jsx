import React, { Suspense } from "react";
import { lazyImport } from "./lazyImports"; // Import your lazyImport helper
import LoaderComponent from "../components/Layouts/LoaderComponent";

/**
 * LazyLoader component
 * Automatically wraps the lazy component in Suspense
 *
 * Props:
 * - name: string (key in your lazy import map)
 * - fallback: optional ReactNode (loading UI)
 * - ...props: any props to pass to the lazy component
 */

const LazyLoader = ({ comp, fallback = <LoaderComponent />, ...props }) => {
  // Get the lazy-loaded component from your import map
  const Component = lazyImport(comp);

  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default LazyLoader;
