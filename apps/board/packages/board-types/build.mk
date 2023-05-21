$(BOARD_TYPES_DIR): $(BOARD_TYPES_DIR)/lib
	touch $@
	
$(BOARD_TYPES_DIR)/lib: $(BOARD_SCHEMA_DIR)
	$(call qtl_data_types,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
