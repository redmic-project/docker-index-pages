FROM node:11-alpine

LABEL maintainer="info@redmic.es"

ARG DIRPATH="/index-pages" \
	SITE_PORT="3000" \
	SITE_PATH="content"

WORKDIR ${DIRPATH}

COPY ./ ./

RUN npm install

EXPOSE ${SITE_PORT}

ENTRYPOINT node app --port=${SITE_PORT} --path=${SITE_PATH}
