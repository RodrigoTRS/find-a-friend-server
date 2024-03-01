import { Prisma, $Enums } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(org: Prisma.OrgCreateInput) {
    const newOrg = await prisma.org.create({
      data: {
        name: org.name,
        email: org.email,
        password_hash: org.password_hash,
        whatsapp: org.whatsapp,
        street: org.street,
        number: org.number,
        city: org.city,
        state: org.state,
        country: org.country,
        postal_code: org.postal_code,
      },
    });

    return newOrg;
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async fetchByCity(city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
    });

    return orgs;
  }
}
