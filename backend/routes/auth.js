const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const authenticateToken = require("../middleware/auth")
const router = express.Router()

router.post("/register", async (req, res) => {
	const { first_name, last_name, email, username, avatar, password, iin } =
		req.body

	if (!first_name || !last_name || !email || !username || !password || !iin) {
		return res
			.status(400)
			.json({ message: "All fields except avatar are required" })
	}

	if (!/^\d{12}$/.test(iin)) {
		return res.status(400).json({ message: "IIN must be 12 digits" })
	}

	try {
		const existingUser = await User.findOne({
			$or: [{ email }, { username }, { iin }],
		})
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "Email, username or IIN already exists" })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = new User({
			first_name,
			last_name,
			email,
			username,
			iin,
			avatar,
			password: hashedPassword,
		})
		await user.save()

		const token = jwt.sign(
			{ id: user._id, email: user.email, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		)

		const userWithoutPassword = await User.findById(user._id).select(
			"-password"
		)
		res.status(201).json({
			message: "User registered successfully",
			token,
			user: userWithoutPassword,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message })
	}
})

router.post("/login", async (req, res) => {
	const { identifier, password } = req.body

	if (!identifier || !password) {
		return res
			.status(400)
			.json({ message: "Username/Email and password are required" })
	}

	try {
		const user = await User.findOne({
			$or: [{ email: identifier }, { username: identifier }],
		})
		if (!user) return res.status(404).json({ message: "User not found" })

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch)
			return res.status(401).json({ message: "Invalid credentials" })

		const token = jwt.sign(
			{ id: user._id, email: user.email, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		)

		const userWithoutPassword = await User.findById(user._id).select(
			"-password"
		)
		res.json({
			token,
			user: userWithoutPassword,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message })
	}
})

router.get("/me", authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password")
		if (!user) return res.status(404).json({ message: "User not found" })

		res.json(user)
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal Server Error", error: error.message })
	}
})

module.exports = router
