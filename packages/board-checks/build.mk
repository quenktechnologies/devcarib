### Build the checks package. ###
# 1. BOARD_CHECKS_DIR
# 2. BOARD_SCHEMA_MODELS_DIR

### Binaries ###
TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
DAGEN?=./node_modules/.bin/dagen
VALIDATION_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/checks
TRANSFORM?=./node_modules/.bin/transform

### Settings ###

BOARD_CHECKS_LIB_DIR:=$(BOARD_CHECKS_DIR)/lib
BOARD_CHECKS_SRC_DIR:=$(BOARD_CHECKS_DIR)/src
BOARD_CHECKS_SRC_DIR_FILES:=$(shell find $(BOARD_CHECKS_SRC_DIR) -type f)

# Directory with dagen templates.
BOARD_CHECKS_TEMPLATE_DIR:=$(BOARD_CHECKS_DIR)/templates
BOARD_CHECKS_TEMPLATE_DIR_FILES:=$(shell find $(BOARD_CHECKS_TEMPLATE_DIR)\
                                     -type f)
BOARD_CHECKS_TYPE_TEMPLATE:=type.checks
BOARD_CHECKS_INDEX_TEMPLATE:=index.checks

BOARD_CHECKS_MODEL_FILES=$(wildcard $(BOARD_SCHEMA_MODELS_DIR)/*.json)
BOARD_CHECKS_MODEL_FILES_NAMES=$(notdir $(basename \
					$(BOARD_CHECKS_MODEL_FILES)))

# Hook into clean task.
CLEAN_TARGETS:=$(CLEAN_TARGETS) $(BOARD_CHECKS_LIB_DIR)

# Add our sources to the list of total project sources.
SRC_DIRS:=$(SRC_DIRS)\
          $(BOARD_CHECKS_SRC_DIR)\
          $(BOARD_CHECKS_TEMPLATE_DIR)

### Graph ###

$(BOARD_CHECKS_DIR): $(BOARD_CHECKS_LIB_DIR)
	touch $@

# Copy all the sources to the lib folder then run tsc.
$(BOARD_CHECKS_LIB_DIR):$(BOARD_VALIDATORS_DIR)\
	                $(DEVCARIB_COMMON_CHECKS_DIR)\
	                $(BOARD_SCHEMA_DIR)\
                        $(BOARD_CHECKS_SRC_DIR)\
                        $(BOARD_CHECKS_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@
	cp -R -u $(BOARD_CHECKS_SRC_DIR)/* $@

	$(foreach d,$(BOARD_CHECKS_MODEL_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(DAGEN) --templates $(BOARD_CHECKS_TEMPLATE_DIR) \
	 --template $(BOARD_CHECKS_TYPE_TEMPLATE) \
	 --namespace validation \
	 --namespace validators \
	 --namespace checks \
	 --plugin $(VALIDATION_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true

	$(DAGEN) --templates $(BOARD_CHECKS_TEMPLATE_DIR) \
	--template $(BOARD_CHECKS_INDEX_TEMPLATE) \
	--set names="$(BOARD_CHECKS_MODEL_FILES_NAMES)" \
	--namespace validators | \
	$(TSFMT) --stdin > \
	$(BOARD_CHECKS_LIB_DIR)/index.ts \

	$(TSC) --project $@
	touch $@

$(BOARD_CHECKS_SRC_DIR): $(BOARD_CHECKS_SRC_DIR_FILES)
	touch $@

$(BOARD_CHECKS_TEMPLATE_DIR): $(BOARD_CHECKS_TEMPLATE_DIR_FILES)
	touch $@
