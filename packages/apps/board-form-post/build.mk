### Build the board-views package. ###
# Requires:
# 1. BOARD_FORM_POST_DIR

#binaries
DEBUG?=no
BROWSERIFY?=./node_modules/.bin/browserify
WMLC?=./node_modules/.bin/wmlc
LESSC?=./node_modules/.bin/lessc
CLEANCSS?=./node_modules/.bin/cleancss
UGLIFYJS?=./node_modules/.bin/uglifyjs

### Settings ###
BOARD_FORM_POST_JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
BOARD_FORM_POST_SRC_DIR:=$(BOARD_FORM_POST_DIR)/src

BOARD_FORM_POST_SRC_FILES:=$(shell $(FIND) $(BOARD_FORM_POST_SRC_DIR)\
                         -name \*.ts -o -name \*.json -o -name \*.wml)

BOARD_FORM_POST_LIB_DIR:=$(BOARD_FORM_POST_DIR)/lib
BOARD_FORM_POST_LESS_FILES:=$(shell $(FIND) $(BOARD_FORM_POST_SRC_DIR)\
                                -name \*.less)
BOARD_FORM_POST_LESS_MAIN:=$(BOARD_FORM_POST_DIR)/main.less
BOARD_FORM_POST_LESS_IMPORTS:=$(BOARD_FORM_POST_DIR)/imports.less
BOARD_FORM_POST_PUBLIC_DIR:=$(BOARD_FORM_POST_DIR)/public
BOARD_FORM_POST_JS_FILE:=$(BOARD_FORM_POST_PUBLIC_DIR)/assets/js/post-form.js
BOARD_FORM_POST_CSS_FILE:=$(BOARD_FORM_POST_PUBLIC_DIR)/assets/css/post-form.css

BOARD_CLEAN_TARGETS:= $(BOARD_CLEAN_TARGETS)\
                $(BOARD_FORM_POST_PUBLIC_DIR)\
                $(BOARD_FORM_POST_LIB_DIR)

BOARD_FORM_POST_FRONTEND_TEST_DIR:=$(BOARD_FORM_POST_DIR)/test/frontend
BOARD_FORM_POST_FRONTEND_TEST_SRC_DIR:=$(BOARD_FORM_POST_FRONTEND_TEST_DIR)/src

BOARD_FORM_POST_FRONTEND_TEST_SRC_DIR_FILES:=$(shell find\
  $(BOARD_FORM_POST_FRONTEND_TEST_SRC_DIR) -name \*_test.ts)

BOARD_FORM_POST_FRONTEND_TEST_BUILD_DIR:=$(BOARD_FORM_POST_FRONTEND_TEST_DIR)/build
BOARD_FORM_POST_FRONTEND_TEST_BUNDLE_DIR:=$(BOARD_FORM_POST_FRONTEND_TEST_DIR)/bundle

$(BOARD_FORM_POST_DIR): $(BOARD_FORM_POST_PUBLIC_DIR)\
                        $(BOARD_FORM_POST_FRONTEND_TEST_DIR)
	touch $@

$(BOARD_FORM_POST_PUBLIC_DIR): $(BOARD_FORM_POST_CSS_FILE)\
                               $(BOARD_FORM_POST_JS_FILE)
	touch $@

$(BOARD_FORM_POST_JS_FILE): $(BOARD_FORM_POST_LIB_DIR)
	mkdir -p $(dir $@)
	$(BROWSERIFY) $(BOARD_FORM_POST_LIB_DIR)/main.js \
	$(if $(findstring yes,$(DEBUG)),,|$(UGLIFYJS)) > $@

$(BOARD_FORM_POST_LIB_DIR): $(BOARD_FORM_POST_SRC_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_FORM_POST_SRC_DIR)/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(BOARD_FORM_POST_CSS_FILE): $(BOARD_FORM_POST_LESS_IMPORTS) \
                             $(BOARD_FORM_POST_LESS_MAIN)
	mkdir -p $(dir $@)
	rm -R $@ || true
	$(LESSC) --source-map-less-inline \
	--js-vars=$(BOARD_FORM_POST_JS_VARS) $(BOARD_FORM_POST_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@

$(BOARD_FORM_POST_LESS_IMPORTS): $(BOARD_FORM_POST_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_FORM_POST_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true

$(BOARD_FORM_POST_FRONTEND_TEST_DIR): $(BOARD_FORM_POST_FRONTEND_TEST_BUNDLE_DIR)
	touch $@

$(BOARD_FORM_POST_FRONTEND_TEST_BUNDLE_DIR): $(BOARD_FORM_POST_FRONTEND_TEST_BUILD_DIR)
	rm -R $@ || true
	mkdir -p $@
	$(foreach test,$(shell find $(BOARD_FORM_POST_FRONTEND_TEST_BUILD_DIR)\
	   -name \*.js), $(BROWSERIFY) $(test) > $@/$(notdir $(basename $(test))).js)

$(BOARD_FORM_POST_FRONTEND_TEST_BUILD_DIR): $(BOARD_FORM_POST_FRONTEND_TEST_SRC_DIR)
	rm -R $@ || true
	cp -R $(BOARD_FORM_POST_FRONTEND_TEST_SRC_DIR) $@
	$(TSC) --project $@

$(BOARD_FORM_POST_FRONTEND_TEST_SRC_DIR): $(BOARD_FORM_POST_FRONTEND_TEST_SRC_DIR_FILES)
	touch $@
