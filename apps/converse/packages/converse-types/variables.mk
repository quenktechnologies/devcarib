CONVERSE_TYPES_DIR:=$(CONVERSE_PACKAGES_DIR)/converse-types
CONVERSE_TYPES_LIB_DIR:=$(CONVERSE_TYPES_DIR)/lib
CONVERSE_TYPES_SRC_DIR:=$(CONVERSE_TYPES_DIR)/src
CONVERSE_TYPES_SRC_DIR_FILES:=$(shell find $(CONVERSE_TYPES_SRC_DIR) -type f)
CONVERSE_TYPES_TYPE_TEMPLATE:=type.types

# Directory with dagen templates.
CONVERSE_TYPES_TEMPLATE_DIR:=$(CONVERSE_TYPES_DIR)/templates
CONVERSE_TYPES_TEMPLATE_DIR_FILES:=$(shell find $(CONVERSE_TYPES_TEMPLATE_DIR) -type f)

# This is the name of all the files in the model dir without extensions.
CONVERSE_TYPES_MODEL_NAMES=$(notdir $(basename $(wildcard \
			$(CONVERSE_SCHEMA_MODELS_DIR)/*.json)))
CONVERSE_TYPES_TYPE_NAMES=$(notdir $(basename $(wildcard \
			$(CONVERSE_SCHEMA_TYPES_DIR)/*.json))) 
