import { create } from "zustand";

export const useProblemStore = create((set, get) => ({
  problems: [],
  isLoading: false,
  searchQuery: "",
  activeTab: "all",
  difficultyFilter: "all",

  // Actions
  getProblems: async (tag = "implementation") => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `https://codeforces.com/api/problemset.problems?tags=${tag}`
      );
      const data = await response.json();
      if (data.status !== "OK") throw new Error("Failed to fetch problems");

      const problems = data.result.problems.map((problem, index) => ({
        ...problem,
        ...data.result.problemStatistics[index],
      }));

      set({ problems, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setDifficultyFilter: (filter) => set({ difficultyFilter: filter }),

  // Search functionality (returns array)
  searchProblems: () => {
    const { problems, searchQuery } = get();

    if (!searchQuery) return problems; // Return all if no search query

    return problems.filter((problem) => {
      const searchTerm = searchQuery.toLowerCase();
      const nameMatch = problem.name.toLowerCase().includes(searchTerm);
      const tagsMatch = problem.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm)
      );

      return nameMatch || tagsMatch;
    });
  },

  // Filter functionality (without search)
  filteredProblems: () => {
    const { problems, activeTab, difficultyFilter } = get();
    const searchedProblems = get().searchProblems(); // Get search results first

    return searchedProblems.filter((problem) => {
      // Filter by difficulty
      const matchesDifficulty =
        difficultyFilter === "all" ||
        (difficultyFilter === "easy" && problem.rating < 1200) ||
        (difficultyFilter === "medium" &&
          problem.rating >= 1200 &&
          problem.rating < 1800) ||
        (difficultyFilter === "hard" && problem.rating >= 1800);

      // Filter by tab
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "popular" && problem.solvedCount > 1000) ||
        (activeTab === "recent" && problem.contestId > 1800);

      return matchesDifficulty && matchesTab;
    });
  },

  // Statistics (operates on all problems)
  getStats: () => {
    const { problems } = get();
    return {
      total: problems.length,
      easy: problems.filter((p) => p.rating && p.rating < 1200).length,
      medium: problems.filter(
        (p) => p.rating && p.rating >= 1200 && p.rating < 1800
      ).length,
      hard: problems.filter((p) => p.rating && p.rating >= 1800).length,
    };
  },
}));
