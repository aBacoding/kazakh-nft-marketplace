const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true, unique: true },
		avatar: { type: String, default: null },
		password: { type: String, required: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
