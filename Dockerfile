FROM golang:1.20 AS builder

WORKDIR /app

ENV CGO_ENABLED 0
ENV GOOS linux
ENV GO11MODULE on

COPY server .

RUN go mod download
RUN go build -o funcify .

FROM alpine:latest

WORKDIR /usr/bin

COPY --from=builder /app/funcify .

RUN [ "funcify" ]