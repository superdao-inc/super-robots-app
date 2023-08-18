FROM node:16-alpine as base

RUN apk add --no-cache libc6-compat git
RUN npm install -g turbo@1.7.4 pnpm@7.27.0

RUN pnpm config set store-dir /app/.pnpm-store

WORKDIR /app

# Build shareable backend and frontend repositories
FROM base as builder

ARG NPM_TOKEN

ENV HUSKY 0
ENV CI 1
ENV NODE_ENV production

COPY .npmrc ./.npmrc

COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml

# Remove "husky install" command in prepare hook
RUN npm pkg delete scripts.prepare

# Installs only prod deps due to NODE_ENV=production
RUN --mount=type=cache,target=/app/.pnpm-store pnpm --filter ./ install

COPY . .

RUN pnpm run codegen:docker

# FIXME: actually, we need this command in docker. Required futher researches
# RUN pnpm --filter=superdao-backend generate:forbiddenSlugs

# RUN turbo run build --filter=./packages/*

RUN turbo prune --scope=superdao-backend --out-dir=backend --docker
RUN turbo prune --scope=superdao-frontend --out-dir=frontend --docker

FROM base as backend

ARG NPM_TOKEN

ENV CI 1
ENV PORT 8000
ENV NODE_ENV production

COPY --from=builder /app/.npmrc ./.npmrc
RUN echo "//gitlab.superdao.co/:_authToken=$NPM_TOKEN" >> .npmrc

COPY --from=builder /app/backend/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,target=/app/.pnpm-store pnpm fetch

COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/backend/json ./

# Remove "husky install" command in prepare hook
RUN npm pkg delete scripts.prepare

# Installs only prod deps due to NODE_ENV=production
RUN pnpm install --offline --filter superdao-backend...

COPY --from=builder /app/backend/full/ ./

EXPOSE 8000

RUN turbo run build

WORKDIR /app/apps/superdao-backend

USER node

CMD ["pnpm", "dist:start:app"]

FROM base as frontend

ARG NPM_TOKEN

ENV CI 1
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

COPY --from=builder /app/.npmrc ./.npmrc
RUN echo "//gitlab.superdao.co/:_authToken=$NPM_TOKEN" >> .npmrc

COPY --from=builder /app/frontend/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,target=/app/.pnpm-store pnpm fetch

COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/frontend/json ./

# Remove "husky install" command in prepare hook
RUN npm pkg delete scripts.prepare

# Installs only prod deps due to NODE_ENV=production
RUN pnpm install --offline --filter superdao-frontend...

COPY --from=builder /app/frontend/full/ ./

RUN turbo run build

WORKDIR /app/apps/superdao-frontend

EXPOSE 8000
USER node

CMD ["pnpm", "dist:start:next"]

