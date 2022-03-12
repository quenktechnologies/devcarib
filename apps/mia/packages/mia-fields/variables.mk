# globals: 
# 1. DAGEN		       - Path to the @quenk/dagen script.
# 2. TRANSFORM		       - Path to the transform script from 
#                                @quenk/dagen-commons.
# 1. PROJECT_SCHEMA_MODELS_DIR - Path to a folder with the apps model schema.

PROJECT_FIELDS_LIB_DIR:=$(PROJECT_FIELDS_DIR)/lib
PROJECT_FIELDS_SRC_DIR:=$(PROJECT_FIELDS_DIR)/src
PROJECT_FIELDS_PLUGIN_DIR=$(PROJECT_FIELDS_DIR)/plugin
PROJECT_FIELDS_TEMPLATE_DIR:=$(PROJECT_FIELDS_DIR)/templates
PROJECT_FIELDS_TEMPLATE:=$(PROJECT_FIELDS_TEMPLATE_DIR)/model.fields

PROJECT_FIELDS_TEMPLATE_FILES:=$(shell find \
                                   $(PROJECT_FIELDS_TEMPLATE_DIR) -type f)

PROJECT_FIELDS_SRC_DIR_FILES:=$(shell find \
                                   $(PROJECT_FIELDS_SRC_DIR) -type f)

PROJECT_FIELDS_MODEL_FILES=$(wildcard $(PROJECT_SCHEMA_MODELS_DIR)/*.json)

PROJECT_FIELDS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			   $(PROJECT_SCHEMA_MODELS_DIR)/*.json)))
