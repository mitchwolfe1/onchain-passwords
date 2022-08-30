// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@opengsn/contracts/src/BaseRelayRecipient.sol";

error NotAuthorized(address sender, address owner);

contract Wallet is BaseRelayRecipient {
	address public owner;
	mapping(bytes32 => bytes[]) entries;
	
	constructor(address _forwarder) {
		_setTrustedForwarder(_forwarder);
		owner = _msgSender();
	}

	modifier onlyOwner {
		if (_msgSender() != owner) revert NotAuthorized(_msgSender(), owner);
		_;
	}

	function store(bytes32 _key, bytes[] memory _value) public onlyOwner {
		entries[_key] = _value;
	}

	function retrieve(bytes32 _key) public view onlyOwner returns (bytes[] memory) {
		return entries[_key];
	}

	function versionRecipient() external override pure returns (string memory) {
		return "2.2.0";
	}
}