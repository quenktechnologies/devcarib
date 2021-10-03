### Builds mia-types ###

# Make type files for schema in a dir.
# $1 List of types to process
# $2 The path to the dir the files are in.
define mia_mktypes
$(foreach d,$1,\
  $(eval name=$(notdir $(basename $(d)))) \
  $(DAGEN) --templates $(MIA_TYPES_TEMPLATE_DIR) \
  --template $(MIA_TYPES_TYPE_TEMPLATE) \
  --namespace types \
  $2/$(name).json | $(TSFMT) --stdin > \
  $(MIA_TYPES_LIB_DIR)/$(shell $(TRANSFORM) -t modulecase $(name)).ts && ) true
endef

$(MIA_TYPES_DIR): $(MIA_TYPES_LIB_DIR)
	touch $@

$(MIA_TYPES_LIB_DIR): $(MIA_SCHEMA_DIR)\
                      $(MIA_TYPES_SRC_DIR)\
                      $(MIA_TYPES_TEMPLATE_DIR)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(MIA_TYPES_SRC_DIR)/* $@

	$(call mia_mktypes,\
	$(MIA_TYPES_MODEL_NAMES),$(MIA_SCHEMA_MODELS_DIR))

	$(call mia_mktypes,\
	$(MIA_TYPES_TYPE_NAMES),$(MIA_SCHEMA_TYPES_DIR))

	$(TSC) --project $@
	touch $@

$(MIA_TYPES_SRC_DIR): $(MIA_TYPES_SRC_DIR_FILES)
	touch $@

$(MIA_TYPES_TEMPLATE_DIR): $(MIA_TYPES_TEMPLATE_DIR_FILES)
	touch $@
