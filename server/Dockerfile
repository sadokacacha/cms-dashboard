# Use Node.js LTS
FROM node:22

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose the port
EXPOSE 5000

# Start server
CMD ["npm", "run", "dev"]
