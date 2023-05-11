$(BOARD_CHECKS_DIR): $(BOARD_SCHEMA_DIR) \
	             $(BOARD_TYPES_DIR) \
	             $(BOARD_VALIDATORS_DIR)
	mkdir -p $@
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/data-checks \
	--template type.nunjucks \
	--plugin ./node_modules/@quenk/dagen-commons/lib/plugins/imports \
	--plugin ./node_modules/@quenk/dagen-commons/lib/plugins/checks \
	--namespace validators \
	--namespace checks \
	--ext ts \
	--exclude isType \
	--out $@ \
	$(BOARD_SCHEMA_TARGETS)
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/data-checks \
	--template index.nunjucks \
	--plugin ./node_modules/@quenk/dagen-commons/lib/plugins/imports \
	--namespace validators \
	--namespace checks \
	--set schemaNames="$(subst $(SPACE),$(,),$(BOARD_SCHEMA_NAMES))" \
	--exclude isType > $(BOARD_CHECKS_DIR)/index.ts
	touch $@
