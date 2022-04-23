BOARD_MODELS_DIR:=$(BOARD_PACKAGES_DIR)/converse-models
BOARD_MODELS_SRC_DIR:=$(BOARD_MODELS_DIR)/src
BOARD_MODELS_SRC_DIR_FILES:=$(shell find $(BOARD_MODELS_SRC_DIR) -type f)
BOARD_MODELS_LIB_DIR:=$(BOARD_MODELS_DIR)/lib
BOARD_MODELS_MODEL_TEMPLATE:=model.models
BOARD_MODELS_INDEX_TEMPLATE:=index.models

# Directory with dagen templates.
BOARD_MODELS_TEMPLATE_DIR:=$(BOARD_MODELS_DIR)/templates
BOARD_MODELS_TEMPLATE_DIR_FILES:=$(shell find $(BOARD_MODELS_TEMPLATE_DIR) -type f)

# Here we have some check files to ensure the integrity of our schemas.
BOARD_MODELS_CHECKS_DIR:=$(BOARD_MODELS_DIR)/checks
BOARD_MODELS_CHECKS_DIR_FILES:=$(shell find $(BOARD_MODELS_CHECKS_DIR) -type f)

# This is the name of all the files in the model dir without extensions.
BOARD_MODELS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			 $(BOARD_SCHEMA_MODELS_DIR)/*.json)))
