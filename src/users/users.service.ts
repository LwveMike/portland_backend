import { PrismaClient, Roles } from '@prisma/client';
import bcrypt from 'bcrypt';
import CreateUserDto from './dto/createUser.dto.';
import UpdateUserDto from './dto/updateUser.dto';
import User from './types/User';

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

const createUser = async (createUserDto: CreateUserDto): Promise<User> => {
  const userData = {
    ...createUserDto,
    password: await bcrypt.hash(createUserDto.password, 10),
  };

  const user = await prisma.user.create({
    data: {
      ...userData,
      role: Roles.user,
    },
  });

  return user;
};

const getOneUserByNameOrNull = async (username: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user) return user;
  return null;
};

const getOneUserById = async (paramId: string): Promise<User | null> => {
  const id = parseInt(paramId, 10);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) return user;
    return null;
  } catch (error) {
    return null;
  }
};

const getUserData = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user as User;
};

const deleteOneUser = async (paramId: string): Promise<void> => {
  const id = parseInt(paramId, 10);

  await prisma.user.delete({
    where: {
      id,
    },
  });
};

const updateOneUser = async (paramId: string, updateUserDto: UpdateUserDto)
: Promise<User | boolean> => {
  const id = parseInt(paramId, 10);

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: updateUserDto,
  });

  if (user) return user;
  return false;
};

export {
  createUser,
  getOneUserByNameOrNull,
  getOneUserById,
  getAllUsers,
  deleteOneUser,
  updateOneUser,
  getUserData,
};
