/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - username
 *         - password
 *         - iin
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         username:
 *           type: string
 *         iin:
 *           type: string
 *         avatar:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - username
 *               - password
 *               - iin
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               iin:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email or username
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/profile:
 *   patch:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

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

router.patch("/profile", authenticateToken, async (req, res) => {
    const { first_name, last_name, email, username, avatar } = req.body;
    const updateData = {};

    // Only add fields that are present in the request
    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (avatar !== undefined) updateData.avatar = avatar;

    try {
        // Check if email or username already exists
        if (email || username) {
            const existingUser = await User.findOne({
                $and: [
                    { _id: { $ne: req.user.id } },
                    {
                        $or: [
                            ...(email ? [{ email }] : []),
                            ...(username ? [{ username }] : [])
                        ]
                    }
                ]
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email or username already exists"
                });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateData },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router
