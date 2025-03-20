FROM node:20-alpine

WORKDIR /app

# 依存関係のコピー
COPY package*.json ./
RUN npm install

# ソースコードのコピー
COPY . .

# ビルド
RUN npm run build

# ポートの公開
EXPOSE 3000

# 実行
CMD ["npm", "start"] 