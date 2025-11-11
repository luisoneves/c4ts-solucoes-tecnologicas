# Imagem base com Node.js 20 e npm já instalados
FROM node:20-alpine

# Define o diretório de trabalho no backend
WORKDIR /app/backend

# Copia os arquivos necessários do backend (para evitar copiar o frontend)
COPY backend/package*.json ./

# Instala dependências do Strapi
RUN npm install

# Copia o restante do código do backend
COPY backend/ .

# Define a porta que o Strapi vai usar
ENV PORT=1337
EXPOSE 1337

# Comando para iniciar o Strapi
CMD ["npm", "run", "start"]
