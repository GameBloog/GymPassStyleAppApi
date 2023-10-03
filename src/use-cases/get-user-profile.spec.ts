import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { GetUserProfileUseCase } from "./get-user-profile"
import { ResourceNotfoundError } from "./errors/resource-not-found-error"

let UsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe("Get user profile use case", () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(UsersRepository)
  })
  it("Should be able to get user profile", async () => {
    const createdUser = await UsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual("John Doe")
  })

  it("Should not be able to get user profile with wrong id", async () => {
    expect(async () => {
      await sut.execute({
        userId: "non-existing-id",
      })
    }).rejects.toBeInstanceOf(ResourceNotfoundError)
  })
})
