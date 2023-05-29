include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(MIA_CHECKS_DIR): $(MIA_SCHEMA_DIR) \
	           $(MIA_TYPES_DIR) \
	           $(MIA_VALIDATORS_DIR)
	$(call qtl_data_checks,$@,$(MIA_SCHEMA_MODEL_TARGETS))
	$(call qtl_data_checks_index,$@,$(MIA_SCHEMA_MODEL_TARGETS))
	touch $@
