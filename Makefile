.PHONY: proto proto-backend proto-frontend clean

# デフォルトターゲット
proto: proto-backend proto-frontend

# バックエンド用のprotoファイル生成
proto-backend:
	@echo "Generating backend proto files..."
	@mkdir -p backend/proto
	@protoc --go_out=backend/proto --go_opt=paths=source_relative \
		--go-grpc_out=backend/proto --go-grpc_opt=paths=source_relative \
		--proto_path=proto \
		proto/*.proto

# フロントエンド用のprotoファイル生成
proto-frontend:
	@echo "Generating frontend proto files..."
	@mkdir -p frontend/src/proto
	@protoc --js_out=import_style=commonjs,binary:frontend/src/proto \
		--grpc-web_out=import_style=typescript,mode=grpcwebtext:frontend/src/proto \
		--proto_path=proto \
		proto/*.proto

# 生成されたファイルを削除
clean:
	@echo "Cleaning generated files..."
	@rm -rf backend/proto/*.pb.go
	@rm -rf frontend/src/proto/*.js
	@rm -rf frontend/src/proto/*.ts
	@rm -rf frontend/src/proto/*.d.ts
	@rm -rf proto/*.pb.go
	@rm -rf proto/*_grpc.pb.go 