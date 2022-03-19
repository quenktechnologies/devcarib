# Requires:
# 1. PROJECT_FILTER_POLICIES_DIR
# 2. PROJECT_SCHEMA_MODELS_DIR

PROJECT_FILTER_POLICIES_LIB_DIR:=$(PROJECT_FILTER_POLICIES_DIR)/lib
PROJECT_FILTER_POLICIES_SRC_DIR:=$(PROJECT_FILTER_POLICIES_DIR)/src
PROJECT_FILTER_POLICIES_TEMPLATES_DIR:=$(PROJECT_FILTER_POLICIES_DIR)/templates

PROJECT_FILTER_POLICIES_TEMPLATE_FILES:=\
                      $(shell find $(PROJECT_FILTER_POLICIES_TEMPLATES_DIR) -type f)

PROJECT_FILTER_POLICIES_SRC_DIR_FILES:=\
                      $(shell find $(PROJECT_FILTER_POLICIES_SRC_DIR) -type f)

PROJECT_FILTER_POLICIES_MODEL_FILES=$(wildcard $(PROJECT_SCHEMA_MODELS_DIR)/*.json)

PROJECT_FIELDS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			   $(PROJECT_SCHEMA_MODELS_DIR)/*.json)))