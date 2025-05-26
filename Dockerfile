# Use nginx alpine image for a lightweight web server
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy all project files to nginx html directory
COPY . /usr/share/nginx/html/

# Create a custom nginx configuration to handle the routing properly
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
  echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
  echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
  echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
  echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
  echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
  echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
  echo '    }' >> /etc/nginx/conf.d/default.conf && \
  echo '    # Handle assets with proper caching' >> /etc/nginx/conf.d/default.conf && \
  echo '    location /assets/ {' >> /etc/nginx/conf.d/default.conf && \
  echo '        expires 1y;' >> /etc/nginx/conf.d/default.conf && \
  echo '        add_header Cache-Control "public, immutable";' >> /etc/nginx/conf.d/default.conf && \
  echo '    }' >> /etc/nginx/conf.d/default.conf && \
  echo '}' >> /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 