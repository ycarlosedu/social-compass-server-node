import { compare, hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { sign } from "jsonwebtoken";
import prismaClient from "../database/prismaClient";

type LoginRequest = FastifyRequest & {
  body: {
    username: string;
    password: string;
  };
};

type RegisterRequest = FastifyRequest & {
  body: {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    name: string;
  };
};

export class AuthController {
  async login(request: LoginRequest, reply: FastifyReply) {
    const { username, password } = request.body;

    const user = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return reply.status(401).send({
        message: "Username or password incorrect",
      });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return reply.status(401).send({
        message: "Username or password incorrect",
      });
    }

    const token = sign({}, process.env.JWT_SECRET!, {
      subject: user.id,
    });

    return reply.status(200).send({ user, token });
  }

  async register(request: RegisterRequest, reply: FastifyReply) {
    const { name, username, email, password } = request.body;

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        username,
        email,
        password: passwordHash,
      },
    });

    const token = sign({}, process.env.JWT_SECRET!, {
      subject: user.id,
    });

    return reply.status(200).send({ user, token });
  }
}
