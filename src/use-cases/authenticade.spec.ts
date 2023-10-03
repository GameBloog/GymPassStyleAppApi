import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

let UsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe("Authenticate use case", () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(UsersRepository)
  })
  it("Should be able to authenticate", async () => {
    await UsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("Should not be able to authenticate with wrong email", async () => {
    expect(async () => {
      await sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("Should not be able to authenticate with wrong password", async () => {
    await UsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })

    expect(async () => {
      await sut.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
