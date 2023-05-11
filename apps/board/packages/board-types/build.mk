$(BOARD_TYPES_DIR): $(BOARD_TYPES_DIR)/lib
	touch $@
	
$(BOARD_TYPES_DIR)/lib: $(BOARD_SCHEMA_DIR) \
	                $(shell find $(BOARD_TYPES_DIR)/src -type f)
	rm -R $@ || true
	cp -R -u $(BOARD_TYPES_DIR)/src $@
	mkdir -p $@
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/data-types \
	--template type.nunjucks \
        --plugin ./node_modules/@quenk/dagen-commons/lib/plugins/imports \
	--namespace types \
	--ext ts \
	--out $@ \
	$(BOARD_SCHEMA_TARGETS)
	$(TSC) --project $@
	touch $@
