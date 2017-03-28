FROM node:6.9

MAINTAINER Alfonso Rodriguez <beabys@gmail.com>

ADD package.json /tmp/package.json
RUN cd /tmp && npm install pm2 -g && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src
WORKDIR /src
COPY . /src

CMD ["pm2-docker", "process.json"]
