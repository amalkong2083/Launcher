(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.AKD_CodeEditor = factory());
}(this, (function(){
	'use strict';
	
	let rcomma = /,/, rspace = /\s/g, rhash = /#.*$/, $aci = 0, $i = 0, 
	hasWindow = ('undefined' !== typeof window), 
	hasDocument = ('undefined' !== typeof document), 
	$_clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';
	
	function d(t) {return Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}
	const inArray = (needle, arr) => {if((typeof arr == 'undefined') || !arr.length || !arr.push) return false;for (var i = 0; i < arr.length; i++) if (arr[i] == needle) return true;return false;}
	const isArray = (t) => Array.isArray(t) || "array" === d(t);
	const isClass = (t) => "function" === d(t) && /^\s*class\s+/.test(t.toString());
	const isDocument = (obj) => {return obj === document && obj.nodeType === 9;}
	const isEmptyObject = (t) => !t || 0 === Object.keys(t).length && t.constructor === Object;
	const isElement = (obj) => {return (typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string");}
	const isFunction = (t) => "function" === d(t);
	const isNumber = (val) => {return typeof( val ) === 'number' && val === val;}
	const isNumeric = ( obj ) => {var realStringObj = obj && obj.toString();return isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;}
	const isObject = (obj) => {return obj === Object(obj);}
	const isPlainObject = (val) =>  !!val && typeof(val) === 'object' && val.constructor === Object;
	const isString = (val) => typeof(val) === 'string';
	const isValidJSON = (str) => {try {JSON.parse(str);return true;} catch (e) {return false;}};
	const isVideoElement = (elem) => {return elem instanceof HTMLVideoElement;};
	const isWindow = ( obj ) => {var toString = Object.prototype.toString.call(obj);return toString == '[object global]' || toString == '[object Window]' || toString == '[object DOMWindow]' || (obj != null && obj === obj.window);};
	
	const elementStyle = (strOrEle) => {var element = isElement(strOrEle) ? strOrEle : isString(strOrEle) ? $one(strOrEle) : null;return (!element) ? null :(window.getComputedStyle ? window.getComputedStyle(element,null) : (element.currentStyle ? element.currentStyle : document.defaultView.getComputedStyle(element, null)));};
	const camelize = (stringToCamelize) => {if (String(stringToCamelize).indexOf('-') == -1){return stringToCamelize;}var oStringList = String(stringToCamelize).split('-');var isFirstEntry = true;var camelizedString = '';for(var i=0; i < oStringList.length; i++){if(oStringList[i].length>0){if(isFirstEntry){camelizedString = oStringList[i];isFirstEntry = false;} else {var s = oStringList[i];camelizedString += s.charAt(0).toUpperCase() + s.substring(1);}}}return camelizedString;};
	const uid = () => {let _uid = Math.random();return String(_uid++).replace('.','').replace('-','');}
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
						target[ name ] = extend( deep, clone, copy );
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
			params = extend({},_params);
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
	function $qs(sel, ctx){return isElement(sel) ? sel : isElement(ctx) ? ctx.querySelector(sel) : document.querySelector(sel);}
	function $qsa(sel, ctx) {let list = [],nodeList = isElement(ctx) ? ctx.querySelectorAll(sel) : document.querySelectorAll(sel);if(nodeList && nodeList.length > 0) {list = Array?.from(nodeList)??Array.prototype.slice.call(nodeList);}return list;}
	
	const $ = {};
	$.nodes = [];
	//$.id = (sel) => $.nodes.push($id(sel)) && $.nodes.filter(e=> isElement(e) === true)[0];
	$.id = (sel) => $id(sel);
	
	/**
	 * get single element
	 * @public
	 */
	//$.one = (sel, ctx) => $.nodes.push($qs(sel, ctx)) && $.nodes.filter(e=> isElement(e) === true)[0];
	$.one = (sel, ctx) => $qs(sel, ctx);
	
	/**
	 * get multiple elements
	 * @public
	 */
	//$.all = (sel, ctx) => $.nodes.push(...$qsa(sel, ctx)) && $.nodes.filter(e=> isElement(e) === true);
	$.all = (sel, ctx) => $qsa(sel, ctx);
	/**
	 * bind an event to element(s)
	 * @public
	 * @param  array    $el      element object or array
	 * @param  string    eventType  name of the event
	 * @param  function  fn
	 * @param  boolean    useCapture
	 */
	$.on = ($el, eventType, fn, useCapture) => {
		if (!$el) {
			return;
		}
		if (useCapture === undefined) {
			useCapture = false;
		}
		if (!isArray($el)) {
			$el = [$el];
		}
		for (let i=0; i<$el.length; i++) {
			$el[i].addEventListener(eventType, fn, useCapture);
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
	$.delegate = (el, evt, sel, cb) => {
		el = isDocument(el) || isWindow(el) ? el : $.all(el);
		if(!el){return this;}
		
		const addEvent = function($el, eventType, selector, fn){
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
			}, false);
		}
		if(Array.isArray(el)){
			for(let i=0;i<el.length;i++){
				addEvent(el[i], evt, sel, cb);
			}
		} else addEvent(el, evt, sel, cb);
		return this;
	};
	/* document.addEventListener(eventName, function(e) {
		// loop parent nodes from the target to the delegation node
		for (var target = e.target; target && target != this; target = target.parentNode) {
			if (target.matches(elementSelector)) {
				handler.call(target, e);
				break;
			}
		}
	}, false); */
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
	
	function AKD_CodeEditor(params) {
		if(!(this instanceof AKD_CodeEditor)) return  new AKD_CodeEditor(params);
		const default_params = {
			container: '#AKD-editor', 
			style: "codepen", 
			templates: [], 
			linkId: '[data-route-link]', 
			linkActiveClass: 'active', 
			animation: null, loader: null, aciKey: 'akd-ce-'+$i, 
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
		//this.$_clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';
		this.params = isPlainObject(params) ? extend(default_params,params) : default_params;
		this.$container = isElement(this.params.container) ? this.params.container : $.one(this.params.container);
		if(isElement(this.$container)){
			$i = $aci = 'akd-' + String(isString(this.params.container) ? this.params.container : this.$container?.id?.className).replace('#','-').replace('.','-').replace(' ','-');
			if(this.$container.classList && typeof this.params.animation === 'string'){
				this.$container.classList.remove(this.params.animation);
			}
		}
		this.$key = this.params?.aciKey??$aci;
		this.loader = this.params.loader || '<div style="position: absolute;top: 50%;left: 50%;translate: -50% -50%;"><div class="dot-revolution"></div></div>';
		//this.currentRoute = localStorage.getItem(this.params.lsKey + 'currentRoute') || null;// stored route
		//this.routerUrl = this.currentRoute || location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
		this.err = [];
		this.templates = '';
		this.observeMutations = false;
		this.delay = null;
		
		this._defaultLanguages = [
			{text: "HTML", ext: "html"},
			{text: "Javascript",ext: "js"},
			{text: "CSS",ext: "css"},
			{text: "PHP",ext: "php"},
			{text: "C",ext: "c"},
			{text: "C++",ext: "cpp"},
			{text: "Python",ext: "py"}
		];
		this._defaultTextEditor = [
			{text: "Codemirror", value: "codemirror"},
			{text: "Monaco", value: "monaco"},
			{text: "Ace", value: "ace"},
			{text: "AKD", value: "akd"}
		];
		this._tabs = {};
		this._splitter = {};
		this._editors = {};
		this._editorGroups = ["currentlyEditing", "pinned", "workspace"]
		this._editorStyles = ["codepen", "vscode"];
		if(window["AKD_Editor_tempates"]) this._editorStyles = [...this._editorStyles, ...Object.keys(window["AKD_Editor_tempates"])];
		this.defaultEditorStyle = "codepen";
		this.editorStyle = inArray(this.params.style, this._editorStyles) ? this.params.style : this.defaultEditorStyle;
		
		$i++;
		
		return this;
	}
	
	AKD_CodeEditor.prototype.setupEditor = function(){
		//let $$this = this, $i = 'akd-' + String(isString(el) ? el : el?.id?.className).replace('#','-').replace('.','-').replace(' ','-'), 
		//akd_i = 0, 
		this.HTML_CODE = localStorage.getItem('html_code') || "", 
		this.CSS_CODE = localStorage.getItem('css_code') || "", 
		this.JS_CODE = localStorage.getItem('js_code') || "";
		return this;
	}
	/**
	const htmlmixed = {}
	AKD_CodeEditor.prototype.editors = {
		html: {
			editor: undefined,
			code: htmlEditor,
			config: {
				lineNumbers: true,
				//mode: htmlmixed,
				mode: 'text/html',
				value: staticHTMLCode.querySelector('code').textContent
			}
		},
		css: {
			editor: undefined,
			code: cssEditor,
			config: {
				lineNumbers: true,
				mode: 'text/css',
				value: staticCSSCode.querySelector('code').textContent
			}
		}
	}
	 * Initialise the specified editor if not already initialised
	 * @param {Array} editorTypes - The editors to initialise
	 */
	//AKD_CodeEditor.prototype.initEditor = function(editorTypes, groupId) {
	AKD_CodeEditor.prototype.initEditor = function(groupId, editorConfig) {
		const $this = this;
		$i = this.$key || $i;
		var USING_EDITOR = (fn) => fn === "codemirror" && isFunction(window["CodeMirror"]) ? "CodeMirror" : 
			(isFunction(window[fn]) || isObject(window[fn])) ? fn : "CodeMirror";
		var $groupId = groupId || 'pinned';
		if(this._editors[$i] && this._editors[$i]?.editorGroups[$groupId]){
			if(!isEmptyObject(editorConfig)) 
				extend(this._editors[$i].editorGroups[$groupId], editorConfig);
			
			for(var x in this._editors[$i]?.editorGroups[$groupId]) {
				var editor = this._editors[$i]?.editorGroups[$groupId][x];
				var using = '';
				if(isObject(editor) && isElement(editor.code)){
					using = editor.using;
					// eslint-disable-next-line new-cap
					//this._editors[$i].editorGroups[$groupId][editor].inputEditor = CodeMirror(this._editors[$i].editorGroups[$groupId][editor].code, this._editors[$i].editorGroups[$groupId][editor].config);
					//this._editors[$i].editorGroups[$groupId][editor].inputEditor = window[USING_EDITOR(using)](this._editors[$i].editorGroups[$groupId][editor].code, this._editors[$i].editorGroups[$groupId][editor].config);
					//editor.inputEditor = window[USING_EDITOR(using)](editor.code, editor.config);
					editor.inputEditor = CodeMirror.fromTextArea(editor.code, editor.config);
					//var delay;
					editor.inputEditor.on("change", function() {
						clearTimeout($this.delay);
						$this.delay = setTimeout($this.updatePreview(editor, `#akd-editor-preview-frame-${$i}`), 300);
					});
					//setTimeout($this.updatePreview(editor, `#akd-editor-preview-frame-${$i}`), 300);
				}
			}
		} else console.log('Unable to initiate the editors')
		return this;
	}
	
	AKD_CodeEditor.prototype.updatePreview = function(editor, _previewFrame) {
		var previewFrame = isElement() ? _previewFrame : $.one(_previewFrame);
		var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
		//preview.open();
		//preview.write(editor.getValue());
		//preview.close();
		//_iframe = getIframeDocument(`#akd-editor-output-iframe-${$i}`);
		//_iframe = tag$1("iframe", {id:`#akd-editor-output-iframe-${$i}`, "class": "w--12 h--12 bg--white bdr--2 p--2", sandbox: "allow-scripts", frameborder: "0", crossorigin: "anonymous"});
		//document.body.appendChild(_iframe)
		//_iframe.contentWindow.body.innerHTML = 
		//preview.srcdoc = `<style>${localStorage.getItem('css_code')}</style><main>${localStorage.getItem('html_code')}</main><script>${localStorage.getItem('js_code')}</script>`;
		preview.srcdoc = `${editor.getValue()}`;
		//_iframe.contentWindow.eval(localStorage.getItem('js_code'));
	}
	
	AKD_CodeEditor.prototype.createNewEditorInstance = function createNewEditorInstance(obj = {}, group = 'currentlyEditing'){
		$i = this.$key || $i || 'akd-'+String(Math.random()).replace('.','').replace('-','');
		if(!this._editors[$i]) {
			let key = this.$key || `_akd_code_editor_${$i}_`;
			this.setupEditor();
			this._editors[$i] = {
				node: this.$container, 
				beautification_in_progress: false, 
				minification_in_progress: false, 
				editorGroups: {
					workspace: {}, 
					currentlyEditing: {}, 
					pinned: {
						html: {
							use_editor: true, 
							using: "codemirror", 
							inputEditor: obj?.html?.inputEditor || undefined, 
							outputEditor: obj?.html?.outputEditor || undefined, 
							code: obj?.html?.inputEditor??'',
							config: {
								lineNumbers: true,
								mode: 'htmlmixed',
								//value: staticHTMLCode.querySelector('code').textContent
								value: obj?.html?.inputEditor?.value||obj?.html?.inputEditor?.querySelector('code')?.textContent||''
							}, 
							ops_cache: createCache(10, uid()),
							enableRedoButton: this.HTML_CODE.length > 0 ? true : false, 
							enableUndoButton: this.HTML_CODE.length > 0 ? true : false, 
							originalContent: {filename: null, content: this.HTML_CODE.length > 0 ? this.HTML_CODE : ''},
							lastSaved: {filename: null, content: this.HTML_CODE.length > 0 ? this.HTML_CODE : ''},
							lastCleared: {filename: null, content: ''}
						}, 
						css: {
							use_editor: true, 
							using: "codemirror", 
							inputEditor: obj?.css?.inputEditor || undefined, 
							outputEditor: obj?.css?.outputEditor || undefined, 
							code: obj?.css?.inputEditor??'',
							config: {
								lineNumbers: true,
								mode: 'css',
								//value: staticHTMLCode.querySelector('code').textContent
								value: obj?.css?.inputEditor?.value||obj?.css?.inputEditor?.querySelector('code')?.textContent||''
							}, 
							ops_cache: createCache(10, uid()),
							enableRedoButton: this.CSS_CODE.length > 0 ? true : false, 
							enableUndoButton: this.CSS_CODE.length > 0 ? true : false, 
							originalContent: {filename: null, content: this.CSS_CODE.length > 0 ? this.CSS_CODE : ''},
							lastSaved: {filename: null, content: this.CSS_CODE.length > 0 ? this.CSS_CODE : ''},
							lastCleared: {filename: null, content: ''}
						}, 
						js: {
							use_editor: true, 
							using: "codemirror", 
							inputEditor: obj?.js?.inputEditor || undefined, 
							outputEditor: obj?.js?.outputEditor || undefined, 
							code: obj?.js?.inputEditor??'',
							config: {
								lineNumbers: true,
								mode: 'js',
								//value: staticJSCode.querySelector('code').textContent
								value: obj?.js?.inputEditor?.value||obj?.js?.inputEditor?.querySelector('code')?.textContent||''
							}, 
							ops_cache: createCache(10, uid()),
							enableRedoButton: this.JS_CODE.length > 0 ? true : false, 
							enableUndoButton: this.JS_CODE.length > 0 ? true : false, 
							originalContent: {filename: null, content: this.JS_CODE.length > 0 ? this.JS_CODE : ''},
							lastSaved: {filename: null, content: this.JS_CODE.length > 0 ? this.JS_CODE : ''},
							lastCleared: {filename: null, content: ''}
						}
					}, 
				}
			};
			this._editors[$i].editorGroups.pinned.html.ops_cache.add(key+'html_code', this.HTML_CODE);
			this._editors[$i].editorGroups.pinned.css.ops_cache.add(key+'css_code', this.CSS_CODE);
			this._editors[$i].editorGroups.pinned.js.ops_cache.add(key+'js_code', this.JS_CODE);
			
		}
		let newObj = {};
		if(!isEmptyObject(obj) && this._editors[$i].editorGroups[group]) newObj = extend(this._editors[$i], obj);
		////if(!isEmptyObject(obj) && this._editors[$i].editorGroups[group]) Object.assign(this._editors[$i].editorGroups[group], obj);
		//return this._editors[$i];
		return this;
	}
	
	// new tab incrementor
	let $nti = 0
	AKD_CodeEditor.prototype.addEditorTab = function(obj = {}){
		const $this = this;
		$i = this.$key || $i;
		if(this._editors[$i]){
			let $to = obj.to || 'currentlyEditing', 
			newConfig = {
				use_editor: true, 
				using: obj?.using || "codemirror", 
				inputEditor: obj?.inputEditor || null, 
				outputEditor: obj?.outputEditor || null, 
				code: obj?.inputEditor??'',
				config: obj?.config || {
					lineNumbers: true,
					mode: 'htmlmixed',
					//value: staticHTMLCode.querySelector('code').textContent
					value: obj?.inputEditor?.value||obj?.inputEditor?.querySelector('code')?.textContent||''
				}, 
				ops_cache: createCache((obj?.cacheLimit && Number(obj.cacheLimit) || 10), uid()),
				enableRedoButton: false, 
				enableUndoButton: false, 
				originalContent: {filename: obj?.originalContent?.filename || null, content: obj?.originalContent?.content || ''},
				lastSaved: {filename: obj?.lastSaved?.filename || null, content: obj?.lastSaved?.content || ''},
				lastCleared: {filename: null, content: ''}
			};
			
			if(isObject(this._editors[$i][$to])){
				Object.assign(this._editors[$i][$to], newConfig)
			} else if(Array.isArray(this._editors[$i][$to]) && inArray($to, this._editorGroups)){
				this._editors[$i][$to].push(newConfig)
			}
			
			$.all(`${this.params.tabs.buttons_wrapper_selector} ${this.params.tabs.button_selector}, ${this.params.tabs.panels_wrapper_selector} ${this.params.tabs.panel_selector}`, this.$container).forEach(el => isElement(el) && el.classList.remove($this.params.tabs.active_class))
			
			let tabButton = Object.assign(document.createElement("button"), {className: `akd__btn ${(this.params.tabs.button_class || 'akd__tab-button')} ${(this.params.tabs.active_class || 'active--tab')}`, type: "button"}), 
			tabPanel = Object.assign(document.createElement("div"), {id: `new-tab-${$i}-${$nti}`, className: `${(this.params.tabs.panel_class || 'akd__tab-panel')} ${(this.params.tabs.active_class || 'active--tab')}`})
			tabButton.setAttribute('data-parent-tab', `#akd-editor-main-layout-splitter-${$i}`);
			tabButton.setAttribute('data-target-tab', `#new-tab-${$i}-${$nti}`/* `#new-tab-${$i}` */);
			tabButton.innerHTML = `new-tab-${$nti}<span class="tab-close-button fa fa-times"></span>`;
			tabPanel.innerHTML = `<div class="welcome">
				<span class="welcome-header">Complete new tab (${$nti}) setup</span>
				<div class="welcome-section" data-layout="flex" data-layout-flow="col" data-layout-breakpoint-min="lg">
					<div class="row flex-row">
						<span class="welcome-section-label">select language</span>
						<select class="languaage-select">
							${this._defaultLanguages.map(lang => `<option value="${lang.ext}">${lang.text}</option>`).join('')}
						</select>
					</div>
					<div class="row flex-row">
						<span class="welcome-section-label">or enter a language extension</span>
						<input id="" class="" type="text" value="" placeholder="enter language extension eg: .sol, .pl" />
					</div>
				</div>
				<div class="welcome-section">
					<div class="row flex-row">
						<span class="welcome-section-label">select text editor</span>
						<select class="text-editor-select">
							${this._defaultTextEditor.map(te => `<option value="${te.value}">${te.text}</option>`).join('')}
						</select>
					</div>
				</div>
			</div>`;
			$.one(`${this.params.tabs.buttons_wrapper_selector} .${$to}-tab-buttons`, this.$container).insertAdjacentElement('afterbegin', tabButton);
			$.one(`${this.params.tabs.panels_wrapper_selector}`, this.$container).appendChild(tabPanel);
			$nti++;
		}
		return this;
	}
	AKD_CodeEditor.prototype._buildGroupTabs = function (groupId) {
		let tab_buttons = '', tab_panels = '', sidebar_tab_buttons = '';
		if(this._editors[$i]?.editorGroups[groupId]){
			tab_buttons += `<span class="${groupId}-tab-buttons">`;
			if(!isEmptyObject(this._editors[$i].editorGroups[groupId]) || isArray(this._editors[$i].editorGroups[groupId])){
				for(const language in this._editors[$i].editorGroups[groupId]){
					let pinnedItem = this._editors[$i].editorGroups[groupId][language], 
					active_tab = language === "html" ? `${this.params.tabs.active_class}` : '', 
					active_panel = language === "html" ? `${this.params.tabs.active_class} active--editor` : '';
					
					sidebar_tab_buttons += `<li><button id="" class="akd__btn ${this.params.tabs.button_class} ${active_tab}" type="button" title="show ${language} tab" data-target-tab="#akd-editor-splitter-${language}-panel-${$i}" data-parent-tab="#akd-editor-main-layout-splitter-${$i}"><span class="text--truncate">${language}</span></button></li>`;
					tab_buttons += `<button id="" class="akd__btn ${this.params.tabs.button_class} ${active_tab}" type="button" title="show ${language} tab" data-target-tab="#akd-editor-splitter-${language}-panel-${$i}" data-parent-tab="#akd-editor-main-layout-splitter-${$i}"><span class="text--truncate">${language}</span></button>`;
					tab_panels += `<div id="akd-editor-splitter-${language}-panel-${$i}" class="${this.params.tabs.panel_class} ${active_panel} akd-editor-section overflow--hidden" data-language="${language}" data-group="pinned">
						<div class="akd-editor-language-wrapper" data-layout="grid-auto" data-layout-row-auto="auto-1fr-auto">
							<span class="top-bar bg--light">
								<select id="akd-editor-languages-${language}-${$i}" class="akd-editor-select bg--info-gradient" onchange="changeLanguage()"><option value="c">C</option><option value="cpp">C++</option><option value="php">PHP</option><option value="python">Python</option><option value="node">Node JS</option></select>
								<button id="${language}-editor-splitter-panel-toggler-${$i}" class="editor-splitter-panel-toggler akd__btn btn--warning bdr--2 ml--auto">||</button>
							</span>
							<div id="akd-editor-${language}-wrapper-${$i}" class="center-bar bg--info-gradient">
								<textarea id="akd-editor-input-${language}-${$i}" class="akd-editor-textarea" placeholder="enter ${language} syntax">${pinnedItem.lastSaved.content}</textarea>
								<textarea id="akd-editor-hidden-input-${language}-${$i}" class="visually-hidden">${pinnedItem.lastSaved.content}</textarea>
							</div>
							<span class="bottom-bar bg--dark">
								<span class="col left">
									<button id="akd-editor-undo-button-${language}-${$i}" class="akd-editor-operation-button undo akd__btn btn--danger" data-target="#akd-editor-input-${language}-${$i}" ${pinnedItem.enableUndoButton === true ? '':'disabled'}>undo</button>
									<button id="akd-editor-redo-button-${language}-${$i}" class="akd-editor-operation-button redo akd__btn btn--warning" data-target="#akd-editor-input-${language}-${$i}" ${pinnedItem.enableRedoButton === true ? '':'disabled'}>redo</button>
								</span>
								<span class="col right">
									<button id="akd-editor-minify-button-${language}-${$i}" class="akd-editor-operation-button minify akd__btn btn--purple" data-target="#akd-editor-input-${language}-${$i}">minify</button>
									<button id="akd-editor-format-button-${language}-${$i}" class="akd-editor-operation-button format akd__btn btn--info" data-target="#akd-editor-input-${language}-${$i}">format</button>
								</span>
							</span>
						</div>
					</div>`;
				}
			}
			tab_buttons += '</span>';
		}
		
		return {tab_buttons, tab_panels, sidebar_tab_buttons};
	}
	/*!
	 * Build code editor UI from scratch
	 * (c) 2022 Andre Lewis, MIT License, https://akd-showcase.netlify.app
	 * @param  {String} type   The event type
	 * @param  {Node}   elem   The element to attach the event to
	 * @param  {Object} detail Any details to pass along with the event
	 */
	AKD_CodeEditor.prototype.buildUIFromScratch = function (elem, type, detail) {
		// internal/(private) property
		this.__returnContent = true;
		let finalContent = '', baseContent = this.buildUI({elem, type, detail});
		if(isString(baseContent) && baseContent.length > 0){
			this.__returnContent = false;
			finalContent += `<main id="AKD-editor" class="akd-editor">
				<header class=""></header>
				<article class="akd-editor-head">
					<aside class="akd-editor-">
						<nav class=""></nav>
					<aside>
					<section id="" class="akd-editor-body akd-editor-groups">
						<div id="" class="akd-editor-group-item">
							${baseContent}
						</div>
					</section>
				</article>
				<footer class="akd-editor-foot"></footer>
			</main>`;
			
			this.$container.insertAdjacentHTML("afterbegin", finalContent);
			this.initEvents();
		}
		return this;
	}
	/*!
	 * Build code editor UI
	 * (c) 2022 Andre Lewis, MIT License, https://akd-showcase.netlify.app
	 * @param  {Object} The destructured config object for the new editor instance
	 * @param  {Object} params  Any details to pass along with the new editor instance
	 * @param  {String} group  The group to create the new editor instance to
	 */
	//AKD_CodeEditor.prototype.buildUI = function (type, elem,, detail) {
	AKD_CodeEditor.prototype.buildUI = function({container, style=null}, params = {}, group="currentlyEditing"){
		if(container && isElement(this.$container = $.one(container))) {
			$i = 'akd-' + String(isString(container) ? container : container?.id?.className).replace('#','-').replace('.','-').replace(' ','-');
			this.$key = $i;
			//return $this;
		}
		if(style) this.editorStyle = inArray(style, this._editorStyles) ? style : this.defaultEditorStyle;
		let tmpl = '', 
		pinned_params = {
			/* html: {
				use_editor: true, 
				using: "codemirror", 
				inputEditor: $.one(`#akd-editor-input-html-${$i}`), 
				outputEditor: $.one(`#akd-editor-input-html-${$i}`), 
				code: this.inputEditor??'',
				config: {
					lineNumbers: true,
					mode: 'htmlmixed',
					//value: staticHTMLCode.querySelector('code').textContent
					value: this.inputEditor?.value||this.inputEditor?.querySelector('code')?.textContent||''
				}
			},
			css: {
				use_editor: true, 
				using: "codemirror", 
				inputEditor: $.one(`#akd-editor-input-css-${$i}`), 
				outputEditor: $.one(`#akd-editor-input-css-${$i}`), 
				code: this.inputEditor??'',
				config: {
					lineNumbers: true,
					mode: 'css',
					value: this.inputEditor?.value||this.inputEditor?.querySelector('code')?.textContent||''
				}
			},
			js: {
				use_editor: true, 
				using: "codemirror", 
				inputEditor: $.one(`#akd-editor-input-js-${$i}`), 
				outputEditor: $.one(`#akd-editor-input-js-${$i}`), 
				code: this.inputEditor??'',
				config: {
					lineNumbers: true,
					mode: 'js',
					value: this.inputEditor?.value||this.inputEditor?.querySelector('code')?.textContent||''
				}
			} */
		}
		if(this.editorStyle === "codepen"){
			tmpl = `<div id="akd-editor-main-splitter-${$i}" class="akd-editor splitter vertical flex flex--col h--12" data-ratio="75:25" data-splitter-orientation="vertical">
				<div id="akd-editor-splitter-${$i}" class="splitter_panel first--half h--12 p--0" data-layout="grid-auto" data-layout-row-auto="1fr auto">
					<div id="" class="splitter horizontal splitter_panel first--half flex flex--row h--12" data-ratio="66.66:33.33" data-splitter-orientation="horizontal">
						<div id="akd-editor-splitter-html-css-panel-${$i}" class="splitter horizontal h--12 overflow--auto" data-ratio="50:50" data-splitter-orientation="horizontal">
							<div id="akd-editor-splitter-html-panel-${$i}" class="akd-editor-section active--editor splitter_panel first--half flex flex--col gap--4 p--4 overflow--auto" data-language="html">
								<span id="" class="flex gap--4">
									<select id="akd-editor-languages-${$i}" class="flex flex--col gap--4 p--2 bdr--2 bg--info-gradient" onchange="changeLanguage()"><option value="c">C</option><option value="cpp">C++</option><option value="php">PHP</option><option value="python">Python</option><option value="node">Node JS</option></select>
									<span class="hover-submit w--6 pos--rel isolate">
										<input id="akd-editor-filename-input-html-${$i}" class="w--12 p--3 z-index-1" type="text" value="" title="enter a save file name" placeholder="enter a save file name" oninput="let button = $one('#akd-editor-save-submit-button-html-${$i}');button.title = 'save this file: '+this.value;if(!button.hasAttribute('data-filename')){button.setAttribute('data-filename', this.value);} else {button.dataset.filename = this.value;}" />
										<button id="akd-editor-save-submit-button-html-${$i}" class="akd__btn z-index-2 w--3 h--12" title="save this file" data-target="#akd-editor-input-html-${$i}" data-parent="#akd-editor-splitter-html-panel-${$i}" onclick="let text = $one('#akd-editor-input-html-${$i}').value, filename = $one('#akd-editor-filename-input-html-${$i}').value, mime = null;_.downloadText(text, filename, mime);">go</button>
									</span>
									<button id="html-editor-splitter-panel-toggler-${$i}" class="editor-splitter-panel-toggler akd__btn btn--warning bdr--2 ml--auto">||</button>
								</span>
								<div id="akd-editor-html-wrapper-${$i}" class="bg--info-gradient h--12 bdr--2 p--2" placeholder="enter HTML syntax">
									<textarea id="akd-editor-input-html-${$i}" class="akd-editor-textarea akd__input-textarea w--12 h--12">${this.HTML_CODE}</textarea>
									<textarea id="akd-editor-hidden-input-html-${$i}" class="visually-hidden">${this.HTML_CODE}</textarea>
								</div>
								<span class="w--12 flex flex--center flex--wrap gap--4 p--4 bdr--2 bg--dark">
									<span class="flex flex--center gap--4 mr--auto">
										<button id="akd-editor-undo-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--danger" data-target="#akd-editor-input-html-${$i}" ${this._editors[$i].editorGroups.pinned.html.enableUndoButton === true ? '':'disabled'}>undo</button>
										<button id="akd-editor-redo-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--warning" data-target="#akd-editor-input-html-${$i}" ${this._editors[$i].editorGroups.pinned.html.enableRedoButton === true ? '':'disabled'}>redo</button>
									</span>
									<span class="flex flex--center gap--4 ml--auto">
										<button id="akd-editor-minify-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--purple" data-target="#akd-editor-input-html-${$i}">minify</button>
										<button id="akd-editor-format-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--info" data-target="#akd-editor-input-html-${$i}">format</button>
									</span>
								</span>
							</div>
							
							<span id="akd-editor-splitter-html-css-panel-handle-${$i}" class="splitter_handle"></span>
							
							<div id="akd-editor-splitter-css-panel" class="akd-editor-section splitter_panel second--half flex flex--col p--4 gap--2 overflow--auto" data-language="css">
								<span id="" class="flex gap--4">
									<select id="akd-editor-languages-css-${$i}" class="flex flex--col gap--4 p--2 bdr--2 bg--info-gradient" onchange="changeLanguage()"><option value="c">C</option><option value="cpp">C++</option><option value="php">PHP</option><option value="python">Python</option><option value="node">Node JS</option></select>
									<span class="hover-submit w--6 pos--rel isolate">
										<input id="akd-editor-filename-input-css-${$i}" class="w--12 p--3 z-index-1" type="text" value="" title="enter a save file name" placeholder="enter a save file name" oninput="let button = $one('#akd-editor-save-submit-button-css-${$i}');button.title = 'save this file: '+this.value;if(!button.hasAttribute('data-filename')){button.setAttribute('data-filename', this.value);} else {button.dataset.filename = this.value;}" />
										<button id="akd-editor-save-submit-button-css-${$i}" class="akd__btn z-index-2 w--3 h--12" title="save this file" data-target="#akd-editor-input-css" data-parent="#akd-editor-splitter-css-panel" onclick="let text = $one('#akd-editor-input-css-${$i}').value, filename = $one('#akd-editor-filename-input-css-${$i}').value, mime = null;_.downloadText(text, filename, mime);">go</button>
									</span>
									<button id="css-editor-splitter-panel-toggler-${$i}" class="editor-splitter-panel-toggler akd__btn btn--warning bdr--2 ml--auto">||</button>
								</span>
								<div id="akd-editor-css-wrapper-${$i}" class="bg--info-gradient bdr--2 p--2 h--12">
									<textarea id="akd-editor-input-css-${$i}" class="akd-editor-textarea akd__input-textarea w--12 h--12" placeholder="enter CSS syntax">${this.CSS_CODE}</textarea>
									<textarea id="akd-editor-hidden-input-css-${$i}" class="visually-hidden">${this.CSS_CODE}</textarea>
								</div>
								<span class="w--12 flex flex--center flex--wrap gap--4 p--4 bdr--2 bg--dark">
									<span class="flex flex--center gap--4 mr--auto">
										<button id="akd-editor-undo-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--danger" data-target="#akd-editor-input-css-${$i}" ${this._editors[$i].editorGroups.pinned.css.enableUndoButton === true ? '':'disabled'}>undo</button>
										<button id="akd-editor-redo-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--warning" data-target="#akd-editor-input-css-${$i}" ${this._editors[$i].editorGroups.pinned.css.enableRedoButton === true ? '':'disabled'}>redo</button>
									</span>
									<span class="flex flex--center gap--4 ml--auto">
										<button id="akd-editor-minify-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--purple" data-target="#akd-editor-input-css-${$i}">minify</button>
										<button id="akd-editor-format-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--info" data-target="#akd-editor-input-css-${$i}">format</button>
									</span>
								</span>
							</div>
						</div>
						
						<span id="akd-editor-splitter-handle-${$i}" class="splitter_handle"></span>
						
						<div id="akd-editor-splitter-js-panel-${$i}" class="akd-editor-section splitter_panel second--half flex flex--col h--12 gap--2 p--4 overflow--auto" data-language="js">
							<span id="" class="flex gap--4">
								<select id="akd-editor-languages-js-${$i}" class="flex flex--col gap--4 p--2 bdr--2 bg--info-gradient" onchange="changeLanguage()"><option value="c">C</option><option value="cpp">C++</option><option value="php">PHP</option><option value="python">Python</option><option value="node">Node JS</option></select>
								<span class="hover-submit w--6 pos--rel isolate">
									<input id="akd-editor-filename-input-js" class="w--12 p--3 z-index-1" type="text" value="" title="enter a save file name" placeholder="enter a save file name" oninput="let button = $one('#akd-editor-save-submit-button-js-${$i}');button.title = 'save this file: '+this.value;if(!button.hasAttribute('data-filename')){button.setAttribute('data-filename', this.value);} else {button.dataset.filename = this.value;}" />
									<button id="akd-editor-save-submit-button-js" class="akd__btn z-index-2 w--3 h--12" title="save this file" data-target="#akd-editor-input-js-${$i}" data-parent="#akd-editor-splitter-js-panel-${$i}" onclick="let text = $one('#akd-editor-input-js-${$i}').value, filename = $one('#akd-editor-filename-input-js-${$i}').value, mime = null;_.downloadText(text, filename, mime);">go</button>
								</span>
								<button id="js-editor-splitter-panel-toggler-${$i}" class="editor-splitter-panel-toggler akd__btn btn--warning bdr--2 ml--auto">||</button>
							</span>
							<div id="akd-editor-js-wrapper-${$i}" class="bg--info-gradient h--12 p--2 bdr--2">
								<textarea id="akd-editor-input-js-${$i}" class="akd-editor-textarea akd__input-textarea w--12 h--12" placeholder="enter JS syntax">${this.JS_CODE}</textarea>
								<textarea id="akd-editor-hidden-input-js-${$i}" class="visually-hidden">${this.JS_CODE}</textarea>
							</div>
							<span class="w--12 flex flex--center flex--wrap gap--4 p--4 bdr--2 bg--dark">
								<span class="flex flex--center gap--4 mr--auto">
									<button id="akd-editor-undo-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--danger" data-target="#akd-editor-input-js-${$i}" ${this._editors[$i].editorGroups.pinned.js.enableUndoButton === true ? '':'disabled'}>undo</button>
									<button id="akd-editor-redo-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--warning" data-target="#akd-editor-input-js-${$i}" ${this._editors[$i].editorGroups.pinned.js.enableRedoButton === true ? '':'disabled'}>redo</button>
								</span>
								<span class="flex flex--center gap--4 ml--auto">
									<button id="akd-editor-minify-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--purple" data-target="#akd-editor-input-js-${$i}">minify</button>
									<button id="akd-editor-format-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--info" data-target="#akd-editor-input-js-${$i}">format</button>
								</span>
							</span>
						</div>
					</div>
					<span id="" class="flex-align-center p--4 bg--inherit mb--1">
						<button id="akd-editor-run-code-button-${$i}" class="akd__btn btn--success px--8 mx--auto bdr--1">run</button>
					</span>
				</div>
				
				<span id="akd-editor-main-splitter-handle-${$i}" class="splitter_handle"></span>
				
				<div id="akd-editor-main-splitter-output-panel-${$i}" class="splitter_panel second--half flex flex--col gap--2 p--4">
					<div id="akd-editor-output-wrapper-${$i}" class="w--12 h--12 bg--white bdr--2 p--2 overflow--auto">
						<iframe id="akd-editor-output-iframe-${$i}" class="w--12 h--12 bg--white" sandbox="allow-scripts" frameborder="0" crossorigin="anonymous" src="" srcdoc=""></iframe>
					</div>
				</div>
			</div>`;
		} else if(this.editorStyle === "vscode"){
			this.createNewEditorInstance(pinned_params, 'pinned');
			
			let workspace_views = '', 
			{tab_panels:pinned_tab_panels, tab_buttons: pinned_tab_buttons, sidebar_tab_buttons: sidebar_pinned_tab_buttons} = this._buildGroupTabs('pinned'), 
			{tab_panels: currentlyEditing_tab_panels, tab_buttons: currentlyEditing_tab_buttons, sidebar_tab_buttons: sidebar_currentlyEditing_tab_buttons} = this._buildGroupTabs('currentlyEditing');
			
			tmpl = `<div id="akd-editor-main-layout-splitter-${$i}" class="akd-editor splitter horizontal " data-ratio="25:75" data-splitter-orientation="horizontal">
				<aside id="akd-editor-main-layout-splitter-navbar-${$i}" class="akd-editor-main-layout-splitter-navbar splitter_panel first--half h--12 dropzone ui-pattern-1" data-layout="flex" data-layout-flow="col" data-width="25%">
					<form id="akd-editor-main-layout-splitter-navbar-searchform-${$i}" class="akd-editor-searchform" action=".">
						<input id="" class="akd-editor-searchform-input w--12 bdr--8 px--8 py--4" type="search" value="" placeholder="enter search term" />
						<div class="akd-editor-searchform-results">
							<span class="results-header"></span>
						</div>
					</form>
					<div class="navbar-section">
						<nav class="main-layout-navbar">
							<ul class="main-layout-navbar-ul">
								<li><button id="" class="akd__btn ${this.params.tabs.button_class}" type="button" title="show home tab" data-target-tab="#akd-editor-splitter-home-panel-${$i}" data-parent-tab="#akd-editor-main-layout-splitter-${$i}"><span class="text--truncate">Home</span></button></li>
							</ul>
						</nav>
					</div>
					<div class="navbar-section">
						<span class="navbar-section-title">Pinned</span>
						<nav class="group-navbar">
							<ul class="group-navbar-ul">
								${sidebar_pinned_tab_buttons}
							</ul>
						</nav>
					</div>
					<div class="navbar-section">
						<span class="navbar-section-title">Currently Editing</span>
						<nav class="group-navbar">
							<ul class="group-navbar-ul">
								${sidebar_currentlyEditing_tab_buttons}
							</ul>
						</nav>
					</div>
				</aside>
				
				<span id="akd-editor-main-layout-splitter-handle-${$i}" class="akd-editor-main-layout-splitter-handle splitter_handle"></span>
				
				<section id="akd-editor-main-layout-splitter-body-${$i}" class="akd-editor-main-layout-splitter-body ${this.params.tabs.main_wrapper_class} splitter vertical splitter_panel second--half" data-ratio="100:0" data-splitter-orientation="vertical">
					<div id="akd-editor-main-layout-splitter-body-input-panel-${$i}" class="akd-editor-grid splitter_panel first--half h--12 p--0">
						<div id="" class="akd-editor-head">
							<span class="akd-editor-utility-buttons-group">
								<span class="akd-editor-utility-buttons">
									<button class="akd__btn btn--success add-new-tab-button" type="button" title="add new language tab" style="padding: calc(0.5em - 1px) 1em;border-radius: 0.25rem;"><span class="text--truncate">+</span></button>
									<button class="akd__btn btn--orange ${this.params.tabs.button_class} home-tab-button" type="button" title="show home tab" data-target-tab="#akd-editor-splitter-home-panel-${$i}" data-parent-tab="#akd-editor-main-layout-splitter-${$i}"><span class="text--truncate">Home</span></button>
								</span>
							</span>
							
							<span class="${this.params.tabs.buttons_wrapper_class} w--12">
								${pinned_tab_buttons}
								${currentlyEditing_tab_buttons}
							</span>
							
							<span class="akd-editor-utility-buttons-group">
								<span class="akd-editor-utility-buttons">
									<!--<button class="akd__btn btn--success add-new-tab-button" type="button" title="add new language tab" style="padding: calc(0.5em - 1px) 1.75em;"><span class="text--truncate">+</span></button>-->
									<button class="akd__btn btn--success preview-toggle-button" type="button" title="toggle preview window"><span class="fa fa-chevron-left"></span></button>
								</span>
							</span>
						</div>
						
						<div id="" class="akd-editor-body ${this.params.tabs.panels_wrapper_class}">
							${pinned_tab_panels}
							<div id="akd-editor-splitter-home-panel-${$i}" class="${this.params.tabs.panel_class} akd-editor-section overflow--hidden">
								<div class="flex flex--col w--12 h--12">
									<div class="cards-controls w--12 h--auto p--4">
										<div class="flex gap--4 w--12 px--4 py--6 bg--inherit bdr--2">
											<label class="flex-align-center gap--4 w--12" for="grid-column-changer">
												<input class="grid-column-changer akd__input-range w--12" type="range" min="1" max="8" step="1" value="2" />
												<span class="grid-column-changer-count">2</span>
											</label>
											<label class="flex-align-center gap--4 w--12" for="grid-row-changer">
												<input class="grid-row-changer akd__input-range w--12" type="range" min="1" max="8" step="1" value="3" />
												<span class="grid-row-changer-count">3</span>
											</label>
										</div>
									</div>
									<div class="cards w--12 m--auto ui-pattern-1 flex--wrap" data-layout="flex" data-layout-cols="2" data-layout-rows="3" data-layout-gap="4">
										<div class="card">
											<div class="card-border"></div>
											<div class="card-content card--bg home-card-bg-1"></div>
										</div>
										<div class="card">
											<div class="card-border"></div>
											<div class="card-content card--bg home-card-bg-2"></div>
										</div>
										<div class="card">
											<div class="card-border"></div>
											<div class="card-content card--bg home-card-bg-3"></div>
										</div>
										<div class="card">
											<div class="card-border"></div>
											<div class="card-content card--bg home-card-bg-4"></div>
										</div>
										<div class="card">
											<div class="card-border"></div>
											<div class="card-content card--bg home-card-bg-5"></div>
										</div>
										<div class="card">
											<div class="card-border"></div>
											<div class="card-content card--bg home-card-bg-6"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div id="" class="akd-editor-foot">
							<span id="" class="mr--auto">
							</span>
							<span id="" class="ml--auto">
								<button id="akd-editor-run-code-button-${$i}" class="akd__btn btn--success px--8 mx--auto bdr--1 text--xs">run</button>
								<button class="akd__btn btn--success console-toggle-button text--xs" type="button" title="show new language dialog"><span class="fa fa-chevron-up"></span></button>
							</span>
						</div>
					</div>
					
					<span id="akd-editor-main-layout-splitter-body-handle-${$i}" class="splitter_handle"></span>
					
					<div id="akd-editor-main-layout-splitter-body-output-panel-${$i}" class="flexible_panel splitter_panel second--half p--0">
						<div id="" class="flexible_panel-input flex flex--between px--4 py--2">
							<div id="" class="flex-align-center f--12 h--12 p--0">
								<input id="" class="w--12 px--4 py--2 bdr--2" type="" value="" placeholder="" />
								<textarea id="" class="w--12 h--12 overflow--auto no--resize" value="" placeholder=""></textarea>
							</div>
							<span class="flex-place-center gap--0">
								<button id="akd-editor-run-code-button-${$i}" class="akd-editor-run-code-button akd__btn btn--success px--8 bdr--8-tl bdr--8-bl bdr--0-tr bdr--0-br">run</button>
								<button id="akd-editor-output-layout-changer-button-${$i}" class="akd-editor-output-layout-changer-button akd__btn btn--indigo px--8 bdr--8-tr bdr--8-br bdr--0-tl bdr--0-bl"><i class="fa fa-columns"></i></button>
							</span>
						</div>
						<div id="akd-editor-output-wrapper-${$i}" class="flexible_panel-output w--12 h--12 px--4 py--2 overflow--auto">
							<!--<iframe id="akd-editor-output-iframe-${$i}" class="w--12 h--12 bg--white" sandbox="allow-scripts" frameborder="0" crossorigin="anonymous" src="" srcdoc=""></iframe>-->
							<pre id="akd-editor-output-iframe-${$i}" class="w--12 h--12 p--4 bdr--2 overflow--auto" contenteditable></pre>
						</div>
					</div>
				</section>
			</div>
			
			<aside id="akd-editor-preview-container-${$i}" class="akd-editor-preview-container drag-panel">
				<nav class="akd-editor-preview-nav akd-editor-utility-buttons-group">
					<span class="akd-editor-utility-buttons px--5 py--3">
						<button class="preview-dasboard-toggle-button akd__btn btn--inherit"><i class="fa fa-tachometer-alt"></i></button>
						<button class="preview-reload-button akd__btn btn--inherit"><i class="fa fa-sync"></i></button>
					</span>
					<span class="${this.params.tabs.buttons_wrapper_class} px--5 py--3 ml--auto w--auto">
						<button class="${this.params.tabs.button_class} ${this.params.tabs.active_class} akd__btn btn--inherit" type="button" title="show preview tab" data-target-tab=".akd-editor-preview-frame-wrapper" data-parent-tab="#akd-editor-preview-container-${$i}"><i class="fa fa-eye"></i></button>
						<button class="${this.params.tabs.button_class} akd__btn btn--inherit" type="button" title="show run mode tab" data-target-tab=".akd-editor-preview-run-mode-wrapper" data-parent-tab="#akd-editor-preview-container-${$i}"><i class="fa fa-running"></i></button>
					</span>
				</nav>
				<div class="${this.params.tabs.panels_wrapper_class}">
					<div class="${this.params.tabs.panel_class} ${this.params.tabs.active_class} akd-editor-preview-frame-wrapper">
						<iframe id="akd-editor-preview-frame-${$i}" class="akd-editor-preview-frame bg--white" sandbox="allow-scripts" frameborder="0" src="./iframe.php?"></iframe>
					</div>
					<div class="${this.params.tabs.panel_class} akd-editor-preview-run-mode-wrapper" data-layout="grid-auto" data-layout-rows="auto 1fr">
						<span class="p--4" data-layout="flex" data-layout-flow="col">
							<span class="w--12" data-layout="flex">
								<input class="run-mode-code-input f--12" title="input id/class: enter real HTML element id or class located on THIS page" type="text" value=".akd-editor-preview-run-mode-code-input" />
								<input class="run-mode-code-output f--12" title="output id/class: enter real HTML element id or class located on THIS page" type="text" value=".akd-editor-preview-run-mode-code-output" />
							</span>
							<span class="" data-layout="flex">
								<select class="run-mode-code-mode">
									<option value="text/html">html</option>
									<option value="text/css">css</option>
									<option value="javascript">javascript</option>
								<select>
								<button class="run-mode-button akd__btn btn--inherit"><i class="fa fa-code-branch"></i></button>
							</span>
						</span>
						<div id="akd-editor-preview-run-mode-splitter-${$i}" class="splitter vertical overflow--hidden" data-ratio="50:50">
							<div class="splitter_panel first--half">
								<textarea class="akd-editor-preview-run-mode-code-input w--12 h--12 p--4"></textarea>
							</div>
							<span id="akd-editor-preview-run-mode-splitter-handle-${$i}" class="splitter_handle"></span>
							<div class="splitter_panel second--half bg--html bg--cover">
								<pre id="output" class="cm-s-default akd-editor-preview-run-mode-code-output w--12 h--12 p--4 overflow--auto" style="background-color: rgba(255 255 255/0.5);backdrop-filter: blur(3px);"></pre>
							</div>
						</div>
					</div>
					<div class="akd-editor-preview-dashboard-tab"></div>
				</div>
				<span class="showcase-drag-handle"></span>
			</aside>
			<!--<div class="drag-panel"><span class="showcase-drag-handle"></span></div>-->`;
		} else if(window["AKD_Editor_tempates"] && window["AKD_Editor_tempates"][this.editorStyle]){
			tmpl = window["AKD_Editor_tempates"][this.editorStyle];
		}
		if(this.__returnContent === true){
			return tmpl;
		} else {
			//console.log(this.$container, container)
			this.$container.insertAdjacentHTML("afterbegin", tmpl);
			if(params && !isEmptyObject(params)){
				this.createNewEditorInstance(params, group);
			}
			this.initEvents($i);
			return this;
		}
	}
	
	AKD_CodeEditor.prototype.buildTab = function buildTab(attrs={}){
		let lang_modes = ['xml', 'json', 'css', 'sql', 'js', 'html'];
		let close_btn = `<span class="box-button box-close-button akd__btn btn--warning is-active mr--8" title="show/collapse this box" onclick="let target = this.parentElement.closest('.box');if(target){target.classList.toggle('collapsed-box');if(target.classList.contains('collapsed-box')){this.querySelector('i.fa').classList.replace('fa-minus','fa-plus');} else {this.querySelector('i.fa').classList.replace('fa-plus','fa-minus');}this.classList.toggle('is-active');}"><i class="fa fa-minus"><\/i><\/span>`;
		let remove_btn = `<span class="box-button box-remove-button akd__btn btn--danger" title="remove this box" onclick="let target = this.parentElement.closest('.box');if(target){target.parentElement.removeChild(target);}"><i class="fa fa-times"><\/i><\/span>`;
		let sidebar_btn = `<span class="box-button box-sidebar-toggle-button akd__btn btn--info" title="toggle this box sidebar" onclick="let target = this.parentElement.closest('.box');if(target){target.querySelector('.box-sidebar').classList.toggle('toggled');this.classList.toggle('is-active');}"><i class="fa fa-exchange-alt"><\/i><\/span>`;
		let tab_name = `new-tab-${gi}`;
		
		//setTimeout(()=>{
		let $prettify_theme_select = `<select id="prettify-theme-select" class="prettify-theme-select w--12" title="prettify themes">
			<option value="" data-theme-id="Google" data-theme-title="Google" data-theme-type="light" data-ported-by="<a href=\'https://cdn.rawgit.com/google/code-prettify/\'>Google<\/a>" data-original="<a href=\'https://cdn.rawgit.com/google/code-prettify/\'>Google<\/a>">default<\/option>';
			${isArray($_PRETTIFY_THEMES) && $_PRETTIFY_THEMES.length > 0 ? 
				$_PRETTIFY_THEMES.map(theme => {
					$css_theme = `${this.APP_URL}third_party/prettify/css/themes/${theme.id}.css`;
					return `<option value="${$css_theme}" data-theme-id="${theme.id}" data-theme-title="${theme.name}" data-theme-type="${theme.type}" data-ported-by="${theme.ported_by?theme.ported_by:'???'}" data-original="${theme.original?theme.original:'???'}">${theme.id}<\/option>`;
				}).join('') : ''
			}
		<\/select>`, 
		$highlight_theme_select = `<select id="highlight-theme-select" class="highlight-theme-select w--12" title="highlighter themes">
			${isArray($_HIGHLIGHT_THEMES) && $_HIGHLIGHT_THEMES.length > 0 ? 
				$_HIGHLIGHT_THEMES.map(theme => {
					$css_theme = `${this.APP_URL}third_party/highlight/styles/${theme.id}.css`;
					return `<option value="${$css_theme}" data-theme-id="${theme.id}" data-theme-title="${theme.name}" data-theme-type="${theme.type}" data-ported-by="${theme.ported_by?theme.ported_by:'???'}" data-original="${theme.original?theme.original:'???'}">${theme.id}<\/option>`;
				}).join('') : ''
			}
		<\/select>`;
			
		//	$clog($_PRETTIFY_THEMES, $prettify_theme_select)
		//},10000);
		
		$.all('#reader-input-wrapper .akd__tab-panel, #reader-input-wrapper .akd__tab-button, #reader-output-wrapper .akd__tab-panel, .reader-tabs-links .akd__tab-button').forEach(el => isElement(el) && el.remove("active--tab"));
		
		//$one('#reader-input-wrapper .akd__tab-buttons').insertAdjacentHTML("beforeend", `<li>
		$.one('.reader-grid-head .akd__tab-buttons').insertAdjacentHTML("beforeend", `<li>
			<button type="button" class="akd__tab-button active--tab" title="show: ${tab_name}" data-target-tab="#akd__tab-input-panel-${gi}, #akd__tab-output-panel-${gi}" data-parent-tab=".reader-grid">
				${tab_name}
			<\/button>
		<\/li>`);
		
		//`<textarea id="reader-input-textarea-${gi}" class="reader-input-textarea w--12 h--12 p--8" oninput="let target = document.querySelector('#reader-output-textarea-${gi}');if('value' in target){target.value = this.value;} else {target.textContent = this.value;}document.querySelector('#reader-output-hidden-textarea-${gi}').value = this.value;"><\/textarea>`
		$.one('#reader-input').insertAdjacentHTML("beforeend", `<div id="akd__tab-input-panel-${gi}" class="akd__tab-panel active--tab">
			<textarea id="reader-input-textarea-${gi}" class="reader-input-textarea w--12 h--12 p--8 rs--vertical" oninput="_.liveEdit(this, '#reader-output-textarea-${gi}');_.liveEdit(this, '#reader-output-hidden-textarea-${gi}');"><\/textarea>
		<\/div>`);
		$.one('#reader-output').insertAdjacentHTML("beforeend", `<div id="akd__tab-output-panel-${gi}" class="akd__tab-panel active--tab">
			<div class="box box-solid box-default h--12 mb--0">
				<div class="box-header with-border flex gap--2">
					<span class="w--9 mr--auto text--dark"><i class="fa fa-info-circle"><\/i>&nbsp;File content&nbsp;&raquo;&nbsp;<strong>${tab_name}<\/strong><\/span>
					<span class="flex gap--2 w--auto ml--auto">
						${sidebar_btn}
						${close_btn}
						${remove_btn}
					<\/span>
				<\/div>
				<div class="box-body with-sidebar">
					<div class="box-sidebar sidebar-opaque flex flex--col gap--4 overflow--auto">
						<span class="flex flex--wrap gap--2">
							<select id="reader-output-lang-select-${gi}" class="block w--12" title="language modes" onchange="">
								${lang_modes.map(mode => `<option value="${mode}">${mode}<\/option>`).join('')}
							<\/select>
						<\/span>
						<span class="flex flex--wrap gap--2">
							${$prettify_theme_select}
							${$highlight_theme_select}
						<\/span>
						<span class="flex flex--wrap gap--2">
							<button id="" class="akd__btn btn--success flex-place-center bdr--8 px--6" type="button" title="highlight this code syntax" onclick="let mode = document.querySelector('#reader-output-lang-select-${gi}').value;highlightCode('prettify','#reader-output-textarea-${gi}', mode);"><i class="fa fa-magic"><\/i><span class="ml--2">highlight<\/span><\/button>
							<button id="" class="akd__btn btn--purple flex-place-center bdr--2 bdr--8 px--6" type="button" title="indent and prettify this code syntax" onclick="let text, outputElem = document.querySelector('#reader-output-textarea-${gi}'), hidden_textarea = document.querySelector('#reader-output-hidden-textarea-${gi}'), mode = document.querySelector('#reader-output-lang-select-${gi}').value, opts = {}, cp = 4;if('value' in hidden_textarea){text = hidden_textarea.value;} else {text = hidden_textarea.textContent;}if('value' in outputElem){outputElem.value = AKD_Formatter.beautify_text(text, mode, opts);} else {outputElem.textContent = AKD_Formatter.beautify_text(text, mode, opts);}"><i class="fa fa-indent"><\/i><span class="ml--2">prettify<\/span><\/button>
							<button id="" class="akd__btn btn--pink flex-place-center bdr--2 bdr--8 px--6" type="button" title="copy this code to the clipboard" data-target="#reader-output-textarea-${gi}" onclick="let target = document.querySelector('#reader-output-textarea-${gi}');copyToClipboard(('value' in target) ? target.value : target.textContent)"><i class="fa fa-copy"><\/i><span class="ml--2">copy<\/span><\/button>
							<button id="" class="akd__btn btn--info flex-place-center bdr--2 bdr--8 px--6" type="button" title="clear output" onclick="let target = document.querySelector('#reader-output-textarea-${gi}');target[('value' in target) ? 'value' : 'textContent'] = '';"><i class="fa fa-trash-alt"><\/i><span class="ml--2">clear<\/span><\/button>
						<\/span>
					<\/div>
					<pre id="reader-output-textarea-${gi}" class="reader-output-textarea prettyprint highlight w--12 h--12 overflow--auto" ondblclick="this.select();"><\/pre>
				<\/div>
			<\/div>
			<textarea id="reader-output-hidden-textarea-${gi}" class="reader-output-hidden-textarea visually--hidden hidden"><\/textarea>
		<\/div>`);
		
		if($_current_prettify_theme && $_current_prettify_theme !== ""){
			//$("#prettify-selected-theme").attr("href", $_current_prettify_theme);
			$.one(".prettify-theme-select").value = $_current_prettify_theme;
		}
		
		if($_current_highlight_theme && $_current_highlight_theme !== ""){
			//$("#highlight-selected-theme").attr("href", $_current_highlight_theme);
			$.one(".highlight-theme-select").value = $_current_highlight_theme;
		}
		
		//gi++;
	}
	
	AKD_CodeEditor.prototype.run = function run({html_code, css_code, js_code}, $i){
		let _iframe = $.one(`#akd-editor-output-iframe-${$i}`);
		//localStorage.setItem('html_code', html_code);
		//localStorage.setItem('css_code', css_code);
		//localStorage.setItem('js_code', js_code);
		this._editors[$i].pinned.html.ops_cache.add('html_code', html_code);
		this._editors[$i].pinned.pinned.html.lastSaved.content = html_code;
		this._editors[$i].pinned.css.ops_cache.add('css_code', css_code);
		this._editors[$i].pinned.css.lastSaved.content = css_code;
		this._editors[$i].pinned.js.ops_cache.add('js_code', js_code);
		this._editors[$i].pinned.js.lastSaved.content = js_code;
		//console.log(js_ops_cache.keys)
		//_iframe = getIframeDocument(`#akd-editor-output-iframe-${$i}`);
		//_iframe = tag$1("iframe", {id:`#akd-editor-output-iframe-${$i}`, "class": "w--12 h--12 bg--white bdr--2 p--2", sandbox: "allow-scripts", frameborder: "0", crossorigin: "anonymous"});
		//document.body.appendChild(_iframe)
		//_iframe.contentWindow.body.innerHTML = 
		_iframe.srcdoc = `<style>${localStorage.getItem('css_code')}</style><main>${localStorage.getItem('html_code')}</main><script>${localStorage.getItem('js_code')}</script>`;
		//_iframe.contentWindow.eval(localStorage.getItem('js_code'));
		
		return this;
	}
	
	AKD_CodeEditor.prototype.initEvents = function($i){
		$i = this.$key || $i || 0;
		var mixedMode = {
			name: "htmlmixed",
			scriptTypes: [
				{matches: /\/x-handlebars-template|\/x-mustache/i,mode: null},
				{matches: /(text|application)\/(x-)?vb(a|script)/i,mode: "vbscript"},
				
			],
			tags: {
				style: [
					["type", /^text\/(x-)?scss$/, "text/x-scss"],
					[null, null, "css"]
				],
				//custom: [[null, null, "customMode"]]
			}
		};
		
		let pinned_params = {
			html: {
				use_editor: true, 
				using: "codemirror", 
				inputEditor: $.one(`#akd-editor-input-html-${$i}`), 
				outputEditor: $.one(`#akd-editor-input-html-${$i}`), 
				code: $.one(`#akd-editor-input-html-${$i}`),
				config: {
					theme: "default",
					autofocus: true,
					//inputStyle: 'contenteditable',
					undoDepth: 5,
					tabindex: 0,
					lineNumbers: true,
					indentUnit: 4,
					//mode: mixedMode,
					mode: 'text/html',
					selectionPointer: true,
					matchTags: {bothTags: true},
					matchBrackets: true,
					autoCloseBrackets: true, 
					autoCloseTags: true, 
					scrollbarStyle: "overlay", 
					extraKeys: {
						"Ctrl-Space": "autocomplete",
						"Ctrl-J": "toMatchingTag",
						"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
						"Alt-F": "findPersistent", 
						"F11": function(cm) {
							cm.setOption("fullScreen", !cm.getOption("fullScreen"));
						},
						"Esc": function(cm) {
							if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
						}
					},
					foldGutter: true,
					gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
					//value: staticHTMLCode.querySelector('code').textContent
					value: this.code?.value||this.code?.querySelector('code')?.textContent||''
				}
			},
			css: {
				use_editor: true, 
				using: "codemirror", 
				inputEditor: $.one(`#akd-editor-input-css-${$i}`), 
				outputEditor: $.one(`#akd-editor-input-css-${$i}`), 
				code: $.one(`#akd-editor-input-css-${$i}`),
				config: {
					theme: "default",
					autofocus: true,
					//inputStyle: 'contenteditable',
					undoDepth: 5,
					tabindex: 0,
					lineNumbers: true,
					indentUnit: 4,
					//mode: "text/x-scss", 
					mode: "text/css", 
					selectionPointer: true,
					matchBrackets: true,
					//matchTags: {bothTags: true},
					//autoCloseBrackets: true, 
					scrollbarStyle: "simple", 
					extraKeys: {
						"Ctrl-Space": "autocomplete",
						"Ctrl-J": "toMatchingTag",
						"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
						"Alt-F": "findPersistent", 
						"F11": function(cm) {
							cm.setOption("fullScreen", !cm.getOption("fullScreen"));
						},
						"Esc": function(cm) {
							if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
						}
					},
					foldGutter: true,
					gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
					//value: staticHTMLCode.querySelector('code').textContent
					value: this.code?.value||this.code?.querySelector('code')?.textContent||''
				}
			},
			js: {
				use_editor: true, 
				using: "codemirror", 
				inputEditor: $.one(`#akd-editor-input-js-${$i}`), 
				outputEditor: $.one(`#akd-editor-input-js-${$i}`), 
				code: $.one(`#akd-editor-input-js-${$i}`),
				config: {
					theme: "default",
					autofocus: true,
					//inputStyle: 'contenteditable',
					undoDepth: 5,
					tabindex: 0,
					lineNumbers: true,
					indentUnit: 4,
					//mode: 'javascript',
					mode: {name: "javascript", globalVars: true}, 
					selectionPointer: true,
					matchBrackets: true,
					//matchTags: {bothTags: true},
					//autoCloseBrackets: true, 
					scrollbarStyle: "simple", 
					extraKeys: {
						"Ctrl-Space": "autocomplete",
						"Ctrl-J": "toMatchingTag",
						"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
						"Alt-F": "findPersistent", 
						"F11": function(cm) {
							cm.setOption("fullScreen", !cm.getOption("fullScreen"));
						},
						"Esc": function(cm) {
							if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
						}
					},
					foldGutter: true,
					gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
					value: this.code?.value||this.code?.querySelector('code')?.textContent||''
				}
			}
		}
		const $$this = this;
		const handleCardMousemove = (e) => {
			const {currentTarget: target} = e;
			const rect = target.getBoundingClientRect(), 
			x = e.clientX - rect.left, 
			y = e.clientY - rect.top;
			
			target.style.setProperty("--mouse-x", `${x}px`);
			target.style.setProperty("--mouse-y", `${y}px`);
		}
		function activeLink(){
			list.forEach(item => item.classList.remove('nav-active'));
			this.classList.add('nav-active');
		}
		const _has = function(obj, key) {return Object.prototype.hasOwnProperty.call(obj, key);}
		
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
		const list = $.all(".list");
		list.forEach(item => item.addEventListener('click', activeLink));
		/*  */
	
		// initialise the editors
		//this.initEditor(['html', 'css', 'js'], 'pinned');
		this.initEditor('pinned', pinned_params);
		//this.registerEventListeners();
		this.initDragger(".showcase-drag-handle", ".akd-editor-preview-container.drag-panel", 'right', 0.15, 100);
		if(this.editorStyle === "vscode"){
			this.dragElement(`#akd-editor-main-layout-splitter-handle-${$i}`, `#akd-editor-main-layout-splitter-navbar-${$i}`, `#akd-editor-main-layout-splitter-body-${$i}`, 'H');
			this.dragElement(`#akd-editor-main-layout-splitter-body-handle-${$i}`, `#akd-editor-main-layout-splitter-body-input-panel-${$i}`, `#akd-editor-main-layout-splitter-body-output-panel-${$i}`, 'V');
			this.dragElement(`#akd-editor-and-preview-splitter-handle-${$i}`, `#akd-editor-main-layout-splitter-${$i}`, `#akd-editor-preview-container-${$i}`, 'H');
			this.dragElement(`#akd-editor-preview-run-mode-splitter-handle-${$i}`, null, null, 'V');
			
			//this.initTabsEvent($.one(`#akd-editor-main-layout-splitter-${$i}`));
			this.initTabsEvent(this.$container);
		}
		if(this.editorStyle === "codepen"){
			this.dragElement(`#akd-editor-main-splitter-handle-${$i}`, `#akd-editor-splitter-${$i}`, `#akd-editor-main-splitter-output-panel-${$i}`, 'V');
			this.dragElement(`#akd-editor-splitter-html-css-panel-handle-${$i}`, `#akd-editor-splitter-html-panel-${$i}`, `#akd-editor-splitter-css-panel-${$i}`, 'H');
			this.dragElement(`#akd-editor-splitter-handle-${$i}`, `#akd-editor-splitter-html-css-panel-${$i}`, `#akd-editor-splitter-js-panel-${$i}`, 'H');
			$.all(".editor-splitter-panel-toggler").forEach(el => el.addEventListener("click", e => {
				let ele = e.target;
				//console.log(el === ele,el, ele)
				//el.closet(".splitter").classList.toggle("hidden");
				if(el.id === `html-editor-splitter-panel-toggler-${$i}`){
					this.maximizeSplitterPane({
						parentContainer: `#akd-editor-splitter-html-css-panel-${$i}`, 
						targetPanel: `#akd-editor-splitter-html-panel-${$i}`, 
						otherPanel: `#akd-editor-splitter-css-panel-${$i}`, 
						handle: `#akd-editor-splitter-html-css-panel-handle-${$i}`
					});
				}
				if(el.id === `css-editor-splitter-panel-toggler-${$i}`){
					this.maximizeSplitterPane({
						parentContainer: `#akd-editor-splitter-html-css-panel-${$i}`, 
						targetPanel: `#akd-editor-splitter-html-panel-${$i}`, 
						otherPanel: `#akd-editor-splitter-css-panel-${$i}`, 
						handle: `#akd-editor-splitter-html-css-panel-handle-${$i}`
					}, true);
				}
				if(el.id === `js-editor-splitter-panel-toggler-${$i}`){
					this.maximizeSplitterPane({
						parentContainer: `#akd-editor-splitter-${$i}`, 
						targetPanel: `#akd-editor-splitter-js-panel-${$i}`, 
						otherPanel: `#akd-editor-splitter-html-css-panel-${$i}`, 
						handle: `#akd-editor-splitter-handle-${$i}`
					}/* , true */);
				}
			}));
		}
		
		$.all(".akd-editor-textarea, .akd-editor-input").forEach(el => {
			el.addEventListener("blur", e => e.target.classList.remove("active--editor"));
			el.addEventListener("focus", e => {
				let $this = isElement(this) ? this : e.target, 
				akdEditor = $this.closest(".akd-editor")
				$.all(".akd-editor-textarea, .akd-editor-input", akdEditor).forEach(inp => inp.classList.remove("active--editor"));
				$this.classList.add("active--editor");
			});
			el.addEventListener("input", e => {
				let $this = isElement(this) ? this : e.target, 
				parent = $this.closest(".akd-editor-section"), 
				lang = isElement(parent) ? parent.dataset?.language : false, 
				group = isElement(parent) ? parent.dataset?.group : 'currentlyEditing', 
				buttons = parent.querySelectorAll(".akd-editor-operation-button");
				$$this._editors[$i].editorGroups[group][lang].enableUndoButton = $$this._editors[$i].editorGroups[group][lang].enableRedoButton = ($this.value !== '' || $this.value.length > 0) ? true : false;
				$.all(`#akd-editor-undo-button-${lang}-${$i}, #akd-editor-redo-button-${lang}-${$i}`).forEach(btn => {
					//btn[$$this._editors[$i].editorGroups.[group][lang].enableUndoButton === true ? 'removeAttribute' : 'setAttribute']("disabled", true)
					if($$this._editors[$i].editorGroups[group][lang].enableUndoButton === true && btn.hasAttribute('disabled')) btn.removeAttribute("disabled");
					else if($$this._editors[$i].editorGroups[group][lang].enableUndoButton === false && !btn.hasAttribute('disabled')) btn.setAttribute("disabled", true);
				});
			});
		});
		//function doHighlight() {CodeMirror.runMode(document.getElementById("code").value, "application/xml",document.getElementById("output"));}
		this.$container.addEventListener("click", (e) => {
			const $this = isElement(this) ? this : e.target, $thisParent = $this.parentElement;
			if($this.id === `akd-editor-run-code-button-${$i}`) {
				$$this.run({html_code: $.one(`#akd-editor-input-html-${$i}`).value, css_code: $.one(`#akd-editor-input-css-${$i}`).value, js_code: $.one(`#akd-editor-input-js-${$i}`).value}, $i);
			} else if($this.matches('.run-mode-button')) {
				let $parent = $this.closest(".akd-editor-preview-container"), 
				_codeInput = $.one(".run-mode-code-input", $parent), 
				_codeOutput = $.one(".run-mode-code-output", $parent), 
				codeMode = $.one(".run-mode-code-mode", $parent), 
				codeInput = $.one(_codeInput.value, $parent), 
				codeOutput = $.one(_codeOutput.value, $parent);
				if(isElement(codeInput) && isElement(codeOutput)){
					//console.log(codeOutput,codeMode,codeOutput)
					let input = codeInput['value' in codeInput ? 'value' : 'textContent'], 
					output = codeOutput['value' in codeOutput ? 'value' : 'textContent'], 
					mode = isElement(codeMode) && codeMode['value' in codeMode ? 'value' : 'textContent'] || "application/xml";
					CodeMirror.runMode(input, mode, codeOutput);
				}
			} else if($this.matches('.preview-toggle-button')) {
				document.body.classList.toggle('preview-toggled');
				$this.classList.toggle('is-active');
				if($this.classList.contains('is-active')){
					$this.querySelector('.fa')?.classList.replace('fa-chevron-left', 'fa-chevron-right');
				} else {
					$this.querySelector('.fa')?.classList.replace('fa-chevron-right', 'fa-chevron-left');
				}
			} else if($this.matches('.preview-dasboard-toggle-button')) {
				let $parent = $this.closest(".akd-editor-preview-container"), 
				$target = $.one(".akd-editor-preview-dashboard-tab", $parent);
				if(isElement($target)){
					$target.classList.toggle('toggled');
				}
			} else if($this.matches('.console-toggle-button')) {
				let $parent = $this.closest('.splitter');
				//console.log($parent)
				if(isElement($parent)){
					$this.classList.toggle('is-active');
					if($this.classList.contains('is-active')){
						$this.querySelector('.fa')?.classList.replace('fa-chevron-up', 'fa-chevron-down');
					} else {
						$this.querySelector('.fa')?.classList.replace('fa-chevron-down', 'fa-chevron-up');
					}
					
					if(!$parent.hasAttribute('data-toggled')) $parent.setAttribute('data-toggled', 'false');
					if($parent.getAttribute('data-toggled') === "false") $parent.setAttribute('data-toggled', 'true');
					else $parent.setAttribute('data-toggled', 'false');
					
					//let $first = $parent.children[0], $handle = $parent.children[1], $second = $parent.children[2]
					let [$first, $handle, $second] = $parent.children, 
					ratio = $parent.dataset.ratio, 
					orientation = $parent.dataset.splitterOrientation, 
					toggled = $parent.dataset.toggled === true || $parent.dataset.toggled === 'true', 
					r = ratio.split(":"), 
					r1 = isString(r[0]) ? r[0].replace('px', '').replace('%', ''): r[0], 
					r2 = isString(r[1]) ? r[1].replace('px', '').replace('%', ''): r[1], 
					fh = '', sh = '', ht = '', 
					fw = '', sw = '', hl = '';
					//console.log($parent, $first, $handle, $second)
					if(orientation === "V" || orientation === "vertical"){
						fh = toggled === true ? '70%' : `${r1}%`;
						sh = toggled === true ? '30%' : `${r2}%`;
						ht = toggled === true ? '70%' : `${r1}%`;
						
						Object.assign($first.style, {height: fh})
						Object.assign($handle.style, {top: ht})
						Object.assign($second.style, {height: sh})
						
						$parent.setAttribute("data-splitter-orientation", "vertical");
						$parent.setAttribute("data-handle-top", ht);
						$parent.setAttribute("data-first-panel-height", fh);
						$parent.setAttribute("data-second-panel-height", sh);
					} else {
						fw = toggled === true ? '70%' : `${r1}%`;
						sw = toggled === true ? '30%' : `${r2}%`;
						hl = toggled === true ? '70%' : `${r1}%`;
						
						Object.assign($first.style, {width: fw})
						Object.assign($handle.style, {left: hl})
						Object.assign($second.style, {width: sw})
						
						$parent.setAttribute("data-splitter-orientation", "horizontal");
						$parent.setAttribute("data-handle-left", hl);
						$parent.setAttribute("data-first-panel-width", fw);
						$parent.setAttribute("data-second-panel-width", sw);
					}
				}
			} else if($this.matches('.akd-editor-output-layout-changer-button')) {
				let $parent = $this.closest('.flexible_panel');
				if(isElement($parent)) $parent.classList.toggle('toggled');
			} else if($this.matches('.tab-close-button')) {
				let $parent = $this.closest(this.params.tabs.buttons_wrapper_selector), 
				$targetPanel = $.one($this.parentElement.dataset?.targetTab), 
				$targetTabButton = $this.parentElement
				if(isElement($targetPanel) && isElement($targetTabButton) && $targetTabButton.classList.contains(this.params.tabs.button_class)){
					$targetTabButton.parentElement.removeChild($targetTabButton)
					$targetPanel.parentElement.removeChild($targetPanel);
				} 
			} else if($this.matches('.add-new-tab-button')) {
				let newTabConfig = {
					/* to: 'currentlyEditing', 
					use_editor: true, 
					//using: "codemirror", monaco/ace/etc
					using: "monaco", 
					inputEditor: obj?.inputEditor || null, 
					outputEditor: obj?.outputEditor || null, 
					code: obj?.inputEditor??'',
					config: obj?.config || {
						lineNumbers: true,
						mode: 'htmlmixed',
						//value: staticHTMLCode.querySelector('code').textContent
						value: obj?.inputEditor?.value||obj?.inputEditor?.querySelector('code')?.textContent||''
					}, 
					ops_cache: createCache((obj?.cacheLimit && Number(obj.cacheLimit) || 10), uid()),
					enableRedoButton: false, 
					enableUndoButton: false, 
					originalContent: {filename: obj?.originalContent?.filename || null, content: obj?.originalContent?.content || ''},
					lastSaved: {filename: obj?.lastSaved?.filename || null, content: obj?.lastSaved?.content || ''},
					lastCleared: {filename: null, content: ''} */
				};
				$$this.addEditorTab(newTabConfig, $i);
			} else if($this.matches(".akd-editor-operation-button")) {
				let parent = $this.closest(".akd-editor-section"), 
				lang = isElement(parent) ? parent.dataset?.language : false, 
				group = isElement(parent) ? parent.dataset?.group : 'currentlyEditing', 
				operation, 
				cp = 4, opts = {}, preservecomm = true, $value, 
				$target = $.one(`#akd-editor-input-${lang}-${$i}`), 
				$hidden_textarea = $.one(`#akd-editor-hidden-input-${lang}-${$i}`);
				//text = isElement($hidden_textarea) && $hidden_textarea[('value' in $hidden_textarea) ? "value" : "textContent"];
				if(isElement($target)){
					$value = $target.value;
					//this._editors[$i].editorGroups[group][lang].lastSaved.content = $value;
					//this._editors[$i].editorGroups[group][lang].lastCleared.content = $value;
					console.log($value)
					if($this.id === `akd-editor-minify-button-html-${$i}` || $this.id === `akd-editor-minify-button-css-${$i}` || $this.id === `akd-editor-minify-button-js-${$i}`){
						operation = 'minify';
						lang = lang || $this.id.split(`akd-editor-minify-button-`)[1] || "";
					}
					if($this.id === `akd-editor-format-button-html-${$i}` || $this.id === `akd-editor-format-button-css-${$i}` || $this.id === `akd-editor-format-button-js-${$i}`){
						operation = 'format';
						lang = lang || $this.id.split(`akd-editor-format-button-`)[1] || "";
					}
					
					if(operation === 'minify') 
						window['AKD_Formatter'] ? $target[('value' in $target) ? 'value' : 'textContent'] = AKD_Formatter.minify_text($value, lang, preservecomm, opts) : $target.style.whiteSpace = "wrap";
					else if(operation === 'format') 
						window['AKD_Formatter'] ? $target[('value' in $target) ? 'value' : 'textContent'] = AKD_Formatter.beautify_text($value, lang, opts, cp) : $target.style.whiteSpace = "pre";
					else if($this.id ===  `akd-editor-reload-button-${lang}-${$i}`){
						let text = isString($$this._editors[$i].editorGroups[group][lang].originalContent.content) && $$this._editors[$i].editorGroups[group][lang].originalContent.content.length > 0 ? $$this._editors[$i].editorGroups[group][lang].originalContent.content : isElement($hidden_textarea) && $hidden_textarea[('value' in $hidden_textarea) ? 'value' : 'textContent'];
						$$this._editors[$i].editorGroups[group][lang].lastCleared.content = $$this._editors[$i].editorGroups[group][lang].lastSaved.content || null;
						//$$this._editors[$i].editorGroups[group][lang].lastSaved.filename = file.name;
						//$$this._editors[$i].editorGroups[group][lang].lastCleared.filename = null;
						if(isString(text) && text.length > 0){
							$target[('value' in $target) ? 'value' : 'textContent'] = text;
						}
					} else if($this.id === `akd-editor-redo-button-${lang}-${$i}`){
						let text = '', cacheObj = $$this._editors[$i].editorGroups[group][lang].ops_cache.next();
						for(i in cacheObj) text = cacheObj[i];
						if(isString(text) && text.length > 0){
							$target[('value' in $target) ? 'value' : 'textContent'] = text;
						}
					} else if($this.id === `akd-editor-undo-button-${lang}-${$i}`){
						let text = '', cacheObj = $$this._editors[$i].editorGroups[group][lang].ops_cache.prev();
						for(i in cacheObj) text = cacheObj[i];
						if(isString(text) && text.length > 0){
							$target[('value' in $target) ? 'value' : 'textContent'] = text;
						}
					}
				} else console.log('{$target} is not an element', lang);
			}
		});
		
		this.$container.addEventListener("keyup", (e) => {
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
			/* var delay;
			  // Initialize CodeMirror editor with a nice html5 canvas demo.
			  var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
				mode: 'text/html'
			  });
			  editor.on("change", function() {
				clearTimeout(delay);
				delay = setTimeout(updatePreview, 300);
			  });
			  
			  function updatePreview() {
				var previewFrame = document.getElementById('preview');
				var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
				preview.open();
				preview.write(editor.getValue());
				preview.close();
			  }
			  setTimeout(updatePreview, 300); */
		});
		
		this.$container.addEventListener("change", (e) => {
			const $this = isElement(this) ? this : e.target, $thisParent = $this.parentElement;
			if($this.matches(".grid-column-changer")){
				let theGrid = $.one('.cards'), theCount = $this.nextElementSibling || $.one('.grid-column-changer-count', $thisParent);
				if(!theGrid.hasAttribute('data-layout-cols')) theGrid.setAttribute('data-layout-cols', $this.value);
				else theGrid.dataset.layoutCols = $this.value;
				theCount.textContent = $this.value;
			}
			if($this.matches(".grid-row-changer")){
				let theGrid = $.one('.cards'), theCount = $this.nextElementSibling || $.one('.grid-row-changer-count', $thisParent);
				if(!theGrid.hasAttribute('data-layout-rows')) theGrid.setAttribute('data-layout-rows', $this.value);
				else theGrid.dataset.layoutRows = $this.value;
				theCount.textContent = $this.value;
			}
		});
		return this;
	}
	
	AKD_CodeEditor.prototype.initTabsEvent = function initTabsEvent(context, AKD_Loader = '') {
		context = (context || document);
		const $this = this;
		const render = (el, content, fx, delay = 1000) => {
			if(fx == 'show') {
				//show(el, delay);
			} else if(fx == 'fadein') {
				//fadeIn(el, delay);
			} else {
				el.classList.add(fx);
			}
			el.innerHTML = content;
		}
		const fireEvent = (ctx) => {
			if(!(isElement(ctx) || isDocument(ctx))) return false;
			ctx.addEventListener($_clickEvent, e=> {
				let $this = isElement(this) ? this : e.target, 
				_loading_error_code = '<center><p style="text-align: center !important;">Error!</p><p style="text-align: center !important;color:red;text-shadow:0 1px 0 #ffffff;">There was a problem and the page didnt load. Possible reasons could be, the URL is incorrect or you are offline(script not called from a server, <strong>ajax<\/strong> only works online)<\/p><\/center>';
			
				if($this.matches('.akd__tab-button')){
					e.preventDefault();
					let $target = $this.dataset.targetTab || $this.dataset.target, 
					parent = $.one($this.dataset.parentTab) || $this.closest('.akd__tabs') || $this.parentElement.parentElement,
					active_tab_class= $this.dataset.activeTabClass || null;
					
					if(isElement(parent) && isString($target)){
						let tab_buttons = $.all(".akd__tab-button", parent), tab_panels = $.all(".akd__tab-panel", parent), 
						target_url = $this.getAttribute('href') || $this.getAttribute("data-href"), 
						hasHref = isString(target_url) && target_url.length > 0;
						if(active_tab_class){
							[...tab_buttons, ...tab_panels].forEach(el => isElement(el) && el.classList.remove(active_tab_class));
							$this.classList.add(active_tab_class);
							//[$this, $.one($target)].forEach(el => isElement(el) && el.classList.add(active_tab_class));
						}
						[...tab_buttons, ...tab_panels].forEach(el => isElement(el) && el.classList.remove("active--tab"));
						[$this, $.one($target), ...$.all(`[data-target-tab="${$target}"], [data-target="${$target}"]`, parent)].forEach(el => isElement(el) && el.classList.add("active--tab"));
						
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
									let ext = fileext(target_url), 
									qp = urlVars(target_url),
									mode = isReallyDefined(qp["mode"]) ? decodeURI(qp["mode"]) : "";
									$this.xhr.ajax({
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
				}
			});
		}
		
		if(isArray(context)) forEach(context, ctx => fireEvent(ctx));
		else fireEvent(context);
		
		return this;
	}
	
	AKD_CodeEditor.prototype.dragElement = (handle, first, second, direction, cb) => {
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
	
	AKD_CodeEditor.prototype.initDragger = function(dragHandle = ".img-comp-slider", dragPanel = ".img-comp-overlay", from = 'right', min = 1.5, max = 100) {
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
	
	//const filterItems = _.throttle((e, id, odt) => {
	AKD_CodeEditor.prototype.filterItems = function(e, id, odt){
		let val = isString(e) ? e : e.value, 
		__items = $.all(id), $i = 0;
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
						$i++;
					}
				});
			} else {
				__items.forEach((_item) => {_item.style.display = odt || "inline-flex";});
			}
		}
	}
	//}, 250);
	//////////////////////////////////////////////////////////////////////////////////////
	function swapNode(nodeA, nodeB){
		const parentA = nodeA.parentNode, siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
		nodeB.parentNode.insertBefore(nodeA, nodeB);
		parentA.insertBefore(nodeB, siblingA);
	}
	function wrap(element, wrapper, attributes) {
		element = $one(element);
		if(isElement(wrapper)) attr(wrapper, attributes || { });
		else if (isString(wrapper)) wrapper = tag$1(wrapper, attributes);
		else wrapper = tag$1('div', wrapper);
		if(element.parentNode) element.parentNode.replaceChild(wrapper, element);
		wrapper.appendChild(element);
		return wrapper;
	}
	
	const loadScripts = function (url){
		return new Promise(function(resolve, reject){
			const script = document.createElement('script');
			script.src = url;
			
			script.addEventListener("load", function(){
				resolve(true);
			});
			
			document.head.appendChild(script);
		});
	};
	const loadScriptsInOrder = function (arrayOfJs){
		const promises = arrayOfJs.map(function (url){
			return loadScripts(url);
		});
		
		return waterfall(promises);
	}
	const waterfall = function (promises){
		return promises.reduce(
			function(p, c){
				return p.then(function(){
					return c().then(function(result){
						return true;
					});
				});
			}, 
			Promise.resolve([])
		);
	};
	/* loadScriptsInOrder(['path/to/script.js', 'path/to/another/script.js', 'path/to/yet/another/script.js'])
		.then(function(){
			// All scripts are loaded completely
			// Do something
		})
	*/
	const setFavicon = function (url){
		const favicon = document.querySelector('link[rel="icon"]');
		if(favicon){
			favicon.href = url;
		} else {
			const link = document.createElement('link');
			link.rel = 'icon';
			link.href = url;
			document.head.appendChild(link);
		}
	}
	// setFavicon('path/to/favicon.ico');
	const emojiFavicon = function (emoji){
		const canvas = document.createElement('canvas');
		canvas.height = 64;
		canvas.width = 64;
		
		const ctx = canvas.getContext('2d');
		ctx.font = '64px serif';
		ctx.fillText(emoji, 0, 64);
		
		const url = canvas.toDataURL();
		setFavicon(url);
	}
	//emojiFavicon('📺');
	const maximizeSplitterPane = (obj, reversed=false) => {
		let h1, h2, w1, w2, top, left, 
		parent = $one(obj.parentContainer), 
		target = $one(obj.targetPanel), 
		other = $one(obj.otherPanel), 
		handle = $one(obj.handle), 
		//$i = 'akd-'+String(Math.random()).replace('.','').replace('-',''), 
		$i = 'akd-' + 
		String(isString(obj.targetPanel) ? obj.targetPanel : obj.targetPanel?.id?.className).replace('#','-').replace('.','-').replace(' ','-') + 
		String(isString(obj.otherPanel) ? obj.otherPanel : obj.otherPanel?.id?.className).replace('#','-').replace('.','-').replace(' ','-'), 
		orientation = obj.orientation??(parent.hasAttribute('data-splitter-orientation') && parent.dataset.splitterOrientation)??'horizontal', 
		o = parent.getAttribute("data-splitter-orientation");
		if(o === 'vertical' || orientation === 'vertical'){
			h1 = parent.getAttribute("data-first-panel-height");
			h2 = parent.getAttribute("data-second-panel-height");
			top = parent.getAttribute("data-handle-top");
		} else {
			w1 = parent.getAttribute("data-first-panel-width");
			w2 = parent.getAttribute("data-second-panel-width");
			left = parent.getAttribute("data-handle-left");
		}
		if(!this._splitter[$i]) this._splitter[$i] = {originalDimensions: {}, toggled: false}
		if(reversed === true){
			this._splitter[$i].originalDimensions.other = {width:w1??elementStyle(target).width,height:h1??elementStyle(target).height}
			this._splitter[$i].originalDimensions.target = {width:w2??elementStyle(other).width,height:h2??elementStyle(other).height}
		} else {
			this._splitter[$i].originalDimensions.target = {width:w1??elementStyle(target).width,height:h1??elementStyle(target).height}
			this._splitter[$i].originalDimensions.other = {width:w2??elementStyle(other).width,height:h2??elementStyle(other).height}
		}
		this._splitter[$i].originalDimensions.handle = {top: top??elementStyle(handle).top,left:left??elementStyle(handle).left}
		//$clog(`w1=${w1} - h1=${h1} - top=${top}`,`w2=${w2} - h2=${h2} - left=${left}`);
		
		//console.log($i, this._splitter[$i]);
		if(this._splitter[$i].toggled === false){
			if(orientation === 'vertical'){
				target.style.height = '100%';
				other.style.height = '0%';
				handle.style.top = ((reversed === true) ? '100%' : '0%');
			} else {
				Object.assign(target.style, {'width':'100%', 'flex':'1 1 100%'});
				Object.assign(other.style, {'width': '0%', 'flex':'1 1 0%'});
				handle.style.left = ((reversed === true) ? '100%' : '0%');
			}
			this._splitter[$i].toggled = true;
		} else {
			if(orientation === 'vertical'){
				Object.assign(target.style, {'height': this._splitter[$i].originalDimensions.target.height});
				Object.assign(other.style, {'height': this._splitter[$i].originalDimensions.other.height});
				handle.style.top = this._splitter[$i].originalDimensions.handle.top;
			} else {
				Object.assign(target.style, {'width': this._splitter[$i].originalDimensions.target.width, 'flex':`1 1 ${this._splitter[$i].originalDimensions.target.width}`});
				Object.assign(other.style, {'width': this._splitter[$i].originalDimensions.other.width, 'flex':`1 1 ${this._splitter[$i].originalDimensions.other.width}`});
				handle.style.left = this._splitter[$i].originalDimensions.handle.left;
			}
			this._splitter[$i].toggled = false;
		}
	}
	//////////////////////////////////////////////////////////////////////////////////////
	AKD_CodeEditor.prototype.forEachEventElement = function forEachEventElement(fnName) {
		for (var i = 0, len = events.length; i < len; i++) {
			if(isDocument(events[i][0]) || isWindow(events[i][0])){
				events[i][0][fnName].apply(events[i][0], events[i].slice(1));
			} else if($one(events[i][0]) === this.viewEl || this.viewEl.matches(events[i][0])){
				this.viewEl[fnName].apply(this.viewEl, events[i].slice(1));
			} else {
				var els = this.viewEl.querySelectorAll(events[i][0]);
				for (var j = 0, elsLen = els.length; j < elsLen; j++) {
					els[j][fnName].apply(els[j], events[i].slice(1));
				}
			}
		}
	}
	
	AKD_CodeEditor.prototype.addEventListeners = function addEventListeners() {this.forEachEventElement('addEventListener');}
	
	AKD_CodeEditor.prototype.removeEventListeners = function removeEventListeners() {this.forEachEventElement('removeEventListener');}
	
	AKD_CodeEditor.prototype.destructure = function destructure(o, t="\n"){
		let ret = '<ul class="object-tree">';
		if(isObject(o)) {
			const checkString = (value) => {
				let object_found = false
				if(isString(value)){
					try{
						value = JSON.parse(value);
						object_found = true;
					} catch(er){
						//console.log(er)
					}
				}
				return value
			}
			const parseObj = (obj) => {
				let str = '';
				if(isObject(obj)) {
					str += '<ul class="child-tree object">';
					for(i in obj){
						let object_found = false, value = obj[i];
						
						//str += object_found === true ? `<ul class="child-tree object child-object">${value}<\/ul>` : `<li><span class="object-key">${i}<\/span><span class="sep bg--inherit">=><\/span><span class="object-value">${value}<\/span><\/li>`;
						str += isArray(value) ? 
								`<li class="child-array">
									<span class="toggler" onclick="let parent = this.parentElement, menu = parent.querySelector('.child-tree');if(menu){parent.classList.toggle('toggled');if(parent.classList.contains('toggled')){menu.style.height = menu.scrollHeight+'px'} else {menu.style.height = '0px';}}"><i><\/i>${i}<\/span>
									${parseArr(value)}
								<\/li>` : 
							isPlainObject(value) ? 
								`<li class="child-object">
									<span class="toggler" onclick="let parent = this.parentElement, menu = parent.querySelector('.child-tree');if(menu){parent.classList.toggle('toggled');if(parent.classList.contains('toggled')){menu.style.height = menu.scrollHeight+'px'} else {menu.style.height = '0px';}}"><i><\/i>${i}<\/span>
									${parseObj(value)}
								<\/li>` : 
								`<li><span class="object-key">${i}<\/span><span class="sep bg--inherit">=><\/span><span class="object-value">${value}<\/span><\/li>`;
						//str += `<li><span class="object-key">${i}<\/span><span class="sep bg--inherit">=><\/span><span class="object-value">${value}<\/span><\/li>`;
					}
					str += '<\/ul>';
				}
				return str;
			}
			const parseArr = (obj) => {
				let str = '';
				if(isArray(obj)) {
					str += '<ul class="child-tree array">';
					obj.forEach((o, i) => {
						i = i +1;
						//str += `<li><span class="array-key">${i}<\/span><span class="sep bg--inherit">=><\/span><span class="array-value">${o}<\/span><\/li>`;
						str += isPlainObject(o) ? 
								`<li class="child-object">
								<span class="toggler" onclick="let parent = this.parentElement, menu = parent.querySelector('.child-tree');if(menu){parent.classList.toggle('toggled');if(parent.classList.contains('toggled')){menu.style.height = menu.scrollHeight+'px'} else {menu.style.height = '0px';}}"><i><\/i>${i}<\/span>
								${parseObj(o)}
								<\/li>` : 
							isArray(o) ? 
								`<li class="child-array">
									<span class="toggler" onclick="let parent = this.parentElement, menu = parent.querySelector('.child-tree');if(menu){parent.classList.toggle('toggled');if(parent.classList.contains('toggled')){menu.style.height = menu.scrollHeight+'px'} else {menu.style.height = '0px';}}"><i><\/i>${i}<\/span>
									${parseArr(o)}
								<\/li>` : 
							`<li><span class="array-key">${i}<\/span><span class="sep bg--inherit">=><\/span><span class="array-value">${o}<\/span><\/li>`;
			
					});
					str += '<\/ul>';
				}
				return str;
			}
			for(i in o){
				let val = checkString(o[i]);
				if(isArray(val)) ret += `<li class="has-child array">
					${t}<span class="" onclick="let parent = this.parentElement, menu = parent.querySelector('.child-tree');if(menu){parent.classList.toggle('toggled');if(parent.classList.contains('toggled')){menu.style.height = menu.scrollHeight+'px'} else {menu.style.height = '0px';}}"><i><\/i>${i}<\/span>
					${parseArr(val, "\t")}
				<\/li>`;
				else if(isObject(val)) ret += `<li class="has-child object">
					${t}<span class="" onclick="let parent = this.parentElement, menu = parent.querySelector('.child-tree');if(menu){parent.classList.toggle('toggled');if(parent.classList.contains('toggled')){menu.style.height = menu.scrollHeight+'px'} else {menu.style.height = '0px';}}"><i><\/i>${i}<\/span>
					${parseObj(val, "\t")}
				<\/li>`;
				else ret += `<li><span class="object-key">${i}<\/span><span class="sep bg--inherit">=><\/span><span class="object-value">${isObject(val) ? parseObj(val) : isArray(val) ? parseArr(val) : val}<\/span><\/li>`;
			}
		}
		ret += `<\/ul>`;
		
		return ret;
	}
	
	AKD_CodeEditor.prototype.xhr = {
		ajaxSettings: {
			url: location.href,
			method: "GET",
			headers: [], 
			mode: "cors",
			type: "text"
		},
		ajaxSetup(cfg={}){
			extend(this.ajaxSettings, cfg||{})
			return this;
		},
		ajax(o, cb){
			const $this = this;
			this.ajaxSetup(o);
			if(this.ajaxSettings.method !== "GET" || this.ajaxSettings.method !== "HEAD") 
				this.ajaxSettings.body = {}
			
			fetch(url, this.ajaxSettings)
				.then(data=>data[$this.ajaxSettings.type]())
				.then(res=>{
					cb(res);
				})
			return this;
		},
		ajax2(ops){
			const _this = this;
			if(typeof ops == 'string') ops = { url: ops };
			ops.url = ops.url || '';
			ops.method = ops.method || 'get'
			ops.data = ops.data || {};

			var getParams = function(data, url) {
				var arr = [], str;
				for(var name in data) {
					arr.push(name + '=' + encodeURIComponent(data[name]));
				}
				str = arr.join('&');
				if(str != '') {
					return url ? (url.indexOf('?') < 0 ? '?' + str : '&' + str) : str;
				}
				return '';
			}
			//let _map = new Map();
			//_map.set("x","xxxxxxxxx");
			var api = {
				host: this.host || _this,
				globalResult : "no result/data",
				process: function(ops) {
					var self = this;
					//this.globalResult = null;
					this.xhr = null;
					if(window.ActiveXObject) { this.xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
					else if(window.XMLHttpRequest) { this.xhr = new XMLHttpRequest(); }
					if(this.xhr) {
						this.xhr.responseURL = ops.url;
						self.beforeCallback && self.beforeCallback.apply(self.host, [self.xhr, _this]);
						this.xhr.onreadystatechange = () => {
							if(self.xhr.readyState == 4 && self.xhr.status == 200) {
								var result = self.xhr.responseText;
								if(ops.json === true && typeof JSON != 'undefined') {
									result = JSON.parse(result);
								}
								self.doneCallback && self.doneCallback.apply(self.host, [result, self.xhr]);
							} else if(self.xhr.readyState == 4) {
								var nStatus = this.status;
								ajaxMsg = nStatus + ": " + (_$._HTTPStatus[nStatus] || "Unknown"),
								result = "Ooops!! A broken link! Please contact the webmaster of this website A.S.A.P and give him/her the following error code : [ " + this.status+" : "+this.statusText+",URL: "+(this.responseURL || ops.url)+" ] <br>\n"+ajaxMsg;
								//document.title = '404 : ['+filename(url,true) +'] Not Found';
								self.failCallback && self.failCallback.apply(self.host, [result, self.xhr]);
							}
							if(result){
								try{
								/*let tmpElem = document.createElement("div");
								tmpElem.id = "tmp-elem";
								tmpElem.innerHTML = result;
								document.body.appendChild(tmpElem);
								tmpElem = null;
								//_map.set("globalResult" ,result);
								//alert(self.globalResult);
								//alert(_map.get("globalResult"));*/
								window.globalResult = self.globalResult = result;
								} catch(e){handleError(e.stack)}
							}
							self.alwaysCallback && self.alwaysCallback.apply(self.host, [result, self.xhr]);
						}
						
						if(ops.method == 'get') {
							this.xhr.open("GET", ops.url + getParams(ops.data, ops.url), true);
						} else {
							this.xhr.open(ops.method, ops.url, true);
							this.setHeaders({
								'X-Requested-With': 'XMLHttpRequest',
								'Content-type': 'application/x-www-form-urlencoded'
							});
						}
						if(ops.headers && typeof ops.headers == 'object') {
							this.setHeaders(ops.headers);
						}		
						setTimeout(function() { 
							ops.method == 'get' ? self.xhr.send() : self.xhr.send(getParams(ops.data)); 
						}, 20);	
					}
					return this;
				},
				/*returnResult: function(result){
					let completed = false;
					setTimeout(function (){
						completed = true;
						if(elem = $one("#tmp-elem")) {
							let  _content = elem.innerHTML;
							alert(_content);
							_this.viewContent.push(_content)
							return _content;
						} 
					},3000);
					this.globalResult = result || "";
					return this;
				},*/
				done: function(callback) {this.doneCallback = callback;return this;},
				fail: function(callback) {this.failCallback = callback;return this;},
				always: function(callback) {this.alwaysCallback = callback;return this;},
				before: function(callback) {this.beforeCallback = callback;return this;},
				setHeaders: function(headers) {for(var name in headers) {this.xhr && this.xhr.setRequestHeader(name, headers[name]);}}
			}

			return api.process(ops);
		}
	}
	//------------------------------------------------------------------------------------------
	function Sandbox() {
	    this.test = 'insandbox';
		this.keys = [];
		this.values = [];
	    return this;
	}
	Sandbox.prototype.run = function(src) {typeof src === "function" ? src.call(this) : eval.call(this, src);};
	Sandbox.prototype.runFn = function(fn){fn.call(this);}
	Sandbox.prototype.getvar = function(name) {return this[name];};
	Sandbox.prototype.evaluate = function(src){return eval("function(){" + src + "}");}
	Sandbox.prototype.eval = function(src){
	    var before = {}, prop, fn;
	    // Take a snapshopt of the window object before
	    src = "function(" + this.keys.join(",") + "){" + src + "}";
	    src = src.replace(/var/g, "");
	    // I'm not a wisard at regex so a better one should be used avoid this bug
		//var x, y, z; 
	    for(prop in window){
	        before[prop] = true;
	    }
	    // Then evaluate the source
	    fn = window.eval(src);
	    fn.apply(window, this.values);
	    // Then see what changed
	    for(prop in window){
	        if(!before[prop]){
	            // Add to the sandbox object
	            this.keys.push(prop);
	            this.values.push(window[prop]);
	            this[prop] = window[prop];
	            delete window[prop];
	        }
	    }
	}
/*
var bx = new Sandbox();
bx.run('var x = 1;');
alert(`${bx.getvar('test')} - ${bx.getvar('x')} - ${x}`)
print(bx.getvar('x'))        // undefined
print(x)
// function example
bx.run(function(){
    this.x = 1;
});
bx.getVar("x") // 1
//------------------------------------------
bx.run(Sandbox.evaluate(src));
bx.getVar("x") // 1
bx.getVar("blah") // "Hello, World!"
//-----------------------------
bx.eval("var x = 1;");
bx.eval("var y = x;");
alert(bx.x);
alert(bx.y);
*/
	function reader(reader) {return reader ? new Reader(reader) : new Reader(new FileReader);}
	function Reader(reader){
		this.reader = reader/* || new FileReader */;
		this.file = null;
		reader.onerror = this.emit.bind(this, 'error');
		reader.onabort = this.emit.bind(this, 'error', new Error('abort'));
		reader.onprogress = this.onprogress.bind(this);
		reader.onload = this.onload.bind(this);
		return this;
	}
	Reader.prototype.emit = function(type,e){
		this.reader["on"+type] = function(){
			return e;
		}
	}
	Reader.prototype.on = function(type,cb,capture){
		this.reader["on"+type] = cb();
	}
	Reader.prototype.onload = function(e){
	  this.emit('end', this.reader.result);
	};
	Reader.prototype.onprogress = function(e){
	  e.percent = e.loaded / e.total * 100 | 0;
	  this.emit('progress', e);
	};
	Reader.prototype.abort = function(){
	  this.reader.abort();
	};

	/**
	 * Read `file` as `type`.
	 *
	 * @param {File} file
	 * @param {String} type
	 * @api private
	 */

	Reader.prototype.read = function(file, type){
	  var method = 'readAs' + type;
	  this.reader[method](file);
	};
	Reader.prototype.file = function(file) {
	  this.file = file;
	  for (var key in file) this[key] = file[key];
	}

	/**
	 * Check if the mime type matches `type`.
	 *
	 * Examples:
	 *
	 *    file.is('image/jpeg')
	 *    file.is('image/*')
	 *
	 * @param {String} type
	 * @return {Boolean}
	 * @api public
	 */

	Reader.prototype.is = function(type){
	  var real = this.file.type;

	  // identical
	  if (type == real) return true;

	  real = real.split('/');
	  type = type.split('/');

	  // type
	  if (type[0] == real[0] && type[1] == '*') return true;

	  // subtype
	  if (type[1] == real[1] && type[0] == '*') return true;

	  return false;
	};

	/**
	 * Convert to `type` and invoke `fn(err, result)`.
	 *
	 * @param {String} type
	 * @param {Function} fn
	 * @return {Reader}
	 * @api private
	 */

	Reader.prototype.to = function(type, fn){
	  if (!window.FileReader) return fn();
	  var reader = this.reader;
	  reader.on('error', fn);
	  reader.on('end', function(res){ fn(null, res) });
	  reader.read(this.file, type);
	  return reader;
	};

	/**
	 * Convert to an `ArrayBuffer`.
	 *
	 * @param {Function} fn
	 * @return {Reader}
	 * @api public
	 */

	Reader.prototype.toArrayBuffer = function(fn){
	  return this.to('ArrayBuffer', fn);
	};

	/**
	 * Convert to text.
	 *
	 * @param {Function} fn
	 * @return {Reader}
	 * @api public
	 */

	Reader.prototype.toText = function(fn){
	  // TODO: encoding
	  return this.to('Text', fn);
	};

	/**
	 * Convert to a data uri.
	 *
	 * @param {Function} fn
	 * @return {Reader}
	 * @api public
	 */

	Reader.prototype.toDataURL = function(fn){
	  return this.to('DataURL', fn);
	};
	
	const promiseFileReader = () => {
		var accept = {
			image : ["image/png", "image/jpeg"],
			text   : ["text/plain", "text/css", "text/javascript", "application/javascript", "application/json", "application/xml", "text/html"]
		}, r_imFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
		
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
				reader.onload = function(e) { resolve(e.target.result) }
				reader.onerror = function(e) { reject(new Error('Error reading' + file.name + ': ' + e.target.result)) }
				reader['readAs' + as](file);
			});
		}
		function readAsDataURL(file){return readAs(file, 'DataURL')}
		function readAsText(file){return readAs(file, 'Text')}
		function readAsArrayBuffer(file){return readAs(file, 'ArrayBuffer')}

		return {
			readAs: readAs,
			readAsDataURL: readAsDataURL,
			readAsText: readAsText,
			readAsArrayBuffer: readAsArrayBuffer
		} 
	}
/*module.exports = {
  readAsDataURL: readAsDataURL,
  readAsText: readAsText,
  readAsArrayBuffer: readAsArrayBuffer,
}
Basic syntax
const PromiseFileReader = require('promise-file-reader');

PromiseFileReader.readAsDataURL(fileData).then(newImage).catch(err => console.error(err));
Example: file input
import {readAsDataURL, readAsText, readAsArrayBuffer} from 'promise-file-reader';

function newImage(imageDataUrl) {
  ...
}
function newTextFile(text) {
  ...
}
function loadedArrayBuffer(arrayBuffer) {
  ...
}

// e.g. <input id="file-input" type="file" />
const fileInput = document.getElementById('file-input');
fileInput.addEventListener("change", handleFiles, false);
function handleFiles(event) {
  const fileMetaData =  event.target.files[0];
  if(fileMetaData) {
    if (/^image/.test(fileMetaData.type)) {
      readAsDataURL(fileMetaData)
      .then(newImage)
      .catch(err => console.error(err));
    } else {
      readAsText(fileMetaData)
      .then(newTextFile)
      .catch(err => console.error(err));
    }
    // or
    readAsArrayBuffer(fileMetaData).then(loadedArrayBuffer).catch(err => console.error(err));
  }
}
*/
	function getDomain(){var e=document.domain.toString().split(".".toString());return e[e.length-2]+"."+e[e.length-1]}
	function removeSubdomain(e){var u,t=[];return t=e.split("."),"modelhub."!=(u=e.match(/[a-zA-Z0-9\-]*\./)[0])&&(u=""),t[0]=u,t.join(".")}
	function time(){return Math.floor((new Date).getTime()/1e3)}
	function safeJSON(e){var u;try{e=e.replace(/(\t|\n|\r|\s)/gi," "),u=JSON.parse(e)}catch(e){u=null}return u}

	/** 
	 * This function renders/move elements to any loacation in the DOM.
	 * let props = document.querySelector('nav')
	 * return createPortal(
	 *	 props.children,
	 *	 document.getElementById('menu')
	 * )
	*/
	const createPortal = (parent,other) => {
		 
		return;
	}
	//------------------------------------------------------------------------------------------
	function TextSelection(id) {
		this.node = $one(id);

		// Validate the node
		if ( this.node && this.node.nodeType != 1 ) {
			throw new Error ("TextSelection: id does not specify an element.");
		}
		var isTextBox = (this.node.tagName == "INPUT" && this.node.type == "text");
		var isTextArea = (this.node.tagName == "TEXTAREA");
		if(!(isTextBox || isTextArea)){
			throw new Error ("TextSelection: Element is not a text box or text area.");
		}
	}

	TextSelection.prototype.getSelectedText = function () {
		if ( this.node.selectionStart !== undefined ) {  // DOM
			var start = this.node.selectionStart;
			var end = this.node.selectionEnd;
			return this.node.value.substring(start, end);
		} else if ( document.selection ) {               // IE
			var range = document.selection.createRange();
			if ( this.node == range.parentElement() ) {
				return range.text;
			}
			return "";
		}
		return "";
	}

	TextSelection.prototype.getStartIndex = function () {
		if ( this.node.selectionStart !== undefined ) { // DOM
			return this.node.selectionStart;
		} else if ( document.selection ) {              // IE
			return this.getIEIndex("start");
		}
		return 0;
	}

	TextSelection.prototype.getEndIndex = function () {
		if ( this.node.selectionEnd !== undefined ) {  // DOM
			return this.node.selectionEnd;
		} else if ( document.selection ) {             // IE
			return this.getIEIndex("end");
		}
		return 0;
	}

	TextSelection.prototype.getIEIndex = function (which) {
		this.node.focus();
		var range = document.selection.createRange();

		if ( this.node !== range.parentElement() ) return 0;

		var index = 0;
		while ( range.parentElement() == this.node ) {
			if (which == "start") {
				range.moveStart("character", -1);
			} else {
				range.moveEnd("character", -1);
			}
			index++;
		}
		return index - 1;
	}

	TextSelection.prototype.addText = function ( before, after ) {
		this.node.focus();
		if ( before == undefined ) before = "";
		if ( after == undefined ) after = "";
		if ( this.node.selectionStart !== undefined ) {
			var start = this.node.selectionStart;
			var end = this.node.selectionEnd;
			var first = this.node.value.slice(0,start);
			var middle = this.node.value.slice(start,end);
			var last = this.node.value.slice(end);
			var scroll = this.node.scrollTop;
			this.node.value = first + before + middle + after + last;
			var cursor = first.length + before.length;
			if ( middle != "" ) {
				cursor += middle.length + after.length;
			}
			this.node.setSelectionRange(cursor, cursor);
			this.node.scrollTop = scroll;
		} else if ( document.selection ) {
			var range = document.selection.createRange();
			if ( this.node != range.parentElement() ) return;
			if ( range.text == "" ) {
				range.text = before + after;
				range.moveStart("character", -after.length);
				range.moveEnd("character", -after.length);
			} else {
				range.text = before + range.text + after;
			}
			range.select();
		}
	}
	//window.AKD_CodeEditor = AKD_CodeEditor;
	return AKD_CodeEditor;
//})()
})));