import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findByName(name: string): Promise<Org | null>;
}
