FROM node:10

ENV TINI_VERSION v0.15.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

COPY ./ /app/

CMD ["yarn", "start"]
EXPOSE 3000