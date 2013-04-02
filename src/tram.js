  // --------------------------------------------------
  // Private vars
  /*global $, P, easing, clamped */
  
  var doc = document;
  var win = window;
  var store = 'bkwld-tram-js';
  var slice = Array.prototype.slice;
  var space = ' ';
  var unitRegex = /[\.0-9]/g;
  var typeNumber = 'number';
  var typeColor = /^(rgb|#)/;
  var typeLength = /(em|cm|mm|in|pt|pc|px)$/;
  var typeLenPerc = /(em|cm|mm|in|pt|pc|px|%)$/;
  var typeFancyLad = 'fancy';
  var typePercent = '%';
  var typeDegrees = 'deg';
  var typePixels = 'px';
  
  // --------------------------------------------------
  // Private functions
  
  // Simple feature detect, returns both dom + css prefixed names
  var testDiv = doc.createElement('a');
  var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
  var cssPrefixes = ['-webkit-', '-moz-', '-o-', '-ms-'];
  var testFeature = function (prop) {
    // unprefixed case
    if (prop in testDiv.style) return { dom: prop, css: prop };
    // test all prefixes
    var i, domProp, domSuffix = '', words = prop.split('-');
    for (i = 0; i < words.length; i++) {
      domSuffix += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    for (i = 0; i < domPrefixes.length; i++) {
      domProp = domPrefixes[i] + domSuffix;
      if (domProp in testDiv.style) return { dom: domProp, css: cssPrefixes[i] + prop };
    }
  };
  
  // Feature tests
  var support = {
      bind: Function.prototype.bind
    , transform: testFeature('transform')
    , transition: testFeature('transition')
    , backface: testFeature('backface-visibility')
    , timing: testFeature('transition-timing-function')
  };
  
  // Modify easing variants for webkit clamp bug
  if (support.transition) {
    var timingProp = support.timing.dom;
    testDiv.style[timingProp] = easing['ease-in-back'][0];
    if (!testDiv.style[timingProp]) {
      // style invalid, use clamped versions
      for (var x in clamped) easing[x][0] = clamped[x];
    }
  }
  
  // Done with test div, avoid IE memory leak.
  testDiv = null;
  
  // --------------------------------------------------
  // Transition class - public API returned from the tram() wrapper.
  
  var Transition = P(function(proto) {
    
    proto.init = function (el) {
      this.el = el;
      this.$el = $(el);
      this.props = {};
      this.queue = [];
      this.style = '';
      // hide backface if supported, for better perf
      if (support.backface) this.el.style[support.backface.dom] = 'hidden';
    };
    
    // Public chainable methods
    chain('add', add);
    chain('start', start);
    chain('stop', stop);
    
    // Public add() - chainable
    function add(transition, options) {
      // Parse transition settings
      var settings = compact(('' + transition).split(space));
      var name = settings[0];
      
      // Get property definition from map
      var definition = propertyMap[name];
      if (!definition) return warn('Unsupported property: ' + name);
      
      // Init property instance
      var Class = definition[0];
      var prop = this.props[name];
      if (!prop) {
        prop = this.props[name] = new Class.Bare();
        // Event handlers
        prop.onChange = proxy(this, onChange);
        prop.onEnd = proxy(this, onEnd);
      }
      // Init settings + type + options
      prop.init(this.$el, settings, definition, options || {});
    }
    
    function onChange() {
      // build transition string from active props
      var p, prop, result = [];
      for (p in this.props) {
        prop = this.props[p];
        if (!prop.active) continue;
        result.push(prop.string);
      }
      // set transition style property on dom element
      result = result.join(',');
      if (this.style === result) return;
      this.style = result;
      this.el.style[support.transition.dom] = result;
    }
    
    function onEnd() {
      // TODO proceed to next item in queue
    }
    
    // Public start() - chainable
    function start(options) {
      // If the first argument is an array, use that as the arguments instead.
      var args = $.isArray(options) ? options.slice() : slice.call(arguments);
      if (!args.length) return;
      
      var current = args.shift();
      if (!current) return;
      
      // TODO - Deal with existing queue. Replacing it entirely for now.
      // Push any extra arguments into queue
      if (args.length > 1) this.queue = args;
      
      // If current is a function, invoke it.
      if (typeof current == 'function') {
        current(this);
        return;
      }
      
      // If current is an object, start property tweens.
      if (typeof current == 'object') {
        // loop through each valid property
        var timeSpan = 0;
        eachProp.call(this, current, function (prop, value) {
          // determine the longest time span (duration + delay)
          if (prop.span > timeSpan) timeSpan = prop.span;
          // animate property value
          prop.animate(value);
        });
        // call change handler once for all active props
        onChange.call(this);
        // TODO proceed to next item in queue after timeSpan
      }
    }
    
    // Public stop() - chainable
    function stop(property) {
      // TODO stop individual properties by name
      for (var p in this.props) {
        this.props[p].stop();
      }
    }
    
    // Loop through valid properties and run iterator callback
    function eachProp(collection, iterator) {
      var p, valid;
      var transform = this.props.transform;
      var transProps = {};
      for (p in collection) {
        // check for special Transform sub-properties
        if (transform && p in Transform.map) {
          transProps[p] = collection[p];
          continue;
        }
        // validate property
        valid = p in this.props && p in propertyMap;
        if (!valid) continue;
        // iterate with valid property / value
        iterator(this.props[p], collection[p]);
      }
      // iterate with transform prop / sub-prop values
      if (transform) iterator(transform, transProps);
    }
    
    // Define a chainable method that takes children into account
    function chain(name, method) {
      proto[name] = function () {
        if (this.children) return eachChild.call(this, method, arguments);
        method.apply(this, arguments);
        return this;
      };
    }
    
    // Iterate through children and apply the method, return for chaining
    function eachChild(method, args) {
      var i, count = this.children.length;
      for (i = 0; i < count; i++) {
        method.apply(this.children[i], args);
      }
      return this;
    }
  });
  
  // Tram class - extends Transition + wraps child instances for chaining.
  var Tram = P(Transition, function (proto) {
    
    proto.init = function (args) {
      var $elems = $(args[0]);
      var options = args.slice(1);
      
      // Invalid selector, do nothing.
      if (!$elems.length) return this;
      
      // Single case - return single Transition instance
      if ($elems.length === 1) return factory($elems[0], options);
      
      // Store multiple instances for chaining
      var children = [];
      $elems.each(function (index, el) {
        children.push(factory(el, options));
      });
      this.children = children;
      return this;
    };
    
    // Retrieve instance from data or create a new one.
    function factory(el, options) {
      var t = $.data(el, store) || $.data(el, store, new Transition.Bare());
      if (!t.el) t.init(el);
      if (options.length) return t.start(options);
      return t;
    }
  });
  
  // --------------------------------------------------
  // Property class - get/set property values
  
  var Property = P(function (proto) {
    
    var defaults = {
        duration: 500
      , ease: 'ease'
      , delay: 0
    };
    
    proto.init = function ($el, settings, definition, options) {
      // Initialize or extend settings
      this.$el = $el;
      var name = settings[0];
      if (definition[2]) name = definition[2]; // expand name
      if (prefixed[name]) name = prefixed[name];
      this.name = name;
      this.type = definition[1];
      this.duration = validTime(settings[1], this.duration, defaults.duration);
      this.ease = validEase(settings[2], this.ease, defaults.ease);
      this.delay = validTime(settings[3], this.delay, defaults.delay);
      this.span = this.duration + this.delay;
      this.active = false;
      // Use CSS transitions when supported, unless tween is set via options.
      if (support.transition && options.tween !== true) {
        this.animate = this.transition;
        this.string = this.name + space + this.duration + 'ms' +
          (this.ease != 'ease' ? space + easing[this.ease][0] : '') +
          (this.delay ? space + this.delay + 'ms' : '');
      } else {
        this.animate = this.fallback;
      }
    };
    
    // Set value immediately
    proto.set = function (value) {
      // stop any active transition or tween
      this.stop();
      value = this.convert(value, this.type);
      this.$el.css(this.name, value);
    };
    
    // CSS transition
    proto.transition = function (value) {
      // stop any active transition (without change event)
      this.stop(false);
      // set new value to start transition
      this.active = true;
      this.defer(this.convert(value, this.type));
    };
    
    // Deferred update to start CSS transition
    proto.defer = function (value) {
      var self = this;
      setTimeout(function () {
        // Check active state to prevent a race condition
        self.active && self.$el.css(self.name, value);
      }, 0);
    };
    
    // Fallback tweening
    proto.fallback = function (value) {
      // stop any active transition or tween
      this.stop();
      // start a new tween
      this.tween = new Tween({
          from: this.convert(this.$el.css(this.name), this.type)
        , to: this.convert(value, this.type)
        , duration: this.duration
        , delay: this.delay
        , ease: this.ease
        , update: this.update
        , context: this
      });
    };
    
    // Update css value (called from tween)
    proto.update = function (value) {
      this.$el.css(this.name, value);
    };
    
    // Stop animation
    proto.stop = function (emit) {
      // Emit change event by default
      if (emit !== false) emit = true;
      this.tween && this.tween.stop();
      // Reset property to stop CSS transition
      if (this.active) {
        this.active = false;
        var value = this.$el.css(this.name);
        this.$el.css(this.name, value);
        emit && this.onChange();
      }
    };
    
    // Convert value to expected type
    proto.convert = function (value, type) {
      var warnType = type;
      var number = typeof value == 'number';
      var string = typeof value == 'string';
      switch(type) {
        case typeNumber:
          this.unit = '';
          if (number) return value;
          if (string && value.replace(unitRegex, '') === '') return +value;
          break;
        case typeColor:
          this.unit = '';
          if (string) {
            if (value === '' && this.original) {
              return this.original;
            }
            if (type.test(value)) {
              if (value.charAt(0) == '#' && value.length == 7) return value;
              return toHex(value);
            }
          }
          warnType = 'hex or rgb string';
          break;
        case typeLength:
          if (number) return value + typePixels;
          if (string && type.test(value)) return value;
          warnType = 'number(px) or string(unit)';
          break;
        case typeLenPerc:
          if (number) return value + typePixels;
          if (string && type.test(value)) return value;
          warnType = 'number(px) or string(unit or %)';
          break;
        case typeFancyLad:
          if (number) return value;
          if (string && typeLenPerc.test(value)) return value;
          warnType = 'number or string(unit or %)';
          break;
        case typeDegrees:
          if (number) return value + typeDegrees;
          if (string && type.test(value)) return value;
          warnType = 'number(deg) or string(deg)';
          break;
        case typePixels:
          if (number) return value + typePixels;
          if (string && type.test(value)) return value;
          warnType = 'number(px) or string(px)';
          break;
      }
      // Type must be invalid, warn people.
      typeWarning(warnType, value);
      return value;
    };
    
    // Normalize time values
    var ms = /ms/;
    var sec = /s|\./;
    function validTime(string, current, safe) {
      if (current !== undefined) safe = current;
      if (string === undefined) return safe;
      var n = safe;
      // if string contains 'ms' or contains no suffix
      if (ms.test(string) || !sec.test(string)) {
        n = parseInt(string, 10);
      // otherwise if string contains 's' or a decimal point
      } else if (sec.test(string)) {
        n = parseFloat(string) * 1000;
      }
      if (n < 0) n *= -1; // positive only plz
      return n === n ? n : safe; // protect from NaNs
    }
    
    // Make sure ease exists
    function validEase(ease, current, safe) {
      if (current !== undefined) safe = current;
      return ease in easing ? ease : safe;
    }
  });
  
  var Color = P(Property, function (proto, supr) {
    
    proto.init = function () {
      supr.init.apply(this, arguments);
      
      // Store original color value to allow '' values
      if (!this.original) this.original = this.$el.css(this.name);
    };
  });
  
  var Transform = P(Property, function (proto) {
    // TODO add option for gpu trigger
    // translate3d(0,0,0);
    
    // Convert transform sub-properties
    proto.convert = function (value, type) {
      console.log('convert', value);
    };
  });
  
  // --------------------------------------------------
  // Tween class - handles timing and frame-based animation.
  
  var Tween = P(function (proto) {
    
    // Private vars
    var tweenList = [];
    var defaults = {
        duration: 500
      , ease: easing.ease[1]
      , delay: 0
      , from: 0
      , to: 1
    };
    
    proto.init = function (options) {
      // Init timing props
      this.duration = options.duration || defaults.duration;
      this.delay = options.delay || defaults.delay;
      // Use ease function or key value from easing map
      var ease = options.ease || defaults.ease;
      if (easing[ease]) ease = easing[ease][1];
      if (typeof ease != 'function') ease = defaults.ease;
      this.ease = ease;
      this.update = options.update || noop;
      this.context = options.context;
      // Format value and determine units
      var from = options.from;
      var to = options.to;
      if (from === undefined) from = defaults.from;
      if (to === undefined) to = defaults.to;
      this.unit = options.unit || '';
      if (typeof from == 'number' && typeof to == 'number') {
        this.begin = from;
        this.change = to - from;
      } else {
        this.format(to, from);
      }
      // Start tween
      this.start = timeNow();
      addRender(this);
    };
    
    proto.stop = function () {
      removeRender(this);
    };
    
    proto.render = function (now) {
      var value;
      var delay = this.delay;
      var begin = this.begin;
      var change = this.change;
      var duration = this.duration;
      var context = this.context;
      var unit = this.unit;
      var delta = now - this.start;
      // skip render during delay
      if (delay) {
        if (delta <= delay) return;
        // after delay, reduce delta
        delta -= delay;
      }
      if (delta < duration) {
        // calculate eased position
        var position = this.ease(delta, 0, 1, duration);
        // TODO interpolate hex here
        value = begin + (position * change);
        if (unit) value += unit;
        this.update.call(context, value);
        return;
      }
      // we're done, remove tween and set final value
      removeRender(this);
      value = this.endHex || begin + change;
      if (unit) value += unit;
      this.update.call(context, value);
    };
    
    // Format string values for tween
    proto.format = function (to, from) {
      // cast strings
      from += '';
      to += '';
      // hex colors
      if (to.charAt(0) == '#') {
        this.beginHex = from;
        this.endHex = to;
        this.begin = 0;
        this.change = 1;
        return;
      }
      // try to determine units
      if (!this.unit) {
        var fromUnit = from.replace(unitRegex, '');
        var toUnit = to.replace(unitRegex, '');
        if (fromUnit !== toUnit) unitWarning('tween', from, to);
        this.unit = fromUnit;
      }
      from = parseFloat(from);
      to = parseFloat(to);
      this.begin = from;
      this.change = to - from;
    };
    
    // Animation timer shim with setTimeout fallback
    var enterFrame = function () {
      return win.requestAnimationFrame ||
      win.webkitRequestAnimationFrame ||
      win.mozRequestAnimationFrame ||
      win.oRequestAnimationFrame ||
      win.msRequestAnimationFrame ||
      function (callback) {
        win.setTimeout(callback, 16);
      };
    }();
    
    // Timestamp shim with fallback
    var timeNow = function () {
      // use high-res timer if available
      var perf = win.performance,
        perfNow = perf && (perf.now || perf.webkitNow || perf.msNow || perf.mozNow);
      if (perfNow && support.bind) {
        return perfNow.bind(perf);
      }
      // fallback to epoch-based timestamp
      return Date.now || function () {
        return +(new Date);
      };
    }();
    
    // Add a tween to the render list
    var addRender = function (tween) {
      // if this is the first item, start the render loop
      if (tweenList.push(tween) === 1) enterFrame(renderLoop);
    };
    
    // Loop through all tweens on each frame
    var renderLoop = function () {
      var i, now, count = tweenList.length;
      if (!count) return;
      enterFrame(renderLoop);
      now = timeNow();
      for (i = count; i--;) {
        tweenList[i].render(now);
      }
    };
    
    // Remove tween from render list
    var removeRender = function (tween) {
      var rest, index = $.inArray(tween, tweenList);
      if (index >= 0) {
        rest = tweenList.slice(index + 1);
        tweenList.length = index;
        if (rest.length) tweenList = tweenList.concat(rest);
      }
    };
    
    // Interpolate hex colors based on `position`
    var interpolate = function (start, finish, position) {
      var r = [], i, e, from, to;
      for (i = 0; i < 6; i++) {
        from = Math.min(15, parseInt(start.charAt(i),  16));
        to   = Math.min(15, parseInt(finish.charAt(i), 16));
        e = Math.floor((to - from) * position + from);
        e = e > 15 ? 15 : e < 0 ? 0 : e;
        r[i] = e.toString(16);
      }
      return '#' + r.join('');
    };
  });
  
  // --------------------------------------------------
  // Main wrapper - returns a Tram instance with public chaining API.
  
  function tram() {
    // Chain on the result of Tram.init() to optimize single case.
    var wrap = new Tram.Bare();
    return wrap.init(slice.call(arguments));
  }
  
  // Global tram config
  tram.config = {
      baseFontSize: 16 // used by remFallback
    , remFallback: false // TODO add rem fallback for px length values
    , defaultUnit: typePixels // default unit added to <length> types
    , gpuTransforms: true // always prepend gpu cache trick to transforms
  };
  
  // macro() static method
  tram.macro = function () {
    // TODO
  };
  
  // tween() static method
  tram.tween = function () {
    // TODO
  };
  
  // jQuery plugin method, keeps jQuery chain intact.
  $.fn.tram = function (args) {
    // Pass along element as first argument
    args = [this].concat(slice.call(arguments));
    // Directly instantiate Tram class, no tram chain!
    new Tram(args);
    return this;
  };
  
  // --------------------------------------------------
  // Property map + unit values
  
  // Prefixed property names
  var prefixed = {
    'transform': support.transform && support.transform.css
  };
  
  var propertyMap = (function (Prop) {
    
    // Transform sub-properties { name: [ valueType, expand ]}
    Transform.map = {
        x:            [ typePixels, 'translateX' ]
      , y:            [ typePixels, 'translateY' ]
      , z:            [ typePixels, 'translateZ' ]
      , rotate:       [ typeDegrees ]
      , rotateX:      [ typeDegrees ]
      , rotateY:      [ typeDegrees ]
      , rotateZ:      [ typeDegrees ]
      , scale:        [ typeNumber ]
      , scaleX:       [ typeNumber ]
      , scaleY:       [ typeNumber ]
      , scaleZ:       [ typeNumber ]
      , skew:         [ typeDegrees ]
      , skewX:        [ typeDegrees ]
      , skewY:        [ typeDegrees ]
      , perspective:  [ typePixels ]
    };
    
    // Main Property map { name: [ Class, valueType, expand ]}
    return {
        'color'                : [ Color, typeColor ]
      , 'background'           : [ Color, typeColor, 'background-color' ]
      , 'outline-color'        : [ Color, typeColor ]
      , 'border-color'         : [ Color, typeColor ]
      , 'border-top-color'     : [ Color, typeColor ]
      , 'border-right-color'   : [ Color, typeColor ]
      , 'border-bottom-color'  : [ Color, typeColor ]
      , 'border-left-color'    : [ Color, typeColor ]
      , 'border-width'         : [ Property, typeLength ]
      , 'border-top-width'     : [ Property, typeLength ]
      , 'border-right-width'   : [ Property, typeLength ]
      , 'border-bottom-width'  : [ Property, typeLength ]
      , 'border-left-width'    : [ Property, typeLength ]
      , 'border-spacing'       : [ Property, typeLength ]
      , 'letter-spacing'       : [ Property, typeLength ]
      , 'margin'               : [ Property, typeLength ]
      , 'margin-top'           : [ Property, typeLength ]
      , 'margin-right'         : [ Property, typeLength ]
      , 'margin-bottom'        : [ Property, typeLength ]
      , 'margin-left'          : [ Property, typeLength ]
      , 'padding'              : [ Property, typeLength ]
      , 'padding-top'          : [ Property, typeLength ]
      , 'padding-right'        : [ Property, typeLength ]
      , 'padding-bottom'       : [ Property, typeLength ]
      , 'padding-left'         : [ Property, typeLength ]
      , 'outline-width'        : [ Property, typeLength ]
      , 'opacity'              : [ Property, typeNumber ]
      , 'top'                  : [ Property, typeLenPerc ]
      , 'right'                : [ Property, typeLenPerc ]
      , 'bottom'               : [ Property, typeLenPerc ]
      , 'left'                 : [ Property, typeLenPerc ]
      , 'font-size'            : [ Property, typeLenPerc ]
      , 'text-indent'          : [ Property, typeLenPerc ]
      , 'word-spacing'         : [ Property, typeLenPerc ]
      , 'width'                : [ Property, typeLenPerc ]
      , 'min-width'            : [ Property, typeLenPerc ]
      , 'max-width'            : [ Property, typeLenPerc ]
      , 'height'               : [ Property, typeLenPerc ]
      , 'min-height'           : [ Property, typeLenPerc ]
      , 'max-height'           : [ Property, typeLenPerc ]
      , 'line-height'          : [ Property, typeFancyLad ]
      , 'transform'            : [ Transform ]
      // , 'background-position'  : [ Property, typeLenPerc ]
      // , 'transform-origin'     : [ Property, typeLenPerc ]
    };
  }());
  
  // --------------------------------------------------
  // Utils
  
  function noop() {}
  
  function typeWarning(exp, val) {
    warn('Type warning: Expected: [' + exp + '] Got: [' + typeof val + '] ' + val);
  }
  
  function unitWarning(name, from, to) {
    warn('Units do not match [' + name + ']: ' + from + ', ' + to);
  }
  
  // Log warning message if supported
  var warn = (function () {
    var warn = 'warn';
    var console = window.console;
    if (console && console[warn]) return function (msg) { console[warn](msg); };
    return noop;
  }());
  
  // Faux-bind helper (single arg to help performance)
  function proxy(context, method) {
    return function(arg) {
      return method.call(context, arg);
    };
  }
  
  // Convert rgb and short hex to long hex
  function toHex(c) {
    var m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);
    return (m ? rgb(m[1], m[2], m[3]) : c)
      .replace(/#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3');
  }
  
  function rgb(r, g, b) {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }
  
  // Lo-Dash compact()
  // MIT license <http://lodash.com/license>
  // Creates an array with all falsey values of `array` removed
  function compact(array) {
    var index = -1,
        length = array ? array.length : 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result.push(value);
      }
    }
    return result;
  }
  
  // --------------------------------------------------
  // Export public module.
  return $.tram = tram;
