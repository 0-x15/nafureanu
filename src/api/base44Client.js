import { createClient } from "@base44/sdk";

/**
 * The public corporate website is fully static — this client is never
 * used for requests. It exists only to satisfy the platform-managed
 * auth shell contract, so analytics are disabled and the identifier is
 * a neutral placeholder.
 */
export const base44 = createClient({
  appId: "00000000-0000-0000-0000-000000000000",
  analytics: { enabled: false },
});