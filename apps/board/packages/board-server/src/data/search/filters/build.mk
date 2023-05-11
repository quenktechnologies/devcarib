$(BOARD_SEARCH_FILTERS_DIR): $(BOARD_SCHEMA_DIR) \
	                     $(BOARD_TYPES_DIR)
	mkdir -p $@
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/mongodb-search-filters \
	--template model.nunjucks \
	--plugin ./node_modules/@quenk/dagen-commons/lib/plugins/imports \
	--namespace filters \
	--ext ts \
	--exclude isType \
	--out $@ \
	$(BOARD_SCHEMA_TARGETS)
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/mongodb-search-filters \
	--template index.nunjucks \
	--namespace filters \
	--set schemaNames="$(subst $(SPACE),$(,),$(BOARD_SCHEMA_NAMES))" \
	--exclude isType > $(BOARD_SEARCH_FILTERS_DIR)/index.ts
	touch $@
