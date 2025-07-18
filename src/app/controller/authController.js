const { genarateJwt } = require("../middleware/middleware");
const User = require("../model/userModel");

exports.registerController = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All filds are required" , success : false});
    };

    try {

        const exixtEmail = await User.findOne({ email: email });

        if (exixtEmail) {
            return res.status(400).json({ message: "email already use" , success : false})
        };

        const createUser = await User.create({ name, email, password });

        const token = await genarateJwt(createUser?._id);

        const option = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000
        }

        res.cookie("token", token, option);

        res.status(201).json({ id: createUser?._id, user: createUser, token });

    } catch (error) {
        return res.status(500).json({ message: "intenal server error" , success : false});
    }
};


exports.loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "All filds are required" , success : false});
    }

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        return res.status(400).send({ message: "User not valid."  , success : false});
    }

    const compairePassword = await findUser.compairePassword(password);

    if (!compairePassword) {
        return res.status(400).send({ message: "Password not valid" , success : false });
    };

    const token = genarateJwt(findUser._id);

    // const option = {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: "lax",
    //     maxAge: 30 * 24 * 60 * 60 * 1000
    // };

    res.cookie("token", token, { httpOnly: true });

    res.status(200).send({ success: true, message: "Login success", data: {findUser , token } });

    try {

    } catch (error) {
        return res.status(500).send({ message: "Inter server error" , success : false});
    }
}


exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." })
        };

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Error Not found user", error: error?.message })
    }
}