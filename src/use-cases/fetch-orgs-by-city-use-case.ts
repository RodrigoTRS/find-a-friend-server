import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OutOfScaleError } from "./errors/out-of-scale-error";

interface FetchOrgsByCityUseCaseRequset {
  city: string;
}

interface FetchOrgsByCityUseCaseResponse {
  orgs: Org[];
}

export class FetchOrgsByCityUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    city,
  }: FetchOrgsByCityUseCaseRequset): Promise<FetchOrgsByCityUseCaseResponse> {
    const orgs = await this.orgsRepository.fetchByCity(city);

    return { orgs };
  }
}
