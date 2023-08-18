/**
 * POLYGON: 137 -> 0x89
 * MUMBAI: 80001 -> 0x13881
 */
export const chainIdToHex = (chainId: number): `0x${string}` => `0x${chainId.toString(16)}`;
