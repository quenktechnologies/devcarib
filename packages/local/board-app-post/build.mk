### Build the board-views package. ###
# Requires:
# 1. BOARD_APP_POST_DIR

#binaries
DEBUG?=no
BROWSERIFY?=./node_modules/.bin/browserify
WMLC?=./node_modules/.bin/wmlc
LESSC?=./node_modules/.bin/lessc
CLEANCSS?=./node_modules/.bin/cleancss
UGLIFYJS?=./node_modules/.bin/uglifyjs

### Settings ###
BOARD_APP_POST_JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
BOARD_APP_POST_SRC_DIR:=$(BOARD_APP_POST_DIR)/src

BOARD_APP_POST_TS_FILES:=$(shell $(FIND) $(BOARD_APP_POST_SRC_DIR)\
                         -name \*.ts -o -name \*.json)

BOARD_APP_POST_LIB_DIR:=$(BOARD_APP_POST_DIR)/lib
BOARD_APP_POST_LESS_FILES:=$(shell $(FIND) $(BOARD_APP_POST_SRC_DIR) -name \*.less)
BOARD_APP_POST_LESS_MAIN:=$(BOARD_APP_POST_DIR)/main.less
BOARD_APP_POST_LESS_IMPORTS:=$(BOARD_APP_POST_DIR)/imports.less
BOARD_APP_POST_PUBLIC_DIR:=$(BOARD_APP_POST_DIR)/public
BOARD_APP_POST_JS_FILE:=$(BOARD_APP_POST_PUBLIC_DIR)/assets/js/post.js
BOARD_APP_POST_CSS_FILE:=$(BOARD_APP_POST_PUBLIC_DIR)/assets/css/post.css

$(BOARD_APP_POST_DIR): $(BOARD_APP_POST_PUBLIC_DIR)
	touch $@

$(BOARD_APP_POST_PUBLIC_DIR): $(BOARD_APP_POST_CSS_FILE)\
                              $(BOARD_APP_POST_JS_FILE)
	touch $@

$(BOARD_APP_POST_JS_FILE): $(BOARD_APP_POST_LIB_DIR)
	mkdir -p $(dir $@)
	$(BROWSERIFY) $(BOARD_APP_POST_LIB_DIR)/main.js \
	$(if $(findstring yes,$(DEBUG)),,|$(UGLIFYJS)) > $@

$(BOARD_APP_POST_LIB_DIR): $(BOARD_APP_POST_TS_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_APP_POST_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@

$(BOARD_APP_POST_CSS_FILE): $(BOARD_APP_POST_LESS_IMPORTS) \
                            $(BOARD_APP_POST_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(BOARD_APP_POST_JS_VARS) $(BOARD_APP_POST_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(BOARD_APP_POST_LESS_IMPORTS): $(BOARD_APP_POST_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_APP_POST_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
