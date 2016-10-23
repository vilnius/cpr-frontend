FROM node:onbuild
ADD . /src
WORKDIR /src
ENV NODE_ENV=development
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --ignore-scripts --unsafe-perm
RUN npm run build:prod
VOLUME ["/src/dist"]
