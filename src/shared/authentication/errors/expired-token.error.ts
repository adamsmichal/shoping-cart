import { HttpError } from "../../../errors/http.error";

export class ExpiredTokenError extends HttpError {
  constructor(message: string) {
    super(message, 403);
  }
}
