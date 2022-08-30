const crypto = require('eth-crypto');
const ethers = require('ethers');

const keys = (private) => {
	return [crypto.publicKeyByPrivateKey(private), private];
}

const hash = (value, salt) =>
	ethers.utils.keccak256(Buffer.from(value + salt));

const encrypt = async (public, message) => {
	const encrypted = await crypto.encryptWithPublicKey(public, message);
	return crypto.cipher.stringify(encrypted);
};

const decrypt = async (private, message) => {
	const encrypted = crypto.cipher.parse(message);
	return crypto.decryptWithPrivateKey(private, encrypted);
};

module.exports = {
	keys: keys,
	hash: hash,
	encrypt: encrypt,
	decrypt: decrypt,
}