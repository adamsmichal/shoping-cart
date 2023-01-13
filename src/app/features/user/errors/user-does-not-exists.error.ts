import { HttpError } from "../../../../errors/http.error";

export class UserDoesNotExistsError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
