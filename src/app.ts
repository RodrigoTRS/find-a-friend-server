import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { petsRoutes } from "./http/controllers/pets/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "30m",
  },
});

app.register(fastifyCookie);
app.register(cors, {
  origin: true,
  credentials: true,
});

app.register(petsRoutes);
app.register(orgsRoutes);

app.get("/health-check", (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({ message: "health-check OK!" });
});

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error:",
      issues: err.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.log(err);
  } else {
    // TODO - External log tool (Datadog)
  }

  return reply.status(500).send({ message: "Internal server error." });
});
