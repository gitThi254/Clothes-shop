import { LoginHttpRes } from "../api/auth";

export const useAuth = () => {
  const isLogged = () => localStorage.getItem("isAuthenticated");
  const signIn = (data: LoginHttpRes) => {
    localStorage.setItem("isAuthenticated", JSON.stringify(data));
  };

  const isUser = (): LoginHttpRes | null => {
    const storedData = localStorage.getItem("isAuthenticated");
    if (!storedData) {
      return null; // Handle case where data is not found
    }
    try {
      return JSON.parse(storedData) as LoginHttpRes;
    } catch (error) {
      console.error("Error parsing stored data:", error);
      return null; // Handle parsing errors
    }
  };

  const signOut = () => {
    localStorage.removeItem("isAuthenticated");
  };
  return { signIn, signOut, isLogged, isUser };
};

export type AuthContext = ReturnType<typeof useAuth>;
