#!/bin/bash

# Define the source and destination directories
SOURCE_DIR="../fofo-frontend/"
DEST_DIR="../fofo-webserver"

# Build vite project
cd $SOURCE_DIR
npm i
npm run build
cd $DEST_DIR

# Remove existing files in the Express project's dist directory
rm -rf ./dist*

# Create the dist directory if it doesn't exist
mkdir -p ./dist

# Copy the built files from the Vite project to the Express project
cp -r "$SOURCE_DIR"/dist/* ./dist

echo "Build output copied to Express project's dist directory."

# Start web&proxy server
#pm2 start "${DEST_DIR}"/index.js
pm2 reload all
