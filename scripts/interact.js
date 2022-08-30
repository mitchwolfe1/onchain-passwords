const {
	PRIVATE_KEY,
	MASTER_HASH,
	WALLET_ADDRESS
} = require('./config');
const {
	keys,
	hash,
	encrypt,
	decrypt
} = require('./crypto');
const { prompt, connectGSN } = require('./util');

const attach = async (name, address) => {
	const factory = await ethers.getContractFactory(name);
	return factory.attach(address);
};

const store = async (wallet, public, website, values) => {
	const key = hash(website, MASTER_HASH);
	const encrypted = [];
	for (const v of values) {
		encrypted.push(`0x${await encrypt(public, v)}`);
	}
	console.log('Key:', key);
	console.log('Values: ', encrypted);
	await wallet.store(key, encrypted);
};

const retrieve = async (wallet, private, website) => {
	const key = hash(website, MASTER_HASH);
	const values = await wallet.retrieve(key);

	const decrypted = [];
	for (const v of values) {
		decrypted.push(await decrypt(private, v.slice(2)));
	}
	console.log('Key: ', key);
	console.log('Values: ', decrypted);
	return decrypted;
}

const main = async () => {
	const paymaster = require('../build/gsn/Paymaster.json').address;
	const providers = await connectGSN('http://localhost:8545', paymaster);

	const wallet = (await attach('Wallet', WALLET_ADDRESS))
		.connect(providers.ethersProvider.getSigner('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'));

	const [public, private] = keys(PRIVATE_KEY);
	console.log('Private Key:', private);
	console.log('Public Key:', public);

	while (true) {
		const unlock = ethers.utils.keccak256(Buffer.from(
			await prompt('Unlock: ')
		));
		if (unlock === MASTER_HASH) break;
		else console.log('Invalid');
	}

	while (true) {
		console.log();
		const action = await prompt('Action [s/r/x]: ');
		if (action == 'store' || action == 's') {
			const website = await prompt('Website: ');
			const values = [];
			while (true) {
				const value = await prompt('Enter value: ');
				if (value.length == 0) break;
				values.push(value);
			}
			await store(wallet, public, website, values);
		} else if (action == 'retrieve' || action == 'r') {
			const website = await prompt('Website: ');
			await retrieve(wallet, private, website);
		} else if (action == 'exit' || action == 'x') {
			break;
		} else {
			console.log('Not recognized');
		}
	}
};

main()
	.then(() => process.exit(0))
	.then(error => {
		console.error(error);
		process.exit(1);
	});