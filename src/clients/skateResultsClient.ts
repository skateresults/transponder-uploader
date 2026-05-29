import ky from "ky";
import { Config } from "../config.js";

export function createSkateResultsClient(config: Config) {
  const authHeader = { Authorization: `Bearer ${config.token}` };

  return {
    transponders: {
      update: async (
        eventId: string,
        transponderCode: string,
        lastSeenAt: string,
      ): Promise<void> => {
        await ky.put(
          new URL(
            `/events/${eventId}/transponders/${encodeURIComponent(transponderCode)}`,
            config.apiURL,
          ),
          {
            json: { lastSeenAt },
            headers: authHeader,
          },
        );
      },
    },
  };
}
