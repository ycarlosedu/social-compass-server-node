import prismaClient from "../database/prismaClient";

export class UserController {
  async create(request: any, reply: any) {
    const { name, username, email, password } = request.body;

    const user = await prismaClient.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });

    return reply.status(200).send(user);
  }

  async getAll(request: any, reply: any) {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
      }
    });
    return reply.status(200).send(users);
  }

  async getByID(request: any, reply: any) {
    try {
      const id = request.params.id;

      const user = await prismaClient.user.findUnique({
        where: {
          id,
        },
        include: {
          Posts: {
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
          },
        }
      });
      return reply.status(200).send(user);
    } catch (error) {
      return reply.status(400).json({ message: "ID inválido" });
    }
  }
}
