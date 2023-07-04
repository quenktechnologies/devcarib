include $(QTL_DAGEN_TEMPLATES_DIR)/macros.mk

$(BOARD_TYPES_DIR): $(BOARD_TYPES_DIR)/lib
	touch $@
	
$(BOARD_TYPES_DIR)/lib: $(BOARD_SCHEMA_DIR)
	rm -R $@ || true
	mkdir -p $@
	$(call qtl_data_types,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
