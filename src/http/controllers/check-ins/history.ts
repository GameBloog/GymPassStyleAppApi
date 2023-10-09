import { makeFetchUserChekcInHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const chekcInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = chekcInHistoryQuerySchema.parse(request.query)

  const fetchUserChekcInHistory = makeFetchUserChekcInHistoryUseCase()

  const { checkIns } = await fetchUserChekcInHistory.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
