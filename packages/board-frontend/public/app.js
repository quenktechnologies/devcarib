(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Nothing represents the absence of a usable value.
 */
var Nothing = /** @class */ (function () {
    function Nothing() {
    }
    /**
     * map simply returns a Nothing<A>
     */
    Nothing.prototype.map = function (_) {
        return new Nothing();
    };
    /**
     * ap allows for a function wrapped in a Just to apply
     * to value present in this Just.
     */
    Nothing.prototype.ap = function (_) {
        return new Nothing();
    };
    /**
     * of wraps a value in a Just.
     */
    Nothing.prototype.of = function (a) {
        return new Just(a);
    };
    /**
     * chain simply returns a Nothing<A>.
     */
    Nothing.prototype.chain = function (_) {
        return new Nothing();
    };
    /**
     * alt will prefer whatever Maybe instance provided.
     */
    Nothing.prototype.alt = function (a) {
        return a;
    };
    /**
     * empty provides a default Maybe.
     * Maybe.empty() = new Nothing()
     */
    Nothing.prototype.empty = function () {
        return new Nothing();
    };
    /**
     * extend returns a Nothing<A>.
     */
    Nothing.prototype.extend = function (_) {
        return new Nothing();
    };
    /**
     * eq returns true if compared to another Nothing instance.
     */
    Nothing.prototype.eq = function (m) {
        return m instanceof Nothing;
    };
    /**
     * orJust converts a Nothing<A> to a Just
     * using the value from the provided function.
     */
    Nothing.prototype.orJust = function (f) {
        return new Just(f());
    };
    /**
     * orElse allows an alternative Maybe value
     * to be provided since this one is Nothing<A>.
     */
    Nothing.prototype.orElse = function (f) {
        return f();
    };
    Nothing.prototype.isNothing = function () {
        return true;
    };
    Nothing.prototype.isJust = function () {
        return false;
    };
    /**
     * get throws an error because there
     * is nothing here to get.
     */
    Nothing.prototype.get = function () {
        throw new TypeError('Cannot get a value from Nothing!');
    };
    return Nothing;
}());
exports.Nothing = Nothing;
/**
 * Just represents the presence of a usable value.
 */
var Just = /** @class */ (function () {
    function Just(value) {
        this.value = value;
    }
    /**
     * map over the value present in the Just.
     */
    Just.prototype.map = function (f) {
        return new Just(f(this.value));
    };
    /**
     * ap allows for a function wrapped in a Just to apply
     * to value present in this Just.
     */
    Just.prototype.ap = function (mb) {
        var _this = this;
        return mb.map(function (f) { return f(_this.value); });
    };
    /**
     * of wraps a value in a Just.
     */
    Just.prototype.of = function (a) {
        return new Just(a);
    };
    /**
     * chain allows the sequencing of functions that return a Maybe.
     */
    Just.prototype.chain = function (f) {
        return f(this.value);
    };
    /**
     * alt will prefer the first Just encountered (this).
     */
    Just.prototype.alt = function (_) {
        return this;
    };
    /**
     * empty provides a default Maybe.
     * Maybe.empty() = new Nothing()
     */
    Just.prototype.empty = function () {
        return new Nothing();
    };
    /**
     * extend allows sequencing of Maybes with
     * functions that unwrap into non Maybe types.
     */
    Just.prototype.extend = function (f) {
        return new Just(f(this));
    };
    /**
     * eq tests the value of two Justs.
     */
    Just.prototype.eq = function (m) {
        return ((m instanceof Just) && (m.value === this.value));
    };
    /**
     * orJust returns this Just.
     */
    Just.prototype.orJust = function (_) {
        return this;
    };
    /**
     * orElse returns this Just
     */
    Just.prototype.orElse = function (_) {
        return this;
    };
    Just.prototype.isNothing = function () {
        return false;
    };
    Just.prototype.isJust = function () {
        return true;
    };
    /**
     * get the value of this Just.
     */
    Just.prototype.get = function () {
        return this.value;
    };
    return Just;
}());
exports.Just = Just;
/**
 * of
 */
exports.of = function (a) { return new Just(a); };
/**
 * nothing convenience constructor
 */
exports.nothing = function () { return new Nothing(); };
/**
 * just convenience constructor
 */
exports.just = function (a) { return new Just(a); };
/**
 * fromNullable constructs a Maybe from a value that may be null.
 */
exports.fromNullable = function (a) { return a == null ?
    new Nothing() : new Just(a); };
/**
 * fromArray checks an array to see if it's empty
 *
 * Returns [[Nothing]] if it is, [[Just]] otherwise.
 */
exports.fromArray = function (a) {
    return (a.length === 0) ? new Nothing() : new Just(a);
};
/**
 * fromObject uses Object.keys to turn see if an object
 * has any own properties.
 */
exports.fromObject = function (o) {
    return Object.keys(o).length === 0 ? new Nothing() : new Just(o);
};
/**
 * fromString constructs Nothing<A> if the string is empty or Just<A> otherwise.
 */
exports.fromString = function (s) {
    return (s === '') ? new Nothing() : new Just(s);
};
/**
 * fromBoolean constructs Nothing if b is false, Just<A> otherwise
 */
exports.fromBoolean = function (b) {
    return (b === false) ? new Nothing() : new Just(b);
};
/**
 * fromNumber constructs Nothing if n is 0 Just<A> otherwise.
 */
exports.fromNumber = function (n) {
    return (n === 0) ? new Nothing() : new Just(n);
};
/**
 * fromNaN constructs Nothing if a value is not a number or
 * Just<A> otherwise.
 */
exports.fromNaN = function (n) {
    return isNaN(n) ? new Nothing() : new Just(n);
};

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///classNames:begin
/**
 * VERTICAL indicates an element is vertical rendererd.
 */
exports.VERTICAL = '-vertical';
/**
 * PUSHABLE indicates an element supports being pushed
 * and can have styles added to it around the concept.
 */
exports.PUSHABLE = '-pushable';
/**
 * POSITIONED indicates an element is positioned and responds
 * to the left,right etc. properties.
 */
exports.POSITIONED = '-positioned';
/**
 * BLOCK indicates an element should be block displayed.
 */
exports.BLOCK = '-block';
/**
 * CLEARFIX hack.
 */
exports.CLEARFIX = '-clearfix';
/**
 * JUSTIFIED content.
 */
exports.JUSTIFIED = '-justified';
/**
 * LEFT indicates content floated or positioned to the left.
 */
exports.LEFT = '-left';
/**
 * RIGHT indicates content floated or positioned to the right.
 */
exports.RIGHT = '-right';
/**
 * HORIZONTAL indicates a horizontal alignment.
 */
exports.HORIZONTAL = '-horizontal';
exports.MIDDLE = '-middle';
exports.BOTTOM = '-bottom';
///classNames:end
/**
 * getBlockClassName provides the __BLOCK__ class name if the attribute
 * value is set to true.
 */
exports.getBlockClassName = function (attrs) {
    return (attrs.ww && (attrs.ww.block === true)) ? exports.BLOCK : '';
};

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///classNames:begin
exports.EXTRA_SMALL = '-extra-small';
exports.SMALL = '-small';
exports.MEDIUM = '-medium';
exports.LARGE = '-large';
exports.EXTRA_LARGE = '-extra-large';
///classNames:end
/**
 * Size
 */
var Size;
(function (Size) {
    Size["ExtraSmall"] = "extra-small";
    Size["Small"] = "small";
    Size["Medium"] = "medium";
    Size["Large"] = "large";
    Size["ExtraLarge"] = "extra-large";
})(Size = exports.Size || (exports.Size = {}));
/**
 * getSizeClassName
 */
exports.getSizeClassName = function (s) {
    if (s === Size.ExtraSmall)
        return exports.EXTRA_SMALL;
    else if (s === Size.Small)
        return exports.SMALL;
    else if (s === Size.Medium)
        return exports.MEDIUM;
    else if (s === Size.Large)
        return exports.LARGE;
    else if (s === Size.ExtraLarge)
        return exports.EXTRA_LARGE;
    return '';
};

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
///classNames:begin
/**
 * ACTIVE
 */
exports.ACTIVE = '-active';
/**
 * activate helper.
 *
 * Adds the ACTIVE class.
 */
exports.activate = function (view, id) {
    return util_1.getById(view, id)
        .map(function (e) {
        e.classList.remove(exports.ACTIVE);
        e.classList.add(exports.ACTIVE);
    });
};
/**
 * deactivate helper.
 *
 * Removes the ACTIVE class.
 */
exports.deactivate = function (view, id) {
    return util_1.getById(view, id)
        .map(function (e) { return e.classList.remove(exports.ACTIVE); });
};
/**
 * isActive helpder
 *
 * Queries whether the ACTIVE class is present.
 */
exports.isActive = function (view, id) {
    return util_1.getById(view, id)
        .map(function (e) { return e.classList.contains(exports.ACTIVE); })
        .orJust(function () { return false; })
        .get();
};

},{"../../util":32}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///classNames:begin
/**
 * DEFAULT style.
 */
