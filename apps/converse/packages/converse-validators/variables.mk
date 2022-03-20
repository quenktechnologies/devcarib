CONVERSE_VALIDATORS_DIR:=$(CONVERSE_PACKAGES_DIR)/converse-validators
CONVERSE_VALIDATORS_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/validation
CONVERSE_VALIDATORS_SRC_DIR:=$(CONVERSE_VALIDATORS_DIR)/src
CONVERSE_VALIDATORS_SRC_DIR_FILES:=$(shell find $(CONVERSE_VALIDATORS_SRC_DIR) -type f)
CONVERSE_VALIDATORS_LIB_DIR:=$(CONVERSE_VALIDATORS_DIR)/lib

CONVERSE_VALIDATORS_TEMPLATE_DIR:=$(CONVERSE_VALIDATORS_DIR)/templates
CONVERSE_VALIDATORS_TEMPLATE_DIR_FILES:=$(shell find \
				    $(CONVERSE_VALIDATORS_TEMPLATE_DIR) -type f)
CONVERSE_VALIDATORS_TYPE_TEMPLATE:=type.validators
CONVERSE_VALIDATORS_INDEX_TEMPLATE:=index.validators

CONVERSE_VALIDATORS_MODEL_FILES=$(wildcard $(CONVERSE_SCHEMA_MODELS_DIR)/*.json)
CONVERSE_VALIDATORS_TYPES_FILES=$(wildcard $(CONVERSE_SCHEMA_TYPES_DIR)/*.json)
CONVERSE_VALIDATORS_SRC_FILES=$(CONVERSE_VALIDATORS_MODEL_FILES) \
			  $(CONVERSE_VALIDATORS_TYPES_FILES)
CONVERSE_VALIDATORS_SRC_FILES_NAMES=$(notdir $(basename \
				$(CONVERSE_VALIDATORS_MODEL_FILES)))

# Test generation.
CONVERSE_VALIDATORS_TEST_DIR:=$(CONVERSE_VALIDATORS_DIR)/test
CONVERSE_VALIDATORS_UNIT_TEST_DIR:=$(CONVERSE_VALIDATORS_TEST_DIR)/unit
CONVERSE_VALIDATORS_TEST_TEMPLATE:=test.validators
CONVERSE_VALIDATORS_TEST_DATA_DIR:=$(CONVERSE_VALIDATORS_TEST_DIR)/fixtures/data 
CONVERSE_VALIDATORS_EXTRA_TEST_DIR:=$(CONVERSE_VALIDATORS_TEST_DIR)/unitextras

# Hook into clean task.
CLEAN_TARGETS:=$(CLEAN_TARGETS)\
               $(CONVERSE_VALIDATORS_LIB_DIR)\
	       $(CONVERSE_VALIDATORS_TEST_DIR)

# Add our sources to the list of total project sources.
SRC_DIRS:=$(SRC_DIRS)\
	  $(CONVERSE_VALIDATORS_SRC_DIR)\
	  $(CONVERSE_VALIDATORS_TEST_DATA_DIR)\
	  $(CONVERSE_VALIDATORS_TEMPLATE_DIR)