import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface WalletContextType {
  activeAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [activeAddress, setActiveAddress] = useState<string | null>(() => {
    return localStorage.getItem("walletAddress") || null;
  });

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const address = await window.arweaveWallet.getActiveAddress();
        if (address) {
          setActiveAddress(address);
          localStorage.setItem("walletAddress", address);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        setActiveAddress(null);
        localStorage.removeItem("walletAddress");
      }
    };

    checkWalletConnection();
  }, []);

  const connectWallet = async () => {
    try {
      await window.arweaveWallet.connect([
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
      ]);
      const address = await window.arweaveWallet.getActiveAddress();
      setActiveAddress(address);
      localStorage.setItem("walletAddress", address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await window.arweaveWallet.disconnect();
      setActiveAddress(null);
      localStorage.removeItem("walletAddress");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <WalletContext.Provider
      value={{ activeAddress, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
