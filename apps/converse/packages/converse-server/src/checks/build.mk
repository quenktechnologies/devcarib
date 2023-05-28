include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(CONVERSE_CHECKS_DIR): $(CONVERSE_SCHEMA_DIR) \
	           $(CONVERSE_TYPES_DIR) \
	           $(CONVERSE_VALIDATORS_DIR)
	$(call qtl_data_checks,$@,$(CONVERSE_SCHEMA_MODEL_TARGETS))
	$(call qtl_data_checks_index,$@,$(CONVERSE_SCHEMA_MODEL_TARGETS))
