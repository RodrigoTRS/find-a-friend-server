import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetDetailsUseCase } from "../get-pet-details-use-case";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new GetPetDetailsUseCase(petsRepository);

  return useCase;
}
