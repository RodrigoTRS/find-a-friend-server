import { OrgsRepository } from "@/repositories/orgs-repository";
import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OutOfScaleError } from "./errors/out-of-scale-error";

interface FetchPetsByCityUseCaseRequset {
  city: string;
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsByCityUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute({
    city,
  }: FetchPetsByCityUseCaseRequset): Promise<FetchPetsByCityUseCaseResponse> {
    const orgs = await this.orgsRepository.fetchByCity(city);

    const pets = (
      await Promise.all(
        await orgs.map(async (org) => {
          return await this.petsRepository.fetchByOrg(org.id);
        })
      )
    ).flat();

    return { pets };
  }
}
