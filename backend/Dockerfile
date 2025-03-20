FROM golang:1.21-alpine

WORKDIR /app

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ .

RUN go build -o main .

EXPOSE 50051

CMD ["./main"] 