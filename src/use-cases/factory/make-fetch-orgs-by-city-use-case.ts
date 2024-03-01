import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchOrgsByCityUseCase } from "../fetch-orgs-by-city-use-case";

export function makeCreatePetUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new FetchOrgsByCityUseCase(orgsRepository);

  return useCase;
}
