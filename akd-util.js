;(function(window){
	//if('undefined' === typeof this) const this = window;
	let rPath = /.*(\/|\\)/,
	rcomma = /,/,rspace = /\s/g,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rquery = ( /\?/ ),
	rheader = /^h\d$/i,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	rprotocol = /^\/\//,
	rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, 
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,// #7653, #8125, #8152: local protocol detection
	allTypes = "*/".concat( "*" ),
	now = nonce = Date.now(),
	_random = String(Math.random()).replace('.','').replace('-',''),
	uid = () => {let _uid = Math.random();return String(_uid++).replace('.','').replace('-','');},
	returnFalse = () => {return false;},
	emptyFn = Function.prototype,
	hasWindow = ('undefined' !== typeof window), 
	hasDocument = ('undefined' !== typeof document), 
	fi=0,mi=0;
	
	const $r_imFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i, 
	$_tfxs = ["css","html","htm","json","js","jsx","jsp","log","markdown","md","mhtml","mjs","php","phtml","pl","py","rem","rb","sol","ts","tsx","txt","xml","xsl","xst","yaml","gitignore"],
	$_ifxs = ["avif","jpg","jpeg","jfif","gif","png"], 
	$_afxs = ["mp3","ogg","aac","m4a","webma"], 
	$_vfxs = ["mp4","ogv","avi","m4v","mkv","webm"], 
	$_scfxs = ["c","h","js","jsx","jsp","rb","php","pl","py","ts","tsx","yaml","yml"], 
	$_validExts = {
		text   : $_tfxs,
		script : $_scfxs,
		image  : $_ifxs,
		audio  : $_afxs,
		video  : $_vfxs,
		other  : ["gitignore"]
	}, 
	$_accept = {
		audio  : ["audio/aac", "audio/mp3", "audio/mpeg", "audio/ogg", "audio/oga", "audio/m4a"],
		video  : ["video/mp4", "video/mpeg", "video/webm", "video/ogv", "video/m4v"],
		text   : ["text/plain", "text/html", "text/css", "text/javascript", "text/php", "text/python", "text/json", "text/xml"],
		image  : ["image/png", "image/jpeg", "image/gif", "image/webp", "image/jfif", "image/avif", "image/svg+xml"],
		script : ["application/x-javascript", "application/json", "application/x-php", "application/x-python", "application/xml"],
		other  : ["image/svg+xml"]
	}, 
	$_mimeTypes = {
		"md"  :"text/plain",
		"log" :"text/plain",
		"txt" :"text/plain",
		"rb" :"text/plain",
		"html":"text/html",
		"htm":"text/html",
		"css":"text/css",
		"json":"application/json",
		"php" :"application/x-php",
		"phtml":"text/x-php",
		"py" :"application/x-python", //"py":"text/x-python",
		"js"  :"application/x-javascript",
		"jsx"  :"application/x-javascript",
		"ts"  :"application/x-javascript",
		"tsx"  :"application/x-javascript",
		"png": "image/png", 
		"jpg": "image/jpeg", 
		"jpeg": "image/jpeg", 
		"gif": "image/gif", 
		"webp": "image/webp", 
		"jfif": "image/jfif", 
		"avif": "image/avif", 
		"svg": "image/svg+xml", 
		"gitignore" :"text/plain",
		"LICENSE" :"text/plain"
	}, 
	$_skinz = ["black","blue","blue-light","blue-royal","blue-akd","blue-green","cyan","danger","dark","darker","default","gray","gray-dark","green","indigo","info","light","navy","orange","pink","primary","purple","red","secondary","success","teal","warning","yellow","white"], 
	$_bgOptions = {
		repeat: [
			{name:'initial', value:'initial'},
			{name:"no-repeat", value:"no-repeat"},
			{name:"repeat", value:"repeat"},
			{name:"repeat-x", value:"repeat-x"},
			{name:"repeat-y", value:"repeat-y"},
			{name:"round", value:"round"},
			{name:"space", value:"space"}
		], 
		size: [
			{name:"auto", value:"auto"},
			{name:'inherit', value:'inherit'},
			{name:'initial', value:'initial'},
			{name:"cover", value:"cover"},
			{name:"contain", value:"contain"},
			{name:"revert", value:"revert"},
			{name:"revert-layer", value:"revert-layer"},
			{name:"unset", value:"unset"}
		], 
		attachment: [
			{name:'initial', value:'initial'},
			{name:'inherit', value:'inherit'},
			{name:"local", value:"local"},
			{name:"revert", value:"revert"},
			{name:"revert-layer", value:"revert-layer"},
			{name:"fixed", value:"fixed"},
			{name:"scroll", value:"scroll"}
		], 
		blendMode: [
			{name:"color", value:"color"},
			{name:"color-burn", value:"color-burn"},
			{name:"color-dodge", value:"color-dodge"},
			{name:"darken", value:"darken"},
			{name:"difference", value:"difference"},
			{name:"exclusion", value:"exclusion"},
			{name:"hard-light", value:"hard-light"},
			{name:"hue", value:"hue"},
			{name:'initial', value:'initial'},
			{name:'inherit', value:'inherit'},
			{name:"lighten", value:"lighten"},
			{name:"luminousity", value:"luminousity"},
			{name:"multiply", value:"multiply"},
			{name:"normal", value:"normal"},
			{name:"overlay", value:"overlay"},
			{name:"revert", value:"revert"},
			{name:"revert-layer", value:"revert-layer"},
			{name:"saturation", value:"saturation"},
			{name:"screen", value:"screen"},
			{name:"soft-light", value:"soft-light"},
			{name:"unset", value:"unset"}
		]
	}, 
	$_EMOJIS = {
		adapter: '🔌',
		array: '📚',
		browser: '🌐',
		date: '⏱️',
		function: '🎛️',
		logic: '🔮',
		math: '➗',
		media: '📺',
		node: '📦',
		object: '🗃️',
		string: '📜',
		type: '📃',
		utility: '🔧'
	}, 
	$_clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';

	let __akd = {
		// Can be adjusted by the user
		cacheLength: 50,
		_cache : {
			"apps": [], "events": [], "splitter": [/* {originalDimensions: {}, toggled: false} */], 
			"editors": [
				/* {
					akd: {
						html: {
							lastSaved : {filename: null, content: null},
							lastCleared : {filename: null, content: null}
						}, 
						css: {
							lastSaved: {filename: null, content: null},
							lastCleared: {filename: null, content: null}
						}, 
						js: {
							lastSaved: {filename: null, content: null},
							lastCleared: {filename: null, content: null}
						}
					},
					ide: []
				} */
			]
		},
		_mimeTypes : $_mimeTypes,
		_globals : {
			showAnimClass : null,
			hideAnimClass : null,
			animDuration : 1000
		}, 
		_tabs: {
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
		_nodes : []
	};
	
	function _typeof(obj){
		if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
			_typeof = function (obj) {return typeof obj;};
		} else {
			_typeof = function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};
		}
		return arguments.length > 1 && arguments[1] && typeof arguments[1] === "string" ? _typeof(obj) === arguments[1] : _typeof(obj);
		//return _typeof(obj);
	}
	const _type = (obj) => {return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();}
	const typeName = (val) => {
		// stringify val and extract the word following "object"
		var typeName = Object.prototype.toString.call(val).match(/^\[object\s(.*)\]$/)[1];
		// special case: null is of type "Null"
		if (val === null) return "Null"; 
		// special case: instance of a user-defined class or ad-hoc object
		if (typeName === "Object") return val.constructor.name || "Object";
		// all other cases: "Number", "String", "Boolean", "Function", "Array", "HTMLDocument", ...
		return typeName;
	} 
	function d(t) {return Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}
	const extend = ( first, second ) => {"use strict";for( var prop in second ) {if( second.hasOwnProperty( prop ) ) {first[prop] = second[prop];}}return first;}	
	const makeArray = (collection) => {return Array.from ? Array.from(collection) : Array.prototype.slice.call(collection);}
	const merge = (array1, array2) => {return [].concat(array1, array2);/* return array1.push(...array2); */}
	const merge2 = (...args) => {
		// Native, doesn't remove duplicate items
		//return [].concat(...args)
		// ES6-way, doesn't remove duplicate items
		//array1 = [...array1, ...array2]
		// Set version, does remove duplicate items
		return Array.from(new Set([].concat(...args)))
	}
	
	const inArray = (needle, arr) => {if((typeof arr == 'undefined') || !arr.length || !arr.push) return false;for (var i = 0; i < arr.length; i++) if (arr[i] == needle) return true;return false;}
	const isArray = (value) => {return Object.prototype.toString.call(value) == '[object Array]';}
	const isArrayLike = ( obj ) => {var length = !!obj && isIn(obj,"length") && obj.length,type = _type( obj );if ( type === "function" || isWindow( obj ) ) {return false;}return type === "array" || length === 0 || typeof length === "number" && length > 0 && isIn(obj,( length - 1 )) || obj != null && typeof obj[Symbol.iterator] === 'function';}
	const isAudioElement = (elem) => {return elem instanceof HTMLAudioElement;}
	const isBlob = (obj) => {return window.Blob && obj instanceof Blob;}
	const isClass = (t) => "function" === d(t) && /^\s*class\s+/.test(t.toString());
	const isDocument = (obj) => {return obj === document && obj.nodeType === 9;}
	const isDefined = (str) => {return _typeof(str) !== "undefined";}
	const isElement = (obj) => {return (typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string");}
	const isEmpty = (str) => !str || typeof(str) === undefined || str === "undefined" || str === null || str === "" || 0 === Object.keys(str).length && str.constructor === Object;
	const isEmptyObject = (obj) => {for(var key in obj) {if(obj.hasOwnProperty(key)) return false;}return true;};
	// formally: isEmpty
	const isEmptyObject2 = (t) => !t || 0 === Object.keys(t).length && t.constructor === Object;
	const isFile = (f) => {return !isElement(f) && !isSelector(f) && f.include && f.include(".");}
	const isFileList = (obj) => {return window.FileList && obj instanceof FileList;}
	const isFunction = (obj) => {return Object.prototype.toString.call(obj) == '[object Function]' || ( typeof obj === "function" && typeof obj.nodeType !== "number" );}
	const isImage = (url) => {return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);}
	const isIn = (obj ,property) => {return (property in obj) || Object.prototype.hasOwnProperty.call( obj,property);}
	const isInteger = function (x) {return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0;}
	const isLowerCase = (str) => {return str === str.toLowerCase();}
	const isMediaElement = (elem) => {return elem instanceof HTMLMediaElement || elem instanceof HTMLAudioElement || elem instanceof HTMLVideoElement;}
	const isNegativeZero = (val) => {return val === 0 && 1 / val === -Infinity;}
	const isNil = (val) => {return val === undefined || val === null;}
	const isNode = (obj) => {return (typeof Node === "object" ? obj instanceof Node : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string");}
	const isNonNegativeInteger = function (x) {return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0 && x >= 0;};
	const isNull = (val) => {return val === null;}
	const isNumber = (val) => {return _typeof( val ) === 'number' && val === val;}
	const isNumeric = ( obj ) => {var realStringObj = obj && obj.toString();return isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;}
	const isObject = (obj) => {return obj === Object(obj);}
	const isObjectLike = (val) => {return val !== null && _typeof(val) === 'object';}
	const isPlainObject = (val) => {return !!val && _typeof(val) === 'object' && val.constructor === Object;}
	const isPositiveInteger = function (x) {return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0 && x > 0;}
	const isPromise = p => p && typeof p.then === 'function' || Promise.resolve(p) === p;
	const isReallyDefined = (str) => str && typeof(str) !== undefined && str !== "undefined";
	const isSelector = (selector) => {return (isString(selector) && ( match = rquickExpr.exec(selector) ) && ( match[1] || match[2] || match[3] || $one(selector)))}
	const isSet = (str) => {return _typeof(str) !== 'undefined';}
	const isStream = (val) => {return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function';}
	const isString = (val) => {return _typeof(val) === 'string';}
	const isSymbol = (val) => {return _typeof(val) === 'symbol';}
	const isTravisCI = () => {return 'TRAVIS' in process.env && 'CI' in process.env;}
	const isUndefined =  (val) => {return val === undefined;}
	const isUpperCase = (str) => {return str === str.toUpperCase();}
	const isValidJSON = (str) => {try {let ret = JSON.parse(str);return ret;} catch (e) {return false;}}
	const isVideoElement = (elem) => {return elem instanceof HTMLVideoElement;}
	const isWindow = ( obj ) => {var toString = Object.prototype.toString.call(obj);return toString == '[object global]' || toString == '[object Window]' || toString == '[object DOMWindow]' || (obj != null && obj === obj.window);}
	const isWritableStream = (val) => {return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function' && typeof val._write === 'function' && _typeof(val._writableState) === 'object';}
	
	const camelize = (stringToCamelize) => {if(String(stringToCamelize).indexOf('-') == -1){return stringToCamelize;}var oStringList = String(stringToCamelize).split('-');var isFirstEntry = true;var camelizedString = '';for(var i=0; i < oStringList.length; i++){if(oStringList[i].length>0){if(isFirstEntry){camelizedString = oStringList[i];isFirstEntry = false;} else {var s = oStringList[i];camelizedString += s.charAt(0).toUpperCase() + s.substring(1);}}}return camelizedString;}
	/* // Zepto camelize function
    const camelize = (str) => {return str.replace(/-+(.)?/g, function (match, chr) {return chr ? chr.toUpperCase() : '';});}
    // Zepto dasherize function */ 
    const dasherize = (str) => {return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();}
	const capitalize = (str) => {if(!str) return '';var first = str.substring(0,1);return first.toUpperCase() + str.substring(1);}
    
	const createUniqueName = (str) => {return isString(str) ? str.replace('./', '').replace(/["&'./:=?[\]]/gi, '-').replace(/(_)/gi, '-').replace(/(--)/gi, '') : str;}

	const htmlValue = (value) => {return value.replace("&lt;","<").replace("&gt;",">").replace("&amp;","&").replace("&quot;",'"').replace("&#39;","'").replace("&nbsp;"," ");}
	const htmlData = (value) => {return value.replace("<","&lt;").replace(">","&gt;").replace("&","&amp;").replace('"',"&quot;").replace("'","&#39;").replace(" ","&nbsp;");}
	const jsValue = (value) => {return value.replace(/\\/g, "\\\\").replace(/\r?\n/, "\\\n").replace(/\"/g, "\\\"").replace(/\'/g, "\\'");}
	const check_for_slash = ($path,$convertSlash=false) => {if($path.lastIndexOf("/") != - 1) {$path = $path + "/";}if($convertSlash == true){$path = str_replace('[\]','/',$path);}return $path;}	
	const escapeHTML = (str) => {return str.replace(/[&<>'"]/g, function (tag) {return {'&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#39;','"': '&quot;'}[tag] || tag;});}
	const unescapeHTML = (str) => {return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, function (tag) {return {'&amp;': '&','&lt;': '<','&gt;': '>','&#39;': "'",'&quot;': '"'}[tag] || tag;});}
	const fixProp = function(prop){let fixed_prop = prop;if (prop === "class") fixed_prop = "className";else if (prop === "checked") fixed_prop = "defaultChecked";else if (prop === "for") fixed_prop = "htmlFor";else if (prop === "style") fixed_prop = "cssText";else fixed_prop = camelize(prop);return fixed_prop;};
	
	/* 
	 * Escapes a string to use in a regular expression.
	 * Use `String.prototype.replace()` to escape special characters.
	 * escapeRegExp('(test)'); // \\(test\\)
	*/
	const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	/*function escapeRegExp(string) {return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string}*/
	function replaceAll(str, find, replacement) {return str.replace(new RegExp(escapeRegExp(find), 'g'), replacement);/*return str.split(find).join(replacement);*/};
	function replaceWith(origElem, replacement, attributes){
		if(isElement(origElem) && (isString(replacement) || isElement(replacement))){
			var parent = origElem.parentNode;
			if(isString(replacement)) {
				if(replacement.charAt(0) === "<"){
					tempDiv = document.createElement('div');
					tempDiv.innerHTML = replacement;
					replacement = tempDiv.childNodes[0];
				} else {
					replacement = makeElem({type:replacement, attrs : (attributes && isPlainObject(attributes) ? attributes : null)});
				}
			}
			parent.replaceChild(replacement, origElem);
		}
		return this;
	}
	const removeNonASCII = (str) => {return str.replace(/[^\x20-\x7E]/g, '');};
	// use a negative index to insert relative to the end of the string.
	const stringInsert = (str, index, value,_use) => {
		_use = _typeof(_use,"string") && _use.length > 4 ? _use : "slice";
		var ind = index < 0 ? str.length + index  :  index;
		if(_use === "slice" || _use === "") return str.slice(0, ind) + value + str.slice(ind);
		else if(_use === "substring") return  str.substring(0, ind) + value + str.substring(ind, str.length);
		else if(_use === "regexp" || _use === "RegExp") return  index > 0 ? str.replace(new RegExp('.{' + index + '}'), '$&' + value) : value + str;
	};
	// String.prototype.insert = function (index, string) {var ind = index < 0 ? this.length + index  :  index;return this.substring(0, ind) + string + this.substring(ind, this.length);};
	
	/**
     * Trick to restart an element's animation
     *
     * @param {HTMLElement} element
     * @return void
     *
     * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
    */
	const reflow = element => {
		// eslint-disable-next-line no-unused-expressions
		element.offsetHeight;
	}
	
	/**
	 * Insert `what` to string at position `index`.
	 */
	// String.prototype.insert = function(what, index) {return index > 0 ? this.replace(new RegExp('.{' + index + '}'), '$&' + what) : what + this;};
	// var str = 'foo baz';
	// alert(str.insert('bar ', str.length) );  // "foo bar baz"
	// alert( str.insert('bar ') );  // "bar foo baz"
	// Use case: Lets say you have full size images using a naming convention but can't update the data to also provide thumbnail urls.
	// var url = '/images/myimage.jpg';
	// var thumb = stringInsert(url,-4, '_thm');
	//    result:  '/images/myimage_thm.jpg'
	// alert(thumb);
	/**
	 * @description
	 * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
	 * object or an array. The `iterator` function is invoked with `iterator(value, key)`, where `value`
	 * is the value of an object property or an array element and `key` is the object property key or
	 * array element index. Specifying a `context` for the function is optional.
	 *
	 * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
	 * using the `hasOwnProperty` method.
	 *
	   ```js
	     var values = {name: 'misko', gender: 'male'};
	     var log = [];
	     angular.forEach(values, function(value, key){
	       this.push(key + ': ' + value);
	     }, log);
	     expect(log).toEqual(['name: misko', 'gender: male']);
	   ```
	 *
	 * @param {Object|Array} obj Object to iterate over.
	 * @param {Function} iterator Iterator function.
	 * @param {Object=} context Object to become context (`this`) for the iterator function.
	 * @returns {Object|Array} Reference to `obj`.
	 */
	const forEach = (obj, iterator, context) => {
		var key;
		if (obj) {
			if (isFunction(obj)){
				for (key in obj) {
					// Need to check if hasOwnProperty exists,
					// as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
					if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
						iterator.call(context, obj[key], key);
					}
				}
			} else if (obj.forEach && obj.forEach !== forEach) {
				obj.forEach(iterator, context);
			} else if (isArrayLike(obj)) {
				for (key = 0; key < obj.length; key++) iterator.call(context, obj[key], key);
			} else {
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						iterator.call(context, obj[key], key);
					}
				}
			}
		}
		return obj;
	};
	const each = (obj,callback) => {var length, i = 0;if (isArrayLike(obj)) {length = obj.length;for ( ; i < length; i++ ) {if (callback.call( obj[ i ],i,obj[i]) === false) {break;}}} else {for (i in obj) {if (callback.call( obj[ i ],i,obj[i]) === false) {break;}}}return obj;};
	const minOfArray = (numArray) => {
		var min;
		// return Math.min.apply(null, numArray);
		/* The new spread operator is a shorter way of writing the apply solution to get the maximum of an array: */
		// var max = Math.min(...numArray);
		// recommended solution
		min = numArray.reduce((a, b) => Math.min(a, b));
		return min;
	}
	const maxOfArray = (numArray) => {
		var max;
		// return Math.max.apply(null, numArray);
		/* The new spread operator is a shorter way of writing the apply solution to get the maximum of an array: */
		// var max = Math.max(...numArray);
		// recommended solution
		max = numArray.reduce((a, b) => Math.max(a, b));
		return max;
	}
	/**
	* A faster alternative to `Function#apply`, this function invokes `func`
	* with the `this` binding of `thisArg` and the arguments of `args`.
	*
	* @private
	* @param {Function} func The function to invoke.
	* @param {*} thisArg The `this` binding of `func`.
	* @param {Array} args The arguments to invoke `func` with.
	* @returns {*} Returns the result of `func`.
	*/
	function apply(func, thisArg, args) {
		switch (args.length) {
			case 0: return func.call(thisArg);
			case 1: return func.call(thisArg, args[0]);
			case 2: return func.call(thisArg, args[0], args[1]);
			case 3: return func.call(thisArg, args[0], args[1], args[2]);
		}
		return func.apply(thisArg, args);
	}
	function getElements(_links){
		var x=0,allLinks = [];
		if( _links && ( isString(_links) || isArray(_links) )){
			if(isString(_links) && isSelector(_links)){
				allLinks = $all(_links);
				//alert(`${routeConfig.router_links} - ${allLinks}`);
			} else if(isElement(_links)){
				allLinks.push(_links);
			} else {
				for(;x<_links.length;x++){
					var item = _links[x];
					if(isString(item) && isSelector(item) && ( (tmp = $all(item)) && isElement(tmp) || isArray(tmp) ) ) merge(allLinks, (isArray(tmp)?tmp:[tmp]));
					else if(isElement(item)) allLinks.push(item);
				}
			}
		}
		return allLinks;
	}
	
	const getBy = (_by, _selector,_context,one,idx=0) => {
		try{
			var by,context,selector,_ret,allowed = ["id","class","tag","name","all","query","query-one","queryOne"];
			_by = ( _typeof(_by) === "string" && inArray(_by.toLowerCase(),allowed) ? _by : "id" ).toLowerCase();
			selector = _by === "id" ? _selector.replace("#","") : _by === "class" ? _selector.replace(".","") : _selector.trim();
			context = isElement( _context ) && ( _by !=="id" || _by !== "xpath" ) ? _context : document;
			by = _by === "id" ? "getElementById" : _by === "class" ? "getElementsByClassName" : _by === "tag" ? "getElementsByTagName" : _by === "name" ? "getElementsByName" : _by === "xpath" ? "evaluate" : (_by === "query" || _by === "query-one" || _by === "queryOne" ) ? "querySelector" : "querySelectorAll";
			_ret = _typeof(selector) === "string" ? ( ( _by === "id" || _by === "query-one" || _by === "queryOne" || _by === "query") ? context[by](selector) : _by === "xpath" ?  context[by](selector, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null) : Array.from( context[by](selector) ) ) : selector;
			if(one && isArray(_ret)) _ret = isNumber(idx) && _ret[idx] || _ret[0];//&& isElement(_ret[idx])
			return _ret;
		} catch (e){
			return null;// alert(e.stack);
			//return [context, selector];// alert(e.stack);
		}
	};
	const $all = (selector, context,root) => {
		var m, i, elem, match, newContext = context && context.ownerDocument,
		nodeList, list = [];
		__akd._nodes = [];
		// TODO : Fix this
		/* if(selector === Object(selector)// &&selector.nodeType&&selector.nodeType === 1||selector.nodeType === 9 ) {
			return isArray(selector) || isArrayLike(selector) ? selector:[selector];
		} else { */
		if(isElement(selector)/* selector === Object(selector)&&selector.nodeType&&selector.nodeType === 1||selector.nodeType === 9 */) {
			selector = (context && isObject(context) && (!isElement(context)||context!==document)) ? Object.assign(selector, context) : selector;
			__akd._nodes.push(selector);
			return [selector];
			//return isArray(selector) || isArrayLike(selector) ? selector:[selector];
		} else if(isArray(selector) && selector.length > 0) {
			selector.forEach(elem=>{
				/* if(isString(elem)) console.log(elemelem.every(e => isElement(e))) */
				elem = isElement(elem) ? elem : (isString(elem) && (elem.match(/^.*#/) || elem.match(/^#/)) ? $all(elem) : '');
				if(isArray(elem) || isElement(elem)) {
					if(context && isObject(context) && (!isElement(context)||context!==document)) Object.assign(elem, context);
					if(isArray(elem)) {
						__akd._nodes.push(...elem);
						list.push(...elem);
					} else {
						__akd._nodes.push(elem);
						list.push(elem);
					}
				}
			});
			return list;
		} else if(rsingleTag.test(selector)){
			//elem = str2DOMElement(selector, context);//m = rsingleTag.exec(str);//alert("single tag found "+m[0]+"-"+m[1]+"-"+m[2]);
			var matches = selector.match("/<([\w-]*)>/");
			if (matches === null || matches === undefined) {
				throw "Invalid Selector or Node";
				return false;
			}
			var nodeName = matches[0].replace('<', '').replace('>','');
			elem = [tag$1(nodeName, (isPlainObject(context) ? context : {}))];
			list.push(elem);
			__akd._nodes.push(elem);
			return list;
		} else {
			context = isElement(context) ? context : ((isArray(context)&&context.length>0) ? context : document); //context = context || document;
			nodeType = context && ('nodeType' in context) ? context.nodeType : 9;// nodeType defaults to 9, since context defaults to document
			if(!isArray(context) && nodeType !== 11 && (match = rquickExpr.exec(selector))){
				if(m = match[1]) {
					/* if(nodeType === 9){
						//if((elem = context.getElementById(m)) ) {if (elem.id === m){list.push(elem);}}
						if((elem = context.getElementById(m)) && elem.id === m){
							list.push(elem);
						}
					} else {
						if(newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m){
							list.push(elem);
						}
					} */
					if(nodeType === 9 && (elem = context.getElementById(m)) && elem.id === m){
						list.push(elem);
					} else if(newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m){
						list.push(elem);
					}
				} else if((m = match[2]) && context.getElementsByTagName && isElement(context.getElementsByTagName(m)[0])){
					nodeList = getBy( "tag", m, context);// nodeList = context.getElementsByTagName( m );
					if(nodeList && nodeList.length > 0){
						list = makeArray(nodeList);
					}
				} else if((m = match[3]) && context.getElementsByClassName && isElement(context.getElementsByClassName(m)[0])){
					nodeList = getBy( "class", m, context );// nodeList = context.getElementsByClassName( m );
					if(nodeList && nodeList.length > 0) {
						list = makeArray(nodeList);
					}
				} else /* if (context.querySelectorAll(selector) && isArray(context.querySelectorAll(selector)) && isElement(context.querySelectorAll(selector)[0])) */ {
					nodeList = getBy( "all", selector, context );// nodeList = context.querySelectorAll( selector );
					if(nodeList && nodeList.length > 0) {
						list = makeArray(nodeList);
					}
				}
			} else if(selector && selector.nodeType){
				context = selector;
				list.push(selector);
			} else if(isFunction(selector)){
				//return root.ready !== undefined ? root.ready(selector) : selector(_pbd);
				return root.ready !== undefined ? root.ready(selector) : selector.call(null, ...arguments);
			} else if(isArray(context)){
				//$clog("context is an array : ", context);
				context.forEach(ctx=>{
					if(ctx && ctx.querySelectorAll){
						list.push(...ctx.querySelectorAll(selector));
					}
				})
			} else if(context && isIn(context, 'querySelector') /* && isElement(context.querySelector(selector))*/) {
				newContext = context;
				try{
					/*;for(i in context){
						//alert(i+"="+context[i]+" - "+context[i].nodeType+" - "+context[i].nodeName); 
						if(isElement(context[i]) ) {
							newContext = context[i];  
							// alert(context[i]+" - "+context[i].nodeType+" - "+context[i].nodeName); 
							break;
						}
					}
					//nodeList = newContext.querySelectorAll(selector);
					*/
					nodeList = getBy("all", selector, newContext);
					if (nodeList && nodeList.length > 0) {
						list = makeArray(nodeList);
						//list = Array.from ? Array.from(nodeList) : Array.prototype.slice.call(nodeList);
					}
				} catch(ctxError){
					//newContext = context instanceof _pbd ? ( context.nodes?context.nodes:context[ 0 ] ) : context;
					//list = newContext;
					//list = _pbd().util().find(selector);
				}
			}
			//if(list.length === 0)console.log('$all function test',selector, context,list)
		}
		__akd._nodes = list;
		return list;
	};
	const $one = (selector,context,whichOne) => {
		try{
			var theOne,elems;
			if(isString(selector)){
				elems = $all(selector,context);
				if(isString(whichOne) && whichOne === "first" &&  isArray(elems) ){whichOne =  0;} else if(isString(whichOne) && whichOne === "last" &&  isArray(elems) ) {whichOne = elems.length - 1;}
				theOne =  isElement(elems[whichOne]) ? elems[whichOne] : ( isElement(elems[0]) ? elems[0] : elems );
			} else if(isElement(selector)) {theOne = selector;}
			return theOne;
		} catch (e){handleError(e)}
	};
	const on = function(elem, _evt, _fn, _opts = {}){
		let evt, fn, opts;
		if(this.chaining === true /* && arguments.length === 1 */){
			[evt, fn, opts = {}] = arguments;
		} else {
	        this.nodes = isElement(elem) ? elem : ((isString(elem)||isArray(elem)) ? $all(elem) : "");
			evt = _evt;
			fn = _fn;
			opts = _opts;
		}
		//if(!opts) opts = {};
		let elems = this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem);
		
		//const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e);
		const delegatorFn = e => {
			if( isArray(opts.target) ){
				var target;
				for(var i = 0;i < opts.target.length;i++){
					var target = e.target.closest(opts.target[i]);
					if(target){
						//if (!target) return// target = e.target; // (2)
						//if(!el.contains(target)) return; // (3)
						if(target.matches(opts.target[i])) {
							fn.call(target, e);
						}
					}
				}
			} else {
				let target = e.target.closest(opts.target); // (1)
				if (!target) return// target = e.target; // (2)
				//if(!el.contains(target)) return; // (3)
				if(target.matches(opts.target)) {
					fn.call(target, e);
				}
			}
			return
		}
		forEach(elems, el => {
			var eventsArr = (rspace.test(evt) || evt.indexOf(' ') >= 0) ? evt.split(" ") : rcomma.test(evt) ? evt.split(",") : null;
			if(isArray(eventsArr) && eventsArr.length > 1 ){
				var x = 0,total = eventsArr.length;
				for(;x<total;x++){
					el.addEventListener(eventsArr[ x ], opts.target ? delegatorFn : fn, opts.options || false);
					if(opts.target) delegatorFn;
					//if(opts.target) return delegatorFn;
					// if(typeof fn === 'function'){
						// el.addEventListener(eventsArr[ x ], fn)
					// } else {
						// if(isArray(el)){
							// el.forEach(elem => {
								// elem.addEventListener(eventsArr[ x ], function(e){
									// /* let closest = e.target.closest(fn), matches = e.target.matches(fn);
									// if(matches) cb(e)
									// else if(isElement(closest) && elem.contains(closest)) {Object.assign(e,'target',closest);cb(e)}*/
									// let target = e.target.closest(fn); // (1)
									// if (!target) return; // (2)
									// if (!elem.contains(target)) return; // (3)
									// if(target.matches(fn)) {
										// cb.call(target, e);
									// }
								// })
							// })
						// } else {
							// el.addEventListener(eventsArr[ x ], function(e){
								// /* let closest = e.target.closest(fn), matches = e.target.matches(fn);
								// if(matches) cb(e)
								// else if(isElement(closest) && el.contains(closest)) {Object.assign(e,'target',closest);cb(e)}*/
								// let target = e.target.closest(fn); // (1)
								// if (!target) return; // (2)
								// if (!el.contains(target)) return; // (3)
								// if(target.matches(fn)) {
									// cb.call(target, e);
								// }
							// })
						// }
					// }
				}
			} else {
				el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);
				if(opts.target) return delegatorFn;
			}
		});
		
		return this;
	}
	const on2 = (event, cbOrSelector, cb) => {
		var eventsArr = (rspace.test(event) || event.indexOf(' ') >= 0) ? event.split(" ") : rcomma.test(event) ? event.split(",") : null;
		if(/*isString( event ) && */isArray(eventsArr) && eventsArr.length > 1 ){
			var x = 0,total = eventsArr.length;
			for(;x<total;x++){
				if(typeof cbOrSelector === 'function'){
					this.forEach(e => e.addEventListener(eventsArr[ x ], cbOrSelector))
				} else {
					this.forEach(elem => {
						elem.addEventListener(eventsArr[ x ], function(e){
							/* let closest = e.target.closest(cbOrSelector), matches = e.target.matches(cbOrSelector);
							if(matches) cb(e)
							else if(isElement(closest) && elem.contains(closest)) {Object.assign(e,'target',closest);cb(e)}*/
							let target = e.target.closest(cbOrSelector); // (1)
							if (!target) return; // (2)
							if (!elem.contains(target)) return; // (3)
							if(target.matches(cbOrSelector)) {
								cb.call(target, e);
							}
						})
					})
				}
			}
		} else {
			if(typeof cbOrSelector === 'function'){
				this.forEach(e => e.addEventListener(event, cbOrSelector))
			} else {
				this.forEach(elem => {
					/* elem.addEventListener(event, e => {if(e.target.matches(cbOrSelector)) cb(e)}) */
					elem.addEventListener(event, function(e){
						/* let closest = e.target.closest(cbOrSelector), matches = e.target.matches(cbOrSelector);
						if(matches) cb(e)
						else if(isElement(closest) && elem.contains(closest)) {Object.assign(e,'target',closest);cb(e)}
						*/
						let target = e.target.closest(cbOrSelector); // (1)
						if (!target) return; // (2)
						if (!elem.contains(target)) return; // (3)
						// loop parent nodes from the target to the delegation node
						// for (var target = e.target; target && target != this; target = target.parentNode) {
						if(target.matches(cbOrSelector)) {
							cb.call(target, e);
							//break;
						}
						//}
					})
				})
			}
		}
		return this;
	}
	const off = (el, evt, fn, opts, capture) => {
		const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e);
		var eventsArr = (rspace.test(evt) || evt.indexOf(' ') >= 0) ? evt.split(" ") : rcomma.test(evt) ? evt.split(",") : null;
		if(isArray(eventsArr) && eventsArr.length > 1 ){
			var x = 0,total = eventsArr.length;
			for(;x<total;x++){
				el.removeEventListener(eventsArr[ x ], fn, capture || false);
				console.log(eventsArr[ x ])
			} 
		} else {
			el.removeEventListener(evt, fn, capture || false);
		}
	}
	/**
	* Nulls out event handlers to prevent memory leaks in IE6/IE7
	* http://javascript.crockford.com/memory/leak.html
	* @param {Element} d
	* @return void
	*/
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
			for ( i = 0; i < l; i += 1 ) {this.purge( d.childNodes[i] );}
		}
		return this;
	}
	const elementStyle = (strOrEle) => {var element = isElement(strOrEle) ? strOrEle : isString(strOrEle) ? $one(strOrEle) : null;return (!element) ? null :(window.getComputedStyle ? window.getComputedStyle(element,null) : (element.currentStyle ? element.currentStyle : document.defaultView.getComputedStyle(element, null)));};
	/* 
		hasClass: function( _class, elem) {
			var className = " " + _class + " ",i = 0, l = this.nodes.length;
			if(elem && isElement(elem)){
				if(_typeof( elem.classList ) !== "undefined" && elem.classList.contains(className) ){
					return true;
				} else if ( elem.nodeType === 1 && (" " + elem.className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			} else {
				for ( ; i < l; i++ ) {
					if(_typeof( this.nodes[i].classList ) !== "undefined" && this.nodes[i].classList.contains(className) ){
						return true;
					} else if ( this.nodes[i].nodeType === 1 && (" " + this.nodes[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
						return true;
					}
				}
			}
			return false;
		},
		// index section
		get: function( num, chain ) {
			var tmp, _this = this, chain = chain || false;
			if ( num == null ) {
				return slice.call( this || this.nodes);
			}
			//this.currentIndex = num < 0 ? num + this.nodes.length : num;
			this.setCIndex(num < 0 ? num + this.nodes.length : num);
			// Return just the one element from the set
			// return num < 0 ? this.nodes[ num + this.nodes.length ] : this.nodes[ num ];
			//alert(this.currentIndex);
			tmp = this.nodes[ this.currentIndex ];
			//this.nodeCopies = tmp;
			return chain ? (function (){
				_this.nodes = tmp;
				_this[0] = tmp;
				return _this;
			})() : tmp;
		},
		
	*/
	
	const addClass = function(elems, className) {
		if(this.chaining === true){
			className = arguments.length === 1 ? elems : className;
		}
		if(isString(elems) || isElement(elems) || isArray(elems)){
	        this.nodes = isElement(elems) ? elems : $all(elems);
		}
		//elems = this.nodes && this.nodes.length > 0 ? this.nodes : $all(elems);
		elems = isArray(elems) || isElement(elems) ? elems : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elems));
		//console.log(elem, elems)
	    
		if(elems && isString(className)) {
	    	let _this = this, classNames = rcomma.test(className) ? className.split(",") : (rspace.test(className) || className.indexOf(' ') >= 0 ? className.split(' ') : null);
		    /* if(elems.length && elems.length > 0) {
	            for (var i = 0;i < elems.length; i++) {var el = elems[i];if(isElement(el) && !el.classList.contains(className)) el.classList.add(className);}
	        } else if (isElement(elems) && !elems.classList.contains(className)) elems.classList.add(className); */
	    
			if(isArray(elems) ){
				forEach(elems, function (elem){
					//if (!elem || !className || (elem.className && elem.className.search(new RegExp("\\b" + className + "\\b")) != -1))
					if(isString(elem)) {
						elem = $all(elem)
						addClass(elem, className)
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
		
	const removeClass = function(elems, className){
		if(this.chaining === true){
			className = arguments.length === 1 ? elems : className; //className = arguments[0];
		}
		if(isString(elems) || isElement(elems) || isArray(elems)) {
			this.nodes = isElement(elems) ? elems : $all(elems);
		}
		elems = isArray(elems) || isElement(elems) ? elems : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elems));
		if(elems && isString(className)){
			/* if (elems.length && elems.length > 0) {
				for (var i = 0;i < elems.length; i++) {var el = elems[i];if(isElement(el) && el.classList.contains(className))el.classList.remove(className);}
			} else if (isElement(elems) && elems.classList.contains(className))elems.classList.remove(className); */
		
			let _this = this, classNames = rspace.test(className) ? className.split(" ") : rcomma.test(className) ? className.split(",") : null;
			if(isArray(elems)){
				forEach(elems, function (elem){
					if(isString(elem)) {
						elem = $all(elem)
						removeClass(elem, className)
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
	const toggleClass = function(elem, className){
		if(this.chaining === true){
			className = arguments.length === 1 ? elem : className; //className = arguments[0];
		}
		if(isString(elem) || isElement(elem) || isArray(elem)) {
			this.nodes = isElement(elem) ? elem : $all(elem);
		}
		//elem = this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem);
		elem = isArray(elem) || isElement(elem) ? elem : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem));
		
		if(isString(className)){
			if(isArray(elem)){
				forEach(elem,function (el){
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
		} catch (e){handleError(e.stack)}
		
		return elem;
	};
	const hasClass = function(ele, className){
		if(this.chaining === true){
			className = arguments.length === 1 ? ele : className; //className = arguments[0];
		}
		if(isString(ele) || isElement(ele) || isArray(ele)) {
			this.nodes = isElement(ele) ? ele : (isArray(ele) ? ele[0] : $one(ele));
		}
		//ele = isArray(ele) && ele.length > 0 ? ele[0] : (isElement(ele) ? ele : (this.nodes && this.nodes.length > 0 ? this.nodes[0] : $one(ele)));
		ele = this.nodes && this.nodes.length > 0 ? this.nodes[0] : $one(ele);
		
		//ele = isObject(ele) ? ele : $one(ele);
		/* if (!ele || !className || !ele.className || ele.className.search(new RegExp("\\b" + className + "\\b")) == -1) return false;
		return true; */
		return ele.classList ? ele.classList.contains(className) : new RegExp('(^| )' + className + ' |$','gi').test(ele.className);
	}
	// Experimental, Incomplete.
	function toggle(elem, property, value){
		//.toggleAttr|toggle("wrap","off,soft");
		if(!elem || !property || !value) return false;
		var values = rspace.test(value) || value.indexOf(' ') >= 0 ? value.split(" ") : rcomma.test(value) ? value.split(",") : null;
		try{
			if( values && isArray(values) && values.length >= 2){
				if(elem.classList){
					var cName1 = values[0].trim(), cName2 = values[1].trim();
					if(cName1 !== "" && cName2 !==""){
						if(!elem.classList.contains(cName1) && !elem.classList.contains(cName2)) elem.classList.add(cName1);
						if(elem.classList.contains(cName1)) {elem.classList.remove(cName1);elem.classList.add(cName2);}
						else if(elem.classList.contains(cName2)) {elem.classList.remove(cName2);elem.classList.add(cName1);}
					} else if(cName1 !== "" && !elem.classList.contains(cName1)) elem.classList.toggle(cName1);
					else if(cName2 !=="" && !elem.classList.contains(cName2)) elem.classList.toggle(cName2);
				} /* else {
					var i = 0, cs = "";
					for(;i<values.length;i++) cs += ` ${values[i]}`;
					elem.value += cs;
				}*/
			} else {
				if(elem.classList){
					elem.classList.toggle(value);
				} else {
					var classes = elem.value.split(' ');
					existingIndex = classes.indexOf(value);
					if(existingIndex >= 0){
						classes.splice(existingIndex,1);
					} else classes.push(value);
					elem.value = classes.join(' ');
				}
			}
		} catch (e){handleError(e.stack)}
		
		return elem;
	};
	const styleElement = function(elem, _styleObj, _value){
		let styleObj, value;
		if(this.chaining === true /* && arguments.length === 1 */){
			//value = styleObj;styleObj = elem;
			[styleObj, value] = arguments;
		 } else if (isString(elem)) {
	        this.nodes = $all(elem);
			value = _value;
			styleObj = _styleObj;
		}
		//let elems = this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem);
		let elems = isArray(elem) || isElement(elem) ? elem : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem));
		forEach(elems, elem => {
			if(isElement(elem)){
				if( isObject(styleObj) ){
					Object.assign(elem.style, styleObj);
				} else if( isString(styleObj) ){
					styleObj == "cssText" ? elem.style[styleObj] += value : elem.style[styleObj] = value;
				}
			}
		})
		return this;
	}
	const styles = function(element, style) {element = isElement(element) ? element : $one(element);style = style == 'float' ? 'cssFloat' : camelize(style);var value = element.style[style];if (!value) {var css = document.defaultView.getComputedStyle(element, null);value = css ? css[style] : null;}if (style == 'opacity') {return value ? parseFloat(value) : 1.0;}if (value == 'auto') {if ((style == 'width' || style == 'height') && styleProp(element, 'display') != 'none') {return element['offset' + capitalize(style)] + 'px';}return null;}return value == 'auto' ? null : value;}
	const styleProp = function(element, prop){var value,camelized = camelize(prop);if (isElement(element) && element.style) value = element.style[camelized];if (!value){if (document.defaultView && document.defaultView.getComputedStyle){var css = document.defaultView.getComputedStyle(element, null);value = css ? css.getPropertyValue(prop) : null;} else if (window.getComputedStyle) {var css = window.getComputedStyle(element,null);value = css ? css.getPropertyValue(prop) : null;} else if (element.currentStyle) {value = element.currentStyle[camelized];}}if (prop == 'opacity') return value ? parseFloat(value) : 1.0;return value == 'auto' ? null : value;}
	
	const css = function(elem,_prop,_value) {
		let prop = _prop, value = _value;
		if(this.chaining === true /* && arguments.length === 1 */){
			//value = prop;prop = elem;
			[prop, value] = arguments;
		} else if(isString(elem)){
	        this.nodes = $all(elem);
			value = _value;
			prop = _prop;
		}
		//elem = this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem);
		elem = isArray(elem) || isElement(elem) ? elem : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem));
		if(isArray(elem)){
			//each(elem,(el)=>{
			forEach(elem,(el)=>{
				if(el && isElement(el)){
					if(isPlainObject(prop)){
						Object.assign(el.style,prop);
					} else if(isString(prop) && isString(value)){
						let camelized = camelize(prop);
						//el.style[prop] = value;
						if(el.style[camelized]) {el.style[camelized] = value;}
						else if(el.style[prop]) {el.style[prop] = value;}
						else {
							el.style.setProperty(prop, value);
							//el.style.cssText += `${prop}:${value};`;
						}
					} else {
						let camelized = camelize(prop);
						return el.style[camelized] ? el.style[camelized] : (el.style[prop] ? el.style[prop] : styleProp(el, prop));
					}
				}
			});
		} else if(elem && isElement(elem)){
			let camelized = camelize(value);
			if(isPlainObject(prop)){
				Object.assign(elem.style, prop);
			} else if(isString(prop) && isString(value)){
				//elem.style[prop] = value;
				if(elem.style[camelized]) {elem.style[camelized] = value;}
				else if(elem.style[prop]) {elem.style[prop] = value;}
				else {
					elem.style.setProperty(prop, value);
					//elem.style.cssText += `${prop}:${value};`;
				}
			} else {
				//return elem.style[prop];
				return elem.style[camelized] ? elem.style[camelized] : (elem.style[prop] ? elem.style[prop] : styleProp(elem, prop));
			}
		}
		return this;
	}
	const attr = function(elems, _attrObj, _value){
		let attrObj = _attrObj, value = _value, attrs = [];
		if(this.chaining === true /* && arguments.length === 1 */){
			value = _attrObj;
			attrObj = elems;
			//[attrObj, value] = arguments;
		 } else if(isString(elems)) {
	        this.nodes = $all(elems);
			//value = _value;attrObj = _attrObj;
		}
		//elem = this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem);
		elems = isElement(elems) ? [elems] : isArray(elems) ? elems : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elems));
		if(attrObj === "undefined" && value === "undefined"){
			elem = isArray(elems) ? elems[0] : elems;
			//let attributes = elem.getAttributes();
			//attrs.push({elem, attributes});
			//return attrs;
			return isElement(elem) ? elem.getAttributes() : "";
		} else {
			forEach(elems, elem => {
				if(isString(attrObj)){
					if(isElement(elem)){
						if(value === "undefined"){
							return elem.getAttribute(attrObj);
						} else {
							if(attrObj == "class") elem.className = value;else if (attrObj == "checked") elem.defaultChecked = value;else if (attrObj == "for") elem.htmlFor = value;else if (attrObj == "style") elem.style.cssText += value;else elem.setAttribute(attrObj, value);
						}
					} else if(isPlainObject(elem) && value !== "undefined"){
						elem[attrObj] = value;
						//return elem
					}
				} else if(isObject(attrObj)){
					if(isElement(elem) ){
						if(("class" in attrObj) && !("className" in  attrObj)) attrObj.className = attrObj.class;
						Object.assign(elem, attrObj);
					} else if( isPlainObject(elem)){
						elem = extend(elem, attrObj);
					}
					//return elem;
				} else if(attrObj === "undefined" && value === "undefined"){
					let attributes = elem.getAttributes();
					attrs.push({elem, attributes});
					//return attributes;
					return attrs;
				}
			});
		}
		return this;
	}
	const data = (node, attribute,value) => {
		if(this.chaining === true /* && arguments.length === 1 */){
			value = attribute;
			attribute = node;
		} else {
	        this.nodes = isElement(node) ? [node] : ((isString(node)||isArray(node)) ? $all(node) : "");
		}
		//node = this.nodes && this.nodes.length > 0 ? this.nodes : $all(node);
		node = isElement(node) ? [node] : isArray(node) ? node : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(node));
		
		var camelized = camelize(attribute);
		if(value !== undefined){
			try{
			forEach(node, function (elem){
				elem.dataset[camelized] = value;
			});
			} catch(e) {handleError(e.stack)}
			return this;
		} else {
			return value === null ? "" : (isArray(node) ? node[0].dataset[camelized] : node.dataset[camelized]);
		}
	}
	
	/**
	* Accepts a form input element and returns its value
	*/
	const val = (elem, str, minOrMax) => {
		"use strict";
		if(this.chaining === true /* && arguments.length === 1 */){
			minOrMax = str;
			str = elem;
		} else {
	        this.nodes = isElement(elem) ? [elem] : ((isString(elem)||isArray(elem)) ? $all(elem) : "");
			minOrMax = minOrMax||false;
		}
		//let elems = this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem), ret;
		let elems = isElement(elems) ? [elems] : isArray(elems) ? elems : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elems)), ret;
		forEach(elems, elem => {
			if(elem && isElement(elem)){
				if(str !== undefined && elem.value !== undefined) {
					elem.value = str;
					return this;
				}
				
				if(elem.nodeName.toUpperCase() == 'SELECT'){
					var options = elem.options,index = elem.selectedIndex,one = elem.type === 'select-one' || index < 0,values = one ? null : [],value,_value;
					for(var i = 0, len = options.length;i < len;i++) {
						if((options[ i ].selected || i === index) && !options[i].disabled){
							value = !options[i].value ? options[i].text : options[i].value;
							if(one) {
								return value;
							}
							_value = {i : value}
							values.push(_value);
						}
					}
					return minOrMax ? (minOrMax === "min" ? minOfArray(values) : minOrMax === "max" ? maxOfArray(values) : values[0] ) : values;
				} else {
					//ret = elem.value;
					//ret = isElement( elem ) ? ( elem.hasAttribute("value") ? elem.getAttribute("value") : elem.value ? elem.value : elem.text ? elem.text : elem.textContent ) : null;
					ret = elem.value ? elem.value : (elem.hasAttribute("value") ? elem.getAttribute("value") : (elem.innerText ? elem.innerText : elem.textContent));
				
					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace( /\r/g, "" ) :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
			}
		});
		return this;
	}
	const value = (elem, content) => {
		if(this.chaining === true /* && arguments.length === 1 */){
			content = elem;
		} else {
	        this.nodes = isElement(elem) ? [elem] : ((isString(elem)||isArray(elem)) ? $all(elem) : "");
		}
		//let elems = this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem), ret;
		let elems = isElement(elems) ? elems : isArray(elems) ? elems : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elems)), ret;
		//if (!node) return content ? this : void 0;
		forEach(elems, function(node){
			var tagName = node.tagName;
			if (content === void 0) {
				if (tagName === "SELECT") {
					ret =  ~node.selectedIndex ? node.options[node.selectedIndex] : node.options[0];
					//alert(ret.getAttribute("value"));
					//return isElement( ret ) && ret.hasAttribute("value") ? ret.getAttribute("value") : ret.value ? ret.value : ret.text;
				} else if (tagName === "OPTION") {
					ret = node.hasAttribute("value") ? node.value : node.text;
				} else if (tagName === "INPUT" || tagName === "TEXTAREA") {
					ret = node.value;
				} else {
					ret = node.textContent;
				}
			} else {
				switch (tagName) {
					case "INPUT":
					case "OPTION":
					case "TEXTAREA":
						if (typeof content === "function") {
							content = content(node.value);
						}
						node.value = content;
					break;
					case "SELECT":
						if (typeof content === "function") {
							content = content(node.value);
						}
						if (Array.prototype.every.call(node.options, function (o) {return !(o.selected = o.value === content);})) {
							node.selectedIndex = -1;
						}
					break;
					default:
						if (typeof content === "function") {
							content = content(node.textContent);
						}
						node.textContent = content;
				}
			}
		});
		
		return ret ? (isElement(ret) && ret.hasAttribute("value") ? ret.getAttribute("value") : (ret.value ? ret.value : ret.text)) : this;
	}
	const text = (elem, value) => {
		if(this.chaining === true /* && arguments.length === 1 */){
			value = elem;
			//[value] = arguments;
		} else {
	        this.nodes = isElement(elem) ? [elem] : ((isString(elem)||isArray(elem)) ? $all(elem) : "");
		}
		let elems = isElement(elem) ? [elem] : isArray(elem) ? elem : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(elem)), values = [];
		
		if(isArray(elems) || elems.length > 0){
			for(i=0;i<elems.length;i++){
				let el = elems[i];
				if(value){
					el.textContent = value;
				} else {
					values.push(el.textContent)
				}
			}
		}
		
		return values && values.length > 0 ? minOfArray(values) : this;
	}
	const html = function(el,value) {
		let elem,ret = "",append=false,sTargetId=null,sIndex=0;
		if(arguments.length >= 2){
			if(arguments.length === 2){
				if(isPlainObject(arguments[1])){
					value = ("value" in arguments[1]) ? arguments[1].value : "";
					if("targetId" in arguments[1]) sTargetId = arguments[1].targetId;
					if("elementIndex" in arguments[1]) sIndex = arguments[1].elementIndex;
					if("appendContent" in arguments[1]) append = arguments[1]. appendContent;
				} else value = arguments[1];
			} else {
				[value, sTargetId, sIndex, append] = arguments;
			}
		}
		
		if(this.chaining === true /* && arguments.length === 1 */){
			//value = el;
			[value, sTargetId, sIndex, append] = arguments;
		} else {
	        this.nodes = isElement(el) ? [el] : ((isString(el)||isArray(el)) ? $all(el) : "");
		}
		//elem = this.nodes && this.nodes.length > 0 ? this.nodes : $all(el);
		elem = isElement(el) ? [el] : isArray(el) ? el : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(el));
		//elem = isElement(el) ? el : (isString(el)||isArray(el)) ? $all(el) : "";
		// append = (typeof apd !== 'undefined') ? apd : false;
		
		//console.log(elem, value, sTargetId, sIndex, append)
		//console.log(...arguments);
		return html$1.apply(null, [elem, value, sTargetId, sIndex, append]);
		//return this;
	}
	const html$1 = function(el,value) {
		"use strict";
		let elem,ret = "",append=false,sTargetId=null,sIndex=0;
		if(arguments.length >= 2){
			if(arguments.length === 2){
				if(isPlainObject(arguments[1])){
					value = ("value" in arguments[1]) ? arguments[1].value : "";
					if("targetId" in arguments[1]) sTargetId = arguments[1].targetId;
					if("elementIndex" in arguments[1]) sIndex = arguments[1].elementIndex;
					if("appendContent" in arguments[1]) append = arguments[1]. appendContent;
				} else value = arguments[1];
			} else {
				[el, value, sTargetId, sIndex, append] = arguments;
			}
		}
		
		elem = isElement(el) ? [el] : isArray(el) ? el :  $all(el);
		//console.log(...arguments);
		//console.log(elem, value, sTargetId, sIndex, append)
		if(!value || value === "" || value === null || typeof value === 'undefined') {
			if(elem && elem.length && elem.length>0){
				if(sIndex && isElement(elem[sIndex])){
					ret = elem[sIndex].innerHTML;
				} else {
					for(let i = 0;i<elem.length;i++) {
						if(isElement(elem[i])){
							let el;
							if(elem[i].nodeName.toLowerCase() === "iframe") el = getIframeDocument(elem[i]).body;
							else el = elem[i];
							ret += el.innerHTML;
						}
					}
				}
				let content = append ? ret : isElement(elem[sIndex || 0]) ? elem[sIndex || 0].innerHTML : "";
				if(sTargetId){
					var target,fragment = document.createDocumentFragment(),
					tmp = document.createElement("div");
					tmp.innerHTML = content;
					fragment.appendChild(tmp);
					if(target = $all(sTargetId, fragment) ) {
						fragment = tmp = null;
						return target[0].innerHTML;
					} else {fragment = tmp = null;return content;}
				} else return content;
			} else return elem ? (elem.length&&elem.length>0&&isElement(elem[ sIndex || 0])?elem[ sIndex || 0 ].innerHTML : elem.innerHTML) : undefined;
		} else {
			//var _value = str2DOMElement(value);
			//var value = _typeof(_value) === 'object' ? _value : value;
			if(isArray(elem) && elem.length > 0){
				if(isString(value) === "string") value = value.replace(rxhtmlTag, "<$1></$2>");
				if(sIndex && isElement(elem[sIndex])){
					let el;
					if(elem[sIndex].nodeName.toLowerCase() === "iframe"){
						el = getIframeDocument(elem[sIndex]).body;
					} else el = elem[sIndex];
					if(isElement(el)){
						//if(_typeof(value) === 'object') el.appendChild(value);
						if(isElement(value)) el.appendChild(value);
						else append ? el.innerHTML += value : el.innerHTML = value;
					}
				} else {
					for (var i = 0; i < elem.length; i++) {
						if(isElement(elem[i])){
							let el;
							if(elem[i].nodeName.toLowerCase() === "iframe") {
								el = getIframeDocument(elem[i]).body;
							} else el = elem[i];
							if (el.nodeType === 1) {
								if(isElement(value)) el.appendChild(value);
								else append ? el.innerHTML += value : el.innerHTML = value;
							}
						}
					}
				}
			} else {
				if(isElement(elem)){
					if(elem.nodeName.toLowerCase() === "iframe") elem = getIframeDocument(elem).body;
					if (elem.nodeType === 1){
						if(isElement(value)) elem.appendChild(value);
						else append ? elem.innerHTML += value : elem.innerHTML = value;
					}
				}
			}
			elem = 0;
			value = '';
			//return this;
		}
		return this;
	}
	const outerHTML = (nodes, value, index) => {
		let ret;
		if(this.chaining === true /* && arguments.length === 1 */){
			//value = el;
			[value, index] = arguments;
		} else {
	        this.nodes = isElement(nodes) ? nodes : ((isString(nodes)||isArray(nodes)) ? $all(nodes) : "");
		}
		//nodes = this.nodes && this.nodes.length > 0 ? this.nodes : $all(nodes);
		nodes = isArray(nodes) || isElement(nodes) ? nodes : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(nodes));
		
		if(value === null || value === undefined || typeof value === 'undefined') {
			if(isArray(nodes) && nodes.length > 0/*  && isElement(nodes[0]) */){
				if(isNumber(index) && nodes[index] && isElement(nodes[index])/*  */){
					ret = nodes[0].outerHTML;
				} else {
					ret = [];
					//each(nodes, function (elem){
					forEach(nodes, function (elem){
						let val = elem.outerHTML;
						ret.push(val);
					});
					ret = ret.join("\n\n");
				}
			} else ret = isElement(nodes) ? nodes.outerHTML : "";
			return ret;
		} else {
			if(isArray(nodes)){
				//each(nodes, function (elem){
				forEach(nodes, function (elem){
					elem.outerHTML = value;
				});
			} else nodes.outerHTML = value;
		}
		return this;
	}
	const append = (parent, _newContent) => {
		let newContent;
		if(this.chaining === true){
			newContent = parent;
			parent = this.nodes;
		} else {
	        //this.nodes = isElement(parent) ? [parent] : ((isString(parent)||isArray(parent)) ? $one(parent) : "");
	        this.nodes = isElement(parent) ? parent : (isString(parent) ? $one(parent) : $all(parent));
			newContent = _newContent;
		}
		//parent = this.nodes && this.nodes.length > 0 ? this.nodes : $all(parent);
		//parent = isElement(parent) ? [parent] : isArray(parent) ? parent : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(parent));
		
		if(isArray(parent)){
			forEach(parent, (p)=> {
				if(isElement(p)){
					if(isString(newContent) && newContent.charAt(0) !== "<" && p.append){
						// Native (ES6-way): unified syntax
						p.append(newContent);
						//p.insertAdjacentHTML('beforeend', newContent);
					} else {
						// Native: different syntax
						if(isString(newContent))
							p.insertAdjacentHTML('beforeend', newContent);
						else 
							//p.appendChild(newContent);
							p.insertAdjacentElement('beforeend', newContent);
					}
				}
			})
		} else if(isElement(parent)){
			if(isString(newContent) && newContent.charAt(0) !== "<" && parent.append){
				// Native (ES6-way): unified syntax
				parent.append(newContent);
			} else {
				// Native: different syntax
				if(_typeof(newContent) === "string")
					parent.insertAdjacentHTML('beforeend', newContent);
				else 
					//parent.appendChild(newContent);
					parent.insertAdjacentElement('beforeend', newContent);
			}
		}
		return this;
	}
	const prepend = (parent, _newContent) => {
		let newContent;
		if(this.chaining === true){
			newContent = parent;
			parent = this.nodes;
			//newContent = arguments[0];
			//[newContent] = arguments;
		} else {
	        //this.nodes = isElement(parent) ? [parent] : ((isString(parent)||isArray(parent)) ? $one(parent) : "");
		    this.nodes = isElement(parent) ? parent : (isString(parent) ? $one(parent) : $all(parent));
			newContent = _newContent;
		}
		//parent = this.nodes && this.nodes.length > 0 ? this.nodes : $one(parent);
		//parent = isElement(parent) ? [parent] : isArray(parent) ? parent :(this.nodes && this.nodes.length > 0 ? this.nodes : $all(parent));
		
		if(isArray(parent)){
			forEach(parent, (p)=> {
				if(isElement(p)){
					if(isString(newContent) && newContent.charAt(0) !== "<" && p.prepend){
						// Native (ES6-way): unified syntax
						p.prepend(newContent);
					} else {
						// Native: different syntax
						if(isString(newContent))
							p.insertAdjacentHTML('afterbegin', newContent);
						else 
							p.insertBefore(newContent, p.firstChild);
					}
				}
			});
		} else if(isElement(parent)){
			if(isString(newContent) && newContent.charAt(0) !== "<" && parent.prepend){
				// Native (ES6-way): unified syntax
				parent.prepend(newContent);
			} else {
				// Native: different syntax
				if(isString(newContent))
					parent.insertAdjacentHTML('afterbegin', newContent);
				else 
					parent.insertBefore(newContent, parent.firstChild);
			}
		}
		return this;
	}
	/* 
	 * For internal use
	*/
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
				node = _typeof(name) === "object" && isElement(name) ? name : document.createElement(name);
			}
			
			//if(attributes && isPlainObject(attributes)){
			if(attributes && isObject(attributes)){
				// Object.assign(node, attributes);
				for(prop in attributes) {
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
								_typeof(styles) === "object" ? Object.assign(node.style, styles) : node.style.cssText += styles;
							}
							else if (prop === "dataset" && _typeof(attributes[prop]) === "object") {
								let props = attributes[prop], newObj = {};
								for(x in props) {
									let camelizedName = camelize(x);
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
					//if (typeof child == "string") child = document.createTextNode(child);
					/* if (typeof child == "string") {
						child = document.createTextNode(child);
						frag = document.createDocumentFragment();
						frag.appendChild(child);
						child = frag;
						frag = null;
					} */
					node.appendChild(child);
				}
			}
			
		} catch(e){
			handleError(e.stack?e.stack:e);
		}
		
		return node;
	}
	
	const tag = function(tagName, attributes){
		//const node = tag$1(tagName, attributes);
		const node = tag$1.apply(null, [...arguments]);
		//console.log(node, this.nodes, this.chaining)
		if(this.chaining === true){
			this.append(node);
			return this;
		} else 
			return node;
	}
	const setNodeAttribute = function(node, attributes, value){
		if(this.chaining === true){
			value = arguments.length === 2 ? attributes : value;// value = attributes
			attributes = arguments.length === 1 ? node : attributes;// attributes = node
		}
		if(isString(node) || isElement(node) || isArray(node)) {
			this.nodes = isElement(node) ? [node] : $all(node);
		}
		nodes = isElement(node) ? [node] : isArray(node) ? node : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(node));
		
		forEach(nodes, node => {
			//if(attributes && isPlainObject(attributes)){
			if(attributes && isObject(attributes)){
				// Object.assign(node, attributes);
				for(prop in attributes) {
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
								_typeof(styles) === "object" ? Object.assign(node.style, styles) : node.style.cssText += styles;
							}
							else if (prop === "dataset" && _typeof(attributes[prop]) === "object") {
								let props = attributes[prop], newObj = {};
								for(x in props) {
									let camelizedName = camelize(x);
									node.dataset[camelizedName] = props[x];
									//Object.assign(node.dataset, newObj);
								}
							}
							//else node.setAttribute(attribute, value)
						}
					}
				}
			} else if(isArray(attributes)){
				forEach(attributes, (attr) => {
					setNodeAttribute(node, attr, value);
				})
			} else if(isString(attributes) && value){
				node[attributes] = value;
			}
		});
		
		return this.chaining === true ? this : nodes;
	}
	/* styleElement(elem, styles){
		var _this = this;
		elem = elem || this.nodes;
		if(elem && (isPlainObject(styles) || isString(styles)) ) {
			if(isArrayLike(elem) || isArray(elem)) {
				_pbd.each(elem, function (i){
					if( isElement(elem[i]) ){
						 _typeof(styles) === "object" ? Object.assign(elem[i].style, styles) : elem[i].style.cssText += styles;
					}
				});
			} else {
				if( isElement(elem) ) _typeof(styles) === "object" ? Object.assign(elem.style, styles) : elem.style.cssText += styles;
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
	},
	setNodeAttribute : function(node, attribute, value) {if (attribute == "class") node.className = value;else if (attribute == "checked") node.defaultChecked = value;else if (attribute == "for") node.htmlFor = value;else if (attribute == "style") node.style.cssText = value;else node.setAttribute(attribute, value);return this;},
	*/
	const contains = (el,child) => {return el !== child && el.contains(child);};
	//const contains = (a, b) => {if(b){while((b = b.parentNode)){if(b === a){return true;}}}return false;};
	//const empty = (el) => {if(isElement(el)){while(el.firstChild) el.removeChild(el.firstChild);}return this;}
	const empty = (nodes) =>{
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
	const animate = (el, params = {}, speed) =>{
		var _elem, _this = this;
		if(this.chaining === true /* && arguments.length === 1 */){
			//value = el;
			//[value, index] = arguments;
			speed = params;
			params = el;
		} else {
	        this.nodes = isElement(el) ? [el] : ((isString(el)||isArray(el)) ? $all(el) : "");
		}
		//el = this.nodes && this.nodes.length > 0 ? this.nodes : $all(el);
		el = isElement(el) ? [el] : isArray(el) ? el : (this.nodes && this.nodes.length > 0 ? this.nodes : $all(el));
		
		if(isArray(params)){
			/* for(var i = 0, l = this.nodes.length;i<l;i++){
				_elem = animation.keyframes(this.nodes[ i ], params, isPlainObject(speed) ? speed : {});
				this.nodes[ i ] = this[ i ] = _elem;
				//el.animate(params, isPlainObject(speed) ? speed : {});
			} */
		} else {
			//each(function (elem){
			forEach(el, function (elem){
				elem.style.transition = 'all ' + ( speed ?? 400 );
				if(_typeof(params) === "string") elem.style.cssText += params;
				else Object.keys(params).forEach((key) => {elem.style[key] = params[key];});
			});
		}
		return this;
	}
	const animation = {
		expanded : false,
		in_animation : false,
		animConfig : {
			debugMode : false,
			speeds : {
				off: false,
				slow: 1600,
				fast: 1000,
				_default: 600// Default speed
			}
		},
		setOpacity(id, opacity){
			var element = $one(id);//var element = __pbd_self.isObject(id) ? id.style : $$(id).style;
			//__pbd_self.appStyle.styleElement(element,{ opacity:(opacity / 100),MozOpacity:(opacity / 100),filter:'alpha(opacity=' + opacity + ')',KhtmlOpacity:(opacity / 100),visibility:"visible",transition:"all ease-in 600ms"});
			css(element, { opacity:(opacity / 100),MozOpacity:(opacity / 100),filter:'alpha(opacity=' + opacity + ')',KhtmlOpacity:(opacity / 100),visibility:"visible",transition:"all linear 600ms"});
			return this;
		},
		fadeOpacity(id, opacityStart, opacityEnd, msToFade){
			let _this = this;
			if(msToFade > 0){
				let frames = Math.round((msToFade / 1000) * 30), msPerFrame = Math.round(msToFade / frames), 
				opacityPerFrame = (opacityEnd - opacityStart) / frames, opacity = opacityStart;
				for (frame = 1; frame <= frames; frame++){
					setTimeout(function(){_this.setOpacity(id, opacity)},(frame * msPerFrame));
					opacity += opacityPerFrame;
				}
				if (opacityEnd == 0){
					// setTimeout(function(){__pbd_self.$$(id).style.visibility='hidden';},((frames+1) * msPerFrame));
					setTimeout(function(){$one(id).style.visibility = 'hidden';},((frames+1) * msPerFrame));
				} else {
					setTimeout(function(){_this.setOpacity(id,opacityEnd)},((frames+1) * msPerFrame));
				}
			} else {
				this.setOpacity(id, opacityEnd);
				if (opacityEnd == 0){
					$one(id).style.visibility = 'visible';
					//__pbd_self.$$(id).css('visibility','hidden');
				}
			}
			return this;
		},
		animate(params = {}, speed){
			var _elem, _this = this;
			if(isArray(params)){
				for(var i = 0, l = this.nodes.length;i<l;i++){
					_elem = this.animation.keyframes(this.nodes[ i ], params, isPlainObject(speed) ? speed : {});
					this.nodes[ i ] = this[ i ] = _elem;
					//elem.animate(params, isPlainObject(speed) ? speed : {});
				}
			} else {
				this.each(function (elem){
					elem.style.transition = 'all ' + ( speed || _this.animation.animConfig.speeds._default );
					if(_typeof(params) === "string") elem.style.cssText += params;
					else Object.keys(params).forEach((key) => {elem.style[key] = params[key];});
				});
			}
			return this;
		},
		animate2({timing, draw, duration}) {
			let start = performance.now();
			requestAnimationFrame(function animate(time) {
				// timeFraction goes from 0 to 1
				let timeFraction = (time - start) / duration;
				if (timeFraction > 1) timeFraction = 1;
				// calculate the current animation state
				let progress = timing(timeFraction);
				draw(progress); // draw it
				if (timeFraction < 1) {
					requestAnimationFrame(animate);
				}
			});
		},
		kadabra(zap,reverse,axis,duration,margin) {
			if(reverse == null) var reverse = false;
			if(axis == '' || axis == null) var axis = 'y';
			if(duration == '' || duration == null) var duration = '1800ms';
			if(margin == '' || margin == null) var margin = 'auto';
			var brColor = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6);
			if (document.getElementById) {
				var abra = isElement(zap) ? zap.style : $one(zap).style;
				if(axis == 'y'){
					if(reverse==true){
						if (abra.display == 'block') {this.fadeOpacity(zap,100,0,1900);abra.display = 'none';}
						else {this.fadeOpacity(zap,0,100,900);abra.display = 'block';}
					} else {
						if (abra.display == 'none') {this.fadeOpacity(zap,0,100,900);abra.display = 'block';}
						else {this.fadeOpacity(zap,100,0,1900);abra.display = 'none';}
					}
				} else {
					abra.zIndex = 1;
					if(expanded ==true){
						//abra.marginLeft = '0';
						abra.position = 'relative';
						if(reverse==true) abra.right = '0';
						else abra.left = '0';
						abra.borderColor = brColor;
						abra.transition = 'all '+duration+' linear';
						expanded = false;
					} else {
						//abra.marginLeft = '-500px';
						abra.position = 'fixed';
						//abra.left = '-'+margin;
						if(reverse==true) abra.right = '-'+abra.width;
						else abra.left = '-'+abra.width;
						abra.borderColor = brColor;
						abra.transition = 'all '+duration+' linear';
						expanded = true;
					}
				}
				return true;
			} 
			return false;
		},
		kadabra2(zap,opts) {
			var opt = extend({type : 'display',reverse : false,axis : 'y',duration : '1800ms',margin : 'auto',_from : '200px',_to : '100%'},opts);
			if(opt.type == 'display'){
				return this.showHide(zap,opt.reverse);
			} else if(opt.type == 'slide' || opt.type == 2){
				return this.toggleSlide(zap,opt.axis,opt.reverse,opt._from,opt._to,opt.duration);
			} else {
				console.error(`Error: The animation type selected : ${opt.type}, is not valid`);
				return this;
			}
		},
		showHide(zap,t1,t2) {
			var abra = isElement(zap) ? zap : $one(zap),
			_fade_in_time = t1 && isNumber(t1) ? t1 : 900,
			_fade_out_time = t2 && isNumber(t2) ? t2 : 900;
			if(abra = abra.style){
				if(!abra.display || abra.display === '' || abra.display === 'block'){this.fadeOpacity(zap,100,0,_fade_out_time);setTimeout(()=> {abra.display = 'none';},_fade_in_time);}
				else if(abra.display == 'none'){this.fadeOpacity(zap,0,100,_fade_in_time);setTimeout(()=> {abra.display = 'block';},_fade_in_time);}
			}
			return;
		},
		showHide(zap,reverse) {
			var abra = isElement(zap) ? zap.style : $one(zap).style;
			if(reverse === true){
				if(!abra.display || abra.display === '' || abra.display === 'block') {this.fadeOpacity(zap,100,0,1900);abra.display = 'none';}
				else if(abra.display === 'none') {this.fadeOpacity(zap,0,100,900);abra.display = 'block';}
				//return true;
			} else {
				if (!abra.display || abra.display === '' || abra.display === 'none') {this.fadeOpacity(zap,0,100,900);abra.display = 'block';}
				else if (abra.display === 'block') {this.fadeOpacity(zap,100,0,1900);abra.display = 'none';}
				//return true;
			}
			//return false;
			return this;
		},
		toggleSlide(zap,axis,reverse,_from,_to,duration) {
			var _this = this,t;
			var abra = isElement(zap) ? zap.style : $one(zap).style;
			var brColor = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6);
			//abra.zIndex = 1;//abra.height = _from;
			//expanded = this.expanded || false;
			if(t) clearInterval(t);
			if(axis == 'y'){
				_d = (Number(formatToMS(duration))+750);
				this.fadeOpacity(zap,0,100,duration);
				abra.transition = 'height linear '+duration+'';
					abra.minHeight = 'auto';
				if (!this.expanded) {
					abra.height = _to;
					/* if(_to === '0' && _from !== '0') this.fadeOpacity(zap,100,0,duration);
					else this.fadeOpacity(zap,0,100,duration); */
					if(_to === '0' && _from !== '0') {
						t = setInterval(function(){_this.in_animation = true;},_d);
						//alert(t);
						if(_this.in_animation) {abra.display = 'none';clearInterval(t);_this.in_animation = false;}
					} else abra.display = 'block';
					this.expanded = true;
					//alert('expanded to:'+_to);
				} else {
					abra.height = _from;
					/* if(_from === '0' && _to !== '0') this.fadeOpacity(zap,0,100,duration);
					else this.fadeOpacity(zap,100,0,duration); */
					if(_from === '0' && _to !== '0'){
						t = setInterval(function(){_this.in_animation = true;},_d);
						
						if(_this.in_animation) {abra.display = 'none';clearInterval(t);_this.in_animation = false;}
					} else abra.display = 'block';
					this.expanded = false;
					//alert('from:'+_from);
				}
			} else {
				abra.borderColor = brColor;
				abra.transition = 'all '+duration+' linear';
				if(!this.expanded){
					//abra.marginLeft = '0';
					abra.position = 'relative';
					if(reverse==true) abra.right = '0';
					else abra.left = '0';
					this.expanded = false;
				} else {
					//abra.marginLeft = '-500px';
					abra.position = 'fixed';
					//abra.left = '-'+margin;
					if(reverse==true) abra.right = '-'+abra.width;
					else abra.left = '-'+abra.width;
					this.expanded = true;
				}
			}
			
			return this;
		}
	}
	
	const dimensions = (elem) => {
		let _height = 0, _width = 0;
		if(typeof elem === "object" && elem.nodeType === 1){
			_height = elem.offsetHeight || 0;
			_width = elem.offsetWidth || 0;
		}
		return {height : _height, width : _width};
	}
	const offsets = (node) => {
		var result = { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 , padding: 0, margin: 0, border: 0};
		if (node && isElement(node)){
			var docEl = (node.ownerDocument || node).documentElement;
			var clientTop = docEl.clientTop, clientLeft = docEl.clientLeft;
			var scrollTop = window.pageYOffset || docEl.scrollTop, scrollLeft = window.pageXOffset || docEl.scrollLeft;
			var boundingRect = node.getBoundingClientRect(), style = elementStyle(node);
			result.top = boundingRect.top + scrollTop - clientTop;
			result.left = boundingRect.left + scrollLeft - clientLeft;
			result.right = boundingRect.right + scrollLeft - clientLeft;
			result.bottom = boundingRect.bottom + scrollTop - clientTop;
			result.width = boundingRect.right - boundingRect.left;
			result.height = boundingRect.bottom - boundingRect.top;
			
			paddingTop = Number((style.paddingTop === "" || style.paddingTop === "auto" ) ? 0 : style.paddingTop.replace("px",""));
			paddingRight = Number((style.paddingRight === "" || style.paddingRight === "auto" ) ? 0 : style.paddingRight.replace("px",""));
			paddingBottom = Number((style.paddingBottom === "" || style.paddingBottom === "auto" ) ? 0 : style.paddingBottom.replace("px",""));
			paddingLeft = Number((style.paddingLeft === "" || style.paddingLeft === "auto" ) ? 0 : style.paddingLeft.replace("px",""));
			result.padding = {top:paddingTop,right:paddingRight,bottom:paddingBottom,left:paddingRight};
			
			marginTop = Number((style.marginTop === "" || style.marginTop === "auto" ) ? 0 : style.marginTop.replace("px",""));
			marginRight = Number((style.marginRight === "" || style.marginRight === "auto" ) ? 0 : style.marginRight.replace("px",""));
			marginBottom = Number((style.marginBottom === "" || style.marginBottom === "auto" ) ? 0 : style.marginBottom.replace("px",""));
			marginLeft = Number((style.marginLeft === "" || style.marginLeft === "auto" ) ? 0 : style.marginLeft.replace("px",""));
			result.margin = {top:marginTop,right:marginRight,bottom:marginBottom,left:marginRight};
			
			borderTop = Number((style.borderTopWidth === "" || style.borderTopWidth === "auto" ) ? 0 : style.borderTopWidth.replace("px",""));
			borderRight = Number((style.borderRightWidth === "" || style.borderRightWidth === "auto" ) ? 0 : style.borderRightWidth.replace("px",""));
			borderBottom = Number((style.borderBottomWidth === "" || style.borderBottomWidth === "auto" ) ? 0 : style.borderBottomWidth.replace("px",""));
			borderLeft = Number((style.borderLeftWidth === "" || style.borderLeftWidth === "auto" ) ? 0 : style.borderLeftWidth.replace("px",""));
			result.border = {top:borderTop,right:borderRight,bottom:borderBottom,left:borderRight};
		}
	    return result;
	}
	/*
	 * Capitalize the first character in each word, excluding some articles and prepositions.
	 */
	const headline = (str) =>{
		var exclude = "a,an,the,for,to,of,on,as,in,and,from".split(",");
		return str.replace(/\b\w+/g, function (s, i) {
			if (exclude.indexOf(s) > -1 && i > 0) {
				return s;
			}
			return s.charAt(0).toUpperCase() + s.slice(1);
		});
	}
	const base_url = () => {var full_url_string = document.location.toString();var splint = full_url_string.split('.');var expr = /^(.*)\/[^\/]+\/?$/g;return (expr.test(splint[0]) ? splint[0].replace(expr, "$1") : splint[0]) + '/';}
	const fileext = (filename,toLower) => {if(typeof(toLower) == 'undefined') toLower = true;if(/^.*\.[^\.]*$/.test(filename)){var splint = filename.split('?');var ext = splint[0].replace(/^.*\.([^\.]*)$/, "$1");return toLower ? ext.toLowerCase(ext) : ext;} else return "";};
	const filename = ( path, with_ext ) => {"use strict";if(isEmpty(path) || !isString(path)){return ""}if(with_ext == '' || with_ext == null) {with_ext = true;}return with_ext ? path.replace( rPath, '' ) : path.replace( rPath, '' ).split('.')[0];};
	// const filename = (filename,with_ext) => {if( filename.length == 0 ) return "";if(with_ext == '' || with_ext == null) var with_ext = false;var dot = filename.lastIndexOf(".");if( dot == -1 ) return filename;/* var splint = filename.split('.'); */var splint = filename.split('?');var splint2 = splint[0].split('.');var pieces = splint2[0].split("/");var ext = splint2[1];for (var i = 0; i < pieces.length; i++) nameOnly = pieces[i];if(with_ext) return nameOnly.replace('.','') + '.' + ext;else return nameOnly;};
	//function basename(path){let rPath = /.*(\/|\\)/;return path.replace( rPath, '' );}
	//const basename = (path) => {var expr = /^.*\/([^\/]+)\/?$/g;return expr.test(path) ? path.replace(expr, "$1") : path;}
	//const dirname = (path) => {var expr = /^(.*)\/[^\/]+\/?$/g;return expr.test(path) ? path.replace(expr, "$1") : '';}
	//const dirname = ( path ) => {let pieces = path.split('/');return isArray(pieces) ? pieces[pieces.length-1] : path;}

	const formatTime = (time, hours) => {if(hours){var h = Math.floor(time / 3600);time = time - h * 3600;var m = Math.floor(time / 60);var s = Math.floor(time % 60);return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);} else {var m = Math.floor(time / 60);var s = Math.floor(time % 60);return m.lead0(2) + ":" + s.lead0(2);}}
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
	const dedupe = (arr) => {return arr.filter(function (item, index) {return arr.indexOf(item) === index;});}
	const dedupe2 = (arr) => {return [...new Set(arr)];}
	const shuffle = function(arr){
		// Shuffle slide order if needed		
		if (isArray(arr)){
			for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);	// Fisher-Yates shuffle algorithm (jsfromhell.com/array/shuffle)
			return arr
		}
	
		return this;
	}
	const sorter = (arr, by, ascdsc="asc") => {
		if(!isArray(arr) || (by && !isString(by)) ) return -1;
		//let _strip = (str) => isString(str) ? str.replace(/^(a |an |the )/gi, '').trim() : str;
		let _strip = (str) => {str = isString(str) ? str : String(str); return str.replace(/^(a |an |the )/gi, '').trim()}
		ascdsc= isString(ascdsc) ? ascdsc : "asc";
		let sortedArr = arr.sort((a, b) => ascdsc && ascdsc !== "dsc" && ascdsc !== "desc" ? (_strip(a[by]||a) < _strip(b[by]||b) ? -1 : 1) : _strip(a[by]||a) > _strip(b[by]||b) ? -1 : 1);
		return sortedArr;
	};
	
	const isInViewport = (element, parent) => {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= ((parent || window).innerHeight || (parent || document.documentElement).clientHeight) &&
			rect.right <= ((parent || window).innerWidth || (parent || document.documentElement).clientWidth)
		);
	}
	const loadThis = (id, what, val) => {
		var target = ( isElement(id) || isPlainObject(id) ) ? id : isString(id) ? $one(id) : null;
		what = what || "image";
		if(target){
			if(isPlainObject(target)) {
				target[what] = val;
			} else if(isArray(target)) {
				each(target,(i)=>{
					if(isElement(target[i])){
						if(what === "image" || what === "video" || what === "audio" || what === "iframe"){
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
	const scrollIndicator = (eleId, indicator) => {
		var el = isElement(eleId) ? eleId : getBy("query", eleId),
		ind_el = isElement(indicator) ? indicator : getBy("query", indicator),
		total = 0;
		ind_el.style.minHeight = "5px";
		el.addEventListener("scroll", () => {
			var customScrollTop = el.scrollTop, customScrollHeight = el.scrollHeight, customHeight = el.getBoundingClientRect().height, 
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
	
	const toggleNav = (navId, cfgObj) => {
		let _transformActive, _transformInactive, theNav = isElement(navId) ? navId : getBy(navId),
		orientation = cfgObj && ("orientation" in cfgObj) ? cfgObj.orientation : "right",
		distance = cfgObj && ("distance" in cfgObj) ? cfgObj.distance : "150px";
		if(isElement(theNav)){
			if(orientation === "left") {_transformInactive = `translate3d(-${distance}, 0, 0)`;_transformActive = "translate3d(0px, 0, 0)";}
			if(orientation === "right") {_transformInactive = `translate3d(${distance}, 0, 0)`;_transformActive = "translate3d(0px, 0, 0)";}
			if(orientation === "top") {_transformInactive = `translate3d(0, -${distance}, 0)`;_transformActive = "translate3d(0, 0px, 0)";}
			if(orientation === "bottom") {_transformInactive = `translate3d(0, ${distance}, 0)`;_transformActive = "translate3d(0, 0px, 0)";}
			theNav.style.transition = "all linear 1s";
			if(theNav.classList.contains("active")){
				theNav.classList.remove("active");
				theNav.style.transform = _transformInactive;
			} else {
				theNav.classList.add("active");
				theNav.style.transform = _transformActive;
			}
		}
		return this;
	}
// output data
	const Output = (outElem,out,add) => {
		add = add || true;
		
		if(isString(outElem)){
			var outElem = $(outElem);
		}
		
		if(isElement(outElem)){
			var prev_out = ("value" in outElem) ? outElem.value : outElem.innerHTML;
			if(add) out = out + prev_out;
			outElem.innerHTML = out;
		} else if(isObject(outElem) &&  ("jquery" in outElem) ) {
			var prev_out = outElem.html();
			if(add) out = out + prev_out;
			outElem.html(out);
		}
		
		return false;
	}
	const getBody = (content) => {var x = content.indexOf("<body");if(x == -1) return "";x = content.indexOf(">", x);if(x == -1) return "";var y = content.lastIndexOf("</body>");if(y == -1) return "";return content.slice(x + 1, y);}
	const getIframeDocument = (frameId) => {
		//const x = $one || $all(frameId)[0];
		const x = $one(frameId);
		const y = x.contentWindow || x.contentDocument;
		const z = y.document ? y.document : y;
		//alert(z.body.innerHTML);
		return z;
	}
	const handleError = (msg, target, show=false) => {
		if(msg.hasOwnProperty("stack")) msg = msg.stack;
		if(show) {
			if(target && isElement(target || ( target = getBy("query", target) ))) target.innerHTML = msg;
			alert(msg);
		}
	}
	const downloadText = (text, filename, mime) => {
		if(text && isString(text)){
			mime = mime || "text/plain";
			filename = filename || "download";
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	
			var element = document.createElement('a');
			element.setAttribute('href', 'data:'+mime+';charset=utf-8,' + encodeURIComponent(text));
			element.setAttribute('download', filename);
			element.style.display = 'none';
			document.body.appendChild(element);
			element.dispatchEvent(evt);
			setTimeout(function() {
				// element.click();
				document.body.removeChild(element);
			}, 66);
			return true;
		}
		return false;
	}
	const downloadImage = (data, filename = 'untitled.jpeg') => {
		var a = document.createElement('a');
		a.href = data;
		a.download = filename;
		document.body.appendChild(a);
		setTimeout(function() {
			a.click();
			document.body.removeChild(a);
		}, 66);
	}
	const urlVars = (url) => {
		let vars = [], hash;
		url = url || window.location.href;
		// --
		if(url.indexOf('?') === -1 && /#/.test(url)){
			var hashes = url.split("#")[1].split("/").filter(h => h !== "");
			//vars = [hashes];
			for (var i = 0; i < hashes.length; i++) {
				hash = hashes[i];
				vars.push(i);
				vars[i] = hash;
			}
		} else {
			var hashes = url.slice(url.indexOf('?') + 1).split('&');
			for (var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
		}
		
		return vars;
	}
	const readAsImage = function(readerObj){
		var fr, reader, inc = 0, output = [];
		if(arguments.length === 2){
			var event = arguments[0] || window.event,pre_process = arguments[1], target_id = null, info_id = null;
		} else if(arguments.length > 2){
			var event = arguments[0] || window.event, target_id = arguments[1] || null, info_id = arguments[2] || null, pre_process = arguments[3] || null;
		} else {
			var event = readerObj.event || window.event, target_id = readerObj.target_id || null, info_id = readerObj.info_id || null, pre_process = readerObj.pre_process || null;
		}
		var targetElem = isElement(target_id) ? target_id : isString(target_id) ? $one(target_id) : null, 
		infoElem = isElement(info_id) ? info_id : isString(info_id) ? $one(info_id) : null;

		function abortRead(fr) {fr.abort();}
		function errorHandler(evt) {
			switch(evt.target.error.code) {
				case evt.target.error.NOT_FOUND_ERR:alert('File Not Found!');break;
				case evt.target.error.NOT_READABLE_ERR:alert('File is not readable');break;
				case evt.target.error.ABORT_ERR:break;
				default:alert('An error occurred reading this file.');
			};
		}

		function load_image(_blob, _targetElem, _infoElem, _pre_process) {
			fr = new FileReader();
			fr.onerror = errorHandler;
			fr.onabort = function(e) {abortRead(fr);alert('File read cancelled');};
			fr.onloadend = (function(theFile) {
				return function(e) {
					try{
						if(isFunction(_pre_process) ){
							_pre_process.call(null,e.target.result, _blob, _targetElem, _infoElem);
						} else if(isElement(_targetElem)){
							if(isString(_pre_process) && _pre_process === "raw"){
								if(("src" in _targetElem) || _targetElem.src) _targetElem.src = e.target.result;
								else _targetElem.innerHTML += e.target.result;
							}
						}
					} catch(e){alert(e.stack?e.stack:e)}
				};
			})(_blob);
			fr.readAsDataURL(_blob);
			return this;
		}

		if(event){
			var maxFileSize = 2 * 1024 * 1024;
			if(event && event.target && event.target.files && event.target.files.length > 0){
				for(i=0;i<event.target.files.length;i++){
				//inc++;
				var file = event.target.files[i];
					if (file.size >= maxFileSize) {
						alert("File size must be at most 2MB");
						return;
					}
					load_image(file, targetElem, infoElem,  pre_process)
				}
			} else {
				load_image(event, targetElem, infoElem,  pre_process);
				//targetElem.innerHTML = "<p>No files selected!</p>";
			}
			return this;
		}
	};
	
	// --------------------------------------------------------------------------
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
	
	const traverseFiles = (files, cfg={}, _readAs='text') => {
		if(!window.File || !window.FileReader || !window.FileList || !window.Blob){
			handleError("The File APIs are not fully supported by this browser",null,true);
			return false;
		}
		
		//if(files && !isArray(files)){files = [files];}
		const $this = this, $validExts = {
			text   : ["js","jsx","json","jsp","md","php","rem","ts","tsx"],
			script : ["c","h","js","jsx","jsp","php","pl","ts","tsx"],
			image  : ["jpg","jpeg","png","gif","jfif","avif"],
			audio  : ["mp3","ogg","aac","m4a","webma"],
			video  : ["mp4","ogv","avi","m4v","mkv","webm"]
		},
		$accept = {
			audio  : ["audio/aac", "audio/mp3", "audio/mpeg", "audio/ogg", "audio/oga", "audio/m4a"],
			video  : ["video/mp4", "video/mpeg", "video/webm", "video/ogv", "video/m4v"],
			text   : ["text/plain", "text/html", "text/css", "text/javascript", "text/php", "text/python", "text/json", "text/xml"],
			image  : ["image/svg+xml","image/png", "image/jpeg", "image/gif", "image/webp", "image/jfif", "image/avif", "image/svg+xml"],
			script : ["application/x-javascript", "application/json", "application/x-php", "application/x-python", "application/xml"],
			other  : ["image/svg+xml"]
		}, 
		$r_imFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

		let fileURL, infoBoxId= "", html = "", info = "", finalContent = "",
		onlyContent = false, append = false, useFileReader = false, readAs = _readAs || false, maxNum = 5,
		//infoBoxId, append, useFileReader,
		URL = window.URL || window.webkitURL,
		l=files.length;
		
		if(l<1||l===0){
			handleError("No file selected");
		}
		
		if(isPlainObject(cfg)){
			onlyContent = ("onlyContent" in cfg) ? cfg.onlyContent : false;
			append = ("append" in cfg) ? cfg.append : false;
			useFileReader = ("useFileReader" in cfg) ? cfg.useFileReader : false;
			readAs = ("readAs" in cfg) ? cfg.readAs : false;
			maxNum = (("maxNum" in cfg)||("max" in cfg)) ? cfg.maxNum??cfg.max : 5;
			infoBoxId = ("infoElem" in cfg) ? cfg.infoElem : null;
			selector = ("selector" in cfg) ? cfg.selector : '';
		} else if(!isFunction(cfg)){
			selector = isElement(cfg) ? cfg : ((isObject(cfg) && ("jquery" in cfg)) ? cfg[0] : $one(cfg));
		}
		
		//console.log(files,'<br>', selector,cfg[0]);
		let $completed = false;
		let $results = [];
		for(var i=0; i<l; i++) {
			let file = files[i], //file = files.item(i);
			ext = fileext(file.name),
			language = ext == 'js' ? 'javascript' : ext,
			filetype = file.type;
			if(filetype === "" || filetype === undefined){
				filetype = ($_mimeTypes[ext]) ? $_mimeTypes[ext] : "application/octet-stream";
			}
			
			if(isFunction(cfg)){
				if((readAs && readAs === "image") || $accept.image.indexOf(file.type) > -1 || inArray(ext,$validExts["image"]) ||  /\.(jpe?g|png|gif)$/i.test(file.name) || $r_imFilter.test(file.type) ) {
					as = 'DataURL';
				} else if((readAs && readAs === "text") || $accept.text.indexOf(file.type) > -1 || inArray(ext,$validExts["text"]) || $accept.script.indexOf(file.type) > -1 || inArray(ext,$validExts["script"])) {
					as = 'Text';
				} else as = 'ArrayBuffer';
				
				//if(useFileReader){
					var reader = new FileReader();
					reader.onload = function(e){
						$results.push(this.result);
						cfg.call(null, this.result, file);
					}
					reader['readAs' + as](file);
				/* 
				} else {
					var blob = new Blob([file], {type: file.type}), // create a blob of buffer
					// fileURL = URL.createObjectURL(file[0]);
					fileURL = URL.createObjectURL(blob); // create o-URL of blob
					if(filetype.indexOf("image") == 0){
						var img_height,img_width;
						fileObject = new Image();
					} else if(filetype.indexOf("video") == 0){
						fileObject = document.createElement("video");
					}
					fileObject.src = fileURL;
					fileObject.addEventListener("load", function() {
						//img_width = this.naturalWidth;img_height = this.naturalHeight;
						URL.revokeObjectURL(fileURL); // clean up
					});
					cfg.call(null, fileURL, file);
				}
				file = null;
				//return true;
				//return {then}; */
			} else {
				selector = $one(selector);
				if(!selector) {
					handleError("Error: a valid element was not selected!",null,true);
					return false;
				}
				/* else if (!URL) {
					handleError('Your browser does not support object URL! Your browser is not <a href="http://caniuse.com/bloburls">supported</a>!',null,true);
					return false;
				} */ else if(isObject(files) && files.length > maxNum){
					handleError("Error:Files exceed the drop/select amount.\nA total of '"+l+"' files were selected/dropped, but the allowed total is '5'",null,true);
					return false;
				}
				
				let elem = selector && typeof selector === "string" ? $one(selector) : selector;
				let close_btn = `<span class="box-button box-close-button akd__btn btn--warning is-active mr--8" title="show/collapse this box" onclick="let target = this.parentElement.closest('.box');if(target){target.classList.toggle('collapsed-box');if(target.classList.contains('collapsed-box')){this.querySelector('i.fa').classList.replace('fa-minus','fa-plus');} else {this.querySelector('i.fa').classList.replace('fa-plus','fa-minus');}this.classList.toggle('is-active');}"><i class="fa fa-minus"></i></span>`;
				let remove_btn = `<span class="box-button box-remove-button akd__btn btn--danger" title="remove this box" onclick="let target = this.parentElement.closest('.box');if(target){target.parentElement.removeChild(target);}"><i class="fa fa-times"></i></span>`;
				let sidebar_btn = `<span class="box-button box-sidebar-toggle-button akd__btn btn--info" title="toggle this box sidebar" onclick="let target = this.parentElement.closest('.box');if(target){target.querySelector('.box-sidebar').classList.toggle('toggled');this.classList.toggle('is-active');}"><i class="fa fa-exchange-alt"></i></span>`;
				
				html += `<ul class="akd__list-group grid-s-10 ml--auto mr--auto text--left">
					<li class="akd__list-group-item"><i class="fa fa-info-circle"></i>&nbsp;File information&nbsp;&raquo;&nbsp;</li>
					<li class="akd__list-group-item"><span class="file-name">name: <strong>${file.name}</strong></span></li>
					<li class="akd__list-group-item"><span class="file-type">type: <strong>${filetype}</strong></span></li>
					<li class="akd__list-group-item"><span class="file-size">size: <strong>${niceBytes(file.size)}</strong></span></li>
					<li class="akd__list-group-item"><span class="file-moddate">lastModified: <strong>${(file.lastModified? new Date(file.lastModified):'n/a')}</strong></span></li>
				</ul>`;
				// display a video
				if (filetype.indexOf("video") == 0) {
					if(useFileReader){
						var reader = new FileReader();
						reader.onload = function(e) {
							$results.push(e.target.result);
							videoObject = document.createElement("video");
							videoObject.src = e.target.result;
							videoObject.onload = function(ev) {
								vid_width = videoObject.width;
								vid_height = videoObject.height;
							};
							if(selector && typeof selector === "string"){
								elem = $(selector);
							} else if(selector && typeof selector === "object") {
								elem = selector;
							} else {
								let msg = "an error occured when trying to parse video file";
								alert(msg);
								console.log(msg);
								return false;
							}
							if(!elem.paused) elem.pause();
							elem.src = e.target.result;
							elem.load();
							elem.width = videoObject.width;
							elem.height = videoObject.height;
							elem.preload = true;
							elem.playbackRate = 1;
							// elem.play();
							if(infoBoxId){
								$one(infoBoxId).innerHTML = `<div class="box">
									<p class="panel">
										${html} 
										<span class="file-dimensions">dimensions: <strong>[${videoObject.width} x ${videoObject.height}]</strong></span>
									</p>
								</div>`;
							}
						}
						reader.readAsDataURL(file);
					} else {
						let blob = new Blob([file], {type: file.type}); // create a blob of buffer
						fileURL = URL.createObjectURL(blob), // create o-URL of blob
						video = document.createElement("video"); // create video element
						video.preload = "metadata"; // preload setting
						video.addEventListener("loadedmetadata", function() {
							console.log('video.duration-' + video.duration);
							console.log('video.videoHeight-' + video.videoHeight);
							console.log('video.videoWidth-' + video.videoWidth);
							//document.querySelector("div").innerHTML = "Duration: " + video.duration + "s" + " <br>Height: " + video.videoHeight; // show duration
							URL.revokeObjectURL(fileURL); // clean up
							//console.log(start - performance.now());
						});
						$results.push(fileURL);
						
						//video.src = fileURL; // start
						if(!elem.paused) elem.pause();
						elem.src = fileURL;
						elem.load();
						elem.width = video.videoWidth;
						elem.height = video.videoHeight;
						elem.preload = true;
						elem.playbackRate = 1;
						if(infoBoxId){
							$one(infoBoxId).innerHTML += `<div class="box">
								<p class="panel">
									${html} 
									<span class="file-dimensions">dimensions: <strong>[${video.videoWidth} x ${video.videoHeight}]</strong></span>
								</p>
							</div>`;
						}
					}
				}
				// display an image
				if (filetype.indexOf("image") == 0) {
					let imgObject = new Image();
					if(useFileReader){
						var reader = new FileReader();
						reader.onload = function(e) {
							$results.push(e.target.result);
							imgObject.src = e.target.result;
							//imgObject.onload = onImageLoaded2;
							imgObject.onload = function(ev) {
								//img_width = this.naturalWidth;img_height = this.naturalHeight;
								img_width = imgObject.width;
								img_height = imgObject.height;
							};
							if(onlyContent) {
								finalContent = `<img class="actual-size" src="${e.target.result}" />`;
								append ? elem.innerHTML += finalContent : elem.innerHTML = finalContent;
							} else {
								finalContent = `<div class="box section w--12">
									<p class="">${html} <span class="file-dimensions">dimensions: <strong>[${imgObject.naturalWidth} x ${imgObject.naturalHeight}]</strong></span></p>
									<span class="inline-block w--6 m--1">Set Magnifier Glass Size: <input id="magnifier-glass-size-${fi}" class="akd__input-range" type="range" value="100" min="100" max="1000" step="10" /></span>
									<span class="inline-block w--6 m--1">Set Magnifier Zoom Amount: <input id="magnifier-zoom-amount-${fi}" class="akd__input-range" type="range" value="3" min="0" max="10" step="1" /></span>
									<!--<p><strong>${file.name}:</strong><br />-->
									<div id="croppedImage-${fi}"></div>
									<div class="img-magnifier-container">
										<div class="img-magnifier-glass small-magnifier-glass"></div>
										<img id="reader-image-${fi}" src="${e.target.result}" />
									</div>
								</div>`;
								append ? elem.innerHTML += finalContent : elem.innerHTML = finalContent;
								magnifier("#reader-image-"+fi, 3,"#magnifier-glass-size-"+fi,"#magnifier-zoom-amount-"+fi);
							}
						}
						reader.readAsDataURL(file);
					} else {
						let img_height,img_width,blob = new Blob([file], {type: file.type}),
						_magnifier; // create a blob of buffer
						// fileURL = URL.createObjectURL(file[0]);
						fileURL = URL.createObjectURL(blob); // create o-URL of blob
						imgObject.src = fileURL;
						imgObject.addEventListener("load", function() {
							//img_width = this.naturalWidth;img_height = this.naturalHeight;
							URL.revokeObjectURL(fileURL); // clean up
						});
						$results.push(fileURL);
						if(onlyContent) {
							finalContent = `<img class="actual-size" src="${fileURL}" />`;
							append ? elem.innerHTML += finalContent : elem.innerHTML = finalContent;
						} else {
							/* finalContent = "<div class=\"thumb-box grid-12\" data-file-img-src=\""+ fileURL +"\" data-file-type=\"image\" data-file-append-content=\"false\">" +
							'<div class="img-container left-1">' +
								'<img id="thumb-image-'+fi+'" src="' + fileURL + '" />' +
							"</div>"+
							"<div class=\"info-container left-1\">"+ html + " <span class=\"file-dimensions\">dimensions: <strong>["+imgObject.naturalWidth+" x "+imgObject.naturalHeight+"]</strong></span></div>"+
							"</div>"; */
							finalContent = `<div class="box box-primary">
								<div class="box-header with-border flex gap--2">
									<span class="w--9 mr--auto"><i class="fa fa-info-circle"></i>&nbsp;File information&nbsp;&raquo;&nbsp;<strong>${file.name}</strong></span>
									<span class="flex gap--2 w--auto ml--auto">
										${sidebar_btn}
										${close_btn}
										${remove_btn}
									</span>
								</div>
								<div class="box-body with-sidebar">
									<div class="box-sidebar">
										${html}
										<span class="file-dimensions">dimensions: <strong>[${imgObject.width} x ${imgObject.height}]</strong></span>
									</div>
									<span class="flex flex--wrap w--12 p--4 gap--4 mb--8 bdr--4 bg--primary text--white">
										<span class="flex-place-center w--2-gh">
											<span id="magnifier-reset-${fi}" class="box-button box-sidebar-toggle-button akd__btn btn--info" title="reset magnifier"><i class="fa fa-sync"></i></span>
										</span>
										<span class="flex-place-center flex--col gap--2 w--5-gh><span text--sm text--dark">Set Magnifier Glass Size:&nbsp;</span><input id="magnifier-glass-size-${fi}" class="akd__input-range" type="range" value="100" min="100" max="400" step="10" /></span>
										<span class="flex-place-center flex--col gap--2 w--5-gh><span text--sm text--dark">Set Magnifier Zoom Amount:&nbsp;</span><input id="magnifier-zoom-amount-${fi}" class="akd__input-range" type="range" value="3" min="0" max="10" step="1" /></span>
									</span>
									<div id="croppedImage-${fi}"></div>
									<div class="img-magnifier-container">
										<div class="img-magnifier-glass small-magnifier-glass"></div>
										<img id="reader-image-${fi}" src="${fileURL}" />
									</div>
								</div>
							</div>`;
							append ? elem.innerHTML += finalContent : elem.innerHTML = finalContent;
							_magnifier = magnifier("#reader-image-"+fi, 3,"#magnifier-glass-size-"+fi,"#magnifier-zoom-amount-"+fi);
							_magnifier.init();
							$one(`#magnifier-reset-${fi}`).onclick = (e) => _magnifier.reset();
						}
					}
				}
				// display a text file
				/* if (filetype.indexOf("text") == 0) {
					if(useFileReader){
						var reader = new FileReader();
						reader.onload = function(e) {
							srcText = e.target.result;
							elem.innerHTML += "<div class=\"box section grid-12\">" +
								"<p class=\"\">"+ html + " <span class=\"file-dimensions\">dimensions: <strong>["+imgObject.width+" x "+imgObject.height+"]</strong></span></p>"+
								"<span class=\"inline-block grid-6\" style=\"margin:4px 2px 4px 0;\">Set Magnifier Glass Size: <input id=\"magnifier-glass-size-"+fi+"\" class=\"pbd-range-input rounded\" type=\"range\" value=\"100\" min=\"100\" max=\"1000\" step=\"10\" /></span>" +
								"<span class=\"inline-block grid-6\" style=\"margin:4px 0;\">Set Magnifier Zoom Amount: <input id=\"magnifier-zoom-amount-"+fi+"\" class=\"pbd-range-input rounded\" type=\"range\" value=\"3\" min=\"0\" max=\"10\" step=\"1\" /></span>" +
								'<div class="text-container">' + srcText +"</div>"+ 
							"</div>";
						}
						reader.readAsText(file);
					}
				} */
				if (filetype.indexOf("text") == 0) {
					console.log(file, ext,filetype,selector);
					var out = "", data = "";
					var reader = new FileReader();
					reader.onload = function(e) {
						e.preventDefault();
						$results.push(e.target.result);
						lang = fileext(file.name);
						/* if(isFunction(w3CodeColorize)) {
							data = w3CodeColorize(escapeHTML(e.target.result),ext);
							out = `<pre class="code-wrapper prettyprint ${ext}High">${data}</pre>`;
						} else { */
							out = parseContent(e.target.result,lang).formattedResult;
						//}
						//out = '<pre class="code-wrapper '+ext+'High">' + _.w3CodeColorize(_.escapeHTML(e.target.result),ext) + '</pre>';
						//Output("<div class=\"box\"><div class=\"box-header\"><span class=\"panel flex flex--wrap gap--2 w--10\">" + html + "</span>"+close_btn+"</div><div class=\"box-body\">" + out + "</div></div>",'page-file-parser-inner');
						Output(selector, `<div class="box box-default">
							<div class="box-header with-border flex gap--2">
								<span class="w--9 mr--auto"><i class="fa fa-info-circle"></i>&nbsp;File information&nbsp;&raquo;&nbsp;<strong>${file.name}</strong></span>
								<span class="flex gap--2 w--auto ml--auto">
									${sidebar_btn}
									${close_btn}
									${remove_btn}
								</span>
							</div>
							<div class="box-body with-sidebar">
								<div class="box-sidebar">${html}</div>
								${out}
							</div>
						</div>`, false);
						
					}
					reader.readAsText(file);
				}
				
				if (filetype.indexOf("application") == 0) {
					let out = '';
					let reader = new FileReader();
					reader.onload = function(e) {
						e.preventDefault();
						$results.push(e.target.result);
						if(filetype.match("javascript")){
							out = e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;");
						} else if(filetype.match("json")){
							var jsonObj = JSON.parse(e.target.result);
							out = JSON.stringify(jsonObj, null, 2);
							out = out.replace(/</g, "&lt;").replace(/>/g, "&gt;");
						} else {
							out = e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;");
						}
						//out = escapeHTML(e.target.result);
						/* if(isFunction(w3CodeColorize)) {
							out = `<pre class="code-wrapper prettyprint ${ext}High">${w3CodeColorize(out,ext)}</pre>`;
							//Output(selector, `<div class="box"><div class="box-header">${html}</div><div class="box-body">${out}</div></div>`, false);
						} else { */
							lang = fileext(file.name);
							out = parseContent(out,lang).formattedResult;
							//Output(selector, `<div class="box"><div class="box-header">${html}</div><div class="box-body">${out}</div></div>`, false);
						//}
						Output(selector, `<div class="box box-default">
							<div class="box-header with-border flex gap--2">
								<span class="w--9 mr--auto"><i class="fa fa-info-circle"></i>&nbsp;File information&nbsp;&raquo;&nbsp;<strong>${file.name}</strong></span>
								<span class="flex gap--2 w--auto ml--auto">
									${sidebar_btn}
									${close_btn}
									${remove_btn}
								</span>
							</div>
							<div class="box-body with-sidebar">
								<div class="box-sidebar">${html}</div>
								${out}
							</div>
						</div>`, false);
					}
					reader.readAsText(file);
				}
			}
			fi++;
			if(parseInt(fi) === parseInt(l)) $completed = true;
		}
		const process = (files) => {
			
			return $this;
		}
		// Fire
		const then = debounce(cb=>{
			if($completed === true && cb && isFunction(cb)){
				cb.call(null, $results, files, fi);
				$completed = false;
				fi = 0;
			}
			
			return $this;
		}, 250);
		
		//process(files);
		return {process, then}
	}
	// ------------------------------------------------------------------------------------------------------------------------------------------
	const cssFilterApp = (cfg={}) => {
		var $parentElem = $one(cfg.parentElemId),
		$filtersWrapperElem = $one(cfg.filtersWrapperId),
		$adjustmentsWrapperElem = $one(cfg.adjustmentsWrapperId),
		$transformsWrapperElem = $one(cfg.transformsWrapperId),
		$controlElem = $one(cfg.controlsWrapperId),
		$mainImage = $one(cfg.mainImageId);
		//alert(`${$mainImage} -- ${$parentElem}`)
		if(!isElement($parentElem) || !isElement($mainImage)) return false;
		var frag = document.createDocumentFragment(), 
		zoomed = 0, default_filter_image = "./default.jpg", styleText = "", 
		filters = [
			"none", "1977", "aden", "amaro", "ashby", "brannan", "brooklyn", "charmes", "clarendon", "crema", "dogpatch", "earlybird", "gingham", "ginza", "hefe", "helena", "hudson", "inkwell", "juno", "kelvin", "lark", 
			"lofi", "ludwig", "maven", "mayfair", "moon", "nashville", "perpetua", "poprocket", "reyes", "rise", "sierra", "skyline", "slumber", "stinson", "sutro", "toaster", "valencia", "vesper", "walden", "willow", "xpro-ii"
		], 
		defaultValues = {
			filter : {
				blur : "0", brightness : "", contrast : "", dropshadow : "0 0 0 #000", grayscale : "0", huerotate : "0", invert : "0", opacity : "100", saturate : "100", sepia : "0"
			},
			transform : {
				rotate : "0", scale : "1", scaleX : "1", scaleY : "1", skew : "0", translateX : "0", translateY : "0"
			}
		},
		$preFiltersContainer = tag$1("div", {"id":"filter-pre-filters","class":"pre-filters shadow2 toggled"});
		
		forEach(filters, function(filter){
			if($mainImage.classList.contains(`filter-${filter}`)) $mainImage.classList.remove(`filter-${filter}`);
			var div, img,span;
			div = tag$1("div", {"class":"thumb-wrapper","data-filter-class" : `filter-${filter}`},
				img = tag$1("img", {"class" : `thumb filter-${filter}`,src : $mainImage.src??default_filter_image, alt : "IMAGE", "data-filter-class" : `filter-${filter}`}), 
				span = tag$1("span", {"class" : "thumb-name", "data-filter-name" : `filter-${filter}`},`filter-${filter}`)
			);
			img.addEventListener("click", function(e){
				forEach(filters, function(filter){
					if($mainImage.classList.contains(`filter-${filter}`)) $mainImage.classList.remove(`filter-${filter}`);
				});
				var _filter_class = this.getAttribute("data-filter-class"), _elem_style = elementStyle($mainImage);
				for(var s in $mainImage.style) if(s === "filter" || s === "-webkit-filter") styleText = `${s} : ${_elem_style[s]};\n`;
				$mainImage.src = this.src || img.src;
				$mainImage.style.filter = "";
				$mainImage.classList.add(_filter_class);
				//$one("#widgets-sntx-panel").innerHTML = styleText;
				removeClass(".thumb-wrapper","selected");
				addClass(this.parentElement,"selected");
			}, false);
			frag.appendChild(div);
		});
		$preFiltersContainer.appendChild(frag);
		
		$filtersWrapperElem.appendChild($preFiltersContainer);
		$adjustmentsWrapperElem.innerHTML = `<div class="css-filter">
			<label for="filter-input-blur" class="block list-style"><span class="filter-name">Blur : </span><input id="filter-input-blur" class="filter-input" type="range" min="0" max="20" step="0.1" value="0" /><span id="current-blur" class="filter-value small">100%</span></label>
			<label for="filter-input-brightness" class="block list-style"><span class="filter-name small">Brightness : </span><input id="filter-input-brightness" class="filter-input" type="range" min="0" max="250" step="1" value="100" /><span id="current-brightness" class="filter-value small">100%</span></label>
			<label for="filter-input-contrast" class="block list-style"><span class="filter-name">Contrast : </span><input id="filter-input-contrast" class="filter-input" type="range" min="0" max="250" step="1" value="100" /><span id="current-contrast" class="filter-value small">100%</span></label>
			<label for="filter-input-drop-shadow" class="block list-style"><span class="filter-name small">Drop-Shadow : </span><input id="filter-input-drop-shadow" class="filter-input" type="text" value="0px 0px 0px #000" /><span id="current-drop-shadow" class="filter-value small">0 0 0 #000</span></label>
			<label for="filter-input-grayscale" class="block list-style"><span class="filter-name">Grayscale : </span><input id="filter-input-grayscale" class="filter-input" type="range" min="0" max="100" step="1" value="0" /><span id="current-grayscale" class="filter-value small">0%</span></label>
			<label for="filter-input-hue-rotate" class="block list-style"><span class="filter-name small">Hue-Rotate : </span><input id="filter-input-hue-rotate" class="filter-input" type="range" min="0" max="360" step="1" value="0" /><span id="current-hue-rotate" class="filter-value small">0deg</span></label>
			<label for="filter-input-invert" class="block list-style"><span class="filter-name">Invert : </span><input id="filter-input-invert" class="filter-input" type="range" min="0" max="100" step="1" value="0" /><span id="current-invert" class="filter-value small">0%</span></label>
			<label for="filter-input-opacity" class="block list-style"><span class="filter-name">Opacity : </span><input id="filter-input-opacity" class="filter-input" type="range" min="1" max="100" step="1" value="100"/><span id="current-opacity" class="filter-value small">100%</span></label>
			<label for="filter-input-saturate" class="block list-style"><span class="filter-name">Saturate : </span><input id="filter-input-saturate" class="filter-input" type="range" min="0" max="1000" step="1" value="100" /><span id="current-saturate" class="filter-value small">100%</span></label>
			<label for="filter-input-sepia" class="block list-style"><span class="filter-name">Sepia : </span><input id="filter-input-sepia" class="filter-input" type="range" min="0" max="100" step="1" value="0" /><span id="current-sepia" class="filter-value small">0%</span></label>
		</div>`;
		$transformsWrapperElem.innerHTML = `<div class="transformation">
			<div class="css-transform list-style"><label class="transform-name">Rotate:</label><input id="transform-input-rotate" class="transform-input" type="range" value="0" min="-180" max="180" /><div id="current-rotate" class="transform-value">0deg</div></div>
			<div class="css-transform list-style"><label class="transform-name">Scale (x):</label><input id="transform-input-scaleX" class="transform-input" type="range" value="1" min="-4" max="4" step="0.1" /><div id="current-scaleX" class="transform-value">1</div></div>
			<div class="css-transform list-style"><label class="transform-name">Scale (y):</label><input id="transform-input-scaleY" class="transform-input" type="range" value="1" min="-4" max="4" step="0.1" /><div id="current-scaleY" class="transform-value">1</div></div>
			<div class="css-transform list-style"><label class="transform-name small">Translate (x):</label><input id="transform-input-translateX" class="transform-input" type="range" value="0" min="-180" max="180" /><div id="current-translateX" class="transform-value">0px</div></div>
			<div class="css-transform list-style"><label class="transform-name small">Translate (y):</label><input id="transform-input-translateY" class="transform-input" type="range" value="0" min="-180" max="180" /><div id="current-translateY" class="transform-value">0px</div></div>
			<div class="css-transform list-style"><label class="transform-name">Skew:</label><input id="transform-input-skew" class="transform-input" type="range" value="0" min="-180" max="180" /><div id="current-skew" class="transform-value">0deg</div></div>
		</div>`;
		
		$controlElem.innerHTML = `<div id="filter-zoom" class="inline-flex grid-30">
			<button id="filter-zoom-in" class="block flex-item-even" min="-10" max="10" step="100" title="zoom in">&nbsp;&plus;&nbsp;</button>
			<button id="filter-zoom-reset" class="block flex-item-even" title="reset zoom">[ = ]</button>
			<button id="filter-zoom-out" class="block flex-item-even" min="-10" max="10" step="50" title="zoom out">&nbsp;&minus;&nbsp;</button>
		</div>
		<div class="inline-flex nowrap grid-70">
			<label for="reader-input-file" id="reader-input-label" class="reader-input-label button"><i class="fa fa-hdd"></i><input id="reader-input-file" class="reader-input-file visually-hidden" type="file" name="reader-input-file" accepts="*" multiple /></label>
			<input id="reader-input-text" class="reader-input-text grid-60-p10" type="text" name="" value="" placeholder="" />
			<button id="saveImage" class="reader-save-button grid-20"><i class="fa fa-save"></i></button>
			<button id="resetAll" class="grid-20"><i class="fa fa-file-import"></i></button>
		</div>`;
		$one("#filter-zoom-reset").setAttribute("data-img-width" ,$mainImage.clientWidth);
		$one("#filter-zoom-reset").setAttribute("data-img-height" ,$mainImage.clientHeight);

		/* on($one("#widget-body-toggler"), "click", function(e){
			var wBody = one(".widget-body");
			wBody.classList.toggle("toggled");
			if(wBody.classList.contains("toggled")) {this.classList.add("purple");this.innerHTML = "&nbsp;&laquo;&nbsp;";}
			else {this.classList.remove("purple");this.innerHTML = "&nbsp;&raquo;&nbsp;";}
		});
		on($one("#pre-filters-toggler"), "click", function(e){
			var prefilters = one(".pre-filters");
			prefilters.classList.toggle("toggled");
			if(prefilters.classList.contains("toggled")) {this.innerHTML = "&nbsp;&uarr;&nbsp;";}
			else {this.innerHTML = "&nbsp;&darr;&nbsp;";}
		}); */
		on($parentElem, "click",function(e){
			var targetElem = e.target??this;
			if(isElement($mainImage) && (targetElem.id === "filter-zoom-in" || targetElem.id === "filter-zoom-out" || targetElem.id === "filter-zoom-reset" || targetElem.id === "resetAll" || targetElem.id === "saveImage") ){
				var currWidth = $mainImage.clientWidth, currHeight = $mainImage.clientHeight, min, max, step = e.target.getAttribute("step"), 
				zoom = step && step > 0 ? parseInt(step, 10): 100;
				if(targetElem.id === "filter-zoom-in"){
					max = targetElem.getAttribute("max");
					if(zoomed < max){
						$mainImage.style.width = (currWidth + zoom) + "px";
						$mainImage.style.height = (currHeight + zoom) + "px";
						zoomed++;
					}
				} else if(targetElem.id === "filter-zoom-out"){
					min = targetElem.getAttribute("min");
					if(zoomed >= min){
						$mainImage.style.width = (currWidth - zoom) + "px";
						$mainImage.style.height = (currHeight - zoom) + "px";
						zoomed--;
					}
				}
				if(targetElem.id === "filter-zoom-reset"){
					$mainImage.style.width = targetElem.getAttribute("data-img-width") + "px";
					$mainImage.style.height = targetElem.getAttribute("data-img-height") + "px";
					zoomed = 0;
				}
				if(targetElem.id === "resetAll"){
					zoomed = 0;
					$mainImage.style.width = $one("#filter-zoom-reset").getAttribute("data-img-width") + "px";
					$mainImage.style.height = $one("#filter-zoom-reset").getAttribute("data-img-height") + "px";
					$mainImage.style.filter = "none";
					$mainImage.style.transform = "none";
					$one('#transform-input-rotate').value = defaultValues.transform.rotate;$one('#transform-input-scaleX').value = defaultValues.transform.scaleX;$one('#transform-input-scaleY').value = defaultValues.transform.scaleY;$one('#transform-input-translateX').value = defaultValues.transform.translateX;$one('#transform-input-translateY').value = defaultValues.transform.translateY;$one('#transform-input-skew').value = defaultValues.transform.skew;
					$one('#filter-input-blur').value = defaultValues.filter.blur;$one('#filter-input-brightness').value = defaultValues.filter.brightness;$one('#filter-input-contrast').value = defaultValues.filter.contrast;$one('#filter-input-grayscale').value = defaultValues.filter.grayscale;$one('#filter-input-hue-rotate').value = defaultValues.filter.huerotate;$one('#filter-input-invert').value = defaultValues.filter.invert;$one('#filter-input-opacity').value = defaultValues.filter.opacity;$one('#filter-input-saturate').value = defaultValues.filter.saturate;$one('#filter-input-sepia').value = defaultValues.filter.sepia;
				}
				if(targetElem.id === "saveImage"){
					try{
						var fileName = $one("#reader-input-text")&&$one("#reader-input-text").value||'my-canvas.jpeg', imgType = "image/jpeg", imgQuality = 1.0, canvas = document.createElement("canvas"), 
						ctx = canvas.getContext("2d");
						canvas.width = $mainImage.width;
						canvas.height = $mainImage.height;
						ctx.filter = elementStyle($mainImage).filter;
						ctx.drawImage($mainImage, 0, 0, canvas.width, canvas.height);
						// Convert canvas to image
						var dataURL = canvas.toDataURL(imgType, imgQuality);
						if (window.navigator.msSaveBlob) {
							window.navigator.msSaveBlob(canvas.msToBlob(), fileName);
							e.preventDefault();
						} else {
							downloadImage(dataURL, fileName);
						}
					} catch(e){console.log(e);alert(e)}
				}
			}
		}, {target: "button"});

		on($parentElem, "change", function(e){
			var targetElem = e.target??this, cssStr = "", $mainImage = $one(cfg.mainImageId),cssTransformStr = "",
			filter_inputs = $all(".css-filter input[type=range]"),
			transform_inputs = $all('.transformation input[type=range]')

			forEach(filter_inputs, function(input){
				var filter = input.id.replace("filter-input-",""), unit = input.id === "filter-input-blur" ? "px" : input.id === "filter-input-hue-rotate" ? "deg" : input.id === "filter-input-drop-shadow" ? "" : "%";
				if(input.id !== e.target.id) cssStr += `${filter}(${input.value}${unit}) `;
			});
			forEach(transform_inputs, function(input){
				var transform = input.id.replace("transform-input-",""), unit = (input.id === "transform-input-translateY" || input.id === "transform-input-translateX") ? "px" : (input.id === "transform-input-rotate" || input.id === "transform-input-skew") ? "deg" :  "";
				if(input.id !== e.target.id) cssTransformStr += `${transform}(${input.value}${unit}) `;
			});
			if(e.target.id === "reader-input-file"){
				readAsImage(e||this, function(url, blob){
					$mainImage.src = url;
					forEach($all("img.thumb",$filtersWrapperElem), function(img){
						if(img && isElement(img)){
							img.src = url;
						}
					});
					$one("#filter-zoom-reset").setAttribute("data-img-width" ,Math.max($mainImage.clientWidth,$mainImage.naturalWidth));
					$one("#filter-zoom-reset").setAttribute("data-img-height" ,Math.max($mainImage.clientHeight,$mainImage.naturalHeight));
					removeClass(".thumb-wrapper","selected");
				});
			} else if(e.target.id === "filter-input-object-fit"){
				Object.assign($mainImage.style, {"object-fit": this.value});
			} else if(e.target.id === "transform-input-rotate"){
				var val = `rotate(${this.value}deg)`;
				$one("#current-rotate").innerHTML = `${this.value}deg`;
				Object.assign($mainImage.style, {"-webkit-transform" : cssTransformStr+val, "-moz-transform" : cssTransformStr+val, "-o-transform" : cssTransformStr+val, "transform" : cssTransformStr+val, 'transform-origin' : 'center center','vertical-align' : 'middle'});
			} else if(e.target.id === "transform-input-skew"){
				var val = `skew(${this.value}deg)`;
				$one("#current-skew").innerHTML = `${this.value}deg`;
				Object.assign($mainImage.style, {"-webkit-transform" : cssTransformStr+val, "-moz-transform" : cssTransformStr+val, "-o-transform" : cssTransformStr+val, "transform" : cssTransformStr+val, 'transform-origin' : 'center center','vertical-align' : 'middle'});
			} else if(e.target.id === "transform-input-translateX"){
				var val = `translateX(${this.value}px)`;
				$one("#current-translateX").innerHTML = `${this.value}px`;
				Object.assign($mainImage.style, {"-webkit-transform" : cssTransformStr+val, "-moz-transform" : cssTransformStr+val, "-o-transform" : cssTransformStr+val, "transform" : cssTransformStr+val, 'transform-origin' : 'center center','vertical-align' : 'middle'});
			} else if(e.target.id === "transform-input-translateY"){
				var val = `translateY(${this.value}px)`;
				$one("#current-translateY").innerHTML = `${this.value}px`;
				Object.assign($mainImage.style, {"-webkit-transform" : cssTransformStr+val, "-moz-transform" : cssTransformStr+val, "-o-transform" : cssTransformStr+val, "transform" : cssTransformStr+val, 'transform-origin' : 'center center','vertical-align' : 'middle'});
			} else if(e.target.id === "transform-input-scale"){
				var val = `scale(${this.value})`;
				$one("#current-scale").innerHTML = `${this.value}`;
				Object.assign($mainImage.style, {"-webkit-transform" : cssTransformStr+val, "-moz-transform" : cssTransformStr+val, "-o-transform" : cssTransformStr+val, "transform" : cssTransformStr+val, 'transform-origin' : 'center center','vertical-align' : 'middle'});
			} else if(e.target.id === "transform-input-scaleX"){
				var val = `scale(${this.value}, ${$one('#transform-input-scaleY').value})`;
				$one("#current-scaleX").innerHTML = `${this.value}`;
				Object.assign($mainImage.style, {"-webkit-transform" : cssTransformStr+val, "-moz-transform" : cssTransformStr+val, "-o-transform" : cssTransformStr+val, "transform" : cssTransformStr+val, 'transform-origin' : 'center center','vertical-align' : 'middle'});
			} else if(e.target.id === "transform-input-scaleY"){
				var val = `scale(${$one('#transform-input-scaleX').value}, ${this.value})`;
				$one("#current-scaleY").innerHTML = `${this.value}`;
				Object.assign($mainImage.style, {"-webkit-transform" : cssTransformStr+val, "-moz-transform" : cssTransformStr+val, "-o-transform" : cssTransformStr+val, "transform" : cssTransformStr+val, 'transform-origin' : 'center center','vertical-align' : 'middle'});
			} else if(e.target.id === "filter-input-blur"){
				var val = `blur(${this.value}px)`;
				$one("#current-blur").innerHTML = `${this.value}px`;
				Object.assign($mainImage.style, {"-webkit-filter" : cssStr + val, "-moz-filter" : cssStr + val, "-o-filter" : cssStr + val, "-ms-filter" : cssStr + val, "filter" : cssStr + val});
			} else if(e.target.id === "filter-input-hue-rotate"){
				var val = ` hue-rotate(${this.value}deg)`;
				$one("#current-hue-rotate").innerHTML = `${this.value}deg`;
				Object.assign($mainImage.style, {"-webkit-filter" : cssStr + val, "-moz-filter" : cssStr + val, "-o-filter" : cssStr + val, "-ms-filter" : cssStr + val, "filter" : cssStr + val});
			} else if(e.target.id === "filter-input-drop-shadow"){
				var val = ` drop-shadow(${this.value})`;
				$one("#current-drop-shadow").innerHTML = `${this.value}`;
				Object.assign($mainImage.style, {"-webkit-filter" : cssStr + val, "-moz-filter" : cssStr + val, "-o-filter" : cssStr + val, "-ms-filter" : cssStr + val, "filter" : cssStr + val});
			} else {
				var filter = e.target.id.replace("filter-input-",""), val = ` ${filter}(${this.value}%)`;
				$one("#current-"+filter).innerHTML = `${this.value}%`;
				Object.assign($mainImage.style, {"-webkit-filter" : cssStr + val, "-moz-filter" : cssStr + val, "-o-filter" : cssStr + val, "-ms-filter" : cssStr + val, "filter" : cssStr + val});
			}
		}, {target : ["select", "input"]});

		/* on($one("#widgets-gallery-panel input"), "change", function(e){
			if(e.target.id === "widgets-gallery-file-input"){
				var content, targetElem = one("#widgets-gallery-panel-thumbnails");
				readAsImage(e||this, function(url, blob){
					var span = document.createElement('span');
					span.className = "thumb";
					span.innerHTML = ['<img src="', url, '" alt="', escape(blob.name), '" title="', escape(blob.name), '"/>'].join('');
					targetElem.insertBefore(span, null);
				});
			}
			return;
		}); */
		on($parentElem, "click", function(e){
			var _this = this, imgs = $all(".pre-filters img"), zoomReset = $one("#filter-zoom-reset"), thumbs = $all(".thumb",$parentElem), width = this.naturalWidth, height = this.naturalHeight;
			forEach(thumbs, function(thumb){if(isElement(thumb) && thumb.classList.contains("active")) thumb.classList.remove("active");})
			this.parentElement.classList.add("active");
			$mainImage.src = this.src;
			Object.assign($mainImage.style, {"width" : width+"px", "height" : height+"px"});
			forEach(imgs, function(img){if(isElement(img)) img.src = _this.src});
			zoomReset.setAttribute("data-img-width" ,$mainImage.clientWidth);
			zoomReset.setAttribute("data-img-height" ,$mainImage.clientHeight);
		}, {target :".thumb img"});
		/* on(one("#dark-mode-toggler"), "change", function(e){
			if(document.body.classList.contains("dark-mode")){
			document.body.classList.remove("dark-mode");
			} else document.body.classList.add("dark-mode");
		}); */
	}
	const walk = function ( nodeFn, preFn, postFn, node ) {
		if ( nodeFn == undefined ) return;
		if ( node == undefined ) node = document.documentElement;
		// If the node is an element
		if (node.nodeType == 1) {
			// Pass the node to the main function
			nodeFn(node);
			if ( node.hasChildNodes() ){
				// If necessary, pass the node to the pre-child function
				if ( preFn !== undefined ) preFn(node);
				// Use a recursive call to process each child node
				for(var i = 0; i < node.childNodes.length; i++) {
					walk( nodeFn, preFn, postFn, node.childNodes[i]);
				}
				// If necessary, pass the node to the post-child function
				if( postFn !== undefined ) postFn(node);
			}
		}
	};
	const domInspector = function(domCfg={}){
		const [_this, command_separator/*, tag$1*/]  = [this, "\n ==================== \n\r"/*, tag$1*/]; 
		var cmd = "",topHalf, bottomHalf, execButton, clearButton, toggleButton, commandInput, elementFinderInput, elementPropertyInput, elementPropertyValueInput,
		methodSelect, propertySelect,_texarea, tb1, tb2, tb3, tb4,
		padding = ("padding" in domCfg) ? domCfg.padding : 15,
		error_color = "#dc3545", success_color = "#28a745",
		gui = tag$1("div",{id:"domInspector","class":"shadow",name:"domInspector",style:"position: relative;display: grid;grid-template-columns: 100%;grid-template-rows: calc(100% - 3rem) 3rem ;grid-template-rows: auto 1fr ;width:calc(100% - 20px);padding:5px;background:#ffffff50;margin:5px;"},
			topHalf = tag$1("div",{id:"toolbar-wraper-1","class":"section-wrapper",style:"display:block;width:100%;margin-bottom:5px;"}, 
				//tb1 = tag$1("div",{id:"toolbar-row-1","class":"",style:"display:flex;width:99%;margin-bottom:5px;justify-content:space-evenly;"},
					//elementFinderInput = tag$1("input",{id:"elementFinderInput","class":"elementFinderInput","style":"display:block;width:49%;", name:"elementFinderInput",type:"text",value:"#element", placeholder:"enter element/tag #ID/.CLASS"})
				//),
				tb1 = tag$1("div",{id:"toolbar-row-1","class":"toolbar",style:"display:flex;width:100%;margin-bottom:5px;justify-content:space-between;"}, 
					toggleButton = tag$1("button",{id:"toggleButton","class":"toggleButton", name:"toggleButton",type:"button", title:"toggle command","style":"padding:"+padding+"px;flex:5% 0 0;"},"🔄"), 
					elementPropertyInput = tag$1("input",{id:"elementPropertyInput","class":"elementPropertyInput", name:"elementPropertyInput",type:"text",value:"", placeholder:"enter element property eg: CLASS","style":"display:block;width:39%;flex:47% 0 0;border: 2px solid transparent;", onfocus: e=> e.target.select()}) , 
					elementPropertyValueInput = tag$1("input",{id:"elementPropertyValueInput","class":"elementPropertyValueInput", name:"elementPropertyValueInput",type:"text",value:"", placeholder:"enter element property value eg: CLASS/'fadeIn'.","style":"display:block;width:39%;flex:47% 0 0;border: 2px solid transparent;", onfocus: e=> e.target.select()})
				),
				tb2 = tag$1("div",{id:"toolbar-row-2","class":"toolbar",style:"display:flex;width:100%;margin-bottom:5px;justify-content: space-between;"}, 
					elementFinderInput = tag$1("input",{id:"elementFinderInput","class":"elementFinderInput", name:"elementFinderInput",type:"text",value:"#element", placeholder:"enter element/tag #ID/.CLASS","style":"display:block;width:40%;"}),
					propertySelect = tag$1("select",{id:"propertySelect","class":"propertySelect", name:"propertySelect","disabled":"true","style":"display:block;width:29%;"}),
					methodSelect = tag$1("select",{id:"methodSelect","class":"methodSelect", name:"methodSelect","disabled":"true","style":"display:block;width:29%;"})
				),
				tb3 = tag$1("div",{id:"toolbar-wraper-3","class":"toolbar",style:"display:flex; justify-content: space-between;width:100%;margin-bottom:5px;padding:0;"}, 
					commandInput =  tag$1("input",{id:"commandInput","class":"commandInput", name:"commandInput",type:"text",value:"", placeholder:"enter command eg: -help","style":"display:block;width:59%;flex:59% 0 0;"}),
					execButton = tag$1("button",{id:"execButton","class":"execButton", name:"execButton",type:"button", title:"execute command","disabled":"true","style":"padding:"+padding+"px;width:20%;flex:20% 0 0;"},"exec"),
					clearButton = tag$1("button",{id:"clearButton","class":"clearButton", name:"clearButton",type:"button", title:"clear command input and output","style":"padding:"+padding+"px;width:20%;flex:20% 0 0;"},"clear")
				)
			),
			bottomHalf = tag$1("div",{id:"toolbar-wraper-2","class":"section-wrapper",style:"display: flex;place-content: center;width:100%;margin-top:5px;"}, 
				_textarea = tag$1("textarea",{id:"command-output-textarea","class":"command-output-textarea active","style":"width:calc(100% - 1em);min-height:200px;height: calc(100% - 1rem);padding:0.5em;margin:0;border:0;resize:vertical;", wrap:"off", name:"command-output-textarea",value:"", placeholder:"enter command eg: -help"})
			)
		);
		//let order = ["execButton","propertySelect","commandInput"];
		const gui_style = extend({"position":"fixed",/*"top":"auto",*/"bottom":0,"left":0,"right":0,"width":"99.3%"}, domCfg);
		var init = function(){
			//if(isElement(gui) && !document.body.contains(gui)) {
			if(isElement(gui)){
				if(isPlainObject(domCfg) && isDefined(domCfg.parent) && isElement(_parent = $one(domCfg.parent)) && !_parent.contains(gui)){
					_parent.appendChild(gui);
				} else if(!document.body.contains(gui)) {
					document.body.appendChild(gui);
					/*var fragment = document.createDocumentFragment();gui.appendChild(fragment);*/
				}
			}
			//_this.util().styleElement(document.body,{"padding-bottom":gui.offsetHeight+"px","overflow":"auto"});
			//_this.util().styleElement(gui,{"position":"fixed",/*"top":"auto",*/"bottom":0,"left":0,"right":0,"width":"99.3%"});
			initEvents();
		}
		var initEvents = function(){
			on(elementFinderInput, "keyup", function(e){
				var p_fragment = "",//document.createDocumentFragment();
				target = e.target.value.trim(), elem = $one(target);
				if(isElement(elem)){
					elementFinderInput.style.borderColor = success_color;
					execButton.disabled = false;
					propertySelect.disabled = false;
					methodSelect.disabled = false;
					for(var key in elem){
						p_fragment += `<option value="${key}" data-property-key="${key}" data-property-value="${elem[key]}">${key}</option>`;
					}
					//propertySelect.innerHTML = p_fragment;
					propertySelect.insertAdjacentHTML('beforeend', p_fragment);
				} else {
					elementFinderInput.style.borderColor = error_color;
					execButton.disabled = true;
					propertySelect.disabled = true;
					methodSelect.disabled = true;
				}
			});
			on(elementPropertyInput,"keyup", function(ev){
				var prop = ev.target.value.trim(), sel = elementFinderInput.value, elem = $one(sel);
				if(isElement( elem ) && (prop in elem) ){
					elementPropertyInput.style.borderColor = success_color;
				} else elementPropertyInput.style.borderColor = error_color;
			});
			on(elementPropertyValueInput,"keyup", function(ev){
				var value = ev.target.value.trim(), prop = elementPropertyInput.value.trim(), elem = $one(elementFinderInput.value);
				if(isElement( elem ) && (prop in elem) && value !== ""){
					elementPropertyValueInput.style.borderColor = success_color;
				} else elementPropertyValueInput.style.borderColor = error_color;
			});
			on(toggleButton,"click", function(e){
				bottomHalf.classList.toggle("--active");
				if(bottomHalf.classList.contains("--active")){
					bottomHalf.style.cssText += "height:"+(bottomHalf.scrollHeight+50)+"px;overflow:auto;transition:height 0.5s ease-out;";
				} else {
					bottomHalf.style.cssText += "height:0;overflow:hidden;transition:height 0.5s ease-in;";
				}
			});
			on(execButton,"click", function(e){
				var elem = $one(elementFinderInput.value);
				// if(commandInput.value.trim() !== "") 
				cmd = commandInput.value;
				if(/*cmd === "" || */cmd === "-help"){
					_help(_textarea);
				} else if(cmd === "-scan"){
					_scan(_textarea,elem);
				} else if(cmd === "-clear"){
					_clear(_textarea,elem);
				} /* else if(cmd === "-toggle::class"){
					var classVal = classInput.val();
					var elementVal = elementFinderInput.val();
					$(elementVal).toggleClass(classVal);
				} else if(cmd === "-show::class"){
					var classVal = classInput.val();
					var elementVal = elementFinderInput.val();
					$(elementVal).toggleClass(classVal);
				}*/ else if( /-get::/gi.test(cmd) && isElement(elem) ){
					var ret = "",cmdVal = cmd.split("::")[1];
					if(rcomma.test(cmdVal)){
						var cmds = cmdVal.split(",");
						for(var i =0,l=cmds.length;i<l;i++){
							let [oprop, prop] = [cmds[i].trim(), fixProp(cmds[i].trim())];
							if(elem[prop]) ret += `${prop } = ${elem[prop]}, `;
							else if(elem[oprop]) ret += `${oprop } = ${elem[oprop]}, `;
							else ret += `invalid property : ${oprop} || ${prop}`;
						}
					} else {
						let prop = fixProp(cmdVal.trim());
						//alert(cmdVal +"--"+prop);
						if(elem[prop]) ret += `${prop } = ${elem[prop]}, `;
						else if(elem[cmdVal]) ret += `${cmdVal } = ${elem[cmdVal]}, `;
						else ret += `invalid property : ${cmdVal} || ${prop}`;
					}
					output(ret, _textarea);
				} else {
					var value = elementPropertyValueInput.value.trim(), prop = elementPropertyInput.value.trim(), elem = $one(elementFinderInput.value);
					prop = fixProp(prop);
					
					if(isElement(elem)){
						if(prop === "cssText"){
							if(value === ""){
								elementPropertyValueInput.value = elem.style[prop];
							} else elem.style[prop] = value;
						} else if(prop in elem){
							if(value === ""){
								elementPropertyValueInput.value = elem[prop];
							} else elem[prop] = value;
							//setNodeAttribute(elem, prop, value){
						}
					}
				}
			});
			on(clearButton,"click", function(e){var sel = elementFinderInput.value, elem = $one(sel);_clear(_textarea,elem)});
			on(propertySelect, "change", function(e){
				var ret = "", sel = elementFinderInput.value, elem = $one(sel),
				target = e.target, prop = target.value, value = elem[prop],
				dataKey = target.hasAttribute("data-property-key") ? target.getAttribute("data-property-key") : prop,
				dataValue = target.hasAttribute("data-property-value") ? target.getAttribute("data-property-value") : value;
				//ret += `${dataKey} = ${elem[dataKey]} || ${dataValue}`;
				if(isObject(value)) value = _this.toString(value);
				ret += `${sel} : ${prop} = ${value}`;
				/*
				if(elem.hasOwnProperty(prop) && elem[prop]) ret += `${prop } = ${elem[prop]}, `;
						else if(elem.hasOwnProperty(cmdVal) && elem[cmdVal]) ret += `${cmdVal } = ${elem[cmdVal]}, `;
						else ret += `invalid property : ${cmdVal} || ${prop}`;
				*/
				output(ret, _textarea);
			});
			// ---------------------------------------
			on(document,"animationstart", function(e){let info = `${command_separator}Another node has been inserted! , ${e}, ${e.target}, ${e.target.nodeName}.`;/*nodeInsertListener(e);*/if(isElement(_textarea)) ("html" in _textarea) ? _textarea.html(info) : ("value" in _textarea) ? _textarea.value += info : _textarea.innerHTML += info;});
			//document.addEventListener("animationstart", insertListener, false); // standard + firefox
			//document.addEventListener("MSAnimationStart", insertListener, false); // IE
			//document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari
			return this;
		}
		var output = function(out,outElem){
			if(isObject(outElem) &&  ("html" in outElem) ) outElem.html(command_separator + out);
			else if(isElement(outElem)) ("value" in outElem) ? outElem.value += command_separator + out : outElem.innerHTML += command_separator + out;
		}
		var _clear = function(out){
			commandInput.value = "";
			_textarea.value = "";
			output("",out);
			return this;
		}
		var _scan = function (out, node){
			var domTree = "", indent = "";
			// Define the main processing function
			var addNode = function (node) {
				domTree += indent + node.tagName.toLowerCase();
				if (node.hasAttributes()) {
					domTree += " (";
					for ( var i = 0; i < node.attributes.length; i++) {
						domTree += node.attributes[i].name + "=\"";
						domTree += node.attributes[i].value + "\"";
						if ( i < node.attributes.length - 1) {
							domTree += " ";
						}
					}
					domTree += ")";
				} else domTree += " :: ";
				domTree += "\n";
			};
			// Define the preprocessing function
			var moreIndent = function () {
				indent += "    ";
			};
			// Define the postprocessing function
			var lessIndent = function () {
				if (indent.length >= 4) indent = indent.slice(0,-4);
			};
			// Define a function that calls the walk method
			//  var showDomTree = function () {
			walk(addNode, moreIndent, lessIndent, (isElement(node) ? node : isSelector(node) ? $one(node) : undefined));
			//alert(domTree);
			// if(isElement(out)) ("html" in out) ? out.html(domTree) : ("value" in out) ? out.value = domTree : out.innerHTML += command_separator + domTree;
			output(command_separator + domTree,_textarea);
			return this
		}
		var _help = function (out){
			var helpInfo = `<h3>help info</h3>
			<ul>
				<li><span class="command">-help</span> : <span class="command-info">get information</span></li>
				<li><span class="command">-scan</span> : <span class="command-info">scan the DOM and return a string representation of the DOM tree.</span></li>
				<li><span class="command">-toggle</span> : <span class="command-info"></span></li>
				<li><span class="command">-toggle::class</span> : <span class="command-info">toggle a class name of the selected element.</span></li>
				<li><span class="command"></span> : <span class="command-info"></span></li>
			</ul>`;
			//if(isElement(out)) ("html" in out) ? out.html(helpInfo) : ("value" in out) ? out.value = helpInfo : out.innerHTML += command_separator + helpInfo;
			output(command_separator + helpInfo,out);
			return this
		}
		// init();
		// return this;
		return {init};
	};
	
	const dragElement = (handle, first, second, direction, cb) => {
		//if(isObject(handle)) {let {handle, first, second, direction, cb} = handle;}
		
		handle = $one(handle), first = $one(first), second = $one(second);
		if(isElement(handle) && isElement(first) && isElement(second)){
			let handle_dim = 0,md, // remember mouse down info
			parent = handle.parentElement, 
			ratio = parent.dataset?.splitterRatio??parent.dataset?.ratio??'50:50';
			direction = parent.dataset?.splitterOrientation??direction;
			//alert(handle.nextElementSibling.id)
			const firstElem  = first || handle.previousElementSibling;
			const secondElem = second || handle.nextElementSibling;
			const _cache = {handle: {cursor: elementStyle(handle).cursor}}
			// ----------------------------------------------------
			if(ratio){
				r = ratio.split(":");
				if(direction === "H" || direction === "horizontal"){
					handle_dim = `${(handle.offsetWidth/2)}px`;
					handle.style.left = `calc(${r[0]}% - ${handle_dim})`;
					firstElem.style.width = `calc(${r[0]}% - ${handle_dim})`;
					secondElem.style.width = `calc(${r[1]}% - ${handle_dim})`;
					if(elementStyle(parent).display === "flex"){
						//handle.style.flex = `${percentage}%`;
						firstElem.style.flex = `calc(${r[0]}% - ${handle_dim})`;
						secondElem.style.flex = `calc(${r[1]}% - ${handle_dim})`;
					}
					//firstElem.style.height = secondElem.style.height = `${parent.offsetHeight}px`;
					parent.setAttribute("data-handle-left", `calc(${r[0]}% - ${handle_dim})`);
					parent.setAttribute("data-first-panel-width", `calc(${r[0]}% - ${handle_dim})`);
					parent.setAttribute("data-second-panel-width", `calc(${r[1]}% - ${handle_dim})`);
				} else if (direction === "V" || direction === "vertical"){
					handle_dim = `${(handle.offsetHeight/2)}px`;
					handle.style.top = `calc(${r[0]}% - ${handle_dim})`;
					firstElem.style.height = `calc(${r[0]}% - ${handle_dim})`;
					secondElem.style.height = `calc(${r[1]}% - ${handle_dim})`;
					//firstElem.style.width = secondElem.style.width = `${parent.offsetWidth}px`;
					parent.setAttribute("data-handle-top", `calc(${r[0]}% - ${handle_dim})`);
					parent.setAttribute("data-first-panel-height", `calc(${r[0]}% - ${handle_dim})`);
					parent.setAttribute("data-second-panel-height", `calc(${r[1]}% - ${handle_dim})`);
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
	const calculateRatio = (ratio) => {
		if(!ratio) return false;
		/*ratio = ratio || '1:1';
		 ratio = (ratio && typeof ratio == 'string' || PBD.Utils.isArray(ratio) && ratio.length == 2) || '1:1';
		if(PBD.Utils.isArray(ratio) && ratio.length == 2){
			return [ratio[0],ratio[1]]
		} */
		var ratioValues = {
			'1:1': ['50%','50%'],
			'1:2': ['33.3%','66.6%'], '2:1': ['66.6%','33.3%'],
			'1:3': ['25%','75%'], '3:1': ['75%','25%'],
			'1:4': ['20%','80%'], '4:1': ['80%','20%'],
			'2:3': ['40%', '60%'], 
			'3:2': ['60%', '40%'], 
			//"1:4": ['25%', '75%'],
			//"4:1": ['75%', '25%']
			//"1:2": ['50%', '50%'], 
			//"2:5": ['40%', '60%'], 
			//"5:2": ['60%', '40%'], 
			//"1:5": ['20%', '80%'], 
			//"5:1": ['80%', '20%'], 
			"1:1:3": ['20%', '20%', '60%'], 
			"1:3:1": ['20%', '60%', '20%'], 
			"3:1:1": ['60%', '20%', '20%'], 
			"1:2:2": ['20%', '40%', '40%'], 
			"2:1:2": ['40%', '20%', '40%'], 
			"2:2:1": ['40%', '40%', '20%']
		};
		let ratioProp = [];
		
		for(let ratioProperty in ratioValues){
			ratioProp.push(ratioProperty);
		}
		for(let i =0;i<ratioProp.length;i++){
			if(ratio.match(ratioProp[i])){
				return [ratioValues[ratioProp[i]][0],ratioValues[ratioProp[i]][1]];
				//break;
			}
		}
		let r = ratio.split(":");
		return isArray(r) && r.length > 1 ? [`${r[0]}%`, `${r[1]}%`] : ['50%','50%'];
	};
	const draggerPanel = (options,_parent)=>{
		var $dragging = false,$currentStack=true,$panelSizeAdjust='original',$stack=options.stack||"horizontalStack",
		$parent = _parent || window,
		$dragContainer = $one(options.dragContainer||'#drag-container', _parent||null),
		$dragBar = $one(options.dragBar||'#resize-handle', _parent||null),
		$dragPanel1 = $one(options.dragPanel1||'#pane-1', _parent||null),
		$dragPanel2 = $one(options.dragPanel2||'#pane-2', _parent||null);
		
		function adjustPanelSize(panelSizeAdjust,ratio){
            var width, height,dragleft,buttonwidth,buttonheight,containerheight;
			var headerHeight = Number($header.height() !== null && $header.height() > 0 ? $header.height() : (($header.css('min-height') && $header.css('min-height') !== null && $header.css('min-height').replace('px','') > 0) ? $header.css('min-height').replace('px','') : 50));
        	var footerHeight = Number($footer.height() !== null && $footer.height() > 0 ? $footer.height() : (($footer.css('min-height') && $footer.css('min-height') !== null && $footer.css('min-height').replace('px','') > 0) ? $footer.css('min-height').replace('px','') : 50));
        	var padding = Number($($this).css('padding').replace('px',''));
        	var margin = Number($($this).css('margin').replace('px',''));
			var footerPlusHeader = (headerHeight + footerHeight);
        	containerHeight = Number($($this).height() - footerPlusHeader);
            buttonwidth = Number($dragBar.width());
			buttonheight = Number($dragBar.height());
	        ratio = calculateRatio(ratio) || ['35%','65%'];
	        if ($panelSizeAdjust == 'original'){
	            dragleft = ratio[0];
			 	$dragPanel1.css({'padding':0,'transition':'width linear 90ms','width':ratio[0]/*,'width':$panelsOriginalWidth[0]*/});
	        	$dragPanel2.css({'padding':0,'transition':'width linear 90ms','width':ratio[1]/*,'width':($panelsOriginalWidth[1].replace('px','') - 20)+'px'*/});
		        $dragBarWrapper.css({'top':((containerheight - buttonheight) / 2) + "px"});
		        //$dragBar.css({'top':((containerheight - buttonheight) / 2) + "px",'width':"15px",'height':'50px','cursor':"col-resize"});
	            $panelSizeAdjust = 'original';
				//alert(containerheight);
		        if($('#_responseContent')) {$('#_responseContent').css({'margin':0,'padding':0,'overflow':'auto','height':'auto','max-width':'auto','width':'auto'});}
	        } else /* if ($panelSizeAdjust == 'full') */ {
		        $dragPanel1.css({'padding':0,'width':'100%','height':ratio[0],'transition':'height linear 990ms'});
	        	$dragPanel2.css({'padding':0,'width':'100%','height':ratio[1],'transition':'height linear 1s'});
	            $dragBarWrapper.css({'top':((containerheight - buttonwidth) / 2) + "px"});
	            //$dragBar.css({'top':((containerheight - buttonwidth) / 2) + "px",'width':"15px",'height':'50px','cursor':"col-resize"});
	           	//$dragPanel2.css({'max-width':parseInt(viewPort[0])+'px','width':(parseInt($panelsOriginalWidth[0].replace('px','')) + parseInt($panelsOriginalWidth[1].replace('px','')) )+'px';
	        	$panelSizeAdjust = 'full';
	          	dragleft = '0';
		        if($('#_responseContent')) {$('#_responseContent').css({'margin':0,'padding':0,'overflow':'auto','height':'auto','max-width':'99.9%','width':'99.9%'});}
	        }
			//$dragBar.css({'left':dragleft,'transition':"left 1000ms linear"});
            showFrameSize();
        }
		function dragstart(e) {
			$dragging = true;
			console.log("dragging started");
		   // e.preventDefault();
		}

		function dragmove(e) {
			if ($dragging){
				$offsets1 = offsets($dragPanel1.get(0));
				$offsets2 = offsets($dragPanel2.get(0));
				//if($($dragPanel1).hasClass("verticalStack") && $($dragPanel2).hasClass("verticalStack")) {
				if($stack == "verticalStack") {
					var borderOffsets = ($offsets1.border.left + $offsets1.border.right + $offsets2.border.left + $offsets2.border.right),
					paddingOffsets = ($offsets1.padding.left + $offsets1.padding.right + $offsets2.padding.left + $offsets2.padding.right),
					marginOffsets = ($offsets1.margin.left + $offsets1.margin.right + $offsets2.margin.left + $offsets2.margin.right),
					offset = (borderOffsets + paddingOffsets + marginOffsets),
					percentage = (e.pageX / window.innerWidth) * 100;
					//percentage = (e.pageX / $container.width()) * 100;
					if (percentage > 5 && percentage < 98) {
						var mainPercentage = 100-percentage;
						/* $dragPanel1.css('width',percentage + "%");
						$dragPanel2.css('width',mainPercentage + "%"); */
						$dragPanel1.css({'width':`calc(${percentage}% - ${offset}px)`,transition:"none"});
						$dragPanel2.css({'width':`calc(${mainPercentage}% - ${offset}px)`,transition:"none"});
					}
					console.log("dragging X >> "+e.pageX+' :=> '+e.clientX);
				} else if($stack == "horizontalStack" ){
					var borderOffsets = ($offsets1.border.top + $offsets1.border.bottom + $offsets2.border.top + $offsets2.border.bottom),
					paddingOffsets = ($offsets1.padding.top + $offsets1.padding.bottom + $offsets2.padding.top + $offsets2.padding.bottom),
					marginOffsets = ($offsets1.margin.top + $offsets1.margin.bottom + $offsets2.margin.top + $offsets2.margin.bottom),
					offset = (borderOffsets + paddingOffsets + marginOffsets),
					percentage = (e.pageY / window.innerHeight) * 100;
					//var containertop = Number($($container).css("top").replace('px',''));
					//var percentage = ((e.pageY - 20) / (window.innerHeight - 20)) * 100;
					if (percentage > 5 && percentage < 98) {
						//offset = 20;
						var mainPercentage = (100 - percentage);
						/* $dragPanel1.css('height',percentage + "%");
						$dragPanel2.css('height',mainPercentage + "%"); */
						$dragPanel1.css({'height':`calc(${percentage}% - ${offset}px)`,transition:"none"});
						$dragPanel2.css({'height':`calc(${mainPercentage}% - ${offset}px)`,transition:"none"});
						
					}
					console.log("offsets:"+offset+", dragging Y >> "+mainPercentage+' :=> '+percentage);
				}
			}
		}

		function dragend() {
			$dragging = false;
			console.log("dragging ended");
			/* //$shield.css('display',"none");
			if (window.editor) {
				window.editor.refresh();
			} */
		}
		/* $dragPanel1.css({'background-color':'#ffffff','position':'relative','box-shadow':'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'});
		$dragPanel2.css({'-webkit-overflow-scrolling':'touch','background-color':'#ffffff','box-shadow':'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'});
		$panelsOriginalWidth = [$dragPanel1.width(),$dragPanel2.width()];
		//setElements();
		//showFrameSize();
		if ((window.screen.availWidth <= 768 && window.innerHeight > window.innerWidth) || "" == " horizontalStack") {$restack(true);}
		$( window).on("load",function(e){setElements();showFrameSize();adjustPanelSize($panelSizeAdjust,$panelSizeRatio);}); */

		$dragBar.get(0).addEventListener("mousedown",function(e){dragstart(e);});
		$dragBar.get(0).addEventListener("touchstart",function(e){dragstart(e);});
		$parent.addEventListener("mousemove",function(e){dragmove(e);});
		$parent.addEventListener("touchmove",function(e){dragmove(e);});
		$parent.addEventListener("mouseup",function(e){dragend(e);});
		$parent.addEventListener("touchend",function(e){dragend(e);});
	}
	const fourWayDragger = (options)=>{
		var $dragContainer = $one(options.dragContainer),$dragPanelsWrapper = $one(options.dragPanelsWrapper,$dragContainer);
		if(!isElement($dragContainer)) return false;
		if(options.dragPanelsWrapper) {if(options.dragPanelsWrapper.match(/^#/)){var dpw_sel = "id",dpw_id = options.dragPanelsWrapper.replace('#','');} else {var dpw_sel = "className",dpw_id = options.dragPanelsWrapper.replace('.','');}}
		if(options.dragPanel1) {
			var dp1 = format(options.dragPanel1),dp1_sel = dp1.sel_id,dp1_id = dp1.sel_val,dp1_cont = dp1.innerContent,bgcolor1 = dp1.bgColor,selector1 = dp1.selector;
		}
		if(options.dragPanel2) {
			var dp2 = format(options.dragPanel2),dp2_sel = dp2.sel_id,dp2_id = dp2.sel_val,dp2_cont = dp2.innerContent,bgcolor2 = dp2.bgColor,selector2 = dp2.selector;
		}
		if(options.dragPanel3) {
			var dp3 = format(options.dragPanel3),dp3_sel = dp3.sel_id,dp3_id = dp3.sel_val,dp3_cont = dp3.innerContent,bgcolor3 = dp3.bgColor,selector3 = dp3.selector;
		}
		if(options.dragPanel4) {
			var dp4 = format(options.dragPanel4),dp4_sel = dp4.sel_id,dp4_id = dp4.sel_val,dp4_cont = dp4.innerContent,bgcolor4 = dp4.bgColor,selector4 = dp4.selector;
		}
		if(isElement($dragPanelsWrapper)){
			var $dragBar = $one(options.dragBar,$dragContainer),$dragShield = $one(options.dragShield,$dragContainer), 
			$dragPanel1 = $one(selector1,$dragPanelsWrapper), $dragPanel2 = $one(selector2,$dragPanelsWrapper),$dragPanel3 = $one(selector3,$dragPanelsWrapper), $dragPanel4 = $one(selector4,$dragPanelsWrapper);
			if(isElement($dragPanel1)) $dragPanel1["innerHTML"] += dp1_cont??"";
			if(isElement($dragPanel2)) $dragPanel2["innerHTML"] += dp2_cont??"";
			if(isElement($dragPanel3)) $dragPanel3["innerHTML"] += dp3_cont??"";
			if(isElement($dragPanel4)) $dragPanel4["innerHTML"] += dp4_cont??"";
		} else {
			var $dragPanelsWrapper = tag$1("div",{"style":""},
				$dragPanel1 = tag$1("div",{"style":""}),
				$dragPanel2 = tag$1("div",{"style":""}),
				$dragPanel3 = tag$1("div",{"style":""}),
				$dragPanel4 = tag$1("div",{"style":""})
			),
			$dragShield = tag$1("div",{"id":"","class":"","style":""}),
			$dragBar = tag$1("div",{"id":"","class":"","style":""});

			$dragPanelsWrapper[dpw_sel??"id"] = dpw_id??"drag-panel-wrapper";
			$dragPanel1[dp1_sel??"id"] = dp1_id??"drag-panel-1";
			$dragPanel1["innerHTML"] = dp1_cont??"";
			$dragPanel2[dp2_sel??"id"] = dp2_id??"drag-panel-2";
			$dragPanel2["innerHTML"] = dp2_cont??"";
			$dragPanel3[dp3_sel??"id"] = dp3_id??"drag-panel-3";
			$dragPanel3["innerHTML"] = dp3_cont??"";
			$dragPanel4[dp4_sel??"id"] = dp4_id??"drag-panel-4";
			$dragPanel4["innerHTML"] = dp4_cont??"";
			
			$dragContainer.appendChild($dragPanelsWrapper);
			$dragContainer.appendChild($dragBar);
			$dragContainer.appendChild($dragShield);
		}
		var textcolor = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6),
		$dragging = false;
			
		$dragContainer.style.height = (window.innerHeight-40)+"px";
		$dragPanelsWrapper.style.cssText += "display:flex;flex-direction:row;flex-wrap: wrap;width:100%;height:100%;";
		$dragPanel1.style.cssText += `position:relative;display:inline-flex;height:50%;width:50%;overflow:auto;background-color:${bgcolor1};color:${textcolor};`;
		$dragPanel2.style.cssText += `position:relative;display:inline-flex;height:50%;width:50%;overflow:auto;background-color:${bgcolor2};color:${textcolor};`;
		$dragPanel3.style.cssText += `position:relative;display:inline-flex;height:50%;width:50%;overflow:auto;background-color:${bgcolor3};color:${textcolor};`;
		$dragPanel4.style.cssText += `position:relative;display:inline-flex;height:50%;width:50%;overflow:auto;background-color:${bgcolor4};color:${textcolor};`;
		$dragBar.style.cssText += "z-index:11;position:absolute;top:calc(50% - 5px);left:calc(50% - 10px);width:20px;height:20px;display:flex;justify-content:center;align-items:center;font-size:50%;background-color:#444;border-radius:3px;cursor:grab;color:#fff;transition:none;";
		
		function dragstart(e){$dragging = true;console.log("dragging started");if(isElement($dragShield)) $dragShield.style.display = "block";e.preventDefault();}
		function dragend(e){$dragging = false;console.log("dragging ended");if(isElement($dragShield)) $dragShield.style.display = "none";e.preventDefault();}
		function dragmove(e){
			if($dragging){
				var percentageX = (e.pageX / window.innerWidth) * 100, mainPercentageX = 100-percentageX,
				percentageY = (e.pageY / window.innerHeight) * 100, mainPercentageY = 100-percentageY;
				if (percentageX > 5 && percentageX < 95 && percentageY > 5 && percentageY < 95) {
					$dragBar.style.cssText += `top:${(e.pageY-5)}px;left:${(e.pageX-5)}px;`;
					css($dragPanel1,{'width':percentageX + "%",'height':percentageY + "%"});
					css($dragPanel2,{'width':mainPercentageX + "%",'height':percentageY + "%"});
					css($dragPanel3,{'width':percentageX + "%",'height':mainPercentageY + "%"});
					css($dragPanel4,{'width':mainPercentageX + "%",'height':mainPercentageY + "%"});
				}
			}
		}
		function format(obj){
			var selector,sel_id,sel_val,innerContent = "",bg = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6);
			if(isString(obj) && (obj.match(/^#/) || obj.startWith('#') || obj.match(/^./) || obj.startWith('.'))) {
				if(obj.match(/^#/)){sel_id = "id";sel_val = obj.replace('#','');} else {sel_id = "className";sel_val = obj.replace('.','');}
				bgColor = bg;
				selector = obj;
			} else if(isPlainObject(obj)){
				selector = obj.selector??"";
				if(selector.match(/^#/)){sel_id = "id";sel_val = selector.replace('#','');} else {sel_id = "className";sel_val = selector.replace('.','');}
				innerContent = obj.innerContent??"";
				bgColor = obj.bgColor??bg;
			}
			return {sel_id,sel_val,innerContent,bgColor,selector};
		}
		$dragBar.addEventListener("mousedown",function(e){dragstart(e);});
		$dragBar.addEventListener("touchstart",function(e){dragstart(e);});
		window.addEventListener("mousemove",function(e){dragmove(e);});
		window.addEventListener("touchmove",function(e){dragmove(e);});
		window.addEventListener("mouseup",function(e){dragend(e);});
		window.addEventListener("touchend",function(e){dragend(e);});
		return;
	}
	const niceBytes = (size, skipSmallSizes) => {
		var humanList = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		// Calculate Log with base 1024: size = 1024 ** order
		var order = size > 0 ? Math.floor(Math.log(size) / Math.log(1024)) : 0;
		// Stay in range of the byte sizes that are defined
		order = Math.min(humanList.length - 1, order);
		var readableFormat = humanList[order];
		var relativeSize = (size / Math.pow(1024, order)).toFixed(1);
		if(skipSmallSizes === true && order === 0) {
			if(relativeSize !== "0.0"){
				return '< 1KB';
			} else {
				return '0KB';
			}
		}
		if(order < 2){
			relativeSize = parseFloat(relativeSize).toFixed(0);
		} else if(relativeSize.substr(relativeSize.length-2,2)==='.0'){
			relativeSize=relativeSize.substr(0,relativeSize.length-2);
		}
		return relativeSize + '' + readableFormat;
	}
	const convert_bits = (bytes) => {var kb = bytes / 1024;if(kb < 1024){return Math.round(kb) + ' KB';} else {mb = kb / 1024;return Math.round(mb * 10) / 10 + ' MB';}};

	const w3_langs = ["css","js","java","kotlin","php","python","sql"];
	const w3CodeColorize = (x, lang) => {
		var tagcolor = "mediumblue",tagnamecolor = "brown",attributecolor = "red",attributevaluecolor = "mediumblue",commentcolor = "green",
		cssselectorcolor = "brown",csspropertycolor = "red",csspropertyvaluecolor = "mediumblue",cssdelimitercolor = "black",cssimportantcolor = "red",
		jscolor = "black",jskeywordcolor = "mediumblue",jsstringcolor = "brown",jsstringtempcolor = "#f50",jsnumbercolor = "red",jspropertycolor = "black",
		javacolor = "black",javakeywordcolor = "mediumblue",javastringcolor = "brown",javanumbercolor = "red",javapropertycolor = "black",
		kotlincolor = "black",kotlinkeywordcolor = "mediumblue",kotlinstringcolor = "brown",kotlinnumbercolor = "red",kotlinpropertycolor = "black",
		phptagcolor = "red",phpcolor = "black",phpkeywordcolor = "mediumblue",phpglobalcolor = "goldenrod",phpstringcolor = "brown",phpnumbercolor = "red",
		pythoncolor = "black",pythonkeywordcolor = "mediumblue",pythonstringcolor = "brown",pythonnumbercolor = "red",
		angularstatementcolor = "red",sqlcolor = "black",sqlkeywordcolor = "mediumblue",sqlstringcolor = "brown",sqlnumbercolor = "";
		
		//if (!lang) {lang = "html";}
		if (lang == "html" || lang == "htm" || lang == "xml") {return htmlMode(x);}
		if (lang == "css") {return cssMode(x);}
		if (lang == "js" || lang == "javascript" || lang == "json") {return jsMode(x);}
		if (lang == "java") {return javaMode(x);}
		if (lang == "kotlin") {return kotlinMode(x);}
		if (lang == "php") {return phpMode(x);}
		if (lang == "python") {return pythonMode(x);}
		if (lang == "sql") {return sqlMode(x);}  
		if (!lang || !inArray(lang, w3_langs)) {lang = "html";return htmlMode(x);}
		
		return x;
		
		function extract(str, start, end, func, repl) {var s, e, d = "", a = [];while (str.search(start) > -1) {s = str.search(start);e = str.indexOf(end, s);if (e == -1) {e = str.length;}if (repl) {a.push(func(str.substring(s, e + (end.length))));str = str.substring(0, s) + repl + str.substr(e + (end.length));} else {d += str.substring(0, s);d += func(str.substring(s, e + (end.length)));str = str.substr(e + (end.length));}}this.rest = d + str;this.arr = a;}
		function htmlMode(txt) {var rest = txt, done = "", php, comment, angular, startpos, endpos, note, i;php = new extract(rest, "&lt;\\?php", "?&gt;", phpMode, "W3PHPPOS");rest = php.rest;comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");rest = comment.rest;while (rest.indexOf("&lt;") > -1) {note = "";startpos = rest.indexOf("&lt;");if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {note = "css";}if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {note = "javascript";}endpos = rest.indexOf("&gt;", startpos);if (endpos == -1) {endpos = rest.length;}done += rest.substring(0, startpos);done += tagMode(rest.substring(startpos, endpos + 4));rest = rest.substr(endpos + 4);if (note == "css") {endpos = rest.indexOf("&lt;/style&gt;");if (endpos > -1) {done += cssMode(rest.substring(0, endpos));rest = rest.substr(endpos);}}if (note == "javascript") {endpos = rest.indexOf("&lt;/script&gt;");if (endpos > -1) {done += jsMode(rest.substring(0, endpos));rest = rest.substr(endpos);}}}rest = done + rest;angular = new extract(rest, "{{", "}}", angularMode);rest = angular.rest;for (i = 0; i < comment.arr.length; i++) {rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);}for (i = 0; i < php.arr.length; i++) {rest = rest.replace("W3PHPPOS", php.arr[i]);}return rest;}
		function tagMode(txt) {var rest = txt, done = "", startpos, endpos, result;while (rest.search(/(\s|<br>)/) > -1) {startpos = rest.search(/(\s|<br>)/);endpos = rest.indexOf("&gt;");if (endpos == -1) {endpos = rest.length;}done += rest.substring(0, startpos);done += attributeMode(rest.substring(startpos, endpos));rest = rest.substr(endpos);}result = done + rest;result = "<span class='tagcolor' style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);if (result.substr(result.length - 4, 4) == "&gt;") {result = result.substring(0, result.length - 4) + "<span class='tagcolor' style=color:" + tagcolor + ">&gt;</span>";}return "<span class='tagnamecolor' style=color:" + tagnamecolor + ">" + result + "</span>";}
		function attributeMode(txt) {var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;while (rest.indexOf("=") > -1) {endpos = -1;startpos = rest.indexOf("=");singlefnuttpos = rest.indexOf("'", startpos);doublefnuttpos = rest.indexOf('"', startpos);spacepos = rest.indexOf(" ", startpos + 2);if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {endpos = rest.indexOf(" ", startpos);} else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);} else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);}if (!endpos || endpos == -1 || endpos < startpos) {endpos = rest.length;}done += rest.substring(0, startpos);done += attributeValueMode(rest.substring(startpos, endpos + 1));rest = rest.substr(endpos + 1);}return "<span class='attributecolor' style=color:" + attributecolor + ">" + done + rest + "</span>";}
		function attributeValueMode(txt) {return "<span class='attributevaluecolor' style=color:" + attributevaluecolor + ">" + txt + "</span>";}
		function angularMode(txt) {return "<span class='angularstatementcolor' style=color:" + angularstatementcolor + ">" + txt + "</span>";}
		function commentMode(txt) {return "<span class='commentcolor' style=color:" + commentcolor + ">" + txt + "</span>";}
		function cssMode(txt) {var rest = txt, done = "", s, e, comment, i, midz, c, cc;comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");rest = comment.rest;while (rest.search("{") > -1) {s = rest.search("{");midz = rest.substr(s + 1);cc = 1;c = 0;for (i = 0; i < midz.length; i++) {if (midz.substr(i, 1) == "{") {cc++; c++}if (midz.substr(i, 1) == "}") {cc--;}if (cc == 0) {break;}}if (cc != 0) {c = 0;}e = s;for (i = 0; i <= c; i++) {e = rest.indexOf("}", e + 1);}if (e == -1) {e = rest.length;}done += rest.substring(0, s + 1);done += cssPropertyMode(rest.substring(s + 1, e));rest = rest.substr(e);}rest = done + rest;rest = rest.replace(/{/g, "<span class='cssdelimitercolor' style=color:" + cssdelimitercolor + ">{</span>");rest = rest.replace(/}/g, "<span class='cssdelimitercolor' style=color:" + cssdelimitercolor + ">}</span>");for (i = 0; i < comment.arr.length; i++) {rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);}return "<span class='cssselectorcolor' style=color:" + cssselectorcolor + ">" + rest + "</span>";}
		function cssPropertyMode(txt) {var rest = txt, done = "", s, e, n, loop;if (rest.indexOf("{") > -1 ) { return cssMode(rest); }while (rest.search(":") > -1) {s = rest.search(":");loop = true;n = s;while (loop == true) {loop = false;e = rest.indexOf(";", n);if (rest.substring(e - 5, e + 1) == "&nbsp;") {loop = true;n = e + 1;}}if (e == -1) {e = rest.length;}done += rest.substring(0, s);done += cssPropertyValueMode(rest.substring(s, e + 1));rest = rest.substr(e + 1);}return "<span class='csspropertycolor' style=color:" + csspropertycolor + ">" + done + rest + "</span>";}
		function cssPropertyValueMode(txt) {var rest = txt, done = "", s;rest = "<span class='cssdelimitercolor' style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);while (rest.search(/!important/i) > -1) {s = rest.search(/!important/i);done += rest.substring(0, s);done += cssImportantMode(rest.substring(s, s + 10));rest = rest.substr(s + 10);}result = done + rest;if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {result = result.substring(0, result.length - 1) + "<span class='cssdelimitercolor' style=color:" + cssdelimitercolor + ">;</span>";}return "<span class='csspropertyvaluecolor' style=color:" + csspropertyvaluecolor + ">" + result + "</span>";}
		function cssImportantMode(txt) {return "<span class='cssimportantcolor' style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";}
		function jsMode(txt) {var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;for (i = 0; i < rest.length; i++)  {cc = rest.substr(i, 1);if (cc == "\\") {esc.push(rest.substr(i, 2));cc = "W3JSESCAPE";i++;}tt += cc;}rest = tt;y = 1;while (y == 1) {sfnuttpos = getPos(rest, "'", "'", jsStringMode);dfnuttpos = getPos(rest, '"', '"', jsStringMode);bfnuttpos = getPos(rest, '`', '`', jsStringTempMode);compos = getPos(rest, /\/\*/, "*/", commentMode);comlinepos = getPos(rest, /\/\//, "<br>", commentMode);numpos = getNumPos(rest, jsNumberMode);keywordpos = getKeywordPos("js", rest, jsKeywordMode);dotpos = getDotPos(rest, jsPropertyMode);if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], bfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {break;}mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, bfnuttpos, compos, comlinepos, keywordpos, dotpos);if (mypos[0] == -1) {break;}if (mypos[0] > -1) {done += rest.substring(0, mypos[0]);done += mypos[2](rest.substring(mypos[0], mypos[1]));rest = rest.substr(mypos[1]);}}rest = done + rest;for (i = 0; i < esc.length; i++) {rest = rest.replace("W3JSESCAPE", esc[i]);}return "<span class='jscolor' style=color:" + jscolor + ">" + rest + "</span>";}
		function jsStringMode(txt) {return "<span class='jsstringcolor' style=color:" + jsstringcolor + ">" + txt + "</span>";}
		function jsStringTempMode(txt) {return "<span class='jsstringtempcolor' style=color:" + jsstringtempcolor + ">" + txt + "</span>";}
		function jsKeywordMode(txt) {return "<span class='jskeywordcolor' style=color:" + jskeywordcolor + ">" + txt + "</span>";}
		function jsNumberMode(txt) {return "<span class='jsnumbercolor' style=color:" + jsnumbercolor + ">" + txt + "</span>";}
		function jsPropertyMode(txt) {return "<span class='jspropertycolor' style=color:" + jspropertycolor + ">" + txt + "</span>";}
		function getDotPos(txt, func) {var x, i, j, s, e, arr = [".","<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%"];s = txt.indexOf(".");if (s > -1) {x = txt.substr(s + 1);for (j = 0; j < x.length; j++) {cc = x[j];for (i = 0; i < arr.length; i++) {if (cc.indexOf(arr[i]) > -1) {e = j;return [s + 1, e + s + 1, func];}}}}return [-1, -1, func];}
		function getMinPos() {var i, arr = [];for (i = 0; i < arguments.length; i++) {if (arguments[i][0] > -1) {if (arr.length == 0 || arguments[i][0] < arr[0]) {arr = arguments[i];}}}if (arr.length == 0) {arr = arguments[i];}return arr;}
		function javaMode(txt) {var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;for (i = 0; i < rest.length; i++)  {cc = rest.substr(i, 1);if (cc == "\\") {esc.push(rest.substr(i, 2));cc = "W3JSESCAPE";i++;}tt += cc;}rest = tt;y = 1;while (y == 1) {sfnuttpos = getPos(rest, "'", "'", javaStringMode);dfnuttpos = getPos(rest, '"', '"', javaStringMode);compos = getPos(rest, /\/\*/, "*/", commentMode);comlinepos = getPos(rest, /\/\//, "<br>", commentMode);numpos = getNumPos(rest, javaNumberMode);keywordpos = getKeywordPos("java", rest, javaKeywordMode);dotpos = getDotPos(rest, javaPropertyMode);if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {break;}mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);if (mypos[0] == -1) {break;}if (mypos[0] > -1) {done += rest.substring(0, mypos[0]);done += mypos[2](rest.substring(mypos[0], mypos[1]));rest = rest.substr(mypos[1]);}}rest = done + rest;for (i = 0; i < esc.length; i++) {rest = rest.replace("W3JSESCAPE", esc[i]);}return "<span class='javacolor' style=color:" + javacolor + ">" + rest + "</span>";}
		function javaStringMode(txt) {return "<span class='javastringcolor' style=color:" + javastringcolor + ">" + txt + "</span>";}
		function javaKeywordMode(txt) {return "<span class='javakeywordcolor' style=color:" + javakeywordcolor + ">" + txt + "</span>";}
		function javaNumberMode(txt) {return "<span class='javanumbercolor' style=color:" + javanumbercolor + ">" + txt + "</span>";}
		function javaPropertyMode(txt) {return "<span class='javapropertycolor' style=color:" + javapropertycolor + ">" + txt + "</span>";}
		function kotlinMode(txt) {var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;for (i = 0; i < rest.length; i++) {cc = rest.substr(i, 1);if (cc == "\\") {esc.push(rest.substr(i, 2));cc = "W3JSESCAPE";i++;}tt += cc;}rest = tt;y = 1;while (y == 1) {sfnuttpos = getPos(rest, "'", "'", kotlinStringMode);dfnuttpos = getPos(rest, '"', '"', kotlinStringMode);compos = getPos(rest, /\/\*/, "*/", commentMode);comlinepos = getPos(rest, /\/\//, "<br>", commentMode);numpos = getNumPos(rest, kotlinNumberMode);keywordpos = getKeywordPos("kotlin", rest, kotlinKeywordMode);dotpos = getDotPos(rest, kotlinPropertyMode);if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {break;}mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);if (mypos[0] == -1) {break;}if (mypos[0] > -1) {done += rest.substring(0, mypos[0]);done += mypos[2](rest.substring(mypos[0], mypos[1]));rest = rest.substr(mypos[1]);}}rest = done + rest;for (i = 0; i < esc.length; i++) {rest = rest.replace("W3JSESCAPE", esc[i]);}return "<span class='kotlincolor' style=color:" + kotlincolor + ">" + rest + "</span>";}
		function kotlinStringMode(txt) {return "<span class='kotlinstringcolor' style=color:" + kotlinstringcolor + ">" + txt + "</span>";}
		function kotlinKeywordMode(txt) {return "<span class='kotlinkeywordcolor' style=color:" + kotlinkeywordcolor + ">" + txt + "</span>";}
		function kotlinNumberMode(txt) {return "<span class='kotlinnumbercolor' style=color:" + kotlinnumbercolor + ">" + txt + "</span>";}
		function kotlinPropertyMode(txt) {return "<span class='kotlinpropertycolor' style=color:" + kotlinpropertycolor + ">" + txt + "</span>";}
		function sqlMode(txt) {var rest = txt, y, done = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos;y = 1;while (y == 1) {sfnuttpos = getPos(rest, "'", "'", sqlStringMode);dfnuttpos = getPos(rest, '"', '"', sqlStringMode);compos = getPos(rest, /\/\*/, "*/", commentMode);comlinepos = getPos(rest, /--/, "<br>", commentMode);numpos = getNumPos(rest, sqlNumberMode);keywordpos = getKeywordPos("sql", rest, sqlKeywordMode);if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0]) == -1) {break;}mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos);if (mypos[0] == -1) {break;}if (mypos[0] > -1) {done += rest.substring(0, mypos[0]);done += mypos[2](rest.substring(mypos[0], mypos[1]));rest = rest.substr(mypos[1]);}}rest = done + rest;return "<span class='sqlcolor' style=color:" + sqlcolor + ">" + rest + "</span>";}
		function sqlStringMode(txt) {return "<span class='sqlstringcolor' style=color:" + sqlstringcolor + ">" + txt + "</span>";}
		function sqlKeywordMode(txt) {return "<span class='sqlkeywordcolor' style=color:" + sqlkeywordcolor + ">" + txt + "</span>";}
		function sqlNumberMode(txt) {return "<span class='sqlnumbercolor' style=color:" + sqlnumbercolor + ">" + txt + "</span>";}
		function phpMode(txt) {var rest = txt, done = "", sfnuttpos, dfnuttpos, compos, comlinepos, comhashpos, keywordpos, mypos, y;y = 1;while (y == 1) {sfnuttpos = getPos(rest, "'", "'", phpStringMode);dfnuttpos = getPos(rest, '"', '"', phpStringMode);compos = getPos(rest, /\/\*/, "*/", commentMode);comlinepos = getPos(rest, /\/\//, "<br>", commentMode);comhashpos = getPos(rest, "#", "<br>", commentMode);numpos = getNumPos(rest, phpNumberMode);keywordpos = getKeywordPos("php", rest, phpKeywordMode);if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], comhashpos[0], keywordpos[0]) == -1) {break;}mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, comhashpos, keywordpos);if (mypos[0] == -1) {break;}if (mypos[0] > -1) {done += rest.substring(0, mypos[0]);done += mypos[2](rest.substring(mypos[0], mypos[1]));rest = rest.substr(mypos[1]);}}rest = done + rest;rest = "<span class='phptagcolor' style=color:" + phptagcolor + ">&lt;" + rest.substr(4, 4) + "</span>" + rest.substring(8);if (rest.substr(rest.length - 5, 5) == "?&gt;") {rest = rest.substring(0, rest.length - 5) + "<span class='phptagcolor' style=color:" + phptagcolor + ">?&gt;</span>";}return "<span class='phpcolor' style=color:" + phpcolor + ">" + rest + "</span>";}
		function phpStringMode(txt) {return "<span class='phpstringcolor' style=color:" + phpstringcolor + ">" + txt + "</span>";}
		function phpNumberMode(txt) {return "<span class='phpnumbercolor' style=color:" + phpnumbercolor + ">" + txt + "</span>";}
		function phpKeywordMode(txt) {var glb = ["$GLOBALS","$_SERVER","$_REQUEST","$_POST","$_GET","$_FILES","$_ENV","$_COOKIE","$_SESSION"];if (glb.indexOf(txt.toUpperCase()) > -1) {if (glb.indexOf(txt) > -1) {return "<span class='phpglobalcolor' style=color:" + phpglobalcolor + ">" + txt + "</span>";} else {return txt;}} else {return "<span class='phpkeywordcolor' style=color:" + phpkeywordcolor + ">" + txt + "</span>";}}
		function pythonMode(txt) {var rest = txt, done = "", sfnuttpos, dfnuttpos, compos, comlinepos, comhashpos, keywordpos, mypos, y;y = 1;while (y == 1) {sfnuttpos = getPos(rest, "'", "'", pythonStringMode);dfnuttpos = getPos(rest, '"', '"', pythonStringMode);compos = getPos(rest, /\/\*/, "*/", commentMode);comhashpos = getPos(rest, "#", "<br>", commentMode);numpos = getNumPos(rest, pythonNumberMode);keywordpos = getKeywordPos("python", rest, pythonKeywordMode);if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comhashpos[0], keywordpos[0]) == -1) {break;}mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comhashpos, keywordpos);if (mypos[0] == -1) {break;}if (mypos[0] > -1) {done += rest.substring(0, mypos[0]);done += mypos[2](rest.substring(mypos[0], mypos[1]));rest = rest.substr(mypos[1]);}}rest = done + rest;return "<span class='pythoncolor' style=color:" + pythoncolor + ">" + rest + "</span>";}
		function pythonStringMode(txt) {return "<span class='pythonstringcolor' style=color:" + pythonstringcolor + ">" + txt + "</span>";}
		function pythonNumberMode(txt) {return "<span class='pythonnumbercolor' style=color:" + pythonnumbercolor + ">" + txt + "</span>";}
		function pythonKeywordMode(txt) {return "<span class='pythonkeywordcolor' style=color:" + pythonkeywordcolor + ">" + txt + "</span>";}
		function getKeywordPos(typ, txt, func) {
			var words, i, pos, rpos = -1, rpos2 = -1, patt;
			if (typ == "js") {
			  words = ["abstract","arguments","async","await","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete",
			  "do","double","else","enum","eval","event","export","extends","false","final","finally","float","for","function","goto","if","implements","import",
			  "in","instanceof","int","interface","let","long","NaN","native","new","null","package","private","protected","public","return","short","static",
			  "super","switch","synchronized","then","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"];
			} else if (typ == "java") {
			  words = ["abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete",
			  "do","double","else","enum","eval","event","export","extends","false","final","finally","float","for","function","goto","if","implements","import",
			  "in","instanceof","int","interface","let","long","NaN","native","new","null","package","private","protected","public","return","short","static",
			  "super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield",
			  "String"];
			} else if (typ == "kotlin") {
			  words = ['package','as','typealias','class','interface','this','super','val','operator','var','fun','for','is','in','This','throw','return',
			  'annotation','break','continue','object','if','else','while','do','try','when','!in','!is','as?','file','import','where','by','get','set',
			  'abstract','enum','open','inner','override','private','public','internal','protected','catch','finally','out','final','vararg','reified',
			  'dynamic','companion','constructor','init','sealed','field','property','receiver','param','sparam','lateinit','data','inline','noinline',
			  'tailrec','external','annotation','crossinline','const','operator','infix','suspend','actual','expect','setparam','Boolean','Byte','Character',
			  'CharSequence','Class','ClassLoader','Cloneable','Comparable','Compiler','Double','Exception','Float','Integer','Long','Math','Number','Object',
			  'Package','Pair','Process','Runtime','Runnable','SecurityManager','Short','StackTraceElement','StrictMath','String','StringBuffer','System',
			  'Thread','ThreadGroup','ThreadLocal','Throwable','Triple','Void','Annotation','Any','BooleanArray','ByteArray','Char','CharArray',
			  'DeprecationLevel','DoubleArray','Enum','FloatArray','Function','Int','IntArray','Lazy','LazyThreadSafetyMode','LongArray','Nothing','ShortArray','Unit'];
			} else if (typ == "php") {
			  words = ["$GLOBALS","$_SERVER","$_REQUEST","$_POST","$_GET","$_FILES","$_ENV","$_COOKIE","$_SESSION",
			  "__halt_compiler","abstract","and","array","as","break","callable","case","catch","class","clone","const","continue","declare","default",
			  "die","do","echo","else","elseif","empty","enddeclare","endfor","endforeach","endif","endswitch","endwhile","eval","exit","extends","final","for",
			  "foreach","function","global","goto","if","implements","include","include_once","instanceof","insteadof","interface","isset","list","namespace","new",
			  "or","print","private","protected","public","require","require_once","return","static","switch","throw","trait","try","unset","use","var","while","xor"];
			} else if (typ == "sql") {
			  words = ["ADD","EXTERNAL","PROCEDURE","ALL","FETCH","PUBLIC","ALTER","FILE","RAISERROR","AND","FILLFACTOR","READ","ANY","READTEXT","AS","FOREIGN",
			  "RECONFIGURE","ASC","FREETEXT","REFERENCES","AUTHORIZATION","FREETEXTTABLE","REPLICATION","BACKUP","FROM","RESTORE","BEGIN","FULL","RESTRICT","BETWEEN",
			  "FUNCTION","RETURN","BREAK","GOTO","REVERT","BROWSE","GRANT","REVOKE","BULK","GROUP","RIGHT","BY","HAVING","ROLLBACK","CASCADE","HOLDLOCK","ROWCOUNT",
			  "CASE","IDENTITY","ROWGUIDCOL","CHECK","IDENTITY_INSERT","RULE","CHECKPOINT","IDENTITYCOL","SAVE","CLOSE","IF","SCHEMA","CLUSTERED","IN",
			  "SECURITYAUDIT","COALESCE","INDEX","SELECT","COLLATE","INNER","SEMANTICKEYPHRASETABLE","COLUMN","INSERT","SEMANTICSIMILARITYDETAILSTABLE","COMMIT",
			  "INTERSECT","SEMANTICSIMILARITYTABLE","COMPUTE","INTO","SESSION_USER","CONSTRAINT","IS","SET","CONTAINS","JOIN","SETUSER","CONTAINSTABLE","KEY",
			  "SHUTDOWN","CONTINUE","KILL","SOME","CONVERT","LEFT","STATISTICS","CREATE","LIKE","SYSTEM_USER","CROSS","LINENO","TABLE","CURRENT","LOAD","TABLESAMPLE",
			  "CURRENT_DATE","MERGE","TEXTSIZE","CURRENT_TIME","NATIONAL","THEN","CURRENT_TIMESTAMP","NOCHECK","TO","CURRENT_USER","NONCLUSTERED","TOP","CURSOR",
			  "NOT","TRAN","DATABASE","NULL","TRANSACTION","DBCC","NULLIF","TRIGGER","DEALLOCATE","OF","TRUNCATE","DECLARE","OFF","TRY_CONVERT","DEFAULT","OFFSETS",
			  "TSEQUAL","DELETE","ON","UNION","DENY","OPEN","UNIQUE","DESC","OPENDATASOURCE","UNPIVOT","DISK","OPENQUERY","UPDATE","DISTINCT","OPENROWSET",
			  "UPDATETEXT","DISTRIBUTED","OPENXML","USE","DOUBLE","OPTION","USER","DROP","OR","VALUES","DUMP","ORDER","VARYING","ELSE","OUTER","VIEW","END",
			  "OVER","WAITFOR","ERRLVL","PERCENT","WHEN","ESCAPE","PIVOT","WHERE","EXCEPT","PLAN","WHILE","EXEC","PRECISION","WITH","EXECUTE","PRIMARY",
			  "WITHIN GROUP","EXISTS","PRINT","WRITETEXT","EXIT","PROC","LIMIT","MODIFY","COUNT","REPLACE"];
			} else if (typ == "python") {
			  words = ["as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "False", "finally", "for", "from", "global", "if", "import",
			  "lambda", "pass", "raise", "return", "try", "while", "with", "yield", "in", "abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr",
			  "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr",
			  "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max",
			  "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice",
			  "sorted", "staticmethod", "str", "sum", "super", "tuple", "True", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__"];
			}
			for (i = 0; i < words.length; i++) {if (typ == "php" || typ == "sql") {pos = txt.toLowerCase().indexOf(words[i].toLowerCase());} else {pos = txt.indexOf(words[i]);}if (pos > -1) {patt = /\W/g;if (txt.substr(pos + words[i].length,1).match(patt) && txt.substr(pos - 1,1).match(patt)) {if (pos > -1 && (rpos == -1 || pos < rpos)) {rpos = pos;rpos2 = rpos + words[i].length;}}}}
			return [rpos, rpos2, func];
		}
		function getPos(txt, start, end, func) {var s, e;s = txt.search(start);e = txt.indexOf(end, s + (end.length));if (e == -1) {e = txt.length;}return [s, e + (end.length), func];}
		function getNumPos(txt, func) {var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;for (i = 0; i < txt.length; i++) {for (j = 0; j < arr.length; j++) {c = txt.substr(i, arr[j].length);if (c == arr[j]) {if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {continue;}endpos = i;if (startpos < endpos) {word = txt.substring(startpos, endpos);if (!isNaN(word)) {return [startpos, endpos, func];}}i += arr[j].length;startpos = i;i -= 1;break;}}}return [-1, -1, func];}
	}
	
	const markdown = (str) => {
		// Replaces 'regex' with 'replacement' in 'str'
		// Curry function, usage: replaceRegex(regexVar, replacementVar) (strVar)
		const replaceRegex = function(regex, replacement){return function(str){return str.replace(regex, replacement);}}
		// Regular expressions for Markdown (a bit strict, but they work)
		const codeBlockRegex = /((\n\t)(.*))+/g;
		//const inlineCodeRegex = /(`)(.*?)\1/g;
		const inlineCodeRegex = /\s\`\`\`\n?([^`]+)\`\`\`/g;
		const imageRegex = /!\[([^\[]+)\]\(([^\)]+)\)/g;
		const linkRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
		const headingRegex = /\n(#+\s*)(.*)/g;
		const boldItalicsRegex = /(\*{1,2})(.*?)\1/g;
		const strikethroughRegex = /(\~\~)(.*?)\1/g;
		const blockquoteRegex = /\n(&gt;|\>)(.*)/g;
		const horizontalRuleRegex = /\n((\-{3,})|(={3,}))/g;
		const unorderedListRegex = /(\n\s*(\-|\+)\s.*)+/g;
		const orderedListRegex = /(\n\s*([0-9]+\.)\s.*)+/g;
		const paragraphRegex = /\n+(?!<pre>)(?!<h)(?!<ul>)(?!<blockquote)(?!<hr)(?!\t)([^\n]+)\n/g;
		// Replacer functions for Markdown
		const codeBlockReplacer = function(fullMatch){return '\n<pre>' + fullMatch + '</pre>';}
		const inlineCodeReplacer = function(fullMatch, tagStart, tagContents){return '<code>' + tagContents + '</code>';}
		const imageReplacer = function(fullMatch, tagTitle, tagURL){return '<img src="' + tagURL + '" alt="' + tagTitle + '" />';}
		const linkReplacer = function(fullMatch, tagTitle, tagURL){return '<a href="' + tagURL + '">' + tagTitle + '</a>';}
		const headingReplacer = function(fullMatch, tagStart, tagContents){return '\n<h' + tagStart.trim().length + '>' + tagContents + '</h' + tagStart.trim().length + '>';}
		const boldItalicsReplacer = function(fullMatch, tagStart, tagContents){return '<' + ( (tagStart.trim().length==1)?('em'):('strong') ) + '>'+ tagContents + '</' + ( (tagStart.trim().length==1)?('em'):('strong') ) + '>';}
		const strikethroughReplacer = function(fullMatch, tagStart, tagContents){return '<del>' + tagContents + '</del>';}
		const blockquoteReplacer = function(fullMatch, tagStart, tagContents){return '\n<blockquote>' + tagContents + '</blockquote>';}
		const horizontalRuleReplacer = function(fullMatch){return '\n<hr />';}
		const unorderedListReplacer = function(fullMatch){let items = '';fullMatch.trim().split('\n').forEach( item => { items += '<li>' + item.substring(2) + '</li>'; } );return '\n<ul>' + items + '</ul>';}
		const orderedListReplacer = function(fullMatch){let items = '';fullMatch.trim().split('\n').forEach( item => { items += '<li>' + item.substring(item.indexOf('.')+2) + '</li>'; } );return '\n<ol>' + items + '</ol>';}
		const paragraphReplacer = function(fullMatch, tagContents){return '<p>' + tagContents + '</p>';}
		// Rules for Markdown parsing (use in order of appearance for best results)
		const replaceCodeBlocks = replaceRegex(codeBlockRegex, codeBlockReplacer);
		const replaceInlineCodes = replaceRegex(inlineCodeRegex, inlineCodeReplacer);
		const replaceImages = replaceRegex(imageRegex, imageReplacer);
		const replaceLinks = replaceRegex(linkRegex, linkReplacer);
		const replaceHeadings = replaceRegex(headingRegex, headingReplacer);
		const replaceBoldItalics = replaceRegex(boldItalicsRegex, boldItalicsReplacer);
		const replaceceStrikethrough = replaceRegex(strikethroughRegex, strikethroughReplacer);
		const replaceBlockquotes = replaceRegex(blockquoteRegex, blockquoteReplacer);
		const replaceHorizontalRules = replaceRegex(horizontalRuleRegex, horizontalRuleReplacer);
		const replaceUnorderedLists = replaceRegex(unorderedListRegex, unorderedListReplacer);
		const replaceOrderedLists = replaceRegex(orderedListRegex, orderedListReplacer);
		const replaceParagraphs = replaceRegex(paragraphRegex, paragraphReplacer);
		// Fix for tab-indexed code blocks
		const codeBlockFixRegex = /\n(<pre>)((\n|.)*)(<\/pre>)/g;
		const codeBlockFixer = function(fullMatch, tagStart, tagContents, lastMatch, tagEnd){let lines = '';tagContents.split('\n').forEach( line => { lines += line.substring(1) + '\n'; } );return tagStart + lines + tagEnd;}
		const fixCodeBlocks = replaceRegex(codeBlockFixRegex, codeBlockFixer);
		// Replacement rule order function for Markdown
		// Do not use as-is, prefer parseMarkdown as seen below
		const replaceMarkdown = function(str) {return replaceParagraphs(replaceOrderedLists(replaceUnorderedLists(replaceHorizontalRules(replaceBlockquotes(replaceceStrikethrough(replaceBoldItalics(replaceHeadings(replaceLinks(replaceImages(replaceInlineCodes(replaceCodeBlocks(str))))))))))));}
		// Parser for Markdown (fixes code, adds empty lines around for parsing)
		// Usage: parseMarkdown(strVar)
		const parseMarkdown = function(str) {return fixCodeBlocks(replaceMarkdown('\n' + str + '\n')).trim();}
		return parseMarkdown(str);
	};
	var micromarkdown = {
		useajax: false,
		regexobject: {
			headline: /^(\#{1,6})([^\#\n]+)$/m,
			code: /\s\`\`\`\n?([^`]+)\`\`\`/g,
			hr: /^(?:([\*\-_] ?)+)\1\1$/gm,
			lists: /^((\s*((\*|\-)|\d(\.|\))) [^\n]+)\n)+/gm,
			bolditalic: /(?:([\*_~]{1,3}))([^\*_~\n]+[^\*_~\s])\1/g,
			links: /!?\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g,
			reflinks: /\[([^\]]+)\]\[([^\]]+)\]/g,
			smlinks: /\@([a-z0-9]{3,})\@(t|gh|fb|gp|adn)/gi,
			mail: /<(([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,7}))>/gmi,
			tables: /\n(([^|\n]+ *\| *)+([^|\n]+\n))((:?\-+:?\|)+(:?\-+:?)*\n)((([^|\n]+ *\| *)+([^|\n]+)\n)+)/g,
			include: /[\[<]include (\S+) from (https?:\/\/[a-z0-9\.\-]+\.[a-z]{2,9}[a-z0-9\.\-\?\&\/]+)[\]>]/gi,
			url: /<([a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)>/g,
			url2: /[ \t\n]([a-zA-Z]{2,16}:\/\/[a-zA-Z0-9@:%_\+.~#?&=]{2,256}.[a-z]{2,4}\b(\/[\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)[ \t\n]/g
		},
		codeblocks: {},
		parse: function (str, strict) {
			'use strict';
			var line, nstatus = 0,
			status, cel, calign, indent, helper, helper1, helper2, count, repstr, stra, trashgc = [],
			casca = 0, i = 0, j = 0,crc32str = '';
			str = '\n' + str + '\n';

			if (strict !== true) {
				micromarkdown.regexobject.lists = /^((\s*(\*|\d\.) [^\n]+)\n)+/gm;
			}

			str = str.replace('$&', '&#x0024&amp;');
			
			/* code */
			while ((stra = micromarkdown.regexobject.code.exec(str)) !== null) {
				crc32str = micromarkdown.crc32(stra[0]);
				micromarkdown.codeblocks[crc32str] = '<pre><code>\n' + micromarkdown.htmlEncode(stra[1]).replace(/\n/gm, '<br/>').replace(/\ /gm, '&nbsp;') + '</code></pre>\n';
				str = str.replace(stra[0], ' §§§' + crc32str + '§§§ '); 
			}

			/* headlines */
			while ((stra = micromarkdown.regexobject.headline.exec(str)) !== null) {
				count = stra[1].length;
				str = str.replace(stra[0], '<h' + count + '>' + stra[2] + '</h' + count + '>' + '\n');
			}

			/* lists */
			while ((stra = micromarkdown.regexobject.lists.exec(str)) !== null) {
				casca = 0;
				if ((stra[0].trim().substr(0, 1) === '*') || (stra[0].trim().substr(0, 1) === '-')) {
					repstr = '<ul>';
				} else {
					repstr = '<ol>';
				}
				helper = stra[0].split('\n');
				helper1 = [];
				status = 0;
				indent = false;
				for (i = 0; i < helper.length; i++) {
					if ((line = /^((\s*)((\*|\-)|\d(\.|\))) ([^\n]+))/.exec(helper[i])) !== null) {
						if ((line[2] === undefined) || (line[2].length === 0)) {
							nstatus = 0;
						} else {
							if (indent === false) {
								indent = line[2].replace(/\t/, '    ').length;
							}
							nstatus = Math.round(line[2].replace(/\t/, '    ').length / indent);
						}
						while (status > nstatus) {
							repstr += helper1.pop();
							status--;
							casca--;
						}
						while (status < nstatus) {
							if ((line[0].trim().substr(0, 1) === '*') || (line[0].trim().substr(0, 1) === '-')) {
								repstr += '<ul>';
								helper1.push('</ul>');
							} else {
								repstr += '<ol>';
								helper1.push('</ol>');
							}
							status++;
							casca++;
						}
						repstr += '<li>' + line[6] + '</li>' + '\n';
					}
				}
				while (casca > 0) {
					repstr += '</ul>';
					casca--;
				}
				if ((stra[0].trim().substr(0, 1) === '*') || (stra[0].trim().substr(0, 1) === '-')) {
					repstr += '</ul>';
				} else {
					repstr += '</ol>';
				}
				str = str.replace(stra[0], repstr + '\n');
			}

			/* tables */
			while ((stra = micromarkdown.regexobject.tables.exec(str)) !== null) {
				repstr = '<table><tr>';
				helper = stra[1].split('|');
				calign = stra[4].split('|');
				for (i = 0; i < helper.length; i++) {
					if (calign.length <= i) {
						calign.push(0);
					} else if ((calign[i].trimRight().slice(-1) === ':') && (strict !== true)) {
						if (calign[i][0] === ':') {
							calign[i] = 3;
						} else {
							calign[i] = 2;
						}
					} else if (strict !== true) {
						if (calign[i][0] === ':') {
							calign[i] = 1;
						} else {
							calign[i] = 0;
						}
					} else {
						calign[i] = 0;
					}
				}
				cel = ['<th>', '<th align="left">', '<th align="right">', '<th align="center">'];
				for (i = 0; i < helper.length; i++) {
					repstr += cel[calign[i]] + helper[i].trim() + '</th>';
				}
				repstr += '</tr>';
				cel = ['<td>', '<td align="left">', '<td align="right">', '<td align="center">'];
				helper1 = stra[7].split('\n');
				for (i = 0; i < helper1.length; i++) {
					helper2 = helper1[i].split('|');
					if (helper2[0].length !== 0) {
						while (calign.length < helper2.length) {
							calign.push(0);
						}
						repstr += '<tr>';
						for (j = 0; j < helper2.length; j++) {
							repstr += cel[calign[j]] + helper2[j].trim() + '</td>';
						}
						repstr += '</tr>' + '\n';
					}
				}
				repstr += '</table>';
				str = str.replace(stra[0], repstr);
			}

			/* bold and italic */
			for (i = 0; i < 3; i++) {
				while ((stra = micromarkdown.regexobject.bolditalic.exec(str)) !== null) {
					repstr = [];
					if (stra[1] === '~~') {
						str = str.replace(stra[0], '<del>' + stra[2] + '</del>');
					} else {
						switch (stra[1].length) {
							case 1:
								repstr = ['<i>', '</i>'];
								break;
							case 2:
								repstr = ['<b>', '</b>'];
								break;
							case 3:
								repstr = ['<i><b>', '</b></i>'];
								break;
						}
						str = str.replace(stra[0], repstr[0] + stra[2] + repstr[1]);
					}
				}
			}
			/* links */
			while ((stra = micromarkdown.regexobject.links.exec(str)) !== null) {
				if (stra[0].substr(0, 1) === '!') {
					str = str.replace(stra[0], '<img src="' + stra[2] + '" alt="' + stra[1] + '" title="' + stra[1] + '" />\n');
				} else {
					str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(stra[2], strict) + 'href="' + stra[2] + '">' + stra[1] + '</a>\n');
				}
			}
			while ((stra = micromarkdown.regexobject.mail.exec(str)) !== null) {
				str = str.replace(stra[0], '<a href="mailto:' + stra[1] + '">' + stra[1] + '</a>');
			}
			while ((stra = micromarkdown.regexobject.url.exec(str)) !== null) {
				repstr = stra[1];
				if (repstr.indexOf('://') === -1) {
					repstr = 'http://' + repstr;
				}
				str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(repstr, strict) + 'href="' + repstr + '">' + repstr.replace(/(https:\/\/|http:\/\/|mailto:|ftp:\/\/)/gmi, '') + '</a>');
			}
			while ((stra = micromarkdown.regexobject.reflinks.exec(str)) !== null) {
				helper1 = new RegExp('\\[' + stra[2] + '\\]: ?([^ \n]+)', "gi");
				if ((helper = helper1.exec(str)) !== null) {
					str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(helper[1], strict) + 'href="' + helper[1] + '">' + stra[1] + '</a>');
					trashgc.push(helper[0]);
				}
			}
			for (i = 0; i < trashgc.length; i++) {
				str = str.replace(trashgc[i], '');
			}
			while ((stra = micromarkdown.regexobject.smlinks.exec(str)) !== null) {
				switch (stra[2]) {
					case 't':
						repstr = 'https://twitter.com/' + stra[1];
						break;
					case 'gh':
						repstr = 'https://github.com/' + stra[1];
						break;
					case 'fb':
						repstr = 'https://www.facebook.com/' + stra[1];
						break;
					case 'gp':
						repstr = 'https://plus.google.com/+' + stra[1];
						break;
					case 'adn':
						repstr = 'https://alpha.app.net/' + stra[1];
						break;
				}
				str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(repstr, strict) + 'href="' + repstr + '">' + stra[1] + '</a>');
			}
			while ((stra = micromarkdown.regexobject.url2.exec(str)) !== null) {
				repstr = stra[1];
				str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(repstr, strict) + 'href="' + repstr + '">' + repstr + '</a>');
			}
			/* horizontal line */
			while ((stra = micromarkdown.regexobject.hr.exec(str)) !== null) {
				str = str.replace(stra[0], '\n<hr/>\n');
			}
			/* include */
			if ((micromarkdown.useajax !== false) && (strict !== true)) {
				while ((stra = micromarkdown.regexobject.include.exec(str)) !== null) {
					helper = stra[2].replace(/[\.\:\/]+/gm, '');
					helper1 = '';
					if (document.getElementById(helper)) {
						helper1 = document.getElementById(helper).innerHTML.trim();
					} else {
						micromarkdown.ajax(stra[2]);
					}
					if ((stra[1] === 'csv') && (helper1 !== '')) {
						helper2 = {';': [], '\t': [], ',': [], '|': []};
						helper2[0] = [';', '\t', ',', '|'];
						helper1 = helper1.split('\n');
						for (j = 0; j < helper2[0].length; j++) {
							for (i = 0; i < helper1.length; i++) {
								if (i > 0) {
									if (helper2[helper2[0][j]] !== false) {
										if ((helper2[helper2[0][j]][i] !== helper2[helper2[0][j]][i - 1]) || (helper2[helper2[0][j]][i] === 1)) {
											helper2[helper2[0][j]] = false;
										}
									}
								}
							}
						}
						if ((helper2[';'] !== false) || (helper2['\t'] !== false) || (helper2[','] !== false) || (helper2['|'] !== false)) {
							if (helper2[';'] !== false) {
								helper2 = ';';
							} else if (helper2['\t']) {
								helper2 = '\t';
							} else if (helper2[',']) {
								helper2 = ',';
							} else if (helper2['|']) {
								helper2 = '|';
							}
							repstr = '<table>';
							for (i = 0; i < helper1.length; i++) {
								helper = helper1[i].split(helper2);
								repstr += '<tr>';
								for (j = 0; j < helper.length; j++) {
									repstr += '<td>' + micromarkdown.htmlEncode(helper[j]) + '</td>';
								}
								repstr += '</tr>';
							}
							repstr += '</table>';
							str = str.replace(stra[0], repstr);
						} else {
							str = str.replace(stra[0], '<code>' + helper1.join('\n') + '</code>');
						}
					} else {
						str = str.replace(stra[0], '');
					}
				}
			}

			str = str.replace(/ {2,}[\n]{1,}/gmi, '<br/>');

			str = str.replace(/[\n]{2,}/gmi, '<br/><br/>');

			for(var index in micromarkdown.codeblocks) { 
				if(micromarkdown.codeblocks.hasOwnProperty(index)) {
					str = str.replace('§§§' + index + '§§§', micromarkdown.codeblocks[index]); 
				}
			}
			str = str.replace('&#x0024&amp;', '$&');

			return str;
		},
		ajax: function (str) {
			'use strict';
			var xhr;
			if (document.getElementById(str.replace(/[\.\:\/]+/gm, ''))) {
				return false;
			}
			if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					xhr = null;
					return e;
				}
			} else {
				xhr = new XMLHttpRequest();
			}
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					var ele = document.createElement('code');
					ele.innerHTML = xhr.responseText;
					ele.id = str.replace(/[\.\:\/]+/gm, '');
					ele.style.display = 'none';
					document.getElementsByTagName('body')[0].appendChild(ele);
					micromarkdown.useajax();
				}
			};
			xhr.open('GET', str, true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send();
		},
		crc32: function (string) {
			"use strict";
			var crc = 0, n, x, i, len, table = ["00000000", "77073096", "EE0E612C", "990951BA", "076DC419", "706AF48F", "E963A535", "9E6495A3", "0EDB8832", "79DCB8A4", "E0D5E91E", "97D2D988", "09B64C2B", "7EB17CBD", "E7B82D07", 
			"90BF1D91", "1DB71064", "6AB020F2", "F3B97148", "84BE41DE", "1ADAD47D", "6DDDE4EB", "F4D4B551", "83D385C7", "136C9856", "646BA8C0", "FD62F97A", "8A65C9EC", "14015C4F", "63066CD9", "FA0F3D63", "8D080DF5", "3B6E20C8", 
			"4C69105E", "D56041E4", "A2677172", "3C03E4D1", "4B04D447", "D20D85FD", "A50AB56B", "35B5A8FA", "42B2986C", "DBBBC9D6", "ACBCF940", "32D86CE3", "45DF5C75", "DCD60DCF", "ABD13D59", "26D930AC", "51DE003A", "C8D75180", 
			"BFD06116", "21B4F4B5", "56B3C423", "CFBA9599", "B8BDA50F", "2802B89E", "5F058808", "C60CD9B2", "B10BE924", "2F6F7C87", "58684C11", "C1611DAB", "B6662D3D", "76DC4190", "01DB7106", "98D220BC", "EFD5102A", "71B18589", 
			"06B6B51F", "9FBFE4A5", "E8B8D433", "7807C9A2", "0F00F934", "9609A88E", "E10E9818", "7F6A0DBB", "086D3D2D", "91646C97", "E6635C01", "6B6B51F4", "1C6C6162", "856530D8", "F262004E", "6C0695ED", "1B01A57B", "8208F4C1", 
			"F50FC457", "65B0D9C6", "12B7E950", "8BBEB8EA", "FCB9887C", "62DD1DDF", "15DA2D49", "8CD37CF3", "FBD44C65", "4DB26158", "3AB551CE", "A3BC0074", "D4BB30E2", "4ADFA541", "3DD895D7", "A4D1C46D", "D3D6F4FB", "4369E96A", 
			"346ED9FC", "AD678846", "DA60B8D0", "44042D73", "33031DE5", "AA0A4C5F", "DD0D7CC9", "5005713C", "270241AA", "BE0B1010", "C90C2086", "5768B525", "206F85B3", "B966D409", "CE61E49F", "5EDEF90E", "29D9C998", "B0D09822", 
			"C7D7A8B4", "59B33D17", "2EB40D81", "B7BD5C3B", "C0BA6CAD", "EDB88320", "9ABFB3B6", "03B6E20C", "74B1D29A", "EAD54739", "9DD277AF", "04DB2615", "73DC1683", "E3630B12", "94643B84", "0D6D6A3E", "7A6A5AA8", "E40ECF0B", 
			"9309FF9D", "0A00AE27", "7D079EB1", "F00F9344", "8708A3D2", "1E01F268", "6906C2FE", "F762575D", "806567CB", "196C3671", "6E6B06E7", "FED41B76", "89D32BE0", "10DA7A5A", "67DD4ACC", "F9B9DF6F", "8EBEEFF9", "17B7BE43", 
			"60B08ED5", "D6D6A3E8", "A1D1937E", "38D8C2C4", "4FDFF252", "D1BB67F1", "A6BC5767", "3FB506DD", "48B2364B", "D80D2BDA", "AF0A1B4C", "36034AF6", "41047A60", "DF60EFC3", "A867DF55", "316E8EEF", "4669BE79", "CB61B38C", 
			"BC66831A", "256FD2A0", "5268E236", "CC0C7795", "BB0B4703", "220216B9", "5505262F", "C5BA3BBE", "B2BD0B28", "2BB45A92", "5CB36A04", "C2D7FFA7", "B5D0CF31", "2CD99E8B", "5BDEAE1D", "9B64C2B0", "EC63F226", "756AA39C", 
			"026D930A", "9C0906A9", "EB0E363F", "72076785", "05005713", "95BF4A82", "E2B87A14", "7BB12BAE", "0CB61B38", "92D28E9B", "E5D5BE0D", "7CDCEFB7", "0BDBDF21", "86D3D2D4", "F1D4E242", "68DDB3F8", "1FDA836E", "81BE16CD", 
			"F6B9265B", "6FB077E1", "18B74777", "88085AE6", "FF0F6A70", "66063BCA", "11010B5C", "8F659EFF", "F862AE69", "616BFFD3", "166CCF45", "A00AE278", "D70DD2EE", "4E048354", "3903B3C2", "A7672661", "D06016F7", "4969474D", 
			"3E6E77DB", "AED16A4A", "D9D65ADC", "40DF0B66", "37D83BF0", "A9BCAE53", "DEBB9EC5", "47B2CF7F", "30B5FFE9", "BDBDF21C", "CABAC28A", "53B39330", "24B4A3A6", "BAD03605", "CDD70693", "54DE5729", "23D967BF", "B3667A2E", 
			"C4614AB8", "5D681B02", "2A6F2B94", "B40BBE37", "C30C8EA1", "5A05DF1B", "2D02EF8D"];
			n = 0;
			x = 0;
			len = string.length;
			crc = crc ^ (-1);
			for (i = 0; i < len; i++) {
				n = (crc ^ string.charCodeAt(i)) & 0xFF;
				x = "0x" + table[n];
				crc = (crc >>> 8) ^ x;
			}
			return crc ^ (-1);
		},
		countingChars: function (str, split) {
			'use strict';
			str = str.split(split);
			if (typeof str === 'object') {
				return str.length - 1;
			}
			return 0;
		},
		htmlEncode: function (str) {
			'use strict';
			var div = document.createElement('div');
			div.appendChild(document.createTextNode(str));
			str = div.innerHTML;
			div = undefined;
			return str;
		},
		mmdCSSclass: function (str, strict) {
			'use strict';
			var urlTemp;
			if ((str.indexOf('/') !== -1) && (strict !== true)) {
				urlTemp = str.split('/');
				if (urlTemp[1].length === 0) {
					urlTemp = urlTemp[2].split('.');
				} else {
					urlTemp = urlTemp[0].split('.');
				}
				return 'class="mmd_' + urlTemp[urlTemp.length - 2].replace(/[^\w\d]/g, '') + urlTemp[urlTemp.length - 1] + '" ';
			}
			return '';
		}
	};
	const parseContent = (rawContent,lang,elem) => {
		if(!lang || typeof lang !== 'string') {var resultStr = 'The syntax language is either empty or not a string';return {'result':resultStr,'rawContent':resultStr,'formattedResult':resultStr}};
		if(!rawContent || typeof rawContent !== 'string') {var resultStr = 'The data is either empty or not a string';return {'result':resultStr,'rawContent':resultStr,'formattedResult':resultStr}};
		
		let converter, output, formattedResult = '', resultObj = {}, language = lang == 'js' ? 'javascript' : lang, 
		result = escapeHTML(rawContent);
		//result = (lang === "htm" || lang === "html") ? escapeHTML(rawContent) : rawContent;
		
		if(lang.toLowerCase() === 'md' || lang.toLowerCase() === 'txt'){
			if(typeof(showdown) != 'undefined') {
				converter = new showdown.Converter({ghCompatibleHeaderId:true,tables:true,extensions: ['prettify']}), result = converter.makeHtml(rawContent);
			} else if(typeof(turndown) != 'undefined') {
				converter = new Turndown(), result = turndown.text(rawContent);
			} else if(typeof(marked) != 'undefined') {
				result = marked(rawContent);
			} else result = micromarkdown.parse(rawContent);//markdown(rawContent);
			formattedResult = `<div class="markdown-wrapper markdown__viewer h--12 m--auto">
				<div class="file h--12 overflow--auto">
					<div class="file-header flex">
						<span class="ml--auto">
							<button class="akd__btn py--1 px--6">raw<\/button>
						<\/span>
					<\/div>
					<div class="file-body h--12 overflow--auto">
						<div class="markdown-body">
							${result}
						<\/div>
					<\/div>
				<\/div>
			<\/div>`;
		} else {
			//result = '<pre class="code-wrapper code-wrapper '+lang+'High m--auto">'+ result + '</pre>'; 
			if(isFunction(window['hljs']) || isObject(window['hljs']) || isFunction(window['prettyPrint'])) {
				formattedResult = `<pre class="code-wrapper prettyprint highlight language-${language} m--auto">${result}</pre>`;
			} else if(isFunction(w3CodeColorize) && inArray(lang, w3_langs)) {
				formattedResult = `<pre class="code-wrapper ${lang}High">${w3CodeColorize(result,lang)}</pre>`;
			} else {
				let tag = 'textarea'; // pre
				formattedResult = `<${tag} class="code-wrapper ${lang}High m--auto">${result}</${tag}>`;
			}
		}
			
		Object.assign(resultObj, {result, rawContent, formattedResult});
		
		if(isElement(elem)){
			elem.innerHTML = resultObj.formattedResult;
			if(window['hljs'] && (isFunction(window['hljs']) || isObject(window['hljs']))) {
				forEach($all('pre.highlight'), function(block, i){hljs.highlightBlock(block)});
			} else if(window['prettyPrint'] && isFunction(window['prettyPrint'])) {
				prettyPrint();
			}
		}
		
		return resultObj;
	}

	const magnifier = (imgID, zoom,glassSizeID,zoomAmountID) => {
		var img, zoom, glass, glass_created = false, glass_width, glass_height, w, h, bw,border_x,border_y;
		function init(){
			reset();
			zoom = zoom || 3;
			img = $one(imgID);
			glassSizeSelect = $one(glassSizeID);
			glassZoomAmountSelect = $one(zoomAmountID);
			if(isElement(glass = $one('.img-magnifier-glass',img.parentElement))){
				//glass = img.parent().find('.img-magnifier-glass').css('display', "block").css('border','4px solid #ff0000');
				//glass = $one('.img-magnifier-glass',img.parentElement);
				glass.classList.add("active");
				glass.style.cssText += 'display:block;border:8px solid #ff0000;transform:scale(1);transform-origin:center center;';
			} else {
				/*create magnifier glass:*/
				if(!glass_created){
					glass = tag$1("div",{'id':"img-magnifier-glass-"+mi,"class":"img-magnifier-glass active"});
					/*insert magnifier glass:*/
					img.parentElement.appendChild(glass);
					glass_created = true;
				} else {glass = $one('#img-magnifier-glass-'+mi);glass.classList.add("active");}
			}
			border_x = Number(glass.style.borderTopWidth.replace('px','')) + Number(glass.style.borderBottomWidth.replace('px',''));
			border_y = Number(glass.style.borderLeftWidth.replace('px','')) + Number(glass.style.borderRightWidth.replace('px',''));
			on(glassSizeSelect,'change',function(e){
				e.preventDefault();
				var glass_width = glass_height = this.value.replace('px','')+'px',
				bg_img = img.getAttribute('src'),
				bg_size_x = ((img.offsetWidth>0?img.offsetWidth:img.parentElement.offsetHeight) * zoom),
				bg_size_y = ((img.offsetHeight>0?img.offsetHeight:img.parentElement.offsetHeight) * zoom);
				/*set background properties for the magnifier glass:*/
				Object.assign(glass.style, {'background-image':"url('" + img.getAttribute('src') + "')",'background-repeat':"no-repeat",'background-size':bg_size_x + "px " + bg_size_y + "px", 'width':glass_width,'height':glass_height});
				bw = 3;
				w = glass.offsetWidth / 2;
				h = glass.offsetHeight / 2;
				/* w = (glass.offsetWidth-border_x) / 2;
				h = (glass.offsetHeight-border_y) / 2; */
				pos = getCursorPos();
				x = pos.x;
				y = pos.y;
				Object.assign(glass.style, {'left':(x - w) + "px",'top' :(y - h) + "px"});
			});
			on(glassZoomAmountSelect,'change',function(e){
				e.preventDefault();
				var zoom = this.value.replace('px',''),
				bg_img = img.getAttribute('src'),
				bg_size_x = ((img.offsetWidth>0?img.offsetWidth:img.parentElement.offsetWidth) * zoom),
				bg_size_y = ((img.offsetHeight>0?img.offsetHeight:img.parentElement.offsetHeight) * zoom);
				/*get the cursor's x and y positions:*/
				pos = getCursorPos();
				x = pos.x;
				y = pos.y;
				/*prevent the magnifier glass from being positioned outside the image:*/
				if (x > img.offsetWidth - (w / zoom)) {x = img.offsetWidth - (w / zoom);}
				if (x < w / zoom) {x = w / zoom;}
				if (y > img.offsetHeight - (h / zoom)) {y = img.offsetHeight - (h / zoom);}
				if (y < h / zoom) {y = h / zoom;}
				/*set the position of the magnifier glass:*/
				Object.assign(glass.style, {
					'left':(x - w) + "px",
					'top' :(y - h) + "px",
					'background-size':bg_size_x + "px " + bg_size_y + "px",
					'background-position':"-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px"
				});
			});
			if((glass_width == '' || glass_width == null) && (glass_height == '' || glass_height == null )){
				if(glass.classList.contains('small-magnifier-glass')) {var glass_width = '100px',glass_height = '100px';}
				else if(glass.classList.contains('medium-magnifier-glass')) {var glass_width = '200px',glass_height = '200px';}
				else if(glass.classList.contains('large-magnifier-glass')) {var glass_width = '300px',glass_height = '300px';}
				else var glass_width = '100px',glass_height = '100px';
			}
			/*set background properties for the magnifier glass:*/
			var bg_img = img.getAttribute('src'),
			bg_size_x = ((img.offsetWidth>0?img.offsetWidth:img.parentElement.offsetWidth) * zoom),
			bg_size_y = ((img.offsetHeight>0?img.offsetHeight:img.parentElement.offsetHeight) * zoom)
			Object.assign(glass.style,{'width':glass_width, 'height':glass_height, 'background-image':"url('" + bg_img + "')", 'background-repeat':"no-repeat", 'background-size':bg_size_x + "px " + bg_size_y + "px"});
			bw = 3;
			w = (glass.offsetWidth-border_x) / 2;
			h = (glass.offsetHeight-border_y) / 2;
			/*execute a function when someone moves the magnifier glass over the image:*/
			on(glass,"mousemove", moveMagnifier);
			on(img,"mousemove", moveMagnifier);
			/*and also for touch screens:*/
			on(glass,"touchmove", moveMagnifier);
			on(img,"touchmove", moveMagnifier);
			return{'mag_image':img,'mag_sizeSelect':glassSizeSelect,'mag_zoomSelect':glassZoomAmountSelect};
		}
		function moveMagnifier(e) {
			var pos, x, y;
			/*prevent any other actions that may occur when moving over the image*/
			e.preventDefault();
			/*get the cursor's x and y positions:*/
			pos = getCursorPos(e);
			x = pos.x;
			y = pos.y; 
			/*prevent the magnifier glass from being positioned outside the image:*/
			if (x > img.offsetWidth - (w / zoom)) {x = img.offsetWidth - (w / zoom);}
			if (x < w / zoom) {x = w / zoom;}
			if (y > img.offsetHeight - (h / zoom)) {y = img.offsetHeight - (h / zoom);}
			if (y < h / zoom) {y = h / zoom;}
			/*set the position of the magnifier glass:*/
			Object.assign(glass.style, {'left':(x - w) + "px",'top' :(y - h) + "px",'background-position':"-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px"});
			//$('#messages').html('width: '+ glass.offsetWidth+' || height:'+glass.offsetHeight+'left: '+((x * zoom) - w + bw)+' || top:'+((y * zoom) - h + bw));
		}
		function getCursorPos(e) {
			//if(!img || !isElement(img)) return;
			if(!img || !isElement(img)) img = $one(imgID);
			var a, x = 0, y = 0;
			e = e || window.event;
			/*get the x and y positions of the image:*/
			//a = img.offset();
			a = img.getBoundingClientRect();
			/*calculate the cursor's x and y coordinates, relative to the image:*/
			x = e.pageX - a.left;
			y = e.pageY - a.top;
			return {x : x, y : y};
		}
		function reset(){
			img = glassSizeSelect = glassZoomAmountSelect = w = h = bw = border_x = border_y = null;
			return;
		}
		mi++;
		return {init, reset};
	}
	//alert(isValidHttpUrl("http://localhost/www/ajax.php?show=misc&action=show_source&filePath=C:/xampp/htdocs/www/&fileName=launcher.html&ajax_target=folder-content-viewer&ajax_target_type=id&is_ajax_call=1"));
	//alert(inputUrlSanitizer("https://www.streamz.com/",200).status);
	function inputUrlSanitizer(str,len){
		var message='',sanitizedUrl='',cont=true;
		len = len || 150;
		if(!str || str ==="undefined" || str === "" || str === null){
			cont = false;
			message = "Empty URL string. A URL string was not set";
		} else {
			var trimmed = str.replace(/^[ \t\n\r]+/, '');
			// replace multi space with single space
			trimmed = trimmed.replace(/\s{2,}/g, '');
			regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
			if(trimmed && trimmed.length > len){
				cont = false;
				message = "URL String length is too long";
				sanitizedUrl = "";
			} else if(trimmed && (trimmed.substring(0, 4) !== 'http'||trimmed.substring(0, 3) !== 'ftp')){
				cont = false;
				message = "URL String does not contain an allowed protocol and/or the string is not an absolute URL. Protocols allowed are 'http://' and 'https://' => "+trimmed;
				sanitizedUrl = "";
			//}  else if(trimmed && trimmed.match(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i)){
			}  else if(trimmed && !(regex).test(trimmed)){
				cont = false;
				message = "URL String is not a valid URL. => "+trimmed;
				sanitizedUrl = "";
			} else{
				cont=true;
				message = "URL String has bee sanitized";
				sanitizedUrl = typeof('htmlData') ==="function" ? htmlData(trimmed) : trimmed.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\ /g, "&nbsp;");
			} 
		}
		return {'status':cont,'message':message,'sanitizedUrl':sanitizedUrl}
	}
	
	function isValidHttpUrl(string) {
		let url;
		try {
			url = new URL(string);
		} catch (_) {
			return false;  
		}
		return url.protocol === "http:" || url.protocol === "https:";
	}
	
	function tabs(options) {
		var _this = this, ti=0, currentAnim = "", useAnimation, animationName, startAt,selectedTab, selectedPanel, 
		tabId, tabLinksId, tabLinksButtonId, tabPanelId;
		if(options && isPlainObject(options)){
			tabId = ("tabId" in options) ? options.tabId : ".pbd-tabs";
			tabLinksId = ("tabLinksId" in options) ? options.tabLinksId : ".tab-links";
			tabLinksButtonId = ("tabLinksButtonId" in options) ? options.tabLinksButtonId : ".tab-button";
			tabPanelId = ("tabPanelsId" in options) ? options.tabPanelId : ".tab-panel";
			_useAnimation = ("useAnimation" in options) ? options.useAnimation : false;
			_animationName = ("animationName" in options) ? options.animationName : null;
			startAt = ("startAt" in options) ? options.startAt : null;
		} else {tabId = options;tabLinksId = ".pbd-tabs-nav";tabLinksButtonId = ".tab-button";tabPanelId = ".pbd-tabs-panel";_useAnimation = false;_animationName = null;startAt=null;}
		var el = $one(options.el), 
		orientationBtn = $one(options.orientationBtn,el), 
		newTabBtn = $one(options.newTabBtn,el), 
		newTabInput = $one(options.newTabInput,el), 
		newTabContent = $one(options.newTabContent,el), 
		tabNavigationLinks = $all(options.tabNavigationLinks,el), 
		tabContentContainers = $all(options.tabContentContainers,el), 
		tabRemoveButtons = $all(".remove-tab-button",el), 
		activeTabAttr = options.activeTabAttr || 'is-active',
		useAnimation = options.useAnimation || false,
		animationName = options.animationName || "slide-h", // slide-h, slide-v, fade, zoom
		activeTabLinkClass = options.activeTabLinkClass || 'tabs-nav-active',
		activeTabContentClass = options.activeTabContentClass || 'active-panel',
		activeIndex = 0, initCalled = false;
		
		this.animate = function(_sPanel, _aniName){
			if(_aniName === "zoom"){
				_sPanel.style.cssText += "display:block;transform-origin:center center;transform:scale(1);overflow:auto;opacity:1;transition:all linear 0.3s;";
			} else if(_aniName === "slide-down"){
				_sPanel.style.cssText += "display:block;transform-origin:center center;transform:translateY(100%);overflow:auto;opacity:1;transition:all linear 0.3s;";
			} else _sPanel.classList.add(_aniName);
			currentAnim = _aniName;
			return this;
		};
		
		this.init = function() {
			if (!initCalled) {
				initCalled = true;
				for (var i = 0; i < tabNavigationLinks.length; i++) {
					var link = tabNavigationLinks[i]??null;
					var tabContent = tabContentContainers[i]??null;
					if(isElement(link)) {
						$tab_id = link.dataset.tabId??link.dataset.targetId;
						$tabPanel = $one($tab_id);
						if(link.classList.contains(activeTabLinkClass) && isElement($tabPanel)){
							if(useAnimation && animationName != ""){
								if(tabContent.classList.contains(animationName)) removeClass(tabContent,animationName);
								this.animate($tabPanel, animationName);
							} else {
								removeClass(tabContent,activeTabContentClass);
								addClass($tabPanel,activeTabContentClass);
							}
						}
						this.handleClick(link, i);
					}
				}
				
				if(isNumber(startAt)){
					if(isElement(tabNavigationLinks[startAt])) {
						if(isString(activeTabLinkClass)){	
							removeClass(tabNavigationLinks,activeTabLinkClass);
							addClass(tabNavigationLinks[startAt],activeTabLinkClass);
						} else {
							css(tabNavigationLinks,"display","none");
							tabNavigationLinks[startAt].style.display = "block";
						}
					}
					if(isElement(tabContentContainers[startAt])) {
						if(isString(activeTabContentClass)){	
							removeClass(tabContentContainers,activeTabContentClass);
							addClass(tabContentContainers[startAt],activeTabContentClass);
						} else {
							css(tabContentContainers,{display:"none",overflow:"hidden",opacity:0,transition:"opacity linear 1s,height linear 0.3s"});
							css(tabContentContainers[startAt],{display:"block","overflow":"auto","opacity":"1","transition":"opacity linear 1s, height linear 0.5s"});
						}
					}
				}
				if(orientationBtn && isElement(orientationBtn)){
					orientationBtn.addEventListener("click",function(e){
						toggleClass(el,"horizontal vertical");
						//if(el.classList.contains("horizontal")){$this.innerHTML = '<i class="fa fa-arrows-alt-v"></i>';} else if(el.classList.contains("vertical")){$this.innerHTML = '<i class="fa fa-arrows-alt-h"></i>';}
					});
				}
				if(newTabBtn && isElement(newTabBtn)){
					console.log('new tab button found');
					newTabBtn.addEventListener('click',function(e){
						e.preventDefault();
						var i = tabNavigationLinks.length  + (ti+1), 
						tab_name = (newTabInput && isElement(newTabInput)) ? newTabInput.value : "new-"+i,
						content = (newTabContent && isElement(newTabContent)) ? newTabContent.value ?? newTabContent.innerHTML : "";
						_this.addTab(tab_name,content);
					});
				}
				if(tabRemoveButtons && isArray(tabRemoveButtons) && tabRemoveButtons.length > 0){
					for(var i=0;i<tabRemoveButtons.length;i++){
						var theTab,theTabParent,theTabPanel,theTabPanelParent,rBtn = tabRemoveButtons[i];
						if(isElement(rBtn)){
							on(rBtn,"click",(e)=>{
								e.preventDefault();
								theTab = $one(e.target.dataset.tabId) || e.target.parentElement;
								if(isElement(theTab) && theTab.tagName.toLowerCase() === "li" && (theTabParent = theTab.parentElement) && isElement(theTabParent) && theTabParent.tagName.toLowerCase() === "ul"){
									theTabPanel = $one(theTab.dataset.targetId||e.target.dataset.tabPanelId);
									theTabParent.removeChild(theTab);
									if(isElement(theTabPanel) && (theTabPanelParent = theTabPanel.parentElement) && isElement(theTabPanelParent)){
										theTabPanelParent.removeChild(theTabPanel);
									}
								}
							})
						}
					}
				}
			}
			return this;
		};
		
		this.goToTab = function(index) {
			if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
				if(isElement(tabNavigationLinks[activeIndex])) {
					if(activeTabAttr != "" && tabNavigationLinks[activeIndex].hasAttribute(activeTabAttr)) tabNavigationLinks[activeIndex].removeAttribute(activeTabAttr);
					if(activeTabLinkClass != "" && tabNavigationLinks[activeIndex].classList.contains(activeTabLinkClass)) removeClass(tabNavigationLinks[activeIndex],activeTabLinkClass);
					tabNavigationLinks[activeIndex].style.cssText += "transition: all linear 0.3s;";
				}
				if(isElement(tabNavigationLinks[index])) {
					if(activeTabAttr != "") tabNavigationLinks[index].setAttribute(activeTabAttr, "");
					if(activeTabLinkClass != "") addClass(tabNavigationLinks[index],activeTabLinkClass);
					tabNavigationLinks[index].style.cssText += "transition: all linear 0.3s;";
				}
				if(useAnimation && animationName != ""){
					if(isElement(tabContentContainers[activeIndex])) {
						if(activeTabAttr != "" && tabContentContainers[activeIndex].hasAttribute(activeTabAttr)) tabContentContainers[activeIndex].removeAttribute(activeTabAttr);
						if(activeTabContentClass != "" && tabContentContainers[activeIndex].classList.contains(activeTabContentClass)) tabContentContainers[activeIndex].classList.remove(activeTabContentClass);
						tabContentContainers[activeIndex].style.cssText += "display: none;transform: scale(0);overflow: hidden;opacity: 0;transition: all linear 0.3s;";
						if(tabContentContainers[activeIndex].classList.contains(animationName)) removeClass(tabContentContainers[activeIndex],animationName);
					}
					if(isElement(tabContentContainers[index])) {
						if(activeTabAttr != "") tabContentContainers[index].setAttribute(activeTabAttr, "");
						if(activeTabContentClass != "") addClass(tabContentContainers[index],activeTabContentClass);
						if(animationName === "zoom"){
							tabContentContainers[index].style.display = "block";
							setTimeout(function(){tabContentContainers[index].style.cssText += "transform: scale(1);overflow: auto;opacity: 1;transition: all linear 0.3s;";},500);
						} else addClass(tabContentContainers[index],animationName);
					}
				} else {
					if(isElement(tabContentContainers[activeIndex])) {
						tabContentContainers[activeIndex].removeAttribute(activeTabAttr);
						removeClass(tabContentContainers[activeIndex],activeTabContentClass);
						//tabContentContainers[activeIndex].style.cssText += "display:none;height:0;overflow: hidden;opacity: 0;transition: opacity linear 1s, height linear 0.3s;";
					}
					if(isElement(tabContentContainers[index])) {
						tabContentContainers[index].setAttribute(activeTabAttr, "");
						addClass(tabContentContainers[index],activeTabContentClass);
						if(isElement(tabContentContainers[activeIndex])) tabContentContainers[activeIndex].style.maxHeight = (el.offsetHeight - 35)+"px";
						//if(isElement(tabContentContainers[activeIndex])) tabContentContainers[activeIndex].style.height = tabContentContainers[index].scrollHeight+"px";
						//tabContentContainers[activeIndex].style.height = tabContentContainers[index].scrollHeight+"px";
						//tabContentContainers[activeIndex].style.height = (_parent.offsetHeight - _parent.children[0].offsetHeight - padding - border)+"px";
						//tabContentContainers[index].style.cssText += "display:block;overflow: auto;opacity: 1;transition: opacity linear 1s, height linear 0.5s;";
					}
				}
				activeIndex = index;
			}
			return this;
		};
		
		this.removeTab = function(tabId) {
			var theTab,theTabParent,theTabPanel,theTabPanelParent;
			var _parentDiv = $one(".tabs-wrapper",el) || el,
				_parentUl = $one(".pbd-tabs-nav",el),
				i = tabNavigationLinks.length  + (ti+1);
			
			if(isElement(tabId)){
				theTab = tabId.tagName.toLowerCase() === "li" ? tabId : tabId.parentElement;
				console.log("the tab is an element :=> "+theTab.className);
			} else if(isString(tabId)){
				theTab = $one(tabId,_parentUl);
				console.log("the tab is a string :=> "+theTab.className);
			} else if(isNumber(tabId) && tabNavigationLinks[tabId] && isElement(tabNavigationLinks[tabId])){
				theTab = tabNavigationLinks[tabId];
				console.log("the tab is a string :=> "+theTab.className);
			}
			//theTab = isElement(tabId) ? tabId.parentElement : $one(tabId),
			theTabPanel = $one(theTab.dataset.targetId||theTab.dataset.tabPanelId);
			if(isElement(theTab) && theTab.tagName.toLowerCase() === "li" && (theTabParent = theTab.parentElement) && isElement(theTabParent) && theTabParent.tagName.toLowerCase() === "ul"){
				theTabParent.removeChild(theTab);
				if(isElement(theTabPanel) && (theTabPanelParent = theTabPanel.parentElement) && isElement(theTabPanelParent)){
					theTabPanelParent.removeChild(theTabPanel);
				}
			}
			ti--;
			return this;
		};
		
		this.addTab = function(tabName,tabContent,tabType="text") {
			var newTab,newTabPanel,_parentDiv = $one(".tabs-wrapper",el) || el,
				_parentUl = $one(".pbd-tabs-nav",el),
				i = tabNavigationLinks.length  + (ti+1),
				tabName = tabName ?? "new-"+i,
				tabContent = tabContent ?? "no content submitted for this dynamic tab panel!";
				url = inputUrlSanitizer(tabContent);
				urlValid = isValidHttpUrl(tabContent);
			//alert(`${tabContent} -- ${urlValid}`);
			if(isElement(_parentUl) && isElement(_parentDiv)){
				newTab = tag$1("li",{"class":"pbd-tabs-nav-button new-tab-"+i,"data-target-id":"#new-tab-"+i},
					tag$1("a",{"class":"tab-button",href:"#",title:"view ("+tabName+") tab content"},
						tag$1("span",{"class":"tab-button-text"},tabName),
						tag$1("i",{"class":"fa fa-link"})
					),
					removeBtn = tag$1("span",{"class":"remove-tab-button",title:"remove tab"},
						tag$1("i",{"class":"fa fa-times","data-tab-id":".new-tab-"+i,"data-tab-panel-id":"#"+"new-tab-"+i})
					)
				);
				if(!_parentUl.contains(newTab)) _parentUl.appendChild(newTab);
				newTabPanel = tag$1("div",{id:"new-tab-"+i,"class":"pbd-tabs-panel"});
				//if(isValidUrl(tabContent)){
				if(urlValid/* url.status === true */){
					//marmottajax(tabContent/* url.sanitizedUrl */).success(function(_html){
					ajax(tabContent/* url.sanitizedUrl */).success(function(_html){
						html(newTabPanel,_html);
					}).error(function(er){
						html(newTabPanel,er.message);console.log(er.message);
					});
				} else {
					html(newTabPanel,tabContent);
				   // newTabPanel.innerHTML = tabContent;
				}
				if(!_parentDiv.contains(newTabPanel)) _parentDiv.appendChild(newTabPanel);
				
				tabNavigationLinks.push(newTab);
				tabContentContainers.push(newTabPanel);
				tabRemoveButtons.push(removeBtn);
				
				this.handleClick(newTab, i);
				removeBtn.addEventListener("click",function(e){
					_this.removeTab(this);
				});
				ti++
			}
			return this;
		};
		
		this.handleClick = function(link, index) {
			link.addEventListener('click',function(e){
				e.preventDefault();
				var target = this || e.target, targetId = target.getAttribute("data-target-id");
				if(isString(targetId)){
					selectedPanel = $one(targetId, el);
					if(isElement(selectedPanel)){
						removeClass(tabNavigationLinks,activeTabLinkClass);
						removeClass(tabContentContainers,activeTabContentClass);
						//css(tabContentContainers,{display:"none",overflow:"hidden",opacity:0,transition:"opacity linear 1s,height linear 0.3s"});
						addClass(target,activeTabLinkClass);
						if(useAnimation === true && isString(animationName)){
							_this.animate(selectedPanel, animationName);
						} else {
							/* selectedPanel.classList.add(activeTabContentClass);selectedPanel.style.cssText += "overflow: auto;opacity: 1;transition: opacity linear 1s, height linear 0.5s;"; */
							addClass(selectedPanel,activeTabContentClass);
							//css(selectedPanel,{display:"block","overflow":"auto","opacity":"1","transition":"opacity linear 1s, height linear 0.5s"});
						}
					}
				} else {
					_this.goToTab(index);
				}
			});
		};
		return this;
		//return {init, goToTab, addTab, removeTab};
	}
	
	const IframeTabs = function(options){
		var _this = this, ti=0, currentAnim = "", selectedTab, selectedPanel;
		const { tag, addClass, removeClass, toggleClass, css, html, on } = _;

		this.verbose = function verbose(options) {
			let cfg = this.config(options||{});
			console.log(cfg._config);
			return this;
		}
		
		this.config = function config(cfg={}){
			this._config = _.extend({
				tabContainer: '.iframe__tabs-main',
				tabLinksWrapper: '.akd-tabs-nav',
				tabLinks: '.akd-tabs-nav-item',
				tabPanelsWrapper: '.iframe__tabs-content',
				tabPanels: '.akd-tabs-panel',
				tabRemoveButtons: '.remove-tab-button',
				activeTabAttr: 'active-tab',
				activeTabLinkClass: 'tabs-nav-active',
				activeTabContentClass: 'active-panel',
				useAnimation : 0,
				animationName : "zoom",
				newTabBtn:"#new-tab-button",
				newTabInput:"#new-tab-input",
				newTabContent:"#new-tab-content",
				newTabType:"#new-tab-type",
				orientationBtn : "#tabs-orientation-button",
				expandBtn : "#tabs-expand-button",
				
				nextTabBtn : "#show-next-tab",
				prevTabBtn : "#show-prev-tab",
				
				emptyPanel : "#tab-empty",
				loadingPanel : "#tab-loading",
				
				startAt: null,
				duration: 1000,
				
				allowDuplicates: false,
				allowDropFileTypes: false
			}, cfg||{});
			
			this.tabContainer = this._config.tabContainer,
			this.tabLinksId = this._config.tabLinks,
			this.tabLinksButtonId = this._config?.tabLinksButtons??".tab-button",
			this.tabPanelId = this._config.tabPanels;
			
			this.$el = $one(this.tabContainer);
			
			if(!isElement(this.$el)){this.buildTabs(this.$el)}
			
			this.$orientationBtn = $one(this._config.orientationBtn,this.$el);
			this.$newTabBtn = $one(this._config.newTabBtn,this.$el);
			this.$newTabInput = $one(this._config.newTabInput,this.$el);
			this.$newTabContent = $one(this._config.newTabContent,this.$el);
			this.$newTabType = $one(this._config.newTabType,this.$el);
			
			this.$nextTabBtn = $one(this._config.nextTabBtn,this.$el);
			this.$prevTabBtn = $one(this._config.prevTabBtn,this.$el);
			
			this.$tabLinksWrapper = $one(this._config.tabLinksWrapper,this.$el);
			this.$tabPanelsWrapper = $one(this._config.tabPanelsWrapper,this.$el);
			
			this.$tabLinks = $all(this.tabLinksId,this.$el);
			this.$tabPanels = $all(this.tabPanelId,this.$el);
			this.$tabRemoveButtons = $all(this._config.tabRemoveButtons||".remove-tab-button",this.$el);
			
			this.$emptyPanel = $all(this._config.emptyPanel,this.$el);
			this.$loadingPanel = $all(this._config.loadingPanel,this.$el);
			
			this.activeTabAttr = this._config.activeTabAttr || 'is-active',
			this.useAnimation = this._config.useAnimation || false;
			this.animationName = this._config.animationName || "slide-h"; // slide-h, slide-v, fade, zoom
			this.activeTabLinkClass = this._config.activeTabLinkClass || 'active-tab';
			this.activeTabContentClass = this._config.activeTabContentClass || 'active-panel';
			this.startAt = this._config?.startAt??null;
			this.duration = this._config?.duration??1000;
			this.initCalled = false;
			this.currentAnim = this.animationName;
			
			this.activeIndex = this.startAt || 0;
			
			return this;
		}
		
		this.buildTabs = function buildTabs(_sPanel, _aniName){
			alert('building Tabs')
		}
		
		this.animate = function animate(_sPanel, _aniName, _aniDuraion){
			let duration = isNumber(_aniDuraion) || isNumeric(_aniDuraion) ? _aniDuraion : 1000;
			//if(this.activeTabAttr != "") _sPanel[index].setAttribute(this.activeTabAttr, "true");
			if(this.activeTabContentClass != "") addClass(_sPanel,this.activeTabContentClass);
			if(_aniName === "zoom"){
				//_sPanel.style.cssText += "display:block;transform-origin:center center;transform:scale(1);overflow:auto;opacity:1;transition:all linear 0.3s;";
				_sPanel.style.cssText += `display:block;transform-origin:center center;transform:scale(1);overflow:auto;opacity:1;transition:all linear ${duration}ms;`;
			} else if(_aniName === "slide-down"){
				_sPanel.style.cssText += `display:block;transform-origin:center center;transform:translateY(100%);overflow:auto;opacity:1;transition:all linear ${duration}ms;`;
			} else _sPanel.classList.add(_aniName);
			_this.currentAnim = _aniName;
			return this;
		}
			
		this.isValidHttpUrl = function isValidHttpUrl(string) {
			let url;
			try {
				url = new URL(string);
			} catch (e) {
				return false;  
			}
			return url.protocol === "http:" || url.protocol === "https:";
		}
			
		this.init = function init() {
			if (!this.initCalled) {
				let found_active_tab = false;
				this.initCalled = true;
				
				removeClass(this.$emptyPanel,this.activeTabContentClass);
				addClass(this.$loadingPanel,this.activeTabContentClass);
				
				for (var i = 0; i < this.$tabLinks.length; i++) {
					var link = this.$tabLinks[i]??null;
					var tabContent = this.$tabPanels[i]??null;
					if(isElement(link)) {
						// Attach Event Listeners to tab link
						this.handleClick(link, i);
						if(isNumber(this.startAt) && isElement(this.$tabLinks[this.startAt])) {
							if(isString(this.activeTabLinkClass)){
								removeClass(this.$tabLinks,this.activeTabLinkClass);
								addClass(this.$tabLinks[this.startAt],this.activeTabLinkClass);
							} else {
								css(this.$tabLinks,"display","none");
								this.$tabLinks[this.startAt].style.display = "block";
							}
						
							if(isElement(this.$tabPanels[this.startAt]) && this.$tabLinks[this.startAt].dataset.targetId && this.$tabLinks[this.startAt].dataset.targetId.replace('#','') === this.$tabPanels[this.startAt].id) {
								if(isString(this.activeTabContentClass)){	
									removeClass(this.$tabPanels,this.activeTabContentClass);
									addClass(this.$tabPanels[this.startAt],this.activeTabContentClass);
								} else {
									css(this.$tabPanels,{display:"none",overflow:"hidden",opacity:0,transition:"opacity linear 1s,height linear 0.3s"});
									css(this.$tabPanels[this.startAt],{display:"block","overflow":"auto","opacity":"1","transition":"opacity linear 1s, height linear 0.5s"});
								}
							}
							this.activeIndex = i;
						} else 
						// Check if any tab has an @activeTabLinkClass class
						if(link.classList.contains(this.activeTabLinkClass)){
							if(this.activeTabAttr != "") link.setAttribute(this.activeTabAttr, "");
							$tab_id = link.dataset.tabId??link.dataset.targetId;
							$tabPanel = $one($tab_id);
							removeClass(this.$tabPanels,this.activeTabContentClass);
							if(isElement($tabPanel)){
								found_active_tab = true;
								if(this.useAnimation && this.animationName != ""){
									removeClass(this.$tabPanels,this.animationName);
									//if(isElement(tabContent) && tabContent.classList.contains(this.animationName)) removeClass(tabContent,this.animationName);
									this.animate($tabPanel, this.animationName,this.duration);
								} else {
									setTimeout(function(){
										removeClass(this.$loadingPanel,this.activeTabContentClass);
										addClass($tabPanel,this.activeTabContentClass);
									},this.duration);
								}
							}
							this.activeIndex = i;
						}
					}
				}
				
				if(found_active_tab === false){
					setTimeout(function(){
						removeClass(this.$loadingPanel,this.activeTabContentClass);
						addClass(this.$emptyPanel,this.activeTabContentClass);
					},this.duration);
				}
				
				if(this.$orientationBtn && isElement(this.$orientationBtn)){
					this.$orientationBtn.addEventListener("click",function(e){
						toggleClass(_this.$el,"horizontal vertical");
					});
				}
				
				if(this.$newTabBtn && isElement(this.$newTabBtn)){
					this.$newTabBtn.addEventListener('click',function(e){
						e.preventDefault();
						var i = _this.$tabLinks.length  + (ti+1), 
						tab_name = (_this.$newTabInput && isElement(_this.$newTabInput)) ? _this.$newTabInput.value : "tab-new-"+i,
						tab_type = (_this.$newTabType && isElement(_this.$newTabType)) ? _this.$newTabType.value : "text",
						content = (_this.$newTabContent && isElement(_this.$newTabContent)) ? _this.$newTabContent.value ?? _this.$newTabContent.innerHTML : "";
						_this.addTab(tab_name,content,tab_type);
					});
					// this.$newTabType.onchange = e=> console.log(this.$newTabType.value)
				}
				
				if(this.$tabRemoveButtons && isArray(this.$tabRemoveButtons) && this.$tabRemoveButtons.length > 0){
					for(var i=0;i<this.$tabRemoveButtons.length;i++){
						var theTab,theTabParent,theTabPanel,theTabPanelParent,rBtn = this.$tabRemoveButtons[i];
						if(isElement(rBtn)){
							on(rBtn,"click",function(e){
								e.preventDefault();
								theTab = $one(this.dataset.tabId) || $one(e.target.dataset.tabId) || e.target.parentElement;
								if(isElement(theTab) && theTab.tagName.toLowerCase() === "li" && (theTabParent = theTab.parentElement) && isElement(theTabParent) && theTabParent.tagName.toLowerCase() === "ul"){
									theTabPanel = $one(theTab.dataset.targetId||e.target.dataset.tabPanelId);
									theTabParent.removeChild(theTab);
									if(isElement(theTabPanel) && (theTabPanelParent = theTabPanel.parentElement) && isElement(theTabPanelParent)){
										theTabPanelParent.removeChild(theTabPanel);
									}
								}
							})
						}
					}
				}
				
				let next_id,prev_id, 
				totalTabs = this.$tabLinks.length-1;
				
				if(this.$nextTabBtn && isElement(this.$nextTabBtn)){
					this.$nextTabBtn.addEventListener("click", function(e){
						e.preventDefault();
						next_id = (_this.activeIndex < totalTabs) ? (_this.activeIndex + 1) : 0;
						_this.goToTab(next_id);
						_this.activeIndex = next_id;
					});
				}
				
				if(this.$prevTabBtn && isElement(this.$prevTabBtn)){
					this.$prevTabBtn.addEventListener("click", function(e){
						e.preventDefault();
						prev_id = ( _this.activeIndex === 0 ? totalTabs : (_this.activeIndex - 1) )
						_this.goToTab(prev_id);
						_this.activeIndex = prev_id;
					});
				}
			}
			return this;
		}
		
		this.goToTab = function goToTab(index) {
			removeClass(this.$emptyPanel,this.activeTabContentClass);
			addClass(this.$loadingPanel,this.activeTabContentClass);
			if( (isString(index) && isSelector(index)) || isElement(index)){
				var target = $one(index), targetId = target.getAttribute("data-target-id");
				if(isString(targetId)){
					selectedPanel = $one(targetId, this.$el);
					if(isElement(selectedPanel)){
						removeClass(this.$tabLinks,this.activeTabLinkClass);
						removeClass(this.$tabPanels,this.activeTabContentClass);
						addClass(target,this.activeTabLinkClass);
						if(this.activeTabAttr != "") target.setAttribute(this.activeTabAttr, "");
						if(this.useAnimation === true && isString(this.animationName)){
							removeClass(this.$loadingPanel,this.activeTabContentClass);
							this.animate(selectedPanel, this.animationName, this.duration);
						} else {
							setTimeout(function(){
								removeClass(this.$loadingPanel,this.activeTabContentClass);
								addClass(selectedPanel,this.activeTabContentClass);
							},this.duration);
						}
					}
				}
			} else if (index !== this.activeIndex && index >= 0 && index <= this.$tabLinks.length) {
				if(isElement(this.$tabLinks[this.activeIndex])) {
					if(this.activeTabAttr != "" && this.$tabLinks[this.activeIndex].hasAttribute(this.activeTabAttr)) this.$tabLinks[this.activeIndex].removeAttribute(this.activeTabAttr);
					if(this.activeTabLinkClass != "" && this.$tabLinks[this.activeIndex].classList.contains(this.activeTabLinkClass)) removeClass(this.$tabLinks[this.activeIndex],this.activeTabLinkClass);
					this.$tabLinks[this.activeIndex].style.cssText += `transition: all linear ${this.duration};`;
				}
				
				if(isElement(this.$tabLinks[index])) {
					if(this.activeTabAttr != "") this.$tabLinks[index].setAttribute(this.activeTabAttr, "");
					if(this.activeTabLinkClass != "") addClass(this.$tabLinks[index],this.activeTabLinkClass);
					this.$tabLinks[index].style.cssText += `transition: all linear ${this.duration};`;
				}
				
				if(this.useAnimation && this.animationName != ""){
					if(isElement(this.$tabPanels[this.activeIndex])) {
						if(this.activeTabAttr != "" && this.$tabPanels[this.activeIndex].hasAttribute(this.activeTabAttr)) this.$tabPanels[this.activeIndex].removeAttribute(this.activeTabAttr);
						if(this.activeTabContentClass != "" && this.$tabPanels[this.activeIndex].classList.contains(this.activeTabContentClass)) this.$tabPanels[this.activeIndex].classList.remove(this.activeTabContentClass);
						this.$tabPanels[this.activeIndex].style.cssText += "display: none;transform: scale(0);overflow: hidden;opacity: 0;transition: all linear 0.3s;";
						if(this.$tabPanels[this.activeIndex].classList.contains(this.animationName)) removeClass(this.$tabPanels[this.activeIndex],this.animationName);
						
						if(isElement(this.$tabPanels[index])) {
							/* if(this.activeTabAttr != "") this.$tabPanels[index].setAttribute(this.activeTabAttr, "");
							if(this.activeTabContentClass != "") addClass(this.$tabPanels[index],this.activeTabContentClass);
							if(this.animationName === "zoom"){
								this.$tabPanels[index].style.display = "block";
								setTimeout(function(){_this.$tabPanels[index].style.cssText += "transform: scale(1);overflow: auto;opacity: 1;transition: all linear 0.3s;";},this.duration);
							} else addClass(this.$tabPanels[index],this.animationName); */
							this.animate(selectedPanel, this.animationName, this.duration);
							
						}
					}
				} else {
					if(isElement(this.$tabPanels[this.activeIndex])) {
						this.$tabPanels[this.activeIndex].removeAttribute(this.activeTabAttr);
						removeClass(this.$tabPanels[this.activeIndex],this.activeTabContentClass);
					
						if(isElement(this.$tabPanels[index])) {
							this.$tabPanels[index].setAttribute(this.activeTabAttr, "");
							if(isElement(this.$tabPanels[this.activeIndex])) this.$tabPanels[this.activeIndex].style.maxHeight = (this.$el.offsetHeight - 35)+"px";
							setTimeout(function(){
								removeClass(this.$loadingPanel,this.activeTabContentClass);
								addClass(this.$tabPanels[index],this.activeTabContentClass);
							},this.duration);
						}
					}
				}
				this.activeIndex = index;
			}
			return this;
		}
		
		this.removeTab = function removeTab(tabId) {
			var theTab,theTabParent,theTabPanel,theTabPanelParent;
			var _parentDiv = this.$tabPanelsWrapper || this.$el,
				i = this.$tabLinks.length  + (ti+1);
			
			if(isElement(tabId)){
				theTab = tabId.tagName.toLowerCase() === "li" ? tabId : tabId.parentElement;
			} else if(isString(tabId)){
				theTab = $one(tabId, this.$tabLinksWrapper);
			} else if(isNumber(tabId) && this.$tabLinks[tabId] && isElement(this.$tabLinks[tabId])){
				theTab = this.$tabLinks[tabId];
			}
			
			theTabPanel = $one(theTab.dataset.targetId||theTab.dataset.tabPanelId);
			if(isElement(theTab) && theTab.tagName.toLowerCase() === "li" && (theTabParent = theTab.parentElement) && isElement(theTabParent) && theTabParent.tagName.toLowerCase() === "ul"){
				theTabParent.removeChild(theTab);
				if(isElement(theTabPanel) && (theTabPanelParent = theTabPanel.parentElement) && isElement(theTabPanelParent)){
					theTabPanelParent.removeChild(theTabPanel);
				}
			}
			ti--;
			return this;
		}
			
		this.addTab = function addTab(item,tabContent,tabType="text") {
			var newTab,newTabPanel, i = this.$tabLinks.length  + (ti+1),
				tabContent = tabContent ?? "no content submitted for this dynamic tab panel!";
				//url = inputUrlSanitizer(tabContent);
				urlValid = this.isValidHttpUrl(tabContent);
			
			if(isElement(this.$tabLinksWrapper) && isElement(this.$tabPanelsWrapper)){
				if(isElement(item)){
					var tabName = item.textContent;
					var link = item.getAttribute('href');

					if (link === '#' || link === '' || link === undefined) {
						return;
					}

					var uniqueName = link.replace('./', '').replace(/["&'./:=?[\]]/gi, '-').replace(/(_)/gi, '-').replace(/(--)/gi, '');
					var navId = "tab-" + uniqueName;
					var tabId = "panel-" + uniqueName;

					if(tabType ) {}
				} else {
					var tabName = item ?? "new-tab"+i;
					var uniqueName = tabName.replace('./', '').replace(/["&'./:=?[\]]/gi, '-').replace(/(_)/gi, '-').replace(/(--)/gi, '');
					var navId = "tab-"+uniqueName;
					var tabId = "panel-"+uniqueName;
					
					if(tabType ) {
						if((tabType === "md" || tabType === "markdown") && marked){
							tabContent = marked(tabContent);
						}
					}
				}
				
				if (this._config.allowDuplicates) {
					tabId += "-" + Math.floor(Math.random() * 1000);
					navId += "-" + Math.floor(Math.random() * 1000);
				}
				
				navId = _.replaceAll(navId," ","-");
				tabId = _.replaceAll(tabId," ","-");
				
				if (!this._config.allowDuplicates && (isElement($one("#" + navId)) || $one("#" + navId).length > 0)) {
					this.goToTab("#" + navId);
					return this;
				}
				
				let tabNavStr = this.tabLinksId.replace(".","").replace("#","");
				let tabPanelStr = this.tabPanelId.replace(".","").replace("#","");
				newTab = tag$1("li",{"class":`${tabNavStr} ${navId}`, "id": navId, "data-target-id": "#"+tabId},
					tag$1("a",{"class":"tab-button",href: "#",title: "view ("+tabName+") tab content"},
						tag$1("i",{"class": "fa fa-link"}),
						tag$1("span",{"class": "tab-button-text"},tabName)
					),
					removeBtn = tag$1("span",{"class": "remove-tab-button",title: "remove tab"},
						tag$1("i",{"class": "fa fa-times","data-tab-id": "."+navId,"data-tab-panel-id": "#"+tabId})
					)
				);
				
				let panel_class = tabPanelStr + ((tabType === "md" || tabType === "markdown")?' markdown-wrapper':'');
				newTabPanel = tag$1("div",{id: tabId,"class": panel_class});
				//if(isValidUrl(tabContent)){
				if(isString(tabContent) && urlValid/* url.status === true */){
					// marmottajax(tabContent/* url.sanitizedUrl */).success(function(_html){html(newTabPanel,_html);}).error(function(er){html(newTabPanel,er.message);console.log(er.message);});
					fetch(tabContent/* url.sanitizedUrl */).then(function(_html){
						html(newTabPanel,_html.text());
					}).catch(function(er){
						html(newTabPanel,er.message);console.log(er.message);
					});
				} else if(isElement(tabContent)){
					newTabPanel.appendChild(tabContent);
				} else {
					html(newTabPanel,tabContent);
				}
				
				if(!this.$tabLinksWrapper.contains(newTab)) {
					this.$tabLinksWrapper.appendChild(newTab);
					this.$tabLinks.push(newTab);
					this.$tabRemoveButtons.push(removeBtn);
					
					this.handleClick(newTab, i);
					removeBtn.addEventListener("click",function(e){
						_this.removeTab(this);
					});
				}
				
				if(!this.$tabPanelsWrapper.contains(newTabPanel)) {
					this.$tabPanelsWrapper.appendChild(newTabPanel);
					this.$tabPanels.push(newTabPanel);
				}
				
				this.goToTab(newTab);
				
				ti++
			} else console.log('an error occurred: function/method ==> addTab')
			
			this.init();
			
			return this;
		}
		
		this.handleClick = function handleClick(link, index) {
			link.addEventListener('click',function(e){
				e.preventDefault();
				var target = this || e.target, targetId = target.getAttribute("data-target-id");
				if(isString(targetId)){
					selectedPanel = $one(targetId, _this.$el);
					if(isElement(selectedPanel)){
						removeClass(_this.$tabLinks,_this.activeTabLinkClass);
						removeClass(_this.$tabPanels,_this.activeTabContentClass);
						addClass(target,_this.activeTabLinkClass);
						if(_this.useAnimation === true && isString(_this.animationName)){
							_this.animate(selectedPanel, _this.animationName);
						} else {
							addClass(selectedPanel,_this.activeTabContentClass);
						}
					}
				} else {
					_this.goToTab(index);
				}
			});
		}
		
		return this;
		//return {config,verbose,init, goToTab, addTab, removeTab,handleClick};
	}

	const DnD = (selector, onDropCallback) => {
		var el_ = $one(selector);
		if(isElement(el)){
			this.dragenter = function(e) {
				e.stopPropagation();
				e.preventDefault();
				el_.classList.add('dropping');
			};

			this.dragover = function(e) {
				e.stopPropagation();
				e.preventDefault();
			};

			this.dragleave = function(e) {
				e.stopPropagation();
				e.preventDefault();
				//el_.classList.remove('dropping');
			};

			this.drop = function(e) {
				e.stopPropagation();
				e.preventDefault();
				el_.classList.remove('dropping');
				onDropCallback(e.dataTransfer.files, e);
			};

			el_.addEventListener('dragenter', this.dragenter, false);
			el_.addEventListener('dragover', this.dragover, false);
			el_.addEventListener('dragleave', this.dragleave, false);
			el_.addEventListener('drop', this.drop, false);
		}
	}
	
	const sliders = (slidesId,titleId,_showCls,_hideCls) => {
		const slides = $all(slidesId??'.slide'),
		slideTitleElem = $one(titleId),
		fullscreenKeyPressed = code => code === 70,// "f"
		leftKeyPressed = code => code === 37,// "left arrow"
		rightKeyPressed = code => code === 39;// "right arrow"
		shiftKeyPressed = code => code === 16;// "shift"
		let showCls = isString(_showCls) ? _showCls : "show", 
		hideCls = isString(_hideCls) ? _hideCls : "hide", 
		isfullScreen = false;
		fullscreenEnabled = document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

		/*Fullscreen Code Copied From Online*/

		function requestFullscreen(element) {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullScreen) {
				element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		}

		function exitFullscreen() {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}

		function handleHashChange() {
			const getSlideNumber = window.location.hash === '' ? 0 : (window.location.hash.slice(1) - 1);
			return getSlideNumber;
		}

		let CURRENT_SLIDE = handleHashChange() || 0;

		function showCurrentSlideOnly(index, cb) {
			let inx = index||0;
			slides.forEach(a => {
				a.classList.remove(showCls);
				a.classList.remove("active");
				a.classList.add(hideCls);
			});
			if(slides[inx]){
				slides[inx].classList.remove(hideCls);
				slides[inx].classList.add(showCls);
				slides[inx].classList.add("active");
				if(isElement(slideTitleElem)) slideTitleElem.innerHTML = slides[inx].dataset.title;
			}
			if(isFunction(cb)){
				cb.apply(null,[slides[inx], inx, slides])
			}
		}

		function showPrev(cb){
			if(CURRENT_SLIDE > 0) {
				window.location.hash = `#${CURRENT_SLIDE}`;
				CURRENT_SLIDE -= 1;
				showCurrentSlideOnly(CURRENT_SLIDE);
			}
			if(isFunction(cb)){
				cb.apply(null,[slides, CURRENT_SLIDE])
			}
			return this;
		}

		function showNext(cb){
			if(CURRENT_SLIDE < slides.length-1) {
				CURRENT_SLIDE += 1;
				showCurrentSlideOnly(CURRENT_SLIDE);
				window.location.hash = `#${CURRENT_SLIDE + 1}`;
			}
			if(isFunction(cb)){
				cb.apply(null,[slides, CURRENT_SLIDE])
			}
			return this;
		}
		document.addEventListener('keyup', function(e) {
			//if(shiftKeyPressed(e.keyCode)) {
			if(e.shiftKey === true) {
				if (document.fullscreenEnabled && fullscreenKeyPressed(e.keyCode)) {
					if(!isfullScreen)
						requestFullscreen(document.documentElement);
					else exitFullscreen();
					isfullScreen = !isfullScreen;

				}

				if(leftKeyPressed(e.keyCode)) {
					if(CURRENT_SLIDE > 0) {
						window.location.hash = `#${CURRENT_SLIDE}`;
						CURRENT_SLIDE -= 1;
						showCurrentSlideOnly(CURRENT_SLIDE);
					}

				}
				if (rightKeyPressed(e.keyCode)) {
					if(CURRENT_SLIDE < slides.length-1) {
						CURRENT_SLIDE += 1;
						showCurrentSlideOnly(CURRENT_SLIDE);
						window.location.hash = `#${CURRENT_SLIDE + 1}`;
					}
				}
			}
		});

		showCurrentSlideOnly(handleHashChange());
		return {showPrev,showNext,showCurrentSlideOnly,CURRENT_SLIDE};
	}
	
	//function carousel(id='#carousel',activeClass, intvl=2000,bgSize="100% 100%", enable_keyboard=false){
	function carousel(){
		let callback, cfg = {}, id='#carousel', activeClass = 'active', intvl=2000,bgSize="100% 100%", enable_keyboard=false;
		if(arguments.length >= 2 || isObject(arguments[0])){
			if(isObject(arguments[0]) && (cfg = arguments[0])){
				id = ("id" in cfg) ? cfg.id : id;
				activeClass = ("activeClass" in cfg) ? cfg.activeClass : activeClass;
				intvl = ("intvl" in cfg) ? cfg.intvl : intvl;
				bgSize = ("bgSize" in cfg) ? cfg.bgSize : bgSize;
				enable_keyboard = ("enable_keyboard" in cfg) ? cfg.enable_keyboard : enable_keyboard;
				callback = ("callback" in cfg) ? cfg.callback : callback;
			} else {
				id = arguments[0];
				//let activeClass = 'active', intvl=2000,bgSize="100% 100%", enable_keyboard=false;
			}
			
			if(isFunction(arguments[1])){
				callback = arguments[1];
			}
		} else {
			[id, activeClass, intvl, bgSize, enable_keyboard, callback] = arguments;
		}
		//console.log(id, arguments.length)
		let carousel = $one(id); //select the div with `id` of carousel
		if(!isElement(carousel)) return false;
		function getIndex(df_index = 0){
			let index = df_index;
			for(let i = 0;i<length;i++){
				let child = carousel.children[i];
				if(child.classList.contains(activeClass)) {index = i;continue;}
			}
			return index;
		}
		
		let children = Array.from(carousel.children), length = children.length, // total number of slides
		current = getIndex(0), // currently active image for the slideshow
		prev = length - 1, // previously active image for the slideshow
		CURRENT_SLIDE = 0,
		isfullScreen = false,
		fullscreenEnabled = document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;
		
		const fullscreenKeyPressed = code => code === 70,// "f"
		leftKeyPressed = code => code === 37,// "left arrow"
		upKeyPressed = code => code === 38,// "left arrow"
		rightKeyPressed = code => code === 39,// "right arrow"
		downKeyPressed = code => code === 40,// "right arrow"
		nKeyPressed = code => code === 78,// "'n' key"
		pKeyPressed = code => code === 80,// "'p' key"
		slideShow = (index, callback) => {
			if(isNumber(index) && isElement(children[index])){
				current = index;
				prev = (current - 1 + length) % length;
			}
			
			if(activeClass){
				children[current].classList.add(activeClass);
				children[prev].classList.remove(activeClass);
			} else {
				children[current].style.cssText += `visibility:visible;background-size:${bgSize};`; // show current slide
				children[prev].style.cssText += 'visibility:hidden;background-size:0;'; // hide previous slide
			}
			
			current = (current + 1) % length; // go to the next slide, if it is the last slide then go back to the first slide
			prev = (current - 1 + length) % length; // go to the previous slide if it is the first slide go to the last slide
			
			if(isFunction(callback)){
				callback.apply(null,[children[current], current, prev])
			}
		},
		show = (nextPrev, callback) => {
			if(isNumber(nextPrev) && isElement(children[nextPrev])){
				current = nextPrev;
				prev = (current - 1 + length) % length;
			} else {
				if(nextPrev === "next"){
					current = (current + 1) % length; // go to the next slide, if it is the last slide then go back to the first slide
					prev = (current - 1 + length) % length; // go to the previous slide if it is the first slide go to the last slide
				} else if(nextPrev === "prev"){
					prev = (current + 1) % length; // go to the next slide, if it is the last slide then go back to the first slide
					current = (current - 1 + length) % length; // go to the previous slide if it is the first slide go to the last slide
				}
			}
			
			if(activeClass){
				children.forEach(el => el.classList.remove(activeClass));
				//carousel.children[prev].classList.remove(activeClass);
				children[current].classList.add(activeClass);
			} else {
				children.forEach(el => el.style.cssText += 'visibility:hidden;background-size:0;');
				//carousel.children[prev].style.cssText += 'visibility:hidden;background-size:0;'; // hide previous slide
				children[current].style.cssText += `visibility:visible;background-size:${bgSize};`; // show current slide
			}
			
			if(isFunction(callback)){
				callback.apply(null,[children[current], current, prev])
			}
		},
		init = (start=false, callback) => {
			slideShow(current, callback); // call the function as soon as the page loads
			if(start||intvl) setInterval(slideShow, intvl); // run the function every 2 seconds
		},
		/*Fullscreen Code Copied From Online*/
		requestFullscreen = (element) => {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullScreen) {
				element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exitFullscreen = () => {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		};
		
		if(enable_keyboard === true){
			document.addEventListener('keyup', function(e) {
				//if(shiftKeyPressed(e.keyCode)) {
				if(e.shiftKey === true) {
					/* if (document.fullscreenEnabled && fullscreenKeyPressed(e.keyCode)) {
						if(!isfullScreen)
							requestFullscreen(document.documentElement);
						else exitFullscreen();
						isfullScreen = !isfullScreen;
					} */
					//console.log(e.keyCode);
					if(upKeyPressed(e.keyCode) || leftKeyPressed(e.keyCode) || pKeyPressed(e.keyCode)) {
						CURRENT_SLIDE -= 1;
						show('prev',CURRENT_SLIDE);
					}
					if(downKeyPressed(e.keyCode) || rightKeyPressed(e.keyCode) || nKeyPressed(e.keyCode)) {
						CURRENT_SLIDE += 1;
						show('next',CURRENT_SLIDE);
					}
				}
			});
		}
		
		if(isFunction(callback)){
			callback.apply(null,[children, current, prev])
		}
		
		return{init,show,slideShow};
	}
	const storage = {
		keyPrefix: '_akd_',
		hasLocalStorage : !!window.localStorage,
		setKeyPrefix(prefix) {
			if(prefix && typeof prefix === "string" && prefix.length > 1){
				this.keyPrefix = prefix
				return true;
			}
			return false;
		},
		/**
		 * Store a new settings in the browser
		 *
		 * @param String name Name of the setting
		 * @param String val Value of the setting
		 * @returns void
		*/
		set(key, value, parse = false) {
			if (typeof (Storage) === "undefined" || !window.localStorage) {
				window.alert('Please use a modern browser to properly view this template!');
				return false;
			} else {
				if(parse === true){value = JSON.stringify(value);}
				key = this.keyPrefix + key;
				localStorage.setItem(key, value);
				return true;
			}
		},
		/**
		 * Get a prestored setting
		 *
		 * @param String name Name of of the setting
		 * @returns String The value of the setting | null
		*/
		get(key,parse=false){
			//console.log(this.keyPrefix);
			if (typeof (Storage) === "undefined" || !window.localStorage) {
				window.alert('Please use a modern browser to properly view this template!');
				return false;
			} else {
				key = this.keyPrefix + key;
				return parse === true ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key);
			}
		},
		/**
		 * Remove a prestored setting
		 *
		 * @param String name Name of of the setting
		 * @returns String The value of the setting | null
		*/
		remove(key) {
			if (typeof (Storage) === "undefined" || !window.localStorage) {
				window.alert('Please use a modern browser to properly view this template!');
				return false;
			} else {
				key = this.keyPrefix + key;
				return localStorage.removeItem(key);
			}
		},
		/**
		 * Get a specific value from storage
		 *
		 * @param String key Name of the storage item
		 * @returns String The value of the setting | null
		*/
		key(key) {
			if (typeof (Storage) === "undefined" || !window.localStorage) {
				window.alert('Please use a modern browser to properly view this template!');
				return false;
			}
			key = this.keyPrefix + key;
			return localStorage.key(key);
		},
		/**
		 * Clear the entire storage
		 *
		 * @returns void | String The error message
		*/
		clear(){
			if(!!window.localStorage) {
				try{
					localStorage.clear();
					alert('localStorage.clear() succeeded.');
					return true;
				} catch (e) {
					alert('localStorage.clear() fail.'+e);
					return false;
				}
			}
		},
		entries : function(){
			var values = [],keys = Object.keys(localStorage),i = keys.length;
			while ( i-- ) {
				values.push( localStorage.getItem(keys[i]) );
			}
			/* var archive = [],i = 0, key;
			for (; key = keys[i]; i++) {archive.push( key + '=' + localStorage.getItem(key));}
			return archive;*/
			return values;
		},
		storageEventOutput:function (key, value) {
			/* <div class="wrapper">
	    	<h1>Event output</h1>
			<ul>
	    		<li>Key: <span class="my-key"></span></li>
				<li>Old value: <span class="my-old"></span></li>
				<li>New value: <span class="my-new"></span></li>
				<li>URL: <span class="my-url"></span></li>
				<li>Storage area: <span class="my-storage"></span></li>
			</ul>
			</div>*/
			window.addEventListener('storage', function(e) {
				document.querySelector('.my-key').textContent = e.key;
				document.querySelector('.my-old').textContent = e.oldValue;
				document.querySelector('.my-new').textContent = e.newValue;
				document.querySelector('.my-url').textContent = e.url;
				document.querySelector('.my-storage').textContent = JSON.stringify(e.storageArea);
			});
		}
	}
	
	function app(appName, appObject, appConfig){
		var $this = this;
		var _defaultConfig = {};
		appConfig = extend(_defaultConfig, appConfig || {});
		
		var $return = this.appLoader( appName, appObject, appConfig, this );
		return this;
	}
	// APP BUILDER / LOADER ========
	app.prototype.appLoader = function( appName, appObject, appConfig, context){
		var x,xl;
		this.$apps = {};
		this.$loadedApps = {};
		this.$app_index = 0;
		this.$app_name = null;
		this.$nativeApp = null;
		this.$localApp = null;
		this.$App = null;
		this.$context = context || _pbd;
		var localApps = [
			{app_id : "3409ghtc5g34",app_name : "test-app",app_type : "image",
				app_tags : "image, photo",
				app_description : "this is just a simple imagery application",
				app_callback : (...args) => {alert(this.app_description);return this;},
				app_extra : {},
				app_isLocal : true
			},
			{app_id : "1",app_name : "set-bg-app",
				app_type : "image",app_tags : ["background", "image", "photo"],
				app_description : "this is just a simple imagery application",
				app_callback : setBG,
				app_extra : {},
				app_isLocal : true
			} 
		];
		this.registerApp = function(app, name, config) {
			__akd._cache["apps"][ name ] = true;
			if( app && isObject( app ) ) {
				if( isPlainObject( app ) ){
					name = isString( name ) ? name : app.app_name ? app.app_name : "";
				} else if(isFunction( app )){
					name = app.name || app.displayName || "unknown-app-"+uid();
					app = {app_id:uid(),app_name:name,app_type:app.type||"",app_tags:[],app_description:"no description available",app_callback:app,app_extra:{}}
				}
				this.setApp( app, name, config, (this.$apps.length+1) );
			}
			return this;
		};
		this.isRegistered = function(appName) {
			let ret = false;
			if( isArray( this.$apps ) || isArrayLike( this.$apps ) ){
				for(var i = 0,l=this.$apps.length;i<l;i++){
					if( inArray(appName, this.$apps[i]) ){ret = true;}
				}
			} else {
				Object.keys(this.$apps).forEach(function (app,i){
					if(app === appName) ret = true;
				});
			}
			return ret;
		};
		this.setApp = function(app, app_name, app_config, app_index) {
			if(isObject(app) ) {
				app_name = isString( app_name ) ? app_name : ( isObject( app ) && app.app_name ? app.app_name : app );
				this.$app_name = app_name;
				this.$app_index = app_index || 0;
				this.$app_config = isPlainObject(app_config) ? app_config : {};
				if( !this.isRegistered( app_name ) ) {
					if( isArray(this.$apps) ) this.$apps.push( app );
					else if(isObject( this.$apps )) this.$apps[ app_name ] = app;
				}
			}
			return this;
		};
		this.getApp = function(appName,chain) {
			var is_registered = this.isRegistered( appName );
			if( isObject(this.$apps[ appName ] ) && is_registered ){
				// if( !( "app_isLocal" in this.$apps[ appName ] ) && !( "app_isNative" in this.$apps[ appName ] ) ) {this.$App = this.$apps[ appName ];}
				if( _typeof( this.$apps[ appName ].app_isLocal ) === "undefined" && _typeof( this.$apps[ appName ].app_isNative ) === "undefined" ) {this.$App = this.$apps[ appName ];}
				else if( _typeof( this.$apps[ appName ].app_isLocal ) !== "undefined" ) {this.$localApp = this.$apps[ appName ];}
				else if( _typeof( this.$apps[ appName ].app_isNative ) !== "undefined" ) {this.$nativeApp = this.$apps[ appName ];}
				if( !chain ) {
					return is_registered ? this.$apps[ appName ] : "";
				}
			}
			return this;
		};
		/*this.getApp = function(appName,chain) {var is_registered = this.isRegistered( appName );if( chain ) {this.$localApp = this.$apps[ appName ];//alert(this.$localApp.app_name);// for(var i in this.$apps) alert(i +" - "+this.$apps[ i ]);return this;} else return is_registered ? this.$apps[ appName ] : "";};*/
		this.buildApp = function (appObj, asPlainObject){
			if( appObj && isObject( appObj ) ){
				let newAppObj = {};
				extend(newAppObj,appObj);
				return newAppObj;
			}
			return this;
		};
		this.load = function(apps, register) {
			var $FnParams, $Fn, $appFn, $nativeFn, $localFn, $originalName, $appOriginalName, $nativeOriginalName, $localOriginalName, $camelizedName, $appCamelizedName, $nativeCamelizedName, $localCamelizedName, 
			appType = _typeof( apps ), util = _pbd.util(), unknownFnName = "unknown-function-"+uid();
			/// for(var i in this.$apps) alert(i +" - "+this.$apps[ i ].app_name);
			// Load Local Apps ---------------
			if( this.$localApp ){
				if( this.$localApp.app_callback && isFunction(this.$localApp.app_callback) ){
					$localOriginalName = this.$localApp.app_name;
					$localCamelizedName = camelize($localOriginalName);
					$localFn = this.$localApp.app_callback;
				} else if( this.$apps[ this.$localApp ] && this.$apps[ this.$localApp ].app_callback && isFunction(this.$apps[ this.$localApp ].app_callback) ){
					$localOriginalName = this.$apps[ this.$localApp ].app_name;
					$localCamelizedName = camelize($localOriginalName);
					$localFn = this.$apps[ this.$localApp ].app_callback;
				}
				if($localOriginalName && !this.$loadedApps[ $localOriginalName ] ){
					_pbd.fn[ $localOriginalName ] = _pbd.fn[ $localCamelizedName ] = /*this[ $localCamelizedName ] = */bind(this.$context,$localFn);
					this.$loadedApps[ $localOriginalName ] = true;
				}
				$localFn = $localOriginalName = $localCamelizedName = null;
			}
			// Load Native Apps ----------------
			if( this.$nativeApp ){
				if( this.$nativeApp.app_callback && isFunction(this.$nativeApp.app_callback ) ){
					$nativeOriginalName = this.$nativeApp.app_name;
					$nativeCamelizedName = camelize($nativeOriginalName);
					$nativeFn = this.$natveApp.app_callback;
				} else if( this.$apps[ this.$nativeApp ] && this.$apps[ this.$nativeApp ].app_callback && isFunction(this.$apps[ this.$nativeApp ].app_callback) ){
					$nativeOriginalName = this.$apps[ this.$nativeApp ].app_name;
					$nativeCamelizedName = camelize($nativeOriginalName);
					$nativeFn = this.$apps[ this.$nativeApp ].app_callback;
				}
				if($nativeOriginalName && !this.$loadedApps[ $nativeOriginalName ] ){
					this.$loadedApps[ $nativeOriginalName ] = true;
					_pbd.fn[ $nativeOriginalName ] = _pbd.fn[ $nativeCamelizedName ] = $nativeFn;
				}
				$nativeFn = $nativeOriginalName = $nativeCamelizedName = null;
			}
			// Load Other Apps ---------------
			if( this.$App ){
				if( this.$App.app_callback && isFunction(this.$App.app_callback) ){
					$appOriginalName = this.$App.app_name;
					$camelizedName = camelize($appOriginalName);
					$appFn = this.$App.app_callback;
				} else if( this.$apps[ this.$App ] && this.$apps[ this.$App ].app_callback && isFunction(this.$apps[ this.$App ].app_callback) ){
					$appOriginalName = this.$apps[ this.$App ].app_name;
					$appCamelizedName = camelize($appOriginalName);
					$appFn = this.$apps[ this.$App ].app_callback;
					//this[ this.$apps[ this.$App ] ] = this[ $camelizedName ] = this.$apps[ this.$App ].app_callback;
				}
				if($appOriginalName && !this.$loadedApps[ $appOriginalName ] ){
					this.$loadedApps[ $appOriginalName ] = true;
					_pbd.fn[ $appOriginalName ] = _pbd.fn[ $appCamelizedName ] = $appFn;
				}
				$appFn = $appOriginalName = $appCamelizedName = null;
			}
			// Load apps from the loader
			if( this.isRegistered( apps ) && !this.$loadedApps[ apps ] ){
				if( this.$apps[ apps ].app_callback && isFunction(this.$apps[ apps ].app_callback) ){
					$originalName = this.$apps[ apps ].app_name;
					$camelizedName = camelize($originalName);
					$Fn = this.$apps[ apps ].app_callback;
				}
				if($originalName && !this.$loadedApps[ $originalName ] ){
					this.$loadedApps[ $originalName ] = true;
					// this[ $originalName ] = this[ $camelizedName ] = $Fn;
					_pbd.fn[ $originalName ] = _pbd.fn[ $camelizedName ] = $Fn;
				}
				$Fn = $originalName = $camelizedName = null;
			} else {
				var appNames,is_comma = /,/i.test(appName),
				is_space = /\s+$/.test(appName);
				if(is_comma){appNames = appName.split(",");} 
				else if(is_space) {appNames = appName.split(" ");}
				$Fn = $originalName = $camelizedName = null;
				if(  isString( apps ) ){
					$originalName = apps;
					//var $FnParams = [1, 2, 3];
					//$Fn = apps();
					$Fn = window[ $originalName ];
					// if (typeof $Fn === "function") fnparams ? $Fn.apply(null, fnparams) : $Fn();
				} else if(isFunction(apps)) {
					$originalName = apps.name || apps.displayName || unknownFnName;
					$Fn = apps;
				} else if( isPlainObject( apps ) ){
					appObj = this.buildApp(apps);
					$originalName = appObj.app_name || false;
					$Fn = appObj.app_callback || null;
				} else if( appNames && isArray( appNames ) && appNames.length >= 2 ){
					/* var x = 0,total = appNames.length;
					for(;x<total;x++){if(_pbd.trim(appNames[ x ]) !== "") this.getApp(appNames[ x ],true).load();} */
					forEach(appNames, function (app){ if(__akd.trim(app) !== "") this.load(app);});
				}
				$camelizedName = camelize($originalName);
				if( $originalName && isFunction($Fn ) ){
					if(register){
						this.registerApp( $originalName );
					}
					//$Fn.apply(null, fnparams) : $Fn();
					this[ $originalName ] = this[ $camelizedName ] = $Fn;
					_pbd.fn[ $originalName ] = _pbd.fn[ $camelizedName ] = bind(this.$context,$Fn,_pbd);//$FnParams ? $Fn.apply(null, $FnParams) : $Fn;
				}
				$Fn = $originalName = $camelizedName = null;
			}
			return this;
		};
		for(x=0,xl=localApps.length;x<xl;x++){
			if( isObject( localApps[x] ) && isString( localApps[x].app_name ) ) this.setApp( localApps[x], localApps[x].app_name, {}, x);
		}
		if( isString(appName) ){
			var appNames,is_comma = /,/i.test(appName),
			is_space = /\s+$/.test(appName);
			if(is_comma){appNames = appName.split(",");} 
			else if(is_space) {appNames = appName.split(" ");}
			if( appNames && appNames.length >= 2 ){
				var x = 0,total = appNames.length;
				for(;x<total;x++){
					if(__akd.trim(appNames[ x ]) !== "") this.getApp(appNames[ x ],true).load();
				}
			} else this.getApp(appName,true).load();
		} else if(isObject(appName) ) {
			this.registerApp( appObject, appName, appConfig );
		} else {
			//this.loadApp( appName, appConfig );
			// return this;
		}
	};
	// TEMPLATE Engine
	const templater = function(){
		var that = this, route, routes = {}, el = null,  str = null, err = [],
		default_params = {viewId:'view','animation':null},
		params = arguments && arguments.length>0&& isObject(arguments[0]) ? arguments[0] : {};
			
		this.params = this.routeConfig = extend(default_params,params);
		this.hash = window.location.hash !== "" ? window.location.hash : this.params?.default_route || '/';
		this.routerUrl = location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
		this.routerView = '';
		//// A hash to store our routes:
		this.routes = {};
		// Put John's template engine code here...
		(function(){
			var cache = {};
			var _tmplCache = {};
			var _tmplCache2 = {};
			this.tmpl = function tmpl(str,data){
				err = err || [];
				try{
					var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(tmpl.load(str)) : 
					new Function("obj",
						"var p = [],print = function(){p.push.apply(p,arguments);};" + 
						"with(obj){p.push('" + 
						str.replace(/[\r\t\n]/g, " ")
						.replace(/'(?=[^%]*%>)/g,"\t").replace(/'(?=[^#]*#>)/g,"\t").replace(/'(?=[^%]*%})/g,"\t").replace(/'(?=[^}]*}})/g,"\t")
						.split("'").join("\\'").split("\t").join("'")
						.replace(/<%=(.+?)%>/g, "',$1,'").replace(/<#=(.+?)#>/g, "',$1,'").replace(/{%=(.+?)%}/g, "',$1,'").replace(/{{=(.+?)}}/g, "',$1,'")
						.split("<%").join("');").split("<#").join("');").split("{%").join("');").split("{{").join("');")
						.split("%>").join("p.push('").split("#>").join("p.push('").split("%}").join("p.push('").split("}}").join("p.push('")
					+ "');}return p.join('');");
					return isFunction(fn) ? ( data ? fn(data) : fn) : function (data){return tmpl(data);};
				} catch(e){alert(e.stack);err.push(e.message);
					return "{%= tmpl error: "+err.join(" \t\n")+" %}";
				}
			};
			this.parseTemplate = function parseTemplate(str,data){
				err = err || [];
				try{
					var func = _tmplCache[str];
					if(!func){
						var strFunc = "var p = [],print = function(){p.push.apply(p,arguments);};" + 
						"with(obj){"+
							"p.push('" + (
								str.replace(/\t(?![^#]*#>)/g,"\\t").replace(/(\r?\n)(?![^#]*#>)/g,"\\n")
								.replace(/\t(?![^%]*%>)/g,"\\t").replace(/(\r?\n)(?![^%]*%>)/g,"\\n")
								.replace(/\t(?![^{{]*}})/g,"\\t").replace(/(\r?\n)(?![^{{]*}})/g,"\\n")
								.replace(/[\r\t\n]/g," ")
								.replace(/'(?=[^%]*%>)/g,"\t")
								.replace(/'(?=[^#]*#>)/g,"\t")
								.split("'").join("\\'").split("\t").join("'")
								.replace(/<#=(.+?)#>/g,"',$1,'").split("<#").join("');").split("#>").join("p.push('")
								.replace(/<%=(.+?)%>/g,"',$1,'").split("<%").join("');").split("%>").join("p.push('")
								.replace(/{{=(.+?)}}/g,"',$1,'").split("{{").join("');").split("}}").join("p.push('")
							) + "');"+
						"}return p.join('');";
						func = new Function("obj",strFunc);
						_tmplCache[str] = func;
					}
					return func(data);
				} catch(e){err.push(e.message);
					return "{{= parseTemplate error: "+err.join(" \t\n")+" }}";
				}
			};
			this.tmpl.load = tmpl.load = function (id) {return document.getElementById(id).innerHTML;}
		})();
		function route(path, templateId, controller) {
			routes[path] = {templateId: templateId, controller: controller};
			that.routes[path] = {templateId: templateId, controller: controller};
			return this;
		};
		function notfound() {
			that.routerUrl = location.hash.slice(1) || '/';
			str = isElement(document.getElementById('not-found')) ? document.getElementById('not-found').innerHTML : (isElement(document.getElementById('not-found-template')) ? document.getElementById('not-found-template').innerHTML : '<h2>Not Found</h2><p>Sorry! I cannot find that page.</p>');
			msg = '<p>It would appear that link to the requested page is broken and/or the template was not found.</p>';
			return {templateId:'not-found',controller:{message:msg,page:that.routerUrl},str:str};
		}
		if(isElement(el)&&el.classList&&typeof that.params.animation === 'string'){el.classList.remove(that.params.animation);}
		function render(){
			var tmp,i=0;
			var url = location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
			var _route2 = that.routes[url];// Get route by url:
			str = str || ((_route2 && getBy("id", _route2.templateId)) ? getBy("id", _route2.templateId).innerHTML: ((_route2 && getBy("id", _route2.templateId + '-template')) ? getBy("id", _route2.templateId + '-template').innerHTML:notfound().str));
			el = el || getBy("id", that.params.viewId||'view');
			tpl = arguments&&arguments.length>=1?arguments[0]:that.routes[url];
			if(isFunction(tpl)){
				tpl(str,el,tmpl);
				// var callbackFunction = tpl;var callbackParams = [str,el];if(typeof callbackFunction === "function") tmp = callbackFunction.apply(null,callbackParams);else{var fn = window[callbackFunction];if(typeof fn === "function") tmp = fn.apply(null,callbackParams);}el.innerHTML = tmp;
			} else if(isPlainObject(tpl)){
				tmpl(tpl.templateId,(isPlainObject(tpl.controller) ? tpl.controller : new tpl.controller));
			} else if(isString(tpl)) {
				el.innerHTML = tpl;
			} else {
				el.innerHTML = tmpl(_route2.templateId,(isPlainObject(_route2.controller) ? _route2.controller : new _route2.controller));
			}
			return this;
		}
		function onHashChange2(e){
			var hash = (window.location.hash != '') ? window.location.hash : '#page-home';
			var target_url = hash;
			/* if(target_url.match(/^.*#/) || target_url.match(/^#/)){
			    var $win_height = $(window).height();
				var $top_nav_height = $('#nav_bar').height();
			    var effect = "";//$(target_url).hasClass('tools-page') ?  __akd.globals.showAnimClass : (getStorageItem('page-display-animation') || 'animated slideInDown');
			    var effect_time = 1000; 
			    var baseUrl = window.location.href.split('#')[0];
	            var backurl = baseUrl + hash;
	
	            $('.sidenav .sidenav-block a').removeClass('active-button');
	            $('#main .app-page').removeClass(effect).hide();
			    $(target_url).css({'min-height':($win_height-($top_nav_height+35))});
	
				if(effect == 'show') $(target_url).show(effect_time);
				else if(effect == 'fadein') $(target_url).fadeIn(effect_time);
				else $(target_url).css('display','block').addClass(effect);
				//$('.backbtn').attr('href',backurl).css('display','block');
				$('.sidenav .sidenav-block a').each(function(){
					var href = $(this).attr('href');
				    if(href == target_url || target_url.match(href)) {
					    var page_title = $(this).attr('title') || $(this).text() || $(this).html();
			            $('#current-page-title').html(page_title);
	                    document.title = 'PBD Developer Box | '+page_title;
						$(this).addClass('active-button');
					}
				});
			    $('#direct-page-finder input.direct-page-finder-url').val(hash);
			}*/
		}
		function onHashChange(e){
			//e.preventDefault();
			//let hash = that.hash;
			let hash = window.location.hash;
			var _loading_code = `<div class="bouncing-loader"><div></div><div></div><div></div></div>`;
			var _loading_error_code = '<p>An error has occured</p>';
			try{
				var $this = e.target,$win_height = window.innerHeight, $top_nav_height = 85,
				effect = that.routeConfig.animation;
				if(isElement($this)){
					var target_url = $this.dataset.targetId || $this.getAttribute('href');
					var effect = attr($this,'data-page-display-effect') || /* _pbd.dataStorage().get('page-display-effect') || */ 'fadeIn';
					__akd.globals.showAnimClass = effect;
					var effect_time = attr($this,'data-page-display-effecttime') || 1000;
					__akd.globals.animDuration = effect_time;
					var page_type = attr($this,'data-page-type') || '';
					var page_title = attr($this,'title') || $(this).text() || $(this).html();
					var baseUrl = window.location.href.split('#')[0];
					var backurl = baseUrl + hash;
					//$('.sidenav .sidenav-block a').removeClass('active-button');
					//$(that.routeConfig.router_pages_id).removeClass(effect).hide();
					var $target = $one(target_url), $elems = $all(that.routeConfig.router_pages_id);
					$elems.forEach($el => {removeClass($el,effect);css($el,{'min-height':'0px','display':'none'});});
					//removeClass($elems,effect);
					
					//$('#current-page-title').html(page_title);
				} else {
					target_url = hash;
				}
				//document.title = 'PBD Developer Box | '+page_title;
				if(target_url.match(/^.*#/) || target_url.match(/^#/)){
					if(inArray(hash, that.routeConfig.valid_routes) || inArray(hash.slice(1), that.routeConfig.valid_routes)){
						switch (hash) {
							case "#home":
								that.routerView.innerHTML = "<h1>Home page</h1>";
								break;
							case "#about":
								that.routerView.innerHTML = "<h1>About page</h1>";
								break;
							default:
								var $target = $one(target_url), $elems = $all(that.routeConfig.router_pages_id);
								$elems.forEach($el => {removeClass($el,effect);css($el,{'min-height':'0px','display':'none'});});
								//removeClass($elems,effect);
								//css($elems,{'min-height':'0px','display':'none'});
								addClass($target,effect);
								css($target,{'min-height':`${($win_height-$top_nav_height)}px`,'display':'block'});
							//break;
						}
					} else {
						that.routerView.innerHTML = "<h1>404 - Page Not Found</h1><p>The page "+hash+", was not found. Check url!";
					}
				} else {
					//e.preventDefault();
					//window.location.href = baseUrl + hash;
					if(isSet(attr($this,'data-page-id'))){
						var $target = $one(attr($this,'data-page-id'));
					} else var $target = $one('#main-ajax-container');
					
					if(isSet(attr($this,'data-method'))){
						var method = attr($this,'data-method');
					} else var method = 'GET';
					
					css($target,{'min-height':($win_height-($top_nav_height+35))});
		
					//if(effect == 'show') $target.show(effect_time).html(_loading_code);
					//else if(effect == 'fadein') $target.fadeIn(effect_time).html(_loading_code);
					//else {
						addClass($target,effect);
						css($target,{'display':'block'});
						html($target,_loading_code);
					//}
					if(page_type == 'iframe') {
						$iframe = '<iframe class="box box-info" src="'+target_url+'" style="width:100%;min-height:'+($win_height-($top_nav_height+35))+'px;" frameborder="0" scrolling="yes" sandbox="allow-scripts allow-forms allow-same-origin"></iframe>'
						+'<div class="spacer"></div>'
						+'<center><a href="#page-home" class="site-link btn btn-default"><i class="fa fa-home"></i>Home</a></center>';
						
						$('#full-page-loader-overlay').fadeOut('slow').removeClass('visible').addClass('hidden');
						if(effect == 'show') $target.html($iframe).show(effect_time);
						else if(effect == 'fadein') $target.html($iframe).fadeIn(effect_time);
						else $target.addClass(effect).css('display','block').html($iframe);
					} else if(page_type == 'child') {
						window.location = target_url;
					} else if(page_type == 'external') {
						inAppBrowserInit.browseNet(target_url);
					} else {
						ext = fileext(target_url);
						ajax({
							url: target_url,
							type: method,
							cache: false,
							dataType:(ext.toLowerCase() == 'md'||ext.toLowerCase() == 'txt')?'text':'',
							success: function (html) {
								$('#full-page-loader-overlay').fadeOut('slow').removeClass('visible').addClass('hidden');
								var result = parseContent(target_url,html);
								if(effect == 'show') $target.html(result).show(effect_time);
								else if(effect == 'fadein') $target.html(result).fadeIn(effect_time);
								else $target.addClass(effect).css('display','block').html(result);
							},
							error: function(html){
								$('#full-page-loader-overlay').fadeOut('slow').removeClass('visible').addClass('hidden');
								if(effect == 'show') $target.show(effect_time).html(_loading_error_code + "<br>\n" + html.responseText);
								else if(effect == 'fadein') $target.fadeIn(effect_time).html(_loading_error_code + "<br>\n" + html.responseText);
								else $target.addClass(effect).css('display','block').html(_loading_error_code + "<br>\n" + html.responseText);
							}
						});
					}
				}
				//$('html,body').animate({scrollTop: 0}, 1000);
			} catch(e){alert(e.stack);console.log(e.stack,e);}
		}
		function setRoute(e){
			try{
				var _hash = window.location.hash;
				if(/#\//.test(_hash)){
					el = el || document.getElementById(that.params.viewId||'view');
					var url = location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
					var _route = routes[url];
					if(_route&&_route.templateId&&_route.controller){
						// Do we have both a view and a route?
						str = str || (getBy("id", _route.templateId)?document.getElementById(_route.templateId).innerHTML:(document.getElementById(_route.templateId + '-template')?document.getElementById(_route.templateId + '-template').innerHTML:""));
						if(el &&  _route.controller) {
							if(typeof that.params.animation === 'string'){el.classList.add(that.params.animation);}
							// Render route template with John Resig's template engine:
							//render(parseTemplate(str,(isPlainObject(_route.controller) ? _route.controller : new _route.controller)));
							//el.innerHTML = tmpl(_route.templateId,(isPlainObject(_route.controller) ? _route.controller : new _route.controller));
							render(tmpl(_route.templateId,( isPlainObject(_route.controller) ? _route.controller : new _route.controller)));
						}
					} else {
						_route = {templateId:notfound().templateId,controller:notfound().controller,str:notfound().str};
						render(parseTemplate(_route.str,(isPlainObject(_route.controller) ? _route.controller : new _route.controller)));
						//render(notfound().str);
					}
					console.log('using route '+_route.str)
				} else {
					onHashChange(e);
					//hashApp();
			
					console.log('using hash change event '+that.hash)
				}
			} catch(e){console.log(e.stack);err.push(e);el.innerHTML = "{{= error: "+err.join(" \t\n")+" }}";}
		};
		function hashApp(cfg) {
			var routeConfig = {
				default_route : "home",
				router_view : "router-view",
				router_pages_id : ".app-page",
				router_links : ["#link1", ".links"], // string ('#link','.link') | element object/s | array containing string and or element object/s
				valid_routes : []
			}
			routeConfig = extend(routeConfig, cfg);
			that.routeConfig = extend(that.routeConfig, routeConfig);
			that.hash = window.location.hash !== "" ? window.location.hash : that.routeConfig.default_route || '#page-home';
			that.routerView = getBy("id",that.routeConfig.router_view || "router-view");
			//const routerLinks = getElements(that.routeConfig.router_links);
			const routerLinks = $all(that.routeConfig.router_links);
			//if (!(that.routerView instanceof HTMLElement)) {
			if (!isElement(that.routerView )) {
				throw new ReferenceError("No router view element available for rendering");
			}
			/* if(routerLinks && isArray(routerLinks)){
				each(routerLinks, function(i){
					if(isElement(routerLinks[i])) {
						//on(document,"click",onClick,{target:that.routeConfig.router_links[i]});
						routerLinks[i].addEventListener("click",onClick);
					}
				});
			}
			if(isString(that.routeConfig.router_links)) {
				on(document,"click",onClick,{target:that.routeConfig.router_links});
			} */
			//$(window).hashchange();
			//window.addEventListener('hashchange',onHashChange);
			
		};
		// Listen on hash change:
		window.addEventListener('hashchange', setRoute);
		// Listen on page load:
		window.addEventListener('load', setRoute);
		//document.addEventListener(clickEvent, onclick, false);
		return {route:route,addRoute:route,add:route,render:render,hashApp:hashApp};
	};
	// ----------------------------------------------------------------
	// Either remove this function or modify/improve it, currently it is useless 
	const Router = {
		routes: [], mode: null, root: '/', container : "",
		config: function(options) {
			this.container = !('container' in options) ? document.body : ( isElement(options.container) ? options.container : isString(options.container) ? $one(options.container) : false );
			this.mode = options && options.mode && options.mode == 'history' && !!(history.pushState) ? 'history' : 'hash'; 
			this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/'; 
			return this;
		}, 
		getFragment: function() {
			var fragment = '';
			if(this.mode === 'history') {
				fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
				fragment = fragment.replace(/\?(.*)$/, '');
				fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
			} else {
				var match = window.location.href.match(/#(.*)$/);
				fragment = match ? match[1] : '';
			}
			return this.clearSlashes(fragment);
		}, 
		clearSlashes: function(path) {
			return path.toString().replace(/\/$/, '').replace(/^\//, '');
		}, 
		add: function(re, handler) {
			if(typeof re == 'function') { handler = re; re = ''; }
			this.routes.push({ re: re, handler: handler});
			return this;
		},
		remove: function(param) {
			for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
				if(r.handler === param || r.re.toString() === param.toString()) {
					this.routes.splice(i, 1); return this;
				}
			}
			return this;
		},
		flush: function() {this.routes = []; this.mode = null; this.root = '/'; return this; }, 
		check: function(f) {
			var fragment = f || this.getFragment();
			for(var i=0; i<this.routes.length; i++) {
				var match = fragment.match(this.routes[i].re);
				if(match) {
					match.shift();
					this.routes[i].handler.apply({}, match);
					return this;
				}
			}
			return this;
		}, 
		listen: function() {
			var self = this;
			var current = self.getFragment();
			var fn = function() {
				if(current !== self.getFragment()) {
					current = self.getFragment();
					self.check(current);
				}
			}
			clearInterval(this.interval);
			this.interval = setInterval(fn, 50);
			return this;
		},
		navigate: function(path) {
			path = path ? path : '';
			if(this.mode === 'history') {
				history.pushState(null, null, this.root + this.clearSlashes(path));
			} else {
				window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
			}
			return this;
		}
	};
	// configuration Router.config({ mode: 'history'});
	// returning the user to the initial state Router.navigate();
	// adding routes Router.add(/about/, function() { console.log('about'); }).add(/products\/(.*)\/edit\/(.*)/, function() { console.log('products', arguments); }).add(function() { console.log('default'); }).check('/products/12/edit/22').listen();
	// forwarding Router.navigate('/about');
	
	// ----------------------------------------------------------------
	const templater2 = (function ($) {
		//'use strict'
		var tmpl =  function (str, data) {
			var f = !/[^\w\-.:]/.test(str) ? (tmpl.cache[str] = tmpl.cache[str] || tmpl(tmpl.load(str))) : new Function(tmpl.arg + ',tmpl', 'var _e=tmpl.encode' + tmpl.helper + ",_s='" + str.replace(tmpl.regexp, tmpl.func) + "';return _s;");
			return data ? f(data, tmpl) : function (data) {return f(data, tmpl);}
		}
		tmpl.cache = {};
		tmpl.load = function (id) {return document.getElementById(id).innerHTML;}
		tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
		tmpl.func = function (s, p1, p2, p3, p4, p5) {
			if (p1) {return ({'\n': '\\n', '\r': '\\r', '\t': '\\t', ' ': ' '}[p1] || '\\' + p1)/* whitespace, quote and backspace in HTML context */}
			if (p2) {if (p2 === '=') {return "'+_e(" + p3 + ")+'"}return "'+(" + p3 + "==null?'':" + p3 + ")+'";/* interpolation: {%=prop%}, or unescaped: {%#prop%} */}
			if (p4) {return "';";/* evaluation start tag: {% */}
			if (p5) {return "_s+='";/* evaluation end tag: %} */}
		}
		tmpl.encReg = /[<>&"'\x00]/g // eslint-disable-line no-control-regex
		tmpl.encMap = {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;'}
		tmpl.encode = function(s){return (s == null ? '' : '' + s).replace(tmpl.encReg, function(c){return tmpl.encMap[c] || ''});}
		tmpl.arg = 'o'
		tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" + ',include=function(s,d){_s+=tmpl(s,d);}'
		//$.tmpl = tmpl;
		return tmpl;
	})(this);
	// ----------------------------------------------------------------
	/**
	 * JavaScript implementation of common blending modes, based on
	 * http://stackoverflow.com/questions/5919663/how-does-photoshop-blend-two-images-together
	 *
	 * Note that I'm not using <code>this</code> to reference current object
	 * for faster execution
	 */
	const blendingModes = {
		normal: function(a, b){return a;},
		lighten: function(a, b){return (b > a) ? b : a;},
		darken: function(a, b){return (b > a) ? a : b;},
		multiply: function(a, b){return (a * b) / 255;},
		average: function(a, b){return (a + b) / 2;},
		add: function(a, b){return Math.min(255, a + b);},
		substract: function(a, b){return (a + b < 255) ? 0 : a + b - 255;},
		difference: function(a, b){return Math.abs(a - b);},
		negation: function(a, b){return 255 - Math.abs(255 - a - b);},
		screen: function(a, b){return 255 - (((255 - a) * (255 - b)) >> 8);},
		exclusion: function(a, b){return a + b - 2 * a * b / 255;},
		overlay: function(a, b){return b < 128 ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255);},
		softLight: function(a, b){return b < 128 ? (2 * ((a >> 1) + 64)) * (b / 255) : 255 - (2 * (255 - (( a >> 1) + 64)) * (255 - b) / 255);},
		hardLight: function(a, b){return blendingModes.overlay(b, a);},
		colorDodge: function(a, b){return b == 255 ? b : Math.min(255, ((a << 8 ) / (255 - b)));},
		colorBurn: function(a, b){return b == 0 ? b : Math.max(0, (255 - ((255 - a) << 8 ) / b));},
		linearDodge: function(a, b){return blendingModes.add(a, b);},
		linearBurn: function(a, b){return blendingModes.substract(a, b);},
		linearLight: function(a, b){return b < 128 ? blendingModes.linearBurn(a, 2 * b) : blendingModes.linearDodge(a, (2 * (b - 128)));},
		vividLight: function(a, b){return b < 128 ? blendingModes.colorBurn(a, 2 * b) : blendingModes.colorDodge(a, (2 * (b - 128)));},
		pinLight: function(a, b){return b < 128 ? blendingModes.darken(a, 2 * b) : blendingModes.lighten(a, (2 * (b - 128)));},
		hardMix: function(a, b){return blendingModes.vividLight(a, b) < 128 ? 0 : 255;},
		reflect: function(a, b){return b == 255 ? b : Math.min(255, (a * a / (255 - b)));},
		glow: function(a, b){return blendingModes.reflect(b, a);},
		phoenix: function(a, b){return Math.min(a, b) - Math.max(a, b) + 255;}
	};
	const sokx = (url, opts) => {
		opts = opts || {};
		var ws, num=0, timer=1, __={};
		var max = opts.maxAttempts || Infinity;
	
		__.open = function () {
			ws = new WebSocket(url, opts.protocols || []);
	
			ws.onmessage = opts.onmessage || noop;
	
			ws.onopen = function (e) {
				(opts.onopen || noop)(e);
				num = 0;
			};
	
			ws.onclose = function (e) {
				e.code === 1e3 || e.code === 1001 || e.code === 1005 || __.reconnect(e);
				(opts.onclose || noop)(e);
			};
	
			ws.onerror = function (e) {
				(e && e.code==='ECONNREFUSED') ? __.reconnect(e) : (opts.onerror || noop)(e);
			};
		};
	
		__.reconnect = function (e) {
			if (timer && num++ < max) {
				timer = setTimeout(function () {
					(opts.onreconnect || noop)(e);
					__.open();
				}, opts.timeout || 1e3);
			} else {
				(opts.onmaximum || noop)(e);
			}
		};
	
		__.json = function (x) {
			ws.send(JSON.stringify(x));
		};
	
		__.send = function (x) {
			ws.send(x);
		};
	
		__.close = function (x, y) {
			timer = clearTimeout(timer);
			ws.close(x || 1e3, y);
		};
	
		__.open(); // init
	
		return __;
	}
	/*function setBG(arr, cfg) {
		var z, i, elmnt=null, file=null,
		_def = {
			backgroundColor : '#ff0000',
			backgroundAttachment : 'fixed', //scroll,fixed,initial,inherit,local,unset
			backgroundSize : "100% 100%", //auto,cover,contain,
        	backgroundPosition : "center center",
            backgroundRepeat : "no-repeat",
            backgroundClip : "no-clip", //no-clip,border-box,content-box,padding-box
            backgroundColor : "transparent"
		};
		cfg = extend(_def, cfg || {});
		z = isArray( arr ) || isArrayLike( arr ) ? arr : _typeof(arr) === "string" ? $all(arr) : $all("[data-background-image]");
		if( !z ) z = document.getElementsByTagName("*");
		if(z.length && z.length > 0){
				
				for (i = 0; i < z.length; i++) {
					elmnt = z[i];
					if(isElement(elmnt)){
						file = elmnt.getAttribute("data-background-image");
						if(file){
							cfg.backgroundImage = "url('"+file+"')";
							Object.assign(elmnt.style, cfg);
							//elmnt.style.cssText += 'background-image:url("'+file+'");background-attachment:fixed;background-position:center;background-repeat:no-repeat;background-size:cover;';
						}
					}
				}
			//}
		} else {
			elmnt = arr;
			if(isElement(elmnt)){
				file = elmnt.getAttribute("data-background-image");
				if(file){
					cfg.backgroundImage = "url('"+file+"')";
					Object.assign(elmnt.style, cfg);
					// elmnt.style.cssText += 'background-image:url("'+file+'");background-attachment:fixed;background-position:center;background-repeat:no-repeat;background-size:cover;';
				}
			}
		}
		return this;
	}; */
	// ----------------------------------------------------------------
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
	
	const parseTemplate = (obj,tmpl) => {
		if(obj && typeof(obj) !== "object"){
			console.log(`the first argument has to be an object, a/n ${typeof obj} was passed instead`);
			return false;
		}
		
		if(tmpl && typeof(tmpl) !== "string"){
			console.log(`the second argument has to be an string, a/n ${typeof obj} was passed instead`)
			return false;
		}
		
		var tmp = '';
			
		for(let i in obj){
			if(tmp == '') tmp = tmpl.replace(new RegExp(escapeRegExp(i), 'g'),obj[i]??"???")
			else tmp = tmp.replace(new RegExp(escapeRegExp(i), 'g'),obj[i]??"???")
		}
		
		return tmp;
	}
	
	const selectText = (e) => {
		if (document.selection) {
			var tr = document.body.createTextRange();
			tr.moveToElementText($one(e));
			tr.select()
		} else if (window.getSelection) {
			var tr = document.createRange();
			tr.selectNode($one(e));
			window.getSelection().addRange(tr)
		}
	}
	
	const selectCode = (a) => {
		let e = a?.parentNode?.getElementsByTagName('PRE')[0]??null/*  || document.getElementById(a) */;
		if(!e) e = $one(a);
		if (window.getSelection) {
			var s = window.getSelection();
			if (s.setBaseAndExtent) {
				s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);
			} else {
				var r = document.createRange();
				r.selectNodeContents(e);
				s.removeAllRanges();
				s.addRange(r);
			}
		} else if (document.getSelection) {
			var s = document.getSelection();
			var r = document.createRange();
			r.selectNodeContents(e);
			s.removeAllRanges();
			s.addRange(r);
		} else if (document.selection) {
			var r = document.body.createTextRange();
			r.moveToElementText(e);
			r.select();
		}
	}
	
	let urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	let dataUrlRegexp = /^data:.+\,.+$/;

	const urlParse = (aUrl) => {
		var match = aUrl.match(urlRegexp);
		if (!match) {
			return null;
		}
		return {
			scheme: match[1],
			auth: match[2],
			host: match[3],
			port: match[4],
			path: match[5]
		};
	}
	
	function urlGenerate(aParsedUrl) {
		var url = '';
		if (aParsedUrl.scheme) {
			url += aParsedUrl.scheme + ':';
		}
		url += '//';
		if (aParsedUrl.auth) {
			url += aParsedUrl.auth + '@';
		}
		if (aParsedUrl.host) {
			url += aParsedUrl.host;
		}
		if (aParsedUrl.port) {
			url += ":" + aParsedUrl.port
		}
		if (aParsedUrl.path) {
			url += aParsedUrl.path;
		}
		return url;
	}
	
	function isUrlRequest(url, root) {
		// An URL is not an request if

		// 1. It's an absolute url and it is not `windows` path like `C:\dir\file`
		if (/^[a-z][a-z0-9+.-]*:/i.test(url) && !path.win32.isAbsolute(url)) {
			return false;
		}

		// 2. It's a protocol-relative
		if (/^\/\//.test(url)) {
			return false;
		}

		// 3. It's some kind of url for a template
		if (/^[{}[\]#*;,'§$%&(=?`´^°<>]/.test(url)) {
			return false;
		}

		// 4. It's also not an request if root isn't set and it's a root-relative url
		if ((root === undefined || root === false) && /^\//.test(url)) {
			return false;
		}

		return true;
	}
	
	//module.exports = escapeHtml;

	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */
	
	var matchHtmlRegExp = /["'&<>]/;
	function escapeHtml$1(string) {
		var str = '' + string;
		var match = matchHtmlRegExp.exec(str);

		if (!match) {
			return str;
		}

		var escape;
		var html = '';
		var index = 0;
		var lastIndex = 0;

		for (index = match.index; index < str.length; index++) {
			switch (str.charCodeAt(index)) {
				case 34: // "
					escape = '&quot;';
					break;
				case 38: // &
					escape = '&amp;';
					break;
				case 39: // '
					escape = '&#39;';
					break;
				case 60: // <
					escape = '&lt;';
					break;
				case 62: // >
					escape = '&gt;';
					break;
				default:
					continue;
			}

			if (lastIndex !== index) {
				html += str.substring(lastIndex, index);
			}

			lastIndex = index + 1;
			html += escape;
		}

		return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
	}
	
	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
	function escape_string_regexp(str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe, '\\$&');
	}
	
	/**
	 * RegExp to match non-URL code points, *after* encoding (i.e. not including "%")
	 * and including invalid escape sequences.
	 * @private
	 */

	var ENCODE_CHARS_REGEXP = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g

	/**
	 * RegExp to match unmatched surrogate pair.
	 * @private
	 */

	var UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g

	/**
	 * String to replace unmatched surrogate pair with.
	 * @private
	 */

	var UNMATCHED_SURROGATE_PAIR_REPLACE = '$1\uFFFD$2'

	/**
	 * Encode a URL to a percent-encoded form, excluding already-encoded sequences.
	 *
	 * This function will take an already-encoded URL and encode all the non-URL
	 * code points. This function will not encode the "%" character unless it is
	 * not part of a valid sequence (`%20` will be left as-is, but `%foo` will
	 * be encoded as `%25foo`).
	 *
	 * This encode is meant to be "safe" and does not throw errors. It will try as
	 * hard as it can to properly encode the given URL, including replacing any raw,
	 * unpaired surrogate pairs with the Unicode replacement character prior to
	 * encoding.
	 *
	 * @param {string} url
	 * @return {string}
	 * @public
	 */

	function encodeUrl (url) {
		return String(url)
			.replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE)
			.replace(ENCODE_CHARS_REGEXP, encodeURI)
	}
	// Fetch data from TEXT/JSON file 
	async function fetchFile(url, resType="json", cfg={}, cb) {
		if(!isString(url)) return {};
		//url = url || `${DATA_URL}database.json`;
		resType = resType || `json`;
		cfg = cfg || {};
		
		const res = await fetch(url, cfg);
		const data = await res[resType]();
		if(cb && typeof cb === "function"){
			//cb.call(null, ...data);
			cb(data);
			return;
		}
		return data;
	}
	const cleanElementInsert = function( el, child) {if(!el || !child) return false;var cloned = false;if(isArrayLike(el) || isArray(el) || (el.length && el.length > 0)) {clonedNode = [];forEach(el,function(i){clonedNode[i] = child.cloneNode( true );elem = el[i];if(isElement(elem)){while(elem.firstChild){elem.removeChild(elem.firstChild);}elem.appendChild(clonedNode[i]);}});} else {while(el.firstChild){el.removeChild(el.firstChild);}el.appendChild(child);}return this;}

	//------------------------------------------------------------------------------------------
	class AjaxPromise{
		constructor(promise){
			this.promise = promise
		}
		
		done(cb){
			this.promise = this.promise.then(data => {
				cb(data)
				return data
			})
			return this
		}
		
		success(cb){
			this.promise = this.promise.then(data => {
				cb(data)
				return data
			})
			return this
		}
		
		fail(cb){
			this.promise = this.promise.catch(cb)
			return this
		}
		
		error(cb){
			this.promise = this.promise.catch(cb)
			return this
		}
		
		always(cb){
			this.promise = this.promise.finally(cb)
			return this
		}
	}
		
	// --------------------- // http://www.iana.org/assignments/http-status-codes/http-status-codes.xml 
	const _HTTPStatus = {
		0: "Offline : Ajax Requests Works On A Server Only!",
		100: "Continue",101: "Switching Protocols",102: "Processing",
		200: "OK",201: "Created",202: "Accepted",
		203: "Non-Authoritative Information",204: "No Content",205: "Reset Content",
		206: "Partial Content",207: "Multi-Status",208: "Already Reported",226: "IM Used",
		300: "Multiple Choices",301: "Moved Permanently",302: "Found",303: "See Other",
		304: "Not Modified",305: "Use Proxy",306: "Reserved",
		307: "Temporary Redirect",308: "Permanent Redirect",
		400: "Bad Request",401: "Unauthorized",402: "Payment Required",
		403: "Forbidden",404: "Not Found",405: "Method Not Allowed",
		406: "Not Acceptable",407: "Proxy Authentication Required",
		408: "Request Timeout",409: "Conflict",410: "Gone",411: "Length Required",
		412: "Precondition Failed",413: "Request Entity Too Large",
		414: "Request-URI Too Long",415: "Unsupported Media Type",
		416: "Requested Range Not Satisfiable",417: "Expectation Failed",
		422: "Unprocessable Entity",423: "Locked",424: "Failed Dependency",
		425: "Unassigned",426: "Upgrade Required",427: "Unassigned",
		428: "Precondition Required",429: "Too Many Requests",
		430: "Unassigned",431: "Request Header Fields Too Large",
		500: "Internal Server Error",501: "Not Implemented",502: "Bad Gateway",
		503: "Service Unavailable",504: "Gateway Timeout",
		505: "HTTP Version Not Supported",506: "Variant Also Negotiates (Experimental)",
		507: "Insufficient Storage",508: "Loop Detected",509: "Unassigned",
		510: "Not Extended",511: "Network Authentication Required"
	};
	
	__akd._HTTPStatus = _HTTPStatus;
	__akd.active_ajax_calls = 0;
	const xhr = {
		// util : _pbd.util(),
		util : {},
		XHR_Obj : false,
		XHR_Url : null,
		progressBar : false,
		progressBarExists : !!$one("#progress_bar"),
		responseContent : null,
		active_ajax_calls: 0,
		lastModified: {},// Last-Modified header cache for next request
		etag: {},
		validMethods : ["get", "post", "put", "delete", "head"],
		validResposeType : ["arrayBuffer", "blob", "document", "json", "text"],
		//isValidMethod : !!inArray(this.validMethods, this.ajaxSettings.method) ,
		//isValidResponseType : !!inArray(this.validResponseTypes, this.ajaxSettings.responseType) ,
		ajaxSettings: {
			url: location.href,
			isLocal: rlocalProtocol.test( location.protocol ),
			method : 'GET',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			data: null,
			postData : null,
			dataType : false,//html
			dataTypeCallback : false,
			// dataTypeCallback : {'md': function(str,el){return marked(str,el) || el.innerHTML = marked(str);}} 
			mimeType : false,// "text/html";
			responseType: null, //json
			timeout : 0,
			headers : {},
			validMethods : ["get", "post", "put", "delete"],
			username: false,
			password: false,
			throws: false,
			global: true,
			cache : false,
			async: true,
			isUpload : false,
			processData : false,
			bodyOnly : false,
			crossDomain : false,
			mode: "cors", 
			showProgressBar : false,
			// callbacks 
			before : false,
			success : false,
			error : false,
			completed: false,
			then : false
			// Add custom fields to xhr object
			//,xhrFields : {}
		},
		abort_request : function(reportTimeout) {if ( this.call_in_progress()) {this.XHR_Obj.abort();if(reportTimeout&& isFunction(reportTimeout))reportTimeout();}return this;},
		//Merge two or more objects together.
		ajaxExtend : function () {
			var _this = this, extended = this.ajaxSettings || {};
			// Merge the object into the extended object
			var merge = function (obj) {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
							extended[prop] = _this.ajaxExtend(extended[prop], obj[prop]);
						} else {
							extended[prop] = obj[prop];
						}
					}
				}
			};
			// Loop through each object and conduct a merge
			for (var i = 0; i < arguments.length; i++) {
				var obj = arguments[i];
				merge(obj);
			}
			
			return extended;
		},
		call_in_progress : function() {switch ( this.XHR_Obj.readyState ) {case 1: case 2: case 3:return true;break;default:return false;break;}return this;},
		createProgressBar : function () {
			if(!this.progressBarExists){
				this.progressBar = tag$1('div',{id:'progress_bar','class':'window_progressbar',style:'position:fixed;top:0;display:block;margin:0;padding:0;height:2.5px;box-shadow:0 1px 15px 0 rgba(0,0,0,0.6),0 3px 2px 0 rgba(0,0,0,0.19);'});
				document.body.appendChild(this.progressBar);
				//progressBar.parentNode.insertBefore(document.body.children[0],progressBar.nextSibling);
			 	//document.body.appendChild(this.progressBar);
				this.progressBarExists = true;
			}
		},
		display_result : function(targetElem,result){
			if(targetElem.length > 0){
				targetElem.forEach( (elem) => {
					if( isElement(elem) ) elem.innerHTML = result;
				});
			} else {
				var _id = ('_responseContent_'+_random).replace('.','_'),
				d = tag$1("div",{"id" : _id,"class" : "_responseContent", "style":'position:absolute;display:block;margin:0;padding:0;overflow:auto;width:100%;height:auto;min-height:99%;'});
				d.innerHTML = result;
				setTimeout(function(){
					cleanElementInsert(elem,d);
					if(isArrayLike(elem) || isArray(elem)||(elem.length && elem.length > 0)) {
						forEach(elem,function(i){
							if(elem[i] && isElement(elem[i])){
								d.style.cssText += 'max-width:'+ elementStyle(elem[i]).width+';';
							}
						});
					} else {
						d.style.cssText += 'max-width:'+ elementStyle(elem).width+';';
					}
				},10);
			}
			return this;
		},
		exec_JS : function(node) {
			var strExec,st = node.getElementsByTagName('SCRIPT'),
			bSaf = (navigator.userAgent.indexOf('Safari') != -1),
			bOpera = (navigator.userAgent.indexOf('Opera') != -1);
			bMoz = (navigator.appName == 'Netscape');
			for(var i=0;i<st.length; i++) {
				if (bSaf) {
					strExec = st[i].innerHTML;
				} else if (bOpera) {
					strExec = st[i].text;
				} else if (bMoz) {
					strExec = st[i].textContent;
				} else {
					strExec = st[i].text;
				}
				try{
					eval(strExec);
				} catch(e){
					alert(e);
				}
			}
			return this;
		},
		// Parse text response into JSON
		// @return {Array}  A JSON Object of the responseText, plus the orginal response
		parse : function (req) {
			var result;
			if (this.ajaxSettings.responseType !== 'text' && this.ajaxSettings.responseType !== '') {
				return {data: req.response, xhr: req};
			}
			try {
				result = JSON.parse(req.responseText);
			} catch (e) {
				result = req.responseText;
			}
			return {data: result, xhr: req};
		},
		// Convert an object into a query string
		param : function (obj) {
			// If already a string, or if a FormData object, return it as-is
			if (typeof (obj) === 'string' || Object.prototype.toString.call(obj) === '[object FormData]') return obj;
			// If the content-type is set to JSON, stringify the JSON object
			if (/application\/json/i.test(settings.headers['Content-type']) || Object.prototype.toString.call(obj) === '[object Array]') return JSON.stringify(obj);
			// Otherwise, convert object to a serialized string
			var encoded = [];
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					encoded.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
				}
			}
			return encoded.join('&');
		},
		process_request: function (url,opt,xhr) {
			var tmp, ext = fileext(url), nameOnly = filename(url);
			if( xhr.responseType.toLowerCase() === "document" ){
				tmp = getBody(xhr.responseText);
			} else if( xhr.responseType.toLowerCase() === "blob" || xhr.responseType.toLowerCase() === "arraybuffer" ){
				xhr.timeout = 9999999;
				var isImage = ((opt.dataType && opt.dataType == 'image') || (opt.mimeType && opt.mimeType.indexOf("image") == 0)) ? true : rimage.test(ext);
				if( isImage ){
					var arrayBuffer = xhr.response || xhr.responseText;
					// if you want to access the bytes:
					var byteArray = new Uint8Array(arrayBuffer);
					// If you want to use the image in your DOM:
					var blob = new Blob([arrayBuffer], {type: opt.mimeType || "image/png"});
					//var url = this.util.url.createURL(blob);
					var url = URL.createObjectURL(blob);
					tmp = url;
					//this.util.url.revokeURL(url);
					URL.revokeObjectURL(url);
				} else {
					
				}
			} else if( xhr.responseType === "" || xhr.responseType.toLowerCase() === "text" || xhr.responseType.toLowerCase() === "json" || xhr.responseType.toLowerCase() === "xml" ){
				//var xmlext = url.substr(url.length - 3);//var jsonext = url.substr(url.length - 4);
				var isFEED =  ext.toLowerCase() == "atom";
				var isScript = rscript.test(ext);
				var isHTML = ((opt.dataType && opt.dataType == 'html') || (opt.mimeType && opt.mimeType.indexOf('html') == 0)) ? true : (ext.toLowerCase() == "html" || ext.toLowerCase() == "htm");
				var isJSON = ((opt.dataType && opt.dataType == 'json') || (opt.mimeType && opt.mimeType.indexOf('json') == 0)) ? true : ext.toLowerCase() == "json";	
				var isXML = ((opt.dataType && opt.dataType == 'xml') || (opt.mimeType && opt.mimeType.indexOf('xml') == 0)) ? true : ext.toLowerCase() == "xml";
				var isImage = ((opt.dataType && opt.dataType == 'image') || (opt.mimeType && opt.mimeType.indexOf("image") == 0)) ? true : rimage.test(ext);
				var isMARKDOWN = (opt.dataType && opt.dataType == 'text') ? true : (ext.toLowerCase() == "md" || ext.toLowerCase() == "txt");
				if( isMARKDOWN ) {
					// strip leading whitespace so it isn't evaluated as code
					var leadingWs = xhr.responseText.match(/^\n?(\s*)/)[1].length,
					leadingTabs = xhr.responseText.match(/^\n?(\t*)/)[1].length;
					if( leadingTabs > 0 ) {
						var text = xhr.responseText.replace( new RegExp('\\n?\\t{' + leadingTabs + '}','g'), '\n' );
					} else if( leadingWs > 1 ) {
						var text = xhr.responseText.replace( new RegExp('\\n? {' + leadingWs + '}','g'), '\n' );
					} else var text = xhr.responseText;
					
					if(showdown && typeof showdown !== 'undefined') {
						var converter = new showdown.Converter({ghCompatibleHeaderId:true,tables:true,extensions: ['prettify']});
						var html = converter.makeHtml(text);
						tmp = '<div style="padding:4px;">'+html+'</div>';
					} else if(window['micromarkdown'] && isFunction(window['micromarkdown']) ) tmp = '<div style="padding:4px;">'+micromarkdown.parse(text)+'</div>';
					else tmp = '<div style="padding:4px;">'+xhr.responseText+'</div>';
				} else if( isXML || isFEED ) {try{tmp = parseXML(xhr.responseXML ? xhr.responseXML : xhr.responseText)}catch(e){tmp = _this.util().formatException(e);}}
				else if( isJSON ) {try{tmp = parseJSON(xhr.responseJSON ? xhr.responseJSON : xhr.responseText);}catch(e){tmp = _this.util().formatException(e);}}
				else if( isImage ) tmp = '<img src="'+url+'" alt="'+nameOnly+'" style="top:40%;right:25%;bottom:40%;left:25%;width:auto;height:auto;margin:auto;border:1px dotted #ff0009;"/>';
				else if( isScript ) tmp = '<pre style="height:auto;overflow:auto;background:#e0f6ff;color:#000;padding:20px 30px 20px;margin:10px auto;font-family:Monaco,\'Lucida Console\',\'Courier New\',Courier,Monospace;font-size:12px">'+xhr.responseText+'<\/pre>'; 
				else if( isHTML ) {
					if(isSet(opt.bodyOnly) && opt.bodyOnly) tmp = getBody(xhr.responseText);
					else tmp = xhr.responseText;
				} else tmp = '<pre>'+xhr.responseText+'</pre>';
			}
			return tmp;
		},
		push : function(objectOrKey, value) {
			switch (typeof objectOrKey){
				case 'object': this.ajaxSettings.data = Object.assign(objectOrKey, this.ajaxSettings.data); break;
				case 'string': this.ajaxSettings.data =  Object.assign({ [objectOrKey] : value}, this.ajaxSettings.data); break;
			}
			return this;
		}, 
		supports : function () {return 'XMLHttpRequest' in window && 'JSON' in window && 'Promise' in window;},
		support_ajax_upload_with_progress : function () {
			function supportFileAPI() {var fi = document.createElement('INPUT');fi.type = 'file';return 'files' in fi;};
			function supportAjaxUploadProgressEvents() {var xhr = new XMLHttpRequest();return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));};
			function supportFormData() {return !! window.FormData;}
			return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();
		},
		// AJAX: Public Methods 
		// Push data (key and value) or object
		set_data : function(objectOrKey, value) {this.push(objectOrKey, value);return this;},
		// Set URL
		set_url : function(url) {this.ajaxSettings.url=url;this.XHR_Obj.responseURL = url;return this;},
		// Set method (POST or GET)
		set_method : function(method) {method = method.toUpperCase();this.ajaxSettings.method = inArray(method,this.validRequestMethods) ? method : "GET";return this;},
		// Set mine type
		set_mime_type : function( type ) {if ( this.completed == null ) {this.ajaxSettings.mimeType = type;}return this;},
		// Set request header
		set_header : function (key , value){this.XHR_Obj.setRequestHeader(key,value);return this;},
		init_XHR : function (){
			if(!this.XHR_Obj && typeof XMLHttpRequest !== 'undefined') {try {this.XHR_Obj = new XMLHttpRequest();} catch (e) {this.XHR_Obj=false;}}
			if(!this.XHR_Obj && window.ActiveXObject){var versions = ["MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"];for(var i = 0, len = versions.length; i < len; i++) {try {this.XHR_Obj = new ActiveXObject(versions[i]);break;}catch(e){};}}
			if (!this.XHR_Obj && window.createRequest) {try {this.XHR_Obj = window.createRequest();} catch (e) {this.XHR_Obj=false;}}
			return this.XHR_Obj;
		},
		open_req : function (url, targetId,opts) {
			var _this = this, timeoutTimer,
			elem = ("ajaxContainer" in opts) ? ( isElement(opts.ajaxContainer) ? opts.ajaxContainer : isString(opts.ajaxContainer) ? $all(opts.ajaxContainer) : false) : isElement(targetId) ? targetId : $all(targetId);
			if(!elem || !isElement(elem)) return false;
			this.init_XHR();
			if(!this.XHR_Obj) return false;
			if ( typeof url === "object" ) {
				opts = url;
				url = opts.url || undefined;
			}
			// Force options to be an object
			var opt = extend( this.ajaxSettings,opts );
			opt.method = opt.method.toUpperCase();
				
			// if (!opt.crossDomain && !opt.headers["X-Requested-With"]){opt.headers["X-Requested-With"] = "XMLHttpRequest";} 
			url = ( ( url || location.href ) + "" ).replace( rhash, "" ).replace( rprotocol, location.protocol + "//" );
		    if(opt.postData != null && rget.test(opt.method)) {
				var had = url.indexOf("?") > -1;
				if (!had) {
					url += "?";
				}
				var first = true;
				for (var key in opt.postData) {
					if (opt.postData.hasOwnProperty(key) && typeof opt.postData[key] === "string") {
						if (first && !had) {
							url += encodeURIComponent(key) + "=" + encodeURIComponent(opt.postData[key]);
						} else {
							url += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(opt.postData[key]);
						}
						first = false;
					}
				}
			}
			cacheURL = url;
		
			if (opt.cache === false) {
				url = rts.test(cacheURL) ?
					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :
					// Otherwise add one to the end
					cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
			    url = url + (rquery.test(url) ?'&':'?') + "nocache=" +  Math.random();
		        //url = url +  "?nocache=" +  Math.random();
			}
			this.XHR_Url = url;
			////this.$$(targetId||elem).css({display:'block'});
			styleElement(elem,{display:'block'});
			//wait(targetId||e);
			if(opt.before || opt.beforeSend) {
				var callbackFunction = opt.before || opt.beforeSend;
				var callbackParams = [tmp,this.XHR_Obj,url,elem];//var callbackParams = [tmp,url,elem];
				if(typeof callbackFunction === "function") tmp = this.responseContent = callbackFunction.apply(null,callbackParams);
				else{
					var fn = window[callbackFunction];
					if(typeof fn === "function") tmp = this.responseContent = fn.apply(null,callbackParams);
				}
			}
			// Open the socket
			// Passing null username, generates a login popup on Opera (#2865)
			if ( opt.username ) {
				this.XHR_Obj.open( opt.method, url, opt.async, opt.username, opt.password );
			} else {
				this.XHR_Obj.open(opt.method, url, opt.async);
			}
			
			this.active_ajax_calls++;
			// Apply custom fields if provided
			if ( opt.xhrFields ) {
				for ( i in opt.xhrFields ) {
					this.XHR_Obj[ i ] = opt.xhrFields[ i ];
				}
			}
			// Override mime type if needed
			if ( opt.mimeType) {
				this.XHR_Obj.overrideMimeType( opt.mimeType );
			}
			// Force "Connection: close" for older Mozilla browsers to work around a bug where XMLHttpRequest sends an incorrect Content-length header. See Mozilla Bugzilla #246651.
			//if (this.XHR_Obj.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005) opt.headers['Connection'] = 'close';
			//this.XHR_Obj.setRequestHeader('Connection','close');
			
			this.XHR_Obj.setRequestHeader("Accept", opt.dataType && opt.accepts[ opt.dataType ] ? opt.accepts[ opt.dataType ] + ( opt.dataType !== "*" ? ", " + allTypes + "; q=0.01" : "" ) : opt.accepts[ "*" ]);
	        if(!isEmptyObject(opt.headers)){
			    // Check for headers option
			    for( var name in opt.headers ) {
					this.XHR_Obj.setRequestHeader( name, opt.headers[ name ] );
			    }
			}
			// if(opt.isUpload) {
				//_Pbd.event.add(this.XHR_Obj.upload,"progress", updateProgress, false);
				//_pbd.event.add(xhr,"load", () => {
				// this.progressBarContainer.className += " uploaded";
				// this.progressBar.innerHTML = "Uploaded!";
			// }, false);
			//}
			if(opt.showProgressBar){
				if(!this.progressBarExists) this.createProgressBar();
				if(this.progressBar.classList.contains('failure')) this.progressBar.classList.remove('failure');
				if(this.progressBar.classList.contains('loading')) this.progressBar.classList.remove('loading');
				this.XHR_Obj.onloadstart = (e) => {
					//this.appStyle.addClass(this.progressBar,'loading');//progressBar.className += ' loading';
					this.progressBar.classList.add('loading');//progressBar.className += ' loading';
				};
				//this.XHR_Obj.upload.onprogress = this.update_progress;
				this.progressBar.style.width = Number(0);
				this.XHR_Obj.onprogress  = (ev) => {
					if (this.progressBar && ev.lengthComputable) {
						pc = ((ev.loaded / ev.total) * 100);//pc = parseInt(100 - (ev.loaded / ev.total * 100));
						styleElement(this.progressBar,{opacity:1,display:'block',width:pc + '%',transition:'width linear 1200ms'});
						this.progressBar.innerHTML = pc + "%";//progressBar.innerHTML += ' - ' + file.name + " Uploaded! ";
					} else styleElement(this.progressBar,{opacity:1,display:'block',width:'100%',transition:'width linear 2000ms'});
				};
				// this.XHR_Obj.onloadend = function(e) {this.progressBar.style.opacity = 0.4;};
			}
			//Note that if you want to POST data, you may have to set the MIME type of the request. For example, use the following before calling send() for form data sent as a query string:
			// Set appropriate headers 
			if(opt.method === "post" || opt.method.toUpperCase === "POST") {
				this.XHR_Obj.setRequestHeader('Content-Type', opt.contentType);
				this.XHR_Obj.onreadystatechange = () => { this.post_response(url, elem,opt); }
			} else {
				this.XHR_Obj.onreadystatechange = () => { this.get_response(url, elem,opt); }
			}
			// Timeout
			if ( opt.async && opt.timeout && opt.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {_this.XHR_Obj.abort( "timeout" );}, opt.timeout );
			}
			try{
				this.XHR_Obj.send(opt.postData);
			} catch(l){
				cleanElementInsert(elem,document.createTextNode("request failed , here's why : "+l));
				//while(e.firstChild) e.removeChild(e.firstChild); //e.innerHTML="" the standard way
				//e.appendChild(document.createTextNode("request failed"));
			}
			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}
		},
		get_response : function (url, elem, opt) {
			if(!this.XHR_Obj || this.XHR_Obj.readyState != 4) {if(this.active_ajax_calls > 0) {this.active_ajax_calls = (this.active_ajax_calls - 1);}return this;}
			var tmp, _this = this, _random = Math.random();
			var ext = this.util.get.ext(url);
			if(this.XHR_Obj.status == 200 || this.XHR_Obj.status == 0) {
				if(opt.processData == true){
					tmp = this.process_request(this.XHR_Url,opt,this.XHR_Obj);
				} else tmp = this.XHR_Obj.responseText;
				
				if(opt.ajaxSettings.dataTypeCallback&&isObject(opt.ajaxSettings.dataTypeCallback)){
					if(opt.ajaxSettings.dataTypeCallback[ext]&&isFunction(opt.ajaxSettings.dataTypeCallback[ext])){
						var dataTypeCallback_fn = opt.ajaxSettings.dataTypeCallback[ext];
						tmp = dataTypeCallback_fn(tmp);
					}
				}
				
				if(opt.success) {
					var callbackFunction = opt.success;
					var callbackParams = [tmp,this.XHR_Obj,url,elem,opt.success];//var callbackParams = [tmp,url,e];
					if(typeof callbackFunction === "function") tmp = this.responseContent = callbackFunction.apply(null,callbackParams);
					else{
						var fn = window[callbackFunction];
						if(typeof fn === "function") tmp = this.responseContent = fn.apply(null,callbackParams);
					}
				}
				if(opt.completed) {
					var callbackFunction = opt.completed;
					var callbackParams = [tmp,this.XHR_Obj,url,elem,opt.completed];//var callbackParams = [tmp,url,e];
					if(typeof callbackFunction === "function") tmp = this.responseContent = callbackFunction.apply(null,callbackParams);
					else{
						var fn = window[callbackFunction];
						if(typeof fn === "function") tmp = this.responseContent = fn.apply(null,callbackParams);
					}
				}
				document.title = 'Currently Viewing : '+filename(url,true);
			} else {
				document.title = '404 : ['+this.util.get.filename(url,true) +'] Not Found';
				tmp = "Ooops!! A broken link! Please contact the webmaster of this website ASAP and give him the following error code: " + this.XHR_Obj.status+" "+this.XHR_Obj.statusText+",URL: "+this.XHR_Obj.responseURL;
				if(opt.showProgressBar){
					if(!this.progressBarExists) this.createProgressBar();
						//this.appStyle.addClass(this.progressBar,'failure');
					this.progressBar.classList.add('failure');
					styleElement(this.progressBar,{width:'100%',transition:'width linear 1s'})
				}
			}
			// self.alwaysCallback && self.alwaysCallback.apply(self.host, [this.XHR_Obj]);
			var d = Object.assign(document.createElement("div"),{"id" : ('_responseContent_'+_random).replace('.','_'),"class" : '_responseContent',"style" : 'position:absolute;display:block;margin:0;padding:0;overflow:auto;width:100%;height:auto;min-height:99%;'});
			d.innerHTML = tmp;
			setTimeout(function(){
				cleanElementInsert(elem,d);
				if(isArrayLike(elem) || isArray(elem)||(elem.length && elem.length > 0)) {
					_pbd.each(elem,function(i){
						if(elem[i] && isElement(elem[i])){
							d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem[i]).width+';';
						}
					});
 	           } else {
					d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem).width+';';
				}
			},10);
			if (this.active_ajax_calls > 0) {
				this.active_ajax_calls = (this.active_ajax_calls - 1);
			}
		},
		post_response : function (url, elem, opt) {
			if(!this.XHR_Obj || this.XHR_Obj.readyState != 4){if(this.active_ajax_calls > 0){this.active_ajax_calls = (this.active_ajax_calls - 1);}return this;}
			var tmp, _this = this, _random = Math.random();
			if(this.XHR_Obj.status == 200 || this.XHR_Obj.status == 0) {
				if(opt.processData == true){
					var ext = this.util.get.ext(url);
					var isJSON = (opt.dataType && opt.dataType == 'json' ? true : ext.toLowerCase() == "json");	
					var isXML = (opt.dataType && opt.dataType == 'xml' ? true : ext.toLowerCase() == "xml");
					var isFEED =  ext.toLowerCase() == "atom";	
					if( isXML || isFEED ) tmp = this.util.parse.xml(this.XHR_Obj.responseText);
					else if(isJSON) tmp = this.util.parse.json(this.XHR_Obj.responseJSON ? this.XHR_Obj.responseJSON : this.XHR_Obj.responseText);
					else tmp = this.XHR_Obj.responseText;
				} else tmp = this.XHR_Obj.responseText;
				if(opt.success) {
					var callbackFunction = opt.success;
					var callbackParams = [tmp,this.XHR_Obj,url,elem,opt.success];//var callbackParams = [tmp,url,e];
					if(typeof callbackFunction === "function") tmp = this.responseContent = callbackFunction.apply(null,callbackParams);
					else{
						var fn = window[callbackFunction];
						if(typeof fn === "function") tmp = this.responseContent = fn.apply(null,callbackParams);
					}
				}
			} else {
				document.title = '404 : ['+ this.util.get.filename(url,true) +'] Not Found';
				tmp = "Ooops!! A broken link! Please contact the webmaster of this website ASAP and give him the following error code: " + this.XHR_Obj.status+" "+this.XHR_Obj.statusText+",URL: "+this.XHR_Obj.responseURL;
				if(opt.showProgressBar){
					if(!this.progressBarExists) this.createProgressBar();
					//progressBar = this.progressBar || $$('#progress_bar');
					//this.addClass(this.progressBar,'failure');
					this.progressBar.classList.add('failure');
					styleElement(this.progressBar,{width:'100%',transition:'width linear 1s'})
				}
			}
			var d = Object.assign(document.createElement("div"),{"id" : ('_responseContent_'+_random).replace('.','_'),"class" : '_responseContent',"style" : 'margin:0;padding:0;overflow:auto;height:auto;min-height:99%;max-width:'+ this.util.elementStyle(elem).width+';'});
			d.innerHTML = tmp;
			//this.wallpaper(d,{image:__pbd_self.settings.wallpaper.bgImg,bgSize:'cover',bgColor:'#000'});
			setTimeout(function(){
				cleanElementInsert(elem,d);
				if(isArrayLike(elem) || isArray(elem)||(elem.length && elem.length > 0)) {
					_pbd.each(elem,function(i){
						if(elem[i] && isElement(elem[i])){
							d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem[i]).width+';';
						}
					});
 	           } else {
					d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem).width+';';
				}
			},10);
			if (this.active_ajax_calls > 0) {
				this.active_ajax_calls = (this.active_ajax_calls - 1);
			}
		},
		vowAll : function(arr, callbackAll) {
			// object store of responses
			var objResolved = {};
			arr.forEach(function(obj, index) {
				// null "placeholder"
				objResolved[index] = null;
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						// replace null with response, 
						// if response is 404/403 etc, replace null with undefined
						// optional request callback
						objResolved[index] = xhr.status == (obj.status || 200) ? (obj.callback ? obj.callback(xhr.responseText) : xhr.responseText) : undefined;
						var allResolved = true;
						// loop through all responses
						for (var key in objResolved) {
							if (objResolved[key] === null) {
								// if any are unresolved, 
								// prevent the callbackAll function from firing
								allResolved = false;
							}
						}
						// "Promise.all" callback when all requests have been resolved
						allResolved && callbackAll(objResolved);
					}
				};
				xhr.open(obj.method || "GET", obj.url, true);
				for (var key in obj.headers) {
					xhr.setRequestHeader(key, obj.headers[key]);
				}
				xhr.send(obj.body);
			});
		},
		addEventHandler:function(c,a,b){if(c.addEventListener){c.addEventListener(a,b,false)}else{if(c.attachEvent){c.attachEvent("on"+a,b)}else{c["on"+a]=b}}},
		removeEventHandler:function(c,a,b){if(c.removeEventListener){c.removeEventListener(a,b,false)}else{if(c.detachEvent){c.detachEvent("on"+a,b)}else{c["on"+a]=null}}},
		triggerEvent:function(b,a){if(document.createEvent){var c=document.createEvent("HTMLEvents");c.initEvent(a,true,false);b.dispatchEvent(c)}else{b.fireEvent("on"+a)}},
		ajax_call : function(d){
			var _this = this;
			if(d==null||d.url==""||d.data==""||d.type==""){
				console.log("ajaxPost: Parameters can't be empty");
				return false
			}
			if(d.crossDomain==true&&typeof XDomainRequest!="undefined"){var c=new XDomainRequest()}else{var c=new XMLHttpRequest()}
			var b=new CustomEvent("ajaxSuccess");
			var f=new CustomEvent("ajaxFail");
			var g=(d.type)?d.type.toUpperCase():"GET";
			var e="";
			for(var a in d.data){
				if(e!=""){e+="&"}
				e+=a+"="+encodeURIComponent(d.data[a])
			}
			if(g==="GET"){
				if(d.cache==false){
					d.url+="&timestamp="+Date.now()
				}else{
					d.url=d.url+"?"+e
				}
			}
			c.open(g,d.url,true,d.username||null,d.password||null);
			if(d.dataType!=""&&typeof d.dataType=="string"){c.responseType=d.dataType}else{c.responseType="json"}
			if(c instanceof XMLHttpRequest){
				c.setRequestHeader("X-Requested-With","XMLHttpRequest");
				c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
			}
			if(d.headers){
				if(!Object.keys){
					Object.keys=function(k){var j=[];for(var h in k){if(k.hasOwnProperty(h)){j.push(h)}}return j}
				}
				Object.keys(d.headers).forEach(function(h){c.setRequestHeader(h,d.headers[h])})
			}
			if(d.cache=="false"&&g=="POST"){c.setRequestHeader("cache-control","no-cache")}
			if(d.xhrFields){
				for(i in d.xhrFields){c[i]=d.xhrFields[i]}
			}
			if(typeof d.beforeSend=="function"&&(d.beforeSend()===false)){return c.abort()}
			c.onreadystatechange=function(){
				var h={};
				if(c.readyState==4){
					if(c.status>=200&&c.status<400){
						try{h=JSON.parse(c.responseText)}catch(j){h=c.response}
						if(typeof d.success=="function"){
							if(c instanceof XMLHttpRequest){
								d.success(h, c)
							}else{
								c.onload(function(){d.success(h, c)})
							}
						}
						c.dispatchEvent(b)
					}else{
						c.dispatchEvent(f);
						h={error:"Error getting data from AJAX call"}
					}
				}
				if(h!=null&&typeof h.error!="undefined"){console.log("ajaxPost: "+h.error);return false}
			};
			c.send(e);
			c.done=function(h){
				if(typeof h=="function"){
					if(c instanceof XMLHttpRequest){
						_this.addEventHandler(c,"ajaxSuccess",h)
					}else{
						c.onload=h()
					}
				}
			};
			c.fail=function(h){
				if(typeof h=="function"){
					if(c instanceof XMLHttpRequest){_this.addEventHandler(c,"ajaxFail",h)}else{c.onerror=h()}
				}
			};
			c.always=function(h){
				if(typeof h=="function"){
					if(c instanceof XMLHttpRequest){
						_this.addEventHandler(c,"ajaxSuccess",h);
						_this.addEventHandler(c,"ajaxFail",h);
					}else{
						c.onload=h();
						c.onerror=h();
					}
				}
			};
			return c;
		},
    	ajaxPromise : function(settings=undefined) {
			try{
			var _this = this, completed;
			var params = {};
			switch (typeof settings) {
				case 'string' : params.url = settings; break
				case 'object' : params = settings; break;
			}
			/*if (!('method' in params)) params.method = 'GET';
			if (!('mime' in params) || !('mimeType' in params)) params.mimeType = 'text/html';
			if (!('processData' in params)) params.processData = false;
			if( !('crossDomain' in params) ) params.crossDomain = false;*/
			// Create the data key for future use
			if (!('data' in params)) params.data = this.ajaxSettings.method.toLowerCase() === 'post' ? {} : null;
			if (!('headers' in params)) params.headers = {};
			if (!('ajaxElement' in params) || !('target' in params) || !('targetElement' in params)) params.target = this.nodes;
			if( !isNil(params.target) ) params.target = isElement(params.target) ? params.target : $all(params.target);
			if(!("showProgressBar" in params)) params.showProgressBar = false;
			if(!("dataTypeCallback" in params)) params.dataTypeCallback = false;
			//if (!('success' in params)) params.success = success;
			// if (!('error' in params)) params.error = error;
			
			this.ajaxSettings = extend( this.ajaxSettings, params );
			// Promise resolve and reject
			let promise = {
				resolve: function (result){alert("request has been successful <br> "+result.responseText)},
				reject:function (err){alert("an error has been detected - <br> "+err.statusText)}
			}
			// HTTP request object
			this.init_XHR();
			var request = this.XHR_Obj;
			//this.XHR_Obj.responseURL = this.ajaxSettings.url;
			this.active_ajax_calls = (this.active_ajax_calls + 1);
			//--------------
			// Variables
			var settings,
			// Default settings
			defaults = {
				method: 'GET',
				username: null,
				password: null,
				data: {},
				headers: {
					'Content-type': 'application/x-www-form-urlencoded'
				},
				responseType: 'text',
				timeout: null,
				withCredentials: false
			};
			// Methods
			// Send a POST Request
			var post = function(data) {this.ajaxSettings.method='POST';return send(data);}
			// Send a GET Request
			var get = function(data) {this.ajaxSettings.method='GET';return send(data);}
			// GET JSON Formatted Request
			var getJSON = function(data) {this.ajaxSettings.method='GET';request.responseType = "json";return send(data);}
			var mime = function (t){_this.set_mime_type(t);return this;}
			var method = function (m){_this.set_method(m);return this;}
			var header = function (hk, hv){_this.set_header(hk, hv);return this;}
			var url = function (u){_this.set_url(u);return this;}
			var data = function (dk, dv){_this.set_data(dk, dv);return this;}
			var before = function (fn){_this.ajaxSettings.before = fn;return this;}
			var success = function (cb){if (request.readyState === 4 && request.status === 200) {cb(request.responseText,request);}return this;};
			var error = function (errObj){var vMsg, nStatus = request.status;vMsg = nStatus + ": " + (_HTTPStatus[nStatus] || "Unknown");if (request.status<200 || request.status>299) {errObj(vMsg, request);}return this;};
			// Send request and return a promise
			var send = function(data) {
				if (_this.active_ajax_calls > 0) {
					_this.active_ajax_calls = (_this.active_ajax_calls - 1);
				}
				_this.push(data);
				//request.onreadystatechange = callBack;
				// request.onreadystatechange = function (e){
				var loadReady = request.responseType.toLowerCase() === "blob" || request.responseType.toLowerCase() === "arraybuffer" ? "onload" : "onreadystatechange";
				request[ loadReady ] = function (){
					// if(this.readyState != 4) {if(_this.active_ajax_calls > 0) {_this.active_ajax_calls = (_this.active_ajax_calls - 1);}return this;}
					var tmp, fireSuccess = true, ajaxMsg, _random = Math.random(), 
					target = _typeof(_this.ajaxSettings.target) === "object" && isElement(_this.ajaxSettings.target) ? this.ajaxSettings.target : _this.nodes, 
					ext = _this.util.get.ext(_this.ajaxSettings.url);
					callbacks = [];
					if (this.readyState === 4 && this.status === 200) {
						tmp = request.responseType.toLowerCase() === "blob" || request.responseType.toLowerCase() === "arraybuffer" ? this.response : this.responseText;
						if(_this.ajaxSettings.processData === true){
							tmp = _this.process_request(_this.XHR_Url, _this.ajaxSettings, _this.XHR_Obj);
						}
						if(_this.ajaxSettings.dataTypeCallback&&isObject(_this.ajaxSettings.dataTypeCallback)){
							if(_this.ajaxSettings.dataTypeCallback[ext] && isFunction(_this.ajaxSettings.dataTypeCallback[ext])){
								var dataTypeCallback_fn = _this.ajaxSettings.dataTypeCallback[ext];
								tmp = dataTypeCallback_fn(tmp, target, request);
								// tmp = dataTypeCallback_fn.apply(null,[tmp, target, request]);
								fireSuccess = false;
							}
						}
						if(fireSuccess && _this.ajaxSettings.success) {
							var callbackFunction = _this.ajaxSettings.success;
							var callbackParams = [tmp, target, _this.XHR_Obj, params.url, params.success];//var callbackParams = [tmp,url,e];
							if(typeof callbackFunction === "function") tmp = _this.responseContent = callbackFunction.apply(null,callbackParams);
							else{
								var fn = window[callbackFunction];
								if(typeof fn === "function") tmp = _this.responseContent = fn.apply(null,callbackParams);
							}
						} else _this.display_result(target,tmp);
						completed = true;
						//document.title = 'Currently Viewing : '+filename(url,true);
					} else if (this.readyState === 4 && (this.status < 200 || this.status > 299 ) ){
						var nStatus = this.status;
						ajaxMsg = nStatus + ": " + (_HTTPStatus[nStatus] || "Unknown");
						//document.title = '404 : ['+filename(url,true) +'] Not Found';
						tmp = "Ooops!! A broken link! Please contact the webmaster of this website ASAP and give him the following error code: " + this.status+" "+this.statusText+",URL: "+this.responseURL+"<br>"+ajaxMsg;
						if(_this.ajaxSettings.showProgressBar){
							if(!_this.progressBarExists) _this.createProgressBar();
							//this.appStyle.addClass(this.progressBar,'failure');
							_this.progressBar.classList.add('failure');
							_this.util.styleElement(_this.progressBar,{width:'100%',transition:'width linear 1s'})
						}
						if(_this.ajaxSettings.error) {
							var callbackFunction = _this.ajaxSettings.error;
							var callbackParams = [tmp,target, _this.XHR_Obj, _this.ajaxSettings.url, _this.ajaxSettings.error];//var callbackParams = [tmp,url,e];
							if(typeof callbackFunction === "function") tmp = _this.responseContent = callbackFunction.apply(null,callbackParams);
							else{
								var fn = window[callbackFunction];
								if(typeof fn === "function") tmp = _this.responseContent = fn.apply(null,callbackParams);
							}
						} else _this.display_result(target,tmp);
						completed = true;
					}
					if (this.readyState === 4 || this.readyState == this.DONE ){
						completed = true;
					}
				}
				
				if(_this.ajaxSettings.username) request.open(_this.ajaxSettings.method, this.ajaxSettings.url, true, this.ajaxSettings.username, this.ajaxSettings.password);
				else request.open(_this.ajaxSettings.method, _this.ajaxSettings.url, true);
				if ( _this.ajaxSettings.mimeType) {
					request.overrideMimeType( this.ajaxSettings.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup). For same-domain requests, won't change header if already provided.
				if ( !_this.ajaxSettings.crossDomain && !_this.ajaxSettings.headers[ "X-Requested-With" ] ) {
					_this.ajaxSettings.headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in _this.ajaxSettings.headers ) {
					if ( _this.ajaxSettings.headers[ i ] !== undefined ) {
						request.setRequestHeader( i, _this.ajaxSettings.headers[ i ] + "" );
					}
				}
				if(request.responseType === "json") request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				if(_this.ajaxSettings.method==='POST') {
					request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
					if(request.responseType === "json") request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				}
				// Hack to pass bytes through unprocessed, or pass binary data as a string
				if(request.responseType === "arraybuffer") request.setRequestHeader('Content-type', 'text/plain; charset=x-user-defined');
				try{
					request.send( Object.keys(this.ajaxSettings.data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(this.ajaxSettings.data[key])) .join('&') );
					//request.send( this.ajaxSettings.data );
				} catch(l){
					_xhr = {status:400,statusText:'Bad Request',responseType:'text',responseText:"request failed:"+l};
					defaultCallBack(_xhr,_this.XHR_Obj);
				}
				return this;
			}
			// Get Promise-like results
			var then = function (_promiseFn){if (request.readyState === 4 && completed /* && request.status === 200 */) {return isFunction(_promiseFn) ? _promiseFn.apply(_this, [ request.responseText, request ]) : false;}return this;}
			var all = function(reqArray, onCompleteCallback){
				/*_pbd.each(reqArray,function(i, req){});*/
				_this.vowAll(reqArray, onCompleteCallback)
				return this;
			};
			// Callback function 
			var defaultCallBack = function() {
				// alert(request.status);
				// Request not finished
				if (request.readyState != 4) return;
				// Check status and reject in case of failure
				if (request.status<200 || request.status>299) { promise.reject(request); return; }
				// Success, resolve response
				promise.resolve (request.responseText);
			};
			// Make an XHR request, returned as a Promise
			var makeRequest = function (url) {
				// Create the XHR request
				//var request = new XMLHttpRequest();
				var request = request && request instanceof XMLHttpRequest ? request : ( _this.XHR_Obj && _this.XHR_Obj instanceof XMLHttpRequest ? _this.XHR_Obj : initXHR() );
				// Setup the Promise
				var xhrPromise = new Promise(function (resolve, reject) {
					// Setup our listener to process compeleted requests
					request.onreadystatechange = function () {
						// Only run if the request is complete
						if (request.readyState !== 4) return;
						// Prevent timeout errors from being processed
						if (!request.status) return;
						// Process the response
						if (request.status >= 200 && request.status < 300) {
							// If successful
							resolve(parse(request));
						} else {
							// If failed
							reject({
								status: request.status,
								statusText: request.statusText,
								responseText : request.responseText
							});
						}
					};
					// Setup our HTTP request
					request.open(settings.method, url, true, settings.username, settings.password);
					request.responseType = settings.responseType;
					// Add headers
					for (var header in settings.headers) {
						if (settings.headers.hasOwnProperty(header)) {
							request.setRequestHeader(header, settings.headers[header]);
						}
					}
					// Set timeout
					if (settings.timeout) {
						request.timeout = settings.timeout;
						request.ontimeout = function (e) {
							reject({
								status: 408,
								statusText: 'Request timeout'
							});
						};
					}
					// Add withCredentials
					if (settings.withCredentials) {
						request.withCredentials = true;
					}
					// Send the request
					request.send(param(settings.data));
				});
				// Cancel the XHR request
				xhrPromise.cancel = function () {
					request.abort();
				};
				// Return the request as a Promise
				return xhrPromise;
			};
			// ...........................................................
			// Atomic Method
			// ...........................................................
			var Atomic = function (url, options) {
				// Check browser support
				if (!supports()) throw 'Atomic: This browser does not support the methods used in this plugin.';
				// Merge options into defaults
				settings = extend(defaults, options || {});
				// Make request
				return makeRequest(url);
			};
			// ...........................................................
			// Fetch Polifill Method
			// ...........................................................
			var fetchPolyfill = function (url, options) {
				options = options || {};
				return new Promise( (resolve, reject) => {
					const request = new XMLHttpRequest();
					const keys = [];
					const all = [];
					const headers = {};
					const response = () => ({
						ok: (request.status/100|0) == 2,		// 200-299
						statusText: request.statusText,
						status: request.status,
						url: request.responseURL,
						text: () => Promise.resolve(request.responseText),
						json: () => Promise.resolve(request.responseText).then(JSON.parse),
						blob: () => Promise.resolve(new Blob([request.response])),
						clone: response,
						headers: {
							keys: () => keys,
							entries: () => all,
							get: n => headers[n.toLowerCase()],
							has: n => n.toLowerCase() in headers
						}
					});
					request.open(options.method || 'get', url, true);
					request.onload = () => {
						request.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (m, key, value) => {
							keys.push(key = key.toLowerCase());
							all.push([key, value]);
							headers[key] = headers[key] ? `${headers[key]},${value}` : value;
						});
						resolve(response());
					};
					request.onerror = reject;
					request.withCredentials = options.credentials=='include';
					for (const i in options.headers) {
						request.setRequestHeader(i, options.headers[i]);
					}
					request.send(options.body || null);
				});
				// return this;
			};
			//---------------------
			if(_this.ajaxSettings.before || _this.ajaxSettings.beforeSend) {
				var fn = returnFalse, callbackFunction = _this.ajaxSettings.before || _this.ajaxSettings.beforeSend;
				var callbackParams = [_this.XHR_Obj, _this.ajaxSettings, _this.ajaxSettings.target];//var callbackParams = [tmp,url,elem];
				if(typeof callbackFunction === "function") tmp_fn = callbackFunction.apply(null,callbackParams);
				else{
					var tmp_fn = window[callbackFunction];
					if(typeof tmp_fn === "function") fn = tmp_fn.apply(null,callbackParams);
				}
				fn();
			}
			//-------------
			return { "data" : data, "url" : url, "method" : method, "mime" : mime, "header" : header, "before" : before, "success" : success, "error" : error, "send" : send, "post" : post, "get" : get, "getJSON" : getJSON, "then" : then, "all" : all,"fetch" : fetchPolyfill, "atomic" : Atomic};
			//} catch(e){alert( this.util.formatException(e));}
			} catch(e){alert( e.stack);}
		}
	};
	//------------------------------------------------------------------------------------------
	const ajax = (ops) => {
		const _this = this;
		if(typeof ops == 'string') ops = { url: ops };
		ops.url = ops.url || location.href;
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
			success: function(callback) {this.doneCallback = callback;return this;},
			done: function(callback) {this.doneCallback = callback;return this;},
			fail: function(callback) {this.failCallback = callback;return this;},
			error: function(callback) {this.failCallback = callback;return this;},
			always: function(callback) {this.alwaysCallback = callback;return this;},
			before: function(callback) {this.beforeCallback = callback;return this;},
			setHeaders: function(headers) {for(var name in headers) {this.xhr && this.xhr.setRequestHeader(name, headers[name]);}}
		}

		return api.process(ops);
	}
	/* function $(param,context){
		context = context || document
		let $_all = $all(param,context)
		if(typeof param === 'string' || param instanceof String){
			//return new ElementCollection(...context.querySelectorAll(param))
			return new ElementCollection(...$_all)
		} else {
			return new ElementCollection(param)
		}
	}
	// Convert an object into a query string
			param : function (obj) {
				// If already a string, or if a FormData object, return it as-is
				if (typeof (obj) === 'string' || Object.prototype.toString.call(obj) === '[object FormData]') return obj;
				// If the content-type is set to JSON, stringify the JSON object
				if (/application\/json/i.test(settings.headers['Content-type']) || Object.prototype.toString.call(obj) === '[object Array]') return JSON.stringify(obj);
				// Otherwise, convert object to a serialized string
				var encoded = [];
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						encoded.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
					}
				}
				return encoded.join('&');
			}, */
	//$.ajax = function({url, method = "GET", data = {}, headers = {}, success = () => {}, dataType, crossDomain = false, cache = false}){
	xhr.ajax = function(parameters){
		let tmp,_this = this,_random = Math.random(),timeoutTimer,opt = extend((this.ajaxSettings || xhr.ajaxSettings), parameters);
		if(typeof parameters === "string"){
			parameters = {
				url: parameters
			};
		}
		if(typeof parameters !== "object") {return;}
		if(typeof parameters.url !== "string") {return;}
		let url = parameters.url, 
		method = (typeof parameters.method === "string" && this.validMethods.indexOf(parameters.method.toLowerCase()) > -1) ? parameters.method.toLowerCase() : "get",
		is_json = (parameters.json || parameters.is_json) ? true : false,
		data = (typeof parameters.parameters === "object" || typeof parameters.params === "object" || typeof parameters.data === "object") ? (parameters.parameters || parameters.params || parameters.data) : {}, 
		headers = (typeof parameters.headers === "object") ? parameters.headers : {}, 
		formData = (parameters.formData) ? parameters.formData : {}, 
		success = (res) => console.log(res), 
		error = (er) => console.log(er), 
		dataType, 
		crossDomain = false, 
		cache = false,
		showProgressBar = (parameters.showProgressBar) ? parameters.showProgressBar : false;
		
		const origUrl = url, startTime = new Date().getTime();
		const queryStr = Object.entries(data).map(([key, value]) => {return `${key}=${value}`;}).join('&')
		/* for(var h of Object.entries(data)) {let key = h[0], value = h[1]console.log(`${key}=${value}`)} */
		let had = url.indexOf("?") > -1;
		url += (!had) ? "?" : "&";
		//url += (queryStr) ? queryStr : "";
		
		headers["Access-Control-Allow-Origin"] = "*";
		if(!crossDomain && !headers["X-Requested-With"]){headers["X-Requested-With"] = "XMLHttpRequest";} 
		if(!headers["Content-Type"]){headers['Content-Type'] = (dataType&&dataType==="json"?'application/json':'text/plain')??'';}
		url = (( url || location.href ) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//") + queryStr;
		/* if(data != null && rget.test(method)) {
			var had = url.indexOf("?") > -1;
			//if (!had) {url += "?"; }
			var first = true; 
			for (var key in data) {
				if (data.hasOwnProperty(key) && typeof data[key] === "string") {
					if (first && !had) {
						url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
					} else {
						url += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
					}
					first = false;
				}
			}
		}
		url = url + ((url[url.length-1] !== "&") ? '&': '') + queryStr; */
		
		let cacheURL = url;

		if(cache === false) {
			url = rts.test(cacheURL) ?
				// If there is already a '_' parameter, set its value
				cacheURL.replace( rts, "$1_=" + nonce++ ) :
				// Otherwise add one to the end
				cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
			url = url + (rquery.test(url) ?'&':'?') + "nocache=" +  String(Math.random()).replace('.','').replace('-','');
			//url = url +  "?nocache=" +  Math.random();
		}
		//this.XHR_Url = url;
		//$clog(headers)
		let f_cfg = {
			//method: method,
			method,
			headers/*:  headers||{
				'Content-Type': (dataType&&dataType==="json"?'application/json':'text/plain')??'',
			} */,
			//body: data
		}
		if(method && (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT" || method.toUpperCase() === "PATCH" || method.toUpperCase() === "DELETE")){
			//f_cfg.body = isPlainObject(data) ? toFormData(data) : data;
			f_cfg.body = toFormData(data);
			//f_cfg.body = data;
		}
		
		console.log(origUrl, url, f_cfg.body, Object.entries(data))
		//console.log(`${url}`)
		const req = ''//new Request(url, f_cfg);
		return new AjaxPromise(
			//fetch(`${url}${queryStr}`, f_cfg)
			fetch(origUrl, f_cfg)
			.then(async (res) => {
				if(res.ok){
					let endTime = new Date().getTime();
					let content = await Promise.resolve(dataType && dataType === "json" ? res.json() : res.text());
					data = {
						//body: res.body,
						body: bodyParser(f_cfg)(req, res, (d)=>{
							console.log(d, res.body);
						}),
						data: content, 
						method,
						headers, 
						res_headers: res.headers, 
						origReq: req,
						origRes: res,
						status: res.status, 
						statusText: res.statusText, 
						time: {
							start:startTime, 
							end:endTime, 
							timeLapse : (endTime - startTime)
						}, 
						uri: url, 
						url: res.url, 
						origin: location.origin, 
						urlParts: {
							host:location.host, 
							port:location.port, 
							protocol:location.protocol, 
							pathname:location.pathname, 
							hash:location.hash, 
							query:location.search, 
							origin:location.origin, 
						},
					}
					
					return data
				} else {
					/* if(isFunction(error)) return error(_HTTPStatus[res.status]?_HTTPStatus[res.status]:res.status)
					else  */throw new Error(_HTTPStatus[res.status]?_HTTPStatus[res.status]:res.status)
				}
			})
			.then(data => {
				//success(data)
				return data
			})
		)
	}
	xhr.load = function(params){
		const _this = this;
		if(typeof params == 'string') params = { url: params};
		params.url = params.url || location.href;
		
		//if(typeof params !== "object") {return;}
		if(typeof params.url !== "string") {return;}
		//params = extend((this.ajaxSettings || xhr.ajaxSettings), params);
		let tmp, timeoutTimer, _random = Math.random(), 
		url = params.url, 
		//method = (typeof parameters.method === "string" && this.validMethods.indexOf(parameters.method.toLowerCase()) > -1) ? parameters.method.toLowerCase() : "get",
		method = (params.method && typeof params.method === "string" && inArray(params.method.toLowerCase(), this.validMethods)) ? params.method.toLowerCase() : "get",
		data = (typeof params.parameters === "object" || typeof params.data === "object") ? (params.parameters || params.data) : {}, 
		headers = (params.headers && typeof params.headers === "object") ? params.headers : {}, 
		formData = params?.formData??{}, 
		dataType = params?.dataType??null, 
		is_json = params?.json??params?.is_json??false,
		crossDomain = params?.crossDomain??false, 
		cache = params?.cache??false, 
		success = params.success && isFunction(params.success) ? params.success : (res) => console.log(res), 
		error = params.error && isFunction(params.error) ? params.error : (er) => console.log(er);
		
		let cacheURL = url;
		const origUrl = url, startTime = new Date().getTime();
		const queryStr = Object.entries(data).map(([key, value]) => {return `${key}=${value}`;}).join('&')
		/* for(var h of Object.entries(data)) {let key = h[0], value = h[1]console.log(`${key}=${value}`)} */
		
		let had = url.indexOf("?") > -1;
		url += (!had) ? "?" : "&";
		//url += (queryStr) ? queryStr : "";
		url = (( url || location.href ) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//") + queryStr;
		/* // Change '%20' to '+' if this is encoded form body content (gh-2658)
		if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		} */
		
		if(cache === false) {
			url = rts.test(cacheURL) ?
				// If there is already a '_' parameter, set its value
				cacheURL.replace( rts, "$1_=" + nonce++ ) :
				// Otherwise add one to the end
				cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
			url = url + (rquery.test(url) ?'&':'?') + "nocache=" +  String(Math.random()).replace('.','').replace('-','');
			//url = url +  "?nocache=" +  Math.random();
		}
		//this.XHR_Url = url;
		headers["Access-Control-Allow-Origin"] = "*";
		if(!crossDomain && !headers["X-Requested-With"]){headers["X-Requested-With"] = "XMLHttpRequest";} 
		if(!headers["Content-Type"]){headers['Content-Type'] = (dataType&&dataType==="json"?'application/json':'text/plain')??'';}
		//$clog(headers)
		let f_cfg = {
			method,
			headers
		}
		if(method && (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT" || method.toUpperCase() === "PATCH" || method.toUpperCase() === "DELETE")){
			f_cfg.body = toFormData(data);
			console.log(origUrl, url, method, f_cfg.body/* , Object.entries(data), data */)
		}
		
		const req = ''//new Request(url, f_cfg);
		fetch(origUrl, f_cfg)
			.then(async (res) => {
				if(res.ok){
					let endTime = new Date().getTime();
					let content = await Promise.resolve(dataType && dataType === "json" ? res.json() : res.text());
					data = {
						//body: res.body,
						body: bodyParser(f_cfg)(req, res, (d)=>{
							console.log(d, res.body);
						}),
						cache, 
						crossDomain, 
						dataType, 
						data: content, 
						method,
						headers, 
						responseHeaders: res.headers, 
						origin: location.origin, 
						origReq: req,
						origRes: res,
						queryString: queryStr, 
						status: res.status, 
						statusText: res.statusText, 
						time: {
							start:startTime, 
							end:endTime, 
							//timeLapse : (endTime - startTime)
							timeLapse : formatToMS(endTime - startTime)
						}, 
						uri: url, 
						url: res.url, 
						urlParts: {
							host: location.host, 
							port: location.port, 
							protocol: location.protocol, 
							pathname: location.pathname, 
							hash: location.hash, 
							query: location.search, 
							origin: location.origin, 
						}
					}
					
					return data
				} else {
					if(isFunction(error)) return error(_HTTPStatus[res.status]?_HTTPStatus[res.status]:res.status)
					else /*  */throw new Error(_HTTPStatus[res.status]?_HTTPStatus[res.status]:res.status)
				}
			})
			.then(data => {
				success(data)
				return data
			}).catch(er=> error(er, _HTTPStatus[res.status]?_HTTPStatus[res.status]:res.status))
	}
	function toFormData(obj){
		if(Object.prototype.toString.call(obj) === '[object FormData]') return obj;
		if(typeof (obj) === 'string') {
			return isValidJSON(obj) || obj;
		}
		let formData = new FormData();
		for(const i in obj){
			formData.append(i, obj[i]);
			//console.log(i, obj[i]);
		}
		return formData;
	}
	xhr.ajax.intertceptors = {
		request:{
			use(cb,cb2){/* return new Promise(cb,cb2) */},
		},
		response:{
			use(cb,cb2){/* return new Promise(cb,cb2) */},
		},
	}
	xhr.post = function({url, data = {}, success = () => {}, dataType}){
		var had = url.indexOf("?") > -1;
		if (!had) {
			url += "?"; 
		}
		const queryStr = Object.entries(data).map(([key, value]) => {
			return `${key}=${value}`;
		}).join('&')
		
		return new AjaxPromise(
			fetch(`${url}${queryStr}`,{
				method: 'POST',
				header: {
					'Content-Type': dataType??'',
				},
				body: data
			})
			.then(res => {
				if(res.ok){
					return res.text()
				} else {
					throw new Error(res.status)
				}
			})
			.then(data => {
				success(data)
				return data
			})
		)
	}
	xhr.get = function({url, data = {}, success = () => {}, dataType}){
		var had = url.indexOf("?") > -1;
		if (!had) {
			url += "?"; 
		}
		const queryStr = Object.entries(data).map(([key, value]) => {
			return `${key}=${value}`;
		}).join('&')
		
		return new AjaxPromise(
			fetch(`${url}${queryStr}`,{
				method: 'GET',
				header: {
					'Content-Type': dataType??'',
				}
			})
			.then(res => {
				if(res.ok){
					return res.text()
				} else {
					throw new Error(res.status)
				}
			})
			.then(data => {
				success(data)
				return data
			})
		)
	}
	xhr.getJSON = function({url, data = {}, success = () => {}, dataType}){
		var had = url.indexOf("?") > -1;
		if (!had) {
			url += "?"; 
		}
		const queryStr = Object.entries(data).map(([key, value]) => {
			return `${key}=${value}`;
		}).join('&')
		return new AjaxPromise(
			fetch(`${url}${queryStr}`,{
				method: 'GET',
				header: {
					'Content-Type': dataType,
				}
			})
			.then(res => {
				if(res.ok){
					return res.json()
				} else {
					throw new Error(res.status)
				}
			})
			.then(data => {
				success(data)
				return data
			})
		)
	}
	
	xhr.fetchFile = fetchFile;
	// -------------------------------------------------------------------
	/* Spry.Utils.eval = function(str){
		// Call this method from your JS function when
		// you don't want the JS expression to access or
		// interfere with any local variables in your JS
		// function.

		return eval(str);
	}; */
	const parseHTML = function(str){var tmp = document.implementation.createHTMLDocument();tmp.body.innerHTML = str;return tmp.body.children;}
	const parseJSON = function(data, passTo = false, cb){
		let json = null, $this = this;
		try{
			json = JSON.parse( data + "" );
		} catch(e){}
		
		if(cb && isFunction(cb)){
			cb.apply(this, [json]);
		}
		
		if(passTo === true && this.chaining === true){
			if(isPlainObject(json)) {
				//json.id = "json";json.className = "json";
				//this.attr(json);
				//forEach(this.nodes, node => {Object.assign(node, json)});
				forEach(this.nodes, node => {this.setNodeAttribute(json)});
				//console.log(this.chaining, json)
			}
			
			return this;
		}
		
		return json;
	}
	// Cross-browser xml parsing
	const parseXML = function(str){
		let xmlDoc = null;
		if(!str || typeof str !== "string"){return null;}
		try{
			// Attempt to parse the string using the IE method.
			var xmlDOMObj = new ActiveXObject("Microsoft.XMLDOM");
			xmlDOMObj.async = false;
			xmlDOMObj.loadXML(str);
			xmlDoc = xmlDOMObj;
		} catch (e){
			// The IE method didn't work. Try the Mozilla way.
			try{
				var domParser = new DOMParser;
				xmlDoc = domParser.parseFromString(str, 'text/xml');
			} catch (e){
				//console.error("Caught exception in parseXML(): " + e + "\n");
				xmlDoc = undefined;
			}
		}
		if( !xmlDoc || xmlDoc.getElementsByTagName( "parsererror" ).length ){
			console.error( "Invalid XML: " + str );
		}
		
		return xmlDoc;
	}

	const setInnerHTML = function(ele, str, preventScripts){
		if (!ele)
			return;
		ele = Spry.$(ele);
		var scriptExpr = "<script[^>]*>(.|\s|\n|\r)*?</script>";
		ele.innerHTML = str.replace(new RegExp(scriptExpr, "img"), "");

		if (preventScripts)
			return;

		var matches = str.match(new RegExp(scriptExpr, "img"));
		if (matches)
		{
			var numMatches = matches.length;
			for (var i = 0; i < numMatches; i++)
			{
				var s = matches[i].replace(/<script[^>]*>[\s\r\n]*(<\!--)?|(-->)?[\s\r\n]*<\/script>/img, "");
				//Spry.Utils.eval(s);
				eval(s);
			}
		}
	}

	const canvasIt = function canvas(cID, _newConfig={}){
		let canvas, sourceimage, tmp, _this = Object.getPrototypeOf($) || this;
		if(!cID) return _this;
		
		if(isString(cID) && (tmp = $one(cID) ) && isElement(tmp) ){
			canvas = tmp;
			tmp = null;
		} else if(isElement(cID) ){
			canvas = cID;
		} else if( isPlainObject(cID) ){
			canvas = ("canvas" in cID) ? (isElement(cID.canvas) ? cID.canvas : isString(cID.canvas) ? $one(cID.canvas) : false ) : false;
			sourceimage = ("sourceimage" in cID) ? (isElement(cID.sourceimage) ? cID.sourceimage : isString(cID.sourceimage) ? $one(cID.sourceimage) : false) : false;
		} else {
			canvasWrapper = tag$1("div",{id: "", "class": ""},
				canvas = tag$1("canvas",{id: "", "class": ""},"your browser does not support the canvas element"),
				sourceimage = tag$1("img",{id: "", "class" :"", src: ""}), 
				sourceinput = tag$1("input",{id: "", "class" :"", type: "file", onchange: (e) => {
						let $this = isElement(this) ? this : e.target||window.event.target, 
						file = $this.files[0] || (e||window.event).dataTransfer.files[0];
						if(file){
							let reader = new FileReader();
							reader.onload = (e) => {
								sourceimage.src = e.result;
							}
							reader.readAsDataURL(file);
						}
					}}
				)
			);
			document.body.appendChild(canvasWrapper)
		}
		//var sourceimage = document.querySelector('img');
		//var canvas = document.querySelector('canvas');
		
		if(!isElement(canvas) || !isElement(sourceimage)) return _this;
		
		canvas.height = canvas.width = 0;
		let context = canvas.getContext('2d');
		
		this.copy = function copy(){
			var imgwidth = sourceimage.offsetWidth;
			var imgheight = sourceimage.offsetHeight;
			canvas.width = imgwidth;
			canvas.height = imgheight;
			context.drawImage(sourceimage, 0, 0);
			return this;
		}
		// Rotate 90 degrees and copy image to canvas ➜ 
		this.rotate = function rotate() {
			var imgwidth = sourceimage.offsetWidth;
			var imgheight = sourceimage.offsetHeight;
			canvas.width = imgwidth;
			canvas.height = imgheight;
			context.save();
			context.translate(imgwidth / 2, imgheight / 2);
			context.rotate(Math.PI/2);
			context.drawImage(sourceimage, -(imgwidth / 2), -(imgheight / 2));
			context.restore();
			return this;
		}
		// resize image
		this.resize = function resize(nWidth, nHeight) {
			var imgwidth = sourceimage.offsetWidth;
			var imgheight = sourceimage.offsetHeight;
			canvas.width = nWidth || 10;
			canvas.height = nHeight || 50;
			context.drawImage(sourceimage, 0, 0, imgwidth, imgheight, 0, 0, ( nWidth || 10 ), ( nHeight || 50 ) );
			return this;
		}
		// scale image
		var scaleX = 2;
		var scaleY = 2;
		this.scale = function scale(scaleX = 2, scaleY = 2){
			var imgwidth = sourceimage.offsetWidth;
			var imgheight = sourceimage.offsetHeight;
			canvas.width = scaleX ? imgwidth * scaleX : imgwidth;
			canvas.height = scaleY ? imgheight * scaleY : imgheight;
			if(scaleX && scaleY ) context.scale(scaleX, scaleY);
			context.drawImage(sourceimage, 0, 0);
			return this;
		}
		//------------------------------------------------
		this.capture = function capture(video,scaleFactor) {
			if(scaleFactor == null) scaleFactor = 1;
			var w = video.videoWidth * scaleFactor;
			var h = video.videoHeight * scaleFactor;
			//var canvas = document.createElement('canvas');
			canvas.width = w;
			canvas.height = h;
			ctx = canvas.getContext('2d');
			ctx.drawImage(video,0,0,w,h);
			//return canvas;
			return this;
		}
		this.shoot = function shoot(output, v, scaleFactor){
			if(v.paused || v.ended)	return false;
			// var output = jQuery('#snapshotsOutput');
			var canvas = capture(v,scaleFactor);
			canvas.onclick = function(){
				window.open(this.toDataURL());
			}
			snapshots.unshift(canvas);
			output.innerHTML = '';
			for(var i=0;i<4;i++){
				output.appendChild(snapshots[i]);
			}
			return this;
		}
		//function snap(v,c,w,h) {
		this.snap = function snap(output, video,snapW,snapH,mime) {
			if(video.paused || video.ended || !output) return false;
			mime = mime || "image/png";
			//var output = document.getElementById('c3'),
			a = document.createElement('a'),
			c = document.createElement('canvas'),
			ctx = c.getContext('2d');
			canvas.width = snapW || 800;
			canvas.height = snapH || 500;
			w = canvas.width;
			h = canvas.height;
			ctx.fillRect(0,0,w,h);
			ctx.drawImage(video,0,0,w,h);
			canvas.style.width = '250px';
			canvas.style.height = '150px';
			this.util().setAttr(a, {'href':canvas.toDataURL(mime), 'title':'Download ', 'download':'canvas'});
			a.innerHTML = '';
			a.appendChild(canvas);
			output.innerHTML = '';
			output.appendChild(a);
			//output.appendChild(canvas);
			return this;
		}
		this.draw = function draw(v,c,w,h) {
			if(v.paused || v.ended)	return false;
			c.drawImage(v,0,0,w,h);
			setTimeout(draw,20,v,c,w,h);
			return this;
		}
		this.draw2 = function draw2(v,c,bc,w,h) {
			if(v.paused || v.ended) return false;
			// First, draw it into the backing canvas
			bc.drawImage(v,0,0,w,h);
			// Grab the pixel data from the backing canvas
			var idata = bc.getImageData(0,0,w,h);
			var data = idata.data;
			// Loop through the pixels, turning them grayscale
			for(var i = 0; i < data.length; i+=4) {
				var r = data[i];
				var g = data[i+1];
				var b = data[i+2];
				var brightness = (3*r+4*g+b)>>>3;
				data[i] = brightness;
				data[i+1] = brightness;
				data[i+2] = brightness;
			}
			idata.data = data;
			// Draw the pixels onto the visible canvas
			c.putImageData(idata,0,0);
			// Start over!
			setTimeout(function(){ draw2(v,c,bc,w,h); }, 0);
			return this;
		}
		//-----------------------------------------
		return _this;
	}
	/**
	 * Create a middleware to parse json and urlencoded bodies.
	 *
	 * @param {object} [options]
	 * @return {function}
	 * @deprecated
	 * @public
	 */

	function bodyParser (options) {
		var opts = {}

		// exclude type option
		if (options) {
			for (var prop in options) {
				if (prop !== 'type') {
					opts[prop] = options[prop]
				}
			}
		}
		//$clog(opts.dataType,isFunction($[opts.dataType]));
		//var _parser = opts.dataType && isFunction($[opts.dataType]) ? $[opts.dataType](opts) : $.raw(opts)
		
		return function bodyParser (req, res, next) {
			/* var _urlencoded = $.urlencoded(opts)
			_parser(req, res, function (err) {
				if (err) return next(err)
				_urlencoded(req, res, next)
			}) */
		}
		/* return function bodyParser (req, res, next) {
			var _json = $.json(opts)
			var _urlencoded = $.urlencoded(opts)
			_json(req, res, function (err) {
				if (err) return next(err)
				_urlencoded(req, res, next)
			})
		} */
	}

	const $clog = function() {console.log.apply(this,arguments);}
	const $cerror = function() {console.error.apply(this,arguments);}
	const $cwarn = function() {console.warn.apply(this,arguments);}
	const $bytes = () => {
		var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g;
		var formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/;
		var map = {
			b:  1,
			kb: 1 << 10,
			mb: 1 << 20,
			gb: 1 << 30,
			tb: Math.pow(1024, 4),
			pb: Math.pow(1024, 5),
		};
		var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;

		/**
		 * Convert the given value in bytes into a string or parse to string to an integer in bytes.
		 *
		 * @param {string|number} value
		 * @param {{
		 *  case: [string],
		 *  decimalPlaces: [number]
		 *  fixedDecimals: [boolean]
		 *  thousandsSeparator: [string]
		 *  unitSeparator: [string]
		 *  }} [options] bytes options.
		 *
		 * @returns {string|number|null}
		 */

		function bytes(value, options) {
			if (typeof value === 'string') {
				return parse(value);
			}

			if (typeof value === 'number') {
				return format(value, options);
			}
			
			return null;
		}

		/**
		 * Format the given value in bytes into a string.
		 *
		 * If the value is negative, it is kept as such. If it is a float,
		 * it is rounded.
		 *
		 * @param {number} value
		 * @param {object} [options]
		 * @param {number} [options.decimalPlaces=2]
		 * @param {number} [options.fixedDecimals=false]
		 * @param {string} [options.thousandsSeparator=]
		 * @param {string} [options.unit=]
		 * @param {string} [options.unitSeparator=]
		 *
		 * @returns {string|null}
		 * @public
		 */

		function format(value, options) {
			if (!Number.isFinite(value)) {
				return null;
			}

			var mag = Math.abs(value);
			var thousandsSeparator = (options && options.thousandsSeparator) || '';
			var unitSeparator = (options && options.unitSeparator) || '';
			var decimalPlaces = (options && options.decimalPlaces !== undefined) ? options.decimalPlaces : 2;
			var fixedDecimals = Boolean(options && options.fixedDecimals);
			var unit = (options && options.unit) || '';

			if (!unit || !map[unit.toLowerCase()]) {
				if (mag >= map.pb) {
					unit = 'PB';
				} else if (mag >= map.tb) {
					unit = 'TB';
				} else if (mag >= map.gb) {
					unit = 'GB';
				} else if (mag >= map.mb) {
					unit = 'MB';
				} else if (mag >= map.kb) {
					unit = 'KB';
				} else {
					unit = 'B';
				}
			}

			var val = value / map[unit.toLowerCase()];
			var str = val.toFixed(decimalPlaces);

			if (!fixedDecimals) {
				str = str.replace(formatDecimalsRegExp, '$1');
			}

			if (thousandsSeparator) {
				str = str.replace(formatThousandsRegExp, thousandsSeparator);
			}

			return str + unitSeparator + unit;
		}

		/**
		 * Parse the string value into an integer in bytes.
		 *
		 * If no unit is given, it is assumed the value is in bytes.
		 *
		 * @param {number|string} val
		 *
		 * @returns {number|null}
		 * @public
		 */

		function parse(val) {
			if (typeof val === 'number' && !isNaN(val)) {
				return val;
			}

			if (typeof val !== 'string') {
				return null;
			}

			// Test if the string passed is valid
			var results = parseRegExp.exec(val);
			var floatValue;
			var unit = 'b';

			if (!results) {
				// Nothing could be extracted from the given string
				floatValue = parseInt(val, 10);
				unit = 'b'
			} else {
				// Retrieve the value and the unit
				floatValue = parseFloat(results[1]);
				unit = results[4].toLowerCase();
			}

			return Math.floor(map[unit] * floatValue);
		}

		return {bytes, parse, format};
	}
	
	function serialize(form, prettify = false) {
		var serialized = [];
		if(isElement(form)){
			for (var i = 0; i < form.elements.length; i++) {
				var field = form.elements[i];
				if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
				// If a multi-select, get all selections
				if (field.type === 'select-multiple') {
					for (var n = 0; n < field.options.length; n++) {
						if (!field.options[n].selected) continue;
						serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
					}
				} // Convert field data to a query string
				else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
					serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
				}
			}
		} else if (typeof(form) === 'string' || Object.prototype.toString.call(form) === '[object FormData]') return Array.from(form, function(field){return field.map(encodeURIComponent).join('=');}).join('&');
		// If the content-type is set to JSON, stringify the JSON object
		else if (Object.prototype.toString.call(form) === '[object Array]') return prettify ? JSON.stringify(form, null, "\t") : JSON.stringify(form);
		else{
			// Otherwise, convert object to a serialized string
			//var encoded = [];
			for (var prop in form) {
				if (form.hasOwnProperty(prop)) {
					serialized.push(encodeURIComponent(prop) + '=' + encodeURIComponent(form[prop]));
				}
			}
		}
		return serialized.join('&');
	}
	/*!
	 * Create a new object composed of properties picked from another object
	 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {Object} obj   The object to pick properties from
	 * @param  {Array}  props An array of properties to use
	 * @return {Object}       The new object
	 */
	const pick = (obj, props) => {
		'use strict';
		// Make sure object and properties are provided
		if (!obj || !props) return;
		// Create new object
		var picked = {};
		// Loop through props and push to new object
		props.forEach(function(prop) {
			picked[prop] = obj[prop];
		});
		// Return new object
		return picked;
	}
	/* const filterIcons = throttle(value => {
		let __icons = Array.from(document.getElementsByClassName("font-icon")),
		totalIconsInSet = icons.getAttribute("data-total-icons"), 
		$i = 0;
		if(Array.isArray(__icons) && __icons.length > 0){
			let val = value;
			// Respond to any input change, and show first few matches
			if(val && val !== ""){
				__icons.forEach((_icon) => {
					_icon.style.display = "none";
					if(_icon.dataset.iconName.toLowerCase().indexOf(val) !== -1 || _icon.dataset.iconClassname.indexOf(val) !== -1 || _icon.textContent.toLowerCase().indexOf(val) !== -1){
						_icon.style.display = "inline-flex";
						iconsFound.innerHTML = "Found a total of : <strong>" + ($i + 1) + "</strong>, out of <strong>" + totalIconsInSet + "</strong> icon/s";
						$i++;
					} else iconsFound.innerHTML = "Found a total of : <strong>" + $i + "</strong>, out of <strong>" + totalIconsInSet + "</strong> icon/s";
				});
			} else {
				__icons.forEach((_icon) => {_icon.style.display = "inline-flex";});
				iconsFound.innerHTML = "Found a total of : <strong>" + $i + "</strong>, out of <strong>" + totalIconsInSet + "</strong> icon/s";
			}
		}
	}, 250);
	 */
	function debounce(cb, delay = 1000){
		let timeout;
		
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				cb(...args);
			}, delay);
		}
	}
	
	function throttle(cb, delay = 1000){
		let shouldWait = false;
		let waitingArgs;
		
		const timeoutFunc = () => {
			if(waitingArgs == null){
				shouldWait = false;
			} else {
				cb(...waitingArgs);
				waitingArgs = null;
				setTimeout(timeoutFunc, delay);
			}
		}
		
		return (...args) => {
			if(shouldWait){
				waitingArgs = args;
				return;
			}
			
			cb(...args);
			shouldWait = true;
			
			setTimeout(timeoutFunc, delay);
		}
	}
	
	const chop = (str, n, end) => {return str.length > n ? str.substr(0, n) + (end&&isString(end)?end:"...") : str;}
	const truncateString = (str, num) => {return str && str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;}
		
	//const $conf = () => {return {$_validExts, $_accept, $r_imFilter, $_mimeTypes}}
	
	const findBy = (arr, by="id", val) => {
		if(!isArray(arr) || !isString(by) || typeof val === "undefined") return false;
		//const record = arr.find((p)=> Number(p.id) === Number(id));
		const record = arr.find((p)=> by === "id" ? Number(p.id) === Number(val) : p[by] && p[by] === val);
		return record
	}
	const findInText = (q, el, cb) => {
		if(isString(q) && q.length >= 3 && isElement(el)){
			let textToSearch = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 
			pattern = new RegExp(`${textToSearch}`, "gi"), 
			i=0, res = q;
			
			res = el.textContent.replace(pattern, match => {i++;return `<mark>${match}<\/mark>`});
			el.innerHTML = res
			//$one('#found-total').textContent = `${i} term/s found`;
			if(isFunction(cb)){
				cb.apply(null, [res, i, pattern])
			}
		} else {
			
		}
		return this;
	}
	
	const liveEdit = throttle(function(input, output,) {
		input = $one(input);
		output = $one(output);
		let text = ('value' in input) ? input.value : input.textContent
		
		if('value' in output){
			output.value = text;
		} else {
			//output.textContent = text;
			output.innerHTML = text;
		}
	}, 250);
	const zoomImage = (id,how,zoom) => {
		let img = $one(id);
		if(!isElement(img)) return;
		zoom = zoom??1.5;
		how = how || 'in';
		var imageStyle = img.style, imgW = img.width,imgH = img.height,
		zoomW = how === 'in' ? (imgW*zoom) : (imgW/zoom), zoomH = how === 'in' ? (imgH*zoom) : (imgH/zoom);
		imageStyle.cssText += `width:${zoomW}px;height:${zoomH}px;transition: all 600ms ease-out`;
		fade(id,0,100,1900);
		
		return this;
	}
	const zoomIn = (id,zoom) => {
		zoomImage(id, 'in', zoom);
		//var img = $one(id);var image = img.style;var winW = img.width,winH = img.height;image["width"] = (winW*zoom) + "px";image["height"] = (winH*zoom) + "px";image["transition"] = "all 600ms linear";fade(id,0,100,1900);
		return this;
	}
	const zoomOut = (id,zoom) => {
		zoomImage(id, 'out', zoom);
		//var img = $one(id);var image = img.style;var winW = img.width,winH = img.height;image["width"] = (winW/zoom) + "px";image["height"] = (winH/zoom) + "px";image["transition"] = "all 600ms ease-out";fade(id,0,100,1900);
		return this;
	}
	//bg_size_x = ((img.offsetWidth>0?img.offsetWidth:img.parentElement.offsetHeight) * zoom),
	//bg_size_y = ((img.offsetHeight>0?img.offsetHeight:img.parentElement.offsetHeight) * zoom);
	let fx = 1, fy = 1;
	function flipImage(img, axis){
		img = $one(img);
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
		
		//img.style.transform =  `scale(${fx}, ${fy})`;
		img.style.transform =  `scale(${flipImage.fx}, ${flipImage.fy})`;
	}
	flipImage.fx = 1;flipImage.fy = 1;

	/**
	 * Function to fade an element
	 * @param  {HTMLElement} element
	 * @param  {Number} from
	 * @param  {Number} to
	 * @param  {Number} [duration=300]
	 */
	const fade = (element, from, to, duration) => {
		const start = window.performance.now()
		element = $one(element)
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
	const fadeIn = (element, duration) => {fade(element, -1, 1, duration);return this;}

	/**
	 * Fade out shorthand
	 * @param  {HTMLElement} element
	 * @param  {Number|undefined} duration
	 */
	const fadeOut = (element, duration) => {fade(element, -1, 0, duration);return this;}

	const createChainables = (chainableFunctions) => ({
		chain(initialValue){
			const operations = [];
			const evaluate = () => operations.reduce((value, [func, ...args]) => func(value, ...args), initialValue,);
			const proxy = Object
				.keys(chainableFunctions)
				.reduce((acc, funcName) => ({
					...acc, 
					[funcName]: (...args) => {
						operations.push([chainableFunctions[funcName], ...args]);
						return proxy;
					}, 
				}), {value: evaluate});
			return proxy;
		}
	});
	// -- usage --
	//const data2 = [{key: 'a', val: 1}, {key: 'b', val: 2}];
	
	// const { map } = require("@vanillaes/absurdum").array;
	// const { fromEntries } = require("@vanillaes/absurdum").objects;
	// const _ = createChainables({map, fromEntries});
	// console.log(_.chain(data).map(({key, val}) => [key, key]).fromEntries().value())
	// -- or --
	//const __ = createChainables({ajax, on})
	//console.log(__.chain(data2).ajax({url:'./index.html'}).on($all("a"),"click",(e)=>{}).value())
	function chain(value){
		return {
			/**
			* @param {funtion|string} func function or function name (in chained value)
			* @param {...any} args
			*/
			fn(func, ...args){
				if(typeof func === "string"){
					return chain(value[func], ...args);
				}
				return chain(value, ...args);
			}, 
			value, 
		};
	}
	
	let i_oe = 0, editor_loaded=false;
	function openEditor({filePath,fileName,oldElement,containerElement, mime}, type="popup", settings = {effect:'show',effect_time:1000}){
		i_oe++;
		let tmpContent;
		if(!fileName || !filePath || !oldElement){
			alert('Element ID is needed!');
			return;
		}
		let $oldElement = $one(oldElement), 
		$tmpId = $oldElement.id || $oldElement.getAttribute('id') || uid(), 
		$tmpContent = $oldElement.getAttribute('data-raw-syntax') || (("value" in $oldElement) ? $oldElement.value : false) || $oldElement.innerHTML || $oldElement.textContent, 
			
		$popupFrame = `<div class="popup-editor-head bg--opaque f--12 hidden"></div>
		<div id="" class="popup-editor-body flex flex--col w--12 w--lg-10 h--12 m--auto bg--info-gradient">
			<div class="flex-align-center gap--4 bg--opaque w--12 shadow2">
				<span class="flex-align-center gap--4 w--4 p--2">
					<button class="akd__btn btn--inherit" type="button" title="toggle editor utility menu" onclick="this.closest('.popup-editor').querySelector('.popup-editor-body-inner').classList.toggle('utility-menu-toggled');this.classList.toggle('is-active');">||</button>
					<button class="akd__btn btn--inherit" type="button" title="toggle editor preview container" onclick="this.closest('.popup-editor').querySelector('.popup-editor-body-inner').classList.toggle('preview-container-toggled');this.classList.toggle('is-active');">(P)</button>
					<button class="akd__btn btn--inherit" type="button" title="toggle editor result menu" onclick="this.closest('.popup-editor').querySelector('.popup-editor-body-inner').classList.toggle('result-menu-toggled');this.classList.toggle('is-active');">=</button>
				</span>
				<span class="flex-align-center gap--4 w--4 p--2 ml--auto">
					<button class="akd__btn btn--inherit ml--auto" type="button" title="close editor" onclick="this.closest('.popup-editor').classList.toggle('popup-minimized');"><i class="fa fa-times fak fak-times"></i></button>
				</span>
			</div>
			
			<div class="popup-editor-body-inner flex w--12 h--12 m--0">
				<div class="popup-editor-body-utility-menu bg--opaque">
					<div class="utility-section shadow-1 p--1">
						<span class="utility-section-row flex-align-center gap--4 p--2">
							<span class="text--center text--md mr--auto">Font Size: </span>
							<input id="" class="font-size-input akd__input-range w--10 w--md-9 ml--auto" type="range" min="10" max="100" step="1" value="16" onchange="let target = $one('.active--tab .textarea');if(isElement(target)){target.style.fontSize = this.value+'px';if(!target.hasAttribute('data-font-size')){target.setAttribute('data-font-size', this.value)} else {target.dataset.fontSize = this.value;}}" />
						</span>
					</div>
					
					
					<div class="utility-section shadow-1 p--1 mb--1">
						<span class="utility-section-row flex-align-center gap--4 p--2">
							<span class="text--center text--md">Colors: </span>
							<span class="flex-align-center flex--wrap gap--2 gap--md-4">
								<input id="" class="hue-input akd__input-color w--3 text--white" min="0" max="255" step="1" type="number" value="255" oninput="let target = $one('.active--tab .textarea'), h = this.value, l = $one('.lightness-input', this.parentElement).value, s = $one('.saturation-input', this.parentElement).value, a = $one('.alpha-input', this.parentElement).value;if(isElement(target)){target.style.backgroundColor = 'hsla('+h+','+s+'%,'+l+'%,'+a+')';if(!target.hasAttribute('data-bg-color')){target.setAttribute('data-bg-color', 'hsla('+h+','+s+'%,'+l+'%,'+a+')')} else {target.dataset.bgColor = 'hsla('+h+','+s+'%,'+l+'%,'+a+')';}}" />
								<input id="" class="saturation-input akd__input-color w--3 text--white" min="0" max="100" step="1" value="100" type="number" oninput="let target = $one('.active--tab .textarea'), h = $one('.hue-input', this.parentElement).value, l = $one('.lightness-input', this.parentElement).value, s = this.value, a = $one('.alpha-input', this.parentElement).value;if(isElement(target)){target.style.backgroundColor = 'hsla('+h+','+s+'%,'+l+'%,'+a+')';if(!target.hasAttribute('data-bg-color')){target.setAttribute('data-bg-color', 'hsla('+h+','+s+'%,'+l+'%,'+a+')')} else {target.dataset.bgColor = 'hsla('+h+','+s+'%,'+l+'%,'+a+')';}}" />
								<input id="" class="lightness-input akd__input-color w--3 text--white" min="0" max="100" step="1" value="100" type="number" oninput="let target = $one('.active--tab .textarea'), h = $one('.hue-input', this.parentElement).value, l = this.value, s = $one('.saturation-input', this.parentElement).value, a = $one('.alpha-input', this.parentElement).value;if(isElement(target)){target.style.backgroundColor = 'hsla('+h+','+s+'%,'+l+'%,'+a+')';if(!target.hasAttribute('data-bg-color')){target.setAttribute('data-bg-color', 'hsla('+h+','+s+'%,'+l+'%,'+a+')')} else {target.dataset.bgColor = 'hsla('+h+','+s+'%,'+l+'%,'+a+')';}}" />
								<input id="" class="alpha-input akd__input-color w--2 ml--auto text--white" type="number" min="0" max="1" step="0.1" value="1" oninput="let target = $one('.active--tab .textarea'), h = $one('.hue-input', this.parentElement).value, l = $one('.lightness-input', this.parentElement).value, s = $one('.saturation-input', this.parentElement).value, a = this.value;if(isElement(target)){target.style.backgroundColor = 'hsla('+h+','+s+'%,'+l+'%,'+a+')';if(!target.hasAttribute('data-bg-color')){target.setAttribute('data-bg-color', 'hsla('+h+','+s+'%,'+l+'%,'+a+')')} else {target.dataset.bgColor = 'hsla('+h+','+s+'%,'+l+'%,'+a+')';}}" />
							</span>
						</span>
					</div>
					
					<div id="editor-buttons" class="utility-section shadow-1 p--1 mb--1 h--max-50 overflow--auto sticky-bottom bg--dark" style="top: 100%;"></div>
				</div>
				<div class="popup-editor-body-content ${__akd._tabs.main_wrapper_class}">
					<div class="${__akd._tabs.buttons_wrapper_class}">
						{{ BUTTON }}
					</div>
					<div class="${__akd._tabs.panels_wrapper_class}">
						{{ FORM }}
					</div>
					<div id="popup-editor-results" class="popup-editor-results"></div>
				</div>
				<div class="popup-editor-preview-container">
					<div class="popup-editor-preview"></div>
				</div>
			</div>
		</div>
		<span class="popup-toggle-button-wrapper">
			<button id="" class="akd__btn popup-toggle-button" type="button" title="toggle popup" onclick="this.closest('.popup-editor').classList.toggle('popup-minimized');"></button>
		</span>`, 
		$buttonElement = `<button id="" class="akd__btn akd__tab-button ${__akd._tabs.active_class}" type="button" title="" data-target-tab="#ajaxSourceEditorForm-${i_oe}" data-parent-tab=".popup-editor-body-content" onclick="let target = $one(this.dataset.targetTab + ' .textarea'), input = this.closest('.popup-editor').querySelector('.utility-section .font-size-input');input.value = target.dataset.fontSize??'16'"><span class="text--truncate">${fileName}</span></button>`, 
		$formElement = `<form id="ajaxSourceEditorForm-${i_oe}" class="popup-editor-source-form ${__akd._tabs.panel_class} ${__akd._tabs.active_class} w--12" name="ajaxSourceEditorForm" method="POST" action="${settings?.EDIT_URL??'./'}" enctype="multipart/form-data" >
			<input id="popup-editor-action" name="action" type="hidden" value="edit" />
			<div class="flex flex--nowrap flex--even gap--4 p--4">
				<label class="flex flex--center gap--2 f--6" for="open-editor-filePath">
					<span class="bg--dark text--default text--center p--3 bdr--2-tl bdr--2-bl" style="line-height: 1.25;">filePath:</span>
					<input id="open-editor-filePath" class="f--12 p--3 bdr--2-tr bdr--2-br text--default" name="filePath" type="text" value="${filePath}" readonly />
				</label>
				<label class="flex flex--center gap--2 f--6" for="open-editor-fileName">
					<span class="bg--dark text--default text--center p--3 bdr--2-tl bdr--2-bl" style="line-height: 1.25;">fileName:</span>
					<input id="open-editor-fileName" class="f--12 p--3 bdr--2-tr bdr--2-br text--default" name="fileName" type="text" value="${fileName}" readonly />
				</label>
			</div>
			<textarea id="${$tmpId}-textarea" class="textarea no--resize" name="fileContent" wrap="logical" style="min-height:300px;max-height:500px;width:100%" data-edit-count="0" oninput="let editCount = Number(this.dataset.editCount), submitButton = $one('#popup-editor-submit-button-${$tmpId}');this.setAttribute('data-edit-count', editCount + 1);if(editCount > 1){$one('#popup-action-text-${$tmpId}').textContent = 'save';if(submitButton.hasAttribute('disabled')) submitButton.toggleAttribute('disabled');} else {$one('#popup-action-text-${$tmpId}').textContent = 'edit';}">${htmlValue($tmpContent)}</textarea>
			<div class="flex flex--nowrap flex--even gap--8 p--8">
				<!--<input id="open-editor-submit" class="akd__btn btn--success save" name="edit-form-submit" type="button" value="edit" />-->
				
				<button id="popup-editor-submit-button-${$tmpId}" class="akd__btn btn--success w--4 w--lg-3 px--8 py--6 ml--auto" name="edit-form-submit" type="button" title="save" onclick="var target = $one('#${$tmpId}-textarea');if(target){_.downloadText(target.value, '${fileName}', '${mime}');}" disabled><i class="fa fa-save"></i>&nbsp;<span id="popup-action-text-${$tmpId}">edit</span></button>
				<button id="popup-editor-reset-button-${$tmpId}" class="akd__btn btn--warning w--4 w--lg-3 px--8 py--6 mr--auto" name="edit-form-reset" type="button" title="reset" onclick="let theEditor = this.closest('.popup-editor').querySelector('.popup-editor-body-inner .textarea'), editCount = Number(theEditor.dataset.editCount), submitButton = $one('#popup-editor-submit-button-${$tmpId}');theEditor.setAttribute('data-edit-count', 0);theEditor.value = $one('#hidden-textarea-${$tmpId}').value;$one('#popup-action-text-${$tmpId}').textContent = 'edit';if(!submitButton.hasAttribute('disabled')) submitButton.toggleAttribute('disabled');"><i class="fa fa-undo"></i>&nbsp;reset</button>
			</div>
			<textarea id="hidden-textarea-${$tmpId}" class="no-display hidden visually-hidden no-resize">${htmlValue($tmpContent)}</textarea>
		</form>`;
		
		if(type === "popup"){
			//let $containerElement = $one(`#popup-editor-${$tmpId}`);
			let $containerElement = $one(".popup-editor");
			if(editor_loaded === false || !isElement($containerElement)){
				$containerElement = tag$1("div", {
					id: `popup-editor-${$tmpId}`, 
					"class":'popup-editor pos--fix to-front w--12 h--12 grid bg--opaque', 
					"innerHTML": parseTemplate({'{{ BUTTON }}': $buttonElement, '{{ FORM }}': $formElement}, $popupFrame)
				});
				//console.log($containerElement);
				document.body.appendChild($containerElement);
				editor_loaded = true;
				buildEditorButtons({$target: "#editor-buttons", $editorID: ".popup-editor .active--tab .textarea", $size: 32}, 'button').init();
			} else if(editor_loaded === true && isObject($containerElement) && document.body.contains($containerElement)){
				$all(`.popup-editor-body-content ${__akd._tabs.button_selector}, .popup-editor-body-content ${__akd._tabs.panel_selector}`, $containerElement).forEach(ed => ed.classList.remove(`${__akd._tabs.active_class}`))
				//$one('.popup-editor-body-content', $containerElement).innerHTML = $formElement;
				$one(`.popup-editor-body-content > ${__akd._tabs.buttons_wrapper_selector}`, $containerElement).insertAdjacentHTML('afterbegin', $buttonElement);
				$one(`.popup-editor-body-content > ${__akd._tabs.panels_wrapper_selector}`, $containerElement).insertAdjacentHTML('afterbegin', $formElement);
				$containerElement.classList.remove('popup-minimized');
				//editor_loaded = false;
			}
		} else {
			html($containerElement, ' ')
			append($containerElement, $formElement);
			
		}
		//$(document).on('submit',"#ajaxSourceEditorForm",function(e){
		document.addEventListener('click',function(e){
			e.preventDefault();
			let $this = isElement(this) ? this : e.target;
			if($this.id === "#popup-editor-remove-button" && isObject($containerElement) && document.body.contains($containerElement)){
				document.body.removeChild($containerElement);
			} else if($this.id === "#popup-editor-submit-button2"){
				var $formdata = false,
				$target = $one("#popup-editor-results"),
				$form = $one('#ajaxSourceEditorForm'),
				$formAction = $form.getAttribute('action'),
				$action = $one('#open-editor-action').value,
				$editSubmit = 'edit-form-submit',
				$editFileName = $one('#open-editor-fileName').value,
				$editFilePath = $one('#open-editor-filePath').value,
				$editContent = $one(`#${$tmpId}-textarea`).value;
				if (window.FormData){
					$formdata = new FormData($form);
				}
				////$formAction += '?action=edit&filePath='+$editFilePath+'&fileName='+$editFileName+'&fileContent='+$editContent+'&full_ajax=1&only_content=1&edit-form-submit='+$editSubmit;
				$formdata = `action=edit&filePath=${$editFilePath}&fileName=${$editFileName}&fileContent=${$editContent}&full_ajax=1&only_content=1&edit-form-submit=${$editSubmit}`;
				
				xhr.ajax({
					url         : $formAction,
					data        : $formdata ? $formdata : serialize($form),
					//data:{'action':$action,'edit-form-submit':$editSubmit,'fileName':$editFileName,'filePath':$editFilePath,'fileContent':$editContent,'full_ajax':'1','only_content':'1'},
					cache       : false,
					//contentType : false,
					processData : false,
					type        : 'POST',
					beforeSend  : function(){fadeIn("#full-page-loader-overlay", 100);},
					complete  : function(){fadeOut("#full-page-loader-overlay", "slow");},
					success: function(html){renderContent($target,html);},
					error: function(html){renderContent($target,html);}
				})/* .done(function( msg ) {alert( "Data Saved: " + msg );}) */;
			}
		});
	}
	function randomColor(id,what="both", alert){
		let el = $one(id);
		if(isElement(el)){
			//let colorInfo = $one("#colorInfo");
			let textcolor = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6), 
			bgcolor = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6), 
			assignment = what === "both" ? {backgroundColor: bgcolor, color: textcolor} : what === "color" ? {color: textcolor} : {backgroundColor: bgcolor};
			Object.assign(el.style, assignment)
			//el.style.backgroundColor = bgcolor;el.style.color = textcolor;if(isElement(colorInfo)){colorInfo.innerHTML = "<p><strong>Changed background color to [[" + bgcolor + "]],and color to [[" + textcolor + "]]</strong>.</p>";if(alert == "" || alert == "undefined" || alert == true) alert("Changed background color to " + bgcolor + " and text font color to " + textcolor);}
		}
	}
	function overrideLink(functionName, str){
		// Remove links with blank href tags
		// For exampe: &lt;a href=""&gt;<a>This would break everything!&lt;/a&gt;</a>
		str = str.replace(/href=""/g, '');

		// Replaces links with onclick events
		return str.replace(/href=\"(.+?)\"/, 'onclick="' + functionName + '(\'$1\');"');
	}
	function renderContent($target,content,effect,effect_time) {
		$target = $one($target);
		settings = {effect: effect||'show',effect_time: effect_time||1000};
		display_effect = effect || storage.get('page-display-effect') || settings.display_effect || 'animated slideInDown';
		//BLU_X.settings.currentToolPageEffect = effect;
		display_effect_time = effect_time || storage.get('page-display-effect-time') || settings.display_effect_time || 1000;
			
		if(display_effect == '' || display_effect == 'fadein')$target.html(content).fadeIn(display_effect_time);
		else if(display_effect == 'show') $target.html(content).show(display_effect_time);
		else $target.html(content).css('display','block').addClass(display_effect);
	}
	
	const  update_time = function () {
		const rightnow = new Date(); // The current date and time
		var hours = rightnow.getHours(); // Capture the hours as a string, "00" thru "23"
		var hourstring = (hours < 10) ? "0" + hours.toString() : hours.toString();

		var minutes = rightnow.getMinutes(); // Capture the minutes as a string, "00" thru "59"
		var minutestring = (minutes < 10) ? "0" + minutes.toString() : minutes.toString();

		var seconds = rightnow.getSeconds(); // Capture the seconds as a string, "00" thru "59"
		var secondstring = (seconds < 10) ? "0" + seconds.toString() : seconds.toString();

		var timestring = hourstring + ":" + minutestring + ":" + secondstring; // Put it all together, "00:00:00"
		return rightnow;
		//var timeplace = document.getElementById("clock"); // Manipulate the DOM, display it to the screen!
		//timeplace.childNodes[0].nodeValue = timestring;
		//setTimeout('update_time()', 1000);
	}

    
	function buildEditorButtons({$target, $editorID, $size}, $btn_type = 'button'){
		const $this = this, is_svg = window['SVGIconsCreator'] ? true : false;
		let $sizeW, $sizeH;
		if(!$size) $size = 25;
		if(isArray($size)) {
			[$sizeW, $sizeH] = $size;
		} else $sizeW = $sizeH = $size;

		$sizeW = isString($sizeW) && /px/.test($sizeW) === true ? $sizeW : `${$sizeW}px`;
		$sizeH = isString($sizeH) && /px/.test($sizeH) === true  ? $sizeH : `${$sizeH}px`;
		//console.log($sizeW, _typeof($sizeW))
		let date_time = update_time() || Date.now(), 
		$bg_sizeW = isString($sizeW) && /px/.test($sizeW) === true ? (Number($sizeW.replace('px',''))-4)+'px' : ($sizeW-4)+'px', 
		$bg_sizeH = isString($sizeH) && /px/.test($sizeH) === true ? (Number($sizeH.replace('px',''))-4)+'px' : ($sizeH-4)+'px', 
		$buttons = [
			{'class': 'akd-h1','id': 'h1Text','title': 'Header 1','text': 'H1'},
			{'class': 'akd-h2','id': 'h2Text','title': 'Header 2','text': 'H2'},
			{'class': 'akd-h3','id': 'h3Text','title': 'Header 3','text': 'H3'},
			{'class': 'akd-p','id': 'pText','title': 'Insert Paragraph Tag','text': 'P'},
			{'class': 'akd-div','id': 'divText','title': 'Insert Divider Tag','text': 'DIV'},
			{'class': 'akd-main','id': 'mainText','title': 'Insert MAIN Tag','text': 'MAIN'},
			{'class': 'akd-article','id': 'articleText','title': 'Insert ARTICLE Tag','text': 'ARTICLE'},
			{'class': 'akd-section','id': 'sectionText','title': 'Insert SECTION Tag','text': 'SECTION'},
			{'class': 'akd-aside','id': 'asideText','title': 'Insert ASIDE Tag','text': 'ASIDE'},
			{'class': 'akd-header','id': 'headerText','title': 'Insert HEADER Tag','text': 'HEADER'},
			{'class': 'akd-footer','id': 'footerText','title': 'Insert FOOTER Tag','text': 'FOOTER'},
			
			//{'class': 'akd-align-left','id': 'justifyLeftText','title': 'Align Left','text': '&nbsp;'},
			//{'class': 'akd-align-center','id': 'justifyCenterText','title': 'Align Center','text': '&nbsp;'},
			//{'class': 'akd-align','id': 'justifyText','title': 'Align Justify','text': '&nbsp;'},
			//{'class': 'akd-align-right','id': 'justifyRightText','title': 'Align Right','text': '&nbsp;'},
			//{'class': 'akd-id-selector','id': 'idSelText','title': 'Insert ID selector','text': '&nbsp;'},
			//{'class': 'akd-class-selector','id': 'classSelText','title': 'Insert Class selector','text': '&nbsp;'},
			
			{'class': 'akd-ul','id': 'ulText','title': 'Un-ordered List','text': 'UL'},
			{'class': 'akd-ol','id': 'olText','title': 'Ordered List','text': 'OL'},
			{'class': 'akd-inset-li','id': 'liText','title': 'Insert List','text': 'LI'},
			
			{'class': 'akd-hr','id': 'hrText','title': 'Horizontal Rule','text': 'HR'},
			{'class': 'akd-br','id': 'brText','title': 'Word Break','text': 'BR'},
			
			{'class': 'akd-b','id': 'boldText','title': 'Bold','text': 'B'},
			{'class': 'akd-i','id': 'italicText','title': 'Italic','text': 'I'},
			{'class': 'akd-u','id': 'underlineText','title': 'Underline','text': 'U'},
			{'class': 'akd-strong','id': 'strongText','title': 'Strong','text': 'STR'},
			
			{'class': 'akd-insert-table','id': 'tableText','title': 'Insert Table','text': 'TB'},
			{'class': 'akd-insert-row','id': 'trText','title': 'Insert Table Row','text': 'TR'},
			{'class': 'akd-insert-tdata','id': 'tdText','title': 'Insert Table Data','text': 'TD'},
			
			{'class': 'akd-a','id': 'aText','title': 'anchor/link','text': '@://'},
			{'class': 'akd-link','id': 'linkText','title': 'link','text': '@./'},
			{'class': 'akd-image','id': 'imageText','title': 'Image','text': is_svg?SVGIconsCreator.icons({}).Collections:'IMG'},
			{'class': 'akd-code','id': 'codeText','title': 'HTML code','text': '{}'},
			{'class': 'akd-pre','id': 'preText','title': 'HTML pre','text': is_svg?SVGIconsCreator.icons({}).DeveloperMode:'PRE'},
			{'class': 'akd-audio','id': 'audioText','title': 'Insert Audio Tag','text': is_svg?SVGIconsCreator.icons({}).Audiotrack:'AUDIO'},
			{'class': 'akd-video','id': 'videoText','title': 'Insert Video Tag','text': is_svg?SVGIconsCreator.icons({}).Video:'VIDEO'},
			{'class': 'akd-form','id': 'formText','title': 'Insert Form Tag','text': 'FORM'},
			{'class': 'akd-meta','id': 'metaText','title': 'Insert Meta Tag','text': 'META'},
			//{'class': 'akd-ucase','id': 'camelizeText','title': 'Transform text to uppercase','text': '&nbsp;'},
			//{'class': 'akd-selection','id': 'showSelection','title': 'Show character selection','text': '&nbsp;'},
			//{'class': 'akd-select-text','id': 'selectText','title': 'select text','text': '&nbsp;'},
			//{'class': 'akd-view','id': 'view','title': 'view','text': '&nbsp;'},
		], 
		$template_buttons = [
			{'class': 'akd-tag-css','id': 'cssText','title': 'External Css link Tag','text': 'CSS'},
			{'class': 'akd-tag-css-inline','id': 'cssInlineText','title': 'Inline Css link Tag','text': 'CSS-I'},
			{'class': 'akd-tag-js','id': 'jsText','title': 'External Javascript Tag','text': '&nbsp;JS'},
			{'class': 'akd-tag-js-inline','id': 'jsInlineText','title': 'Inline Javascript Tag','text': 'JS-I'},
			{'class': 'akd-tag-php','id': 'phpText','title': 'PHP Tag','text': 'PHP'},
			{'class': 'akd-tag-html','id': 'htmlText','title': 'HTML Template','text': 'HTM'},
			
			{'class': 'akd-tag-ly1','id': 'ly1Text','title': 'Layout 1 HTML Template','text': 'LY1'},
			{'class': 'akd-tag-ly2','id': 'ly2Text','title': 'Layout 2 HTML Template','text': 'LY2'},
			{'class': 'akd-tag-spa','id': 'spaText','title': 'Single Page application HTML Template','text': 'SPA'},
			
			{'class': 'akd-template-controller','id': 'controllerInputText','title': 'Insert Codeigniter PHP Controller Template','text': '&nbsp;'},
			{'class': 'akd-template-method','id': 'methodInputText','title': 'Insert Codeigniter PHP Method Template','text': '&nbsp;'},
			{'class': 'akd-template-model','id': 'modelInputText','title': 'Insert Codeigniter PHP Model Template','text': '&nbsp;'},
			{'class': 'akd-template-class','id': 'classInputText','title': 'Insert Codeigniter PHP Class Template','text': '&nbsp;'},
			//{'class': 'akd-template-','id': 'InputText','title': 'Insert  Template','text': '&nbsp;'},
		], 
		$form_inputs = [
			{'class': 'akd-input-text','id': 'textInputText','title': 'Insert Text Input Tag','text': '&nbsp;Text'},
			{'class': 'akd-input-password','id': 'passwordInputText','title': 'Insert Password Input Tag','text': '&nbsp;Password'},
			{'class': 'akd-input-file','id': 'fileInputText','title': 'Insert File Input Tag','text': '&nbsp;File'},
			{'class': 'akd-input-reset','id': 'resetInputText','title': 'Insert Reset Input Tag','text': '&nbsp;Reset'},
			{'class': 'akd-input-radio','id': 'radioInputText','title': 'Insert Radio Input Tag','text': '&nbsp;Radio'},
			{'class': 'akd-input-checkbox','id': 'checkboxInputText','title': 'Insert Checkbox Input Tag','text': '&nbsp;Checkbox'},
			{'class': 'akd-input-MFS','id': 'MFSInputText','title': 'Insert Max File Size Input Tag','text': '&nbsp;MFS'},
			{'class': 'akd-input-hidden','id': 'hiddenInputText','title': 'Insert Hidden Input Tag','text': '&nbsp;Hidden'},
			{'class': 'akd-input-submit','id': 'submitInputText','title': 'Insert Submit Input Tag','text': '&nbsp;Submit'},
			{'class': 'akd-input-button','id': 'buttonInputText','title': 'Insert Button Input Tag','text': '&nbsp;Button'},
			{'class': 'akd-input-range','id': 'rangeInputText','title': 'Insert Range Input Tag','text': '&nbsp;Range'},
			{'class': 'akd-input-number','id': 'numberInputText','title': 'Insert Number Input Tag','text': '&nbsp;Number'},
			{'class': 'akd-input-color','id': 'colorInputText','title': 'Insert Color Input Tag','text': '&nbsp;Color'},
		], 
		$attributes = [
			{'class': 'akd-id','id': 'idText','title': 'Insert ID attribute','text': 'ID'},
			{'class': 'akd-class','id': 'classText','title': 'Insert CLASS attribute','text': 'CLASS'},
			{'class': 'akd-src','id': 'srcText','title': 'Insert SRC attribute','text': 'SRC'},
			{'class': 'akd-href','id': 'hrefText','title': 'Insert HREF attribute','text': 'HREF'},
			{'class': 'akd-data','id': 'dataText','title': 'Insert DATASET attribute','text': 'DATASET'},
			{'class': 'akd-value','id': 'valueText','title': 'Insert VALUE attribute','text': 'VALUE'},
			{'class': 'akd-name','id': 'nameText','title': 'Insert NAME attribute','text': 'NAME'},
			{'class': 'akd-for','id': 'htmlForText','title': 'Insert FOR attribute','text': 'HTML FOR'},
			{'class': 'akd-title','id': 'titleText','title': 'Insert TITLE attribute','text': 'TITLE'},
			{'class': 'akd-type','id': 'typeText','title': 'Insert TYPE attribute','text': 'TYPE'},
			{'class': 'akd-min','id': 'minText','title': 'Insert MIN attribute','text': 'MIN'},
			{'class': 'akd-max','id': 'maxText','title': 'Insert MAX attribute','text': 'MAX'},
			{'class': 'akd-step','id': 'stepText','title': 'Insert STEP attribute','text': 'STEP'},
			{'class': 'akd-readonly','id': 'readonlyText','title': 'Insert READONLY attribute','text': 'READONLY'},
			{'class': 'akd-selected','id': 'selectedText','title': 'Insert SELECTED attribute','text': 'SELECTED'},
			{'class': 'akd-checked','id': 'checkedText','title': 'Insert CHECKED attribute','text': 'CHECKED'},
			{'class': 'akd-multiple','id': 'multipleText','title': 'Insert MULTIPLE attribute','text': 'MULTIPLE'},
			{'class': 'akd-accept','id': 'acceptText','title': 'Insert ACCEPT attribute','text': 'ACCEPT'},
			{'class': 'akd-controls','id': 'controlsText','title': 'Insert CONTROLS attribute','text': 'CONTROLS'},
			//{'class': 'akd-aria','id': 'ariaText','title': 'Insert ARIA attribute','text': 'ARIA'},
			//{'class': 'akd-aria-labelBy','id': 'ariaLabelByText','title': 'Insert ARIA LABEL-BY attribute','text': 'ARIA LABEL-BY'},
			//{'class': 'akd-','id': 'Text','title': 'Insert  attribute','text': ''},
		], 
		$statements = [
			{'class': 'akd-function','id': 'functionInputText','title': 'Insert Function Statement Template','text': 'function'},
			{'class': 'akd-function-arrow','id': 'functionArrowInputText','title': 'Insert Function (arrow) Statement Template','text': 'function (arrow)'},
			{'class': 'akd-forEach','id': 'forEachInputText','title': 'Insert ForEach Loop Template','text': 'ForEach Loop'},
			{'class': 'akd-forEach-arrow','id': 'forEachArrowInputText','title': 'Insert ForEach (arrow) Loop Template','text': 'ForEach Loop (arrow)'},
			{'class': 'akd-map','id': 'mapInputText','title': 'Insert Map Loop Template','text': 'Map Loop'},
			{'class': 'akd-map-arrow','id': 'mapArrowInputText','title': 'Insert Map (arrow) Loop Template','text': 'Map Loop (arrow)'},
			{'class': 'akd-for','id': 'forInputText','title': 'Insert For Loop Template','text': 'For Loop'},
			{'class': 'akd-if','id': 'ifInputText','title': 'Insert If Statement Template','text': 'IF Statement'},
			{'class': 'akd-else-if','id': 'elseIfInputText','title': 'Insert Else-If Statement Template','text': 'ELSE-IF Statement'},
			{'class': 'akd-else-','id': 'elseInputText','title': 'Insert Else Statement Template','text': 'ELSE Statement'},
		], 
		$btn_item =`<div class="popup-editor-buttons p--4">
			<div class="akd__panel panel--purple panel--solid mb--4">
				<div class="akd__panel-body flex flex--center flex--between flex--wrap gap--2">
					${$buttons.map(($btn) => {
						return $btn_type === 'button' ? `<button id="${$btn['id']}" class="${$btn['class']} bdr--2" title="${$btn['title']}" style="background-size: ${$bg_sizeW} ${$bg_sizeH};width: ${$sizeW};height: ${$sizeH};">&nbsp;${$btn['text']}</button>` : `<a href="#" class="${$btn['class']} bdr--2" id="${$btn['id']}" title="${$btn['title']}" style="background-size: ${$bg_sizeW} ${$bg_sizeH};width: ${$sizeW};height: ${$sizeH};">&nbsp;${$btn['text']}</a>`;
					}).join('')}
					<select class="p--3 text--white">
						<option value="-1">Select Input</option>
						${$form_inputs.map($fbtn => `<option id="${$fbtn['id']}" class="${$fbtn['class']}" value="${$fbtn['id']}" title="${$fbtn['title']}">&nbsp;${$fbtn['text']}</option>`).join('')}
					</select>
				</div>
			</div>
			<div class="akd__panel panel--info mb--4">
				<div class="akd__panel-body flex flex--center flex--between flex--wrap gap--2">
					${$template_buttons.map($btn => {
						return $btn_type === 'button' ? `<button id="${$btn['id']}" class="${$btn['class']} bdr--1" title="${$btn['title']}" style="-moz-background-size: ${$bg_sizeW} ${$bg_sizeH};-moz-width: ${$sizeW};-moz-height: ${$sizeH};">&nbsp;${$btn['text']}</button>` : `<a id="${$btn['id']}" class="${$btn['class']} bdr--2" href="#" title="${$btn['title']}" style="background-size: ${$bg_sizeW} ${$bg_sizeH};width: ${$sizeW};height: ${$sizeH};">&nbsp;${$btn['text']}</a>`;
					}).join('')}
				</div>
			</div>
			<div class="akd__panel panel--warning mb--4 flex flex-place-center flex--wrap gap--2">
				<select class="p--3 text--white">
					<option value="">Select Statement</option>
					${$statements.map($fbtn => `<option id="${$fbtn['id']}" class="${$fbtn['class']}" value="${$fbtn['id']}" title="${$fbtn['title']}">&nbsp;${$fbtn['text']}</option>`).join('')}
				</select>
				<select class="p--3 text--white">
					<option value="">Select Attribute</option>
					${$attributes.map($fbtn => `<option id="${$fbtn['id']}" class="${$fbtn['class']}" value="${$fbtn['id']}" title="${$fbtn['title']}">&nbsp;${$fbtn['text']}</option>`).join('')}
				</select>
			</div>
		</div>`;
		
		const $TE = new TextSelection($editorID);
		const showSelectionClick = function (evt) {
			evt.preventDefault();
			var ts = new TextSelection(editorID);
			var selectedText = ts.getSelectedText();    
			var startIndex = ts.getStartIndex();
			var endIndex = ts.getEndIndex();

			alert("Selected text: " + selectedText + "\n" + "Start index: " + startIndex + "\n" + "End index: " + endIndex + "\n");
		} 
		//------------------------------------------------------------------------
		const html_templateClick = function($TE){
			$TE.addText(`
<!-- Template Generated ${date_time} -->
<!DOCTYPE html>
	<html lang="en" >
		<head>
			<meta http-equiv="content-type" content="text/html; charset=UTF-8">
			<meta charset="utf-8" />
			<title>[TITLE]</title>
			<meta name="description" content="">
			<meta name="keywords" content="">
			<meta name="viewport" content="width=device-width">
			<meta name="generator" content="PB">
		</head>
	<body>`, `
	</body>
</html>`);
			//previewUpdate();
		}, 
		spa_templateClick = function($TE){
			$TE.addText(`
<!-- Template Generated ${date_time} -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8" />
		<title>[TITLE]</title>
		<meta name="description" content="">
		<meta name="keywords" content="">
		<meta name="viewport" content="width=device-width">
		<meta name="generator" content="AKD-editor-generator">
		<link rel="stylesheet" href="./css/akd-util.min.css" />
		<link rel="stylesheet" href="./css/main.css" />
	</head>
	<body>`, `
		<main id="" class="w--12 vh--12 m--0 p--0" data-layout="grid">
			<header id="" class=""></header>
			<div class="views-" data-layout="grid" data-layout-cols="1:3">
				<aside id="" class="bg--dark">
					<nav id="" class="">
						<ul id="" class="">
							<li><a href="#view-home">Home</a></li>
							<li><a href="#view-about">About</a></li>
							<li><a href="#view-contact">Contact</a></li>
						</ul>
					</nav>
				</<aside>
				<article id="views-container" class="views-container bg--light">
					<section id="view-home" class="view view-home active">
						<span class="view-title">home</span>
						<div class="view-body"></div>
					</section>
					<section id="view-about" class="view view-about">
						<span class="view-title">about</span>
						<div class="view-body"></div>
					</section>
					<section id="view-contact" class="view view-contact">
						<span class="view-title">contact</span>
						<div class="view-body">
							<form id="" class="" action="" method="">
								<input class="w--12 p--4" type="" />
								<textarea class="w--12 h--6 p--4 bdr--4 no-resize"></textarea>
								<span class="flex flex--center w--12 p--4">
									<button id="" class="w--6 m--auto px--8 py--4" type="button">send message</button>
								</span>
							</form>
						</div>
					</section>
				</article>
			</div>
			<footer id="" class=""></footer>
		</main>
		<script type="" src="./js/akd-util.min.js"></script>
		<script type="" src="./js/main.js"></script>
	</body>
</html>`);
			//previewUpdate();
		}, 
		ly1_templateClick = function($TE){
			$TE.addText(`
<!-- Template Generated ${date_time} -->`, `		
<main id="" class="w--12 vh--12 m--0 p--0" data-layout="grid">
	<header id="" class=""></header>
	<div class="views-" data-layout="grid" data-layout-cols="1:3:1">
		<aside id="" class="bg--dark">
			<nav id="" class="">
				<ul id="" class="">
					<li><a href="#view-home">Home</a></li>
					<li><a href="#view-about">About</a></li>
					<li><a href="#view-contact">Contact</a></li>
				</ul>
			</nav>
		</<aside>
		<article id="views-container" class="views-container bg--light">
			<section id="view-home" class="view view-home active">
				<span class="view-title">home</span>
				<div class="view-body"></div>
			</section>
			<section id="view-about" class="view view-about">
				<span class="view-title">about</span>
				<div class="view-body"></div>
			</section>
			<section id="view-contact" class="view view-contact">
				<span class="view-title">contact</span>
				<div class="view-body">
					<form id="" class="" action="" method="">
						<input class="w--12 p--4" type="" />
						<textarea class="w--12 h--6 p--4 bdr--4 no-resize"></textarea>
						<span class="flex flex--center w--12 p--4">
							<button id="" class="w--6 m--auto px--8 py--4" type="button">send message</button>
						</span>
					</form>
				</div>
			</section>
		</article>
		<aside id="" class="bg--dark">
			<nav id="" class="">
				<ul id="" class="">
					<li><a href="#view-home">Home</a></li>
					<li><a href="#view-about">About</a></li>
					<li><a href="#view-contact">Contact</a></li>
				</ul>
			</nav>
		</<aside>
	</div>
	<footer id="" class=""></footer>
</main>`);
			//previewUpdate();
		}, 
		controller_templateClick = function($TE){
			$TE.addText(
				"<?php defined('PBD') or exit('Hacking Attempt detected .... Go Fuck Yourself, ACCESS DENIED!');\n" + 
				"class [CONTROLLER_NAME] extends MY_Controller {\n" + 
				"\tpublic function __construct() {\n" + 
				"\t\tparent::__construct();\n" + 
				"\t}\n" + 
				"\tpublic function index(){ \n" + 
				"\t\t$data = array(\n" + 
				"\t\t\t\'page_title\' => \'[PAGE_TITLE]\',\n" + 
				"\t\t\t\'header_title\' => \'[HEADER_TITLE]\',\n" + 
				"\t\t);\n" + 
				"\t\t$config = array(\n" + 
				"\t\t\t\'only_content\'=>true,\n" + 
				"\t\t);\n" + 
				"\t\t$this->theme_view(\'[VIEW_FILE_NAME]\',$data,$config);\n" + 
				"\t}\n",
				"\n}\n" + 
				"/* Controller Generated "+date_time+" */\n" + 
				"?>\n"
			);
			//previewUpdate();
		}, 
		model_templateClick = function($TE){
			$TE.addText(
				"<?php defined('PBD') or exit('Hacking Attempt detected .... Go Fuck Yourself, ACCESS DENIED!');\n" + 
				"class [MODEL_NAME] extends PBD_Model {\n" + 
				"\tpublic function __construct() {\n" + 
				"\t\tparent::__construct();\n" + 
				"\t}\n",
				"\t\t\n"+
				"\n}\n" + 
				"/* Controller Generated "+date_time+" */\n" + 
				"?>\n"
			);
			//previewUpdate();
		}, 
		class_templateClick = function($TE){
			$TE.addText(
				"<?php defined('PBD') or exit('Hacking Attempt detected .... Go Fuck Yourself, ACCESS DENIED!');\n" +
				"class [CLASS_NAME] {\n"+ 
					"\tpublic function __construct() {\n" +
						"\t\t\n"+
					"\t}\n",
				"\n}\n"+
				"?>\n"
			);
			//previewUpdate();
		}, 
		method_templateClick = function($TE){
			$TE.addText(
				"\tpublic function [METHOD_NAME]() {\n" +
					"\t\t\n",
				"\n\t}\n"
			);
			//previewUpdate();
		};
		const _exec = (el, val) => {
			if(!isElement(el)) return;
			//let isInput = ("value" in el), isButton = el.tagName.toLowerCase() === "a" || el.tagName.toLowerCase() === "button";
			//console.log(el, el.id, isInput);
			if(val === "textInputText") $TE.addText('<input type="text" name="" value="" />', '');
			else if(val === "passwordInputText") $TE.addText('<input type="password" name="" value="" />', '');
			else if(val === "resetInputText") $TE.addText('<input type="reset" name="" value="" />', '');
			else if(val === "radioInputText") $TE.addText('<input type="radio" name="" value="" />', '');
			else if(val === "checkboxInputText") $TE.addText('<input type="checkbox" name="" value="" >', '');
			else if(val === "buttonInputText") $TE.addText('<input type="button" name="" value="" />', '');
			else if(val === "fileInputText") $TE.addText('<input type="file" name="" value="" />', '');
			else if(val === "submitInputText") $TE.addText('<input type="submit" name="" value="" />', '');
			else if(val === "hiddenInputText") $TE.addText('<input type="hidden" name="" value="" />', '');
			else if(val === "rangeInputText") $TE.addText('<input type="range" name="" min="" max="" step="" value="" />', '');
			else if(val === "numberInputText") $TE.addText('<input type="number" name="" min="" max="" step="" value="" />', '');
			else if(val === "colorInputText") $TE.addText('<input type="color" name="" value="" />', '');
			else if(val === "MFSInputText") $TE.addText('<input type="hidden" name="MAX_FILE_SIZE" value="">', '');
			
			else if(val === "functionInputText") $TE.addText("function <FUNCTION_NAME>(){\n\t", "\n}");
			else if(val === "functionArrowInputText") $TE.addText("const [FUNCTION_NAME] = () => {\n\t", "\n}");
			else if(val === "forInputText") $TE.addText("for(){\n\t\n", "}");
			else if(val === "forEachInputText") $TE.addText("<ARRAY_NAME>.forEach(function(<ARRAY_ITEM>){\n\t", "\n});");
			else if(val === "forEachArrowInputText") $TE.addText("<ARRAY_NAME>.forEach((<ARRAY_ITEM>) => {\n\t", "\n});");
			else if(val === "mapInputText") $TE.addText("<ARRAY_NAME>.map(function(<ARRAY_ITEM>){\n\t", "\n});");
			else if(val === "mapArrowInputText") $TE.addText("<ARRAY_NAME>.map((<ARRAY_ITEM>) => {\n\t", "\n});");
			
			else if(val === "ifInputText") $TE.addText("if(){\n\t", "\n}");
			else if(val === "elseIfInputText") $TE.addText("if(){\n\t\n}", " else if(){\n\t\n}");
			else if(val === "elseInputText") $TE.addText("else{\n\t", "\n}");
			
			else if(val === "idText") $TE.addText(' id="', '" ');
			else if(val === "classText") $TE.addText(' class="','" ');
			else if(val === "srcText") $TE.addText(' src="', '" ');
			else if(val === "hrefText") $TE.addText(' href="', '" ');
			else if(val === "dataText") $TE.addText(' data-', '="" ');
			else if(val === "valueText") $TE.addText(' value="', '" ');
			else if(val === "nameText") $TE.addText(' name="', '" ');
			else if(val === "htmlForText") $TE.addText(' for="', '" ');
			else if(val === "titleText") $TE.addText(' title="', '" ');
			else if(val === "typeText") $TE.addText(' type="', '" ');
			else if(val === "minText") $TE.addText(' min="', '" ');
			else if(val === "maxText") $TE.addText(' max="', '" ');
			else if(val === "stepText") $TE.addText(' step="', '" ');
			else if(val === "readonlyText") $TE.addText(' readonly', '');
			else if(val === "selectedText") $TE.addText(' selected', '');
			else if(val === "checkedText") $TE.addText(' checked', '');
			else if(val === "multipleText") $TE.addText(' multiple', '');
			else if(val === "acceptText") $TE.addText(' accept="', '" ');
			else if(val === "controlsText") $TE.addText(' controls', '');
			
			else if(val === "h1Text") $TE.addText("<h1>", "</h1>");
			else if(val === "h2Text") $TE.addText("<h2>", "</h2>");
			else if(val === "h3Text") $TE.addText("<h3>", "</h3>");
			
			else if(val === "tableText") $TE.addText("<table>", "</table>");
			else if(val === "trText") $TE.addText("<tr><td>", "</td></tr>");
			else if(val === "tdText") $TE.addText("<td>", "</td>");
			
			else if(val === "ulText") $TE.addText("<ul><li>", "</li></ul>");
			else if(val === "olText") $TE.addText("<ol><li>", "</li></ol>");
			else if(val === "liText") $TE.addText("<li>", "</li>");
			
			else if(val === "strongText") $TE.addText("<strong>", "</strong>");
			else if(val === "boldText") $TE.addText("<b>", "</b>");
			else if(val === "italicText") $TE.addText("<i>", "</i>");
			else if(val === "underlineText") $TE.addText("<u>", "</u>");
			
			else if(val === "pText") $TE.addText("<p>", "</p>");
			else if(val === "divText") $TE.addText("<div>", "</div>");
			else if(val === "mainText") $TE.addText("<main>", "</main>");
			else if(val === "articleText") $TE.addText("<article>", "</article>");
			else if(val === "sectionText") $TE.addText("<section>", "</section>");
			else if(val === "asideText") $TE.addText("<aside>", "</aside>");
			else if(val === "headerText") $TE.addText("<header>", "</header>");
			else if(val === "footerText") $TE.addText("<footer>", "</footer>");
			else if(val === "aText") $TE.addText('<a href="http://">', '</a>');
			else if(val === "linkText") $TE.addText('<link rel="', '" href="" />');
			else if(val === "imageText") $TE.addText('<img src="" alt="" width="" height="" />', '');
			else if(val === "hrText") $TE.addText('<hr>', '');
			else if(val === "brText") $TE.addText('<br/>', '');
			else if(val === "codeText") $TE.addText("<code>", "</code>");
			else if(val === "preText") $TE.addText("<pre>", "</pre>");
			else if(val === "formText") $TE.addText('<form action="" name="" method="POST" enctype="multipart/form-data">', '</form>');
			else if(val === "metaText") $TE.addText('<meta name="', '" content="" />');
			
			else if(val === "audioText") $TE.addText("<audio>", "</audio>");
			else if(val === "videoText") $TE.addText("<video>", "</video>");
			
			else if(val === "phpText") $TE.addText("<?php ", " ?>");
			else if(val === "jsText") $TE.addText('<script type="text/javascript" language="javascript" charset="UTF-8" src="', '"></script>');
			else if(val === "jsInlineText") $TE.addText('<script type="text/javascript" language="javascript" charset="UTF-8"> ', ' </script>');
			else if(val === "cssText") $TE.addText('<link type="text/css" rel="stylesheet"  href="', '" media="all" />');
			else if(val === "cssInlineText") $TE.addText('<style type="text/css" media="all">', "</style>");
			
			else if(val === "classInputText") class_templateClick($TE);
			else if(val === "methodInputText") method_templateClick($TE);
			else if(val === "controllerInputText") controller_templateClick($TE);
			else if(val === "modelInputText") model_templateClick($TE);
			else if(val === "htmlText") html_templateClick($TE);
			else if(val === "spaText") spa_templateClick($TE);
			else if(val === "ly1Text") ly1_templateClick($TE);
			
			return $this;
		}
		//------------------------------------------------------------------------
		const _initEvents = () => {
			document.addEventListener("change", function(e){e.preventDefault();let $el = isElement(this) ? this : e.target, isInput = ("value" in $el), $value = isInput === true ? $el.value : $el.id??$el.textContent;if(isInput) _exec($el, $value);});
			document.addEventListener("click", function(e){e.preventDefault();let $el = isElement(this) ? this : e.target, isButton = $el.tagName.toLowerCase() === "a" || $el.tagName.toLowerCase() === "button", $value = isButton === true ? $el.id : $el.textContent;if(isButton) _exec($el, $value);});
			return $this;
		}
		//------------------------------------------------------------------------
		const _tmpl = (el) => {
			//if(!el) $one($target).insertAdjacentHTML('beforeend', $btn_item);
			$one(el)?.insertAdjacentHTML('beforeend', $btn_item)??$one($target)?.insertAdjacentHTML('beforeend', $btn_item);
			return $this;
		}
		//------------------------------------------------------------------------
		const init = (el) => {
			_tmpl(el);
			_initEvents();
			return $this;
		}
		//------------------------------------------------------------------------
		return {init, exec: _exec, tmpl: _tmpl};
	}
	//------------------------------------------------------------------------------------------
	const layoutElements = function (container,ele, direction){
		ele = ele || this.results;
		elem = ele && isObject(ele) ? ele : $all(ele);
		direction = direction || 2;
		container = container || 'window';
		
		if(container == 'window'){
			viewPort = this.getViewport();
			container_width = viewPort[0];
			container_height = viewPort[1];
		} else {
			container = $one(container);
			/* alert(container.css('height'));
			container_width = this.appStyle.getStyleProp(container[0],'width');
			container_height = this.appStyle.getStyleProp(container[0],'height');*/
			container_width = elementStyle(container).width;
			container_width = container_width.replace('px','');
			container_height = elementStyle(container).height;
			container_height = container_height.replace('px','');
		}
		var length = elem.length;
		if(direction === 1 || direction === 'horizontal'){
			styleElement(elem,{'position':'relative','display':'list-item','height':(container_height/length)-(5*length)+'px','overflow':'auto'/* ,'margin-bottom':((i+1) !==length ? '5px' : '0') */});
		} else if(direction === 2 || direction === 'vertical') {
			styleElement(elem,{'position':'relative','display':'inline-block','clear':'none','float':'none','width':parseInt(container_width/length)-(5*length)+'px','height':(container_height-10)+'px','overflow':'auto'/* ,'margin-right':((i+1) !==length ? '5px' : '0') */});
		}
		for(var i=0;i<length;i++){
			//this.style.removeClass(elem[i],'clearfix');
			if(direction === 1 || direction === 'horizontal'){
				((i+1)!==length) ? elem[i].style.marginBottom = '5px' : elem[i].style.marginBottom = '0';
			} else if(direction === 2 || direction === 'vertical') {
				((i+1)!==length) ? elem[i].style.marginRight = '5px' : elem[i].style.marginRight = '0';
			}
		}
		return this;
	}
	const dragElements = ({parent, container, handle, direction}) => {
		//layoutElements(ele, container, direction);
		parent = $one(parent), handle = $all(handle), container = $all(container);
		//if(isElement(handle) && isElement(container[0])){
		if(isArray(container)){
			container = dedupe(container);
			var handle_dim = 0, firstElem, secondElem, md, //parent = handle.parentElement, 
			hlength = handle.length, 
			clength = container.length, 
			ratio = parent?.dataset?.ratio?? 100/ clength;
			//console.log(container)
			container.forEach((cont, i) => {
				handle_dim = handle[i] ? `${(handle[i].offsetWidth/hlength)}px` : `${(handle[hlength - 1].offsetWidth/hlength)}px`;
				container_width = elementStyle(cont).width;
				console.log(container_width);
				container_width = container_width.replace('px','');
				container_height = elementStyle(cont).height;
				container_height = container_height.replace('px','');
				if(direction === 1 || direction === 'horizontal' || direction === 'H'){
					//styleElement(cont,{'position':'relative','display':'inline-block','clear':'none','float':'none','width':parseInt(container_width/length)-(5*length)+'px','height':(container_height-10)+'px','overflow':'auto'/* ,'margin-right':((i+1) !==length ? '5px' : '0') */});
					Object.assign(cont.style,{'width': `calc(${ratio}% - ${handle_dim})`/* ,'height':(container_height-10)+'px','overflow':'auto','margin-right':((i+1) !==length ? '5px' : '0') */});
				} else if(direction === 2 || direction === 'vertical' || direction === 'V') {
					//styleElement(cont,{'position':'relative','display':'list-item','height':(container_height/length)-(5*length)+'px','overflow':'auto'/* ,'margin-bottom':((i+1) !==length ? '5px' : '0') */});
					Object.assign(cont.style,{'height': `calc(${ratio}% - ${handle_dim})`/* ,'overflow':'auto','margin-bottom':((i+1) !==length ? '5px' : '0') */});
				}
				if(handle[i]) {
					handle[i].addEventListener('mousedown', e => onMouseDown(e, handle[i]));
					handle[i].addEventListener('mouseup', () => {console.log(container_width);document.onmousemove = document.onmouseup = null;});
				}
			});
			/* //alert(handle.nextElementSibling.id)
			const firstElem = first || handle.previousElementSibling;
			const secondElem = second || handle.nextElementSibling;
			// ----------------------------------------------------
			if(ratio){
				r = ratio.split(":");
				if (direction === "H" ){
					handle_dim = `${(handle.offsetWidth/2)}px`;
					handle.style.left = `calc(${r[0]}% - ${handle_dim})`;
					firstElem.style.width = `calc(${r[0]}% - ${handle_dim})`;
					secondElem.style.width = `calc(${r[1]}% - ${handle_dim})`;
					//firstElem.style.height = secondElem.style.height = `${parent.offsetHeight}px`;
					parent.setAttribute("data-handle-left", `calc(${r[0]}% - ${handle_dim})`);
					parent.setAttribute("data-first-panel-width", `calc(${r[0]}% - ${handle_dim})`);
					parent.setAttribute("data-second-panel-width", `calc(${r[1]}% - ${handle_dim})`);
				} else if (direction === "V" ){
					handle_dim = `${(handle.offsetHeight/2)}px`;
					handle.style.top = `calc(${r[0]}% - ${handle_dim})`;
					firstElem.style.height = `calc(${r[0]}% - ${handle_dim})`;
					secondElem.style.height = `calc(${r[1]}% - ${handle_dim})`;
					//firstElem.style.width = secondElem.style.width = `${parent.offsetWidth}px`;
					parent.setAttribute("data-handle-top", `calc(${r[0]}% - ${handle_dim})`);
					parent.setAttribute("data-first-panel-height", `calc(${r[0]}% - ${handle_dim})`);
					parent.setAttribute("data-second-panel-height", `calc(${r[1]}% - ${handle_dim})`);
				}
			}
			
			handle.onmousedown = onMouseDown; */
			function onMouseDown(e, handle){
				firstElem = handle.previousElementSibling;
				secondElem = handle.nextElementSibling;
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
				/* window.onresize = onMouseMove;
				document.onmousemove = onMouseMove;
				document.onmouseup = () => {document.onmousemove = document.onmouseup = null;} */
				window.addEventListener('resize', ev => onMouseMove(ev, handle));
				document.addEventListener('mousemove', ev => onMouseMove(ev, handle, firstElem, secondElem));
				document.addEventListener('mouseup', function(ev){
					document.removeEventListener('mousemove', onMouseMove(ev, handle, firstElem, secondElem))
					document.onmouseup = null;
				});
			}
			function onMouseMove(e, handle, firstElem, secondElem){
				var delta = {x: e.clientX - md.e.clientX, y: e.clientY - md.e.clientY};
				if (direction === "H" ){ // Horizontal
					// Prevent negative-sized elements
					delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth);
					// handle.style.left = md.offsetLeft + delta.x + "px";
					// firstElem.style.width = (md.firstWidth + delta.x) + "px";
					// secondElem.style.width = (md.secondWidth - delta.x) + "px";
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
					
					parent.setAttribute("data-splitter-orientation", "horizontal");
					parent.setAttribute("data-handle-left", `${percentage}%`);
					parent.setAttribute("data-first-panel-width", `${percentage}%`);
					parent.setAttribute("data-second-panel-width", `${mainPercentage}%`);
				}
				if (direction === "V" ){ // Vertical
					// Prevent negative-sized elements
					delta.y = Math.min(Math.max(delta.y, -md.firstHeight), md.secondHeight);
					var percentage = (((md.firstHeight + delta.y) / parent.offsetHeight) * 100), 
					mainPercentage = (100 - percentage);
					
					if(elementStyle(parent).display === "grid"){
						firstElem.style.height = secondElem.style.height = "100%";
						parent.style.gridTemplateRows = `calc(${percentage}% - 5px) auto calc(${mainPercentage}% - 5px)`;
					} else {
						//handle.style.top = md.offsetTop + delta.y + "px";
						//firstElem.style.height = (md.firstHeight + delta.y) + "px";
						//secondElem.style.height = (md.secondHeight - delta.y) + "px";
						
						handle.style.top = percentage+"%";
						firstElem.style.height = percentage+"%";
						secondElem.style.height = mainPercentage+"%";
					}
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
				if (direction === "H" ){ // Horizontal
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
				} else if(direction === "V" ){ // Vertical
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
		}
	}
	/**
	 *
	 * Javascript trim, ltrim, rtrim
	 * http://www.webtoolkit.info/
	 *
	**/
	 
	function trim(str, chars) {
		return ltrim(rtrim(str, chars), chars);
	}
	 
	function ltrim(str, chars) {
		chars = chars || "\s";
		return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
	}
	 
	function rtrim(str, chars) {
		chars = chars || "\s";
		return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
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
			//newKey[key + " "] = value;
			newKey[key + ci] = value;
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
	function trueTypeOf(obj){return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();}
	function shuffle2(arr){
		let currentIndex = arr.length;
		let temporaryValue, randomIndex;
		while(0 !== currentIndex){
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = arr[currentIndex];
			arr[currentIndex] = arr[randomIndex];
			arr[randomIndex] = temporaryValue;
		}
		
		return arr;
	}
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
		if(!__akd._cache.splitter[$i]) __akd._cache.splitter[$i] = {originalDimensions: {}, toggled: false}
		if(reversed === true){
			__akd._cache.splitter[$i].originalDimensions.other = {width:w1??elementStyle(target).width,height:h1??elementStyle(target).height}
			__akd._cache.splitter[$i].originalDimensions.target = {width:w2??elementStyle(other).width,height:h2??elementStyle(other).height}
		} else {
			__akd._cache.splitter[$i].originalDimensions.target = {width:w1??elementStyle(target).width,height:h1??elementStyle(target).height}
			__akd._cache.splitter[$i].originalDimensions.other = {width:w2??elementStyle(other).width,height:h2??elementStyle(other).height}
		}
		__akd._cache.splitter[$i].originalDimensions.handle = {top: top??elementStyle(handle).top,left:left??elementStyle(handle).left}
		//$clog(`w1=${w1} - h1=${h1} - top=${top}`,`w2=${w2} - h2=${h2} - left=${left}`);
		
		//console.log($i, __akd._cache.splitter[$i]);
		if(__akd._cache.splitter[$i].toggled === false){
			if(orientation === 'vertical'){
				target.style.height = '100%';
				other.style.height = '0%';
				handle.style.top = ((reversed === true) ? '100%' : '0%');
			} else {
				Object.assign(target.style, {'width':'100%', 'flex':'1 1 100%'});
				Object.assign(other.style, {'width': '0%', 'flex':'1 1 0%'});
				handle.style.left = ((reversed === true) ? '100%' : '0%');
			}
			__akd._cache.splitter[$i].toggled = true;
		} else {
			if(orientation === 'vertical'){
				Object.assign(target.style, {'height': __akd._cache.splitter[$i].originalDimensions.target.height});
				Object.assign(other.style, {'height': __akd._cache.splitter[$i].originalDimensions.other.height});
				handle.style.top = __akd._cache.splitter[$i].originalDimensions.handle.top;
			} else {
				Object.assign(target.style, {'width': __akd._cache.splitter[$i].originalDimensions.target.width, 'flex':`1 1 ${__akd._cache.splitter[$i].originalDimensions.target.width}`});
				Object.assign(other.style, {'width': __akd._cache.splitter[$i].originalDimensions.other.width, 'flex':`1 1 ${__akd._cache.splitter[$i].originalDimensions.other.width}`});
				handle.style.left = __akd._cache.splitter[$i].originalDimensions.handle.left;
			}
			__akd._cache.splitter[$i].toggled = false;
		}
	}
	//------------------------------------------------------------------------------------------
	function AKD_Editor({el, style="codepen"}) {
		this._editors = [];
		this._editorStyles = ["codepen", "vscode"];
		if(window["AKD_Editor_tempates"]) this._editorStyles = [...this._editorStyles, ...Object.keys(window["AKD_Editor_tempates"])];
		this.defaultEditorStyle = "codepen";
		this.editorStyle = inArray(style, this._editorStyles) ? style : this.defaultEditorStyle;
		this.node = $one(el);
		
		let $$this = this, $i = 'akd-' + String(isString(el) ? el : el?.id?.className).replace('#','-').replace('.','-').replace(' ','-'), 
		akd_i = 0, 
		HTML_CODE = storage.get('html_code') || "", 
		CSS_CODE = storage.get('css_code') || "", 
		JS_CODE = storage.get('js_code') || "";
		
		function createNewEditorInstance($i, obj = {}){
			let html_ops_cache = createCache(10, uid()), 
			css_ops_cache = createCache(10, uid()), 
			js_ops_cache = createCache(10, uid());
			$i = $i || 'akd-'+String(Math.random()).replace('.','').replace('-','');
			//const editors = [];
			if(!__akd._cache.editors[$i]) {
				//this._editors[$i] = {};
				$$this._editors[$i] = {
					node: $$this.node, 
					use_codemirror: true, 
					//use_codemirror: (!window.location.href.match(/without-codemirror/)),
					editorWindows: {
						beautify_in_progress: false
					}
				}
				__akd._cache.editors[$i] = {
					html: {
						use_editor: true, 
						using: "codemirror", 
						ops_cache: html_ops_cache,
						enableRedoButton: HTML_CODE.length > 0 ? true : false, 
						enableUndoButton: HTML_CODE.length > 0 ? true : false, 
						inputEditor: obj?.html?.inputEditor || null, 
						outputEditor: obj?.html?.outputEditor || null, 
						originalContent: {filename: null, content: HTML_CODE.length > 0 ? HTML_CODE : null},
						lastSaved: {filename: null, content: HTML_CODE.length > 0 ? HTML_CODE : null},
						lastCleared: {filename: null, content: null}
					}, 
					css: {
						use_editor: true, 
						using: "codemirror", 
						ops_cache: css_ops_cache,
						enableRedoButton: CSS_CODE.length > 0 ? true : false, 
						enableUndoButton: CSS_CODE.length > 0 ? true : false, 
						inputEditor: obj?.css?.inputEditor || null, 
						outputEditor: obj?.css?.outputEditor || null, 
						originalContent: {filename: null, content: CSS_CODE.length > 0 ? CSS_CODE : null},
						lastSaved: {filename: null, content: CSS_CODE.length > 0 ? CSS_CODE : null},
						lastCleared: {filename: null, content: null}
					}, 
					js: {
						use_editor: true, 
						using: "codemirror", 
						ops_cache: js_ops_cache,
						enableRedoButton: JS_CODE.length > 0 ? true : false, 
						enableUndoButton: JS_CODE.length > 0 ? true : false, 
						inputEditor: obj?.js?.inputEditor || null, 
						outputEditor: obj?.js?.outputEditor || null, 
						originalContent: {filename: null, content: JS_CODE.length > 0 ? JS_CODE : null},
						lastSaved: {filename: null, content: JS_CODE.length > 0 ? JS_CODE : null},
						lastCleared: {filename: null, content: null}
					}
				};
				__akd._cache.editors[$i].html.ops_cache.add('html_code', HTML_CODE);
				__akd._cache.editors[$i].css.ops_cache.add('css_code', CSS_CODE);
				__akd._cache.editors[$i].js.ops_cache.add('js_code', JS_CODE);
				
				Object.assign($$this._editors[$i].editorWindows, __akd._cache.editors[$i]);
			} //else createNewEditorInstance($i);
			
			return $$this._editors[$i];
		}
		this.initEvents = ($i) => {
			/* $("#flex-container-nav-toggler").click(function(e){$(".tools-code-playground .flex-container-nav-wrapper").toggleClass("active");});
			$(".codebox-handle").on("click", function(e){var parent = $(this).parent();$(this).toggleClass("active");if(parent){parent.toggleClass("toggled");}});
			$(".last-section-handle").on("click", function(e){var codebox = $('#codebox-main-wrapper');$(this).toggleClass("active");codebox.removeAttr("style").toggleClass("toggled");});
			$(".codebox-wrapper button").on("click", function(e){
				if(e.target.id.startsWith("css-")){
					if(e.target.id === "css-minimize-button"){
						$('#css-codebox-wrapper').removeClass('toggled').removeClass('full');
					} else if(e.target.id === "css-maximize-button"){
						$('#css-codebox-wrapper').addClass('toggled').addClass("full");
						$('#html-codebox-wrapper').removeClass('full').removeClass('toggled');
						$('#js-codebox-wrapper').removeClass('full').removeClass('toggled');
					}
				} else if(e.target.id.startsWith("html-")){
					if(e.target.id === "html-minimize-button"){
						$('#html-codebox-wrapper').removeClass('full').removeClass('toggled');
					} else if(e.target.id === "html-maximize-button"){
						$('#html-codebox-wrapper').addClass('toggled').addClass('full');
						$('#css-codebox-wrapper').removeClass('full').removeClass('toggled');
						$('#js-codebox-wrapper').removeClass('full').removeClass('toggled');
					}
				} else if(e.target.id.startsWith("js-")){
					if(e.target.id === "js-minimize-button"){
						$('#js-codebox-wrapper').removeClass('full').removeClass('toggled');
					} else if(e.target.id === "js-maximize-button"){
						$('#js-codebox-wrapper').addClass('toggled').addClass('full');
						$('#html-codebox-wrapper').removeClass('full').removeClass('toggled');
						$('#css-codebox-wrapper').removeClass('full').removeClass('toggled');
					}
				} 
			});
			$(".codebox-fontsize-input").val( Math.round( ( $(".codebox-textarea").css("font-size") || "10" ).replace("px","") ) );
			$(".codebox-fontsize-input").on("change", function(e){$(".codebox-textarea").css({"font-size": `${this.value}px`});});
			$(".codebox-padding-input").val( Math.round( ( $(".codebox-textarea").css("padding") || "0" ).replace("px","") ) );
			$(".codebox-padding-input").on("change", function(e){$(".codebox-textarea").css({"padding": `${this.value}px`});});
			$("#codebox-input-bg-size-select").on("change", function(e){$(".codebox-textarea").css({"background-size": `${this.value}px`});});
			$("#codebox-input-bg-size").on("change", function(e){$(".codebox-textarea").css({"background-size": `${this.value}px`});});
			$("#codebox-input-bg-positionX").on("change", function(e){$(".codebox-textarea").css({"background-position": `${this.value}px`});});
			$("#codebox-input-bg-positionY").on("change", function(e){$(".codebox-textarea").css({"background-position": `${this.value}px`});});
			$("#codebox-dark-mode-toggler").on("change", function(e){$("#codebox-main-wrapper").toggleClass("dark");});
			
			$(".codebox-textarea").on("input", function(e){
				if(e.target.id === "css-codebox-textarea"){
					var previewStyleElem = $("#playground-styles");
					previewStyleElem.html(this.value);
				}
				if(e.target.id === "html-codebox-textarea"){
					var previewElem = $("#code-preview");
					previewElem.html(this.value);
				}
			});
			$("#js-run-button").click(function(e){
				var previewScriptElem = $("#playground-scripts"), value = $("js-codebox-textarea").val();
				previewScriptElem.html(value);
			});
			 */
			if($$this.editorStyle === "vscode"){
				dragElement(`#akd-editor-main-layout-splitter-handle-${$i}`, `#akd-editor-main-layout-splitter-navbar-${$i}`, `#akd-editor-main-layout-splitter-body-${$i}`, 'H');
				dragElement(`#akd-editor-main-layout-splitter-body-handle-${$i}`, `#akd-editor-main-layout-splitter-body-input-panel-${$i}`, `#akd-editor-main-layout-splitter-body-output-panel-${$i}`, 'V');
				//enable_akd_tabs_event($one(`#akd-editor-main-layout-splitter-body-${$i}`));
			}
			if($$this.editorStyle === "codepen"){
				dragElement(`#akd-editor-main-splitter-handle-${$i}`, `#akd-editor-splitter-${$i}`, `#akd-editor-main-splitter-output-panel-${$i}`, 'V');
				dragElement(`#akd-editor-splitter-html-css-panel-handle-${$i}`, `#akd-editor-splitter-html-panel-${$i}`, `#akd-editor-splitter-css-panel-${$i}`, 'H');
				dragElement(`#akd-editor-splitter-handle-${$i}`, `#akd-editor-splitter-html-css-panel-${$i}`, `#akd-editor-splitter-js-panel-${$i}`, 'H');
				$all(".editor-splitter-panel-toggler").forEach(el => el.addEventListener("click", e => {
					let ele = e.target;
					//console.log(el === ele,el, ele)
					//el.closet(".splitter").classList.toggle("hidden");
					if(el.id === `html-editor-splitter-panel-toggler-${$i}`){
						maximizeSplitterPane({
							parentContainer: `#akd-editor-splitter-html-css-panel-${$i}`, 
							targetPanel: `#akd-editor-splitter-html-panel-${$i}`, 
							otherPanel: `#akd-editor-splitter-css-panel-${$i}`, 
							handle: `#akd-editor-splitter-html-css-panel-handle-${$i}`
						});
					}
					if(el.id === `css-editor-splitter-panel-toggler-${$i}`){
						maximizeSplitterPane({
							parentContainer: `#akd-editor-splitter-html-css-panel-${$i}`, 
							targetPanel: `#akd-editor-splitter-html-panel-${$i}`, 
							otherPanel: `#akd-editor-splitter-css-panel-${$i}`, 
							handle: `#akd-editor-splitter-html-css-panel-handle-${$i}`
						}, true);
					}
					if(el.id === `js-editor-splitter-panel-toggler-${$i}`){
						maximizeSplitterPane({
							parentContainer: `#akd-editor-splitter-${$i}`, 
							targetPanel: `#akd-editor-splitter-js-panel-${$i}`, 
							otherPanel: `#akd-editor-splitter-html-css-panel-${$i}`, 
							handle: `#akd-editor-splitter-handle-${$i}`
						}/* , true */);
					}
				}));
			}
			
			$one(`#akd-editor-run-code-button-${$i}`).addEventListener("click", e => {
				run({html_code: $one(`#akd-editor-input-html-${$i}`).value, css_code: $one(`#akd-editor-input-css-${$i}`).value, js_code: $one(`#akd-editor-input-js-${$i}`).value}, $i);
			});
			$all(".akd-editor-textarea, .akd-editor-input").forEach(el => {
				el.addEventListener("blur", e => e.target.classList.remove("active--editor"));
				el.addEventListener("focus", e => {
					let $this = isElement(this) ? this : e.target, 
					akdEditor = $this.closest(".akd-editor")
					$all(".akd-editor-textarea, .akd-editor-input", akdEditor).forEach(inp => inp.classList.remove("active--editor"));
					$this.classList.add("active--editor");
				});
				el.addEventListener("input", e => {
					let $this = isElement(this) ? this : e.target, 
					parent = $this.closest(".akd-editor-section"), 
					lang = isElement(parent) ? parent.dataset?.language : false, 
					buttons = parent.querySelectorAll(".akd-editor-operation-button");
					__akd._cache.editors[$i][lang].enableUndoButton = __akd._cache.editors[$i][lang].enableRedoButton = ($this.value !== '' || $this.value.length > 0) ? true : false;
					$all(`#akd-editor-undo-button-${lang}-${$i}, #akd-editor-redo-button-${lang}-${$i}`).forEach(btn => {
						//btn[__akd._cache.editors[$i][lang].enableUndoButton === true ? 'removeAttribute' : 'setAttribute']("disabled", true)
						if(__akd._cache.editors[$i][lang].enableUndoButton === true && btn.hasAttribute('disabled')) btn.removeAttribute("disabled");
						else if(__akd._cache.editors[$i][lang].enableUndoButton === false && !btn.hasAttribute('disabled')) btn.setAttribute("disabled", true);
					});
				});
			});
			$all(".akd-editor-operation-button").forEach(el => el.addEventListener("click", e => {
				let $this = isElement(this) ? this : e.target, 
				parent = $this.closest(".akd-editor-section"), 
				lang = isElement(parent) ? parent.dataset?.language : false, 
				operation, 
				cp = 4, opts = {}, preservecomm = true, $value, 
				$target = $one(`#akd-editor-input-${lang}-${$i}`), 
				$hidden_textarea = $one(`#akd-editor-hidden-input-${lang}-${$i}`);
				//text = isElement($hidden_textarea) && $hidden_textarea[('value' in $hidden_textarea) ? "value" : "textContent"];
				if(isElement($target)){
					$value = $target.value;
					//__akd._cache.editors[$i][lang].lastSaved.content = $value;
					//__akd._cache.editors[$i][lang].lastCleared.content = $value;
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
						let text = isString(__akd._cache.editors[$i][lang].originalContent.content) && __akd._cache.editors[$i][lang].originalContent.content.length > 0 ? __akd._cache.editors[$i][lang].originalContent.content : isElement($hidden_textarea) && $hidden_textarea[('value' in $hidden_textarea) ? 'value' : 'textContent'];
						__akd._cache.editors[$i][lang].lastCleared.content = __akd._cache.editors[$i][lang].lastSaved.content || null;
						//__akd__akd._cache.editors[$i][lang].lastSaved.filename = file.name;
						//__akd._cache.editors[$i][lang].lastCleared.filename = null;
						if(isString(text) && text.length > 0){
							$target[('value' in $target) ? 'value' : 'textContent'] = text;
						}
					} else if($this.id === `akd-editor-redo-button-${lang}-${$i}`){
						let text = '', cacheObj = __akd._cache.editors[$i][lang].ops_cache.next();
						for(i in cacheObj) text = cacheObj[i];
						if(isString(text) && text.length > 0){
							$target[('value' in $target) ? 'value' : 'textContent'] = text;
						}
					} else if($this.id === `akd-editor-undo-button-${lang}-${$i}`){
						let text = '', cacheObj = __akd._cache.editors[$i][lang].ops_cache.prev();
						for(i in cacheObj) text = cacheObj[i];
						if(isString(text) && text.length > 0){
							$target[('value' in $target) ? 'value' : 'textContent'] = text;
						}
					}
				} else console.log('{$target} is not an element', lang);
			}));
			/* dragElements({
				handle: '.splitter-handle', 
				parent: '#akd-editor-splitter', 
				container: ['#akd-editor-splitter-html-panel', '#akd-editor-splitter-css-panel', '#akd-editor-splitter-js-panel'], 
				direction: 'H'
			}); */
		}
		
		this.build = ({editorContainer, style=null}) => {
			if(editorContainer && isElement(this.node = $one(editorContainer))) {
				$i = 'akd-' + String(isString(editorContainer) ? editorContainer : editorContainer?.id?.className).replace('#','-').replace('.','-').replace(' ','-');
				//return $this;
			}
			if(style) this.editorStyle = inArray(style, this._editorStyles) ? style : this.defaultEditorStyle;
			let tmpl = '';
			createNewEditorInstance($i, {});
		
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
										<textarea id="akd-editor-input-html-${$i}" class="akd-editor-textarea akd__input-textarea w--12 h--12">${HTML_CODE}</textarea>
										<textarea id="akd-editor-hidden-input-html-${$i}" class="visually-hidden">${HTML_CODE}</textarea>
									</div>
									<span class="w--12 flex flex--center flex--wrap gap--4 p--4 bdr--2 bg--dark">
										<span class="flex flex--center gap--4 mr--auto">
											<button id="akd-editor-undo-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--danger" data-target="#akd-editor-input-html-${$i}" ${__akd._cache.editors[$i].html.enableUndoButton === true ? '':'disabled'}>undo</button>
											<button id="akd-editor-redo-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--warning" data-target="#akd-editor-input-html-${$i}" ${__akd._cache.editors[$i].html.enableRedoButton === true ? '':'disabled'}>redo</button>
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
										<textarea id="akd-editor-input-css-${$i}" class="akd-editor-textarea akd__input-textarea w--12 h--12" placeholder="enter CSS syntax">${CSS_CODE}</textarea>
										<textarea id="akd-editor-hidden-input-css-${$i}" class="visually-hidden">${CSS_CODE}</textarea>
									</div>
									<span class="w--12 flex flex--center flex--wrap gap--4 p--4 bdr--2 bg--dark">
										<span class="flex flex--center gap--4 mr--auto">
											<button id="akd-editor-undo-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--danger" data-target="#akd-editor-input-css-${$i}" ${__akd._cache.editors[$i].css.enableUndoButton === true ? '':'disabled'}>undo</button>
											<button id="akd-editor-redo-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--warning" data-target="#akd-editor-input-css-${$i}" ${__akd._cache.editors[$i].css.enableRedoButton === true ? '':'disabled'}>redo</button>
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
									<textarea id="akd-editor-input-js-${$i}" class="akd-editor-textarea akd__input-textarea w--12 h--12" placeholder="enter JS syntax">${JS_CODE}</textarea>
									<textarea id="akd-editor-hidden-input-js-${$i}" class="visually-hidden">${JS_CODE}</textarea>
								</div>
								<span class="w--12 flex flex--center flex--wrap gap--4 p--4 bdr--2 bg--dark">
									<span class="flex flex--center gap--4 mr--auto">
										<button id="akd-editor-undo-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--danger" data-target="#akd-editor-input-js-${$i}" ${__akd._cache.editors[$i].js.enableUndoButton === true ? '':'disabled'}>undo</button>
										<button id="akd-editor-redo-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--warning" data-target="#akd-editor-input-js-${$i}" ${__akd._cache.editors[$i].js.enableRedoButton === true ? '':'disabled'}>redo</button>
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
				tmpl = `<div id="akd-editor-main-layout-splitter-${$i}" class="akd-editor splitter horizontal flex flex--col h--12" data-ratio="25:75" data-splitter-orientation="horizontal">
					<div id="akd-editor-main-layout-splitter-navbar-${$i}" class="flex flex--col h--12" data-width="25%">
					</div>
					<span id="akd-editor-main-layout-splitter-handle-${$i}" class="splitter_handle"></span>
					
					<div id="akd-editor-main-layout-splitter-body-${$i}" class="${__akd._tabs.main_wrapper_class} splitter vertical flex flex--col h--12" data-ratio="75:25" data-splitter-orientation="vertical">
						
						<div id="akd-editor-main-layout-splitter-body-input-panel-${$i}" class="akd-editor-grid splitter_panel first--half h--12 p--0" data-layout="grid-auto" data-layout-row-auto="auto 1fr auto">
							<div id="" class="akd-editor-header flex gap--4">
								<span class="${__akd._tabs.buttons_wrapper_class} flex gap--4">
									<button id="" class="akd__btn ${__akd._tabs.button_class} ${__akd._tabs.active_class}" type="button" title="" data-target-tab="#akd-editor-splitter-html-panel-${$i}" data-parent-tab="#akd-editor-main-layout-splitter-body-${$i}"><span class="text--truncate">html</span></button>
									<button id="" class="akd__btn ${__akd._tabs.button_class}" type="button" title="" data-target-tab="#akd-editor-splitter-css-panel-${$i}" data-parent-tab="#akd-editor-main-layout-splitter-body-${$i}"><span class="text--truncate">css</span></button>
									<button id="" class="akd__btn ${__akd._tabs.button_class}" type="button" title="" data-target-tab="#akd-editor-splitter-js-panel-${$i}" data-parent-tab="#akd-editor-main-layout-splitter-body-${$i}"><span class="text--truncate">js</span></button>
								</span>
							</div>
							
							<div id="" class="akd-editor-body ${__akd._tabs.panels_wrapper_class}">
								<div id="akd-editor-splitter-html-panel-${$i}" class="${__akd._tabs.panel_class} ${__akd._tabs.active_class} active--editor akd-editor-section overflow--hidden" data-language="html">
									<div class="h--12 gap--4 p--4" data-layout="grid-auto" data-layout-row-auto="auto-1fr-auto">
										<span class="flex gap--4 p--4 bdr--2 bg--light">
											<select id="akd-editor-languages-html-${$i}" class="p--2 bdr--2 bg--info-gradient" onchange="changeLanguage()"><option value="c">C</option><option value="cpp">C++</option><option value="php">PHP</option><option value="python">Python</option><option value="node">Node JS</option></select>
											<button id="html-editor-splitter-panel-toggler-${$i}" class="editor-splitter-panel-toggler akd__btn btn--warning bdr--2 ml--auto">||</button>
										</span>
										<div id="akd-editor-html-wrapper-${$i}" class="bg--info-gradient h--12 bdr--2 p--2" placeholder="enter HTML syntax">
											<textarea id="akd-editor-input-html-${$i}" class="akd-editor-textarea akd__input-textarea w--12 h--12 overflow--auto">${HTML_CODE}</textarea>
											<textarea id="akd-editor-hidden-input-html-${$i}" class="visually-hidden">${HTML_CODE}</textarea>
										</div>
										<span class="w--12 flex flex--center flex--wrap gap--4 p--4 bdr--2 bg--dark">
											<span class="flex flex--center gap--4 mr--auto">
												<button id="akd-editor-undo-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--danger" data-target="#akd-editor-input-html-${$i}" ${__akd._cache.editors[$i].html.enableUndoButton === true ? '':'disabled'}>undo</button>
												<button id="akd-editor-redo-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--warning" data-target="#akd-editor-input-html-${$i}" ${__akd._cache.editors[$i].html.enableRedoButton === true ? '':'disabled'}>redo</button>
											</span>
											<span class="flex flex--center gap--4 ml--auto">
												<button id="akd-editor-minify-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--purple" data-target="#akd-editor-input-html-${$i}">minify</button>
												<button id="akd-editor-format-button-html-${$i}" class="akd-editor-operation-button akd__btn btn--info" data-target="#akd-editor-input-html-${$i}">format</button>
											</span>
										</span>
									</div>
								</div>
								
								<div id="akd-editor-splitter-css-panel-${$i}" class="${__akd._tabs.panel_class} akd-editor-section overflow--hidden" data-language="css">
									<div class="h--12 p--4 gap--2" data-layout="grid-auto" data-layout-row-auto="auto-1fr-auto">
										<span class="flex gap--4 p--4 bdr--2 bg--light">
											<select id="akd-editor-languages-css-${$i}" class="flex flex--col gap--4 p--2 bdr--2 bg--info-gradient" onchange="changeLanguage()"><option value="c">C</option><option value="cpp">C++</option><option value="php">PHP</option><option value="python">Python</option><option value="node">Node JS</option></select>
											<button id="css-editor-splitter-panel-toggler-${$i}" class="editor-splitter-panel-toggler akd__btn btn--warning bdr--2 ml--auto">||</button>
										</span>
										<div id="akd-editor-css-wrapper-${$i}" class="bg--info-gradient bdr--2 p--2 h--12">
											<textarea id="akd-editor-input-css-${$i}" class="akd-editor-textarea akd__input-textarea w--12 h--12 overflow--auto" placeholder="enter CSS syntax">${CSS_CODE}</textarea>
											<textarea id="akd-editor-hidden-input-css-${$i}" class="visually-hidden">${CSS_CODE}</textarea>
										</div>
										<span class="w--12 flex flex--center flex--wrap gap--4 p--4 bdr--2 bg--dark">
											<span class="flex flex--center gap--4 mr--auto">
												<button id="akd-editor-undo-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--danger" data-target="#akd-editor-input-css-${$i}" ${__akd._cache.editors[$i].css.enableUndoButton === true ? '':'disabled'}>undo</button>
												<button id="akd-editor-redo-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--warning" data-target="#akd-editor-input-css-${$i}" ${__akd._cache.editors[$i].css.enableRedoButton === true ? '':'disabled'}>redo</button>
											</span>
											<span class="flex flex--center gap--4 ml--auto">
												<button id="akd-editor-minify-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--purple" data-target="#akd-editor-input-css-${$i}">minify</button>
												<button id="akd-editor-format-button-css-${$i}" class="akd-editor-operation-button akd__btn btn--info" data-target="#akd-editor-input-css-${$i}">format</button>
											</span>
										</span>
									</div>
								</div>
								
								<div id="akd-editor-splitter-js-panel-${$i}" class="${__akd._tabs.panel_class} akd-editor-section flex flex--col h--12 overflow--hidden" data-language="js">
									<div class="h--12 gap--2 p--4" data-layout="grid-auto" data-layout-row-auto="auto-1fr-auto">
										<span class="flex gap--4 p--4 bdr--2 bg--light">
											<select id="akd-editor-languages-js-${$i}" class="flex flex--col gap--4 p--2 bdr--2 bg--info-gradient" onchange="changeLanguage()"><option value="c">C</option><option value="cpp">C++</option><option value="php">PHP</option><option value="python">Python</option><option value="node">Node JS</option></select>
											<button id="js-editor-splitter-panel-toggler-${$i}" class="editor-splitter-panel-toggler akd__btn btn--warning bdr--2 ml--auto">||</button>
										</span>
										<div id="akd-editor-js-wrapper" class="bg--info-gradient h--12 p--2 bdr--2">
											<textarea id="akd-editor-input-js-${$i}" class="akd-editor-textarea akd__input-textarea w--12 h--12 overflow--auto" placeholder="enter JS syntax">${JS_CODE}</textarea>
											<textarea id="akd-editor-hidden-input-js-${$i}" class="visually-hidden">${JS_CODE}</textarea>
										</div>
										<span class="w--12 flex flex--center flex--wrap gap--4 p--4 bdr--2 bg--dark">
											<span class="flex flex--center gap--4 mr--auto">
												<button id="akd-editor-undo-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--danger" data-target="#akd-editor-input-js-${$i}" ${__akd._cache.editors[$i].js.enableUndoButton === true ? '':'disabled'}>undo</button>
												<button id="akd-editor-redo-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--warning" data-target="#akd-editor-input-js-${$i}" ${__akd._cache.editors[$i].js.enableRedoButton === true ? '':'disabled'}>redo</button>
											</span>
											<span class="flex flex--center gap--4 ml--auto">
												<button id="akd-editor-minify-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--purple" data-target="#akd-editor-input-js-${$i}">minify</button>
												<button id="akd-editor-format-button-js-${$i}" class="akd-editor-operation-button akd__btn btn--info" data-target="#akd-editor-input-js-${$i}">format</button>
											</span>
										</span>
									</div>
								</div>
							</div>
							
							<div id="" class="akd-editor-footer flex-align-center p--4 bg--darker mb--1">
								<button id="akd-editor-run-code-button-${$i}" class="akd__btn btn--success px--8 mx--auto bdr--1">run</button>
							</div>
						</div>
						
						<span id="akd-editor-main-layout-splitter-body-handle-${$i}" class="splitter_handle"></span>
						
						<div id="akd-editor-main-layout-splitter-body-output-panel-${$i}" class="splitter_panel second--half flex flex--col gap--2 p--4">
							<div id="akd-editor-output-wrapper-${$i}" class="w--12 h--12 bg--white bdr--2 p--2 overflow--auto">
								<iframe id="akd-editor-output-iframe-${$i}" class="w--12 h--12 bg--white" sandbox="allow-scripts" frameborder="0" crossorigin="anonymous" src="" srcdoc=""></iframe>
							</div>
						</div>
					</div>
				</div>`;
			} else if(window["AKD_Editor_tempates"] && window["AKD_Editor_tempates"][this.editorStyle]){
				tmpl = window["AKD_Editor_tempates"][this.editorStyle];
			}
			//console.log(this.node, $this.node, editorContainer)
			$$this.node.insertAdjacentHTML("afterbegin", tmpl);
			$$this.initEvents($i);
			return $$this;
		};
		function run({html_code, css_code, js_code}, $i){
			let _iframe = $one(`#akd-editor-output-iframe-${$i}`);
			//storage.set('html_code', html_code);
			//storage.set('css_code', css_code);
			//storage.set('js_code', js_code);
			__akd._cache.editors[$i].html.ops_cache.add('html_code', html_code);
			__akd._cache.editors[$i].html.lastSaved.content = html_code;
			__akd._cache.editors[$i].css.ops_cache.add('css_code', css_code);
			__akd._cache.editors[$i].css.lastSaved.content = css_code;
			__akd._cache.editors[$i].js.ops_cache.add('js_code', js_code);
			__akd._cache.editors[$i].js.lastSaved.content = js_code;
			//console.log(js_ops_cache.keys)
			//_iframe = getIframeDocument(`#akd-editor-output-iframe-${$i}`);
			//_iframe = tag$1("iframe", {id:`#akd-editor-output-iframe-${$i}`, "class": "w--12 h--12 bg--white bdr--2 p--2", sandbox: "allow-scripts", frameborder: "0", crossorigin: "anonymous"});
			//document.body.appendChild(_iframe)
			//_iframe.contentWindow.body.innerHTML = 
			_iframe.srcdoc = `<style>${storage.get('css_code')}</style><main>${storage.get('html_code')}</main><script>${storage.get('js_code')}</script>`;
			//_iframe.contentWindow.eval(storage.get('js_code'));
			
			/* _iframe.srcdoc = `<style>${css_code.value}</style><main>${html_code}</main><script>${js_code}</script>`; */
		};
		
		return this;
	}
	//------------------------------------------------------------------------------------------
	function wheelZoom(target = '', targetId = '') {
		if(!isElement(target = $one(target))) return this;
		
		target.addEventListener('wheel', e =>{
		//document.addEventListener('wheel', e =>{
			//if(e.target.id === targetId){
				let zoom = 1.5, newSize, 
				w = elementStyle(target).width.replace('px', ''), 
				h = elementStyle(target).height.replace('px', '');
				if(e.deltaY > 0){
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
				//console.log(w, newSize_W, newSize_H, e.deltaY, e.deltaX)
				//Object.assign(target.style, {width: `${newSize}%`, height: `${newSize}%`});
				Object.assign(target.style, {width: `${newSize_W}px`, height: `${newSize_H}px`});
			//}
		});
		
		return this;
	}
	function enable_akd_tabs_event(context, AKD_Loader = '', buttonCls = '.akd__tab-button', panelCls = '.akd__tab-panel') {
		context = (context || document);
		buttonCls = (buttonCls || '.akd__tab-button');
		panelCls = (panelCls || '.akd__tab-panel');

		const render = (el, content, fx, delay = 1000) => {
			if(fx == 'show') {
				html$1(el, content);
				show(el, delay);
			} else if(fx == 'fadein') {
				html$1(el, content);
				fadeIn(el, delay);
			} else {
				addClass(el, fx);//css($target, 'display','block')
				html$1(el, content);
			}
		}
		const fireEvent = (ctx) => {
			if(!(isElement(ctx) || isDocument(ctx))) return false;
			ctx.addEventListener($_clickEvent, e=> {
				let $this = isElement(this) ? this : e.target, 
				_loading_error_code = '<center><p style="text-align: center !important;">Error!</p><p style="text-align: center !important;color:red;text-shadow:0 1px 0 #ffffff;">There was a problem and the page didnt load. Possible reasons could be, the URL is incorrect or you are offline(script not called from a server, <strong>ajax<\/strong> only works online)<\/p><\/center>';
				
				if($this.matches(buttonCls) || $this.hasAttribute(buttonCls)){
					e.preventDefault();
					let $target = $this.dataset.targetTab || $this.dataset.target, 
					parent = $one($this.dataset.parentTab) || $this.closest('.akd__tabs') || $this.parentElement.parentElement,
					active_tab_class= $this.dataset.activeTabClass || null;
					
					if(isElement(parent) && isString($target)){
						//let tab_buttons = $all(".akd__tab-button", parent), tab_panels = $all(".akd__tab-panel", parent), 
						//let tab_buttons = $all(buttonCls, parent), tab_panels = $all(panelCls, parent), 
						let tab_buttons = $all(`${buttonCls}:not(.akd__tabs .akd__tabs ${buttonCls})`, parent), tab_panels = $all(`${panelCls}:not(.akd__tabs .akd__tabs ${panelCls})`, parent), 
						target_url = $this.getAttribute('href') || $this.getAttribute("data-href"), 
						hasHref = isString(target_url) && target_url.length > 0;
						if(active_tab_class){
							[...tab_buttons, ...tab_panels].forEach(el => isElement(el) && el.classList.remove(active_tab_class));
							//$this.classList.add(active_tab_class);
							[$this, $one($target)].forEach(el => isElement(el) && el.classList.add(active_tab_class));
						}
						[...tab_buttons, ...tab_panels].forEach(el => isElement(el) && el.classList.remove("active--tab"));
						[$this, $one($target)].forEach(el => isElement(el) && el.classList.add("active--tab"));
						
						if(hasHref && !/javascript/.test(target_url)){
							let $win_height = innerHeight, 
							effect = $this.getAttribute('data-tab-effect') || storage.get('tab-effect') || 'animated slideInDown', 
							effect_time = $this.getAttribute('data-tab-effect-time') || storage.get('tab-effect-time') || 1000, 
							page_type = $this.getAttribute('data-tab-type') || storage.get('tab-type') || '', 
							page_title = $this.getAttribute('data-tab-title') || $this.getAttribute('title') || $this.innerText || $this.innerHTML, 
							hash = (location.hash != '') ? location.hash : '#akd-tab-home', 
							baseUrl = window.location.href.split('#')[0], 
							backurl = baseUrl /* + '#' */ + hash;
							__akd._globals.currentEffect = effect;
							if(target_url.match(/^.*#/) || target_url.match(/^#/)){
								if(isElement($target = $one(target_url))){
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
									xhr.ajax({
										url: target_url,
										type: method,
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
	}
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
	/* new** ------------------------------------------------------------------------- */
	function setProperty(el, _var, _val){
		if(_val){
			el.style.setProperty(_var, _val);
		} else {
			el.style.removeProperty(_var);
		}
		return this;
	}
	//------------------------------------------------------------------------------------------
	const fnArray = [
		$one, $all, inArray, isArray, isArrayLike, isAudioElement, isBlob, isDefined, isDocument, isEmptyObject, isElement, isFile, isFileList, isFunction,isImage,isInteger, isLowerCase, isMediaElement, isNegativeZero, isNil, isNode, isNull, isNumber, 
		isNumeric, isObject, isObjectLike, isPlainObject, isReallyDefined, isSelector, isStream, isString, isSymbol, isTravisCI, isUndefined, isUpperCase, isValidJSON, isVideoElement, isWritableStream, isWindow, 
		/* new** */isClass, isEmpty, isPromise, 
		_type,  _typeof, typeName, 
		$clog, $cerror, $cwarn, $bytes, //$conf
	],
	_util = {
		/* Experimental Functions */
		AKD_Editor, akdEditor: AKD_Editor, enable_akd_tabs_event, toFormData, wheelZoom, maximizeSplitterPane, wrap, 
		IframeTabs, sokx, createPortal, reflow, reader, bytes:$bytes, convert_bits, formatTime, formatToMS, formatDateTime, off, purge, pick, chop, 
		openEditor, setInnerHTML, renderContent, overrideLink, randomColor, 
		parseJSON, parseHTML, parseXML, canvasIt, chain, createChainables, setNodeAttribute, 
		$_validExts, $_accept, $r_imFilter, $_mimeTypes, $_afxs, $_ifxs, $_tfxs, $_scfxs, $_vfxs, $_skinz, $_bgOptions, $_EMOJIS, $_clickEvent,
		/* Element Selector Functions */
		one : $one, all : $all, getBy, 
		/* CSS/Style Functions */
		addClass, removeClass, toggleClass, css, elementStyle, styleElement, toggle, 
		/* DOM Manipulation Function */
		append, attr, data, dataset: data, empty, html, on, addEvent: on, outerHTML, prepend, tag, text, val, value, walk, 
		/* Array Function */
		dedupe, dedupe2, each, forEach, makeArray, merge, merge2, shuffle, sorter, 
		/* String Functions */
		camelize, capitalize, check_for_slash, checkForSlash: check_for_slash, createUniqueName, dasherize, escapeRegExp, /*escapeHTML$1,*/ escapeHTML, escapeHtml: escapeHTML, findInText, fixProp, headline, htmlData, htmlValue, jsValue, parseTemplate, removeNonASCII, replaceAll, replaceWith, selectText, selectCode, stringInsert, truncateString, unescapeHTML, unescapeHtml: unescapeHTML, urlVars, 
		/* Type Check Functions */
		inArray, isArray, isArrayLike, isAudioElement, isBlob, isDefined, isDocument, isEmpty, isEmptyObject, isElement, isFile, isFileList, isFunction, isImage, isInteger, isLowerCase, isMediaElement, isNegativeZero, isNil, isNode, isNull, isNumber, 
		isNumeric, isObject, isObjectLike, isPlainObject, isReallyDefined, isSelector, isStream, isString, isSymbol, isTravisCI, isUndefined, isUpperCase, isValidJSON, isVideoElement, isWritableStream, isWindow, 
		isClass, isPromise, 
		type: _type,"typeof": _typeof, typeName, contains, isInViewport, 
		/* Animation Function */
		animate, animation, fade, fadeIn, fadeOut, zoomImage, zoomIn, zoomOut, flipImage, 
		/* MISC. Function */
		debounce, dimensions, extend, extendObj: extend, findBy, fileext, ext : fileext, fileExt: fileext, fileExtension : fileext, filename, getBody, offsets, niceBytes, /* basename, dirname, */safeJSON, serialize, throttle, 
		/* Applets */
		app, appLoader: app, /* loader, */ajax, xhr, fetchFile, 
		blendingModes, calculateRatio, carousel, cssFilterApp, domInspector, downloadText, downloadImage, DnD, dragElement, akdSplitter: dragElement, draggerPanel, fourWayDragger, 
		handleError, liveEdit, loadThis, magnifier, markdown, parseContent, promiseFileReader, Router, scrollIndicator, sliders, tabs, templater, hashRouter:templater, tmpl: templater2, toggleNav, traverseFiles, w3CodeColorize,
		/* Classes/Objects */
		sandbox : Sandbox, storage, 
		/* new** */
		setProperty, /* fixProp , */getElements, 
	},
	pbd_util = function(cfgObj = {}){
		this.chaining = true;
		this.__akd = __akd;
		this.nodes = isString(cfgObj) && (cfgObj.match(/^.*#/) || cfgObj.match(/^#/)) ? $all(cfgObj) : __akd._nodes;
		this.cfg = isObject(cfgObj) ? extend(__akd, cfgObj) : __akd;
		//for(i in _util) this[i] = _util[i].apply(null, ...arguments);
		for(i in _util) this[i] = _util[i];
		//return _util;
		return this;
	}
	//pbd_util2 = createChainables(_util)
	//console.log(new pbd_util, pbd_util2, _util)
	window._$ = window.$$ = window.$chain = pbd_util;
	window._ = window._$$ = _util;

	for(var i=0;i<fnArray.length;i++){
		var fn = fnArray[i];
		window[isFunction(fn) ? fn.name : fn] = fn;
	}
	window['$_validExts'] = $_validExts, window['$_accept'] = $_accept, window['$r_imFilter'] = $r_imFilter, window['$_mimeTypes'] = $_mimeTypes, window['$_afxs'] = $_afxs, window['$_ifxs'] = $_ifxs, window['$_tfxs'] = $_scfxs, window['$_scfxs'] = $_tfxs, window['$_vfxs'] = $_vfxs, window['$_skinz'] = $_skinz, window['$_bgOptions'] = $_bgOptions, window['$_EMOJIS'] = $_EMOJIS, window['$_clickEvent'] = $_clickEvent;
	//return _util;
})(this);

/*
var Util = (function() {
	var __cleanWhitespace = function(node) {
		for (var i = 0; i < node.childNodes.length; i++) {
			var child = node.childNodes[i];
			if (child.nodeType == 3 && !/\S/.test(child.nodeValue)) {
				node.removeChild(child);
				i--;
			}
			if (child.nodeType == 1) {
				__cleanWhitespace(child);
			}
		}
		return node;
	};
	
	return {
		cleanWhitespace: __cleanWhitespace
	}
})();
*/
//window._$ = {}
/* ;(function ($) {
	'use strict'
	var tmpl =  function (str, data) {
		var f = !/[^\w\-.:]/.test(str) ? (tmpl.cache[str] = tmpl.cache[str] || tmpl(tmpl.load(str))) : new Function(tmpl.arg + ',tmpl', 'var _e=tmpl.encode' + tmpl.helper + ",_s='" + str.replace(tmpl.regexp, tmpl.func) + "';return _s;");
		return data ? f(data, tmpl) : function (data) {return f(data, tmpl);}
	}
	tmpl.cache = {};
	tmpl.load = function (id) {return document.getElementById(id).innerHTML;}
	tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
	tmpl.func = function (s, p1, p2, p3, p4, p5) {
		if (p1) {
			// whitespace, quote and backspace in HTML context
			return ({'\n': '\\n', '\r': '\\r', '\t': '\\t', ' ': ' '}[p1] || '\\' + p1)
		}
		if (p2) {
			// interpolation: {%=prop%}, or unescaped: {%#prop%}
			if (p2 === '=') {return "'+_e(" + p3 + ")+'"}
			return "'+(" + p3 + "==null?'':" + p3 + ")+'"
		}
		if (p4) {
			return "';"// evaluation start tag: {%
		}
		if (p5) {
			return "_s+='"// evaluation end tag: %}
		}
	}
	tmpl.encReg = /[<>&"'\x00]/g // eslint-disable-line no-control-regex
	tmpl.encMap = {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;'}
	tmpl.encode = function(s){return (s == null ? '' : '' + s).replace(tmpl.encReg, function(c){return tmpl.encMap[c] || ''});}
	tmpl.arg = 'o'
	tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" + ',include=function(s,d){_s+=tmpl(s,d);}'
	$.tmpl = tmpl;
})(_) */

/*
    ********** Juicer **********
    ${A Fast template engine}
    Project Home: http://juicer.name

    Author: Guokai
    Gtalk: badkaikai@gmail.com
    Blog: http://benben.cc
    Licence: MIT License
    Version: 0.6.9-stable
    ********** *************

(function() {
	
    // This is the main function for not only compiling but also rendering.
    // there's at least two parameters need to be provided, one is the tpl, 
    // another is the data, the tpl can either be a string, or an id like #id.
    // if only tpl was given, it'll return the compiled reusable function.
    // if tpl and data were given at the same time, it'll return the rendered 
    // result immediately.
    var juicer = function() {
        var args = [].slice.call(arguments);

        args.push(juicer.options);
        
        if(args[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)) {
            args[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm, function($, $id) {
                var _document = document;
                var elem = _document && _document.getElementById($id);
                args[0] = elem ? (elem.value || elem.innerHTML) : $;
            });
        }

        if(typeof(document) !== 'undefined' && document.body) {
            juicer.compile.call(juicer, document.body.innerHTML);
        }

        if(arguments.length == 1) {
            return juicer.compile.apply(juicer, args);
        }

        if(arguments.length >= 2) {
            return juicer.to_html.apply(juicer, args);
        }
    };

    var __escapehtml = {
        escapehash: {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2f;'
        },
        escapereplace: function(k) {
            return __escapehtml.escapehash[k];
        },
        escaping: function(str) {
            return typeof(str) !== 'string' ? str : str.replace(/[&<>"]/igm, this.escapereplace);
        },
        detection: function(data) {
            return typeof(data) === 'undefined' ? '' : data;
        }
    };

    var __throw = function(error) {
        if(typeof(console) !== 'undefined') {
            if(console.warn) {
                console.warn(error);
                return;
            }

            if(console.log) {
                console.log(error);
                return;
            }
        }

        throw(error);
    };

    var __creator = function(o, proto) {
        o = o !== Object(o) ? {} : o;

        if(o.__proto__) {
            o.__proto__ = proto;
            return o;
        }

        var empty = function() {};
        var n = Object.create ? 
            Object.create(proto) : 
            new(empty.prototype = proto, empty);

        for(var i in o) {
            if(o.hasOwnProperty(i)) {
                n[i] = o[i];
            }
        }

        return n;
    };

    var annotate = function(fn) {
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var FN_ARG_SPLIT = /,/;
        var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
        var FN_BODY = /^function[^{]+{([\s\S]*)}/m;
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var args = [],
            fnText,
            fnBody,
            argDecl;

        if (typeof fn === 'function') {
            if (fn.length) {
                fnText = fn.toString();
            }
        } else if(typeof fn === 'string') {
            fnText = fn;
        }

        fnText = fnText.trim();
        argDecl = fnText.match(FN_ARGS);
        fnBody = fnText.match(FN_BODY)[1].trim();

        for(var i = 0; i < argDecl[1].split(FN_ARG_SPLIT).length; i++) {
            var arg = argDecl[1].split(FN_ARG_SPLIT)[i];
            arg.replace(FN_ARG, function(all, underscore, name) {
                args.push(name);
            });
        }

        return [args, fnBody];
    };

    juicer.__cache = {};
    juicer.version = '0.6.9-stable';
    juicer.settings = {};

    juicer.tags = {
        operationOpen: '{@',
        operationClose: '}',
        interpolateOpen: '\\${',
        interpolateClose: '}',
        noneencodeOpen: '\\$\\${',
        noneencodeClose: '}',
        commentOpen: '\\{#',
        commentClose: '\\}'
    };

    juicer.options = {
        cache: true,
        strip: true,
        errorhandling: true,
        detection: true,
        _method: __creator({
            __escapehtml: __escapehtml,
            __throw: __throw,
            __juicer: juicer
        }, {})
    };

    juicer.tagInit = function() {
        var forstart = juicer.tags.operationOpen + 'each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?' + juicer.tags.operationClose;
        var forend = juicer.tags.operationOpen + '\\/each' + juicer.tags.operationClose;
        var ifstart = juicer.tags.operationOpen + 'if\\s*([^}]*?)' + juicer.tags.operationClose;
        var ifend = juicer.tags.operationOpen + '\\/if' + juicer.tags.operationClose;
        var elsestart = juicer.tags.operationOpen + 'else' + juicer.tags.operationClose;
        var elseifstart = juicer.tags.operationOpen + 'else if\\s*([^}]*?)' + juicer.tags.operationClose;
        var interpolate = juicer.tags.interpolateOpen + '([\\s\\S]+?)' + juicer.tags.interpolateClose;
        var noneencode = juicer.tags.noneencodeOpen + '([\\s\\S]+?)' + juicer.tags.noneencodeClose;
        var inlinecomment = juicer.tags.commentOpen + '[^}]*?' + juicer.tags.commentClose;
        var rangestart = juicer.tags.operationOpen + 'each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)' + juicer.tags.operationClose;
        var include = juicer.tags.operationOpen + 'include\\s*([^}]*?)\\s*,\\s*([^}]*?)' + juicer.tags.operationClose;
        var helperRegisterStart = juicer.tags.operationOpen + 'helper\\s*([^}]*?)\\s*' + juicer.tags.operationClose;
        var helperRegisterBody = '([\\s\\S]*?)';
        var helperRegisterEnd = juicer.tags.operationOpen + '\\/helper' + juicer.tags.operationClose;

        juicer.settings.forstart = new RegExp(forstart, 'igm');
        juicer.settings.forend = new RegExp(forend, 'igm');
        juicer.settings.ifstart = new RegExp(ifstart, 'igm');
        juicer.settings.ifend = new RegExp(ifend, 'igm');
        juicer.settings.elsestart = new RegExp(elsestart, 'igm');
        juicer.settings.elseifstart = new RegExp(elseifstart, 'igm');
        juicer.settings.interpolate = new RegExp(interpolate, 'igm');
        juicer.settings.noneencode = new RegExp(noneencode, 'igm');
        juicer.settings.inlinecomment = new RegExp(inlinecomment, 'igm');
        juicer.settings.rangestart = new RegExp(rangestart, 'igm');
        juicer.settings.include = new RegExp(include, 'igm');
        juicer.settings.helperRegister = new RegExp(helperRegisterStart + helperRegisterBody + helperRegisterEnd, 'igm');
    };

    juicer.tagInit();

    // Using this method to set the options by given conf-name and conf-value,
    // you can also provide more than one key-value pair wrapped by an object.
    // this interface also used to custom the template tag delimater, for this
    // situation, the conf-name must begin with tag::, for example: juicer.set
    // ('tag::operationOpen', '{@').

    juicer.set = function(conf, value) {
        var that = this;

        var escapePattern = function(v) {
            return v.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm, function($) {
                return '\\' + $;
            });
        };

        var set = function(conf, value) {
            var tag = conf.match(/^tag::(.*)$/i);

            if(tag) {
                that.tags[tag[1]] = escapePattern(value);
                that.tagInit();
                return;
            }

            that.options[conf] = value;
        };

        if(arguments.length === 2) {
            set(conf, value);
            return;
        }

        if(conf === Object(conf)) {
            for(var i in conf) {
                if(conf.hasOwnProperty(i)) {
                    set(i, conf[i]);
                }
            }
        }
    };

    // Before you're using custom functions in your template like ${name | fnName},
    // you need to register this fn by juicer.register('fnName', fn).

    juicer.register = function(fname, fn) {
        var _method = this.options._method;

        if(_method.hasOwnProperty(fname)) {
            return false;
        }

        return _method[fname] = fn;
    };

    // remove the registered function in the memory by the provided function name.
    // for example: juicer.unregister('fnName').

    juicer.unregister = function(fname) {
        var _method = this.options._method;

        if(_method.hasOwnProperty(fname)) {
            return delete _method[fname];
        }
    };

    juicer.template = function(options) {
        var that = this;

        this.options = options;

        this.__interpolate = function(_name, _escape, options) {
            var _define = _name.split('|'), _fn = _define[0] || '', _cluster;

            if(_define.length > 1) {
                _name = _define.shift();
                _cluster = _define.shift().split(',');
                _fn = '_method.' + _cluster.shift() + '.call({}, ' + [_name].concat(_cluster) + ')';
            }

            return '<%= ' + (_escape ? '_method.__escapehtml.escaping' : '') + '(' +
                        (!options || options.detection !== false ? '_method.__escapehtml.detection' : '') + '(' +
                            _fn +
                        ')' +
                    ')' +
                ' %>';
        };

        this.__removeShell = function(tpl, options) {
            var _counter = 0;

            tpl = tpl
                // inline helper register
                .replace(juicer.settings.helperRegister, function($, helperName, fnText) {
                    var anno = annotate(fnText);
                    var fnArgs = anno[0];
                    var fnBody = anno[1];
                    var fn = new Function(fnArgs.join(','), fnBody);

                    juicer.register(helperName, fn);
                    return $;
                })

                // for expression
                .replace(juicer.settings.forstart, function($, _name, alias, key) {
                    var alias = alias || 'value', key = key && key.substr(1);
                    var _iterate = 'i' + _counter++;
                    return '<% ~function() {' +
                                'for(var ' + _iterate + ' in ' + _name + ') {' +
                                    'if(' + _name + '.hasOwnProperty(' + _iterate + ')) {' +
                                        'var ' + alias + '=' + _name + '[' + _iterate + '];' +
                                        (key ? ('var ' + key + '=' + _iterate + ';') : '') +
                            ' %>';
                })
                .replace(juicer.settings.forend, '<% }}}(); %>')

                // if expression
                .replace(juicer.settings.ifstart, function($, condition) {
                    return '<% if(' + condition + ') { %>';
                })
                .replace(juicer.settings.ifend, '<% } %>')

                // else expression
                .replace(juicer.settings.elsestart, function($) {
                    return '<% } else { %>';
                })

                // else if expression
                .replace(juicer.settings.elseifstart, function($, condition) {
                    return '<% } else if(' + condition + ') { %>';
                })

                // interpolate without escape
                .replace(juicer.settings.noneencode, function($, _name) {
                    return that.__interpolate(_name, false, options);
                })

                // interpolate with escape
                .replace(juicer.settings.interpolate, function($, _name) {
                    return that.__interpolate(_name, true, options);
                })

                // clean up comments
                .replace(juicer.settings.inlinecomment, '')

                // range expression
                .replace(juicer.settings.rangestart, function($, _name, start, end) {
                    var _iterate = 'j' + _counter++;
                    return '<% ~function() {' +
                                'for(var ' + _iterate + '=' + start + ';' + _iterate + '<' + end + ';' + _iterate + '++) {{' +
                                    'var ' + _name + '=' + _iterate + ';' +
                            ' %>';
                })

                // include sub-template
                .replace(juicer.settings.include, function($, tpl, data) {
                    // compatible for node.js
                    if(tpl.match(/^file\:\/\//igm)) return $;
                    return '<%= _method.__juicer(' + tpl + ', ' + data + '); %>';
                });

            // exception handling
            if(!options || options.errorhandling !== false) {
                tpl = '<% try { %>' + tpl;
                tpl += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>';
            }

            return tpl;
        };

        this.__toNative = function(tpl, options) {
            return this.__convert(tpl, !options || options.strip);
        };

        this.__lexicalAnalyze = function(tpl) {
            var buffer = [];
            var method = [];
            var prefix = '';
            var reserved = [
                'if', 'each', '_', '_method', 'console', 
                'break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 
                'finally', 'for', 'function', 'in', 'instanceof', 'new', 'return', 'switch', 
                'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'null', 'typeof', 
                'class', 'enum', 'export', 'extends', 'import', 'super', 'implements', 'interface', 
                'let', 'package', 'private', 'protected', 'public', 'static', 'yield', 'const', 'arguments', 
                'true', 'false', 'undefined', 'NaN'
            ];

            var indexOf = function(array, item) {
                if (Array.prototype.indexOf && array.indexOf === Array.prototype.indexOf) {
                    return array.indexOf(item);
                }

                for(var i=0; i < array.length; i++) {
                    if(array[i] === item) return i;
                }

                return -1;
            };

            var variableAnalyze = function($, statement) {
                statement = statement.match(/\w+/igm)[0];

                if(indexOf(buffer, statement) === -1 && indexOf(reserved, statement) === -1 && indexOf(method, statement) === -1) {

                    // avoid re-declare native function, if not do this, template 
                    // `{@if encodeURIComponent(name)}` could be throw undefined.

                    if(typeof(window) !== 'undefined' && typeof(window[statement]) === 'function' && window[statement].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
                        return $;
                    }

                    // compatible for node.js
                    if(typeof(global) !== 'undefined' && typeof(global[statement]) === 'function' && global[statement].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
                        return $;
                    }

                    // avoid re-declare registered function, if not do this, template 
                    // `{@if registered_func(name)}` could be throw undefined.

                    if(typeof(juicer.options._method[statement]) === 'function' || juicer.options._method.hasOwnProperty(statement)) {
                        method.push(statement);
                        return $;
                    }

                    buffer.push(statement); // fuck ie
                }

                return $;
            };

            tpl.replace(juicer.settings.forstart, variableAnalyze).
                replace(juicer.settings.interpolate, variableAnalyze).
                replace(juicer.settings.ifstart, variableAnalyze).
                replace(juicer.settings.elseifstart, variableAnalyze).
                replace(juicer.settings.include, variableAnalyze).
                replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_]+)/igm, variableAnalyze);

            for(var i = 0;i < buffer.length; i++) {
                prefix += 'var ' + buffer[i] + '=_.' + buffer[i] + ';';
            }

            for(var i = 0;i < method.length; i++) {
                prefix += 'var ' + method[i] + '=_method.' + method[i] + ';';
            }

            return '<% ' + prefix + ' %>';
        };

        this.__convert=function(tpl, strip) {
            var buffer = [].join('');

            buffer += "'use strict';"; // use strict mode
            buffer += "var _=_||{};";
            buffer += "var _out='';_out+='";

            if(strip !== false) {
                buffer += tpl
                    .replace(/\\/g, "\\\\")
                    .replace(/[\r\t\n]/g, " ")
                    .replace(/'(?=[^%]*%>)/g, "\t")
                    .split("'").join("\\'")
                    .split("\t").join("'")
                    .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
                    .split("<%").join("';")
                    .split("%>").join("_out+='")+
                    "';return _out;";

                return buffer;
            }

            buffer += tpl
                    .replace(/\\/g, "\\\\")
                    .replace(/[\r]/g, "\\r")
                    .replace(/[\t]/g, "\\t")
                    .replace(/[\n]/g, "\\n")
                    .replace(/'(?=[^%]*%>)/g, "\t")
                    .split("'").join("\\'")
                    .split("\t").join("'")
                    .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
                    .split("<%").join("';")
                    .split("%>").join("_out+='")+
                    "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";

            return buffer;
        };

        this.parse = function(tpl, options) {
            var _that = this;

            if(!options || options.loose !== false) {
                tpl = this.__lexicalAnalyze(tpl) + tpl;
            }

            tpl = this.__removeShell(tpl, options);
            tpl = this.__toNative(tpl, options);

            this._render = new Function('_, _method', tpl);

            this.render = function(_, _method) {
                if(!_method || _method !== that.options._method) {
                    _method = __creator(_method, that.options._method);
                }

                return _that._render.call(this, _, _method);
            };

            return this;
        };
    };

    juicer.compile = function(tpl, options) {
        if(!options || options !== this.options) {
            options = __creator(options, this.options);
        }

        try {
            var engine = this.__cache[tpl] ? 
                this.__cache[tpl] : 
                new this.template(this.options).parse(tpl, options);

            if(!options || options.cache !== false) {
                this.__cache[tpl] = engine;
            }

            return engine;

        } catch(e) {
            __throw('Juicer Compile Exception: ' + e.message);

            return {
                render: function() {} // noop
            };
        }
    };

    juicer.to_html = function(tpl, data, options) {
        if(!options || options !== this.options) {
            options = __creator(options, this.options);
        }

        return this.compile(tpl, options).render(data, options._method);
    };

    // avoid memory leak for node.js
    if(typeof(global) !== 'undefined' && typeof(window) === 'undefined') {
        juicer.set('cache', false);
    }

    typeof(module) !== 'undefined' && module.exports ? module.exports = juicer : this.juicer = juicer;

})();

*/