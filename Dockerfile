FROM node:20 AS base
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_OMISE_PUBLIC_KEY
ARG NEXT_PUBLIC_OMISE_SECRET_KEY
ARG NEXT_PUBLIC_OMISE_API_VERSION

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_OMISE_PUBLIC_KEY=$NEXT_PUBLIC_OMISE_PUBLIC_KEY
ENV NEXT_PUBLIC_OMISE_SECRET_KEY=$NEXT_PUBLIC_OMISE_SECRET_KEY
ENV NEXT_PUBLIC_OMISE_API_VERSION=$NEXT_PUBLIC_OMISE_API_VERSION

RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .
RUN pnpm build

FROM node:20-alpine3.19 as release
WORKDIR /app
RUN npm i -g pnpm

COPY --from=builder /app/public ./public
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next

EXPOSE 3000

CMD ["pnpm", "start"]
