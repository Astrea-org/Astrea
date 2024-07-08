declare module "@arweave-wallet-kit/react" {
  import * as React from "react";

  export interface ArweaveWalletKitProps {
    config: {
      permissions: string[];
      ensurePermissions: boolean;
      strategies: any[];
    };
    children?: React.ReactNode;
  }

  export const ArweaveWalletKit: React.FC<ArweaveWalletKitProps>;

  export interface ConnectButtonProps {
    [key: string]: any;
  }

  export const ConnectButton: React.FC<ConnectButtonProps>;

  export interface UseWalletReturn {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    isConnected: boolean;
    wallet: any;
  }

  export function useWallet(): UseWalletReturn;
}
