const { createRefreshToken } = require('../tokens/tokens.module');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { createUser, getOneUserByNameOrNull } = require('../users/users.module');



const register = async (registerUserDto, response) => {

    try {
        const user = await getOneUserByNameOrNull(registerUserDto.username);
        if (user) {
            return {
                message: 'Username already in use'
            }
        } else {
            const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

            const newUser = await createUser({ ...registerUserDto, password: hashedPassword });

            try {
                const res = await bcrypt.compare(registerUserDto.password, newUser.password);
                if (res) {
                    const refreshToken = await createRefreshToken({ id: newUser.id, username: newUser.username });
                    const token = await jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });

                    const tokenMaxAge = new Date(Date.now() + parseInt(process.env.JWT_DURATION.slice(0, process.env.JWT_DURATION.length - 1)) * 1000);
                    const refreshMaxAge = new Date(Date.now() + parseInt(process.env.REFRESH_DURATION.slice(0, process.env.REFRESH_DURATION.length - 1)) * 1000);



                    response.cookie('jwttoken', token, { expires: tokenMaxAge, httpOnly: true, sameSite: 'strict' },);
                    response.cookie('refreshtoken', refreshToken.refresh_token, { expires: refreshMaxAge, httpOnly: true, sameSite: 'strict' });

                    return {
                        token,
                        refresh_token: refreshToken.refresh_token,
                    }
                }
            } catch (error) {
                return {
                    message: 'Check Credentials',
                    error
                }
            }


        }
    } catch (error) {
        return {
            message: "Registration failed",
            error
        }
    }

}


const login = async (loginUserDto, response) => {
    try {
        const user = await getOneUserByNameOrNull(loginUserDto.username);

        if (user) {

            try {
                const res = await bcrypt.compare(loginUserDto.password, user.password);
                if (res) {
                    const refreshToken = await createRefreshToken({ id: user.id, username: user.username });
                    const token = await jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });

                    const tokenMaxAge = new Date(Date.now() + parseInt(process.env.JWT_DURATION.slice(0, process.env.JWT_DURATION.length - 1)) * 1000);
                    const refreshMaxAge = new Date(Date.now() + parseInt(process.env.REFRESH_DURATION.slice(0, process.env.REFRESH_DURATION.length - 1)) * 1000);



                    response.cookie('jwttoken', token, { expires: tokenMaxAge, httpOnly: true, sameSite: 'strict' },);
                    response.cookie('refreshtoken', refreshToken.refresh_token, { expires: refreshMaxAge, httpOnly: true, sameSite: 'strict' });

                    return {
                        token,
                        refresh_token: refreshToken.refresh_token,
                    }
                }
            } catch (error) {
                return {
                    message: 'Check Credentials',
                    error
                }
            }
        }
        return {
            message: `There is no user with username ${loginUserDto.username}`
        }

    } catch (error) {
        return {
            message: "Login Failed",
            error
        }
    }
}

module.exports = {
    register,
    login
}