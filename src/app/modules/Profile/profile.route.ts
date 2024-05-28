import  express  from "express"
import { profileController } from "./profile.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();


router.get('/', auth(UserRole.ADMIN, UserRole.USER), profileController.getUserProfile)
router.patch('/update', auth(UserRole.ADMIN, UserRole.USER), profileController.updateProfile)

export const ProfileRoutes = router