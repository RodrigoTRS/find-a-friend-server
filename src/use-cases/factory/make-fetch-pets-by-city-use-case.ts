import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchPetsByCityUseCase } from "../fetch-pets-by-city-use-case";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new FetchPetsByCityUseCase(orgsRepository, petsRepository);

  return useCase;
}
