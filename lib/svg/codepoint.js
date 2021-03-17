module.exports = (str) => {
	let u = '',
		i = 0;
	for (; i < str.length; i++) {
		u += "&#x" + str.charAt(i).codePointAt(0).toString(16) + ";";
	}
	return u;
};
