import { HttpError } from "../../../../errors/http.error";

export class UserAlreadyExistsError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
