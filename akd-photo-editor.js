;(function (_global){
	'use strict';
	
	let rPath = /.*(\/|\\)/, rcomma = /,/,rspace = /\s/g, rhash = /#.*$/,
	rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, 
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,// #7653, #8125, #8152: local protocol detection
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	$gi = 0, // global incrementor
	$akid = 0, // amalkong id
	$i = 0, // function/method incrementor
	
	hasWindow = ('undefined' !== typeof window), 
	hasDocument = ('undefined' !== typeof document), 
	$_clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';
	
	function d(t) {return Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}
	const inArray = (needle, arr) => {
		if((typeof arr == 'undefined') || !arr.length || !arr.push) return false;
		for(var i = 0; i < arr.length; i++) if(arr[i] == needle) return true;
		// Native
		//return arr.indexOf(needle) > -1;
		// ES6-way
		//return arr.includes(needle);
		return false;
	}
	const isArray = (t) => Array.isArray(t) || "array" === d(t);
	const isClass = (t) => "function" === d(t) && /^\s*class\s+/.test(t.toString());
	const isDocument = (obj) => {return obj === document && obj.nodeType === 9;}
	const isEmptyObject = (t) => !t || 0 === Object.keys(t).length && t.constructor === Object;
	const isElement = (obj) => {return (typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string");}
	const isFunction = (t) => "function" === d(t) || Object.prototype.toString.call(t) === '[object GeneratorFunction]';
	const isImage = (url) => {return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url) || (('src' in url) ? (/\.(jpe?g|gif|png)$/.test(url.src) || /^data:image\/.+;base64/.test(url.src)) : false);}
	const isNumber = (val) => {return typeof( val ) === 'number' && val === val;}
	const isNumeric = ( obj ) => {var realStringObj = obj && obj.toString();return isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;}
	//function isNumeric(n) {return !isNaN(parseFloat(n)) && isFinite(n);}
	const isObject = (obj) => {return obj === Object(obj);}
	//const isPlainObject = (val) =>  !!val && typeof(val) === 'object' && val.constructor === Object;
	function isPlainObject(obj) {
		if (typeof(obj) !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {return false;}
		if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {return false;}
		return true;
	}
	const isString = (val) => typeof(val) === 'string';
	const isValidJSON = (str) => {try {JSON.parse(str);return true;} catch (e) {return false;}};
	const isVideoElement = (elem) => {return elem instanceof HTMLVideoElement;};
	const isWindow = ( obj ) => {var toString = Object.prototype.toString.call(obj);return toString == '[object global]' || toString == '[object Window]' || toString == '[object DOMWindow]' || (obj != null && obj === obj.window);};
	const returnFalse = () => {return false;}
	
	const extend2 = ( first, second ) => {"use strict";for( var prop in second ) {if( second.hasOwnProperty( prop ) ) {first[prop] = second[prop];}}return first;}	
	function extend(){
		var options, name, src, copy, copyIsArray, clone,target = arguments[ 0 ] || {},
		i = 1,length = arguments.length,deep = false;
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[ i ] || {};
			i++;
		}
		if ( typeof target !== "object" && !isFunction( target ) ) {
			target = {};
		}
		if ( i === length ) {
			target = this;
			i--;
		}
		for( ; i < length; i++ ) {
			if ( ( options = arguments[ i ] ) != null ) {
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
					if ( deep && copy && ( isPlainObject( copy ) || ( copyIsArray = isArray( copy ) ) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && isArray( src ) ? src : [];
						} else {
							clone = src && isPlainObject( src ) ? src : {};
						}
						// Never move original objects, clone them
						target[ name ] = _extendObj( deep, clone, copy );
						// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		return target;
	}
	function template(str, _params){
		var out,params ={};
		if(isString(params)){
			params.tmpl = _params;
		} else if(isPlainObject(_params)){
			params = _extendObj({},_params);
		} else if(isArray(_params)){
			params = this.zipObject(["tmpl","parser"], _params);
		}
		str = ( isFile(params.tmpl) || isUrl(params.tmpl) ) ? GET(params.tmpl).response() : isElement(params.tmpl) ? params.tmpl.innerHTML : isString(params.tmpl) && ( tmp = $one(params.tmpl) ) ? tmp.innerHTML : "";
		if(!("parser" in params) || ! isFunction(params.parser) ) params.parser = native_parser;
		out = params.parser(str);
		function native_parser(str){var fn = "var p=[]; p.push('" + str.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "',$1,'").split("<%").join("');").split("%>").join("p.push('") + "'); return p.join('');";return new Function("o", fn);};
		return out;
	}
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache(limit = null, ci = '') {
		let keys = [], selectedKey = {}, current = 0;
		function add(key, value) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			let newKey = {}, l = isNumber(limit) ? limit : (__akd.cacheLength || 5);
			newKey[key + ci] = value;//newKey[key + " "] = value;
			if (keys.push(newKey) > l) {
				// Only keep the most recent entries
				delete keys[keys.shift()];
			}
			
			//return (keys[ key + " " ] = value);
			return keys;
		}
		
		function cycle(nextPrev = 'next', callback){
			let length = keys.length;
			if(isNumber(nextPrev) && isObject(keys[nextPrev])){
				current = nextPrev;
				prev = (current - 1 + length) % length;
			} else {
				if(nextPrev === "next"){
					current = (current + 1) % length; // go to the next key, if it is the last key then go back to the first key
					prev = (current - 1 + length) % length; // go to the previous key if it is the first key go to the last key
				} else if(nextPrev === "prev"){
					prev = (current + 1) % length; // go to the next key, if it is the last key then go back to the first key
					current = (current - 1 + length) % length; // go to the previous key if it is the first key go to the last key
				}
			}
			
			selectedKey = keys[current];
			
			if(isFunction(callback)){
				callback.apply(null,[keys[current], current, prev])
			}
			
			return selectedKey;
		}
		function next(callback){
			let length = keys.length;
			current = (current + 1) <= length ? (current + 1) : (length - 1);
			selectedKey = keys[current];
			
			if(isFunction(callback)){
				callback.apply(null,[keys[current], current])
			}
			
			return selectedKey;
		}
		function prev(callback){
			let length = keys.length;
			current = (current - 1) >= 0 ? (current - 1) : 0;
			selectedKey = keys[current];
			
			if(isFunction(callback)){
				callback.apply(null,[keys[current], current])
			}
			
			return selectedKey;
		}
		return {add, next, prev, cycle, keys};
	}
	function $id(sel){return isElement(sel) ? sel : document.getElementById(sel);}
	//function $qs(sel, ctx){return isElement(sel) ? sel : isElement(ctx) ? ctx.querySelector(sel) : document.querySelector(sel);}
	function $qs(selector,context,whichOne){
		try{
			var theOne, elems;
			if(isString(selector)){
				elems = $qsa(selector,context);
				if(isString(whichOne) && whichOne === "first" &&  isArray(elems) ){whichOne =  0;} else if(isString(whichOne) && whichOne === "last" &&  isArray(elems) ) {whichOne = elems.length - 1;}
				theOne =  isElement(elems[whichOne]) ? elems[whichOne] : ( isElement(elems[0]) ? elems[0] : elems );
			} else if(isElement(selector)) {theOne = selector;}
			return theOne;
		} catch (e){console.error('$one error', e)}
	};
	function $qsa(sel, ctx) {
		let nodeList, list = [];
		if(isElement(sel) || isDocument(sel) || isWindow(sel)){
			list.push(sel);
		} else if(isArray(sel)){
			for(var i=0;i<sel.length;i++){
				let elems = isString(sel[i]) ? (isElement(ctx) ? ctx.querySelectorAll(sel[i]) : document.querySelectorAll(sel[i])) : null/* $qsa(sel[i], ctx) */;
				if(elems && elems.length > 0) list.push(...(Array?.from(elems)??Array.prototype.slice.call(elems)));
				if(isElement(sel[i]) || isDocument(sel[i]) || isWindow(sel[i])) list.push(sel[i]);
			}
		} else {
			nodeList = isElement(ctx) ? ctx.querySelectorAll(sel) : document.querySelectorAll(sel);
			if(nodeList && nodeList.length > 0) {list = Array?.from(nodeList)??Array.prototype.slice.call(nodeList);}
		}
		return list;
	}
	const str2DOMElement = (html, attrs) => {
		"use strict";
		var wrapMap = {
			option: [ 1, "<select multiple='multiple'>", "</select>" ],
			legend: [ 1, "<fieldset>", "</fieldset>" ],
			area: [ 1, "<map>", "</map>" ],
			param: [ 1, "<object>", "</object>" ],
			thead: [ 1, "<table>", "</table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
			body: [0, "", ""],
			_default: [ 1, "<div>", "</div>"  ]
		};
		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;
		var match = /<\s*\w.*?>/g.exec(html);
		var element = document.createElement('div');
		if(/></.test(html)){
			element.innerHTML = html;
			element = element.innerHTML;
		} else {
			if(match != null) {
				var tag = match[0].replace(/</g, '').replace(/>/g, '').split(' ')[0];
				if(tag.toLowerCase() === 'body') {
					var dom = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
					var body = document.createElement("body");
					// keeping the attributes
					element.innerHTML = html.replace(/<body/g, '<div').replace(/<\/body>/g, '</div>');
					var attributes = element.firstChild.attributes;
					body.innerHTML = html;
					for(var i=0; i<attributes.length; i++) {
						body.setAttribute(attributes[i].name, attributes[i].value);
					}
					return body;
				} else {
					var map = wrapMap[tag] || wrapMap._default, element;
					html = map[1] + html + map[2];
					element.innerHTML = html;
					// Descend through wrappers to the right content
					var j = map[0]+1;
					while(j--) {
						element = element.lastChild;
					}
				}
			} else {
				element.innerHTML = html;
				element = element.lastChild;
			}
		}
		if(attrs && isPlainObject(attrs) && isElement(element) ){
			Object.assign(element, attrs);
		}
		return element;
	};
	//Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
	const bind = (obj, fn, superOBJ) => {
		//return function () {return fn.apply(obj, arguments);};
		var fn = fn || this, args = Array.prototype.slice.call(arguments),
		object = args.shift();
		return function(){
			return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
		};
	}
	/**
	 * Make an HTML element
	 * @param  {Object} elem The element details
	 * @return {Node}        The HTML element
	 */
	const makeElem = (elem) => {
		if( !isPlainObject( elem ) ) return this;
		// Create the element
		// var node = elem.type === 'text' ? document.createTextNode(elem.content) : (elem.type === 'comment' ? document.createComment(elem.content) : document.createElement(elem.type));
		var node;
		if (elem.type === 'text') {
			node = document.createTextNode(elem.content);
		} else if (elem.type === 'comment') {
			node = document.createComment(elem.content);
		} else if (elem.isSVG || elem.type.toLowerCase() === 'svg') {
			node = document.createElementNS('http://www.w3.org/2000/svg', elem.type);
		} else {
			node = document.createElement(elem.type);
		}
		// Add attributes
		if( elem.atts && isPlainObject(elem.attrs) ) Object.assign(node, elem.attrs);
		// If the element has child nodes, create them
		// Otherwise, add textContent
		if (elem.children.length > 0) {
			elem.children.forEach((function (childElem) {
				node.appendChild(makeElem(childElem));
			}));
		} else if (elem.type !== 'text' && elem.content) {
			node.textContent = elem.content;
		}
		return node;
	};
	
	//const $ = {};
	const $ = function(selector, context, extra){
		if(!(this instanceof $)) return  new $(selector, context, extra);
		this.selector = selector;
		this.context = context;
		this.nodes = [];
		switch(this.selector[0]) {
			case '<':
			if(rsingleTag.test( this.selector ) ) {
				//m = rsingleTag.exec(this.selector);
				//alert("single tag found "+m[0]+"-"+m[1]+"-"+m[2]);
				this[ 0 ] = this.nodes = [ str2DOMElement(this.selector) ];
				this.length = 1;
			} else {
				var matches = this.selector.match("/<([\w-]*)>/");
				if (matches === null || matches === undefined) {
					let range = document.createRange(), parse = range.createContextualFragment.bind(range);
					this[ 0 ] = this.nodes = parse(this.selector);
					this.length = 1;
					console.log(this.nodes.length)
					//throw "Invalid Selector or Node";
					//return false;
				} else {
					var nodeName = matches[0].replace('<', '').replace('>','');
					nCfg = {type : nodeName, isSVG : nodeName.toLowerCase() === "svg", attrs : (isPlainObject(this.context) ? this.context : {}), content : null};
					this[ 0 ] = this.nodes = [  makeElem(nodeName, nCfg) ];
					this.length = 1;
				}
			}
			break;
			default:
			if(this.selector === 'document' || this.selector === 'window' || isDocument(this.selector) || isWindow(this.selector)) {
				this[ 0 ] = this.nodes = [this.selector];
				this.context = null;
			} else {
				this.all(this.selector, this.context, null, this, false);
			}
			this.length = this.nodes.length ? this.nodes.length : 0;
		}
		
		return this;
	}
	//$.nodes = [];
	$.event = {
		global: {}, 
		special: {}, 
		events: []
	};
	$.camelize = (stringToCamelize) => {if (String(stringToCamelize).indexOf('-') == -1){return stringToCamelize;}var oStringList = String(stringToCamelize).split('-');var isFirstEntry = true;var camelizedString = '';for(var i=0; i < oStringList.length; i++){if(oStringList[i].length>0){if(isFirstEntry){camelizedString = oStringList[i];isFirstEntry = false;} else {var s = oStringList[i];camelizedString += s.charAt(0).toUpperCase() + s.substring(1);}}}return camelizedString;};
	$.uid = () => {let _uid = Math.random();return String(_uid++).replace('.','').replace('-','');}
	$.guid = $.uid();
	$._has = function(obj, key) {return Object.prototype.hasOwnProperty.call(obj, key);}
	$.reset = (sel) => $.nodes = [];
	$.id = (sel) => $id(sel);
	//$.id = (sel) => $.reset(), $.nodes.push($id(sel)) && $.nodes.filter(e=> isElement(e) === true)[0];
	
	/**
	 * get single element
	 * @public
	 */
	//$.one = (sel, ctx) => $.reset(), $.nodes.push($qs(sel, ctx)) && $.nodes.filter(e=> isElement(e) === true)[0];
	$.one = (sel, ctx) => $qs(sel, ctx);
	
	/**
	 * get multiple elements
	 * @public
	 */
	//$.all = (sel, ctx) => $.reset(), $.nodes.push(...$qsa(sel, ctx)) && $.nodes.filter(e=> isElement(e) === true);
	$.all = (sel, ctx) => $qsa(sel, ctx);
	/**
	 * bind an event to element(s)
	 * @public
	 * @param  array    $el      element object or array
	 * @param  string    eventType  name of the event
	 * @param  function  fn
	 * @param  boolean    useCapture
	 */
	$.on = function( elem, types, selector, data, fn, one, useCapture){
		var origFn, type;
		// Types can be a map of types/handlers
		if(typeof types !== "function" && typeof types === "object") {
			// ( types-Object, selector, data )
			if (typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for(type in types) {
				$.on(elem, type, selector, data, types[ type ], one, useCapture);
			}
			return elem;
		}
		
		if(data == null && fn == null) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		
		if(fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}
		
		if(one === 1) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				$.off(event);
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = $.guid++ );
		}
		
		if (useCapture === undefined) {
			useCapture = false;
		}
		if (!isArray(elem)) {
			elem = [elem];
		}
		
		if(selector){
			$.delegate(elem, types, selector, fn, data, useCapture);
		} else {
			let evtArr = (rspace.test(types) || types.indexOf(' ') >= 0) ? types.split(" ") : rcomma.test(types) ? types.split(",") : null;
			if(/*isString( types ) && */isArray(evtArr) && evtArr.length > 1 ){
				let x = 0,total = evtArr.length;
				for(;x<total;x++){
					for(let i=0;i<elem.length;i++){
						if(isElement(elem[i])) elem[i].addEventListener(evtArr[x], fn, useCapture);
					}
				}
			} else {
				for(let i=0;i<elem.length;i++){
					/* if(selector){
						elem[i].addEventListener(types, function(e) {
							for(let target = e.target; target && target != this; target = target.parentNode) {
								if(target.matches(selector)) {
									fn.call(target, e);
									break;
								}
							}
						}, useCapture);
					} else  */
					if(isElement(elem[i])) elem[i].addEventListener(types, fn, useCapture);
				}
			}
		}
		
		return this;
	}
	$.off = function(elem, evt, fn){
		if(elem && !isArray(elem)) {
			elem = [elem];
		}
		for(let i = 0;i<elem.length;i++){
			if(isElement(elem[i])){
				elem[i].removeEventListener(evt, fn);
			}
		}
		return this;
	}
	/**
	 * delegate an event to a parent element
	 * @public
	 * @param  array     $el        parent element
	 * @param  string    eventType  name of the event
	 * @param  string    selector   target's selector
	 * @param  function  fn
	 */
	$.delegate = function(el, evt, sel, cb, data, capture){
		el = isDocument(el) || isWindow(el) ? el : $.all(el);
		if(!el){return this;}
		
		const addEvent = function($el, eventType, selector, fn, $data, $capture){
			$el.addEventListener(eventType, function(e){
				let targets = $.all(selector, $el);
				if(!targets){
					return;
				}
				findTarget:
				for(let i=0; i<targets.length; i++){
					let $node = e.target;
					while($node){
						if($node == targets[i]){
							fn.call($node, e);
							break findTarget;
						}
						$node = $node.parentNode;
						if($node == $el){
							break;
						}
					}
				}
			}, $capture || false);
		}
		
		let evtArr = (rspace.test(evt) || evt.indexOf(' ') >= 0) ? evt.split(" ") : rcomma.test(evt) ? evt.split(",") : null;
		if(/*isString( evt ) && */isArray(evtArr) && evtArr.length > 1 ){
			let x = 0,total = evtArr.length;
			for(;x<total;x++){
				if(isArray(el)){
					for(let i=0;i<el.length;i++){
						addEvent(el[i], evtArr[x], sel, cb, data, capture);
					}
				} else addEvent(el, evtArr[x], sel, cb, data, capture);
			}
		} else {
			if(isArray(el)){
				for(let i=0;i<el.length;i++){
					addEvent(el[i], evt, sel, cb, data, capture);
				}
			} else addEvent(el, evt, sel, cb, data, capture);
		}
		
		return this;
	};
	$.elementStyle = (strOrEle) => {var element = isElement(strOrEle) ? strOrEle : isString(strOrEle) ? $one(strOrEle) : null;return (!element) ? null :(window.getComputedStyle ? window.getComputedStyle(element,null) : (element.currentStyle ? element.currentStyle : document.defaultView.getComputedStyle(element, null)));};
	$.addClass = function(elems, className) {
		if(arguments.length === 1){
			className =  elems;
			elems = this.nodes;
			//console.log(elem, elems)
	    }
		
		if(elems && isString(className)) {
	    	let _this = this, classNames = rcomma.test(className) ? className.split(",") : (rspace.test(className) || className.indexOf(' ') >= 0 ? className.split(' ') : null);
		    /* if(elems.length && elems.length > 0) {
	            for (var i = 0;i < elems.length; i++) {var el = elems[i];if(isElement(el) && !el.classList.contains(className)) el.classList.add(className);}
	        } else if (isElement(elems) && !elems.classList.contains(className)) elems.classList.add(className); */
	    
			if(isArray(elems) ){
				elems.forEach(function (elem){
					//if (!elem || !className || (elem.className && elem.className.search(new RegExp("\\b" + className + "\\b")) != -1))
					if(isString(elem)) {
						elem = $all(elem)
						$.addClass(elem, className)
					}
					if(classNames && isArray(classNames) && classNames.length >= 2){
						for(let x =0;x<classNames.length;x++){
							let cName = classNames[x]?.trim();
							if(cName !== "" && isElement(elem) && /* !hasClass(elem, cName) */ !elem.classList.contains(cName)){elem.classList.add(cName);}
						}
					} else if (isElement(elem) && /* !hasClass(elem, className) */!elem.classList.contains(className)) {elem.classList ? elem.classList.add(className) : elem.className += (elem.className ? " " : "") + className;}
				});
			} else {
				if(classNames && isArray(classNames) && classNames.length >= 2){
					for(let x =0;x<classNames.length;x++){
						let cName = classNames[x]?.trim();
						if(cName !== "" && /* !hasClass(elem, cName) */ !elems.classList.contains(cName)){elems.classList.add(cName);}
					}
				} else if(/* !hasClass(elems, className) */!elems.classList.contains(className)) elems.classList ? elems.classList.add(className) : elems.className += (elems.className ? " " : "") + className;
			}
		}
		return this;
	}
		
	$.removeClass = function(elems, className){
		if(arguments.length === 1){
			className = elems;//className = arguments[0];
			elems = this.nodes;
		} else elems = $.all(elems);
		/* if(isString(elems) || isElement(elems) || isArray(elems)) {
			this.nodes = isElement(elems) ? elems : $.all(elems);
		} */
		if(elems && isString(className)){
			/* if (elems.length && elems.length > 0) {
				for (var i = 0;i < elems.length; i++) {var el = elems[i];if(isElement(el) && el.classList.contains(className))el.classList.remove(className);}
			} else if (isElement(elems) && elems.classList.contains(className))elems.classList.remove(className); */
		
			let _this = this, classNames = rspace.test(className) ? className.split(" ") : rcomma.test(className) ? className.split(",") : null;
			if(isArray(elems)){
				elems.forEach(function (elem){
					if(isString(elem)) {
						elem = $.all(elem)
						$.removeClass(elem, className)
					}
					if(classNames && isArray(classNames) && classNames.length >= 2){
						for(let x =0;x<classNames.length;x++){
							let cName = classNames[x]?.trim();
							if(isString(cName) && cName !== "" && /* hasClass(elem, cName) */elem.classList.contains(cName)){
								if(elem.classList) elem.classList.remove(cName);
								//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
								else elem.className = elem.className.replace(new RegExp("(^|\\b)" + cName.split(" ").join("|") + "\\b|$", "gi"), " ");
							}
						}
					} else if(/* hasClass(elem, className) */ elem.classList.contains(className)){
						if(elem.classList) elem.classList.remove(className);
						//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
						else elem.className = elem.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "\\b|$", "gi"), " ");
					}
				});
			} else {
				if(classNames && isArray(classNames) && classNames.length >= 2){
					for(let x =0;x<classNames.length;x++){
						let cName = classNames[x]?.trim();
						if(isString(cName) && cName !== "" && /* hasClass(elems, cName) */elems.classList.contains(cName)){
							if(elems.classList) elems.classList.remove(cName);
							//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
							else elems.className = elems.className.replace(new RegExp("(^|\\b)" + cName.split(" ").join("|") + "\\b|$", "gi"), " ");
						}
					}
				} else if (/* hasClass(elems, className) */ elems.classList.contains(className)){
					if(elems.classList) elems.classList.remove(className);
					//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
					else elems.className = elems.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "\\b|$", "gi"), " ");
				}
			}
		}
		
		return this;
	};
	$.toggleClass = function(elem, className){
		if(arguments.length === 1){
			className =  elem; //className = arguments[0];
			elem = this.nodes;
			//elem = isArray(elem) || isElement(elem) ? elem : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem));
		}
		
		if(isString(className)){
			if(isArray(elem)){
				elem.forEach(function (el){
					if(isElement(el)){_toggleClass(el, className);}
				})
			} else if(isElement(elem)) {
				_toggleClass(elem, className)
			}
		}
		return this;
	}
	function _toggleClass(elem, className){
		//var classNames = rspace.test(className) || className.indexOf(' ') >= 0 ? className.split(" ") : rcomma.test(className) ? className.split(",") : null;
		let classNames = rcomma.test(className) ? className.split(",") : (rspace.test(className) || className.indexOf(' ') >= 0 ? className.split(" ") : null);
		try{
			if(classNames && isArray(classNames) && classNames.length >= 2){
				if(elem.classList){
					var cName1 = classNames[0].trim(), cName2 = classNames[1].trim();
					if(cName1 !== "" && cName2 !=="" ){
						if(!elem.classList.contains(cName1) && !elem.classList.contains(cName2)) elem.classList.add(cName1);
						if(elem.classList.contains(cName1)) {elem.classList.remove(cName1);elem.classList.add(cName2);}
						else if(elem.classList.contains(cName2)) {elem.classList.remove(cName2);elem.classList.add(cName1);}
					} else if(cName1 !== "" && !elem.classList.contains(cName1) ) elem.classList.toggle(cName1);
					else if(cName2 !=="" && !elem.classList.contains(cName2) ) elem.classList.toggle(cName2);
				} /* else {
					var i = 0, cs = "";
					for(;i<classNames.length;i++) cs += ` ${classNames[i]}`;
					elem.className += cs;
				}*/
			} else {
				if(elem.classList){
					elem.classList.toggle(className);
				} else {
					var classes = elem.className.split(' ');
					existingIndex = classes.indexOf(className);
					if(existingIndex >= 0){
						classes.splice(existingIndex,1);
					} else classes.push(className);
					elem.className = classes.join(' ');
				}
			}
		} catch (e){console.error(e)}
		
		return elem;
	};
	$.hasClass = function(className, ele){
		if(arguments.length === 1){
			className = ele; //className = arguments[0];
			//ele = isArray(ele) && ele.length > 0 ? ele[0] : (isElement(ele) ? ele : (this.nodes && this.nodes.length > 0 ? this.nodes[0] : $one(ele)));
			ele = this.nodes && this.nodes.length > 0 ? this.nodes[0] : this.nodes;
		}
		
		//ele = isObject(ele) ? ele : $one(ele);
		/* if (!ele || !className || !ele.className || ele.className.search(new RegExp("\\b" + className + "\\b")) == -1) return false;
		return true; */
		return ele.classList ? ele.classList.contains(className) : new RegExp('(^| )' + className + ' |$','gi').test(ele.className);
	}
	
	const tag$1 = function(tagName, attributes){
		//"use strict";return Object.assign(document.createElement(tagName),(attributes || {} ));
		var node, name;
		try{
			name = isString(tagName) ? tagName.replace('<','').replace('/>','').replace('>','') : tagName;
			
			/* if (name === 'text') {
				node = document.createTextNode(elem.content);
			} else if (elem.type === 'comment') {
				node = document.createComment(elem.content);
			} else */
			if (name.toLowerCase() === 'svg') {
				node = document.createElementNS('http://www.w3.org/2000/svg', name);
			} else {
				node = typeof(name) === "object" && isElement(name) ? name : document.createElement(name);
			}
			
			//if(attributes && isPlainObject(attributes)){
			if(attributes && isObject(attributes)){
				// Object.assign(node, attributes);
				for(const prop in attributes) {
					if(attributes.hasOwnProperty(prop) && (isFunction(attributes[prop]) || inArray(prop, ["innerHTML", "textContent"]))) {
						node[prop] = attributes[prop]
					} else {
						if(attributes.hasOwnProperty(prop) && !inArray(prop, ["style","data","dataset"])) node.setAttribute(prop, attributes[prop]);
						else {
							let value = attributes[prop];
							if(prop === "class") node.className = value;
							else if (prop === "checked") node.defaultChecked = value;
							else if (prop === "for") node.htmlFor = value;
							else if (prop === "style") {
								let styles = attributes[prop];
								typeof(styles) === "object" ? Object.assign(node.style, styles) : node.style.cssText += styles;
							}
							else if (prop === "dataset" && typeof(attributes[prop]) === "object") {
								let props = attributes[prop], newObj = {};
								for(const x in props) {
									let camelizedName = $.camelize(x);
									node.dataset[camelizedName] = props[x];
									//Object.assign(node.dataset, newObj);
								}
							}
							//else node.setAttribute(attribute, value)
						}
					}
				}
			}
			for(let i = 2; i < arguments.length; i++){
				let child = arguments[i];
				if(child){
					if(typeof child == "string") child = document.createTextNode(child);
					/* if (typeof child == "string") {child = document.createTextNode(child);frag = document.createDocumentFragment();frag.appendChild(child);child = frag;frag = null;} */
					node.appendChild(child);
				}
			}
			
		} catch(e){
			//console.error(e.stack?e.stack:e);
			console.error(e);
		}
		
		return node;
	}
	
	$.tag = function(tagName, attributes){
		//const node = tag$1(tagName, attributes);
		const node = tag$1.apply(null, [...arguments]);
		return node;
	}
	$.setNodeAttribute = function setNodeAttribute(node, attributes, value){
		const nodes = isElement(node) ? [node] : isArray(node) ? node : $.all(node);
		
		nodes.forEach(node => {
			//if(attributes && isPlainObject(attributes)){
			if(attributes && isObject(attributes)){
				// Object.assign(node, attributes);
				for(const prop in attributes) {
					if(attributes.hasOwnProperty(prop) && (isFunction(attributes[prop]) || inArray(prop, ["innerHTML", "textContent"]))) {
						node[prop] = attributes[prop]
					} else {
						if(attributes.hasOwnProperty(prop) && !inArray(prop, ["style","data","dataset"])) node.setAttribute(prop, attributes[prop]);
						else {
							let value = attributes[prop];
							if(prop === "class") node.className = value;
							else if (prop === "checked") node.defaultChecked = value;
							else if (prop === "for") node.htmlFor = value;
							else if (prop === "style") {
								let styles = attributes[prop];
								typeof(styles) === "object" ? Object.assign(node.style, styles) : node.style.cssText += styles;
							} else if (prop === "dataset" && typeof(attributes[prop]) === "object") {
								let props = attributes[prop], newObj = {};
								for(const x in props) {
									let camelizedName = $.camelize(x);
									node.dataset[camelizedName] = props[x];
									//Object.assign(node.dataset, newObj);
								}
							}
							//else node.setAttribute(attribute, value)
						}
					}
				}
			} else if(isArray(attributes)){
				attributes.forEach((attr) => {
					setNodeAttribute(node, attr, value);
				})
			} else if(isString(attributes) && value){
				node[attributes] = value;
			}
		});
		
		return this;
		//return this.chaining === true ? this : nodes;
	}
	/* $.styleElement = (elem, styles) => {
		var _this = this;
		elem = elem || this.nodes;
		if(elem && (isPlainObject(styles) || isString(styles)) ) {
			if(isArrayLike(elem) || isArray(elem)) {
				for(var i = 0;i<elem.length;i++){
					if( isElement(elem[i]) ){
						typeof(styles) === "object" ? Object.assign(elem[i].style, styles) : elem[i].style.cssText += styles;
					}
				}
			} else {
				if(isElement(elem)) typeof(styles) === "object" ? Object.assign(elem.style, styles) : elem.style.cssText += styles;
			}
			for (const [i, x] of Array.from(elem).entries()) {
				Object.assign(x.style, obj);
			} */
			/* if(isArrayLike(el) ||(el.length && el.length > 0)) {
				for(var i=0; i<el.length; i++){
					var elem = el[i];
					if(elem) for (var property in styles) elem.style[property] = styles[property];
				}
				//this.each(el,function(i){for (var property in styles) el[i].style[property] = styles[property]});
			} else {
				for (var property in styles) el.style[property] = styles[property];
			}
		}
		return this;
	}*/
	$.empty = (nodes) =>{
		var elem, i = 0,is_true = false;
		nodes = isArray(nodes) ? nodes : [nodes];
		for(; (elem = nodes[i]) != null; i++ ){
			// Remove element nodes and prevent memory leaks
			if(isElement(elem)){
				if(elem.nodeType === 1){
					elem.innerHTML = "";
					elem.textContent = "";
				}
				// Remove any remaining nodes
				while( elem.firstChild ) {
					elem.removeChild( elem.firstChild );
					is_true = true;
				}
				// If this is a select, ensure that it displays empty (#12336)
				// Support: IE<9
				if ( elem.options && elem.nodeName === "select" ) {
					elem.options.length = 0;
				}
			}
		}
		return is_true;
	}
	/**
	* Convert array-like or iterable object to an array.
	* @param {*} value - The value to convert.
	* @returns {Array} Returns a new array.
	*/
	$.toArray = function(value) {return Array.from ? Array.from(value) : slice.call(value);}
	/* function toArray(obj, offset) {
		var args = [];
		// This is necessary for IE8
		if (isNumber(offset)) {
			args.push(offset);
		}

		return args.slice.apply(obj, args);
	} */
	/**
	* Iterate the given data.
	* @param {*} data - The data to iterate.
	* @param {Function} callback - The process function for each element.
	* @returns {*} The original data.
	*/
	$.forEach = function(data, callback) {
		if(data && isFunction(callback)) {
			if (isArray(data) || isNumber(data.length) /* array-like */) {
				$.toArray(data).forEach(function (value, key) {
					callback.call(data, value, key, data);
				});
			} else if (isObject(data)) {
				Object.keys(data).forEach(function (key) {
					callback.call(data, data[key], key, data);
				});
			}
		}
		return data;
	}
	/**
	 * Creates a tag element, appends the specified child element to it and
	 * then appends the created tag to the child's parent element.
	 * @param {HTMLElement} child The child element to be contained in a new
	 * wrapper element.
	 * @param {string} Optional: The name of the tag element to create.
	 * @returns HTMLElement The newly created tag element wrapped around child.
	 */
	function wrap(child, tag) {
		if (!tag) tag = "div";
		const parent = child.parentElement;
		const elm = document.createElement("" + tag); // ensures that 'tag' is really a string
		elm.appendChild(child);
		parent.appendChild(elm);
		return elm;
	}
	/*
	<input type="text" id="textInput"/>
	-------
	In jQuery:
	-------
	$('#textInput').wrap('<div class="wrapped-input"></div>');
	In JS:
	-------
	wrap(document.getElementById('textInput')).setAttribute('class', 'wrapped-input');
	*/

	/*
	 * Wrap wrapper around nodes
	 * Just pass a collection of nodes, and a wrapper element
	*/
	function wrapAll(nodes, wrapper) {
		// Cache the current parent and previous sibling of the first node.
		var parent = nodes[0].parentNode;
		var previousSibling = nodes[0].previousSibling;

		// Place each node in wrapper.
		//  - If nodes is an array, we must increment the index we grab from 
		//    after each loop.
		//  - If nodes is a NodeList, each node is automatically removed from 
		//    the NodeList when it is removed from its parent with appendChild.
		for (var i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
			wrapper.appendChild(nodes[i]);
		}

		// Place the wrapper just after the cached previousSibling,
		// or if that is null, just before the first child.
		var nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
		parent.insertBefore(wrapper, nextSibling);

		return wrapper;
	}
		// Wrap an HTMLElement around each element in an HTMLElement array.
	$.wrap = function($this, elms) {
		// Convert `elms` to an array, if necessary.
		if (!elms.length) elms = [elms];

		// Loops backwards to prevent having to clone the wrapper on the
		// first element (see `child` below).
		for (var i = elms.length - 1; i >= 0; i--) {
			var child = (i > 0) ? $this.cloneNode(true) : $this;
			var el    = elms[i];

			// Cache the current parent and sibling.
			var parent  = el.parentNode;
			var sibling = el.nextSibling;

			// Wrap the element (is automatically removed from its current
			// parent).
			child.appendChild(el);

			// If the element had a sibling, insert the wrapper before
			// the sibling to maintain the HTML structure; otherwise, just
			// append it to the parent.
			if (sibling) {
				parent.insertBefore(child, sibling);
			} else {
				parent.appendChild(child);
			}
		}
	};

	// Wrap an HTMLElement around another HTMLElement or an array of them.
	$.wrapAll = function($this, elms) {
		var el = elms.length ? elms[0] : elms;

		// Cache the current parent and sibling of the first element.
		var parent  = el.parentNode;
		var sibling = el.nextSibling;

		// Wrap the first element (is automatically removed from its
		// current parent).
		$this.appendChild(el);

		// Wrap all other elements (if applicable). Each element is
		// automatically removed from its current parent and from the elms
		// array.
		while (elms.length) {
			$this.appendChild(elms[0]);
		}

		// If the first element had a sibling, insert the wrapper before the
		// sibling to maintain the HTML structure; otherwise, just append it
		// to the parent.
		if (sibling) {
			parent.insertBefore($this, sibling);
		} else {
			parent.appendChild($this);
		}
	};
	
    // jQuery
    $.siblings = function(el){
		// Native - latest, Edge13+
		const _sibling = [...el.parentNode.children].filter(child => child !== el);
		// Native (alternative) - latest, Edge13+
		//const _sibling = Array.from(el.parentNode.children).filter(child => child !== el);
		// Native - IE10+
		//const _sibling = Array.prototype.filter.call(el.parentNode.children, child => child !== el);
		
		return _sibling;
	}
	$.contents = function(t){
		/* const iframe = $.one(t)
		// Native
		return iframe.contentDocument; */
		const x = $.one(t);
		const y = x.contentWindow || x.contentDocument;
		const z = y.document ? y.document : y;
		//alert(z.body.innerHTML);
		return z;
	}
	// let iframe = $.tag('iframe',{'src': './image.html'/* 'http://localhost/www/index.html' */});
	// document.body.appendChild(iframe);
	// iframe.onload = (e) => {
		// let contents = $.contents(iframe);
		// console.log(contents.body.innerHTML)
		// console.log(/* contains('h4','Editor'), */ iframe, e)
		// console.log(contents.body.querySelector('.main').innerHTML)
	// }
	
	// console.log($(`<ol>
    // <li>a</li>
    // <li>b</li>
  // </ol>
  // <ol>
    // <li>c</li>
    // <li>d</li>
  // </ol>`));
	//Selector containing string (case-sensitive)
    // jQuery
    //$("selector:contains('text')");
    // Native
    function contains(selector, text) {
      var elements = document.querySelectorAll(selector);
      return Array.from(elements).filter(function(element) {
        return RegExp(text).test(element.textContent);
      });
    }
	
	$.getHeight = function (el){
		let _height = 0;
		// window height
		if(isWindow(el)){
			// without scrollbar, behaves like jQuery
			_height = el.document.documentElement.clientHeight;
			// with scrollbar
			_height = el.innerHeight;
		}
		// Document height
		if(isDocument(el)){
			const body = document.body;
			const html = document.documentElement;
			_height = Math.max(
				body.offsetHeight, body.scrollHeight,
				html.clientHeight,
				html.offsetHeight, html.scrollHeight
			);
		}
		// Element height
		if(isElement(el)){
			const styles = window.getComputedStyle(el);
			const height = el.offsetHeight;
			const borderTopWidth = parseFloat(styles.borderTopWidth);
			const borderBottomWidth = parseFloat(styles.borderBottomWidth);
			const paddingTop = parseFloat(styles.paddingTop);
			const paddingBottom = parseFloat(styles.paddingBottom);
			//_height = height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
			
			// accurate to integer（when `border-box`, it's `height - border`; when `content-box`, it's `height + padding`）
			//_height = el.clientHeight;

			// accurate to decimal（when `border-box`, it's `height`; when `content-box`, it's `height + padding + border`）
			_height = el.getBoundingClientRect().height;
		}
		
		return _height;
	}
	$.getWidth = function(el) {
		let _width = 0;
		// window Width
		if(isWindow(el)){
			// without scrollbar, behaves like jQuery
			_width = el.document.documentElement.clientWidth;
			// with scrollbar
			_width = el.innerWidth;
		}
		// Document Width
		if(isDocument(el)){
			const body = document.body;
			const html = document.documentElement;
			_width = Math.max(
				body.offsetWidth, body.scrollWidth,
				html.clientWidth,
				html.offsetWidth, html.scrollWidth
			);
		}
		// Element Width
		if(isElement(el)){
			const styles = window.getComputedStyle(el);
			const width = el.offsetWidth;
			const borderLeftWidth = parseFloat(styles.borderLeftWidth);
			const borderRightWidth = parseFloat(styles.borderRightWidth);
			const paddingLeft = parseFloat(styles.paddingLeft);
			const paddingRight = parseFloat(styles.paddingRight);
			//_width = width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
			
			// accurate to integer（when `border-box`, it's `width - border`; when `content-box`, it's `width + padding`）
			//_width = el.clientWidth;

			// accurate to decimal（when `border-box`, it's `width`; when `content-box`, it's `width + padding + border`）
			_width = el.getBoundingClientRect().width;
		}
		
		return _width;
	}
    
	//Get the current coordinates of the element relative to the offset parent.
    // jQuery
    $.position = (el) => isElement(el) && {left: el.offsetLeft, top: el.offsetTop};
	
    //Get the current coordinates of the element relative to the document.
    // jQuery
	$.offset = function getOffset (el) {
		const box = el.getBoundingClientRect();
		return {
			top: box.top + window.pageYOffset - document.documentElement.clientTop,
			left: box.left + window.pageXOffset - document.documentElement.clientLeft
		};
    }
	$.type = function type(item) {const reTypeOf = /(?:^\[object\s(.*?)\]$)/;return Object.prototype.toString.call(item).replace(reTypeOf, '$1').toLowerCase();}
	$.ready = function(eventHandler) {
		if(!isFunction(eventHandler)) return this;
		if(document.readyState !== 'loading') {
			eventHandler();
		} else {
			document.addEventListener('DOMContentLoaded', eventHandler);
		}
	}
	// Set version, does remove duplicate items
	$.merge = function(...args) {return Array.from(new Set([].concat(...args)))}
	// Convert an array-like object into a true JavaScript array.
	$.makeArray = (arrayLike) => Array?.from(arrayLike) || Array.prototype.slice.call(arrayLike) || [...arrayLike];
	// jExecute some JavaScript code globally.
	$.globaleval = function Globaleval(code) {
		const script = document.createElement('script');
		script.text = code;

		document.head.appendChild(script).parentNode.removeChild(script);
	}
	// Use eval, but context of eval is current, context of $.Globaleval is global.
	// eval(code);
	
	// Parses a string into an array of DOM nodes.
	$.parseHTML = function parseHTML(string) {
		const context = document.implementation.createHTMLDocument();
		// Set the base href for the created document so any parsed elements with URLs
		// are based on the document's URL
		const base = context.createElement('base');
		base.href = document.location.href;
		context.head.appendChild(base);

		context.body.innerHTML = string;
		return context.body.children;
	}
	$._originalDisplay = '';
	$.toggle = (el) => {
		$._originalDisplay = el.ownerDocument.defaultView.getComputedStyle(el, null).display;
		if (el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none') {
			el.style.display = ''// 'flex' |'inline'|'inline-block'|'inline-table'|'block';
		} else {
			el.style.display = 'none';
		}
		return this;
	}
	
	$.fadeOut = function (el, ms) {
		if (ms) {
			el.style.transition = `opacity ${ms} ms`;
			el.addEventListener('transitionend', function(event) {el.style.display = 'none';}, false);
		}
		el.style.opacity = '0';
		return this;
	}
	
	$.fadeIn = function(el, ms){
		el.style.opacity = 0;
		if(ms) {
			let opacity = 0;
			const timer = setInterval(function() {
				opacity += 50 / ms;
				if (opacity >= 1) {
					clearInterval(timer);
					opacity = 1;
				}
				el.style.opacity = opacity;
			}, 50);
		} else {
			el.style.opacity = 1;
		}
		return this;
	}
	$.fx = {
		speeds: {'slow': 3000, 'fast': 750}
	}
	// Adjust the opacity of the element.
	$.fadeTo = (el, ms='slow', o= 0.15) => {
		ms = isNumber(ms) ? ms : $.fx.speeds[ms];
		o = o || 0.15;
		//el.style.transition = `opacity 3s`; // assume 'slow' equals 3 seconds
		el.style.transition = `opacity ${ms}ms`;
		el.style.opacity = `${o}`;
		return this;
	}
	// Display or hide the element by animating their opacity.
	$.fadeToggle = (el) => {
		el.style.transition = 'opacity 3s';
		const { opacity } = el.ownerDocument.defaultView.getComputedStyle(el, null);
		if (opacity === '1') {
			el.style.opacity = '0';
		} else {
			el.style.opacity = '1';
		}
		return this;
	}
	$.slideUp = (el) => {el.style.transition = 'height 3s';el.style.height = '0px';}
	$.slideDown = (el) => {const originHeight = '100';el.style.transition = 'height 3s';el.style.height = (el.scrollHeight || originHeight) + 'px';}
	
	// Display or hide the element with a sliding motion.
	$.slideToggle = (el) => {
		const originHeight = '100';
		el.style.transition = 'height 3s';
		const { height } = el.ownerDocument.defaultView.getComputedStyle(el, null);
		if (parseInt(height, 10) === 0) {
			el.style.height = (el.scrollHeight || originHeight) + 'px';
		} else {
			el.style.height = '0px';
		}
		return this;
	}
	//Load data from the server and place the returned HTML into the matched element.
	$.load = (selector, url, completeCallback) => {
		const self = this;
		fetch(url).then(data => data.text()).then(data => {
			$.one(selector).innerHTML = data
		}).then(completeCallback);
		
		return this;
	}
	// An array of the current route's events:
	let events = [];
	// The element where the routes are rendered:
	let el = null;
	// Context functions shared between all controllers:
	let ctx = {
		on: function (selector, evt, handler) {
			events.push([selector, evt, handler]);
		},
		refresh: function (listeners) {
			listeners.forEach(function (fn) { fn(); });
		},
		trigger: function (evt, selector) {
			/* events.forEach(function (ev) {
				if((elems = $.all(ev.selector)) && elems.length > 0){
					elems.dispatchEvent(ev.evt);
					fn();
				}
			});
			for (var i = 0, len = events.length; i < len; i++) {
				var els = this.viewEl.querySelectorAll(events[i][0]);
				for (var j = 0, elsLen = els.length; j < elsLen; j++) {
					//els[j][fnName].apply(els[j], events[i].slice(1));
					//els[j].dispatchEvent(events[evt]);
					els[j].dispatchEvent(evt);
				}
			} */
		}
	};
	/* var listeners = [];
		//console.log(ctx)
		if(isPlainObject(controller)){
			Object.assign(controller, {'$on': ctx.on});
			Object.assign(controller, {'$trigger': ctx.trigger});
			Object.assign(controller,{'$refresh': ctx.refresh.bind(undefined, listeners)});
			
		} else {
			Object.defineProperty(controller.prototype, '$on', {value: ctx.on});
			Object.defineProperty(controller.prototype, '$trigger', {value: ctx.trigger});
			Object.defineProperty(controller.prototype, '$refresh', {value: ctx.refresh.bind(undefined, listeners)});
		}
	 */
	
	function AKD_PhotoEditor(params={}){
		if(!(this instanceof AKD_PhotoEditor)) return  new AKD_PhotoEditor(params);
		const default_params = {
			mode: 'hash', linkId: '[data-route-link]', linkActiveClass: 'active', lsKey: '',
		
			container: '#AKD-editor', 
			style: "codepen", 
			templates: [], 
			linkId: '[data-route-link]', 
			linkActiveClass: 'active', 
			animation: null, loader: null, akpKey: 'akd-pe-'+$i, 
			tabs: {
				main_wrapper_class: "akd__tabs", 
				main_wrapper_selector: ".akd__tabs", 
				buttons_wrapper_class: "akd__tab-buttons", 
				buttons_wrapper_selector: ".akd__tab-buttons", 
				button_class: "akd__tab-button", 
				button_selector: ".akd__tab-button", 
				panels_wrapper_class: "akd__tab-panels", 
				panels_wrapper_selector: ".akd__tab-panels", 
				panel_class: "akd__tab-panel", 
				panel_selector: ".akd__tab-panel", 
				active_class: "active--tab", 
				active_selector: ".active--tab"
			}, 
		}
		this.params = isPlainObject(params) ? extend(default_params,params) : default_params;
		this.$container = isElement(this.params.container) ? this.params.container : $.one(this.params.container);
		
		if(!isElement(this.$container)){return this;}
		
		this.$body = document.body;
		this.$mainContent = $.one(".main-content", this.$container);
		
		this.loader = this.params.loader || '<div style="position: absolute;top: 50%;left: 50%;translate: -50% -50%;"><div class="dot-revolution"></div></div>';
		$akid = 'akd-' + String(isString(this.params.container) ? this.params.container : this.$container?.id?.className).replace('#','-').replace('.','-').replace(' ','-');
		if(this.$container.classList && typeof this.params.animation === 'string'){
			this.$container.classList.remove(this.params.animation);
		}
		this.$canvas = null;
		this.$ctx = null;
		this.$outputElement = null;
		
		this.$goLiveInput = $.one('[data-akd-photo-editor-go-live]', this.$container);
		//this.$_clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';
		this.$key = this.params?.akpKey??$akid;
		this.isDragging = false;
		this.isMoving = false;
		this.mode = 'move';
		
		this._delay = null;
		this._observeMutations = false;
		this._pixels = [];
		this._err = [];
		this._skinz = [];
		this._defaultLanguages = [
			{text: "HTML", ext: "html"},
			{text: "Javascript",ext: "js"},
			{text: "CSS",ext: "css"},
			{text: "PHP",ext: "php"},
			{text: "C",ext: "c"},
			{text: "C++",ext: "cpp"},
			{text: "Python",ext: "py"}
		];
		this._tabs = {};
		this._splitter = {};
		this._editors = {};
		this._editorStyles = ["codepen", "vscode"];
		this._AJAX_FILES = null;
		this._AJAX_BACK_URL = null;
		//if(window["AKD_Editor_tempates"]) this._editorStyles = [...this._editorStyles, ...Object.keys(window["AKD_Editor_tempates"])];
		//this.defaultEditorStyle = "codepen";
		//this.editorStyle = inArray(this.params.style, this._editorStyles) ? this.params.style : this.defaultEditorStyle;
		
		return this;
	}
	////////////////////////////////////////////////////////////
	AKD_PhotoEditor.prototype.setup = function(){
		/* _.AKD_PhotoEditor = function(id, cfg = {key: ''}){
		let $i = cfg.key || 0;
		const $this = this;
		//this[$i] = $i; */
		//this.$container = $.one(id);
		if(!isElement(this.$container)) return false;
		this.FILTER_OPTIONS = [];
		this.FILTER_OPTIONS_CACHED = [];
		/* this.FILTER_OPTIONS = [
				{name: "Brightness", property: "brightness", value: 100, range: {min: 0, max: 100, step: 1}, unit: "%"},
				{name: "Contrast", property: "contrast", value: 100, range: {min: 0, max: 200, step: 1}, unit: "%"},
				{name: "Saturation", property: "saturate", value: 1, range: {min: 0, max: 1000, step: 0.1}, unit: ""},
				{name: "Grayscale", property: "grayscale", value: 0, range: {min: 0, max: 100, step: 1}, unit: "%"},
				{name: "Sepia", property: "sepia", value: 0, range: {min: 0, max: 100, step: 1}, unit: "%"},
				{name: "Hue Rotate", property: "hue-rotate", value: 0, range: {min: 0, max: 360, step: 1, }, unit: "deg"},
				{name: "Blur", property: "blur", value: 0, range: {min: 0, max: 20, step: 1, }, unit: "px"},
				{name: "Opacity", property: "opacity", value: 1, range: {min: 0, max: 1, step: 0.01, }, unit: ""},
				{name: "Invert", property: "invert", value: 0, range: {min: 0, max: 1, step: 0.01, }, unit: ""},
		];
		this.FILTER_OPTIONS_CACHED = [...this.FILTER_OPTIONS];
		 */
		this.selectedIndex = 0;
		this.selectedFilterOption = this.FILTER_OPTIONS[this.selectedIndex];
		
		this.$parent = this.$container.hasAttribute('data-akd-photo-editor-parent') ? this.$container : $.one('[data-akd-photo-editor-parent]', this.$container);
		this.$sourceImage = $.one('[data-akd-photo-editor-source-image]', this.$container);
		this.$outputElement = $.one('[data-akd-photo-editor-output]', this.$container);
		if(!isElement(this.$parent) || !isElement(this.$sourceImage) || !isElement(this.$outputElement)){
			let msg = '';
			if(!isElement(this.$parent)) msg += "The {parent} element is not valid\n";
			if(!isElement(this.$sourceImage)) msg += "The {sourceImage} element is not valid\n";
			if(!isElement(this.$outputElement)) msg += "The {outputElement} element is not valid\n";
			console.warn(msg);
			return false;
		}
		//console.log(id, this.$container)
		let $w = this.$sourceImage.dataset?.width??this.$sourceImage.naturalWidth, 
		$h = this.$sourceImage.dataset?.height??this.$sourceImage.naturalHeight
		
		this.$canvas = Object.assign(document.createElement("canvas"), {id: "AKD-photo-editor-canvas-" + $i, 'class': "akd-photo-editor-canvas", width: $w, height: $h});
		Object.assign(this.$canvas.style, {width: `${$w}px`, height: `${$h}px`});
		this.$ctx = this.$canvas.getContext("2d");
		this.$outputElement.appendChild(this.$canvas);
		
		this.$goLiveInput = $.one('[data-akd-photo-editor-go-live]', this.$container);
		this.$filterInput = '';
		return this;
	}
	
	AKD_PhotoEditor.prototype.canvasFilter = function(filter_str){
		this.$ctx.filter = filter_str;
		this.$ctx.drawImage(this.$sourceImage, 0, 0, this.$canvas.width, this.$canvas.height);
		return this;
	}
	
	AKD_PhotoEditor.prototype.saveImage = function(newSource){
		let sourceImage = isElement(newSource) && isImage(newSource) ? newSource : this.$sourceImage;
		/* this.$ctx.filter = 'blur(20px)';
		this.$ctx.drawImage(sourceImage, 0, 0, this.$canvas.width, this.$canvas.height);
		console.log(this.$ctx.filter) */
		//this.copyImage(newSource);
		console.log("This feature is under construction!")
		return this;
	}
	
	AKD_PhotoEditor.prototype.copyImage = function(newSource){
		//this.flush().setup();
		if(isElement(newSource) && isImage(newSource)) this.$sourceImage = newSource;
		let $w = this.$sourceImage.dataset?.width??this.$sourceImage.naturalWidth, 
		$h = this.$sourceImage.dataset?.height??this.$sourceImage.naturalHeight
		
		Object.assign(this.$canvas, {width: $w, height: $h});
		Object.assign(this.$canvas.style, {width: `${$w}px`, height: `${$h}px`});
		
		this.$ctx.drawImage(this.$sourceImage, 0, 0, $w, $h);
		this._pixels = this.$ctx.getImageData(0, 0, $w, $h);
		//this.$ctx.drawImage(this.$sourceImage, 0, 0, this.$canvas.width, this.$canvas.height);
		//this._pixels = this.$ctx.getImageData(0, 0, this.$sourceImage.naturalWidth, this.$sourceImage.naturalHeight);
		return this;
	}
	AKD_PhotoEditor.prototype.resetImage = function(){
		let $w = this.$sourceImage.dataset?.width || this.$sourceImage.naturalWidth || this.$sourceImage.width || this.$canvas.width, 
		$h = this.$sourceImage.dataset?.height || this.$sourceImage.naturalHeight || this.$sourceImage.height || this.$canvas.height
		//this.flush().setup()/* .copyImage() */;
		this.$ctx.filter = 'none';
		this.$ctx.drawImage(this.$sourceImage, 0, 0, $w, $h);
		//this.$ctx.drawImage(this.$sourceImage, 0, 0, this.$canvas.width, this.$canvas.height);
		//this.$ctx.drawImage(this.$sourceImage, 0, 0, (this.$sourceImage.naturalWidth || this.$sourceImage.width || this.$canvas.width), (this.$sourceImage.naturalHeight || this.$sourceImage.height || this.$canvas.height));
		return this;
	}
	AKD_PhotoEditor.prototype.zoomImage = function(id, how, zoom){
		let img = $.one(id);
		if(!isElement(img)) return;
		zoom = isNumber(zoom) && zoom >= 1.1 ? zoom : 1.5;
		how = isString(how) ? how : 'in';
		let imageStyle = $.elementStyle(img), 
		imgW = Number(imageStyle.width.replace('px','')),imgH = Number(imageStyle.height.replace('px','')),
		zoomW = how === 'in' ? (imgW*zoom) : (imgW/zoom), zoomH = how === 'in' ? (imgH*zoom) : (imgH/zoom);
		
		console.log(imgW, `width:${zoomW}px;`, imgH, `height:${zoomH}px;`);
		Object.assign(img.style, {width:`${zoomW}px`, height:`${zoomH}px`, transition: 'all 600ms ease-out'});
		this.fade(id,0,100,1900);
		return this;
	}
	AKD_PhotoEditor.prototype.zoomIn = function(id,zoom){
		this.zoomImage(id, 'in', zoom);
		//var img = $.one(id);var image = img.style;var winW = img.width,winH = img.height;image["width"] = (winW*zoom) + "px";image["height"] = (winH*zoom) + "px";image["transition"] = "all 600ms linear";fade(id,0,100,1900);
		return this;
	}
	AKD_PhotoEditor.prototype.zoomOut = function(id,zoom){
		this.zoomImage(id, 'out', zoom);
		//var img = $.one(id);var image = img.style;var winW = img.width,winH = img.height;image["width"] = (winW/zoom) + "px";image["height"] = (winH/zoom) + "px";image["transition"] = "all 600ms ease-out";fade(id,0,100,1900);
		return this;
	}
	const purge = ( d ) => {
		"use strict";
		var a = d.attributes, i, l, n;
		if ( a ) {
			for ( i = a.length - 1; i >= 0; i -= 1 ) {
				n = a[i].name;
				console.log(n)
				if (typeof d[n] === 'function' ) {d[n] = null;}
			}
		}
		a = d.childNodes;
		if ( a ) {
			l = a.length;
			for ( i = 0; i < l; i += 1 ) {purge( d.childNodes[i] );}
		}
		return this;
	}
	// cx = 11.5, cy = 12.535
	AKD_PhotoEditor.prototype.imageZoom = function(imgID, resultID, cx, cy) {
		this.options = (arguments[0] && typeof arguments[0] === "object") ? arguments[0] : null
		//console.log("this.options",this.options)
		var img = $.one(this.options.img ? this.options.img : imgID);
		if(!img){
			return false;
		}
		const $this = this;
		this.mode = this.options.mode ? this.options.mode : 'move';
		var lens, cxInput, cyInput, cxcyWrapper, startX, startY, startWidth, startHeight, 
		_resizer = document.createElement('div'), 
		container = img.parentElement, 
		result = $.one(this.options.result ? this.options.result : resultID) ?? img.nextElementSibling, 
		rw = result && result.offsetWidth > 0 ? result.offsetWidth : result.parentElement.offsetWidth, 
		rh = result && result.offsetHeight > 0 ? result.offsetHeight : result.parentElement.offsetHeight;
		cx = this.options.cx ? this.options.cx : cx;
		cy = this.options.cy ? this.options.cy : cy;
		/*create lens:*/
		if(isElement(lens = $.one(".img-zoom-lens", container))){
			//purge(img);
			//purge(lens);
			lens.parentElement.removeChild(lens);
			cxInput = $.one(".cxInput", result), cyInput = $.one(".cyInput", result);
			if(isElement(cxInput) || isElement(cyInput)){
				//result.removeChild(result.children[0])
				result.removeChild(result.firstChild);
			}
		}
		cxcyWrapper = $.tag("div", {'class': 'img-zoom-input-wrapper'}, 
			cxInput = $.tag("input", {'class': 'cxInput', type: 'number', value: this.cx, min: 10, max: Infinity, step: 0.5}), 
			cyInput = $.tag("input", {'class': 'cyInput', type: 'number', value: this.cy, min: 10, max: Infinity, step: 0.5})
		);
		result.appendChild(cxcyWrapper);
		
		lens = document.createElement("DIV");
		lens.setAttribute("class", "img-zoom-lens");
		lens.setAttribute("data-mode", this.mode);
		lens.className = lens.className + ' resizable';
		/* lens.innerHTML = `<span class="cropper-view-box"></span>
			<span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span>
			<span class="cropper-center"></span><span class="cropper-face"></span>
			<span class="cropper-line line-e" data-cropper-action="e"></span>
			<span class="cropper-line line-n" data-cropper-action="n"></span>
			<span class="cropper-line line-w" data-cropper-action="w"></span>
			<span class="cropper-line line-s" data-cropper-action="s"></span>
			<span class="cropper-point point-e" data-cropper-action="e"></span>
			<span class="cropper-point point-n" data-cropper-action="n"></span>
			<span class="cropper-point point-w" data-cropper-action="w"></span>
			<span class="cropper-point point-s" data-cropper-action="s"></span>
			<span class="cropper-point point-ne" data-cropper-action="ne"></span>
			<span class="cropper-point point-nw" data-cropper-action="nw"></span>
			<span class="cropper-point point-sw" data-cropper-action="sw"></span>
			<span class="cropper-point point-se" data-cropper-action="se"></span>`; */
		/*insert lens:*/
		img.parentElement.insertBefore(lens, img);
		/*calculate the ratio between result DIV and lens:*/
		this.cx = cx = isNumber(cx) && cx > 0 ? cx : rw / lens.offsetWidth;
		this.cy = cy = isNumber(cy) && cy > 0 ? cy : rh / lens.offsetHeight;
		/*set background properties for the result DIV*/
		result.style.backgroundImage = "url('" + img.src + "')";
		result.style.backgroundSize = (img.width * this.cx) + "px " + (img.height * this.cy) + "px";
		
		if(!img.hasAttribute("data-lens-width") || !img.hasAttribute("data-lens-height")) {
			Object.assign(img.dataset, {'lensWidth': lens.offsetWidth||40,'lensHeight': lens.offsetHeight||40});
		}
		Object.assign(lens.style, {'width': img.dataset.lensWidth + 'px','height': img.dataset.lensHeight + 'px'});
		
		_resizer.className = 'resizer';
		_resizer.style.cssText += "cursor:se-resize;zIndex:10000000;bottom:0;right:0;position:absolute;width:12px;height:12px;background-color: #39f;background-color: #39f;background-size: 12px;background-repeat: no-repeat;background-position: bottom right;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAACqqqr+/v4vLy/6+vr+/v7+/v4AAABzc3Nvb2////+2trbJycnr6+vPz891dXVzc3OhoaF3d3eioqJ9fX2goKC+vr5/f3/Ly8t8fHz+/v4NyOEeAAAAG3RSTlMAjgtAaEpbR3wQA3dyanYndRN+L4g2mjByeR/NwbV+AAAARklEQVR4XmMgDTAzokqwM7KgybMxockzoctziqLJc/ChynNws6LK87ByEZLnF4DLCwoB5YVFeMECYkB5cQmgfkleKQYiAADT4wJh2XodKgAAAABJRU5ErkJggg==');";
		_resizer.addEventListener('mousedown', startDrag, false);
		lens.appendChild(_resizer);
		/*execute a function when someone moves the cursor over the image, or the lens:*/
		lens.addEventListener("mousedown", moveDown);
		lens.addEventListener("mouseup", moveUp);
		lens.addEventListener("mousemove", moveLens);
		img.addEventListener("mousemove", moveLens);
		img.addEventListener("mousedown", moveDown);
		img.addEventListener("mouseup", moveUp);
		/*and also for touch screens:
		lens.addEventListener("touchmove", moveLens);
		img.addEventListener("touchmove", moveLens);*/
		
		lens.ondragstart = function(){return false;};
		lens.addEventListener("dblclick", function(event) {
			$this.mode = lens.getAttribute("data-mode");
			if($this.mode === "move"){
				$this.mode = "drag"
			} else $this.mode = "move";
			lens.setAttribute("data-mode", $this.mode);
		});
		
		[cxInput, cyInput].forEach(input => {
			input.addEventListener("change", e => {let val = Number(e.target.value);e.target === cxInput ? $this.cx =  val: $this.cy = val;result.style.backgroundSize = (img.width * $this.cx) + "px " + (img.height * $this.cy) + "px";})
		});
		function moveUp(e) {$this.isDragging = false;}
		function moveDown(e) {$this.isDragging = true;/* $this.isDragging = lens.getAttribute("data-mode") === "drag"; */} 
		function moveLens(e) {
			console.log($this.cx, $this.cy)
			if($this.mode === "move" || ($this.mode === "drag" && $this.isDragging === true)){
				var pos, x, y;
				/*prevent any other actions that may occur when moving over the image*/
				e.preventDefault();
				/*get the cursor's x and y positions:*/
				pos = getCursorPos(e);
				/*calculate the position of the lens:*/
				x = pos.x - (lens.offsetWidth / 2);
				y = pos.y - (lens.offsetHeight / 2);
				/*prevent the lens from being positioned outside the image:*/
				if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
				if (x < 0) {x = 0;}
				if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
				if (y < 0) {y = 0;}
				/*set the position of the lens:*/
				lens.style.left = x + "px";
				lens.style.top = y + "px";
				/*display what the lens "sees":*/
				result.style.backgroundPosition = "-" + (x * $this.cx) + "px -" + (y * $this.cy) + "px";
			}
		}
		function getCursorPos(e) {
			var a, x = 0, y = 0;
			e = e || window.event;
			/*get the x and y positions of the image:*/
			a = img.getBoundingClientRect();
			/*calculate the cursor's x and y coordinates, relative to the image:*/
			x = e.pageX - a.left;
			y = e.pageY - a.top;
			/*consider any page scrolling:*/
			x = x - window.pageXOffset;
			y = y - window.pageYOffset;
			return {x : x, y : y};
		}
		function doDrag(e){
			lens.style.width = (startWidth + e.clientX - startX) + 'px';
			lens.style.height = (startHeight + e.clientY - startY) + 'px';
		}
		function stopDrag(e) {
			rw = result.offsetWidth > 0 ? result.offsetWidth : result.parentElement.offsetWidth, 
			rh = result.offsetHeight > 0 ? result.offsetHeight : result.parentElement.offsetHeight;
			$this.cx = (rw / lens.offsetWidth) * 1.5;
			$this.cy = (rh / lens.offsetHeight) * 1.5;
			//$this.cx = (rw * lens.offsetWidth) / 1.5;
			//$this.cy = (rh * lens.offsetHeight) / 1.5;
			Object.assign(img.dataset, {'lensWidth': lens.offsetWidth,'lensHeight': lens.offsetHeight});
			result.style.backgroundSize = (img.width * $this.cx) + "px " + (img.height * $this.cy) + "px";
			
			document.documentElement.removeEventListener('mousemove', doDrag, false);
			document.documentElement.removeEventListener('mouseup', stopDrag, false);
		}
		function startDrag(e) {
			startX = e.clientX;
			startY = e.clientY;
			startWidth = parseInt(document.defaultView.getComputedStyle(lens).width, 10);
			startHeight = parseInt(document.defaultView.getComputedStyle(lens).height, 10);
			document.documentElement.addEventListener('mousemove', doDrag, false);
			document.documentElement.addEventListener('mouseup', stopDrag, false);
		}
		
		return this;
	}
	AKD_PhotoEditor.prototype.Resizer = function Resizer() {
		var startX, startY, startWidth, startHeight;
		this.options = (arguments[0] && typeof arguments[0] === "object") ? arguments[0] : {}
		//console.log("this.options",this.options)
		var _resizer = document.createElement('div'),node = $.one(this.options.content);
		if(!node){
			return false;
		}
		node.className = node.className + ' resizable';
		node.style.cssText += 'border:1px dotted #f0f0f0;position:relative;overflow:hidden;`';
		//background: blue;
		_resizer.className = 'resizer';
		_resizer.style.cssText += "cursor:se-resize;zIndex:10000000;bottom:0;right:0;position:absolute;width:16px;height:16px;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAACqqqr+/v4vLy/6+vr+/v7+/v4AAABzc3Nvb2////+2trbJycnr6+vPz891dXVzc3OhoaF3d3eioqJ9fX2goKC+vr5/f3/Ly8t8fHz+/v4NyOEeAAAAG3RSTlMAjgtAaEpbR3wQA3dyanYndRN+L4g2mjByeR/NwbV+AAAARklEQVR4XmMgDTAzokqwM7KgybMxockzoctziqLJc/ChynNws6LK87ByEZLnF4DLCwoB5YVFeMECYkB5cQmgfkleKQYiAADT4wJh2XodKgAAAABJRU5ErkJggg==');";
		node.appendChild(_resizer);
		var doDrag = function(e){node.style.width = (startWidth + e.clientX - startX) + 'px';node.style.height = (startHeight + e.clientY - startY) + 'px';}
		var stopDrag = function(e) {document.documentElement.removeEventListener('mousemove', doDrag, false);document.documentElement.removeEventListener('mouseup', stopDrag, false);}
		var startDrag = function(e) {startX = e.clientX;startY = e.clientY;startWidth = parseInt(document.defaultView.getComputedStyle(node).width, 10);startHeight = parseInt(document.defaultView.getComputedStyle(node).height, 10);document.documentElement.addEventListener('mousemove', doDrag, false);document.documentElement.addEventListener('mouseup', stopDrag, false);}
		_resizer.addEventListener('mousedown', startDrag, false);
		if(this.options.handle){
			var ball = $.one(this.options.handle);
			ball.onmousedown = function(event) {
				var shiftX = event.clientX - ball.getBoundingClientRect().left;
				let shiftY = event.clientY - ball.getBoundingClientRect().top;
				ball.style.cursor = 'move';
				ball.style.position = 'absolute';
				ball.style.zIndex = 1000;
				//document.body.append(ball);
				moveAt(event.pageX, event.pageY);
				// centers the ball at (pageX, pageY) coordinates
				function moveAt(pageX, pageY) {ball.style.left = pageX - shiftX + 'px';ball.style.top = pageY - shiftY + 'px';}
				function onMouseMove(event) {moveAt(event.pageX, event.pageY);}
				// (3) move the ball on mousemove
				document.addEventListener('mousemove', onMouseMove);
				// (4) drop the ball, remove unneeded handlers
				ball.onmouseup = function(){document.removeEventListener('mousemove', onMouseMove);ball.onmouseup = null;};
			};
			ball.ondragstart = function(){return false;};
		}
	}
	AKD_PhotoEditor.prototype.dragResizer = function dragResizer() {
		var that = this;
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = arguments[0];
		}
		var pane = document.querySelector(this.options.content);
		var ghostpane = document.querySelector(this.options.handle);
		var p = pane.parentElement.getBoundingClientRect();
		$win_width = p.width || window.innerWidth
		$win_height = p.height || window.innerHeight
		
		if(ghostpane && ghostpane !== pane){
			ghostpane = ghostpane;
		} else {
			ghostpane = document.createElement('div');
			ghostpane.style.cssText += 'width:'+pane.offsetWidth+';opacity: 0;';
			document.body.appendChild(ghostpane);
		}
		// Minimum resizable area
		var minWidth = 60, minHeight = 40;
		// Thresholds
		var FULLSCREEN_MARGINS = -10,MARGINS = 4, offset = 80;
		// End of what's configurable.
		var clicked = null;
		var onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;
		var rightScreenEdge, bottomScreenEdge;
		var preSnapped;
		var b, x, y;
		var redraw = false;
		function setBounds(element, x, y, w, h) {
			element.style.left = x + 'px';
			element.style.top = y + 'px';
			element.style.width = w + 'px';
			element.style.height = h + 'px';
			element.style.display = 'block';
			/* let sx = x, sy = y, sw = $img.naturalWidth, sh = $img.naturalHeight, 
			//dw = $img.naturalWidth, dh = $img.naturalHeight, 
			dw = w, dh = h, 
			dx = ($canvas.width/2 - dw/2), dy = ($canvas.height/2 - dh/2), 
			dx2 = Math.round(x), dy2 = Math.round(y), 
			dw2 = Math.round(w), dh2 = Math.round(h)
			//$ctx.drawImage($img, sx, sy, sw, sh, dx, dy, dw, dh)
			$ctx.drawImage($img, sx, sy, sw, sh, x, y, w, h)
			console.log(sx, sy, sw, sh, dx, dy, dw, dh, x, y, w, h)
			if(element === pane){
				//if(that.isMouseDown) that.selectionStart = [clicked.ox, clicked.oy];
				//else that.selectionEnd = [clicked.ox, clicked.oy];
				//var bb = that._getSelectionBoundingBox();
				//that.doZoom([(e.clientX - offset), (e.clientY - offset), currentWidth, currentHeight]);
				var ratio = window.devicePixelRatio / (that.ctx.webkitBackingStorePixelRatio || that.dpr);
				that.targetCanvas.width = that.image.width * ratio;
				that.targetCanvas.height = that.image.height * ratio;
				that.targetCtx.scale(ratio, ratio);
				that.targetCtx.drawImage(that.image,
					that.image.width * x,
					that.image.height * y,
					////e.clientX * ratio, e.clientY * ratio, 
					that.image.width * w,
					that.image.height * h,
					0, 0, that.targetCanvas.width/ratio, that.targetCanvas.height/ratio);
			} */
				//console.log(ratio, that.bb, that.getData()/* , e.offsetX, (e.clientX  - offset) */)
		}
		function hintHide(){setBounds(ghostpane, b.left, b.top, b.width, b.height);ghostpane.style.opacity = 0;ghostpane.style.display = 'none';/* var b = ghostpane.getBoundingClientRect();ghostpane.style.top = b.top + b.height / 2;ghostpane.style.left = b.left + b.width / 2;ghostpane.style.width = 0;ghostpane.style.height = 0; */}
		// Mouse events
		pane.addEventListener('mousedown', onMouseDown);
		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseup', onUp);
		// Touch events	
		pane.addEventListener('touchstart', onTouchDown);
		document.addEventListener('touchmove', onTouchMove);
		document.addEventListener('touchend', onTouchEnd);
		function onTouchDown(e){onDown(e.touches[0]);}
		function onTouchMove(e){onMove(e.touches[0]);}
		function onTouchEnd(e){if (e.touches.length ==0) onUp(e.changedTouches[0]);}
		function onMouseDown(e){onDown(e);}
		function onDown(e){
			calc(e);
			var isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;
			var shiftX = event.clientX - b.left;
			let shiftY = event.clientY - b.top;
			clicked = {
				x: x, y: y, 
				cx: e.clientX, cy: e.clientY,
				ox: e.offsetX, oy: e.offsetY,
				w: b.width, h: b.height,
				isResizing: isResizing, 
				isMoving: !isResizing && canMove(),
				onTopEdge: onTopEdge, 
				onLeftEdge: onLeftEdge, 
				onRightEdge: onRightEdge, 
				onBottomEdge: onBottomEdge,
				px: e?.pageX??0, py: e?.pageY??0,
				pageX: e?.pageX??0, pageY: e?.pageY??0,
				shiftX: shiftX, shiftY:shiftY
			};
			//that.selectionStart = [e.offsetX, e.offsetY];
			// centers the ball at (pageX, pageY) coordinates
			/* moveAt(pane, {pageX: e?.pageX??e.clientX, pageY: e?.pageY??e.clientY}); */
		}
		function moveAt(el, coord = {pageX: null, pageY: null}) {el.style.left = coord.pageX + 'px';el.style.top = coord.pageY + 'px';}
		function canMove(){return x > 0 && x < b.width && y > 0 && y < b.height/*  && y < 30; */}
		function calc(e) {b = pane.getBoundingClientRect();x = e.clientX - b.left;y = e.clientY - b.top;onTopEdge = y < MARGINS;onLeftEdge = x < MARGINS;onRightEdge = x >= b.width - MARGINS;onBottomEdge = y >= b.height - MARGINS;rightScreenEdge = $win_width - MARGINS;bottomScreenEdge = $win_height - MARGINS;}
		var e;
		function onMove(ee) {calc(ee);e = ee;redraw = true;}
		function onUp(e) {
			calc(e);
			
			that.selectionEnd = [e.offsetX, e.offsetY];
			if(clicked && clicked.isMoving) {
				// Snap
				var snapped = {width: b.width,height: b.height};
				if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > $win_width - FULLSCREEN_MARGINS || b.bottom > $win_height - FULLSCREEN_MARGINS) {
					// hintFull();
					//setBounds(pane, 0, 0, $win_width, $win_height);
					preSnapped = snapped;
				} else if (b.top < MARGINS) {
					// hintTop();
					pane.style.top = 0;
					//setBounds(pane, 0, 0, $win_width, $win_height / 2);
					preSnapped = snapped;
				} else if (b.left < MARGINS) {
					// hintLeft();
					pane.style.left = 0;
					//setBounds(pane, 0, 0, $win_width / 2, $win_height);
					preSnapped = snapped;
				} else if (b.right > rightScreenEdge) {
					// hintRight();
					pane.style.right = 0;
					//setBounds(pane, $win_width / 2, 0, $win_width / 2, $win_height);
					preSnapped = snapped;
				} else if (b.bottom > bottomScreenEdge) {
					// hintBottom();
					pane.style.bottom = 0;
					//setBounds(pane, 0, $win_height / 2, $win_width, $win_width / 2);
					preSnapped = snapped;
				} else {
					preSnapped = null;
				}
				if(typeof that.options.snap != undefined && that.options.snap === false) preSnapped = null;
				hintHide();
			}
			clicked = null;
		}
		function animatePane() {
			requestAnimationFrame(animatePane);
			if (!redraw) return;
			redraw = false;
			if (clicked && clicked.isResizing){
				if (clicked.onTopEdge){
					var currentHeight = Math.max(clicked.cy - e.clientY + clicked.h, minHeight);
					if (currentHeight > minHeight){
						pane.style.height = currentHeight + 'px';
						pane.style.top = (e.clientY - offset) + 'px';
					}
				}
				if (clicked.onLeftEdge){
					var currentWidth = Math.max(clicked.cx - e.clientX + clicked.w, minWidth);
					if(currentWidth > minWidth) {
						pane.style.width = currentWidth + 'px';
						pane.style.left = (e.clientX  - offset)+ 'px';
					}
				}
				if (clicked.onBottomEdge) pane.style.height = Math.max(y, minHeight) + 'px';
				if (clicked.onRightEdge) pane.style.width = Math.max(x, minWidth) + 'px';
				hintHide();
				
				return;
			}
			if(clicked && clicked.isMoving) {
				if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > $win_width - FULLSCREEN_MARGINS || b.bottom > $win_height - FULLSCREEN_MARGINS) {
					// hintFull();
					setBounds(ghostpane, 0, 0, $win_width, $win_height);
					ghostpane.style.opacity = 0.2;
				} else if (b.top < MARGINS) {
					// hintTop();
					setBounds(ghostpane, 0, 0, $win_width, $win_height / 2);
					ghostpane.style.opacity = 0.2;
				} else if (b.left < MARGINS) {
					// hintLeft();
					setBounds(ghostpane, 0, 0, $win_width / 2, $win_height);
					ghostpane.style.opacity = 0.2;
				} else if (b.right > rightScreenEdge) {
					// hintRight();
					setBounds(ghostpane, $win_width / 2, 0, $win_width / 2, $win_height);
					ghostpane.style.opacity = 0.2;
				} else if (b.bottom > bottomScreenEdge) {
					// hintBottom();
					setBounds(ghostpane, 0, $win_height / 2, $win_width, $win_width / 2);
					ghostpane.style.opacity = 0.2;
				} else {
					hintHide();
				}

				if (preSnapped) {
					setBounds(pane,e.clientX - preSnapped.width / 2,e.clientY - Math.min(clicked.y, preSnapped.height),preSnapped.width,preSnapped.height);
					return;
				}
				// moving
				var shiftX = e.clientX - b.left;
				let shiftY = e.clientY - b.top;
				pane.style.top = ((e.clientY - offset) - clicked.y) + 'px';
				pane.style.left = ((e.clientX - offset) - clicked.x) + 'px';
				return;
			}
			// This code executes when mouse moves without clicking
			// style cursor
			if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) pane.style.cursor = 'nwse-resize';
			else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) pane.style.cursor = 'nesw-resize';
			else if (onRightEdge || onLeftEdge) pane.style.cursor = 'ew-resize';
			else if (onBottomEdge || onTopEdge) pane.style.cursor = 'ns-resize';
			else if (canMove()) pane.style.cursor = 'move';
			else pane.style.cursor = 'default';
		}
		animatePane();
	}
	//bg_size_x = ((img.offsetWidth>0?img.offsetWidth:img.parentElement.offsetHeight) * zoom),
	//bg_size_y = ((img.offsetHeight>0?img.offsetHeight:img.parentElement.offsetHeight) * zoom);
	let fx = 1, fy = 1;
	AKD_PhotoEditor.prototype.flipCanvasImage = function(axis, dir = -1){
		this.$canvas.classList.toggle('canvas-flipped-'+axis);
		if(this.$canvas.classList.contains('canvas-flipped-'+axis)){
			dir = -1;
		} else dir = 1;
		//this.flush().setup()/* .copyImage() */;
		//this.$ctx.filter = 'none';
		this.$ctx.save();
		//this.$ctx.drawImage(this.$sourceImage, 0, 0, this.$canvas.width, this.$canvas.height);
		this.$ctx.translate(this.$canvas.width / 2, this.$canvas.height / 2);
		if(axis === "vertical" || axis === "v"){
			this.$ctx.scale(1, dir);
		} else this.$ctx.scale(dir, 1);
		this.$ctx.drawImage(this.$sourceImage, -this.$canvas.width/2, -this.$canvas.height/2, this.$canvas.width, this.$canvas.height);
		this.$ctx.restore();
		this._pixels = this.$ctx.getImageData(0, 0, this.$canvas.width, this.$canvas.height);
		return this;
	}
	AKD_PhotoEditor.prototype.clipImage = function(img, axis){
		
		this._pixels = this.$ctx.getImageData(0, 0, this.$canvas.width, this.$canvas.height);
		return this;
	}
	AKD_PhotoEditor.prototype.flipImage = function(img, axis){
		img = $.one(img);
		if(!isElement(img)) return "";
		if(axis === "vertical" || axis === "v"){
			if(img.classList.contains("flipped-vertically")){
				flipImage.fx = fx = '1';
				img.classList.remove("flipped-vertically");
			} else {
				flipImage.fx = fx = '-1';
				img.classList.add("flipped-vertically");
			}
		} else {
			if(img.classList.contains("flipped-horizontally")){
				flipImage.fy = fy = '1';
				img.classList.remove("flipped-horizontally");
			} else {
				flipImage.fy = fy = '-1';
				img.classList.add("flipped-horizontally");
			}
		}
		
		//img.style.transform = `scale(${fx}, ${fy})`;
		img.style.transform = `scale(${flipImage.fx}, ${flipImage.fy})`;
	}
	AKD_PhotoEditor.prototype.flipImage.fx = 1;
	AKD_PhotoEditor.prototype.flipImage.fy = 1;

	AKD_PhotoEditor.prototype.init = function(newSource){
		this.flush().setup().copyImage(newSource).initDragger().initFilter(newSource);
		//this.initComparisons();
		return this;
	}
	AKD_PhotoEditor.prototype.flush = function(){
		if(isElement(this.$outputElement) && this.$outputElement.contains(this.$canvas)) this.$outputElement.removeChild(this.$canvas);
		this.$ctx = null;
		this.$canvas = null;
		return this;
	}
	/*!
	 * Build photo editor UI
	 * (c) 2022 Andre Lewis, MIT License, https://akd-showcase.netlify.app
	 * @param  {String} type   The event type
	 * @param  {Node}   elem   The element to attach the event to
	 * @param  {Object} detail Any details to pass along with the event
	 */
	AKD_PhotoEditor.prototype.buildCard = function (imgSrc, width, height, standalone = false, i = 0) {
		i = $i || i;
		$i++;
		return `<div id="akd-photo-editor-card-${i}" class="akd-photo-editor-card ${standalone === true ? 'standalone toggled' : ''} ui-pattern-1" data-layout="grid-auto" data-layout-row-auto="1fr auto" >
			<!--<span class="photo-controls bg--darker">
				<button id="" class="view akd__btn btn--info mr--auto" title="toggle editor view">&copy;</button>
				<button id="" class="close akd__btn btn--danger ml--auto" title="close editor view">&times;</button>
			</span>-->
			<div class="photo-main-area h--12" data-akd-photo-editor-parent>
				<div class="photo-editor-tab akd__tab flex flex--col h--12 w--6 f--6">
					<div class="f--6 h--6 bd--b bds--solid bdw--1 bdc--info" data-layout="grid-auto" data-layout-rows="auto-1fr">
						<div class="akd__tab-buttons h--max" style="background: #2f3031;">
							<button class="akd__tab-button active--tab bdr--2" title="show comparison tab" data-parent-tab="#akd-photo-editor-card-${i} .photo-editor-tab" data-target-tab="#comparison-tab-${i}" data-akd-photo-editor-comparison-tab>comp</button>
							<button class="akd__tab-button bdr--2" title="show filter tab" data-parent-tab="#akd-photo-editor-card-${i} .photo-editor-tab" data-target-tab="#filter-tab-${i}" data-akd-photo-editor-filter-tab>filter</button>
							<button class="akd__tab-button bdr--2" title="show  tab" data-parent-tab="#akd-photo-editor-card-${i} .photo-editor-tab" data-target-tab="#paintdrop-tab-${i}" data-akd-photo-editor-paintdrop-tab>paintdrop</button>
							<button class="akd__tab-button bdr--2" title="show  tab" data-parent-tab="#akd-photo-editor-card-${i} .photo-editor-tab" data-target-tab="#-tab-${i}" data-akd-photo-editor--tab></button>
						</div>
						<div class="akd__tab-panels">
							<div id="comparison-tab-${i}" class="akd__tab-panel active--tab flex--col" data-layout="flex">
								<div class="thumb-wrapper f--6"><div class="img-zoom-container"><img id="display-image-${i}" class="photo-thumb w--12 h--12 m--auto" src="${imgSrc}" alt="${this.filename(imgSrc)}" /></div></div>
							</div>
							<div id="filter-tab-${i}" class="akd__tab-panel flex--col" data-layout="flex">
								<div id="filter-grid-splitter-panel-1-${i}" class="splitter_panel first--half p--4 overflow--auto">
									<ul id="filter-options-${i}" class="filter-options flex flex--wrap gap--4 p--2 bdr--2 bg--info-gradient"></ul>
									<div id="filter-input-wrapper-${i}" class="filter-input-wrapper bg--info-gradient bdr--2 p--2 mt--4"></div>
								</div>
							</div>
							<div id="paintdrop-tab-${i}" class="akd__tab-panel flex--col" data-layout="flex">
								<div id="" class="paintdrop">
									<div class="left-side">
										<canvas id="drop-canvas" width="200"></canvas>
										<span id="control-buttons" class="">
											<button id="getcode" class="" type="button">get code</button>
											<button id="hidecode" class="" type="button">hide code</button>
										</span>
									</div>
									<div class="right-side right-side-grid">
										<div class="snap-container x">
											<ul id="results" class="snap-section"></ul>
											<div id="info" class="snap-section"></div>
											<div id="codebox" class="snap-section hidden"><textarea></textarea></div>
											<!--<canvas id="image-canvas"></canvas>-->
										</div>
										<output id="output" class=""></output>
									</div>
								</div>
							</div>
							<div id="-tab-${i}" class="akd__tab-panel flex--col" data-layout="flex">
							</div>
						</div>
					</div>
					
					<div class="photo-editor-ui flex-place-center f--6 h--6 gap--4">
						<div class="img-comp-container f--6">
							<div class="img-comp-img">
								<img id="secondary-image-${i}" class="secondary-image" src="${imgSrc}" />
							</div>
							<span class="img-comp-slider"></span>
							<div class="img-comp-img img-comp-overlay">
								<img id="source-image-${i}" class="tertiary-image" src="${imgSrc}" data-width="${width}" data-height="${height}" data-akd-photo-editor-source-image />
							</div>
						</div>
						<div class="f--6 flex flex--wrap gap--4 p--4 bdr--2 bg--darker">
							<span class="flex flex--center flex--col gap--4 w--12 py--2 bd--b bds--solid bdw--1 bdc--info">
								<label class="w--12" for="live-edit-${i}" title="toggle live edit">
									<span class="text--white text--900">live edit?</span>
									<input id="live-edit-${i}" class="" type="checkbox" data-akd-photo-editor-go-live />
								</label>
							</span>
							<span class="flex flex--center flex--wrap gap--4 w--12 py--2 bd--b bds--solid bdw--1 bdc--info">
								<button id="copy-image-${i}" class="akd__btn btn--purple" type="button" title="copy image" data-akd-photo-editor-copy-button>copy</button>
								<button id="copy-image-${i}" class="akd__btn btn--purple" type="button" title="show image edit" data-akd-photo-editor-edit-button>edit</button>
								<button id="save-image-${i}" class="akd__btn btn--blue-light" type="button" title="save image edit" data-akd-photo-editor-save-button>save</button>
								<button id="reset-image-${i}" class="akd__btn btn--blue-green" type="button" title="reset changes/edit" data-akd-photo-editor-reset-button>reset</button>
							</span>
							<span class="flex flex--center flex--wrap flex--justify-center gap--4 w--12 py--2 bd--b bds--solid bdw--1 bdc--info">
								<button id="flip-image-horizontally-${i}" class="akd__btn btn--purple" type="button" title="flip image horizontally" data-akd-photo-editor-flip-h-button>flip-H</button>
								<button id="flip-image-vertically-${i}" class="akd__btn btn--blue-light" type="button" title="flip image vertically" data-akd-photo-editor-flip-v-button>flip-V</button>
							</span>
						</div>
					</div>
				</div>
				<div class="photo-tools-output-wrapper pos--rel f--6 w--6 h--12">
					<div class="photo-tools-output w--inherit h--inherit overflow--auto" data-akd-photo-editor-output></div>
					<div class="img-zoom-result-container w--12 bg--opaque">
						<span class="magnify-toggle-handle toggle-handle" data-button></span>
						<div id="myresult-${i}" class="img-zoom-result" data-akd-photo-editor-image-zoom-result></div>
					</div>
				</div>
			
			</div>
			<span class="photo-tool-buttons h--max bg--darker">
				<span class="flex gap--4 mr--auto">
					<button id="" class="zoom-out akd__btn btn--warning" title="zoom image out">&minus;</button>
					<button id="" class="zoom-in akd__btn btn--success" title="zoom image in">&plus;</button>
				</span>
				<span class="flex gap--4 ml--auto">
					<button id="" class="magnify akd__btn btn--navy" title="toggle magnifier">[&nbsp;]</button>
					<button id="" class="edit akd__btn btn--purple" title="edit image">editor<i class="indicator"></i></button>
				</span>
			</span>
			<!--<div class="img-zoom-result-container w--6 bg--opaque">
				<span class="magnify-toggle-handle toggle-handle" data-button></span>
				<div id="myresult-${i}" class="img-zoom-result" data-akd-photo-editor-image-zoom-result></div>
			</div>-->
		</div>`;
	}
	
	/*!
	 * Build photo editor UI
	 * (c) 2022 Andre Lewis, MIT License, https://akd-showcase.netlify.app
	 * @param  {String} type   The event type
	 * @param  {Node}   elem   The element to attach the event to
	 * @param  {Object} detail Any details to pass along with the event
	 */
	AKD_PhotoEditor.prototype.buildUI = function (type, elem, detail) {
		
		return this;
	}
	
	/*!
	 * Build photo editor UI from scratch
	 * (c) 2022 Andre Lewis, MIT License, https://akd-showcase.netlify.app
	 * @param  {String} type   The event type
	 * @param  {Node}   elem   The element to attach the event to
	 * @param  {Object} detail Any details to pass along with the event
	 */
	AKD_PhotoEditor.prototype.buildUIFromScratch = function (type, elem, detail) {
		//let $i = 0
		this.heading = detail.heading || 'The Vagina Monologue';
		this.albumPhotos = detail.albumPhotos;
		this.imageList = this.albumPhotos?.images;
		/* $$$(document).find(".gallery").css({'display':'block','border':'4px solid #ff0000'}).slideShow(<?php echo $albumPhotos;?>);
		var v = $$$(".gallery").slideShow(<?php //echo $albumPhotos;?>);this.galleryContent = v.slideShow;*/
		this.galleryContent = '<p>gallery content<\/p>';
		if(Array.isArray(this.imageList) && this.imageList.length > 0){
			this.galleryContent += `
			<div class="gallery-controls w--12 h--12 p--4">
				<div class="flex gap--4 w--12 px--4 py--6 bg--inherit bdr--2">
					<label class="flex-align-center gap--4 w--12" for="grid-row-changer" title="change grid row count">
						<input id="grid-row-changer" class="akd__input-range w--12" type="range" min="1" max="8" step="1" value="3" onchange="let theGrid = $one('.gallery'), theCount = $one('#grid-row-changer-count');theGrid.setAttribute('data-layout-rows', this.value);theCount.textContent = this.value;">
						<span id="grid-row-changer-count">3</span>
					</label>
					<label class="flex-align-center gap--4 w--12" for="grid-column-changer" title="change grid column count">
						<input id="grid-column-changer" class="akd__input-range w--12" type="range" min="1" max="8" step="1" value="2" onchange="let theGrid = $one('.gallery'), theCount = $one('#grid-column-changer-count');theGrid.setAttribute('data-layout-cols', this.value);theCount.textContent = this.value;">
						<span id="grid-column-changer-count">2</span>
					</label>
				</div>
			</div>
			<div class="gallery flex--wrap w--12 h--12 m--auto p--4" data-layout="flex" data-layout-cols="2" data-layout-rows="3" data-layout-gap="4">
				${this.imageList.map((imgSrc, i) => {
					return `<div id="akd-photo-editor-card-${i}" class="akd-photo-editor-card ui-pattern-1" data-layout="grid-auto" data-layout-row-auto="auto 1fr auto" >
						<span class="photo-controls bg--darker">
							<button id="" class="view akd__btn btn--info mr--auto" title="toggle editor view">&copy;</button>
							<button id="" class="close akd__btn btn--danger ml--auto" title="close editor view">&times;</button>
						</span> 
						<div class="photo-main-area" data-akd-photo-editor-parent>
							<div class="photo-editor-tab akd__tab flex flex--col h--12 w--6 f--6">
								<div class="f--6 h--6 bd--b bds--solid bdw--1 bdc--info" data-layout="grid-auto" data-layout-rows="auto-1fr">
									<div class="akd__tab-buttons h--max">
										<button class="akd__tab-button active--tab bdr--2" title="show comparison tab" data-parent-tab="#akd-photo-editor-card-${i} .photo-editor-tab" data-target-tab="#comparison-tab-${i}" data-akd-photo-editor-comparison-tab>comp</button>
										<button class="akd__tab-button bdr--2" title="show filter tab" data-parent-tab="#akd-photo-editor-card-${i} .photo-editor-tab" data-target-tab="#filter-tab-${i}" data-akd-photo-editor-filter-tab>filter</button>
										<button class="akd__tab-button bdr--2" title="show  tab" data-parent-tab="#akd-photo-editor-card-${i} .photo-editor-tab" data-target-tab="#-tab-${i}" data-akd-photo-editor--tab></button>
									</div>
									<div class="akd__tab-panels">
										<div id="comparison-tab-${i}" class="akd__tab-panel active--tab flex--col" data-layout="flex">
											<div class="thumb-wrapper f--6"><img id="display-image-${i}" class="photo-thumb m--auto" src="${imgSrc}" alt="${this.filename(imgSrc)}" /></div>
										</div>
										<div id="filter-tab-${i}" class="akd__tab-panel flex--col" data-layout="flex">
											<div id="filter-grid-splitter-panel-1-${i}" class="splitter_panel first--half p--4 overflow--auto">
												<ul id="filter-options-${i}" class="filter-options flex flex--wrap gap--4 p--2 bdr--2 bg--info-gradient"></ul>
												<div id="filter-input-wrapper-${i}" class="filter-input-wrapper bg--info-gradient bdr--2 p--2 mt--4"></div>
											</div>
										</div>
										<div id="-tab-${i}" class="akd__tab-panel flex--col" data-layout="flex">
										</div>
									</div>
								</div>
								
								<div class="photo-editor-ui flex-place-center f--6 h--6 gap--4">
									<div class="img-comp-container f--6">
										<div class="img-comp-img">
											<img id="secondary-image-${i}" class="secondary-image" src="${imgSrc}" />
										</div>
										<span class="img-comp-slider"></span>
										<div class="img-comp-img img-comp-overlay">
											<img id="source-image-${i}" class="tertiary-image" src="${imgSrc}" data-akd-photo-editor-source-image />
										</div>
									</div>
									<div class="f--6 flex flex--wrap gap--4 p--4 bdr--2 bg--darker">
										<span class="flex flex--center flex--col gap--4 w--12 py--2 bd--b bds--solid bdw--1 bdc--info">
											<label class="w--12" for="live-edit-${i}" title="toggle live edit">
												<span class="text--white text--900">live edit?</span>
												<input id="live-edit-${i}" class="" type="checkbox" data-akd-photo-editor-go-live />
											</label>
										</span>
										<span class="flex flex--center flex--wrap gap--4 w--12 py--2 bd--b bds--solid bdw--1 bdc--info">
											<button id="copy-image-${i}" class="akd__btn btn--purple" type="button" title="copy image" data-akd-photo-editor-copy-button>copy</button>
											<button id="copy-image-${i}" class="akd__btn btn--purple" type="button" title="show image edit" data-akd-photo-editor-edit-button>edit</button>
											<button id="save-image-${i}" class="akd__btn btn--blue-light" type="button" title="save image edit" data-akd-photo-editor-save-button>save</button>
											<button id="reset-image-${i}" class="akd__btn btn--blue-green" type="button" title="reset changes/edit" data-akd-photo-editor-reset-button>reset</button>
										</span>
										<span class="flex flex--center flex--wrap flex--justify-center gap--4 w--12 py--2 bd--b bds--solid bdw--1 bdc--info">
											<button id="flip-image-horizontally-${i}" class="akd__btn btn--purple" type="button" title="flip image horizontally" data-akd-photo-editor-flip-h-button>flip-H</button>
											<button id="flip-image-vertically-${i}" class="akd__btn btn--blue-light" type="button" title="flip image vertically" data-akd-photo-editor-flip-v-button>flip-V</button>
										</span>
									</div>
								</div>
							</div>
							<div class="photo-tools-output f--6 w--6 h--12 overflow--auto" data-akd-photo-editor-output></div>
						</div>
						<span class="photo-tool-buttons bg--darker">
							<span class="flex gap--4 mr--auto">
								<button id="" class="zoom-out akd__btn btn--warning" title="zoom image out">&minus;</button>
								<button id="" class="zoom-in akd__btn btn--success" title="zoom image in">&plus;</button>
							</span>
							<span class="flex gap--4 ml--auto">
								<button id="" class="magnify akd__btn btn--navy" title="toggle magnifier">[&nbsp;]</button>
								<button id="" class="edit akd__btn btn--purple" title="edit image">editor<i class="indicator"></i></button>
							</span>
						</span>
					</div>`
				}).join('')}
			<\/div>`;
		}
		$.on('button', 'click', function (e) {
			let $this = e.target, $card = $this.closest('.akd-photo-editor-card'), 
			$sourceImage = $.one('[data-akd-photo-editor-source-image]', $card), 
			$goLiveInput = $.one('[data-akd-photo-editor-go-live]', $card);
			//_.AKD_PhotoEditor($.one(".photo-main-area", $card), {})
			let pEditor = _.AKD_PhotoEditor($card, {key: $card.id});
			let blur = $sourceImage.dataset?.blur??'', 
				saturate = $sourceImage.dataset?.saturate || $sourceImage.dataset?.saturation, 
				huerotate = $sourceImage.dataset?.hueRotate, 
				contrast = $sourceImage.dataset?.contrast, 
				opacity = $sourceImage.dataset?.opacity, 
				brightness = $sourceImage.dataset?.brightness, 
				sepia = $sourceImage.dataset?.sepia, 
				invert = $sourceImage.dataset?.invert || $sourceImage.dataset?.invertion, 
				grayscale = $sourceImage.dataset?.grayscale || $sourceImage.dataset?.grayScale, 
				filter_str = `blur(${blur}) saturate(${saturate}) hue-rotate(${huerotate}) contrast(${contrast}) brightness(${brightness}) grayscale(${grayscale}) invert(${invert}) sepia(${sepia}) opacity(${opacity})`;
				
			if($this.matches(".edit")){
				if($card.classList.contains('toggled')) {
					$card.classList.toggle('full');
					if(!$card.classList.contains('full')){
						pEditor.flush()
						$.one('[data-akd-photo-editor-comparison-tab]', $card).click();
					} else {
						pEditor.init()
					}
					$this.classList.toggle('is-active');
				}
			} else if($this.matches(".view")){
				$card.classList.toggle('toggled');
				$this.classList.toggle('is-active');
			} else if($this.matches(".close")){
				$card.classList.remove('toggled');
				$card.querySelector('.view').classList.remove('is-active');
				$.one('[data-akd-photo-editor-comparison-tab]', $card).click();
			} else if($this.matches(".zoom-in")){
				let img = $card.querySelector('.photo-thumb');
				if(isElement(img)){
					$this.zoomImage(img, 'in', 1.5);
				}
			} else if($this.matches(".zoom-out")){
				let img = $card.querySelector('.photo-thumb');
				if(isElement(img)){
					$this.zoomImage(img, 'out', 1.5);
				}
			} else if($this.matches(".flip-H")){
				let img = $card.querySelector('.photo-thumb');
				if(isElement(img)){
					$this.flipCanvasImage('h', 1);
					//$this.flipImage(img, 'h');
				}
			} else if($this.matches(".flip-V")){
				let img = $card.querySelector('.photo-thumb');
				if(isElement(img)){
					$this.flipCanvasImage('v', 1);
					//$this.flipImage(img, 'v');
				}
			} else if($this.hasAttribute("data-akd-photo-editor-reset-button")){
				let $this = e.target.closest('.akd-photo-editor-card');
				if($card.classList.contains('full')) {
					//let pEditor = _.AKD_PhotoEditor($this, {key: $this.id});
					pEditor.resetImage();
					pEditor.FILTER_OPTIONS = pEditor.FILTER_OPTIONS_CACHED;
				}
			} else if($this.hasAttribute("data-akd-photo-editor-edit-button")){
				if(pEditor.$goLiveInput.checked !== true && $card.classList.contains('full')) {
					//pEditor.FILTER_IMAGE.style.filter = filter_str;
					//$.one(".filter-option.selected").parentElement.querySelector(".filter-option-value").textContent = e.target.value.toString();
					pEditor.canvasFilter(filter_str);
					console.log(filter_str)
				}
			} else if($this.hasAttribute("data-akd-photo-editor-copy-button")){
				if($card.classList.contains('full')) {
					let newSource = '';
					pEditor.copyImage(newSource);
				}
			} else if($this.hasAttribute("data-akd-photo-editor-save-button")){
				if($card.classList.contains('full')) {
					pEditor.saveImage();
				}
			}
		}.bind(this));
		$.on('[data-akd-photo-editor-go-live]', 'change', function (e) {
			let $this = e.target, $card = $this.closest('.akd-photo-editor-card'), 
			$showButton = $card.querySelector('[data-akd-photo-editor-edit-button]');
			if($card.classList.contains('full') && isElement($showButton)) {
				if($this.checked === true) $showButton.setAttribute("disabled", '');
				else $showButton.removeAttribute("disabled");
				//let pEditor = _.AKD_PhotoEditor($this, {key: $card.id});
				//pEditor.saveImage();
			}
		}.bind(this));
		/* this.$on("#template-view", 'routerload', function (e) {console.log(e.target.innerHTML)}.bind(this));
		$.one("#template-view").addEventListener('routerload', function (e) {//console.log(e.target.innerHTML)}.bind(this)); */
		return this;
	}
	////////////////////////////////////////////////////////////
	AKD_PhotoEditor.prototype.initFilter = function initFilter(newSource) {
		const $this = this, 
		FILTER_IMAGE = isElement(newSource) && isImage(newSource) ? newSource : this.$sourceImage, 
		FILTER_CANVAS = this.$canvas, 
		FILTER_CANVAS_CTX = this.$ctx, 
		FILTER_OPTIONS = [
			{name: "Brightness", property: "brightness", value: 100, range: {min: 0, max: 100, step: 1}, unit: "%"},
			{name: "Contrast", property: "contrast", value: 100, range: {min: 0, max: 200, step: 1}, unit: "%"},
			{name: "Saturation", property: "saturate", value: 100, range: {min: 0, max: 1000, step: 0.1}, unit: "%"},
			{name: "Grayscale", property: "grayscale", value: 0, range: {min: 0, max: 100, step: 1}, unit: "%"},
			{name: "Sepia", property: "sepia", value: 0, range: {min: 0, max: 100, step: 1}, unit: "%"},
			{name: "Hue Rotate", property: "hue-rotate", value: 0, range: {min: 0, max: 360, step: 1, }, unit: "deg"},
			{name: "Blur", property: "blur", value: 0, range: {min: 0, max: 20, step: 1, }, unit: "px"},
			{name: "Opacity", property: "opacity", value: 1, range: {min: 0, max: 1, step: 0.01, }, unit: ""},
			{name: "Invert", property: "invert", value: 0, range: {min: 0, max: 1, step: 0.01, }, unit: ""},
		], 
		FILTER_OPTIONS_CACHED = [...FILTER_OPTIONS];
		this.FILTER_OPTIONS = [...FILTER_OPTIONS];
		this.FILTER_OPTIONS_CACHED = [...this.FILTER_OPTIONS];
		this.selectedIndex = 0;
		this.selectedFilterOption = this.FILTER_OPTIONS[this.selectedIndex];
		
		let selectedIndex = 0, selectedFilterOption = FILTER_OPTIONS[selectedIndex],
		ofrag = document.createDocumentFragment();
		if($.all(".filter-options > li", this.$container).length === 0){
			//for(const option of this.FILTER_OPTIONS){
			//FILTER_OPTIONS.forEach((option, index) => {
			this.FILTER_OPTIONS.forEach((option, index) => {
				let s = $this.shuffle($this.$_skinz), 
				el = $.tag("li", {"class": "filter-item flex flex--center gap--4 w--max"}, 
					$.tag("button", {
						"class": `filter-option akd__btn btn--${s[0]} w--lg-10 w--md-8 w--sm-8 flex--justify-start` + (Number(index) === Number(selectedIndex) ? ' selected is-active' : ''), 
						"dataset": {index, min: option.range.min, max: option.range.max, step: option.range.step, value: option.value},
						onclick: (e) => {
							let $_this = isElement(this) ? this : e.target;
							//selectedIndex = $.one(".filter-grid .filter-option > button.selected")?.dataset.index || 0;
							//selectedFilterOption = FILTER_OPTIONS[index] || FILTER_OPTIONS[0];
							$this.selectedIndex = Number(index) || 0;
							$this.selectedFilterOption = $this.FILTER_OPTIONS[$this.selectedIndex] || $this.FILTER_OPTIONS[0];
							$.removeClass($.all(".filter-option", $this.$container), "selected, is-active");
							$.addClass($_this, "selected, is-active");
							Object.assign($this.$filterInput, {min: option.range.min, max: option.range.max, step: option.range.step, value: option.value})
							$_this.nextElementSibling.textContent = option.value.toString();
							//$_this.parentElement.querySelector(".filter-option-value").textContent = option.value.toString();
						}
					}, option.name), 
					$.tag("span", {"class": `filter-option-value w--lg-2 w--md-4 w--sm-4 p--2 text--900 text--${s[0]} text--left bg--white`}, option.value.toString())
				);
				ofrag.appendChild(el);
			});
			//$.one(".filter-options", this.$container).insertAdjacentElement('beforeend',ofrag);
			$.one(".filter-options", this.$container).appendChild(ofrag);
			this.$filterInput = $.tag("input", {
				"id": "filter-input-"+$i, "class": "akd__input-range w--12 p--0", type: "range", min: this.selectedFilterOption.range.min, max: this.selectedFilterOption.range.max, step: this.selectedFilterOption.range.step, value: this.selectedFilterOption.value, 
				//dataset: {`${$.camelize('akd-photo-editor-filter-input')}`:''}, 
				dataset: {'akdPhotoEditorFilterInput':''}, 
				onchange: (e) => {
					let filter_str = '', filter_obj = {};
					//selectedFilterOption.value = e.target.value;
					$this.selectedFilterOption.value = e.target.value;
					//filter_str = `${$this.FILTER_OPTIONS.map(op=> `${op.property}(${op.value}${op.unit})`).join(' ')}`;
					//FILTER_OPTIONS.forEach(op=> {
					$this.FILTER_OPTIONS.forEach(op=> {
						filter_str += `${op.property}(${op.value}${op.unit}) `;
						filter_obj[$.camelize(op.property)] = `${op.value}${op.unit}`;
					});
					
					$.setNodeAttribute(FILTER_IMAGE,{
						'style': {filter: filter_str}, 
						'dataset': {...filter_obj}
					});
					//$.one(".filter-option.selected").parentElement.querySelector(".filter-option-value").textContent = e.target.value.toString();
					$.one(".filter-option.selected").nextElementSibling.textContent = e.target.value.toString();
					if($this.$goLiveInput.checked === true){
						$this.canvasFilter(filter_str);
					}
				}
			});
			//this.$filterInput.setAttribute("data-akd-photo-editor-filter-input", '');
			$.one(".filter-input-wrapper", this.$container).appendChild(this.$filterInput);
		}
		/* this.on($.one(".filter-image-file-input", this.$container), 'change',e=>{
			let file = e.target.files[0];
			imgSrc = URL.createObjectURL(file);
			FILTER_IMAGE.src = imgSrc;
			FILTER_IMAGE.onload = () => URL.revokeObjectURL(imgSrc);
		});
		
		Object.assign(FILTER_IMAGE.style, {width: `100%`, height: `100%`});
		this.on(FILTER_IMAGE, 'wheel', e =>{
		//this.on(document, 'wheel', e =>{
			//if(e.target.id === "filter-image"){
				let zoom = 1.5, newSize, 
				w = $this.elementStyle(FILTER_IMAGE).width.replace('px', ''), 
				h = $this.elementStyle(FILTER_IMAGE).height.replace('px', '');
				if(e.deltaY > 0){
				//var imageStyle = img.style, imgW = img.width,imgH = img.height,zoomW = how === 'in' ? (imgW/zoom) : (imgW*zoom), zoomH = how === 'in' ? (imgH/zoom) : (imgH*zoom);
		
					//newSize = zoom <= 75 ? zoom += 2 : zoom = 75;
					//zoom += 2;
					newSize_W = w <= 75 ? 75 : w / zoom;
					newSize_H = h <= 75 ? 75 : h / zoom;
				} else {
					//zoom -= 2;
					//newSize = zoom <= 45 ? zoom = 45 : zoom -= 2;
					newSize_W = w * zoom;
					newSize_H = h * zoom;
				}
				//console.log(e)
				//console.log(w, newSize_W, newSize_H, e.deltaY, e.deltaX)
				//Object.assign(FILTER_IMAGE.style, {width: `${newSize}%`, height: `${newSize}%`});
				Object.assign(FILTER_IMAGE.style, {width: `${newSize_W}px`, height: `${newSize_H}px`});
			//}
		}); */
		return this;
	}
	////////////////////////////////////////////////////////////
	AKD_PhotoEditor.prototype.initDragger = function(dragHandle = ".img-comp-slider", dragPanel = ".img-comp-overlay", min = 1.5, max = 100) {
		var $dragging = false, mainPercentage, percentage = 100, $parent = window, 
		$dragHandle = $.one(dragHandle, this.$container), $dragParentContainer = $dragHandle.parentElement, 
		$dragPanel = $.one(dragPanel, this.$container), hw = ($dragHandle.offsetWidth / 2);
		function dragstart(e){$dragging = true;e.preventDefault();}
		function dragend(e) {$dragging = false;}
		function dragmove(e) {
			if($dragging){
				//percentage = (e.pageX / ($dragParentContainer.offsetWidth??window.innerWidth)) * 100;
				percentage = ((e.pageX - 20) / $dragParentContainer.offsetWidth) * 100;
				if(percentage > min && percentage < max) {
					mainPercentage = 100-percentage;
					Object.assign($dragPanel.style,{'width':`${percentage}%`});
					Object.assign($dragHandle.style,{'left':`calc(${percentage}% - ${hw}px)`});
				}
			}
		}
		if(isElement($dragHandle) && isElement($dragPanel)){
			Object.assign($dragHandle.style,{'left':`calc(${percentage}% - ${hw}px)`,transition:"none"});
			Object.assign($dragPanel.style,{transition:"none"});
			$dragHandle.addEventListener("mousedown",function(e){dragstart(e);});
			$dragHandle.addEventListener("touchstart",function(e){dragstart(e);});
			$parent.addEventListener("mousemove",function(e){dragmove(e);});
			$parent.addEventListener("touchmove",function(e){dragmove(e);});
			$parent.addEventListener("mouseup",function(e){dragend(e);});
			$parent.addEventListener("touchend",function(e){dragend(e);});
			$parent.addEventListener("touchstop",function(e){dragend(e);});
		}
		return this;
	}
	AKD_PhotoEditor.prototype.initDragger2 = function(dragHandle = ".img-comp-slider", dragPanel = ".img-comp-overlay", from = 'right', min = 1.5, max = 100) {
		var where,$dragging = false, mainPercentage, percentage = 100, $parent = window, 
		$dragHandle = $.one(dragHandle, this.$container), $dragParentContainer = $dragHandle.parentElement.parentElement, 
		$dragPanel = $.one(dragPanel, this.$container), hw = $dragHandle.offsetWidth, hhw = (hw / 2);
		function dragstart(e){$dragging = true;e.preventDefault();}
		function dragend(e) {$dragging = false;if($dragPanel.classList.contains('is-dragging')){$dragPanel.classList.remove('is-dragging')}}
		function dragmove(e) {
			if($dragging){
				//percentage = (e.pageX / ($dragParentContainer.offsetWidth??window.innerWidth)) * 100;
				percentage = ((e.pageX - 40) / $dragParentContainer.offsetWidth) * 100;
				//console.log(percentage, mainPercentage)
				if(percentage > min && percentage < max) {
					mainPercentage = 100-percentage;
					let newSize = from === 'left' ? `${percentage}%` : `${mainPercentage}%`;
					where = from === 'left' ? 'right' : 'left';
					Object.assign($dragPanel.style,{'width': newSize,'flex': newSize});
					//Object.assign($dragHandle.style,{'left':`calc(${percentage}% - ${hw}px)`});
					//Object.assign($dragHandle.style, {left :`0`, right: 'auto'});
					if(!$dragPanel.classList.contains('is-dragging')){$dragPanel.classList.add('is-dragging')}
				}
			}
		}
		if(isElement($dragHandle) && isElement($dragPanel)){
			where = from === 'left' ? 'right' : 'left';
			//Object.assign($dragHandle.style, {'left':`calc(${percentage}% - ${hw}px)`,transition:"none"});
			Object.assign($dragHandle.style,{left :`0`, right: 'auto'});
			Object.assign($dragPanel.style, {transition:"none"});
			$dragHandle.addEventListener("mousedown",function(e){dragstart(e);});
			$dragHandle.addEventListener("touchstart",function(e){dragstart(e);});
			$parent.addEventListener("mousemove",function(e){dragmove(e);});
			$parent.addEventListener("touchmove",function(e){dragmove(e);});
			$parent.addEventListener("mouseup",function(e){dragend(e);});
			$parent.addEventListener("touchend",function(e){dragend(e);});
			$parent.addEventListener("touchstop",function(e){dragend(e);});
		}
		return this;
	}
	
	/*!
	 * Emit a custom event
	 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {String} type   The event type
	 * @param  {Node}   elem   The element to attach the event to
	 * @param  {Object} detail Any details to pass along with the event
	 */
	AKD_PhotoEditor.prototype.emitEvent = function (type, elem, detail) {
		// Make sure there's an event type
		if (!type) return;
		// Variables
		elem = elem || window;
		detail = detail || {};
		// Create a new event
		var event = new CustomEvent(type, {
			bubbles: true,
			cancelable: true,
			detail: detail
		});
		// Dispatch the event
		elem.dispatchEvent(event);
		return this;
	}
	AKD_PhotoEditor.prototype.trigger = function(name){var that = this;return this.forEach(this.results, function() {var event = document.createEvent('HTMLEvents');if ( !event.target ) {event.target = this;}event.initEvent(name,true,false);this.dispatchEvent(event);});/* return this; */};

	AKD_PhotoEditor.prototype.initEvents = function initEvents(extra={}) {
		let self = this;
		const $$this = this;
		const handleCardMousemove = (e) => {
			const {currentTarget: target} = e;
			const rect = target.getBoundingClientRect(), 
			x = e.clientX - rect.left, 
			y = e.clientY - rect.top;
			
			target.style.setProperty("--mouse-x", `${x}px`);
			target.style.setProperty("--mouse-y", `${y}px`);
		}
		for(const card of $.all(".card")){
			card.addEventListener("mousemove", e => handleCardMousemove(e))
		}
		$.one(".cards").addEventListener("mousemove", e => {
			for(const card of $.all(".card")){
				//card.addEventListener("mousemove", e => handleCardMousemove(e))
				const rect = card.getBoundingClientRect(), 
				x = e.clientX - rect.left, 
				y = e.clientY - rect.top;
				
				card.style.setProperty("--mouse-x", `${x}px`);
				card.style.setProperty("--mouse-y", `${y}px`);
			}
		});
		function activeLink(){
			list.forEach(item => item.classList.remove('nav-active'));
			this.classList.add('nav-active');
		}
		
		const list = $.all(".list");
		list.forEach(item => item.addEventListener('click', activeLink));
		
		this.scrollIndicator('#explorer-result-container', '#explorer-scroll-indicator')
		/* this.initDragger2(".showcase-drag-handle", ".akd-editor-preview-container.drag-panel", 'right', 0.15, 100);
		this.dragElement(`#akd-editor-main-layout-splitter-handle-${$i}`, `#akd-editor-main-layout-splitter-navbar-${$i}`, `#akd-editor-main-layout-splitter-body-${$i}`, 'H');
			this.dragElement(`#akd-editor-main-layout-splitter-body-handle-${$i}`, `#akd-editor-main-layout-splitter-body-input-panel-${$i}`, `#akd-editor-main-layout-splitter-body-output-panel-${$i}`, 'V');
			this.dragElement(`#akd-editor-and-preview-splitter-handle-${$i}`, `#akd-editor-main-layout-splitter-${$i}`, `#akd-editor-preview-container-${$i}`, 'H');
			this.dragElement(`#akd-editor-preview-run-mode-splitter-handle-${$i}`, null, null, 'V');
		*/
		
		/* window.addEventListener('load', function(e) {
			if(this._observeMutations === true) this.mutationsObserver(e, "load");
		
			let btns = $qsa(that.params.linkId), 
			btn = $qs(`[data-route="${that.currentRoute}"]`);
			
			if(Array.isArray(btns)) btns.forEach(b => b.classList.remove(that.params.linkActiveClass));
			if(btn) btn.classList.add(that.params.linkActiveClass);
		}); */
		//document.addEventListener($_clickEvent, function(e) {
		//this.$container.addEventListener($_clickEvent, function(e) {
		$.on(document, $_clickEvent, 'a, button, [data-button]', function (e) {
			const $main = document.getElementById("main"), 
			$mainContent = $main.querySelector(".main-content"), 
			$body = document.body, 
			_loading_error_code = '<center><p style="text-align: center !important;">Error!</p><p style="text-align: center !important;color:red;text-shadow:0 1px 0 #ffffff;">There was a problem and the page didnt load. Possible reasons could be, the URL is incorrect or you are offline(script not called from a server, <strong>ajax<\/strong> only works online)<\/p><\/center>';
			
			let $this = isElement(this) ? this : e.target, filter_str = '', 
			trimmed = self.params.linkId.replace('[', '').replace(']', '').replace('.', '').replace('#', ''), 
			$card = $this.closest('.akd-photo-editor-card'), 
			$sourceImage = $.one('[data-akd-photo-editor-source-image]', $card), 
			$goLiveInput = $.one('[data-akd-photo-editor-go-live]', $card);
			if($this.hasAttribute(trimmed) || $this.hasAttribute('data-akd-route-link') || $this.hasAttribute('data-route-link')) {
				e.preventDefault();
				let route = $this.getAttribute('data-akd-route') || $this.getAttribute('data-route'), btns = $qsa(self.params.linkId)
				if(isString(route) && (/#/.test.route || route.match(/^.*#/) || route.match(/^#/))){
					route = route.slice(1);
				}
			}
			if(isElement($sourceImage)){
				//_.AKD_PhotoEditor($.one(".photo-main-area", $card), {})
				let blur = $sourceImage.dataset?.blur??'', 
					saturate = $sourceImage.dataset?.saturate || $sourceImage.dataset?.saturation, 
					huerotate = $sourceImage.dataset?.hueRotate, 
					contrast = $sourceImage.dataset?.contrast, 
					opacity = $sourceImage.dataset?.opacity, 
					brightness = $sourceImage.dataset?.brightness, 
					sepia = $sourceImage.dataset?.sepia, 
					invert = $sourceImage.dataset?.invert || $sourceImage.dataset?.invertion, 
					grayscale = $sourceImage.dataset?.grayscale || $sourceImage.dataset?.grayScale;
					
					filter_str = `blur(${blur}) saturate(${saturate}) hue-rotate(${huerotate}) contrast(${contrast}) brightness(${brightness}) grayscale(${grayscale}) invert(${invert}) sepia(${sepia}) opacity(${opacity})`;
			}
			if($this.id === "main-sidebar-toggler"){
				let $fa = $this.querySelector('.fa');
				$this.classList.toggle("is-active");
				$body.classList.toggle("main-sidebar-toggled");
				if($body.classList.contains("main-sidebar-toggled")){
					$fa.classList.replace("fa-chevron-right", "fa-chevron-left");
				} else $fa.classList.replace("fa-chevron-left", "fa-chevron-right");
			} else if($this.id === "utility-sidebar-toggler"){
				let $fa = $this.querySelector('.fa');
				$this.classList.toggle("is-active");
				$body.classList.toggle("utility-sidebar-toggled");
				if($body.classList.contains("utility-sidebar-toggled")){
					$fa.classList.replace("fa-chevron-left", "fa-chevron-right");
				} else $fa.classList.replace("fa-chevron-right", "fa-chevron-left");
			} else if($this.id === "explorer-toggler"){
				$this.classList.toggle("is-active");
				$body.classList.toggle("explorer-toggled");
			} else if($this.id === "getcode"){
				let codebox = document.querySelector('#codebox');
				showcode(codebox);
			} else if($this.id === "hidecode"){
				let codebox = document.querySelector('#codebox');
				hidecode(codebox);
			} else if($this.id === "showcase-sidebar-toggler"){
				let $i = $.one('i', $this);
				$.toggleClass($.one('.browser__sidebar'), 'toggled');
				$.toggleClass($this, 'is-active');
				$.toggleClass($i, 'fa-arrow-right fa-arrow-left');
				if($i.classList.contains('fa-arrow-right')){$this.title = 'show showcase sidebar';} else {$this.title = 'hide showcase sidebar';}
			} else if($this.id === "showcase-thumbnails-toggler"){
				let $i = $.one('i', $this);
				$.toggleClass($.one('.browser__showcase .browser__thumbnails-wrapper'), 'toggled');
				$.toggleClass($.one('.photos-showcase'), 'thumbnails-wrapper-toggled');
				$.toggleClass($this, 'is-active');
				$.toggleClass($i, 'fa-arrow-down fa-arrow-up');
				if($i.classList.contains('fa-arrow-down')){
					this.title = 'show thumbnails';
				} else {
					this.title = 'hide thumbnails';
				}
			} else if($this.id === "init-filters"){
				//<button id="" class="btn akd__btn btn--pink mx--4" title="initiate filters"><i class="fa fa-sliders-h"></i></button>
			} else if($this.id === "showcase-image-flip-vertical"){
				let $i = $.one('i', $this), rotate = $.one('#rotate-input').value, img = $.one('.browser__showcase img'), 
				op_val = img.classList.contains('flipped-horizontally') ? '-1' : '1';
				$.toggleClass(img, 'flipped-vertically');
				if(img.classList.contains('flipped-vertically')){
					img.style.transform = `rotate(${rotate}deg) scale(-1,${op_val})`;
				} else {
					img.style.transform = `rotate(${rotate}deg) scale(1,${op_val})`;
				}
			} else if($this.id === "showcase-image-flip-horizontal"){
				let $i = $.one('i',$this), rotate = $.one('#rotate-input').value, img = $.one('.browser__showcase img'), 
				op_val = img.classList.contains('flipped-vertically') ? '-1' : '1';
				$.toggleClass(img, 'flipped-horizontally');
				if(img.classList.contains('flipped-horizontally')){
					img.style.transform = `rotate(${rotate}deg) scale(${op_val},-1)`
				} else {
					img.style.transform = `rotate(${rotate}deg) scale(${op_val},1)`;
				}
			} else if($this.id === "showcase-image-zoom-in"){
				self.zoomImage('.browser__image img', 'in');
			} else if($this.id === "showcase-image-zoom-out"){
				self.zoomImage('.browser__image img', 'out');
			} else if($this.id === "showcase-image-fit-toggler"){
				let $i = $.one('i', $this);
				$.toggleClass($.one('.browser__showcase img'), 'actual-size fit-to-window');
				$.toggleClass($i, 'fa-compress fa-expand');
				if($i.classList.contains('fa-expand')){$this.title = 'Fit image to window';} else {$this.title = 'Display image in actual size';}
			} else if($this.matches(".browser_thumbnail")){
				let $img = $.one('img', $this);
				$.removeClass($.all('.browser_thumbnail'), 'active');
				$.addClass($this, 'active');
				$.setNodeAttribute($.one('.browser__image img'), {'data-full-width': $img.dataset.fullWidth,'data-full-height': $img.dataset.fullHeight, 'width': $img.dataset.fullWidth, 'height': $img.dataset.fullHeight, 'src': $img.getAttribute('src')});
				$.removeClass($.one('.browser_thumbnail-wrapper'), 'active');
			} else if($this.matches(".edit")){
				if($card.classList.contains('toggled')) {
					$card.classList.toggle('full');
					if(!$card.classList.contains('full')){
						self.flush()
						$.one('[data-akd-photo-editor-comparison-tab]', $card)?.click();
					} else {
						let $img = $card.querySelector('[data-akd-photo-editor-source-image]');
						if(isElement($img)){
							self.init($img)
						}
					}
					$this.classList.toggle('is-active');
				}
			} else if($this.matches(".hide-color")){
				if ($this.tagName === 'BUTTON') {
					//$this.parentNode.classList.add('hideme');
					$this.parentNode.classList.add('hidden');
				}
			} else if($this.matches(".view")){
				$card.classList.toggle('toggled');
				$this.classList.toggle('is-active');
			} else if($this.matches(".close")){
				$card.classList.remove('toggled');
				$card.querySelector('.view').classList.remove('is-active');
				$.one('[data-akd-photo-editor-comparison-tab]', $card).click();
			} else if($this.matches(".zoom-in")){
				let img = $card.querySelector('.photo-thumb');
				if(isElement(img)){
					self.zoomImage(img, 'in', 1.5);
				}
			} else if($this.matches(".zoom-out")){
				let img = $card.querySelector('.photo-thumb');
				if(isElement(img)){
					self.zoomImage(img, 'out', 1.5);
				}
			} else if($this.matches(".flip-H")){
				let img = $card.querySelector('.photo-thumb');
				if(isElement(img)){
					self.flipImage(img, 'h');
				}
			} else if($this.matches(".flip-V")){
				let img = $card.querySelector('.photo-thumb');
				if(isElement(img)){
					self.flipImage(img, 'v');
				}
			} else if($this.matches(".magnify-toggle-handle")){
				let container = $.one('.img-zoom-result-container', $card);
				if(isElement(container)){
					let toggleHandle = $.one('.toggle-handle', container);
					container.classList.toggle('toggled');
					toggleHandle.classList.toggle('active');
				}
			} else if($this.matches(".magnify")){
				let img = $.one('.photo-thumb', $card), 
				cx = 11.5, cy = 12.535, 
				//let img = $.one('.tertiary-image', $card), 
				container = $.one('.img-zoom-result-container', $card);
				if(isElement(container) && isElement(img)){
					let toggleHandle = $.one('.toggle-handle', container);
					toggleHandle.classList.add('active');
					container.classList.add('toggled');
					//self.flipImage(img, 'v');
					//Initiate the Zoom Effect:
					self.imageZoom(img, "[data-akd-photo-editor-image-zoom-result]",cx, cy);
				}
			} else if($this.hasAttribute("data-akd-photo-editor-flip-h-button")){
				self.flipCanvasImage('h');
			} else if($this.hasAttribute("data-akd-photo-editor-flip-v-button")){
				self.flipCanvasImage('v');
			} else if($this.matches('.file-layout-container-toggler')){
				let $el = $this.closest('.file-layout').querySelector('.file-layout-container');
				if(isElement($el)){
					$el.classList.toggle('toggled');
					$this.classList.toggle('is-active');
					if($el.classList.contains('toggled')) $this.querySelector('.fa').classList.replace('fa-minus', 'fa-plus');
					else $this.querySelector('.fa').classList.replace('fa-plus', 'fa-minus');
				}
			} else if($this.matches('.layout-button')){
				let $targets = $.all('#explorer-result-container, .file-layout-container'), layout_view = $this.dataset.layoutOption;
				$.removeClass('.layout-button', 'is-active');
				$.addClass($this, 'is-active');
				$.forEach($targets, $t => isElement($t) && $t.setAttribute('data-view-layout', layout_view));
			} else if($this.matches('.ajax-link')){
				e.preventDefault();
				let data, formdata, result = '', 
					$target_url = $this.getAttribute('href') || $this.getAttribute("data-href"), 
					// form, $uri = form && form.getAttribute("action") || document.querySelector("[data-url]") && document.querySelector("[data-url]").value || $this.getAttribute('href') || $this.getAttribute("data-href"), 
					hasHref = isString($target_url) && $target_url.length > 0, 
					$timeStart = new Date().getTime(), $timeEnd = 0, 
					$method = ($this.dataset.ajaxMethod || $this.dataset.method || "GET"), 
					$as = ($this.dataset.as || 'json'), 
					$mode = ($this.dataset.mode || 'show_content'), 
					/* $target_str = $this.dataset.ajaxTarget || $this.dataset.target, 
					$target = $ajax_target = $.one($target_str), */
					$target = $.one('#explorer-result-container', self.$container);
					
				$target.innerHTML = self.loader;
				$.one('#explorer-scroll-indicator').style.width = '0px';
				if(hasHref && !/javascript/.test($target_url)){
					self.renderAjaxContent($target_url, $target, $mode, $as);
				}
			} else if($this.matches('.akd__tab-button')){
				e.preventDefault();
				let $target = $this.dataset.targetTab || $this.dataset.target, 
				parent = $.one($this.dataset.parentTab) || $this.closest('.akd__tabs') || $this.parentElement.parentElement,
				active_tab_class= $this.dataset.activeTabClass || null;
				
				if(isElement(parent) && isString($target)){
					let tab_buttons = $.all(".akd__tab-button:not(.akd__tabs .akd__tabs .akd__tab-button.active--tab)", parent), 
					tab_panels = $.all(".akd__tab-panel:not(.akd__tabs .akd__tabs .akd__tab-panel.active--tab)", parent), 
					tab_controls = $.all(".tab-controls"), 
					target_url = $this.getAttribute('href') || $this.getAttribute("data-href"), 
					hasHref = isString(target_url) && target_url.length > 0;
					if(active_tab_class){
						[...tab_buttons, ...tab_panels, ...tab_controls].forEach(el => isElement(el) && el.classList.remove(active_tab_class));
						$this.classList.add(active_tab_class);
						//[$this, $.one($target)].forEach(el => isElement(el) && el.classList.add(active_tab_class));
					}
					[...tab_buttons, ...tab_panels, ...tab_controls].forEach(el => isElement(el) && el.classList.remove("active--tab"));
					[$this, $.one($target), ...$.all(`[data-target-tab="${$target}"], [data-target="${$target}"]`, parent)].forEach(el => isElement(el) && el.classList.add("active--tab"));
					$.addClass($.one(`${$target}-control-container`), "active--tab");
					if(hasHref && !/javascript/.test(target_url)){
						let $win_height = innerHeight, 
						effect = $this.getAttribute('data-tab-effect') || storage.get('tab-effect') || 'animated slideInDown', 
						effect_time = $this.getAttribute('data-tab-effect-time') || storage.get('tab-effect-time') || 1000, 
						page_type = $this.getAttribute('data-tab-type') || storage.get('tab-type') || '', 
						page_title = $this.getAttribute('data-tab-title') || $this.getAttribute('title') || $this.innerText || $this.innerHTML, 
						hash = (location.hash != '') ? location.hash : '#akd-tab-home', 
						baseUrl = window.location.href.split('#')[0], 
						backurl = baseUrl /* + '#' */ + hash;
						//__akd._globals.currentEffect = effect;
						if(target_url.match(/^.*#/) || target_url.match(/^#/)){
							if(isElement($target = $.one(target_url))){
								if(effect == 'show') show($target_url, effect_time);
								else if(effect == 'fadein') fadeIn($target_url, effect_time);
								else {
									$target.classList.add(effect)
									$target.style.display = 'block';
								}
							}
						} else {
							//window.location.href = baseUrl + hash;
							let method = $this.dataset.method || 'GET';
							render($target, AKD_Loader, null, null);
							
							if(page_type == 'iframe') {
								$iframe = '<iframe class="box box-info" src="'+target_url+'" style="width:100%;min-height:'+($win_height-($top_nav_height+35))+'px;" frameborder="0" scrolling="yes" sandbox="allow-scripts allow-forms allow-same-origin"></iframe>'
								+'<div class="spacer"></div>'
								+'<center><a href="#page-home" class="site-link btn btn-default"><i class="fa fa-home"></i>Home</a></center>';

								render($target, $iframe, effect, effect_time);
							} else if(page_type == 'child') {
								window.location = target_url;
							} else if(page_type == 'external') {
								//inAppBrowserInit.browseNet(target_url);
							} else {
								let ext = self.fileext(target_url), 
								qp = urlVars(target_url),
								mode = isReallyDefined(qp["mode"]) ? decodeURI(qp["mode"]) : "";
								self.xhr.ajax({
									url: target_url,
									method,
									cache: false,
									dataType:(ext.toLowerCase() == 'md'||ext.toLowerCase() == 'txt')?'text':'',
								}).success((res) => {
									let result = res//_.parseContent(res, target_url);
									//result = isObject(res) ? JSON.stringify(res, null, "\t" ) : res;
									//result = isObject(res) && ('data' in res) ? res.data : res;
									//result = destructure(res);
									//console.log($target, res)
									render($target, result, effect, effect_time);
								}).error((res)=>{
									res = isObject(res) ? res.toString() : res;
									render($target, _loading_error_code + "<br>\n" + res, null, null);
								});
							}
						}
					}
				}
			} else if($this.matches('.photoshop') || $this.hasAttribute("data-akd-photo-editor-photoshop-button")){
				let comp_tab, $img = $.one('[data-akd-photo-editor-source-image]', $card);
				if(isElement($img)){
					//self.zoomImage($img, 'in', 1.5);
					$.one("#photoshop-tab", self.$mainContent).innerHTML = self.buildCard($img.src, $img.naturalWidth, $img.naturalHeight, true);
					$.one('[data-target-tab="#photoshop-tab"]').click();
					if(isElement(comp_tab = $.one('[data-akd-photo-editor-comparison-tab]', $card))) comp_tab.click();
					self.setup().copyImage($img);
					pixels = self._pixels = self.$ctx.getImageData(0, 0, $img.naturalWidth, $img.naturalHeight);
				}
			} else if($this.hasAttribute("data-akd-photo-editor-reset-button")){
				let $this = e.target.closest('.akd-photo-editor-card');
				if($card.classList.contains('full')) {
					self.resetImage();
					self.FILTER_OPTIONS = self.FILTER_OPTIONS_CACHED;
				}
			} else if($this.hasAttribute("data-akd-photo-editor-edit-button")){
				if(self.$goLiveInput.checked !== true && $card.classList.contains('full')) {
					//self.FILTER_IMAGE.style.filter = filter_str;
					//$.one(".filter-option.selected").parentElement.querySelector(".filter-option-value").textContent = e.target.value.toString();
					self.canvasFilter(filter_str);
					//console.log(filter_str)
				}
			} else if($this.hasAttribute("data-akd-photo-editor-copy-button")){
				if($card.classList.contains('full')) {
					let newSource = '';
					let $img = $card.querySelector('[data-akd-photo-editor-source-image]');
					if(isElement($img)){newSource = $img;}
					self.copyImage(newSource);
				}
			} else if($this.hasAttribute("data-akd-photo-editor-save-button")){
				if($card.classList.contains('full')) {
					self.saveImage();
				}
			} else if($this === self.$canvas){
				results = document.querySelector('#results'),
				setcolour(results);
			}
			//console.log($this, $this === self.$canvas)
		});
		
		$.on(this.$canvas, "click", (e) => {results = document.querySelector('#results'),setcolour(results);});
		
		$.on(this.$container, "submit", (e) => {
			e.preventDefault();
			const $this = isElement(this) ? this : e.target, 
			$thisParent = $this.parentElement, $card = $this.closest('.akd-photo-editor-card');
			
			if($this.id === "explorer-form" || $this.id === "explorer-submit-button"){
				let $form = $this.id === "explorer-form"?$this:$this.previousElementSibling, $_url = $form.action, $path = $.one('input', $form)?.value??$_url, 
				$as = 'json', $mode = 'browse', 
				$explorerResultContainer = $.one('#explorer-result-container', self.$container);
				$_url = `${$_url}&filePath=${$path}&ajax_target=#explorer-result-container`;
				$explorerResultContainer.innerHTML = self.loader;
				self.renderAjaxContent($_url, $explorerResultContainer, $mode, $as);
			} else if($this.matches(".grid-column-changer")){
				
			}
		});
		
		$.on(this.$container, "mousemove", (e) => {
			const $this = isElement(this) ? this : e.target, $thisParent = $this.parentElement, $card = $this.closest('.akd-photo-editor-card');
			if($this === self.$canvas){
				results = document.querySelector('#results'),
				output = document.querySelector('output'),
				drop = document.querySelector('#drop-canvas'),
				dropx = drop?.getContext('2d')??null;
				readcolour(e, output);
			}
		});
		
		$.on(this.$container, "mouseout", (e) => {
			const $this = isElement(this) ? this : e.target, $thisParent = $this.parentElement, $card = $this.closest('.akd-photo-editor-card');
			if($this === self.$canvas){
				//results = document.querySelector('#results'),
				//output = document.querySelector('output'),
				drop = document.querySelector('#drop-canvas'),
				dropx = drop?.getContext('2d')??null;
				paintdrop(e);
			}
		});
		
		$.on(this.$container, "keyup", (e) => {
			const $this = isElement(this) ? this : e.target, $thisParent = $this.parentElement;
			if($this.matches(".akd-editor-searchform-input")){
				let $target = $this.nextElementSibling || $.one('.akd-editor-searchform-results', $thisParent);
				if(isElement($target)){
					if($this.value.length > 0){
						let $textElement = $target.children[0];
						if(!$target.classList.contains('toggled')) $target.classList.add('toggled');
						
						$textElement.textContent = `Search results for ${$this.value}`;
					} else $target.classList.remove('toggled');
				}
			}
		});
		
		//this.$container.addEventListener("change", (e) => {
		$.on(this.$container, "change input", "input, select", (e) => {
			const $this = isElement(this) ? this : e.target, $thisParent = $this.parentElement, $card = $this.closest('.akd-photo-editor-card');
			if($this.id === "rotate-input"){
				let img = $.one('.browser__showcase img'), 
				skew_input_x = $.one('#skew-input-x'), 
				skew_input_y = $.one('#skew-input-y'), 
				op_val_h = img.classList.contains('flipped-horizontally') ? '-1' : '1', 
				op_val_v = img.classList.contains('flipped-vertically') ? '-1' : '1';
				img.style.transform = `rotate(${$this.value}deg) scale(${op_val_v},${op_val_h}) skew(${skew_input_x.value}deg, ${skew_input_y.value}deg)`;
			} else if($this.id === "skew-input-x"){
				//"1" value="0" oninput
				let img = $.one('.browser__showcase img'), 
				rotate_input = $.one('#rotate-input'), 
				skew_input_y = $.one('#skew-input-y'), 
				op_val_h = img.classList.contains('flipped-horizontally') ? '-1' : '1', 
				op_val_v = img.classList.contains('flipped-vertically') ? '-1' : '1';
				img.style.transform = `rotate(${rotate_input.value}deg) scale(${op_val_v},${op_val_h}) skew(${$this.value}deg, ${skew_input_y.value}deg)`;
			} else if($this.id === "skew-input-y"){
				//"1" value="0" oninput
				let img = $.one('.browser__showcase img'), 
				rotate_input = $.one('#rotate-input'), 
				skew_input_x = $.one('#skew-input-x'), 
				op_val_h = img.classList.contains('flipped-horizontally') ? '-1' : '1', 
				op_val_v = img.classList.contains('flipped-vertically') ? '-1' : '1';
				img.style.transform = `rotate(${rotate_input.value}deg) scale(${op_val_v},${op_val_h}) skew(${skew_input_x.value}deg, ${$this.value}deg)`;
			} else if($this.matches(".grid-column-changer")){
				let theGrid = $.one('.cards'), theCount = $this.nextElementSibling || $.one('.grid-column-changer-count', $thisParent);
				if(!theGrid.hasAttribute('data-layout-cols')) theGrid.setAttribute('data-layout-cols', $this.value);
				else theGrid.dataset.layoutCols = $this.value;
				theCount.textContent = $this.value;
			} else if($this.matches(".grid-row-changer")){
				let theGrid = $.one('.cards'), theCount = $this.nextElementSibling || $.one('.grid-row-changer-count', $thisParent);
				if(!theGrid.hasAttribute('data-layout-rows')) theGrid.setAttribute('data-layout-rows', $this.value);
				else theGrid.dataset.layoutRows = $this.value;
				theCount.textContent = $this.value;
			} else if($this.hasAttribute("data-akd-photo-editor-go-live")){
				let $showButton = $card.querySelector('[data-akd-photo-editor-edit-button]');
				if($card.classList.contains('full') && isElement($showButton)) {
					if($this.checked === true) $showButton.setAttribute("disabled", '');
					else $showButton.removeAttribute("disabled");
				}
			}
		});
		
		self.$mainContent.addEventListener("dragover", function(e){
			e.preventDefault();
			e.stopPropagation();
			this.classList.add('drag-over');
		});
		/* this.$mainContent.addEventListener("dragenter", function(e){e.preventDefault();e.stopPropagation();this.classList.add('drag-over');}); */
		self.$mainContent.addEventListener("dragleave", function(e){
			e.preventDefault();
			e.stopPropagation();
			this.classList.remove('drag-over');
		});
		/* this.$mainContent.addEventListener("dragend", function(e){e.preventDefault();e.stopPropagation();this.classList.remove('drag-over');}); */
		self.$mainContent.addEventListener("drop", function(e){
			e.preventDefault();
			e.stopPropagation();
			this.classList.remove('drag-over');
			promiseFileReader().readAsImage({event: e, target_id: '#dropzone-output-tab', pre_process: function(res, blob, target){
				let $img = new Image();
				$img.src = res;
				$img.onload = function(ev){
					//$.one("#dropzone-output-tab", self.$mainContent).insertAdjacentHTML('afterbegin', self.buildCard(res, ev.target.naturalWidth, ev.target.naturalHeight, false))
					$.one("#dropzone-output-tab", self.$mainContent).insertAdjacentHTML('afterbegin', `<div id="akd-photo-editor-card-${$i}" class="akd-photo-editor-card ui-pattern-1" data-layout="grid-auto" data-layout-row-auto="auto 1fr auto">
						<span class="flex flex--wrap gap--4 p--4 w--12 bg--darker z-index-9">
							<button id="" class="view akd__btn btn--info mr--auto" title="toggle editor view">&copy;</button>
							<button id="" class="close akd__btn btn--danger ml--auto" title="close editor view">&times;</button>
						</span> 
						<div class="pos--rel flex w--12 h--12 overflow--auto" data-akd-photo-editor-parent>
							<img id="source-image-${$i}" class="tertiary-image h--12 m--auto" src="${res}" data-width="${ev.target.naturalWidth}" data-height="${ev.target.naturalHeight}" data-akd-photo-editor-source-image />
						</div>
						<span class="flex flex--wrap gap--4 p--4 w--12 bg--darker z-index-9">
							<span class="flex gap--4 mr--auto">
								<button id="" class="zoom-out akd__btn btn--warning" title="zoom image out">&minus;</button>
								<button id="" class="zoom-in akd__btn btn--success" title="zoom image in">&plus;</button>
							</span>
							<span class="flex gap--4 ml--auto">
								<button id="" class="magnify akd__btn btn--navy" title="toggle magnifier">[&nbsp;]</button>
								<button id="" class="photoshop akd__btn btn--purple" title="edit image">photoshop<i class="indicator"></i></button>
							</span>
						</span>
					</div>`);
					$.setNodeAttribute(target, {"class":"akd__tab-panel flex--wrap w--12 h--12 m--auto p--4", dataset:{"layout":"flex","layout-cols":"2", "layout-rows":"4", "layout-gap":"4"}});
					$.one('[data-target-tab="#dropzone-output-tab"]').click();
					//self.setup().copyImage().initFilter().initDragger2(".showcase-drag-handle", ".akd-editor-preview-container.drag-panel", 'right', 0.15, 100);
					//self.init()
					//pixels = self._pixels = self.$ctx.getImageData(0, 0, $img.naturalWidth, $img.naturalHeight);
					//console.log(res)
					////$img = null;
				}
				$i++;
			}})
			/* let $file = e.dataTransfer.files[0], reader = new FileReader();
			//$imgSrc = URL.createEventObject($file);
			reader.onload = function(e){
				let $imgSrc = e.target.result, $img = new Image();
				$img.src = $imgSrc;
				$img.onload = function(ev){
					//self.$mainContent.innerHTML = self.buildCard($imgSrc, ev.target.naturalWidth, ev.target.naturalHeight, true)
					$.one("#dropzone-output-tab", self.$mainContent).innerHTML = self.buildCard($imgSrc, ev.target.naturalWidth, ev.target.naturalHeight, true)
					$.one('[data-target-tab="#dropzone-output-tab"]').click();
					self.setup().copyImage();
					pixels = self._pixels = self.$ctx.getImageData(0, 0, $img.naturalWidth, $img.naturalHeight);
					//console.log($imgSrc)
					//$img = null;
				}
			}
			reader.readAsDataURL($file); */
		});
		function drag(target, e) {
			e.dataTransfer.setData('Text', target.id);
		}
		function drop(target, e) {
			if (e.preventDefault) {
				e.preventDefault();
			}
			target.innerHTML += '<p>' + e.dataTransfer.getData('Text') + '</p>';
		}
		
//(function(){
	var //c = document.querySelector('#image-canvas'),
		//cx = c.getContext('2d'),
		results = document.querySelector('#results'),
		getcodebutton = document.querySelector('#getcode'),
		output = document.querySelector('output'),
		hidecodebutton = document.querySelector('#hidecode'),
		codebox = document.querySelector('#codebox'),
		info = document.querySelector('#info'),
		drop = document.querySelector('#drop-canvas'),
		dropx = drop?.getContext('2d')??null,
		pixels = [], p = {},
		out = '', outrgba = '', x = 0, y = 0, v = 0, h = 0;
		//c.classList.add('hidden');
  
	//retrieve(results);
	//paintdrop();
  
	function paintdrop(){
		dropx.restore();
		dropx.translate(0,0);
		dropx.clearRect(0,0,drop.width,drop.height);
	}
	function setcolour(results) {
		results.innerHTML += `<li data-rgba="${outrgba}" data-hex="${out}"><span style="background: ${out}"><\/span><input type="text" value="${out}" onfocus="this.select();" /><button class="hide-color">x<\/button><\/li>`;
		store(results);
	}
	function pixelcolour(x, y) {
		pixels = self._pixels;
		var index = ((y*(pixels.width*4)) + (x*4)),
        red = pixels.data[index],
        green = pixels.data[index + 1],
        blue = pixels.data[index + 2],
        a = pixels.data[index + 3];
		return {r:red, g:green, b:blue, a:a};
	}
	function readcolour(ev, output) {
		//x = ev.pageX - c.offsetLeft;//y = ev.pageY - c.offsetTop;
		x = ev.layerX;
		y = ev.layerY;
		p = pixelcolour(x, y);
		outrgba = `rgba(${p.r}, ${p.g}, ${p.b} , ${ p.a / 255})`;
		out =  "#" + ((1 << 24) + (p.r << 16) + (p.g << 8) + p.b).toString(16).slice(1);
		output.innerHTML = `<b class="label">x: <\/b><b class="result">${x}<\/b>
		<b class="label"> y: <\/b><b class="result">${y}<\/b>
		<b class="swatch" style="background:rgb(${p.r} , 0, 0)">${p.r}<\/b>
		<b class="swatch" style="background:rgb(0, ${p.g}, 0)">${p.g}<\/b>
		<b class="swatch" style="background:rgb(0, 0, ${p.b})">${p.b}<\/b>
		<b class="swatch opacity" style="background:rgba(255, 255, 255, ${p.a})">${p.a}<\/b>
		<b class="fullswatch" style="background:rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})"><\/b>`;
		drop.width = drop.width;
		dropx.fillStyle = 'black';
		dropx.fillRect(0,0,300,300);
		dropx.save();
		dropx.translate((drop.width / 2) - 35.5, (drop.height / 2) - 17);
		for (v = y - 3; v < y + 3; v++) {
			for (h = x - 3; h < x + 3; h++) {
				p = pixelcolour(h, v);
				dropx.fillStyle = 'rgba(' + p.r + ', ' + p.g +', ' +  p.b + ', ' + p.a / 255+')';
				dropx.fillRect((h - x) * 70, (v - y) * 35, 69, 34); 
			}
		}
		dropx.strokeStyle = 'lime';
		dropx.lineWidth = 2.5;
		dropx.shadowOffsetX = 2;
		dropx.shadowOffsetY = 2;
		dropx.shadowBlur    = 0;
		dropx.shadowColor   = 'black';  
		dropx.strokeRect(-1.5,-1,71.5,36);
	}
	function getfile(ev) {
		this.classList.remove('over');
		var files = ev.dataTransfer.files;
		if (files.length > 0) {
			if (files[0].type.indexOf('image') !== -1) {
				var reader = new FileReader();
				reader.readAsDataURL(files[0]);
				reader.onload = function (ev) {
					var img = new Image();
					img.src = ev.target.result;
					img.onload = function() {
						imagetocanvas(this);
					};
				};
			} 
		}
		ev.preventDefault();
	}
	function imagetocanvas(img) {
		info.className = 'hidden';
		//c.className = '';
		c.classList.remove('hidden');
		c.width = img.naturalWidth;
		c.height = img.naturalHeight;
		cx.drawImage(img, 0, 0);
		pixels = self._pixels = cx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
	}
	function dragover(ev) {this.classList.add('over');ev.preventDefault();}
	function dragleave(ev) {this.classList.remove('over');}
	function showcode(codebox) {
		var code = `<!DOCTYPE html>\n
        <html lang="en-US">\n
		<head>\n\t
		<meta charset="UTF-8">\n\t
		<title>Your Picked colours<\/title>\n\t
		<style type="text/css">`;
		var items = document.querySelectorAll('#results li'), all = items.length;
		for(var i = 0; i < all; i++) {
			code += `\n\t\t.colour${(i+1)}{ background: ${items[i].dataset.rgba.replace(/,/g,', ')}; /* ${items[i].dataset.hex} */}`;
		}
		code += `\n\t\tbody {background:#000;font-family:arial,sans-serif;color:#fff;}
		\n\t\tdiv {float:left;margin:5px;width:50px;height:50px; border:1px solid #fff;}
		\n\t<\/style>
		\n<\/head>
		\n<body>\n`;
		for(i = 0; i < all; i++) {
		  code += `\n\t<div class="colour${(i + 1)}"><\/div>`;
		}
		code += `\n<\/body>
		\n<\/html>`;
		codebox.querySelector('textarea').value = code;
		//codebox.classList.add('visible');
		codebox.classList.replace('hidden', 'visible');
	}
	function hidecode(codebox) {codebox.classList.replace('visible', 'hidden');/*codebox.classList.remove('visible');*/}
	function removecolour(ev) {
		var t = ev.target;
		if (t.tagName === 'BUTTON') {
			//t.parentNode.classList.add('hideme');
			t.parentNode.classList.add('hidden');
		}
		ev.preventDefault();
	}
	function removeitem(ev) {ev.target.parentNode.removeChild(ev.target);store();}
	function store(results) {localStorage.mypickedcolours = results.innerHTML;}
	function retrieve(results) {
		if (localStorage.mypickedcolours && 
			localStorage.mypickedcolours.indexOf('<') !== -1) {
			results.innerHTML = localStorage.mypickedcolours;
		}
	}
	
	/* if(this.$canvas && isElement(this.$canvas)){
		this.$canvas.addEventListener('mousemove', readcolour, false);
		this.$canvas.addEventListener('mouseout', paintdrop, false);
		this.$canvas.addEventListener('click', setcolour ,false);
	}
	Events
	c.addEventListener('mousemove', readcolour, false);
	c.addEventListener('mouseout', paintdrop, false);
	getcodebutton.addEventListener('click', showcode ,false);
	results.addEventListener('click', removecolour ,false);
	hidecodebutton.addEventListener('click', hidecode ,false);
	c.addEventListener('click', setcolour ,false);
	drop.addEventListener('dragover', dragover, false);
	drop.addEventListener('dragleave', dragleave, false);
	drop.addEventListener('drop', getfile, false);
	results.addEventListener('transitionend', removeitem, false);
	results.addEventListener('webkitTransitionEnd', removeitem, false); */
//})();
		//$i++;
		return this;
	}
	
var accept = {
	image : ["image/png", "image/jpeg"],
	text   : ["text/plain", "text/css", "text/javascript", "application/javascript", "application/json", "application/xml", "text/html"]
}, r_imFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

const promiseFileReader = () => {
	let $event, $target_id, $pre_process, $fr, inc = 0;
	
	function abortRead($fr) {$fr.abort();}
	function errorHandler(evt) {
		switch(evt.target.error.code) {
			case evt.target.error.NOT_FOUND_ERR:alert('File Not Found!');break;
			case evt.target.error.NOT_READABLE_ERR:alert('File is not readable');break;
			case evt.target.error.ABORT_ERR:break;
			default:alert('An error occurred reading this file.');
		};
	}
	const readAsImage = function(readerObj){
		if(arguments.length >= 2){
			$event = arguments[0] || window.event, $target_id = arguments[1] || null, $pre_process = arguments[2] || null;
		} else {
			$event = readerObj.event || window.event, $target_id = readerObj.target_id || null, $pre_process = readerObj.pre_process || null;
		}
		//console.log("arguments", target_id)
		
		function load_image(_blob, _targetElem, _pre_process) {
			$fr = new FileReader();
			$fr.onerror = errorHandler;
			$fr.onabort = function(e) {abortRead($fr);alert('File read cancelled');};
			$fr.onloadend = (function(theFile) {
				return function(e) {
					try {
						if(isFunction(_pre_process)){
							_pre_process.call(null,e.target.result, _blob, _targetElem);
						} else if(isElement(_targetElem)){
							if(isString(_pre_process) && _pre_process === "raw"){
								if(("src" in _targetElem) || _targetElem.src) _targetElem.src = e.target.result;
								else _targetElem.innerHTML += e.target.result;
							}
						}
					} catch(e){console.log(e)}
				};
			})(_blob);
			$fr.readAsDataURL(_blob);
			return this;
		}
		
		if($event){
			const targetElem = $target_id ? (isElement($target_id) ? $target_id : (isString($target_id) ? $.one($target_id) : null)) : null,
			maxFileSize = 2 * 1024 * 1024, 
			files = $event ? ($event.target && $event.target.files ? $event.target.files : ($event.dataTransfer && $event.dataTransfer.files ? $event.dataTransfer.files : null)) : [];
			
			if(files && files.length > 0){
				for(let i=0;i<files.length;i++){
				//inc++;
				let file = files[i];
					if (file.size >= maxFileSize) {
						alert("File size must be at most 2MB");
						return;
					}
					load_image(file, targetElem, $pre_process)
				}
			} else {
				load_image($event, targetElem, $pre_process);
				//targetElem.innerHTML = "<p>No files selected!</p>";
			}
			//return this;
		}
		
		/* if(files && files.length > 0 && (isElement(playlistElem) || isFunction(playlistElem))){
			[].forEach.call(files, readAndPreview);
		} */
		
		return this;
	}
	
	function readAs(file, as) {
		if (!(file instanceof Blob)) {
			throw new TypeError('Must be a File or Blob')
		}
		if(!as){
			if(accept.image.indexOf(file.type) > -1 ||  /\.(jpe?g|png|gif)$/i.test(file.name) || r_imFilter.test(file.type) ) {
				as = 'DataURL';
			} else if(accept.text.indexOf(file.type) > -1) {
				as = 'Text';
			} else as = 'ArrayBuffer';
		}
		return new Promise(function(resolve, reject) {
			var reader = new FileReader()
			reader.onload = function(e) {let r = {result:e.target.result,file};resolve(r /* e.target.result */) }
			reader.onerror = function(e) {reject(new Error('Error reading' + file.name + ': ' + e.target.result)) }
			reader['readAs' + as](file);
		});
	}
	function readAsDataURL(file){return readAs(file, 'DataURL')}
	function readAsText(file){return readAs(file, 'Text')}
	function readAsArrayBuffer(file){return readAs(file, 'ArrayBuffer')}

	return {
		readAs,
		readAsDataURL,
		readAsText,
		readAsArrayBuffer, 
		readAsImage
	} 
}

	AKD_PhotoEditor.prototype.renderAjaxContent = function renderAjaxContent(url, target, mode, as){
		target = isElement(target) ? target : $.one(target);
		as = as || 'json';
		mode = mode || 'browse';
		url = url + (as === 'json' ? '&format=json' : '&format=string');
		let fileUrl, backUrl, oneLevelUpUrl, content, $_ifxs = ["avif","jpg","jpeg","jfif","gif","png"], self = this;
		
		fetch(url).then(data=>data[as]()).then(res=>{
			//res = isString(res) ? JSON.parse(res) : res;
			/* try{
				res = isObject(res) ? res : (as === 'text' ? JSON.parse(JSON.parse(res)) : JSON.parse(res));
			} catch(e){
				console.log(e, res)
				res = {folders:[], total_folders: 0, files:[], total_files: 0}
			} */
			if(mode === "browse"){
				let folders = isArray(res.folders) ? res.folders : (rcomma.test(res.folders) ? res.folders.split(',') : res.folders), 
				files = isArray(res.files) ? res.files : (rcomma.test(res.files) ? res.files.split(',') : res.files);
				backUrl = `./app/includes/loader.php?mode=browser&action=browse&amp;filePath=${res.filePath}`;
				oneLevelUpUrl = `./app/includes/loader.php?mode=browser&action=browse&amp;filePath=${self.dirname(res.filePath)}`;
				fileUrl = `./app/includes/loader.php?action=show_image&filePath=${res.filePath}`;
				self._AJAX_BACK_URL = fileUrl;
				
				content = `<div class="flex flex--wrap gap--4 w--12">
					<span class="block">current path : <strong class="py--2 px--4 bg--default">${res.filePath}</strong></span>
					<span class="flex gap--4 ml--auto">
						<button class="ajax-link akd__btn btn--purple" type="button" title="go: back" data-href="${backUrl}" data-mode="browse"><i class="fa fa-reply"></i></button>
						<button class="ajax-link akd__btn btn--warning" type="button" title="go: one directory up" data-href="${oneLevelUpUrl}" data-mode="browse"><i class="fa fa-level-up-alt"></i></button>
						<button class="ajax-link akd__btn btn--success" type="button" title="reload" data-href="${url}" data-mode="browse"><i class="fa fa-sync"></i></button>
					</span>
				</div>
				<nav class="file-layout">
					<span class="flex flex--center w--12 p--4 mb--8 bd--b bdc--default">
						<span class="mr--4"><button class="file-layout-container-toggler akd__btn text--xs"><i class="fa fa-minus"></i></button></span>
						<span>Folders</span>
						<span class="ml--auto py--2 px--4 bdr--2 bg--default"><strong>${res.total_folders}</strong>: folder/s</span>
					</span>
					<ul class="file-layout-container">
					${isArray(folders) && folders.length > 0 ? folders.map(folder => {
						return `<li class="folder-layout-item">
							<button class="ajax-link akd__btn btn--blue-green" data-href="./app/includes/loader.php?mode=browser&action=browse&filePath=${res.filePath}/${folder}" title="open: ${folder}" data-mode="browse">
								<span class="file-thumb"><i class="fa fa-folder"></i></span>
								<span class="file-icon"><i class="fa fa-folder"></i></span>
								<span class="file-name">${folder}</span>
							</button>
						</li>`;
					}).join('') : '<li><p>No folder was found</p></li>'}
					</ul>
				</nav>
				<nav class="file-layout">
					<span class="flex flex--center w--12 p--4 mb--8 bd--b bdc--default">
						<span class="mr--4"><button class="file-layout-container-toggler akd__btn text--xs"><i class="fa fa-minus"></i></button></span>
						<span>Files</span>
						<span class="ml--auto py--2 px--4 bdr--2 bg--default"><strong>${res.total_files}</strong>: file/s</span>
					</span>
					<ul class="file-layout-container">
					${isArray(files) && files.length > 0 ? files.map(file => {
						let ext = self.fileext(file);
						return inArray(ext, $_ifxs) ? `<li class="file-layout-item" title="view: ${file}">
							<button class="ajax-link akd__btn btn--blue-green" data-href="./app/includes/loader.php?mode=browser&action=show_content&filePath=${res.filePath}&fileName=${file}" title="view: ${file}" data-as="json" data-mode="show_content">
								<span class="file-thumb" style="background-image: url('${fileUrl}&file=${file}&mimeType=image/${ext}');"></span>
								<span class="file-icon ${ext}"></span>
								<span class="file-name">${file}</span>
							</button>
						</li>` : `<li class="file-layout-item" title="the hile: ${file}, is not viewable">
							<button class="ajax-link akd__btn btn--blue-green">
								<span class="file-thumb" style="background-image: url('./app/assets/img/example-image.jpg');"></span>
								<span class="file-icon ${ext}"></span>
								<span class="file-name">${file}</span>
							</button>
						</li>`;
					}).join('') : '<li><p>No image files were found</p></li>'}
					</ul>
				</nav>`;
			} else {
				backUrl = `./app/includes/loader.php?mode=browser&action=browse&amp;filePath=${res.current_filepath}`;
				oneLevelUpUrl = `./app/includes/loader.php?mode=browser&action=browse&amp;filePath=${self.dirname(res.current_filepath)}`;
				fileUrl = `./app/includes/loader.php?mode=browser&action=show_content`;
				self._AJAX_BACK_URL = fileUrl;
				
				content = `<div class="browser__showcase">
					<div class="browser__location_nav">
						<button class="ajax-link akd__btn btn--purple" type="button" title="go: back" data-href="${backUrl}" data-mode="browse"><i class="fa fa-reply"></i></button>
						<button class="ajax-link akd__btn btn--warning" type="button" title="go: one directory up" data-href="${oneLevelUpUrl}" data-mode="browse"><i class="fa fa-level-up-alt"></i></button>
						<button class="ajax-link akd__btn btn--success" type="button" title="reload" data-href="${url}" data-mode="show_content"><i class="fa fa-sync"></i></button>
					</div>
					<div class="browser__image flex">
						<img class="actual-size m--auto" src="${res.current_src}" width="${res.current_width}" height="${res.current_height}" data-full-width="${res.current_width}" data-full-height="${res.current_height}" />
					</div>
					<a class="ajax-link browser__image-nav prev" style="background-image: url('${res.prev_img_src}');" href="${fileUrl}&amp;filePath=${res.current_filepath}&amp;fileName=${res.prev_file}&amp;ajax_target=${target.id}&amp;ajax_target_type=id&amp;format=${as}&amp;is_ajax_call=1" data-ajax-target="${target.id}" data-ajax-target-type="id" title="open: ${res.prev_file}"></a>
					<a class="ajax-link browser__image-nav next" style="background-image: url('${res.next_img_src}');" href="${fileUrl}&amp;filePath=${res.current_filepath}&amp;fileName=${res.next_file}&amp;ajax_target=${target.id}&amp;ajax_target_type=id&amp;format=${as}&amp;is_ajax_call=1" data-ajax-target="${target.id}" data-ajax-target-type="id" title="open: ${res.next_file}"></a>
					<div class="browser__image-controls">
						<span class="mr--auto flex-align-center gap--2">
							<button id="showcase-image-zoom-out" class="btn akd__btn btn--warning" title="zoom image out"><i class="fa fa-search-minus fak fak-minus"></i></button>
							<button id="showcase-image-zoom-in" class="btn akd__btn btn--warning" title="zoom image in"><i class="fa fa-search-plus fak fak-plus"></i></button>
							<button id="showcase-image-fit-toggler" class="btn akd__btn btn--inherit" title="Fit Image To Window"><i class="fa fa-expand fak fak-expand"></i></button>
						</span>
						<span class="m--auto flex flex--center">
							<!--<button id="" class="btn" title="rotate image anti-clockwise 5 deg" onclick="_.css($one('.browser__showcase img'), 'transform', 'rotate(-5deg)');"><i class="fa fa-undo"></i></button>
							<button id="" class="btn" title="rotate image clockwise 5 deg" onclick="_.css($one('.browser__showcase img'), 'transform', 'rotate(5deg)');"><i class="fa fa-redo"></i></button>-->
							<input id="rotate-input" class="akd__input-range" type="range" min="0" max="180" step="1" value="0" />
						</span>
						<span class="ml--auto flex-align-center gap--2">
							<button id="showcase-sidebar-toggler" class="btn akd__btn btn--info" title="toggle showcase sidebar" ><i class="fa fa-exchange-alt fak fak-arrow-right"></i></button>
							<button id="showcase-thumbnails-toggler" class="btn akd__btn btn--purple" title="toggle thumbnails"><i class="fa fa-images"></i></button>
							<button id="init-filters" class="btn akd__btn btn--pink mx--4" title="initiate filters"><i class="fa fa-sliders-h"></i></button>
							<button id="showcase-image-flip-vertical" class="btn akd__btn btn--success" title="flip image vertically"><i class="fa fa-arrows-alt-h"></i></button>
							<button id="showcase-image-flip-horizontal" class="btn akd__btn btn--success" title="flip image horizontally"><i class="fa fa-arrows-alt-v"></i></button>
						</span>
					</div>
					
					<div class="browser__sidebar">
						<div>
							<span class="block text--center text--600 text--blue-green bd--b bdc--inherit mb--2">Skew Image</span>
							<div class="flex gap--4 p--4 --blue-green">
								<input id="skew-input-x" class="akd__input-range" type="range" min="0" step="1" value="0" max="180" />
								<input id="skew-input-y" class="akd__input-range" type="range" min="0" step="1" value="0" max="180" />
							</div>
						</div>
					</div>
					<div class="browser__thumbnails-wrapper">
						${res.thumbnails.map(thumb => `<div class="browser_thumbnail" data-button>
							<img class="browser_thumbnail-image" src="${thumb.src}" alt="" width="100%" height="100%" data-full-width="${thumb.width}" data-full-height="${thumb.height}" />
						</div>`).join('')}
					</div>
				</div>`;
			}
			self._AJAX_FILES = res;
			self.render(target, content);
		});
		return this;
	}
	AKD_PhotoEditor.prototype.mutationsObserver = function mutationsObserver(e) {
		return this;
	}
	AKD_PhotoEditor.prototype.render = function(el, content, fx = '', delay = 1000){
		if(isElement(el) && isString(content) && content.length > 0){
			el.innerHTML = content;
			if(fx == 'show') {
				//show(el, delay);
			} else if(fx == 'fadein') {
				this.fadeIn(el, delay);
			} else if(isString(fx) && fx.length > 0) {
				el.classList.add(fx);
			}
		}
		return this;
	}
	/**
	 * Loads an HTML document from a URL and returns an element selected using
	 * the 'selector' parameter
	 * 		Example usage:
	 * 				loadPageSection('./myPage.html', '#container', (r, err) => console.log(r, err));
	 *
	 * @method loadPageSection
	 * @param  {String} url
	 * @param  {String} selector - A valid CSS selector
	 * @param  {Function} callback - To be called with two parameters (response, error)
	 * @return {void} - The Element collected from the loaded page.
	 */
	AKD_PhotoEditor.prototype.loadPageSection = function loadPageSection(url, selector, callback) {
		if (typeof url !== 'string') {
			throw new Error('Invalid URL: ', url);
		} else if (typeof selector !== 'string') {
			throw new Error('Invalid selector selector: ', selector);
		} else if (typeof callback !== 'function') {
			throw new Error('Callback provided is not a function: ', callback);
		}

		var xhr = new XMLHttpRequest();
		var finished = false;
		xhr.onabort = xhr.onerror = function xhrError() {
			finished = true;
			callback(null, xhr.statusText);
		};

		xhr.onreadystatechange = function xhrStateChange() {
			if (xhr.readyState === 4 && !finished) {
				finished = true;
				var section;
				try {
					section = xhr.responseXML.querySelector(selector);
					callback(section);
				} catch (e) {
					callback(null, e);
				}
			}
		};

		xhr.open('GET', url);
		xhr.responseType = 'document';
		xhr.send();
	};
	AKD_PhotoEditor.prototype.dragElement = (handle, first, second, direction, cb) => {
		handle = $.one(handle), first = $.one(first), second = $.one(second);
		if(isElement(handle)/*  && isElement(first) && isElement(second) */){
			let handle_dim = 0,md, // remember mouse down info
			parent = handle.parentElement, 
			ratio = parent.dataset?.ratio??'50:50';
			direction = parent.dataset?.splitterOrientation??direction;
			//alert(handle.nextElementSibling.id)
			const firstElem  = isElement(first) ? first : handle.previousElementSibling;
			const secondElem = isElement(second) ? second : handle.nextElementSibling;
			const _cache = {dimensions: {width: null, height: null}, handle: {cursor: elementStyle(handle).cursor}}
			// ----------------------------------------------------
			if(ratio){
				let r = ratio.split(":"), 
				r1 = isString(r[0]) ? r[0].replace('px', '').replace('%', ''): r[0], 
				r2 = isString(r[1]) ? r[1].replace('px', '').replace('%', ''): r[1];
				
				if(direction === "H" || direction === "horizontal"){
					handle_dim = `${(handle.offsetWidth/2)}px`;
					handle.style.left = `calc(${r1}% - ${handle_dim})`;
					firstElem.style.width = `calc(${r1}% - ${handle_dim})`;
					secondElem.style.width = `calc(${r2}% - ${handle_dim})`;
					if(elementStyle(parent).display === "flex"){
						//handle.style.flex = `${percentage}%`;
						firstElem.style.flex = `calc(${r1}% - ${handle_dim})`;
						secondElem.style.flex = `calc(${r2}% - ${handle_dim})`;
					}
					//firstElem.style.height = secondElem.style.height = `${parent.offsetHeight}px`;
					parent.setAttribute("data-handle-left", `calc(${r1}% - ${handle_dim})`);
					parent.setAttribute("data-first-panel-width", `calc(${r1}% - ${handle_dim})`);
					parent.setAttribute("data-second-panel-width", `calc(${r2}% - ${handle_dim})`);
				} else if (direction === "V" || direction === "vertical"){
					handle_dim = `${(handle.offsetHeight/2)}px`;
					handle.style.top = `calc(${r1}% - ${handle_dim})`;
					firstElem.style.height = `calc(${r1}% - ${handle_dim})`;
					secondElem.style.height = `calc(${r2}% - ${handle_dim})`;
					//firstElem.style.width = secondElem.style.width = `${parent.offsetWidth}px`;
					parent.setAttribute("data-handle-top", `calc(${r1}% - ${handle_dim})`);
					parent.setAttribute("data-first-panel-height", `calc(${r1}% - ${handle_dim})`);
					parent.setAttribute("data-second-panel-height", `calc(${r2}% - ${handle_dim})`);
				}
			}
			
			handle.onmousedown = onMouseDown;
			function onMouseDown(e){
				//console.log("mouse down: " + e.clientX);
				md = {
					e, 
					offsetLeft:  handle.offsetLeft, 
					offsetTop: handle.offsetTop, 
					firstWidth: firstElem.offsetWidth, 
					secondWidth: secondElem.offsetWidth, 
					firstHeight:  firstElem.offsetHeight, 
					secondHeight: secondElem.offsetHeight
				};
				document.onmousemove = onMouseMove;
				window.onresize = onMouseMove;
				document.onmouseup = () => {document.body.style.cursor = "auto";document.onmousemove = document.onmouseup = null;}
			}
			function onMouseMove(e){
				var delta = {x: e.clientX - md.e.clientX, y: e.clientY - md.e.clientY};
				if(direction === "H" || direction === "horizontal"){ // Horizontal
					// Prevent negative-sized elements
					delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth);
					var percentage = (((md.firstWidth + delta.x) / parent.offsetWidth) * 100),
					mainPercentage = (100 - percentage);
					handle.style.position = "absolute";
					handle.style.left = percentage+"%";
					
					if(elementStyle(parent).display === "grid"){
						firstElem.style.width = secondElem.style.width = "100%";
						parent.style.gridTemplateColumns = `calc(${percentage}% - 5px) auto calc(${mainPercentage}% - 5px)`;
					} else {
						firstElem.style.width = percentage+"%";
						secondElem.style.width = mainPercentage+"%";
						if(elementStyle(parent).display === "flex"){
							//handle.style.flex = `${percentage}%`;
							firstElem.style.cssText += `flex:${percentage}%;`;
							secondElem.style.cssText += `flex:${mainPercentage}%;`;
						}
					}
					handle.style.cursor = "col-resize";
					document.body.style.cursor = "col-resize";
					parent.setAttribute("data-splitter-orientation", "horizontal");
					parent.setAttribute("data-handle-left", `${percentage}%`);
					parent.setAttribute("data-first-panel-width", `${percentage}%`);
					parent.setAttribute("data-second-panel-width", `${mainPercentage}%`);
				}
				if(direction === "V" || direction === "vertical"){ // Vertical
					// Prevent negative-sized elements
					delta.y = Math.min(Math.max(delta.y, -md.firstHeight), md.secondHeight);
					var percentage = (((md.firstHeight + delta.y) / parent.offsetHeight) * 100), 
					mainPercentage = (100 - percentage);
					
					if(elementStyle(parent).display === "grid"){
						firstElem.style.height = secondElem.style.height = "100%";
						parent.style.gridTemplateRows = `calc(${percentage}% - 5px) auto calc(${mainPercentage}% - 5px)`;
					} else {
						handle.style.top = percentage+"%";
						firstElem.style.height = percentage+"%";
						secondElem.style.height = mainPercentage+"%";
					}
					handle.style.cursor = "row-resize";
					document.body.style.cursor = "row-resize";
					parent.setAttribute("data-splitter-orientation", "vertical");
					parent.setAttribute("data-handle-top", `${percentage}%`);
					parent.setAttribute("data-first-panel-height", `${percentage}%`);
					parent.setAttribute("data-second-panel-height", `${mainPercentage}%`);
				}
			}
			handle.ontouchstart = onTouchStart;
			function onTouchStart(e){
				//console.log("touch start: " + e.touches[0].clientX);
				md = {e, offsetLeft:  handle.offsetLeft,offsetTop:   handle.offsetTop,firstWidth:  firstElem.offsetWidth,firstHeight:  firstElem.offsetHeight,secondWidth: secondElem.offsetWidth,secondHeight: secondElem.offsetHeight};
				document.ontouchmove = onTouchMove;
				document.ontouchend = () => {document.ontouchmove = document.ontouchstart = null;}
				window.onresize = onTouchMove;
			}
			function onTouchMove(e){
				//console.log("touch move: " +  e.touches[0].clientX);
				var delta = {x: e.touches[0].clientX - md.e.touches[0].clientX, y: e.touches[0].clientY - md.e.touches[0].clientY};
				if (direction === "H" || direction === "horizontal"){ // Horizontal
					// Prevent negative-sized elements
					delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth);
					handle.style.left = ((md.offsetLeft + delta.x) > 60 ? (md.offsetLeft + delta.x) : 60) + "px";
					firstElem.style.width = ((md.firstWidth + delta.x) > 50 ? (md.firstWidth + delta.x) : 50) + "px";
					firstElem.style.flex = ((md.firstWidth + delta.x) > 50 ? (md.firstWidth + delta.x) : 50) + "px 0 0";
					secondElem.style.width = ((md.secondWidth - delta.x) > 50 ? (md.secondWidth - delta.x) : 50) + "px";
					secondElem.style.flex = ((md.secondWidth - delta.x) > 50 ? (md.secondWidth - delta.x) : 50)+ "px 0 0";
					handle.style.transition = firstElem.style.transition = secondElem.style.transition = "all linear .2s";
					
					parent.setAttribute("data-splitter-orientation", "horizontal");
					parent.setAttribute("data-handle-left", `${((md.firstWidth + delta.x) > 50 ? (md.firstWidth + delta.x) : 50)}px`);
					parent.setAttribute("data-first-panel-width", `${((md.firstWidth + delta.x) > 50 ? (md.firstWidth + delta.x) : 50)}px`);
					parent.setAttribute("data-second-panel-width", `${((md.secondWidth - delta.x) > 50 ? (md.secondWidth - delta.x) : 50)}px`);
				} else if(direction === "V" || direction === "vertical"){ // Vertical
					// Prevent negative-sized elements
					delta.y = Math.min(Math.max(delta.y, -md.firstHeight), md.secondHeight);
					handle.style.top = ((md.offsetTop + delta.y) > 60 ? (md.offsetTop + delta.y) : 60) + "px";
					firstElem.style.height = ((md.firstHeight + delta.y) > 50 ? (md.firstHeight + delta.y) : 50) + "px";
					secondElem.style.height = ((md.secondHeight - delta.y) > 50 ? (md.secondHeight - delta.y) : 50) + "px";
					//$one("#codebox-main-wrapper").style.cssText += "grid-template-rows: "+(md.firstHeight + delta.y) + "px "+(md.secondHeight - delta.y) + "px";
					//$one("#codebox-main-wrapper").style.gridTemplateRows = `${(md.firstHeight + delta.y) + "px"} ${(md.secondHeight - delta.y) + "px"}`;
					handle.style.transition = firstElem.style.transition = secondElem.style.transition = "all linear .2s";
					
					parent.setAttribute("data-splitter-orientation", "vertical");
					parent.setAttribute("data-handle-top", `${((md.firstHeight + delta.y) > 50 ? (md.firstHeight + delta.y) : 50)}px`);
					parent.setAttribute("data-first-panel-height", `${((md.firstHeight + delta.y) > 50 ? (md.firstHeight + delta.y) : 50)}px`);
					parent.setAttribute("data-second-panel-height", `${((md.secondHeight - delta.y) > 50 ? (md.secondHeight - delta.y) : 50)}px`);
				}
			}
			if(cb && isFunction(cb)){
				cb.apply(null, ...[firstElem, secondElem, handle, parent, _cache]);
			}
		}
	}
	
	//const filterItems = _.throttle((e, id, odt) => {
	AKD_PhotoEditor.prototype.filterItems = function(e, id, odt){
		let val = isString(e) ? e : e.value, 
		__items = $.all(id), $fi = 0;
		//__items = Array.from(document.getElementsByClassName(id)),
		//totalIconsInSet = icons.getAttribute("data-total-icons"), 
		
		if(isArray(__items) && __items.length > 0){
			// Respond to any input change, and show first few matches
			if(val && val !== ""){
				__items.forEach((_item) => {
					_item.style.display = "none";
					let _prop = _item.dataset.trackTitle??_item.dataset.title??_item.dataset.trackFilename??_item.dataset.filename??_item.title??"";
					//if((_item.dataset?.trackTitle??_item.dataset.title).indexOf(val) !== -1 || (_item.dataset?.trackFilename??_item.dataset.filename).toLowerCase().indexOf(val) !== -1 || _item.title.toLowerCase().indexOf(val) !== -1 || _item.textContent.toLowerCase().indexOf(val) !== -1){
					if((_prop && _prop.indexOf(val) !== -1) || _item.textContent.toLowerCase().indexOf(val) !== -1){
						_item.style.display = odt || "inline-flex";
						$fi++;
					}
				});
			} else {
				__items.forEach((_item) => {_item.style.display = odt || "inline-flex";});
			}
		}
	}
	/*
	 * Capitalize the first character in each word, excluding some articles and prepositions.
	 */
	AKD_PhotoEditor.prototype.headline = (str) =>{
		var exclude = "a,an,the,for,to,of,on,as,in,and,from".split(",");
		return str.replace(/\b\w+/g, function (s, i) {
			if (exclude.indexOf(s) > -1 && i > 0) {
				return s;
			}
			return s.charAt(0).toUpperCase() + s.slice(1);
		});
	}
	AKD_PhotoEditor.prototype.base_url = () => {var full_url_string = document.location.toString();var splint = full_url_string.split('.');var expr = /^(.*)\/[^\/]+\/?$/g;return (expr.test(splint[0]) ? splint[0].replace(expr, "$1") : splint[0]) + '/';}
	AKD_PhotoEditor.prototype.fileext = (filename,toLower) => {if(typeof(toLower) == 'undefined') toLower = true;if(/^.*\.[^\.]*$/.test(filename)){var splint = filename.split('?');var ext = splint[0].replace(/^.*\.([^\.]*)$/, "$1");return toLower ? ext.toLowerCase(ext) : ext;} else return "";};
	AKD_PhotoEditor.prototype.filename = ( path, with_ext ) => {"use strict";if(!path) return;if(with_ext == '' || with_ext == null) {with_ext = true;}return with_ext ? path.replace( rPath, '' ) : path.replace( rPath, '' ).split('.')[0];};
	// const filename = (filename,with_ext) => {if( filename.length == 0 ) return "";if(with_ext == '' || with_ext == null) var with_ext = false;var dot = filename.lastIndexOf(".");if( dot == -1 ) return filename;/* var splint = filename.split('.'); */var splint = filename.split('?');var splint2 = splint[0].split('.');var pieces = splint2[0].split("/");var ext = splint2[1];for (var i = 0; i < pieces.length; i++) nameOnly = pieces[i];if(with_ext) return nameOnly.replace('.','') + '.' + ext;else return nameOnly;};
	AKD_PhotoEditor.prototype.basename = (path) => {let rPath = /.*(\/|\\)/;return path.replace( rPath, '' );}
	//const basename = (path) => {var expr = /^.*\/([^\/]+)\/?$/g;return expr.test(path) ? path.replace(expr, "$1") : path;}
	AKD_PhotoEditor.prototype.dirname = (path) => {var expr = /^(.*)\/[^\/]+\/?$/g;return expr.test(path) ? path.replace(expr, "$1") : '';}
	//const dirname = ( path ) => {let pieces = path.split('/');return isArray(pieces) ? pieces[pieces.length-1] : path;}
	/**
	 * Function to fade an element
	 * @param  {HTMLElement} element
	 * @param  {Number} from
	 * @param  {Number} to
	 * @param  {Number} [duration=300]
	 */
	AKD_PhotoEditor.prototype.fade = function(element, from, to, duration){
		const start = window.performance.now()
		element = $.one(element)
		if(from === -1) {
			from = 1 * window.getComputedStyle(element).getPropertyValue('opacity')
		}
		duration = duration || 600;
		element.style.display = "block";
		
		window.requestAnimationFrame(function step (timestamp) {
			const progress = timestamp - start;
			element.style.opacity = from + (progress / duration) * (to - from);
			if (progress < duration) {
				window.requestAnimationFrame(step);
			} else if (element.style.opacity <= 0) {
				element.style.display = "none";
			}
		});
		
		return this;
	}

	/**
	 * Fade in shorthand
	 * @param  {HTMLElement} element
	 * @param  {Number|undefined} duration
	 */
	AKD_PhotoEditor.prototype.fadeIn = function(element, duration){this.fade(element, -1, 1, duration);return this;}

	/**
	 * Fade out shorthand
	 * @param  {HTMLElement} element
	 * @param  {Number|undefined} duration
	 */
	AKD_PhotoEditor.prototype.fadeOut = function(element, duration) {this.fade(element, -1, 0, duration);return this;}

	
	//const dedupe = (arr) => {return arr.filter(function (item, index) {return arr.indexOf(item) === index;});}
	//const dedupe2 = (arr) => {return [...new Set(arr)];}
	AKD_PhotoEditor.prototype.shuffle = function(arr){
		// Shuffle slide order if needed		
		if (isArray(arr)){
			for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);	// Fisher-Yates shuffle algorithm (jsfromhell.com/array/shuffle)
			return arr
		}
	
		return this;
	}
	AKD_PhotoEditor.prototype.sorter = (arr, by, ascdsc="asc") => {
		if(!isArray(arr) || (by && !isString(by)) ) return -1;
		//let _strip = (str) => isString(str) ? str.replace(/^(a |an |the )/gi, '').trim() : str;
		let _strip = (str) => {str = isString(str) ? str : String(str); return str.replace(/^(a |an |the )/gi, '').trim()}
		ascdsc= isString(ascdsc) ? ascdsc : "asc";
		let sortedArr = arr.sort((a, b) => ascdsc && ascdsc !== "dsc" && ascdsc !== "desc" ? (_strip(a[by]||a) < _strip(b[by]||b) ? -1 : 1) : _strip(a[by]||a) > _strip(b[by]||b) ? -1 : 1);
		return sortedArr;
	};
	
	AKD_PhotoEditor.prototype.isInViewport = (element, parent) => {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= ((parent || window).innerHeight || (parent || document.documentElement).clientHeight) &&
			rect.right <= ((parent || window).innerWidth || (parent || document.documentElement).clientWidth)
		);
	}
	AKD_PhotoEditor.prototype.loadThis = function(id, what, val){
		what = what || "image";
		
		let target = ( isElement(id) || isPlainObject(id) ) ? id : (isString(id) ? $.one(id) : null), 
		hasSrc = what === "image" || what === "video" || what === "audio" || what === "iframe";
		
		if(target){
			if(isPlainObject(target)) {
				target[what] = val;
			} else if(isArray(target)) {
				each(target,(i)=>{
					if(isElement(target[i])){
						if(hasSrc === true){
							target[i].src = val;
						} else if(what === "html"){
							target[i].innerHTML = val+'';
						} else if(what === "text"){
							target[i].textContent = val+'';
						} 
					}
				});
			} else {
				if(isElement(target)){
					if(what === "image" || what === "video" || what === "audio"){target.src = val;}
					if(what === "html"){target.innerHTML = val+'';}
					if(what === "text"){target.textContent = val+'';}
				}
			}
		}
		return this;
	};
	AKD_PhotoEditor.prototype.scrollIndicator = function(eleId, indicator){
		//let el = isElement(eleId) ? eleId : getBy("query", eleId), ind_el = isElement(indicator) ? indicator : getBy("query", indicator),
		let el = isElement(eleId) ? eleId : $.one(eleId), ind_el = isElement(indicator) ? indicator : $.one(indicator),
		total = 0;
		ind_el.style.minHeight = "2px";
		el.addEventListener("scroll", () => {
			let customScrollTop = el.scrollTop, customScrollHeight = el.scrollHeight, customHeight = el.getBoundingClientRect().height, 
			// customHeight = _$.dimensions(el).height, 
			total = (customScrollTop / (customScrollHeight - customHeight))*100;
			ind_el.style.width =  total+ "%";
			if(total < 49){
				ind_el.style.backgroundColor = 'green';
			} else if(total > 49 && total < 79){
				ind_el.style.backgroundColor = '#ffff00';
			} else if(total > 79){
				ind_el.style.backgroundColor = '#ff0000';
			}
		});
		
		return this;
	}
	
	/* Nano Templates - https://github.com/trix/nano */
	AKD_PhotoEditor.prototype.nano = function nano(template, data) {
		return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
			var keys = key.split("."), v = data[keys.shift()];
			for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
			return (typeof v !== "undefined" && v !== null) ? v : "";
		});
	}
	/* Usage: 
	html```
	<p id="testLayout"></p>
	
	js```
	const data = {
		user: {
			login: "tomek",
			first_name: "Thomas",
			last_name: "Mazur",
			account: {
				status: "active",
				expires_at: "2009-12-31"
			}
		}
	}
	document.getElementById('testLayout').innerHTML = nano("<p>Hello {user.first_name} {user.last_name}! Your account is <strong>{user.account.status}</strong></p>", data);
	 */
	/* const formatTime = (time, hours) => {if(hours){var h = Math.floor(time / 3600);time = time - h * 3600;var m = Math.floor(time / 60);var s = Math.floor(time % 60);return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);} else {var m = Math.floor(time / 60);var s = Math.floor(time % 60);return m.lead0(2) + ":" + s.lead0(2);}}
	const formatToMS = (val) => {var _d,rMS = /ms/i,rSS = /s/i;if(rMS.test(val)) _d = val.replace('ms','');else if(rSS.test(val)){_d = val.replace('s','');_d = Number(_d) * 1000;}return _d;}
	function formatDateTime(prettyDate) {
		prettyDate = prettyDate || false;
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var rightnow = new Date(); // The current date and time
		var hours = rightnow.getHours(); // Capture the hours as a string, "00" thru "23"
		
		if (hours < 10) var hourstring = "0" + hours.toString();
		else if (hours > 12 && hours < 24) var hourstring = (hours - 12).toString();
		else var hourstring = hours.toString();

		var minutes = rightnow.getMinutes(); // Capture the minutes as a string, "00" thru "59"
		if (minutes < 10) var minutestring = "0" + minutes.toString();
		else var minutestring = minutes.toString();

		var seconds = rightnow.getSeconds(); // Capture the seconds as a string, "00" thru "59"
		if (seconds < 10) var secondstring = "0" + seconds.toString();
		else var secondstring = seconds.toString();

		if (hours < 12) var am_pm = " AM";
		else var am_pm = " PM";

		if (rightnow.getDate() == 1) var ending = "st";
		else if (rightnow.getDate() == 2) var ending = "nd";
		else if (rightnow.getDate() == 3) var ending = "rd";
		else var ending = 'th';

		var timestring = hourstring + ":" + minutestring + ":" + secondstring + am_pm; // Put it all together, "00:00:00"
		//var timeplace = document.getElementById("clock"); // Manipulate the DOM, display it to the screen!
		//timeplace.childNodes[0].nodeValue = timestring;
		if(prettyDate){
			day = days[rightnow.getDay()]+' '+rightnow.getDate();
			day += ending;
			month = months[rightnow.getMonth()];
			year = rightnow.getFullYear();
			var datestring = month + day + year;
		} else var datestring = rightnow.getFullYear() + '-' + (rightnow.getMonth()+1) + '-' + rightnow.getDate();
		return {'time':timestring,'date':datestring};
	}
	 */
	
	//window.AKD_PhotoEditor = AKD_PhotoEditor;
	_global.AKD_PhotoEditor = AKD_PhotoEditor;
	return AKD_PhotoEditor;
})(window);