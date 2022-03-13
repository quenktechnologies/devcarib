# globals: 
# 1. DAGEN		       - Path to the @quenk/dagen script.
# 2. TRANSFORM		       - Path to the transform script from 
#                                @quenk/dagen-commons.
# 3. MIA_SCHEMA_MODELS_DIR     - Path to a folder with the apps model schema.

MIA_FIELDS_DIR:=$(MIA_PACKAGES_DIR)/mia-fields
MIA_FIELDS_LIB_DIR:=$(MIA_FIELDS_DIR)/lib
MIA_FIELDS_SRC_DIR:=$(MIA_FIELDS_DIR)/src
MIA_FIELDS_PLUGIN_DIR=$(MIA_FIELDS_DIR)/plugin
MIA_FIELDS_TEMPLATE_DIR:=$(MIA_FIELDS_DIR)/templates
MIA_FIELDS_TEMPLATE:=$(MIA_FIELDS_TEMPLATE_DIR)/model.nunjucks
MIA_FIELDS_INDEX_TEMPLATE:=$(MIA_FIELDS_TEMPLATE_DIR)/index.nunjucks

MIA_FIELDS_TEMPLATE_FILES:=$(shell find \
                                   $(MIA_FIELDS_TEMPLATE_DIR) -type f)

MIA_FIELDS_SRC_DIR_FILES:=$(shell find \
                                   $(MIA_FIELDS_SRC_DIR) -type f)

MIA_FIELDS_MODEL_FILES=$(wildcard $(MIA_SCHEMA_MODELS_DIR)/*.json)

MIA_FIELDS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			   $(MIA_SCHEMA_MODELS_DIR)/*.json)))
