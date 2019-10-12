import {expect} from 'chai';
import {server} from '../../src/index';
import {agent as request} from 'supertest';
import models from '../../src/models/models';

describe("Auth Test", () => {
    let app = server.app;

    beforeEach(async () => {
        await models.UserModel.deleteMany({});
    })

    it('should GET /auth/signin and return a 200 with login user', async function () {
        let user = new models.UserModel({
            accessToken: "token",
            name: "bar"
        });
        await user.save()

        const res = await request(app)
            .get('/api/v1/auth/signin/token');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.data.name).to.be.equal("bar");
        expect(res.body.data).not.to.be.empty;
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.be.undefined;
    });

    it('should GET /auth/signin and return a 404 not found user', async function () {
        const res = await request(app)
            .get('/api/v1/auth/signin/token');
        expect(res.status).to.equal(404);
    });

    it('should GET /auth/signup and return a 200 with created user', async function () {
        const res = await request(app)
            .get('/api/v1/auth/signup/name');
        expect(res.status).to.equal(200);

        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an("object");
        expect(res.body.data.name).to.be.equal("name");
        expect(res.body.data).not.to.be.empty;
        expect(res.body.error).to.be.undefined;

        const res2 = await request(app)
            .get('/api/v1/auth/signup/name');
        expect(res2.status).to.equal(409);
    });

    it('should GET /auth/signup and return 409 for a existing user', async function () {
        let user = new models.UserModel({
            accessToken: "token",
            name: "bar"
        });

        await user.save()

        const res2 = await request(app)
            .get('/api/v1/auth/signup/bar');
        expect(res2.status).to.equal(409);
    });
    
    it('should GET /auth/signup and return 409 for a existing user', async function () {
        let user = new models.UserModel({
            accessToken: "token",
            name: "bar"
        });

        await user.save()

        const res2 = await request(app)
            .get('/api/v1/auth/signup/bar');
        expect(res2.status).to.equal(409);
    });
});