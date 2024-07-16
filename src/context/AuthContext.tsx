import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "../types/type";
import { loginRequest, registerRequest } from "../api/auth";

interface AuthContextType {
  user: User | null;
  signup: (user: User) => Promise<void>;
  signin: (user: User) => Promise<void>;
  isAuthenticated: boolean;
  errors: [];
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: async () => {},
  signin: async () => {},
  isAuthenticated: false,
  errors: [],
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<[]>([]);

  const signup = async (user: User) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user: User) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
