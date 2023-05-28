include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(CONVERSE_TYPES_DIR): $(CONVERSE_TYPES_DIR)/lib
	touch $@
	
$(CONVERSE_TYPES_DIR)/lib: $(CONVERSE_SCHEMA_DIR)
	rm -R $@ || true
	mkdir -p $@
	$(call qtl_data_types,$@,$(CONVERSE_SCHEMA_FILES))
