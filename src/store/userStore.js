import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  error: null,
  loading: false,

  getUser: async (handle) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.result?.length > 0) {
        set({ user: data.result[0], error: null });
        console.log(data.result[0]);
      } else {
        throw new Error(data.comment || "User not found");
      }
    } catch (error) {
      set({ error: error.message, user: null });
      throw error; // Re-throw to handle in component
    } finally {
      set({ loading: false });
    }
  },

  clearUser: () => set({ user: null, error: null }),
}));
