(function(){
this["JST"] = this["JST"] || {};

this["JST"]['app/templates/main-layout.jade'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h1>MAIN LAYOUT</h1><div id="main"></div>');
}
return buf.join("");
};

this["JST"]['app/templates/notdoing/item.jade'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="item span4"><div class="title span3"><strong>' + escape((interp = model.get('title')) == null ? '' : interp) + '</strong></div><button class="btn edit-item"><i class="icon-edit"></i></button><button class="btn delete-item"><i class="icon-trash"></i></button></div>');
}
return buf.join("");
};

this["JST"]['app/templates/notdoing/main.jade'] = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row"><div class="span4 column1"><h2>Not Doing<span><i id="add-item-modal" class="icon-plus"></i></span></h2><ul class="unstyled"></ul></div><div class="span4 column2"><h2>Doing</h2><ul class="unstyled"></ul></div><div class="span4 column3"><h2>Done</h2><ul class="unstyled"></ul></div></div><div id="add-modal" tabindex="-1" role="dialog" aria-labelledby="add-modal-label" aria-hidden="true" class="modal hide fade"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h3 id="add-modal-label">Add Item</h3></div><div class="modal-body"><form><input type="text" placeholder="Title" class="title span5"/><textarea rows="3" placeholder="Description" class="description span5"></textarea></form></div><div class="modal-footer"><button data-dismiss="modal" aria-hidden="true" class="btn">Close</button><button id="add-item" class="btn btn-primary">Add Item</button></div></div><div id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="edit-modal-label" aria-hidden="true" class="modal hide fade"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h3 id="edit-modal-label">Add Item</h3></div><div class="modal-body"><form><input type="text" placeholder="Title" class="title span5"/><textarea rows="3" placeholder="Description" class="description span5"></textarea></form></div><div class="modal-footer"><button data-dismiss="modal" aria-hidden="true" class="btn">Close</button><button id="save-item" class="btn btn-primary">Add Item</button></div></div>');
}
return buf.join("");
};
}).call(this);