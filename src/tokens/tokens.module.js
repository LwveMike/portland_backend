const { createRefreshToken, getAllRefreshTokens, verifyRefreshToken, verifyJwtToken, getAJwtToken, removeExpiredTokenFromDb } = require('./tokens.service');
const tokensController = require('./tokens.controller');

module.exports = {
    createRefreshToken,
    getAllRefreshTokens,
    verifyRefreshToken,
    verifyJwtToken,
    getAJwtToken,
    removeExpiredTokenFromDb,
    tokensController
}