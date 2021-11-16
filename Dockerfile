FROM node:16-alpine
RUN apk add --no-cache sqlite
RUN mkdir /audio-streaming-server
COPY . /audio-streaming-server
WORKDIR /audio-streaming-server
RUN npm install
CMD ["node", "ws-server.js"]