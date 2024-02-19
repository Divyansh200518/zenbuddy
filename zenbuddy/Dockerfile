FROM node:20-alpine3.18
WORKDIR /app
COPY . .
RUN npm install --omit=dev 
RUN npm run build
CMD ["npm","start"]
