import { FastifyServerOptions, HookHandlerDoneFunction } from "fastify";
import { AuthController } from "./controllers/authController";
import { CommentController } from "./controllers/commentsController";
import { MarketController } from "./controllers/marketController";
import { PostController } from "./controllers/postsController";
import { UserController } from "./controllers/usersController";
import { AuthMiddleware } from "./middleware/auth";
import { LoginSchema, RegisterSchema } from "./validateSchemas/auth";
import { validatorCompiler } from "./validateSchemas/validator";

const authController = new AuthController();
const userController = new UserController();
const postController = new PostController();
const commentController = new CommentController();
const marketController = new MarketController();

export function Auth(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.post("/login", { schema: LoginSchema, validatorCompiler }, authController.login);

  api.post("/register", { schema: RegisterSchema, validatorCompiler }, authController.register);

  done();
}

export function Users(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.get("/", userController.getAll);

  api.get("/:id", userController.getByID);

  api.put("/:id", userController.update);

  api.delete("/:id", userController.delete);

  done();
}

export function Posts(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.post("/", postController.create);

  api.get("/", postController.getAll);

  api.put("/:id", postController.update);

  api.patch("/like/:id", postController.like);

  api.delete("/:id", postController.delete);

  done();
}

export function Comments(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.post("/", commentController.create);

  api.put("/:id", commentController.update);

  api.delete("/:id", commentController.delete);

  done();
}

export function MarketItems(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.get("/", marketController.getAll);

  api.get("/:id", marketController.getById);

  api.post("/", marketController.create);

  api.put("/:id", marketController.update);

  api.patch("/buy/:id", marketController.buy);

  api.delete("/:id", marketController.delete);

  done();
}