exports.DEFAULT = '-default';
/**
 * PRIMARY style.
 */
exports.PRIMARY = '-primary';
/**
 * SUCCESS style.
 */
exports.SUCCESS = '-success';
/**
 * INFO style.
 */
exports.INFO = '-info';
/**
 * WARNING style.
 */
exports.WARNING = '-warning';
/**
 * ERROR style.
 */
exports.ERROR = '-error';
/**
 * OUTLINE style.
 */
exports.OUTLINE = '-outline';
///classNames:end
/**
 * Style enum.
 */
var Style;
(function (Style) {
    Style["Default"] = "default";
    Style["Primary"] = "primary";
    Style["Success"] = "success";
    Style["Info"] = "info";
    Style["Warning"] = "warning";
    Style["Error"] = "error";
})(Style = exports.Style || (exports.Style = {}));
exports.styles = [
    Style.Default,
    Style.Success,
    Style.Info,
    Style.Warning,
    Style.Error
];
/**
 * getStyleClassName
 */
exports.getStyleClassName = function (s) {
    switch (s) {
        case Style.Default:
            return exports.DEFAULT;
        case Style.Primary:
            return exports.PRIMARY;
        case Style.Success:
            return exports.SUCCESS;
        case Style.Info:
            return exports.INFO;
        case Style.Warning:
            return exports.WARNING;
        case Style.Error:
            return exports.ERROR;
    }
    return exports.DEFAULT;
};

},{}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/button");
var toolbar_1 = require("../toolbar");
var active_1 = require("../../content/state/active");
var orientation_1 = require("../../content/orientation");
var style_1 = require("../../content/style");
exports.Style = style_1.Style;
var size_1 = require("../../content/size");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
exports.BUTTON = 'ww-button';
;
/**
 * ButtonClickedEvent
 */
var ButtonClickedEvent = /** @class */ (function (_super) {
    __extends(ButtonClickedEvent, _super);
    function ButtonClickedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ButtonClickedEvent;
}(__2.Event));
exports.ButtonClickedEvent = ButtonClickedEvent;
/**
 * Button is an improvement over HTMLButtionElement
 */
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = (_this.attrs.ww && _this.attrs.ww.anchor) ?
            new views.AnchorView(_this) : new views.ButtonView(_this);
        _this.values = {
            button: {
                wml: {
                    id: 'button'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.BUTTON, __1.getClassName(_this.attrs), toolbar_1.TOOLBAR_COMPAT, (_this.attrs.ww && _this.attrs.ww.style) ?
                    style_1.getStyleClassName(_this.attrs.ww.style) :
                    style_1.DEFAULT, (_this.attrs.ww && _this.attrs.ww.size) ?
                    size_1.getSizeClassName(_this.attrs.ww.size) : '', (_this.attrs.ww && _this.attrs.ww.outline) ?
                    style_1.OUTLINE : '', (_this.attrs.ww && _this.attrs.ww.block) ?
                    orientation_1.BLOCK : '', (_this.attrs.ww && _this.attrs.ww.active) ?
                    active_1.ACTIVE : ''),
                type: (_this.attrs.ww && _this.attrs.ww.type) ?
                    _this.attrs.ww.type : 'button',
                name: (_this.attrs.ww && _this.attrs.ww.name) ? _this.attrs.ww.name : '',
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ? true : null,
                anchor: (_this.attrs.ww && _this.attrs.ww.anchor) ?
                    _this.attrs.ww.anchor : false,
                onclick: function (e) {
                    e.preventDefault();
                    _this.attrs.ww &&
                        _this.attrs.ww.onClick &&
                        _this.attrs.ww.onClick(new ButtonClickedEvent((_this.attrs.ww && _this.attrs.ww.name) ?
                            _this.attrs.ww.name : '', _this.attrs.ww.value));
                },
                content: function () { return (_this.attrs.ww && _this.attrs.ww.text) ?
                    [__1.text(_this.attrs.ww.text)] : _this.children; }
            }
        };
        return _this;
    }
    /**
     * disable this button.
     */
    Button.prototype.disable = function () {
        util_1.getById(this.view, this.values.button.wml.id)
            .map(function (b) { return b.setAttribute('disabled', 'disabled'); });
    };
    /**
     * enable this button.
     */
    Button.prototype.enable = function () {
        util_1.getById(this.view, this.values.button.wml.id)
            .map(function (b) { return b.removeAttribute('disabled'); });
    };
    /**
     * toggle the disabled state of this button.
     */
    Button.prototype.toggle = function () {
        var _this = this;
        util_1.getById(this.view, this.values.button.wml.id)
            .map(function (b) { return b.hasAttribute('disabled') ?
            _this.enable() : _this.disable(); });
    };
    return Button;
}(__2.AbstractControl));
exports.Button = Button;

},{"../":13,"../../":22,"../../content/orientation":2,"../../content/size":3,"../../content/state/active":4,"../../content/style":5,"../../util":32,"../toolbar":20,"./wml/button":7}],7:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var ButtonView = /** @class */ (function () {
    function ButtonView(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('button', { wml: { 'id': __context.values.button.wml.id }, 'id': __context.values.button.id, 'type': __context.values.button.type, 'name': __context.values.button.name, 'disabled': __context.values.button.disabled, 'class': __context.values.button.className, 'onclick': __context.values.button.onclick }, __spreadArrays((__context.values.button.content())));
        };
    }
    ButtonView.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    ButtonView.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    ButtonView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    ButtonView.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    ButtonView.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    ButtonView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    ButtonView.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return ButtonView;
}());
exports.ButtonView = ButtonView;
;
var AnchorView = /** @class */ (function () {
    function AnchorView(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('a', { wml: { 'id': __context.values.button.wml.id }, 'id': __context.values.button.id, 'type': __context.values.button.type, 'href': '#', 'name': __context.values.button.name, 'disabled': __context.values.button.disabled, 'class': __context.values.button.className, 'onclick': __context.values.button.onclick }, __spreadArrays((__context.values.button.content())));
        };
    }
    AnchorView.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    AnchorView.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    AnchorView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    AnchorView.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    AnchorView.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    AnchorView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    AnchorView.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return AnchorView;
}());
exports.AnchorView = AnchorView;

},{"@quenk/noni/lib/data/maybe":1}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var style = require("../content/style");
var util_1 = require("../util");
var control_1 = require("../control");
/**
 * ValidationState
 */
