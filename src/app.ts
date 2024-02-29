import fastify, { FastifyReply, FastifyRequest } from "fastify";

export const app = fastify();

app.get("/health-check", (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({ message: "health-check OK!" });
});
