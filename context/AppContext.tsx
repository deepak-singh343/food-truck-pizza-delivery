"use client";
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

// Define the type for Cart Items
type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type UserType = {
  name: string;
  email: string;
};

type AppContextType = {
  notification: NotificationType;
  setNotification: Dispatch<SetStateAction<NotificationType>>;
  cartItems: CartItemType[];
  setCartItems: Dispatch<SetStateAction<CartItemType[]>>;
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [user, setUser] = useState<UserType | null>(null);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  return (
    <AppContext.Provider
      value={{
        notification,
        setNotification,
        cartItems,
        setCartItems,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
