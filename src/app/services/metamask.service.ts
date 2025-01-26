import { Injectable } from '@angular/core';
import { BrowserProvider } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  private provider: BrowserProvider | null = null;

  async connectWallet(): Promise<string | null> {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.provider = new BrowserProvider(window.ethereum);
        return accounts[0]; // Return the first account
      } catch (error) {
        console.error('User rejected request:', error);
        return null;
      }
    } else {
      console.error('MetaMask is not installed');
      return null;
    }
  }

  // async getWalletBalance(walletAddress: string): Promise<string> {
  //   if (this.provider) {
  //     const balance = await this.provider.getBalance(walletAddress);
  //     return ethers.utils.formatEther(balance); // Convert Wei to Ether
  //   }
  //   throw new Error('Provider is not initialized');
  // }
}
