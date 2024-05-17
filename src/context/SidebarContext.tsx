import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SiderbarProviderProps = {
  children: ReactNode;
};

type SiderbarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SiderbarContextType | null>(null);

export const useSidebarContext = () => {
  const value = useContext(SidebarContext);
  if (value === null) {
    throw Error("Cannot use outside of SidebarProvider");
  }

  return value;
};

export const SidebarProvider = ({ children }: SiderbarProviderProps) => {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) {
        setIsSmallOpen(false);
      }
    };

    window.addEventListener("resize", handler);

    return () => {
      window.addEventListener("resize", handler);
    };
  }, []);

  const isScreenSmall = () => window.innerWidth < 1024;

  const toggle = () =>
    isScreenSmall() ? setIsSmallOpen((s) => !s) : setIsLargeOpen((l) => !l);
  const close = () =>
    isScreenSmall() ? setIsSmallOpen(false) : setIsLargeOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}>
      {children}
    </SidebarContext.Provider>
  );
};
