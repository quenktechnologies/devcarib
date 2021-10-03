MIA_TYPES_DIR:=$(MIA_PACKAGES_DIR)/mia-types
MIA_TYPES_LIB_DIR:=$(MIA_TYPES_DIR)/lib
MIA_TYPES_SRC_DIR:=$(MIA_TYPES_DIR)/src
MIA_TYPES_SRC_DIR_FILES:=$(shell find $(MIA_TYPES_SRC_DIR) -type f)
MIA_TYPES_TYPE_TEMPLATE:=type.types

# Directory with dagen templates.
MIA_TYPES_TEMPLATE_DIR:=$(MIA_TYPES_DIR)/templates
MIA_TYPES_TEMPLATE_DIR_FILES:=$(shell find $(MIA_TYPES_TEMPLATE_DIR) -type f)

# This is the name of all the files in the model dir without extensions.
MIA_TYPES_MODEL_NAMES=$(notdir $(basename $(wildcard \
			$(MIA_SCHEMA_MODELS_DIR)/*.json)))
MIA_TYPES_TYPE_NAMES=$(notdir $(basename $(wildcard \
			$(MIA_SCHEMA_TYPES_DIR)/*.json))) 

CLEAN_TARGETS:=$(CLEAN_TARGETS) $(MIA_TYPES_LIB_DIR)
