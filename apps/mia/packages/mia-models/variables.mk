MIA_MODELS_DIR:=$(MIA_PACKAGES_DIR)/mia-models
MIA_MODELS_SRC_DIR:=$(MIA_MODELS_DIR)/src
MIA_MODELS_SRC_DIR_FILES:=$(shell find $(MIA_MODELS_SRC_DIR) -type f)
MIA_MODELS_LIB_DIR:=$(MIA_MODELS_DIR)/lib
MIA_MODELS_MODEL_TEMPLATE:=model.models
MIA_MODELS_INDEX_TEMPLATE:=index.models

# Directory with dagen templates.
MIA_MODELS_TEMPLATE_DIR:=$(MIA_MODELS_DIR)/templates
MIA_MODELS_TEMPLATE_DIR_FILES:=$(shell find $(MIA_MODELS_TEMPLATE_DIR) -type f)

# Here we have some check files to ensure the integrity of our schemas.
MIA_MODELS_CHECKS_DIR:=$(MIA_MODELS_DIR)/checks
MIA_MODELS_CHECKS_DIR_FILES:=$(shell find $(MIA_MODELS_CHECKS_DIR) -type f)

# This is the name of all the files in the model dir without extensions.
MIA_MODELS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			 $(MIA_SCHEMA_MODELS_DIR)/*.json)))

CLEAN_TARGETS:=$(CLEAN_TARGETS) $(MIA_MODELS_LIB_DIR)
