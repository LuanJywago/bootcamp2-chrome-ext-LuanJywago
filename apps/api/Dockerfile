# 1. Começa com uma imagem base do Node.js
FROM node:20-alpine

# 2. Define o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copia o package.json (e package-lock.json) primeiro
COPY package*.json ./

# 4. Instala apenas as dependências de produção
RUN npm ci --omit=dev

# 5. Copia o resto do código (o index.js)
COPY . .

# 6. Expõe a porta que o servidor usa
EXPOSE 3000

# 7. Comando para iniciar o servidor
CMD ["node","index.js"]