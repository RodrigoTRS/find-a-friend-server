import { OrgsRepository } from "@/repositories/orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { compare, hash } from "bcryptjs";
import { OrgWithSameEmailError } from "./errors/org-with-same-email-error";
import { CreatePetUseCase } from "./create-pet-use-case";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetUseCase;

describe("Create Pet use case: ", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreatePetUseCase(petsRepository, orgsRepository);
  });

  it("should be able to create an pet", async () => {
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

    const { pet } = await sut.execute({
      name: "pet-01",
      age: 1,
      energy_level: 1,
      independency: 1,
      size: 1,
      description: undefined,
      org_id: org.id,
    });

    expect(pet).toEqual(
      expect.objectContaining({
        name: "pet-01",
      })
    );
  });
});
