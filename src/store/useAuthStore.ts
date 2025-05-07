import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  initAuth: () => void;
}

interface JwtPayload {
  exp: number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,

      setToken: (token) => {
        set({ token, isAuthenticated: !!token });
      },

      initAuth: () => {
        const token = useAuthStore.getState().token;
        if (!token) {
          set({ token: null, isAuthenticated: false });
          return;
        }

        try {
          const decoded = jwtDecode<JwtPayload>(token);
          const now = Math.floor(Date.now() / 1000);

          if (decoded.exp && decoded.exp > now) {
            set({ isAuthenticated: true });
          } else {
            set({ token: null, isAuthenticated: false });
          }
        } catch {
          set({ token: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
