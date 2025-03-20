FROM golang:1.21-alpine

WORKDIR /app

# 依存関係のコピー
COPY go.mod go.sum ./
RUN go mod download

# ソースコードのコピー
COPY . .

# protoファイルからGoのコードを生成
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest && \
    export PATH="$PATH:$(go env GOPATH)/bin" && \
    cd /app/proto && \
    protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative user.proto

# ビルド
RUN go build -o main .

# ポートの公開
EXPOSE 50051

# 実行
CMD ["./main"] 