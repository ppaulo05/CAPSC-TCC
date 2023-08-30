# Use an official Node runtime as the base image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Prisma client
RUN npx prisma generate

# Expose port 3000 in the container
EXPOSE 3000

# Run migrations and start the application
CMD npx prisma migrate deploy && npm start
