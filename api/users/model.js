import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
import randomString from "randomstring";
import { isEmail } from "validator";
const Schema = mongoose.Schema;

const userModel = new Schema({
	email: {
		type: String,
		required: `This field can't be blanc`,
		unique: true,
		lowercase: true,
		validate: {
			validator: isEmail,
			message: "Please type your real email",
			isAsync: false
		}
	},
	emailConfirmationToken: { type: String, default: "" },
	isConfirmed: { type: Boolean, default: false },
	nickname: { type: String, required: `This field can't be blanc` },
	password: { type: String, required: `This field can't be blanc` }
});

userModel.pre("save", function(next) {
	if (!this.isModified("password")) return next();
	this.password = this.hashPassword(this.password);
	next();
});

userModel.methods = {
	hashPassword: function(password) {
		if (!password) {
			return "";
		} else {
			const salt = bcrypt.genSaltSync(10);
			return bcrypt.hashSync(password, salt);
		}
	},

	isValidPassword: function(password) {
		console.log("isValid", password);
		return bcrypt.compareSync(password, this.password);
	}
};

userModel.plugin(uniqueValidator, {
	message: "This email allready exists"
});

export default mongoose.model("User", userModel);
