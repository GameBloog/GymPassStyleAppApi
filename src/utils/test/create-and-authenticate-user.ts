import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import fastify, { FastifyInstance } from "fastify"
import request from "supertest"

export async function CreateAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin: boolean = false
) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  })

  const authReponse = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "123456",
  })

  const { token } = authReponse.body

  return { token }
}
