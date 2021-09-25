### 
# Builds the board-common package. ###
#
# Requires:
# 1. BOARD_SERVER_DIR
###

# Paths
BOARD_SERVER_SRC_DIR:=$(BOARD_SERVER_DIR)/src

BOARD_SERVER_SRC_FILES:=$(shell $(FIND) $(BOARD_SERVER_SRC_DIR)\
                         -name \*.ts -o -name \*.json)

BOARD_SERVER_LIB_DIR:=$(BOARD_SERVER_DIR)/lib

BOARD_CLEAN_TARGETS:=$(BOARD_CLEAN_TARGETS) $(BOARD_SERVER_LIB_DIR)

$(BOARD_SERVER_DIR): $(BOARD_SERVER_LIB_DIR)
	touch $@

$(BOARD_SERVER_LIB_DIR): $(BOARD_SERVER_SRC_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_SERVER_SRC_DIR)/* $@
	$(TSC) --project $@
	touch $@
