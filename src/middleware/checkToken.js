const { verifyJwtToken, getAJwtToken, removeExpiredTokenFromDb } = require('../tokens/tokens.module');


const checkToken = async (req, res, next) => {

    const tokenMaxAge = new Date(Date.now() + parseInt(process.env.JWT_DURATION.slice(0, process.env.JWT_DURATION.length - 1)) * 1000);
    let jwtToken = req.cookies['jwttoken'];
    const refreshToken = req.cookies['refreshtoken'];

    if (jwtToken) {
        await verifyJwtToken(jwtToken);
        next();
    }
    else if (refreshToken) {

        jwtToken = await getAJwtToken(refreshToken);

        if (jwtToken) {
            res.cookie('jwttoken', jwtToken, { expires: tokenMaxAge, httpOnly: true, sameSite: 'strict' });
            next();
        }
    } else {
        res.json({
            message: "You are not logged in."
        })
    }


}

module.exports = {
    checkToken
}