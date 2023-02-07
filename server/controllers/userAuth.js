const User = require('../models/userAuth');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const crypto = require('crypto');

const { 
    attachCookiesToResponse,
    createTokenUser,
    sendVerificationEmail,
    sendResetPasswordEmail,
    createHash 
} = require('../Utils');

const register = async ( req, res ) => {
    const { username, email, password } = req.body;

    const emailAlredyExist = await User.find({ email: email});

    if(!emailAlredyExist){
        throw new CustomError.BadRequest(`Email already exists`);
    };

    const verificationToken = crypto.randomBytes(40).toString('hex');
    
    const user = await User.create({
        username,
        email,
        password,
        verificationToken
    });

    const origin = 'http://localhost:5173';
    
    await sendVerificationEmail({
        username: user.username,
        email: user.email,
        verificationToken: user.verificationToken,
        origin
    });

    res.status(StatusCodes.CREATED).json({
        msg: `Success! Please check your email to verify account`
    });
};

const verifyEmail = async (req, res) => {
    const { verificationToken, email } = req.body;
    const user = await User.findOne({ email });

    if(!user){
        throw new CustomError.UnauthenticatedError('Verify Failed');
    };

    if(user.verificationToken !== verificationToken){
        throw new CustomError.UnauthenticatedError('Verify Failed');
    };

    (user.isVerified = true), (user.verified = Date.now());
    user.verificationToken = '';

    await user.save();

    res.status(StatusCodes.OK).json({ msg: `Email Verified`});
};

const login = async (req, res ) => {
    const { username, password } = req.body;

    if(!username || !password){
        throw new CustomError.BadRequest('Please Provide an Email and Password');
    };

    const user = await User.findOne({ username });
    
    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    };
    
    const isPasswordCorrect = await user.comparePassword(password);
    
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    };

    if(!user.isVerified){
        throw new CustomError.UnauthenticatedError('Please Verified Your Email');
    };

    const tokenUser = createTokenUser(user);

    // create refresh token
    let refreshToken = '';
    const existingToken = await Token.findOne({ user: user._id });
    
    if(existingToken){
        const { isValid } = existingToken;
        if(!isValid){
            throw new CustomError.UnauthenticatedError('Invalid Credential');
        };
        refreshToken = existingToken.refreshToken;
        attachCookiesToResponse({ res, user: tokenUser, refreshToken });
        res.status(StatusCodes.OK).json({ user: tokenUser });
        return;
    };

    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };

    await Token.create(userToken);
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });
    console.log(req.user.userId);
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};


module.exports = {
    register,
    login,
    logout,
    verifyEmail
};