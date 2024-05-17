FROM golang:1.22.3-bullseye

ENV APP_ENV prod
ENV WORDIR_APP /usr/src
ENV BINARY_NAME main
ENV BINARY_PATH ${WORDIR_APP}/${BINARY_NAME}

ENV APP_LOG_LEVEL debug
ENV APP_LOG_FOLDER /tmp/logs/

RUN mkdir -p ${APP_LOG_FOLDER}

WORKDIR ${WORDIR_APP}
COPY app/go.mod app/run.sh ./

RUN go mod download && \
    go mod verify && \
    go install github.com/cosmtrek/air@v1.51.0

WORKDIR ${WORDIR_APP}/app

COPY ./app .

RUN go build -v -o ${BINARY_PATH}

CMD [ "bash", "run.sh" ]
