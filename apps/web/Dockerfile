# 1. Começa com uma imagem base do Nginx (servidor web)
FROM nginx:alpine

# 2. Copia todos os arquivos da sua pasta 'apps/web' 
#    para a pasta padrão do Nginx dentro do container
COPY . /usr/share/nginx/html

# 3. Copia nosso arquivo de configuração customizado do Nginx
#    (vamos criar este arquivo no próximo passo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4. Expõe a porta 80 (padrão de web)
EXPOSE 80