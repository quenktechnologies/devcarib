$(BOARD_LIBS_DIR): $(BOARD_TYPES_DIR)\
                   $(BOARD_COMMON_DIR)\
		   $(BOARD_VALIDATORS_DIR)\
		   $(BOARD_CHECKS_DIR)\
		   $(BOARD_SERVER_DIR)\
		   $(BOARD_WIDGETS_DIR)\
                   $(BOARD_VIEWS_DIR)
	touch $@

include $(BOARD_TYPES_DIR)/build.mk
include $(BOARD_COMMON_DIR)/build.mk
include $(BOARD_VALIDATORS_DIR)/build.mk
include $(BOARD_CHECKS_DIR)/build.mk
include $(BOARD_SERVER_DIR)/build.mk
include $(BOARD_WIDGETS_DIR)/build.mk
include $(BOARD_VIEWS_DIR)/build.mk
