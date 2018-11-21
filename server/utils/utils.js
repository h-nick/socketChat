const createMessage = (uName, message) => {
	return {
		uName,
		message,
		date: new Date().getTime()
	};
}

module.exports = {createMessage};