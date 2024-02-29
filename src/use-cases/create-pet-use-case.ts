import { OrgsRepository } from "@/repositories/orgs-repository";
import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OutOfScaleError } from "./errors/out-of-scale-error";

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
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    if (age < 0 || age > 50) {
      throw new OutOfScaleError("age");
    }

    if (energy_level < 0 || energy_level > 5) {
      throw new OutOfScaleError("energy level");
    }

    if (independency < 0 || independency > 5) {
      throw new OutOfScaleError("energy level");
    }

    if (size < 0 || size > 5) {
      throw new OutOfScaleError("energy level");
    }

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
