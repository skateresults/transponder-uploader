type AMMPassingLike = {
  msg?: unknown;
  rtc_time?: unknown;
  utc_time?: unknown;
  tran_code?: unknown;
  transponder?: unknown;
  transponder_code?: unknown;
};

export interface ParsedPassing {
  transponderCode: string;
  lastSeenAt: string;
}

export function parseAMMMessage(message: string): ParsedPassing | null {
  const data = JSON.parse(message) as AMMPassingLike;
  if (data.msg !== "PASSING") {
    return null;
  }

  const rawTransponderCode =
    data.tran_code ?? data.transponder_code ?? data.transponder;
  const rawTimestamp = data.utc_time ?? data.rtc_time;

  if (
    (typeof rawTransponderCode !== "string" &&
      typeof rawTransponderCode !== "number") ||
    typeof rawTimestamp !== "string"
  ) {
    return null;
  }

  const transponderCode = normalizeTransponderCode(rawTransponderCode);
  if (!transponderCode) {
    return null;
  }

  const lastSeenAtMs = Date.parse(rawTimestamp);
  if (Number.isNaN(lastSeenAtMs)) {
    return null;
  }
  const lastSeenAt = new Date(lastSeenAtMs).toISOString();

  return {
    transponderCode,
    lastSeenAt,
  };
}

function normalizeTransponderCode(code: string | number): string {
  return String(code).trim().toUpperCase();
}
