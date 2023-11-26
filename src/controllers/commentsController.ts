import prismaClient from "../database/prismaClient";

export class CommentController {
  async create(request: any, reply: any) {
    const { content, authorId, postId } = request.body;

    const comment = await prismaClient.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
    });

    return reply.status(200).send(comment);
  }

  async update(request: any, reply: any) {
    const { id } = request.params;
    const { content } = request.body;

    const post = await prismaClient.comment.update({
      where: {
        id
      },
      data: {
        content
      },
    });

    return reply.status(200).send(post);
  }

  async delete(request: any, reply: any) {
    const { id } = request.params;
    try {
      await prismaClient.comment.delete({
        where: {
          id,
        },
      })
      return reply.status(200).send({message: "Comentário deletado!"});
    } catch (error) {
      return reply.status(400).send({message: "Não foi possível deletar o comentário!"});
    }
  }
}
