import { makeCreatePetUseCase } from "@/use-cases/factory/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    age: z.coerce.number().min(1).max(5),
    energy_level: z.coerce.number().min(1).max(5),
    independency: z.coerce.number().min(1).max(5),
    size: z.coerce.number().min(1).max(5),
  });

  const { name, description, age, energy_level, independency, size } =
    createPetBodySchema.parse(request.body);

  const useCase = makeCreatePetUseCase();
  const {} = await useCase.execute({
    name,
    description,
    age,
    energy_level,
    independency,
    size,
    org_id: request.user.sub,
  });

  return reply.status(201).send();
}
