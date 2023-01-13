import { HttpError } from "../../../errors/http.error";

export class InvalidTokenError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
