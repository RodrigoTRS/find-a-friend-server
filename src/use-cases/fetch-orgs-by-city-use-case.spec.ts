import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { FetchOrgsByCityUseCase } from "./fetch-orgs-by-city-use-case";

let orgsRepository: InMemoryOrgsRepository;
let sut: FetchOrgsByCityUseCase;

describe("Fetch orgs by city use case: ", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchOrgsByCityUseCase(orgsRepository);
  });

  it("should be able to fetch an org by a city", async () => {
    await orgsRepository.create({
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

    const { orgs } = await sut.execute({
      city: "São Carlos",
    });

    expect(orgs).toHaveLength(1);
  });
});
