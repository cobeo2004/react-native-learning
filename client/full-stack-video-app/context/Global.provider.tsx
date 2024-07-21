import { currentUser } from "@/lib/currentUser";
import React from "react";
import { Models } from "react-native-appwrite";
type GlobalContextType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: Models.DocumentList<Models.Document> | null;
  setUser: React.Dispatch<
    React.SetStateAction<Models.DocumentList<Models.Document> | null>
  >;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const _context: React.Context<GlobalContextType | null> =
  React.createContext<GlobalContextType | null>(null);

const _useGlobal = () => React.useContext(_context) as GlobalContextType;

const _provider: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [user, setUser] =
    React.useState<Models.DocumentList<Models.Document> | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    currentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <_context.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </_context.Provider>
  );
};

export { _useGlobal as useGlobalContext, _provider as GlobalProvider };
