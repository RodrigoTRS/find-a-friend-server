import { OrgsRepository } from "@/repositories/orgs-repository";
import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OutOfScaleError } from "./errors/out-of-scale-error";

interface FetchPetsByOrgUseCaseRequset {
  org_id: string;
}

interface FetchPetsByOrgUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsByOrgUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    org_id,
  }: FetchPetsByOrgUseCaseRequset): Promise<FetchPetsByOrgUseCaseResponse> {
    const pets = await this.petsRepository.fetchByOrg(org_id);
    return { pets };
  }
}
