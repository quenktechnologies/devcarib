include $(QTL_DAGEN_TEMPLATES_DIR)/macros.mk

$(BOARD_REMOTE_MODELS_DIR): $(BOARD_SCHEMA_DIR) \
	            	    $(BOARD_TYPES_DIR)
	$(call qtl_http_models,$@,$(BOARD_SCHEMA_MODEL_TARGETS))
	touch $@
