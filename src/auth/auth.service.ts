import { createRefreshToken } from "../tokens/tokens.service";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, getOneUserByNameOrNull } from '../users/users.module'
import RegisterUserDto from "./dto/registerUser.dto";
import { Response } from "express";
import ErrorMessage from "../globalTypes/Message";
import LoginUserDto from "./dto/loginUser.dto";

import { jwtSecret, jwtDuration, refreshDuration } from "../envConfig";

const register = async (registerUserDto: RegisterUserDto, response: Response): Promise<ErrorMessage> => {

    const user = await getOneUserByNameOrNull(registerUserDto.username);

    if (user) {
        return {
            message: 'User already registered.'
        }
    } else {
        const newUser = await createUser({ ...registerUserDto});
        await login(registerUserDto, response);

        return {
            message: 'User registered successfuly'
        }
    }

}


const login = async (loginUserDto: LoginUserDto, response: Response): Promise<ErrorMessage | void> => {
    const user = await getOneUserByNameOrNull(loginUserDto.username);

    if (user) {
        const res = await bcrypt.compare(loginUserDto.password, user.password);
        if (res) {
            const refreshToken = await createRefreshToken({ id: user.id, username: user.username });
            const token = await jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: jwtDuration });

            const tokenMaxAge = new Date(Date.now() + parseInt(jwtDuration.slice(0, jwtDuration.length - 1)) * 1000);
            const refreshMaxAge = new Date(Date.now() + parseInt(refreshDuration.slice(0, refreshDuration.length - 1)) * 1000);

            response.cookie('jwttoken', token, { expires: tokenMaxAge, httpOnly: true, sameSite: 'strict' });
            response.cookie('refreshtoken', refreshToken.refresh_token, { expires: refreshMaxAge, httpOnly: true, sameSite: 'strict' });

            return {
                message: 'success login'
            }

        } else {
            return {
                message: "The passwords didn't match"
            }
        }
    } else {
        return {
            message: `There is no user with username ${loginUserDto.username}`
        }
    }
}

const logout = async(res: Response): Promise<void> => {

    res.cookie('jwttoken', '', { expires: new Date(+0), httpOnly: true, sameSite: 'strict' });
    res.cookie('refreshtoken', '', { expires: new Date(+0), httpOnly: true, sameSite: 'strict' });
}

export {
    register,
    login,
    logout
}