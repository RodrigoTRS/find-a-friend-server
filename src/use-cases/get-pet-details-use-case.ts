import { OrgsRepository } from "@/repositories/orgs-repository";
import { Pet } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgWithSameEmailError } from "./errors/org-with-same-email-error";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPetDetailsRequset {
  pet_id: string;
}

interface GetPetDetailsResponse {
  pet: Pet;
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    pet_id,
  }: GetPetDetailsRequset): Promise<GetPetDetailsResponse> {
    const pet = await this.petsRepository.getDetails(pet_id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
