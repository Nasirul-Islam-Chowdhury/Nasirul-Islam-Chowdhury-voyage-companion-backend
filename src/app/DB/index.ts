import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../shared/prisma";
import config from "../../config";
import bcrypt from "bcrypt";



const seedAdmin = async () => {

  const hashedPassword: string = await bcrypt.hash(config.admin_password!, 12);
  const admin = {
    email: 'nasir@gmail.com',
    username:"nasir",
    password: hashedPassword!,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  
  };
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await prisma.user.findUnique({ where:{
    role: UserRole.ADMIN,
    username: admin.username,
    email: admin.email
  } });

  if (!isSuperAdminExits) {
    await prisma.user.create({data:admin});
  }
};

export default seedAdmin;