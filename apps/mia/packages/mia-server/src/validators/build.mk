include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(MIA_VALIDATORS_DIR): $(MIA_SCHEMA_DIR) $(MIA_TYPES_DIR)
	$(call qtl_data_validators,$@,$(MIA_SCHEMA_FILES))
