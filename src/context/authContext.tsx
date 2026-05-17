import React, { useContext } from "react";
import type { AuthUser } from "@/features/auth/types"
import { useAuthSession } from "@/hooks/queries/useAuth"
import { useLogout } from "@/hooks/mutations/useAuthMutations"

interface authContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  logout: () => Promise<void>;
}
interface providerprops {
  children: React.ReactNode;
}
const authContext = React.createContext<authContextType | undefined>(undefined);
export const AuthProvider: React.FC<providerprops> = ({ children }) => {
  const authSessionQuery = useAuthSession();
  const logoutMutation = useLogout();

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated: !!authSessionQuery.data,
        isLoading: authSessionQuery.isLoading || authSessionQuery.isFetching || logoutMutation.isPending,
        user: authSessionQuery.data ?? null,
        logout,
      }}
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
