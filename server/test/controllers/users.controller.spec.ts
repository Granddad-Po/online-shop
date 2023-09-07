import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/user/model/user.schema'; // Replace with the correct path to your User model
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Model } from 'mongoose';

describe('User Controller', () => {
    let app: INestApplication;
    let model: Model<User>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        create: jest.fn(),
                        findOneAndDelete: jest.fn(),
                    },
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        model = module.get<Model<User>>(getModelToken(User.name));
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash('max123', 7);

        await model.create({
            username: 'Max',
            password: hashedPassword,
            email: 'max@email.com',
        });
    });

    afterEach(async () => {
        await model.findOneAndDelete({ username: 'Max' });
    });

    it('should create user', async () => {
        const newUser = {
            username: 'Test',
            email: 'test@email.com',
            password: 'test123',
        };

        const hashedPassword = await bcrypt.hash(newUser.password, 7);
        await model.create({
            username: newUser.username,
            password: hashedPassword,
            email: newUser.email,
        });

        const response = await request(app.getHttpServer())
            .post('/users/registration') // Added a '/' in the route
            .send(newUser)
            .expect(HttpStatus.CREATED);

        const passwordValid = await bcrypt.compare(
            newUser.password,
            response.body.password,
        );

        expect(response.body.username).toBe(newUser.username);
        expect(passwordValid).toBe(true);
        expect(response.body.email).toBe(newUser.email);
    });
});
