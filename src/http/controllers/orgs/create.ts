import { OrgAlreadyExistsError } from "@/use-cases/errors/org-with-same-email-error";
import { makeCreateOrgUseCase } from "@/use-cases/factory/make-create-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string().min(6),
    postal_code: z.string(),
    number: z.coerce.number(),
    street: z.string(),
    city: z.string(),
    state: z.enum([
      "AC",
      "AP",
      "AL",
      "AM",
      "BA",
      "CE",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SP",
      "SE",
      "TO",
    ]),
    country: z.enum(["Brasil"]),
  });

  const org = createOrgBodySchema.parse(request.body);

  try {
    const useCase = makeCreateOrgUseCase();

    await useCase.execute(org);
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
