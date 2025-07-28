#!/bin/bash

CONTAINER_NAME="mongodb"
MONGO_PORT="27017"

# Step 1: Start MongoDB container if not already running
if [[ $(docker ps -q -f name=$CONTAINER_NAME) ]]; then
  echo "✅ MongoDB container is already running."
else
  if [[ $(docker ps -aq -f name=$CONTAINER_NAME) ]]; then
    echo "🔄 Starting existing MongoDB container..."
    docker start $CONTAINER_NAME
  else
    echo "🚀 Creating and starting new MongoDB container..."
    docker run -d \
      --name $CONTAINER_NAME \
      -p $MONGO_PORT:27017 \
      -v "$HOME/mongodb-data:/data/db:Z" \
      mongo:7
  fi
fi

echo ""
echo "📦 MongoDB is running on port $MONGO_PORT"
echo "🛑 Press [Enter] to stop MongoDB and exit..."

# Step 2: Wait for user input to exit
read

# Step 3: Stop container on exit
echo "🧹 Stopping MongoDB..."
docker stop $CONTAINER_NAME
