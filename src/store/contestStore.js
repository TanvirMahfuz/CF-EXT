import { create } from "zustand";
import axios from "axios";
// you have to keep the ordering like lis (set,get) otherwise it wont work
export const useContestStore = create((set,get) => ({
  contests: [],
  size: 10,

  getContests: async (gym = false) => {

    try {
      const response = await axios.get(
        `https://codeforces.com/api/contest.list?gym=${gym}`
      );

      if (response.data.status !== "OK") {
        throw new Error("Error fetching contests");
      }
      const latest = response.data.result.slice(0,30);
      set({ contests: latest });
    } catch (error) {
      console.error("Failed to fetch contests:", error);
    }
  },
}));
