const { PrismaClient, Roles } = require('@prisma/client');

const prisma = new PrismaClient();


const createUser = async (createUserDto) => {

    try {
        const user = await prisma.user.create({
            data: {
                ...createUserDto,
                role: Roles.user,
            }
        });

        return user;
    } catch (error) {
        return {
            message: "User wasn't created successful",
            error
        }
    }
}


const getOneUserByNameOrNull = async (username) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (user)
            return user;
        else
            return null;
    } catch (error) {
        return {
            message: "Error while trying to find a user by name",
            error
        }
    }

}


module.exports = {
    createUser,
    getOneUserByNameOrNull
}