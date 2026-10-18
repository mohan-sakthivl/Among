import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { createValidationPipe } from '../src/common/pipes/validation.pipe';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(createValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health should return 200 with { status: "ok" } and X-Request-ID header', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/health').expect(200);

    expect(response.body).toEqual({ status: 'ok' });
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('custom X-Request-ID client header should be preserved if valid UUID', async () => {
    const customId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .set('X-Request-ID', customId)
      .expect(200);

    expect(response.headers['x-request-id']).toBe(customId);
  });

  it('GET /api/v1/not-found should return AMONG error structure with requestId', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/not-found').expect(404);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toHaveProperty('code');
    expect(response.body.error).toHaveProperty('message');
    expect(response.body.error).toHaveProperty('requestId');
    expect(response.body.error.code).toBe('NOT_FOUND');
  });

  it('POST /api/v1/health/test-validate with invalid payload should trigger 400 with AMONG format', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/health/test-validate')
      .send({ unexpectedField: 'invalid' })
      .expect(400);

    expect(response.body.error).toBeDefined();
    expect(response.body.error.code).toBe('BAD_REQUEST');
    expect(response.body.error.requestId).toBeDefined();
    expect(response.body.error.message).toContain('property unexpectedField should not exist');
  });

  it('POST /api/v1/health/test-validate with valid payload should pass validation', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/health/test-validate')
      .send({ name: 'Among Tester' })
      .expect(201);

    expect(response.body).toEqual({ received: 'Among Tester' });
  });
});
