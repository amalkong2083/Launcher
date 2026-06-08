(function (_global ){
	var global = this, self = this, __akd_self, hasCompare, 
	docElem = document.documentElement,
	isXPathAvailable = !!document.evaluate,
	getProto = Object.getPrototypeOf, 
	toString = Object.prototype.toString, 
	arr = [], __slice = arr.slice,__concat = arr.concat,__push = arr.push,
	__flat = arr.flat ? function(array) {return arr.flat.call(array);} : function(array) {return arr.concat.apply( [], array );},
	allTypes = "*/".concat( "*" ),
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,// Make sure we trim BOM and NBSP
	rmsPrefix = /^-ms-/,// Matches dashed string for camelizing
	rdashAlpha = /-([\da-z])/gi,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
	rnoInnerhtml = /<script|<style|<link/i,
	rtagName = ( /<([\w:-]+)/ ),
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	rcheckableType = ( /^(?:checkbox|radio)$/i ),
	rscriptType = ( /^$|\/(?:java|ecma)script/i ),
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	r20 = /%20/g,
	rquery = ( /\?/ ),
	rheader = /^h\d$/i,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rget = /GET/i,rpost = /POST/i,rimage = /^(?:gif|jpg|jpeg|png)$/i,rscript = /^(?:js|jsp|css|php|phtml|inc)$/i,
	rnative = /^[^{]+\{\s*\[native \w/,
	rsibling = /[+~]/,
	rescape = /'|\\/g,
	rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, 
	rTag = /<\s*\w.*?>/g, 
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,// #7653, #8125, #8152: local protocol detection
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rcomma = /,/, rspace = /\s/g,
	rLWhitespace = /^\s+/, rTWhitespace = /\s+$/,
	uidReplace = /[xy]/g,
	rPath = /.*(\/|\\)/,
	rExt = /.*[.]/,
	rHasClass = /[\t\r\n]/g,
    rURI = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/, // returns groups for protocol (2), domain (3) and port (4) 
	rParent = /[\-\w]+\/\.\.\//, 
	rDoubleSlash = /([^:])\/\//g,
	rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g ), 
    rcustomProp = /^--/, 
	pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source, 
	rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ), 
	URL_REGEX = /^\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/, // eslint-disable-line
	version='1.0.0',_random = String(Math.random()).replace('.','').replace('-',''),nonce = Date.now(),
	_uid = Math.random(), uid = () => { return String(_uid++).replace('.','').replace('-','');},
	returnFalse = () => {return false;},
	emptyFn = Function.prototype,
	emptyStyle = document.createElement( "div" ).style, 
	Expr = {
		// Can be adjusted by the user
		cacheLength: 50,
		_cache : {}
	};
	// ---------------------------------------------------------
	function _type(obj){toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();return;}
	function _typeof(obj){if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function (obj) {return typeof obj;};} else {_typeof = function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return arguments.length > 1 && arguments[1] && typeof arguments[1] === "string" ? _typeof(obj) === arguments[1] : _typeof(obj);}
	/** Retrieves the type of a value, either a data value of type "Number", "String" or "Boolean", or an object of type "Function", "Array", "HTMLDocument", ..., or "Object"  */
	function typeName(val) {
		// stringify val and extract the word following "object"
		var typeName = toString.call(val).match(/^\[object\s(.*)\]$/)[1];
		// special case: null is of type "Null"
		if (val === null) return "Null"; 
		// special case: instance of a user-defined class or ad-hoc object
		if (typeName === "Object") return val.constructor.name || "Object";
		// all other cases: "Number", "String", "Boolean", "Function", "Array", "HTMLDocument", ...
		return typeName;
	}
	function _extendObj2 ( first, second ){"use strict";for( var prop in second ) {if( second.hasOwnProperty( prop ) ) {first[prop] = second[prop];}}return first;}
	function isIn ( obj ,property) {return (property in obj) || obj.hasOwnProperty.call( obj,property);}
	function isWindow(obj ){var toString = Object.prototype.toString.call(obj);return toString == '[object global]' || toString == '[object Window]' || toString == '[object DOMWindow]' || (obj != null && obj === obj.window);};
	//function isWindow ( obj ) {var toString = toString.call(obj);return toString == '[object global]' || toString == '[object Window]' || toString == '[object DOMWindow]' || (obj != null && obj === obj.window);};
	/**
	 *
	 * Javascript trim, ltrim, rtrim
	 * http://www.webtoolkit.info/
	 *
	**/
	 
	function trim2(str, chars) {return ltrim(rtrim(str, chars), chars);}
	function ltrim(str, chars) {chars = chars || "\s";return str.replace(new RegExp("^[" + chars + "]+", "g"), "");}
	function rtrim(str, chars) {chars = chars || "\s";return str.replace(new RegExp("[" + chars + "]+$", "g"), "");}
	//--------------------------------------------------
    var _trim = "".trim;
    const trim = _trim && !_trim.call("\uFEFF\xA0") ? function( text ) {return text === null ? "" : trim.call( text );} : function( text ) {return text === null ? "" : text.toString().replace( rLWhitespace, '' ).replace( rTWhitespace, '' );};
	const makeArray = (collection) => {return Array.from ? Array.from(collection) : Array.prototype.slice.call(collection);}
	const merge2 = (array1, array2) => {return [].concat(array1, array2);/* return array1.push(...array2); */}
	const merge = function(...args) {
		// Native, doesn't remove duplicate items
		//return [].concat(...args)
		// ES6-way, doesn't remove duplicate items
		//array1 = [...array1, ...array2]
		// Set version, does remove duplicate items
		return Array.from(new Set([].concat(...args)))
	}
	const trueTypeOf = (obj) => {return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();}
	const inArray = (needle, arr) => {if ((typeof arr == 'undefined') || !arr.length || !arr.push) return false;for (var i = 0; i < arr.length; i++) if (arr[i] == needle) return true;return false;}
	const isArray = Array.isArray || ((value) => toString.call(value) == '[object Array]');
	// const isArrayLike = ( obj ) => {return obj != null && typeof obj[Symbol.iterator] === 'function';}
	const isArrayLike = ( obj ) => {var length = !!obj && isIn(obj,"length") && obj.length,type = _type( obj );if ( type === "function" || isWindow( obj ) ) {return false;}return type === "array" || length === 0 || typeof length === "number" && length > 0 && isIn(obj,( length - 1 )) || obj != null && typeof obj[Symbol.iterator] === 'function';}
	const isArrayBuffer = (val) => toString.call(val) === '[object ArrayBuffer]';
	const isArrayBufferView = (val) => {var result;if((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {result = ArrayBuffer.isView(val);} else {result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);}return result;}
	const isAudioElement = (elem) => {return elem instanceof HTMLAudioElement;};
	const isBlob = (val) => toString.call(val) === '[object Blob]';
	const isBuffer = (val) => val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
	const isClass = (t) => isFunction(t) && /^\s*class\s+/.test(t.toString());
	const isDate = (val) => toString.call(val) === '[object Date]';
	const isDocument = (obj) => {return obj === document && obj.nodeType === 9;}
	const isDocumentFragment = (obj) => {return obj && (obj !== document && obj.nodeName && obj.nodeName.replace('#','') === 'document-fragment' && obj.nodeType === 11);}
	const isADocument = (obj) => {return (obj === document && obj.nodeType === 9) || (obj && isSet(obj.nodeName) && obj.nodeName.replace('#','') === 'document' && obj.nodeType === 9) || isDocumentFragment(obj);}
	const isElement = (obj) => {return (typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string");}
	//const isEmptyObject = (t) => !t || 0 === Object.keys(t).length && t.constructor === Object;
	const isEmptyObject = (obj) => {for(var key in obj) {if(obj.hasOwnProperty(key)) return false;}return true;};
	const isFile = (val) => toString.call(val) === '[object File]';
	const isFileName = (f) => isString(f) && !isSelector(f) && f.includes && f.includes(".");
	const isFormData = (val) => (typeof FormData !== 'undefined') && (val instanceof FormData);
	const isFunction = ( obj ) => {return toString.call(obj) == '[object Function]' || ( typeof obj === "function" && typeof obj.nodeType !== "number" );}
	const isImage = (url) => {return _typeof(url) === "string" && (/\.(jpe?g|gif|png|jfif|avif|bmp|svg)$/.test(url) || /^data:image\/.+;base64/.test(url)) || (url.src ? (/\.(jpe?g|gif|png|jfif|avif|bmp|svg)$/.test(url.src) || /^data:image\/.+;base64/.test(url.src)) : false);}
	const isImageElement = (elem) => {return elem instanceof HTMLImageElement;}
	const isLowerCase = (str) => {return str === str.toLowerCase();}
	const isMediaElement = (elem) => {return elem instanceof HTMLMediaElement;}
	const isNegativeZero = (val) => {return val === 0 && 1 / val === -Infinity;}
	const isNil = (val) => {return val === undefined || val === null;}
	//Returns true if it is a DOM node
	const isNode = (obj) => (typeof Node === "object" ? obj instanceof Node : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string");
	const isNull = (val) => val === null;
	const isNumber = (val) => _typeof( val ) === 'number' && val === val;
	//const isNumeric = ( obj ) => {var realStringObj = obj && obj.toString();return isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;}
	const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);
	const isObject = (obj) => obj !== null && (typeof obj === 'object' || obj === Object(obj));
	const isObjectLike = (val) => val !== null && _typeof(val) === 'object';
	//const isPlainObject = (val) =>  !!val && typeof(val) === 'object' && val.constructor === Object;
	//const isPlainObject = function(obj) {if (typeof(obj) !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {return false;}if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {return false;}return true;}
	const isPlainObject = (val) => {if(toString.call(val) !== '[object Object]') {return false;}var prototype = getProto(val);return prototype === null || prototype === Object.prototype;}
	const isPositiveInteger = (x) => typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0 && x > 0;
	const isPromise = p => p && typeof p.then === 'function' || Promise.resolve(p) === p;
	//const isSelector = function() { return ( arguments.length > 0 && ( match = rquickExpr.exec(arguments[0]) ) && ( match[1] || match[2] || match[3] || $one(arguments[0]) ) )}
	const isSelector = (sel) => (match = rquickExpr.exec(sel)) && (match[1] || match[2] || match[3] || $one(sel)) !== null;
	const isSet = (val) => _typeof(val) !== 'undefined';
	const isStream = (val) => isObject(val) && isFunction(val.pipe);
	const isString = (val) => typeof val === 'string';
	const isSymbol = (val) => _typeof(val) === 'symbol';
	const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
	const isUndefined = (val) => typeof val === 'undefined'
	const isURLSearchParams = (val) => typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	const isUpperCase = (str) => str === str.toUpperCase();
	const isValidJSON = (str) => {try {JSON.parse(str);return true;} catch (e) {return false;}};
	const isVideoElement = (elem) => elem instanceof HTMLVideoElement;
	const isWritableStream = (val) => val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function' && typeof val._write === 'function' && _typeof(val._writableState) === 'object';
	const isStandardBrowserEnv = () => {if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {return false;}return (typeof window !== 'undefined' && typeof document !== 'undefined');}
	const isAbsoluteURL = (url) => {
		// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
		// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
		// by any combination of letters, digits, plus, period, or hyphen.
		return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	}
	const isValidHttpUrl = (string) => {let url;try {url = new URL(string);} catch (_) {return false;}return url.protocol && (url.protocol === "http:" || url.protocol === "https:");}
	
	if ((navigator.userAgent.toLowerCase().match(/chrome\/([4][9-9]|[5-9][0-9]|[1-9][0-9][0-9])\./) !== null ) || (navigator.userAgent.toLowerCase().match(/crios\/([4][9-9]|[5-9][0-9]|[1-9][0-9][0-9])\./) !== null )) {
		function isURL(str) {var pattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3})) (\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i');return pattern.test(str);}
	}
	
	const indexOf = (array, obj) => {if (array.indexOf) return array.indexOf(obj);for (var i = 0; i < array.length; i++) {if (obj === array[i]) return i;}return -1;}
	const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []); /*indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0, 3];indexOfAll([1, 2, 3], 4); // []*/
	/*indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0, 3]
	indexOfAll([1, 2, 3], 4); // []*/
	const includes = (array, obj) => {return indexOf(array, obj) != -1;}
	const camelCase = ( string ) => {var fcamelCase = function ( _all, letter ) {return letter.toUpperCase();};return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );}
	const camelize = (stringToCamelize) => {if (String(stringToCamelize).indexOf('-') == -1){return stringToCamelize;}var oStringList = String(stringToCamelize).split('-');var isFirstEntry = true;var camelizedString = '';for(var i=0; i < oStringList.length; i++){if(oStringList[i].length>0){if(isFirstEntry){camelizedString = oStringList[i];isFirstEntry = false;} else {var s = oStringList[i];camelizedString += s.charAt(0).toUpperCase() + s.substring(1);}}}return camelizedString;};
	/* // Zepto camelize function
    const camelize = (str) => {return str.replace(/-+(.)?/g, function (match, chr) {return chr ? chr.toUpperCase() : '';});}
    // Zepto dasherize function */ 
    const dasherize = (str) => {return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();}
	const capitalize = (str) => {if(!str) return '';var first = str.substring(0,1);return first.toUpperCase() + str.substring(1);}
	const htmlValue = (value) => {return value.replace("&lt;","<").replace("&gt;",">").replace("&amp;","&").replace("&quot;",'"').replace("&#39;","'").replace("&nbsp;"," ");}
	const htmlData = (value) => {return value.replace("<","&lt;").replace(">","&gt;").replace("&","&amp;").replace('"',"&quot;").replace("'","&#39;").replace(" ","&nbsp;");}
	const jsValue = (value) => {return value.replace(/\\/g, "\\\\").replace(/\r?\n/, "\\\n").replace(/\"/g, "\\\"").replace(/\'/g, "\\'");}
	const checkForSlash = ($path,$convertSlash=false) => {if($path.lastIndexOf("/") != - 1) {$path = $path + "/";}if($convertSlash == true){$path = str_replace('[\]','/',$path);}return $path;}	
	const removeNonASCII = (str) => {return str.replace(/[^\x20-\x7E]/g, '');};
	const escapeHTML = (str) => {return str.replace(/[&<>'"]/g, function (tag) {return {'&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#39;','"': '&quot;'}[tag] || tag;});}
	const unescapeHTML = (str) => {return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, function (tag) {return {'&amp;': '&','&lt;': '<','&gt;': '>','&#39;': "'",'&quot;': '"'}[tag] || tag;});}
	const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	/*const escapeRegExp = (string) => {return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string}*/
	const replaceAll = (str, find, replacement) => {return str.replace(new RegExp(escapeRegExp(find), 'g'), replacement);/*return str.split(find).join(replacement);*/};
	const createUniqueName = (str) => {return isString(str) ? str.replace('./', '').replace(/["&'./:=?[\]]/gi, '-').replace(/(_)/gi, '-').replace(/(--)/gi, '') : str;}
	const elementStyle = (strOrEle) => {var el = $one(strOrEle);return !isElement(el) ? false : (el.currentStyle ? el.currentStyle : ((el.ownerDocument||document).defaultView && (el.ownerDocument||document).defaultView.getComputedStyle ? (el.ownerDocument||document).defaultView.getComputedStyle(el, null) : window.getComputedStyle(el,null)));};
	const getStyles = ( elem ) => {var view = elem.ownerDocument.defaultView;if ( !view || !view.opener ) {view = window;}return view.getComputedStyle( elem );}
	const ext = (filename,toLower) => {if(typeof(toLower) == 'undefined') toLower = true;if(/^.*\.[^\.]*$/.test(filename)){var splint = filename.split('?');var ext = splint[0].replace(/^.*\.([^\.]*)$/, "$1");return toLower ? ext.toLowerCase(ext) : ext;} else return "";};
	const filename = (path) => {"use strict";return path.replace(rPath, '');};
	// const filename = (filename,with_ext) => {if( filename.length == 0 ) return "";if(with_ext == '' || with_ext == null) var with_ext = false;var dot = filename.lastIndexOf(".");if( dot == -1 ) return filename;/* var splint = filename.split('.'); */var splint = filename.split('?');var splint2 = splint[0].split('.');var pieces = splint2[0].split("/");var ext = splint2[1];for (var i = 0; i < pieces.length; i++) nameOnly = pieces[i];if(with_ext) return nameOnly.replace('.','') + '.' + ext;else return nameOnly;};
	const getDomain = () => {var e=document.domain.toString().split(".".toString());return e[e.length-2]+"."+e[e.length-1]}
	const safeJSON = (e) => {var u;try{e=e.replace(/(\t|\n|\r|\s)/gi," "),u=JSON.parse(e)}catch(e){u=null}return u}
	const shuffle2 = (arr) => {let currentIndex = arr.length;let temporaryValue, randomIndex;while(0 !== currentIndex){randomIndex = Math.floor(Math.random() * currentIndex);currentIndex -= 1;temporaryValue = arr[currentIndex];arr[currentIndex] = arr[randomIndex];arr[randomIndex] = temporaryValue;}return arr;}
	const handleError = (msg, target, show=true) => {/* if(msg && ("stack" in msg)) msg = msg.stack; */console.log(msg);if(show) {if(target && isElement(target || ( target = $one(target) ))) target.innerHTML = msg;alert(msg);}}
	
	const fixProp = function(prop){let fixed_prop = prop;if (prop === "class") fixed_prop = "className";else if (prop === "checked") fixed_prop = "defaultChecked";else if (prop === "for") fixed_prop = "htmlFor";else if (prop === "style") fixed_prop = "cssText";else fixed_prop = camelize(prop);return fixed_prop;};
	const createElementFromString = (str) => {var el = document.createElement('div');el.innerHTML = str;return el.firstElementChild;};
	const walk = function ( nodeFn, preFn, postFn, node ) {if(nodeFn == undefined ) return;if(node == undefined ) node = document.documentElement;if(node.nodeType == 1) {nodeFn(node);if(node.hasChildNodes() ){if ( preFn !== undefined ) preFn(node);for(var i = 0; i < node.childNodes.length; i++) {walk( nodeFn, preFn, postFn, node.childNodes[i]);}if( postFn !== undefined ) postFn(node);}}};
	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	const contains = (a , b) =>{
		var hasCompare = rnative.test(docElem.compareDocumentPosition);
		return hasCompare || rnative.test(docElem.contains) ?
			function( a, b ){var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains( bup ) : a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16));} : 
			function(a, b) {if(b){while((b = b.parentNode)) {if(b === a) {return true;}}}return false;};
	}
	//const contains = (a , b) =>  a !== b && a.contains(b);
	//const contains = (a, b) => {if (b) {while((b = b.parentNode)) {if(b === a) {return true;}}}return false;};
	const getIframeDocument = (frameId) => {const x = $one(frameId) || $all(frameId)[0];const y = x.contentWindow || x.contentDocument;const z = y.document ? y.document : y;/* alert(z.body.innerHTML); */return z;}
	const swapNode = (nodeA, nodeB) => {const parentA = nodeA.parentNode, siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;nodeB.parentNode.insertBefore(nodeA, nodeB);parentA.insertBefore(nodeB, siblingA);}
	const wrap = (elem, wrapper, attributes) => {elem = $one(elem);if(isElement(wrapper)) {_pbd.attr(wrapper, attributes || { });}else if(isString(wrapper)) {wrapper = tag$1(wrapper, attributes);}else{wrapper = tag$1('div', wrapper);}if(elem.parentNode) elem.parentNode.replaceChild(wrapper, elem);wrapper.appendChild(elem);return wrapper;}
	const replaceWith = (origElem, replacement, attributes) => {
		if(isElement(origElem) && (isString(replacement) || isElement(replacement))){
			var parent = origElem.parentNode;
			if(isString(replacement)) {
				if(replacement.charAt(0) === "<"){
					tempDiv = document.createElement('div');
					tempDiv.innerHTML = replacement;
					replacement = tempDiv.childNodes[0];
					tempDiv = null;
				} else {
					replacement = makeElem({type:replacement, attrs : (attributes && isPlainObject(attributes) ? attributes : null)});
				}
			}
			parent.replaceChild(replacement, origElem);
		}
		return this;
	}
	const loadScripts = function (url){
		return new Promise(function(resolve, reject){
			const script = document.createElement('script');
			script.src = url;
			script.addEventListener("load", function(){resolve(true);});
			document.head.appendChild(script);
		});
	};
	const loadScriptsInOrder = function (arrayOfJs){
		const promises = arrayOfJs.map(function (url){return loadScripts(url);});
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
		if(isElement(favicon)){
			favicon.href = url;
		} else {
			const link = Object.assign(document.createElement('link'), {rel: 'icon', href: url});
			document.head.appendChild(link);
		}
	}
	// setFavicon('path/to/favicon.ico');
	const emojiFavicon = function (emoji){
		const canvas = Object.assign(document.createElement('canvas'), {height: 64, width: 64});
		const ctx = canvas.getContext('2d');
		ctx.font = '64px serif';
		ctx.fillText(emoji, 0, 64);
		
		const url = canvas.toDataURL();
		setFavicon(url);
	}
	//emojiFavicon('📺');
	function sandboxed(code) {
		var frame = document.createElement('iframe');
		document.body.appendChild(frame);
		
		var F = frame.contentWindow.Function,
		args = Object.keys(frame.contentWindow).join();
		
		document.body.removeChild(frame);
		return F(args, code)();
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
	const cleanElementInsert = function( el, child) {if(!el || !child) return false;var cloned = false;if(isArrayLike(el) || isArray(el) || (el.length && el.length > 0)) {clonedNode = [];forEach(el,function(i){clonedNode[i] = child.cloneNode( true );elem = el[i];if(isElement(elem)){while(elem.firstChild){elem.removeChild(elem.firstChild);}elem.appendChild(clonedNode[i]);}});} else {while(el.firstChild){el.removeChild(el.firstChild);}el.appendChild(child);}return this;}
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
		if(attrs && isPlainObject(attrs) && isElement(element) ){Object.assign(element, attrs);}
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
	
	/* var 
	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g, kup,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/, 
	// Support: IE<10
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined;
	$.addEvent = function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = $._data && $._data( elem )||{};

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = $.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if (!(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if(!(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof $ !== core_strundefined && (!e || $.event.triggered !== e.type) ?
					//$.event.dispatch.apply( eventHandle.elem, arguments ) :
					handler.call( eventHandle.elem, ...arguments ) : 
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = $.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = $.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				//needsContext: selector && $.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );
		
			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						console.log(types, type, t, namespaces);
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			$.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	}
	//console.log($qsa(['button', 'img', document]))
	$.addEvent($.one('#discover-button'), 'button.click', e=>{
		console.log(e);
	} , data, selector )  */
	
	const makeElem = (elem) => {
		if( !isPlainObject( elem ) ) return this;
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
		if( elem.atts && isPlainObject(elem.attrs) ) Object.assign(node, elem.attrs);
		if (elem.children.length > 0) {
			elem.children.forEach((function (childElem) {
				node.appendChild(makeElem(childElem));
			}));
		} else if (elem.type !== 'text' && elem.content) {
			node.textContent = elem.content;
		}
		return node;
	};
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
	//Selector containing string (case-sensitive)
    //$("selector:contains('text')");
    function selectorContains(selector, text) {
		var elements = document.querySelectorAll(selector);
		return Array.from(elements).filter(function(element) {
			return RegExp(text).test(element.textContent);
		});
    }
	function getBox(elem){
		let elemHeight, elemWidth, clone = document.createElement(elem.tagName);
		clone.className = elem.className;
		document.body.appendChild(clone);
		elemHeight = clone.offsetHeight || clone.scrollHeight;
		elemWidth = clone.offsetWidth || clone.scrollWidth;
		clone.style.display = 'none';
		document.body.removeChild(clone);
		clone = null;
		
		return {width: elemWidth, height: elemHeight}
	}
	function findFragmentContent( content,  selector) {
		var target, fragment = document.createDocumentFragment(),
		tmp = document.createElement("div");
		tmp.innerHTML = content;
		fragment.appendChild(tmp);
		if(target = $all(selector, fragment) ) {
			//console.log(target, _pbd.type(fragment), _pbd.type(document))
			fragment = tmp = null;
			content = target[0].innerHTML;
			//content = target[0]?.innerHTML??content;
		} else {fragment = tmp = null;}
		return content;
	}

	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}
	
	function getClass( elem ) {return elem.getAttribute && elem.getAttribute( "class" ) || "";}

	function classesToArray( value ) {
		if ( Array.isArray( value ) ) {
			return value;
		}
		if ( typeof value === "string" ) {
			return value.match( rnothtmlwhite ) || [];
		}
		return [];
	}
	const $all = (selector, context,root) => {
		if(context){
			if(context[0] && isElement(context[0])) {context = context[0];}
			else if(context[0] && context[0][0] && isElement(context[0][0])) {context = context[0][0];}
		}
		var m, i, elem, match, newContext = context && context.ownerDocument,
		nodeList, list = [];
		
		if(isElement(selector)/* selector === Object(selector)&&selector.nodeType&&selector.nodeType === 1||selector.nodeType === 9 */) {
			selector = (context && isObject(context) && (!isElement(context)||context!==document)) ? Object.assign(selector, context) : selector;
			return [selector];
			//return isArray(selector) || isArrayLike(selector) ? selector:[selector];
		} else if(isArray(selector) && selector.length > 0) {
			selector.forEach(elem=>{
				/* if(isString(elem)) console.log(elemelem.every(e => isElement(e))) */
				elem = isElement(elem) ? elem : (isString(elem) && (elem.match(/^.*#/) || elem.match(/^#/)) ? $all(elem) : '');
				if(isArray(elem) || isElement(elem)) {
					if(context && isObject(context) && (!isElement(context)||context!==document)) Object.assign(elem, context);
					if(isArray(elem)) {
						list.push(...elem);
					} else {
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
			return list;
		} else {
			//context = isElement(context) ? context : ((isArray(context)&&context.length>0) ? context : document); //context = context || document;
			context = (isElement(context) || isDocument(context) || isADocument(context) || (isArray(context) && context.length > 0)) ? context : document; //context = context || document;
			nodeType = context && ('nodeType' in context) ? context.nodeType : 9;// nodeType defaults to 9, since context defaults to document
			if(!isArray(context) && nodeType !== 11 && (match = rquickExpr.exec(selector))){
				if(m = match[1]) {
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
					nodeList = getBy( "all", selector, context );// nodeList = context.querySelector( selector );
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
					//list = _pbd().find(selector);
				}
			}
			//if(list.length === 0)console.log('$all function test',selector, context,list)
		}
		return list;
	};
	const $one = (selector,context,whichOne) => {
		//return (context || document).querySelector(selector);
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
	
	//const $one = (selector,context) => {return _typeof(selector) === "string" && $all(selector,context)[0] && _typeof($all(selector,context)[0]) === "object" ? $all(selector,context)[0] : typeof(selector) === "object" ? selector : false;/* context = context || document;return typeof(selector) === "string" ? context.querySelector(selector) : typeof(selector) === "object" ? selector : false; */}
	const $id = (id) => {return getBy('id',id);}
	var _toggleClass = function(elem, className){
		var classNames = rspace.test(className) || className.indexOf(' ') >= 0 ? className.split(" ") : rcomma.test(className) ? className.split(",") : null;
		try{
			if( classNames && isArray(classNames) && classNames.length >= 2){
				if(elem.classList){
					var cName1 = classNames[0].trim().replace(',', ''), cName2 = classNames[1].trim().replace(',', '');
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
	if (isXPathAvailable) {
		document._getElementsByXPath = function(expression, parentElement) {
			var results = [];
			var query = document.evaluate(expression, $(parentElement) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0, length = query.snapshotLength; i < length; i++)
				results.push( query.snapshotItem(i) );
				// results.push(Element.extend(query.snapshotItem(i)));
			return results;
		};
	}
	const getBy = (_by, _selector,_context,one,idx=0) => {
		try{
			var by,context,selector,_ret,allowed = ["id","class","tag","name","all","query","query-one","queryOne"];
			_by = ( _typeof(_by) === "string" && inArray(_by.toLowerCase(),allowed) ? _by : "id" ).toLowerCase();
			selector = _by === "id" ? _selector.replace("#","") : _by === "class" ? _selector.replace(".","") : _selector.trim();
			context = ((isElement( _context ) && ( _by !=="id" || _by !== "xpath" )) || isADocument(_context)) ? _context : document;
			by = _by === "id" ? "getElementById" : _by === "class" ? "getElementsByClassName" : _by === "tag" ? "getElementsByTagName" : _by === "name" ? "getElementsByName" : _by === "xpath" ? "evaluate" : (_by === "query" || _by === "query-one" || _by === "queryOne" ) ? "querySelector" : "querySelectorAll";
			_ret = _typeof(selector) === "string" ? ( ( _by === "id" || _by === "query-one" || _by === "queryOne" || _by === "query") ? context[by](selector) : _by === "xpath" ?  context[by](selector, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null) : Array.from( context[by](selector) ) ) : selector;
			if(one && isArray(_ret)) _ret = isNumber(idx) && _ret[idx] || _ret[0];//&& isElement(_ret[idx])
			return _ret;
		} catch (e){
			return [context, selector];// alert(e.stack);
		}
	};
	
	/* var _pbd = function(selector,context) {
		this.selector = selector || null;
		this.context = context || document;
		this.nodes = null;
		this.currentIndex = 0;
		this.selectedNode = null;
		this.coreConfig = {};
		this.eventConfig = {};
		
		if(!selector) return this;
	}; */
	
	var _pbd = function(selector, context) {
		return new _pbd.fn.init(selector, context);
	}
	
	_pbd.fn = _pbd.prototype = {
		constructor: _pbd,
		guid:0,
		activeRequests : 0,
		prevObj : this,
		isElement: isElement, 
		/**
		* Convert array-like or iterable object to an array.
		* @param {*} value - The value to convert.
		* @returns {Array} Returns a new array.
		*/
		toArray: function(obj) {return Array.from && Array.from(obj) || slice.call(obj);},
		toArray2: function(obj) {
			if(isObject(obj)){
				return slice.call( obj || this );
			} else {
				// convert comma separated string to an array. eg : obj = "One, Two, Three, Four, Five";
				let separatedArray = [];
				let previousIndex = 0;
				for(i = 0; i < obj.length; i++) {
					if (obj[i] == ', ') {
						separated = obj.slice(previousIndex, i);
						separatedArray.push(separated);
						previousIndex = i + 1;
					}
				}
				separatedArray.push(obj.slice(previousIndex, i));
				return separatedArray
			}
			return this;
		},
		/* toArray: function(obj, offset) {
			var args = [];
			// This is necessary for IE8
			if (isNumber(offset)) {
				args.push(offset);
			}

			return args.slice.apply(obj, args);
		},  */
		toString : function (obj, prettify){
			try{
				return prettify === true ? JSON.stringify(obj, null, "\t") : JSON.stringify(obj)
			} catch(e){
				try{
					return _pbd.serializeObj(obj);
				} catch(e2){
					return obj
				}
			}
		},
		ready: function (fn) {
			if (typeof fn !== 'function') return;
			if (document.readyState === 'interactive' || document.readyState === 'complete') {return fn();}
			document.addEventListener('DOMContentLoaded', fn, false);
		},
		//inCollection : function(element) {return Array.from(this).includes(element)},
		inCollection : function(element) {return this.nodes.includes(element)},
		addToCollection : function(element) {
			const elements = element.length !== undefined ? element : [element];
			Array.from(elements).forEach(element => {
				//if (element && !this.has(element)) {Array.prototype.push.call(this, element)}
				if (element && !this.inCollection(element)) {this.nodes.push.call(this, element)}
			});
			return this;
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
		getActiveElem: function (){var cElem = isElement(this.nodes[ this.currentIndex ]) ?  this.nodes[ this.currentIndex ] : isElement(this.nodes[ 0 ]) ?  this.nodes[ 0 ] : this.nodes; this.selectedNode = cElem; return cElem;},
		eq : function(num){var el = this.nodes;index = num != null ? ( num < 0 ? el[ num + el.length ] : el[ num ] ) : slice.call( this.nodes );this.nodes = index;return this;},
		index: function ( num ) {
			num = num || this.currentIndex;
			el = num && isElement( this.nodes[ num ] ) ? this.nodes[ num ] : isElement( this.nodes ) ? this.nodes : this.nodes[ this.currentIndex ];
			if (!el) return -1;
			var i = 0;
			do {
				i++;
			} while (el = el.previousElementSibling);
			return i;
		},
		// mark each child node with its position (for nth calls)
		// "ofType" flag indicates whether we're indexing for nth-of-type
		// rather than nth-child
		index2 : function(parentNode, reverse, ofType) {
			var i = 0, j = 1, num = this.currentIndex,
			parentNode = parentNode && isElement(parentNode) ? parentNode : ( isElement( this.nodes[ num ] ) ? this.nodes[ num ] : isElement( this.nodes ) ? this.nodes : this.nodes[ 0 ] );
			if (!parentNode) return -1;
			var nodes = parentNode.childNodes;
			parentNode._countedByPrototype = emptyFn;
			if (reverse) {
				for ( i = nodes.length - 1; i >= 0; i--) {
					var node = nodes[i];
					if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
				}
			} else {
				//for (var i = 0, j = 1, nodes = parentNode.childNodes; node = nodes[i]; i++){
				for ( ; j = 1, node = nodes[i]; i++){
					if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
				}
			}
			return j;
		},
		getCIndex: function(){return this.currentIndex;},
		setCIndex: function(index){return this.currentIndex = isNumber(index) ? index : 0;},
		//merge : merge,
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
			// Build a new jQuery matched element set
			var ret = _pbd.merge( this.constructor(), elems );
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			// Return the newly-formed element set
			return ret;
		},
		// element filters
		each3 : function (arr, callback) {
			if(arr && isFunction( arr) ){callback = arr;arr = null;}
			if (!callback || !isFunction(callback ) ) return;
			if( arr && ( isArray( arr ) || isArrayLike( arr ) ) ){
				if(isArray(arr)) {arr.forEach(callback, i, arr);}
				else if(isArrayLike(arr)) {_pbd.forEach(arr, callback , this);}
			} else {
				if(!isArray(this.nodes)) {this.nodes = this[ 0 ] = [this.nodes];}
				for(var i = 0; i < this.nodes.length; i++) {
					if(isDocument(this.nodes[i]) || isWindow(this.nodes[i]) || isElement(this.nodes[i])) {
						callback(this.nodes[i], i);
					}
				}
			}
			return this;
		},
		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each2: function( callback, args ) {return _pbd.each( this, callback, args );},
		each: function( callback, args ) {
			return _pbd.forEach(this.nodes, callback, args );
		},
		animate : function(params = {}, speed){
			var _elem, _this = this;
			if(isArray(params)){
				for(var i = 0, l = this.nodes.length;i<l;i++){
					_elem = this.animation.keyframes(this.nodes[ i ], params, isPlainObject(speed) ? speed : {});
					this.nodes[ i ] = this[ i ] = _elem;
					//elem.animate(params, isPlainObject(speed) ? speed : {});
				}
			} else {
				this.each(function (elem){
					elem.style.transition = 'all ' + ( speed || _this.animation.animConfig.speeds._default ) + 'ms';
					//if(_typeof(params) === "string") elem.style.cssText += params;
					//else Object.keys(params).forEach((key) => {elem.style[key] = params[key];});
					if(_typeof(params) === "string") _pbd.style(elem, params);
					else Object.keys(params).forEach((key) => {_pbd.style(elem, key, params[key])});
				});
			}
			return this;
		},
		addClass : function(className){
			if(isString(className)) {
				var _this = this, classNames = rspace.test(className) || className.indexOf(' ') >= 0 ? className.split(" ") : rcomma.test(className) ? className.split(",") : null;
				if(isArray(this.nodes)){
					this.each(function(elem){
						//if(!elem || !className || (elem.className && elem.className.search(new RegExp("\\b" + className + "\\b")) != -1))
						if(classNames && isArray(classNames) && classNames.length >= 2){
							for(var x =0;x<classNames.length;x++){
								var cName = classNames[x].trim().replace(',', '');
								if(cName !== "" && !_this.hasClass(cName, elem)){elem.classList.add(cName);}
							}
						} else if(!_this.hasClass(className, elem)) {elem.classList ? elem.classList.add(className) : elem.className += (elem.className ? " " : "") + className;}
					});
				} else {
					if(classNames && isArray(classNames) && classNames.length >= 2){
						for(var x =0;x<classNames.length;x++){
							var cName = classNames[x].trim().replace(',', '');
							if(cName !== "" && !this.hasClass(cName, this.nodes)){this.nodes.classList.add(cName);}
						}
					} else if(!this.hasClass(className, this.nodes)) this.nodes.classList ? this.nodes.classList.add(className) : this.nodes.className += (this.nodes.className ? " " : "") + className;
				}
			}
			return this;
		},
		removeClass : function( className){
			if(isString(className)) {
				var _this = this, classNames = rspace.test(className) || className.indexOf(' ') >= 0 ? className.split(" ") : rcomma.test(className) ? className.split(",") : null;
				if(isArray(this.nodes) || isArrayLike(this.nodes)){
					this.each(function (elem){
						if(classNames && isArray(classNames) && classNames.length >= 2){
							for(var x =0;x<classNames.length;x++){
								var cName = classNames[x].trim().replace(',', '');
								if(cName !== "" && _this.hasClass(cName, elem)){
									if(elem.classList) elem.classList.remove(cName);
									//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
									else elem.className = elem.className.replace(new RegExp("(^|\\b)" + cName.split(" ").join("|") + "\\b|$", "gi"), " ");
								}
							}
						} else if(_this.hasClass(className, elem)){
							if(elem.classList) elem.classList.remove(className);
							//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
							else elem.className = elem.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "\\b|$", "gi"), " ");
						}
					});
				} else {
					if( classNames && isArray(classNames) && classNames.length >= 2){
						for(var x =0;x<classNames.length;x++){
							var cName = classNames[x].trim().replace(',', '');
							if(cName !== "" && this.hasClass(cName, this.nodes)){
								if(this.nodes.classList) this.nodes.classList.remove(cName);
								//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
								else this.nodes.className = this.nodes.className.replace(new RegExp("(^|\\b)" + cName.split(" ").join("|") + "\\b|$", "gi"), " ");
							}
						}
					} else if (this.hasClass(className, this.nodes)) {
						if(this.nodes.classList) this.nodes.classList.remove(className);
						//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
						else this.nodes.className = this.nodes.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "\\b|$", "gi"), " ");
				    }
				}
			}
			return this;
		},
		toggleClass : function(className){
			if(isString(className)){
				if(isArray(this.nodes)){
					//this.each(function (elem){_toggleClass(elem, className);});
					_pbd.forEach(this.nodes, function(elem){_toggleClass(elem, className);});
				} else {
			    	_toggleClass(this.nodes, className);
			    }
			}
			return this;
		},
		hasClass: function( _class, elem) {
			var className = " " + _class + " ",i = 0, l = this.nodes.length;
			if(elem && isElement(elem)){
				if(_typeof(elem.classList) !== "undefined" && elem.classList.contains(className)){
					return true;
				} else if (elem.nodeType === 1 && (" " + elem.className + " ").replace(rclass, " ").indexOf(className) >= 0){
					return true;
				}
			} else {
				for ( ; i < l; i++ ) {
					if(this.nodes[i] && isElement(this.nodes[i])){
						if(_typeof(this.nodes[i].classList) !== "undefined" && this.nodes[i].classList.contains(className)){
							return true;
						} else if (this.nodes[i].nodeType === 1 && (" " + this.nodes[i].className + " ").replace(rclass, " ").indexOf(className) >= 0){
							return true;
						}
					}
				}
			}
			return false;
		},
		css2: function(name, value) {
			//return access( this, function( elem, name, value ) {
			return this.each(function(elem) {
				var styles, len, map = {}, i = 0;
				console.log(elem, name, value)
				if(Array.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for ( ; i < len; i++ ) {
						map[name[i]] = _pbd.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? _pbd.style(elem, name, value) : _pbd.css(elem, name);
			});
			//}, name, value, arguments.length > 1 );
		}, 
		css : function(name, value){
			if(!isArray(this.nodes)){this.nodes = [this.nodes];}
			var ret,  _this = this, elem = this.nodes, camelized = isString(name) ? _pbd.camelize(name) : '', index = this.currentIndex;
			
			if(isPlainObject(name)){
				_pbd.styleElement(this.nodes, name);
				return this;
			} else if(isFunction(name)){
				//_pbd.styleElement(this.nodes, name);
				return this;
			} else if(value !== undefined){
				this.each(function(el){
					_pbd.style(el, name, value);
					/*if(el.style[camelized]) {el.style[camelized] = value;}
					else if(el.style[name]) {el.style[name] = value;}
					else {el.style.setProperty(name,value);el.style.cssText += `${name}:${value};`;}*/
				});
				return this;
			} else {
				if(isElement(this.nodes[index])){
					//ret = (this.nodes[index].style && this.nodes[index].style[camelized]) ? this.nodes[index].style[camelized] : _pbd.get.styleProp(this.nodes[index],name);
					ret = _pbd.css(this.nodes[index], name);
				} else {
					//_pbd.each(elem,function(i){
					for(var i=0;i<this.nodes.length;i++){
						//if(index == i) ret = (_this.nodes[i].style && _this.nodes[i].style[camelized]) ? _this.nodes[i].style[camelized] : _pbd.get.styleProp(_this.nodes[i],name);
						if(index === i) {
							ret = _pbd.css(this.nodes[i], name);
							continue;
						}
					}
					//});
				}
				return ret;
			}
		},
		/**
		 * Filter the current collection by a selector or filter function
		 * @param  {String|Function} selector
		 * @return {this}
		*/
		filter: function (selector){
			return Array.from(this.nodes).filter(typeof selector === "function" ? selector : x => x.classList.contains(selector) || x.matches(selector));
		},
		/**
		 * Find descendants of the current collection matching a selector
		 * @param  {String} selector
		 * @return {this}
		*/
		find2 (selector) {
			return Array.from(this.nodes).reduce((carry, element) => carry.add(element.querySelectorAll(selector)), Object.create(_pbd.prototype))
		},
		find : function(selector){
			var foundElements = [];
			for (var i = 0; i < this.nodes.length; i++) {
				/* var found = this.nodes[i].querySelectorAll(selector); */
				if(!isWindow(this.nodes[i]) && isElement(this.nodes[i])){
					var found = $all(selector, this.nodes[i]);
					for (var j = 0; j < found.length; j++) {
						if(isElement(found[j])) foundElements.push(found[j]);
					}
				}
			}
			this.prevObj = _pbd.merge(this.nodes,foundElements);
			//this[0] = this.nodes = foundElements;
			this.nodes = foundElements;
			this[0] = foundElements[0];
			this.length = this.nodes.length;
			return this;
		},
		is: function (otherEl){return this.nodes[ this.currentIndex ] === otherEl;},
		contains: function (otherEl){return contains()(this.nodes[ this.currentIndex ], otherEl);},
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		//Matches Selector
		//JQUERY
		//$(el).is('.my-class');
		matches : function(selector) {
			return isString(selector) ? (this.nodes[ this.currentIndex ].matches || this.nodes[ this.currentIndex ].matchesSelector || this.nodes[ this.currentIndex ].msMatchesSelector || this.nodes[ this.currentIndex ].mozMatchesSelector || this.nodes[ this.currentIndex ].webkitMatchesSelector || this.nodes[ this.currentIndex ].oMatchesSelector).call(this.nodes[ this.currentIndex ], selector) : 
				this.nodes[ this.currentIndex ] === selector;
		},
		closest : function (el, selector) {
			this.each(function(el){
				const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
				while (el) {
					if (matchesSelector.call(el, selector)) {
						return el;
					} else {
						el = el.parentElement;
					}
				}
			});
			return this;
		},
		nodes: function (){return this.nodes || this[0];},
		/* 
		For all nodes: parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.
		For element nodes only: parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling.
		 */
		// element node select
		child: function ( num ){
			var elem = this.getActiveElem();
			var children = ( elem.children || elem.childNodes || elem.parentElement.children );
			this.nodes = children;
			if(!isNil( num )){
				if(_typeof( num ) === "string"){
					this.nodes = num === "first" ? (elem.firstElementChild || elem.firstChild) : num === "last" ? (elem.lastElementChild || elem.lastChild) : (elem.children[0] || elem.childNodes[0]);
				} else if(isNumber( num )){
					this.nodes = isArrayLike(children) && isElement(children[ num ]) ? children[ num ] : children[ 0 ];
				}
			}
			this[0] = this.nodes;
			return  this;
		},
		/**
		 * Get a collection containing the immediate children of the
		 * current collection, optionally filtered by a selector
		 * @param  {String|undefined} selector
		 * @return {this}
		*/
		children : function(selector) {
			//var elem = this.getActiveElem();
			//this[0] = this.nodes = elem.children || elem.childNodes || elem.parentElement.children;
			this[0] = this.nodes = Array.from(elem).reduce((carry, element) => carry.concat(...element.children), []).filter(element => !selector || element.matches(selector))
			return  this;
		},
		first: function (){
			//var elem = this.getActiveElem();
			//this[0] = this.nodes = elem.firstElementChild || elem.firstChild;
			let nodes = [];
			this.each(function(elem){
				var _first = elem.firstElementChild || elem.firstChild || null;
				if(isElement(_first)){
					nodes.push(_first);
				}
			});
			if(isArray(nodes) && nodes.length > 0){
				this.nodes = this[0] = [...nodes];
			}
			return  this;
		},
		//first: function() {return this.eq( 0 );},
		last: function (){
			//var elem = this.getActiveElem();
			//this[0] = this.nodes = elem.lastElementChild || elem.lastChild;
			let nodes = [];
			this.each(function(elem){
				var _last = elem.lastElementChild || elem.lastChild || null;
				if(isElement(_last)){
					nodes.push(_last);
				}
			});
			if(isArray(nodes) && nodes.length > 0){
				this.nodes = this[0] = [...nodes];
			}
			return  this;
		},
		//last: function() {return this.eq( -1 );},
		next: function(){
			//var elem = this.getActiveElem();
			let nodes = [];
			this.each(function(elem){
				var _next = elem.nextElementSibling || elem.nextSibling || null;
				if(isElement(_next)){
					nodes.push(_next);
				}
			});
			if(isArray(nodes) && nodes.length > 0){
				this.nodes = this[0] = [...nodes];
			}
			return this;
		},
		parent: function(){
			var elem = this.getActiveElem();
			if(isElement(elem)){
				let _parent = [elem.parentElement || elem.parentNode];
				this.nodes = _parent;
				this[0] = _parent[0];
			}
			return  this;
		},
		parents: function (selector){
			//var elem = this.getActiveElem();
			const parents = Array.from(this.nodes, x => x.closest(selector));
			this.nodes = parents;
			this[0] = parents[0];
			return this;
		},
		prev: function (){
			//var elem = this.getActiveElem();
			let nodes = [];
			this.each(function(elem){
				var _prev = elem.previousElementSibling || elem.previousSibling || null;
				if(isElement(_prev)){
					nodes.push(_prev);
				}
			});
			if(isArray(nodes) && nodes.length > 0){
				this.nodes = [...nodes];
				this[0] = nodes[0];
			}
			//return i && this[i].previousElementSibling ? this[i].previousElementSibling : this.nodes[ this.currentIndex ].previousElementSibling;
			//this[0] = this.nodes = elem.previousElementSibling || elem.previousSibling;
			return  this;
		},
		siblings : function () {
			var elem = this.getActiveElem();
			// Setup siblings array and get the first sibling
			var siblings = [];
			var sibling = elem.parentNode.firstChild;
			// Loop through each sibling and push to the array
			while (sibling) {
				if (sibling.nodeType === 1 && sibling !== elem) {
					siblings.push(sibling);
				}
				sibling = sibling.nextSibling
			}
			this.nodes = siblings;
			this[0] = siblings[0];
			/*Array.prototype.filter.call(elem.parentNode.children, function(child){return child !== el;}); */
			/* const siblings = Array.from(elem.parentNode.children).filter(x => x !== ele); */
			return this;
		},
		siblings: function(){
			var el = this.getActiveElem();
			// Native - latest, Edge13+
			const _sibling = [...el.parentNode.children].filter(child => child !== el);
			// Native (alternative) - latest, Edge13+
			//const _sibling = Array.from(el.parentNode.children).filter(child => child !== el);
			// Native - IE10+
			//const _sibling = Array.prototype.filter.call(el.parentNode.children, child => child !== el);
			this.nodes = _sibling;
			this[0] = _sibling[0];
			return this;
		}, 	
		// element placement
		after: function(elem){
			this.each(function (el){
				if(isElement(elem)) el.insertAdjacentElement('afterend', elem);
			});
			return this;
		},
		before: function(elem){
			this.each(function (el){
				if(isElement(elem)) el.insertAdjacentElement('beforebegin', elem);
			});
			return this;
		},
		append: function(newContent){
			this.each((parent)=> {
				if(isElement(parent)){
					if(parent.append && (isArray(newContent) || (isString(newContent) && newContent.charAt(0) !== "<"))){
						// Native (ES6-way): unified syntax
						if(isArray(newContent)){
							let tmpArray = [];
							//newContent = newContent.filter(nc => isElement(nc) || (isString(nc) && nc.charAt(0) !== "<"))
							_pbd.forEach(newContent, nc => {
								if(isString(nc)) {
									if(nc.charAt(0) === "<" || rTag.test(nc)) {
										nc = createElementFromString(nc);
									} else nc = document.createTextNode(nc);
								}
								if(isElement(nc)) tmpArray.push(nc);
							});
							newContent = tmpArray;
						} else {
							newContent = [newContent];
						}
						parent.append(...newContent);
					} else {
						// Native: different syntax
						if(isArray(newContent)){
							_pbd.forEach(newContent, nc => {
								if(isString(nc) && (nc.charAt(0) === "<" || rTag.test(nc))) parent.insertAdjacentHTML('beforeend', nc);
								else if(isElement(nc)) parent.insertBefore(nc, parent.firstChild);
							});
						} else if(isString(newContent)){
							parent.insertAdjacentHTML('beforeend', newContent);
						} else {
							//parent.insertAdjacentElement('beforeend', newContent);
							parent.appendChild(newContent);
						}
					}
				}
			});
			/* if(isArray(this.nodes)){
			} else if(isElement(this.nodes)){
				if(isString(newContent) && newContent.charAt(0) !== "<" && this.nodes.append){
					// Native (ES6-way): unified syntax
					this.nodes.append(newContent);
				} else {
					// Native: different syntax
					if(_typeof(newContent) === "string"){
						this.nodes.insertAdjacentHTML('beforeend', newContent);
					} else {
						this.nodes.insertAdjacentElement('beforeend', newContent);
					}
				}
			} */
			return this;
		}, 
		appendTo: function(elem){
			this.each((parent) => {
				this.$$(elem).append(parent);
			});
			return this;
		},
		prepend: function(newContent){
			this.each((parent)=> {
				if(isElement(parent)){
					if(parent.prepend && (isArray(newContent) || (isString(newContent) && newContent.charAt(0) !== "<"))){
						// Native (ES6-way): unified syntax
						if(isArray(newContent)){
							let tmpArray = [];
							//newContent = newContent.filter(nc => isElement(nc) || (isString(nc) && nc.charAt(0) !== "<"))
							_pbd.forEach(newContent, nc => {
								if(isString(nc)) {
									if(nc.charAt(0) === "<" || rTag.test(nc)) {
										nc = createElementFromString(nc);
									} else nc = document.createTextNode(nc);
								}
								if(isElement(nc)) tmpArray.push(nc);
							});
							newContent = tmpArray;
						} else {
							newContent = [newContent];
						}
						parent.prepend(...newContent);
					} else {
						// Native: different syntax
						if(isArray(newContent)){
							_pbd.forEach(newContent, nc => {
								if(isString(nc) && (nc.charAt(0) === "<" || rTag.test(nc))) parent.insertAdjacentHTML('afterbegin', nc);
								else if(isElement(nc)) parent.insertBefore(nc, parent.firstChild);
							});
						} else if(isString(newContent)){
							parent.insertAdjacentHTML('afterbegin', newContent);
						} else {
							//parent.insertAdjacentElement('afterbegin', newContent);
							parent.insertBefore(newContent, parent.firstChild);
						}
					}
				}
			});
			return this;
		},
		wrap: function(wrapper, attributes) {
			return this.each(function(elem){
				if(isElement(wrapper)) _pbd.setAttr(wrapper, attributes || {});
				else if (isString(wrapper)) wrapper = new Element(wrapper, attributes);
				else wrapper = new Element('div', wrapper);
				if(elem.parentNode) elem.parentNode.replaceChild(wrapper, elem);
				wrapper.appendChild(elem);
				return wrapper;
			});
		},
		empty: function(){
			var elem, i = 0;
			for (; (elem = this.nodes[i]) != null; i++ ) {
				// Remove element nodes and prevent memory leaks
				if (elem.nodeType === 1 ) {
					//jQuery.cleanData( getAll( elem, false ) );
					// _pbd.purge( elem );
					elem.innerHTML = "";
					elem.textContent = "";
				}
				// Remove any remaining nodes
				while ( elem.firstChild ) {
					elem.removeChild( elem.firstChild );
				}
				// If this is a select, ensure that it displays empty (#12336)
				if ( elem.options && elem.nodeName === "select" ) {
					elem.options.length = 0;
				}
			}
			return this;
		},
		remove: function(val){
			if(isString(val)){
				if(isSelector(val)){
					val = this.$$(val);
				} else if(rsingleTag.test(val)){
					val = "";
				}
			}
			this.each(function(elem){
				if(!val || val === "" || _typeof(val) ==="undefined" && elem.parentNode) {
					elem.parentNode.removeChild(elem);
					elem = null;
				} else if(isElement(val) && elem.contains(val) ){
					elem.removeChild(val);
				}
			});
			return this;
		},
		// removes whitespace-only text node children
		removeEmptyTextnode: function(){
			this.each(function(elem){
				//element = $(element);
				var node = elem.firstChild;
				while (node) {
					var nextNode = node.nextSibling;
					if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) elem.removeChild(node);
					node = nextNode;
				}
				//return element;
			})
			return this;
		},
		// content getters / setters
		html: function(value){
			"use strict";
			var elem,ret = "", el=false,append=false,sTargetId=null,sIndex=0;
			if(arguments.length > 1){
				if(arguments.length === 2){
					if( _typeof( arguments[1] ) === "object" ){
						if( "targetId" in arguments[1] ) sTargetId = arguments[1].targetId;
						if( "elementId" in arguments[1] ) el = arguments[1].elementId;
						if( "elementIndex" in arguments[1] ) sIndex = arguments[1].elementIndex;
						if( "appendContent" in arguments[1] ) append = arguments[1].appendContent;
					} else sTargetId = arguments[1];
				} else if(arguments.length === 3){
					sTargetId = arguments[1];el = arguments[2];
				} else if(arguments.length === 4){
					sTargetId = arguments[1];el = arguments[2];sIndex = arguments[3];
				} else if(arguments.length === 5){
					sTargetId = arguments[1];el = arguments[2];sIndex = arguments[3];append = arguments[4];
				}
			}
			elem = isObject(el) && isElement(el) ? el : isString(el) ? $all(el) : this.nodes;
			// append = (typeof apd !== 'undefined') ? apd : false;
			if( !value || value === "" || value === null || typeof value === 'undefined') {
				if(elem && elem.length && elem.length>0){
					if(sIndex && isElement(elem[sIndex])){
						ret = elem[sIndex].innerHTML;
					} else {
						for(var i =0;i<elem.length;i++) {
							if(isElement(elem[i])){
								if(elem[i].nodeName.toLowerCase() === "iframe") var el = _pbd.get.iframeDocument(elem[i]).body;
								else var el = elem[i];
								ret += el.innerHTML;
							}
						}
					}
					var content = append ? ret : isElement(elem[ sIndex || 0]) ? elem[ sIndex || 0 ].innerHTML : "";
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
				if( isArray(elem) && elem.length > 0 ){
					if( _typeof(value) === "string" /* && !rnoInnerhtml.test( value ) */) value = value.replace( rxhtmlTag, "<$1></$2>" );
					if(sIndex && isElement(elem[sIndex])){
						if(elem[sIndex].nodeName.toLowerCase() === "iframe") {
							var el = _pbd.get.iframeDocument(elem[sIndex]).body;
						} else var el = elem[sIndex];
						if( isElement(el)){
							if(isElement(value)) el.appendChild(value);
							else if(isPlainObject(value)) Object.assign(el, value);
							else append ? el.innerHTML += value : el.innerHTML = value;
						}
					} else {
						for (var i = 0; i < elem.length; i++) {
							if(isElement(elem[i])) {
								if(elem[i].nodeName.toLowerCase() === "iframe") {
									var el = _pbd.get.iframeDocument(elem[i]).body;
								} else var el = elem[i];
								if ( el.nodeType === 1 ) {
									if(isElement(value)) el.appendChild(value);
									else if(isPlainObject(value)) Object.assign(el, value);
									else append ? el.innerHTML += value : el.innerHTML = value;
								}
							}
						}
					}
				} else {
					if(isElement(elem)) {
						if(elem.nodeName.toLowerCase() === "iframe") elem = _pbd.get.iframeDocument(elem).body;
						if ( elem.nodeType === 1 ) {
							if(isElement(value)) elem.appendChild(value);
							else if(isPlainObject(value)) Object.assign(elem, value);
							else append ? elem.innerHTML += value : elem.innerHTML = value;
						}
					}
				}
				elem = 0;
				value = '';
				return this;
			}
		},
		outerHtml: function(value){
			var ret;
			if( !value || value === "" || value === null || typeof value === 'undefined') {
				if(this.nodes && this.nodes.length && this.nodes.length>0 && isElement(this.nodes[0])){
					ret = this.nodes[0].outerHTML;
				} else ret = this.nodes.outerHTML;
				return ret;
			} else {
				if( isArray (this.nodes) ){
					this.each(function (elem){
						elem.outerHTML = value;
					});
				} else this.nodes.outerHTML = value;
			}
			return this;
		},
		text: function(value){
			var ret;
			if( !value || value === "" || value === null || typeof value === 'undefined') {
				if(this.nodes && this.nodes.length && this.nodes.length>0 && isElement(this.nodes[0])){
					ret = this.nodes[0].textContent;
				} else ret = this.nodes.textContent;
				return ret;
			} else {
				if( isArray (this.nodes) ){
					this.each(function (elem){
						elem.textContent = value;
					});
				} else this.nodes.textContent = value;
			}
			return this;
		},
		src: function(value){
			var ret;
			if( !value || value === "" || value === null || typeof value === 'undefined') {
				if(this.nodes && this.nodes.length && this.nodes.length>0 ){
					ret = this.nodes[0].src;
				} else ret = this.nodes.src;
				return ( isAudioElement(ret) || isVideoElement(ret) || isImageElement(ret) ) ? ret : null;
			} else {
				if( isArray (this.nodes) ){
					this.each(function (elem){
						if( isAudioElement(elem) || isVideoElement(elem) || isImageElement(elem) ) elem.src = value;
					});
				} else if( isAudioElement(this.nodes) || isVideoElement(this.nodes) || isImageElement(this.nodes) ) this.nodes.src = value;
			}
			return this;
		},
		/**
		* Accepts a form input element and returns its value
		*/
		val: function(value, minOrMax){
			"use strict";
			minOrMax = minOrMax || false;
			var rreturn = /\r/g;
			var hooks, ret, valueIsFunction, elem = this[ 0 ], elem = this.getActiveElem();
			
			if(!arguments.length ){
				if(elem && isElement(elem)){
					/* if(value !== undefined && elem.value !== undefined){
						elem.value = value;
						return this;
					} */
					
					if(elem.nodeName.toUpperCase() == 'SELECT'){
						var options = elem.options,index = elem.selectedIndex, one = elem.type === 'select-one' || index < 0,values = one ? null : [],value,_value;
						for (var i = 0, len = options.length; i < len; i++ ) {
							if ((options[i].selected || i === index) && !options[i].disabled){
								value = !options[i].value ? options[i].text : options[i].value;
								if(one){
									return value;
								}
								_value = {i: value}
								values.push(_value);
							}
						}
						return minOrMax ? (minOrMax === "min" ? _pbd.get.minOfArray(values) : minOrMax === "max" ? _pbd.get.maxOfArray(values) : values[0]) : values;
					} else {
						//ret = elem.value;
						ret = (('value' in elem) || elem.value) ? elem.value : null;
						
						return typeof ret === "string" ?
							// Handle most common string cases
							ret.replace( /\r/g, "" ) :
							// Handle cases where value is null/undef or number
							ret == null ? "" : ret;
					}
				}
				return;
			}
			
			valueIsFunction = isFunction(value);
			
			this.each(function(elem, i){
				var val;

				if(elem.nodeType !== 1){
					return;
				}

				if(valueIsFunction){
					val = value.call(this, i, _pbd(elem).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if(val == null){
					val = "";
				} else if (typeof val === "number"){
					val += "";
				} else if(Array.isArray(val)){
					//val = jQuery.map( val, function( value ) {return value == null ? "" : value + "";});
					val = minOrMax === "min" ? _pbd.get.minOfArray(val) : minOrMax === "max" ? _pbd.get.maxOfArray(val) : val[0]
				}
				
				if(elem.nodeName.toUpperCase() == 'SELECT'){
					var options = elem.options, index = elem.selectedIndex;
					for(var i = 0,len = options.length;i < len;i++){
						if((options[i].selected || i === index) && !options[i].disabled){
							options[i].value = val;
						}
					}
				} else {
					elem.value = val;
				}
			});
			return this;
		},
		value: function (content) {
			var ret;
			//var node = this.nodes || this[0];
			//if (!node) return content ? this : void 0;
			this.each(function(node){
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
			
			//return isElement( ret ) && ret.hasAttribute("value") ? ret.getAttribute("value") : ret.value ? ret.value : ret.text;
			return typeof ret === "string" ?
				// Handle most common string cases
				ret.replace( /\r/g, "" ) :
				// Handle cases where value is null/undef or number
				ret == null ? "" : ret;
		},
		offset: function () {
			var node = this.selectedNode || this.nodes[0];
			var result = { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
			if (node) {
				var docEl = (node.ownerDocument || node).documentElement;
				var clientTop = docEl.clientTop;
				var clientLeft = docEl.clientLeft;
				var scrollTop = window.pageYOffset || docEl.scrollTop;
				var scrollLeft = window.pageXOffset || docEl.scrollLeft;
				var boundingRect = node.getBoundingClientRect();
				result.top = boundingRect.top + scrollTop - clientTop;
				result.left = boundingRect.left + scrollLeft - clientLeft;
				result.right = boundingRect.right + scrollLeft - clientLeft;
				result.bottom = boundingRect.bottom + scrollTop - clientTop;
				result.width = boundingRect.right - boundingRect.left;
				result.height = boundingRect.bottom - boundingRect.top;
			}
		    return result;
		},
		// attributes & property modifiers
		data: function(attribute,value){
			var node = this.nodes, camelized = camelize(attribute);
			if(value !== undefined){
				try{
					this.each(function(elem){
						elem.dataset[camelized] = value;
					});
				} catch(e) {handleError(e)}
				
				return this;
			}
			
			return isArray(this.nodes) ? (isElement(this.nodes[this.currentIndex]) ? this.nodes[this.currentIndex].dataset[camelized] : (isElement(node[0]) ? node[0].dataset[camelized] : false)) : node?.dataset[camelized]??"";
		}, 
		attr2: function(attrObj, value){
			let attrs = [], elems = this.nodes;
			if(attrObj === "undefined" && value === "undefined"){
				elem = isArray(elems) ? elems[0] : elems;
				//let attributes = elem.getAttributes();
				//attrs.push({elem, attributes});
				//return attrs;
				return isElement(elem) ? elem.getAttributes() : "";
			} else {
				this.each(function(elem){
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
					} else if(isPlainObject(attrObj)){
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
		}, 
		attr : function( name, value) {
			try{
			var ret = [], _this = this;
			//elem = this.nodes;
			this.each(function(elem){
				var nType = elem.nodeType;
				// Don't get/set attributes on text, comment and attribute nodes
				if ( nType === 3 || nType === 8 || nType === 2 ) {
					return;
					//continue;
				}
				if(typeof(name) === "object") {
					/* if ( typeof elem.getAttribute === "undefined" ) {
						var newName;
						for(x in name) if( name.hasOwnProperty(x) )  _this.prop( name[x], x, elem );
						return _this.prop( name, value, elem );
					} else */
					_pbd.setAttr(elem, name);
				} else {
					// Fallback to prop when attributes are not supported
					if ( typeof elem.getAttribute === "undefined" ) { 
						return _this.prop( name, value, elem );
					}
					if ( nType !== 1 /* || !documentIsHTML( elem )*/ && _typeof(name) === "string" ) {
						name = name.toLowerCase();
					}
					if ( value !== undefined ) {
						if ( value === null ) {
							elem.removeAttribute( name );
						} else {
							_pbd.setAttr(elem, name, value + "" );
							//_this.setNodeAttribute(elem, name, value + "" );
							/* elem.setAttribute( name, value + "" ); */
						}
						return _this;
					} else {
						//alert(name);
						ret.push(elem.getAttribute( name ));
						//return ret === null ? undefined : ret;
					}
				}
			});
			if( !arguments || !arguments.length || arguments.length === 0) return this.getActiveElem().getAttributes();
			else if ( _typeof(name) !== "object" && value === undefined ) return ret[0];
			else return this;
			} catch (e){alert(e.stack)}
		},
		removeAttr : function (attr){
			this.each(function (elem){
				if(isString(attr) && elem.hasAttribute(attr) ) elem.removeAttribute(attr);
			});
			return this;
		},
		hasAttr : function (attr){
			var elem = this.getActiveElem();
			return elem.hasAttribute(attr);
		},
		toggleAttr : function (attr,val){
			this.each(function (elem){
				if(isString(attr) && elem.hasAttribute(attr) ) elem.removeAttribute(attr);
				else elem.setAttribute(attr,val);
			});
			return this;
		},
		prop : function( name, value, elem ) {
			//elem = elem && isElement(elem) ? elem : (this.nodes ?  this.nodes : $all(elem); // __akd_self.$$(elem));
			var ret, nType = elem.nodeType;
			var propFix = {"for": "htmlFor","class": "className","checked":"defaultChecked"};
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return this;
			}
			if ( nType !== 1 /*|| !documentIsHTML( elem )*/ ) {
				// Fix name and attach hooks
				name = inArray(name,propFix) ? propFix[ name ] : name;
			}
			if ( value !== undefined ) {
				return ( elem[ name ] = value );
			} else 
			return elem[ name ];
		},
		toggleProp : function(prop, val1, val2){
			if(isString(prop) && isString(val1) && isString(val2)){
				this.each(function(elem){
					if((prop in elem) || isIn(elem, prop)){
						var propValue = elem[prop];
						if(val1 !== "" && val2 !=="" ){
							alert(`${prop} => ${elem[prop]} : ${val1}`);
							if(propValue !== val1 && propValue !== val2) {elem[prop] = val1;}
							else if(propValue === val1) {elem[prop] = val2;}
							else if(propValue === val2) {elem[prop] = val1;}
						} else if(val1 !== "" && propValue !== "") {
							elem[prop] = val1
						}
					}
				});
			}
			return this
		},
		// event methods
		/* NOTE : when using the method => on(...), the @event argument can use a 
		* space or comma between event names eg. on("click mousedown") or on("click,mousedown")
		* to add multiple events to a single element. Be wary to not use space/s and comma/s incorectly, eg: on("click, mousedown"), 
		* TODO : add this option/feature : on("click,mousedown dblclick")
		*/
		on : function(event, selector, data, callback) {
			var that = this;
			// var evt = this.event(data).bindEvent(event, callback, this.nodes);
			//
			this.each(function (elem){
				that.event(data).bindEvent(elem, event, selector, data, callback,false);
			});
			return this;
		},
		off : function(event) {
			var that = this;
			this.each(function (elem){
				that.event().unbindEvent(event, elem);
			});
			return this;
		},
		delegate : function (eventName,elementSelector,handler, data){
			var that = this;
			// this[0] = this.nodes = isArray(this.nodes) || isArrayLike(this.nodes) ? this.nodes : [this.nodes];
			this.each(function (elem){
				that.event(data).add(elem,eventName,elementSelector, null,handler,false);
			});
			return this;
		},
		
		/* trigger: function (eventName, details, custom){
			this.each(function(elem){
				custom === true ? this.event().emitEvent(eventName, elem, details) : elem.dispatchEvent(new Event(eventName));
			});
			return this;
		}, */
		trigger : function(name, custom, details){
			var that = this;
			return this.each(function(elem) {
				if(custom === true){
					this.event().emitEvent(eventName, elem, details)
				} else {
					var event = document.createEvent('HTMLEvents');
					if ( !event.target ) {
						event.target = this;
					}
					event.initEvent(name,true,false);
					this.dispatchEvent(event);
				}
			});/* return this; */
		}
	};
	
	init = _pbd.fn.init = function(selector, context, root) {
		var m;
		this.selector = selector || null;
		this.context = context || document;
		this.nodes = null;
		this.currentIndex = 0;
		this.selectedNode = null;
		this.coreConfig = {};
		this.eventConfig = {};

		if(!this.selector) return this;

		switch(this.selector[0]){
			case '<':
			if(rsingleTag.test(this.selector)){
				//m = rsingleTag.exec(this.selector);
				//alert("single tag found "+m[0]+"-"+m[1]+"-"+m[2]);
				this[0] = this.nodes = [str2DOMElement(this.selector)];
				this.length = 1;
			} else {
				var matches = this.selector.match("/<([\w-]*)>/");
				if(matches === null || matches === undefined){
					let range = document.createRange(), parse = range.createContextualFragment.bind(range);
					this[0] = this.nodes = parse(this.selector);
					this.length = 1;
					//throw "Invalid Selector or Node";
					//return false;
				} else {
					let nodeName = matches[0].replace('<', '').replace('>',''), 
					nCfg = {type: nodeName, isSVG: nodeName.toLowerCase() === "svg", attrs: (isPlainObject(this.context) ? this.context : {}), content: null};
					
					this[0] = this.nodes = [makeElem(nodeName, nCfg)];
					this.length = 1;
				}
			}
			break;
			default:
			if(this.selector === 'document' || isDocument(this.selector) || this.selector === 'window' || isWindow(this.selector)) {
				this.context = null;
				this.nodes = [this.selector];
				this[0] = this.nodes[0];
			} else {
				//this.nodes = this[ 0 ] = $all(this.selector, this.context, this);
				this.$$(this.selector, this.context, null, root||this, false);
			}
			this.length = this.nodes.length ? this.nodes.length : 0;
		}
	}
	// Give the init function the _pbd prototype for later instantiation
	init.prototype = _pbd.fn;
	// Initialize central reference
	//rootjQuery = $pbd( document );
	_pbd.fn.$$ = function (selector, context, results, root, chain){
		results = results && (isArray(results) || isArrayLike(results)) ? results : false;
		chain = isSet(chain) ? chain : true;
		var ret = $all(selector, context, root);
		if(results && (isArray(ret) || isArrayLike(ret))) ret = merge(ret, results);
		if(!isArray(ret)) console.log(ret)
		this.nodes = [...ret];
		this[0] =  ret[0];
		if(chain){
			return this;
		} else {
			return this.nodes;
		}
	};
	_pbd.extend = _pbd.fn.extend = function _extendObj(){
		var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
		i = 1,length = arguments.length,deep = false;
		if (typeof target === "boolean" ){
			deep = target;
			target = arguments[i] || {};
			i++;
		}
		if(typeof target !== "object" && !isFunction(target)) {
			target = {};
		}
		if(i === length){
			target = this;
			i--;
		}
		for(;i < length;i++){
			if((options = arguments[i]) != null){
				for(name in options){
					src = target[name];
					copy = options[name];
					// Prevent never-ending loop
					if(target === copy){
						continue;
					}
					if(deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))){
						if(copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}
						// Never move original objects, clone them
						target[name] = _pbd.extend(deep, clone, copy);
						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		
		return target;
	};
	
	_pbd.extend({
		cssNumber: {
			"animationIterationCount": true, "columnCount": true, "fillOpacity": true, "flexGrow": true, "flexShrink": true, "fontWeight": true,
			"gridArea": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnStart": true, "gridRow": true, "gridRowEnd": true, "gridRowStart": true,
			"lineHeight": true, "opacity": true, "order": true, "orphans": true, "widows": true, "zIndex": true, "zoom": true
		},
		cssProps: {}, 
		cssNormalTransform: {
			letterSpacing: "0",
			fontWeight: "400"
		}, 
		accepts: {
			audio  : ["audio/aac", "audio/mp3", "audio/mpeg", "audio/ogg", "audio/oga", "audio/m4a"],
			video  : ["video/mp4", "video/mpeg", "video/webm", "video/ogv", "video/m4v"],
			text   : ["text/plain", "text/html", "text/css", "text/javascript", "text/php", "text/python", "text/json", "text/xml"],
			image  : ["image/svg+xml","image/png", "image/jpeg", "image/gif", "image/webp", "image/jfif", "image/avif", "image/svg+xml"],
			script : ["application/x-javascript", "application/json", "application/x-php", "application/x-python", "application/xml"],
			other  : ["image/svg+xml"]
		}, 
		ext_mimeTypes: {
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
			"gitignore" :"text/plain",
			"LICENSE" :"text/plain"
		}, 
		getBy, 
		all: $all, 
		one: $one, 
		handleError, 
		filename, 
		ext, 
		uid, 
		type: function type(item) {const reTypeOf = /(?:^\[object\s(.*?)\]$)/;return toString.call(item).replace(reTypeOf, '$1').toLowerCase();}, 
		merge: function(...args) {return Array.from(new Set([].concat(...args)))}, 
		makeArray: (arrayLike) => Array?.from(arrayLike) || Array.prototype.slice.call(arrayLike) || [...arrayLike],
		_browser: function(){this.uaMatch = function (ua) {ua = ua.toLowerCase();var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];return {browser: match[1] || "",version: match[2] || "0"};};matched = this.uaMatch(navigator.userAgent);browser = {};if (matched.browser) {browser[matched.browser] = true;browser.version = matched.version;}if (browser.chrome) {browser.webkit = true;} else if (browser.webkit) {browser.safari = true;}this.browser = browser;return this.browser;}, 
		appendStylesheet: function(url,overwrite,inline){inline = inline || false;if( !(document.body||false)){setTimeout(function(){this.appendStylesheet.apply(this,[url,overwrite,inline]);},500);return this;}var id = 'stylesheet-'+url.replace(/[^a-zA-Z0-9]/g,'');var $old = $$$('#'+id);if(typeof overwrite === 'undefined' ) {overwrite = false;}if($old.length === 1){if(overwrite ){$old.remove();} else {return this;}}var bodyEl = document.getElementsByTagName(_pbd._browser().safari ? 'head' : 'body')[0];var linkEl = inline ? document.createElement('style') : document.createElement('link');linkEl.type = 'text/css';linkEl.rel = 'stylesheet';linkEl.media = 'screen';linkEl[inline ? 'innerHTML' : 'href'] = url;linkEl.id = id;bodyEl.appendChild(linkEl);return this;}, 
		appendScript: function(url, overwrite,inline){inline = inline || false;if(!(document.body||false)){setTimeout(function(){app.appendScript.apply(this,[url,overwrite]);},500);return this;}var id = 'script-'+url.replace(/[^a-zA-Z0-9]/g,'');var $old = $$$('#'+id);if(typeof overwrite === 'undefined'){overwrite = false;}if($old.length === 1){if (overwrite){$old.remove();} else {return this;}}var bodyEl = document.getElementsByTagName(_pbd._browser().safari ? 'head' : 'body')[0];var scriptEl = document.createElement('script');scriptEl.type = 'text/javascript';scriptEl[inline ? 'innerHTML' : 'src'] = url;scriptEl.id = id;bodyEl.appendChild(scriptEl);return this;}, 
		capitalize: function (t) {return t[0].toUpperCase() + t.slice(1)},
		getInt: function getInt(x) {if (typeof x === 'number') {return x;}if (typeof x === 'string') {return parseInt(x, 10);}return undefined;},
		getValidUrl: function (t) {try {return new URL(t).href} catch (t) {}return "//" === t.substring(0, 2) ? window.location.protocol + t : window.location.origin + t},
		generateId: function () {var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";return "".concat(t).concat(Math.floor(1e8 * Math.random()).toString(16))},
		sorter: function(arr, by, ascdsc="asc"){
			if(!isArray(arr) || (by && !isString(by)) ) return -1;
			ascdsc= isString(ascdsc) ? ascdsc : "asc";
			let _strip = (str) => str.replace(/^(a |an |the )/gi, '').trim(), 
			sortedArr = arr.sort((a, b) => ascdsc && ascdsc !== "dsc" ? (_strip(a[by]||a) < _strip(b[by]||b) ? -1 : 1) : _strip(a[by]||a) > _strip(b[by]||b) ? -1 : 1);
			return sortedArr;
		}, 
		tag: function tag(tagName, attributes){const node = tag$1.apply(null, [...arguments]);return node;}, 
		setNodeAttribute: function setNodeAttribute(node, attributes, value){
			const nodes = isElement(node) ? [node] : isArray(node) ? node : $all(node);
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
										let camelizedName = camelize(x);
										node.dataset[camelizedName] = props[x];
										//Object.assign(node.dataset, newObj);
									}
								} //else node.setAttribute(attribute, value)
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
		}, 
		getHeight: function (el){
			let _height = 0;
			// window height
			if(isWindow(el)){
				//_height = el.document.documentElement.clientHeight;// without scrollbar, behaves like jQuery
				_height = el.innerHeight;// with scrollbar
			}
			// Document height
			else if(isDocument(el)){
				const body = document.body, html = document.documentElement;
				_height = Math.max(body.offsetHeight, body.scrollHeight, html.clientHeight, html.offsetHeight, html.scrollHeight);
			}
			// Element height
			else if(isElement(el)){
				//const styles = window.getComputedStyle(el), const height = el.offsetHeight, const borderTopWidth = parseFloat(styles.borderTopWidth), borderBottomWidth = parseFloat(styles.borderBottomWidth), paddingTop = parseFloat(styles.paddingTop), paddingBottom = parseFloat(styles.paddingBottom);
				//_height = height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
				//_height = el.clientHeight; // accurate to integer（when `border-box`, it's `height - border`; when `content-box`, it's `height + padding`）
				_height = el.getBoundingClientRect().height; // accurate to decimal（when `border-box`, it's `height`; when `content-box`, it's `height + padding + border`）
			}
			
			return _height;
		}, 
		getWidth: function(el) {
			let _width = 0;
			// window Width
			if(isWindow(el)){
				//_width = el.document.documentElement.clientWidth; // without scrollbar, behaves like jQuery
				_width = el.innerWidth; // with scrollbar
			}
			// Document Width
			else if(isDocument(el)){
				const body = document.body,  html = document.documentElement;
				_width = Math.max(body.offsetWidth, body.scrollWidth, html.clientWidth, html.offsetWidth, html.scrollWidth);
			}
			// Element Width
			else if(isElement(el)){
				//const styles = window.getComputedStyle(el), const width = el.offsetWidth, const borderLeftWidth = parseFloat(styles.borderLeftWidth), const borderRightWidth = parseFloat(styles.borderRightWidth), const paddingLeft = parseFloat(styles.paddingLeft), const paddingRight = parseFloat(styles.paddingRight);
				//_width = width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
				
				//_width = el.clientWidth;// accurate to integer（when `border-box`, it's `width - border`; when `content-box`, it's `width + padding`）
				_width = el.getBoundingClientRect().width;// accurate to decimal（when `border-box`, it's `width`; when `content-box`, it's `width + padding + border`）
			}
			
			return _width;
		}, 
		//Get the current coordinates of the element relative to the offset parent.
		position: (el) => isElement(el) && {left: el.offsetLeft, top: el.offsetTop}, 
		//Get the current coordinates of the element relative to the document.
		offset: function getOffset (el) {const box = el.getBoundingClientRect();return {top: box.top + window.pageYOffset - document.documentElement.clientTop,left: box.left + window.pageXOffset - document.documentElement.clientLeft};}, 
		// Parses a string into an array of DOM nodes.
		parseHTML: function parseHTML(string) {
			const context = document.implementation.createHTMLDocument();
			const base = context.createElement('base');
			base.href = document.location.href;
			context.head.appendChild(base);

			context.body.innerHTML = string;
			return context.body.children;
		},
		parseJSON: function(data, passTo = false, cb){
			let json = null, $this = this;
			try{
				json = JSON.parse( data + "" );
			} catch(e){}
			
			if(cb && isFunction(cb)){
				cb.apply(this, [json]);
			}
			
			if(passTo === true){
				if(isPlainObject(json)) {
					//json.id = "json";json.className = "json";
					_pbd.forEach(this.nodes, node => {this.setNodeAttribute(json)/* Object.assign(node, json) */});
				}
				
				return this;
			}
			
			return json;
		}, 
		// Cross-browser xml parsing
		parseXML: function(str){
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
		}, 
		/**
		 * Parse headers into an object
		 *
		 * ```
		 * Date: Wed, 27 Aug 2014 08:58:49 GMT
		 * Content-Type: application/json
		 * Connection: keep-alive
		 * Transfer-Encoding: chunked
		 * ```
		 *
		 * @param {String} headers Headers needing to be parsed
		 * @returns {Object} Headers parsed into an object
		 */
		parseHeaders: function (headers) {
			var parsed = {}, key, val, i;
			// Headers whose duplicates are ignored by node
			// c.f. https://nodejs.org/api/http.html#http_message_headers
			var ignoreDuplicateOf = [
				'age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
				'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'
			];
			
			if (!headers) {return parsed;}

			//this.each(headers.split('\n'), function parser(i, line) {
			this.each(headers.split('\n'), function parser(line) {
				i = line.indexOf(':');
				key = _pbd.trim(line.substr(0, i)).toLowerCase();
				val = _pbd.trim(line.substr(i + 1));
				if(key) {
					if(parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {return;}
					if(key === 'set-cookie') {
						parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
					} else {
						parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
					}
				}
			});

			return parsed;
		}, 
		parseTemplate(obj,tmpl){
			if(obj && typeof(obj) !== "object"){
				console.log(`the first argument has to be an object, a/n ${typeof obj} was passed instead`);
				return this;
			}
			
			if(tmpl && typeof(tmpl) !== "string"){
				console.log(`the second argument has to be an string, a/n ${typeof obj} was passed instead`)
				return this;
			}
			
			let nodes = [], tmp = '';
				
			for(let i in obj){
				if(tmp == '') tmp = tmpl.replace(new RegExp(escapeRegExp(i), 'g'),obj[i]??"???")
				else tmp = tmp.replace(new RegExp(escapeRegExp(i), 'g'),obj[i]??"???")
			}
			
			this.forEach(el=> {
				if(isElement(el)){
					if('value' in el) el.value = tmp;
					else el.innerHTML = tmp;
				}
			})
			//return tmp;
			//return new ElementCollection(...nodes)
			return isArray(this) && this.length > 0 ? this : tmp;
		}, 	
		toBase64: function toBase64(str) {if (typeof window === 'undefined') {return Buffer.from(str).toString('base64');} else {return window.btoa(str);}}, 
		toFormData: function (obj){if(isFormData(obj)) return obj;if(typeof (obj) === 'string') {return isValidJSON(obj) || obj;}let formData = new FormData();for(const i in obj){formData.append(i, obj[i]);}return formData;}, 
		toArray: function(value) {return Array.from && Array.from(value) || slice.call(value);}, 
		/* toArray: function(obj, offset) {var args = [];if(isNumber(offset)) {args.push(offset);}return args.slice.apply(obj, args);},  */
		// Fetch data from TEXT/JSON file 
		fetchFile: async function (url, resType="json", cfg={}, cb) {
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
		}, 
		// on: (el, evt, fn, opts = {}) => {const delegatorFn = e => {if( isArray(opts.target) ){var target;for(var i = 0;i < opts.target.length;i++){var target = e.target.closest(opts.target[i]);if (!target) target = e.target;if(!el.contains(target)) return;if(target.matches(opts.target[i])) {fn.call(target, e);}}} else {let target = e.target.closest(opts.target);if (!target) target = e.target;if(!el.contains(target)) return;if(target.matches(opts.target)) {fn.call(target, e);}}}el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);if (opts.target) return delegatorFn;}, 
		on: function( elem, types, selector, data, fn, one, useCapture){
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
					//_pbd.event(data).bindEvent(elem, type, selector, data, types[ type ], one, useCapture);
					this.on(elem, type, selector, data, types[ type ], one, useCapture);
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
					this.off(event);
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = _pbd.guid++ );
			}
			
			if (useCapture === undefined) {
				useCapture = false;
			}
			if (!isArray(elem)) {
				elem = [elem];
			}
			
			if(selector){
				this.delegate(elem, types, selector, fn, data, useCapture);
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
						/* if(selector){elem[i].addEventListener(types, function(e) {for(let target = e.target; target && target != this; target = target.parentNode) {if(target.matches(selector)) {fn.call(target, e);break;}}}, useCapture);} else  */
						if(isElement(elem[i])) elem[i].addEventListener(types, fn, useCapture);
					}
				}
			}
			
			return this;
		}, 
		on2(elems, event, cbOrSelector, cb, useCapture){
			if (useCapture === undefined) {
				useCapture = false;
			}
			if (!isArray(elems)) {
				elems = [elems];
			}
			var eventsArr = (rspace.test(event) || event.indexOf(' ') >= 0) ? event.split(" ") : rcomma.test(event) ? event.split(",") : null;
			if(/*isString( event ) && */isArray(eventsArr) && eventsArr.length > 1 ){
				var x = 0,total = eventsArr.length;
				for(;x<total;x++){
					if(typeof cbOrSelector === 'function'){
						this.forEach(elems, e => e.addEventListener(eventsArr[ x ], cbOrSelector))
					} else {
						this.forEach(elems, elem => {
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
					this.forEach(elems, e => e.addEventListener(event, cbOrSelector))
				} else {
					this.forEach(elems, elem => {
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
		},
		off: function(elem, evt, fn){
			if(elem && !isArray(elem)) {
				elem = [elem];
			}
			for(let i = 0;i<elem.length;i++){
				if(isElement(elem[i])){
					elem[i].removeEventListener(evt, fn);
				}
			}
			return this;
		}, 
		delegate: function(el, evt, sel, cb, data, capture){
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
		}, 
		each: function(obj,callback) {var length, i = 0;if (isArrayLike(obj)) {length = obj.length;for ( ; i < length; i++ ) {if (callback.call( obj[ i ],i,obj[i]) === false) {break;}}} else {for (i in obj) {if (callback.call( obj[ i ],i,obj[i]) === false) {break;}}}return obj;},
		forEach: function(obj, iterator, context){
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
				} else if (obj.forEach && obj.forEach !== this.forEach) {
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
		}, 
		forEach2: function(data, callback) {
			if(data && isFunction(callback)) {
				if (isArray(data) || isNumber(data.length) /* array-like */) {
					this.toArray(data).forEach(function (value, key) {
						callback.call(data, value, key, data);
					});
				} else if (isObject(data)) {
					Object.keys(data).forEach(function (key) {
						callback.call(data, data[key], key, data);
					});
				}
			}
			return data;
		}, 
		// -------------------------------------------------------------------
		_eval: function(str){
			// Call this method from your JS function when you don't want the JS expression to access or
			// interfere with any local variables in your JS function.
			return eval(str);
		},
		// jExecute some JavaScript code globally.
		globalEval: function globalEval(code) {
			const script = document.createElement('script');
			script.text = code;

			document.head.appendChild(script).parentNode.removeChild(script);
		}, 
		// Use eval, but context of eval is current, context of $.Globaleval is global.
		DOMEval: function (code, node, doc) {
			var preservedScriptAttributes = {
				type: true,
				src: true,
				nonce: true,
				noModule: true
			};
			doc = doc || document;

			var i, val, script = doc.createElement( "script" );

			script.text = code;
			if ( node ) {
				for ( i in preservedScriptAttributes ) {
					val = node[ i ] || node.getAttribute && node.getAttribute( i );
					if ( val ) {
						script.setAttribute( i, val );
					}
				}
			}
			doc.head.appendChild( script ).parentNode.removeChild( script );
		},
		setInnerHTML: function(ele, str, preventScripts){
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
		}, 
		bodyParser, 
		$clog: function() {console.log.apply(this,arguments);}, 
		$cerror: function() {console.error.apply(this,arguments);}, 
		$cwarn: function() {console.warn.apply(this,arguments);}, 
		$bytes: function(){
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
		}, 
		niceBytes: function(size, skipSmallSizes){
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
		}, 
		convert_bits: function(bytes){var kb = bytes / 1024;if(kb < 1024){return Math.round(kb) + ' KB';} else {mb = kb / 1024;return Math.round(mb * 10) / 10 + ' MB';}}, 

		serialize: function (form, prettify = false) {
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
			} else if (typeof(form) === 'string' || isFormData(form)) return Array.from(form, function(field){return field.map(encodeURIComponent).join('=');}).join('&');
			// If the content-type is set to JSON, stringify the JSON object
			else if (isArray(form)) return prettify ? JSON.stringify(form, null, "\t") : JSON.stringify(form);
			else{
				// Otherwise, convert object to a serialized string
				for (var prop in form) {
					if (form.hasOwnProperty(prop)) {
						serialized.push(encodeURIComponent(prop) + '=' + encodeURIComponent(form[prop]));
					}
				}
			}
			return serialized.join('&');
		}, 
		debounce: function(cb, delay = 1000){
			let timeout;
			return (...args) => {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					cb(...args);
				}, delay);
			}
		}, 
		throttle: function(cb, delay = 1000){
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
		}, 
		findBy: function (arr, by="id", val){
			if(!isArray(arr) || !isString(by) || typeof val === "undefined") return false;
			//const record = arr.find((p)=> Number(p.id) === Number(id));
			const record = arr.find((p) => by === "id" ? Number(p.id) === Number(val) : p[by] && p[by] === val);
			return record;
		}, 
		findInText: function(q, el, cb){
			if(isString(q) && isElement(el = $one(el))){
				let pattern, res = q, i=0;
				if(q.length >= 3){
					let textToSearch = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
					pattern = new RegExp(`${textToSearch}`, "gi");
					
					res = el.textContent.replace(pattern, match => {i++;return `<mark>${match}<\/mark>`});
					el.innerHTML = res
					//$one('#found-total').textContent = `${i} term/s found`;
				}
				
				if(isFunction(cb)){
					cb.apply(null, [res, i, pattern])
				}
			} else {
				
			}
			return this;
		}, 
		//trim: function(str) {return str.replace(/^\s*/, '').replace(/\s*$/, '');}, 
		trim: function( text ) {return text === null ? "" : text.toString().replace( rLWhitespace, '' ).replace( rTWhitespace, '' );}, 
		stripBOM: function(content) {if (content.charCodeAt(0) === 0xFEFF) {content = content.slice(1);}return content;}, 
		// Get and set the style property on a DOM Node
		style: function(elem, name, value, extra) {
			if(!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			var ret, type, origName = camelCase( name ), isCustomProp = rcustomProp.test( name ), style = elem.style;

			if(!isCustomProp) {
				name = finalPropName( origName );
			}
			if(value !== undefined) {
				type = typeof value;
				// Convert "+=" or "-=" to relative numbers (#7345)
				if(type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS( elem, name, ret );
					type = "number";
				}
				
				// Make sure that null and NaN values aren't set (#7116)
				if(value == null || value !== value) {
					return;
				}
				
				if(type === "number" && !isCustomProp) {
					value += ret && ret[ 3 ] || (this.cssNumber[ origName ] ? "" : "px");
				}

				// background-* props affect original clone's values
				if(/* !support.clearCloneStyle && */ value === "" && name.indexOf( "background" ) === 0) {
					style[ name ] = "inherit";
				}

				if(isCustomProp) {
					style.setProperty(name, value);
				} else {
					style[name] = value;
				}
			} else {
				return style[name];
			}
		}, 
		css: function(elem, name, extra, styles) {
			var val, num, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
			
			if(!isCustomProp) {
				name = finalPropName(origName);
			}

			if(val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if(val === "normal" && name in _pbd.cssNormalTransform) {
				val = _pbd.cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if(extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}

			return val;
		}, 
		getDimensions : function(elem) {
			let _height = 0, _width = 0;
			elem = $one(elem);
			var display = _pbd.styleProp(elem,'display');
			if (display != 'none' && display != null) return {width: elem.offsetWidth, height: elem.offsetHeight}; // Safari bug
			//return [element.offsetWidth,element.offsetHeight];
			// All *Width and *Height properties give 0 on elements with display none,
			// so enable the element temporarily
			var els = element.style;
			var originalVisibility = els.visibility;
			var originalPosition = els.position;
			var originalDisplay = els.display;
			els.visibility = 'hidden';
			els.position = 'absolute';
			els.display = 'block';
			var originalWidth = element.clientWidth;
			var originalHeight = element.clientHeight;
			els.display = originalDisplay;
			els.position = originalPosition;
			els.visibility = originalVisibility;
			return {width:originalWidth,height:originalHeight};
			//return [originalWidth, originalHeight];
		}, 
		offsets: (node) => {
			var result = { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 , padding: 0, margin: 0, border: 0};
			if(isElement(node)){
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
		},
		/**
		 * Determines the number of elements in an array, the number of properties an object has, or the length of a string.
		 *
		 * @param {Object|Array|string} obj Object, array, or string to inspect.
		 * @param {boolean} [ownPropsOnly=false] Count only "own" properties in an object
		 * @returns {number} The size of `obj` or `0` if `obj` is neither an object nor an array.
		*/
		size2 : function(obj, ownPropsOnly) {
			var count = 0, key;
			if (isArray(obj) || isString(obj)) {
				return obj.length;
			} else if (isObject(obj)){
				for (key in obj) if (!ownPropsOnly || obj.hasOwnProperty(key)) count++;
			}
			return count;
		},
		size : function size(val, in_bytes) {
			return (isArray(val) || (in_bytes === false && isString(val))) ? val.length : 
				_typeof(val) === 'object' ? val.size || val.length || Object.keys(val).length : 
					isString(val)  ? new Blob([val]).size : 0;
		},
		///////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////
		animate : function (animation, hide) {
			_this.each(function (elem){
				// If there's no element or animation, do nothing
				if (!elem || !animation) return;
				// Remove the [hidden] attribute
				elem.removeAttribute('hidden');
				// Apply the animation
				elem.classList.add(animation);
				// Detect when the animation ends
				elem.addEventListener('animationend', function endAnimation (event) {
					// Remove the animation class
					elem.classList.remove(animation);
					// If the element should be hidden, hide it
					if (hide) {
						elem.setAttribute('hidden', 'true');
					}
					// Remove this event listener
					elem.removeEventListener('animationend', endAnimation, false);
				}, false);
			});
			return _this;
		},
		arrayRemove : function(array, value) {var index = indexOf(array, value);if (index >=0) array.splice(index, 1);return value;},
		argsToArray : function(args) {var arrayOfArgs = [];for (var i = 0; i < args.length; i++) arrayOfArgs.push(args[i]);return arrayOfArgs;},
		basename: function(path) {var expr = /^.*\/([^\/]+)\/?$/g;return expr.test(path) ? path.replace(expr, "$1") : path;}, 
		breaklines : function (str) {return str.replace(/\n/g, "<br>");},
		buildQuery : function (data) {if (typeof (data) === 'string') return data;var query = [];for (var key in data) {if (data.hasOwnProperty(key)) {query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));}}return query.join('&');},
		bytes : function(bytes, si){var thresh = si ? 1000 : 1024;if (Math.abs(bytes) < thresh) {return bytes + ' B';}var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];var u = -1;do {bytes /= thresh;++u;} while (Math.abs(bytes) >= thresh && u < units.length - 1);return bytes.toFixed(1) + ' ' + units[u];}, 
		byteSize : function (str){return new Blob([str]).size;},
		cacheBuster : function (url) {return url + (url.indexOf("?") > -1 ? "&" : "?") + "cache=" + (+new Date());},
		call: function (obj, fn) {return obj[fn].apply(obj, [].slice.call(arguments, 2));},
		//camelize : function(stringToCamelize){if (String(stringToCamelize).indexOf('-') == -1){return stringToCamelize;}var oStringList = String(stringToCamelize).split('-');var isFirstEntry = true;var camelizedString = '';for(var i=0; i < oStringList.length; i++){if(oStringList[i].length>0){if(isFirstEntry){camelizedString = oStringList[i];isFirstEntry = false;} else {var s = oStringList[i];camelizedString += s.charAt(0).toUpperCase() + s.substring(1);}}}return camelizedString;},
		camelize, camelCase, capitalize, 
		capcase: function (str) {return str.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });},
		checkForSlash, 
		chop: function (str, n, end) {return str.length > n ? str.substr(0, n) + (end&&isString(end)?end:"...") : str;},
		//cleanElementInsert : function( el, child) {if(!el || !child) return false;var cloned = false;if(this.is.arrayLike(el) || this.is.array(el) || (el.length && el.length > 0)) {clonedNode = [];_pbd.each(el,function(i){clonedNode[i] = child.cloneNode( true );elem = el[i];if(elem && isElement(elem)){while(elem.firstChild){elem.removeChild(elem.firstChild);}elem.appendChild(clonedNode[i]);}});} else {while(el.firstChild){el.removeChild(el.firstChild);}el.appendChild(child);}return this;},
		cleanElementInsert, 
		cloneNode: function (deepClone=true,retClone=false){var clone = el.cloneNode(deepClone);this.clone = clone;return retClone ? clone : this;},
		/**
		 * Creates a typed "data clone" of an object
		 * Notice that Object.getPrototypeOf(obj) === obj.__proto__
		 * === Book.prototype when obj has been created by new Book(...)
		 *
		 * @param {object} obj
		 */
		cloneObject: function (obj) {var clone = Object.create( Object.getPrototypeOf(obj));for (var p in obj) {if (obj.hasOwnProperty(p)) {if (typeof obj[p] === "number" || typeof obj[p] === "string" || typeof obj[p] === "boolean" || this.typeName(obj[p]) === "Function" || (this.typeName(obj[p]) === "Date" && obj[p] != null)) {clone[p] = obj[p];}/* else clone[p] = cloneObject(obj[p]); */}}return clone;},
		/** Creates a clone of a data record object or extracts the data record part of an object */
		cloneRecord: function (obj) {var record = null;for (var p in obj) {if (obj.hasOwnProperty(p) && typeof obj[p] != "object" && typeof obj[p] != "null" && typeof obj[p] != "undefined") {record[p] = obj[p];}}return record;},
		contains: function (child){const el = _this.getActiveElem();return el !== child && el.contains(child);},
		//contains : ( a, b ) => {if ( b ) {while ( (b = b.parentNode) ) {if ( b === a ) {return true;}}}return false;},
		contents: function( elem ) {return elem.nodeName.toLowerCase() === "iframe" ? (elem.contentDocument || elem.contentWindow.document) : merge( [], elem.childNodes );},
		createElement: function(tagName, attr, _parent) {var el = document.createElement(tagName);for(prop in attr) {if(attr.hasOwnProperty(prop)) el.setAttribute(prop, attr[prop]);}if(_parent&&typeof(_parent)=="object"&&(_parent.nodeType===1 || _parent.nodeType===9 )) _parent.appendChild(el);return el;},
		createElementFromString, createUniqueName, 
		dasherize, 
		/** Debounce functions for better performance */
		debounce : function (fn) {var timeout;return function () {var context = this, args = arguments;if (timeout) {window.cancelAnimationFrame(timeout);}timeout = window.requestAnimationFrame(function () {fn.apply(context, args);});}},
		/*! Remove duplicate items from an array */
		dedupe : function (arr) {return arr.filter(function (item, index) {return arr.indexOf(item) === index;});},
		dedupe2 : function(arr) {return [...new Set(arr)];},
		detectDeviceType : function() {return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';},
		dig : function(obj, target) {return target in obj ? obj[target] : Object.values(obj).reduce((acc, val) => {if (acc !== undefined) return acc;if (typeof val === 'object') return this.dig(val, target);}, undefined);},
		/* const data = {level1: {level2: {level3: 'some data'}}};
		dig(data, 'level3'); // 'some data'
		dig(data, 'level4'); // undefined
		*/
		dirname: function(path) {var expr = /^(.*)\/[^\/]+\/?$/g;return expr.test(path) ? path.replace(expr, "$1") : '';}, 
		encodeUrl, escapeHTML, escapeHtml:escapeHTML, escapeRegExp, 
		fileReaderChunksUploader : function(file){
			var progress = document.createElement("progress");
			file.onchange = function(e){
				var fr = new FileReader();
				fr.onprogress = function(e){progress.value = e.loaded /  e.total;}
				fr.onload = startUpload.bind(fr);
				progress.style.display = "inline-block";
				fr.readAsArrayBuffer(e.target.files[0]);
			}
			function startUpload (){
				var chunkSize = 16<<10;
				var buffer = this.result;
				var fileSize = buffer.byteLength;
				var segments = Math.ceil(fileSize / chunkSize);
				var count = 0;
				progress.value = 0;
				
				(function upload(){
					var segSize = Math.min(chunkSize, fileSize - count * chunkSize);
					if(segSize > 0){
						var chunk = new Uint8Array(buffer, count++ * chunkSize, segSize);
						progress.value = count / segments;
						// send chunks to server (here pseudo cycle for demo purpose)
						setTimeout(upload,100); // when upload ok, call function again for the next block
					} else {
						alert("done");
						progress.style.display = "none";
					}
				})();
			}
		},
		find: function (selector){
			const x = _this.getActiveElem();
			const y = Array.from(_this.nodes, x => Array.from(x.querySelectorAll(selector))).reduce((a, b) => a.concat(b));
			// **New** | Using [flat](https://devdocs.io/javascript/global_objects/array/flat)
			// const y = Array.from(_this.nodes, x => Array.from(x.querySelectorAll(selector))).flat();
			return y;
		},
		fixProp, 
		formatException: function(e){var lineNumber;if (e.line) {lineNumber = e.line;} else if (e.lineNumber) {lineNumber = e.lineNumber;}var file;if (e.sourceURL) {file = e.sourceURL;} else if (e.fileName) {file = e.fileName;}var message = (e.name && e.message) ? (e.name + ': ' + e.message) : e.toString();if (file && lineNumber) {message += ' in ' + file + ' (line ' + lineNumber + ')';}return message;},
		formatToMS: function(val){var _d,rMS = /ms/i,rSS = /s/i;if(rMS.test(val)) _d = val.replace('ms','');else if(rSS.test(val)){_d = val.replace('s','');_d = Number(_d) * 1000;}return _d;},
		formatTime: function(time, hours){if(hours){var h = Math.floor(time / 3600);time = time - h * 3600;var m = Math.floor(time / 60);var s = Math.floor(time % 60);return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);} else {var m = Math.floor(time / 60);var s = Math.floor(time % 60);return m.lead0(2) + ":" + s.lead0(2);}}, 
		get: {
			body: function(content){var x = content.indexOf("<body");if(x == -1) return "";x = content.indexOf(">", x);if(x == -1) return "";var y = content.lastIndexOf("</body>");if(y == -1) return "";return content.slice(x + 1, y);},
			elementStyle : function(intOrEle){var element = isElement(intOrEle) ? intOrEle : _typeof(intOrEle) === "number" ? this.nodes[intOrEle] : this.nodes[0];return (!element) ? false :(element.currentStyle ? element.currentStyle : (window.getComputedStyle ? window.getComputedStyle(element,null) : document.defaultView.getComputedStyle(element, null)));},
			ext : (filename,toLower) => {if(typeof(toLower) == 'undefined') toLower = true;if(/^.*\.[^\.]*$/.test(filename)){var splint = filename.split('?');var ext = splint[0].replace(/^.*\.([^\.]*)$/, "$1");/* var ext = filename.replace(/^.*\.([^\.]*)$/, "$1"); */return toLower ? ext.toLowerCase(ext) : ext;} else return "";},
			fileExtension : this.ext,
			filename : ( path ) => {"use strict";return path.replace( rPath, '' );},
			//filename : (filename,with_ext) => {if( filename.length == 0 ) return "";if(with_ext == '' || with_ext == null) var with_ext = false;var dot = filename.lastIndexOf(".");if( dot == -1 ) return filename;/* var splint = filename.split('.'); */var splint = filename.split('?');var splint2 = splint[0].split('.');var pieces = splint2[0].split("/");var ext = splint2[1];for (var i = 0; i < pieces.length; i++) nameOnly = pieces[i];if(with_ext) return nameOnly.replace('.','') + '.' + ext;else return nameOnly;},
			iframeDocument : function (frameId) {const x = $all(frameId)[0];const y = x.contentWindow || x.contentDocument;const z = y.document ? y.document : y;return z;},
			images : function(el, includeDuplicates = false) {const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'));return includeDuplicates ? images : [...new Set(images)];},
			markDownAnchor : function(paragraphTitle){return paragraphTitle.trim().toLowerCase().replace(/[^\w\- ]+/g, '').replace(/\s/g, '-').replace(/\-+$/, '');},
			minOfArray : function (numArray) {
				var min;
				// return Math.min.apply(null, numArray);
				/* The new spread operator is a shorter way of writing the apply solution to get the maximum of an array: */
				// var max = Math.min(...numArray);
				// recommended solution
				min = numArray.reduce(function(a, b) {return Math.min(a, b);});
				return min;
			},
			maxOfArray : function (numArray) {
				var max;
				// return Math.max.apply(null, numArray);
				/* The new spread operator is a shorter way of writing the apply solution to get the maximum of an array: */
				// var max = Math.max(...numArray);
				// recommended solution
				max = numArray.reduce(function(a, b) {return Math.max(a, b);});
				return max;
			},
			/*! Get next sibling of an element that matches selector */
			nextSibling : function (elem, selector) {var sibling = elem.nextElementSibling;if (!selector) {return sibling;}while (sibling) {if (sibling.matches(selector)) return sibling;sibling = sibling.nextElementSibling}},
			/*! Get next siblings of an element until selector */
			nextUntil : function (elem, selector) {var siblings = [];var next = elem.nextElementSibling;while (next) {if (selector && next.matches(selector)) break;siblings.push(next);next = next.nextElementSibling;}return siblings;},
			offsetTop : function (elem) {var location = 0;if (elem.offsetParent) {while (elem) {location += elem.offsetTop;elem = elem.offsetParent;}}return location >= 0 ? location : 0;},
			parents : function (elem, selector) {var parents = [];while (elem && elem !== document) {if (selector) {if (elem.matches(selector)) {parents.push(elem);}} else {parents.push(elem);}elem = elem.parentNode;}return parents;},
			/*! Get all of an element's parent elements up the DOM tree until a matching parent is found */
			parentsUntil : function (elem, parent, filter) {var parents = [];while (elem && elem !== document) {if (parent) {if (elem.matches(parent)) break;}if (filter) {if (elem.matches(filter)) {parents.push(elem);}continue;}parents.push(elem);elem = elem.parentNode;}return parents;},
			/*! Get previous sibling of an element that matches selector */
			previousSibling : function (elem, selector) {var sibling = elem.previousElementSibling;if (!selector) {return sibling;}while (sibling) {if (sibling.matches(selector)) return sibling;sibling = sibling.previousElementSibling;}},
			/*! Get previous siblings of an element until a selector is found */
			previousUntil : function (elem, selector) {var siblings = [];var prev = elem.previousElementSibling;while (prev) {if (selector && prev.matches(selector)) break;siblings.push(prev);prev = prev.previousElementSibling;}return siblings;},
			styles : function(element, style) {element = isElement(element) ? element : $one(element);style = style == 'float' ? 'cssFloat' : this.camelize(style);var value = element.style[style];if (!value) {var css = document.defaultView.getComputedStyle(element, null);value = css ? css[style] : null;}if (style == 'opacity') {return value ? parseFloat(value) : 1.0;}if (value == 'auto') {if ((style == 'width' || style == 'height') && this.styleProp(element, 'display') != 'none') {return element['offset' + this.capitalize(style)] + 'px';}return null;}return value == 'auto' ? null : value;},
			styleProp : function(element, prop){var value,camelized = this.camelize(prop);if (isElement(element) && element.style) value = element.style[camelized];if (!value){if (document.defaultView && document.defaultView.getComputedStyle){var css = document.defaultView.getComputedStyle(element, null);value = css ? css.getPropertyValue(prop) : null;} else if (window.getComputedStyle) {var css = window.getComputedStyle(element,null);value = css ? css.getPropertyValue(prop) : null;} else if (element.currentStyle) {value = element.currentStyle[camelized];}}if (prop == 'opacity') return value ? parseFloat(value) : 1.0;return value == 'auto' ? null : value;},
			/** Retrieve the direct supertype of a given class. */
			superType: function (Class) {return Class.prototype.__proto__.constructor},
			thiss : function (key){return this.hasOwnProperty(key) ? this[key] : this;},
			unit : function(val) {var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);if (split) { return split[1]; }},
			/* var id = decodeURI(parseInt(get.urlVars()["id"]));

			var title = decodeURI(get.urlVars()["title"]);
			var desc = decodeURI(get.urlVars()["desc"]); */
			urlVars : function(url) {var vars = [], hash;if(url){var hashes = url.slice(url.indexOf('?') + 1).split('&');} else var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');for (var i = 0; i < hashes.length; i++) {hash = hashes[i].split('=');vars.push(hash[0]);vars[hash[0]] = hash[1];}return vars;},
			/** Get an array [width, height] of the window.*/
			windowDimensions2 : function(){
				// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
				if (typeof window.innerWidth != 'undefined') {
					var viewPortWidth = window.innerWidth,viewPortHeight = window.innerHeight;
				} // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
				else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
					var viewPortWidth = document.documentElement.clientWidth,viewPortHeight = document.documentElement.clientHeight;
				} // older versions of IE
				else {
					var viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
				}
				return {width : viewPortWidth,height : viewPortHeight}
			},
			windowDimensions : function() {
				let d = document, w=window, 
				contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x;
				
				return {
					width:  d.documentElement.clientWidth,
					height: d.documentElement.clientHeight,
					outerWidth : w.outerWidth,
					outerHeight : w.outerHeight,
					pageWidth:    Math.min(d.body.scrollWidth, contentWidth),
					pageHeight:   d.body.scrollHeight,
					pageX: d.body.getBoundingClientRect().x, 
					pageY: d.body.getBoundingClientRect().y,
					screenWidth:  w.screen.width,
					screenHeight: w.screen.height,
					screenX: -w.screenX,
					screenY: -w.screenY - (w.outerHeight-w.innerHeight)
				}
			}
			/* windowDimensions : () => {var w = window,d = document,e = d.documentElement,g = d.body,x = w.innerWidth || e.clientWidth || g.clientWidth,y = w.innerHeight || e.clientHeight || g.clientHeight;return [width:x, height:y];} */
		},
		/*!
		 * Group items from an array together by some criteria or value.
		 * (c) 2019 Tom Bremmer (https://tbremer.com/) and Chris Ferdinandi (https://gomakethings.com), MIT License,
		 * @param  {Array}           arr      The array to group items from
		 * @param  {String|Function} criteria The criteria to group by
		 * @return {Object}                   The grouped object
		 */
		groupBy : function (arr, criteria) {

			return arr.reduce(function (obj, item) {
				// Check if the criteria is a function to run on the item or a property of it
				var key = typeof criteria === 'function' ? criteria(item) : item[criteria];
				// If the key doesn't exist yet, create it
				if (!obj.hasOwnProperty(key)) {
					obj[key] = [];
				}
				// Push the value to the object
				obj[key].push(item);
				// Return the object to the next item in the loop
				return obj;
			}, {});

		},
		/** Capitalize the first character in each word, excluding some articles and prepositions. */
		headline : function (str) {var exclude = "a,an,the,for,to,of,on,as,in,and,from".split(",");return str.replace(/\b\w+/g, function (s, i) {if (exclude.indexOf(s) > -1 && i > 0) {return s;}return s.charAt(0).toUpperCase() + s.slice(1);});},
		/** Highlight a pattern throughout a string. */
		highlight : function (str, pattern) {return str.replace(new RegExp("(" + pattern + ")", "g"), "<em>$1</em>");},
		html : {
			decode : function(text) {var newContent, textArea = document.createElement('textarea');textArea.innerHTML = text;newContent = textArea.value;textArea = null;return newContent;},
			encode : function(text) {var newContent, textArea = document.createElement('textarea');textArea.innerText = text;newContent = textArea.innerHTML;textArea = null;return newContent;},
			encodeUTF8 : ( str ) => {"use strict";/*jshint nonstandard:true*/return unescape( encodeURIComponent( str ) );},
			escape : function(str) {if (!str) return str;return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');},

			escapeInput : function (str) {var entityMap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'};return String(str).replace(/[&<>"'`=\/]/g, function (s) {return entityMap[s];});},
			escapeHTML : (str) => {return str.replace(/[&<>'"]/g, function (tag) {return {'&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#39;','"': '&quot;'}[tag] || tag;});},
			unescape : (str) => {return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, function (tag) {return {'&amp;': '&','&lt;': '<','&gt;': '>','&#39;': "'",'&quot;': '"'}[tag] || tag;});},
			/*! Sanitize and encode all HTML in a user-submitted string */
			sanitize : function (str) {var temp = document.createElement('div');temp.textContent = str;return temp.innerHTML;},
			stripTags : (str) => {return str.replace(/<[^>]*>/g, '');},
			truncateString : (str, num) => {return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;}
		},
		htmlValue, 
		hyphenate : function(str){if(isString(str)){return replaceAll(str," ","-");}return this},
		inArray: inArray || function (needle,arr){return arr[needle] === true;},
		is : {
			array: isArray || function (arr){return _typeof(arr) === "array";},
			arrayLike : isArrayLike,
			"document" : isDocument,
			element: isElement,
			emptyObject : isEmptyObject,
			file : isFile,
			"function" : isFunction,
			image : (url) => {return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);},
			integer: function (x) {return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0;},
			lowerCase : (str) => {return str === str.toLowerCase();},
			negativeZero : (val) => {return val === 0 && 1 / val === -Infinity;},
			nil : (val) => {return val === undefined || val === null;},
			//Returns true if it is a DOM node
			node : (obj) => {return (typeof Node === "object" ? obj instanceof Node : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string");},
			"null" : (val) => {return val === null;},
			"number" : isNumber, 
			"numeric" : isNumeric, 
			object: isObject,
			objectLike : (val) => {return val !== null && _typeof(val) === 'object';},
			positiveInteger: function (x) {return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0 && x > 0;},
			plainObject : isPlainObject || function (obj) {return toString.call(obj) === '[object Object]';},
			selector : isSelector,
			set : isSet,
			string : isString,
			stream : (val) => {return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function';},
			symbol : (val) => {return _typeof(val) === 'symbol';},
			travisCI : () => {return 'TRAVIS' in process.env && 'CI' in process.env;},
			type: _type,
			"typeof": _typeof,
			/** Retrieves the type of a value, either a data value of type "Number", "String" or "Boolean", or an object of type "Function", "Array", "HTMLDocument", ..., or "Object"  */
			typeName: function (val) {
				// stringify val and extract the word following "object"
				var typeName = toString.call(val).match(/^\[object\s(.*)\]$/)[1];
				// special case: null is of type "Null"
				if (val === null) return "Null"; 
				// special case: instance of a user-defined class or ad-hoc object
				if (typeName === "Object") return val.constructor.name || "Object";
				// all other cases: "Number", "String", "Boolean", "Function", "Array", "HTMLDocument", ...
				return typeName;
			},
			"undefined" : (val) => {return val === undefined;},
			upperCase : (str) => {return str === str.toUpperCase();},
			validJSON : (str) => {try {JSON.parse(str);return true;} catch (e) {return false;}},
			"window" : isWindow,
			writableStream : (val) => {return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function' && typeof val._write === 'function' && _typeof(val._writableState) === 'object';}
		},
		isArray, isArrayLike, isArrayBuffer, isArrayBufferView,isAudioElement, isBlob, isBuffer, isClass, isDate , isDocument, isDocumentFragment , isADocument, isElement, isEmptyObject, 
		isFile, isFileName, isFormData , isFunction, isImage, isImageElement, isLowerCase, isMediaElement, isNegativeZero, isNil, isNode, isNull, isNumber, isNumeric, isObject, isObjectLike, isPlainObject, isPromise, isSelector, isSet, 
		isStream, isString,isStandardBrowserEnv, isAbsoluteURL, isValidHttpUrl, isSymbol, isTravisCI, isType: _type, isTypeof: _typeof, isUndefined, isUpperCase, isURLSearchParams, isValidJSON, isVideoElement, isWritableStream, isWindow, 
		
		/* eg: if( this.isA_("Number", value) ) alert(value+" is a number"); */
		isA_ : function(typeName, value) {return toString.apply(value) === '[object ' + typeName + ']';},
		jsValue, 
		logError: function (msg){console.log(msg);},
		lowercase: function (str) {return String(str).toLowerCase();},
		merge:merge,
		//Merge two or more objects together.
		mergeAll : function () {var _this = this, extended = {};var _merge = function (obj) {for (var prop in obj) {if (obj.hasOwnProperty(prop)) {if (toString.call(obj[prop]) === '[object Object]') {extended[prop] = _this.mergeAll(extended[prop], obj[prop]);} else {extended[prop] = obj[prop];}}}};for (var i = 0; i < arguments.length; i++) {var obj = arguments[i];_merge(obj);}return extended;},
		minify : function(content) {
		    content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
		    // now all comments, newlines and tabs have been removed
		    content = content.replace( / {2,}/g, ' ' );
		    // now there are no more than single adjacent spaces left
		    // now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
		    content = content.replace( / ([{:}]) /g, '$1' );
		    content = content.replace( /([;,]) /g, '$1' );
		    content = content.replace( / !/g, '!' );
		    return content;
		},

		objectFromPairs : function(arr){return arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});},
		// Optimizes nodes in an HTML document
		optimizeNodes : function(data, regexp, replacer){let count = 0;let output = data;do {output = output.replace(regexp, replacer);count = 0;while (regexp.exec(output) !== null) ++count;} while (count > 0);return output;},
		/** Express a number as an ordinal, e.g. "10th". */
		ordinal : function (num) {if (num > 10 && num < 20) {return num + "th";}return num + ["th","st","nd","rd","th","th","th","th","th","th"][num % 10];},
		printArray : (arr,joiner,el) =>{"use strict";if(isArray(arr)){var str;joiner = joiner || ',';str = arr.join(joiner);if(el&&typeof el === 'object') el.innerHTML = str;else alert(str);}return this;},
		parse : {
			html : function(string,setBase) {
				const context = document.implementation.createHTMLDocument();
				if(setBase ){
					// Set the base href for the created document so any parsed elements with URLs

					// are based on the document's URL
					const base = context.createElement('base');
					base.href = document.location.href;
					context.head.appendChild(base);
				}
				context.body.innerHTML = string;
				return context.body.children;
			},
			jade : function(data){return data;},
			json : function(data){try{data = JSON.parse(data+"");} catch (e){} return data;},
			markdown : function (str){
				// Replaces 'regex' with 'replacement' in 'str'

				// Curry function, usage: replaceRegex(regexVar, replacementVar) (strVar)
				const replaceRegex = function(regex, replacement){return function(str){return str.replace(regex, replacement);}}
				// Regular expressions for Markdown (a bit strict, but they work)
				const codeBlockRegex = /((\n\t)(.*))+/g;
				const inlineCodeRegex = /(`)(.*?)\1/g;
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
			},
			template : function(str, _params){
				var out,params ={};
				if(isString(params)){
					params.tmpl = _params;
				} else if(isPlainObject(_params)){
					params = _pbd.extend({},_params);
				} else if(isArray(_params)){
					params = this.zipObject(["tmpl","parser"], _params);
				}
				str = ( isFile(params.tmpl) || isUrl(params.tmpl) ) ? GET(params.tmpl).response() : isElement(params.tmpl) ? params.tmpl.innerHTML : isString(params.tmpl) && ( tmp = $one(params.tmpl) ) ? tmp.innerHTML : "";
				if(!("parser" in params) || ! isFunction(params.parser) ) params.parser = native_parser;
				out = params.parser(str);
				function native_parser(str){var fn = "var p=[]; p.push('" + str.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "',$1,'").split("<%").join("');").split("%>").join("p.push('") + "'); return p.join('');";return new Function("o", fn);};
				return out;
			},
			xml : function(data){var xml;if(!data || typeof data !== "string"){return null;}try{xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );} catch ( e ) {xml = undefined;}if( !xml || xml.getElementsByTagName( "parsererror" ).length ){alert( "Invalid XML: " + data );this.error( "Invalid XML: " + data );}return xml;}
		},
		/** Express a number as a percent, e.g. "123.45%". precision defaults to 0. */
		percent : function (num, precision) {return (num < 1 ? num * 100 : num).toFixed(precision || 0) + "%";},
		percentToPixel : function(elemValue,value) {var newValue,percent;if(value && typeof value === 'string' && (/\%/g).test(value) ){percent = value.replace('%','');newValue = (elemValue*percent)/100;}return isNil(newValue) ? value : newValue;},
		/*!
		 * Create a new object composed of properties picked from another object
		 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
		 * @param  {Object} obj   The object to pick properties from
		 * @param  {Array}  props An array of properties to use
		 * @return {Object}       The new object
		 */
		pick : function (obj, props) {'use strict';if (!obj || !props) return;var picked = {};if(isArray(props)){props.forEach(function(prop) {picked[prop] = obj[prop];});}return picked;},
		/*
		prettyBytes(1000); // "1 KB"
		prettyBytes(-27145424323.5821, 5); // "-27.145 GB"
		prettyBytes(123456789, 3, false); // "123MB*/
		/* Returns all indices of `val` in an array.
		* If `val` never occurs, returns `[]`.
		* Use `Array.prototype.reduce()` to loop over elements and store indices for matching elements.
		* Return the array of indices.
		*/
		prettyBytes : function(num, precision = 3, addSpace = true){
			const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
			const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
			const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
			return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
		},
		putHTML : function(content, target){if(target = typeof target === 'object' ? target: typeof target === 'string' ? $all(target) : ""){if(isElement(target)) target.innerHTML = this.get.body(content);return this;} else return this.get.body(content);},
		removeNonASCII, 
		removeFalsy : function(arr){return arr.filter(Boolean);},
		/** Repeat a string. Count defaults to 2; separator defaults to "". */
		repeat : function (str, count, separator) {return new Array(+count || 2).join(str + (separator || "")) + str;},
		replaceAll, 
		safeJSON, safeJson: safeJSON, 
		setAttr : function(node, attribute, value){if(isElement(node)){if(isString(attribute)){if (attribute == "class") node.className = value;else if (attribute == "checked") node.defaultChecked = value;else if (attribute == "for") node.htmlFor = value;else if (attribute == "style") node.style.cssText = value;else node.setAttribute(attribute, value);} else if(isObject(attribute)){/*Object.assign(node,attribute);*/for(var i in attribute){node.setAttribute(i, attribute[i]);}return this;}} else handleError("_pbd.setAttr() : The Element Node selected is not a valid [HTMLElement]"+node);},
		setNodeAttribute : function(node, attribute, value) {if (attribute == "class") node.className = value;else if (attribute == "checked") node.defaultChecked = value;else if (attribute == "for") node.htmlFor = value;else if (attribute == "style") node.style.cssText = value;else node.setAttribute(attribute, value);return this;},
		setThis: function (obj, key) {this[key || 0] = obj; return this;},
		/*! Serialize all form data into a query string */
		serialize : function (form) {
			var serialized = [];
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
			return serialized.join('&');
		},
		serializeArray : function (arr) {var serialized = [];return serialized;},
		serializeCookie : (name, val) =>  "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(val)),
		//serializeForm : (form) => Array.from(new FormData(form), (field) => field.map(encodeURIComponent).join('=');).join('&'),
		/** Converts object to query string */
		serializeObj : ( obj, prefix ) => {"use strict";var str = [];for ( var prop in obj ) {if ( obj.hasOwnProperty( prop ) ) {var k = prefix ? prefix + '[' + prop + ']' : prop, v = obj[prop];str.push( typeof v === 'object' ? this.serializeObj( v, k ) : encodeURIComponent( k ) + '=' + encodeURIComponent( v ) );}}return str.join( '&' );},
		/**

		 * Randomly shuffle an array
		 * https://stackoverflow.com/a/2450976/1293256
		 * @param  {Array} array The array to shuffle
		 * @return {String}      The first item in the shuffled array
		*/
		shuffle : function (array) {var currentIndex = array.length, temporaryValue, randomIndex;while (0 !== currentIndex) {randomIndex = Math.floor(Math.random() * currentIndex);currentIndex -= 1;temporaryValue = array[currentIndex];array[currentIndex] = array[randomIndex];array[randomIndex] = temporaryValue;}return array;},
		sleep : function sleep(ms) {return new Promise(function (resolve) {return setTimeout(resolve, ms);});},
		styleElement(elem, styles){
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
				/* for (const [i, x] of Array.from(elem).entries()) {Object.assign(x.style, obj);} */
				/* if(isArrayLike(el) ||(el.length && el.length > 0)) {
					for(var i=0; i<el.length; i++){var elem = el[i];if(elem) for (var property in styles) elem.style[property] = styles[property];}
					//this.each(el,function(i){for (var property in styles) el[i].style[property] = styles[property]});
				} else {for (var property in styles) el.style[property] = styles[property];}*/ 
			}
			return this;
		},
		tag: function tag(tagName, attributes){
			//const node = tag$1(tagName, attributes);
			const node = tag$1.apply(null, [...arguments]);
			return node;
		}, 
		/*! Convert a string to title case * source: https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js */
		toTitleCase : function (str) {str = str.toLowerCase().split(' ');for (var i = 0; i < str.length; i++) {str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);}return str.join(' ');},
		unescapeHTML, unescapeHtml:unescapeHTML, 
		uppercase: function (str) {return String(str).toUpperCase();},
		url : {
			createURL : function(blob){var URL = window.URL || window.webkitURL;var url = URL.createObjectURL(blob);return url;},
			revokeURL: function (url) {var URL = window.URL || window.webkitURL;URL.revokeObjectURL(url);return true;},
			/** Get the domain name from a url. */
			domainName : function(url){if (!url) {throw new Error("url is undefined or empty");}return url.match(rURI)[3];},
			/** Get the port for a given URL, or "" if none */
			port : function(url){if (!url) {throw new Error("url is undefined or empty");}return url.match(rURI)[4] || "";},
			/** Returns  a string containing the schema, domain and if present the port */
			location : function(url){
				if (!url) {throw new Error("url is undefined or empty");}
				if (/^file/.test(url)) {throw new Error("The file:// protocol is not supported");}
				var m = url.toLowerCase().match(rURI);
				//if the origin is non standard url, such as chrome extensions
				if (!m) {return '';}
				var proto = m[2], domain = m[3], port = m[4] || "";
				if ((proto == "http:" && port == ":80") || (proto == "https:" && port == ":443")) {
					port = "";
				}
				return proto + "//" + domain + port;
			},
			/** Resolves a relative url into an absolute one. */
			resolveUrl : function(url){if (!url) {throw new Error("url is undefined or empty");}url = url.replace(rDoubleSlash, "$1/");if (!url.match(/^(http||https):\/\//)) {var path = (url.substring(0, 1) === "/") ? "" : location.pathname;if (path.substring(path.length - 1) !== "/") {path = path.substring(0, path.lastIndexOf("/") + 1);}url = location.protocol + "//" + location.host + path + url;}while (rParent.test(url)) {url = url.replace(rParent, "");}return url;}
		},
		walk, 
		wrap : {
			/* Wrap text blocks (delimited by line breaks) in <p>...</p>. */
			grafs : function (str) {return str.replace(/(.+)/g, function (s, p1) {return "<p>" + p1 + "</p>";});},
			/* Inject values into string with numeric tokens, e.g. "a=[0]&b=[1]". This is a templating function in itself. */
			inject : function (str) {var args = arguments;return str.replace(/\[(\d+)\]/g, function (s, i) {return args[+i + 1] || "";});},
			/* Wrap all URLs in links. */
			links : function (str) {return str.replace(/\b(https?:[^\b\s]+)\b/g, "<a href=\"$1\">$1</a>");},
			indentString : function(str, count, indent = ' ') {return str.replace(/^/gm, indent.repeat(count));},
			/** Insert `what` to string at position `index`. */
			// var str = 'foo baz';
			// alert(str.insert('bar ', str.length) );  // "foo bar baz"
			// alert( str.insert('bar ') );  // "bar foo baz"
			// Use case: Lets say you have full size images using a naming convention but can't update the data to also provide thumbnail urls.
			// var url = '/images/myimage.jpg';
			// var thumb = stringInsert(url,-4, '_thm');
			//   result:  '/images/myimage_thm.jpg'
			// use a negative index to insert relative to the end of the string.
			insertString : function (str, index, value,_use) {
				_use = _typeof(_use,"string") && _use.length > 4 ? _use : "slice";
				var ind = index < 0 ? str.length + index  :  index;
				if(_use === "slice" || _use === "") return str.slice(0, ind) + value + str.slice(ind);
				else if(_use === "substring") return  str.substring(0, ind) + value + str.substring(ind, str.length);
				else if(_use === "regexp" || _use === "RegExp") return  index > 0 ? str.replace(new RegExp('.{' + index + '}'), '$&' + value) : value + str;
			},
			/** Wrap an address in a Google Maps link. */
			map : function (addr) {return "<a href=\"http://maps.google.com/maps?q=" + encodeURI(addr) + ">" + addr + "</a>";},
			/** Format a U.S. phone number string as "(###) ###-####". */
			phone : function (str) {var s = str.replace(/[^\d]/g, "");return "(" + s.substr(0, 3) + ") " + s.substr(3, 3) + "-" + s.substr(6, 4);},
			string: function (str){
				// * list item 1 /- /^(?:\d+\.|[*+-]) .*(?:\r?\n(?!(?:\d+\.|[*+-]) ).*)*/gm
				// "*This is italic*".replace(/\*(.*?)\*/gi, '<span style="font-style: italic">$1</span>');
				// "[Google](http://google.com)".replace(/\[(.*?)\]\((.*?)\)/gi, '<a href="$2">$1</a>');
				if( (/\*(.*?)\*/gi).test(str) ) str.replace(/\*(.*?)\*/gi, '<span style="font-style: italic">$1</span>');
				if( (/\[(.*?)\]\((.*?)\)/gi).test(str) ) str.replace(/\[(.*?)\]\((.*?)\)/gi, '<a href="$2">$1</a>');
				return str;
			},
			tweet : function (str) {return str.replace(/(@\w+)/g, "<a href=\"http://twitter.com/#!/$1\">$1</a>");}
		},
		/* Converts a given string into an array of words.
		* Use `String.prototype.split()` with a supplied pattern (defaults to non-alpha as a regexp) to convert to an array of strings. Use `Array.prototype.filter()` to remove any empty strings.
		* Omit the second argument to use the default regexp.
		* words('I love javaScript!!'); // ["I", "love", "javaScript"]
		* words('python, javaScript & coffee'); // ["python", "javaScript", "coffee"]
		*/
		words : (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean),
		//words(str) {var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /[^a-zA-Z-]+/;return str.split(pattern).filter(Boolean);},
		/* Creates a new array out of the two supplied by creating each possible pair from the arrays.
		* Use `Array.prototype.reduce()`, `Array.prototype.map()` and `Array.prototype.concat()` to produce every possible pair from the elements of the two arrays and save them in an array.
		* xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
		 */
		xProd : (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []),
		//xProd(a, b) {return a.reduce(function (acc, x) {return acc.concat(b.map(function (y) {return [x, y];}));}, []);},
		/* Given an array of valid property identifiers and an array of values, return an object associating the properties to the values.
		* Since an object can have undefined values but not undefined property pointers, the array of properties is used to decide the structure of the resulting object using `Array.prototype.reduce()`.
		* zipObject(['a', 'b', 'c'], [1, 2]); // {a: 1, b: 2, c: undefined}
		* zipObject(['a', 'b'], [1, 2, 3]); // {a: 1, b: 2}
		*/
		zipObject : (props, values) => props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {}),
		/*
		children:function(c){var d=c.childNodes,b=[],a=d.length;while(a--){if(d[a].nodeType==1){b.unshift(d[a])}}return b},
		docHeight:function(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)},
		setText:function(a,b){if(a.textContent){a.textContent=b}else{a.innerText=b}},
		setData:function(b,a,c){if(b.dataset){a=a.replace(/[-_]([a-z])/g,function(d){return d[1].toUpperCase()});b.dataset[a]=c}else{b.setAttribute("data-"+a,c)}},
		getData:function(b,a){var c=null;if(b.dataset){a=a.replace(/[-_]([a-z])/g,function(d){return d[1].toUpperCase()});c=b.dataset[a]}else{c=b.getAttribute("data-"+a)}return c},
		*/
	});
	_pbd.zoomImage = (id,how,zoom) => {
		let img = $one(id);
		if(!isElement(img)) return;
		zoom = zoom??1.5;
		how = how || 'in';
		var imageStyle = img.style, imgW = img.width,imgH = img.height,
		zoomW = how === 'in' ? (imgW*zoom) : (imgW/zoom), zoomH = how === 'in' ? (imgH*zoom) : (imgH/zoom);
		imageStyle.cssText += `width:${zoomW}px;height:${zoomH}px;transition: all 600ms ease-out`;
		_pbd.animation.fade(id,0,100,1900);
		
		return this;
	}
	_pbd.zoomIn = (id,zoom) => {_pbd.zoomImage(id, 'in', zoom);return this;}
	_pbd.zoomOut = (id,zoom) => {_pbd.zoomImage(id, 'out', zoom);return this;}
	//bg_size_x = ((img.offsetWidth>0?img.offsetWidth:img.parentElement.offsetHeight) * zoom),
	//bg_size_y = ((img.offsetHeight>0?img.offsetHeight:img.parentElement.offsetHeight) * zoom);
	let fx = 1, fy = 1;
	_pbd.flipImage = function (img, axis){
		img = $one(img);
		if(!isElement(img)) return "";
		if(axis === "vertical" || axis === "v"){
			if(img.classList.contains("flipped-vertically")){
				_pbd.flipImage.fx = fx = '1';
				img.classList.remove("flipped-vertically");
			} else {
				_pbd.flipImage.fx = fx = '-1';
				img.classList.add("flipped-vertically");
			}
		} else {
			if(img.classList.contains("flipped-horizontally")){
				_pbd.flipImage.fy = fy = '1';
				img.classList.remove("flipped-horizontally");
			} else {
				_pbd.flipImage.fy = fy = '-1';
				img.classList.add("flipped-horizontally");
			}
		}
		
		//img.style.transform =  `scale(${fx}, ${fy})`;
		img.style.transform =  `scale(${_pbd.flipImage.fx}, ${_pbd.flipImage.fy})`;
	}
	_pbd.flipImage.fx = 1;
	_pbd.flipImage.fy = 1;

	_pbd.liveEdit = _pbd.throttle(function(input, output,) {
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
	function adjustCSS(elem, prop, valueParts) {
		var adjusted, scale, maxIterations = 20, currentValue = function() {return _pbd.css( elem, prop, "" )},
			initial = currentValue(), unit = valueParts && valueParts[ 3 ] || ( _pbd.cssNumber[ prop ] ? "" : "px" ),
			initialInUnit = elem.nodeType && ( _pbd.cssNumber[ prop ] || unit !== "px" && +initial ) && rcssNum.exec(_pbd.css(elem, prop));

		if(initialInUnit && initialInUnit[ 3 ] !== unit) {
			initial = initial / 2;
			unit = unit || initialInUnit[ 3 ];
			initialInUnit = +initial || 1;
			while ( maxIterations-- ) {
				_pbd.style( elem, prop, initialInUnit + unit );
				if (( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0) {
					maxIterations = 0;
				}
				initialInUnit = initialInUnit / scale;

			}

			initialInUnit = initialInUnit * 2;
			_pbd.style( elem, prop, initialInUnit + unit );
			valueParts = valueParts || [];
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ? initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] : +valueParts[ 2 ];
		}
		return adjusted;
	}
	
	var swap = function( elem, options, callback ) {
		var ret, name, old = {};
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};
	// Return a potentially-mapped _pbd.cssProps or vendor prefixed property
	function finalPropName( name ) {
		var cssPrefixes = [ "Webkit", "Moz", "ms" ], vendorProps = {}, 
		vendorPropName = function ( name ) {var capName = name[ 0 ].toUpperCase() + name.slice( 1 ), i = cssPrefixes.length;while ( i-- ) {name = cssPrefixes[ i ] + capName;if ( name in emptyStyle ) {return name;}}}, 
		final = _pbd.cssProps[ name ] || vendorProps[ name ];
		
		if ( final ) {
			return final;
		}
		if ( name in emptyStyle ) {
			return name;
		}
		return vendorProps[ name ] = vendorPropName( name ) || name;
	}
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
		// Retrieving style before computed somehow fixes an issue with getting wrong values on detached elements
		style = elem.style;
		computed = computed || getStyles( elem );// || elementStyle( elem );
		if(computed){
			ret = computed.getPropertyValue(name) || computed[name];
			if(ret === "") {
				ret = _pbd.style(elem, name);
			}
			
		}

		return ret !== undefined ? ret + "" : ret;
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

	_pbd.event = _pbd.fn.event = function (_newConfig){
		_newConfig = _newConfig || {};
		
		const _this = this;
		let _defaultConfig = {
			debugMode : false,
			errorMessages : []
		}
		this.eventConfig = _pbd.extend(_defaultConfig,_newConfig);
		
		var browser = _pbd._browser(),
		isButton = function(event, code) {
			if (browser.IE) {
				var buttonMap = { 0: 1, 1: 4, 2: 2 };
				return event.button == buttonMap[code];
			} else if (browser.webkit) {
				switch (code) {
					case 0: return event.which == 1 && !event.metaKey;
					case 1: return event.which == 1 && event.metaKey;
					default: return false;
				}
			} else {
				return event.which ? (event.which === code + 1) : (event.button === code);
			}
		};/* */
		return {
			__proto__ : _pbd,
			events: [],
			eventConfig : this.eventConfig,
			handlerId : 1,
			add : function(elem, type, selector, data, handler, useCapture){
				if(elem && ( isElement(elem) || isADocument(elem) || isWindow(elem))){
					if (useCapture === undefined) {
						useCapture = false;
					}
					if (!handler.handlerId) {
						handler.handlerId = this.handlerId++;
					}
					var that = this,
					oldID = "_AKD_old_" + type + handler.handlerId,
					newID = "_AKD_new_" + type + handler.handlerId,
					newFunc = function(evt){
						evt = that.fixEvent(evt||window.event);
						if(!selector) {
							//elem[oldID](null, [evt]);
							handler.apply(this, [evt]);
						} else {
							let target = evt.target.closest(selector); // (1)
							if (!target) return; // (2)
							if (isElement(elem) && !elem.contains(target)) return; // (3)
							if(target.matches(selector)) {
								handler.call(target, evt);
								//return elem[oldID].call(target, evt);
							}
						}
					};
					if(elem.addEventListener) {// DOM Standard
						elem[oldID] = handler;
						elem[newID] = newFunc;
						elem.addEventListener(type,elem[newID], useCapture);
					} else if (elem.attachEvent){// IE
						elem[oldID] = handler;
						elem[newID] = newFunc;
						elem.attachEvent("on"+type, elem[newID]);
					} else {
						elem[oldID] = handler;
						elem[newID] = newFunc;
						eventType = "on" + type;
						if (typeof elem[eventType] == "function"){
							var oldListener = elem[eventType];
							elem[eventType] = function(){
								oldListener();
								return handler();
							};
						} else {
							elem[eventType] = handler;
						}
					}
				}
				return this;
			},
			remove : function(elem, type, handler,useCapture) {
				if( elem && (isElement(elem) || isDocument(elem) || isWindow(elem))){
					if (useCapture === undefined) {
						useCapture = false;
					}
					var that = this,
					oldID = "_AKD_old_" + type + handler.handlerId,
					newID = "_AKD_new_" + type + handler.handlerId;
					if(elem.removeEventListener) {// DOM Standard
						elem.removeEventListener(type, elem[newID], useCapture);
						elem[newID] = null;
						elem[oldID] = null;
					} else if ( elem.detachEvent ) {// IE
						elem.detachEvent( "on"+type, elem[newID] );
						elem[newID] = null;
						elem[oldID] = null;
					} else {// IE
						eventType = "on" + type;
						elem[eventType] = null;
						elem[newID] = null;
						elem[oldID] = null;
					}
					if (handler.handlerId) {
						handler.handlerId = this.handlerId--;
					}
				}
				return this;
			},
			stopDefaultAction : function(event){event.returnValue = false;if (typeof event.preventDefault != "undefined"){event.preventDefault();}return this;},
			fixEvent : function (oEvt) {
				if (isSet(oEvt.fixed) /* && _typeof(oEvt.fixed) !=="undefined" */ && oEvt.fixed === true ) return oEvt;
				var evt = _pbd.extend(oEvt, {});
				//evt.oEvt = oEvt;
				// Event properties
				evt.type = oEvt.type;
				evt.target = oEvt.target || oEvt.srcElement || document;
				if ( evt.target.nodeType == 3 ){evt.target = evt.target.parentNode;}
				evt.timeStamp = oEvt.timeStamp || (new Date()).valueOf();
				// Event methods
				evt.preventDefault = oEvt.preventDefault || function(){
					if ( oEvt.preventDefault ) oEvt.preventDefault();
					else oEvt.returnValue = false;
				}
				evt.stopPropagation = oEvt.stopPropagation || function(){
					if (oEvt.stopPropagation) oEvt.stopPropagation();
					else oEvt.cancelBubble = true;
				}
				// Support: IE<9
				// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
				evt.metaKey = !!evt.metaKey;

				return evt;
			},
			bindEvent: function(targetElement, event, selector, data, callback, useCapture) {
				//elem, types, selector, data, fn, one, useCapture 
				if(useCapture === "undefined"){
					useCapture = false;
				}
				// Types can be a map of types/handlers
				if(typeof event === "object"){
					// ( event-Object, selector, data )
					if(typeof selector !== "string" ){
						// ( event-Object, data )
						data = data || selector;
						selector = undefined;
					}
					for(type in event) {
						this.bindEvent(targetElement, type, selector, data, event[ type ], useCapture );
					}
					return targetElement;
				}
				
				if(data == null && callback == null){
					// ( event, callback )
					callback = selector;
					data = selector = undefined;
				} else if(callback == null) {
					if(typeof selector === "string") {
						// ( event, selector, callback )
						callback = data;
						data = undefined;
					} else {
						// ( event, data, callback )
						callback = data;
						data = selector;
						selector = undefined;
					}
				}
				
				if (callback === false) {
					callback = returnFalse;
				} else if (!callback) {
					return targetElement;
				}
				
				var eventsArr = (rspace.test(event) || event.indexOf(' ') >= 0) ? event.split(" ") : rcomma.test(event) ? event.split(",") : null;
				if(isArray(eventsArr) && eventsArr.length > 1 ){
					var x = 0,total = eventsArr.length;
					for(;x<total;x++){
						//this.unbindEvent(eventsArr[ x ], targetElement);
						this.add(targetElement, eventsArr[ x ], selector, data, callback, useCapture);
						this.events.push({type: eventsArr[ x ], event: callback, target: targetElement});
					}
				} else if(isString(event)){
					//this.unbindEvent(event, targetElement);
					this.add(targetElement, event, selector, data, callback, useCapture);
					this.events.push({type: event, event: callback, target: targetElement});
				} else {
					handleError("The parameter : { event } can only be a string or an array. This was submitted => "+ _typeof(event))
				}
			},
			findEvent: function(event) {
				return this.events.filter(function(evt) {
					return (evt.type === event);
				}, event)[0];
			},
			unbindEvent: function(event, targetElement) {
				var foundEvent = this.findEvent(event);
				if (foundEvent !== undefined) {
					targetElement.removeEventListener(event, foundEvent.event, false);
				}
				this.events = this.events.filter(function(evt) {
					return (evt.type !== event);
				}, event);
			},
			delegate : function(eventType, selector, fn){
				this[0] = this.nodes = isArray(this.nodes) || isArrayLike(this.nodes) ? this.nodes : [this.nodes];
				// this.each(function (elem){
				for(var x =0;x<this.nodes.length;x++){
					var $el = this.nodes[x];
					if ( !isElement($el) ) { return; }
					$el.addEventListener(eventType, function(e) {
						let targets = $all(selector, $el);
						if (!targets) {
							return;
						}
						let $node = e.target;
						for (let i=0; i<targets.length; i++) {
							while ($node) {
								if ($node === targets[i] || targets[i].matches(selector)) {
									//alert($el.id +"-"+$node.id +"-"+targets.length);
									return fn.call($node, e);
									//break;
								}
								$node = $node.parentNode;
								if ($node === $el) {
									break;
								}
							}
						}
					});
				}
				return this;
			},
			on : function ( elem, types, selector, data, fn, one, useCapture ) {
				var origFn, type,typesArr;
				//_this = new Micro()
				if( useCapture === "undefined" ){
					useCapture = false;
				}
				// Types can be a map of types/handlers
				if ( typeof types === "object" ) {
					// ( types-Object, selector, data )
					if ( typeof selector !== "string" ) {
						// ( types-Object, data )
						data = data || selector;
						selector = undefined;
					}
					for ( type in types ) {
						this.event().on( elem, type, selector, data, types[ type ], one );
					}
					return elem;
				}
				if ( data == null && fn == null ) {
					// ( types, fn )
					fn = selector;
					//alert(fn);
					data = selector = undefined;
				} else if ( fn == null ) {
					if ( typeof selector === "string" ) {
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
				if ( fn === false ) {
					fn = returnFalse;
				} else if ( !fn ) {
					return elem;
				}
				if ( one === 1 ) {
					origFn = fn;
					fn = function( event ) {
						// Can use an empty set, since event contains the info
						_this.event(data).remove(event);
						return origFn.apply( this, arguments );
					};
					// Use same guid so caller can remove using origFn
					fn.guid = origFn.guid || ( origFn.guid = this.guid++ );
				}
				if(isString( types ) && (typesArr = types.split(' ') ) && typesArr.length > 1 ){
					var x = 0,total = typesArr.length;
					for(;x<total;x++){
						_this.each(function(elem) {
							_this.event(data).add( elem, typesArr[ x ], fn, data, selector );
						});
					}
				} else {
					_this.each(function(elem) {
						_this.event(data).add( elem, types, fn, data, selector );
					});
				}
				return this;
			},
			/*!
			 * Emit a custom event
			 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
			 * @param  {String} type   The event type
			 * @param  {Node}   elem   The element to attach the event to
			 * @param  {Object} detail Any details to pass along with the event
			 */
			emitEvent : function (type, elem, detail) {
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
			},
			trigger: function (eventName, elem, detail, custom){
				const $this = this;
				elems = isString(elem) ? $all(elem) : isArray(elem) ? elem : isElement(elem) ? [elem] : window;
				_pbd.each(elems, function(_i, elem){
					elem = isElement(elem) && elem || window
					custom === true ? $this.emitEvent(eventName, elem, detail) : elem.dispatchEvent(new Event(eventName));
				});
				return this;
			},
			isLeftClick:   function(event) { return isButton(event, 0) },
			isMiddleClick: function(event) { return isButton(event, 1) },
			isRightClick:  function(event) { return isButton(event, 2) },
			element: function(event) {
				event = event || window.event;
				var node = event.target || event.srcElement;
				return node.nodeType == Node.TEXT_NODE ? node.parentNode : node;
			},
			findElement: function(event, expression) {
				var element = this.element(event);
				if (!expression) return element;
				var elements = [element].concat(element.ancestors());
				return Selector.findElement(elements, expression, 0);
			},
			pointer: function(event) {
				return {
					x: event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
					y: event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
				};
			},
			pointerX: function(event) { return this.pointer(event).x },
			pointerY: function(event) { return this.pointer(event).y },
			stop: function(event) {
				//Event.extend(event);
				event.preventDefault();
				event.stopPropagation();
				event.stopped = true;
			}
		}
	};
	/**
	 * Fade in shorthand
	 * @param  {HTMLElement} element
	 * @param  {Number|undefined} duration
	 */
	//_pbd.prototype.fadeIn = function(element, duration){this.animation.fade(element, -1, 1, duration);return this;}

	/**
	 * Fade out shorthand
	 * @param  {HTMLElement} element
	 * @param  {Number|undefined} duration
	 */
	//_pbd.prototype.fadeOut = function(element, duration) {this.animation.fade(element, -1, 0, duration);return this;}

	// pbd.animation 
	// ANIMATION ===============
	_pbd.inAnim = _pbd.fn.inAnim = false;
	_pbd.animation = _pbd.fn.animation = /* function animation(_newConfig={}) */{
		//var _this = this || Object.getPrototypeOf(_pbd);
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
		configure : function (_newConfig){
			this.animConfig = _pbd.extend(this._defaultConfig, _newConfig);
		// alert(_this+"-"+ Object.getPrototypeOf(_pbd));
		},
		transitionend_cb: function(el) {let that = this;_pbd.event().add(el, 'transitionend', null, null, function(e){_pbd.inAnim = false;_pbd.event().remove(el, 'transitionend', e=>transitionend_cb(el))},false);},	
		show : function(elem, duration){
			if(elem && elem.style && elem.style.display === "none") {
				duration = duration || this.animConfig.speeds.fast;
				elem.style.transition = `all linear ${duration}ms`;
				elem.style.height = elem.scrollHeight+'px';
				elem.style.display = "block";
			}
			return this;
		},
		hide : function(elem, duration){
			if(elem && elem.style && elem.style.display === "" || elem.style.display === "block") {
				duration = duration || this.animConfig.speeds.fast;
				elem.style.transition = `all linear ${duration}ms`;
				elem.style.height = 0;
				elem.style.display = "none";
			}
			return this;
		},
		showHide : function (id, duration){
			var el = $all(id);
			for(var i = 0; i < el.length; i++) {
			    if(el[i]){
				    if(el[i].style){
				        if(el[i].style.display === '' || el[i].style.display === 'none') {
							//el[i].classList.add('fade');
			        		el[i].style.display = 'block';
				        } else {
							//el[i].classList.remove('fade');
							el[i].style.display = 'none';}
			        } else el[i].setAttribute('style','display:block;');
			    }
			}
		},
		//$._originalDisplay = '';
		toggle(el, ms){
			$._originalDisplay = el.ownerDocument.defaultView.getComputedStyle(el, null).display;
			if (el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none') {
				el.style.display = ''// 'flex' |'inline'|'inline-block'|'inline-table'|'block';
			} else {
				el.style.display = 'none';
			}
			return this;
		}, 
		/* showHide(zap,t1,t2) {
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
		}, */
		/**
		 * Function to fade an element
		 * @param  {HTMLElement} element
		 * @param  {Number} from
		 * @param  {Number} to
		 * @param  {Number} [duration=300]
		 * @param  {Function} callback
		 * @return {void}
		*/
		//fade: function(element, from, to, duration){
		fade : function(element, _from, _to, _duration, _callback) {
			var from, to, duration, callback;
			if(arguments.length >= 2 && isPlainObject(arguments[1])){
				var {from, to, duration, callback} = arguments[1];
			from = parseInt(from, 10), to = parseInt(to, 10), duration = duration ? parseInt(duration, 10) : 600;
			} else {
				//{from:_from, to:_to, duration:_duration, callback:_callback} = arguments;
				[element, from, to, duration, callback] = arguments;
			}
			const start = window.performance.now();
			///element = $.one(element)
			if(from === -1) {
				from = 1 * window.getComputedStyle(element).getPropertyValue('opacity')
			}
			
			element.style.display = "block";
			window.requestAnimationFrame(function step (timestamp) {
				const progress = timestamp - start;
				element.style.opacity = from + (progress / duration) * (to - from);
				if (progress < duration) {
					window.requestAnimationFrame(step)
				} else {
					if(element.style.opacity <= 0) {element.style.display = "none"}
					//if(element.style.opacity >= 1) {element.style.display = "block"}
					if(callback) {callback.call(element)}
				}
			});
			
			return this;
		}, 

		// Native fadeOut
		fadeOut(el, ms) {
			ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || this.animConfig.speeds.fast;
			Object.assign(el.style, {transition: `opacity ${ms}ms`, opacity: 0});
			setTimeout(function (){el.style.display = 'none';_pbd.inAnim = false;}, ms);
			return this;
		}, 
		
		fadeOut2 : function(el, ms) {
			ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || this.animConfig.speeds.fast;
			var _this = this || _pbd.animation, hms = (ms+500);
			if(isElement(el)){
				el.style.opacity = 1;
				//el.style.transition = `opacity ${ms}ms, height ${hms}ms`;
				if(window.requestAnimationFrame){
					var start = null;
					function fadeOut(timestamp) {
						if (!start) start = timestamp;
						var progress = timestamp - start;
						el.style.opacity = parseInt(100 / progress);
						if (progress < ms) {
							_pbd.inAnim = true;
							window.requestAnimationFrame(fadeOut);
						} else {
							_pbd.inAnim = false;
							el.style.display = 'none';
						}
					}
					window.requestAnimationFrame(fadeOut);
				} else /* if (ms && !_pbd.inAnim) */ {
					_pbd.inAnim = true;
					setTimeout(function (){el.style.display = 'none';_pbd.inAnim = false;}, ms);
				}
			}
			return this;
		},
		// Native fadeIn
		fadeIn(el, ms, originalDisplay){
			ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || this.animConfig.speeds.fast;
			originalDisplay = isString(originalDisplay) ? originalDisplay : 'block';
			let opacity = 0;
			
			el.style.opacity = 0;
			el.style.display = originalDisplay;
			const timer = setInterval(function() {
				opacity += 50 / ms;
				if(opacity >= 1) {
					clearInterval(timer);
					opacity = 1;
					_pbd.inAnim = false;
				}
				el.style.opacity = opacity;
			}, 50);
			return this;
		}, 
		fadeIn2 : function(el, ms, originalDisplay) {
			ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || this.animConfig.speeds.fast;
			originalDisplay = isString(originalDisplay) ? originalDisplay : 'block';
			
			var _this = this || _pbd.animation, hms = 400;
			el.style.opacity = 0;
			el.style.display = originalDisplay;
			if(window.requestAnimationFrame){
				var start = null;
				ms = ms > 0 ? ms + 1000 : ms;
				function fadeIn(timestamp) {
					if(!start) start = timestamp;
					var progress = timestamp - start;
					el.style.opacity = parseInt((progress / 100), 10);
					if(progress < ms) {
						_pbd.inAnim = true;
						window.requestAnimationFrame(fadeIn);
					} else {
						_pbd.inAnim = false;
					}
				}
				window.requestAnimationFrame(fadeIn);
			} else {
				_pbd.inAnim = true;
				//el.style.transition = `opacity ${ms}ms, height ${hms}ms`;
				//el.style.opacity = 1;
				let opacity = 0;
				const timer = setInterval(function() {
					opacity += 50 / ms;
					if(opacity >= 1) {
						clearInterval(timer);
						opacity = 1;
						_pbd.inAnim = false;
					}
					el.style.opacity = opacity;
				}, 50);
			}
			
			return this;
		},
		// Adjust the opacity of the element.
		fadeTo(el, ms='slow', o= 0.15){
			ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || 1000;
			o = isNumber(o) || isNumeric(o) ? o : 0.15;
			//el.style.transition = `opacity 3s`; // assume 'slow' equals 3 seconds
			el.style.transition = `opacity ${ms}ms`;
			el.style.opacity = `${o}`;
			return this;
		}, 
		// Display or hide the element by animating their opacity.
		fadeToggle(el, ms='slow'){
			ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || 1000;
			el.style.transition = `opacity ${ms}ms`;
			//const { opacity } = el.ownerDocument.defaultView.getComputedStyle(el, null);
			const opacity = elementStyle(el).opacity;
			if(opacity === '1') {
				el.style.opacity = '0';
			} else {
				el.style.opacity = '1';
			}
			return this;
		}, 
		
		// Display or hide the element with a sliding motion.
		slideToggle(el, ms='slow'){
			ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || 1000;
			const originHeight = '100';
			el.style.transition = 'height 3s';
			const { height } = el.ownerDocument.defaultView.getComputedStyle(el, null);
			if (parseInt(height, 10) === 0) {
				el.style.height = (el.scrollHeight || originHeight) + 'px';
			} else {
				el.style.height = '0px';
			}
			return this;
		}, 
		// Native slideFadeOut
		slideFadeOut : function(el, ms) {
			var _this = this, hms = (ms-400);
			if(typeof el.style.opacity === "undefined") el.style.opacity = 1;
			if( window.requestAnimationFrame ) {
				var start = null;
				Object.assign(el.style, {height: '0px', transition: `height ${hms}ms`});
				function slideFadeOut(timestamp) {
					if (!start) start = timestamp;
					var progress = timestamp - start;
					el.style.opacity = 1 + (progress / ms) * (0 - 1);
					if (progress < ms) {
						_pbd.inAnim = false;
						window.requestAnimationFrame(slideFadeOut);
					} else {
						_pbd.inAnim = false;
					}
				}
				window.requestAnimationFrame(slideFadeOut);
			} else if (ms /*&& !_pbd.inAnim*/) {
				_pbd.inAnim = true;
				Object.assign(el.style, {height: '0px', transition: `opacity ${ms}ms, height ${hms}ms` , opacity: 0});
				setTimeout(function (){/* el.style.height = '0px'; */_pbd.inAnim = false;}, ms);
			} else {
				Object.assign(el.style, {height: '0px', opacity: 0});
				_pbd.inAnim = false;
			}
			
			return this;
		},
		// Native slideFadeIn
		slideFadeIn : function(el, ms) {
			var _this = this, elemHeight = el.scrollHeight, elemHasHeight = isNumber(elemHeight) && elemHeight > 0, hms = ms + 400;
			if(typeof el.style.opacity === "undefined") el.style.opacity = 0;
			if(elemHasHeight === false){
				elemHeight = getBox(el).height;
			}
			
			if(window.requestAnimationFrame) {
				var start = null;
				//ms = ms > 0 ? ms + 1000 : ms;
				Object.assign(el.style, {height: `${elemHeight}px`, transition: `height ${hms}ms`});
				function slideFadeIn(timestamp) {
					if (!start) start = timestamp;
					var progress = timestamp - start;
					el.style.opacity = (parseInt(progress / 100, 10) / ms) * 100;
					if(progress < ms) {
						_pbd.inAnim = true;
						window.requestAnimationFrame(slideFadeIn);
					} else {
						_pbd.inAnim = false;
					}
				}
				window.requestAnimationFrame(slideFadeIn);
			} else if (ms /*&& !_pbd.inAnim*/) {
				_pbd.inAnim = true;
				Object.assign(el.style, {height: `${elemHeight}px`, transition: `opacity ${ms}ms, height ${hms}ms` , opacity: 1});
				
				let cb = function(event) {_pbd.inAnim = false;el.removeEventListener('transitionend', cb)};
				el.addEventListener('transitionend', cb, false);
			} else {
				_pbd.inAnim = false;
				Object.assign(el.style, {height: `${elemHeight}px`, opacity: 1});
			}
			
			return this;
		},
		slideUp(el, ms='slow'){
			ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || 1500;
			Object.assign(el.style, {height: '0px', transition: `height ${ms}ms`});
			
			let cb = function(event) {_pbd.inAnim = false;el.removeEventListener('transitionend', cb)};
			el.addEventListener('transitionend', cb, false);
			return this;
		}, 
		slideDown(el, ms='slow'){
			ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || 1500;
			const originHeight = getBox(el).height || '100', elemOpacity = elementStyle(el).opacity, oms = ms > 1000 ? (ms - 1000) : (ms + 1000);
			if(elemOpacity === 0 || elemOpacity === '0') el.style.opacity = 1;
			Object.assign(el.style, {transition: `opacity ${ms}ms, height ${ms}ms`, height: (el.scrollHeight || originHeight) + 'px'});
			
			let cb = function(event) {_pbd.inAnim = false;el.removeEventListener('transitionend', cb)};
			el.addEventListener('transitionend', cb, false);
			return this;
		}, 
		slideIn : function(el, ms, axis) {
			var _this = this, ms = isNumber(ms) && ms || this.animConfig.speeds[ms] || 1500, oms = (ms > 1000 ? ms -1000 : 1000);
			if(!inArray(axis, ['x', 'X', 'y', 'Y'])) axis = 'x';
			_pbd.inAnim = true;
			/* if(window.requestAnimationFrame){var start = null;function slideIn(timestamp) {if (!start) start = timestamp;var progress = timestamp - start;//elem.style.transition = `opacity ${ms}ms, height ${hms}ms`;//elem.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';elem.style.opacity = parseInt(progress / 100);if (progress < ms) {window.requestAnimationFrame(slideFadeIn);} else {elem.style.height = elem.scrollHeight+"px";}}window.requestAnimationFrame(slideIn);} else  */
			if(ms){
				Object.assign(el.style, {transform: axis === 'x' ? 'translateX(0%)' : 'translateY(0%)', transition: `transform ${ms}ms`});
				let cb = function(event) {_pbd.inAnim = false;el.removeEventListener('transitionend', cb)};
				el.addEventListener('transitionend', cb,false);
			} else {
				el.style.transform = axis === 'x' ? 'translateX(0%)' : 'translateY(0%)';
			}
			return this;
		},
		slideOut : function(el, ms, axis) {
			var _this = this, ms = isNumber(ms) && ms || this.animConfig.speeds.fast || 1500, oms = (ms > 1000 ? ms -1000 : 1000);
			if(!inArray(axis, ['x', 'X', 'y', 'Y'])) axis = 'x';
			_pbd.inAnim = true;
			if(ms){
				Object.assign(el.style, {transform: axis === 'x' ? 'translateX(-100%)' : 'translateY(-100%)', transition: `transform ${ms}ms`});
				let cb = function(event) {_pbd.inAnim = false;el.removeEventListener('transitionend', cb)};
				el.addEventListener('transitionend', cb,false);
			} else {
				el.style.transform = axis === 'x' ? 'translateX(-100%)' : 'translateY(-100%)';
			}
			return this;
		},
		toggleSlide(zap,axis,reverse,_from,_to,duration) {
			var _this = this, t;
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
		},
		kadabra(zap,reverse,axis,duration,margin) {
			if(reverse == null) var reverse = false;
			if(axis == '' || axis == null) var axis = 'y';
			if(duration == '' || duration == null) var duration = '1800ms';
			if(margin == '' || margin == null) var margin = 'auto';
			var brColor = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6);
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
					Object.assign(abra, {position: 'relative', borderColor: brColor, transition: `all ${duration} linear`});
					if(reverse==true) abra.right = '0';
					else abra.left = '0';
					expanded = false;
				} else {
					Object.assign(abra, {position: 'fixed', borderColor: brColor, transition: `all ${duration} linear`});
					if(reverse==true) abra.right = '-'+abra.width;
					else abra.left = '-'+abra.width;
					//abra.marginLeft = '-500px';//abra.left = '-'+margin;
					expanded = true;
				}
			}
			return this;
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
		setOpacity : function(id, opacity){
			var el = $one(id);
			_pbd.styleElement(el,{
				"opacity":(opacity / 100),"MozOpacity":(opacity / 100),
				"filter":'alpha(opacity=' + opacity + ')',"KhtmlOpacity":(opacity / 100)/*,visibility:"visible",transition:"all linear 600ms"*/
			});
			return this;
		},
		fadeOpacity : function(id, opacityStart, opacityEnd, msToFade){
			var _this = this, element = $one(id);
			//element.style.transition = `opacity ${msToFade}ms`;
			if(msToFade > 0){
				var frames = Math.round((msToFade / 1000) * 30);
				var msPerFrame = Math.round(msToFade / frames);
				var opacityPerFrame = (opacityEnd - opacityStart) / frames;
				var opacity = opacityStart;
				for (frame = 1; frame <= frames; frame++){
					setTimeout(function(){_this.setOpacity(element, opacity)},(frame * msPerFrame));
					opacity += opacityPerFrame;
				}
				if (opacityEnd == 0){
					setTimeout(function(){element.style['visibility'] = 'collapse';},((frames+1) * msPerFrame));
					//setTimeout('id_obj.style.visibility=\'hidden\'',((frames+1) * msPerFrame));
				} else {
					setTimeout(function(){_pbd.styleElement(element,{'visibility': 'visible','display':'block'});_this.setOpacity(id,opacityEnd)},((frames+1) * msPerFrame));
				}
			} else {
				this.setOpacity(element, opacityEnd);
				if (opacityEnd == 0){
					element.style['visibility'] = 'collapse';
				}
			}
			return this;
		},
		keyframes : (el, _keyframes, _keyframeOptions) => {
			var _default_keyframe_options = {
				autoplay : true,
				duration: 1000,
				delay : 0,
				fill: 'forwards', // none, forwards, backwards, both
				easing: 'ease-in' // linear, ease, ease-in, ease-in-out, frames( integer )
				/* 
				direction : "" // normal, reverse, alternate, alternate-reverse
				iterations : 1, // (1 - ...) , infinity
				iterationStart : 0.0
				 */
			},
			that = this;
			this.keyframeOptions = _pbd.extend(_default_keyframe_options, _keyframeOptions);
			this.keyframeAnimation = el.animate(_keyframes, this.keyframeOptions);
			this.step = 0.2;
			this.keyframeOptions.autoplay === true ? this.keyframeAnimation.play() : this.keyframeAnimation.pause();
			var kfAnim = function (kfAnim) {
				this.play = function (){kfAnim.play(); return this;};
				this.pause = function (){kfAnim.pause(); return this;};
				this.reverse = function (){kfAnim.reverse(); return this;};
				this.cancel = function (){kfAnim.cancel(); return this;};
				this.finish = function (){kfAnim.finish(); return this;};
				this.currentTime = function (time){if( time ) {kfAnim.currentTime += time; return this;} else {return kfAnim.currentTime;}};
				this.startTime = function (time){if( time ) {kfAnim.startTime += time; return this;} else {return kfAnim.startTime;}};
				this.playback = function (val){
					if( isString(val) ){
						if(val === "+" || val === "faster") kfAnim.playbackRate = (kfAnim.playbackRate + that.step);
						else if(val === "-" || val === "slower") kfAnim.playbackRate = (kfAnim.playbackRate - that.step);
						else if(val === "=" || val === "normal") kfAnim.playbackRate = 1;
					} else if( isInteger(val) ){
						kfAnim.playbackRate = val < 1 ? val : 1;
					} else {
						if(val === true) kfAnim.playbackRate = (kfAnim.playbackRate + that.step);
						else if(val === false) kfAnim.playbackRate = (kfAnim.playbackRate - that.step);
						else if(val === "" || val === null) kfAnim.playbackRate = 1;
					}
					return this;
				};
				this.delay = function ( ms ){
					if( ms ){
						that.keyframeOptions.delay = ms;
					}
					return this;
				};
				this.config = function(key, val){
					if( isPlainObject(key) ){
						that.keyframeOptions = _pbd.extend(that.keyframeOptions, key);
					} else if(key && val){
						that.keyframeOptions[ key ] = val;
					}
					return this;
				};
				return this;
			}
			
			return new kfAnim(this.keyframeAnimation);
		},
		recordAnimationFrames : function(callback, autoStart = true){
			let running = true,raf;
			const stop = () => {
				running = false;
				cancelAnimationFrame(raf);
			};
			const start = () => {
				running = true;
				run();
			};
			const run = () => {
				raf = requestAnimationFrame(() => {
					callback();
					if (running) run();
				});
			};
			if (autoStart) start();
			return { start, stop };
		},
		scrollIndicator(eleId, indicator, bgColor){
		    //var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		    //var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		    //var scrolled = (winScroll / height) * 100;
		    
			//let el = isElement(eleId) ? eleId : getBy("query", eleId), ind_el = isElement(indicator) ? indicator : getBy("query", indicator),
			let el = isElement(eleId) ? eleId : $one(eleId), ind_el = isElement(indicator) ? indicator : $one(indicator),
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
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/*_pbd.each(["inArray", "isArray", "isArrayLike", "isArrayBuffer","isArrayBufferView" ,"isAudioElement", "isBlob" , "isBuffer", "isClass" , "isDate" , "isDocument", "isDocumentFragment" , "isADocument", "isElement", "isEmptyObject", 
		"isFile","isFileName" , "isFormData" , "isFunction","isImage","isImageElement","isLowerCase", "isMediaElement", "isNegativeZero", "isNil", "isNode", "isNull", "isNumber", "isNumeric", "isObject", "isObjectLike", "isPlainObject", "isPromise", "isSelector", "isSet", 
		"isStream", "isString","isStandardBrowserEnv", "isAbsoluteURL", "isValidHttpUrl", "isSymbol", "isTravisCI", "isType", "isTypeof", "isUndefined", "isUpperCase", "isURLSearchParams", "isValidJSON", "isVideoElement", "isWritableStream", "isWindow"], function (i, name){
		var util = _pbd.util(),_name = name.split("is")[1]+"";
		_name = _name.charAt(0).toLowerCase() + _name.slice(1);
		if(isFunction(window[ name+"" ])){_pbd[name] = _pbd.fn[name] = window[name+""];}
		console.log(name, self, isFunction(window[name+""]), isFunction(global[name+""]), isFunction(self[name+""]))
		//else if(_name && (_name in util.is) ){_pbd[ name ] = util.is[ _name ];}
	});*/
	_pbd.each( ("click dblclick auxclick submit " +
		"change input select keydown keypress keyup " +
		"drag dragend dragenter dragexit dragleave dragover dragstart drop " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"touchdown touchup touchmove touchover touchout touchenter touchleave " +
		"pointerdown pointerenter pointerleave pointermove pointerout pointerover pointerup " +
		"canplay canplaythrough durationchange ended pause play playing progress ratechange seeked seeking timeupdate volumechange " +
		"selectionchange selectstart blur focus load loadstart unload " +
		"copy cut contextmenu paste " + 
		"scroll scrollend wheel " +
		"error resize orientationchange hashchange").split(" "), function( i, name ) {
		// Handle event binding
		_pbd.fn[name] = function(data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});
	_pbd.fn.hover = function(fnOver, fnOut){return fnOut ? this.mouseenter(fnOver).mouseleave(fnOut || null) : this.mouseenter(fnOver);}
	_pbd.each(["focusin", "focusout"], function(i, name) {
		_pbd.fn[name] = function(data, fn) {
			var _this = this;
			return this;
		}
	});
	_pbd.each(["fade", "fadeIn", "fadeOut" , "fadeTo", "fadeToggle", "slideFadeIn", "slideFadeOut", "slideIn", "slideOut", "slideUp", "slideDown", "slideToggle", "slideTo", "toggleSlide", "toggle", "show", "hide" , "showHide"], function(i, name) {
		_pbd.fn[name] = function(duration, callback) {
			var _this = this;
			duration = this.animation.animConfig.off ? 0 : 
				duration in this.animation.animConfig.speeds ? this.animation.animConfig.speeds[duration] : 
				isString(duration) ? parseInt(duration) : 
				(isNumber(duration) || isPlainObject(duration)) ? duration : 
				this.animation.animConfig.speeds._default;
				
			this.each(function (elem){
				if(elem && isElement(elem) && (name in _pbd.animation)){
					_this.animation[name](elem,duration,callback);
				}
			});
			return this;
		};
	});
	
	_pbd.each( ["outerHeight", "outerWidth" ], function( i, name ) {
		_pbd.fn[ name ] = function(){
			var that = this, heightOrWidth, 
			_name = name.replace("outer","-"),
			camelizeName = _pbd.camelize("offset"+_name);
			if(isArray(this.nodes) || isArrayLike(this.nodes)){
				heightOrWidth = [];
				this.each(function(elem){
					if(isWindow(elem)) {
						return _pbd.get.windowDimensions()[ _name ];
					} else {
						var _heightOrWidth = elem[ camelizeName ];
						var style = _pbd.get.elementStyle(elem);
						_heightOrWidth += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
					}
					heightOrWidth.push(_heightOrWidth);
				});
				heightOrWidth = _pbd.get.maxOfArray(heightOrWidth);
			} else {
				if(isWindow(this.nodes)) {
					heightOrWidth = _pbd.get.windowDimensions()[ _name ];
				} else {
					heightOrWidth = this.nodes[camelizeName ];
					var style = _pbd.get.elementStyle(this.nodes);
					heightOrWidth += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
				}
			}
			return heightOrWidth;
		};
	});
	_pbd.each(["height", "width"], function (i, name){
		var that = this,elem = callback =null;
		var heightOrWidth = ""+name;
		_pbd.fn[ name ] = function(){
			var that = this,height = elem = callback = null;
			if(arguments && arguments.length > 0 ){
				if( arguments.length === 1){
					heightOrWidth = typeof arguments[0] === 'string' ? _pbd.percentToPixel(window[ _pbd.camelize("inner"+name) ], arguments[0]) : arguments[0] + "px";
				} else if( arguments.length === 2){
					heightOrWidth = typeof arguments[0] === 'string' ? _pbd.percentToPixel(window[ _pbd.camelize("inner"+name) ], arguments[0]) : arguments[0] + "px";
					if(isFunction(arguments[1] )) callback = arguments[1] ;
					else if(_typeof(arguments[1] ) === "object") elem = arguments[1];
				} else if( arguments.length > 2){
					heightOrWidth = typeof arguments[0] === 'string' ? _pbd.percentToPixel(window[ _pbd.camelize("inner"+name) ], arguments[0]) : arguments[0] + "px";
					if(isFunction(arguments[1] )) {callback = arguments[1] ;elem = arguments[2];}
					else if(_typeof(arguments[1] ) === "object") {elem = arguments[1];callback = arguments[2];}
				}
				elem = elem ? (isElement(elem) ? elem : $all(elem)) : this.nodes;
				elem = isArray(elem) || isArrayLike(elem) ? elem : [elem];
				if(callback) _pbd.each(elem,callback);
				else {
					//_pbd.each(elem,function(){
					this.each(function(elem){
						if(!isWindow(elem) ) elem.style[ name ] = heightOrWidth;
					});
				}
				return this;
			} else {
				elem = this.nodes;
				if(isArray(elem) || isArrayLike(elem)){
					heightOrWidth = [];
					_pbd.each(elem,function(i){
						if(isWindow(elem[i])) {
							var w = _pbd.get.windowDimensions()[ name ];
							heightOrWidth.push(w);
						} else {
							_elem = isObject(elem[i]) ? elem[i] : $all(elem[i]);
							var _b = _elem.getBoundingClientRect();
							var style = _pbd.get.elementStyle(_elem);
							var _heightOrWidth = _b[ name ]&&_b[ name ] >0?_b[ name ] : _elem[_pbd.camelize("offset"+name) ];
							if(name === "width") _heightOrWidth += parseInt(style.marginLeft) + parseInt(style.marginRight) + parseInt(style.paddingLeft) + parseInt(style.paddingRight);
							else _heightOrWidth += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
							heightOrWidth.push(parseInt(_heightOrWidth));
						}
					});
					heightOrWidth = _pbd.get.maxOfArray(heightOrWidth);
				} else {
					if(isWindow(elem)){
						heightOrWidth = _pbd.get.windowDimensions()[ name ];
					} else if(isElement(elem)) {
						var style = _pbd.get.elementStyle(elem);
						var _b = elem.getBoundingClientRect();
						//heightOrWidth = style[ name ];
						heightOrWidth = _b[ name ] &&_b[ name ] >0?_b[ name ] : elem[ _pbd.camelize("offset"+name) ];
						if(name === "width") heightOrWidth += parseInt(style.marginLeft) + parseInt(style.marginRight) + parseInt(style.paddingLeft) + parseInt(style.paddingRight);
						else heightOrWidth += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
						heightOrWidth = parseInt(heightOrWidth);
					}
				}
				return heightOrWidth;
			}
		};
	});
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
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
			const $this = this;
			//this.promise = this.promise.finally(cb)
			this.promise = this.promise.then(data => {
				cb(data, this)
				$this._finally(cb)
				return data
			})
			return this
		}
		_finally(cb){
			this.promise = this.promise.finally(cb)
			return this
		}
	}
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
	
	_pbd.extend({
		HTTPStatus: _HTTPStatus, 
		XHR_Obj : false,
		XHR_Url : null,
		XHR_Adapter: null, 
		progressBar : false,
		progressBarExists : !!$one("#progress_bar"),
		responseContent : null,
		active_ajax_calls: 0,
		lastModified: {},// Last-Modified header cache for next request
		etag: {},
		validMethods : ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
		validResposeType : ["arrayBuffer", "blob", "document", "json", "text"],
		isValidMethod : () => !!inArray(this.validMethods, this.ajaxSettings.method), 
		isValidResponseType : () => !!inArray(this.validResponseTypes, this.ajaxSettings.responseType), 
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
			data: null, // formData: null,
			dataType: false,//html
			//dataTypeCallback: false,
			dataTypeCallback : {
				// Convert anything to text
				"* text": String,
				// Text to html (true = no transformation)
				"html": function(str){return str;},
				// Evaluate text as a json expression
				//"text json": JSON.parse,
				"json": _pbd.parseJSON,
				// Parse text as xml
				"xml": _pbd.parseXML,
				//'md': function(str,el){return marked(str,el) || el.innerHTML = marked(str);}
			}, 
			processData : false,
			sendFullResponse : false,
			bodyOnly : false,
			mimeType: null,// "text/html";
			headers : {},
			//validMethods : ["get", "post", "put", "delete"],
			username: null,
			password: null,
			cache : false,
			global: true,
			async: true,
			isUpload : false,
			mode: "cors", 
			crossDomain : false,
			showProgressBar : false,
			// callbacks 
			before : null,
			success : null,
			error : null,
			completed: null,
			then : null,
			onDownloadProgress: null, 
			onUploadProgress: null, 
			// Add custom fields to xhr object
			xhrFields : {},
			responseType: null, //json
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			},
			/**
			* A timeout in milliseconds to abort a request. If set to 0 (default) a
			* timeout is not created.
			*/
			timeout: 0,
			xsrfCookieName: 'XSRF-TOKEN',
			xsrfHeaderName: 'X-XSRF-TOKEN',
			maxContentLength: -1,
			maxBodyLength: -1,
			validateStatus: function validateStatus(status) {
				return status >= 200 && status < 300;
			}, 
			transitional: {
				silentJSONParsing: true,
				forcedJSONParsing: true,
				clarifyTimeoutError: false
			},
			//adapter: getDefaultAdapter(),
			transformRequest: [
				function transformRequest(data, headers) {
					normalizeHeaderName(headers, 'Accept');
					normalizeHeaderName(headers, 'Content-Type');

					if (isFormData(data) || isArrayBuffer(data) || isBuffer(data) || isStream(data) || isFile(data) || isBlob(data)) {
						return data;
					}
					
					if (isArrayBufferView(data)) {
						return data.buffer;
					}
					
					if (isURLSearchParams(data)) {
						setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
						return data.toString();
					}
					
					if (isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
						setContentTypeIfUnset(headers, 'application/json');
						return JSON.stringify(data);
					}
					
					return data;
				}
			],

			transformResponse: [
				function transformResponse(data) {
					var transitional = this.transitional;
					var silentJSONParsing = transitional && transitional.silentJSONParsing;
					var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
					var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

					if (strictJSONParsing || (forcedJSONParsing && isString(data) && data.length)) {
						try {
							return JSON.parse(data);
						} catch (e) {
							if (strictJSONParsing) {
								if (e.name === 'SyntaxError') {
									throw enhanceError(e, this, 'E_JSON_PARSE');
								}
								throw e;
							}
						}
					}
					return data;
				}
			],
		},
		//Merge two or more objects together.
		ajaxExtend : function () {
			var _this = this, extended = this.ajaxSettings || {};
			// Merge the object into the extended object
			var merge = function (obj) {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						if (toString.call(obj[prop]) === '[object Object]') {
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
		supports : function () {return 'XMLHttpRequest' in window && 'JSON' in window && 'Promise' in window;},
		support_ajax_upload_with_progress : function () {
			function supportFileAPI() {var fi = document.createElement('INPUT');fi.type = 'file';return 'files' in fi;};
			function supportAjaxUploadProgressEvents() {var xhr = new XMLHttpRequest();return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));};
			function supportFormData() {return !! window.FormData;}
			return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();
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
		renderResponse : function(elem, result){
			elem = isElement(elem) ? [elem] : isArray(elem) ? elem : $all(elem);
			var $this = this;
			if(elem.length > 0){
				elem.forEach(el => {
					if( isElement(el) ) el.innerHTML = result+"";
				});
				//setTimeout(function(){$this.execJS(elem);}, 1000);
			} else {
				var _id = ('_pbd_response_content_'+_random).replace('.','_'),
				d = _pbd.tag("div", {
					"id" : _id, "class": "__ajax_response-content", "style": 'position:absolute;display:block;margin:0;padding:0;overflow:auto;width:100%;height:auto;min-height:99%;',
					"innerHTML": result
				});
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
					this.execJS(d)
				},10);
			}
			return this;
		},
		execJS : function(node) {
			var strExec, err = [],
			//st = node.getElementsByTagName('SCRIPT'),
			st = $all('SCRIPT'),
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
					//eval(strExec);
					_pbd.globalEval(strExec);
					//_pbd.DOMEval(strExec, st[i]);
				} catch(e){
					//alert(e);
					//err.push(e);
				}
			}
			//if(err.length > 0) console.error(err);
			return this;
		},
		initXHR : function (){
			if(!this.XHR_Obj && typeof XMLHttpRequest !== 'undefined') {try {this.XHR_Obj = new XMLHttpRequest();} catch (e) {this.XHR_Obj=false;}}
			if(!this.XHR_Obj && window.ActiveXObject){var versions = ["MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"];for(var i = 0, len = versions.length; i < len; i++) {try {this.XHR_Obj = new ActiveXObject(versions[i]);break;}catch(e){};}}
			if (!this.XHR_Obj && window.createRequest) {try {this.XHR_Obj = window.createRequest();} catch (e) {this.XHR_Obj=false;}}
			return this.XHR_Obj;
		},
		abortXHR : function(reportTimeout) {if ( this.call_in_progress()) {this.XHR_Obj.abort();if(reportTimeout&& isFunction(reportTimeout))reportTimeout();}return this;},
		pushData : function(objectOrKey, value) {
			switch (typeof objectOrKey){
				case 'object': this.ajaxSettings.data = Object.assign(objectOrKey, this.ajaxSettings.data); break;
				case 'string': this.ajaxSettings.data =  Object.assign({ [objectOrKey] : value}, this.ajaxSettings.data); break;
			}
			return this;
		}, 
		processRequest: function (url, opt, xhr) {
			var tmp, ext = _pbd.get.ext(url), nameOnly = _pbd.get.filename(url);
			if( xhr.responseType.toLowerCase() === "document" ){
				tmp = _pbd.get.body(xhr.responseText);
			} else if( xhr.responseType.toLowerCase() === "blob" || xhr.responseType.toLowerCase() === "arraybuffer" ){
				xhr.timeout = 9999999;
				var isImage = ((opt.dataType && opt.dataType == 'image') || (opt.mimeType && opt.mimeType.indexOf("image") == 0)) ? true : rimage.test(ext);
				if( isImage ){
					var arrayBuffer = xhr.response || xhr.responseText;
					// if you want to access the bytes:
					var byteArray = new Uint8Array(arrayBuffer);
					// If you want to use the image in your DOM:
					var blob = new Blob([arrayBuffer], {type: opt.mimeType || "image/png"});
					//var url = _pbd.url.createURL(blob);
					var url = URL.createObjectURL(blob);
					tmp = url;
					//_pbd.url.revokeURL(url);
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
				} else if( isXML || isFEED ) {try{tmp = parseXML(xhr.responseXML ? xhr.responseXML : xhr.responseText)}catch(e){tmp = _pbd.formatException(e);}}
				else if( isJSON ) {try{tmp = parseJSON(xhr.responseJSON ? xhr.responseJSON : xhr.responseText);}catch(e){tmp = _pbd.formatException(e);}}
				else if( isImage ) tmp = '<img src="'+url+'" alt="'+nameOnly+'" style="top:40%;right:25%;bottom:40%;left:25%;width:auto;height:auto;margin:auto;border:1px dotted #ff0009;"/>';
				else if( isScript ) tmp = '<pre style="height:auto;overflow:auto;background:#e0f6ff;color:#000;padding:20px 30px 20px;margin:10px auto;font-family:Monaco,\'Lucida Console\',\'Courier New\',Courier,Monospace;font-size:12px">'+xhr.responseText+'<\/pre>'; 
				else if( isHTML ) {
					tmp = (isSet(opt.bodyOnly) && opt.bodyOnly) ? _pbd.get.body(xhr.responseText) : xhr.responseText;
				} else tmp = '<pre>'+xhr.responseText+'</pre>';
			}
			return tmp;
		},
		// AJAX: Public Methods 
		// Push data (key and value) or object
		setData : function(objectOrKey, value) {this.pushData(objectOrKey, value);return this;},
		// Set URL
		setUrl : function(url) {this.ajaxSettings.url=url;this.XHR_Obj.responseURL = url;this.XHR_Url = url;return this;},
		// Set method (POST or GET)
		setMethod : function(method) {method = method.toUpperCase();this.ajaxSettings.method = inArray(method,this.validRequestMethods) ? method : "GET";return this;},
		// Set mine type
		setMime : function( type ) {if ( this.completed == null ) {this.ajaxSettings.mimeType = type;}return this;},
		// Set request header
		setHeader : function (key , value){this.XHR_Obj.setRequestHeader(key,value);return this;},
		setHeaders: function(headers) {for (var i in headers) {if(headers[ i ] !== undefined) {this.XHR_Obj && this.XHR_Obj.setRequestHeader(i, headers[ i ] + "");}}}, 
		serializeParams: function(data, url) {
			var arr = [], str;
			this.XHR_Url = url;
			
			for(var name in data) {
				arr.push(name + '=' + encodeURIComponent(data[name]));
			}
			str = arr.join('&');
			if(str != '') {
				this.XHR_Url = url ? (url.indexOf('?') < 0 ? '?' + str : '&' + str) : str;
				return url ? (url.indexOf('?') < 0 ? '?' + str : '&' + str) : str;
			}
			return '';
		}, 
		settle: function(resolve, reject, response) {
			var validateStatus = response.config.validateStatus;
			if (!response.status || !validateStatus || validateStatus(response.status)) {
				resolve(response);
			} else {
				reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
			}
			return this;
		}, 
		/////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////// METHODS ///////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		xhr: function(opt){
			const _this = this;
			if(typeof opt == 'string') opt = { url: opt };
			opt = _pbd.extend(this.ajaxSettings, opt)
			opt.url = opt.url || location.href;
			opt.method = (opt.method || 'GET').toUpperCase();
			opt.data = opt.data || {};
			
			this.XHR_Url = opt.url;
			
			// Promise resolve and reject
			var promise = {
				resolve: function (result){console.log("request has been successful <br> "+result.responseText)},
				reject:function (err){console.error("an error has been detected - <br> ", err.statusText, err.responseText)}
			}
			// Callback function 
			var defaultCallBack = function(request, xhr) {
				// alert(request.status);
				// Request not finished
				//if (request.readyState != 4) return;
				// Check status and reject in case of failure
				if(request.status<200 || request.status>299) { promise.reject(request); return;}
				// Success, resolve response
				promise.resolve(request.responseText);
			};
			
			var request = request && request instanceof XMLHttpRequest ? request : (this.XHR_Obj && this.XHR_Obj instanceof XMLHttpRequest ? this.XHR_Obj : this.initXHR());
			
			var api = {
				host: this.host || _this,
				globalResult : "no result/data",
				process: function(params) {
					params = isPlainObject(params) && _pbd.extend(opt, params) || opt;
					var self = this;
					this.xhr = _this.initXHR();
					if(this.xhr) {
						_this.active_ajax_calls++;
						
						this.xhr.responseURL = params.url;
						_this.XHR_Url = params.url;
			
						this.beforeCallback && this.beforeCallback.apply(this.host, [this.xhr, _this]);
						
						this.xhr.onreadystatechange = () => {
							if(self.xhr.readyState == 4 && self.xhr.status == 200) {
								var result = self.xhr.responseText;
								if(params.json === true && typeof JSON != 'undefined') {
									result = JSON.parse(result);
								}
								self.doneCallback && self.doneCallback.apply(self.host, [result, self.xhr]);
							} else if(self.xhr.readyState == 4) {
								var nStatus = this.status;
								ajaxMsg = nStatus + ": " + (_this.HTTPStatus[nStatus] || "Unknown"),
								result = "Ooops!! A broken link! Please contact the webmaster of this website A.S.A.P and give him/her the following error code : [ " + this.status+" : "+this.statusText+",URL: "+(this.responseURL || params.url)+" ] <br>\n"+ajaxMsg;
								//document.title = '404 : ['+filename(url,true) +'] Not Found';
								self.failCallback && self.failCallback.apply(self.host, [result, self.xhr]);
							}
							
							if(self.xhr.readyState == 4) {
								self.alwaysCallback && self.alwaysCallback.apply(self.host, [result, self.xhr]);
								_this.active_ajax_calls--;
							}
						}
						
						if(params.username) this.xhr.open(params.method, params.url, true, params.username, params.password);
						else if(params.method === 'GET') {
							this.xhr.open("GET", params.url + _this.serializeParams(params.data, params.url), true);
						} else {
							this.xhr.open(params.method, params.url, true);
							/* this.setHeaders({'X-Requested-With': 'XMLHttpRequest','Content-type': 'application/x-www-form-urlencoded'}); */
						}
						// Override mime type if needed
						if(params.mimeType) {
							this.xhr.overrideMimeType(params.mimeType);
						}
						// Apply custom fields if provided
						if(params.xhrFields) {
							for(i in params.xhrFields){
								//this.XHR_Obj[ i ] = params.xhrFields[ i ];
								this.xhr[i] = params.xhrFields[i];
							}
						}
						// Force "Connection: close" for older Mozilla browsers to work around a bug where XMLHttpRequest sends an incorrect Content-length header. See Mozilla Bugzilla #246651.
						if(this.xhr.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005) params.headers['Connection'] = 'close';
						
						// X-Requested-With header
						// For cross-domain requests, seeing as conditions for a preflight are akin to a jigsaw puzzle, we simply never set it to be sure.
						// (it can always be set on a per-request basis or even using ajaxSetup). For same-domain requests, won't change header if already provided.
						if(!params.crossDomain && !params.headers[ "X-Requested-With" ] ) {
							params.headers[ "X-Requested-With" ] = "XMLHttpRequest";
						}
						
						this.xhr.setRequestHeader("Accept", params.dataType && params.accepts[ params.dataType ] ? params.accepts[ params.dataType ] + ( params.dataType !== "*" ? ", " + allTypes + "; q=0.01" : "" ) : params.accepts[ "*" ]);
						// Set headers
						//this.xhr.setRequestHeader("Accept", params.dataType && params.accepts[ params.dataType ] ? params.accepts[ params.dataType ] + ( params.dataType !== "*" ? ", " + allTypes + "; q=0.01" : "" ) : params.accepts[ "*" ]);
						if(!isEmptyObject(params.headers)/* params.headers && typeof params.headers == 'object' */) {
							this.setHeaders(params.headers);
						}
							
						if(params.method==='POST') {
							this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
						}
						
						if(this.xhr.responseType === "json") {
							this.xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
						}
						// Hack to pass bytes through unprocessed, or pass binary data as a string
						else if(this.xhr.responseType === "arraybuffer"){ 
							this.xhr.setRequestHeader('Content-type', 'text/plain; charset=x-user-defined');
						}
						
						setTimeout(function() { 
							params.method == 'GET' ? self.xhr.send() : self.xhr.send(_this.serializeParams(params.data)); 
							//self.send(params);
						}, 20);	
					}
					return this;
				},
				before: function(callback) {this.beforeCallback = callback;return this;},
				success: function(callback) {this.doneCallback = callback;return this;},
				done: function(callback) {this.doneCallback = callback;return this;},
				fail: function(callback) {this.failCallback = callback;return this;},
				error: function(callback) {this.failCallback = callback;return this;},
				always: function(callback) {this.alwaysCallback = callback;return this;},
				header: function (hk, hv){_this.setHeader(hk, hv);return this;}, 
				mime: function (t){_this.setMime(t);return this;}, 
				method: function (m){_this.setMethod(m);return this;}, 
				url: function (u){_this.setUrl(u);return this;}, 
				data: function (dk, dv){_this.setData(dk, dv);return this;}, 
				// Send a POST Request
				post: function(data) {_this.ajaxSettings.method = 'POST';return this.send(data);},
				// Send a GET Request
				get: function(data) {_this.ajaxSettings.method = 'GET';return this.send(data);},
				// GET JSON Formatted Request
				getJSON: function(data) {_this.ajaxSettings.method = 'GET';request.responseType = "json";return this.send(data);},
				//before: function (fn){_this.ajaxSettings.before = fn;return this;}, 
				//success: function (cb){if (request.readyState === 4 && request.status === 200) {cb(request.responseText,request);}return this;};
				//error: function (errObj){var vMsg, nStatus = request.status;vMsg = nStatus + ": " + (_HTTPStatus[nStatus] || "Unknown");if (request.status<200 || request.status>299) {errObj(vMsg, request);}return this;};
				// Send request and return a promise
				send: function(data) {
					params = isPlainObject(data) && _pbd.extend(opt, data) || opt;
					
					var cacheURL, selector, type, response, self = this, off = params.url.indexOf(" "), 
					target = params.target && isElement(params.target) ? params.target : isString(params.target) ? $all(params.target) : _pbd.event().element(), 
					loadReady = request.responseType.toLowerCase() === "blob" || request.responseType.toLowerCase() === "arraybuffer" ? "onload" : "onreadystatechange", 
					// Anchor tag for parsing the document origin
					originAnchor = document.createElement( "a" );
					originAnchor.href = location.href;
			
					if ( off > -1 ) {
						selector = stripAndCollapse(params.url.slice(off));
						params.url = params.url.slice( 0, off );
					}
					
					_this.XHR_Url = params.url;
					//_this.pushData(data);
					
					_pbd.event().trigger("ajaxStart", target, {}, true);
					if(params.showProgressBar === true){
						if(!_this.progressBarExists){
							//_this.progressBar = _pbd.tag('div',{id:'progress_bar','class':'window_progressbar',style:'position:fixed;top:0;display:block;margin:0;padding:0;height:5px;'});document.body.appendChild(_this.progressBar);
							//_this.progressBarExists = true;
							_this.createProgressBar();
							console.log('progress bar created');
						} else{
							_pbd.styleElement(_this.progressBar,{'class':'window_progressbar',style:'position:fixed;top:0;display:block;margin:0;padding:0;height:5px;'});
							console.log('progress bar already created');
						}
						if(_this.progressBar.classList.contains('failure')) _this.progressBar.classList.remove('failure');
						if(_this.progressBar.classList.contains('loading')) _this.progressBar.classList.remove('loading');
						request.onloadstart = function(e){_this.progressBar.classList.add('loading');/* progressBar.className += ' loading'; */};
						_this.progressBar.style.width = 0;
						request.onprogress = function(ev){
							if (_this.progressBar && ev.lengthComputable) {
								pc = ((ev.loaded / ev.total) * 100);//pc = parseInt(100 - (ev.loaded / ev.total * 100));
								_this.progressBar.style.cssText += "opacity:1;display:block;width:"+pc+"%;transition:width linear 200ms;";
								_this.progressBar.innerHTML = pc + "%";//progressBar.innerHTML += ' - ' + file.name + " Uploaded! ";
							}
						};
					}
					
					request[ loadReady ] = function (){
						var tmp, fireSuccess = true, ajaxMsg, _random = Math.random(), ext = _pbd.get.ext(params.url);
						
						if(this.readyState === 1) {
							// if(_this.active_ajax_calls > 0) {_this.active_ajax_calls = (_this.active_ajax_calls - 1);}return this;
							self.beforeCallback && self.beforeCallback.apply(self, [request, params.url, target]);
						}
						
						if(this.readyState === 4 && this.status === 200) {
							tmp = request.responseType.toLowerCase() === "blob" || request.responseType.toLowerCase() === "arraybuffer" ? this.response : this.responseText;
							tmp = selector ?
								findFragmentContent(tmp , selector) : 
								//_pbd( "<div>" ).append(_pbd.parseHTML(responseText)).find(selector) :
								tmp;
							// Save response for use in complete callback
							//response = arguments;

							if(params.processData === true){
								tmp = _this.processRequest(_this.XHR_Url, _this.ajaxSettings, _this.XHR_Obj);
							}
							
							if(params.dataTypeCallback && isObject(params.dataTypeCallback)){
								if(params.dataTypeCallback[ext] && isFunction(params.dataTypeCallback[ext])){
									var dataTypeCallback_fn = params.dataTypeCallback[ext];
									tmp = dataTypeCallback_fn(tmp, request, target);
									// tmp = dataTypeCallback_fn.apply(null,[tmp, request, target]);
									fireSuccess = false;
								}
							}
							
							if(fireSuccess && params.success) {
								var callbackFunction = params.success;
								var callbackParams = [tmp, target, _this.XHR_Obj, params.url, params.success];//var callbackParams = [tmp,url,e];
								if(typeof callbackFunction === "function") tmp = _this.responseContent = callbackFunction.apply(null,callbackParams);
								else{
									var fn = window[callbackFunction];
									if(typeof fn === "function") tmp = _this.responseContent = fn.apply(null,callbackParams);
								}
							} else if(self.doneCallback) self.doneCallback.apply(_this.host, [tmp, target, params.url, request]);
							else _this.renderResponse(target,tmp);
							completed = true;
							_pbd.event().trigger("ajaxSuccess", target, {}, true);
						} else if (this.readyState === 4 /* && (this.status < 200 || this.status > 299 )  */){
							var nStatus = this.status;
							ajaxMsg = nStatus + ": " + (_this.HTTPStatus[nStatus] || "Unknown");
							tmp = "Ooops!! A broken link! Please contact the webmaster of this website ASAP and give him the following error code: " + this.status+" "+this.statusText+",URL: "+this.responseURL+"<br>"+ajaxMsg;
							if(params.showProgressBar){
								if(!_this.progressBarExists) _this.createProgressBar();
								_this.progressBar.classList.add('failure');
								_pbd.styleElement(_this.progressBar,{width:'100%',transition:'width linear 1s'})
							}
							
							if(params.error) {
								var callbackFunction = params.error;
								var callbackParams = [tmp,target, _this.XHR_Obj, params.url, params.error];//var callbackParams = [tmp,url,e];
								if(typeof callbackFunction === "function") tmp = _this.responseContent = callbackFunction.apply(null,callbackParams);
								else{
									var fn = window[callbackFunction];
									if(typeof fn === "function") tmp = _this.responseContent = fn.apply(null,callbackParams);
								}
							} else if(self.failCallback) self.failCallback.apply(_this.host, [tmp, target, params.url, request]);
							else _this.renderResponse(target, tmp);
							
							completed = true;
							_pbd.event().trigger("ajaxError", target, {}, true);
						}
						//console.log(this.readyState, this.status, this.DONE, loadReady, params)
						if(this.readyState === 4 || this.readyState == this.DONE ){
							self.alwaysCallback && self.alwaysCallback.apply(_this.host, [tmp, target, params.url, request]);
							if (_this.active_ajax_calls > 0) {
								//_this.active_ajax_calls = (_this.active_ajax_calls - 1);
								_this.active_ajax_calls--;
							}
							completed = true;
							_pbd.event().trigger("ajaxComplete", target, {}, true);
						}
					}
					///////////////////////////////////////////////////////////
					params.dataTypes = ( params.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];
					// A cross-domain request is in order when the origin doesn't match the current origin.
					if(params.crossDomain == null) {
						urlAnchor = document.createElement( "a" );
						try {
							urlAnchor.href = params.url;
							urlAnchor.href = urlAnchor.href;
							params.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
						} catch ( e ) {
							params.crossDomain = true;
						}
					}

					// Convert data if not already a string
					if(params.data && params.processData && typeof params.data !== "string" ) {
						//params.data = jQuery.param( params.data, params.traditional );
					}
					
					/* fireGlobals = jQuery.event && s.global;
					// Watch for a new set of requests
					if ( fireGlobals && _pbd.active_ajax_calls++ === 0 ) {
						_pbd.event().trigger("ajaxStart", target, {}, true);
					} */
					
					// Determine if request has content
					params.hasContent = !rnoContent.test(params.method);
					// Save the URL in case we're toying with the If-Modified-Since and/or If-None-Match header later on Remove hash to simplify url manipulation
					cacheURL = params.url.replace( rhash, "" );
					// More options handling for requests with no content
					if(!params.hasContent ) {
						// Remember the hash so we can put it back
						uncached = params.url.slice(cacheURL.length);
						// If data is available and should be processed, append data to url
						if(params.data && ( params.processData || typeof params.data === "string")) {
							cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + _this.serializeParams(params.data);
							// #9682: remove data so that it's not used in an eventual retry
							delete params.data;
						}

						// Add or update anti-cache param if needed
						if(params.cache === false ) {
							cacheURL = cacheURL.replace( rantiCache, "$1" );
							uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
						}

						// Put hash and anti-cache on the URL that will be requested (gh-1732)
						params.url = cacheURL + uncached;
					// Change '%20' to '+' if this is encoded form body content (gh-2658)
					} else if (params.data && params.processData && (params.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
						params.data = params.data.replace( r20, "+" );
					}
					_this.XHR_Url = params.url;
					///////////////////////////////////////////////////////////
					request.open(params.method, params.url, true, params.username, params.password);
					
					if(params.cache === false && params.method === "POST"){
						request.setRequestHeader("cache-control","no-cache");
					}
			
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if(params.ifModified ) {
						if (_pbd.lastModified[ cacheURL ] ) {
							request.setRequestHeader( "If-Modified-Since", _pbd.lastModified[ cacheURL ] );
						}
						if ( _pbd.etag[ cacheURL ] ) {
							request.setRequestHeader( "If-None-Match", _pbd.etag[ cacheURL ] );
						}
					}
					
					// Set the correct header, if data is being sent
					if (params.data && params.hasContent && params.contentType !== false /* || options.contentType  */) {
						request.setRequestHeader( "Content-Type", params.contentType );
					}
		
					// Set the Accepts header for the server, depending on the dataType
					request.setRequestHeader("Accept", params.dataTypes[ 0 ] && params.accepts[ params.dataTypes[ 0 ] ] ? params.accepts[ params.dataTypes[ 0 ] ] + ( params.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) : params.accepts[ "*" ]);
					//request.setRequestHeader("Accept", params.dataType && params.accepts[ params.dataType ] ? params.accepts[ params.dataType ] + ( params.dataType !== "*" ? ", " + allTypes + "; q=0.01" : "" ) : params.accepts[ "*" ]);
					
					// Override mime type if needed
					if(params.mimeType) {
						request.overrideMimeType(params.mimeType);
					}
					// Apply custom fields if provided
					if(params.xhrFields) {
						for(i in params.xhrFields){
							//this.XHR_Obj[ i ] = params.xhrFields[ i ];
							request[i] = params.xhrFields[i];
						}
					}
					// Force "Connection: close" for older Mozilla browsers to work around a bug where XMLHttpRequest sends an incorrect Content-length header. See Mozilla Bugzilla #246651.
					if(request.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005) params.headers['Connection'] = 'close';
					
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup). For same-domain requests, won't change header if already provided.
					if(!params.crossDomain && !params.headers[ "X-Requested-With" ] ) {
						params.headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
					
					// Set headers
					if(!isEmptyObject(params.headers)/* params.headers && typeof params.headers == 'object' */) {
						_this.setHeaders(params.headers);
					}
						
					if(params.method==='POST') {
						request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
					}
					
					if(request.responseType === "json") {
						request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
					}
					// Hack to pass bytes through unprocessed, or pass binary data as a string
					else if(request.responseType === "arraybuffer"){ 
						request.setRequestHeader('Content-type', 'text/plain; charset=x-user-defined');
					}

					// Timeout
					if(params.async && params.timeout > 0) {
						timeoutTimer = window.setTimeout(function() {
							//jqXHR.abort("timeout");
							request.abort("timeout");
							_pbd.event().trigger("ajaxStop", target, {}, true);
						}, params.timeout);
					}
					
					try {
						//request.send(params.method == 'get' ? null : Object.keys(params.data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params.data[key])).join('&')); 
						//request.send((params.hasContent && params.data) ? _this.serializeParams(params.data) : null);
						request.send( (params.hasContent && params.data) ? Object.keys(params.data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params.data[key])) .join('&') : null );
						_pbd.event().trigger("ajaxSend", target, {}, true);
					} catch(l) {
						_xhr = {status: 400, statusText: 'Bad Request', responseType: 'text', responseText: "request failed:" + l};
						_this.abortXHR();
						defaultCallBack(_xhr,_this.XHR_Obj);
						_pbd.event().trigger("ajaxStop", target, {}, true);
					}
					
					return this;
				}
			}

			//return api.process(opt);
			return api;
		},
		ajax: function(params){
			let tmp, cacheURL, urlAnchor, _this = this,_random = Math.random(),timeoutTimer, 
			// Anchor tag for parsing the document origin
			originAnchor = document.createElement( "a" );
			originAnchor.href = location.href;
			if(typeof params === "string"){
				params = {
					url: params
				};
			}
			if(typeof params !== "object" || typeof params.url !== "string") {return;}
			params = _pbd.extend(this.ajaxSettings, params);
			let {url, method, headers, success, error, dataType, crossDomain, cache, showProgressBar} = params, 
			is_json = (params.json || params.is_json) ? true : false, 
			data = (params.parameters && isPlainObject(params.parameters)) || (params.data && isPlainObject(params.data)) ? (params.parameters || params.data) : {};
			method = (typeof method === "string" && this.validMethods.indexOf(method.toUpperCase()) > -1) ? method.toUpperCase() : "GET";
			target = params.target && isElement(params.target) ? params.target : isString(params.target) ? $all(params.target) : _pbd.event().element(), 
			
			
			params.dataTypes = ( params.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];
			// Determine if request has content
			params.hasContent = !rnoContent.test(params.method);
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if(params.crossDomain == null) {
				urlAnchor = document.createElement( "a" );
				try {
					urlAnchor.href = params.url;
					urlAnchor.href = urlAnchor.href;
					params.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
					params.crossDomain = true;
				}
			}

			
			const origUrl = url, startTime = new Date().getTime();
			const queryStr = Object.entries(data).map(([key, value]) => {return `${key}=${value}`;}).join('&')
			
			// Convert data if not already a string
			if(params.data && params.processData && typeof params.data !== "string" ) {
				//params.data = _this.serializeParams( params.data);
				//params.data = jQuery.param( params.data, params.traditional );
			}
			let had = (() => url.indexOf("?") > -1)();
			//	let had = rquery.test(url);
			//url += (!had) ? "?" : "&";
			//url += (queryStr) ? queryStr : "";
			
			url = (( url || location.href ) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//") + (!had ? "?" : "&") + queryStr;
			/* if(data != null && rget.test(method)) {var first = true; for (var key in data) {if (data.hasOwnProperty(key) && typeof data[key] === "string") {if (first && !had) {url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);} else {url += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);}first = false;}}}
			url = url + ((url[url.length-1] !== "&") ? '&': '') + queryStr; */
			
			// Save the URL in case we're toying with the If-Modified-Since and/or If-None-Match header later on Remove hash to simplify url manipulation
			//cacheURL = url;
			cacheURL = url.replace( rhash, "" );
			// More options handling for requests with no content
			if(!params.hasContent ) {
				// Remember the hash so we can put it back
				uncached = url.slice(cacheURL.length);
				// If data is available and should be processed, append data to url
				if(params.data && ( params.processData || typeof params.data === "string")) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + _this.serializeParams(params.data);
					// #9682: remove data so that it's not used in an eventual retry
					delete params.data;
				}

				// Add or update anti-cache param if needed
				if(cache === false) {
					//url = rantiCache.test(cacheURL) ? cacheURL.replace( rantiCache, "$1_=" + nonce++ ) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
					//url = url + (rquery.test(url) ?'&':'?') + "nocache=" +  String(Math.random()).replace('.','').replace('-','');
					//url = url +  "?nocache=" +  Math.random();
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				params.url = url = cacheURL + uncached;
			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (params.data && params.processData && (params.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				params.data = params.data.replace( r20, "+" );
			}
			// Apply custom fields if provided
			/* if(params.xhrFields) {
				for(i in params.xhrFields){
					//this.XHR_Obj[ i ] = params.xhrFields[ i ];
					this.xhr[i] = params.xhrFields[i];
				}
			} */
			this.XHR_Url = url;
			//_this.XHR_Url = params.url;
			///////////////////////////////////////////////////////////
			
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if(params.ifModified ) {
				if(_pbd.lastModified[cacheURL]) {
					headers["If-Modified-Since"] = _pbd.lastModified[cacheURL];
				}
				if(_pbd.etag[cacheURL]) {
					headers["If-None-Match"] = _pbd.etag[cacheURL];
				}
			}
			
			// X-Requested-With header
			// For cross-domain requests, seeing as conditions for a preflight are akin to a jigsaw puzzle, we simply never set it to be sure.
			// (it can always be set on a per-request basis or even using ajaxSetup). For same-domain requests, won't change header if already provided.
			if(!params.crossDomain && !headers[ "X-Requested-With" ] ) {
				headers[ "X-Requested-With" ] = "XMLHttpRequest";
			}
			
			// Set the Accepts header for the server, depending on the dataType
			headers["Accept"] = params.dataTypes[ 0 ] && params.accepts[ params.dataTypes[ 0 ] ] ? params.accepts[ params.dataTypes[ 0 ] ] + ( params.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) : params.accepts[ "*" ];
			headers["Access-Control-Allow-Origin"] = "*";
			if(cache === false && method =="POST"){
				headers["cache-control"] = "no-cache";
			}
			
			// Set the correct header, if data is being sent
			if (params.data && params.hasContent && params.contentType !== false /* || options.contentType  */) {
				headers["Content-Type"] = params.contentType;
			}
			else if(params.responseType === "json" || params.dataType === "json") {
				headers['Content-type'] =  'application/json; charset=utf-8';
			}
			// Hack to pass bytes through unprocessed, or pass binary data as a string
			else if(params.responseType === "arraybuffer"){ 
				headers['Content-type'] =  'text/plain; charset=x-user-defined';
			}
			
			if(params.method==='POST') {
				headers['Content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';
			}
			
			if(!headers["Content-Type"]){
				headers['Content-Type'] = (params.dataType && params.dataType === "json" ? 'application/json' : 'text/plain')??'';
			}
			
			let f_cfg = {
				method,
				headers/*: headers||{'Content-Type': (dataType&&dataType==="json"?'application/json':'text/plain')??'',} */,
			}
			
			if(method && (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT" || method.toUpperCase() === "PATCH" || method.toUpperCase() === "DELETE")){
				f_cfg.body = this.toFormData(data);
			}
			
			/* fireGlobals = jQuery.event && s.global;
			// Watch for a new set of requests
			if ( fireGlobals && _pbd.active_ajax_calls++ === 0 ) {
				_pbd.event().trigger("ajaxStart", target, {}, true);
			} */
			//var responseHeaders = _pbd.parseHeaders(headers);
			const req = new Request(url, f_cfg);
			return new AjaxPromise(
				//fetch(`${url}${queryStr}`, f_cfg)
				fetch(req)
				.then(async (res) => {
					_pbd.event().trigger("ajaxStart", target, {}, true);
					
					if(res.ok){
						let endTime = new Date().getTime(), 
						content = await Promise.resolve(dataType && dataType === "json" ? res.json() : res.text()), 
						contentSize = _pbd.byteSize(content) || Array.from(res.headers.entries()).filter(([key, value]) => key === 'content-length' && value)[0][1] || content.length, 
						contentType = Array.from(res.headers.entries()).filter(([key, value]) => key === 'content-type' && value)[0][1] || "unknown/unknown", 
						finalData = params.sendFullResponse === true ? {
							body: res.body,
							/* body: bodyParser(f_cfg)(req, res, (d)=>{
								//console.log(d, res.body);
							}), */
							contentSize, 
							contentType, 
							data: params.bodyOnly === true ? _pbd.get.body(content) : content, 
							headers: {
								request: headers, 
								response: res.headers, 
								all: [{...headers}, ...Object.entries(res.headers)]
							}, /*  */
							method,
							origin: location.origin, 
							originalUrl: origUrl, 
							originalRequest: req,
							originalResponse: res,
							responseHeaders: res.headers, 
							requestHeaders: headers, 
							status: res.status, 
							statusText: res.statusText, 
							time: {
								start: startTime, 
								end: endTime, 
								timeLapse : (endTime - startTime)
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
							},
						} : content;
						
						return finalData;
					} else {
						/* if(isFunction(error)) return error(_HTTPStatus[res.status]?_HTTPStatus[res.status]:res.status)
						else  */throw new Error(_HTTPStatus[res.status]?_HTTPStatus[res.status]:res.status)
					}
				}).then(data => {
					return data; //success(data)
				})
			)
		}, 
		getJSON: function( url, data, callback ) {
			return _this.get(url, data, callback, "json" );
		},
		getScript: function( url, callback ) {
			return _this.get( url, undefined, callback, "script" );
		}, 
		// Make an XHR request, returned as a Promise
		makeRequest: function (url) {
			const _this = this;
			// Create the XHR request
			//var request = new XMLHttpRequest();
			var request = request && request instanceof XMLHttpRequest ? request : (this.XHR_Obj && this.XHR_Obj instanceof XMLHttpRequest ? this.XHR_Obj : this.initXHR());
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
						//resolve(_pbd.parseJSON(request));
						resolve(request);
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
				request.send(_this.serializeParams(settings.data));
			});
			// Cancel the XHR request
			xhrPromise.cancel = function () {
				request.abort();
			};
			// Return the request as a Promise
			return xhrPromise;
		},
		defaultXHRAdapter: function (config) {
			let tmp, timeoutTimer, _this = this;
			return new Promise(function dispatchXhrRequest(resolve, reject) {
				var requestData = config.data;
				var requestHeaders = config.headers;
				if(isFormData(requestData)) {
					delete requestHeaders['Content-Type']; // Let the browser set it
				}
				//var request = new XMLHttpRequest();
				var request = request && request instanceof XMLHttpRequest ? request : (_this.XHR_Obj && _this.XHR_Obj instanceof XMLHttpRequest ? _this.XHR_Obj : _this.initXHR());
				// HTTP basic authentication
				if(config.auth) {
					var username = config.auth.username || '';
					var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
					requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
				}
				
				var fullPath = buildFullPath(config.baseURL, config.url);
				request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
	
				// Set the request timeout in MS
				request.timeout = config.timeout;
			
				// Listen for ready state
				request.onreadystatechange = function handleLoad() {
					if (!request || request.readyState !== 4) {return;}
	
					// The request errored out and we didn't get a response, this will be
					// handled by onerror instead
					// With one exception: request that using file: protocol, most browsers
					// will return status as 0 even though it's a successful request
					if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
						return;
					}
	
					// Prepare the response
					var responseHeaders = 'getAllResponseHeaders' in request ? _pbd.parseHeaders(request.getAllResponseHeaders()) : null;
					var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
					var response = {
						data: responseData,
						status: request.status,
						statusText: request.statusText,
						headers: responseHeaders,
						config: config,
						request: request
					};
					
					_this.settle(resolve, reject, response);
	
					// Clean up request
					request = null;
				};
				
				// Handle browser request cancellation (as opposed to a manual cancellation)
				request.onabort = function handleAbort() {
					if (!request) {return;}
					reject(createError('Request aborted', config, 'ECONNABORTED', request));
					// Clean up request
					request = null;
				};
				
				// Handle low level network errors
				request.onerror = function handleError() {
					// Real errors are hidden from us by the browser
					// onerror should only fire if it's a network error
					reject(createError('Network Error', config, null, request));
					
					// Clean up request
					request = null;
				};
				
				// Handle timeout
				request.ontimeout = function handleTimeout() {
					var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
					if (config.timeoutErrorMessage) {
						timeoutErrorMessage = config.timeoutErrorMessage;
					}
					reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request));
					// Clean up request
					request = null;
				};
				
				// Add xsrf header
				// This is only done if running in a standard browser environment.
				// Specifically not if we're in a web worker, or react-native.
				if(isStandardBrowserEnv()) {
					// Add xsrf header
					var xsrfValue = (config.withCredentials/*  || isURLSameOrigin(fullPath) */) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
					
					if (xsrfValue) {
						requestHeaders[config.xsrfHeaderName] = xsrfValue;
					}
				}
				
				// Add headers to the request
				if('setRequestHeader' in request) {
					_pbd.forEach(requestHeaders, function setRequestHeader(val, key) {
						if(typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
							// Remove Content-Type if data is undefined
							delete requestHeaders[key];
						} else {
							// Otherwise add header to the request
							request.setRequestHeader(key, val);
						}
					});
				}
	
				// Add withCredentials to request if needed
				if (!isUndefined(config.withCredentials)) {
					request.withCredentials = !!config.withCredentials;
				}
			
				// Add responseType to request if needed
				if (config.responseType) {
					try {
						request.responseType = config.responseType;
					} catch (e) {
						// Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
						// But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
						if (config.responseType !== 'json') {
							throw e;
						}
					}
				}
				
				// Handle progress if needed
				if(typeof config.onDownloadProgress === 'function') {
					request.addEventListener('progress', config.onDownloadProgress);
				}
			
				// Not all browsers support upload events
				if(typeof config.onUploadProgress === 'function' && request.upload) {
					request.upload.addEventListener('progress', config.onUploadProgress);
				}
	
				if(config.cancelToken) {
					// Handle cancellation
					config.cancelToken.promise.then(function onCanceled(cancel) {
						if (!request) {return;}
						request.abort();
						reject(cancel);
						// Clean up request
						request = null;
					});
				}
	
				if(!requestData) {
					requestData = null;
				}
	
				// Send the request
				request.send(requestData);
			});
		}, 
		// ...........................................................
		// Atomic Method
		// ...........................................................
		Atomic: function (url, options) {
			// Check browser support
			if (!this.supports()) throw 'Atomic: This browser does not support the methods used in this plugin.';
			// Merge options into defaults
			settings = _pbd.extend(this.ajaxSettings, options || {});
			// Make request
			this.XHR_Adapter = settings.adapter || this.makeRequest;
			return this.XHR_Adapter(url, settings);
			//return this.makeRequest(url);
		},
		/**
		 * Dispatch a request to the server using the configured adapter.
		 *
		 * @param {object} config The config that is to be used for the request
		 * @returns {Promise} The Promise to be fulfilled
		 */
		Axios: function (config) {
			let tmp, timeoutTimer, _this = this, _random = Math.random();
			if(typeof config === "string"){
				url = config;
				config = {url};
			}
			if(typeof config !== "object" || typeof config.url !== "string") {return this;}
			config = _pbd.extend(this.ajaxSettings, config || {});
			
			function throwIfCancellationRequested(config) {if (config.cancelToken) {config.cancelToken.throwIfRequested();}}
			function isCancel(value) {return !!(value && value.__CANCEL__);}
			
			throwIfCancellationRequested(config);
			
			// Ensure headers exist
			config.headers = config.headers || {};
			
			// Transform request data
			config.data = transformData(config.data, config.headers, config.transformRequest);
			
			// Flatten headers
			/* config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);

			_pbd.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
				delete config.headers[method];
			}); */

			//var adapter = config.adapter || defaults.adapter;
			this.XHR_Adapter = config.adapter || this.defaultXHRAdapter;

			return this.XHR_Adapter(config).then(function onAdapterResolution(response) {
				throwIfCancellationRequested(config);

				// Transform response data
				response.data = transformData(
					response.data,
					response.headers,
					config.transformResponse
				);
				return response;
			}, function onAdapterRejection(reason) {
				if(!isCancel(reason)) {
					throwIfCancellationRequested(config);

					// Transform response data
					if (reason && reason.response) {
						reason.response.data = transformData(
							reason.response.data,
							reason.response.headers,
							config.transformResponse
						);
					}
				}

				return Promise.reject(reason);
			});
		}, 
		
	});
	// -----------------------------------------------------
	function transformData(data, headers, fns) {
		var context = this || defaults;
		/*eslint no-param-reassign:0*/
		_pbd.forEach(fns, function transform(fn) {
			data = fn.call(context, data, headers);
		});

		return data;
	}
	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	function createError(message, config, code, request, response) {
		var error = new Error(message);
		return enhanceError(error, config, code, request, response);
	}
	function enhanceError(error, config, code, request, response) {
		error.config = config;
		if (code) {
			error.code = code;
		}
	
		error.request = request;
		error.response = response;
		error.isAxiosError = true;
	
		error.toJSON = function toJSON() {
			return {
				// Standard
				message: this.message,
				name: this.name,
				// Microsoft
				description: this.description,
				number: this.number,
				// Mozilla
				fileName: this.fileName,
				lineNumber: this.lineNumber,
				columnNumber: this.columnNumber,
				stack: this.stack,
				// Axios
				config: this.config,
				code: this.code
			};
		};
		return error;
	}
	function encode(val) {return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');}
	function buildFullPath(baseURL, requestedURL) {if(baseURL && !isAbsoluteURL(requestedURL)) {return combineURLs(baseURL, requestedURL);}return requestedURL;}
	function combineURLs(baseURL, relativeURL) {return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;}
	function buildURL(url, params, paramsSerializer) {
		/*eslint no-param-reassign:0*/
		if (!params) {
			return url;
		}
		
		var serializedParams;
		if (paramsSerializer) {
			serializedParams = paramsSerializer(params);
		} else if (isURLSearchParams(params)) {
			serializedParams = params.toString();
		} else {
			var parts = [];
			_pbd.forEach(params, function serialize(val, key) {
				if(val === null || typeof val === 'undefined') {
					return;
				}

				if(isArray(val)) {
					key = key + '[]';
				} else {
					val = [val];
				}
				
				_pbd.forEach(val, function parseValue(v) {
					if(isDate(v)) {
						v = v.toISOString();
					} else if(isObject(v)) {
						v = JSON.stringify(v);
					}
					parts.push(encode(key) + '=' + encode(v));
				});
			});
			serializedParams = parts.join('&');
		}
		
		if(serializedParams) {
			var hashmarkIndex = url.indexOf('#');
			if(hashmarkIndex !== -1) {
				url = url.slice(0, hashmarkIndex);
			}

			url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
		}

		return url;
	}
	function normalizeHeaderName(headers, normalizedName) {
		_pbd.forEach(headers, function processHeader(value, name) {
			if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
				headers[normalizedName] = value;
				delete headers[name];
			}
		});
	}
	// -----------------------------------------------------
	_pbd.ajax.intertceptors = {
		request:{
			use(cb,cb2){/* return new Promise(cb,cb2) */},
		},
		response:{
			use(cb,cb2){/* return new Promise(cb,cb2) */},
		},
	}
	/* _pbd.each([ "get", "post" ], function(_i, method) {
		//_pbd[method] = function(url, data, callback, type) {
		_pbd[method] = function({url, data = {}, callback = () => {}, dataType}){
			const queryStr = Object.entries(data).map(([key, value]) => {return `${key}=${value}`;}).join('&')
			const cfg = {
				method: method,
				header: {
					'Content-Type': dataType === 'json'? 'application/json' : (method.toUpperCase() === 'POST' ? 'application/x-www-form-urlencoded' : 'text/plain'),
				}
			}
			if(method.toUpperCase() === "POST") cfg.body = data;
			
			var had = url.indexOf("?") > -1;
			if(method.toUpperCase() === "GET") {
				url = !had ? url + "?" + (queryStr ? queryStr : ''); 
			}
			return new AjaxPromise(
				fetch(`${url}`, cfg).then(res => {
					if(res.ok){
						return dataType === 'json'? res.json() : res.text()
					} else {
						throw new Error(res.status)
					}
				}).then(data => {
					callback(data)
					return data
				})
			)
		}
	})*/

	_pbd.each([ "get", "post" ], function(_i, method) {
		_pbd[method] = function(url, data, callback, type) {
			// Shift arguments if data argument was omitted
			if(isFunction(data)){
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return _pbd.ajax(_pbd.extend({
				url: url,
				method: method,
				dataType: type,
				data: data,
				success: callback
			}, isPlainObject(url) && url))/* .done(callback) */;
		};
	});
	// -----------------------------------------------------
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
	_pbd.loadPageSection = _pbd.fn.loadPageSection = function loadPageSection(url, selector, callback) {
		if (typeof url !== 'string') {
			throw new Error('Invalid URL: ', url);
		} else if (typeof selector !== 'string') {
			throw new Error('Invalid selector selector: ', selector);
		} else if (typeof callback !== 'function') {
			throw new Error('Callback provided is not a function: ', callback);
		}
		const $this = this;
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
					section = _pbd(selector, xhr.responseXML);
					//section2 = ($this.$$||$one)(selector, xhr.responseXML);//section2 = xhr.responseXML.querySelector(selector);
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
	//Load data from the server and place the returned HTML into the matched element.
	_pbd._load = _pbd.fn._load = function(url, params, callback){
		var selector, type, response, isAkd = isSet(this[0]) && isSet(this.nodes), self = this, off = url.indexOf(" ");
		
		if(isFunction(url) && isAkd === true){
			name = 'load';
			fn = url;
			data = null;
			this.each(function(elem){
				//this[ 0 ] = this.nodes = __pbd_self.event().add(elem,name, null, data, fn, false);
				_pbd.event(data).add(elem, name, null, data, fn, false);
			});
			//arguments.length > 0 ? this.on( name, null, data, fn ) : this.trigger( name );
		} else {
			if(off > -1) {
				selector = stripAndCollapse(url.slice(off));
				url = url.slice(0, off);
			}
			
			// If it's a function
			if(isFunction(params)) {
				// We assume that it's the callback
				callback = params;
				params = {method:"GET"};
				//params = undefined;
			// Otherwise, build a param string
			} else {
				callback = isFunction(callback) ? callback : returnFalse;
				params = isPlainObject(params) ? params : {};
			}
			
			fetch(url, params).then(data => data.text()).then(content => {
				if(isAkd === true){
					if(selector){
						content = findFragmentContent(content , selector);
					}
					self.each(function(elem){
						elem.innerHTML = content;
					})
				} //else $one(selector).innerHTML = content;
				return content;
			}).then((res)=> callback(res)).catch((er)=> console.log(er));
		}
		return this;
	}
	
	/**
	 * Load a url into a page
	 */
	_pbd.fn.load = function( url, params, callback ) {
		if(isFunction(url)){
			name = 'load';
			fn = url;
			data = null;
			this.each(function(elem){
				//this[ 0 ] = this.nodes = __pbd_self.event().add(elem,name, null, data, fn, false);
				_pbd.event(data).add(elem, name, null, data, fn, false);
			});
			//arguments.length > 0 ? this.on( name, null, data, fn ) : this.trigger( name );
		} else {
			var selector, type, response, self = this, off = url.indexOf(" ");

			if ( off > -1 ) {
				selector = stripAndCollapse(url.slice(off));
				url = url.slice( 0, off );
			}

			// If it's a function
			if(isFunction(params)) {
				// We assume that it's the callback
				callback = params;
				params = undefined;
			// Otherwise, build a param string
			} else if (params && typeof params === "object") {
				type = "POST";
			}
			
			// If we have elements to modify, make the request
			if(self.length > 0) {
				_pbd.ajax({
				//_pbd.xhr().process({
					url: url,
					method: type || "GET",
					dataType: "html",
					data: params
				}).done(function(responseText) {
					responseText = responseText?.data??responseText;
					// Save response for use in complete callback
					response = arguments;

					self.html(selector ?
						// If a selector was specified, locate the right elements in a dummy div
						// Exclude scripts to avoid IE 'Permission Denied' errors
						findFragmentContent(responseText , selector) : 
						//_pbd( "<div>" ).append(_pbd.parseHTML(responseText)).find(selector) :
						// Otherwise use the full result
						responseText);
				}).always(callback && function(jqXHR, status) {
					self.each(function() {
						callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
					});
				});
			}
		}
		return this;
	};
	_pbd.contents = _pbd.fn.contents = function(t){
		let ret = [];
		//var camelized = this.camelize(attribute);
		if(this.each){
			this.each(function(elem){
				const y = x.contentWindow || x.contentDocument;
				const z = y.document ? y.document : y;
				ret.push(z);
			});
		}
		
		//return this;
		return ret[0];
		//return value === null ? "" : this.nodes[this.currentIndex].dataset[camelized];
		/* const iframe = $.one(t)
		// Native
		return iframe.contentDocument;
		const x = $.one(t);
		const y = x.contentWindow || x.contentDocument;
		const z = y.document ? y.document : y;
		//alert(z.body.innerHTML);
		return z;
		if( !arguments || !arguments.length || arguments.length === 0) return this.getActiveElem().getAttributes();
		else if ( _typeof(name) !== "object" && value === undefined ) return ret[0];
		else return this; */
	}
	// let iframe = $.tag('iframe',{'src': './image.html'/* 'http://localhost/www/index.html' */});
	// document.body.appendChild(iframe);
	// iframe.onload = (e) => {
		// let contents = $.contents(iframe);
		// console.log(contents.body.innerHTML)
		// console.log(/* contains('h4','Editor'), */ iframe, e)
		// console.log(contents.body.querySelector('.main').innerHTML)
	// }
	_pbd.fn.expando = "AKD" + ( version + Math.random() ).replace( /\D/g, "" );// Unique for each copy of PBD/app on the page
	// -------------------------------------------------------------
	_pbd.each([
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function(_i, type) {
		_pbd.fn[type] = function( fn ) {
			return this.on(type, fn);
		};
	});
	// -------------------------------------------------------------
	_pbd.storage = {
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
	_pbd.youtube = {
		/**
		 * Expects an argument that is either a youtube URL or a ID,
		 * and returns back the ID.
		 */
		getIdFromUrl: function(videoIdOrUrl) {if (videoIdOrUrl.indexOf('http') === 0) {return videoIdOrUrl.split('v=')[1];} else {return videoIdOrUrl;}},
		/**
		 * Expects an argument that is either a youtube URL or a ID,
		 * and returns back the URL of the thumbnail for that video.
		 */
		generateThumbnailUrl: function(videoIdOrUrl) {return 'https://i3.ytimg.com/vi/' + youtube.getIdFromUrl(videoIdOrUrl) + '/default.jpg';},
		/**
		 * Expects an argument that is either a youtube URL or a ID,
		 * and returns back the URL for that video.
		 */
		generateWatchUrl: function(videoIdOrUrl) {return 'https://www.youtube.com/watch?v=' + youtube.getIdFromUrl(videoIdOrUrl);},
		/**
		 * Expects an argument that is either a youtube URL or a ID,
		 * and returns back the embed URL for that video.
		 */
		generateEmbedUrl: function(videoIdOrUrl) {return 'https://www.youtube.com/embed/' + youtube.getIdFromUrl(videoIdOrUrl);}
	}
	// -------------------------------------------------------------
	_pbd.Router = _pbd.fn.Router = function(params){
		const _this = this, default_params = {
			site: {
				title: "AKD Router", 
				meta: {}, 
				styles:[ 
					{type: "inline", pathOrContent: ""}
				], 
				scripts: [
					{type: "inline", pathOrContent: "", isModule: false}
				], 
			},
			viewId: '#akd-router-view', linkId: '[data-akd-router-link]', linkActiveClass: 'active', animation: null, loader: null, lsKey: '', 
			mode: "hash", fx: "fade", delay: 1500, 
			routes: {
				//404: "../dev/pages/404.html",
				404: (params, url) => {
					return `<h3>${params.site.title} => <i>Route Error</i></h3><p>The url: ${url}, was not found</p>`;
				},
				//"/": "../dev/pages/index.html",
				"/": (params, url) => {
					return `<h3>Welcome to => <i>${params.site.title}</i></h3>
					<p>A simple routing system, great for building <strong>Single Page Applications</strong></p>
					<h4>Features</h4>
					<ul>
						<li>Dead simple</li>
						<li>Blazingly fast</li>
						<li>Etremely extensible</li>
						<li>Integrates into any work [flow/environment/framework] easily</li>
					</ul>`;
				},
				"/about": "./pages/about.html",
				"/settings2": "./pages/settings.html",
				"/settings": () => {
					return `<h3>${params.site.title} settings</h3>`;
				},
			}
		}
		//params = arguments && arguments.length > 0 && isPlainObject(arguments[0]) ? arguments[0] : {}, 
		params = isPlainObject(params) ? _pbd.extend(default_params, params) : default_params;
		
		const $key = params?.lsKey??nonce, 
		loader = params.loader || '<div style="position: absolute;top: 50%;left: 50%;translate: -50% -50%;"><div class="dot-revolution"></div></div>', 
		routeViewEl = $one(params.viewId), 
		routes = params.routes, 
		routingFn = (ev) => params.routingFn && params.routingFn(ev) || handleLocation();
		
		let currentRoute = localStorage.getItem(params.lsKey + 'currentRoute') || null, // stored route
		routerUrl = currentRoute || location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
		
		const route = (ev) => {
			ev = ev || window.event;
			ev.preventDefault();
			if(params.mode === "history"){
				window.history.pushState({}, "", ev.target.href);
			}
			routingFn(ev);
		}
		
		const handleLocation = async () => {
			let content = '';
			const path = params.mode === "history" ? window.location.pathname : window.location.hash.slice(1);
			const route = routes[path] || routes[404];
			currentRoute = route;
			
			// content = isFunction(route) ? route.apply(null, [params, path, routeViewEl, _this]) : await fetch(route).then(data => data.text()).catch(e=>e);
			//isElement(routeViewEl) ? routeViewEl.innerHTML = content : console.log(content);
			if(isElement(routeViewEl)){
				routeViewEl.innerHTML = loader;
				
				if(currentRoute) {
					localStorage.setItem(params.lsKey + 'currentRoute', currentRoute);
					setTimeout(async function(){
						if(isFunction(currentRoute)){
							content = currentRoute.apply(null, [params, path, routeViewEl, _this]);
						} else if(isString(currentRoute)) {
							content = await fetch(currentRoute).then(data => data.text()).catch(e=>e);
						} else if(isPlainObject(currentRoute)){
							
						}
						routeViewEl.innerHTML = content;
					}, params.delay);
				} else {
					content = await fetch(routes[404]).then(data => data.text()).catch(e=>e);
					routeViewEl.innerHTML = content;
				}
			} else console.log('Unable to display view, a valid view element was not found!');
			
			return this;
		}
		
		const navigateTo = async (url, view, extra={}) => {
			url = url || location.hash.slice(1) || '/';
			let routerUrl = url, selectedRoute = routes[url], 
			_route = selectedRoute, content, 
			viewEl;
			
			viewEl = $one(view);
			if(!isElement(viewEl)) viewEl = routeViewEl;
			
			// Do we have both a view and a route?
			if(isElement(viewEl)){
				viewEl.innerHTML = loader;
				if(selectedRoute) {
					/* let akd_event = /akd-on/.exec(str) ? replace(/<#=(.+?)#>/g,"',$1,'")
					console.log(akd_event); */
					/* var callbackFunction = tpl;var callbackParams = [str,el];if(typeof callbackFunction === "function") tmp = callbackFunction.apply(null,callbackParams);else{var fn = window[callbackFunction];if(typeof fn === "function") tmp = fn.apply(null,callbackParams);}el.innerHTML = tmp; */
					setTimeout(async function(){
						if(isFunction(selectedRoute)){
							content = selectedRoute.apply(null, [params, url, viewEl, _this]);
						} else if(isString(selectedRoute)) {
							content = await fetch(selectedRoute).then(data => data.text()).catch(e=>e);
						} else if(isPlainObject(selectedRoute)){
							let ctrl = '';
							if(isPlainObject(selectedRoute.controller)) {
								ctrl = selectedRoute.controller; //Object.assign(ctrl, extra);
							} else {
								ctrl = new selectedRoute.controller(extra);
							}
							let isAsync = ctrl?.isAsync === true;
							// Listen on route refreshes:
							selectedRoute.onRefresh(function () {
								$this.removeEventListeners();
								// Render route template with John Resig's template engine:
								viewEl.innerHTML = $this.tmpl(str,ctrl);
								if(isAsync === true){
									setTimeout(() => {viewEl.innerHTML = $this.tmpl(str, ctrl)}, 1000);
								} else 
									viewEl.innerHTML = $this.tmpl(str, ctrl); //viewEl.innerHTML = tmpl(selectedRoute.templateId, ctrl);
								$this.addEventListeners();
							});
							// Trigger the first refresh:
							//ctrl.$refresh();
						} else {
							content = await fetch(routes[404]).then(data => data.text()).catch(e=>e);
						}
						viewEl.innerHTML = content;
						//$this.emitEvent("routerload", viewEl);
					}, params.delay);
				} else {
					content = await fetch(routes[404]).then(data => data.text()).catch(e=>e);
					viewEl.innerHTML = content;
				}
			} else console.log('Unable to display view, a valid view element was not found!');
			
			return this;
		}
		
		const initEvents = (extra={}) => {
			const that = this;
			if(params.mode === "hash"){
				// Listen on hash change:
				//window.addEventListener('hashchange', routingFn, false);
				window.onhashchange = routingFn;
				// Listen on page load:
				window.addEventListener('load', routingFn, false);
				document.addEventListener('click', function(e) {
					if(e.target.tagName.toUpperCase() === "BUTTON" && e.target.matches(`${params.linkId}`)){
						//e.preventDefault();
						let route = e.target.dataset.akdRoute;
						document.location.hash = '#' + route;
						//window.history.pushState({}, "", url);
						/////navigateTo(e.target.href);
						//window.dispatchEvent(new HashChangeEvent('hashchange'))
					}
				});/*  */
			} else if(params.mode === "history"){
				// Listen on popstate:
				window.addEventListener('popstate', routingFn);
			} else if(params.mode === "click"){
				window.addEventListener('load', function(e) {
					let btns = $all(params.linkId), 
					btn = $one(`[data-akd-route="${currentRoute}"]`);
					
					if(isArray(btns)) btns.forEach(b => b.classList.remove(params.linkActiveClass));
					if(btn) btn.classList.add(params.linkActiveClass);
				});
				
				document.addEventListener('click', function(e) {
					let $this = isElement(this) ? this : e.target, 
					trimmed = params.linkId.replace('[', '').replace(']', '').replace('.', '').replace('#', '');
					if($this.hasAttribute(trimmed) || $this.hasAttribute('data-akd-router-link')) {
						e.preventDefault();
						let route = $this.getAttribute('data-akd-route') || $this.getAttribute('data-route'), btns = $all(params.linkId)
						if(isString(route) && (/#/.test.route || route.match(/^.*#/) || route.match(/^#/))){
							route = route.slice(1);
						}
						if(route){
							currentRoute = route;
							localStorage.setItem(params.lsKey + 'currentRoute', currentRoute);
							navigateTo(currentRoute, routeViewEl, extra);
							if(Array.isArray(btns)) btns.forEach(b => b.classList.remove(params.linkActiveClass));
							$this.classList.add(params.linkActiveClass);
						}
					} else if(e.target.matches('[data-link]')){
						e.preventDefault();
						navigateTo(e.target.href);
					}
				});
			} else {
				
			}
			
			window.route = route;
			
			// this might run more than once
			routingFn();
			
		}
		
		initEvents();
		
		return this;
	}
	// -------------------------------------------------------------
	_pbd.SPA = _pbd.fn.SPA = function(config){
		const _this = this, defaultConfig = {};
		params = _pbd.extend(defaultConfig, config || {});
		
		let routes = params.routes || [], rootEl, routeViewEl, contextMenuWrapperEl, contextMenuTargetEl;
		
		const _wireFrame = (output) => {
			output = $one(output);
			let finalData = `<div class="router-app flexi-row">
				<div class="left-side">
					<div class="sidebar-head">
						<span class="menu-toggler-wrapper">
							<button class="menu-toggler"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#fff"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
						</span>
						<form class="router-app-search-bar hover--submit">
							<input class="router-app-search-input hover--submit-input" type="search" placeholder="search for..." onfocus="this.select();" />
							<button class="router-app-search-submit hover--submit-button" type="submit">go!</button>
						</form>
					</div>
					<nav class="router-nav">
						<ul>`;
						_pbd.forEach(routes, (val, key) => {let name = key === '/' ? 'home' : key;finalData += `<li><button class="" title="go: ${key}" type="button" data-akd-route="${key}" data-akd-router-link>${_pbd.filename(''+name)}</button></li>`});
						finalData += `</ul>
					</nav>
					<div class="sidebar-foot">
						<span class="menu-toggler-wrapper">
							<button class="menu-toggler menu-toggle-button"><span></span></button>
						</span>
					</div>
				</div>
				<div class="right-side">
					<div id="akd-router-view"></div>
					<span id="found-total"></span>
				</div>
				<div class="context-menu-wrapper">
					<div id="context-menu-options">
						<ul>
							<li><button id="" class="context-option" type="button" data-akd-context-option="find-in-text" data-akd-context-button>Find in Text</button></li>
						</ul>
					</div>
					<span id=""></span>
				</div>
			</div>`;
			
			if(isElement(output)){
				output.innerHTML = finalData;
			}
			return finalData;
		}
		
		return {
			setup(obj){
				if(obj && isPlainObject(obj)) params = _pbd.extend(params, obj);
				_wireFrame(params.root);
				
				rootEl = $one(params.root);
				routeViewEl = $one(params.viewId);
				contextMenuWrapperEl = $one('.context-menu-wrapper');
				
				this.initEvents();
				
				return this;
			},
			setRoute(route){
				if(isPlainObject(route)) {
					_pbd.extend(params, route);
				}
				
				return this;
			},
			addPlugin(obj){return this;},
			navigateTo(route){return this;},
			initEvents(){
				let target = null, contextMenuTargetElOrigContent = '', foundTotal = $one('#found-total');
				_pbd(rootEl).on("contextmenu", e => {
					console.log(e);
					e.preventDefault();
					contextMenuTargetEl = e.target;
					contextMenuTargetElOrigContent = contextMenuTargetEl.innerHTML;
					if(contextMenuTargetEl !== contextMenuWrapperEl || (contextMenuTargetEl.tagName.toUpperCase() !== "BUTTON" || contextMenuTargetEl.tagName.toUpperCase() !== "A")) {
						contextMenuWrapperEl.classList.add('active');
						Object.assign(contextMenuWrapperEl.style, {top: `${e?.layerY??e.clientY}px`, left: `${e.clientX - (contextMenuWrapperEl.offsetWidth/2)}px`})
					} else {}
					
					$('.selected-element').removeClass('selected-element');
					contextMenuTargetEl.classList.add('selected-element');
				});
				_pbd('.menu-toggler').on("click", e => {
					//e.target.classList.toggle('toggled');
					_pbd('.menu-toggler').toggleClass('toggled');
					_pbd('.router-app').toggleClass('sidebar-toggled');
				});
				
				_pbd('.router-app-search-input').on("input", (e) => {
					target = isElement(contextMenuTargetEl) && contextMenuTargetEl || routeViewEl;
					//contextMenuTargetElOrigContent = target.innerHTML;
					_pbd.findInText(e.target.value, target, (res,i)=>{
						if(res.length > 0 && i <= 0){foundTotal.classList.add('active');target.innerHTML = contextMenuTargetElOrigContent;}
						else if(res.length > 0 && !foundTotal.classList.contains('active')) foundTotal.classList.add('active');
						else if(foundTotal.classList.contains('active')) foundTotal.classList.remove('active');
						foundTotal.textContent = `${i} term/s found`;
					});
				});
				
				_pbd(rootEl).on("click", e => {
					let $this = e.target;
					if($this !== contextMenuWrapperEl && !$this.hasAttribute('data-akd-context-button')) {
						contextMenuWrapperEl.classList.remove('active');
						$('.selected-element').removeClass('selected-element');
					} else if($this.hasAttribute('data-akd-context-button')){
						if($this.getAttribute('data-akd-context-option') === 'find-in-text'){
							_pbd('.menu-toggler').addClass('toggled');
							$one('.router-app').classList.add('sidebar-toggled');
							$one('.router-app-search-input').focus()
						}
					}
				});
				return this;
			},
			render(cfgObj){
				this.setup();
				_pbd.Router(params);
				
				return this;
			}
		}
	}

	// -------------------------------------------------------------
	const call = (key, ...args) => context => context[key](...args);
	const capitalize2 = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
	const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
	const castArray = val => (Array.isArray(val) ? val : [val]);
	const chainAsync = fns => {let curr = 0;const last = fns[fns.length - 1];const next = () => {const fn = fns[curr++];fn === last ? fn() : fn(next);};next();}
	/* chainAsync([
		next => {console.log('0 seconds');setTimeout(next, 1000);}, 
		next => {console.log('1 second');setTimeout(next, 1000);}, 
		() => {console.log('2 second');}
	]); */
	function createCollection (selector, context) {
		//const initial = isString(selector) ? (context || document).querySelectorAll(selector) : selector;
		const initial = isString(selector) ? $all(selector,context) : selector;
		const instance = Object.create(_pbd.fn);
		return initial ? instance.add(initial) : instance;
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
			_pbd(this.$emptyPanel).removeClass(this.activeTabContentClass);
			_pbd(this.$loadingPanel).addClass(this.activeTabContentClass);
			if((isString(index) && isSelector(index)) || isElement(index)){
				var target = $one(index), targetId = target.getAttribute("data-target-id");
				if(isString(targetId)){
					selectedPanel = $one(targetId, this.$el);
					if(isElement(selectedPanel)){
						_pbd(this.$tabLinks).removeClass(this.activeTabLinkClass);
						_pbd(this.$tabPanels).removeClass(this.activeTabContentClass);
						_pbd(target).addClass(this.activeTabLinkClass);
						if(this.activeTabAttr != "") target.setAttribute(this.activeTabAttr, "");
						if(this.useAnimation === true && isString(this.animationName)){
							removeClass(this.$loadingPanel,this.activeTabContentClass);
							this.animate(selectedPanel, this.animationName, this.duration);
						} else {
							setTimeout(function(){
								_pbd(this.$loadingPanel).removeClass(this.activeTabContentClass);
								_pbd(selectedPanel).addClass(this.activeTabContentClass);
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
				
				navId = replaceAll(navId," ","-");
				tabId = replaceAll(tabId," ","-");
				
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
						_pbd(newTabPanel).html(_html.text());
					}).catch(function(er){
						_pbd(newTabPanel).html(er.message);console.log(er.message);
					});
				} else if(isElement(tabContent)){
					newTabPanel.appendChild(tabContent);
				} else {
					_pbd(newTabPanel).html(tabContent);
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
	function app(appName, appObject, appConfig){
		var $this = this;
		var _defaultConfig = {};
		appConfig = extend(_defaultConfig, appConfig || {});
		
		var $return = this.appLoader( appName, appObject, appConfig, this );
		return this;
	}
	_pbd.fn.buildApp = app;
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
			appType = _typeof(apps), unknownFnName = "unknown-function-"+uid();
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
	// -------------------------------------------------------------
	var __$ = function(selector,context) {
		var el, __akd_self = _pbd || this;
		try{
			if(!arguments || arguments.length === 0 ) el = _pbd;
			else {
				__akd_self = el = new _pbd(selector,context);
				el.init();
			}
		} catch(e){console.log(e);}
		return el;
	}
	
	//if ( !noGlobal ) {
	_global.$akd = _global.$ = _pbd;
	//}
	return _pbd;
})(/*getGlobalObject() || */this);

function getGlobalObject(){return typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};}

