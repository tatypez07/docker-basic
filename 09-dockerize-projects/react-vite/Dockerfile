FROM node:23-slim AS build

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos de mi proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]