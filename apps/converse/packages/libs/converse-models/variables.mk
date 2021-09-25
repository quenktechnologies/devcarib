CONVERSE_MODELS_DIR:=$(CONVERSE_LIBS_DIR)/converse-models
CONVERSE_MODELS_SRC_DIR:=$(CONVERSE_MODELS_DIR)/src
CONVERSE_MODELS_SRC_DIR_FILES:=$(shell find $(CONVERSE_MODELS_SRC_DIR) -type f)
CONVERSE_MODELS_LIB_DIR:=$(CONVERSE_MODELS_DIR)/lib
CONVERSE_MODELS_MODEL_TEMPLATE:=model.models
CONVERSE_MODELS_INDEX_TEMPLATE:=index.models

# Directory with dagen templates.
CONVERSE_MODELS_TEMPLATE_DIR:=$(CONVERSE_MODELS_DIR)/templates
CONVERSE_MODELS_TEMPLATE_DIR_FILES:=$(shell find $(CONVERSE_MODELS_TEMPLATE_DIR) -type f)

# Here we have some check files to ensure the integrity of our schemas.
CONVERSE_MODELS_CHECKS_DIR:=$(CONVERSE_MODELS_DIR)/checks
CONVERSE_MODELS_CHECKS_DIR_FILES:=$(shell find $(CONVERSE_MODELS_CHECKS_DIR) -type f)

# This is the name of all the files in the model dir without extensions.
CONVERSE_MODELS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			 $(CONVERSE_SCHEMA_MODELS_DIR)/*.json)))
