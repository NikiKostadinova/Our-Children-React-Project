import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import User from '../models/userModel.js';

export const test = (req, res) => {
    res.json({ message: 'Server is working!' })
};

export const editUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allow to edit this information!'))
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 8 characters!'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    if (req.body.username) {
        if (req.body.username.length < 6 || req.body.username.length > 25) {
            return next(errorHandler(400, 'Username must be between 6 and 25 characters!'));
        }
    }
    try {
        const editedUser = await User.findByIdAndUpdate(req.params.userId, {

            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
            },
        }, { new: true });
        const { password, ...rest } = editedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }

}  