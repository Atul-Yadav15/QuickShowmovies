import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

axios.defaults.baseURL = "https://quickshowmovies-1.onrender.com";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) setShows(data.shows);
    } catch (error) {
      console.log("fetchShows error:", error.response?.data || error.message);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      if (!user) return;
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/user/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setFavoriteMovies(data.movies);
    } catch (error) {
      console.log("fetchFavoriteMovies error:", error.response?.data || error.message);
    }
  };

  const fetchIsAdmin = async () => {
    try {
      let token = await getToken();

      // Retry once if token is null
      if (!token) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        token = await getToken();
      }

      if (!token) {
        console.log("Token is null, skipping fetchIsAdmin");
        return;
      }

      console.log("TOKEN:", token); // remove after debugging

      const { data } = await axios.get("/api/admin/is-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("IS ADMIN RESPONSE:", data); // remove after debugging

      if (data.success) setIsAdmin(data.isAdmin);
    } catch (error) {
      console.log("fetchIsAdmin error:", error.response?.data || error.message);
    }
  };

  // Fetch shows on mount
  useEffect(() => {
    fetchShows();
  }, []);

  // Fetch user-specific data only when Clerk is fully loaded and user exists
  useEffect(() => {
    if (isLoaded && user) {
      fetchFavoriteMovies();
      fetchIsAdmin();
    }
  }, [isLoaded, user]); // ✅ isLoaded added here

  const value = {
    axios,
    getToken,
    user,
    isLoaded,
    shows,
    favoriteMovies,
    fetchFavoriteMovies,
    fetchIsAdmin,
    isAdmin,
    image_base_url,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
