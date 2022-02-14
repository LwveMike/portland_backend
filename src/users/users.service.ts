import { PrismaClient, Roles } from "@prisma/client";
import bcrypt from 'bcrypt';
import CreateUserDto from "./dto/createUser.dto.";
import UpdateUserDto from "./dto/updateUser.dto";
import User from "./types/User";

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany();
    return users;
}

const createUser = async (createUserDto: CreateUserDto): Promise<User> => {

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

        const user = await prisma.user.create({
            data: {
                ...createUserDto,
                role: Roles.user,
            }
        });

        return user;
}


const getOneUserByNameOrNull = async (username: string): Promise<User | null> => {

        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (user)
            return user;
        else
            return null;

}

const getOneUserById = async (paramId: string): Promise<User | null> => {

    const  id = parseInt(paramId)

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if(user)
            return user;
        return null;

    } catch (error) {
        return null;
    } 
}

const deleteOneUser = async (paramId: string): Promise<void> => {

    const id = parseInt(paramId);

    await prisma.user.delete({
        where: {
            id: id
        }
    })
}


const updateOneUser = async (paramId: string, updateUserDto: UpdateUserDto): Promise<User | void> => {
    
    const id = parseInt(paramId);

    const user = await prisma.user.update({
        where: {
            id
        },
        data: updateUserDto
    })

    if (user)
        return user;
}

export {
    createUser,
    getOneUserByNameOrNull,
    getOneUserById,
    getAllUsers,
    deleteOneUser,
    updateOneUser
}