var ValidationState;
(function (ValidationState) {
    ValidationState["Neutral"] = "neutral";
    ValidationState["Error"] = "error";
    ValidationState["Success"] = "success";
    ValidationState["Warning"] = "warning";
})(ValidationState = exports.ValidationState || (exports.ValidationState = {}));
/**
 * AbstractFeedbackControl
 *
 * Provides a default implementaion of the interface methods.
 */
var AbstractFeedbackControl = /** @class */ (function (_super) {
    __extends(AbstractFeedbackControl, _super);
    function AbstractFeedbackControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractFeedbackControl.prototype.setMessage = function (msg) {
        exports.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    };
    AbstractFeedbackControl.prototype.removeMessage = function () {
        exports.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    };
    AbstractFeedbackControl.prototype.setValidationState = function (state) {
        exports.setValidationState(this.view, this.values.control.wml.id, state);
        return this;
    };
    AbstractFeedbackControl.prototype.removeValidationState = function () {
        exports.removeValidationState(this.view, this.values.control.wml.id);
        return this;
    };
    AbstractFeedbackControl.prototype.getValidationState = function () {
        return exports.getValidationState(this.view, this.values.control.wml.id);
    };
    return AbstractFeedbackControl;
}(control_1.AbstractControl));
exports.AbstractFeedbackControl = AbstractFeedbackControl;
/**
 * setMessage helper.
 */
exports.setMessage = function (view, id, msg) {
    return util_1.getById(view, id)
        .map(function (messages) {
        var node = document.createTextNode(msg);
        while (messages.lastChild)
            messages.removeChild(messages.lastChild);
        messages.appendChild(node);
    });
};
/**
 * removeMessage
 */
exports.removeMessage = function (view, id) {
    return util_1.getById(view, id)
        .map(function (messages) {
        while (messages.lastChild)
            messages.removeChild(messages.lastChild);
    });
};
/**
 * setValidationState helper.
 */
exports.setValidationState = function (view, id, state) {
    exports.removeValidationState(view, id);
    if (state !== ValidationState.Neutral)
        util_1.getById(view, id)
            .map(function (e) { return e.classList.add(exports.validationState2ClassName(state)); });
};
/**
 * removeValidationState helper.
 */
exports.removeValidationState = function (view, id) {
    util_1.getById(view, id)
        .map(function (h) {
        h.classList.remove(style.SUCCESS);
        h.classList.remove(style.ERROR);
        h.classList.remove(style.WARNING);
    });
};
/**
 * getValidationState calculates the ValidationState of an HTMLElement
 * (identified by id) by analysing its class list.
 */
exports.getValidationState = function (view, id) {
    return util_1.getById(view, id)
        .map(function (h) {
        if (h.classList.contains(style.SUCCESS))
            return ValidationState.Success;
        else if (h.classList.contains(style.WARNING))
            return ValidationState.Warning;
        else if (h.classList.contains(style.ERROR))
            return ValidationState.Error;
        else
            return ValidationState.Neutral;
    })
        .get();
};
/**
 * getValidityClassName provides the applicable style class by checking
 * the validity properties of FeedbackControAttrs.
 */
exports.getValidityClassName = function (attrs) {
    if (attrs.ww) {
        if (attrs.ww.error && (attrs.ww.error != ''))
            return style.ERROR;
        if (attrs.ww.warning && (attrs.ww.warning != ''))
            return style.WARNING;
        if (attrs.ww.success && (attrs.ww.success != ''))
            return style.SUCCESS;
    }
    return '';
};
/**
 * getMessage
 */
exports.getMessage = function (attrs) {
    if (attrs.ww) {
        if (attrs.ww.error && (attrs.ww.error != ''))
            return attrs.ww.error;
        if (attrs.ww.warning && (attrs.ww.warning != ''))
            return attrs.ww.warning;
        if (attrs.ww.success && (attrs.ww.success != ''))
            return attrs.ww.success;
        if (attrs.ww.message && (attrs.ww.message != ''))
            return attrs.ww.message;
    }
    return '';
};
/**
 * validationState2ClassName transforms a ValidationState into
 * the corresponding class name (if any).
 */
exports.validationState2ClassName = function (state) {
    if (state === ValidationState.Success)
        return style.SUCCESS;
    else if (state === ValidationState.Warning)
        return style.WARNING;
    else if (state === ValidationState.Error)
        return style.ERROR;
    else
        return '';
};

},{"../content/style":5,"../control":13,"../util":32}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
/**
 * FocusGainedEvent
 */
var FocusGainedEvent = /** @class */ (function () {
    function FocusGainedEvent(name) {
        this.name = name;
    }
    return FocusGainedEvent;
}());
exports.FocusGainedEvent = FocusGainedEvent;
/**
 * FocusLostEvent
 */
var FocusLostEvent = /** @class */ (function () {
    function FocusLostEvent(name) {
        this.name = name;
    }
    return FocusLostEvent;
}());
exports.FocusLostEvent = FocusLostEvent;
/**
 * focus DOM helper.
 */
