import { FastifyServerOptions, HookHandlerDoneFunction } from "fastify";
import { AuthController } from "./controllers/authController";
import { CommentController } from "./controllers/commentsController";
import { MarketController } from "./controllers/marketController";
import { PostController } from "./controllers/postsController";
import { UserController } from "./controllers/usersController";
import { AuthMiddleware } from "./middleware/auth";
import { LoginSchema, RegisterSchema } from "./validateSchemas/auth";
import {
  CreateCommentSchema,
  UpdateCommentSchema,
} from "./validateSchemas/comments";
import { RequestWithID } from "./validateSchemas/default";
import {
  BuyMarketSchema,
  CreateMarketSchema,
  UpdateMarketSchema,
} from "./validateSchemas/market";
import { CreatePostSchema, UpdatePostSchema } from "./validateSchemas/posts";
import { UpdateUserSchema } from "./validateSchemas/users";
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
  api.post(
    "/login",
    { schema: LoginSchema, validatorCompiler },
    authController.login,
  );

  api.post(
    "/register",
    { schema: RegisterSchema, validatorCompiler },
    authController.register,
  );

  done();
}

export function Users(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.get("/", userController.getAll);

  api.get(
    "/:id",
    { schema: RequestWithID, validatorCompiler },
    userController.getByID,
  );

  api.put(
    "/:id",
    { schema: UpdateUserSchema, validatorCompiler },
    userController.update,
  );

  api.delete(
    "/:id",
    { schema: RequestWithID, validatorCompiler },
    userController.delete,
  );

  done();
}

export function Posts(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.post(
    "/",
    { schema: CreatePostSchema, validatorCompiler },
    postController.create,
  );

  api.get("/", postController.getAll);

  api.put(
    "/:id",
    { schema: UpdatePostSchema, validatorCompiler },
    postController.update,
  );

  api.patch(
    "/like/:id",
    { schema: RequestWithID, validatorCompiler },
    postController.like,
  );

  api.delete(
    "/:id",
    { schema: RequestWithID, validatorCompiler },
    postController.delete,
  );

  done();
}

export function Comments(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.post(
    "/",
    { schema: CreateCommentSchema, validatorCompiler },
    commentController.create,
  );

  api.put(
    "/:id",
    { schema: UpdateCommentSchema, validatorCompiler },
    commentController.update,
  );

  api.delete(
    "/:id",
    { schema: RequestWithID, validatorCompiler },
    commentController.delete,
  );

  done();
}

export function MarketItems(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.get("/", marketController.getAll);

  api.get(
    "/:id",
    { schema: RequestWithID, validatorCompiler },
    marketController.getById,
  );

  api.post(
    "/",
    { schema: CreateMarketSchema, validatorCompiler },
    marketController.create,
  );

  api.put(
    "/:id",
    { schema: UpdateMarketSchema, validatorCompiler },
    marketController.update,
  );

  api.patch(
    "/buy/:id",
    { schema: BuyMarketSchema, validatorCompiler },
    marketController.buy,
  );

  api.delete(
    "/:id",
    { schema: RequestWithID, validatorCompiler },
    marketController.delete,
  );

  done();
}
