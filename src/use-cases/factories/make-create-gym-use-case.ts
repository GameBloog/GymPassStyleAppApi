import { CreateGymUseCase } from "../create-gym"
import { SearchGymsUseCase } from "../search-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorys"

export function makeCreateGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
