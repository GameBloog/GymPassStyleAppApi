import { expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckinUseCase } from "./check-in"

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckinUseCase

describe("Register use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckinUseCase(checkInsRepository)
  })

  it("Should be able to checkin", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym 01",
      userId: "user-01",
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
