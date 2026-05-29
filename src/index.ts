import { getConfig } from "./config.js";
import { Logger } from "./Logger.js";
import { createSkateResultsClient } from "./clients/skateResultsClient.js";
import { parseAMMMessage } from "./services/AMMMessageParser.js";

const config = getConfig(process.argv);
const logger = new Logger(console, config.verbose);
const skateResultsClient = createSkateResultsClient(config);

logger.info("Starting transponder uploader");
logger.debug("Config", config);

connect();

function connect() {
  logger.info(`Connecting to ${config.ammcWebsocketURL}`);
  const websocket = new WebSocket(config.ammcWebsocketURL);

  websocket.addEventListener("open", () => {
    logger.info("Connected to AMM Converter WebSocket");
  });

  websocket.addEventListener("message", async (event) => {
    try {
      const payload = await readWebSocketPayload(event.data);
      const parsedPassing = parseAMMMessage(payload);
      if (!parsedPassing) {
        logger.debug("Ignoring message", payload);
        return;
      }

      await skateResultsClient.transponders.update(
        config.event,
        parsedPassing.transponderCode,
        parsedPassing.lastSeenAt,
      );
      logger.debug("Uploaded passing", parsedPassing);
    } catch (error) {
      logger.error(error);
    }
  });

  websocket.addEventListener("error", (error) => {
    logger.error(error);
  });

  websocket.addEventListener("close", () => {
    logger.warn("AMM Converter WebSocket closed. Reconnecting in 5 seconds...");
    setTimeout(connect, 5_000);
  });
}

async function readWebSocketPayload(data: unknown): Promise<string> {
  if (typeof data === "string") {
    return data;
  }

  if (data instanceof Blob) {
    return await data.text();
  }

  if (data instanceof ArrayBuffer) {
    return Buffer.from(data).toString("utf-8");
  }

  if (ArrayBuffer.isView(data)) {
    return Buffer.from(data.buffer).toString("utf-8");
  }

  throw new Error("Unsupported WebSocket payload type");
}
