// Class logic to manipulate chat users.

class Users {
	constructor() {
		this.connectedUsers = [];
	}

	// All functions asume uID and rID is always a valid one.
	// Array.filter() returns undefined if nothing is ever found.

	addUserToChat(uID, uName, rName) {
		let newUser = {
			uID,
			uName,
			rName
		};

		this.connectedUsers.push(newUser);
		return this.connectedUsers.filter(foundUser => foundUser.rName === rName);
	}

	getUserInChatByID(uID) {
		return this.connectedUsers.filter(foundUser => foundUser.uID === uID)[0];
	}

	getAllUsersInChat() {
		return this.connectedUsers;
	}

	getAllUsersInRoom(rName) {
		return this.connectedUsers.filter(foundUser => foundUser.rName === rName);
	}

	deleteUser(uID) {
		// Replaces current "connectedUsers" list with the same one minus the disconnected user.
		let disconnectedUser = this.getUserInChatByID(uID);
		this.connectedUsers = this.connectedUsers.filter(foundUser => foundUser.uID !== uID);
		return disconnectedUser;
	}

};

module.exports = {
	Users
};