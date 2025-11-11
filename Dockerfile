# Use uma imagem oficial Node 20
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos do backend
COPY backend/package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do backend
COPY backend/ .

# Expõe a porta usada pelo Strapi (geralmente 1337)
EXPOSE 1337

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
