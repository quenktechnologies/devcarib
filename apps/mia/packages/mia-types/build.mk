include ./node_modules/@quenk/dagen-templates-quenk/macros.mk

$(MIA_TYPES_DIR): $(MIA_TYPES_DIR)/lib
	touch $@
	
$(MIA_TYPES_DIR)/lib: $(MIA_SCHEMA_DIR)
	rm -R $@ || true
	mkdir -p $@
	$(call qtl_data_types,$@,$(MIA_SCHEMA_FILES))
