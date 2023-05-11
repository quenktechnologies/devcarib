$(BOARD_MODELS_DIR): $(BOARD_SCHEMA_DIR) \
	             $(BOARD_TYPES_DIR)
	mkdir -p $@
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/mongodb-models \
	--template model.nunjucks \
	--plugin ./node_modules/@quenk/dagen-commons/lib/plugins/imports \
	--namespace models \
	--ext ts \
	--exclude isType \
	--out $@ \
	$(BOARD_SCHEMA_TARGETS)
	$(DAGEN) --templates node_modules/@quenk/dagen-templates-quenk/templates/mongodb-models \
	--template index.nunjucks \
	--namespace models \
	--set schemaNames="$(subst $(SPACE),$(,),$(BOARD_SCHEMA_NAMES))" \
	--exclude isType > $(BOARD_MODELS_DIR)/index.ts
	touch $@
