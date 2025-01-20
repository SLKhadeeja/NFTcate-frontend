/* eslint-disable react-refresh/only-export-components */
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import DomainSelect from '../components/domainSelect';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

export type TUSer = Record<string, string | number> | undefined;

interface LayoutContextData {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSignupModalOpen:  boolean;
  setIsSignupModalOpen: Dispatch<SetStateAction<boolean>>;
  isSigninModalOpen:  boolean;
  setIsSigninModalOpen: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  user: Record<string, string | number> | undefined
  logout: () => void;
}

const LayoutContext = createContext<LayoutContextData>({
  isLoading: false,
  setIsLoading: () => {},
  isSignupModalOpen: false,
  setIsSignupModalOpen: () => {},
  isSigninModalOpen: false,
  setIsSigninModalOpen: () => {},
  isLoggedIn: false,
  user: undefined,
  logout: () => {},
});

export const LayoutProvider = ({ children }: {children: ReactNode}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<TUSer>();

  const navigate = useNavigate();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);

  const handleCancelSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleCancelSigninModal = () => {
    setIsSigninModalOpen(false);
  };

  const logout = () => {
    window.localStorage.removeItem('accessToken');
    navigate('/');
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
          setIsLoggedIn(true);
          const response = await axiosInstance.get('/user');
          setUser(response.data)
        }
      } catch (error) {
        console.error(error);
      }
    };

    initialize()
  }, [isLoggedIn])

  return (
    <LayoutContext.Provider value={{ 
      isLoading,
      setIsLoading,
      isSigninModalOpen,
      isSignupModalOpen,
      setIsSigninModalOpen,
      setIsSignupModalOpen,
      isLoggedIn,
      user,
      logout
    }}>
      {children}

      <DomainSelect
        open={isSignupModalOpen}
        onCancel={handleCancelSignupModal}
        onInstitution={() => navigate('/institution/signup')}
        onStudent={() => navigate('/student/signup')}
      />

      <DomainSelect
        open={isSigninModalOpen}
        onCancel={handleCancelSigninModal}
        onInstitution={() => navigate('/login?d=institution')}
        onStudent={() => navigate('/login?d=student')}
      />
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
