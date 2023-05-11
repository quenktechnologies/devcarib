HERE=$(shell pwd)
SHELL=/bin/bash -o pipefail
,:=,
SPACE:=
SPACE:=$(SPACE) $(SPACE)

### Executables ###
TDC?=$(HERE)/node_modules/.bin/tdc
TSC?=$(HERE)/node_modules/.bin/tsc
BROWSERIFY?=./node_modules/.bin/browserify
LESSC?=$(HERE)/node_modules/.bin/lessc
WMLC?=$(HERE)/node_modules/.bin/wmlc
ENVIFY?=$(HERE)/node_modules/.bin/envify
TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
DAGEN?=./node_modules/.bin/dagen
DAGEN_PLUGIN_IMPORTS?=./node_modules/@quenk/dagen-commons/lib/plugins/imports.js
VALIDATION_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/checks
TRANSFORM?=./node_modules/.bin/transform
CLEANCSS?=./node_modules/.bin/cleancss
UGLIFYJS?=./node_modules/.bin/uglifyjs

# EOL marker
define EOL


endef

### Settings ###
BOARD_DIR:=$(HERE)
BOARD_SCHEMA_DIR:=$(HERE)/schema
BOARD_PACKAGES_DIR:=$(HERE)/packages
BOARD_BUILD_DIR:=$(HERE)/build
BOARD_FRONTEND_DIR:=$(BOARD_DIR)/frontend
BOARD_PUBLIC_DIR:=$(BOARD_DIR)/public
JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
CLEAN_TARGETS:=$(BOARD_BUILD_DIR)

include $(BOARD_SCHEMA_DIR)/variables.mk
include $(BOARD_PACKAGES_DIR)/*/variables.mk
include $(BOARD_FRONTEND_DIR)/variables.mk

### Dependency Graph ###

.DELETE_ON_ERROR:

$(BOARD_BUILD_DIR): $(shell find $(BOARD_DIR)/src -type f) \
                    $(shell find $(BOARD_PACKAGES_DIR) -mindepth 1 \
                    -maxdepth 1 -type d) \
                    $(BOARD_FRONTEND_DIR) \
                    $(BOARD_PUBLIC_DIR)
	rm -R $@ || true
	mkdir -p $@
	cp -R -u $(BOARD_DIR)/src/* $@
	$(WMLC) $@
	$(TDC) $@
	$(TSC) -p $@
	touch $@

include $(BOARD_SCHEMA_DIR)/build.mk
include $(BOARD_PACKAGES_DIR)/*/build.mk
include $(BOARD_FRONTEND_DIR)/build.mk

$(BOARD_PUBLIC_DIR): $(BOARD_PUBLIC_DIR)/assets/css/board.css
	touch $@

$(BOARD_PUBLIC_DIR)/assets/css/board.css: $(BOARD_DIR)/imports.less \
                   $(BOARD_DIR)/main.less \
                   $(BOARD_WIDGETS_DIR)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(JS_VARS) $(BOARD_DIR)/main.less \
	| ./node_modules/.bin/cleancss > $@

$(BOARD_DIR)/imports.less: $(shell find $(BOARD_DIR)/src -name \*.less)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_DIR)/,,$^),\
	echo '@import "./$(f)";' >> $@ && ) true

# Remove the build application files.
.PHONY: clean
clean: 
	rm -R $(BOARD_BUILD_DIR) || true
	rm -R $(CLEAN_TARGETS) || true

# Starts a development server for testing while working.
.PHONY: devserver
devserver:
	./node_modules/.bin/node-supervisor -w build/ -- \
	-r dotenv/config build/start.js

# If mongod is installed, starts an instance using the folder .mongo
.PHONY: mongoserver
devdatabase: 
	mongod --dbpath=.mongo --noprealloc --smallfiles
