// Class logic to manipulate chat users.

class Users {
	constructor() {
		this.connectedUsers = [];
	}

	// All functions asume uID and rID is always a valid one.
	// Array.filter() returns undefined if nothing is ever found.

	addUserToChar(uID, uName) {
		let newUser = {
			uID,
			uName
		};

		this.connectedUsers.push(newUser);
		return this.connectedUsers;
	}

	getUserInChatByID(uID) {
		return this.connectedUsers.filter(foundID => foundID === uID)[0];
	}

	getAllUsersInChat() {
		return this.connectedUsers;
	}

	getAllUsersInRoom(rID) {
	}

	deleteUser(uID) {
		// Replaces current "connectedUsers" list with the same one minus the disconnected user.
		let disconnectedUser = this.getUserInChatByID(uID);
		this.connectedUsers = this.connectedUsers.filter(foundID => foundID !== uID);
		return disconnectedUser;
	}

};

module.exports = {
	Users
};