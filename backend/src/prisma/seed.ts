import { PrismaClient, Role } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: adminPassword,
            role: Role.ADMIN,
            isEmailVerified: true
        }
    });

    console.log('✅ Created admin user:', admin.email);

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 12);
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            name: 'John Player',
            password: userPassword,
            role: Role.USER,
            isEmailVerified: true
        }
    });

    console.log('✅ Created regular user:', user.email);

    // Create sample high scores
    const highScores = [
        { playerName: 'PACMASTER', score: 125430, level: 8, userId: user.id },
        { playerName: 'GHOSTHUNTER', score: 98760, level: 6, userId: user.id },
        { playerName: 'PELLETKING', score: 87654, level: 5 },
        { playerName: 'MAZEGURU', score: 76543, level: 4 },
        { playerName: 'DOTMUNCHER', score: 65432, level: 3 },
    ];

    for (const highScoreData of highScores) {
        await prisma.highScore.upsert({
            where: { 
                id: `${highScoreData.playerName}-${highScoreData.score}` 
            },
            update: {},
            create: {
                id: `${highScoreData.playerName}-${highScoreData.score}`,
                playerName: highScoreData.playerName,
                score: highScoreData.score,
                level: highScoreData.level,
                userId: highScoreData.userId || null
            }
        });
    }

    console.log('✅ Created high scores');

    // Create game stats for the user
    await prisma.gameStats.upsert({
        where: { userId: user.id },
        update: {},
        create: {
            userId: user.id,
            gamesPlayed: 47,
            totalScore: 234560,
            highestLevel: 6,
            totalPelletsEaten: 1893,
            totalGhostsEaten: 124,
            averageScore: 4990
        }
    });

    console.log('✅ Created game stats');
}

main()
    .catch(e => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
