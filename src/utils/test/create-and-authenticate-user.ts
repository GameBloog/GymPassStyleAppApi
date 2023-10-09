import fastify, { FastifyInstance } from "fastify"
import request from "supertest"

export async function CreateAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "123456",
  })

  const authReponse = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "123456",
  })

  const { token } = authReponse.body

  return { token }
}