exports.focus = function (view, id) {
    util_1.getById(view, id)
        .map(function (e) { return e.focus(); });
};

},{"../util":32}],10:[function(require,module,exports){
"use strict";
/**
 * The form module deals with controls specifically for accepting user input.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var feedback_1 = require("./feedback");
/**
 * AbstractFormControl provides a base implementation of a
 * FormControl.
 */
var AbstractFormControl = /** @class */ (function (_super) {
    __extends(AbstractFormControl, _super);
    function AbstractFormControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractFormControl;
}(feedback_1.AbstractFeedbackControl));
exports.AbstractFormControl = AbstractFormControl;
/**
 * getLabel extracts the label value from FromControlAttrs.
 */
exports.getLabel = function (attrs) { return (attrs.ww && attrs.ww.label) ? attrs.ww.label : ''; };
/**
 * setMessage helper.
 *
 * Sets the message on the Help widget.
 */
exports.setMessage = function (view, id, msg) {
    util_1.getById(view, id).map(function (h) { h.setMessage(msg); });
};
/**
 * removeMessage helper.
 *
 * Removes the message from the Help widget.
 */
exports.removeMessage = function (view, id) {
    util_1.getById(view, id).map(function (h) { h.removeMessage(); });
};

},{"../util":32,"./feedback":8}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var __1 = require("../../");
var help_1 = require("./wml/help");
///classNames:begin
exports.HELP = 'ww-help';
/**
 * Help
 */
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new help_1.Main(_this);
        _this.values = {
            help: {
                wml: {
                    id: 'help'
                },
                id: (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '',
                className: util_1.concat(exports.HELP, __1.getClassName(_this.attrs)),
                text: (_this.attrs.ww && _this.attrs.ww.text) ?
                    [document.createTextNode(_this.attrs.ww.text)] : _this.children
            }
        };
        return _this;
    }
    Help.prototype.setMessage = function (msg) {
        feedback_1.setMessage(this.view, this.values.help.wml.id, msg);
        return this;
    };
    Help.prototype.removeMessage = function () {
        feedback_1.removeMessage(this.view, this.values.help.wml.id);
        return this;
    };
    return Help;
}(wml_1.Component));
exports.Help = Help;

},{"../../":22,"../../util":32,"../feedback":8,"./wml/help":12,"@quenk/wml":33}],12:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('span', { wml: { 'id': __context.values.help.wml.id }, 'id': __context.values.help.id, 'class': __context.values.help.className }, __spreadArrays((__context.values.help.text)));
        };
    }
    Main.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":1}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This module provides the parent interfaces for most of the
 * widgets considered 'controls'.
 *
 * Controls allow users to manipulate the state of an application
 * by interacting with widgets on screen. In simpler terms,
 * they are the widgets that accept user input or trigger
 * reactions when the user manipulates them.
 *
 * Generally, we use a streaming based workflow, that is
 * as the user preforms a supported action and event is generated
 * each and every time and some handler is applied to the event.
 */
/** @imports */
var wml_1 = require("@quenk/wml");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * Event is the parent class of all events generated by controls.
 */
var Event = /** @class */ (function () {
    function Event(name, value) {
        this.name = name;
        this.value = value;
    }
    return Event;
}());
exports.Event = Event;
/**
 * AbstractControl implements the methods of the Control interface.
 */
var AbstractControl = /** @class */ (function (_super) {
    __extends(AbstractControl, _super);
    function AbstractControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractControl;
}(wml_1.Component));
exports.AbstractControl = AbstractControl;
/**
 * getName
 */
exports.getName = function (attrs) {
    return (attrs.ww && attrs.ww.name) ? attrs.ww.name : '';
};
/**
 * getDisabled
 */
exports.getDisabled = function (attrs) {
    return (attrs.ww && attrs.ww.disabled) ? attrs.ww.disabled : undefined;
};
/**
 * getValue
 */
exports.getValue = function (attrs) {
    return (attrs.ww && attrs.ww.value) ? maybe_1.just(attrs.ww.value) : maybe_1.nothing();
};

},{"@quenk/noni/lib/data/maybe":1,"@quenk/wml":33}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var label_1 = require("./wml/label");
///classNames:begin
exports.LABEL = 'ww-label';
/**
 * Label
 */
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new label_1.Main(_this);
        _this.values = {
            label: {
                className: util_1.concat(exports.LABEL, __1.getClassName(_this.attrs)),
                for: (_this.attrs.ww && _this.attrs.ww.for) ?
                    _this.attrs.ww.for : '',
                text: (_this.attrs.ww && _this.attrs.ww.text) ?
                    [document.createTextNode(_this.attrs.ww.text)] : _this.children
            }
        };
        return _this;
    }
    return Label;
}(wml_1.Component));
exports.Label = Label;

},{"../../":22,"../../util":32,"./wml/label":15,"@quenk/wml":33}],15:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('label', { 'for': __context.values.label.for, 'class': __context.values.label.className }, __spreadArrays((__context.values.label.text)));
        };
    }
    Main.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":1}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/text-field");
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var form_1 = require("../form");
var text_input_1 = require("../text-input");
exports.TextChangedEvent = text_input_1.TextChangedEvent;
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
exports.TEXT_FIELD = 'ww-text-field';
/**
 * TextField provides a wrapped native text input control.
 */
