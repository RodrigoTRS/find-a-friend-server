import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-with-same-email-error";

interface CreateOrgUseCaseRequset {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  street: string;
  number: number;
  city: string;
  state:
    | "AC"
    | "AP"
    | "AL"
    | "AM"
    | "BA"
    | "CE"
    | "ES"
    | "GO"
    | "MA"
    | "MT"
    | "MS"
    | "MG"
    | "PA"
    | "PB"
    | "PR"
    | "PE"
    | "PI"
    | "RJ"
    | "RN"
    | "RS"
    | "RO"
    | "RR"
    | "SP"
    | "SE"
    | "TO";
  country: "Brasil";
  postal_code: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    whatsapp,
    password,
    street,
    number,
    city,
    state,
    country,
    postal_code,
  }: CreateOrgUseCaseRequset): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      whatsapp,
      password_hash,
      street,
      number,
      city,
      state,
      country,
      postal_code,
    });

    return { org };
  }
}
