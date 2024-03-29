import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  private items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const preRequisitesArray = data.pre_requisites
      ? Array(String(data.pre_requisites))
      : [];

    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      description: data.description ?? null,
      energy_level: data.energy_level,
      independency: data.independency,
      size: data.size,
      pre_requisites: preRequisitesArray,
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }

  async fetchByOrg(org_id: string) {
    const pets = this.items.filter((item) => {
      return item.org_id === org_id;
    });

    return pets;
  }

  async getDetails(pet_id: string) {
    const pet = this.items.find((item) => {
      return item.id === pet_id;
    });

    if (!pet) {
      return null;
    }

    return pet;
  }
}
