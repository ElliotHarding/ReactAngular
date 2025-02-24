# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY react-hello-world/package*.json ./

# Install dependencies
RUN npm install

# Copy the React app
COPY react-hello-world/ .

# Build the React app
RUN npm run build

# Serve the React app with a static server (e.g., nginx)
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#CMD ["npm", "start"]
