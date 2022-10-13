
$(MIA_REMOTE_MODELS_DIR): $(MIA_SCHEMA_DIR)\
                          $(MIA_REMOTE_MODELS_DIR)/templates

	$(foreach d,$(MIA_REMOTE_MODELS_MODEL_NAMES), \
	$(eval name=$(notdir $(basename $(d)))) \
	$(DAGEN) --templates $@/templates \
	--plugin $(DAGEN_PLUGIN_IMPORTS)\
	--template $@/templates/model.nunjucks\
	--check $@/checks.json \
	--namespace rmodel \
	$(MIA_SCHEMA_MODELS_DIR)/$(name).json | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true \

	$(DAGEN) --templates $@/templates \
	--template $@/templates/index.nunjucks \
	--set models="$(MIA_REMOTE_MODELS_MODEL_NAMES)" \
	--namespace rmodel | \
	$(TSFMT) --stdin > \
	$@/index.ts

	touch $@

$(MIA_REMOTE_MODELS_DIR)/templates: $(MIA_REMOTE_MODELS_TEMPLATE_DIR_FILES)
	touch $@
