pragma solidity ^0.5.16;

contract Example {
    string public message;
    address admin;

    constructor(address _admin) public {
        admin = _admin;
    }

    function changeMsg(string calldata _message) external {
        require(admin == msg.sender);
        message = _message;
    }
}
