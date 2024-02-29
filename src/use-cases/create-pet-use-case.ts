import { OrgsRepository } from "@/repositories/orgs-repository";
import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetUseCaseRequset {
  name: string;
  description?: string;
  age: number;
  energy_level: number;
  independency: number;
  size: number;
  org_id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    description,
    age,
    energy_level,
    independency,
    org_id,
    size,
  }: CreatePetUseCaseRequset): Promise<CreatePetUseCaseResponse> {
    const org = this.orgsRepository.findById(org_id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    // TODO - Metadata validation in here [age, energy_level, independency, size]

    const pet = await this.petsRepository.create({
      name,
      description,

      age,
      energy_level,
      independency,
      size,

      org_id,
    });

    return { pet };
  }
}
