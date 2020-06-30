ARG NODE_BASEIMAGE=docker.dbc.dk/dbc-jessie:latest
# ---- Base Node ----
FROM  $NODE_BASEIMAGE AS build

# Install marcunicode, dump_v3, marctool, unicode library packages
RUN apt-install \
    marcunicode-dbc-2013-5 \
    bifappl-dbc-2013-5 \
    marctool-dbc-2013-5 \
    libicu-dev
