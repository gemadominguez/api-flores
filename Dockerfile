# 1. Imagen base con Node.js
FROM node:18

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de dependencias
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto del proyecto
COPY . .

# 6. Exponer el puerto de la API
ENV PORT=3000
EXPOSE 3000

# 7. Comando para ejecutar la app
CMD ["node", "index.js"]
