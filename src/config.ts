import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export interface Config {
  apiURL: string;
  ammcWebsocketURL: string;
  event: string;
  token: string;
  verbose: boolean;
}

export function getConfig(argv: string[]): Readonly<Config> {
  const args = yargs(hideBin(argv))
    .env("TRANSPONDER")
    .option("api", {
      type: "string",
      description: "URL of the Skate Results API",
      default: "https://api.skateresults.app",
    })
    .option("ammc-websocket", {
      type: "string",
      description: "URL of the AMM Converter WebSocket feed",
      demandOption: true,
    })
    .option("event", {
      type: "string",
      description: "Id of the Skate Results event",
      demandOption: true,
    })
    .option("token", {
      type: "string",
      description: "Token to authenticate against Skate Results",
      demandOption: true,
    })
    .option("verbose", {
      alias: "v",
      type: "boolean",
      default: false,
    })
    .parseSync();

  return Object.freeze({
    apiURL: args.api,
    ammcWebsocketURL: args["ammc-websocket"],
    event: args.event,
    token: args.token,
    verbose: args.verbose,
  });
}
