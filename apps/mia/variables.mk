MIA_DIR:=$(DC_APPS_DIR)/mia
MIA_SCHEMA_DIR:=$(MIA_DIR)/schema
MIA_PACKAGES_DIR:=$(MIA_DIR)/packages
MIA_BUILD_DIR:=$(MIA_DIR)/build
MIA_FRONTEND_DIR:=$(MIA_DIR)/frontend
MIA_PUBLIC_DIR:=$(MIA_DIR)/public

CLEAN_TARGETS:=$(CLEAN_TARGETS) \
	        $(MIA_BUILD_DIR) \
	        $(MIA_PUBLIC_DIR)/assets/css/mia.css

include $(MIA_SCHEMA_DIR)/variables.mk
include $(MIA_PACKAGES_DIR)/*/variables.mk
include $(MIA_FRONTEND_DIR)/variables.mk
