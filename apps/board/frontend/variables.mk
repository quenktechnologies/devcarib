BOARD_FRONTEND_JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
BOARD_FRONTEND_SRC_DIR:=$(BOARD_FRONTEND_DIR)/src

BOARD_FRONTEND_SRC_FILES:=$(shell find $(BOARD_FRONTEND_SRC_DIR)\
                         -name \*.ts -o -name \*.json -o -name \*.wml)

BOARD_FRONTEND_LIB_DIR:=$(BOARD_FRONTEND_DIR)/lib
BOARD_FRONTEND_LESS_FILES:=$(shell find $(BOARD_FRONTEND_SRC_DIR)\
                                -name \*.less)
BOARD_FRONTEND_LESS_MAIN:=$(BOARD_FRONTEND_DIR)/main.less
BOARD_FRONTEND_LESS_IMPORTS:=$(BOARD_FRONTEND_DIR)/imports.less
BOARD_FRONTEND_PUBLIC_DIR:=$(BOARD_FRONTEND_DIR)/public
BOARD_FRONTEND_JS_FILE:=$(BOARD_FRONTEND_PUBLIC_DIR)/assets/js/board.js
BOARD_FRONTEND_CSS_FILE:=$(BOARD_FRONTEND_PUBLIC_DIR)/assets/css/board-frontend.css
