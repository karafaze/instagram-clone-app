exports.login = (req, res) => {
    console.log("inside the login controller");
    res.status(200).json({
        status: "OK",
    });
};

exports.register = (req, res) => {
    console.log("inside the register controller");
    res.status(200).json({
        status: "OK",
    });
};
