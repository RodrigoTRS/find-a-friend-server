import { $Enums, Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";
import { StringAsNumber } from "fastify/types/utils";

export class InMemoryOrgsRepository implements OrgsRepository {
  private items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      street: data.street,
      number: data.number,
      city: data.city,
      state: data.state,
      country: data.country,
      postal_code: data.postal_code,
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => {
      return item.email === email;
    });

    if (!org) {
      return null;
    }

    return org;
  }

  async findById(id: string) {
    const org = this.items.find((item) => {
      return item.id === id;
    });

    if (!org) {
      return null;
    }

    return org;
  }

  async fetchByCity(city: string) {
    const orgs = this.items.filter((item) => {
      return item.city === city;
    });

    return orgs;
  }
}
