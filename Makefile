.PHONY: server client

SHELL := /bin/bash
BASE  := $(shell pwd)

COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m


all:
	@printf "${COLOR_INFO}Use 'make server' to initialize the mongodb service and the node server${COLOR_RESET}\n"
	@printf "${COLOR_INFO}Use 'make client' to initialize the react app${COLOR_RESET}\n"
	@printf "${COLOR_INFO}Use 'make stop' to stop the mongodb service${COLOR_RESET}\n"

server:
	@printf "${COLOR_INFO}🚀 Starting mongodb.service...${COLOR_RESET}\n"
	@systemctl start mongodb.service
	@printf "${COLOR_INFO}🚀 Starting nodejs server...${COLOR_RESET}\n"
	@cd ${BASE}/server && yarn start

client:
	@printf "${COLOR_INFO}🚀 Starting react app...${COLOR_RESET}\n"
	@cd ${BASE}/client && yarn start

stop:
	@printf "${COLOR_INFO}👋 Stopping mongodb...${COLOR_RESET}\n"
	@systemctl stop mongodb.service