import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export class PrismaPetsRepository implements PetsRepository {
  async create(pet: Prisma.PetUncheckedCreateInput) {
    const newPet = await prisma.pet.create({
      data: {
        name: pet.name,
        description: pet.description,
        age: pet.age,
        energy_level: pet.energy_level,
        size: pet.size,
        independency: pet.independency,
        pre_requisites: pet.pre_requisites,
        org_id: pet.org_id,
      },
    });

    return newPet;
  }

  async fetchByOrg(org_id: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id,
      },
    });

    return pets;
  }

  async getDetails(pet_id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: pet_id,
      },
    });

    return pet;
  }
}
