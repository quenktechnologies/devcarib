include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(BOARD_CHECKS_DIR): $(BOARD_SCHEMA_DIR) \
	             $(BOARD_TYPES_DIR) \
	             $(BOARD_VALIDATORS_DIR)
	$(call qtl_data_checks,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
	$(call qtl_data_checks_index,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
