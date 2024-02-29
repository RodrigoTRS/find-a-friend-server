import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { GetPetDetailsUseCase } from "./get-pet-details-use-case";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: GetPetDetailsUseCase;

describe("Get pet details use case: ", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it("should be able to get a pet details", async () => {
    const org = await orgsRepository.create({
      name: "org-01",
      email: "org@email.com",
      whatsapp: "+55 (19) 99849-9946",
      street: "Rua Arcelino Popó de Freitas",
      number: 32,
      city: "São Carlos",
      password_hash: await hash("123456", 6),
      state: "SP",
      country: "Brasil",
      postal_code: "13564060",
    });

    const createdPet = await petsRepository.create({
      name: "pet-01",
      age: 1,
      energy_level: 1,
      independency: 1,
      size: 1,
      description: undefined,
      org_id: org.id,
    });

    const { pet } = await sut.execute({
      pet_id: createdPet.id,
    });

    expect(pet).toEqual(
      expect.objectContaining({
        id: createdPet.id,
      })
    );
  });
});
