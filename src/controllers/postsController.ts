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
    text: string;
    location: string;
    image?: Buffer;
    authorId: string;
  };
};

export class PostController {
  async create(request: BodyRequest, reply: FastifyReply) {
    const { text, location, image, authorId } = request.body;

    const post = await prismaClient.post.create({
      data: {
        text,
        location,
        image,
        authorId,
      },
    });

    return reply.status(201).send(post);
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const posts = await prismaClient.post.findMany({
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
    });
    return reply.status(200).send(posts);
  }

  async update(request: BodyRequest, reply: FastifyReply) {
    const { id } = request.params;
    const { text, location, image } = request.body;

    const post = await prismaClient.post.update({
      where: {
        id,
      },
      data: {
        text,
        location,
        image,
      },
    });

    return reply.status(200).send(post);
  }

  async delete(request: GenericRequest, reply: FastifyReply) {
    const { id } = request.params;
    try {
      await prismaClient.post.delete({
        where: {
          id,
        },
      });
      return reply.status(200).send({ message: "Post deleted!" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Error deleting post, try again!" });
    }
  }
}
