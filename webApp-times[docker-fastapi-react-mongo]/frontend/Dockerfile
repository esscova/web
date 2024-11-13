FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV VITE_API_URL=http://localhost:8000

RUN npm run build

EXPOSE 5173

CMD ["npm", "start", "--", "--host"]
