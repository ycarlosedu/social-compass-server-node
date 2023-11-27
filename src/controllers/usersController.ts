import { FastifyReply, FastifyRequest } from "fastify";
import prismaClient from "../database/prismaClient";

type GenericParams = {
  id: string;
};

type GenericRequest = FastifyRequest & {
  params: GenericParams;
};

type BodyRequest = FastifyRequest & {
  params: GenericParams;
  body: {
    name: string, 
    occupation: string, 
    sex: "Male" | "Female", 
    birthdate: string, 
    address: string, 
    phone: string, 
    image: Buffer,
  }
};

export class UserController {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
      },
    });
    return reply.status(200).send(users);
  }

  async update(request: BodyRequest, reply: FastifyReply) {
    const { id } = request.params;
    const { name, occupation, sex, birthdate, address, phone, image } = request.body;

    const user = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name, 
        occupation, 
        sex, 
        birthdate, 
        address, 
        phone, 
        image
      },
    });

    return reply.status(200).send(user);
  }

  async getByID(request: GenericRequest, reply: FastifyReply) {
    try {
      const id = request.params.id;

      const user = await prismaClient.user.findUnique({
        where: {
          id,
        },
        include: {
          posts: {
            include: {
              author: {
                select: {
                  image: true,
                  name: true,
                  id: true,
                },
              },
              comments: {
                include: {
                  author: {
                    select: {
                      image: true,
                      name: true,
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return reply.status(200).send(user);
    } catch (error) {
      return reply.status(400).send({ message: "Invalid ID" });
    }
  }

  async delete(request: GenericRequest, reply: FastifyReply) {
    const { id } = request.params;
    try {
      await prismaClient.user.delete({
        where: {
          id,
        },
      });
      return reply.status(200).send({ message: "User deleted!" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Error deleting user, try again!" });
    }
  }
}
