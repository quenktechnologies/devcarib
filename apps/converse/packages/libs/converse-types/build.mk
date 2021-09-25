### Builds converse-types. ###
# Require:
# 1. CONVERSE_TYPES_DIR 
# 2. CONVERSE_SCHEMA_MODELS_DIR
# 3. CONVERSE_SCHEMA_TYPES_DIR

### Macros ###

# Make type files for schema in a dir.
# $1 List of types to process
# $2 The path to the dir the files are in.
define types_mktypes
$(foreach d,$1,\
  $(eval name=$(notdir $(basename $(d)))) \
  $(DAGEN) --templates $(CONVERSE_TYPES_TEMPLATE_DIR) \
  --template $(CONVERSE_TYPES_TYPE_TEMPLATE) \
  --namespace types \
  $2/$(name).json | $(TSFMT) --stdin > \
  $(CONVERSE_TYPES_LIB_DIR)/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true
endef

$(CONVERSE_TYPES_DIR): $(CONVERSE_TYPES_LIB_DIR)
	touch $@

$(CONVERSE_TYPES_LIB_DIR): $(CONVERSE_SCHEMA_DIR)\
                           $(CONVERSE_TYPES_SRC_DIR)\
                           $(CONVERSE_TYPES_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(CONVERSE_TYPES_SRC_DIR)/* $@

	$(call types_mktypes,\
	$(CONVERSE_TYPES_MODEL_NAMES),$(CONVERSE_SCHEMA_MODELS_DIR))

	$(call types_mktypes,\
	$(CONVERSE_TYPES_TYPE_NAMES),$(CONVERSE_SCHEMA_TYPES_DIR))

	$(TSC) --project $@
	touch $@

$(CONVERSE_TYPES_SRC_DIR): $(CONVERSE_TYPES_SRC_DIR_FILES)
	touch $@

$(CONVERSE_TYPES_TEMPLATE_DIR): $(CONVERSE_TYPES_TEMPLATE_DIR_FILES)
	touch $@
