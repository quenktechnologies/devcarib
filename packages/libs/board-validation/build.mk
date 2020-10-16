### Build the validation package. ###
# The following variables must be defined:
# 1. PACKAGES_DIR
# 2. SCHEMA_MODELS_DIR
# 3. SCHEMA_TYPES_DIR
# 4. BOARD_SCHEMA_DIR_FILES

TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
DAGEN?=./node_modules/.bin/dagen
CAMELCASE?=node ./node_modules/.bin/camelcase.js

### Settings ###
BOARD_VALIDATION_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/validation
BOARD_VALIDATION_LIB_DIR:=$(BOARD_VALIDATION_DIR)/lib
RENAME?=$(BOARD_VALIDATION_DIR)/bin/rename.sh
BOARD_VALIDATION_SRC_DIR:=$(BOARD_VALIDATION_DIR)/src
BOARD_VALIDATION_SRC_DIR_FILES:=$(shell find $(BOARD_VALIDATION_SRC_DIR) -type f)
BOARD_VALIDATION_TYPE_TEMPLATE:=type.validation

# Directory with dagen templates.
BOARD_VALIDATION_TEMPLATE_DIR:=$(BOARD_VALIDATION_DIR)/templates
BOARD_VALIDATION_TEMPLATE_DIR_FILES:=$(shell find $(BOARD_VALIDATION_TEMPLATE_DIR)\
                                     -type f)

BOARD_VALIDATION_MODEL_FILES=$(wildcard $(BOARD_SCHEMA_MODELS_DIR)/*.json)
BOARD_VALIDATION_TYPES_FILES=$(wildcard $(BOARD_SCHEMA_TYPES_DIR)/*.json)

# Test generation.
BOARD_VALIDATION_TEST_DIR:=$(BOARD_VALIDATION_DIR)/test/auto
BOARD_VALIDATION_TEST_TEMPLATE:=test.validation

### Macros ###

# @param $1 - Template to use.
# @param $2 - Source file list.
# @param $3 - Output dir.
# @param $4 - Partial flag
define validation_mkchecks
$(foreach d,$2,\
  $(eval name=$(notdir $(basename $(d)))) \
  $(eval filename=$(shell $(CAMELCASE) $(name)|tr '[:upper:]' '[:lower:]')) \
  $(DAGEN) --templates $(BOARD_VALIDATION_TEMPLATE_DIR) \
  --template $1 \
  --namespace validation \
  --namespace $(if $4,partial,complete)\
  --set filename=$(filename) \
  --set partial=$(if $4,true,false) \
  --plugin $(BOARD_VALIDATION_PLUGIN)\
  $(d) | $(TSFMT) --stdin > \
  $3/$(shell $(CAMELCASE) $(name)|tr\
	'[:upper:]' '[:lower:]').ts && ) true
endef
### Graph ###

$(BOARD_VALIDATION_DIR): $(BOARD_VALIDATION_LIB_DIR) $(BOARD_VALIDATION_TEST_DIR)
	touch $@

# Copy all the sources to the lib folder then run tsc.
$(BOARD_VALIDATION_LIB_DIR): $(BOARD_SCHEMA_DIR)\
			     $(BOARD_TYPES_DIR)\
                             $(BOARD_VALIDATION_SRC_DIR)\
                             $(BOARD_VALIDATION_TEMPLATE_DIR)

	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@/partial
	cp -R -u $(BOARD_VALIDATION_SRC_DIR)/* $@

	$(call validation_mkchecks,$(BOARD_VALIDATION_TYPE_TEMPLATE),\
	$(BOARD_VALIDATION_MODEL_FILES),$@,)

	$(call validation_mkchecks,$(BOARD_VALIDATION_TYPE_TEMPLATE),\
	$(BOARD_VALIDATION_MODEL_FILES),$@/partial,true)

	$(call validation_mkchecks,$(BOARD_VALIDATION_TYPE_TEMPLATE),\
	$(BOARD_VALIDATION_TYPES_FILES),$@,)

	$(call validation_mkchecks,$(BOARD_VALIDATION_TYPE_TEMPLATE),\
	$(BOARD_VALIDATION_TYPES_FILES),$@/partial,true)

	$(TSC) --project $@
	touch $@

$(BOARD_VALIDATION_SRC_DIR): $(BOARD_VALIDATION_SRC_DIR_FILES)
	touch $@

$(BOARD_VALIDATION_TEMPLATE_DIR): $(BOARD_VALIDATION_TEMPLATE_DIR_FILES)
	touch $@

$(BOARD_VALIDATION_TEST_DIR): $(BOARD_VALIDATION_LIB_DIR) \
                              $(BOARD_VALIDATION_TEMPLATE_DIR_FILES)
	rm -R $@ || true
	mkdir -p $@
	
	$(call validation_mkchecks,$(BOARD_VALIDATION_TEST_TEMPLATE),\
	$(BOARD_VALIDATION_MODEL_FILES),$@,false,)
	$(RENAME) $@
	touch $@
