import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { CreateAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Search Gyms. (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to search gyms by title", async () => {
    const { token } = await CreateAndAuthenticateUser(app, true)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Some Gym",
        phone: "11999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some Gym",
        phone: "11999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    const reponse = await request(app.server)
      .get("/gyms/search")
      .query({ query: "Javascript" })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(reponse.statusCode).toEqual(200)
    expect(reponse.body.gyms).toHaveLength(1)
    expect(reponse.body.gyms).toEqual([
      expect.objectContaining({
        title: "Javascript Gym",
      }),
    ])
  })
})
