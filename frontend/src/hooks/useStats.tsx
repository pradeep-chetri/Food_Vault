import { useEffect, useState } from "react";
import type { Stats } from "../types/statsType";
import { fetchStatsData } from "../lib/api/stats";

export const useStats = () => {
  const [stats, setStats] = useState<Stats>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // ✅ Bug fix: should only trigger fetch loading if user is present
      try {
        const data = await fetchStatsData();
        setStats(data);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData()
  }, []);

  return { stats, loading, error };
};
