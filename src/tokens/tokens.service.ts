import { PrismaClient, Tokens } from "@prisma/client";
import jwt from 'jsonwebtoken';
import ErrorMessage from "../globalTypes/Message";
import CreateRefreshTokenDto from "./dto/createRefreshToken.dto";
import JwtPayload from "./types/jwtPayload";

import { refreshSecret, refreshDuration, jwtSecret, jwtDuration } from "../envConfig";

const prisma = new PrismaClient();

const createRefreshToken = async (createRefreshTokenDto: CreateRefreshTokenDto): Promise<Tokens> => {

        const token = prisma.tokens.create({
            data: {
                refresh_token: jwt.sign(createRefreshTokenDto, refreshSecret, { expiresIn: refreshDuration })
            }
        })
        return token;
}

const getAllRefreshTokens = async (): Promise<Tokens[]>  => {

        const tokens = await prisma.tokens.findMany();
        return tokens;

}

const getOneRefreshTokenOrNull = async (token: Tokens): Promise<Tokens | null> => {

    const dbToken = await prisma.tokens.findFirst({
        where: {
            id: token.id
        }
    });

    if (dbToken)
        return dbToken;
    else
        return null;
}

const verifyRefreshToken = async (refreshToken: Tokens): Promise<boolean> => {

        const dbToken = await getOneRefreshTokenOrNull(refreshToken);

        if (dbToken) {
            try {
                jwt.verify(refreshToken.refresh_token, refreshSecret);
                return true;

            } catch (error) {
                await removeExpiredTokenFromDb(dbToken);
                return false;
            }

        } else 
            return false;
}


const removeExpiredTokenFromDb = async (token: Tokens): Promise<boolean | void> => {

        await prisma.tokens.delete({
            where: {
                id: token.id
            }
        });
}

const getAJwtToken = async (refreshToken: Tokens): Promise<string | boolean>  => {

    const valid = await verifyRefreshToken(refreshToken);

    if (refreshToken && valid) {

        try {
            const decoded = jwt.verify(refreshToken.refresh_token, refreshSecret) as JwtPayload;
            const { id, username } = decoded;
            const jwtToken = await jwt.sign({ id, username }, jwtSecret, { expiresIn: jwtDuration });
    
            return jwtToken;
        } catch(error) {
            return false;
        }
    } else 
        return false;
    
}

const verifyJwtToken = async (token: string): Promise<boolean> => {

    try {
        await jwt.verify(token, jwtSecret);

        return true;

    } catch (error) {
        return false;
    }
}

const clearUnusedRefreshTokens = async (): Promise<void | ErrorMessage> => {

        const tokens = await getAllRefreshTokens();

        for (let token of tokens) {
            await verifyRefreshToken(token);
        }
}

export {
    createRefreshToken,
    getAllRefreshTokens,
    verifyRefreshToken,
    getOneRefreshTokenOrNull,
    getAJwtToken,
    removeExpiredTokenFromDb,
    clearUnusedRefreshTokens,
    verifyJwtToken
}