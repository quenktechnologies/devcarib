### Build the board-widgets package. ###
# Requires:
# 1. BOARD_WIDGETS_DIR

# Executables
WMLC?=./node_modules/.bin/wmlc

# Paths
BOARD_WIDGETS_SRC_DIR:=$(BOARD_WIDGETS_DIR)/src

BOARD_WIDGETS_SRC_FILES:=$(shell $(FIND) $(BOARD_WIDGETS_SRC_DIR)\
                         -name \*.ts -o -name \*.json -o -name \*.wml)

BOARD_WIDGETS_LIB_DIR:=$(BOARD_WIDGETS_DIR)/lib

BOARD_WIDGETS_LESS_FILES:=$(shell $(FIND) $(BOARD_WIDGETS_SRC_DIR) -name \*.less)
BOARD_WIDGETS_LESS_IMPORTS_FILE:=$(BOARD_WIDGETS_DIR)/imports.less

BOARD_CLEAN_TARGETS:=$(BOARD_CLEAN_TARGETS) $(BOARD_WIDGETS_LIB_DIR)

$(BOARD_WIDGETS_DIR): $(BOARD_WIDGETS_LIB_DIR) \
	              $(BOARD_WIDGETS_LESS_IMPORTS_FILE)
	touch $@

$(BOARD_WIDGETS_LIB_DIR): $(BOARD_WIDGETS_SRC_FILES)
	rm -R $@ 2> /dev/null || true 
	mkdir $@
	cp -R -u $(BOARD_WIDGETS_SRC_DIR)/* $@
	$(WMLC) $@
	$(TSC) --project $@
	touch $@

$(BOARD_WIDGETS_LESS_IMPORTS_FILE): $(BOARD_WIDGETS_LESS_FILES)
	echo "" > $@
	$(foreach f,$(subst $(BOARD_WIDGETS_DIR),,$^),\
	echo '@import "./$(f)";' >> $@ && ) true
