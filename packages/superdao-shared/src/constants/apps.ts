import { ethers } from 'ethers';

export const APPS_HASHES = {
	KERNEL: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('KERNEL')),
	SUDO: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('SUDO')),
	ADMIN_CONTROLLER: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('ADMIN')),
	ERC721: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('ERC721')),
	ERC721_OPEN_SALE: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('ERC721_OPEN_SALE')),
	ERC721_WHITELIST_SALE: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('ERC721_WHITELIST_SALE')),
	TREASURY: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('WALLET'))
};
