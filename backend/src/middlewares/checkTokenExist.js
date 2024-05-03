const validateToken = require("../../src/middlewares/validateToken");

// checkToken.js
function checkTokenExist(req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        // 如果沒有token，執行後面的controller
        next();
    }
    else {
        // 如果有token，進行驗證
        validateToken(req, res, next);
    }
}

module.exports = checkTokenExist;
