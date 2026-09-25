import { LazyMotion, domMax } from "framer-motion";

/**
 * The site runs framer-motion on its animation and gesture features only
 * (`domAnimation`, see AppRoutes). The pages that animate layout —
 * `layout`, `layoutId`, LayoutGroup — mount this around their tree so the
 * projection features load with their own chunk, not with every page.
 */
export default function LayoutFeatures({ children }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
