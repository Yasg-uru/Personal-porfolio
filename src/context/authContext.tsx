import axiosInstance from "@/helper/axiosInstanc";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/state/hook";
import React, { useContext, useEffect } from "react";
interface user {
  email: string;
  username: string;
  profileUrl: string;
}
interface authContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: user | null;
}
interface providerprops {
  children: React.ReactNode;
}
const authContext = React.createContext<authContextType | undefined>(undefined);
export const AuthProvider: React.FC<providerprops> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [authUser, setAuthUser] = React.useState<user | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const getUserDetails = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.get(`/user/verify-user`, {
        withCredentials: true,
      });

      const { user } = response.data;
      toast({
        title: "user verified successfully ",
      });
      setAuthUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      toast({
        title: "failed to verify user please login to continue",
      });
      console.error("Error fetching user details:", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <authContext.Provider
      value={{ isAuthenticated, isLoading, user: authUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("please provide authcontext properly");
  }
  return context;
};
