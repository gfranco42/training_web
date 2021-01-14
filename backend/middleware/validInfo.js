module.exports = (req, res, next) => {
    const {name, pseudo, email, password} = req.body;

    validEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    if (req.path === '/register') {
        if (![name, pseudo, email, password].every(Boolean))
            return res.status(401).json("Missing Credentials");
        else if (!validEmail(email))
            return res.status(401).json("Invalid Email");
    }
    else if (req.path === '/login') { 
        if (![email, password].every(Boolean))
            return res.status(401).json("Missing Credentials");
        else if (!validEmail(email))
            return res.status(401).json("Invalid Email");
    }

    next();
};