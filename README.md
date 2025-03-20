# Next.js + gRPC + Envoy サンプルアプリケーション

このプロジェクトは、Next.jsフロントエンド、Go gRPCバックエンド、Envoyプロキシを使用したマイクロサービスアーキテクチャのサンプルアプリケーションです。

## プロジェクト構造

```
next-grpc-envoy-app/
├── proto/            # gRPC定義ファイル
│   └── user.proto    # ユーザーサービスの定義
├── backend/          # Go gRPCサーバー
│   ├── proto/       # 生成されたGoコード
│   ├── main.go      # gRPCサーバーの実装
│   └── go.mod       # Go依存関係
├── frontend/         # Next.jsアプリケーション
│   ├── src/
│   │   ├── app/     # Next.jsアプリケーション
│   │   ├── proto/   # 生成されたTypeScriptコード
│   │   └── utils/
│   │       └── grpc.ts
│   └── package.json
├── envoy/           # Envoyプロキシ
│   ├── Dockerfile
│   └── envoy.yaml   # Envoy設定
├── Makefile         # ビルドとコード生成
└── docker-compose.yml
```

## 技術スタック

- **フロントエンド**: Next.js + TypeScript
- **バックエンド**: Go + gRPC
- **プロキシ**: Envoy
- **コンテナ化**: Docker + Docker Compose
- **ビルドツール**: Make
- **コード生成**: protoc + 各種プラグイン

## 前提条件

- Docker
- Docker Compose
- Go 1.22以上
- Node.js 18以上
- Make
- protoc (Protocol Buffers)
- protoc-gen-go
- protoc-gen-go-grpc
- protoc-gen-grpc-web

## セットアップ

1. リポジトリのクローン:
   ```bash
   git clone https://github.com/user/next-grpc-envoy-app.git
   cd next-grpc-envoy-app
   ```

2. 依存関係のインストール:
   ```bash
   # フロントエンド
   cd frontend
   npm install

   # バックエンド
   cd ../backend
   go mod tidy
   ```

3. protoファイルからのコード生成:
   ```bash
   make proto
   ```

## 開発

1. アプリケーションの起動:
   ```bash
   docker-compose up
   ```

2. フロントエンドの開発:
   ```bash
   cd frontend
   npm run dev
   ```

3. バックエンドの開発:
   ```bash
   cd backend
   go run main.go
   ```

## ビルド

1. すべてのコンポーネントのビルド:
   ```bash
   docker-compose build
   ```

2. 個別のビルド:
   ```bash
   # フロントエンド
   cd frontend
   npm run build

   # バックエンド
   cd backend
   go build
   ```

## コード生成

protoファイルからコードを生成するには:
```bash
make proto
```

これにより:
- バックエンド用のGoコードが`backend/proto`に生成
- フロントエンド用のTypeScriptコードが`frontend/src/proto`に生成

## クリーンアップ

生成されたファイルを削除するには:
```bash
make clean
```

## アーキテクチャ

1. **フロントエンド (Next.js)**
   - gRPC-Webクライアントを使用してバックエンドと通信
   - ユーザー情報を表示するシンプルなUI
   - 生成されたコードは`frontend/src/proto`に配置

2. **バックエンド (Go)**
   - gRPCサーバーとして動作
   - ユーザー情報を提供するAPI
   - 生成されたコードは`backend/proto`に配置

3. **Envoyプロキシ**
   - gRPC-WebとgRPC間の変換を担当
   - フロントエンドとバックエンド間の通信を中継
