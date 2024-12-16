# Use an official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port (if needed for a web server or API)
EXPOSE 5000

# Command to run the app
CMD ["node", "index.js"]