var TextField = /** @class */ (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                className: util_1.concat(exports.TEXT_FIELD, __1.getClassName(_this.attrs), feedback_1.getValidityClassName(_this.attrs))
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: feedback_1.getMessage(_this.attrs)
            },
            label: {
                id: __2.getName(_this.attrs),
                text: form_1.getLabel(_this.attrs)
            },
            control: {
                wml: {
                    id: 'control'
                },
                id: __1.getId(_this.attrs),
                name: __2.getName(_this.attrs),
                type: (_this.attrs.ww && _this.attrs.ww.type) ?
                    _this.attrs.ww.type : 'text',
                min: (_this.attrs.ww && _this.attrs.ww.min) ?
                    _this.attrs.ww.min : undefined,
                max: (_this.attrs.ww && _this.attrs.ww.max) ?
                    _this.attrs.ww.max : undefined,
                focus: (_this.attrs.ww && _this.attrs.ww.focus) ?
                    _this.attrs.ww.focus : undefined,
                placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) ?
                    _this.attrs.ww.placeholder : '',
                match: (_this.attrs.ww && _this.attrs.ww.match) ?
                    _this.attrs.ww.match : undefined,
                length: (_this.attrs.ww && _this.attrs.ww.length) ?
                    _this.attrs.ww.length : undefined,
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    _this.attrs.ww.value : '',
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ? true : undefined,
                readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly) ?
                    true : undefined,
                rows: (_this.attrs.ww && _this.attrs.ww.rows) ?
                    _this.attrs.ww.rows : 1,
                oninput: (_this.attrs.ww && _this.attrs.ww.onChange) ?
                    oninput(_this) : function () { },
                onChange: (_this.attrs.ww && _this.attrs.ww.onChange) ?
                    _this.attrs.ww.onChange : function () { }
            }
        };
        return _this;
    }
    TextField.prototype.setMessage = function (msg) {
        getHelp(this).map(function (h) { return h.setMessage(msg); });
        return this;
    };
    TextField.prototype.removeMessage = function () {
        getHelp(this).map(function (h) { return h.removeMessage(); });
        return this;
    };
    return TextField;
}(form_1.AbstractFormControl));
exports.TextField = TextField;
var getHelp = function (t) {
    return util_1.getById(t.view, t.values.messages.wml.id);
};
var oninput = function (f) { return function (e) {
    if (f.attrs.ww && f.attrs.ww && f.attrs.ww.onChange)
        f.attrs.ww.onChange(new text_input_1.TextChangedEvent((f.attrs.ww && f.attrs.ww.name) ?
            f.attrs.ww.name : '', e.target.value));
}; };

},{"../":13,"../../":22,"../../util":32,"../feedback":8,"../form":10,"../text-input":18,"./wml/text-field":17}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var label_1 = require("../../label");
;
var help_1 = require("../../help");
;
var text_input_1 = require("../../text-input");
;
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.root.wml.id }, 'class': __context.values.root.className }, [
                __this.widget(new label_1.Label({ ww: { 'for': __context.values.control.id, 'text': __context.values.label.text } }, []), { ww: { 'for': __context.values.control.id, 'text': __context.values.label.text } }),
                __this.widget(new text_input_1.TextInput({ ww: { 'id': __context.values.control.id, 'name': __context.values.control.name, 'focus': __context.values.control.focus, 'placeholder': __context.values.control.placeholder, 'onChange': __context.values.control.onChange, 'block': true, 'type': __context.values.control.type, 'min': __context.values.control.min, 'max': __context.values.control.max, 'match': __context.values.control.match, 'length': __context.values.control.length, 'value': __context.values.control.value, 'rows': __context.values.control.rows, 'disabled': __context.values.control.disabled, 'readOnly': __context.values.control.readOnly } }, []), { ww: { 'id': __context.values.control.id, 'name': __context.values.control.name, 'focus': __context.values.control.focus, 'placeholder': __context.values.control.placeholder, 'onChange': __context.values.control.onChange, 'block': true, 'type': __context.values.control.type, 'min': __context.values.control.min, 'max': __context.values.control.max, 'match': __context.values.control.match, 'length': __context.values.control.length, 'value': __context.values.control.value, 'rows': __context.values.control.rows, 'disabled': __context.values.control.disabled, 'readOnly': __context.values.control.readOnly } }),
                __this.widget(new help_1.Help({ wml: { 'id': __context.values.messages.wml.id }, ww: { 'text': __context.values.messages.text } }, []), { wml: { 'id': __context.values.messages.wml.id }, ww: { 'text': __context.values.messages.text } })
            ]);
        };
    }
    Main.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"../../help":11,"../../label":14,"../../text-input":18,"@quenk/noni/lib/data/maybe":1}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/text-input");
var util_1 = require("../../util");
var orientation_1 = require("../../content/orientation");
var size_1 = require("../../content/size");
var focus_1 = require("../focus");
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
exports.TEXT_INPUT = 'ww-text-input';
/**
 * TextChangedEvent
 */
var TextChangedEvent = /** @class */ (function (_super) {
    __extends(TextChangedEvent, _super);
    function TextChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextChangedEvent;
}(__2.Event));
exports.TextChangedEvent = TextChangedEvent;
/**
 * TextInput provides some extra styling to the native input.
 */
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = (_this.attrs.ww && _this.attrs.ww.rows && _this.attrs.ww.rows > 1) ?
            new views.Textarea(_this) : new views.Input(_this);
        _this.values = {
            control: {
                wml: {
                    id: 'root'
                }
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TEXT_INPUT, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.size) ?
                size_1.getSizeClassName(_this.attrs.ww.size) : '', (_this.attrs.ww && _this.attrs.ww.block) ?
                orientation_1.BLOCK : ''),
            name: __2.getName(_this.attrs),
            type: (_this.attrs.ww && _this.attrs.ww.type) ?
                _this.attrs.ww.type : 'text',
            min: (_this.attrs.ww && _this.attrs.ww.min) ?
                String(_this.attrs.ww.min) : null,
            max: (_this.attrs.ww && _this.attrs.ww.max) ?
                String(_this.attrs.ww.max) : null,
            match: new RegExp((_this.attrs.ww && _this.attrs.ww.match) ?
                _this.attrs.ww.match : '.'),
            length: (_this.attrs.ww && _this.attrs.ww.length) ?
                _this.attrs.ww.length : Infinity,
            placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) ?
                _this.attrs.ww.placeholder : '',
            value: (_this.attrs.ww && _this.attrs.ww.value) ?
                _this.attrs.ww.value : '',
            rows: (_this.attrs.ww && _this.attrs.ww.rows) ?
                _this.attrs.ww.rows : 1,
            disabled: (_this.attrs.ww && _this.attrs.ww.disabled === true) ?
                true : null,
            readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly === true) ?
                true : null,
            onkeydown: function (e) {
                if (e.key.length === 1) {
                    var value = e.target.value || '';
                    if ((!_this.values.match.test(e.key)) ||
                        (value.length > _this.values.length))
                        e.preventDefault();
                }
            },
            oninput: dispatchInput(_this),
            autofocus: (_this.attrs.ww && _this.attrs.ww.focus) ? true : undefined,
            onfocus: function () {
                if (_this.attrs.ww && _this.attrs.ww.onFocusGained)
                    _this.attrs.ww.onFocusGained(new focus_1.FocusGainedEvent(__2.getName(_this.attrs)));
            },
            onblur: function () {
                if (_this.attrs.ww && _this.attrs.ww.onFocusLost)
                    _this.attrs.ww.onFocusLost(new focus_1.FocusLostEvent(__2.getName(_this.attrs)));
            }
        };
        return _this;
    }
    TextInput.prototype.focus = function () {
        return focus_1.focus(this.view, this.values.control.wml.id);
    };
    return TextInput;
}(__2.AbstractControl));
exports.TextInput = TextInput;
/**
 * dispatchInput when the user inputs some text.
 */
