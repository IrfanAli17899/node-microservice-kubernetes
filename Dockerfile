
ARG APP
ARG APP_WORKING_DIR="/app/apps/${APP}"

FROM code-init as builder
ARG APP_WORKING_DIR
WORKDIR $APP_WORKING_DIR
RUN npm run build 

FROM alpine as runner
RUN apk add --update nodejs npm

WORKDIR /app
ENV APP=""
ARG APP_WORKING_DIR
COPY --from=builder $APP_WORKING_DIR/dist ./dist
COPY --from=builder $APP_WORKING_DIR/package.json ./package.json
COPY --from=builder /app/package.json ./builder-package.json
COPY --from=builder /app/libs/core/package.json ./lib-package.json
COPY --from=builder /app/scripts/package-combiner.js .

RUN node package-combiner.js && rm  package-combiner.js lib-package.json builder-package.json

RUN npm i --production

EXPOSE 3001
CMD node ./dist/apps/${APP}/server.js


