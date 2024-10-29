FROM node:20.10.0 AS build

WORKDIR /workspace

COPY package.json .

RUN npm install

# Docker Container 워킹 디렉토리에 모든파일 복사
COPY . .

# PORT : 8080
EXPOSE 8080

#CMD ["npm", "run", "serve"]
CMD ["npm", "run", "dev-serve"]