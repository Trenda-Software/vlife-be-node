import request from 'supertest';
import app from '../server';

describe('Post Endpoints', () => {
    it('should ping a live post endpoint', async () => {
        const res = await request(app).post('/live');
        expect(res.status).toEqual(201);
    });
});
