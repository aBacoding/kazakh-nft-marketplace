const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
	const token = req.header("Authorization")?.split(" ")[1] // Extract token from "Authorization: Bearer <token>"
	if (!token)
		return res
			.status(401)
			.json({ message: "Access Denied. No token provided." })

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET)
		req.user = verified // Attach user data to the request object
		next()
	} catch (error) {
		res.status(403).json({ message: "Invalid or expired token" })
	}
}

module.exports = authenticateToken
