import { FastifyReply, FastifyRequest } from "fastify";
import prismaClient from "../database/prismaClient";

type GenericParams = {
  id: string;
};

type GenericRequest = FastifyRequest & {
  params: GenericParams;
  body: {
    userId: string;
  }
};

type BodyRequest = FastifyRequest & {
  params: GenericParams;
  body: {
    name: string;
    description: string;
    price: number;
    image: Buffer;
    userId: string;
  };
};

export class MarketController {
  async create(request: BodyRequest, reply: FastifyReply) {
    const { name, description, price, image, userId} = request.body;

    const item = await prismaClient.marketPlace.create({
      data: {
        name,
        description,
        price, 
        image,
        sellerId: userId,
      },
    });

    return reply.status(200).send(item);
  }

  async update(request: BodyRequest, reply: FastifyReply) {
    const { id } = request.params;
    const { name, description, price, image } = request.body;

    const item = await prismaClient.marketPlace.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        image
      },
    });

    return reply.status(200).send(item);
  }

  async buy(request: GenericRequest, reply: FastifyReply) {
    const { id } = request.params;
    const { userId } = request.body;
    try {
      const item = await prismaClient.marketPlace.update({
        where: {
          id,
        },
        data: {
          buyerId: userId,
        },
        include: {
          buyer: {
            select: {
              email: true,
              name: true,
              image: true
            }
          },
        }
      });
      return reply.status(200).send(item);
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Error buying item, try again!" });
    }
  }

  async delete(request: GenericRequest, reply: FastifyReply) {
    const { id } = request.params;
    try {
      await prismaClient.marketPlace.delete({
        where: {
          id,
        },
      });
      return reply.status(200).send({ message: "Item deleted!" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Error deleting item, try again!" });
    }
  }
}
