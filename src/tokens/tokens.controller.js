const tokensController = require('express').Router();

const { getAllRefreshTokens, verifyRefreshToken, getAJwtToken, clearUnusedRefreshTokens } = require('./tokens.service');

tokensController.get('/', async (req, res) => {
    const tokens = await getAllRefreshTokens();

    res.json(tokens);
})

tokensController.post('/verify-refresh', async (req, res) => {
    const verified = await verifyRefreshToken(req.body.token);

    res.json(verified);
})

tokensController.post('/get-jwt', async (req, res) => {
    const idk = await getAJwtToken(req);

    res.json(idk);
})

tokensController.get('/clear', async (req, res) => {
    await clearUnusedRefreshTokens();
    res.json({ message: 'success' });
})


module.exports = tokensController;