### Build the board-views package. ###
# Requires:
# 1. BOARD_VIEWS_DIR

### Settings ###
BOARD_VIEWS_JS_VARS:=$(HERE)/node_modules/@quenk/wml-widgets/lib/classNames.js
BOARD_VIEWS_SRC_DIR:=$(BOARD_VIEWS_DIR)/views
BOARD_VIEWS_LESS_DIR:=$(BOARD_VIEWS_DIR)/less
BOARD_VIEWS_LESS_FILES:=$(shell $(FIND) $(BOARD_VIEWS_SRC_DIR) -name \*.less)
BOARD_VIEWS_LESS_MAIN:=$(BOARD_VIEWS_DIR)/main.less
BOARD_VIEWS_LESS_INDEX:=$(BOARD_VIEWS_DIR)/auto.less
BOARD_VIEWS_PUBLIC_DIR:=$(BOARD_VIEWS_DIR)/public

### Graph ###
$(BOARD_VIEWS_DIR): $(BOARD_VIEWS_PUBLIC_DIR)
	touch $@

$(BOARD_VIEWS_PUBLIC_DIR): $(BOARD_VIEWS_LESS_DIR) $(BOARD_VIEWS_LESS_MAIN)
	rm -R $@ || true
	mkdir -p $@/assets/css
	$(LESSC) --source-map-less-inline \
	--js-vars=$(BOARD_VIEWS_JS_VARS) $(BOARD_VIEWS_LESS_MAIN) \
	| ./node_modules/.bin/cleancss > $@/assets/css/site.css
	touch $@

$(BOARD_VIEWS_LESS_DIR): $(BOARD_VIEWS_LESS_FILES)
	echo "" > $(BOARD_VIEWS_LESS_INDEX)
	$(foreach f,$(subst $(BOARD_VIEWS_LESS_DIR),,$^),\
	echo '@import "./less$(f)";' >> $(BOARD_VIEWS_LESS_INDEX) && ) true
	touch $@
