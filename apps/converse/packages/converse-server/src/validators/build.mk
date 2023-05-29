include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(CONVERSE_VALIDATORS_DIR): $(CONVERSE_SCHEMA_DIR) $(CONVERSE_TYPES_DIR)
	$(call qtl_data_validators,$@,$(CONVERSE_SCHEMA_FILES))
	touch $@
