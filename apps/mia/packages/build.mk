$(MIA_PACKAGES_DIR): $(MIA_TYPES_DIR)\
	             $(MIA_VALIDATORS_DIR)\
	             $(MIA_CHECKS_DIR)\
	             $(MIA_VIEWS_DIR)\
	             $(MIA_MODELS_DIR)
	touch $@

include $(MIA_TYPES_DIR)/build.mk
include $(MIA_VALIDATORS_DIR)/build.mk
include $(MIA_CHECKS_DIR)/build.mk
include $(MIA_MODELS_DIR)/build.mk
include $(MIA_VIEWS_DIR)/build.mk
