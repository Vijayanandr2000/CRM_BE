const request = require('supertest');
const jwt = require("jsonwebtoken");

const db = require('../db');
const User = require('../../model/user.model');
const authConfig = require("../../config/auth.config");

let app = require('../../index');
let token;

beforeAll(async () => {
    await db.clearDb();

    await User.create({
        name: "vijay",
        userId: "vijayTest1",
        email: "vijayTest@email.com",
        userType: "ADMIN",
        userStatus: "APPROVED",
        password: "Gokul@123",
        ticketsCreated : [],
        ticketsAssigned : [] 
    })

    token = jwt.sign({id : "vijayTest1"}, authConfig.secret, {
        expiresIn : 1200
    });
})

afterAll(async () => {
    console.log("After all the code has been executed");
    await db.closeDb();
})

describe('Find all users', () => {
    it("find all the users", async () => {

        const res = await request(app).get("/crm/api/v1/user").set("x-access-token", token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "vijay",
                    userId: "vijayTest1",
                    email: "vijaytest@email.com",
                    userType: "ADMIN",
                    userStatus: "APPROVED"
                })
            ])
        )
    })
})

describe('Find user by Id', () => {
    it("find user by Id", async () => {
        const userId = "vijayTest1"
        const res = await request(app).get(`/crm/api/v1/user/${userId}`).set("x-access-token", token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    userId: userId
                })
            ])
        )
    })
})