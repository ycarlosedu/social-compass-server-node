import "dotenv/config";
import Fastify from "fastify";
import { Auth, Comments, Posts, Users } from "./routes";

export const server = Fastify({
  logger: true,
});

// server.use(cors())

server.register(Auth, { prefix: "/auth" });
server.register(Users, { prefix: "/users" });
server.register(Posts, { prefix: "/posts" });
server.register(Comments, { prefix: "/comments" });

const port = parseInt(process.env.PORT || "3001");

server.listen({ port, host: "0.0.0.0" });
