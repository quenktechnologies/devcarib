# globals: 
# 1. DAGEN		       - Path to the @quenk/dagen script.
# 2. TRANSFORM		       - Path to the transform script from 
#                                @quenk/dagen-commons.
# 3. BOARD_SCHEMA_MODELS_DIR     - Path to a folder with the apps model schema.

BOARD_FIELDS_DIR:=$(BOARD_PACKAGES_DIR)/board-fields
BOARD_FIELDS_LIB_DIR:=$(BOARD_FIELDS_DIR)/lib
BOARD_FIELDS_SRC_DIR:=$(BOARD_FIELDS_DIR)/src
BOARD_FIELDS_PLUGIN_DIR=$(BOARD_FIELDS_DIR)/plugin
BOARD_FIELDS_TEMPLATE_DIR:=$(BOARD_FIELDS_DIR)/templates
BOARD_FIELDS_TEMPLATE:=$(BOARD_FIELDS_TEMPLATE_DIR)/model.nunjucks
BOARD_FIELDS_INDEX_TEMPLATE:=$(BOARD_FIELDS_TEMPLATE_DIR)/index.nunjucks

BOARD_FIELDS_TEMPLATE_FILES:=$(shell find \
                                   $(BOARD_FIELDS_TEMPLATE_DIR) -type f)

BOARD_FIELDS_SRC_DIR_FILES:=$(shell find \
                                   $(BOARD_FIELDS_SRC_DIR) -type f)

BOARD_FIELDS_MODEL_FILES=$(wildcard $(BOARD_SCHEMA_MODELS_DIR)/*.json)

BOARD_FIELDS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			   $(BOARD_SCHEMA_MODELS_DIR)/*.json)))
