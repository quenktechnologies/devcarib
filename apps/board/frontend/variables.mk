BOARD_JOB_FORM_DIR?=$(BOARD_FRONTEND_DIR)

BOARD_JOB_FORM_PUBLIC_DIR:=$(BOARD_JOB_FORM_DIR)/public
BOARD_JOB_FORM_CSS_IMPORTS:=$(shell find $(BOARD_JOB_FORM_DIR)/src -name \*.scss)
BOARD_JOB_FORM_CSS_FILE:=$(BOARD_JOB_FORM_PUBLIC_DIR)/assets/css/form.css
BOARD_JOB_FORM_JS_FILE:=$(BOARD_JOB_FORM_PUBLIC_DIR)/assets/js/form.js

CLEAN_TARGETS:=$(CLEAN_TARGETS) \
	       $(BOARD_JOB_FORM_PUBLIC_DIR)/form.js \
	       $(BOARD_JOB_FORM_PUBLIC_DIR)/form.css

include $(BOARD_JOB_FORM_DIR)/src/models/variables.mk
