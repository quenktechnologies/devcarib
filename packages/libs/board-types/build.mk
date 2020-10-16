### Build the types package. ###
# To include this module in the build process the following variables must
# be defined:
# 1. PACKAGES_DIR - The path to the "packages" dir of the project.
# 2. BOARD_TYPES_DIR - The build target of this module.
# 3. BOARD_SCHEMA_MODELS_DIR
# 4. BOARD_SCHEMA_TYPES_DIR
# 5. BOARD_SCHEMA_DIR_FILES - 4-6 should be set by the "types" package.

DAGEN?=./node_modules/.bin/dagen
TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
CAMELCASE?=node $(BOARD_TYPES_DIR)/bin/camelcase.js

### Macros ###

# Make type files for schema in a dir.
# $1 List of types to process
# $2 The path to the dir the files are in.
define types_mktypes
$(foreach d, $1, \
  $(eval name=$(notdir $(basename $(d)))) \
  $(DAGEN) --templates $(BOARD_TYPES_TEMPLATE_DIR) \
  --template $(BOARD_TYPES_TYPE_TEMPLATE) \
  --namespace types \
  $2/$(name).json | $(TSFMT) --stdin > \
  $(BOARD_TYPES_LIB_DIR)/$(shell $(CAMELCASE) $(name)|tr\
  '[:upper:]' '[:lower:]').ts && ) true
endef

### Settings ###

BOARD_TYPES_LIB_DIR:=$(BOARD_TYPES_DIR)/lib
BOARD_TYPES_SRC_DIR:=$(BOARD_TYPES_DIR)/src
BOARD_TYPES_SRC_DIR_FILES:=$(shell find $(BOARD_TYPES_SRC_DIR) -type f)
BOARD_TYPES_TYPE_TEMPLATE:=type.types

# Directory with dagen templates.
BOARD_TYPES_TEMPLATE_DIR:=$(BOARD_TYPES_DIR)/templates
BOARD_TYPES_TEMPLATE_DIR_FILES:=$(shell find $(BOARD_TYPES_TEMPLATE_DIR) -type f)

# This is the name of all the files in the model dir without extensions.
BOARD_TYPES_MODEL_NAMES=$(notdir $(basename $(wildcard \
			$(BOARD_SCHEMA_MODELS_DIR)/*.json)))
BOARD_TYPES_TYPES_NAMES=$(notdir $(basename $(wildcard \
			$(BOARD_SCHEMA_TYPES_DIR)/*.json))) 

### Graph ###

$(BOARD_TYPES_DIR): $(BOARD_TYPES_LIB_DIR)
	touch $@

$(BOARD_TYPES_LIB_DIR): $(BOARD_SCHEMA_DIR_FILES)\
                        $(BOARD_TYPES_SRC_DIR)\
			$(BOARD_TYPES_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_TYPES_SRC_DIR)/* $@

	$(call types_mktypes,\
	$(BOARD_TYPES_MODEL_NAMES),$(BOARD_SCHEMA_MODELS_DIR))

	$(call types_mktypes,\
	$(BOARD_TYPES_TYPES_NAMES),$(BOARD_SCHEMA_TYPES_DIR))

	$(TSC) --project $@
	touch $@

$(BOARD_TYPES_SRC_DIR): $(BOARD_TYPES_SRC_DIR_FILES)
	touch $@

$(BOARD_TYPES_TEMPLATE_DIR): $(BOARD_TYPES_TEMPLATE_DIR_FILES)
	touch $@
