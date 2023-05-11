$(BOARD_VALIDATORS_DIR): $(BOARD_SCHEMA_DIR) $(BOARD_TYPES_DIR)
	mkdir -p $@
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/data-validators \
	--template type.nunjucks \
        --plugin ./node_modules/@quenk/dagen-commons/lib/plugins/imports \
        --plugin ./node_modules/@quenk/dagen-commons/lib/plugins/validators \
	--namespace validators \
	--ext ts \
	--exclude isType \
	--out $@ \
	$(BOARD_SCHEMA_TARGETS)
	touch $@
