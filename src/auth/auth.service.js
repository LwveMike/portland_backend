const bcrypt = require('bcrypt');

const { createUser, getOneUserByNameOrNull } = require('../users/users.module');



const register = async (registerUserDto) => {

    try {
        const user = await getOneUserByNameOrNull(registerUserDto.username);
        if (user) {
            return {
                message: 'Username already in use'
            }
        } else {
            registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);

            const newUser = await createUser(registerUserDto);
            return newUser;
        }
    } catch (error) {
        return {
            message: "Registration failed",
            error
        }
    }

}


const login = async (loginUserDto) => {
    try {
        const user = await getOneUserByNameOrNull(loginUserDto.username);

        if (user) {

            try {
                const res = await bcrypt.compare(loginUserDto.password, user.password);
                if (res)
                    return user;
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