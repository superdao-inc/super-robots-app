import { ethers } from 'ethers';
import { provider } from 'src/config';

export const wallet = new ethers.Wallet('0x0000000000000000000000000000000000000000000000000000000000000001', provider);
