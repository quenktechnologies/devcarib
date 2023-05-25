include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(BOARD_TYPES_DIR): $(BOARD_TYPES_DIR)/lib
	touch $@
	
$(BOARD_TYPES_DIR)/lib: $(BOARD_SCHEMA_DIR)
	rm -R $@ || true
	mkdir -p $@
	$(call qtl_data_types,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
