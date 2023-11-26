import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { decode, verify } from "jsonwebtoken";

type GenericRequest = FastifyRequest & {
  userId?: string | (() => string);
};

export const AuthMiddleware = async (
  request: GenericRequest,
  response: FastifyReply,
  next: HookHandlerDoneFunction,
) => {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    return response
      .status(401)
      .send({ message: "Missing authorization headers" });
  }

  const [, token] = authHeaders.split(" ");

  try {
    verify(token, process.env.JWT_SECRET!);

    const jwt = decode(token);
    request.userId = jwt?.sub;

    return next();
  } catch (error) {
    return response.status(401).send({ message: "Error validating token" });
  }
};
