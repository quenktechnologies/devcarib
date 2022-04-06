# globals: 
# 1. DAGEN		       - Path to the @quenk/dagen script.
# 2. TRANSFORM		       - Path to the transform script from 
#                                @quenk/dagen-commons.
# 3. CONVERSE_SCHEMA_MODELS_DIR     - Path to a folder with the apps model schema.

CONVERSE_FIELDS_DIR:=$(CONVERSE_PACKAGES_DIR)/converse-fields
CONVERSE_FIELDS_LIB_DIR:=$(CONVERSE_FIELDS_DIR)/lib
CONVERSE_FIELDS_SRC_DIR:=$(CONVERSE_FIELDS_DIR)/src
CONVERSE_FIELDS_PLUGIN_DIR=$(CONVERSE_FIELDS_DIR)/plugin
CONVERSE_FIELDS_TEMPLATE_DIR:=$(CONVERSE_FIELDS_DIR)/templates
CONVERSE_FIELDS_TEMPLATE:=$(CONVERSE_FIELDS_TEMPLATE_DIR)/model.nunjucks
CONVERSE_FIELDS_INDEX_TEMPLATE:=$(CONVERSE_FIELDS_TEMPLATE_DIR)/index.nunjucks

CONVERSE_FIELDS_TEMPLATE_FILES:=$(shell find \
                                   $(CONVERSE_FIELDS_TEMPLATE_DIR) -type f)

CONVERSE_FIELDS_SRC_DIR_FILES:=$(shell find \
                                   $(CONVERSE_FIELDS_SRC_DIR) -type f)

CONVERSE_FIELDS_MODEL_FILES=$(wildcard $(CONVERSE_SCHEMA_MODELS_DIR)/*.json)

CONVERSE_FIELDS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			   $(CONVERSE_SCHEMA_MODELS_DIR)/*.json)))
