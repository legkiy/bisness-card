import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';
import 'dotenv/config';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
  it('возвращает профиль со связанными данными через GraphQL', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        query {
          profile {
            name
            links { name url }
            skills { name }
            experience {
              company
              position
              startDate
              endDate
              achievements
            }
            projects { name url }
          }
        }
      `,
      })
      .expect(200);

    expect(response.body.errors).toBeUndefined();

    const profile = response.body.data.profile;

    expect(profile.name).toBe('Максаков Никита Владимирович');

    expect(profile.links).toEqual([
      { name: 'Telegram', url: 'https://t.me/legkeey' },
      { name: 'GitHub', url: 'https://github.com/legkiy' },
    ]);

    expect(profile.skills).toHaveLength(42);
    expect(profile.skills[0].name).toBe('TypeScript');

    expect(profile.experience).toHaveLength(5);
    expect(profile.experience[0]).toMatchObject({
      company: 'Cosmos Hotel Group',
      startDate: '2025-02-01T00:00:00.000Z',
      endDate: null,
    });
    expect(profile.experience[0].achievements.length).toBeGreaterThan(0);

    expect(profile.projects).toEqual([
      {
        name: 'Сайт Cosmos Hotel Group',
        url: 'https://cosmosgroup.ru',
      },
    ]);
  });
});
