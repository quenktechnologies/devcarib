
$(CONVERSE_REMOTE_MODELS_DIR): $(CONVERSE_SCHEMA_DIR)\
                               $(CONVERSE_REMOTE_MODELS_DIR)/templates

	$(foreach d,$(CONVERSE_REMOTE_MODELS_MODEL_NAMES), \
	$(eval name=$(notdir $(basename $(d)))) \
	$(DAGEN) --templates $@/templates \
	--plugin $(DAGEN_PLUGIN_IMPORTS)\
	--template $@/templates/model.nunjucks\
	--check $@/checks.json \
	--namespace rmodel \
	$(CONVERSE_SCHEMA_MODELS_DIR)/$(name).json | $(TSFMT) --stdin > \
	$@/$(shell $(TRANSFORM) -t modulecase $(name)).ts &&) true \

	$(DAGEN) --templates $@/templates \
	--template $@/templates/index.nunjucks \
	--set models="$(CONVERSE_REMOTE_MODELS_MODEL_NAMES)" \
	--namespace rmodel | \
	$(TSFMT) --stdin > \
	$@/index.ts

$(CONVERSE_REMOTE_MODELS_DIR)/templates: $(CONVERSE_REMOTE_MODELS_TEMPLATE_DIR_FILES)
	touch $@