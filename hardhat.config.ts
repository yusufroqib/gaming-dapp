import dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";

dotenv.config();

//* Notes for deploying the smart contract on your own subnet
//* More info on subnets: https://docs.avax.network/subnets
//* Why deploy on a subnet: https://docs.avax.network/subnets/when-to-use-subnet-vs-c-chain
//* How to deploy on a subnet: https://docs.avax.network/subnets/create-a-local-subnet
//* Transactions on the C-Chain might take 2-10 seconds -> the ones on the subnet will be much faster
//* On C-Chain we're relaying on the Avax token to confirm transactions -> on the subnet we can create our own token
//* You are in complete control over the network and it's inner workings

export default {
	solidity: {
		version: "0.8.16",
		settings: {
			viaIR: true,
			optimizer: {
				enabled: true,
				runs: 100,
			},
		},
	},
	networks: {
		"lisk-sepolia": {
			url: "https://rpc.sepolia-api.lisk.com",
			accounts: [process.env.WALLET_KEY as string],
			gasPrice: 1000000000,
		},

	},

	etherscan: {
		// Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
		apiKey: {
			"lisk-sepolia": "123",
		},
		customChains: [
			{
				network: "lisk-sepolia",
				chainId: 4202,
				urls: {
					apiURL: "https://sepolia-blockscout.lisk.com/api",
					browserURL: "https://sepolia-blockscout.lisk.com",
				},
			},
		],
	},
	sourcify: {
		enabled: false,
	},
};
