import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  private items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: randomUUID(),
      name: data.name,
      email: data.email ?? null,
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

  async findByName(name: string) {
    const org = this.items.find((item) => {
      return item.name === name;
    });

    if (!org) {
      return null;
    }

    return org;
  }
}
