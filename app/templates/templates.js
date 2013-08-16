(function(){
var jade = {};

/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

jade.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

jade.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + jade.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + jade.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

jade.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

jade.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


this["JST"] = this["JST"] || {};

this["JST"]['app/templates/footer.jade'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="container"><hr/><p class="muted credit">&copy; Mark Industries</p></div>');
}
return buf.join("");
};

this["JST"]['app/templates/header.jade'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container"><a data-toggle="collapse" data-target=".nav-collapse" class="btn btn-navbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a><a href="#" class="brand">Growth App</a><div class="nav-collapse collapse"><ul class="nav"><li class="active"><a href="#">Home</a></li><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li></ul></div></div></div></div>');
}
return buf.join("");
};

this["JST"]['app/templates/main-layout.jade'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="wrap"><div class="container"><nav id="header"></nav><div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container"><a data-toggle="collapse" data-target=".nav-collapse" class="btn btn-navbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a><a href="#" class="brand">Growth App</a><div class="nav-collapse collapse"><ul class="nav"><li class="active"><a href="#">Home</a></li><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li></ul></div></div></div></div><div id="main"></div></div></div><div id="footer"><div class="container"><hr/><p class="muted credit">&copy; Mark Industries</p></div></div>');
}
return buf.join("");
};

this["JST"]['app/templates/notdoing/item.jade'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="item-tools-left"></div><div class="item-tools-right"></div><div class="item-content"><div class="title ellipsis">' + escape((interp = model.get('title')) == null ? '' : interp) + '</div><div class="text">' + ((interp = model.get('description')) == null ? '' : interp) + '</div></div>');
}
return buf.join("");
};

this["JST"]['app/templates/notdoing/main.jade'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h1 style="text-align:center">Not Doing List</h1><div class="row"><div class="span4"><div class="box column notdoing"><div class="box-header"><span class="icon"><i class="icon-file"></i></span><span class="title">Not Doing</span><ul class="box-toolbar"><li><i id="add-item-modal" class="icon-plus"></i></li></ul></div><div class="box-content scrollable"><ul class="items"></ul></div></div></div><div class="span4"><div class="box"><div class="box-header"><span class="icon"><i class="icon-file"></i></span><span class="title">Doing</span><ul class="box-toolbar"></ul></div><div class="box-content scrollable"><ul class="items"></ul></div></div></div><div class="span4"><div class="box"><div class="box-header"><span class="icon"><i class="icon-file"></i></span><span class="title">Done</span><ul class="box-toolbar"></ul></div><div class="box-content scrollable"><ul class="items"></ul></div></div></div></div><div id="add-modal" tabindex="-1" role="dialog" aria-labelledby="add-modal-label" aria-hidden="true" class="modal hide fade"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h3 id="add-modal-label">Add Item</h3></div><div class="modal-body"><div class="text-error hidden"></div><form><input type="text" placeholder="Title" class="title span5"/><input type="text" placeholder="Goal" class="goal span5"/><div data-role="editor-toolbar" data-target="#editor" class="btn-toolbar"><div class="btn-group"><a data-edit="bold" class="btn"><i class="icon-bold"></i></a><a data-edit="italic" class="btn"><i class="icon-italic"></i></a><a data-edit="underline" class="btn"><i class="icon-underline"></i></a></div><div class="btn-group"><a data-edit="insertunorderedlist" data-original-title="Bullet list" class="btn"><i class="icon-list-ul"></i></a><a data-edit="insertorderedlist" class="btn"><i class="icon-list-ol"></i></a><a data-edit="indent" class="btn"><i class="icon-indent-right"></i></a><a data-edit="outdent" class="btn"><i class="icon-indent-left"></i></a></div><div class="btn-group"><a data-edit="justifyleft" class="btn"><i class="icon-align-left"></i></a><a data-edit="justifycenter" class="btn"><i class="icon-align-center"></i></a><a data-edit="justifyright" class="btn"><i class="icon-align-right"></i></a><a data-edit="justifyfull" class="btn"><i class="icon-align-justify"></i></a></div></div><div class="editor description"></div></form></div><div class="modal-footer"><button data-dismiss="modal" aria-hidden="true" class="btn">Close</button><button id="add-item" class="btn btn-primary">Add Item</button></div></div><div id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="edit-modal-label" aria-hidden="true" class="modal hide fade"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h3 id="edit-modal-label">Edit Item</h3></div><div class="modal-body"><div class="text-error hidden"></div><form><input type="text" placeholder="Title" class="title span5"/><input type="text" placeholder="Goal" class="goal span5"/><div data-role="editor-toolbar" data-target="#editor" class="btn-toolbar"><div class="btn-group"><a data-edit="bold" class="btn"><i class="icon-bold"></i></a><a data-edit="italic" class="btn"><i class="icon-italic"></i></a><a data-edit="underline" class="btn"><i class="icon-underline"></i></a></div><div class="btn-group"><a data-edit="insertunorderedlist" data-original-title="Bullet list" class="btn"><i class="icon-list-ul"></i></a><a data-edit="insertorderedlist" class="btn"><i class="icon-list-ol"></i></a><a data-edit="indent" class="btn"><i class="icon-indent-right"></i></a><a data-edit="outdent" class="btn"><i class="icon-indent-left"></i></a></div><div class="btn-group"><a data-edit="justifyleft" class="btn"><i class="icon-align-left"></i></a><a data-edit="justifycenter" class="btn"><i class="icon-align-center"></i></a><a data-edit="justifyright" class="btn"><i class="icon-align-right"></i></a><a data-edit="justifyfull" class="btn"><i class="icon-align-justify"></i></a></div></div><div class="editor description"></div></form></div><div class="modal-footer"><button data-dismiss="modal" aria-hidden="true" class="btn">Close</button><button class="move-item btn btn-success">Move Item</button><button id="delete-item" class="btn btn-danger">Delete Item</button><button id="save-item" class="btn btn-primary">Save Item</button></div></div>');
}
return buf.join("");
};
}).call(this);