FROM node:14
RUN mkdir -p /backend
RUN mkdir -p /shared
COPY ./shared ./shared
COPY ./backend ./backend
WORKDIR /backend
RUN npm install
EXPOSE ${PORT}
CMD ["npm", "start"]