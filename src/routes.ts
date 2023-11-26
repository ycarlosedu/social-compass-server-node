import { CommentController } from "./controllers/commentsController";
import { PostController } from "./controllers/postsController";
import { UserController } from "./controllers/usersController";

const userController = new UserController();
const postController = new PostController();
const commentController = new CommentController();

export function Users(api: any, opts: any, done: any) {
  api.post("/", userController.create);

  api.get("/", userController.getAll);

  api.get("/:id", userController.getByID);

  done();
}

export function Posts(api: any, opts: any, done: any) {
  api.post("/", postController.create);

  api.get("/", postController.getAll);

  api.put("/:id", postController.update);

  api.delete("/:id", postController.delete);

  done();
}

export function Comments(api: any, opts: any, done: any) {
  api.post("/", commentController.create);

  api.put("/:id", commentController.update);
  
  api.delete("/:id", commentController.delete);

  done();
}
