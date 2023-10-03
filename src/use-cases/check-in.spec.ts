import { expect, describe, it, beforeEach, afterEach, vi } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckinUseCase } from "./check-in"

let checkinsRepository: InMemoryCheckInsRepository
let sut: CheckinUseCase

describe("Register use case", () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository()
    sut = new CheckinUseCase(checkinsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("Should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("Should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    })

    expect(async () => {
      await sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it("Should not be able to check in twice but in the different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
