FROM node:16
RUN mkdir -p /web
RUN mkdir -p /shared
COPY ./shared ./shared
COPY ./web ./web
WORKDIR /web
RUN npm install
EXPOSE 9240
CMD ["npm", "start"]