# Requires:
# 1. BOARD_FILTER_POLICIES_DIR
# 2. BOARD_SCHEMA_MODELS_DIR

BOARD_FILTER_POLICIES_DIR:=$(BOARD_PACKAGES_DIR)/converse-filter-policies
BOARD_FILTER_POLICIES_LIB_DIR:=$(BOARD_FILTER_POLICIES_DIR)/lib
BOARD_FILTER_POLICIES_SRC_DIR:=$(BOARD_FILTER_POLICIES_DIR)/src
BOARD_FILTER_POLICIES_TEMPLATES_DIR:=$(BOARD_FILTER_POLICIES_DIR)/templates

BOARD_FILTER_POLICIES_TEMPLATE_FILES:=\
                      $(shell find $(BOARD_FILTER_POLICIES_TEMPLATES_DIR) -type f)

BOARD_FILTER_POLICIES_SRC_DIR_FILES:=\
                      $(shell find $(BOARD_FILTER_POLICIES_SRC_DIR) -type f)

BOARD_FILTER_POLICIES_MODEL_FILES=$(wildcard $(BOARD_SCHEMA_MODELS_DIR)/*.json)

BOARD_FIELDS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			   $(BOARD_SCHEMA_MODELS_DIR)/*.json)))