var dispatchInput = function (i) { return function (e) {
    if (i.attrs.ww && i.attrs.ww.onChange)
        i.attrs.ww.onChange(new TextChangedEvent((i.attrs && i.attrs.ww.name) ?
            i.attrs.ww.name : '', e.target.value));
}; };

},{"../":13,"../../":22,"../../content/orientation":2,"../../content/size":3,"../../util":32,"../focus":9,"./wml/text-input":19}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Textarea = /** @class */ (function () {
    function Textarea(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('textarea', { wml: { 'id': __context.values.control.wml.id }, 'id': __context.values.id, 'name': __context.values.name, 'placeholder': __context.values.placeholder, 'oninput': __context.values.oninput, 'value': __context.values.value, 'disabled': __context.values.disabled, 'readonly': __context.values.readOnly, 'rows': __context.values.rows, 'class': __context.values.className }, [
                document.createTextNode(__context.values.value)
            ]);
        };
    }
    Textarea.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Textarea.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Textarea.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Textarea.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Textarea.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Textarea.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Textarea.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Textarea;
}());
exports.Textarea = Textarea;
;
var Input = /** @class */ (function () {
    function Input(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('input', { wml: { 'id': __context.values.control.wml.id }, 'id': __context.values.id, 'name': __context.values.name, 'type': __context.values.type, 'min': __context.values.min, 'max': __context.values.max, 'placeholder': __context.values.placeholder, 'oninput': __context.values.oninput, 'onkeydown': __context.values.onkeydown, 'autofocus': __context.values.autofocus, 'value': __context.values.value, 'disabled': __context.values.disabled, 'readonly': __context.values.readOnly, 'class': __context.values.className }, []);
        };
    }
    Input.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Input.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Input.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Input.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Input.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Input.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Input.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Input;
}());
exports.Input = Input;

},{"@quenk/noni/lib/data/maybe":1}],20:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/toolbar");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.TOOLBAR = 'ww-toolbar';
exports.TOOLBAR_COMPAT = '-toolbar-compat';
/**
 * Toolbar provides a widget for grouping related controls into a
 * single row.
 */
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.TOOLBAR, __1.getClassName(_this.attrs))
            }
        };
        return _this;
    }
    return Toolbar;
}(wml_1.Component));
exports.Toolbar = Toolbar;

},{"../../":22,"../../util":32,"./wml/toolbar":21,"@quenk/wml":33}],21:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { 'id': __context.values.root.id, 'class': __context.values.root.className }, __spreadArrays((__context.children)));
        };
    }
    Main.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":1}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getId from a widget's passed attributes.
 */
exports.getId = function (attrs) {
    return (attrs.ww && attrs.ww.id) ? attrs.ww.id : '';
};
/**
 * getClassName from a widget's passed attributes.
 */
exports.getClassName = function (attrs) {
    return (attrs.ww && attrs.ww.className) ? attrs.ww.className : '';
};
/**
 * text constructor.
 */
exports.text = function (str) {
    return document.createTextNode(String((str == null) ? '' : str));
};

},{}],23:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var orientation = require("../../content/orientation");
var __1 = require("../..");
var util_1 = require("../../util");
var __2 = require("../");
var action_bar_1 = require("./wml/action-bar");
///classNames:begin
/**
 * ACTION_BAR class name. for the ActionBar root.
 */
exports.ACTION_BAR = 'ww-action-bar';
/**
 * ACTION_BAR_CONTENT class name.
 */
exports.ACTION_BAR_CONTENT = 'ww-action-bar__content';
/**
 * ActionBar provides a bar across the screen that can be
 * used as a toolbar, navigation menu or something simillar.
 */
var ActionBar = /** @class */ (function (_super) {
    __extends(ActionBar, _super);
    function ActionBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new action_bar_1.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root',
                },
                id: (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '',
                className: util_1.concat(exports.ACTION_BAR, __2.LAYOUT, orientation.POSITIONED, __1.getClassName(_this.attrs))
            },
            content: {
                wml: {
                    id: 'content'
                },
                class: exports.ACTION_BAR_CONTENT
            }
        };
        return _this;
    }
    return ActionBar;
}(__2.AbstractLayout));
exports.ActionBar = ActionBar;

},{"../":27,"../..":22,"../../content/orientation":2,"../../util":32,"./wml/action-bar":24}],24:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.root.wml.id }, 'id': __context.values.root.id, 'class': __context.values.root.className }, [
                __this.node('div', { wml: { 'id': __context.values.content.wml.id }, 'class': __context.values.content.class }, __spreadArrays((__context.children)))
            ]);
        };
    }
    Main.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":1}],25:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/grid");
var util_1 = require("../../util");
var __1 = require("../");
///classNames:begin
exports.GRID_LAYOUT = 'ww-grid-layout';
exports.GRID_LAYOUT_ROW = 'ww-grid-layout__row';
exports.GRID_LAYOUT_COLUMN = 'ww-grid-layout__column';
;
/**
 * GridLayout
 */
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    function GridLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.GridLayout(_this);
        _this.values = {
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'root',
                },
                className: function () {
                    var c = (_this.attrs.ww && _this.attrs.ww.className) ?
                        _this.attrs.ww.className : '';
                    return util_1.concat(exports.GRID_LAYOUT, __1.LAYOUT, c);
                }
            }
        };
        return _this;
    }
    return GridLayout;
}(__1.AbstractLayout));
exports.GridLayout = GridLayout;
/**
 * Row
 */
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Row(_this);
        _this.values = {
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'row',
                },
                className: function () {
                    var c = (_this.attrs.ww && _this.attrs.ww.className) ?
                        _this.attrs.ww.className : '';
                    return util_1.concat(exports.GRID_LAYOUT_ROW, c);
                }
            }
        };
        return _this;
    }
    return Row;
}(__1.AbstractLayout));
exports.Row = Row;
/**
 * Column
 */
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Column(_this);
        _this.values = {
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'column'
                },
                className: function () {
                    if (_this.attrs.ww != null) {
                        return util_1.concat(exports.GRID_LAYOUT_COLUMN, _this.attrs.ww.span ?
                            "-span" + _this.attrs.ww.span :
                            '-span12', _this.attrs.ww.offset ?
                            "-offset" + _this.attrs.ww.offset :
                            '', _this.attrs.ww.className);
                    }
                    else {
                        return util_1.concat(exports.GRID_LAYOUT_COLUMN, '-span12');
                    }
                }
            }
        };
        return _this;
    }
    return Column;
}(__1.AbstractLayout));
exports.Column = Column;

},{"../":27,"../../util":32,"./wml/grid":26}],26:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var GridLayout = /** @class */ (function () {
    function GridLayout(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.content.wml.id }, 'id': __context.values.content.id, 'class': __context.values.content.className() }, __spreadArrays((__context.children)));
        };
    }
    GridLayout.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    GridLayout.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    GridLayout.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    GridLayout.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    GridLayout.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    GridLayout.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    GridLayout.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return GridLayout;
}());
exports.GridLayout = GridLayout;
;
var Row = /** @class */ (function () {
    function Row(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.content.wml.id }, 'id': __context.values.content.id, 'class': __context.values.content.className() }, __spreadArrays((__context.children)));
        };
    }
    Row.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Row.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Row.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Row.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Row.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Row.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Row.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Row;
}());
exports.Row = Row;
;
var Column = /** @class */ (function () {
    function Column(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.content.wml.id }, 'id': __context.values.content.id, 'class': __context.values.content.className() }, __spreadArrays((__context.children)));
        };
    }
    Column.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Column.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Column.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Column.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Column.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Column.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Column.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Column;
}());
exports.Column = Column;

},{"@quenk/noni/lib/data/maybe":1}],27:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml_1 = require("@quenk/wml");
var util_1 = require("../util");
///classNames:begin
exports.LAYOUT = '-layout';
/**
 * AbstractLayout provides an implementation of Layout.
 */
