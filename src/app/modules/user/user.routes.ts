import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();


router.post('/create', userController.createUser)


router.get(
    '/',
    auth(UserRole.USER, UserRole.ADMIN),
    userController.getAllFromDB
);

router.get(
    '/me',
    auth(UserRole.ADMIN, UserRole.USER),
    userController.getMyProfile
)




router.patch(
    '/:id/status',
    auth(UserRole.USER, UserRole.ADMIN),
    // validateRequest(userValidation.updateStatus),
    userController.changeProfileStatus
);

router.patch(
    "/update-my-profile",
    auth(UserRole.ADMIN, UserRole.USER),
    
);


export const userRoutes = router;