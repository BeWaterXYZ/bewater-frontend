export function maskWalletAddress(walletAddress?: string) {
  if (!walletAddress) {
    return "";
  }
  return `${walletAddress?.substring(0, 6)}...${walletAddress?.substring(
    walletAddress.length - 4,
    walletAddress.length
  )}`;
}
