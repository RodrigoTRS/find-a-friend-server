import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { CreatePetUseCase } from "./create-pet-use-case";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { Org } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OutOfScaleError } from "./errors/out-of-scale-error";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetUseCase;

describe("Create Pet use case: ", () => {
  beforeEach(async () => {
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

  it("should not be able to create an pet in an unexistent org", async () => {
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

    expect(
      async () =>
        await sut.execute({
          name: "pet-01",
          age: 1,
          energy_level: 1,
          independency: 1,
          size: 1,
          description: undefined,
          org_id: "wrong_id",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to create an pet with out of scale age", async () => {
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

    expect(
      async () =>
        await sut.execute({
          name: "pet-01",
          age: 55,
          energy_level: 1,
          independency: 1,
          size: 1,
          description: undefined,
          org_id: org.id,
        })
    ).rejects.toBeInstanceOf(OutOfScaleError);
  });

  it("should not be able to create an pet with out of scale energy level", async () => {
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

    expect(
      async () =>
        await sut.execute({
          name: "pet-01",
          age: 1,
          energy_level: 6,
          independency: 1,
          size: 1,
          description: undefined,
          org_id: org.id,
        })
    ).rejects.toBeInstanceOf(OutOfScaleError);
  });

  it("should not be able to create an pet with out of scale independency", async () => {
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

    expect(
      async () =>
        await sut.execute({
          name: "pet-01",
          age: 1,
          energy_level: 1,
          independency: 6,
          size: 1,
          description: undefined,
          org_id: org.id,
        })
    ).rejects.toBeInstanceOf(OutOfScaleError);
  });

  it("should not be able to create an pet with out of scale size", async () => {
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

    expect(
      async () =>
        await sut.execute({
          name: "pet-01",
          age: 1,
          energy_level: 1,
          independency: 1,
          size: 6,
          description: undefined,
          org_id: org.id,
        })
    ).rejects.toBeInstanceOf(OutOfScaleError);
  });
});
