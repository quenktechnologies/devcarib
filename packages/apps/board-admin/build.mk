### Build the board-views package. ###
# Requires:
# 1. BOARD_ADMIN_DIR

#binaries
DEBUG?=no
BROWSERIFY?=./node_modules/.bin/browserify
WMLC?=./node_modules/.bin/wmlc
LESSC?=./node_modules/.bin/lessc
CLEANCSS?=./node_modules/.bin/cleancss
UGLIFYJS?=./node_modules/.bin/uglifyjs

### Settings ###
BOARD_ADMIN_JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
BOARD_ADMIN_SRC_DIR:=$(BOARD_ADMIN_DIR)/src

BOARD_ADMIN_SRC_FILES:=$(shell $(FIND) $(BOARD_ADMIN_SRC_DIR)\
                         -name \*.ts -o -name \*.json -o -name \*.wml)

BOARD_ADMIN_LIB_DIR:=$(BOARD_ADMIN_DIR)/lib
BOARD_ADMIN_LESS_FILES:=$(shell $(FIND) $(BOARD_ADMIN_SRC_DIR)\
                                -name \*.less)
BOARD_ADMIN_LESS_MAIN:=$(BOARD_ADMIN_DIR)/main.less
BOARD_ADMIN_LESS_IMPORTS:=$(BOARD_ADMIN_DIR)/imports.less
BOARD_ADMIN_PUBLIC_DIR:=$(BOARD_ADMIN_DIR)/public
BOARD_ADMIN_JS_FILE:=$(BOARD_ADMIN_PUBLIC_DIR)/assets/js/board-admin.js
BOARD_ADMIN_CSS_FILE:=$(BOARD_ADMIN_PUBLIC_DIR)/assets/css/board-admin.css

BOARD_CLEAN_TARGETS:=$(BOARD_CLEAN_TARGETS)\
               $(BOARD_ADMIN_PUBLIC_DIR)\
               $(BOARD_ADMIN_LIB_DIR)

$(BOARD_ADMIN_DIR): $(BOARD_ADMIN_PUBLIC_DIR)
	touch $@

$(BOARD_ADMIN_PUBLIC_DIR): $(BOARD_ADMIN_CSS_FILE)\
                           $(BOARD_ADMIN_JS_FILE)
	touch $@

$(BOARD_ADMIN_JS_FILE): $(BOARD_ADMIN_LIB_DIR)
	mkdir -p $(dir $@)
	$(BROWSERIFY) $(BOARD_ADMIN_LIB_DIR)/main.js \
	$(if $(findstring yes,$(DEBUG)),,|$(UGLIFYJS)) > $@

$(BOARD_ADMIN_LIB_DIR): $(BOARD_ADMIN_SRC_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_ADMIN_SRC_DIR)/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(BOARD_ADMIN_CSS_FILE): $(BOARD_ADMIN_LESS_IMPORTS) \
                             $(BOARD_ADMIN_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(BOARD_ADMIN_JS_VARS) $(BOARD_ADMIN_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(BOARD_ADMIN_LESS_IMPORTS): $(BOARD_ADMIN_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_ADMIN_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
