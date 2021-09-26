### Build the types package. ###
# To include this module in the build process the following variables must
# be defined:
# 1. MIA_TYPES_DIR 
# 2. MIA_SCHEMA_MODELS_DIR
# 3. MIA_SCHEMA_TYPES_DIR
# 4. MIA_SCHEMA_DIR_FILES

### Binaries ###
DAGEN?=./node_modules/.bin/dagen
TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
TRANSFORM:=./node_modules/.bin/transform

### Macros ###

# Make type files for schema in a dir.
# $1 List of types to process
# $2 The path to the dir the files are in.
define types_mktypes
$(foreach d,$1,\
  $(eval name=$(notdir $(basename $(d)))) \
  $(DAGEN) --templates $(MIA_TYPES_TEMPLATE_DIR) \
  --template $(MIA_TYPES_TYPE_TEMPLATE) \
  --namespace types \
  $2/$(name).json | $(TSFMT) --stdin > \
  $(MIA_TYPES_LIB_DIR)/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true
endef

### Settings ###
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

### Graph ###

$(MIA_TYPES_DIR): $(MIA_TYPES_LIB_DIR)
	touch $@

$(MIA_TYPES_LIB_DIR): $(MIA_SCHEMA_DIR_FILES)\
                  $(MIA_TYPES_SRC_DIR)\
                  $(MIA_TYPES_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(MIA_TYPES_SRC_DIR)/* $@

	$(call types_mktypes,\
	$(MIA_TYPES_MODEL_NAMES),$(MIA_SCHEMA_MODELS_DIR))

	$(call types_mktypes,\
	$(MIA_TYPES_TYPE_NAMES),$(MIA_SCHEMA_TYPES_DIR))

	$(TSC) --project $@
	touch $@

$(MIA_TYPES_SRC_DIR): $(MIA_TYPES_SRC_DIR_FILES)
	touch $@

$(MIA_TYPES_TEMPLATE_DIR): $(MIA_TYPES_TEMPLATE_DIR_FILES)
	touch $@
