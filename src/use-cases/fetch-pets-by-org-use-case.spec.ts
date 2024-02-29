import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { FetchPetsByOrgUseCase } from "./fetch-pets-by-org-use-case";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FetchPetsByOrgUseCase;

describe("Fetch pets by org use case: ", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchPetsByOrgUseCase(petsRepository);
  });

  it("should be able to fetch a pet from an org", async () => {
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

    const pet = await petsRepository.create({
      name: "pet-01",
      age: 1,
      energy_level: 1,
      independency: 1,
      size: 1,
      description: undefined,
      org_id: org.id,
    });

    const { pets } = await sut.execute({
      org_id: org.id,
    });

    expect(pets).toEqual([
      expect.objectContaining({
        name: "pet-01",
      }),
    ]);
  });
});
