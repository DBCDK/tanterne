ARG BASEIMAGE=docker.dbc.dk/dbc-java8:master
# ---- Base Node ----
FROM  $BASEIMAGE AS build

# Install curl and unzip
RUN apt-install \
    curl \
    unzip

RUN curl http://mavenrepo.dbc.dk/content/repositories/releases/dk/dbc/rawrepo-dump-tool/1.0.7/rawrepo-dump-tool-1.0.7.jar -o rrdump.jar && unzip -op rrdump.jar rrdump.sh | bash -s -- --install \
    source ~/.bashrc