var AbstractLayout = /** @class */ (function (_super) {
    __extends(AbstractLayout, _super);
    function AbstractLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractLayout.prototype.setContent = function (c) {
        exports.doSetContent(this.view, this.values.content.wml.id, c);
        return this;
    };
    AbstractLayout.prototype.removeContent = function () {
        exports.doRemoveContent(this.view, this.values.content.wml.id);
        return this;
    };
    return AbstractLayout;
}(wml_1.Component));
exports.AbstractLayout = AbstractLayout;
/**
 * doSetContent on a Node found in a view.
 */
exports.doSetContent = function (view, id, content) {
    var maybeRoot = view.findById(id);
    if (maybeRoot.isNothing())
        return util_1.warnMissing(view, id);
    var n = maybeRoot.get();
    while (n.firstChild)
        n.removeChild(n.firstChild);
    for (var i = 0; i < content.length; i++)
        n.appendChild(content[i]);
};
/**
 * doRemoveContent from a View.
 */
exports.doRemoveContent = function (view, id) {
    var maybeNode = view.findById(id);
    if (maybeNode.isNothing())
        return util_1.warnMissing(view, id);
    var n = maybeNode.get();
    while (n.firstChild)
        n.removeChild(n.firstChild);
};

},{"../util":32,"@quenk/wml":33}],28:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/main");
var util_1 = require("../../util");
var __1 = require("../");
///classNames:begin
exports.MAIN_LAYOUT = 'ww-main-layout';
/**
 * MainLayout provides a container for the main content of an application.
 */
var MainLayout = /** @class */ (function (_super) {
    __extends(MainLayout, _super);
    function MainLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            content: {
                wml: {
                    id: 'main'
                },
                id: (_this.attrs && _this.attrs.ww) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.MAIN_LAYOUT, __1.LAYOUT, (_this.attrs && _this.attrs.ww) ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return MainLayout;
}(__1.AbstractLayout));
exports.MainLayout = MainLayout;

},{"../":27,"../../util":32,"./wml/main":29}],29:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.content.wml.id }, 'id': __context.values.content.id, 'class': __context.values.content.className }, __spreadArrays((__context.children)));
        };
    }
    Main.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":1}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var style = require("../../content/style");
var views = require("./wml/panel");
var util_1 = require("../../util");
var __1 = require("..");
///classNames:begin
/**
 * PANEL wrapper class.
 */
exports.PANEL = 'ww-panel';
/**
 * PANEL_HEADER class name.
 */
exports.PANEL_HEADER = 'ww-panel__header';
/**
 * PANEL_BODY class name.
 */
exports.PANEL_BODY = 'ww-panel__body';
/**
 * PANEL_FOOTER class name.
 */
exports.PANEL_FOOTER = 'ww-panel__footer';
/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 */
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Panel(_this);
        /**
         * values
         */
        _this.values = {
            /**
             * root values.
             */
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'panel',
                },
                className: util_1.concat(exports.PANEL, __1.LAYOUT, (_this.attrs.ww && _this.attrs.ww.style) ?
                    "-" + _this.attrs.ww.style : style.DEFAULT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return Panel;
}(__1.AbstractLayout));
exports.Panel = Panel;
/**
 * PanelHeader
 */
var PanelHeader = /** @class */ (function (_super) {
    __extends(PanelHeader, _super);
    function PanelHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.PanelHeader(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                wml: {
                    id: 'header'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_HEADER, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return PanelHeader;
}(__1.AbstractLayout));
exports.PanelHeader = PanelHeader;
/**
 * PanelBody
 */
var PanelBody = /** @class */ (function (_super) {
    __extends(PanelBody, _super);
    function PanelBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.PanelBody(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                wml: {
                    id: 'body'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_BODY, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return PanelBody;
}(__1.AbstractLayout));
exports.PanelBody = PanelBody;
/**
 * PanelFooter
 */
var PanelFooter = /** @class */ (function (_super) {
    __extends(PanelFooter, _super);
    function PanelFooter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.PanelFooter(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                wml: {
                    id: 'footer'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_FOOTER, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return PanelFooter;
}(__1.AbstractLayout));
exports.PanelFooter = PanelFooter;

},{"..":27,"../../content/style":5,"../../util":32,"./wml/panel":31}],31:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Panel = /** @class */ (function () {
    function Panel(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.content.id }, 'class': __context.values.content.className }, __spreadArrays((__context.children)));
        };
    }
    Panel.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Panel.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Panel.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Panel.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Panel.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Panel.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Panel.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Panel;
}());
exports.Panel = Panel;
;
var PanelHeader = /** @class */ (function () {
    function PanelHeader(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.content.id }, 'class': __context.values.content.className }, __spreadArrays((__context.children)));
        };
    }
    PanelHeader.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    PanelHeader.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    PanelHeader.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PanelHeader.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    PanelHeader.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    PanelHeader.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PanelHeader.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return PanelHeader;
}());
exports.PanelHeader = PanelHeader;
;
var PanelBody = /** @class */ (function () {
    function PanelBody(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.content.id }, 'class': __context.values.content.className }, __spreadArrays((__context.children)));
        };
    }
    PanelBody.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    PanelBody.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    PanelBody.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PanelBody.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    PanelBody.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    PanelBody.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PanelBody.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return PanelBody;
}());
exports.PanelBody = PanelBody;
;
var PanelFooter = /** @class */ (function () {
    function PanelFooter(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { wml: { 'id': __context.values.content.id }, 'class': __context.values.content.className }, __spreadArrays((__context.children)));
        };
    }
    PanelFooter.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    PanelFooter.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    PanelFooter.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PanelFooter.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    PanelFooter.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    PanelFooter.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PanelFooter.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return PanelFooter;
}());
exports.PanelFooter = PanelFooter;

},{"@quenk/noni/lib/data/maybe":1}],32:[function(require,module,exports){
"use strict";
/**
 * This module provides utility functions and constants used
 * through out the wml-widgets module.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getById retreives an WMLElement from a view by its id.
 *
 * If the WMLElement is not found a warning is logged to console.
 */
exports.getById = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        exports.warnMissing(view, id);
    }
    return m;
};
/**
 * warn via console that an element is missing.
 */
