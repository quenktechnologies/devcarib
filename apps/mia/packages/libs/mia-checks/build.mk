### Build the checks package. ###
# 1. MIA_CHECKS_DIR
# 2. MIA_SCHEMA_MODELS_DIR

### Binaries ###
TSFMT?=./node_modules/.bin/tsfmt
TSC?=./node_modules/.bin/tsc
DAGEN?=./node_modules/.bin/dagen
VALIDATION_PLUGIN?=node_modules/@quenk/dagen-commons/lib/plugins/checks
TRANSFORM?=./node_modules/.bin/transform

### Settings ###

MIA_CHECKS_LIB_DIR:=$(MIA_CHECKS_DIR)/lib
MIA_CHECKS_SRC_DIR:=$(MIA_CHECKS_DIR)/src
MIA_CHECKS_SRC_DIR_FILES:=$(shell find $(MIA_CHECKS_SRC_DIR) -type f)

# Directory with dagen templates.
MIA_CHECKS_TEMPLATE_DIR:=$(MIA_CHECKS_DIR)/templates
MIA_CHECKS_TEMPLATE_DIR_FILES:=$(shell find $(MIA_CHECKS_TEMPLATE_DIR)\
                                     -type f)
MIA_CHECKS_TYPE_TEMPLATE:=type.checks
MIA_CHECKS_INDEX_TEMPLATE:=index.checks

MIA_CHECKS_MODEL_FILES=$(wildcard $(MIA_SCHEMA_MODELS_DIR)/*.json)
MIA_CHECKS_MODEL_FILES_NAMES=$(notdir $(basename \
					$(MIA_CHECKS_MODEL_FILES)))

# Hook into clean task.
MIA_CLEAN_TARGETS:=$(MIA_CLEAN_TARGETS) $(MIA_CHECKS_LIB_DIR)

# Add our sources to the list of total project sources.
MIA_SRC_DIRS:=$(MIA_SRC_DIRS)\
               $(MIA_CHECKS_SRC_DIR)\
	       $(MIA_CHECKS_TEMPLATE_DIR)

### Graph ###

$(MIA_CHECKS_DIR): $(MIA_CHECKS_LIB_DIR)
	touch $@

# Copy all the sources to the lib folder then run tsc.
$(MIA_CHECKS_LIB_DIR): $(MIA_SCHEMA_DIR)\
                        $(MIA_CHECKS_SRC_DIR)\
                        $(MIA_CHECKS_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir -p  $@
	cp -R -u $(MIA_CHECKS_SRC_DIR)/* $@

	$(foreach d,$(MIA_CHECKS_MODEL_FILES),\
	 $(eval name=$(notdir $(basename $(d)))) \
	 $(DAGEN) --templates $(MIA_CHECKS_TEMPLATE_DIR) \
	 --template $(MIA_CHECKS_TYPE_TEMPLATE) \
	 --namespace validation \
	 --namespace validators \
	 --namespace checks \
	 --plugin $(VALIDATION_PLUGIN)\
	 $(d) | $(TSFMT) --stdin > \
	 $@/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true

	$(DAGEN) --templates $(MIA_CHECKS_TEMPLATE_DIR) \
	--template $(MIA_CHECKS_INDEX_TEMPLATE) \
	--set names="$(MIA_CHECKS_MODEL_FILES_NAMES)" \
	--namespace validators | \
	$(TSFMT) --stdin > \
	$(MIA_CHECKS_LIB_DIR)/index.ts \

	$(TSC) --project $@
	touch $@

$(MIA_CHECKS_SRC_DIR): $(MIA_CHECKS_SRC_DIR_FILES)
	touch $@

$(MIA_CHECKS_TEMPLATE_DIR): $(MIA_CHECKS_TEMPLATE_DIR_FILES)
	touch $@
