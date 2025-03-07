import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

// Define the type for Notification
type NotificationType = {
  show: boolean;
  message: string;
  type: string;
};

type AppContextType = {
  notification: NotificationType;
  setNotification: Dispatch<SetStateAction<NotificationType>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  return (
    <AppContext.Provider value={{ notification, setNotification }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
