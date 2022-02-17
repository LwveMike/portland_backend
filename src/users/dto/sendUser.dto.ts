import { Roles } from '@prisma/client';

export default class SendUserDto {
  id: number;

  username: string;

  avatar: string;

  role: Roles;
}
