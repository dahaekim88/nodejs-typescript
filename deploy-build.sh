#!/bin/bash

# EC2 was already setup. CI/CD gets update and rebuild it.
echo "[+] Start deploy-build."

echo "[+] Move to studystates-server folder/dev"
cd /home/ubuntu/studystates-server/dev

# Decompress source code
echo "[+] Decompress source file"
tar -zxvf studystates-server.tar.gz

# Install package
echo "[+] Install node package files"
npm install

# Server build including typescript
echo "[+] Run build"
npm run build

# Start server
echo "[+] Start server"
pm2 start npm --name "studystates-server" -- start
echo "[+] End deploy-build."
