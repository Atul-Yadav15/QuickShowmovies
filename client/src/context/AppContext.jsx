import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
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
      console.log(error);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      if (!user) return;
      const { data } = await axios.get("/api/user/favorites", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) setFavoriteMovies(data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIsAdmin = async () => {
    try {
      // const token = await getToken();
      // if (!token) return;
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setIsAdmin(data.isAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavoriteMovies();
      fetchIsAdmin();
    }
  }, [user]);

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
