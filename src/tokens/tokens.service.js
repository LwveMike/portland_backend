const { PrismaClient } = require('@prisma/client');
const e = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

const createRefreshToken = async (createRefreshTokenDto) => {

    try {
        const token = prisma.tokens.create({
            data: {
                refresh_token: await jwt.sign(createRefreshTokenDto, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_DURATION })
            }
        })

        return token;
    } catch (error) {
        return {
            message: "Refresh Token couldn't be created.",
            error
        }
    }
}


const getAllRefreshTokens = async () => {

    try {
        const tokens = await prisma.tokens.findMany();
        return tokens;
    } catch (error) {
        return {
            message: "Tokens couldn't be retrieved.",
            error
        }
    }
}

const getOneRefreshTokenOrNull = async (token) => {

    try {
        const dbToken = await prisma.tokens.findFirst({
            where: {
                id: token.id
            }
        });

        if (dbToken)
            return dbToken;
        else
            return null;

    } catch (error) {
        return {
            message: "Couldn't retrieve that token from db.",
            error
        }
    }
}


const verifyRefreshToken = async (refreshToken) => {

    try {

        const dbToken = await getOneRefreshTokenOrNull(refreshToken);

        if (dbToken) {

            try {

                await jwt.verify(refreshToken.refresh_token, process.env.REFRESH_SECRET);

                return true;
                // return {
                //     message: "Token is valid.",
                //     refreshToken
                // }
            } catch (error) {

                if (error.name === "TokenExpiredError") {
                    await removeExpiredTokenFromDb(dbToken);

                    return false;
                    // return {
                    //     message: error.message
                    // }
                }

                return false;

                // return {
                //     message: "Refresh Token Error",
                //     error
                // }
            }

        } else {

            return false;
            // return {
            //     message: "Provided Token is fake."
            // }
        }

    } catch (error) {

        return false;

        // return {
        //     message: "The Refresh Token couldn't be verified.",
        //     error
        // }
    }
}


const removeExpiredTokenFromDb = async (token) => {
    try {
        await prisma.tokens.delete({
            where: {
                id: token.id
            }
        });

    } catch (error) {

        return false;
        // return {
        //     message: "The Refresh Token coulnd't be deleted.",
        //     error
        // }
    }
}



const getAJwtToken = async (refresh_token) => {

    try {
        const valid = await verifyRefreshToken(refresh_token);

        if (refresh_token && valid) {

            const { id, username } = await jwt.decode(refresh_token, process.env.REFRESH_SECRET);

            const jwtToken = await jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });

            return jwtToken;
        } else {
            return false;
        }


    } catch (error) {
        return false;
    }


}


const verifyJwtToken = async (token) => {

    try {
        await jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

const clearUnusedRefreshTokens = async () => {

    try {
        const tokens = await getAllRefreshTokens();


        for (let token of tokens) {
            await verifyRefreshToken(token);
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createRefreshToken,
    getAllRefreshTokens,
    verifyRefreshToken,
    getOneRefreshTokenOrNull,
    getAJwtToken,
    removeExpiredTokenFromDb,
    clearUnusedRefreshTokens,
    verifyJwtToken
}