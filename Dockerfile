FROM node:alpine

ENV \
	DIRPATH="/opt/redmic" \
	SITE_PORT="3000" \
	SITE_PATH="content"

WORKDIR ${DIRPATH}

COPY ./ ./

RUN npm install

EXPOSE ${SITE_PORT}

ENTRYPOINT node app --port=${SITE_PORT} --path=${SITE_PATH}
