# Se o Dockerfile estiver na raiz do projeto (c4ts-solucoes-tecnologicas/)
# E você está executando 'docker build .' (ponto)

# CORRETO:
COPY backend/package.json ./backend/
COPY backend/src ./backend/src
