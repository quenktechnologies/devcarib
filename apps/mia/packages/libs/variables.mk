MIA_LIBS_DIR:=$(MIA_PACKAGES_DIR)/libs
MIA_TYPES_DIR:=$(MIA_LIBS_DIR)/mia-types
MIA_VALIDATORS_DIR:=$(MIA_LIBS_DIR)/mia-validators
MIA_CHECKS_DIR:=$(MIA_LIBS_DIR)/mia-checks
MIA_MODELS_DIR:=$(MIA_LIBS_DIR)/mia-models
MIA_VIEWS_DIR:=$(MIA_LIBS_DIR)/mia-views

include $(MIA_LIBS_DIR)/mia-types/variables.mk
include $(MIA_LIBS_DIR)/mia-validators/variables.mk
include $(MIA_LIBS_DIR)/mia-checks/variables.mk
include $(MIA_LIBS_DIR)/mia-models/variables.mk
include $(MIA_LIBS_DIR)/mia-views/variables.mk
