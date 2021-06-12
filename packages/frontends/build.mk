$(BOARD_FRONTENDS_DIR): $(BOARD_ADMIN_DIR) $(BOARD_FORM_POST_DIR)
	touch $@

include $(BOARD_ADMIN_DIR)/build.mk
include $(BOARD_FORM_POST_DIR)/build.mk
