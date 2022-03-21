DEBUG?=no
BROWSERIFY?=./node_modules/.bin/browserify
LESSC?=./node_modules/.bin/lessc
CLEANCSS?=./node_modules/.bin/cleancss
UGLIFYJS?=./node_modules/.bin/uglifyjs

BOARD_FORM_POST_DIR:=$(BOARD_FRONTEND_DIR)/board-form-post
BOARD_FORM_POST_JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
BOARD_FORM_POST_SRC_DIR:=$(BOARD_FORM_POST_DIR)/src

BOARD_FORM_POST_SRC_FILES:=$(shell find $(BOARD_FORM_POST_SRC_DIR)\
                         -name \*.ts -o -name \*.json -o -name \*.wml)

BOARD_FORM_POST_LIB_DIR:=$(BOARD_FORM_POST_DIR)/lib
BOARD_FORM_POST_LESS_FILES:=$(shell find $(BOARD_FORM_POST_SRC_DIR)\
                                -name \*.less)
BOARD_FORM_POST_LESS_MAIN:=$(BOARD_FORM_POST_DIR)/main.less
BOARD_FORM_POST_LESS_IMPORTS:=$(BOARD_FORM_POST_DIR)/imports.less
BOARD_FORM_POST_PUBLIC_DIR:=$(BOARD_FORM_POST_DIR)/public
BOARD_FORM_POST_JS_FILE:=$(BOARD_FORM_POST_PUBLIC_DIR)/assets/js/job-form.js
BOARD_FORM_POST_CSS_FILE:=$(BOARD_FORM_POST_PUBLIC_DIR)/assets/css/job-form.css
