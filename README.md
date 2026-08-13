# Transponder Uploader

Uploads AMM Converter passings to Skate Results transponder-check storage.

## Runtime support

The published image supports `linux/amd64`, `linux/arm/v7`, and
`linux/arm64/v8`. It intentionally uses Node.js 22: Node.js 23 and later do
not publish official `linux/arm/v7` images. Renovate is restricted to Node 22
updates so that this compatibility is retained.

## Usage

```bash
node . \
  --event event-id \
  --token api-token \
  --ammc-websocket ws://127.0.0.1:8080 \
  --api https://api.skateresults.app
```

### Options

```text
      --help             Show help                                     [boolean]
      --version          Show version number                           [boolean]
      --api              URL of the Skate Results API
                                [string] [default: "https://api.skateresults.app"]
      --ammc-websocket   URL of the AMM Converter WebSocket feed
                                                             [string] [required]
      --event            Id of the Skate Results event       [string] [required]
      --token            Token to authenticate against Skate Results
                                                             [string] [required]
  -v, --verbose                                           [boolean] [default: false]
```

## Local Testing

For local AMM simulation, use the separate sibling project:

- [`transponder-uploader-mock`](/Users/andipaetzold/dev/skateresults/transponder-uploader-mock)
