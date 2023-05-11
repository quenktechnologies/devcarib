$(BOARD_SEARCH_FIELDS_DIR): $(BOARD_SCHEMA_DIR) \
	                    $(BOARD_TYPES_DIR)
	mkdir -p $@
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/mongodb-fields \
	--template model.nunjucks \
	--plugin ./node_modules/@quenk/dagen-commons/lib/plugins/imports \
	--namespace fields \
	--ext ts \
	--exclude isType \
	--out $@ \
	$(BOARD_SCHEMA_TARGETS)
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/mongodb-fields \
	--template index.nunjucks \
	--namespace fields \
	--set schemaNames="$(subst $(SPACE),$(,),$(BOARD_SCHEMA_NAMES))" \
	--exclude isType > $(BOARD_SEARCH_FIELDS_DIR)/index.ts
	touch $@
