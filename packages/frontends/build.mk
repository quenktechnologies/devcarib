$(BOARD_FRONTENDS_DIR): $(BOARD_FORM_POST_DIR)
	touch $@

include $(BOARD_FORM_POST_DIR)/build.mk