exports.warnMissing = function (view, id) {
    console.warn('The view ', view, " does not have an id \"" + id + "\"!");
};
/**
 * combine the members of an array into one string.
 */
exports.combine = function (str, joiner) {
    if (joiner === void 0) { joiner = ' '; }
    return str.filter(function (s) { return ((s != null) || s != ''); }).join(joiner);
};
/**
 * concat joins various strings together to form an html class attribute value.
 *
 * Removes empty strings, null and undefined values.
 */
exports.concat = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return str.filter(function (s) { return ((s == null) || (s == '')) ? false : true; })
        .map(function (s) { return s.trim(); }).join(' ');
};
/**
 * noop
 */
exports.noop = function () { };
/**
 * replaceContent
 */
exports.replaceContent = function (r, node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
    node.appendChild(r.render());
};
/**
 * debounce a function so that it is only called once after
 * a period of time.
 */
exports.debounce = function (f, delay) {
    var timer = -1;
    return delay === 0 ? f : function (a) {
        if (timer === -1) {
            timer = window.setTimeout(function () { return f(a); }, delay);
        }
        else {
            clearTimeout(timer);
            timer = window.setTimeout(function () { return f(a); }, delay);
        }
    };
};

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * Component is an abstract Widget implementation
 * that can be used instead of manually implementing the whole interface.
 */
var Component = /** @class */ (function () {
    /**
     * @param {A} attrs is the attributes this Component excepts.
     * @param {Content[]} children is an array of content for Component.
     */
    function Component(attrs, children) {
        this.attrs = attrs;
        this.children = children;
    }
    Component.prototype.rendered = function () { };
    Component.prototype.removed = function () { };
    Component.prototype.render = function () { return this.view.render(); };
    return Component;
}());
exports.Component = Component;
;

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = require("./views/board");
var BoardDashboard = /** @class */ (function () {
    function BoardDashboard(content) {
        var _this = this;
        this.content = content;
        this.view = new board_1.BoardDashboardView(this);
        this.values = {
            main: { id: 'main' },
            data: {},
            controls: {
                change: function (e) {
                    _this.values.data[e.name] = e.value;
                },
                create: function () { },
            }
        };
    }
    BoardDashboard.create = function (id) {
        var e = document.getElementById(id);
        return new BoardDashboard(e);
    };
    BoardDashboard.prototype.setContent = function (view) {
        while (this.content.firstChild != null)
            this.content.removeChild(this.content.firstChild);
        this.content.appendChild(view.render());
    };
    BoardDashboard.prototype.run = function () {
        this.setContent(this.view);
    };
    return BoardDashboard;
}());
exports.BoardDashboard = BoardDashboard;
BoardDashboard.create('app').run();

},{"./views/board":35}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var action_bar_1 = require("@quenk/wml-widgets/lib/layout/action-bar");
;
var main_1 = require("@quenk/wml-widgets/lib/layout/main");
;
var job_form_1 = require("./job-form");
;
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var BoardDashboardView = /** @class */ (function () {
    function BoardDashboardView(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', {}, [
                __this.widget(new action_bar_1.ActionBar({ ww: { 'className': 'board-action-bar' } }, []), { ww: { 'className': 'board-action-bar' } }),
                __this.widget(new main_1.MainLayout({ wml: { 'id': __context.values.main.id } }, [
                    (new job_form_1.JobFormView(__context)).render()
                ]), { wml: { 'id': __context.values.main.id } })
            ]);
        };
    }
    BoardDashboardView.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    BoardDashboardView.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    BoardDashboardView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    BoardDashboardView.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    BoardDashboardView.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    BoardDashboardView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    BoardDashboardView.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return BoardDashboardView;
}());
exports.BoardDashboardView = BoardDashboardView;

},{"./job-form":36,"@quenk/noni/lib/data/maybe":1,"@quenk/wml-widgets/lib/layout/action-bar":23,"@quenk/wml-widgets/lib/layout/main":28}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
var panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
var text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
var button_1 = require("@quenk/wml-widgets/lib/control/button");
;
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var JobFormView = /** @class */ (function () {
    function JobFormView(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new grid_1.GridLayout({}, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({ ww: { 'span': 8, 'offset': 2 } }, [
                        __this.widget(new panel_1.Panel({}, [
                            __this.widget(new panel_1.PanelBody({}, [
                                __this.node('form', { 'autocomplete': 'off' }, [
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'title', 'value': __context.values.data.title, 'label': 'Title', 'focus': true, 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'title', 'value': __context.values.data.title, 'label': 'Title', 'focus': true, 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'country', 'value': __context.values.data.country, 'label': 'Country', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'country', 'value': __context.values.data.country, 'label': 'Country', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'city', 'value': __context.values.data.city, 'label': 'City', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'city', 'value': __context.values.data.city, 'label': 'City', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'type', 'value': __context.values.data.type, 'label': 'Type', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'type', 'value': __context.values.data.type, 'label': 'Type', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'role', 'value': __context.values.data.role, 'label': 'Role', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'role', 'value': __context.values.data.role, 'label': 'Role', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'industry', 'value': __context.values.data.industry, 'label': 'Industry', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'industry', 'value': __context.values.data.industry, 'label': 'Industry', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'technologies', 'value': __context.values.data.technologies, 'label': 'Technologies', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'technologies', 'value': __context.values.data.technologies, 'label': 'Technologies', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'link', 'value': __context.values.data.link, 'label': 'Link', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'link', 'value': __context.values.data.link, 'label': 'Link', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'description', 'value': __context.values.data.description, 'label': 'Description', 'rows': 15, 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'description', 'value': __context.values.data.description, 'label': 'Description', 'rows': 15, 'onChange': __context.values.controls.change } })
                                ])
                            ]), {}),
                            __this.widget(new panel_1.PanelFooter({}, [
                                __this.widget(new button_1.Button({ ww: { 'className': '-primary', 'text': 'create', 'onClick': __context.values.controls.create } }, []), { ww: { 'className': '-primary', 'text': 'create', 'onClick': __context.values.controls.create } })
                            ]), {})
                        ]), {})
                    ]), { ww: { 'span': 8, 'offset': 2 } })
                ]), {})
            ]), {});
        };
    }
    JobFormView.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    JobFormView.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    JobFormView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    JobFormView.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    JobFormView.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    JobFormView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    JobFormView.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return JobFormView;
}());
exports.JobFormView = JobFormView;

},{"@quenk/noni/lib/data/maybe":1,"@quenk/wml-widgets/lib/control/button":6,"@quenk/wml-widgets/lib/control/text-field":16,"@quenk/wml-widgets/lib/layout/grid":25,"@quenk/wml-widgets/lib/layout/panel":30}]},{},[34]);
