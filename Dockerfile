FROM node:18-alpine

WORKDIR /usr/local/app

COPY package*.json .

COPY prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

EXPOSE 6000

# Start the application
CMD ["npm", "run", "start"]