const { StatusCodes } = require('http-status-codes');
const User =require('../models/userAuth');
const CustomError = require('../errors');
const {
  createTokenUser,
  attachCookiesToResponse,
  chechPermissions,
} = require('../Utils');

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users });
};

// Get user stats
const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    if(!user){
        throw new CustomError.NotFoundError(`No User with id: ${req.params.id}`);
    };

    chechPermissions(req.user, user._id);
    const stat = user.quiz_solved;
    res.status(StatusCodes.OK).json({ stat });
};

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user});
};

const updateUser = async (req, res) => {
    const { email, name } = req.body;

    if(!email || !name){
        throw new CustomError.BadRequestError('Please Provide all values');
    };

    const user = await User.findOne({ _id: req.user.userId });

    user.email = email;
    user.name = name;
    user.quiz_solved;

    await user.save();

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Update user Stats
const updateUserStat = async(req, res) => {
    const { completedQuiz } = req.query;

    let user;
    if(completedQuiz){
        user = await User.findOneAndUpdate({ _id: req.user.userId}, {$inc : {'quiz_solved' : 1}}).exec();
    };
    res.status(StatusCodes.OK).json({ user });
};

const updatePassword = async (req,res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values');
    };

    const user = await User.findOne({ _id: req.user.userId });

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    };

    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    updatePassword,
    showCurrentUser,
    updateUserStat
};