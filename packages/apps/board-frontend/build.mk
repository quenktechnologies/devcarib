### Build the quenk-resource package. ###

### Macros ###

### Settings ###
BROWSERIFY?=node_modules/.bin/browserify
LESSC?=node_modules/.bin/lessc
WMLC?=node_modules/.bin/wmlc

BOARD_FRONTEND_BUILD:=$(PACKAGES_DIR)/board-frontend/public
BOARD_FRONTEND_SRC_DIR:=$(BOARD_FRONTEND_DIR)/src
BOARD_FRONTEND_SRC_DIR_TS:=$(shell find $(BOARD_FRONTEND_SRC_DIR) -name \*.ts -o -name \*.json)
BOARD_FRONTEND_SRC_DIR_WML:=$(shell find $(BOARD_FRONTEND_SRC_DIR) -name \*.wml)
BOARD_FRONTEND_LIB_DIR:=$(BOARD_FRONTEND_DIR)/lib
BOARD_FRONTEND_JS_DIR_MAIN:=$(BOARD_FRONTEND_LIB_DIR)/main.js

BOARD_FRONTEND_JS_BUILD:=$(BOARD_FRONTEND_BUILD)/app.js
BOARD_FRONTEND_CSS_BUILD:=$(BOARD_FRONTEND_BUILD)/app.css

BOARD_FRONTEND_JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
BOARD_FRONTEND_SRC_DIR_LESS:=$(shell find $(BOARD_FRONTEND_SRC_DIR) -name \*.less)
BOARD_FRONTEND_LESS_DIR_MAIN:=$(BOARD_FRONTEND_DIR)/src/less/main.less

### Graph ###
$(BOARD_FRONTEND_DIR): $(BOARD_FRONTEND_BUILD)
	touch $@

$(BOARD_FRONTEND_BUILD): $(BOARD_FRONTEND_JS_BUILD)\
		         $(BOARD_FRONTEND_CSS_BUILD)\
			 $(BOARD_TYPES_DIR)
		
	mkdir -p $@
	$(BROWSERIFY) $(BOARD_FRONTEND_JS_DIR_MAIN) > $(BOARD_FRONTEND_JS_BUILD)
	touch $@

$(BOARD_FRONTEND_JS_BUILD): $(BOARD_FRONTEND_LIB_DIR)
	$(BROWSERIFY) $(BOARD_FRONTEND_JS_DIR_MAIN) > $@

$(BOARD_FRONTEND_LIB_DIR): $(BOARD_FRONTEND_SRC_DIR_WML) $(BOARD_FRONTEND_SRC_DIR_TS) 
	rm -R $@ 2> /dev/null || true 
	mkdir -p $@
	cp -R -u $(BOARD_FRONTEND_SRC_DIR)/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@
	
$(BOARD_FRONTEND_CSS_BUILD): $(BOARD_FRONTEND_SRC_DIR_LESS)
	$(LESSC) --source-map-less-inline \
	--js-vars=$(BOARD_FRONTEND_JS_VARS) $(BOARD_FRONTEND_LESS_DIR_MAIN) > $@
