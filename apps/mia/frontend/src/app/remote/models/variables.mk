MIA_REMOTE_MODELS_DIR:=$(MIA_FRONTEND_SRC_DIR)/app/remote/models

MIA_REMOTE_MODELS_TEMPLATE_DIR_FILES:=\
		   $(shell find $(MIA_REMOTE_MODELS_DIR)/templates -type f)

MIA_REMOTE_MODELS_MODEL_NAMES=$(notdir $(basename $(wildcard \
			 $(MIA_SCHEMA_MODELS_DIR)/*.json)))
