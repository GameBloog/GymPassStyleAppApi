import { expect, describe, it, beforeEach, afterEach, vi } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { ValidateCheckInUseCase } from "./validade-check-in"
import { ResourceNotfoundError } from "./errors/resource-not-found-error"

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe("Validate Check-in use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it("Should be able to validate the check in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it("Should not be able to validate an inexistent check-in", async () => {
    expect(
      async () =>
        await sut.execute({
          checkInId: "inextistent-check-in-id",
        })
    ).rejects.toBeInstanceOf(ResourceNotfoundError)
  })
})