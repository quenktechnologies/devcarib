$(CONVERSE_PACKAGES_DIR): $(CONVERSE_TYPES_DIR)\
	                  $(CONVERSE_VALIDATORS_DIR)\
	                  $(CONVERSE_CHECKS_DIR)\
	                  $(CONVERSE_VIEWS_DIR)\
	                  $(CONVERSE_MODELS_DIR)
	touch $@

include $(CONVERSE_TYPES_DIR)/build.mk
include $(CONVERSE_VALIDATORS_DIR)/build.mk
include $(CONVERSE_CHECKS_DIR)/build.mk
include $(CONVERSE_MODELS_DIR)/build.mk
include $(CONVERSE_VIEWS_DIR)/build.mk
