// Local, dependency-free stub of the platform client.
//
// The public marketing site is fully static: no backend, no authentication
// and no server communication. The platform auth shell (AuthContext) calls
// into this object once at startup; every method resolves immediately,
// without any network request or external SDK.
const asyncNull = async () => null;

export const base44 = {
  app: {
    getPublicSettings: asyncNull,
  },
  auth: {
    me: asyncNull,
    logout: () => {},
    redirectToLogin: () => {},
  },
  entities: {},
  users: {},
  integrations: {},
  analytics: { track: () => {} },
};