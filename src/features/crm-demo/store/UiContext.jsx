import { createContext, useContext } from "react";

/*
 * Demo UI context: language and strings, in-app navigation, toasts,
 * the visit sheet and the guided tour. Provided by CrmDemoApp.
 */
export const UiContext = createContext(null);

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within the demo app");
  return ctx;
}
