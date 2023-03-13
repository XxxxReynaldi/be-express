const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
	verifyToken: (req, res, next) => {
		const authHeader = req.headers['authorization'];
		// console.log('authHeader', authHeader);
		const token = authHeader && authHeader.split(' ')[1];
		if (token == null) return res.status(401).json({ msg: 'Unauthorized' });
		jwt.verify(token, config.accessTokenSecret, (err, decoded) => {
			if (err) return res.status(403).json({ msg: 'Forbidden' });
			req.email = decoded.email;
			next();
		});
	},
};
