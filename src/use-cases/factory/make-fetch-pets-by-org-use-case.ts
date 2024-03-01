import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchPetsByOrgUseCase } from "../fetch-pets-by-org-use-case";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new FetchPetsByOrgUseCase(petsRepository);

  return useCase;
}
