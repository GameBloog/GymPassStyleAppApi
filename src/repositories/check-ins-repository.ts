import { CheckIn, Prisma } from "@prisma/client"

export interface CheckInsRepository {
  findByUserIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(user_id:string, page:number): Promise<CheckIn[]>
  countByUserId(user_id: string):Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
