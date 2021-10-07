let authToken: string | null = null;

const AUTH_TOKEN_KEY = "auth-token";

const TokenStore = {
  get authToken() {
    if (!authToken) {
      authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return authToken;
  },
  set authToken(value: string | null) {
    authToken = value;
    if (value) {
      localStorage.setItem(AUTH_TOKEN_KEY, value);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  },
  get isAuthenticated() {
    return !!TokenStore.authToken;
  },

  logout: () => {
    TokenStore.authToken = null;
  },
};

export default TokenStore;
