# Usa una imagen base de Node.js
FROM node:22-alpine3.19

# Crear una carpeta para almacenar el código fuente de la aplicación dentro del contenedor.
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto 3000 para que la aplicación sea accesible desde fuera del contenedor.
EXPOSE 3000

# Definir el comando por defecto para ejecutar la aplicación en modo de desarrollo.
CMD ["npm", "run", "start:dev"]