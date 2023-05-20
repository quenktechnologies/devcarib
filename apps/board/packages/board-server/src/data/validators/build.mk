include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(BOARD_VALIDATORS_DIR): $(BOARD_SCHEMA_DIR) $(BOARD_TYPES_DIR)
	$(call qtl_data_validators,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
