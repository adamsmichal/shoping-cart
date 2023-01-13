import { HttpError } from "../../../errors/http.error";

export class CreateTokenError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
