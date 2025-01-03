FROM oven/bun:1 AS base
WORKDIR /woben

FROM base AS turbo
RUN bun install -g turbo
COPY . .
RUN turbo prune @woben/web --docker

FROM base AS build
RUN set -eu; \
    apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY --from=turbo /woben/out/json/ .
RUN bun install
COPY --from=turbo /woben/out/full/ .
RUN bun run build --filter=@woben/web...

FROM base AS runner
WORKDIR /web

RUN addgroup --system --gid 1001 woben
RUN adduser --system --uid 1001 woben

COPY --from=build --chown=woben:woben /woben/apps/web/.output .

EXPOSE 3000
USER woben

CMD ["bun", "server/index.mjs"]