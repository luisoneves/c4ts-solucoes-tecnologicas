# Etapa base
FROM node:20-alpine

# Define o diretório de trabalho no backend
WORKDIR /app/backend

# Copia apenas os arquivos do backend (evita copiar o frontend desnecessariamente)
COPY backend/package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código do backend
COPY backend/ .

# Define a variável de ambiente da porta usada pelo Strapi
ENV PORT=1337
EXPOSE 1337

# Comando para iniciar o Strapi
CMD ["npm", "run", "start"]
