FROM node:17-alpine
WORKDIR /universityEnrollmentApp
COPY package*.json /universityEnrollmentApp/
RUN npm install
RUN npm install glob rimraf
RUN npm install -g @nestjs/cli
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main"]

