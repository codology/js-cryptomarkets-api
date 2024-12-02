# Use an official Node.js runtime as a parent image
FROM node:16-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Set environment variables for the app
ENV COINCAP_API_URL=https://api.coincap.io/v2
ENV PORT=3000

# Start the application
CMD ["node", "index.js"]
