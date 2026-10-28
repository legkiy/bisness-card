import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import {
  profileData,
  linksData,
  skillsData,
  projectsData,
  experienceData,
} from './seed-data.js';

async function main(): Promise<void> {
  const connectionString = process.env['DATABASE_URL'];

  if (!connectionString) {
    throw new Error('DATABASE_URL is required');
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
      connectionTimeoutMillis: 5_000,
    }),
  });

  try {
    await prisma.$transaction(async (tx) => {
      const { id, ...profile } = profileData;
      await tx.profile.upsert({
        where: { id },
        create: profileData,
        update: profile,
      });

      for (const link of linksData) {
        const { id, ...data } = link;
        await tx.profileLink.upsert({
          where: { id },
          create: link,
          update: data,
        });
      }

      for (const skill of skillsData) {
        const { id, ...data } = skill;
        await tx.skill.upsert({
          where: { id },
          create: skill,
          update: data,
        });
      }

      for (const experience of experienceData) {
        const { id, ...data } = experience;
        await tx.experience.upsert({
          where: { id },
          create: experience,
          update: data,
        });
      }

      for (const project of projectsData) {
        const { id, ...data } = project;
        await tx.project.upsert({
          where: { id },
          create: project,
          update: data,
        });
      }
    });

    console.log('Seed выполнен: данные созданы или обновлены');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
