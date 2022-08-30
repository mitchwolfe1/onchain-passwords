const { connectGSN } = require('./util');

const deploy = async (name, args, signer) => {
	const factory = await ethers.getContractFactory(name, signer);
	const contract = await factory.deploy(...args);
	await contract.deployed();
	console.log(`${name} deployed to: ${contract.address}`);
	return contract;
};

const main = async () => {
	const forwarder = require('../build/gsn/Forwarder.json').address;
	const paymaster = require('../build/gsn/Paymaster.json').address;
	const providers = await connectGSN('http://localhost:8545', paymaster);

	const Wallet = await deploy(
		'Wallet',
		[forwarder],
		providers.deploymentProvider.getSigner()
	);
};

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});