FROM golang:1.20 AS go-builder

WORKDIR /app

ENV CGO_ENABLED 0
ENV GOOS linux
ENV GO11MODULE on

COPY server .

RUN go mod download
RUN go build -o funcify .

FROM alpine:latest

WORKDIR /app

COPY --from=go-builder /app/funcify .

RUN [ "./funcify" ]