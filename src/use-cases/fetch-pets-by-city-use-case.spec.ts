import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city-use-case";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsByCityUseCase;

describe("Fetch orgs by city use case: ", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new FetchPetsByCityUseCase(orgsRepository, petsRepository);
  });

  it("should be able to fetch an org by a city", async () => {
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

    await petsRepository.create({
      name: "pet-01",
      age: 1,
      energy_level: 1,
      independency: 1,
      size: 1,
      description: undefined,
      org_id: org.id,
    });

    const { pets } = await sut.execute({
      city: "São Carlos",
    });

    expect(pets).toHaveLength(1);
  });

  it("should be able to fetch an org by a city, if there is none, return empty", async () => {
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

    await petsRepository.create({
      name: "pet-01",
      age: 1,
      energy_level: 1,
      independency: 1,
      size: 1,
      description: undefined,
      org_id: org.id,
    });

    const { pets } = await sut.execute({
      city: "São Paulo",
    });

    await orgsRepository.create({
      name: "org-02",
      email: "org-02@email.com",
      whatsapp: "+55 (19) 99849-9946",
      street: "Rua Arcelino Popó de Freitas",
      number: 32,
      city: "São Paulo",
      password_hash: await hash("123456", 6),
      state: "SP",
      country: "Brasil",
      postal_code: "13564060",
    });

    expect(pets).toHaveLength(0);
  });
});
