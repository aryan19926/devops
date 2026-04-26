FROM node:24-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
EXPOSE 5173