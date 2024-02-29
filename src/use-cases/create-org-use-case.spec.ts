import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create-org-use-case";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { compare } from "bcryptjs";
import { OrgWithSameEmailError } from "./errors/org-with-same-email-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe("Create Org use case: ", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should be able to create an org", async () => {
    const { org } = await sut.execute({
      name: "org-01",
      email: "org@email.com",
      whatsapp: "+55 (19) 99849-9946",
      street: "Rua Arcelino Popó de Freitas",
      number: 32,
      city: "São Carlos",
      password: "123456",
      state: "SP",
      country: "Brasil",
      postal_code: "13564060",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should be able to hash an org password", async () => {
    const { org } = await sut.execute({
      name: "org-01",
      email: "org@email.com",
      whatsapp: "+55 (19) 99849-9946",
      street: "Rua Arcelino Popó de Freitas",
      number: 32,
      city: "São Carlos",
      password: "123456",
      state: "SP",
      country: "Brasil",
      postal_code: "13564060",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      org.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to create an org with same email", async () => {
    await sut.execute({
      name: "org-01",
      email: "org@email.com",
      whatsapp: "+55 (19) 99849-9946",
      street: "Rua Arcelino Popó de Freitas",
      number: 32,
      city: "São Carlos",
      password: "123456",
      state: "SP",
      country: "Brasil",
      postal_code: "13564060",
    });

    expect(
      async () =>
        await sut.execute({
          name: "org-01",
          email: "org@email.com",
          whatsapp: "+55 (19) 99849-9946",
          street: "Rua Arcelino Popó de Freitas",
          number: 32,
          city: "São Carlos",
          password: "123456",
          state: "SP",
          country: "Brasil",
          postal_code: "13564060",
        })
    ).rejects.toBeInstanceOf(OrgWithSameEmailError);
  });
});
