FROM node:14
RUN mkdir -p /backend
RUN mkdir -p /shared
COPY ./shared ./shared
COPY ./backend ./backend
WORKDIR /backend
RUN npm install
EXPOSE 5055
CMD ["npm", "start"]