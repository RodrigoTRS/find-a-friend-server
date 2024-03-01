import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateUseCase } from "../authenticate-use-case";

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new AuthenticateUseCase(orgsRepository);

  return useCase;
}
