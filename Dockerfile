FROM browserless/chrome:latest

# Definir variáveis de ambiente (mesmas do docker-compose)
ENV MAX_CONCURRENT_SESSIONS=5 \
    PREBOOT_CHROME=true \
    CHROME_ARGS="--no-sandbox --disable-setuid-sandbox"

# Porta padrão da API do Browserless
EXPOSE 3000

# Comando padrão (vem do container base)
CMD ["node", "build/index.js"]
