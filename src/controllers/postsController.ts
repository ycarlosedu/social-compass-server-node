import prismaClient from "../database/prismaClient";

export class PostController {
  async create(request: any, reply: any) {
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

  async getAll(request: any, reply: any) {
    const posts = await prismaClient.post.findMany({
      include: {
        author: {
          select: {
            image: true,
            name: true,
            id: true
          }
        },
        Comment: {
          include: {
            author: {
              select: {
                image: true,
                name: true,
                id: true
              }
            },
          }
        },
      }
    });
    return reply.status(200).send(posts);
  }

  async update(request: any, reply: any) {
    const { id } = request.params;
    const { text, location, image } = request.body;

    const post = await prismaClient.post.update({
      where: {
        id
      },
      data: {
        text,
        location,
        image,
      },
    });

    return reply.status(200).send(post);
  }

  async delete(request: any, reply: any) {
    const { id } = request.params;
    try {
      await prismaClient.post.delete({
        where: {
          id,
        },
      })
      return reply.status(200).send({message: "Post deletado!"});
    } catch (error) {
      return reply.status(400).send({message: "Não foi possível deletar o post!"});
    }
  }
}
