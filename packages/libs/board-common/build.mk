### 
# Builds the board-common package. ###
#
# Requires:
# 1. BOARD_COMMON_DIR
###

# Paths
BOARD_COMMON_SRC_DIR:=$(BOARD_COMMON_DIR)/src

BOARD_COMMON_SRC_FILES:=$(shell $(FIND) $(BOARD_COMMON_SRC_DIR)\
                         -name \*.ts -o -name \*.json)

BOARD_COMMON_LIB_DIR:=$(BOARD_COMMON_DIR)/lib

BOARD_CLEAN_TARGETS:=$(BOARD_CLEAN_TARGETS) $(BOARD_COMMON_LIB_DIR)

$(BOARD_COMMON_DIR): $(BOARD_COMMON_LIB_DIR)
	touch $@

$(BOARD_COMMON_LIB_DIR): $(BOARD_COMMON_SRC_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_COMMON_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@
