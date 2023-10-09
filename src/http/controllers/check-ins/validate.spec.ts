import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { CreateAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"

describe("Validate Check-in. (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to validate a check-in", async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    let chekcIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const reponse = await request(app.server)
      .patch(`/check-ins/${chekcIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(reponse.statusCode).toEqual(204)

    chekcIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: chekcIn.id,
      },
    })

    expect(chekcIn.validated_at).toEqual(expect.any(Date))
  })
})
