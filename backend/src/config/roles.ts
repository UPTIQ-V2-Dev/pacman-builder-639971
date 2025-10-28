import { Role } from '../generated/prisma/index.js';

const allRoles = {
    [Role.USER]: ['getOwnGameStats', 'manageOwnGameStats'],
    [Role.ADMIN]: ['getUsers', 'manageUsers', 'getGameStats', 'manageGameStats', 'getOwnGameStats', 'manageOwnGameStats']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
