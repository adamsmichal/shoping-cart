import { HttpError } from "../../../errors/http.error";

export class RequireTokenError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
