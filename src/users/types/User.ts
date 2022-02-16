import { Roles } from '@prisma/client';

export default class User {
  id: number;

  username: string;

  password: string;

  avatar: string;

  role: Roles;
}
