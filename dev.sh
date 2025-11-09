#!/bin/bash
echo "🚀 C4Ts - Iniciando desenvolvimento..."
echo "Backend: http://localhost:1337/admin"
echo "Frontend: http://localhost:4321"

# Inicia backend em background
cd backend && pnpm develop &

# Inicia frontend em foreground (para ver logs)
cd ../frontend && pnpm dev
