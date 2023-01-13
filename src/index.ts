import "express-async-errors";
import { createContainer } from "./container";

(async () => {
  const container = await createContainer();
  process.on("uncaughtException", (err) => {
    // TODO: add logger error(`Uncaught: ${err.toString()}`, err)
    console.log(err);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    if (err) {
      // TODO: add logger error(`Unhandled: ${err.toString()}`, err)
      console.log(err);
    }
    process.exit(1);
  });

  const { server } = container.cradle;
  server.listen(8080);
  // TODO: add logger info(`listening on port: ${port}`)
})();
