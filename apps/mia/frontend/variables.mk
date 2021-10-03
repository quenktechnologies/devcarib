### Build the board-views package. ###
# Requires:
# 1. MIA_FRONTEND_DIR

#binaries
DEBUG?=no
BROWSERIFY?=./node_modules/.bin/browserify
WMLC?=./node_modules/.bin/wmlc
LESSC?=./node_modules/.bin/lessc
CLEANCSS?=./node_modules/.bin/cleancss
UGLIFYJS?=./node_modules/.bin/uglifyjs

### Settings ###
MIA_FRONTEND_DIR:=$(MIA_DIR)/frontend
MIA_FRONTEND_JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
MIA_FRONTEND_SRC_DIR:=$(MIA_FRONTEND_DIR)/src

MIA_FRONTEND_SRC_FILES:=$(shell $(FIND) $(MIA_FRONTEND_SRC_DIR)\
                         -name \*.ts -o -name \*.json -o -name \*.wml)

MIA_FRONTEND_LIB_DIR:=$(MIA_FRONTEND_DIR)/lib
MIA_FRONTEND_LESS_FILES:=$(shell $(FIND) $(MIA_FRONTEND_SRC_DIR)\
                                -name \*.less)
MIA_FRONTEND_LESS_MAIN:=$(MIA_FRONTEND_DIR)/main.less
MIA_FRONTEND_LESS_IMPORTS:=$(MIA_FRONTEND_DIR)/imports.less
MIA_FRONTEND_PUBLIC_DIR:=$(MIA_FRONTEND_DIR)/public
MIA_FRONTEND_JS_FILE:=$(MIA_FRONTEND_PUBLIC_DIR)/mia/assets/js/mia.js
MIA_FRONTEND_CSS_FILE:=$(MIA_FRONTEND_PUBLIC_DIR)/mia/assets/css/mia.css

CLEAN_TARGETS:=$(CLEAN_TARGETS)\
               $(MIA_FRONTEND_PUBLIC_DIR)\
               $(MIA_FRONTEND_LIB_DIR)

MIA_FRONTEND_FRONTEND_TEST_DIR:=$(MIA_FRONTEND_DIR)/test/frontend
MIA_FRONTEND_FRONTEND_TEST_SRC_DIR:=$(MIA_FRONTEND_FRONTEND_TEST_DIR)/src

MIA_FRONTEND_FRONTEND_TEST_SRC_DIR_FILES:=$(shell find\
  $(MIA_FRONTEND_FRONTEND_TEST_SRC_DIR) -name \*_test.ts)

MIA_FRONTEND_FRONTEND_TEST_BUILD_DIR:=$(MIA_FRONTEND_FRONTEND_TEST_DIR)/build
MIA_FRONTEND_FRONTEND_TEST_BUNDLE_DIR:=$(MIA_FRONTEND_FRONTEND_TEST_DIR)/bundle
