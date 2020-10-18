### Build the checks package. ###
# 1. BOARD_CHECKS_DIR
# 2. BOARD_SCHEMA_MODELS_DIR

### Binaries ###
TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
DAGEN?=./node_modules/.bin/dagen
VALIDATION_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/checks
CAMELCASE?=node ./node_modules/.bin/camelcase.js

### Settings ###

BOARD_CHECKS_LIB_DIR:=$(BOARD_CHECKS_DIR)/lib
BOARD_CHECKS_SRC_DIR:=$(BOARD_CHECKS_DIR)/src
BOARD_CHECKS_SRC_DIR_FILES:=$(shell find $(BOARD_CHECKS_SRC_DIR) -type f)
BOARD_CHECKS_TYPE_TEMPLATE:=type.checks

# Directory with dagen templates.
BOARD_CHECKS_TEMPLATE_DIR:=$(BOARD_CHECKS_DIR)/templates
BOARD_CHECKS_TEMPLATE_DIR_FILES:=$(shell find $(BOARD_CHECKS_TEMPLATE_DIR)\
                                     -type f)

BOARD_CHECKS_MODEL_FILES=$(wildcard $(BOARD_SCHEMA_MODELS_DIR)/*.json)

# Hook into clean task.
BOARD_CLEAN_TARGETS:=$(BOARD_CLEAN_TARGETS)\
                       $(BOARD_CHECKS_LIB_DIR)

# Add our sources to the list of total project sources.
BOARD_SRC_DIRS:=$(BOARD_SRC_DIRS)\
		  $(BOARD_CHECKS_SRC_DIR)\
		  $(BOARD_CHECKS_TEMPLATE_DIR)

### Macros ###

# @param $1 - Template to use.
# @param $2 - Source file list.
# @param $3 - Output dir.
define checks_mk
$(foreach d,$2,\
  $(eval name=$(notdir $(basename $(d)))) \
  $(eval filename=$(shell $(CAMELCASE) $(name)|tr '[:upper:]' '[:lower:]')) \
  $(DAGEN) --templates $(BOARD_CHECKS_TEMPLATE_DIR) \
  --template $1 \
  --namespace validation \
  --namespace checks \
  --set filename=$(filename) \
  --plugin $(VALIDATION_PLUGIN)\
  $(d) | $(TSFMT) --stdin > \
  $3/$(shell $(CAMELCASE) $(name)|tr\
	'[:upper:]' '[:lower:]').ts && ) true
endef

### Graph ###

$(BOARD_CHECKS_DIR): $(BOARD_CHECKS_LIB_DIR)
	touch $@

# Copy all the sources to the lib folder then run tsc.
$(BOARD_CHECKS_LIB_DIR): $(BOARD_SCHEMA_DIR)\
                           $(BOARD_CHECKS_SRC_DIR)\
                           $(BOARD_CHECKS_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@
	cp -R -u $(BOARD_CHECKS_SRC_DIR)/* $@

	$(call checks_mk,$(BOARD_CHECKS_TYPE_TEMPLATE),\
	$(BOARD_CHECKS_MODEL_FILES),$@)

	$(TSC) --project $@
	touch $@

$(BOARD_CHECKS_SRC_DIR): $(BOARD_CHECKS_SRC_DIR_FILES)
	touch $@

$(BOARD_CHECKS_TEMPLATE_DIR): $(BOARD_CHECKS_TEMPLATE_DIR_FILES)
	touch $@
