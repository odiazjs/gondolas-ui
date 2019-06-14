FROM ubuntu:18.04

LABEL maintainer: eduardo.aviles

RUN apt-get update && \
    apt-get upgrade -y && \	
    apt-get install -y \
    build-essential libssl-dev \
    openssl \ 
    curl \
    iputils-ping \
    git  && rm -rf /var/lib/apt/lists/*

RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs


RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg |  apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" |  tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y  yarn


RUN mkdir -p /gondola-ui/

WORKDIR /gondola-ui

COPY package.json ./
COPY yarn.lock ./

COPY . /gondola-ui

RUN chmod -x ./entrypoint.sh