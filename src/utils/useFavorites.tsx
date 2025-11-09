import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  const isFavorite = useCallback(
    (id: string) => {
      return (favorites || []).includes(id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      const prev = favorites || [];
      if (prev.includes(id)) {
        setFavorites(prev.filter((x) => x !== id));
      } else {
        setFavorites([...prev, id]);
      }
    },
    [favorites, setFavorites]
  );

  return { favoriteIds: favorites || [], isFavorite, toggleFavorite, setFavorites };
}
