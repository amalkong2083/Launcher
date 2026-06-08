'use strict';

if (!Array.prototype.head) {
	Array.prototype.head = function () {return this[0];}
}
const  hasDocument = ('undefined' !== typeof document), hasWindow = ('undefined' !== typeof window), 
nonce = Date.now(), 
clickEvent = hasDocument && document.ontouchstart ? "touchstart" : "click", 
_loader = '<div class="bouncing-loader"><div></div><div></div><div></div></div>';

// const $typeof = function trueTypeOf(obj) {return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();}
const $typeof = function trueTypeOf (obj, val) {return arguments.length === 1 || (val === null || val === undefined) ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === val;}
const inArray = (needle, arr) => {if ((typeof arr == 'undefined') || !arr.length || !arr.push) return false;for (var i = 0; i < arr.length; i++) if (arr[i] == needle) return true;return false;}
const isBlob = (obj) => {return window.Blob && obj instanceof Blob;}
const isString = str => typeof(str) === "string";
const isArray = arr => Array.isArray(arr) || $typeof(arr) === "array";
const isFunction = str => $typeof(str) === "function";
const isObject = obj => {return obj === Object(obj) || $typeof(obj) === "object";}
const isPlainObject = val => {return !!val && $typeof(val) === 'object' && val.constructor === Object;}
const isPlainObject2 = val => {
	if ($typeof(val) !== 'object' || val === null) {
		return false;
	}

	const prototype = Object.getPrototypeOf(val);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}
/**
 * Check if the given value is a plain object.
 *
 * @param {Mixed} value
 * @return {Boolean}
 */
const isPlainObj = val => {
	if($typeof(value) !== "object") {
		return false;
	}
	
	if(val === undefined || val === null) {
		return false;
	}
	
	const prototype = Object.getPrototypeOf(val);
	
	if(prototype === null || prototype === Object.getPrototypeOf({})) {
		return true;
	}
	
	return val.constructor === Object;
};

const isElement = (obj) => {return (typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string");}
const isInteger = (x) => {return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0;}
const isNumber = (val) => {return $typeof( val ) === 'number' && val === val;}
const isNumeric = ( obj ) => {var realStringObj = obj && obj.toString();return isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;}
const isReallyDefined = (str) => {return str && typeof(str) !== undefined && typeof(str) !== "undefined";}

const fileFuncs = {
	//name: function(path){let rPath = /.*(\/|\\)/;return path.replace( rPath, '' );}, 
	name(filename,with_ext){if( filename.length == 0 ) return "";if(with_ext == '' || with_ext == null) {var with_ext = false;}var nameOnly = "";var dot = filename.lastIndexOf(".");if( dot == -1 ) {return filename;}/* var splint = filename.split('.'); */var splint = filename.split('?');var splint2 = splint[0].split('.');var pieces = splint2[0].split("/");var ext = splint2[1];for (var i = 0; i < pieces.length; i++) nameOnly = pieces[i];if(with_ext) {return nameOnly.replace('.','') + '.' + ext;} else {return nameOnly;}}, 
	bytes(bytes, si){
		var thresh = si ? 1000 : 1024;
		if (Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}
		var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while (Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1) + ' ' + units[u];
	}, 
	ext(filename,toLower) {if(typeof(toLower) == 'undefined') toLower = true;if(/^.*\.[^\.]*$/.test(filename)){var splint = filename.split('?');var ext = splint[0].replace(/^.*\.([^\.]*)$/, "$1");/* var ext = filename.replace(/^.*\.([^\.]*)$/, "$1"); */return toLower ? ext.toLowerCase(ext) : ext;} else return "";}, 
}, 
html = {
	camelize: (stringToCamelize) => {if(String(stringToCamelize).indexOf('-') == -1){return stringToCamelize;}var oStringList = String(stringToCamelize).split('-');var isFirstEntry = true;var camelizedString = '';for(var i=0; i < oStringList.length; i++){if(oStringList[i].length>0){if(isFirstEntry){camelizedString = oStringList[i];isFirstEntry = false;} else {var s = oStringList[i];camelizedString += s.charAt(0).toUpperCase() + s.substring(1);}}}return camelizedString;}, 
	/**
	 * Decode HTML entities from an encoded string
	 * https://stackoverflow.com/a/7394787/1293256
	 * @param  {String} html The encoded HTML string
	 * @return {String}      A decoded HTML string
	 */
	decode : (html) => {var txt = document.createElement('textarea');txt.innerHTML = html;return txt.value;},
	encodeUTF8: ( str ) => {"use strict";/*jshint nonstandard:true*/return unescape( encodeURIComponent( str ) );},
	escape: (str) => {if (!str) return str;return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');},
	escapeHTML: (str) => {return str.replace(/[&<>'"]/g, function (tag) {return {'&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#39;','"': '&quot;'}[tag] || tag;});},
	/*
	 * Escape HTML in the input string.
	 */
	escapeInput: (str) => {
		var entityMap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'};
		return String(str).replace(/[&<>"'`=\/]/g, function (s) {
			return entityMap[s];
		});
	},
	unescape: (str) => {return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, function (tag) {return {'&amp;': '&','&lt;': '<','&gt;': '>','&#39;': "'",'&quot;': '"'}[tag] || tag;});},
	highlight: (str, pattern) => {return str.replace(new RegExp("(" + pattern + ")", "g"), "<em>$1</em>");}, 
	/*!
	 * Sanitize and encode all HTML in a user-submitted string
	 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {String} str  The user-submitted string
	 * @return {String} str  The sanitized string
	 */
	sanitize : (str) => {
		var temp = document.createElement('div');
		temp.textContent = str;
		return temp.innerHTML;
	},
	stripTags : (str) => {return str.replace(/<[^>]*>/g, '');},
	truncate : (str, num) => {return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;}, 
	/*!
	 * Serialize all form data into a query string
	 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {Node}   form The form to serialize
	 * @return {String}      The serialized form data
	 */
	serialize : (form) => {
		// Setup our serialized data
		var serialized = [];
		// Loop through each field in the form
		for (var i = 0; i < form.elements.length; i++) {
			var field = form.elements[i];
			// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
			if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
			// If a multi-select, get all selections
			if (field.type === 'select-multiple') {
				for (var n = 0; n < field.options.length; n++) {
					if (!field.options[n].selected) continue;
					serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
				}
			}
			// Convert field data to a query string
			else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
			}
		}

		return serialized.join('&');
	},
	//var serializeCookie : function serializeCookie(name, val) {return "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(val));},
	serializeCookie : (name, val) =>  "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(val)),
	serializeForm : (form) => {return Array.from(new FormData(form), function (field) {return field.map(encodeURIComponent).join('=');}).join('&');}, 
	ucWord: (word) => word.charAt(0).toUpperCase() + word.slice(1)
	//const serializeForm : (form) => Array.from(new FormData(form), (field) => field.map(encodeURIComponent).join('=');).join('&'),
}, 
 kookie = {
	write(name, value, expires, path, domain, secure) {
		const cookie = [name + '=' + encodeURIComponent(value)];
		isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());
		isString(path) && cookie.push('path=' + path);
		isString(domain) && cookie.push('domain=' + domain);
		secure === true && cookie.push('secure');
		document.cookie = cookie.join('; ');
	}, 
	read(name) {
		const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
		return (match ? decodeURIComponent(match[3]) : null);
	}, 
	remove(name) {
		this.write(name, '', Date.now() - 86400000);
	}
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

/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 */
function isSpecificValue(val) {return (val instanceof Buffer || val instanceof Date || val instanceof RegExp) ? true : false;}

function cloneSpecificValue(val) {
	if(val instanceof Buffer) {
		var x = Buffer.alloc ? Buffer.alloc(val.length) : new Buffer(val.length);
		val.copy(x);
		return x;
	} else if (val instanceof Date) {
		return new Date(val.getTime());
	} else if (val instanceof RegExp) {
		return new RegExp(val);
	} else {
		throw new Error('Unexpected situation');
	}
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
	var clone = [];
	arr.forEach(function (item, index) {
		if (typeof item === 'object' && item !== null) {
			if (Array.isArray(item)) {
				clone[index] = deepCloneArray(item);
			} else if (isSpecificValue(item)) {
				clone[index] = cloneSpecificValue(item);
			} else {
				clone[index] = deepExtend({}, item);
			}
		} else {
			clone[index] = item;
		}
	});
	return clone;
}

function safeGetProperty(object, property) {
	return property === '__proto__' ? undefined : object[property];
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
const deepExtend = function (/*obj_1, [obj_2], [obj_N]*/) {
	if (arguments.length < 1 || typeof arguments[0] !== 'object') {
		return false;
	}

	if (arguments.length < 2) {
		return arguments[0];
	}

	var target = arguments[0];

	// convert arguments to array and cut off target object
	var args = Array.prototype.slice.call(arguments, 1);

	var val, src, clone;

	args.forEach(function (obj) {
		// skip argument if isn't an object, is null, or is an array
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			return;
		}

		Object.keys(obj).forEach(function (key) {
			src = safeGetProperty(target, key); // source value
			val = safeGetProperty(obj, key); // new value

			// recursion prevention
			if (val === target) {
				return;

			/**
			 * if new value isn't object then just overwrite by new value
			 * instead of extending.
			 */
			} else if (typeof val !== 'object' || val === null) {
				target[key] = val;
				return;

			// just clone arrays (and recursive clone objects inside)
			} else if (Array.isArray(val)) {
				target[key] = deepCloneArray(val);
				return;

			// custom cloning and overwrite for specific objects
			} else if (isSpecificValue(val)) {
				target[key] = cloneSpecificValue(val);
				return;

			// overwrite by new value if source isn't object or array
			} else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
				target[key] = deepExtend({}, val);
				return;

			// source value and new value is objects both, extending...
			} else {
				target[key] = deepExtend(src, val);
				return;
			}
		});
	});

	return target;
};

/*!
 * Create a new object composed of properties picked from another object
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} obj   The object to pick properties from
 * @param  {Array}  props An array of properties to use
 * @return {Object}       The new object
 */
function pick(obj, props) {
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
/** Makes a deep copy of an array or object (mostly) */
function copy(obj){
	if(typeof obj !== 'object' || obj === null) return obj;
	var cpy = Array.isArray(obj) ? [] : {};
	for(var key in obj) cpy[key] = copy(obj[key]);
	return cpy;
}
function bind(fn, thisArg) {return function wrap() {return fn.apply(thisArg, arguments);};}
function bindFunction(f, self){return function() { f.apply(self, arguments); };}

function loader($el, $cont, delay = 750){
	$el = $($el);
	$el.empty().append(_loader);
	setTimeout(()=>{
		$el.empty().append($cont);
	}, delay);
	
	return {
		then:(cb)=>{if(cb && $typeof(cb) === 'function') {if(delay){delay = (delay + 100);setTimeout(()=>{cb.apply(null, [$cont, $el])}, delay);} else cb.apply(null, [$cont, $el]);}}
	}
}
function loader2($el, $cont, delay = 750){
	$el = isElement($el) ? $el : document.querySelector($el);
	//$el = $($el)[0];
	// $el.innerHTML = _loader;
	empty($el);
	$el.insertAdjacentHTML('beforeend', _loader);
	setTimeout(()=>{
		empty($el);
		if(typeof $cont === 'string') {
			//$el.innerHTML = $cont;
			$el.insertAdjacentHTML('beforeend', $cont);
		} else {
			// $el.innerHTML = '';$el.append($cont);
			$el.insertAdjacentElement('afterend', $cont);
		}
	},delay);
	
	return {
		then:(cb)=>{if(cb && typeof(cb) === 'function') {if(delay){delay = (delay + 100);setTimeout(()=>{cb.apply(null, [$cont, $el])}, delay);} else cb.apply(null, [$cont, $el]);}}
	}
}
function elementStyle(strOrEle){var element = isElement(strOrEle) ? strOrEle : isString(strOrEle) ? one(strOrEle) : null;return (!element) ? null :(element.currentStyle ? element.currentStyle : (window.getComputedStyle ? window.getComputedStyle(element,null) : document.defaultView.getComputedStyle(element, null)));}
function throttle(cb, delay = 1000){
	let shouldWait = false, waitingArgs;
	
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

const liveEdit = throttle(function(input, output){
	input = $one(input), output = $one(output);
	let text = ("value" in input) ? input.value : input.textContent;
	
	if("value" in output){
		output.value = text;
	} else {
		// output.textContent = text;
		output.innerHTML = text;
	}
}, 250);

/* const findInText = throttle( */function findInText(q, el, cb){
	if(isString(q) && q.length >= 3 && isElement(el)){
		let textToSearch = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 
		pattern = new RegExp(`${textToSearch}`, "gi"), 
		i = 0, res = q;
		
		res = el.textContent.replace(pattern, match => {i++;return `<mark>${match}<\/mark>`;});
		// el.innerHTML = res;
		empty(el)
		el.insertAdjacentHTML('beforeend', res);
		// $one("#found-total").textContent = `${i} term/s found`;
		if(isFunction(cb)){
			cb.apply(null, [res, i, pattern]);
		}
	} else {}
	
	return this;
}/* }, 250); */
async function fetchFile(url, resType = "json", cfg = {}, cb) {
	if(!isString(url)) return {};
	const res = await fetch(url, cfg);
	const data = await res[resType]();
	if(cb && isFunction(cb)){
		// cb.call(null, ...data);
		cb(data);
		return;
	}
	return data;
}

const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const parseTemplate = (obj, tmpl) => {
	if(obj && $typeof(obj) !== "object"){
		console.log(`the first argument has to be an object, a/n ${$typeof(obj)} was passed instead`);
		return false;
	}
	
	if(tmpl && $typeof(tmpl) !== "string"){
		console.log(`the second argument has to be an string, a/n ${$typeof(obj)} was passed instead`)
		return false;
	}
	
	var tmp = '';
		
	for(i in obj){
		if(tmp == '') tmp = tmpl.replace(new RegExp(escapeRegExp(i), 'g'),obj[i]??"???")
		else tmp = tmp.replace(new RegExp(escapeRegExp(i), 'g'),obj[i]??"???")
	}
	
	return tmp;
}

const sorter = (arr, by, ascdsc="asc") => {
	if(!isArray(arr) || (by && !isString(by)) ) return -1;
	let _strip = (str) => isString(str) && str.replace(/^(a |an |the )/gi, '').trim();
	ascdsc= isString(ascdsc) ? ascdsc : "asc";
	let sortedArr = arr.sort((a, b) => ascdsc && ascdsc !== "dsc" ? (_strip(a[by]||a) < _strip(b[by]||b) ? -1 : 1) : _strip(a[by]||a) > _strip(b[by]||b) ? -1 : 1);
	return sortedArr
};
const shuffle = (arr) => {
	// Shuffle slide order if needed		
	if (isArray(arr)){
		for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);	// Fisher-Yates shuffle algorithm (jsfromhell.com/array/shuffle)
		return arr
	}

	return this;
}
const readBlob = async function* (blob) {
	if(blob.stream) {
		yield* blob.stream();
	} else if(blob.arrayBuffer) {
		yield await blob.arrayBuffer();
	} else if(blob[asyncIterator]) {
		yield* blob[asyncIterator]();
	} else {
		yield blob;
	}
}
const randomColorFactor = () => Math.round(Math.random() * 255);
const randomColor = (opacity) => 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.7') + ')';
function initializeRandoms(what="all"){
	if(what === "all" || what === "bgimage"){
		let galleryList = $siteData?.gallery.images ?? [
			{"alt" : "_48crH8AzXBOrqzoGkadxCcXTsryIquEvagJrFl8MHs", "src" : "_48crH8AzXBOrqzoGkadxCcXTsryIquEvagJrFl8MHs.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "197548", "src" : "197548.png", "ext" : "png", "mime" : "image/png", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "afro_samurai_bloody_wallpaper_by_whit_3_d493zki-fullview", "src" : "afro_samurai_bloody_wallpaper_by_whit_3_d493zki-fullview.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "218942", "src" : "218942.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "54590", "src" : "54590.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "548UY800", "src" : "548UY800.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "26769573", "src" : "26769573.png", "ext" : "png", "mime" : "image/png", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "Fat-pussy", "src" : "Fat-pussy.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "Fat-pussy1", "src" : "Fat-pussy1.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "download", "src" : "download.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "pussy-cream", "src" : "pussy-cream.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
		];
		$("[data-random-bgimage]").each((i, el)=>{
			let bg = shuffle(galleryList)[0].src;
			$(el).css({"backdrop-filter": "blur(5px)","background-image": `url("./.img/${bg}")`, "background-size": "cover", "background-position": "center center", "background-repeat": "no-repeat"});
		});
	}
	if(what === "all" || what === "bgcolor"){
		$("[data-random-bgcolor]").each((i, el)=>{
			let bg = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6);
			$(el).css("background-color", bg);
		});
	}
	return "";
}
function viewInventoryItem(itemObj, cat){
	let $html = "";
	if(!itemObj) return $html;
	
	if(isObject(itemObj)){
		$html += `<div class="receipt d-flex flex-col gap-8 p-8 my-8 mt-8 mb-8 border bdr-8 bg-opaque">
			<span class="receipt-legend d-flex align-center gap-8">
				<span class="border-bottom-2 mr-auto" data-name>Beryllium</span>
				<span class="border-bottom-2 ml-auto" data-id>${itemObj.id}</span>
			</span>
			<span class="receipt-heading d-flex align-center flex-even gap-8">
				<span class="left-side d-flex flex-col gap-8 w-12 mr-auto border">
					<span class="border w-12 " data-key>Beryllium (Kingston)</span>
					<span class="border w-12" data-address>1-7 Southcamp rd.</span>
				</span>
				<span class="right-side d-flex flex-col gap-8 w-12 ml-auto border">
					<span class="border w-12" data-name>${itemObj.name}</span>
					<span class="border w-12" data-address>${itemObj?.address??""}</span>
				</span>
			</span>
			<span class="receipt-body d-flex flex-center w-12">
				<span class="receipt-info w-12 border ml-auto ws-pre" data-description>${itemObj?.description??""}</span>
			</span>
			<!-- <button class="view-entry-button my-auto" type="button" data-target="editor" data-params='{"action": "${cat}", "id": ${itemObj.id}, "name": "${itemObj.name}"}' data-akd-button>edit</button> -->
		</div>`;
	}
	
	return $html;
}

function displayInventoryItem(itemObj, cat){
	let $html = "";
	if(!itemObj) return $html;
	
	const render = obj => {
		let str = "";
		if(isObject(obj)){
			// str += `<span class="">found ${Object.entries(itemObj).length} entries</span>`;
			str += `<div class="d-flex flex-col gap-8 p-8 my-8 mb-8 border bdr-8 bg-opaque">
				<ul class="filter-list ">`;
				for(let i in obj){
					str += `<li class="filter-item d-flex align-center gap-4 p-4">
						<span class="border" data-key>${i}</span><span class="border" data-value>${obj[i]}</span>
					</li>`;
				}
				str += `</ul>
				<button class="view-entry-button my-auto" type="button" data-target="view" data-params='{"action": "${cat}", "id": ${obj.id}, "name": "${obj.name}"}' data-akd-button>view</button>
			</div>`;
		}
		return str;
	}
	
	if(isArray(itemObj)) {
		$html += `<span class="d-flex flex-center p-6 m-8 bdr-4x bg-opaque-dark text-white">found ${Object.entries(itemObj).length} entries</span>`;
		itemObj.forEach(item=>{$html += render(item)});
	}
	
	return $html;
}

let loggedIn = false;
function authenticate(cb=null, cpin = null){
	//console.log(cb, Object.keys(cb))
	// Correct Pin Value
	let correctPin = cpin || "1234";
	//let loggedIn = false;
	let btns = document.getElementsByClassName("pinpad-btn");
	let pinInput = document.getElementById("pinpad-input");
	let showPassword = document.getElementById("pinpad-show-password");
	let submitBtn = document.getElementById("pinpad-submit-btn");
	let delBtn = document.getElementById("pinpad-delete-btn");
	let modal = document.getElementById("pinpad-modal");
	let modalShield = document.getElementById("pinpad-modal-shield");
	let closeBtn = document.getElementById("pinpad-close");
	
	modalShield.style.display = "block";
	modal.style.display = "flex";
			
	for (let i = 0; i < btns.length; i++) {
		let btn = btns.item(i);
		if(btn.id && (btn.id === "pinpad-submit-btn" || btn.id === "pinpad-delete-btn"))
			continue;
		
		// Add onclick event listener to 
		// Every button from 0 - 9
		btn.addEventListener("click", (e) => {pinInput.value += e.target.value;});
	}
	
	submitBtn.addEventListener("click", () => {
		if(loggedIn === true) return true;
		if(!pinInput || !pinInput.value || pinInput.value === "") {
			alert("Please enter a pin first");
		} else if(pinInput.value === correctPin) {
			alert("Correct PIN");
			loggedIn = true;
			modalShield.style.display = "none";
			modal.style.display = "none";
			if(cb) cb();
		} else {
			alert("Incorrect PIN");
		}
		// Reset the input
		pinInput.value = "";
	});
	
	delBtn.addEventListener("click", () => {if(pinInput.value) pinInput.value = pinInput.value.substr(0, pinInput.value.length - 1);});
	closeBtn.addEventListener("click", () => {modalShield.style.display = "none";modal.style.display = "none";pinInput.value = "";});
	showPassword.addEventListener("click", () => {
		if(pinInput.getAttribute("type") === "password"){
			pinInput.setAttribute("type", "text");
		} else {
			pinInput.setAttribute("type", "password");
		}
	});
	
	return loggedIn;
}

function format(content = "", mode = "js", action = "beautify", params = {}){
	// if(!vkbeautify) return content;
	
	// mode = mode && mode.toUpperCase();
	mode = mode.toLowerCase();
	action = action.toLowerCase();
	
	if(action === "beautify"){
		var cp = document.getElementById('custom_pattern')?.value??"";
		cp = cp.replace(/\'/g,'').replace(/\"/g,'');
		if(!isNaN(parseInt(cp))) {  // argument is integer
			cp = parseInt(cp);
		} else {
			cp = cp ? cp : 4;
		}
		/* // ta = document.getElementById('ta');
		if(mode === 'XML') {content = vkbeautify.xml(content, cp);} else if(mode === 'JSON') {content = vkbeautify.json(content, cp);} else if(mode === 'CSS') {content = vkbeautify.css(content, cp);} else if(mode === 'SQL') {content = vkbeautify.sql(content, cp);}
		*/
		content = window["AKD_Formatter"] ? AKD_Formatter.beautify_text(content, mode, params, cp)  : ((("vkbeautify" in window) || window["vkbeautify"]) && $typeof(vkbeautify[mode]) === "function" ? vkbeautify[mode](content, params) : content);
	} else if(action === "minify"){
		/* var preservecomm = document.getElementById('preservews')?.checked??true;
		 if(mode === 'XML') {content = preservecomm ? vkbeautify.xmlmin(content, true) : vkbeautify.xmlmin(content);} else if(mode === 'JSON') {content = preservecomm ? vkbeautify.jsonmin(content) : vkbeautify.jsonmin(content);} else if(mode === 'CSS') {content = preservecomm ? vkbeautify.cssmin(content, true) : vkbeautify.cssmin(content);}  else if(mode === 'SQL') {content = vkbeautify.sqlmin(content);} 
		content = $typeof(vkbeautify[`${mode}min`]) === "function" ? ((mode === "css" || mode === "xml") && preservecomm ? vkbeautify[`${mode}min`](content, true) : vkbeautify[`${mode}min`](content)) : content;
		*/
		content = window["AKD_Formatter"] ? AKD_Formatter.minify_text(content, mode, params?.preservecomm??null)  : ((("vkbeautify" in window) || window["vkbeautify"]) && $typeof(vkbeautify[`${mode}min`]) === "function" ? vkbeautify[`${mode}min`](content, params) : content);
	}
	// countChars();
	return content;
}
function unpacker_filter(source) {
	var leading_comments = '', comment = '', unpacked = '', found = false;
	
	// cuts leading comments
	do {
		found = false;
		if(/^\s*\/\*/.test(source)) {
			found = true;
			comment = source.substr(0, source.indexOf('*/') + 2);
			source = source.substr(comment.length);
			leading_comments += comment;
		} else if (/^\s*\/\//.test(source)) {
			found = true;
			comment = source.match(/^\s*\/\/.*/)[0];
			source = source.substr(comment.length);
			leading_comments += comment;
		}
	} while (found);
	
	leading_comments += '\n';
	source = source.replace(/^\s+/, '');
	
	var unpackers = [P_A_C_K_E_R, Urlencoded, JavascriptObfuscator /*, MyObfuscate*/ ];
	for(var i = 0; i < unpackers.length; i++) {
		if(unpackers[i].detect(source)) {
			unpacked = unpackers[i].unpack(source);
			if(unpacked !== source) {
				source = unpacker_filter(unpacked);
			}
		}
	}
	
	return leading_comments + source;
}
function copyText() {
	if(the.editor) {
		the.editor.execCommand('selectAll');
		var currentText = the.editor.getValue();
		var copyArea = $('<textarea />').text(currentText).attr('readonly', '').css({ 'position': 'absolute', 'left': '-9999px' });
		
		$('body').append(copyArea);
		copyArea.select();
		document.execCommand('copy');
		copyArea.remove();
	} else {
		$('#source').select();
		document.execCommand('copy');
	}
}
function imageEditor(img, params = {}){
	let image = document.getElementById('sourceImage');
	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');
	// Get all the sliders of the image
	let brightnessSlider = document.getElementById("brightnessSlider");
	let contrastSlider = document.getElementById("contrastSlider");
	let grayscaleSlider = document.getElementById("grayscaleSlider");
	let hueRotateSlider = document.getElementById("hueRotateSlider");
	let saturateSlider = document.getElementById("saturationSlider");
	let sepiaSlider = document.getElementById("sepiaSlider");
	
	function uploadImage(event) {
		// Set the source of the image from the uploaded file
		image.src = URL.createObjectURL(event.target.files[0]);
		
		image.onload = function () {
			// Set the canvas the same width and height of the image
			canvas.width = this.width;
			canvas.height = this.height;
			canvas.crossOrigin = "anonymous";
			applyFilter();
		};
		
		// Show the image editor controls and hide the help text
		document.querySelector('.help-text').style.display = "none";
		document.querySelector('.image-save').style.display = "block";
		document.querySelector('.image-controls').style.display = "block";
		document.querySelector('.preset-filters').style.display = "block";
	};

	function applyFilter() {
		// Create a string that will contain all the filters
		// to be used for the image
		let filterString =
			"brightness(" + brightnessSlider.value + "%" +
			") contrast(" + contrastSlider.value + "%" +
			") grayscale(" + grayscaleSlider.value + "%" +
			") saturate(" + saturateSlider.value + "%" +
			") sepia(" + sepiaSlider.value + "%" +
			") hue-rotate(" + hueRotateSlider.value + "deg" + ")";
		
		// Apply the filter to the image
		context.filter = filterString;
		
		// Draw the edited image to canvas
		// context.drawImage(image, 0, 0);
		draw(filterString);
		image.style.filter = filterString;
		
	}
	
	function brightenFilter() {
		resetImage();
		brightnessSlider.value = 130;
		contrastSlider.value = 120;
		saturateSlider.value = 120;
		applyFilter();
	}
		
	function bwFilter() {
		resetImage();
		grayscaleSlider.value = 100;
		brightnessSlider.value = 120;
		contrastSlider.value = 120;
		applyFilter();
	}

	function funkyFilter() {
		resetImage();
		// Set a random hue rotation everytime
		hueRotateSlider.value = Math.floor(Math.random() * 360) + 1;
		contrastSlider.value = 120;
		applyFilter();
	}
	
	function vintageFilter() {
		resetImage();
		brightnessSlider.value = 120;
		saturateSlider.value = 120;
		sepiaSlider.value = 150;
		applyFilter();
	}
	// Reset all the slider values to there default values
	function resetImage() {
		brightnessSlider.value = 100;
		contrastSlider.value = 100;
		grayscaleSlider.value = 0;
		hueRotateSlider.value = 0;
		saturateSlider.value = 100;
		sepiaSlider.value = 0;
		applyFilter();
	}
	
	function saveImage() {
		// Select the temporary element we have created for
		// helping to save the image
		let linkElement = document.getElementById('link');
		linkElement.setAttribute('download', 'edited_image.png');
		
		// Convert the canvas data to a image data URL
		let canvasData = canvas.toDataURL("image/png")
		
		// Replace it with a stream so that
		// it starts downloading
		canvasData.replace("image/png", "image/octet-stream")
		
		// Set the location href to the canvas data
		linkElement.setAttribute('href', canvasData);
		
		// Click on the link to start the download 
		linkElement.click();
	}
	
	let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }
	let cameraZoom = 1
	let MAX_ZOOM = 10
	let MIN_ZOOM = 0.1
	let SCROLL_SENSITIVITY = 0.0005
	
	function draw(filterString){
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		
		context.save();
		
		// Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
		context.translate( window.innerWidth / 2, window.innerHeight / 2 )
		context.scale(cameraZoom, cameraZoom)
		context.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y )
		
		context.filter = filterString;
		drawImage(image, 0, 0);
		
		context.restore();
		
		requestAnimationFrame(function(){draw(filterString)})
	}
	
	function draw2(){
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		
		// Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
		context.translate( window.innerWidth / 2, window.innerHeight / 2 )
		context.scale(cameraZoom, cameraZoom)
		context.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y )
		context.clearRect(0,0, window.innerWidth, window.innerHeight)
		context.fillStyle = "#991111"
		drawRect(-50,-50,100,100)
		
		context.fillStyle = "#eecc77"
		drawRect(-35,-35,20,20)
		drawRect(15,-35,20,20)
		drawRect(-35,15,70,20)
		
		context.fillStyle = "#fff"
		drawText("Simple Pan and Zoom Canvas", -255, -100, 32, "courier")
		
		context.rotate(-31*Math.PI / 180)
		context.fillStyle = `#${(Math.round(Date.now()/40)%4096).toString(16)}`
		drawText("Now with touch!", -110, 100, 32, "courier")
		
		context.fillStyle = "#fff"
		context.rotate(31*Math.PI / 180)
		
		drawText("Wow, you found me!", -260, -2000, 48, "courier")
		
		requestAnimationFrame( draw )
	}
	
	// Gets the relevant location from a mouse or single touch event
	function getEventLocation(e){
		if (e.touches && e.touches.length == 1){
			return { x:e.touches[0].clientX, y: e.touches[0].clientY }
		} else if (e.clientX && e.clientY) {
			return { x: e.clientX, y: e.clientY }        
		}
	}

	function drawImage(img, x, y, width, height){
		(width && height ) ? context.drawImage(img, x, y, width, height) : context.drawImage(img, x, y);
	}
	
	function drawRect(x, y, width, height){
		context.fillRect( x, y, width, height )
	}
	
	function drawText(text, x, y, size, font){
		context.font = `${size}px ${font}`
		context.fillText(text, x, y)
	}
	
	let isDragging = false
	let dragStart = { x: 0, y: 0 }

	function onPointerDown(e){
		isDragging = true
		dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
		dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
	}
	
	function onPointerUp(e){
		isDragging = false
		initialPinchDistance = null
		lastZoom = cameraZoom
	}
	
	function onPointerMove(e){
		if (isDragging){
			cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
			cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
		}
	}
	
	function handleTouch(e, singleTouchHandler){
		if ( e.touches.length == 1 ){
			singleTouchHandler(e)
		} else if (e.type == "touchmove" && e.touches.length == 2){
			isDragging = false
			handlePinch(e)
		}
	}
	
	let initialPinchDistance = null
	let lastZoom = cameraZoom
	
	function handlePinch(e){
		e.preventDefault()
		
		let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
		let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }
		
		// This is distance squared, but no need for an expensive sqrt as it's only used in ratio
		let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2
		
		if (initialPinchDistance == null){
			initialPinchDistance = currentDistance
		} else {
			adjustZoom( null, currentDistance/initialPinchDistance )
		}
	}
	
	function adjustZoom(zoomAmount, zoomFactor){
		if(!isDragging){
			if(zoomAmount){
				cameraZoom += zoomAmount
			} else if(zoomFactor){
				//console.log(zoomFactor)
				cameraZoom = zoomFactor*lastZoom
			}
			
			cameraZoom = Math.min(cameraZoom, MAX_ZOOM)
			cameraZoom = Math.max(cameraZoom, MIN_ZOOM)
			
			//console.log(zoomAmount)
		}
	}
	
	let in_editor_mode = true;
	function toggleEditMode(e){
		let img = sourceImage, cnv = canvas, target = e?.target || null;
		if(in_editor_mode === true){
			cnv.style.display = "block";
			img.style.display = "none";
			if(target) target.textContent = "Editing";
			in_editor_mode = false;
		} else {
			img.style.display = "block";
			cnv.style.display = "none";
			if(target) target.textContent = "Edit?";
			in_editor_mode = true;
		}
	}
	
	document.addEventListener("click", (e) => {
		//e.preventDefault();
		let target = e.target;
		//console.log(cameraZoom, target, target.id)
		if(cameraZoom >= MIN_ZOOM && cameraZoom <= MAX_ZOOM){
			if(target.id === "zoom-in"){
				cameraZoom *= 1.1;
			}
			if(target.id === "zoom-out"){
				cameraZoom /= 1.1;
			}
			draw();
		}
	});

	canvas.addEventListener('mousedown', onPointerDown)
	canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
	canvas.addEventListener('mouseup', onPointerUp)
	canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
	canvas.addEventListener('mousemove', onPointerMove)
	canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
	canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))
	
	image.addEventListener('mousedown', onPointerDown)
	image.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
	image.addEventListener('mouseup', onPointerUp)
	image.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
	image.addEventListener('mousemove', onPointerMove)
	image.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
	image.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))
	
	// Ready, set, go
	//draw()
	
	return this;
}
function middleMan(){
	addEventListener('fetch', function (event) {
		event.respondWith(handleRequest(event.request));
	});
	
	// Allowed domain origins
	var allowed = ['http://localhost:8000', 'https://your-website.com'];
	
	/**
	 * Respond to the request
	 * @param {Request} request
	 */
	async function handleRequest(request) {
		var headers = new Headers({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
			'Access-Control-Allow-Headers': '*'
		});
	
		// If domain is not allowed, return error code
		if (!allowed.includes(request.headers.get('origin'))) {
			return new Response('Not allowed', {
				status: 403,
				headers: headers
			});
		}
		
		// If the method is POST, get some values
		var someVal = 'defaultValue';
		if(request.method === 'POST') {
			var body = await request.json();
			someVal = body.someVal;
		}
	
		// Call the API
		// Use API_KEY for wherever your API key should be passed in. 
		// That might be a header, or part of the URL itself
		var resp = await fetch(`https://path-to-api.com?api-key=${API_KEY}&val=${someVal}`);
		var data = await resp.json();
	
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: headers
		});
	
	};
}
function getApiResponse(url) {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		
		request.onreadystatechange = function (e) {
			if(this.readyState == 4) {
				if(this.status == 200) {
					resolve(this.responseText);
				} else {
					reject(this.statusText);
				}
			}
		};
		
		request.open('GET', url, true);
		request.send();
	});
}

/*
getApiResponse('http://numbersapi.com/random')
	.then(response => response.match(/^\d+/)[0].substring(0, 3))
	.then(number => getApiResponse('https://anapioficeandfire.com/api/characters/${number}'))
	.then(character => console.log(character))
	.catch(error => console.log(error));

async function makeRequest(url) {
	try {
		const numberPromise = await getApiResponse(url);
		const number = numberPromise.match(/^\d+/)[0].substring(0, 3);
		const gotPromise = await getApiResponse('https://anapioficeandfire.com/api/characters/${number}');
		return gotPromise;
	} catch (e) {
		throw new Error(e);
	}
}

makeRequest('/http://numbersapi.com/random')
	.then(result => console.log(result))
	.catch(error => console.log('Error:', error));
*/

/*
var myLibrary = (function () {
	'use strict';
	// Create a public methods objec	
	var methods = {};
	methods.extend = function (name, fn) {
		methods[name] = fn;
	};
	// Return public methods object
	return methods;
})();
function networkSpeedDetector(url){
	let userImageLink = url || "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
        let time_start, end_time;

        // The size in bytes
        let downloadSize = 5616998;
        let downloadImgSrc = new Image();

        downloadImgSrc.onload = function () {
            end_time = new Date().getTime();
            displaySpeed();
        };
        time_start = new Date().getTime();
        downloadImgSrc.src = userImageLink;


        function displaySpeed() {
            let timeDuration = (end_time - time_start) / 1000;
            let loadedBits = downloadSize * 8;

            // Converts a number into string  using toFixed(2) rounding to 2
            let bps = (loadedBits / timeDuration).toFixed(2);
            let speedInKbps = (bps / 1024).toFixed(2);
            let speedInMbps = (speedInKbps / 1024).toFixed(2);
            alert("Your internet connection speed is: \n"
                + bps + " bps\n" + speedInKbps
                + " kbps\n" + speedInMbps + " Mbps\n");
        }
}
*/
const PAGE = {
	srtictMode: true, 
	allowedRoutes: ["home", "orders", "overview", "deliveries", "editor", "admin"], 
	restrictedRoutes: ["workspace", "admin"], 
	methods: {}, 
	pageProp: 'other',
	activePage: 'home',
	get prop() {
		console.log('accessing prop');
		return this.otherProp;
	},
	
	set prop(val) {
		console.log(`setting pageProp to ${val}`);
		this.pageProp = val;
	}, 
    /* console.log(PAGE.prop);
    PAGE.prop = 'new!';
    console.log(PAGE);*/
	async database(url, resType = "json", cfg = {}, cb){
		if(!isString(url) || url.length < 3) url = "./data/_json/site.json";
		return await fetchFile(url, resType,  cfg, cb);
	}, 
	extend(name, fn) {
		// this.methods[name] = fn;
		this[name] = fn;
	}, 
	routes: {
		home: () => {
			let template = document.getElementById("home-tmpl").innerHTML;
			let parsed = Ashe.parse(template, {
				title: "Brand New Shoes", 
				items: [
					{id: 23, rate: .5, size: 11}, 
					{id: 34, rate: .7, size: 10}, 
				]
			});
			let $html = `<article id="home-window" class="akd-window">
				${parsed}
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					// document.getElementById("content-display").innerHTML = parsed;
				});
		}, 
		ai(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			
			let $html = `<article id="chatGPT" class="akd-window">
				<div class="utilitybar collapsed">
					<!-- <div class="tooltip">
						<span class="tooltiptext">Open Utilitybar</span>
						<button id="utilitybar-toggle"><i class="fas fa-chevron-right"></i></button>
					</div> -->
					<div class="utilitybar-content">
						<div class="conversation-list">
							<div class="conversation">
								<p class="conversation-text">Last Conversation:</p>
								<p class="conversation-content">No conversation yet</p>
							</div>
						</div>
						<button id="new-conversation-btn">Start New Conversation</button>
					</div>
					<div class="toggler-wrapper">
						<button id="utilitybar-toggle"><i class="fas fa-chevron-right"></i></button>
					</div>
				</div>
				
				<div class="chat-container light-mode">
			        <div class="chat-content">
			        	<div class="chat-header">
							<div class="logo-container">
								<h1><span id="selected-ai-model-display">ChatGPT 3.5</span>&nbsp;<i class="fa fa-caret-down"></i></h1>
								<select id="ai-model-select" class="">
									<option value="chatgpt" selected>ChatGPT 3.5</option>
									<option value="gemini4">Gemini 4.0</option>
									<option value="claude3">Claude 3.7</option>
									<option value="claude4">Claude 4</option>
									<option value="grok">GROK 3.2</option>
									<option value="deepseek">DeepSeek-R1-0528</option>
								</select>
							</div>
							<div class="mode-toggle">
								<label class="switch">
									<input type="checkbox" id="mode-toggle-checkbox">
									<span class="slider round"></span>
								</label>
							</div>
						</div>
						<div class="chat-box" id="chat-box"></div>
						<div class="input-container">
							<input type="text" id="user-input" placeholder="Type your message...">
							<button id="send-button"><b>&uarr;</b></button>
						</div>
					</div>
				</div>
			</article>`;
			
			loader("#content-display", $html)
				.then(() => {
					const chatBox = document.getElementById('chat-box');
					const userInput = document.getElementById('user-input');
					const sendButton = document.getElementById('send-button');
					const utilitybarToggle = document.getElementById('utilitybar-toggle');
					const utilitybar = document.querySelector('.utilitybar');
					const modeToggleCheckbox = document.getElementById('mode-toggle-checkbox');
					const conversationList = document.querySelector('.conversation-list');
					const conversationContainer = document.querySelector('.conversation');
					const newConversationBtn = document.getElementById('new-conversation-btn');
					const conversationContent = document.querySelector('.conversation-content');
					const chatContainer = document.querySelector('.chat-container');
					const ai_ModelSelect = document.getElementById("ai-model-select");
					const ai_ModelDisplay = document.getElementById("selected-ai-model-display");
					let selectedModel = ai_ModelSelect.value;
					let selectedModelName = ai_ModelSelect.options[ai_ModelSelect.selectedIndex].textContent;
					let model_loaded = false;
					
					modeToggleCheckbox.addEventListener('change', () => {document.body.classList.toggle('dark-mode');});
					
					sendButton.addEventListener('click', sendMessage);
					userInput.addEventListener('keydown', (event) => {
						if (event.key === 'Enter') {
							sendMessage();
						}
					});
					
					utilitybarToggle.addEventListener('click', function () {
						const utilitybar = document.querySelector('.utilitybar'), i = utilitybarToggle.querySelector(".fas");
						utilitybar.classList.toggle('collapsed');
						
						if (utilitybar.classList.contains('collapsed')) {
							/*chatContainer.style.width = '96%';
							chatContainer.style.marginLeft = '3%';*/
							chatContainer.style.width = 'calc(100% - 50px)';
							chatContainer.style.marginLeft = '50px';
							i.classList.replace("fa-chevron-left", "fa-chevron-right");
						} else {
							chatContainer.style.width = 'calc(100% - 300px)';
							chatContainer.style.marginLeft = '300px';
							i.classList.replace("fa-chevron-right", "fa-chevron-left");
						}
					});
					newConversationBtn.addEventListener('click', function () {conversationContent.textContent = "New Conversation Started!";});
					
					modeToggleCheckbox.addEventListener('change', function () {
						chatContainer.classList.toggle('light-mode');
						chatContainer.classList.toggle('dark-mode');
					});
					
					ai_ModelSelect.addEventListener('change', function () {
						model_loaded = false;
						selectedModel = this.value;
						selectedModelName = ai_ModelSelect.options[ai_ModelSelect.selectedIndex].textContent;
						ai_ModelDisplay.textContent = selectedModelName;
						loadModel(selectedModel);
						getResponse("");
					});
					// ----------------------------------------------------++++
					function loadModel(model){
						let api_url = "???", api_key = "eehdhfh463344ggdg6623", token = "", message = "", 
						div = Object.assign(document.createElement('div'), {className: "conversation"});
						
						if(typeof model !== "string") return false;
						
						if(model === "chatgpt"){
							// api_key = "Re6xxt39dGdhfh463344ggdg6v6273", token = "", 
							api_url = `https://www.openai.org/api/?api_key=${api_key}&token=${token}`;
						}
						
						if(model === "gemini"){
							//api_key = "926dhfh463344g2dg6623", token = "", 
							api_url = `https://www.gemini.google.com/api/?api_key=${api_key}&token=${token}`;
						}
						
						if(model === "claude"){
							//api_key = "eehdhfh463344ggdg6623", token = "", 
						}
						
						if(model === "grok"){
							//api_key = "eehdhfh463344ggdg6623", token = "", 
						}
						
						if(api_url.length > 0){
							model_loaded = true;
							console.log("model loaded? : "+model_loaded, "API url: "+api_url);
						} else {
							console.log("model loaded? : "+model_loaded, "API url: "+api_url);
						}
						message = `<p class="conversation-text">Model Change:</p>
						<p class="conversation-content">model selected: <strong>${selectedModelName}</strong>, model loaded? : ${model_loaded}, API url: ${api_url}</p>`;
						
						insertHtml(div, message);
						conversationList.appendChild(div);
						
						return model_loaded;
					}
					function sendMessage() {
						const message = userInput.value.trim();
						if (message !== '') {
							appendMessage('user', message);
							getResponse(message);
							userInput.value = '';
						}
					}
					function appendMessage(sender, message) {
						let loader = Object.assign(document.createElement("div"), {"className": "loader", innerHTML: `<hr /><hr /><hr />`});
						//chatBox.insertAdjacentHTML('beforeend', loader);
						chatBox.appendChild(loader);
						chatBox.scrollTop = chatBox.scrollHeight;
						setTimeout(() => {
							chatBox.removeChild(loader);
							const p = document.createElement('p');
							p.textContent = `${sender}: ${message}`;
							chatBox.appendChild(p);
							chatBox.scrollTop = chatBox.scrollHeight;
						}, 750);
					}
					function appendMessage2(sender, message) {
						const p = document.createElement('p');
						p.textContent = `${sender}: ${message}`;
						chatBox.appendChild(p);
						chatBox.scrollTop = chatBox.scrollHeight;
					}
					function getResponse(message) {
						let response;
						const greetings = ["Hello!", "Hi there!", "Hey!", "Greetings!"];
						const affirmatives = ["Yes", "Certainly", "Of course", "Absolutely"];
						const negatives = ["No", "Sorry, I can't do that", "Unfortunately not", "I'm afraid not"];
						const thanks = ["You're welcome!", "No problem!", "Glad to help!", "Anytime!"];
						const commands = {
							"help": "You can ask me questions or chat about various topics.",
							"time": getCurrentTime(),
							"date": getCurrentDate(),
							"weather": getWeatherInfo(),
							"joke": getJoke(),
							"fact": getFact(),
							"quote": getQuote(),
							// Add more commands here as needed
						};
						
						if(message && message.toLowerCase() === "weather") {
							const form = document.getElementById("weather-form");
							const searchInput = document.getElementById("weather-location");
							const typeInput = document.getElementById("weather-type");
							const asInput = document.getElementById("weather-output-as");
							const city = searchInput?.value || "Kingston";
							const type = typeInput?.value || "current";
							const as = asInput?.value || "json";
							let loader = Object.assign(document.createElement("div"), {"className": "loader", innerHTML: `<hr /><hr /><hr />`});
							
							chatBox.appendChild(loader);
							chatBox.scrollTop = chatBox.scrollHeight;
							
							setTimeout(function(){
								const uri = url(city, type, as);
								const p = document.createElement('p');
								const respData = getWeather(city, type, as)
								console.log("1", url(city, type, as), respData);
								/* fetch(url(city, type, as), { origin: "cors" })
								.then(res => {
									console.log("2", url(city, type, as));
									const respData = resp.json();
									return respData;
								})*/
								Promise.resolve(respData).then(data => {
									console.log("2", url(city, type, as), message.toLowerCase());
									chatBox.removeChild(loader);
									//let data = res[0];
									console.log("3", url(city, type, as), message.toLowerCase());
									let weather = data.current, location = data.location;
									p.innerHTML = `${selectedModelName || 'ChatGPT'}: <h2>Current Forcast: ${location.country}</h2>
									<h3> ${location.region}, ${location.name} - (${weather.temp_c}°C)</h3>
									<small class="text-sm">Last Updated: ${weather.last_updated}</small>
									<small class="text-sm">Wind: ${weather.wind_dir}, ${weather.wind_kph}kph</small>`;
									chatBox.appendChild(p);
									chatBox.scrollTop = chatBox.scrollHeight;
								})
								.catch((e) => {
									let sender = selectedModelName || "ChatGPT", message = getWeatherInfo();
									chatBox.removeChild(loader);
									p.textContent = `${sender}: ${message}`;
									chatBox.appendChild(p);
									chatBox.scrollTop = chatBox.scrollHeight;
								})
							}, 100);
						} else {
							if(message.toLowerCase() in commands) {
								response = commands[message.toLowerCase()];
							} else if(message.toLowerCase().includes("thank")) {
								response = getRandomElement(thanks);
							} else if(message.toLowerCase().includes("yes")) {
								response = getRandomElement(affirmatives);
							} else if(message.toLowerCase().includes("no")) {
								response = getRandomElement(negatives);
							} else {
								response = getRandomElement(greetings);
							}
							
							setTimeout(() => appendMessage(selectedModelName || 'ChatGPT', response), 1000);
						}
					}
					
					function getCurrentTime() {const now = new Date();return `Current time is ${now.toLocaleTimeString()}`;}
					function getCurrentDate() {const now = new Date();return `Today's date is ${now.toDateString()}`;}
					function getWeatherInfo() {
						// Simulate getting weather information from an API
						const weatherData = {
							temperature: getRandomNumber(10, 35),
							condition: getRandomElement(["Sunny", "Cloudy", "Rainy", "Windy"]),
						};
						return `Current weather: ${weatherData.temperature}°C, ${weatherData.condition}`;
					}
					//---------
					const weatherapi_apikey = "038266238bf54f2a83604914251905";
					const url = (city, type = "search", as = "json") =>`http://api.weatherapi.com/v1/${type}.${as?as:"json"}?key=${weatherapi_apikey}&q=${city}`;
					async function getWeather(city, type, as, el) {
						const resp = await fetch(url(city, type, as)/*, { origin: "cors" }*/);
						const respData = await resp.json();
						return respData;
					}
					async function getWeatherByLocation(city, type, as, el) {
						const resp = await fetch(url(city, type, as), { origin: "cors" });
						const respData = await resp.json();
						addWeatherToPage(respData, type, el);
					}
					
					function addWeatherToPage(data, type, $main) {
						// const temp = KtoC(data.main.temp);
						const div = document.createElement("div");
						div.classList.add("weather");
						if(type === "search"){
							let temp = data?.temp_c??34;
							div.innerHTML = `<h2>temperature: ${temp}°C </h2>
							<small>${data[0].name}</small>`;
						} else {
							let weather = data.current, location = data.location;
							div.innerHTML = `<h2>Current Forcast: ${location.country}</h2>
							<h3> ${location.region}, ${location.name} - (${weather.temp_c}°C)</h3>
							<small class="text-sm">Last Updated: ${weather.last_updated}</small>
							<small class="text-sm">Wind: ${weather.wind_dir}, ${weather.wind_kph}kph</small>`;
						}
						// cleanup
						/* $main.innerHTML = "";
						$main.appendChild(div);*/
						loader($main, div)
					}
					function KtoC(K) {return Math.floor(K - 273.15);}
					//----------
					function getJoke() {
						// Simulate getting a random joke
						const jokes = ["Why don't scientists trust atoms? Because they make up everything!",
							"Parallel lines have so much in common. It's a shame they'll never meet.",
							"I told my wife she was drawing her eyebrows too high. She looked surprised.",
							"Why did the scarecrow win an award? Because he was outstanding in his field!"
						];
						return getRandomElement(jokes);
					}
		
					function getFact() {
						// Simulate getting a random fact
						const facts = ["Ants stretch when they wake up in the morning.", 
							"A group of flamingos is called a flamboyance.", 
							"Honey never spoils.", 
							"The shortest war in history lasted only 38 minutes.", 
							"Octopuses have three hearts.", 
							"The bald eagle (Haliaeetus leucocephalus) is a bird of prey found in North America. A sea eagle, it has two known subspecies and forms a species pair with the white-tailed eagle (Haliaeetus albicilla), which occupies the same niche as the bald eagle in the Palearctic. Its range includes most of Canada and Alaska, all of the contiguous United States, and northern Mexico. It is found near large bodies of open water with an abundant food supply and old-growth trees for nesting.", 
							"The golden eagle (Aquila chrysaetos) is a bird of prey living in the Northern Hemisphere. It is the most widely distributed species of eagle. Like all eagles, it belongs to the family Accipitridae. They are one of the best-known birds of prey in the Northern Hemisphere. These birds are dark brown, with lighter golden-brown plumage on their napes. Immature eagles of this species typically have white on the tail and often have white markings on the wings. Golden eagles use their agility and speed combined with powerful feet and large, sharp talons to hunt a variety of prey, mainly hares, rabbits, and marmots and other ground squirrels.", 
							"The common tern (Sterna hirundo) is a seabird in the family Laridae. This bird has a circumpolar distribution, its four subspecies breeding in temperate and subarctic regions of Europe, Asia and North America. It is strongly migratory, wintering in coastal tropical and subtropical regions. Breeding adults have light grey upperparts, white to very light grey underparts, a black cap, orange-red legs, and a narrow pointed bill. Depending on the subspecies, the bill may be mostly red with a black tip or all black. There are several similar species, including the partly sympatric Arctic tern, which can be separated on plumage details, leg and bill colour, or vocalisations.", 
							"The great blue heron (Ardea herodias) is a large wading bird in the heron family Ardeidae, common near the shores of open water and in wetlands over most of North and Central America, as well as far northwestern South America, the Caribbean and the Galápagos Islands. It is occasionally found in the Azores and is a rare vagrant to Europe. An all-white population found in south Florida and the Florida Keys is known as the great white heron. Debate exists about whether these white birds are a color morph of the great blue heron, a subspecies of it, or an entirely separate species.", 
							`Hawks are birds of prey of the family Accipitridae. They are very widely distributed and are found on all continents except Antarctica.
							<ul>
								<li>The subfamily Accipitrinae includes goshawks, sparrowhawks, sharp-shinned hawks, and others. This subfamily are mainly woodland birds with short broad wings, long tails, and high visual acuity. They hunt by dashing suddenly from a concealed perch.</li>
								<li>In America, members of the Buteo group are also called hawks; this group is called buzzards in other parts of the world. Generally, buteos have broad wings and sturdy builds. They are relatively larger-winged and shorter-tailed than accipiters, and fly further distances in open areas. Buteos descend or pounce on their prey rather than hunting in a fast horizontal pursuit.</li>
							</ul>`
						];
						return getRandomElement(facts);
					}
					
					function getQuote() {
						// Simulate getting a random quote
						const quotes = ["The only way to do great work is to love what you do. – Steve Jobs",
							"In the middle of difficulty lies opportunity. – Albert Einstein",
							"Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill"
						];
						return getRandomElement(quotes);
					}
					
					function getRandomElement(array) {
						const randomIndex = Math.floor(Math.random() * array.length);
						return array[randomIndex];
					}
					
					function getRandomNumber(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min;}
					getResponse('Hello');
				});
		}, 
		view(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"items", id = params?.id??0, 
			$html = "", $form = "", found = {};
			
			found = $siteData[action] && $siteData[action].filter(e => Number(e.id) === Number(id));
			found = isArray(found) ? found[0] : found;
			
			console.log(action, id, found)
			
			$html = viewInventoryItem(found, action);
			loader("#content-display", $html)
				.then(()=>{
					
				});
		}, 
		settings(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {};
			
			let $html = `<article id="settings-window" class="akd-window">
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					
				});
		}, 
		admin(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {}, 
			site_themes = ["default", "red", "pbd"], 
			$html = `<article id="admin-window" class="akd-window --has-footer --has-sidebar" data-akd-window data-random-bgimage>
				<div class="akd-window-body">
					<aside class="akd-window-sidebar right--side" data-akd-window-sidebar>
						<nav class="d-block overflow-auto">
							<ul class="d-flex flex-wrap gap-2 bg-opaque bdr-1">
								<li><span class="skin-option-button" data-skin-name="default"></span></li>
								<li><span class="skin-option-button" data-skin-name="red"></span></li>
								<li><span class="skin-option-button" data-skin-name="akd"></span></li>
							</ul>
						</nav>
						<nav class="d-block overflow-auto">
							<ol>
								<li></li>
							</ol>
						</nav>
					</aside>
					<section class="pos-rel grid-view w-12 h-12 overflow-hidden" style="gap: 0;">
						<div class="d-flex flex-wrap flex-center w-12">
							<span id="section-name" class="d-flex flex-center bdr-8 px-8 py-2 mx-auto bg-opaque-dark text-white"></span>
						</div>
						<div class="snap-container x">
							<div class="snap-section" data-section-title="Settings & Configurations">
								<span class="snap-section-title">Settings & Configurations</span>
								<div class="d-grid flex-wrap w-12 h-12 overflow-auto" style="grid-template-rows: auto;grid-template-columns: repeat(2, calc(50% - 0.375rem));gap: 0.5rem;align-items: start;align-content: start;">
									<nav class="detail-list-box">
										<div class="detail-list-head">
											<span class="">Site Settings</span>
											<span class="ml-auto">
												<button class="detail-list-toggler" type="button" data-akd-button><I class="fa fa-minus"></i></button>
											</span>
										</div>
										<ul class="detail-list bg-opaque">
											<li>
												<label for="" class="form-label">Base URL</label>
												<input id="" class="form-control" type="text" value="${$siteData.settings && $siteData.settings.base_url || '/'}" />
											</li>
											<li>
												<label for="" class="form-label">Media URL</label>
												<input id="" class="form-control" type="text" value="${$siteData.settings && $siteData.settings.media_url || '/media/'}" />
											</li>
											<li>
												<label for="" class="form-label">Data URL</label>
												<input id="" class="form-control" type="text" value="${$siteData.settings && $siteData.settings.data_url || '/data/'}" />
											</li>
											<li>
												<label for="" class="form-label">Projects URL</label>
												<input id="" class="form-control" type="text" value="${$siteData.settings && $siteData.settings.projects_url || '/_projects/'}" />
											</li>
											<li>
												<label for="" class="form-label">remember last page visited?</label>
												<input id="" class="form-check-input" type="checkbox" ${$siteData.settings && true === $siteData.settings.remember_last_page_visited ? "checked" : ""} />
											</li>
											<li>
												<label for="" class="form-label">theme</label>
												<select id="" class="form-select">
												${site_themes.map(theme => {
													return `<option value="${theme}" ${theme === $siteData.settings?.site_theme ? "selected" : ""}>${theme}</option>`;
												}).join("")}
												</select>
											</li>
										</ul>
									</nav>
									
									<nav class="detail-list-box">
										<div class="detail-list-head">
											<span class="">Navigation Settings</span>
											<span class="ml-auto">
												<button class="detail-list-toggler" type="button" data-akd-button><I class="fa fa-minus"></i></button>
											</span>
										</div>
										<ul class="detail-list bg-opaque">
											<li>
												<label for="" class="form-label">Restrict routes?</label>
												<input id="" class="form-check-input" type="checkbox" ${$siteData.settings && true === $siteData.settings.restrict_routes ? "checked" : ""} />
											</li>
											<li>
												<label for="" class="form-label">Restrict certain file types?</label>
												<input id="" class="form-check-input" type="checkbox" ${$siteData.settings && true === $siteData.settings.restrict_certain_filetypes ? "checked" : ""} />
											</li>
											<li>
												<label for="" class="form-label">theme</label>
												<select id="" class="form-select">
												${site_themes.map(theme => {
													return `<option value="${theme}" ${theme === $siteData.settings?.site_theme ? "selected" : ""}>${theme}</option>`;
												}).join("")}
												</select>
											</li>
										</ul>
									</nav>
									
									<nav class="detail-list-box">
										<div class="detail-list-head">
											<span class="">Ai Settings</span>
											<span class="ml-auto">
												<button class="detail-list-toggler" type="button" data-akd-button><I class="fa fa-minus"></i></button>
											</span>
										</div>
										<ul class="detail-list bg-opaque">
											<li>
												<label for="" class="form-label">Default Model</label>
												<input id="" class="form-control" type="text" value="${$siteData.settings && $siteData.settings.default_ai_model || 'gemini'}" />
											</li>
											<li>
												<label for="" class="form-label">Selected Model</label>
												<input id="" class="form-control" type="text" value="${$siteData.settings && $siteData.settings.selected_ai_model || 'gemini'}" />
											</li>
											<li>
												<label for="" class="form-label ws-nowrap">Model Version</label>
												<select id="" class="form-select" onchange="document.getElementById('selected-ai-model-version').value = this.value;">
													<option value="1.0.0">1.0.0</option>
													<option value="2.0.0">2.0.0</option>
													<option value="3.0.0">3.0.0</option>
												</select>
												<input id="selected-ai-model-version" class="form-control" type="text" value="${$siteData.settings && $siteData.settings.selected_ai_model_version || '1.0.0'}" readonly />
											</li>
											<li>
												<label for="" class="form-label">remember last page visited?</label>
												<input id="" class="form-check-input" type="checkbox" checked />
											</li>
										</ul>
									</nav>
									
									<nav class="detail-list-box">
										<div class="detail-list-head">
											<span class="">Typography Settings</span>
											<span class="ml-auto">
												<button class="detail-list-toggler" type="button" data-akd-button><I class="fa fa-minus"></i></button>
											</span>
										</div>
										<ul class="detail-list bg-opaque">
											<li>
												<label for="" class="form-label">Font Size</label>
												<input id="" class="form-control" type="number" min="10" max="48" value="${$siteData.settings && $siteData.settings.site_font_size || '16'}" />
											</li>
											<li>
												<label for="" class="form-label">Default Font Family</label>
												<input id="" class="form-control" type="text" value="${$siteData.settings && $siteData.settings.site_font_family || 'Segoe'}" />
											</li>
											<li>
												<label for="" class="form-label">theme</label>
												<select id="" class="form-select">
												${site_themes.map(theme => {
													return `<option value="${theme}" ${theme === $siteData.settings?.site_theme ? "selected" : ""}>${theme}</option>`;
												}).join("")}
												</select>
											</li>
										</ul>
									</nav>
								</div>
							</div>
							
							<div class="snap-section" data-section-title="Statistics Overview">
								<span class="snap-section-title">Statistics Overview</span>
								<nav class="detail-list-box ">
									<div class="detail-list-head">
										<span class="">Statistics Overview</span>
										<span class="ml-auto">
											<button class="detail-list-toggler" type="button" data-akd-button><I class="fa fa-minus"></i></button>
										</span>
									</div>
									<ul class="detail-list bg-opaque">
										<li class="form-row">
											<span class=""></span>
											<label for="" class="form-label">
												<input id="" class="form-check-input" type="checkbox" />
											</label>
										</li>
									</ul>
								</nav>
							</div>
							
							<div class="snap-section" data-section-title="Theme & Skinz">
								<span class="">Theme & Skinz</span>
								<nav class="detail-list-box has-footer">
									<div class="detail-list-head">
										<span class="">Theme & Skinz</span>
										<span class="ml-auto">
											<button class="detail-list-toggler" type="button" data-akd-button><I class="fa fa-minus"></i></button>
										</span>
									</div>
									<ul class="detail-list bg-opaque-dark">
										<li><span class="skin-option-button" data-skin-name="default"></span></li>
										<li><span class="skin-option-button" data-skin-name="red"></span></li>
										<li><span class="skin-option-button" data-skin-name="akd"></span></li>
									</ul>
									<div class="detail-list-foot">
										
									</div>
								</nav>
							</div>
							
							<div class="snap-section" data-section-title="Databases">
								<span class="">Databases</span>
								<div id="database-display" class="d-flex flex-center w-12 h-12 p-8 bdr-2 border-1 overflow-auto">
									<ul id="database-display-list" class="d-flex flex-col w-12 h-12"></ul>
								</div>
							</div>
							
							<div class="snap-section" data-section-title="">
							<div id="main-splitter" class="splitter vertical">
								<div id="splitter-1" class="pos-rel scrollable splitter_panel first--half splitter horizontal">
									<div id="splitter-1-first" class="pos-rel splitter_panel first--half" data-random-bgcolor>
									
									</div>
									<span id="splitter-1-handle" class="splitter_handle"></span>
									<div id="splitter-1-second" class="pos-rel splitter_panel second--half" data-random-bgcolor>
										
									</div>
								</div>
								<span id="main-splitter-handle" class="splitter_handle"></span>
								<div id="splitter-2" class="pos-rel scrollable splitter_panel second--half splitter vertical" data-random-bgcolor>
									<iframe id="browser-iframe" name="browser-iframe" class="pos-rel w-12 h-12 d-block bd-0" src=""></iframe>
								</div>
							</div>
						</div>
					</section>
				</div>
				<footer class="d-flex gap-4">
					<span class="pill-buttons d-flex gap-2 py-2 mr-auto">
						<button class="menu-button btn btn-success" data-akd-button data-akd-sidebar-toggle-button><i class="fa fa-bars"></i></button>
						<button id="-utility-button" class="" data-akd-button><i class="fa fa-wrench"></i></button><button id="-reload-button" class="" data-akd-button><i class="fa fa-arrows-rotate"></i></button>
						<button id="-expand-button" class="" data-akd-button><i class="fa fa-arrows"></i></button>
					</span>
					<span class="pill-buttons d-flex flex-center gap-0 w-12 h-auto p-2 mx-auto">
						<input id="-url-input" class="w-12 bdr-0" type="text" value="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js" onfocus="this.select();" data-akd-input />
						<button id="-submit-button" class="px-8 py-5 bdr-0" data-akd-button>Go</button>
					</span>
					<span class="pill-buttons d-flex gap-2 py-2 ml-auto">
						<button id="admin-first-btn" class="admin-snap-nav-btn admin-first-btn ws-nowrap" data-akd-button><i class="fa fa-chevron-left"></i><i class="fa fa-chevron-left"></i></button>
						<button id="admin-prev-btn" class="admin-snap-nav-btn admin-prev-btn" data-akd-button><i class="fa fa-chevron-left"></i></button>
						<button id="admin-next-btn" class="admin-snap-nav-btn admin-next-btn" data-akd-button><i class="fa fa-chevron-right"></i></button>
						<button id="admin-last-btn" class="admin-snap-nav-btn admin-last-btn ws-nowrap" data-akd-button><i class="fa fa-chevron-right"></i><i class="fa fa-chevron-right"></i></button>
					</span>
				</footer>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					let $parent = document.getElementById("admin-window"), containers = $parent.querySelectorAll(".snap-section"), 
					currentIndex = 0;
					containers[currentIndex].classList.add("--active");
					
					let // _parent = document.querySelector("#fileops-window .snap-container"), 
					// scrollElements = _parent.querySelectorAll(".snap-section"), 
					//console.log(AKD_Formatter, SVGIconsCreator, SVGIconsCreator.icons());
					thresholdOptions = {root: null, rootMargin: "0px", threshold: [1]}
					const observer = new IntersectionObserver((items) => {
						items.forEach((item) => {
							if(item.isIntersecting) {
								// console.log(item, item.target, item.target.id);
								containers.forEach((el) => {if(el.classList.contains("--active")) el.classList.remove("--active");});
								item.target.classList.add("--active");
								document.getElementById("section-name").textContent = item.target.dataset.sectionTitle || item.target.dataset.snapSectionName || item.target.id;
								//observer.unobserve(item.target);
							}
						});
					}, thresholdOptions);
					
					containers.forEach((img) => {
						observer.observe(img);
					});
					////////////////////////////////////////////////////////////////
					/* let fileReaderFiletypeInput = document.getElementById("file-reader-filetype-input"), 
					fileReaderFiletypeSelect = document.getElementById("file-reader-filetype-select"), 
					ext = fileReaderFiletypeInput.value.length > 0 ? fileReaderFiletypeInput.value : fileReaderFiletypeSelect.value;
					
					let $reader = document.getElementById("file-reader"), 
					$highlightElem = $reader.querySelector("pre"), $editorElem = $reader.querySelector("textarea")
					//Prism.highlightElement($highlightElem);
					
					// TODO : add class from the input element if a value is present
					$(fileReaderFiletypeSelect).on("change", (e) => {
						let val = e.target.value;
						for(let i = 0;i < textFiles.length;i++){
							if($highlightElem.classList.contains(`language-${textFiles[i]}`)) $highlightElem.classList.remove(`language-${textFiles[i]}`);
						}
						if(fileReaderFiletypeInput.value.length > 0 && $highlightElem.classList.contains(`language-${fileReaderFiletypeInput.value}`)) $highlightElem.classList.remove(`language-${fileReaderFiletypeInput.value}`);
						$highlightElem.classList.add(`language-${val}`);
						// console.log(val, $highlightElem.className);
					});*/
					
					$(".admin-snap-nav-btn").on("click", (e) => {
						const button = e.target;
						let newIndex = currentIndex;
						if(button.id === "admin-prev-btn" || button.id === "admin-next-btn"){
							const index = button.id === "admin-next-btn" ? 1 : -1;
							let scrollOptions = {/*left: 0, top: 0, */behavior:  'smooth'};
							newIndex = currentIndex + index;
							if(newIndex < 0) newIndex = containers.length - 1;
							if(newIndex >= containers.length) newIndex = 0;
						} else {
							newIndex = button.id === "admin-first-btn" ? 0 :  (containers.length - 1);
						}
						// console.log(newIndex)
						containers[currentIndex].classList.remove("--active");
						containers[newIndex].classList.add("--active");
						containers[newIndex].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
						currentIndex = newIndex;
					});
					
					_.dragElement($one("#main-splitter-handle"), $one("#splitter-1"), $one("#splitter-2"), "V");
					_.dragElement("#splitter-1-handle", "#splitter-1-first", "#splitter-1-second", "H");
					
					const databaseDisplay = $("#database-display-list");
					databaseDisplay.addClass("d-flex flex-col");
					var keys = Object.keys(localStorage), i = 0, key;
					for(;key = keys[i];i++){
						databaseDisplay.append(`<li>${key} - ${localStorage.getItem(key)}</li>`);
					}
					
					initializeRandoms("bgcolor");
					
				});
		}, 
		icons(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			
			let data = {}, _type = "solid";
			fetchFile("./data/_json/icons.json", "json").then(res=>{
				let {icons} = res, iconSet = icons[_type]?.sort()??[], $html = "";
				
				$html += `<article id="icons-window" class="akd-window grid-view --three-columns w-12 h-12 overflow-hidden" style="gap: 0;">
					<header class="d-flex flex-center bg-opaque p-2">
						<span class="d-flex gap-1">
							<button class="btn btn-primary text-lg copy-selected" type="button" data-icon-name="${_type}" title="copy to clipboard"><i class="fa fa-clipboard"></i></button>
							<span id="selected-icon-display" class="d-flex flex-center bg-opaque p-2 bdr-2"></span>
						</span>
					</header>
					<section id="icons-display" class="w-12 h-12 overflow-auto">`;
					if(isArray(iconSet) && iconSet.length > 0){
						let fa_type = _type === "brands" ? "fab" : "fas";
						$html += `<ul class="icons-list">
						${iconSet.map(icon=>{
							return `<li class="icon-wrapper" data-iconset="${_type}" data-iconname="${icon}" data-icon>
								<span class="icon-name">${icon}</span>
								<div class="icon-display"><span class="${fa_type} ${icon}"></span></div>
								<span class="icon-control">
									<button class="btn btn-primary text-md copy-button" type="button" data-icon-name="${icon}" title="copy to clipboard"><i class="fa fa-clipboard"></i></button>
								</span>
							</li>`;
						}).join("")}
						</ul>`;
					}
					$html += `</section>
					<footer class="d-flex flex-center p-2 gap-4  bg-opaque">
						<span class="input-group d-flex gap-2">
							<label class="form-label" for="icons-filter-type-input">
								<span class="d-flex flex-center bg-opaque p-2 ws-nowrap">icon set:&nbsp;</span>
								<select id="icons-filter-type-select" class="form-select">
								${["all", "brands", "solid"].map(op=>{
									return `<option value="${op}" ${op === _type ? "selected" : ""}>${op}</option>`;
								}).join("")}
								</select>
							</label>
							<label class="form-label" for="icons-filter-term-input">
								<span class="d-flex flex-center bg-opaque p-2 ws-nowrap">filter term:&nbsp;</span>
								<input id="icons-filter-term-input" class="form-control form-input" type="text" onfocus="this.select();" />
							</label>
						</span>
					</footer>
				</article>`;
				
				loader("#content-display", $html)
					.then((cont, el)=>{
						let default_display = "grid";
						
						$(el).on("click", ".grid-view button, .icon-display > *", function(e){
							if($(this).hasClass("copy-button") || $(this).hasClass("copy-selected")){
								let currentText = $(this).hasClass("copy-selected") ? $("#selected-icon-display").text() : this.dataset.iconName, 
								copyArea = $('<textarea />').text(currentText).attr('readonly', '').css({ 'position': 'absolute', 'left': '-9999px' });
		
								$('body').append(copyArea);
								copyArea.select();
								document.execCommand('copy');
								copyArea.remove();
							}
							if($(this).hasClass("fas") || $(this).hasClass("fab")){
								$("#selected-icon-display").text(this.className);
							}
						});
						
						$(el).on("input", "#icons-filter-term-input", function(e){
							let items = $(el).find('.icon-wrapper[data-icon]'), _term = e.target.value.toLowerCase();
							let $filter = throttle(function(){
								items.each(function(i, item){
									let tagText = $(item).data("iconname");
									if(tagText.indexOf(_term) > -1 || tagText.toLowerCase().indexOf(_term) > -1) {
										$(item).css("display", default_display);
										// $(document).find('[data-tag="'+_term+'"]').attr('data-active', true);
									} else {
										$(item).css("display", "none");
									}
								});
							}, 250);
							$filter();
						});
						
						$("#icons-filter-type-select").change(function(e){
							let $html2 = "", opt = e.target.value;
							iconSet = icons[opt]?.sort()??[];
							if(opt === "brands"){
								if(isArray(iconSet) && iconSet.length > 0){
									$html2 += `<ul class="icons-list">
									${iconSet.map(icon=>{
										return `<li class="icon-wrapper" data-iconset="brands" data-iconname="${icon}" data-icon>
											<span class="icon-name">${icon}</span>
											<div class="icon-display"><span class="fab ${icon}"></span></div>
											<span class="icon-control">
												<button class="btn btn-primary text-sm" type="button" data-icon-name="${icon}" title="copy to clipboard"><i class="fa fa-clipboard"></i></button>
											</span>
										</li>`;
									}).join("")}
									</ul>`;
								}
							}
							if(opt === "solid"){
								if(isArray(iconSet) && iconSet.length > 0){
									$html2 += `<ul class="icons-list">
									${iconSet.map(icon=>{
										return `<li class="icon-wrapper" data-iconset="solid" data-iconname="${icon}" data-icon>
											<span class="icon-name">${icon}</span>
											<div class="icon-display"><span class="fas ${icon}"></span></div>
											<span class="icon-control">
												<button class="btn btn-primary text-sm" type="button" data-icon-name="${icon}" title="copy to clipboard"><i class="fa fa-clipboard"></i></button>
											</span>
										</li>`;
									}).join("")}
									</ul>`;
								}
							}
							if(opt === "all"){
								Object.keys(icons).forEach(key=>{
									let iconSet = icons[key];
									let fa_type = key === "brands" ? "fab" : "fas";
											
									if(isArray(iconSet) && iconSet.length > 0){
										$html2 += `<span class="d-flex place-center p-4 w-12 bg-opaque bdr-4">${key}</span>
										<ul class="icons-list">
										${iconSet.map(icon=>{
											return `<li class="icon-wrapper" data-iconset="${key}">
												<span class="icon-name">${icon}</span>
												<div class="icon-display"><span class="${fa_type} ${icon}"></span></div>
												<span class="icon-control">
													<button class="btn btn-primary text-sm" type="button" data-icon-name="${icon}" title="copy to clipboard"><i class="fa fa-clipboard"></i></button>
												</span>
											</li>`;
										}).join("")}
										</ul>`;
									}
								});
							}
							loader("#icons-display", $html2)
						});
						
					});
			}).catch(e=>console.log(e))
		}, 
		editor(params){
			try{
				params = JSON.parse(params);
			} catch(e){console.log(e)}
			// finally(){}
			//console.log(typeof params, params)
			let $html = "", $form = "", found = {}, action = params?.action ?? "items";
			
			//found = $siteData && $siteData[action] && $siteData[action].filter(e => Number(e.id) === Number(params?.id??params));
			//found = found && isArray(found) ? found[0] : found;
			
			$form = `<form class="" id="akd-form" name="akd-form" action="./" method="GET" enctype="multipart/form-data" data-method="POST" data-akd-id="{{ id }}" data-akd-action="${action}" data-akd-form>
				<input id="id" name="id" type="hidden" value="{{ id }}" data-item-id />`;
				if(action === "issued"){
					$form += `<input id="item-date" name="date" type="hidden" value="{{ date }}" data-item-date />
					<input id="item-time" name="time" type="hidden" value="{{ time }}" data-item-date />
					<input id="item-completed" name="completed" type="hidden" value="{{ completed }}" data-item-completed />
					<span class="form-row">
						<label class="form-label" for="item-name">name</label>
						<input class="form-input" id="item-name" name="name" type="text" value="{{ name }}" data-item-name />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-address">address</label>
						<input class="form-input" id="item-address" name="address" type="text" value="{{ address }}" data-item-address />
					</span>
					<span class="form-column">
						<label class="form-label" for="item-description">description</label>
						<textarea class="form-textarea" id="item-description" name="description" data-item-description>{{ description }}</textarea>
					</span>
					<span class="form-column">
						<label class="form-label" for="item-note">note</label>
						<textarea class="form-textarea" id="item-note" name="note" data-item-note>{{ note }}</textarea>
					</span>
					`;
				} else if(action === "orders"){
					$form += `<input id="item-date" name="date" type="hidden" value="{{ date }}" data-item-date />
					<input id="item-time" name="time" type="hidden" value="{{ time }}" data-item-date />
					<span class="form-row">
						<label class="form-label" for="item-name">name</label>
						<input class="form-input" id="item-name" name="name" type="text" value="{{ name }}" data-item-name />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-supplier">supplier</label>
						<input class="form-input" id="item-supplier" name="supplier" type="text" value="{{ supplier }}" data-item-supplier />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-alias">alias</label>
						<input class="form-input" id="item-alias" name="alias" type="text" value="{{ alias }}" data-item-alias />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-total">total</label>
						<input class="form-input" id="item-total" name="total" type="text" value="{{ total }}" data-item-total />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-completed">completed</label>
						<select class="form-select" id="item-completed" name="completed" data-item-completed >
							<option value="true" ${"{{ completed }}" == "true"? "selected":""} >true</option>
							<option value="false" ${"{{ completed }}" == "false"? "selected":""} >false</option>
						</select>
					</span>
					<span class="form-row">
						<label class="form-label" for="item-screenshot">screenshot</label>
						<input class="form-input" id="item-screenshot" name="screenshot" type="text" value="{{ screenshot }}" data-item-screenshot />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-address">address</label>
						<input class="form-input" id="item-address" name="address" type="text" value="{{ address }}" data-item-address />
					</span>
					<span class="form-column">
						<label class="form-label" for="item-description">description</label>
						<textarea class="form-textarea" id="item-description" name="description" data-item-description>{{ description }}</textarea>
					</span>
					<span class="form-column">
						<label class="form-label" for="item-note">note</label>
						<textarea class="form-textarea" id="item-note" name="note" data-item-note>{{ note }}</textarea>
					</span>
					`;
				} else if(action === "deliveries"){
					$form += `<span class="form-row">
						<label class="form-label d-flex flex-center p-2" for="item-name">name</label>
						<input class="form-input" id="item-name" name="name" type="text" value="{{ name }}" data-item-name />
					</span>
					<span class="form-row">
						<label class="form-label d-flex flex-center p-2" for="item-supplier">supplier</label>
						<input class="form-input" id="item-supplier" name="supplier" type="text" value="{{ supplier }}" data-item-supplier />
					</span>
					<span class="form-row">
						<label class="form-label d-flex flex-center p-2" for="item-alias">alias</label>
						<input class="form-input" id="item-alias" name="alias" type="text" value="{{ alias }}" data-item-alias />
					</span>
					<span class="form-row">
						<label class="form-label d-flex flex-center p-2" for="item-total">total</label>
						<input class="form-input" id="item-total" name="total" type="text" value="{{ total }}" data-item-total />
					</span>
					<span class="form-row">
						<label class="form-label d-flex flex-center p-2 ws-nowrap" for="item-time">delivered time</label>
						<input class="form-input" id="item-time" name="time" type="time" value="{{ time }}" data-item-time />
					</span>
					<span class="form-row">
						<label class="form-label d-flex flex-center p-2 ws-nowrap" for="item-date">delivered date</label>
						<input class="form-input" id="item-date" name="date" type="date" value="{{ date }}" data-item-date />
					</span>
					<span class="form-row">
						<label class="form-label d-flex flex-center p-2 ws-nowrap" for="item-by">delivered by</label>
						<input class="form-input" id="item-by" name="by" type="date" value="{{ by }}" data-item-by />
					</span>
					<span class="form-row">
						<label class="form-label d-flex flex-center p-2" for="item-address">address</label>
						<input class="form-input" id="item-address" name="address" type="text" value="{{ address }}" data-item-address />
					</span>
					<span class="form-column">
						<label class="form-label d-flex flex-center p-2" for="item-description">description</label>
						<textarea class="form-textarea" id="item-description" name="description" data-item-description>{{ description }}</textarea>
					</span>
					<span class="form-column">
						<label class="form-label d-flex flex-center p-2" for="item-note">note</label>
						<textarea class="form-textarea" id="item-note" name="note" data-item-note>{{ note }}</textarea>
					</span>
					`;
				} else  {
					$form += `<span class="form-row">
						<label class="form-label" for="item-name">name</label>
						<input class="form-input" id="item-name" name="name" type="text" value="{{ name }}" data-item-name />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-type">type</label>
						<input class="form-input" id="item-type" name="type" type="text" value="{{ type }}" data-item-type />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-size">size</label>
						<input class="form-input" id="item-size" name="size" type="text" value="{{ size }}" data-item-size />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-quantity">quantity</label>
						<input class="form-input" id="item-quantity" name="quantity" type="number" value="{{ quantity }}" data-item-quantity />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-total">total</label>
						<input class="form-input" id="item-total" name="total" type="number" value="{{ total }}" data-item-total />
					</span>
					<span class="form-row">
						<label class="form-label" for="item-price">price</label>
						<input class="form-input" id="item-price" name="price" type="text" value="{{ price }}" data-item-price />
					</span>
					<span class="form-column">
						<label class="form-label" for="item-description">description</label>
						<textarea class="form-textarea" id="item-description" name="description" data-item-description>{{ description }}</textarea>
					</span>
					<span class="form-column">
						<label class="form-label" for="item-note">note</label>
						<textarea class="form-textarea" id="item-note" name="note" data-item-note>{{ note }}</textarea>
					</span>`;
				}
				$form += `<span class="form-row">
					<button id="akd-form-submit-button" class="ws-nowrap" type="submit" data-akd-action="${action}" data-akd-submit-button>edit item</button>
					<button id="akd-form-back-button" class="ws-nowrap" type="button" data-target="${action}" data-akd-button>go back &larr;</button>
				</span>
			</form>`;
			
			if(isObject(found)){
				$html = parseTemplate({
					"{{ id }}": found.id, 
					"{{ date }}": found.date,
					"{{ name }}": found.name, 
					"{{ alias }}": found.alias, 
					"{{ supplier }}": found.supplier, 
					"{{ screenshot }}": found.screenshot, 
					"{{ address }}": found.address, 
					"{{ time }}": found.time,
					"{{ type }}": found.type, 
					"{{ size }}": found.size, 
					"{{ quantity }}": found.quantity, 
					"{{ total }}": found.total, 
					"{{ price }}": found.price, 
					"{{ description }}": found.description, 
					"{{ note }}": found.note, 
					"{{ by }}": found.by, 
				}, $form);
			} else {
				$html = parseTemplate({"{{ id }}": "","{{ name }}": "", "{{ alias }}": "", "{{ supplier }}": "", "{{ screenshot }}": "", "{{ time }}": "", "{{ date }}": "", "{{ address }}": "", "{{ type }}": "", "{{ size }}": "", "{{ quantity }}": "", "{{ total }}": "", "{{ price }}": "", "{{ description }}": "", "{{ note }}": "", "{{ completed }}": "", "{{ by }}": "" }, $form);
			}
			
			console.log(found);
			loader("#content-display", $html)
				/*.then(()=>{
					Array.from(new FormData(document.getElementById("akd-form")), function (field) {
						console.log(field)
						// return field.map(encodeURIComponent).join('=');
					})//.join('&');
				});*/
		}, 
		notes(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {};
			
			let $html = `<article id="notes-window" class="akd-window flex flex-col w-12 h-12 overflow-auto" data-random-bgimage>
				<button class="add" id="add"><i class="fas fa-plus"></i> Add note</button>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					const addBtn = document.getElementById("add");
					const notes = JSON.parse(localStorage.getItem("notes"));
					
					//initializeRandoms("bgimage");
					if(notes) {
						notes.forEach((note) => {
							addNewNote(note);
						});
					}
					
					addBtn.addEventListener("click", () => {addNewNote();});
					
					function addNewNote(text = "") {			
						const note = document.createElement("div");
						note.classList.add("note");
						
						note.innerHTML = `<div class="notes">
							<div class="tools">
								<button class="edit"><i class="fas fa-edit"></i></button>
								<button class="delete"><i class="fas fa-trash-alt"></i></button>
							</div>
							<div class="main ${text ? "" : "hidden"}"></div>
							<textarea class="${text ? "hidden" : ""}"></textarea>
						</div>`;
						
						const editBtn = note.querySelector(".edit");
						const deleteBtn = note.querySelector(".delete");
						
						const main = note.querySelector(".main");
						const textArea = note.querySelector("textarea");
						
						textArea.value = text;
						main.innerHTML = marked(text);
						
						editBtn.addEventListener("click", () => {
							main.classList.toggle("hidden");
							textArea.classList.toggle("hidden");
						});
						
						deleteBtn.addEventListener("click", () => {
							note.remove();
							updateLS();
						});
						
						textArea.addEventListener("input", (e) => {
							const { value } = e.target;
							main.innerHTML = marked(value);
							
							updateLS();
						});
						
						document.querySelector("#notes-window").appendChild(note);
					}
					
					function updateLS() {
						const notesText = document.querySelectorAll("textarea");
						const notes = [];
						
						notesText.forEach((note) => {
							notes.push(note.value);
						});
						
						localStorage.setItem("notes", JSON.stringify(notes));
					}
				});
		}, 
		todos(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			let task = [], localstoragedata = localStorage.getItem("akd-tasks"), $html = load(), 
			tasksContainer, taskList, btn, inputs;
			loader("#content-display", $html)
				.then(()=>{
					tasksContainer = document.querySelector("#task-list-container"), inputs = tasksContainer.querySelector('input'), 
					btn = tasksContainer.querySelector("button.add"), taskList = document.getElementById('task-list');
				
					if(localstoragedata != null) {
						let ogdata = JSON.parse(localstoragedata);
						task = ogdata;
						maketodo();
					}
					
					btn.addEventListener("click", function () {
						let query = inputs.value;
						inputs.value = "";
						if (query.trim() === "") {
							alert("no value entered");
							throw new Error("empty input field error");
						}
						let taskObj = {
							id: Date.now(),
							text: query, 
							completed: false
						}
						task.push(taskObj);
						localStorage.setItem("akd-tasks", JSON.stringify(task));
						maketodo();
					});
				});
			
			
			function maketodo() {
				//taskList.innerHTML = "";
				empty(taskList)
				for (let i = 0; i < task.length; i++) {
					let { id, text, completed } = task[i];
					let element = document.createElement('div');
					//element.innerHTML = 
					element.insertAdjacentHTML('beforeend', `<span class="task" contenteditable="false">${text}</span>
						<span style="display: flex;qlign-items: center;gap: 0.5rem;">
							<button class='edit'>Edit</button>
							<button class="delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg></button>
						</span>
					`);
					
					let delbtn = element.querySelector('.delete');
					let editbtn = element.querySelector('.edit');
					let taskText = element.querySelector('.task');
					
					delbtn.addEventListener("click", function () {
						let filteredarray = task.filter(function (taskobj) {
							return taskobj.id != id;
						});
						
						task = filteredarray;
						localStorage.setItem("akd-tasks", JSON.stringify(task));
						taskList.removeChild(element);
					});
					
					editbtn.addEventListener("click", function () {
						if(editbtn.innerText === 'Edit') {
							taskText.setAttribute('contenteditable', 'true'); // Enable editing
							taskText.focus(); // Focus on the text to start editing
							editbtn.innerText = 'Save'; // Change button text to 'Save'
						} else {
							taskText.setAttribute('contenteditable', 'false'); // Disable editing
							let updatedText = taskText.innerText.trim();
							if(updatedText !== "") {
								task = task.map(function (taskobj) {
									if (taskobj.id === id) {
										taskobj.text = updatedText;
										taskobj.completed = (element.classList.contains('checked') || element.classList.contains('completed')) ? true : false;
									}
									return taskobj;
								});
								localStorage.setItem("akd-tasks", JSON.stringify(task));
							}
							editbtn.innerText = 'Edit'; // Change button text back to 'Edit'
						}
					});
					
					element.classList.add('todo');
					taskList.appendChild(element);
					
					if(completed) element.classList.add('checked');
					// Add a "checked" symbol when clicking on a list item
					element.addEventListener('dblclick', function(ev) {
						if(!ev.target.classList.contains("delete") || !ev.target.classList.contains("edit")) {
							element.classList.toggle("checked");
							editbtn.classList.toggle("hidden");
							task[i].completed = element.classList.contains("checked") ? true : false;
							localStorage.setItem("akd-tasks", JSON.stringify(task));
						}
					});
				}
			}
			
			function load(){
				return `<div id="task-list-container" style="width: calc(100% - 1.5rem);height: calc(100% - 1.5rem);margin: auto;">
						<span class="flex-wrapper">
							<input type="text" placeholder="Add a new task..." />
							<button class="add">Add</button>
						</span>
						<div id="task-list"></div>
					</div>
				</div>`;
			}
		}, 
		coder(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {};
			let codemirror_themes = [
				"default",
				"3024-day", "3024-night", "abbott", "abcdef", "ambiance-mobile", "ambiance", "ayu-dark", "ayu-mirage", 
				"base16-dark", "base16-light", "bespin", "blackboard", 
				"cobalt", "colorforth", "darcula", "dracula", 
				"duotone-dark", "duotone-light", "eclipse", "elegant", "erlang-dark", "grubox-dark", "hopscotch", "icecoder", "idea", "isotope", "juejin", "lesser-dark", "liquibyte", "lucario", 
				"material-darker", "material-ocean", "material-palenight", "material", "mbo", "mdn-like", "midnight", "monokai", "moxer", 
				"neat", "neo", "night", "nord", "ocean-next", 
				"panda-syntax", "paraiso-dark", "paraiso-light", "pastel-on-dark", "railscasts", "rubyblue", 
				"seti", "shadowfox", "solarized", "ssms", "the-matrix", "tomorrow-night-bright", "tomorrow-night-eighties", "ttcn", "twilight", "vibrant-ink", 
				"xq-light", "xq-dark", "yeti", "yonce", "zenburn"
			];
			let $html = `<article id="coder-window" class="akd-window flex flex-col w-12 h-12 overflow-auto" data-random-bgimage>
				<h1>Code Sandbox</h1>
				<div id="coder-ui" class="d-flex w-12 h-12 overflow-hidden">
					<div id="coder-editors" class="d-flex gap-4 bd-opaque-dark p-4 h-6">
						<section id="coder-html-editor" class="coder-editor grid-view w-12 pos-rel" data-editor="htmlEditor">
							<div class="pos-rel d-block align-center p-0 bg-danger shadow text-900">
								<span class="pos-rel d-flex align-center w-12 h-12 py-2 px-4 bg-danger" style="z-index: 3;top: 0;">
									<label for="coder-html-textarea" class="d-flex align-center p-2 bg-danger shadow text-900">HTML</label>
									<span class="d-flex align-center gap-4 ml-auto">
										<button class="coder-clear-button p-5 bdr-8 text-danger" type="button"><i class="fa fa-trash"></i></button>
										<button class="coder-menu-toggler p-5 bdr-8 text-danger" type="button"><i class="fa fa-chevron-down"></i></button>
									</span>
								</span>
								<span class="coder-utility-menu py-2 px-4 bg-danger align-center flex-wrap" style="z-index: 0;top: 100%;left: 0">
									<label for="coder-html-theme-select" class="d-flex flex-wrap">
										<span>theme</span>
										<select id="coder-html-theme-select" class="coder-theme-select" data-editor="htmlEditor"></select>
									</label>
									<label for="coder-html-file-input" class="d-flex flex-wrap btn">
										<span><i class="fa fa-upload"></i></span>
										<input id="coder-html-file-input" class="coder-file-input visually-hidden" type="file" accept="text/html" data-editor="htmlEditor" />
									</label>
								</span>
							</div>
							<div class="editor w-12 h-12 overflow-auto">
								<!--<pre class="lang-html"><code></code></pre>-->
								<textarea id="coder-html-textarea" spellcheck="false" autocorrect="off" autocapitalize="off" translate="no"></textarea>
							</div>
						</section>
						<section id="coder-css-editor" class="coder-editor grid-view w-12" data-editor="cssEditor">
							<div class="pos-rel d-block align-center p-0 bg-purple shadow text-900">
								<span class="pos-rel d-flex align-center w-12 h-12 py-2 px-4 bg-purple" style="z-index: 3;top: 0;">
									<label for="coder-css-textarea" class="d-flex align-center p-2 bg-purple shadow text-900">CSS</label>
									<span class="d-flex align-center gap-4 ml-auto">
										<button class="coder-clear-button p-5 bdr-8 text-purple" type="button"><i class="fa fa-trash"></i></button>
										<button class="coder-menu-toggler p-5 bdr-8 text-purple" type="button"><i class="fa fa-chevron-down"></i></button>
									</span>
								</span>
								<span class="coder-utility-menu align-center flex-wrap px-2 py-4 bg-purple" style="z-index: 0;top: 100%;left: 0">
									<label for="coder-html-theme-select" class="d-flex flex-wrap">
										<span>theme</span>
										<select id="coder-css-theme-select" class="coder-theme-select" data-editor="cssEditor"></select>
									</label>
									<label for="coder-css-file-input" class="d-flex flex-wrap btn">
										<span><i class="fa fa-upload"></i></span>
										<input id="coder-css-file-input" class="coder-file-input visually-hidden" type="file" accept="text/css" data-editor="cssEditor" />
									</label>
								</span>
							</div>
							<div class="editor w-12 h-12 overflow-auto">
								<!--<pre class="lang-css"><code></code></pre>-->
								<textarea id="coder-css-textarea" spellcheck="false" autocorrect="off" autocapitalize="off" translate="no"></textarea>
							</div>
						</section>
						<section id="coder-js-editor" class="coder-editor grid-view w-12" data-editor="jsEditor">
							<div class="pos-rel d-block align-center p-0 bg-warning shadow text-900">
								<span class="pos-rel d-flex align-center w-12 h-12 py-2 px-4 bg-warning" style="z-index: 3;top: 0;">
									<label for="coder-js-textarea" class="d-flex align-center p-2 bg-warning shadow text-900">JavaScript</label>
									<span class="d-flex align-center gap-4 ml-auto">
										<button class="coder-clear-button p-5 bdr-8 text-warning" type="button"><i class="fa fa-trash"></i></button>
										<button class="coder-menu-toggler p-5 bdr-8 text-warning" type="button"><i class="fa fa-chevron-down"></i></button>
									</span>
								</span>
								<span class="coder-utility-menu align-center flex-wrap py-2 px-4 bg-warning" style="z-index: 0;top: 100%;left: 0">
									<label for="coder-js-theme-select" class="d-flex flex-wrap">
										<span>theme</span>
										<select id="coder-js-theme-select" class="coder-theme-select" data-editor="jsEditor"></select>
									</label>
									<label for="coder-js-file-input" class="d-flex flex-wrap btn">
										<span><i class="fa fa-upload"></i></span>
										<input id="coder-js-file-input" class="coder-file-input visually-hidden" type="file" accept="application/*" data-editor="jsEditor" />
									</label>
								</span>
							</div>
							<div class="editor w-12 h-12 overflow-auto">
								<!--<pre class="lang-js"><code></code></pre>-->
								<textarea id="coder-js-textarea" spellcheck="false" autocorrect="off" autocapitalize="off" translate="no"></textarea>
							</div>
						</section>
					</div>
					
					<section id="coder-result-display" class="grid-view w-12 h-6 p-4">
						<span class="d-flex align-center w-12 p-2 bg-success shadow text-900 text-white overflow-auto">
							<span class="ml-4">Result</span>
							
							<span class="d-flex gap-2 align-center p-2 ml-auto">
								<label for="coder-live-edit-input" class="d-flex gap-2 align-center p-2 py-4 bg-opaque text-white">
									<span>live edit?</span>
									<input id="coder-live-edit-input" type="checkbox" />
								</label>
								<button id="coder-run-code-button" class="" type="button" title="run code"><i class="fas fa-cogs mr-2"></i><i class="fas fa-running"></i></button>
								<button id="coder-ui-orientation-toggler" class="" type="button" title="change layout orientation"><i class="fas fa-sync"></i></button>
							</span>
						</span>
						<iframe id="coder-result" class="w-12 h-12 overflow-auto shadow no-border bdr-2"></iframe>
					</section>
				
					<div class="floating-box d-flex align-center p-4 mx-auto mt-auto bg-opaque-dark shadow text-900 text-white bdr-8" style="position: fixed;top: auto;bottom: 2rem;left: 25%;right: 25%;width: 50%;height: 3rem;">
						<span class="w-12 mx-auto">
							<input id="coder-size-adjuster" class="d-block w-12" type="range" min="5" max="100" step="1" value="50" />
						</span>
					</div>
				</div>
			</article>`;
			$html += `
			<link id="coder-html-theme-stylesheet" rel="stylesheet" href="../theme/zenburn.css" media="screen" />
			<link id="coder-css-theme-stylesheet" rel="stylesheet" href="../theme/zenburn.css" media="screen" />
			<link id="coder-js-theme-stylesheet" rel="stylesheet" href="../theme/zenburn.css" media="screen" />
			`;
			loader("#content-display", $html)
				.then(()=>{
					// Get elements
					let $ui = document.querySelector("#coder-ui");
					let $ui_toggler = document.querySelector("#coder-ui-orientation-toggler");
					let $editors = document.querySelector("#coder-editors");
					let $display = document.querySelector("#coder-result-display");
					let html = document.querySelector("#coder-html-textarea");
					let css = document.querySelector("#coder-css-textarea");
					let js = document.querySelector("#coder-js-textarea");
					let result = document.querySelector("#coder-result");
					// let $run_codeButton = document.querySelector("#coder-run-code-button");
					let $live_edit_option = document.querySelector("#coder-live-edit-input");
					let $size_adjuster = document.querySelector("#coder-size-adjuster");
					
					const htmlEditor = CodeMirror.fromTextArea(html, {
						mode: "htmlmixed", 
						// mode: "text/html", 
						// mode: "application/json", 
						lineNumbers: true, 
						selectionPointer: true, 
						matchBrackets: true, 
						continueComments: "Enter", 
						extraKeys: {"Ctrl-Space": "autocomplete"}, 
						value: document.documentElement.innerHTML
						// value: JSON.stringify({}, null, 2)
					});
					
					const cssEditor = CodeMirror.fromTextArea(css, {
						mode: "text/css", 
						lineNumbers: true, 
						selectionPointer: true, 
						matchBrackets: true, 
						continueComments: "Enter", 
						extraKeys: {"Ctrl-Space": "autocomplete"}, 
						value: 'body{\n\tbackground: red;\n}\n'
					});
					
					const jsEditor = CodeMirror.fromTextArea(js, {
						mode: "javascript", 
						lineNumbers: true, 
						selectionPointer: true, 
						matchBrackets: true, 
						continueComments: "Enter", 
						extraKeys: {"Ctrl-Space": "autocomplete"}, 
						value: 'let x = 5;\nlet y = 4;\nlet sum = x + y;\nconsole.log(sum);\n'
					});
					// editor.setOption("mode", spec);
					// CodeMirror.autoLoadMode(editor, mode);
					//initializeRandoms("bgimage");
					Array.from($ui.querySelectorAll(".coder-theme-select")).forEach(sel=>{
						let out = "";
						for(let i = 0;i < codemirror_themes.length;i++){
							out += `<option value="${codemirror_themes[i]}">${codemirror_themes[i]}</option>`;
						}
						insertHtml(sel, out);
					});
					
					/* $ui_toggler.addEventListener("click", e=> {
						$ui.classList.toggle("--active");
						//$ui.style.flexDirection = $ui.classList.contains("--active") ? "row" : "column";
						//$ui.firstElementChild.style.flexDirection = $ui.classList.contains("--active") ? "column" : "row";
					});*/
					$ui.addEventListener("click", e=> {
						let target = e.target, sel_id = target.id, $parent = target.closest('.coder-editor'), 
						editor = $parent && $parent.dataset.editor || target.dataset.editor;
						
						if(target.id === "coder-run-code-button") {
							updateIframe2();
						}
						if(target.id === "coder-ui-orientation-toggler") {
							$ui.classList.toggle("--active");
							let val = $size_adjuster.value, 
							percentage = val, 
							mainPercentage = (100 - percentage);
							console.log(percentage, mainPercentage)
							if(percentage > 15 && percentage < 85) {
								if($ui.classList.contains("--active")){
									Object.assign($editors.style, {width: `${percentage}%`, height: `100%`});
									Object.assign($display.style, {width: `${mainPercentage}%`, height: `100%`});
								} else {
									Object.assign($editors.style, {width: `100%`, height: `${percentage}%`});
									Object.assign($display.style, {width: `100%`, height: `${mainPercentage}%`});
								}
							}
						}
						if(target.matches(".coder-menu-toggler")){
							let $parent = target.closest('.coder-editor');
							if(isElement($parent)){
								let menu = $parent.querySelector(".coder-utility-menu");
								menu.classList.toggle("--toggled");
								menu.style.zIndex = menu.classList.contains("--toggled") ? "2" : "0";
								menu.classList.contains("--toggled") ? target.querySelector("i.fa").classList.replace("fa-chevron-down", "fa-chevron-up") : target.querySelector("i.fa").classList.replace("fa-chevron-up", "fa-chevron-down");
							}
						}
						if(target.matches(".coder-clear-button")){
							const do_clear = prompt("Clear this editor:", editor);
							editor = editor.includes("js") ? jsEditor : (editor.includes("css") ? cssEditor : htmlEditor);
							//if(isFunction(editor) || isObject(editor)) editor.setValue("");
							if(do_clear && (isFunction(editor) || isObject(editor))) {
								editor.setValue("");
							} else /*if (do_clear) */{
								alert("clear cancelled");
							}
						}
					});
					$ui.addEventListener("change", e=> {
						let target = e.target, sel_id = target.id, $parent = target.closest('.coder-editor'), 
						editor = $parent && $parent.dataset.editor || target.dataset.editor;
						
						if(target.matches(".coder-file-input ")){
							let file = target.files[0], fr = new FileReader();
							editor = editor.includes("js") ? jsEditor : (editor.includes("css") ? cssEditor : htmlEditor);
							fr.onload = e => {
								let res = e.target.result;
								editor.setValue(res);
							}
							
							fr.readAsText(file);
						} else if(isString(editor) && editor.length > 0){
							editor = editor.includes("js") ? jsEditor : (editor.includes("css") ? cssEditor : htmlEditor);
							// console.log(sel_id, editor, window[editor], this[editor])
							selectTheme(editor, sel_id);
						}
					});
					$ui.addEventListener("input", e=> {
						let target = e.target;
						if(target.id === "coder-size-adjuster"){
							let val = target.value, 
							//percentage = (2 / val) * 100, 
							percentage = val, 
							mainPercentage = (100 - percentage);
							console.log(percentage, mainPercentage)
							if(percentage > 15 && percentage < 85) {
								if($ui.classList.contains("--active")){
									Object.assign($editors.style, {width: `${percentage}%`, height: `100%`});
									Object.assign($display.style, {width: `${mainPercentage}%`, height: `100%`});
								} else {
									Object.assign($editors.style, {width: `100%`, height: `${percentage}%`});
									Object.assign($display.style, {width: `100%`, height: `${mainPercentage}%`});
								}
							}
						} else if(isElement($live_edit_option) && $live_edit_option.checked === true){
							inputHandler(e)
						}
					});
					// Listen for input events
					//document.getElementById("coder-window").addEventListener('input', inputHandler);
					//document.addEventListener('input', inputHandler);
					// CodeMirror.on(html, "input", inputHandler);
					
					function selectTheme(editor, select_id) {
						var input = document.getElementById(select_id);
						var theme = input.options[input.selectedIndex].textContent;
						editor.setOption("theme", theme);
						// location.hash = "#" + theme;
						var stylesheet = document.getElementById(select_id.replace("select", "stylesheet"));
						if(isElement(stylesheet)){
							stylesheet.setAttribute("href", `./third_party/codemirror-5.65.18/theme/${theme}.css`);
							console.log("theme changed to", theme)
						}
					}
					// Store debounce timer
					let debounce;
		
					/**
					 * Update the iframe
					 */
					function updateIframe () {
						// Create new iframe
						let clone = result.cloneNode();
						result.replaceWith(clone);
						result = clone;
		
						// Render
						result.contentWindow.document.open();
						result.contentWindow.document.writeln(`${html.value}<style>${css.value}</style><script type="module">${js.value}<\/script>`);
						result.contentWindow.document.close();
					}
					function updateIframe2() {
						// Create new iframe
						let clone = result.cloneNode();
						result.replaceWith(clone);
						result = clone;
					
						// Render
						let page = [`<!doctype html>
						<html>
							<head>
								<meta charset="utf-8" \/>
								<style>${cssEditor? cssEditor.getValue() : css.value}<\/style>
							<\/head>
							<body>
								${htmlEditor? htmlEditor.getValue() : html.value}
								<script type="module">${jsEditor? jsEditor.getValue() : js.value}<\/script>
							<\/body>
						<\/html>`];
						
						const blob = new Blob(page,{type:"text/html"});
						let burl = URL.createObjectURL(blob);
						result.setAttribute("src", burl);
						setTimeout(URL.revokeObjectURL,100,burl);
					}
					/**
					 * Handle input events on our fields
					 * @param  {Event}  event The event object
					 */
					function inputHandler(event) {
						// Only run on our three fields
						// if(event.target !== html && event.target !== css && event.target !== js) return;
						// console.log(event, event.target);
						
						// Debounce the rendering for performance reasons
						clearTimeout(debounce);
		
						// Set update to happen when typing stops
						debounce = setTimeout(updateIframe2, 500);
					}
					
					function inputHandler2(event) {
						// Only run on our three fields
						if(event.target !== html && event.target !== css && event.target !== js) return;
		
						// Clone text into pre immediately
						let code = event.target.previousElementSibling.firstChild;
						if (!code) return;
						code.textContent = event.target.value;
		
						// Highlight the syntax
						Prism.highlightElement(code);
		
						// Debounce the rendering for performance reasons
						clearTimeout(debounce);
		
						// Set update to happen when typing stops
						debounce = setTimeout(updateIframe2, 500);
		
					}
					
				});
		}, 
		fileops(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, gih = "120px", // grid-item-height
			$form = "", found = {}, ext = "", 
			textFiles = ["css", "js", "jsx", "html", "md", "json", "pho", "py", "ignore", "ts", "tsx", "txt", "yml", "toml"], 
			imageFiles = ["gif", "jpg", "jpeg", "png", "webp"], 
			audioFiles = ["aac", "ogg", "mp3"], 
			videoFiles = ["avi", "ogv", "mp4", "mkv"];
			ext = textFiles[0];
			let $html = `<article id="fileops-window" class="akd-window flex flex-col w-12 h-12 overflow-hidden" data-random-bgimage>
				<div class="grid-view h-12">
					<header class="d-flex flex-center gap-4 w-12 shadow-2">
						<span class="d-flex flex-center w-auto h-auto p-0">
							<button id="fileops-prev-btn" class="fileops-prev-next-btn d-flex btn btn-success text-bold px-6" style="border-radius: 2rem;padding: 0.5rem 0.875rem;"><i class="fa fa-chevron-left"></i><span class="ml-2 text-center text-md text-truncate">previous</span></button>
						</span>
						<div class="d-flex flex-wrap flex-center w-12">
							<!--<ins id="section-name" class="d-block w-12 px-8 text-truncate text-black text-center text-lg text-bold"></ins>-->
							<span id="section-name" class="d-flex flex-center bdr-8 px-8 py-2 mx-auto bg-opaque-dark text-white text-bold text-truncate  truncate-md "></span>
						</div>
						<span class="d-flex flex-center w-auto h-auto p-0">
							<button id="fileops-next-btn" class="fileops-prev-next-btn d-flex btn btn-success text-bold py-6" style="border-radius: 2rem;padding: 0.5rem 0.875rem;"><span class="mr-2 text-center text-md">next</span><i class="fa fa-chevron-right"></i></button>
						</span>
					</header>
					
					<div class="snap-container x bg-opaque pos-rel" style="height: calc(100% - 1rem);">
						<section id="fileops-grid" class="snap-section pos-rel grid-view" data-section-title="File Operations Grid">
							<span class="d-flex flex-center w-6 h-12 p-2 my-auto">
								<input id="fileops-input" class="" type="file" multiple data-akd-input />
							</span>
							<div id="fileops-display" class="" style="display: grid;grid-template-columns: repeat(3, 1fr);grid-template-rows: repeat(auto-fill, ${gih});gap: 1rem;width: 100%;height: 100%;padding: 1rem;overflow: auto;"></div>
						</section>
						
						<section id="file-reader" class="snap-section pos-rel grid-view --three-columns --auto h-12 gap-8 p-0" data-section-title="File Reader/Viewer">
							<div class="pos-rel d-block p-0 w-12 overflow-visible">
								<div class="pos-rel d-flex flex-center flex-wrap gap-8 py-4 px-8 w-12 overflow-hidden" style="z-index: 9;background-color: var(--color, #fff);">
									<span class="pill-buttons d-flex flex-center flex-wrap gap-1 w-auto mr-auto">
										<button class="file-reader-edit-btn btn btn-violet mr-auto px-4"><i class="fa fa-edit"></i></button>
										<button class="file-reader-info-btn btn btn-violet mr-auto px-8 py-8" onclick="let target = document.querySelector('#file-reader .info'), i = this.querySelector('i.fa');this.classList.toggle('is-active');target.classList.toggle('--active');if(target.classList.contains('--active')){target.classList.remove('slide-up');target.classList.add('slide-down');i.classList.remove('fa-chevron-down');i.classList.add('fa-chevron-up');} else {target.classList.remove('slide-down');target.classList.add('slide-up');i.classList.remove('fa-chevron-up');i.classList.add('fa-chevron-down');}"><i class="fa fa-chevron-down"></i></button>
									</span>
									<span class="pill-buttons d-flex flex-center gap-1 w-auto my-auto">
										<button class="file-reader-minifier-btn btn btn-warning text-bold px-3"><i class="fa fa-compress"></i><span class="ml-2 text-center text-md">minify</span></button>
										<button class="file-reader-beautifier-btn btn btn-warning text-bold px-3"><i class="fa fa-magic"></i><span class="ml-2 text-center text-md">beatify</span></button>
									</span>
									<span class="pill-buttons d-flex flex-center flex-wrap gap-1 w-auto ml-auto">
										<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 p-4" for="fileops-reader-checkbox">
											<span>wrap?</span>
											<input id="file-reader-checkbox" type="checkbox" onchange="let target = document.querySelector('#file-reader .file-reader-textarea');if(this.checked === true) {target.style.whiteSpace = 'wrap';} else {target.style.whiteSpace = 'pre';}" />
										</label>
										<select id="file-reader-filetype-select" class="py-3">
											${textFiles.map(opt => `<option value="${opt.toLowerCase()}">${opt}</option>`).join("")}
										</select>
										<input id="file-reader-filetype-input" class="pt-3 pb-4" type="text" placeholder="enter file type" style="width: 6rem;" />
									</span>
								</div>
								<div class="info d-flex flex-col slide-up bg-opaque-darker w-12 pl-4 text-white" style="z-index: 8;position: absolute;top: auto;bottom: 0;min-height: 100px;height: max-content;">
									<span class="d-block w-12">name: <span data-name>???</span>
									<span class="d-block w-12">extension: <span data-ext>???</span></span>
									<span class="d-block w-12">mime-type: <span data-mime>???</span></span>
									<span class="d-block w-12">size: <span data-size>???</span></span>
									<span class="d-block w-12">lines: <span data-lines>???</span></span>
									<span class="d-block w-12">chars: <span data-chars>???</span></span>
								</div>
							</div>
							<div class="pos-rel d-flex flex-center w-12 h-12 overflow-hidden">
								<textarea class="file-reader-textarea pos-abs d-block w-12 h-12 p-4 overflow-auto z-2" style="width: calc(100% - 2rem);height: calc(100% - 0rem);margin: auto;white-space: pre;background: #fff;" placeholder="no text content loaded:\ntype or paste text content in this area\nor upload a local file\nor load a file from a URL" onfocus="this.select();"></textarea>
								<pre class="file-reader-pre pos-abs d-block w-12 h-12 p-4 overflow-auto z-1 language-${ext}" style="width: calc(100% - 2rem);height: calc(100% - 0rem);margin: auto;white-space: pre;background: #fff;" readonly onfocus="this.select();"></code></pre>
								<span id="viewer-scroll-to-top" class="d-flex flex-center p-8 w-auto ml-auto bdr-8 bg-opaque-dark text-white to-front" style="position: absolute;top: auto;bottom: 0.75rem;right: 1.75rem;border-radius: 50%;" onclick="let targets = document.querySelectorAll('#file-reader .file-reader-textarea, #file-reader .file-reader-pre'), scrollOptions = {left: 0, top: 0, behavior:  'smooth'};Array.from(targets).forEach(target=>target.scrollTo(scrollOptions))">
									<i class="fa fa-chevron-up"></i>
								</span>
							</div>
							<div class="d-flex flex-center gap-8 px-8 py-4 w-12 bg-opaque-dark text-white" style="z-index: 9;background-color: var(--color, #fff);">
								<label for="file-reader-file-input" class="pill-buttons d-flex flex-center btn btn-violet w-4 px-6 bdr-8" style="border-radius: 2rem;">
									<i class="fa fa-upload"></i>
									<input class="visually-hidden" id="file-reader-file-input" type="file" accept="text/*" />
								</label>
								<span class="pill-buttons w-12 h-max bg-opaque">
									<input id="file-reader-url-input" class="w-12  bdr-8" type="url" value="" placeholder="enter a file URL eg: 'https://example.com/index.html' " onfocus="this.select();" data-akd-input />
									<button id="file-reader-url-submit" class="btn btn-info px-8 bdr-4" data-akd-button><i class="fa fa-search"></i></button>
								</span>
							</div>
						</section>
						
						<section id="file-converter-display" class="snap-section pos-rel" data-section-title="Text File Converters">
							<div class="grid-view w-12 h-12 p-0">
								<span class="d-flex flex-center gap-4 p-4 bg-opaque-dark">
									<span class="section-title">Text Converters</span>
									<span class="d-flex flex-center gap-4">
										<span id="file-converter-pass-to"">pass-to</span>
										<select id="pass-to-select" class="">
											<option value="json-pack">JSON Packer</option>
											<option value="json-minify">JSON Minifier</option>
										</select>
									</span>
								</span>
								<div class="w-12 h-12 p-4 overflow-hidden" style="display: grid;grid-template-columns: 100%;grid-template-rows: calc(50% - 3rem) 4rem calc(50% - 2.5rem);gap: 0.5rem;">
									<div class="grid-view">
										<span class="d-flex flex-center gap-4">
											<span class="pill-buttons d-flex flex-center gap-1 w-auto my-auto">
												<label for="file-converter-file-input" class="d-flex flex-center button btn btn-violet px-4 text-bold text-center text-md">
													<i class="fa fa-upload"></i>
													<input class="visually-hidden" id="file-converter-file-input" type="file" accept="text/*, application/*" />
												</label>
												<button class="file-converter-op-button file-converter-input-minifier-btn btn btn-violet px-3 text-bold text-md" data-target="#file-converter-input"><i class="fa fa-compress"></i><span class="ml-2 text-center">minify</span></button>
												<button class="file-converter-op-button file-converter-input-beautifier-btn btn btn-violet px-3 text-bold text-md" data-target="#file-converter-input"><i class="fa fa-magic"></i><span class="ml-2 text-center">beatify</span></button>
											</span>
											<span class="pill-buttons d-flex flex-center gap-1 w-auto my-auto">
												<button class="file-converter-op-button file-converter-input-copy-btn d-flex flex-center btn btn-warning text-bold text-md px-3" data-target="#file-converter-input"><i class="fa fa-copy"></i><span class="ml-2 text-center">copy</span></button>
												<button class="file-converter-op-button file-converter-input-clear-btn d-flex flex-center btn btn-warning text-bold text-md px-3" data-target="#file-converter-input"><i class="fa fa-times"></i><span class="ml-2 text-center">clear</span></button>
											</span>
										</span>
										<div class="pos-rel d-flex flex-center w-12 h-12 overflow-hidden">
											<textarea id="file-converter-input" class="d-block w-12 h-12 p-4 overflow-auto" wrap="off" placeholder="Enter JSON content" onfocus="this.select();" data-input-type="json"></textarea>
											<span id="file-converter-input-scroll-to-top" class="d-flex flex-center p-8 w-auto ml-auto bdr-8 bg-opaque-dark text-white to-front" style="position: absolute;top: auto;bottom: 0.75rem;right: 1.75rem;border-radius: 50%;" onclick="let target = document.querySelector('#file-converter-input'), scrollOptions = {left: 0, top: 0, behavior:  'smooth'};target.scrollTo(scrollOptions);">
												<i class="fa fa-chevron-up"></i>
											</span>
										</div>
									</div>
									
									<span class="d-flex flex-center gap-4 h-auto bg-opaque">
										<select id="file-converter-select" class="">
											<option value="json-to-yaml" selected>JSON-TO-YAML</option>
											<option value="json-to-xml">JSON-TO-XML</option>
											<option value="json-to-text">JSON-TO-TEXT</option>
											<option value="json-to-base64">JSON-TO-BASE64</option>
											<option value="json-to-csv">JSON-TO-CSV</option>
											<option value="csv-to-json">CSV-TO-JSON</option>
											<option value="yaml-to-json">YAML-TO-JSON</option>
											<option value="yaml-to-csv">YAML-TO-CSV</option>
											<option value="yaml-to-xml">YAML-TO-XML</option>
											<!-- Todo: need to find converters for the options below -->
											<option value="xml-to-json">XML-TO-JSON</option>
											<option value="xml-to-yaml">XML-TO-YAML</option>
										</select>
										<button id="file-converter-btn"">convert</button>
									</span>
									
									<div class="grid-view">
										<span class="d-flex flex-center gap-4">
											<span class="pill-buttons d-flex flex-center gap-1 w-auto my-auto">
												<button class="file-converter-op-button file-converter-output-minifier-btn btn btn-violet text-bold px-3" data-target="#file-converter-output"><i class="fa fa-compress"></i><span class="ml-2 text-center text-md">minify</span></button>
												<button class="file-converter-op-button file-converter-output-beautifier-btn btn btn-violet text-bold px-3" data-target="#file-converter-output"><i class="fa fa-magic"></i><span class="ml-2 text-center text-md">beatify</span></button>
											</span>
											<span class="pill-buttons d-flex flex-center gap-1 w-auto my-auto">
												<button class="file-converter-op-button file-converter-output-copy-btn d-flex flex-center btn btn-warning text-bold text-md px-3" data-target="#file-converter-output"><i class="fa fa-copy"></i><span class="ml-2 text-center">copy</span></button>
												<button class="file-converter-op-button file-converter-output-clear-btn d-flex flex-center btn btn-warning text-bold text-md px-3" data-target="#file-converter-output"><i class="fa fa-times"></i><span class="ml-2 text-center">clear</span></button>
											</span>
										</span>
										<div class="pos-rel d-flex flex-center w-12 h-12 overflow-hidden">
											<textarea id="file-converter-output" class="d-block w-12 h-12 p-4 overflow-auto" wrap="off" placeholder="Converted YAML content will be displayed here." onfocus="this.select();" data-output-type="yaml"></textarea>
											<span id="file-converter-output-scroll-to-top" class="d-flex flex-center p-8 w-auto ml-auto bdr-8 bg-opaque-dark text-white to-front" style="position: absolute;top: auto;bottom: 0.75rem;right: 1.75rem;border-radius: 50%;" onclick="let target = document.querySelector('#file-converter-output'), scrollOptions = {left: 0, top: 0, behavior:  'smooth'};target.scrollTo(scrollOptions);">
												<i class="fa fa-chevron-up"></i>
											</span>
										</div>
									</div>
								</div>
							</div>
						</section>
						
					</div>
				</div>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					let $parent = document.getElementById("fileops-window"), containers = $parent.querySelectorAll(".snap-section"), 
					currentIndex = 0;
					containers[currentIndex].classList.add("--active");
					
					let // _parent = document.querySelector("#fileops-window .snap-container"), 
					// scrollElements = _parent.querySelectorAll(".snap-section"), 
					//console.log(AKD_Formatter, SVGIconsCreator, SVGIconsCreator.icons());
					thresholdOptions = {root: null, rootMargin: "0px", threshold: [1]}
					const observer = new IntersectionObserver((items) => {
						items.forEach((item) => {
							if(item.isIntersecting) {
								// console.log(item, item.target, item.target.id);
								containers.forEach((el) => {if(el.classList.contains("--active")) el.classList.remove("--active");});
								item.target.classList.add("--active");
								document.getElementById("section-name").textContent = item.target.dataset.sectionTitle || item.target.id;
								//observer.unobserve(item.target);
							}
						});
					}, thresholdOptions);
					
					containers.forEach((img) => {
						observer.observe(img);
					});
					////////////////////////////////////////////////////////////////
					let fileReaderFiletypeInput = document.getElementById("file-reader-filetype-input"), 
					fileReaderFiletypeSelect = document.getElementById("file-reader-filetype-select"), 
					ext = fileReaderFiletypeInput.value.length > 0 ? fileReaderFiletypeInput.value : fileReaderFiletypeSelect.value;
					
					let $reader = document.getElementById("file-reader"), 
					$highlightElem = $reader.querySelector("pre"), $editorElem = $reader.querySelector("textarea")
					//Prism.highlightElement($highlightElem);
					
					//initializeRandoms("bgimage");
					
					// TODO : add class from the input element if a value is present
					$(fileReaderFiletypeSelect).on("change", (e) => {
						let val = e.target.value;
						for(let i = 0;i < textFiles.length;i++){
							if($highlightElem.classList.contains(`language-${textFiles[i]}`)) $highlightElem.classList.remove(`language-${textFiles[i]}`);
						}
						if(fileReaderFiletypeInput.value.length > 0 && $highlightElem.classList.contains(`language-${fileReaderFiletypeInput.value}`)) $highlightElem.classList.remove(`language-${fileReaderFiletypeInput.value}`);
						$highlightElem.classList.add(`language-${val}`);
						// console.log(val, $highlightElem.className);
					});
					
					$(".fileops-prev-next-btn").on("click", (e) => {
						const button = e.target;
						const index = button.id === "fileops-next-btn" ? 1 : -1;
						let scrollOptions = {/*left: 0, top: 0, */behavior:  'smooth'};
						let newIndex = currentIndex + index;
						if(newIndex < 0) newIndex = containers.length - 1;
						if(newIndex >= containers.length) newIndex = 0;
			
						// console.log(newIndex)
						containers[currentIndex].classList.remove("--active");
						containers[newIndex].classList.add("--active");
						containers[newIndex].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
						currentIndex = newIndex;
					});
					$(".file-reader-edit-btn").on("click", (e) => {
						e.target.classList.toggle("is-active");
						$highlightElem.classList.contains("z-2") ? $highlightElem.classList.replace("z-2", "z-1") : $highlightElem.classList.replace("z-1", "z-2");
						$editorElem.classList.contains("z-1") ? $editorElem.classList.replace("z-1", "z-2") : $editorElem.classList.replace("z-2", "z-1");
					});
					$(".file-reader-minifier-btn").on("click", (e) => {
						let params = {}, text = $editorElem.value, content = format(text, ext, "minify", params);
						$editorElem.value = content;
						// empty($highlightElem);
						insertHtml($highlightElem, `<code>${content}</code>`);
						Prism.highlightElement($highlightElem);
						$reader.querySelector("[data-ext]").textContent = ext;
						$reader.querySelector("[data-mime]").textContent = `text/${ext}`;
						$reader.querySelector("[data-chars]").textContent = content.length + ' bytes, saved ' + ((1 - content.length / text.length) * 100 || 0).toFixed(2) + '%';
						$reader.querySelector("[data-size]").textContent = fileFuncs.bytes(JSON.stringify(content).length);
						$reader.querySelector("[data-lines]").textContent = content.split("\n").length;
					});
					$(".file-reader-beautifier-btn").on("click", (e) => {
						let params = {}, text = $editorElem.value;
						if(ext === "js" ) {
							let detect_packers = viewer.querySelector("[data-detect-packers]")?.checked??false;
							if(detect_packers === true) {
								text = unpacker_filter(text);
							}
						}
						let content = format(text, ext, "beautify", params);
						$editorElem.value = content;
						// empty($highlightElem);
						insertHtml($highlightElem, `<code>${content}</code>`);
						Prism.highlightElement($highlightElem);
						$reader.querySelector("[data-ext]").textContent = ext;
						$reader.querySelector("[data-mime]").textContent = `text/${ext}`;
						$reader.querySelector("[data-chars]").textContent = content.length + ' bytes, saved ' + ((1 - content.length / text.length) * 100 || 0).toFixed(2) + '%';
						$reader.querySelector("[data-size]").textContent = fileFuncs.bytes(JSON.stringify(content).length);
						$reader.querySelector("[data-lines]").textContent = content.split("\n").length;
					});
					$("#file-reader-url-submit").on("click", (e) => {
						let url = $("#file-reader-url-input").val(), ext = fileFuncs.ext(url).replace(".", "");
						fetch(url)
							.then(data => {
								return data.text();
							})
							.then(content => {
								$editorElem.value = content;
								insertHtml($highlightElem, `<code>${html.escapeHTML(content)}</code>`);
								
								for(let i = 0;i < textFiles.length;i++){
									if($highlightElem.classList.contains(`language-${textFiles[i]}`)) $highlightElem.classList.remove(`language-${textFiles[i]}`);
								}
								if(fileReaderFiletypeInput.value.length > 0 && $highlightElem.classList.contains(`language-${fileReaderFiletypeInput.value}`)) $highlightElem.classList.remove(`language-${fileReaderFiletypeInput.value}`);
								$highlightElem.classList.add(`language-${ext}`);
								
								Prism.highlightElement($highlightElem);
								$reader.querySelector("[data-name]").textContent = fileFuncs.name(url);
								$reader.querySelector("[data-ext]").textContent = ext;
								$reader.querySelector("[data-mime]").textContent = `text/${ext}`;
								$reader.querySelector("[data-chars]").textContent = content.length + ' chars.';
								$reader.querySelector("[data-size]").textContent = fileFuncs.bytes(JSON.stringify(content).length);
								$reader.querySelector("[data-lines]").textContent = content.split("\n").length;
							})
							.catch(err => console.log("fileops error -> file-reader-url-submit", err));
					});
					$("#file-reader-file-input").on("change", function(e){
						let files = e.target.files, file = files[0], fr = new FileReader(), 
						ext = fileFuncs.ext(file.name).replace(".", "");
						
						if(inArray(ext, textFiles)){
							fr.onload = function(ev){
								let res = ev.target.result, content = html.escapeHTML(res);
								$editorElem.value = res;
								insertHtml($highlightElem, `<code>${content}</code>`);
								
								for(let i = 0;i < textFiles.length;i++){
									if($highlightElem.classList.contains(`language-${textFiles[i]}`)) $highlightElem.classList.remove(`language-${textFiles[i]}`);
								}
								if(fileReaderFiletypeInput.value.length > 0 && $highlightElem.classList.contains(`language-${fileReaderFiletypeInput.value}`)) $highlightElem.classList.remove(`language-${fileReaderFiletypeInput.value}`);
								$highlightElem.classList.add(`language-${ext}`);
								
								Prism.highlightElement($highlightElem);
								$reader.querySelector("[data-name]").textContent = file.name;
								$reader.querySelector("[data-ext]").textContent = ext;
								$reader.querySelector("[data-mime]").textContent = file.type;
								$reader.querySelector("[data-chars]").textContent = content.length + ' chars.';
								$reader.querySelector("[data-size]").textContent = fileFuncs.bytes(JSON.stringify(content).length);
								$reader.querySelector("[data-lines]").textContent = content.split("\n").length;
							}
							fr.readAsText(file);
						}
					});
					////////////////////////////////////////////////////////////////
					let fileConverterFileInput = $("#file-converter-file-input"), fileConverterSelect = $("#file-converter-select"), fileConverterButton = $("#file-converter-btn"), 
					fileConverterInput = $("#file-converter-input"), fileConverterOutput = $("#file-converter-output"), 
					fileConverterInput_type = fileConverterInput.data("input-type"), fileConverterOutput_type = fileConverterOutput.data("output-type");
					
					fileConverterButton.on("click", (e) => {
						let inputText = fileConverterInput.val(), //outputText = fileConverterOutput.val(), 
						action = fileConverterSelect.val();
						action = action.toLowerCase();
						if(action === "json-to-yaml"){
							inputText = AKD_Formatter.json2yaml(inputText);
							fileConverterOutput.val(inputText);
						} else if(action === "json-to-xml"){
							inputText = AKD_Formatter.json2xml(inputText);
							fileConverterOutput.val(inputText);
						} else if(action === "json-to-base64"){
							inputText = AKD_Formatter.json2base64(inputText);
							fileConverterOutput.val(inputText);
						} else if(action === "json-to-text"){
							inputText = AKD_Formatter.json2text(inputText);
							fileConverterOutput.val(inputText);
						} else if(action === "json-to-csv"){
							inputText = AKD_Formatter.json2csv(inputText);
							fileConverterOutput.val(inputText);
						} else if(action === "csv-to-json"){
							inputText = AKD_Formatter.csv2json(inputText);
							fileConverterOutput.val(inputText);
						} else if(action === "yaml-to-json"){
							inputText = AKD_Formatter.yaml2json(inputText);
							fileConverterOutput.val(inputText);
						} else if(action === "yaml-to-csv"){
							inputText = AKD_Formatter.yaml2csv(inputText);
							fileConverterOutput.val(inputText);
						} else if(action === "yaml-to-xml"){
							inputText = AKD_Formatter.yaml2xml(inputText);
							fileConverterOutput.val(inputText);
						} else if(action === "xml-to-json"){
							inputText = AKD_Formatter.xml2json(inputText);
							fileConverterOutput.val(inputText);
						} else {
							fileConverterOutput.val("an error seems to have occurred, the original submitted text content could not be converted!");
						}
					});
					$(".file-converter-op-button ").on("click", (e) => {
						let $this = e.target, $target = $($this.dataset.target), action = fileConverterSelect.val(), 
						pieces = action.split("-"), from_ext = pieces[0] || "", to_ext = pieces[2] || ""
						
						if($target){
							if($this.classList.contains("file-converter-input-minifier-btn") || $this.classList.contains("file-converter-output-minifier-btn")){
								let params = {}, 
								text = $this.classList.contains("file-converter-input-minifier-btn") ? fileConverterInput.val() : fileConverterOutput.val(), 
								content = format(text, from_ext, "minify", params);
								
								$this.classList.contains("file-converter-input-minifier-btn") ?  fileConverterInput.val(content) : fileConverterOutput.val(content);
								/* // empty($highlightElem);
								insertHtml($highlightElem, `<code>${content}</code>`);
								Prism.highlightElement($highlightElem);
								viewer.querySelector("[data-chars]").textContent = content.length + ' bytes, saved ' + ((1 - content.length / text.length) * 100 || 0).toFixed(2) + '%';
								viewer.querySelector("[data-size]").textContent = fileFuncs.bytes(JSON.stringify(content).length);
								viewer.querySelector("[data-lines]").textContent = content.split("\n").length;*/
							}
							if($this.classList.contains("file-converter-input-beautifier-btn") || $this.classList.contains("file-converter-output-beautifier-btn")){
								let params = {}, text = $this.classList.contains("file-converter-input-beautifier-btn") ? fileConverterInput.val() : fileConverterOutput.val();
								
								if(ext === "js" ) {
									let detect_packers = $("#file-converter-display [data-detect-packers]").prop("checked") || false;
									if(detect_packers === true) {
										text = unpacker_filter(text);
									}
								}
								let content = format(text, to_ext, "beautify", params);
								$this.classList.contains("file-converter-input-beautifier-btn") ?  fileConverterInput.val(content) : fileConverterOutput.val(content);
								/* // empty($highlightElem);
								insertHtml($highlightElem, `<code>${content}</code>`);
								Prism.highlightElement($highlightElem);
								viewer.querySelector("[data-chars]").textContent = content.length + ' bytes, saved ' + ((1 - content.length / text.length) * 100 || 0).toFixed(2) + '%';
								viewer.querySelector("[data-size]").textContent = fileFuncs.bytes(JSON.stringify(content).length);
								viewer.querySelector("[data-lines]").textContent = content.split("\n").length; */
							}
							if($this.classList.contains("file-converter-input-copy-btn") || $this.classList.contains("file-converter-output-copy-btn")){
								
							}
							if($this.classList.contains("file-converter-input-clear-btn") || $this.classList.contains("file-converter-output-clear-btn")){
								console.log(action, pieces, from_ext, to_ext, $target)
								$this.classList.contains("file-converter-input-clear-btn") ?  fileConverterInput.val("") : fileConverterOutput.val("");
							}
						}
					});
					fileConverterSelect.on("change", (e) => {
						let action = e.target.value, pieces = action.split("-");
						
						fileConverterInput.attr("placeholder", `Enter ${pieces[0]} content`);
						fileConverterOutput.attr("placeholder", `Converted ${pieces[2]} content will be displayed here.`);
					});
					fileConverterFileInput.on("change", function(e){
						let files = e.target.files, file = files[0], fr = new FileReader(), 
						ext = fileFuncs.ext(file.name).replace(".", "");
						
						if(inArray(ext, textFiles)){
							fr.onload = function(ev){
								let res = ev.target.result, content = html.escapeHTML(res);
								fileConverterInput.val(res);
							}
							fr.readAsText(file);
						}
					});
					////////////////////////////////////////////////////////////////
					let x = 0;
					$("#fileops-input").on("change", function(e){
						let limit = 5, files = e.target.files, fr = new FileReader(), as = "text", 
						r_map = {
							"text": "readAsText", 
							"data": "readAsDataURL", "dataurl": "readAsDataURL", 
							"array": "readAsArrayBuffer", "arraybuffer": "readAsArrayBuffer", 
							"binary": "readAsBinaryString", "binarystring": "readAsBinaryString"
						}, 
						ext_map = {
							"html": {icon: "html5", color: "red"}, 
							"css": {icon: "css3", color: "#10bdf0"}
						}, 
						// frag1 = document.createDocumentFragment(), frag2 = "";
						frag1 = "";
						if(files && files.length > 0 && files.length <= limit){
							for(var i = 0;i < files.length;i++){
								x++;
								let input = files[i], ext = fileFuncs.ext(input.name).replace(".", "");
								if(inArray(ext, textFiles)){
									as = "text";
									fr.onload = function(ev){
										let res = ev.target.result;
										frag1 += `<span class="icon-button local d-flex flex-col flex-center gap-8 w-12 h-12 bg-opaque bdr-4 border" style="height: ${gih};" onclick="let target = document.getElementById('fileops-viewer-'+${x});target.style.display = 'grid';">
											<i class="fab fa-${ext_map[ext]?.icon || ext}"></i>
											<b class="pos-abs bg-opaque-dark w-6 p-3 bdr-8 text-center text-white" style="top: auto;bottom: 1rem;" >${html.truncate(input.name, 15)}</b>
										</span>`;
										
										var viewer = Object.assign(document.createElement("section"), {
											id: "fileops-viewer-"+x, style: `display: none;grid-template-columns: 100%;grid-template-rows: auto 1fr;background-color: ${ext_map[ext]?.color || "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6)};position: absolute;z-index: 100;width: 60%;height: 60%;top: 40%;left: 40%;translate: -40% -40%;box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);overflow: hidden;`, 
											innerHTML: `<div class="pos-rel d-block p-0 w-12 overflow-visible">
												<div class="pos-rel d-flex flex-center p-3 w-12 overflow-hidden" style="z-index: 9;background-color: var(--color, #fff);">
													<span class="d-flex flex-center flex-wrap gap-1 px-3 w-auto mr-auto">
														<button class="viewer-expand-btn btn btn-primary text-lg mr-auto" onclick="let viewer = document.getElementById('fileops-viewer-'+${x});this.classList.toggle('is-active');viewer.classList.toggle('expanded');if(viewer.classList.contains('expanded')){this.textContent = '[]';Object.assign(viewer.style, {width: '100%', height: '100%', top: 0, left: 0, translate: '0 0', transition: 'height linear 0.5s, width linear 0.5s'});} else {this.textContent = '[  ]';Object.assign(viewer.style, {width: '60%', height: '60%', top: '40%', left: '40%', translate: '-40% -40%', transition: 'height linear 0.5s, width linear 0.5s'});}">[  ]</button>
														<button class="viewer-info-btn btn btn-primary text-lg mr-auto px-5" onclick="let target = document.querySelector('#fileops-viewer-'+${x}+' .info'), i = this.querySelector('i.fa');this.classList.toggle('is-active');target.classList.toggle('--active');if(target.classList.contains('--active')){target.classList.remove('slide-up');target.classList.add('slide-down');i.classList.remove('fa-chevron-down');i.classList.add('fa-chevron-up');} else {target.classList.remove('slide-down');target.classList.add('slide-up');i.classList.remove('fa-chevron-up');i.classList.add('fa-chevron-down');}"><i class="fa fa-chevron-down"></i></button>
														<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-2" for="fileops-viewer-"+x+"-checkbox">
															<span>wrap?</span>
															<input id="fileops-viewer-"+x+"-checkbox" type="checkbox" onchange="let target = document.querySelector('#fileops-viewer-'+${x}+' .viewer-textarea');if(this.checked === true) {target.style.whiteSpace = 'wrap';} else {target.style.whiteSpace = 'pre';}" />
														</label>
														<span class="d-flex flex-center gap-1 px-3 w-auto ml-auto">
															<button class="viewer-edit-btn btn btn-primary text-lg mr-auto"><i class="fa fa-edit"></i></button>
															<button class="viewer-minifier-btn btn btn-warning text-lg mr-auto">M</button>
															<button class="viewer-beautifier-btn btn btn-warning text-lg mr-auto">B</button>
														</span>
													</span>
													<span class="d-flex flex-center px-3 w-auto ws-wrap mx-auto">Viewing :&dash;&raquo;${html.truncate(input.name, 18)}</span>
													<span class="d-flex flex-center gap-1 px-3 w-auto ml-auto">
														<button class="viewer-close-btn btn btn-danger text-lg mr-auto" onclick="let target = document.getElementById('fileops-viewer-'+${x});target.style.display = 'none';"><i class="fa fa-times">x</i></button>
													</span>
												</div>
												<div class="info d-flex flex-col slide-up bg-opaque-darker w-12 pl-4 text-white" style="z-index: 8;position: absolute;top: auto;bottom: 0;min-height: 100px;height: max-content;">
													<span class="d-block w-12">name: <span data-name>${input.name}</span>
													<span class="d-block w-12">extension: <span data-ext>${ext}</span></span>
													<span class="d-block w-12">mime-type: <span data-mime>${input.type}</span></span>
													<span class="d-block w-12">size: <span data-size>${fileFuncs.bytes(input.size)}</span></span>
													<span class="d-block w-12">lines: <span data-lines>${res.split("\n").length}</span></span>
													<span class="d-block w-12">chars: <span data-chars>???</span></span>
												</div>
											</div>
											<div class="pos-rel d-block w-12 h-12 overflow-hidden">
												<textarea class="viewer-textarea pos-abs d-block w-12 h-12 p-4 overflow-auto z-1" style="width: calc(100% - 2rem);height: calc(100% - 2rem);margin: 1rem auto auto 1rem;white-space: pre;background: #fff;" placeholder="no text content loaded" readonly onfocus="this.select();">${html.escapeHTML(res)}</textarea>
												<pre class="viewer-pre pos-abs d-block w-12 h-12 p-4 overflow-auto z-2 language-${ext}" style="width: calc(100% - 2rem);height: calc(100% - 2rem);margin: 1rem auto auto 1rem;white-space: pre;background: #fff;" readonly onfocus="this.select();">${html.escapeHTML(res)}</code></pre>
											</div>
											<span id="viewer-scroll-to-top" class="d-flex flex-center p-8 w-auto ml-auto bdr-8 bg-opaque-dark text-white to-front" style="position: fixed;top: auto;bottom: 0.5rem;right: 0.5rem;" onclick="let targets = document.querySelectorAll('#fileops-viewer-'+${x}+' .viewer-textarea, #fileops-viewer-'+${x}+' .viewer-pre'), scrollOptions = {left: 0, top: 0, behavior:  'smooth'};Array.from(targets).forEach(target=>target.scrollTo(scrollOptions))">
												<i class="fa fa-chevron-up"></i>
											</span>`
										});
										
										$("#fileops-window").append(viewer);
										$("#fileops-display").append(frag1);
										
										let $highlightElem = viewer.querySelector("pre"), $editorElem = viewer.querySelector("textarea")
										Prism.highlightElement($highlightElem);
										
										$(".viewer-edit-btn").on("click", (e) => {
											e.target.classList.toggle("is-active");
											$highlightElem.classList.contains("z-2") ? $highlightElem.classList.replace("z-2", "z-1") : $highlightElem.classList.replace("z-1", "z-2");
											$editorElem.classList.contains("z-1") ? $editorElem.classList.replace("z-1", "z-2") : $editorElem.classList.replace("z-2", "z-1");
										});
										$(".viewer-minifier-btn").on("click", (e) => {
											let params = {}, text = $editorElem.value, content = format(text, ext, "minify", params);
											$editorElem.value = content;
											// empty($highlightElem);
											insertHtml($highlightElem, `<code>${content}</code>`);
											Prism.highlightElement($highlightElem);
											viewer.querySelector("[data-chars]").textContent = content.length + ' bytes, saved ' + ((1 - content.length / text.length) * 100 || 0).toFixed(2) + '%';
											viewer.querySelector("[data-size]").textContent = fileFuncs.bytes(JSON.stringify(content).length);
											viewer.querySelector("[data-lines]").textContent = content.split("\n").length;
										});
										$(".viewer-beautifier-btn").on("click", (e) => {
											let params = {}, text = $editorElem.value;
											if(ext === "js" ) {
												let detect_packers = viewer.querySelector("[data-detect-packers]")?.checked??false;
												if(detect_packers === true) {
													text = unpacker_filter(text);
												}
											}
											let content = format(text, ext, "beautify", params);
											$editorElem.value = content;
											// empty($highlightElem);
											insertHtml($highlightElem, `<code>${content}</code>`);
											Prism.highlightElement($highlightElem);
											viewer.querySelector("[data-chars]").textContent = content.length + ' bytes, saved ' + ((1 - content.length / text.length) * 100 || 0).toFixed(2) + '%';
											viewer.querySelector("[data-size]").textContent = fileFuncs.bytes(JSON.stringify(content).length);
											viewer.querySelector("[data-lines]").textContent = content.split("\n").length;
										});
										// let  $show_info = $this.hasAttribute("data-show-info") || $this.hasAttribute("data-ajax-show-info") || false, 
										/* $this = viewer;
										$parent = viewer || $this.closest("[data-postman-container]"), 
										$editorElem = $parent.querySelector("[data-toolkit-textarea-output]"), 
										content = isElement($editorElem) ? $editorElem.value : "", 
										otext = content, 
										action = $parent.querySelector("[data-toolkit-format-action-select]").value, 
										mode = language = $parent.querySelector("[data-toolkit-format-mode-select]").value, 
										additional_options = $parent.querySelector("[data-additional-options]")?.value??"{}", 
										language = $parent.querySelector("[data-language]")?.value??"", 
										opts = {};
										//-----------------------------
										opts._error_elem = $parent.querySelector("[data-toolkit-console]");
										
										if(action === "beautify"){
											opts.custom_pattern = opts.cp = $parent.querySelector("[data-custom-pattern]")?.value??4;
											opts.indent_size = $parent.querySelector("[data-tabsize]")?.value??"1";
											opts.indent_char = parseInt(opts.indent_size, 10) === 1 ? '\t' : " ";
											opts.max_preserve_newlines = $parent.querySelector("[data-max-preserve-newlines]")?.value??"-1";
											opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
											opts.keep_array_indentation = $parent.querySelector("[data-keep-array-indentation]")?.checked??"false";
											opts.break_chained_methods = $parent.querySelector("[data-break-chained-methods]")?.checked??"false";
											opts.indent_scripts = $parent.querySelector("[data-indent-scripts]")?.value??"keep";
											// opts.brace_style = ($parent.querySelector("[data-brace-style]")?.value??"none") + ($parent.querySelector("[data-brace-preserve-inline]").checked === true ? ",preserve-inline" : "");
											opts.space_before_conditional = $parent.querySelector("[data-space-before-conditional]")?.checked??"false";
											opts.unescape_strings = $parent.querySelector("[data-unescape-strings]")?.checked??"false";
											opts.jslint_happy = $parent.querySelector("[data-jslint-happy]")?.checked??"false";
											opts.end_with_newline = $parent.querySelector("[data-end-with-newline]")?.checked??"false";
											opts.wrap_line_length = $parent.querySelector("[data-wrap-line-length]")?.value??"0";
											opts.indent_inner_html = $parent.querySelector("[data-indent-inner-html]")?.checked??"false";
											opts.comma_first = $parent.querySelector("[data-comma-first]")?.checked??"false";
											opts.e4x = $parent.querySelector("[data-e4x]")?.checked??"false";
											opts.indent_empty_lines = $parent.querySelector("[data-indent-empty-lines]")?.checked??"false";
										} else if(action === "minify"){
											let uglify_options = $parent.querySelector("[data-minifier-options]")?.value??"{}";
											uglify_options = get_options(uglify_options);
											opts.preservecomm = $parent.querySelector("[data-preserve-ws]")?.checked??"true";
											opts = mergeObjects(opts, uglify_options);
										} */
										
										/*if(additional_options && additional_options !== "{}") {
											try {
												additional_options = JSON.parse(additional_options);
												opts = mergeObjects(opts, additional_options);
											} catch (e) {
												$parent.querySelector("[data-additional-options-error]").style.display = "";
											}
										}
										var selectedOptions = JSON.stringify(opts, null, 2);
										$parent.querySelector("[data-options-selected]").value = selectedOptions;*/
										
										/* if(action === "beautify" || action === "minify"){
											if(action === "beautify" && (mode === "js" || language === "js")) {
												let detect_packers = $parent.querySelector("[data-detect-packers]")?.checked??false;
												if(detect_packers === true) {
													content = unpacker_filter(content);
												}
											}
											content = format(content, mode, action, opts);
										}
										
										$editorElem.value = content;
										$parent.querySelector("[data-chars]").textContent = content.length + ' bytes, saved ' + ((1 - content.length / otext.length) * 100 || 0).toFixed(2) + '%';
										$parent.querySelector("[data-size]").textContent = prettyBytes(JSON.stringify(content).length);
										$parent.querySelector("[data-lines]").textContent = content.split("\n").length;
										*/
									}
									
									//fr[`readAs${as}`](files[i]);
									fr[r_map[as]](input, "UTF-8");
								} else if(inArray(ext, imageFiles) || inArray(ext, audioFiles) || inArray(ext, videoFiles)){
									as = "data";
									//const blob = new Blob(input/*, {type:"text/html"}*/);
									const objectURL = URL.createObjectURL(input);
									frag1 += `<span class="icon-button local d-flex flex-col flex-center gap-8 w-12 h-12 bg-opaque bdr-4 border" onclick="let target = document.getElementById('fileops-viewer-${x}');target.style.display = 'grid';">
										${inArray(ext, imageFiles) ? `<img src="${objectURL}" alt="${input.name}" />`: `<i class="fa fa-(inArray(ext, audioFiles) ? 'music' : (inArray(ext, videoFiles) ? 'video' : ${ext}))" data-src="${objectURL}"></i>`}
										<b class="pos-abs bg-opaque-dark w-6 p-3 bdr-8 text-center text-white" style="top: auto;bottom: 1rem;" >${input.name.slice(0, 18)}</b>
									</span>`;
									var viewer = Object.assign(document.createElement("section"), {
										id: "fileops-viewer-"+x, style: "display: none;grid-template-columns: 100%;grid-template-rows: auto 1fr;background-color: red;position: absolute;z-index: 100;width: 60%;height: 60%;top: 40%;left: 40%;translate: -40% -40%;box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);overflow: hidden;", 
										innerHTML: `<div class="pos-rel d-block p-0 w-12 overflow-visible">
											<div class="pos-rel d-flex flex-center p-3 w-12 overflow-hidden" style="z-index: 9;background-color: var(--color, #fff);">
												<span class="d-flex flex-center flex-wrap gap-2 p-3 w-auto mr-auto">
													<button class="viewer-expand-btn text-lg mr-auto" onclick="let viewer = document.getElementById('fileops-viewer-'+${x});viewer.classList.toggle('expanded');if(viewer.classList.contains('expanded')){this.textContent = '[]';Object.assign(viewer.style, {width: '100%', height: '100%', top: 0, left: 0, translate: '0 0', transition: 'height linear 0.5s, width linear 0.5s'});} else {this.textContent = '[  ]';Object.assign(viewer.style, {width: '60%', height: '60%', top: '40%', left: '40%', translate: '-40% -40%', transition: 'height linear 0.5s, width linear 0.5s'});}">[  ]</button>
													<button class="viewer-media-expand-btn px-5 text-lg mr-auto" onclick="let viewer = document.querySelector('#fileops-viewer-'+${x}+' .viewer-media'), i = this.querySelector('i.fa');;viewer.classList.toggle('image-expanded');if(viewer.classList.contains('image-expanded')){Object.assign(viewer.style, {'max-width': '100%', width: 'auto', height: '100%', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-lock');i.classList.add('fa-unlock');} else {Object.assign(viewer.style, {'max-width': 'max-content', width: 'auto', height: 'auto', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-unlock');i.classList.add('fa-lock');}"><i class="fa fa-lock"></i></button>
													<button class="viewer-info-btn text-lg mr-auto px-5" onclick="let target = document.querySelector('#fileops-viewer-'+${x}+' .info'), i = this.querySelector('i.fa');target.classList.toggle('--active');if(target.classList.contains('--active')){target.classList.remove('slide-up');target.classList.add('slide-down');i.classList.remove('fa-chevron-down');i.classList.add('fa-chevron-up');} else {target.classList.remove('slide-down');target.classList.add('slide-up');i.classList.remove('fa-chevron-up');i.classList.add('fa-chevron-down');}"><i class="fa fa-chevron-down"></i></button>
													<button class="viewer-media-flip-v-btn px-5 text-lg mr-auto" onclick="let img = document.querySelector('#fileops-viewer-'+${x}+' .viewer-media');flipImage(img, 'v');"><i class="fa fa-arrows-v"></i></button>
													<button class="viewer-media-flip-v-btn px-5 text-lg mr-auto" onclick="let img = document.querySelector('#fileops-viewer-'+${x}+' .viewer-media');flipImage(img, 'h');"><i class="fa fa-arrows-h"></i></button>
													<input class="p-0" type="range" min="0" max="180" step="1" value="0" oninput="let viewer = document.querySelector('#fileops-viewer-'+${x}+' .viewer-media');viewer.style.rotate = this.value + 'deg'" />
												</span>
												<span class="d-flex flex-center p-3 w-auto ml-auto">
													<select id="viewer-object-fit-select" class="p-4 text-md" onchange="let viewer = document.querySelector('.viewer-media');viewer.style.objectFit = this.value;" data-akd-select >
														<option value="cover">cover</option>
														<option value="contain" selected>contain</option>
														<option value="fill">fill</option>
														<option value="scale-down">scale-down</option>
														<option value="none">none</option>
													</select>
													
												</span>
												<span class="d-flex flex-center p-3 w-auto ml-auto">
													<button class="viewer-close-btn text-lg mr-auto" onclick="let target = document.getElementById('fileops-viewer-'+${x});target.style.display = 'none';">×</button>
												</span>
											</div>
											<div class="info d-flex flex-col slide-up bg-opaque-dark w-12 pl-4 text-white" style="z-index: 8;position: absolute;top: auto;bottom: 0;min-height: 100px;height: max-content;">
												<span class="d-block w-12">name: <span data-name>${input.name}</span>
												<span class="d-block w-12">size: <span data-size>${fileFuncs.bytes(input.size)}</span></span>
												<span class="d-block w-12">extension: <span data-ext>${ext}</span></span>
												<span class="d-block w-12">mime-type: <span data-mime>${input.type}</span></span>
											</div>
										</div>
										<div class="pos-rel isolate d-flex flex-center w-12 h-12" style="overflow: auto;">
										${
											inArray(ext, imageFiles) ? 
												`<img class="viewer-media" src="${objectURL}" alt="${input.name}" />`: 
													(inArray(ext, audioFiles) ? `<audio id="viewer-media" class="viewer-media"  src="${objectURL}" data-src="${objectURL}"></audio>`: `<video id="viewer-media" class="viewer-media" src="${objectURL}" data-src="${objectURL}" preload="metadata" controls ></video>`)
										}
										${(inArray(ext, audioFiles) || inArray(ext, videoFiles)) ? 
											`<div class="d-flex flex-center gap-3 w-11 h-max p-4 mt-auto my-auto bdr-4 bg-opaque-dark" style="position: absolute;top: auto;bottom: 1rem;">
												<button id="step-backward-button" class="media-button d-flex flex-center p-4 text-lg" onclick="let target = document.querySelector('#fileops-viewer-'+${x}+' .viewer-media');if(target.currentTime > 10){target.currentTime -= 10;}" data-akd-button><i class="fa fa-backward-step"></i></button>
												<button id="stop-button" class="media-button d-flex flex-center p-8 text-lg" onclick="let target = document.querySelector('#fileops-viewer-'+${x}+' .viewer-media');if(!target.paused){target.pause();}target.currentTime = 0;" data-akd-button><i class="fa fa-stop"></i></button>
												<button id="playpause-button" class="media-button d-flex flex-center p-8 text-lg" onclick="let target = document.querySelector('#fileops-viewer-'+${x}+' .viewer-media'), i = this.querySelector('i.fa');if(!target.paused){target.pause();i.classList.remove('fa-pause');i.classList.add('fa-play');} else {target.play();i.classList.remove('fa-play');i.classList.add('fa-pause');}" data-akd-button><i class="fa fa-play"></i></button>
												<button id="step-forward-button" class="media-button d-flex flex-center p-4 text-lg" onclick="let target = document.querySelector('#fileops-viewer-'+${x}+' .viewer-media');if(target.duration < (target.currentTime + 10)){target.currentTime += 10;}" data-akd-button><i class="fa fa-forward-step"></i></button>
											</div>` : 
											""
										}
										</div>`
									});
			
									$("#fileops-window").append(viewer);
									$("#fileops-display").append(frag1);
									if(inArray(ext, audioFiles) || inArray(ext, videoFiles)){
										let media = $("#fileops-window .viewer-media")[0];
										// media.src = objectURL;
										media.load();
										// media.play();
									}
									
									// setTimeout(URL.revokeObjectURL(objectURL),100);
									//fr[`readAs${as}`](files[i]);
									//fr[r_map[as]](input, "UTF-8");
								}
								console.log(ext, files, frag1);
								// changeToFileContent(input, output = "#source", as = "text"/*, ()=>{}*/)
							}
						} else {
							console.log("the amount of files that can be loaded at a time has exceeded the limit!");
						}
					});
				});
		}, 
		launcher(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {}, tasks = [];
			
			let $html = `<article id="launcher-window" class="akd-window flex flex-col w-12 h-12 overflow-auto" data-random-bgimage>
				<div class="snap-container x bg-opaque pos-rel">
					<section id="home-section" class="snap-section" style="display: grid;grid-template-rows: repeat(12, 8rem);grid-template-columns: repeat(3, calc(33.33% - 0.5rem));gap: 1rem;width: calc(100% - 0rem);height: calc(100% - 1px);padding: 1rem;overflow: auto;">
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
							<span class="icon-button local d-flex flex-col flex-center gap-8 w-12 h-12 bg-opaque bdr-4 border" onclick="let target = document.getElementById('database-section');target.scrollIntoView();">
								<i class="fa fa-database"></i>
								<b class="bg-opaque-dark w-6 p-3 bdr-8 text-center text-white">database</b>
							</span>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
							<span class="icon-button local d-flex flex-col flex-center gap-8 w-12 h-12 bg-opaque bdr-4 border" onclick="let target = document.getElementById('build-parameter-section');target.scrollIntoView();">
								<i class="fa fa-code-compare"></i>
								<b class="bg-opaque-dark w-6 p-3 bdr-8 text-center text-white">build parameter</b>
							</span>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
							<span class="icon-button local d-flex flex-col flex-center gap-8 w-12 h-12 bg-opaque bdr-4 border" onclick="let target = document.getElementById('kanban-board-section');target.scrollIntoView();">
								<i class="fa fa-keyboard"></i>
								<b class="bg-opaque-dark w-6 p-3 bdr-8 text-center text-white">kanban board</b>
							</span>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
							<span class="icon-button local d-flex flex-col flex-center gap-8 w-12 h-12 bg-opaque bdr-4 border" onclick="document.getElementById('unit-converter-section').scrollIntoView();">
								<i class="fa fa-keyboard"></i>
								<b class="bg-opaque-dark w-6 p-3 bdr-8 text-center text-white">unit converter</b>
							</span>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
							<span class="icon-button d-flex flex-col flex-center gap-4 w-12 h-12 bg-opaque bdr-4 border" data-target="notes" data-akd-button>
								<i class="fa fa-book"></i>
								<b class="bg-opaque-dark w-6 p-3 bdr-8 text-center text-white">notes</b>
							</span>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
							<span class="icon-button d-flex flex-col flex-center gap-4 w-12 h-12 bg-opaque bdr-4 border" data-target="todos" data-akd-button>
								<i class="fa fa-tasks"></i>
								<b class="bg-opaque-dark w-6 p-3 bdr-8 text-center text-white">todos</b>
							</span>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
							<span class="icon-button d-flex flex-col flex-center gap-4 w-12 h-12 bg-opaque bdr-4 border" data-target="icons" data-akd-button>
								<i class="fa fa-icons"></i>
								<b class="bg-opaque-dark w-6 p-3 bdr-8 text-center text-white">icons</b>
							</span>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
							
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
						</div>
						<div class="snap-section-inner bdr-4" data-random-bgcolor>
						</div>
						<!-- ++++++++++++++++++++ -->
						<div class="w-8 h-4 p-8 m-auto bdr-8 bg-opaque" style="position: fixed;left: 12.5%;right: 12.5%;top: auto;bottom: 1rem;width: calc(75% - 1rem);height: calc(25% - 1rem);" >
							<div class="snap-container x w-12 h-auto bdr-8 bg-opaque">
								<div class="snap-section m-auto w-12 h-auto p-8 bdr-8" style="width: calc(100% - 1rem);height: calc(100% - 1rem);" data-random-bgcolor>
								</div>
								<div class="snap-section m-auto w-12 h-auto p-8 bdr-8" style="width: calc(100% - 1rem);height: calc(100% - 1rem);" data-random-bgcolor>
									<div class="bookmark-main p-8">
										<section class="bookmark-form">
											<input id="urlInput" type="url" name="url" placeholder="Enter URL" pattern="https://.*" required />
											<button id="addBookmark">Add Bookmark</button>
											<button id="deleteAll">Delete All Bookmarks</button>
										</section>
										<section class="bookmarks">
											<ul id="bookmarkList">
											<!-- Bookmarks will be added here dynamically -->
											</ul>
										</section>
									</div>
									<!--<div>
										<span>Safe</span>
										<ul>
											<li>api.weatherapi.com password: kbunknownthug2025</li>
										</ul>
									</div>-->
								</div>
							</div>
						</div>
					</section>
					<section id="task-list-section" class="snap-section" style="display: flex;flex-wrap: wrap;grid-template-columns: 50% 50%;grid-template-rows: 50% 50%;width: 100%;height: 100%;">
						<div class="grid-view --three-columns panel w-6 h-6" data-random-bgcolor data-random-bgimage>
							<span class="d-flex flex-center text-bold ">Reminders</span>
							<div class="d-block">
								<ul class="d-flex flex-col p-4 pl-8">
									${tasks.map(task=> `<li class="w-12 py-4 px-2 ${task.completed === true ? 'checked' : ''}">${task.text}</li>`).join("")}
								</ul>
							</div>
							<div class="d-flex px-2">
								<span class="d-flex gap-2 flex-center flex-even w-6 p-2 bdr-8 my-auto bg-opaque" >
									<a class="btn btn-success px-8 w-12 bdr-4 d-flex flex-center gap-2 text-md text-truncate" href="#" data-target="todos" data-akd-button><i class="fa fa-task"></i>To-Do</a>
									<button class="btn btn-success px-8 w-12 bdr-4" data-target="home" data-akd-button><i class="fa fa-home"></i></button>
								</span>
							</div>
						</div>
						<div class="wrapper- w-6 h-6" data-random-bgcolor data-random-bgimage>
						</div>
						<div class="d-flex flex-center w-12 h-6" data-random-bgcolor data-random-bgimage>
							<div id="container-calendar" class="container-calendar w-10 h-10 m-auto">
								<div id="left">
									<h1>Dynamic Calendar</h1>
									<div id="event-section">
										<h3>Add Event</h3>
										<input type="date" id="eventDate">
										<input type="text" id="eventTitle" placeholder="Event Title">
										<input type="text" id="eventDescription" placeholder="Event Description">
										<button id="addEvent">Add</button>
									</div>
									<div id="reminder-section">
										<h3>Reminders</h3>
										<!-- List to display reminders -->
										<ul id="reminderList">
											<li data-event-id="1">
												<strong>Event Title</strong> - Event Description on Event Date
												<button class="delete-event" onclick="deleteEvent(1)">Delete</button>
											</li>
										</ul>
									</div>
								</div>
								
								<div id="right">
									<h3 id="monthAndYear"></h3>
									<div class="button-container-calendar">
										<button id="previous">‹</button>
										<button id="next">›</button>
									</div>
									<table class="table-calendar" id="calendar" data-lang="en">
										<thead id="thead-month"></thead>
										<!-- Table body for displaying the calendar -->
										<tbody id="calendar-body"></tbody>
									</table>
									<div class="footer-container-calendar">
										<label for="month">Jump To: </label>
										<!-- Dropdowns to select a specific month and year -->
										<select id="month">
											<option value=0>Jan</option>
											<option value=1>Feb</option>
											<option value=2>Mar</option>
											<option value=3>Apr</option>
											<option value=4>May</option>
											<option value=5>Jun</option>
											<option value=6>Jul</option>
											<option value=7>Aug</option>
											<option value=8>Sep</option>
											<option value=9>Oct</option>
											<option value=10>Nov</option>
											<option value=11>Dec</option>
										</select>
										<!-- Dropdown to select a specific year -->
										<select id="year"></select>
									</div>
								</div>
								
							</div>
						</div>
					</section>
					<section id="note-book-section" class="snap-section" >
						<div class="note-book-container grid-view --reversed w-12 h-12" style="height: calc(100% - 0.5rem);">
							<textarea id="database-display" class="form-control w-12 h-12 p-8 ws-pre" style="background-color: lightblue;margin-bottom: 0;" data-akd-textarea></textarea>
							<!--<pre id="database-display" class="form-control w-12 h-12 py-4 px-8 ws-pre" contenteditable="true" data-akd-textarea></pre>-->
							<span class="d-flex place-center py-2 px-8 gap-4 bg-opaque">
								<button id="database-import-button" class="d-flex gap-4" type="button " data-akd-button><i class="fa fa-file-import"></i><em class="">import database</em></button>
								<button id="database-update-button" class="d-flex gap-4" type="button " data-akd-button><i class="fa fa-sync"></i><em class="">update database</em></button>
							</span>
						</div>
					</section>
					<section id="notebook-section" class="snap-section" >
						<div class="notebook-container">
							<div class="notebook-content-top"></div>
							<div class="notebook-lines">
								<div class="notebook-content">
									<br/>
									<textarea style="display: block;width: 100%;height: 100%;background: transparent;border: none;">
		People tell you the world looks a certain way. Parents tell you how to think. Schools tell you how to think. TV. Religion. And then at a certain point, if you’re lucky, you realize you can make up your own mind. Nobody sets the rules but you. You can design your own life.<br/><br/>
									</textarea>
									<span class="notebook-content-author">Carrie Ann Moss</span>
								</div>
							</div>
							<div class="notebook-content-bottom"></div>
						</div>
					</section>
					<section id="kanban-board-section" class="snap-section" data-random-bgimage data-random-bgcolor>
						<div class="head">
							<!--<img src="https://media.geeksforgeeks.org/gfg-gg-logo.svg">-->
							<h1>Kanban Board</h1>
						</div>
						<div class="kanban-tasks-in-btn">
							<input type="text" id="kanban-taskInput" class="kanban-task-input" placeholder="Enter a task..." >
							<button class="add-kanban-task-btn">Add Task</button>
						</div>
						<div class="board">
							<div class="kanban-column" id="todo">
								<h2>Todo</h2>
								<hr>
								<div class="kanban-task-container"></div>
							</div>
							
							<div class="kanban-column" id="in-progress">
								<h2>In Progress</h2>
								<hr>
								<div class="kanban-task-container"></div>
							</div>
							
							<div class="kanban-column" id="done">
								<h2>Done</h2>
								<hr>
								<div class="kanban-task-container"></div>
							</div>
						</div>
						<!--<div class="kanban2-container">
							<div id="todo" class="kanban2-column">
								<span class="h3">To Do</span>
								<div id="task-1" class="kanban2-task" draggable="true">Task 1</div>
								<div id="task-2" class="kanban2-task" draggable="true">Task 2</div>
							</div>
							<div id="inprogress" class="kanban2-column">
								<span class="h3">In Progress</span>
							</div>
							<div id="done" class="kanban2-column">
								<span class="h3">Done</span>
							</div>
						</div> -->
					</section>
					<section id="unit-converter-section" class="snap-section d-flex flex-center p-4" data-random-bgimage data-random-bgcolor>
						<div class="unit-converter d-flex flex-col gap-4"> 
							<span>Unit Converter using HTML CSS and JavaScript</span> 
							<span class="subtitle">Select Category</span> 
							<select id="conversionCategory" class="select-category"> 
								<option value=""> - Select - </option> 
								<option value="temperature">Temperature</option> 
								<option value="area">Area</option> 
								<option value="weight">Weight</option> 
								<option value="length">Length</option> 
								<option value="time">Time</option> 
							</select> 
							<div class="wrapper"> 
								<div class="conversion d-flex flex-col gap-4" id="temperature"> 
									<h2 class="category-title">Temperature</h2> 
									<input type="number" id="temperatureInput" class="input" placeholder="Enter value" /> 
									<span class="d-flex flex-even flex-wrap gap-4">
										<select id="fromTemperatureUnit" class="unit-select"> 
											<option value="celsius">Celsius</option> 
											<option value="kelvin">Kelvin</option> 
											<option value="fahrenheit">Fahrenheit</option> 
										</select> 
										<span class="arrow"></span> 
										<select id="toTemperatureUnit" class="unit-select"> 
											<option value="celsius">Celsius</option> 
											<option value="kelvin">Kelvin</option> 
											<option value="fahrenheit">Fahrenheit</option> 
										</select>
									</span>
									<button id="temperatureConvertBtn" class="convert-button">Convert</button> 
									<div class="result"> 
										<p id="temperatureResult">Result will be displayed here</p> 
									</div> 
								</div> 
								<div class="conversion d-flex flex-col gap-4" id="area"> 
									<h2 class="category-title">Area</h2> 
									<input type="number" id="areaInput" class="input" placeholder="Enter value" />
									<span class="d-flex flex-even flex-wrap gap-4">
										<select id="fromAreaUnit" class="unit-select"> 
											<option value="sqMeter">Square Meter</option> 
											<option value="sqKilometer">Square Kilometer</option> 
											<!-- Add more area units here -->
										</select> 
										<span class="arrow"></span> 
										<select id="toAreaUnit" class="unit-select"> 
											<option value="sqMeter">Square Meter</option> 
											<option value="sqKilometer">Square Kilometer</option> 
										</select>
									</span>
									<button id="areaConvertBtn" class="convert-button">Convert</button> 
									<div class="result"> 
										<p id="areaResult">Result will be displayed here</p>
									</div> 
								</div> 
								<div class="conversion d-flex flex-col gap-4" id="weight"> 
									<h2 class="category-title">Weight</h2> 
									<input type="number" id="weightInput" class="input" placeholder="Enter value" />
									<span class="d-flex flex-even  gap-2 w-12">
										<select id="fromWeightUnit" class="unit-select"> 
											<option value="gram">Gram</option> 
											<option value="kilogram">Kilogram</option> 
										</select> 
										<span class="arrow"></span> 
										<select id="toWeightUnit" class="unit-select"> 
											<option value="gram">Gram</option> 
											<option value="kilogram">Kilogram</option> 
										</select>
									</span>
									<button id="weightConvertBtn" class="convert-button">Convert</button> 
									<div class="result"> 
										<p id="weightResult">Result will be displayed here</p> 
									</div> 
								</div> 
								<div class="conversion d-flex flex-col gap-4" id="length"> 
									<h2 class="category-title">Length</h2> 
									<input type="number" id="lengthInput" class="input" placeholder="Enter value" />
									<span class="d-flex flex-even  gap-2 w-12">
										<!-- <select id="fromLengthUnit" class="unit-select"> 
											<option value="meter">Meter</option> 
											<option value="kilometer">Kilometer</option> 
										</select> 
										<span class="arrow"></span> 
										<select id="toLengthUnit" class="unit-select"> 
											<option value="meter">Meter</option> 
											<option value="kilometer">Kilometer</option> 
										</select> -->
										
										<select id="fromLengthUnit" class="unit-select">
											<option value="cm">Centimeter (cm)</option>
											<option value="inch">Inch (in)</option>
											<option value="feet">Feet (ft)</option>
											<option value="meter">Meter (m)</option>
											<option value="yard">Yard (yd)</option>
											<option value="mile">Mile (mi)</option>
											<option value="kilometer">Kilometer (km)</option>
										</select>
										<span class="arrow"></span> 
										<select id="toLengthUnit" class="unit-select">
											<option value="cm">Centimeter (cm)</option>
											<option value="inch">Inch (in)</option>
											<option value="feet">Feet (ft)</option>
											<option value="meter">Meter (m)</option>
											<option value="yard">Yard (yd)</option>
											<option value="mile">Mile (mi)</option>
											<option value="kilometer">Kilometer (km)</option>
										</select>
									</span>
									<button id="lengthConvertBtn" class="convert-button">Convert</button> 
									<div class="result"> 
										<p id="lengthResult">Result will be displayed here</p> 
									</div> 
								</div> 
								<div class="conversion d-flex flex-col gap-4" id="time"> 
									<h2 class="category-title">Time</h2> 
									<input type="number" id="timeInput" class="input" placeholder="Enter value" />
									<span class="d-flex flex-even  gap-2 w-12">
										<select id="fromTimeUnit" class="unit-select"> 
											<option value="second">Second</option> 
											<option value="minute">Minute </option> 
										</select> 
										<span class="arrow"></span> 
										<select id="toTimeUnit" class="unit-select"> 
											<option value="second">Second</option> 
											<option value="minute">Minute</option> 
										</select>
									</span>
									<button id="timeConvertBtn" class="convert-button">Convert</button> 
									<div class="result"> 
										<p id="timeResult">Result will be displayed here</p> 
									</div> 
								</div> 
							</div> 
						</div>
					</section>
					<!--<section id="database-section" class="snap-section" data-random-bgimage data-random-bgcolor>
						
					</section>
					<section id="build-parameter-section" class="snap-section" data-random-bgimage data-random-bgcolor>
						
					</section>-->
					
				</div>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					let galleryList = [
						{"alt" : "_48crH8AzXBOrqzoGkadxCcXTsryIquEvagJrFl8MHs", "src" : "_48crH8AzXBOrqzoGkadxCcXTsryIquEvagJrFl8MHs.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "197548", "src" : "197548.png", "ext" : "png", "mime" : "image/png", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "afro_samurai_bloody_wallpaper_by_whit_3_d493zki-fullview", "src" : "afro_samurai_bloody_wallpaper_by_whit_3_d493zki-fullview.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "218942", "src" : "218942.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "54590", "src" : "54590.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "548UY800", "src" : "548UY800.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "26769573", "src" : "26769573.png", "ext" : "png", "mime" : "image/png", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "Fat-pussy", "src" : "Fat-pussy.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "Fat-pussy1", "src" : "Fat-pussy1.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "download", "src" : "download.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "pussy-cream", "src" : "pussy-cream.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
					];
					$("#launcher-window").css({"backdrop-filter": "blur(5px)","background-image": `url("./.img/${galleryList[0].src}")`, "background-size": "cover", "background-position": "center center", "background-repeat": "no-repeat"});
					/* $("[data-random-bgimage]").each((i, el)=>{
						let bg = shuffle(galleryList)[0].src;
						$(el).css({"backdrop-filter": "blur(5px)","background-image": `url("./.img/${bg}")`, "background-size": "cover", "background-position": "center center", "background-repeat": "no-repeat"});
					}); 
					$("[data-random-bgcolor]").each((i, el)=>{
						let bg = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6);
						$(el).css("background-color", bg);
					}); */
					
					initializeRandoms("all");
					
					$("[data-akd-gallery]").each((i, el)=>{
						let glist = el.dataset.galleryList;
						if(isString(glist) && glist.length > 0){
							try{
								glist = JSON.parse(glist);
								let str = glist.map(list=>{
									return `<span class="gallery-item">
										<img src="../../.img/${list.src}" alt="${list.alt}" style="display: block;max-width: 100%;width: 100%;height: 100%;" />
									</span>`;
								}).join("");
								
								$(el)
									/*.css({"display": "grid", "grid-template-columns": "repeat(4, 25%)", "grid-template-rows": "repeat(auto-fill, 25%)", "width": "100%", "height": "100%"})*/
									.append(str);
								
								$(".gallery-style-button").click(function(e){
									let _class = this.dataset.value;
									if(isElement(el)){
										$(el).removeClass("masonry-gallery, snap-gallery").addClass(_class);
										$(".gallery-style-button").removeClass("is-active");
										$(this).addClass("is-active");
									}
								});
								
								$(".gallery-item > img").click(function(e){
									var viewer = Object.assign(document.createElement("section"), {
										id: "viewer", style: "background-color: red;position: absolute;z-index: 100;width: 60%;height: 60%;top: 40%;left: 40%;translate: -40% -40%;", 
										innerHTML: `<div class="d-flex flex-center p-3 w-12">
											<span class="d-flex flex-center p-3 w-auto mr-auto">
												<button class="viewer-expand-btn text-lg mr-auto">[  ]</button>
											</span>
											<span class="d-flex flex-center p-3 w-auto ml-auto">
												<button class="viewer-close-btn text-lg mr-auto">×</button>
											</span>
										</div>
										<img class="viewer-image w-12 h-12" src="${this.src}" />`
									});
				
									document.body.appendChild(viewer);
									
									viewer.querySelector(".viewer-close-btn").addEventListener("click", e=>{
										document.body.removeChild(viewer || document.querySelector("#viewer"))
									});
									viewer.querySelector(".viewer-expand-btn").addEventListener("click", e=>{
										// viewer = viewer || document.querySelector("#viewer");
										viewer.classList.toggle("expanded");
										if(viewer.classList.contains("expanded")){
											e.target.textContent = "[]";
											Object.assign(viewer.style, {width: "100%", height: "100%", top: 0, left: 0, translate: "0 0", transition: "all ease 0.015s"});
										} else {
											e.target.textContent = "[  ]";
											Object.assign(viewer.style, {width: "60%", height: "60%", top: "40%", left: "40%", translate: "-40% -40%", transition: "height linear 0.5s, width linear 0.5s"});
										}
									});
									viewer.querySelector(".viewer-image").addEventListener("dblclick", e=>{
										let expandBtn = viewer.querySelector(".viewer-expand-btn");
										viewer.classList.toggle("expanded");
										if(viewer.classList.contains("expanded")){
											expandBtn.textContent = "[]";
											Object.assign(viewer.style, {width: "100%", height: "100%", top: 0, left: 0, translate: "0 0", transition: "all ease 0.015s"});
										} else {
											expandBtn.textContent = "[  ]";
											Object.assign(viewer.style, {width: "60%", height: "60%", top: "40%", left: "40%", translate: "-40% -40%", transition: "height linear 0.5s, width linear 0.5s"});
										}
									});
								});
							} catch(e){throw e}
						}
					});
					// --------------------------------------------
					let inputforms = document.querySelectorAll(".conversion"); 
					inputforms.forEach((form) => (form.style.display = "none")); 
					let category = document.getElementById("conversionCategory"); 
					category.addEventListener("change", function () { 
						let userInput = category.value; 
						inputforms.forEach((form) => (form.style.display = "none")); 
						document.getElementById(userInput).style.display = "block";
					}); 
					document.getElementById("temperatureConvertBtn").addEventListener("click", tempFn); 
					document.getElementById("areaConvertBtn").addEventListener("click", areaFn); 
					document.getElementById("weightConvertBtn").addEventListener("click", weightFn); 
					document.getElementById("lengthConvertBtn").addEventListener("click", lengthFn); 
					document.getElementById("timeConvertBtn").addEventListener("click", timeFn); 
					function tempFn() { 
						let valInput = parseFloat(document.getElementById("temperatureInput").value); 
						let fromUnit = document.getElementById("fromTemperatureUnit").value; 
						let toUnit = document.getElementById("toTemperatureUnit").value; 
						let result; 
						if(fromUnit === "celsius" && toUnit === "fahrenheit") { 
							result = (valInput * 9) / 5 + 32;
						} else if (fromUnit === "celsius" && toUnit === "kelvin") { 
							result = valInput + 273.15;
						} else if (fromUnit === "fahrenheit" && toUnit === "celsius") { 
							result = ((valInput - 32) * 5) / 9;
						} else if (fromUnit === "fahrenheit" && toUnit === "kelvin") { 
							result = ((valInput - 32) * 5) / 9 + 273.15;
						} else if (fromUnit === "kelvin" && toUnit === "celsius") { 
							result = valInput - 273.15;
						} else if (fromUnit === "kelvin" && toUnit === "fahrenheit") { 
							result = ((valInput - 273.15) * 9) / 5 + 32;
						} else { 
							result = valInput;
						} 
						document.getElementById("temperatureResult").textContent = `Result: ${result.toFixed(2)}`;
					}
					
					function areaFn() { 
						let valInput = parseFloat(document.getElementById("areaInput").value); 
						let fromUnit = document.getElementById("fromAreaUnit").value; 
						let toUnit = document.getElementById("toAreaUnit").value; 
						let conversionFactors = { 
							sqMeter: 1, sqKilometer: 0.000001, sqCentimeter: 10000, sqMillimeter: 1000000, 
							acre: 0.000247105, hectare: 0.0001, 
							sqMile: 3.861e-7, sqYard: 1.19599, sqFoot: 10.7639, sqInch: 1550.0031
						}; 
						let result = valInput * (conversionFactors[toUnit] / conversionFactors[fromUnit]); 
						document.getElementById("areaResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
					} 
					
					function weightFn() { 
						let valInput = parseFloat(document.getElementById("weightInput").value); 
						let fromUnit = document.getElementById("fromWeightUnit").value; 
						let toUnit = document.getElementById("toWeightUnit").value; 
						let conversionFactors = { 
							gram: 1, kilogram: 0.001, milligram: 1000, 
							metricTon: 0.000001, longTon: 0.000984207, shortTon: 0.00110231, 
							pound: 0.00220462, ounce: 0.03527396, 
							carat: 5,
						}; 
						let result = valInput * (conversionFactors[toUnit] / conversionFactors[fromUnit]); 
						document.getElementById("weightResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`; 
					} 
					
					function lengthFn() { 
						let valInput = parseFloat(document.getElementById("lengthInput").value); 
						let fromUnit = document.getElementById("fromLengthUnit").value; 
						let toUnit = document.getElementById("toLengthUnit").value; 
						let conversionFactors = { 
							meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000, mile: 0.000621371, 
							yard: 1.09361, foot: 3.28084, inch: 39.3701
						}; 
						let result = valInput * (conversionFactors[toUnit] / conversionFactors[fromUnit]); 
						document.getElementById("lengthResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
					} 
					function lengthFn(){
						let inputValue = parseFloat(document.getElementById("lengthInput").value); 
						let fromUnit = document.getElementById("fromLengthUnit").value; 
						let toUnit = document.getElementById("toLengthUnit").value; 
						
						// Convert the length based on the selected units
						let result;
						
						if (fromUnit === "cm" && toUnit === "inch") {
							result = inputValue / 2.54;
						} else if (fromUnit === "inch" && toUnit === "cm") {
							result = inputValue * 2.54;
						} else if (fromUnit === "cm" && toUnit === "feet") {
							result = inputValue / 30.48;
						} else if (fromUnit === "feet" && toUnit === "cm") {
							result = inputValue * 30.48;
						} else if (fromUnit === "cm" && toUnit === "meter") {
							result = inputValue / 100;
						} else if (fromUnit === "meter" && toUnit === "cm") {
							result = inputValue * 100;
						} else if (fromUnit === "inch" && toUnit === "feet") {
							result = inputValue / 12;
						} else if (fromUnit === "feet" && toUnit === "inch") {
							result = inputValue * 12;
						} else if (fromUnit === "inch" && toUnit === "meter") {
							result = inputValue * 0.0254;
						} else if (fromUnit === "meter" && toUnit === "inch") {
							result = inputValue / 0.0254;
						} else if (fromUnit === "feet" && toUnit === "meter") {
							result = inputValue * 0.3048;
						} else if (fromUnit === "meter" && toUnit === "feet") {
							result = inputValue / 0.3048;
						} else if (fromUnit === "cm" && toUnit === "yard") {
							result = inputValue / 91.44;
						} else if (fromUnit === "yard" && toUnit === "cm") {
							result = inputValue * 91.44;
						} else if (fromUnit === "cm" && toUnit === "mile") {
							result = inputValue / 160934.4;
						} else if (fromUnit === "mile" && toUnit === "cm") {
							result = inputValue * 160934.4;
						} else if (fromUnit === "cm" && toUnit === "kilometer") {
							result = inputValue / 100000;
						} else if (fromUnit === "kilometer" && toUnit === "cm") {
							result = inputValue * 100000;
						} else if (fromUnit === "inch" && toUnit === "yard") {
							result = inputValue / 36;
						} else if (fromUnit === "yard" && toUnit === "inch") {
							result = inputValue * 36;
						} else if (fromUnit === "inch" && toUnit === "mile") {
							result = inputValue / 63360;
						} else if (fromUnit === "mile" && toUnit === "inch") {
							result = inputValue * 63360;
						} else if (fromUnit === "inch" && toUnit === "kilometer") {
							result = inputValue * 0.0000254;
						} else if (fromUnit === "kilometer" && toUnit === "inch") {
							result = inputValue / 0.0000254;
						} else if (fromUnit === "feet" && toUnit === "yard") {
							result = inputValue / 3;
						} else if (fromUnit === "yard" && toUnit === "feet") {
							result = inputValue * 3;
						} else if (fromUnit === "feet" && toUnit === "mile") {
							result = inputValue / 5280;
						} else if (fromUnit === "mile" && toUnit === "feet") {
							result = inputValue * 5280;
						} else if (fromUnit === "feet" && toUnit === "kilometer") {
							result = inputValue * 0.0003048;
						} else if (fromUnit === "kilometer" && toUnit === "feet") {
							result = inputValue / 0.0003048;
						} else if (fromUnit === "meter" && toUnit === "yard") {
							result = inputValue * 1.09361;
						} else if (fromUnit === "yard" && toUnit === "meter") {
							result = inputValue / 1.09361;
						} else if (fromUnit === "meter" && toUnit === "mile") {
							result = inputValue / 1609.34;
						} else if (fromUnit === "mile" && toUnit === "meter") {
							result = inputValue * 1609.34;
						} else if (fromUnit === "meter" && toUnit === "kilometer") {
							result = inputValue / 1000;
						} else if (fromUnit === "kilometer" && toUnit === "meter") {
							result = inputValue * 1000;
						} else if (fromUnit === "yard" && toUnit === "mile") {
							result = inputValue / 1760;
						} else if (fromUnit === "mile" && toUnit === "yard") {
							result = inputValue * 1760;
						} else if (fromUnit === "yard" && toUnit === "kilometer") {
							result = inputValue / 1093.61;
						} else if (fromUnit === "kilometer" && toUnit === "yard") {
							result = inputValue * 1093.61;
						} else if (fromUnit === "mile" && toUnit === "kilometer") {
							result = inputValue * 1.60934;
						} else if (fromUnit === "kilometer" && toUnit === "mile") {
							result = inputValue / 1.60934;
						} else {
							result = inputValue; // No conversion needed
						}
						
						// Display the result
						// document.getElementById("result").innerHTML = result.toFixed(4);
						// let result = valInput * (conversionFactors[toUnit] / conversionFactors[fromUnit]); 
						document.getElementById("lengthResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
					}
					function timeFn() { 
						let valInput = parseFloat(document.getElementById("timeInput").value); 
						let fromUnit = document.getElementById("fromTimeUnit").value; 
						let toUnit = document.getElementById("toTimeUnit").value; 
						let conversionFactors = { 
							second: 1, millisecond: 1000, minute: 1 / 60, hour: 1 / 3600, 
							day: 1 / 86400, week: 1 / 604800, month: 1 / 2628000, year: 1 / 31536000
						}; 
						let result = valInput * (conversionFactors[toUnit] / conversionFactors[fromUnit]); 
						document.getElementById("timeResult").textContent = `Result: ${result.toFixed(2)} ${toUnit}`; 
					}
					// --------------------------------------------
					const urlInput = document.getElementById("urlInput");
					const addBookmarkButton = document.getElementById("addBookmark");
					const deleteAllButton = document.getElementById("deleteAll");
					const bookmarkList = document.getElementById("bookmarkList");
					
					// Function to validate URLs
					function isValidURL(url) {
						const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
						return pattern.test(url);
					}
					
					// Event listener for adding a bookmark
					addBookmarkButton.addEventListener("click", () => {
						const url = urlInput.value.trim();
						if(isValidURL(url)) {
							const bookmarkItem = document.createElement("li");
							bookmarkItem.classList.add("bookmark-item");
							bookmarkItem.innerHTML = `<a href="${url}" taret="_blank">${url}</a>
								<div class="buttons"> 
									<button class="edit">Edit</button>
									<button class="delete">Delete</button>
								</div>`;
							
							bookmarkList.appendChild(bookmarkItem);
							urlInput.value = "";
							addEditBookmarkListener(bookmarkItem);
							addDeleteBookmarkListener(bookmarkItem);
						} else {
							alert("Please enter a valid URL (http:// or https://).");
						}
					});
					
					// Event listener for deleting all bookmarks
					deleteAllButton.addEventListener("click", () => {
						while (bookmarkList.firstChild) {
							bookmarkList.removeChild(bookmarkList.firstChild);
						}
					});
					
					// Event listener for editing bookmarks
					function addEditBookmarkListener(bookmarkItem) {
						const editButton = bookmarkItem.querySelector(".edit");
						const bookmarkLink = bookmarkItem.querySelector("a");
						
						editButton.addEventListener("click", () => {
							const newURL = prompt("Edit the URL:", bookmarkLink.getAttribute("href"));
							if(newURL && isValidURL(newURL)) {
								bookmarkLink.setAttribute("href", newURL);
								bookmarkLink.innerHTML = newURL;
							} else if (newURL) {
								alert("Please enter a valid URL (http:// or https://).");
							}
						});
					}
					
					// Event listener for deleting a bookmark
					function addDeleteBookmarkListener(bookmarkItem) {
						const deleteButton = bookmarkItem.querySelector(".delete");
						
						deleteButton.addEventListener("click", () => {bookmarkItem.remove(); });
					}
					// -----------------------------------------------------
					const taskInput = document.getElementById('kanban-taskInput');
					const addTaskBtn = document.querySelector(".add-kanban-task-btn");
					let tasks = JSON.parse(localStorage.getItem('kanban-tasks')) || [];
					
					renderTasks();
					taskInput.addEventListener("input", function(e){capitalizeInput(this);});
					addTaskBtn.addEventListener("click", function(e){addTask('todo');});
					// const columns = ["todo", "in-progress", "done"];
					const columns = Array.from(document.querySelectorAll(".kanban-column"));
					
					columns.forEach(column => {
						const columnId = column.id;
						column.addEventListener("drop", function(e){
							drop(e, columnId);
						})
						column.addEventListener("dragover", function(e){
							allowDrop(e);
						})
					});
					
					// Function to render tasks on the board
					function renderTasks() {
						const columns = ["todo", "in-progress", "done"];
						
						columns.forEach(columnId => {
							const column = document.getElementById(columnId);
							// column.querySelector('.kanban-task-container').innerHTML = '';
							$(".kanban-task-container", column).empty();
							
							tasks.forEach(task => {
								if (task.status === columnId) {
									const taskElement = createTaskElement(task.content, task.id);
									column.querySelector('.kanban-task-container').appendChild(taskElement);
								}
							});
						});
					}
		
					function createTaskElement(content, id) {
						const taskId = id;
						const task = Object.assign(document.createElement("div"), {
							id: taskId, "className": "kanban-task", draggable: true, 
							innerHTML: `<span class="kanban-task-text mr-auto" contenteditable="false">${content}</span>
							<span class="kanban-edit-btn ml-auto" data-id="${taskId}">Edit</span>
							<span class="kanban-delete-btn" data-id="${taskId}">x</span>`
						})
						
						task.addEventListener("dragstart", drag);
						task.querySelector(".kanban-task-text").addEventListener("input", function(e){e.target.innerText = e.target.innerText.toUpperCase();});
						task.querySelector('.kanban-delete-btn').addEventListener("click", function(e){
							let taskId = e.target.dataset.id;
							deleteTask(taskId);
						});
						task.querySelector('.kanban-edit-btn').addEventListener("click", function (e) {
							let id = e.target.dataset.id, taskText = task.querySelector(".kanban-task-text"), 
							editbtn = task.querySelector('.kanban-edit-btn');
							
							if(editbtn.innerText === 'Edit') {
								taskText.setAttribute('contenteditable', 'true'); // Enable editing
								taskText.focus(); // Focus on the text to start editing
								editbtn.innerText = 'Save'; // Change button text to 'Save'
							} else {
								taskText.setAttribute('contenteditable', 'false'); // Disable editing
								let updatedText = taskText.innerText.trim();
								if(updatedText !== "") {
									$tasks = tasks.map(function (taskobj) {
										if (taskobj.id === id) {
											taskobj.content = updatedText;
										}
										return taskobj;
									});
									updateLocalStorage();
									renderTasks();
								}
								editbtn.innerText = 'Edit'; // Change button text back to 'Edit'
							}
						});
						
						return task;
					}
					
					// Function to delete a task
					function deleteTask(taskId) {
						tasks = tasks.filter(task => task.id !== taskId);
						updateLocalStorage();
						renderTasks();
					}
					
					function allowDrop(event) {
						event.preventDefault();
					}
					
					function drag(event) {
						event.dataTransfer.setData("text/plain", event.target.id);
					}
					
					function drop(event, columnId) {
						event.preventDefault();
						console.log(columnId)
						const data = event.dataTransfer.getData("text/plain");
						const draggedElement = document.getElementById(data);
						console.log(draggedElement)
						if(draggedElement) {
							const taskStatus = columnId;
							updateTaskStatus(data, taskStatus);
							event.target.querySelector('.kanban-task-container').appendChild(draggedElement);
						}
					}
					
					function capitalizeInput(input) {
						input.value = input.value.toUpperCase();
					}
					
					function addTask(columnId) {
						const taskInput = document.getElementById('kanban-taskInput');
						const taskContent = taskInput.value.trim();
						if(taskContent !== "") {
							const newTask = {
								id: "task-" + Date.now(),
								content: taskContent,
								status: columnId
							};
							tasks.push(newTask);
							updateLocalStorage();
							renderTasks();
							taskInput.value = "";
						}
					}
					
					// Function to update task status 
					// when moved to another column
					function updateTaskStatus(taskId, newStatus) {
						//console.log(newStatus)
						tasks = tasks.map(task => {
							//console.log(task, askId)
							if (task.id === taskId) {
								//console.log("inside if")
								return { ...task, status: newStatus };
							}
							return task;
						});
						updateLocalStorage();
					}
					
					// Function to update local 
					// storage with current tasks
					function updateLocalStorage() {
						// console.log("task update")
						localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
					}
					// -------------------------------------------------------------------
					// Define an array to store events
					let events = [];
					
					// letiables to store event input fields and reminder list
					let eventDateInput = document.getElementById("eventDate");
					let eventTitleInput = document.getElementById("eventTitle");
					let eventDescriptionInput = document.getElementById("eventDescription");
					let reminderList = document.getElementById("reminderList");
					
					// Counter to generate unique event IDs
					let eventIdCounter = 1;
					
					// Function to add events
					function addEvent() {
						let date = eventDateInput.value;
						let title = eventTitleInput.value;
						let description = eventDescriptionInput.value;
					
						if (date && title) {
							// Create a unique event ID
							let eventId = eventIdCounter++;
					
							events.push({
								id: eventId, date: date,
								title: title,
								description: description
							});
							showCalendar(currentMonth, currentYear);
							eventDateInput.value = "";
							eventTitleInput.value = "";
							eventDescriptionInput.value = "";
							displayReminders();
						}
					}
					
					// Function to delete an event by ID
					function deleteEvent(eventId) {
						// Find the index of the event with the given ID
						let eventIndex = events.findIndex((event) => event.id === eventId);
					
						if (eventIndex !== -1) {
							// Remove the event from the events array
							events.splice(eventIndex, 1);
							showCalendar(currentMonth, currentYear);
							displayReminders();
						}
					}
					
					// Function to display reminders
					function displayReminders() {
						reminderList.innerHTML = "";
						for (let i = 0; i < events.length; i++) {
							let event = events[i];
							let eventDate = new Date(event.date);
							if(eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear) {
								let listItem = document.createElement("li");
								listItem.setAttribute("data-event-id", event.id);
								listItem.innerHTML = `<strong>${event.title}</strong> - 
								${event.description} on 
								${eventDate.toLocaleDateString()}`;
					
								// Add a delete button for each reminder item
								let deleteButton = document.createElement("button");
								deleteButton.className = "delete-event";
								deleteButton.textContent = "Delete";
								deleteButton.onclick = function () {
									deleteEvent(event.id);
								};
					
								listItem.appendChild(deleteButton);
								reminderList.appendChild(listItem);
							}
						}
					}
					
					// Function to generate a range of 
					// years for the year select input
					function generate_year_range(start, end) {
						let years = "";
						for (let year = start; year <= end; year++) {
							years += "<option value='" + year + "'>" + year + "</option>";
						}
						return years;
					}
					
					// Initialize date-related letiables
					let today = new Date();
					let currentMonth = today.getMonth();
					let currentYear = today.getFullYear();
					let selectYear = document.getElementById("year");
					let selectMonth = document.getElementById("month");
					let createYear = generate_year_range(1970, 2050);
					
					selectYear.innerHTML = createYear;
					
					let calendar = document.getElementById("calendar");
					let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
					
					let $dataHead = "<tr>";
					for(let day in days) {
						if(isString(days[day])) $dataHead += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
					}
					$dataHead += "</tr>";
					document.getElementById("thead-month").innerHTML = $dataHead;
					
					let monthAndYear = document.getElementById("monthAndYear");
					showCalendar(currentMonth, currentYear);
					
					let calendarContainer = document.getElementById("container-calendar")
					
					/* selectMonth.addEventListener("change", e => {
						jump(e);
					});
					selectYear.addEventListener("change", e => {
						jump(e);
					}); */
					calendarContainer.addEventListener("click", e => {
						let target = e.target;
						console.log(target, target.id, days)
						if(target.matches(".delete-event")){
							let id = target.closest("li").getAttribute("data-event-id");
							id = Number(id);
							deleteEvent(id);
						}
						if(target.id === "addEvent"){
							addEvent();
						}
						if(target.id === "previous"){
							previous();
						}
						if(target.id === "next"){
							next();
						}
						/*if(target.id === ""){
							
						}*/
					});
					calendarContainer.addEventListener("change", e => {
						let target = e.target;
						console.log(target, target.id, days)
						if(target.id === "month" || target.id === "year"){
							jump(e);
						}
					});
					// Function to navigate to the next month
					function next() {
						currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
						currentMonth = (currentMonth + 1) % 12;
						showCalendar(currentMonth, currentYear);
					}
					
					// Function to navigate to the previous month
					function previous() {
						currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
						currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
						showCalendar(currentMonth, currentYear);
					}
					
					// Function to jump to a specific month and year
					function jump() {
						currentYear = parseInt(selectYear.value);
						currentMonth = parseInt(selectMonth.value);
						showCalendar(currentMonth, currentYear);
					}
					
					// Function to display the calendar
					function showCalendar(month, year) {
						let firstDay = new Date(year, month, 1).getDay();
						let tbl = document.getElementById("calendar-body");
						tbl.innerHTML = "";
						monthAndYear.innerHTML = months[month] + " " + year;
						selectYear.value = year;
						selectMonth.value = month;
					
						let date = 1;
						for(let i = 0; i < 6; i++) {
							let row = document.createElement("tr");
							for (let j = 0; j < 7; j++) {
								if(i === 0 && j < firstDay) {
									let cell = document.createElement("td"), cellText = document.createTextNode("");
									cell.appendChild(cellText);
									row.appendChild(cell);
								} else if(date > daysInMonth(month, year)) {
									break;
								} else {
									let cell = document.createElement("td");
									cell.setAttribute("data-date", date);
									cell.setAttribute("data-month", month + 1);
									cell.setAttribute("data-year", year);
									cell.setAttribute("data-month_name", months[month]);
									cell.className = "date-picker";
									cell.innerHTML = "<span>" + date + "</span";
					
									if(date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
										cell.className = "date-picker selected";
									}
					
									// Check if there are events on this date
									if(hasEventOnDate(date, month, year)) {
										cell.classList.add("event-marker");
										cell.appendChild(createEventTooltip(date, month, year));
									}
					
									row.appendChild(cell);
									date++;
								}
							}
							tbl.appendChild(row);
						}
					
						displayReminders();
					}
					
					// Function to create an event tooltip
					function createEventTooltip(date, month, year) {
						let tooltip = document.createElement("div");
						tooltip.className = "event-tooltip";
						let eventsOnDate = getEventsOnDate(date, month, year);
						for(let i = 0; i < eventsOnDate.length; i++) {
							let event = eventsOnDate[i];
							let eventDate = new Date(event.date);
							let eventText = `<strong>${event.title}</strong> - 
								${event.description} on 
								${eventDate.toLocaleDateString()}`;
							let eventElement = document.createElement("p");
							eventElement.innerHTML = eventText;
							tooltip.appendChild(eventElement);
						}
						return tooltip;
					}
					
					// Function to get events on a specific date
					function getEventsOnDate(date, month, year) {
						return events.filter(function (event) {
							let eventDate = new Date(event.date);
							return (eventDate.getDate() === date && eventDate.getMonth() === month && eventDate.getFullYear() === year);
						});
					}
					
					// Function to check if there are events on a specific date
					function hasEventOnDate(date, month, year) {return getEventsOnDate(date, month, year).length > 0;}
					
					// Function to get the number of days in a month
					function daysInMonth(iMonth, iYear) {return 32 - new Date(iYear, iMonth, 32).getDate();}
					
					// Call the showCalendar function initially to display the calendar
					showCalendar(currentMonth, currentYear);
					/* ------------------------------------------------------------- */
				});
		}, 
		videos(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {};
			var name = "???", size = "???", ext = "???", type = "???", dims = "???";
			
			let $html = `<article id="videos-window" class="akd-window --has-header" data-akd-window>
				<header class="d-flex gap-4 pos-rel isolate" style="border-bottom: 4px double #10bdf0;">
					<span class="pill-buttons py-2 mr-auto">
						<button class="menu-button btn btn-warning" data-akd-button data-akd-sidebar-toggle-button><i class="fa fa-bars"></i></button>
						<button id="-button" class="media-button" data-akd-button><i class="fa fa-wrench"></i></button>
					</span>
					<span class="d-flex flex-center gap-2 w-max h-auto px-2 py-2 mx-auto">
						
					</span>
					<span class="pill-buttons py-2 ml-auto">
						<label for="video-file-input" class="d-flex flex-center btn btn-warning">
							<span class=""><i class="fa fa-upload"></i></span>
							<input id="video-file-input" class="visually-hidden" type="file" accept="video/* " multiple data-akd-input />
						</label>
						<input id="video-url-input" class="w-12" type="url" data-akd-input />
						<button class="submit-button btn btn-warning" data-target="#video-url-input" data-akd-submit-button data-akd-button><i class="fa fa-search"></i></button>
					</span>
				</header>
				
				<div class="akd-window-body">
					<aside class="akd-window-sidebar left--side" data-akd-window-sidebar>
						<header class="">
						</header>
						<nav class="">
							<ul class="video-list">
								<!-- <li><a class="video-item" href="#" data-video-name="11 Things people learn too, let in life.mp4" data-video-src="./media/11 Things people learn too, let in life.mp4" data-video-item>11 Things people learn too, let in life</a></li>
								<li><a class="video-item" href="#" data-video-name="The Transformative Power of Self-Talk- Rewiring Your Brain for Success_HD.mp4" data-video-src="./media/The Transformative Power of Self-Talk- Rewiring Your Brain for Success_HD.mp4" data-video-item>The Transformative Power of Self-Talk- Rewiring Your Brain for Success_HD</a></li>
								<li><a class="video-item" href="#" data-video-name="When you lose your mother you lose your -- Denzel Washington Motivational Li_HD.mp4" data-video-src="./media/When you lose your mother you lose your -- Denzel Washington Motivational Li_HD.mp4" data-video-item>When you lose your mother you lose your -- Denzel Washington Motivational Li_HD</a></li>
								<li><a class="video-item" href="#" data-video-name="Why-Black-Americans-Couldnt-Win-The-Economic-Game.mp4" data-video-src="./media/Why-Black-Americans-Couldnt-Win-The-Economic-Game.mp4" data-video-item>Why-Black-Americans-Couldnt-Win-The-Economic-Game</a></li>
								
								<li><a class="video-item" href="#" data-video-name="sQjDjL64_720p.mp4" data-video-src="./media/sQjDjL64_720p.mp4" data-video-item>sQjDjL64_720p</a></li>
								<li><a class="video-item" href="#" data-video-name="VID_20250929_222254_518.mp4" data-video-src="./media/VID_20250929_222254_518.mp4" data-video-item>VID_20250929_222254_518</a></li>
								<li><a class="video-item" href="#" data-video-name="VID_20251001_035255_231.mp4" data-video-src="./media/VID_20251001_035255_231.mp4" data-video-item>VID_20251001_035255_231</a></li>
								<li><a class="video-item" href="#" data-video-name="VID_20251004_020015_777.mp4" data-video-src="./media/VID_20251004_020015_777.mp4" data-video-item>VID_20251004_020015_777</a></li> -->
							</ul>
						</nav>
						<footer class="d-flex">
							<button id="" class="btn btn-"><i class="fa fa-"></i></button>
							<button id="" class="btn btn-"><i class="fa fa-"></i></button>
						</footer>
					</aside>
					
					<section class="video-screen w-12 h-12 d-block pos-rel isolate">
						<div class="video-controls top gap-2 flex-col " style="padding: 0;">
							<span class="pos-rel d-flex gap-4 flex-col w-12 h-12 p-4" style="z-index: 9;background: rgba(200 ,200, 200, 0.85) !important; backdrop-filter: blur(4px);">
								<span class="pos-rel d-flex flex-center py-3 w-12 bdr-2x bg-opaque-dark overflow-hidden" style="z-index: 9;background-color: var(--color, #fff);">
									<span class="d-flex flex-center flex-wrap gap-2 p-1 w-max mx-auto">
										<button class="viewer-info-btn text-lg mr-auto py-5" onclick="let target = document.querySelector('#videos-window .info'), i = this.querySelector('i.fa');target.classList.toggle('--active');if(target.classList.contains('--active')){target.classList.remove('slide-up');target.classList.add('slide-down');i.classList.remove('fa-chevron-down');i.classList.add('fa-chevron-up');} else {target.classList.remove('slide-down');target.classList.add('slide-up');i.classList.remove('fa-chevron-up');i.classList.add('fa-chevron-down');}"><i class="fa fa-chevron-down"></i></button>
										<button class="viewer-expand-btn text-df text-bold mr-auto" onclick="let viewer = document.getElementById('main-video');viewer.classList.toggle('expanded');if(viewer.classList.contains('expanded')){this.textContent = '[]';Object.assign(viewer.style, {width: '100%', height: '100%', transition: 'all linear 0.5s'});} else {this.textContent = '[  ]';Object.assign(viewer.style, {width: '80%', height: '50%', transition: 'all linear 0.5s'});}">[  ]</button>
										<button class="viewer-media-expand-btn text-lg mr-auto" onclick="let viewer = document.querySelector('#main-video'), i = this.querySelector('i.fa');;viewer.classList.toggle('image-expanded');if(viewer.classList.contains('image-expanded')){Object.assign(viewer.style, {'max-width': '100%', width: 'auto', height: '100%', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-lock');i.classList.add('fa-unlock');} else {Object.assign(viewer.style, {'max-width': 'max-content', width: 'auto', height: 'auto', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-unlock');i.classList.add('fa-lock');}"><i class="fa fa-lock"></i></button>
										<button class="viewer-media-flip-v-btn text-lg mr-auto" onclick="let img = document.querySelector('#main-video');flipImage(img, 'v');"><i class="fa fa-arrows-v"></i></button>
										<button class="viewer-media-flip-h-btn text-lg mr-auto" onclick="let img = document.querySelector('#main-video');flipImage(img, 'h');"><i class="fa fa-arrows-h"></i></button>
										<button class="viewer-theater-btn text-lg mr-auto" onclick="let target = this.closest('.akd-window');target.classList.toggle('theater-mode');"><i class="fa fa-columns"></i></button>
									</span>
									<span class="d-flex flex-center gap-1 p-3 w-auto mx-auto">
										<select id="video-aspect-ratio-select" class="p-4 text-md" onchange="let viewer = document.querySelector('#main-video');viewer.style.aspectRatio = this.value;" data-akd-select >
											<option value="auto" selected>auto</option>
											<option value="1 / 1">1 / 1</option>
											<option value="16 / 9">16 / 9</option>
											<option value="5 / 2">5 / 2</option>
											<option value="3 / 2">3 / 2</option>
											<option value="0.5">0.5</option>
										</select>
										<select id="video-object-fit-select" class="p-4 text-md" onchange="let viewer = document.querySelector('#main-video');viewer.style.objectFit = this.value;" data-akd-select >
											<option value="cover">cover</option>
											<option value="contain" selected>contain</option>
											<option value="fill">fill</option>
											<option value="scale-down">scale-down</option>
											<option value="none">none</option>
										</select>
										<input class="w-12 p-0" type="range" min="0" max="180" step="1" value="0" oninput="let viewer = document.querySelector('#main-video');viewer.style.rotate = this.value + 'deg'" \/>
									</span>
								</span>
								
								<span class="pos-rel d-flex flex-center flex-wrap gap-2 w-12">
									<button id="-button" class="media-button" data-akd-button><i class="fa fa-">+</i></button>
									<button id="-button" class="media-button" data-akd-button><i class="fa fa-">-</i></button>
									<button id="-button" class="media-button" data-akd-button><i class="fa fa-">@</i></button>
									<button id="-button" class="media-button" data-akd-button><i class="fa fa-">=</i></button>
								</span>
							</span>
							<div class="info d-flex flex-col slide-up bg-opaque-dark w-12 pl-4 text-white bdr-4" style="z-index: 8;position: absolute;top: auto;left: 0;bottom: 0;min-height: 100px;height: max-content;">
								<span class="d-block w-12">name: <span data-name>${name}</span>
								<span class="d-block w-12">size: <span data-size>${size}</span></span>
								<span class="d-block w-12">extension: <span data-ext>${ext}</span></span>
								<span class="d-block w-12">mime-type: <span data-mime>${type}</span></span>
								<span class="d-block w-12">dimensions: <span data-dimensions>${dims}</span></span>
							</div>
						</div>
						
						<div class="pos-rel isolate d-flex flex-center w-12 h-12 overflow-auto" style="overflow: auto;">
							<video id="main-video" class="main-video m-auto" preload="auto" controls loop="false"></video>
						</div>
						
						<div class="video-controls bottom flex-col gap-2">
							<marquee id="video-title-display" class="pos- rel d-block w-12 p-2" style="border-bottom: 1px solid #ccc;"></marquee>
							<span class="time-seek-wrapper w-12 d-flex flex-center gap-1 p-1 mx-auto">
								<span class="current-time mr-auto">00:00</span>
								<input id="seek-input" class="akd-input mx-auto p-0 w-12"  type="range" min="0" max="999" step="1" value="0" data-akd-input />
								<span class="duration-time ml-auto">00:00</span>
							</span>
								
							<span class="pos-rel w-12 d-flex flex-center gap-2 p-2">
								<span class="d-flex gap-2 flex-center mr-auto">
									<button id="previous-media-button" class="media-button d-flex flex-center p-4 text-lg" data-akd-media-button><i class="fa fa-backward-step"></i></button>
									<button id="step-backward-button" class="media-button d-flex flex-center p-4 text-lg" onclick="let target = document.querySelector('#main-video');if(target.currentTime > 10){target.currentTime -= 10;}" data-akd-button><i class="fa fa-fast-backward"></i></button>
									<button id="stop-button" class="media-button d-flex flex-center p-8 text-lg" onclick="let target = document.querySelector('#main-video');if(!target.paused){target.pause();}target.currentTime = 0;" data-akd-button><i class="fa fa-stop"></i></button>
									<button id="playpause-button" class="media-button d-flex flex-center p-8 text-lg" onclick="let target = document.querySelector('#main-video'), i = this.querySelector('i.fa');if(!target.paused){target.pause();i.classList.remove('fa-pause');i.classList.add('fa-play');} else {target.play();i.classList.remove('fa-play');i.classList.add('fa-pause');}" data-akd-button><i class="fa fa-play"></i></button>
									<button id="step-forward-button" class="media-button d-flex flex-center p-4 text-lg" onclick="let target = document.querySelector('#main-video');if(target.duration < (target.currentTime + 10)){target.currentTime += 10;}" data-akd-button><i class="fa fa-fast-forward"></i></button>
									<button id="next-media-button" class="media-button d-flex flex-center p-4 text-lg" data-akd-media-button><i class="fa fa-forward-step"></i></button>
								</span>
								<span class="d-flex flex-center gap-2 py-4 px-6 mx-auto bg-opaque-dark bdr-8">
									<input id="playback-rate-slider" class="p-0" type="range" min="-2" max="1.5" step="0.1" value="1" data-akd-input />
								</span>
								<span class="d-flex flex-center gap-2 py-4 px-6 ml-auto bg-opaque-dark bdr-8">
									<label class="btn btn-violet p-2 bdr-2x text-md" for="loop-button">
										<span class=""><i class="fa fa-arrows-rotate"></i></span>
										<input id="loop-button" class="visually-hidden"  type="checkbox" data-akd-input />
									</label>
									<label class="d-flex flex-center gap-2 bdr-0" for="volume-slider">
										<input id="volume-slider" class="p-0" type="range" min="0" max="100" step="1" value="50" data-akd-input />
										<span id="v-ind" style="min-width: 40px;">50%</span>
									</label>
									<label class="btn btn-violet p-2 bdr-2x text-md" for="mute-button">
										<span class=""><i class="fa fa-volume-high"></i></span>
										<input id="mute-button" class="visually-hidden"  type="checkbox" onchange="let m= document.getElementById('main-video'), i = this.parentElement.querySelector('i.fa');if(this.checked === true){i.classList.replace('fa-volume-high', 'fa-volume-mute');m.muted = true;} else {i.classList.replace('fa-volume-mute', 'fa-volume-high');m.muted = false;}" data-akd-input />
									</label>
								</span>
							</span>
						</div>
					</section>
				</div>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					let _VIDEOS = [
						{"video_id": 1, "name": "11 Things people learn too, let in life", "poster": "./images/fantasy-woman-earth-planet-1080P-wallpaper-middle-size.jpg", "src": "./media/11 Things people learn too, let in life.mp4"}, 
						{"video_id": 2, "name": "The Transformative Power of Self-Talk- Rewiring Your Brain for Success", "poster": "", "src": "./media/The Transformative Power of Self-Talk- Rewiring Your Brain for Success_HD.mp4"}, 
						{"video_id": 3, "name": "When you lose your mother you lose your -- Denzel Washington Motivational Li", "poster": "", "src": "./media/When you lose your mother you lose your -- Denzel Washington Motivational Li_HD.mp4"}, 
						{"video_id": 4, "name": "Why Black Americans Couldnt Win The Economic Game", "poster": "./images/dracula-untold.jpg", "src": "./media/Why-Black-Americans-Couldnt-Win-The-Economic-Game.mp4"}, 
						
						{"video_id": 5, "name": "sQjDjL64_720p", "poster": "", "src": "./media/sQjDjL64_720p.mp4"}, 
						{"video_id": 6, "name": "VID_20250929_222254_518", "poster": "", "src": "./media/VID_20250929_222254_518.mp4"}, 
						{"video_id": 7, "name": "VID_20251001_035255_231", "poster": "./images/worst-capricorn-tattoo-design.jpg", "src": "./media/VID_20251001_035255_231.mp4"}, 
						{"video_id": 8, "name": "VID_20251004_020015_777", "poster": "", "src": "./media/VID_20251004_020015_777.mp4"}
					];
					let _mime_types = {
						"mp3": "audio/",
						"ogg": "audio/",
						"aac": "audio/",
						"m4a": "audio/",
						"webma": "audio/", 
						
						"mp4": "video/mpeg4",
						"ogv": "video/vorbis",
						"avi": "video/",
						"m4v": "video/",
						"mkv": "video/",
						"webm": "video/webm"
					};
					let x = 0, 
					$current_video_id = 0;
					let $media = $("#main-video")[0], 
					$videoList = $(".video-list"), 
					df_poster = "./images/lookout.jpg"
					//$media = document.querySelector("#main-video")
					$media.src = _VIDEOS[0].src;
					$media.poster = _VIDEOS[0].poster || df_poster || "";
					$("#video-title-display").text("Now Playing -> " + _VIDEOS[0].name);
					let vids = _VIDEOS.map(v => {
						return `<li class="video-item d-flex flex-col gap-4 bdr-3" data-video-id="${v.video_id}" data-video-name="${v.name}" data-video-src="${v.src}" data-video-item>
							<span class="d-flex w-12 gap-2 flex-wrap">
								<img class="w-max bdr-8" src="${v.poster || df_poster}" alt="" style="width: 60px;height: 60px;" />
								<span class="d-flex w-max">
									
								</span>
							</span>
							<span class="w-12 bdr-8 text-white bg-opaque-dark">${v.name}</span>
						</li>`;
					}).join("");
					$videoList.append(vids);
					
					$("#video-file-input").on("change", function(e){
						let limit = 5, files = e.target.files, fr = new FileReader(), 
						audioFiles = ["aac", "ogg", "mp3"], videoFiles = ["avi", "ogv", "mp4", "mkv"];
						if(files && files.length > 0 && files.length <= limit){
							for(var i = 0;i < files.length;i++){
								x++;
								let input = files[i], ext = fileFuncs.ext(input.name).replace(".", "");
								if(inArray(ext, videoFiles)){
									const objectURL = URL.createObjectURL(input);
									loadVideo(objectURL, $media);
								}
							}
						}
					});
					$(".video-item").click(function(e){
						let $this = isElement(this) ? this : e.target, src = $this.dataset.videoSrc, $id = $this.dataset.videoId, 
						selectedMedia = _VIDEOS.filter(v=> /*v && v.video_id && */Number(v.video_id) === Number($id))[0];
							
						src = (selectedMedia && !isEmptyObject(selectedMedia)/*&& isPlainObject(selectedMedia)*/) ? selectedMedia : src
						
						if(src){
							$current_video_id = $id;
							$(".video-list .video-item").removeClass("--active");
							$($this).addClass("--active");
							loadVideo(src, $media);
							$("#video-title-display").text("Now Playing -> " + selectedMedia.name);
						}
						console.log($this, src, $id, selectedMedia);
					});
					$("[data-akd-media-button]").click(function(e){
						let $this = isElement(this) ? this : e.target;
						/*<button id="step-backward-button" class="media-button d-flex flex-center p-4 text-lg" onclick="let target = document.querySelector('#main-video');if(target.currentTime > 10){target.currentTime -= 10;}" data-akd-button><i class="fa fa-fast-backward"></i></button>
									<button id="stop-button" class="media-button d-flex flex-center p-8 text-lg" onclick="let target = document.querySelector('#main-video');if(!target.paused){target.pause();}target.currentTime = 0;" data-akd-button><i class="fa fa-stop"></i></button>
									<button id="playpause-button" class="media-button d-flex flex-center p-8 text-lg" onclick="let target = document.querySelector('#main-video'), i = this.querySelector('i.fa');if(!target.paused){target.pause();i.classList.remove('fa-pause');i.classList.add('fa-play');} else {target.play();i.classList.remove('fa-play');i.classList.add('fa-pause');}" data-akd-button><i class="fa fa-play"></i></button>
									<button id="step-forward-button" class="media-button d-flex flex-center p-4 text-lg" onclick="let target = document.querySelector('#main-video');if(target.duration < (target.currentTime + 10)){target.currentTime += 10;}" data-akd-button><i class="fa fa-fast-forward"></i></button>
						*/
						let newIndex = $current_video_id;
						if($this.id === "previous-media-button" || $this.id === "next-media-button"){
							const index = $this.id === "next-media-button" ? 1 : -1;
							newIndex = $current_video_id  + index;
							if(newIndex < 0) newIndex = _VIDEOS.length - 1;
							if(newIndex >= _VIDEOS.length) newIndex = 0;
						} else {
							// newIndex = $this.id === "admin-first-btn" ? 0 :  (_VIDEOS.length - 1);
						}
						
						let selectedMedia = _VIDEOS[newIndex], 
						src = (selectedMedia && !isEmptyObject(selectedMedia)/*&& isPlainObject(selectedMedia)*/) ? selectedMedia : null;
						
						if(src){
							$current_video_id = newIndex;
							loadVideo(src, $media);
							$("#video-title-display").text("Now Playing -> " + selectedMedia.name);
							$(".video-list .video-item").removeClass("--active");
							$(`.video-list [data-video-id="${(newIndex+1)}"]`).addClass("--active");
							console.log(selectedMedia)
						}
					});
					$("#volume-slider").on("input", function(e){
						let _vol = Number(this.value), vol = 0, ind = document.getElementById("v-ind")
						vol = _vol/100;
						$media.volume = vol;
						ind.textContent = (vol*100) + "%";
					});
					$("#seek-input").on("input", function(e){
						$media.currentTime += Number(this.value);
						//console.log($media.currentTime, this.value);
					});
					$("#playback-rate-slider").on("input", function(e){
						$media.playbackRate += Number(this.value);
						//console.log($media.currentTime, this.value);
					});
					$("#loop-button").on("input", function(e){
						$media.hasAttribute("loop") ? $media.removeAttribute("loop") : $media.setAttribute("loop", true);
					});
					
					//$(".duration-time").text(formatDuration($media.duration));
					// $("#seek-input").attr("max", m.duration);
					$media.addEventListener("loadeddata", (e) => {
						$("#seek-input").attr("max", Math.round($media.duration));
						$(".duration-time").text(formatDuration($media.duration));
						const width = $media.videoWidth;
						const height = $media.videoHeight;
						let _vol = Number($("#volume-slider").val()), vol = _vol/100, 
						src = e.target.src, 
						name = _.filename(src), size = "???", ext = _.ext(src), type = _mime_types[ext] || "???", 
						dims = `${width} x ${height}`;
						
						$media.volume = vol;
						$("[data-name]").text(name);
						$("[data-size]").text(size);
						$("[data-ext]").text(ext);
						$("[data-mime]").text(type);
						$("[data-dimensions]").text(dims);
					})
					$media.addEventListener("timeupdate", function(e){
						$(".current-time").text(formatDuration($media.currentTime));
						$("#seek-input").val($media.currentTime);
					});
					$media.addEventListener("playing", () => {
						let i = $("#playpause-button i.fa");
						if(i.hasClass("fa-play")){
							i.removeClass('fa-play').addClass('fa-pause');
						}
					});
					$media.addEventListener("pause", () => {
						let i = $("#playpause-button i.fa");
						if(i.hasClass("fa-pause")){
							i.removeClass('fa-pause').addClass('fa-play');
						}
					});
					
					function skip(duration) {$media.currentTime += duration}
					
					function loadVideo(obj, m){
						let src = obj, poster = "", newM = document.createElement("video");
						if(isObject(obj)){
							src = obj?.src || null;
							poster = obj?.poster || df_poster || "";
						}
						if(!m.paused) m.pause();
						m.poster = poster;
						m.src = src;
						m.load();
						
						/* m.onload = (e) => {
							const width = m.width || e.target.width;
							const height = m.height;
							name = _.filename(src), size = "???", ext = _.ext(src), type = _mime_types[ext] || "???";
							// imgDimensions.innerText = `Image Dimensions: ${width} x ${height} pixels`;
							$("[data-name]").text(name);
							$("[data-size]").text(size);
							$("[data-ext]").text(ext);
							$("[data-mime]").text(type);
							console.log(`2. Image Dimensions: ${width} x ${height} pixels`, e.target.videoWidth, 'video width: '+m.offsetWidth);
						};
						
						//$(".duration-time").text(formatDuration(m.duration));
						// $("#seek-input").attr("max", m.duration);
						*/

						return this;
					}
					const leadingZeroFormatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2});
					function formatDuration(time) {
						const seconds = Math.floor(time % 60);
						const minutes = Math.floor(time / 60) % 60;
						const hours = Math.floor(time / 3600);
						if(hours === 0) {
							return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
						} else {
							return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
						}
					}
				});
		}, 
		browser(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {};
			
			let $html = `<article id="browser-window" class="akd-window --has-footer --has-sidebar" data-akd-window>
				<div class="akd-window-body">
					<aside class="akd-window-sidebar left--side" data-akd-window-sidebar>
						<nav class="d-block overflow-auto">
							<ol class="browser-url-list">
							</ol>
						</nav>
						<nav class="d-block overflow-auto">
							<ol>
								<li></li>
							</ol>
						</nav>
					</aside>
					<section class="browser-screen w-12 h-12 d-block pos-rel">
						<iframe id="browser-iframe" name="browser-iframe" class="pos-rel w-12 h-12 d-block bd-0" src=""></iframe>
					</section>
				</div>
				<footer class="d-flex gap-4">
					<span class="pill-buttons d-flex gap-2 py-2 mr-auto">
						<button class="menu-button btn btn-success" data-akd-button data-akd-sidebar-toggle-button><i class="fa fa-bars"></i></button>
						<button id="browser-utility-button" class="" data-akd-button><i class="fa fa-wrench"></i></button>
					</span>
					<span class="pill-buttons d-flex flex-center gap-0 w-12 h-auto p-2 mx-auto">
						<input id="browser-url-input" class="w-12 bdr-0" type="text" value="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js" onfocus="this.select();" data-akd-input />
						<button id="browser-submit-button" class="px-8 py-5 bdr-0" data-akd-button>Go</button>
					</span>
					<span class="pill-buttons d-flex gap-2 py-2 ml-auto">
						<button id="browser-reload-button" class="" data-akd-button><i class="fa fa-arrows-rotate"></i></button>
						<button id="browser-expand-button" class="" data-akd-button><i class="fa fa-arrows"></i></button>
					</span>
				</footer>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					let urlList = $(".browser-url-list");
					$("#browser-submit-button").click(e => {
						let url = $("#browser-url-input").val(), iframe = $("#browser-iframe")
						iframe.attr("src", url);
						urlList.append(`<li><a class="browser-item" href="${url}" target="browser-iframe" data-browser-item>${url}</a></li>`);
					});
					$("#browser-reload-button").click(e => {
						let iframe = $("#browser-iframe"), url = iframe.attr("src");
						iframe.attr("src", url);
					});
				});
		}, 
		gallery(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {};
			
			let $html = `<article id="gallery-window" class="akd-window --has-header" data-akd-window>
				<header class="d-flex gap-4">
					<span class="pill-buttons d-flex gap-2 py-2 mr-auto">
						<button class="menu-button btn btn-success" data-akd-button data-akd-sidebar-toggle-button><i class="fa fa-bars"></i></button>
						<button id="-button" class="" data-akd-button><i class="fa fa-arrows-rotate"></i></button>
					</span>
					<span class="d-flex flex-center gap-0 w-12 h-auto p-2 mx-auto">
						<input id="gallery-file-input" type="file" accept="image/*" />
						<input id="gallery-url-input" class="w-12" type="text" data-akd-input />
						<button id="gallery-submit-button" class="" data-akd-button>Go</button>
					</span>
					<span class="pill-buttons d-flex gap-2 py-2 ml-auto">
						<button id="lab-button" class="" data-akd-button><i class="fa fa-flask"></i></button>
					</span>
				</header>
				<div class="akd-window-body">
					<aside class="akd-window-sidebar left--side h-12" data-akd-window-sidebar>
						<nav class="h-6 bg-opaque">
							<ul class="gallery-url-list">
								<li><a class="gallery-item" href="./_projects/postman-clone-main/index.html" target="browser-iframe" data-browser-item>postman</a></li>
								<li><a class="gallery-item" href="./_projects/" target="browser-iframe" data-browser-item>image 2</a></li>
							</ul>
						</nav>
						<nav class="d-flex flex-wrap gap-4 h-6 bg-opaque">
							<span class="d-flex flex-center flex-wrap gap-2 p-3 w-auto mr-auto">
								<button class="gallery-media-expand-btn py-5 text-lg mr-auto" onclick="let viewer = document.querySelector('#gallery-window #sourceImage'), i = this.querySelector('i.fa');;viewer.classList.toggle('image-expanded');if(viewer.classList.contains('image-expanded')){Object.assign(viewer.style, {'max-width': '100%', width: 'auto', height: '100%', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-lock');i.classList.add('fa-unlock');} else {Object.assign(viewer.style, {'max-width': 'max-content', width: 'auto', height: 'auto', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-unlock');i.classList.add('fa-lock');}"><i class="fa fa-lock"></i></button>
								<button class="gallery-media-flip-v-btn py-5 text-lg mr-auto" onclick="let img = document.querySelector('#gallery-window #sourceImage');flipImage(img, 'v');"><i class="fa fa-arrows-v"></i></button>
								<button class="gallery-media-flip-v-btn py-5 text-lg mr-auto" onclick="let img = document.querySelector('#gallery-window #sourceImage');flipImage(img, 'h');"><i class="fa fa-arrows-h"></i></button>
								<input class="p-0" type="range" min="0" max="180" step="1" value="0" oninput="let viewer = document.querySelector('#gallery-window #sourceImage');viewer.style.rotate = this.value + 'deg'" />
							</span>
							<span class="d-flex flex-center p-3 w-auto ml-auto">
								<select id="gallery-object-fit-select" class="p-4 text-md" onchange="let viewer = document.querySelector('#sourceImage');viewer.style.objectFit = this.value;" data-akd-select >
									<option value="cover">cover</option>
									<option value="contain" selected>contain</option>
									<option value="fill">fill</option>
									<option value="scale-down">scale-down</option>
									<option value="none">none</option>
								</select>
							</span>
						</nav>
					</aside>
					
					<div id=gallery-snap-container" class="snap-container x">
						<div id="gallery-app-container" class="snap-section gallery-app-container" style="z-index: 9;position: relative;/*right: 0;width: 50%;top: 1rem;*/height: calc(100% - 2rem);border: solid var(--theme-border-color);border-width: 4px 0px 4px 0px;">
							<header>
								<h2 style="color: #000;">Image Search Section</h2>
								<div class="search-bar">
									<label for="search-per-page" style="display: flex;flex-wrap: wrap;align-items: center;gap: 0.5rem;margin-left: 0.5rem;">
										<span>image per page #</span>
										<select id="search-per-page" >
											<option value="5" selected>5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
											<option value="15">15</option>
											<option value="20">20</option>
										</select>
									</label>
									<input type="text" id="searchInput" placeholder="Search for images" onfocus="this.select();" />
									<button onclick="searchImages()">Search</button>
									<label for="search-case-sensitive" style="display: flex;flex-wrap: wrap;align-items: center;gap: 0.5rem;margin-left: 0.5rem;">
										<span>case sensitive?</span>
										<input id="search-case-sensitive" type="checkbox" title="toggle case sensitivity" />
									</label>
								</div>
							</header>
							<section id="imageContainer" class="card-container animate__animated animate__fadeIn">
							</section>
							<div class="load-more">
								<button onclick="moreImgFn()">Generate More</button>
							</div>
							<div class="pagination" id="image-pagination" style="position: sticky;top: auto;bottom: 2rem;"> 
								<span class="pagination-buttons-wrapper">
									<a id="image-prev" href="#gallery-app-container">Previous</a>
									<span id="page-link-wrapper" class="page-link-wrapper">
										<a href="#" class="page-link" data-page="1">1</a> 
										<a href="#" class="page-link" data-page="2">2</a> 
										<a href="#" class="page-link" data-page="3">3</a>
									</span>
									<a id="image-next" href="#gallery-app-container">Next</a> 
								</span>
								<p id="image-page-numbers"> </p> 
							</div> 
						</div>
						
						<div id="imageModal" class="modal">
							<span class="modal-close">×</span>
							<span class="modal-previous" >&laquo;&larr;</span>
							<span class="modal-next">&rarr;&raquo;</span>
							<img id="modalImage" class="modal-content" alt="Image Preview" />
							<span id="modalControl" class="modal-controls" style="display: flex;flex-direction: column;">
								<span class="d-flex">
									<span class="control left-controls">
										<button id="modalZoomOutButton" class="modal-zoom-out" type="button">&nbsp;&minus;&nbsp;</button>
										<button id="modalZoomResetButton" class="modal-zoom-reset" type="button">[&nbsp;=&nbsp;]</button>
										<button id="modalZoomInButton" class="modal-zoom-in" type="button">&nbsp;&plus;&nbsp;</button>
									</span>
									<span class="control middle-controls d-flex flex-center flex-wrap gap-2 p-3 w-auto mr-auto">
										<button id="" class="" type="button" onclick="let mc = document.querySelector('.modal-content');mc.classList.toggle('active');if(mc.classList.contains('active')){Object.assign(mc.style, {width: '100%', maxWidth: '100%'});this.textContent = '[]';} else {Object.assign(mc.style, {width: '80%', maxWidth: '800px'});this.textContent = '[  ]';}this.classList.toggle('active');" title="">[&nbsp;&nbsp;]</button>
										<button class="modalExpand-btn py-5 text-lg mr-auto" onclick="let viewer = document.querySelector('#modalImage'), i = this.querySelector('i.fa');;viewer.classList.toggle('--image-expanded');if(viewer.classList.contains('--image-expanded')){Object.assign(viewer.style, {'max-width': '100%', width: 'auto', height: '100%', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.replace('fa-lock', 'fa-unlock');} else {Object.assign(viewer.style, {'max-width': 'max-content', width: 'auto', height: 'auto', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.replace('fa-unlock', 'fa-lock');}"><i class="fa fa-lock"></i></button>
										<button class="modalFlip-V-Button py-5 text-lg mr-auto" onclick="let img = document.querySelector('#modalImage');flipImage(img, 'v');"><i class="fa fa-arrows-v"></i></button>
										<button class="modalFlip-H-Button py-5 text-lg mr-auto" onclick="let img = document.querySelector('#modalImage');flipImage(img, 'h');"><i class="fa fa-arrows-h"></i></button>
									</span>
									<span class="control right-controls">
										<button id="" class="" type="button">{&nbsp;?&nbsp;}</button>
										<button id="" class="" type="button" onclick="document.getElementById('gallery-snap-container').scrollTo(document.getElementById('gallery-editor-section'));">{edit}</button>
										<button id="" class="" type="button" onclick="PAGE.routes.picasso({'image': document.getElementById('modalImage').src});"><i class="fa fa-palette"></i></button>
									</span>
								</span>
								<span>
									<input class="p-0" type="range" min="0" max="180" step="1" value="0" oninput="let viewer = document.querySelector('#modalImage');viewer.style.rotate = this.value + 'deg'" />
								</span>
							</span>
						</div>
						<!-- ----------------------- -->
						<section id="gallery-editor-section" class="snap-section grid-view --auto pos-rel w-12 h-12">
							<nav class="nav-wrapper d-flex flex-center gap-6 p-6 bg-success" style="background-color: var(--theme-bg-color);">
								<span class="nav-header mr-auto">Please Upload an Image to Start Editing</span>
								<span class="image-save d-flex flex-center gap-4 ml-auto">
									<button id="edit-mode-toggle-button" class="btn btn-flat blue white-text btn-purple text-white">Edit?</button>
									<button id="save-image-button" class="btn btn-flat blue white-text btn-blue text-white">Save</button>
									<button id="reset-image-button" class="btn btn-flat red white-text btn-danger text-white">Reset</button>
								</span>
							</nav>
							
							<section id="" class="image-container h-12">
								<div id="imagePreview" class="image-preview h-8">
									<img id="sourceImage" class="d-block" loading="lazy" />
									<canvas id="canvas" height="0"></canvas>
								</div>
							
							    <div class="controls-container flex-col h-4 overflow-auto" style="border-top: 2px solid #777;">
									<div class="file-controls w-12 h-max mb-auto mt-0">
										<span>File Controls</span>
										<a id="link"></a>
										<hr />
										<div class="file-field input-field w-12 gap-4">
											<label for="gallery-file-input2" class="d-flex gap-4 btn btn-success w-4">
												<span>Upload Image</span>
												<i class="fa fa-upload"></i>
												<input class="visually-hidden" id="gallery-file-input2" type="file" accept="image/*" onclick="alert('help');" onchange="uploadImage(event)" />
											</label>
											<div class="file-path-wrapper w-12">
												<input id="gallery-file-path" class="file-path w-12" type="text" />
											</div>
										</div>
									</div>
									
									<div class="image-controls w-12 h-max overflow-auto">
										<span class="nav-header mr-auto">Image Filters Controls</span>
							            <div class="row w-12">
							                <div class="col s6 w-6">
							                    <span class="range-field">
							                        <label for="brightnessSlider">Brightness</label>
							                        <input id="brightnessSlider" class="akd-input" type="range" value="100" min="0" max="300" />
							                    </span>
							                </div>
							                <div class="col s6 w-6">
							                    <span class="range-field">
							                        <label for="contrastSlider">Contrast</label>
							                        <input id="contrastSlider" type="range" value="100" min="0" max="200" />
							                    </span>
							                </div>
										</div>
										
							            <div class="row w-12">
							                <div class="col s6 w-6">
							                    <span class="range-field">
							                        <label for="grayscaleSlider">Grayscale</label>
							                        <input id="grayscaleSlider" type="range" value="0" min="0" max="100" />
							                    </span>
							                </div>
							                <div class="col s6 w-6">
							                    <span class="range-field">
							                        <label for="saturationSlider">Saturation</label>
							                        <input id="saturationSlider" type="range" value="100" min="0" max="300" />
							                    </span>
							                </div>
							            </div>
						
							            <div class="row w-12">
							                <div class="col s6 w-6">
							                    <span class="range-field">
							                        <label for="sepiaSlider">Sepia</label>
							                        <input id="sepiaSlider" type="range" value="0" min="0" max="200" />
							                    </span>
							                </div>
							                <div class="col s6 w-6">
							                    <span class="range-field">
							                        <label for="hueRotateSlider">Hue</label>
							                        <input id="hueRotateSlider" type="range" value="0" min="0" max="360" />
							                    </span>
							                </div>
										 </div>
						            
							            <div class="row controls d-flex p-8 gap-8 pos-sti w-12 ">
											<span class="d-flex align-center gap-4 p-8">
												<button id="zoom-in-button" class="btn btn-purple" type="button">[&nbsp;+&nbsp;]</button>
												<button id="zoom-out-button" class="btn btn-purple" type="button">[&nbsp;-&nbsp;]</button>
											</span>
											<span class="">
												<select id="object-fit-select" class="btn btn-success" onchange="sourceImage.style.objectFit = this.value;">
													<option value="cover">cover</option>
													<option value="contain" selected>contain</option>
													<option value="fill">fill</option>
													<option value="scale-down">scale-down</option>
													<option value="none">none</option>
												</select>
											</span>
										</div>
									</div>
									
							        <div class="preset-filters w-12">
							            <h6>Preset Filters</h6>
							            <button id="brighten-filter-button" class="btn green btn-success">Brighten</button>
							            <button id="bw-filter-button" class="btn green btn-success">Black and White</button>
							            <button id="funky-filter-button" class="btn green btn-success">Funky</button>
							            <button id="vintage-filter-button" class="btn green btn-success">Vintage</button>
							        </div>
						    	</div>
							</section>
						</section>
					</div>
				</div>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					let image = document.getElementById('sourceImage');
					let canvas = document.getElementById('canvas');
					let context = canvas.getContext('2d');
					// Get all the sliders of the image
					let brightnessSlider = document.getElementById("brightnessSlider");
					let contrastSlider = document.getElementById("contrastSlider");
					let grayscaleSlider = document.getElementById("grayscaleSlider");
					let hueRotateSlider = document.getElementById("hueRotateSlider");
					let saturateSlider = document.getElementById("saturationSlider");
					let sepiaSlider = document.getElementById("sepiaSlider");
					
					function uploadImage(event) {
						// Set the source of the image from the uploaded file
						let burl = URL.createObjectURL(event.target.files[0]);
						image.src = burl;
						image.onload = function () {
							// Set the canvas the same width and height of the image
							canvas.width = this.width;
							canvas.height = this.height;
							canvas.crossOrigin = "anonymous";
							applyFilter();
							URL.revokeObjectURL(burl);
						};
						
						// Show the image editor controls and hide the help text
						// document.querySelector('.help-text').style.display = "none";
						document.querySelector('.image-save').style.display = "block";
						document.querySelector('.image-controls').style.display = "block";
						document.querySelector('.preset-filters').style.display = "block";
					};
		
					function applyFilter() {
						// Create a string that will contain all the filters
						// to be used for the image
						let filterString = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%) grayscale(${grayscaleSlider.value}%) saturate(${saturateSlider.value}%) sepia(${sepiaSlider.value}%) hue-rotate(${hueRotateSlider.value}deg)`;
						
						// Apply the filter to the image
						context.filter = filterString;
						
						// Draw the edited image to canvas
						// context.drawImage(image, 0, 0);
						draw(filterString);
						image.style.filter = filterString;
					}
					
					function brightenFilter() {
						resetImage();
						brightnessSlider.value = 130;
						contrastSlider.value = 120;
						saturateSlider.value = 120;
						applyFilter();
					}
						
					function bwFilter() {
						resetImage();
						grayscaleSlider.value = 100;
						brightnessSlider.value = 120;
						contrastSlider.value = 120;
						applyFilter();
					}
		
					function funkyFilter() {
						resetImage();
						// Set a random hue rotation everytime
						hueRotateSlider.value = Math.floor(Math.random() * 360) + 1;
						contrastSlider.value = 120;
						applyFilter();
					}
					
					function vintageFilter() {
						resetImage();
						brightnessSlider.value = 120;
						saturateSlider.value = 120;
						sepiaSlider.value = 150;
						applyFilter();
					}
					// Reset all the slider values to there default values
					function resetImage() {
						brightnessSlider.value = 100;
						contrastSlider.value = 100;
						grayscaleSlider.value = 0;
						hueRotateSlider.value = 0;
						saturateSlider.value = 100;
						sepiaSlider.value = 0;
						applyFilter();
					}
					
					function saveImage() {
						// Select the temporary element we have created for
						// helping to save the image
						let linkElement = document.getElementById('link');
						linkElement.setAttribute('download', 'edited_image.png');
						
						// Convert the canvas data to a image data URL
						let canvasData = canvas.toDataURL("image/png")
						
						// Replace it with a stream so that
						// it starts downloading
						canvasData.replace("image/png", "image/octet-stream")
						
						// Set the location href to the canvas data
						linkElement.setAttribute('href', canvasData);
						
						// Click on the link to start the download 
						linkElement.click();
					}
					
					
					let cameraZoom = 1,  cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 };
					let MAX_ZOOM = 10,  MIN_ZOOM = 0.1,  SCROLL_SENSITIVITY = 0.0005;
					
					function draw(filterString){
						canvas.width = window.innerWidth
						canvas.height = window.innerHeight
						
						context.save();
						
						// Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
						context.translate( window.innerWidth / 2, window.innerHeight / 2 )
						context.scale(cameraZoom, cameraZoom)
						context.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y )
						
						context.filter = filterString;
						drawImage(image, 0, 0);
						
						context.restore();
						
						requestAnimationFrame(function(){draw(filterString)})
					}
					
					// Gets the relevant location from a mouse or single touch event
					function getEventLocation(e){
						if (e.touches && e.touches.length == 1){
							return { x:e.touches[0].clientX, y: e.touches[0].clientY }
						} else if (e.clientX && e.clientY) {
							return { x: e.clientX, y: e.clientY }        
						}
					}
		
					function drawImage(img, x, y, width, height){
						(width && height ) ? context.drawImage(img, x, y, width, height) : context.drawImage(img, x, y);
					}
					
					function drawRect(x, y, width, height){
						context.fillRect( x, y, width, height )
					}
					
					function drawText(text, x, y, size, font){
						context.font = `${size}px ${font}`
						context.fillText(text, x, y)
					}
					
					let isDragging = false
					let dragStart = { x: 0, y: 0 }
			
					function onPointerDown(e){
						isDragging = true
						dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
						dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
					}
					
					function onPointerUp(e){
						isDragging = false
						initialPinchDistance = null
						lastZoom = cameraZoom
					}
					
					function onPointerMove(e){
						if (isDragging){
							cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
							cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
						}
					}
					
					function handleTouch(e, singleTouchHandler){
						if ( e.touches.length == 1 ){
							singleTouchHandler(e)
						} else if (e.type == "touchmove" && e.touches.length == 2){
							isDragging = false
							handlePinch(e)
						}
					}
					
					let initialPinchDistance = null
					let lastZoom = cameraZoom
					
					function handlePinch(e){
						e.preventDefault()
						
						let touch1 = {x: e.touches[0].clientX, y: e.touches[0].clientY}
						let touch2 = {x: e.touches[1].clientX, y: e.touches[1].clientY}
						
						// This is distance squared, but no need for an expensive sqrt as it's only used in ratio
						let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2
						
						if (initialPinchDistance == null){
							initialPinchDistance = currentDistance
						} else {
							adjustZoom(null, currentDistance/initialPinchDistance);
						}
					}
					
					function adjustZoom(zoomAmount, zoomFactor){
						if(!isDragging){
							if(zoomAmount){
								cameraZoom += zoomAmount
							} else if(zoomFactor){
								//console.log(zoomFactor)
								cameraZoom = zoomFactor*lastZoom;
							}
							
							cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
							cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
							//console.log(zoomAmount)
						}
					}
					
					let in_editor_mode = true;
					function toggleEditMode(e){
						let img = sourceImage, cnv = canvas, target = e?.target || null;
						if(in_editor_mode === true){
							cnv.style.display = "block";
							img.style.display = "none";
							if(target) target.textContent = "Editing";
							in_editor_mode = false;
						} else {
							img.style.display = "block";
							cnv.style.display = "none";
							if(target) target.textContent = "Edit?";
							in_editor_mode = true;
						}
					}
					
					document.getElementById("gallery-window").addEventListener("click", (e) => {
						//e.preventDefault();
						let target = e.target;
						if(!target) return;
						
						/*if(target.id === "edit-mode-toggle-button"){
							toggleEditMode(e);
						} else if(target.id === "save-image-button"){
							saveImage();
						} else if(target.id === "reset-image-button"){
							resetImage();
						} else */if(target.id === "brighten-filter-button"){
							brightenFilter();
						} else if(target.id === "bw-filter-button"){
							bwFilter();
						} else if(target.id === "funky-filter-button"){
							funkyFilter();
						} else if(target.id === "vintage-filter-button"){
							vintageFilter();
						} else if(target.id === "edit-mode-toggle-button"){
							toggleEditMode();
						} else if(target.id === "save-image-button"){
							saveImage();
						} else if(target.id === "reset-image-button"){
							resetImage();
						} else if((target.id === "zoom-in" || target.id === "zoom-out") && cameraZoom >= MIN_ZOOM && cameraZoom <= MAX_ZOOM){
							if(target.id === "zoom-in"){
								cameraZoom *= 1.1;
							}
							if(target.id === "zoom-out"){
								cameraZoom /= 1.1;
							}
							draw();
						}
					});
					
					canvas.addEventListener('mousedown', onPointerDown)
					canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
					canvas.addEventListener('mouseup', onPointerUp)
					canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
					canvas.addEventListener('mousemove', onPointerMove)
					canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
					canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))
					
					image.addEventListener('mousedown', onPointerDown)
					image.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
					image.addEventListener('mouseup', onPointerUp)
					image.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
					image.addEventListener('mousemove', onPointerMove)
					image.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
					image.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))
					
					document.getElementById("gallery-window").addEventListener("change", (e) => {
						//e.preventDefault();
						let target = e.target;
						if(!target) return;
						
						if(target.id === "gallery-file-input"){
							uploadImage(e)
						}
						if(target.id === "search-per-page"){
							let val = target.value;
							paginator({
								per_page: val, 
								parent_container: "gallery-app-container",
								pagination_container: "image-pagination", 
								pagenumbers_container: "image-page-numbers", 
								prev_button: "image-prev", next_button: "image-next", 
								// pagelink_button: "",  //pagination_item: "", 
							});
						}
					});
					document.getElementById("gallery-window").addEventListener("input", (e) => {
						//e.preventDefault();
						let target = e.target;
						if(!target) return;
						
						if(inArray(target.id, "brightnessSlider,contrastSlider,grayscaleSlider,saturationSlider,sepiaSlider,hueRotateSlider".split(","))){
							applyFilter(e);
						}
					});
					/* ------------------------------------------------------------- */
					/*
					var $allImages = [];
					var $promise = getJsonFile("./data/site.json")
						.then(res => {
							$allImages = [...res.gallery.images]
							//console.log(res, $allImages)
							return $allImages;
						})
						.catch(er=>console.log(er))
					*/
					const apiKey = "API_KEY";
					let page = 1, limit = 10, 
					$per_page = document.getElementById("search-per-page")?.value.trim()??5;
					// $per_page = Number($per_page);
					
					function searchImages(_url=null) {
						let imgName = document.getElementById("searchInput").value.trim();
						/* if(!imgName) {
							alert("Please enter a search query.");
							return;
						} */
						const url = _url || `./data/_json/site.json`;
						fetch(url)
							.then(response => response.json())
							.then(data => {
								if(data.gallery.images.length === 0/*data.results.length === 0*/) {
									alert("No images found for the given search query.");
								} else {
									let images = data.gallery.images, isCaseSensitive = document.getElementById("search-case-sensitive").checked === true, found = [], tagText = "";
									if(imgName && imgName.length > 2) {
										images.forEach(function(item, i){
											if(isCaseSensitive){
												if((tagText = item?.src) && (tagText.indexOf(imgName) > -1 || tagText.includes(imgName))) {
													found.push(item);
												} else if((tagText = item?.alt) && (tagText.indexOf(imgName) > -1 || tagText.includes(imgName))) {
													found.push(item);
												}
											} else {
												imgName = imgName.toLowerCase();
												if((tagText = item?.src.toLowerCase()) && (tagText.indexOf(imgName) > -1 || tagText.includes(imgName))) {
													found.push(item);
												} else if((tagText = item?.alt.toLowerCase()) && (tagText.indexOf(imgName) > -1 || tagText.includes(imgName))) {
													found.push(item);
												}
											}
										});
										
										if(Array.isArray(found) && found.length > 0){
											images = found;
										}
									}
									showImgFn(images/*data.results*/);
								}
							})
							.catch(error => console.error('Error fetching images:', error));
					}
					function showImgFn(images) {
						const imageContainer = document.getElementById("imageContainer");
						const $path = "./.img/";
					
						imageContainer.innerHTML = "";
						images.forEach((image, i) => {
							// if(image.ext !== "gif" /*&& i < limit*/){
								const card = document.createElement("div");
								card.classList.add("card");
								const img = Object.assign(document.createElement("img"), {
									className: "card-image", 
									src: $path + image.src/*image.urls.regular*/, 
									//style: `background-image: url('${$path}${image.src}');`, 
									alt: image?.alt??"Image", 
									onclick: function () { 
										preImgFn($path + image.src/*image.urls.full*/); 
									}
								});
						
								card.appendChild(img);
								imageContainer.appendChild(card);
							// }
						});
						
						paginator({
							per_page: $per_page, parent_container: "gallery-app-container",
							pagination_container: "image-pagination", 
							pagenumbers_container: "image-page-numbers", 
							prev_button: "image-prev", 
							next_button: "image-next", 
							// pagelink_button: "", 
							//pagination_item: "", 
						});
					}
					function moreImgFn() {
						page++;
						searchImages();
					}
					function preImgFn(imageUrl) {
						const m = document.getElementById("imageModal");
						const mImg = document.getElementById("modalImage");
						m.style.display = "flex";
						mImg.src = imageUrl;
						mImg.onload = function () {
							// mImg.onload = null;
						};
					}
					function closePreFn() {
						const modal = document.getElementById("imageModal");
						modal.style.display = "none";
					}
					// document.getElementById("searchInput").value = "Computer";
					searchImages();
					 
					function paginator(params){
						// const {cardsPerPage: per_page, parent_container} = params
						const cardsPerPage = Number(params?.per_page ?? 4); // Number of cards to show per page 
						const dataContainer = document.getElementById(params?.parent_container ?? "data-container"); 
						const pagination = document.getElementById(params?.pagination_container ?? "pagination"); 
						const prevButton = document.getElementById(params?.prev_button ?? "prev"); 
						const nextButton = document.getElementById(params?.next_button ?? "next"); 
						const pageNumbers = document.getElementById(params?.pagenumbers_container ?? "page-numbers"); 
						const pageLinksWrapper = document.getElementById(params?.pagelinks_wrapper ?? "page-link-wrapper"); 
						let pageLinks = dataContainer.querySelectorAll(params?.pagelink_button ?? ".page-link"); 
							
						const cards = Array.from(dataContainer.getElementsByClassName(params?.pagination_item ?? "card")); 
						
						// Calculate the total number of pages 
						const totalPages = Math.ceil(cards.length / cardsPerPage); 
						let currentPage = 1; 
						
						// Function to display cards for a specific page 
						function displayPage(page) { 
							const startIndex = (page - 1) * cardsPerPage; 
							const endIndex = startIndex + cardsPerPage; 
							cards.forEach((card, index) => { 
								if (index >= startIndex && index < endIndex) { 
									card.style.display = 'flex'; 
									card.classList.add("paged");
								} else { 
									card.style.display = 'none'; 
									card.classList.remove("paged")
								} 
							}); 
						} 
						
						// Function to update pagination buttons and page numbers 
						function updatePagination() {
							let frag = document.createDocumentFragment();
							let pLinks = [];
							for(let i =0;i < totalPages;i++){
								let link = Object.assign(document.createElement("a"), {
									href: "#", 
									className: "page-link", 
									textContent: (i + 1)
								});
								link.dataset.page = (i + 1);
								//pLinks.push(link);
								frag.appendChild(link);
							}
							pageLinksWrapper.innerHTML = "";
							pageLinksWrapper.appendChild(frag);
							pageLinks = dataContainer.querySelectorAll(params?.pagelink_button ?? ".page-link"); 
							
							pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`; 
							prevButton.disabled = currentPage === 1; 
							nextButton.disabled = currentPage === totalPages;
							
							pageLinks.forEach((link) => { 
								const page = parseInt(link.getAttribute("data-page")); 
								link.classList.toggle('active', page === currentPage); 
							
								link.addEventListener('click', (e) => { 
									e.preventDefault(); 
									const page = parseInt(link.getAttribute('data-page')); 
									if (page !== currentPage) { 
										currentPage = page; 
										displayPage(currentPage); 
										updatePagination();
										slideShow(".card.paged img");
									} 
								}); 
							}); 
						} 
						
						// Event listener for "Previous" button 
						prevButton.addEventListener("click", () => { 
							if(currentPage > 1) { 
								currentPage--; 
								displayPage(currentPage); 
								updatePagination(); 
								slideShow(".card.paged img");
							} 
						}); 
						
						// Event listener for "Next" button 
						nextButton.addEventListener('click', () => { 
							if(currentPage < totalPages) { 
								currentPage++; 
								displayPage(currentPage); 
								updatePagination(); 
								slideShow(".card.paged img");
							} 
						}); 
						
						// Event listener for page number buttons 
						/*pageLinks.forEach((link) => { 
							link.addEventListener('click', (e) => { 
								e.preventDefault(); 
								const page = parseInt(link.getAttribute('data-page')); 
								if (page !== currentPage) { 
									currentPage = page; 
									displayPage(currentPage); 
									updatePagination(); 
								} 
							}); 
						}); */
						
						// Initial page load 
						displayPage(currentPage); 
						updatePagination();
						slideShow(".card.paged img");
					}
					function slideShow(sSel, nSel, pSel, cSel, is_image = true){
						let sliderImages = Array.from(document.querySelectorAll(sSel || ".slide")),
						arrowLeft = document.querySelector(pSel || ".modal-previous"),
						arrowRight = document.querySelector(nSel || ".modal-next"),
						closeButton = document.querySelector(cSel || ".modal-close"), 
						current = 0, currentSrc = "";
						
						/*sliderImages.filter((s, i)=>{
							if(s.src && s.src === document.getElementById("modalImage").src) current = i;
						});
						console.log(current)*/
						// Clear all images
						function reset() {
							for (let i = 0; i < sliderImages.length; i++) {
								sliderImages[i].style.display = "none";
							}
						}
						
						// Initial slide
						function startSlide() {
							if(is_image === true){
								currentSrc = sliderImages[0]?.src??"";
								preImgFn(currentSrc);
							} else {
								reset();
								sliderImages[0].style.display = "block";
							}
						}
						
						// Show previous
						function slideLeft() {
							if(is_image === true){
								currentSrc = sliderImages[current - 1]?.src??"";
								preImgFn(currentSrc);
							} else {
								reset();
								sliderImages[current - 1].style.display = "block";
							}
							current--;
						}
						
						// Show next
						function slideRight() {
							if(is_image === true){
								currentSrc = sliderImages[current + 1]?.src??"";
								preImgFn(currentSrc);
							} else {
								reset();
								sliderImages[current + 1].style.display = "block";
							}
							current++;
						}
						
						// Left arrow click
						arrowLeft.addEventListener("click", function () {
							if(current === 0) {
								current = sliderImages.length;
							}
							slideLeft();
						});
						
						// Right arrow click
						arrowRight.addEventListener("click", function () {
							if(current === sliderImages.length - 1) {
								current = -1;
							}
							slideRight();
						});
						
						//startSlide();
						// Event listener for "Close" button 
						closeButton.addEventListener('click', () => { 
							closePreFn();
						}); 
					}
					
					function nextModalImage(){}
					function previousModalImage(){}
					// console.log($per_page);
					paginator({per_page: $per_page});
				});
		}, 
		picasso(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {};
			
			let $html = `<article id="picasso-window" class="akd-window --has-footer" data-akd-window>
				<div class="akd-window-body">
					<div class="drawing-app-container pos-rel w-12 h-12">
						<aside class="tools-board">
							<div class="row">
								<label for="" class="title"><strong>Tools</strong></label>
								<ul class="options">
									<li class="option tool" id="pencil">
										<i class="fas fa-pencil" id="icon"></i>
										<span>Pencil</span>
									</li>
									<li class="option active tool" id="brush">
										<i class="fas fa-brush" id="icon"></i>
										<span>Brush</span>
									</li>
									<li class="option tool" id="eraser">
										<i class="fas fa-eraser" id="icon"></i>
										<span>Eraser</span>
									</li>
									<li class="option">
										<input type="range" id="size-slider" min="1" max="30" value="5">
									</li>
								</ul>
							</div>
							<div class="row colors">
								<label for="" class="title">Colors</label>
								<ul class="options">
									<li class="option"></li>
									<li class="option selected"></li>
									<li class="option"></li>
									<li class="option"></li>
									<li class="option">
										<input type="color" value="#00FF00" name="" id="color-picker">
									</li>
								</ul>
							</div>
							
							<div class="row">
								<label for="" class="title"> <strong>Shapes</strong></label>
								<ul class="options">
									<li class="option tool" id="rectangle">
										<i class="fa-solid fa-dice-one"></i>
										<span>Rectangle</span>
									</li>
									<li class="option tool" id="circle">
										<i class="fa-regular fa-circle"></i>
										<span>Circle</span>
									</li>
									<li class="option tool" id="triangle">
										<i class="fa-solid fa-mountain"></i>
										<span>Triangle</span>
									</li>
									<li class="option tool" id="square">
										<i class="far fa-square"></i>
										<span>Square</span>
									</li>
									<li class="option tool" id="hexagon">
										<i class="fa-solid fa-cube"></i>
										<span>Hexagon</span>
									</li>
									<li class="option tool" id="pentagon">
										<i class="fa-solid fa-dice-d6"></i>
										<span>Pentagon</span>
									</li>
									<li class="option tool" id="line">
										<i class="fa-solid fa-grip-lines"></i>
										<span>Line</span>
									</li>
									<li class="option tool" id="arrow">
										<i class="fa-solid fa-arrow-up"></i>
										<span>Arrow</span>
									</li>
									<li class="option">
										<input type="checkbox" id="fill-color">
										<label for="fill-color"> Fill Color</label>
									</li>
								</ul>
							</div>
							<div class="row buttons">
								<button class="clear-canvas">Clear Canvas</button>
								<button class="save-img">Save As Image</button>
							</div>
						</aside>
						
						<section class="drawing-board w-12 h-12">
							<canvas style="border: 2px solid #f00;"></canvas>
						</section>
					</div>
				</div>
				<footer class="d-flex gap-4">
					<span class="pill-buttons d-flex gap-2 px-2 mr-auto">
						<button class="menu-button btn btn-success" onclick="document.querySelector('.tools-board').classList.toggle('--active');" data-akd-button data-akd-sidebar-toggle-button><i class="fa fa-bars"></i></button>
						<button id="browser-utility-button" class="" data-akd-button><i class="fa fa-wrench"></i></button>
					</span>
					<span class="d-flex flex-center gap-0 w-12 h-auto p-2 mx-auto">
						<input id="browser-url-input" class="w-12 bdr-0" type="text" value="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js" onfocus="this.select();" data-akd-input />
						<button id="browser-submit-button" class="px-8 py-5 bdr-0" data-akd-button>Go</button>
					</span>
					<span class="pill-buttons d-flex gap-2 py-2 ml-auto">
						<button id="browser-reload-button" class="" data-akd-button><i class="fa fa-arrows-rotate"></i></button>
						<button id="browser-expand-button" class="" data-akd-button><i class="fa fa-arrows"></i></button>
					</span>
				</footer>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					let hasDocument = ('undefined' !== typeof document), hasWindow = ('undefined' !== typeof window), nonce = Date.now();
					let isTouch = hasDocument && document.ontouchstart ? true : false;
					isTouch = true;
					const clickEvent = isTouch === true ? 'touchstart' : 'click';
					//console.log(isTouch, clickEvent)
					
					const toolBtns = document.querySelectorAll(".tool"),
					fillColor = document.querySelector("#fill-color"),
					sizeSlider = document.querySelector("#size-slider"),
					colorBtns = document.querySelectorAll(".colors .option"),
					colorPicker = document.querySelector("#color-picker"),
					cleatCanvas = document.querySelector(".clear-canvas"),
					saveImage =  document.querySelector(".save-img"), 
					drawingBoard = document.querySelector(".drawing-board"),
					canvas = document.querySelector("canvas"),
					ctx = canvas.getContext("2d");
					
					//global variabels wiht default values
					let prevMouseX, prevMouseY, snapshot,
						isDrawing = false,
						selectedTool = "brush",
						brushWidth = 5,
						selectedColor = "#000";
		
					const setCanvasBackground = () => {
						ctx.fillStyle = "#fff";
						ctx.fillRect(0, 0, canvas.width, canvas.height);
						ctx.fillStyle = selectedColor;
					}
					
					//window.addEventListener("load", () => {
						// Setting canvas widht/height.. 
						// offsetwidht/height returns 
						// viewbale widht/height of an element
						
						canvas.width = ((drawingBoard.offsetWidth || canvas.parentElement.offsetWidth || canvas.offsetWidth) - 6);
						canvas.height = (!drawingBoard.offsetHeight || canvas.parentElement.offsetHeight || canvas.offsetHeight - 12);
						// canvas.width = 350;
						// canvas.height = 450;
						setCanvasBackground();
					//});
					
					const drawRect = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						// If fillColor isn't checked draw a react wiht 
						// border else draw rect wiht backgorund
						if(!fillColor.checked) {
						    const width = prevMouseX - e.offsetX;
						    const height = prevMouseY - e.offsetY;
						    return ctx.strokeRect(e.offsetX, e.offsetY,
						    width, height);
					    }
						const width = prevMouseX - e.offsetX;
						const height = prevMouseY - e.offsetY;
						ctx.fillRect(e.offsetX, e.offsetY, width, height);
					}
					
					const drawCircle = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						ctx.beginPath();
						let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
						ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
						fillColor.checked ? ctx.fill() : ctx.stroke();
					}
					
					const drawTriangle = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						ctx.beginPath(); 
						ctx.moveTo(prevMouseX, prevMouseY);
						ctx.lineTo(e.offsetX, e.offsetY); 
						ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); 
						ctx.closePath(); 
						fillColor.checked ? ctx.fill() : ctx.stroke();
					}
					
					// Function to draw a square
					const drawSquare = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						const sideLength = Math.abs(prevMouseX - e.offsetX);
						ctx.beginPath();
						ctx.rect(e.offsetX, e.offsetY, sideLength, sideLength);
						fillColor.checked ? ctx.fill() : ctx.stroke();
					}
			
					// Function to draw a hexagon
					const drawHexagon = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						const sideLength = Math.abs(prevMouseX - e.offsetX);
						ctx.beginPath();
						for (let i = 0; i < 6; i++) {
							const angle = (2 * Math.PI / 6) * i;
							const x = e.offsetX + sideLength * Math.cos(angle);
							const y = e.offsetY + sideLength * Math.sin(angle);
							ctx.lineTo(x, y);
						}
						ctx.closePath();
						fillColor.checked ? ctx.fill() : ctx.stroke();
					}
			
					// Function to draw a pentagon
					const drawPentagon = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						const sideLength = Math.abs(prevMouseX - e.offsetX);
						ctx.beginPath();
						for (let i = 0; i < 5; i++) {
							const angle = (2 * Math.PI / 5) * i - Math.PI / 2;
							const x = e.offsetX + sideLength * Math.cos(angle);
							const y = e.offsetY + sideLength * Math.sin(angle);
							ctx.lineTo(x, y);
						}
						ctx.closePath();
						fillColor.checked ? ctx.fill() : ctx.stroke();
					}
					
					const drawLine = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						ctx.beginPath();
						ctx.moveTo(prevMouseX, prevMouseY);
						ctx.lineTo(e.offsetX, e.offsetY);
						ctx.stroke();
					}
					
					const drawArrow = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						const headLength = 10;
						const angle = Math.atan2(e.offsetY - prevMouseY, e.offsetX - prevMouseX);
						ctx.beginPath();
						ctx.moveTo(prevMouseX, prevMouseY);
						ctx.lineTo(e.offsetX, e.offsetY);
						ctx.stroke();
						
						// Draw arrowhead
						ctx.beginPath();
						ctx.moveTo(e.offsetX - headLength * Math.cos(angle - Math.PI / 6), e.offsetY - headLength * Math.sin(angle - Math.PI / 6));
						ctx.lineTo(e.offsetX, e.offsetY);
						ctx.lineTo(e.offsetX - headLength * Math.cos(angle + Math.PI / 6), e.offsetY - headLength * Math.sin(angle + Math.PI / 6));
						ctx.closePath();
						ctx.fill();
					}
					
					const startDraw = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						if(isTouch === true && e.touches) {
							e = e.touches[0];
							e.offsetX = e.offsetX || e.pageX;
							e.offsetY = e.offsetY || e.pageY;
						}
						isDrawing = true;
						prevMouseX = e.offsetX; 
						prevMouseY = e.offsetY;
						ctx.beginPath();
						ctx.lineWidth = brushWidth;
						ctx.strokeStyle = selectedColor;
						ctx.fillStyle = selectedColor;
						snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
						//console.log(prevMouseX, prevMouseY, e)
					}
					
					const drawPencil = (e) => {
						// e = isTouch === true ? e.touches[0] : e;
						ctx.lineTo(e.offsetX, e.offsetY);
						ctx.stroke();
					}
					
					const drawing = (e) => {
						//e = isTouch === true ? e.touches[0] : e;
						if(isTouch === true && e.touches) {
							e = e.touches[0];
							e.offsetX = e.offsetX || e.pageX;
							e.offsetY = e.offsetY || e.pageY;
						}
						if(!isDrawing) return;
						ctx.putImageData(snapshot, 0, 0);
						
						if (selectedTool === "brush" && selectedTool === "pencil" || selectedTool === "eraser") {
							ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
							ctx.lineTo(e.offsetX, e.offsetY);
							ctx.stroke();
						} else if (selectedTool === "rectangle") {
							drawRect(e);
						} else if (selectedTool === "circle") {
							drawCircle(e);
						} else if (selectedTool === "triangle") {
							drawTriangle(e);
						} else if (selectedTool === "square") {
							drawSquare(e);
						} else if (selectedTool === "hexagon") {
							drawHexagon(e);
						} else if (selectedTool === "pentagon") {
							drawPentagon(e);
						} else if (selectedTool === "line") {
							drawLine(e);
						} else if (selectedTool === "arrow") {
							drawArrow(e);
						} else if (selectedTool === "curve") {
							drawCurve(e);
						} else {
							drawPencil(e);
						}
						// console.log(prevMouseX, prevMouseY)
					}
					
					toolBtns.forEach(btn => {
						btn.addEventListener("click", () => {
							document.querySelector(".options .active").classList.remove("active");
							btn.classList.add("active");
							selectedTool = btn.id;
							console.log(selectedTool);
						});
					});
					
					sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);
					
					colorBtns.forEach(btn => {
						btn.addEventListener("click", () => {
							document.querySelector(".options .selected").classList.remove("selected");
							btn.classList.add("selected");
							selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
						});
					});
					
					colorPicker.addEventListener("change", () => {
						colorPicker.parentElement.style.background = colorPicker.value;
						colorPicker.parentElement.click();
					});
						
					cleatCanvas.addEventListener("click", () => {
						ctx.clearRect(0, 0, canvas.width, canvas.height)
						setCanvasBackground();
					});
						
					saveImage.addEventListener("click", () => {
						const link = document.createElement("a");
						link.download = `${Date.now()}`.jpg;
						link.href = canvas.toDataURL();
						link.click();
					});
						
					canvas.addEventListener("mousedown", startDraw);
					canvas.addEventListener("mousemove", drawing);
					canvas.addEventListener("mouseup", () => isDrawing = false);
					
					canvas.addEventListener("touchstart", startDraw);
					canvas.addEventListener("touchmove", drawing);
					canvas.addEventListener("touchend", () => isDrawing = false);
					
					document.body.addEventListener("dblclick", function(e){
						document.querySelector(".tools-board").classList.toggle("--active");
					});
					/*let urlList = $(".browser-url-list");
					$("#browser-submit-button").click(e => {
						let url = $("#browser-url-input").val(), iframe = $("#browser-iframe")
						iframe.attr("src", url);
						urlList.append(`<li><a class="browser-item" href="${url}" target="browser-iframe" data-browser-item>${url}</a></li>`);
					});
					$("#browser-reload-button").click(e => {
						let iframe = $("#browser-iframe"), url = iframe.attr("src");
						iframe.attr("src", url);
					});*/
				});
		}, 
		generators(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {};
			
			let $html = `<article id="generators-window" class="akd-window --has-footer --has-sidebar" data-akd-window>
				<div class="akd-window-body">
					<aside class="akd-window-sidebar left--side" data-akd-window-sidebar>
						<nav class="d-block overflow-auto">
							<ol class="generators-url-list">
							</ol>
						</nav>
						<nav class="d-block overflow-auto">
							<ol>
								<li></li>
							</ol>
						</nav>
					</aside>
					<section class="snap-container w-12 h-12 d-block pos-rel">
						<div class="snap-section pos-rel w-12 h-12 d-flex flex-center">
							<div class="glassmorphism-generator">
								<span class="snap-section-title">Glassmorphism Generator</span>
								<section class="glassmorphism-generator-preview-section">
									<div class="glassmorphism-generator-preview-container">
										<div class="glass-card">
											<h3>Glassmorphism Effect</h3>
											<p>This is how your glassmorphism element will look with the current settings.</p>
										</div>
									</div>
								</section>
								<section class="glassmorphism-generator-settings-container glass-card">
									<div class="glassmorphism-generator-settings d-flex flex-center gap-4">
										<label for="colorPicker">Color:</label>
										<input type="color" id="colorPicker" class="color-picker" value="#fef5ee" />
									</div>
									<div class="glassmorphism-generator-settings d-flex flex-center gap-4">
										<label for="opacity" class="slider-label">Opacity:</label>
										<input type="range" id="opacity" class="glassmorphism-generator-slider w-12 p-0" min="0" max="1" step="0.01" value="0.2" />
									</div>
									<div class="glassmorphism-generator-settings d-flex flex-center gap-4">
										<label for="blur" class="slider-label">Blur:</label>
										<input type="range" id="blur" class="glassmorphism-generator-slider w-12 p-0" min="0" max="20" step="0.5" value="5" />
									</div>
								</section>
								<div class="code-card">
									<pre><code  id="glassmorphism-generator-output" class="ws-pre"></code></pre>
								</div>
								<button id="copyCssButton" class="copy-css">Copy CSS</button>
							</div>
						</div>
						
						<div id="" class="snap-section pos-rel w-12 h-12 d-flex flex-center">
							<div class="gradient-container">
								<span class="snap-section-title">Gradient Generator</span>
								<div class="gradient-preview"></div>
								<div class="gradient-type">
									<label for="gradient-type">
										<input type="radio" name="gradient-type" value="linear" checked /> Linear
									</label>
									<label for="gradient-type">
										<input type="radio" name="gradient-type" value="radial" /> Radial
									</label>
								</div>
								<div class="color-control">
									<div class="color-list">
										<!-- colors added here -->
									</div>
									<div class="add-color">
										<button class="add-color-btn">+</button>
									</div>
								</div>
								<div class="gradient-slider-wrapper ">
									<div class="slider-content">
										<span>0°</span>
										<span id="angle-value">45°</span>
										<span>360°</span>
									</div>
									<input id="angle" class="gradient-slider" type="range" min="0" max="360" value="45" />
								</div>
								
								<pre id="gradient-output"></pre>
								<input type="text" name="" class="css-output" />
								<button class="copy-css">Copy CSS</button>
							</div>
						</div>
					</section>
				</div>
				<footer class="d-flex gap-4 px-2">
					<span class="pill-buttons d-flex gap-2 py-2 mr-auto">
						<button class="menu-button btn btn-success" data-akd-button data-akd-sidebar-toggle-button><i class="fa fa-bars"></i></button>
						<button id="browser-utility-button" class="" data-akd-button><i class="fa fa-wrench"></i></button>
					</span>
					<span class="pill-buttons d-flex flex-center gap-0 w-12 h-auto p-2 mx-auto">
						<input id="browser-url-input" class="w-12 bdr-0" type="text" value="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js" onfocus="this.select();" data-akd-input />
						<button id="browser-submit-button" class="px-8 py-5 bdr-0" data-akd-button>Go</button>
					</span>
					<span class="pill-buttons d-flex gap-2 py-2 ml-auto">
						<button id="browser-reload-button" class="" data-akd-button><i class="fa fa-arrows-rotate"></i></button>
						<button id="browser-expand-button" class="" data-akd-button><i class="fa fa-arrows"></i></button>
					</span>
				</footer>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					let galleryList = [
						{"alt" : "fantasy-woman-earth-planet-1080P-wallpaper-middle-size", "src" : "fantasy-woman-earth-planet-1080P-wallpaper-middle-size.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "landscape2", "src" : "landscape2.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "landscape3", "src" : "landscape3.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "dracula-untold", "src" : "dracula-untold.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "a0490a1aa76744809e7a43aee4cdda01", "src" : "a0490a1aa76744809e7a43aee4cdda01.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "a0490a1aa76744809e7a43aee4cdda010.jpg", "src" : "a0490a1aa76744809e7a43aee4cdda010.jpg.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "symphonic", "src" : "symphonic.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "ec584c39988ebb6fe7da7e16bbb2fa4e", "src" : "ec584c39988ebb6fe7da7e16bbb2fa4e.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "store-xbox", "src" : "store-xbox.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "store-ps", "src" : "store-ps.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "wallpaper-space-lanets", "src" : "wallpaper-space-lanets.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "worst-capricorn-tatoo-design", "src" : "worst-capricorn-tatoo-design.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						
						{"alt" : "_48crH8AzXBOrqzoGkadxCcXTsryIquEvagJrFl8MHs", "src" : "_48crH8AzXBOrqzoGkadxCcXTsryIquEvagJrFl8MHs.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "197548", "src" : "197548.png", "ext" : "png", "mime" : "image/png", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "afro_samurai_bloody_wallpaper_by_whit_3_d493zki-fullview", "src" : "afro_samurai_bloody_wallpaper_by_whit_3_d493zki-fullview.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "218942", "src" : "218942.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "54590", "src" : "54590.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "548UY800", "src" : "548UY800.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "26769573", "src" : "26769573.png", "ext" : "png", "mime" : "image/png", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "Fat-pussy", "src" : "Fat-pussy.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "Fat-pussy1", "src" : "Fat-pussy1.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "download", "src" : "download.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
						{"alt" : "pussy-cream", "src" : "pussy-cream.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
					];
					
					$("#generators-window").css({"backdrop-filter": "blur(5px)","background-image": `url("./images/${galleryList[0].src}")`, "background-size": "cover", "background-position": "center center", "background-repeat": "no-repeat"});
					
					const colorElement = document.getElementById("colorPicker");
					const opacityElement = document.getElementById("opacity");
					const blurElement = document.getElementById("blur");
					const cssOutput = document.getElementById("glassmorphism-generator-output");
					const copyCssButton = document.getElementById("copyCssButton");
					// const glassCard = document.querySelector(".glass-card");
					const glassCards = document.querySelectorAll(".glass-card");
					
					function hexToRGB(hex, opacity) {
						const r = parseInt(hex.slice(1, 3), 16);
						const g = parseInt(hex.slice(3, 5), 16);
						const b = parseInt(hex.slice(5, 7), 16);
						return `rgba(${r},${g},${b},${opacity})`;
					}
					
					function updatePreview() {
						const color = colorElement.value;
						const opacity = opacityElement.value;
						const blur = blurElement.value;
						const backgroundColor = hexToRGB(color, opacity);
						glassCards.forEach(glassCard => {
							glassCard.style.backgroundColor = backgroundColor;
							glassCard.style.backdropFilter = `blur(${blur}px)`;
						});
const css = `.card {
	background: ${backgroundColor};
	backdrop-filter: blur(${blur}px);
	-webkit-backdrop-filter: blur(${blur}px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, ${opacity});
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}`;
						cssOutput.textContent = css;
					}
					
					colorElement.addEventListener("input", updatePreview);
					opacityElement.addEventListener("input", updatePreview);
					blurElement.addEventListener("input", updatePreview);
					
					copyCssButton.addEventListener("click", function () {
						navigator.clipboard.writeText(cssOutput.textContent)
							.then(() => {
								alert("Css copied");
							})
							.catch((error) => {
								alert("error copying CSS");
							});
					});
					
					updatePreview();
					
					/* ------------------------------------------------------------------------------ */
					const slider = document.getElementById("angle");
						const sliderValue = document.getElementById("angle-value");
						const colorlist = document.querySelectorAll(".color-list");
						const addColorBtn = document.querySelector(".add-color-btn");
						const gradientTypeInputs = document.querySelectorAll('input[name="gradient-type"]');
						const sliderContainer = document.querySelector('.gradient-slider-wrapper');
						
						addColorBtn.addEventListener("click", addColorStop);
						slider.addEventListener("input", () => {
							sliderValue.textContent = `${slider.value}°`;
							updateGradient();
						});
						gradientTypeInputs.forEach(input => {
							input.addEventListener('change', () => {
								updateGradient();
								toggleAngleSlider();
							});
						});
					
					let colors = ['#d81848', '#fd26ae', '#0c43c6'];
					
					const updateGradient = () => {
						let gradientString;
						const angle = document.getElementById("angle").value;
						const gradientType = document.querySelector('input[name="gradient-type"]:checked').value;
						console.log(gradientType);
						
						if(gradientType === 'linear') {
							gradientString = `linear-gradient(${angle}deg, ${colors.join(", ")})`;
						} else {
							gradientString = `radial-gradient(circle, ${colors.join(", ")})`;
						}
						
						const gradientPreview = document.querySelector(".gradient-preview");
						gradientPreview.style.background = gradientString;
						document.getElementById("gradient-output").textContent = `.gradient {\n    background: ${gradientString};\n}`;
					};
				
					function toggleAngleSlider() {
						const gradientType = document.querySelector('input[name="gradient-type"]:checked').value;
						sliderContainer.style.display = gradientType === 'linear' ? 'block' : 'none';
					}
				
					function initializeGradient() {
						const colorList = document.querySelector(".color-list");
						colorList.innerHTML = "";
						colors.forEach((color, index) => {
							const colorStop = document.createElement("div");
							colorStop.className = "color-stop";
							
							const colorInput = document.createElement("input");
							colorInput.type = "color";
							colorInput.className = "color-input";
							colorInput.value = color;
							colorInput.dataset.index = index;
							colorInput.addEventListener("input", (e) => updateColor(e.target.dataset.index, e.target.value));
							
							const removeButton = document.createElement("i");
							removeButton.className = "fa-solid fa-trash";
							removeButton.onclick = () => removeColorStop(index);
							
							colorStop.appendChild(colorInput);
							colorStop.appendChild(removeButton);
							colorList.appendChild(colorStop);
						});
						
						updateGradient();
						toggleAngleSlider();
					}
					
					initializeGradient();
					
					function removeColorStop(index) {
						if(colors.length > 2) {
							colors.splice(index, 1);
							initializeGradient();
						} else {
							alert("Minimum 2 colors required!");
						}
					}
					
					function addColorStop() {
						if(colors.length >= 6) {
							alert("Maximum 6 colors allowed!");
							return;
						}
						colors.push("#ffffff");
						initializeGradient();
					}
					
					function updateColor(index, color) {
						colors[index] = color;
						updateGradient();
					}
					
					const copyCssBtn = document.querySelector(".gradient-container .copy-css");
					copyCssBtn.addEventListener("click", () => {
						const cssGradient = document.querySelector(".gradient-container .css-output");
						cssGradient.value = document.getElementById("gradient-output").textContent;
						cssGradient.select();
						navigator.clipboard
							.writeText(cssGradient.value)
							.then(() => alert("CSS copied to clipboard!"))
							.catch((err) => console.error("Failed to copy: ", err));
					});
				});
		}, 
		svgviewer(params){
			try{
				params = JSON.parse(params);
			} catch(e){}
			// finally(){}
			
			// let items = params.items && isArray(params.items) ? params.items : $siteData.issued;
			let action = params?.action??"themes", id = params?.id??0, 
			$form = "", found = {};
			
			let $html = `<article id="svg-viewer-window" class="akd-window --has-footer --has-sidebar" data-akd-window>
				<div class="akd-window-body">
					<aside class="akd-window-sidebar left--side" data-akd-window-sidebar>
						<header>
							<label class="d-flex flex-center gap-2 w-12 h-auto bg-opaque-dark text-white bdr-2 py-5 px-2" for="svg-viewer-file-input">
								<span><i class="fa fa-upload"></i></span>
								<input id="svg-viewer-file-input" class="svg-viewer-file-input visually-hidden" type="file" accept="image/*" />
							</label>
						</header>
						<section class="">
							<nav class="d-block overflow-auto h-6">
								<span class="d-flex flex-center flex-wrap gap-4 w-12 h-12">
									<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-4" for="svg-viewer-checkbox">
										<span>editor line wrap?</span>
										<input id="svg-viewer-checkbox" type="checkbox" onchange="let target = document.getElementById('svgInput');if(this.checked === true) {target.style.whiteSpace = 'wrap';} else {target.style.whiteSpace = 'pre';}" checked />
									</label>
									<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-4" for="svg-element-fillcolor-input">
										<span>fill color</span>
										<input id="svg-element-fillcolor-input" type="color" value="#fff" onchange="let el = document.querySelector('#previewContainer svg');el.style.fill = this.value;" />
									</label>
									<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-4" for="svg-element-strokecolor-input">
										<span>stroke color</span>
										<input id="svg-element-strokecolor-input" class="" type="color" value="#fff" onchange="let el = document.querySelector('#previewContainer svg');el.style.stroke = this.value;" />
									</label>
									<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-4" for="svg-element-path-input">
										<span>path color</span>
										<input id="svg-element-path-input" type="color" value="#fff" onchange="let el = document.querySelector('#previewContainer svg path');el.style.fill = this.value;el.style.stroke = this.value;" />
									</label>
									<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-4" for="svg-element-polygon-input">
										<span>polygon color</span>
										<input id="svg-element-polygon-input" type="color" value="#fff" onchange="let el = document.querySelector('#previewContainer svg polygon');el.style.fill = this.value;el.style.stroke = this.value;" />
									</label>
									<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-4" for="svg-element-circle-input">
										<span>circle color</span>
										<input id="svg-element-circle-input" type="color" value="#fff" onchange="let el = document.querySelector('#previewContainer svg circle');el.style.fill = this.value;el.style.stroke = this.value;" />
									</label>
									<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-4" for="svg-element-rect-input">
										<span>rect color</span>
										<input id="svg-element-rect-input" type="color" value="#fff" onchange="let el = document.querySelector('#previewContainer svg rect');el.style.fill = this.value;el.style.stroke = this.value;" />
									</label>
								</span>
							</nav>
							<nav class="d-block overflow-auto h-6">
								<ol id="svg-items" class="d-flex flex-center gap-2">
									<li></li>
								</ol>
							</nav>
						</section>
						<footer>
						</footer>
					</aside>
					<section class="svg-viewer snap-container x w-12 h-12 d-block pos-rel">
						<div class="snap-section d-flex flex-col flex-center overflow-auto">
							<div class="svg-viewer-main">
								<header>
									<h1>SVG Preview Tool</h1>
									<p>Edit, preview, and export clean, scalable vector art</p>
								</header>
								<div class="svg-viewer-container horizontal">
									<div class="svg-viewer-editor">
										<div class="svg-viewer-editor-header d-flex flex-center gap-4">
											<span class="my-auto">SVG Code Editor</span>
											<span class="d-flex flex-center gap-4 ml-auto">
												<label class="d-flex flex-center gap-2 w-12 h-auto bg-opaque-dark text-white bdr-2 py-5 px-2" for="svg-viewer-file-input">
													<span class="px-1 px-6"><i class="fa fa-upload"></i></span>
													<input id="svg-viewer-file-input2" class="svg-viewer-file-input visually-hidden" type="file" accept="image/*" />
												</label>
												<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-2" for="svg-viewer-checkbox">
													<span>wrap?</span>
													<input id="svg-viewer-checkbox" type="checkbox" onchange="let target = document.getElementById('svgInput');if(this.checked === true) {target.style.whiteSpace = 'wrap';} else {target.style.whiteSpace = 'pre';}" checked />
												</label>
											</span>
										</div>
										<textarea id="svgInput" placeholder="Paste your SVG code here" autofocus></textarea>
									</div>
									<div class="svg-viewer-preview">
										<div class="svg-viewer-preview-header d-flex flex-center gap-4">
											<span class="m-auto">SVG Preview</span>
											<span class="d-flex flex-center gap-2 ml-auto">
												<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-4" for="svg-viewer-preview-container-bgcolor-input">
													<span>bg</span>
													<input id="svg-viewer-preview-container-bgcolor-input" class="py-1" type="color" value="#fff" style="" onchange="let el = document.getElementById('previewContainer');el.style.backgroundColor = this.value;" />
												</label>
												<label class="d-flex flex-center gap-2 bg-opaque-dark text-white bdr-2 py-5 px-4" for="svg-element-fillcolor-input2">
													<span>fill</span>
													<input id="svg-element-fillcolor-input2" class="px-1" type="color" value="#000" style="" onchange="let el = document.querySelector('#previewContainer svg');el.style.fill = this.value;el.style.stroke = this.value;" />
												</label>
											</span>
										</div>
										<div class="svg-viewer-preview-content">
											<div id="previewContainer" class="svg-viewer-preview-container d-flex flex-center"></div>
										</div>
									</div>
								</div>
							</div>
							<span class="d-flex gap-8">
								<button id="exportBtn"><i class="fa fa-file-export"></i>Export SVG</button>
								<button id="orientationBtn"><i class="fa fa-sync"></i>Change Orientation</button>
							<span>
						</div>
						
						<div class="snap-section">
							<h1>SVG Viewer from String</h1>
							<div id="svg-container"></div>
							
							<h1>SVG Viewer - Dynamically Created</h1>
							<div id="svg-container-dynamic"></div>
						</div>
					</section>
				</div>
				<footer class="d-flex gap-4">
					<span class="pill-buttons d-flex gap-2 py-2 mr-auto">
						<button class="menu-button btn btn-success" data-akd-button data-akd-sidebar-toggle-button><i class="fa fa-bars"></i></button>
						<button id="browser-utility-button" class="" data-akd-button><i class="fa fa-wrench"></i></button>
					</span>
					<span class="d-flex flex-center gap-0 w-12 h-auto p-2 mx-auto">
						<input id="browser-url-input" class="w-12 bdr-0" type="text" value="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js" onfocus="this.select();" data-akd-input />
						<button id="browser-submit-button" class="px-8 py-5 bdr-0" data-akd-button>Go</button>
					</span>
					<span class="pill-buttons d-flex gap-2 py-2 ml-auto">
						<button id="browser-reload-button" class="" data-akd-button><i class="fa fa-arrows-rotate"></i></button>
						<button id="browser-expand-button" class="" data-akd-button><i class="fa fa-arrows"></i></button>
					</span>
				</footer>
			</article>`;
			
			loader("#content-display", $html)
				.then(()=>{
					const svgInput = document.getElementById("svgInput");
					const previewContainer = document.getElementById("previewContainer");
					const exportBtn = document.getElementById("exportBtn");
					const orientationBtn = document.getElementById("orientationBtn");
					const svgviewerFileInputs  = document.querySelectorAll(".svg-viewer-file-input");
					
					Array.from(svgviewerFileInputs).forEach(svfi => {
						svfi.addEventListener("change", function (e) {
							let file = e.target.files[0], fr = new FileReader();
							fr.onload = function(ev){
								let source = ev.target.result, li = Object.assign(document.createElement("li"), {
									className: "", 
									innerHTML: `<img src="${source}" alt="${file.name}" style="" \/>`
								});
								document.getElementById("svg-items").appendChild(li)
								loadSVG(source);
							}
							fr.readAsText(file);
						});
					})
					svgInput.addEventListener("input", function () {
						loadSVG(this.value);
					});
					
					svgInput.addEventListener("paste", function () {
						loadSVG(this.value);
					});
					
					exportBtn.addEventListener("click", exportSVG);
					orientationBtn.addEventListener("click", e => {
						document.querySelector(".svg-viewer-container").classList.toggle("horizontal");
					});
					
					// window.addEventListener("load", loadDefaultSVG);
					loadDefaultSVG();
					
					function loadSVG(svgCode) {
						previewContainer.innerHTML = "";
						if(!svgCode.trim()) {
							showErrorMessage("Enter SVG code to see preview");
							return;
						}
						
						try{
							const parser = new DOMParser();
							const doc = parser.parseFromString(svgCode, "image/svg+xml");
							const parserError = doc.querySelector("parsererror");
							if(parserError) throw new Error("XML parsing error: " + parserError.textContent);
							const svgElement = doc.querySelector("svg");
							if (!svgElement) throw new Error("No valid SVG element found");
					
							const container = document.createElement("div");
							container.className = "svg-container";
							container.innerHTML = svgCode;
							previewContainer.appendChild(container);
						} catch (error) {
							showErrorMessage("Invalid SVG code: " + error.message);
						}
					}
					
					function showErrorMessage(errorMessage) {
					  const errorDiv = document.createElement("div");
					  errorDiv.className = "error-message";
					  errorDiv.textContent = errorMessage;
					  previewContainer.appendChild(errorDiv);
					}
					
					function loadDefaultSVG() {
						const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="190" viewBox="0 0 60 60"><defs><style>.cls-1{fill:#87e64b;}</style></defs><circle class="cls-1" cx="25.56" cy="61.15" r="2.86"/><path class="cls-1" d="M42,41.65l-16.13,1.73c-.3.03-.45-.34-.21-.53l15.78-12.29c1.02-.84,1.68-2.14,1.4-3.54-.28-2.14-2.05-3.54-4.29-3.26l-17.15,2.51c-.3.04-.46-.34-.22-.53l17-12.98c3.35-2.61,3.63-7.73.56-10.71-2.79-2.79-7.27-2.7-10.06.09L1.29,30.01c-1.02,1.12-1.49,2.61-1.21,4.19.47,2.52,2.98,4.19,5.5,3.73l14.77-3.01c.32-.07.49.36.22.54l-16.38,10.49c-2.05,1.3-2.98,3.63-2.33,5.96.65,3.07,3.73,4.84,6.71,4.1l24.49-6.03c.28-.07.48.25.3.47l-3.82,4.72c-1.02,1.3.65,3.07,2.05,2.05l12.58-10.34c2.24-1.86.75-5.5-2.14-5.22h-.03Z"/></svg>`;
						svgInput.value = sampleSvg;
						loadSVG(sampleSvg);
					}
					function exportSVG() {
					  const blob = new Blob([svgInput.value], { type: "image/svg+xml" });
					  const url = URL.createObjectURL(blob);
					  const a = document.createElement("a");
					  a.href = url;
					  a.download = "svg-viewer.svg";
					  document.body.appendChild(a);
					  a.click();
					  document.body.removeChild(a);
					  URL.revokeObjectURL(url);
					}
				});
		}, 
	}
};

function empty(nodes){
	if(!isArray(nodes) || nodes.length === 1) nodes = [nodes];
	var elem, i = 0;
	// while(el.firstChild) el.removeChild(el.firstChild);
	for ( ; (elem = nodes[i]) != null; i++){
		// Remove element nodes and prevent memory leaks
		if(elem.nodeType === 1){
			elem.innerHTML = "";
			elem.textContent = "";
		}
		// Remove any remaining nodes
		while(elem.firstChild){
			elem.removeChild(elem.firstChild);
		}
		// If this is a select, ensure that it displays empty (#12336)
		// Support: IE<9
		if(elem.options && elem.nodeName === "select") {
			elem.options.length = 0;
		}
	}
	return this;
}
function insertHtml(el, content, _append = false){
	el = isElement(el) ? el : one(el);
	if(!isElement(el)) return false;
	if(_append === false/* || insertHtml._append === false*/) empty(el);
	isElement(content) ? el.insertAdjacentElement('beforeend', content) : el.insertAdjacentHTML('beforeend', content);
	return el;
}
insertHtml._append = false;
function zoom(id,zAmount, zDir) {
	var img = typeof id === 'object' ? id : ((id.match(/^.*#/) || id.match(/^#/)) ? document.getElementById(id): document.querySelector(id));
	if(img){
		zDir = zDir??"in";
		let zoom = zAmount??1.5, 
		image = img.style;
		winW = img.width,
		winH = img.height;
		if(zDir === "in"){
			image['width'] = (winW*zoom) + 'px';
			image['height'] = (winH*zoom) + 'px';
		} else {
			image['width'] = (winW/zoom) + 'px';
			image['height'] = (winH/zoom) + 'px';
		}
		image['transition'] = 'all 1s ease-in';
	}
}

let fx = 1, fy =1;
function flipImage(img, axis){
	//img = $one(img);
	if(!isElement(img)) return false;
	if(axis === "vertical" || axis === "v"){
		if(img.classList.contains("flipped-vertically")){
			flipImage.fy = fy = "1";
			img.classList.remove("flipped-vertically")
		} else {
			flipImage.fy = fy = "-1";
			img.classList.add("flipped-vertically")
		}
	} else {
		if(img.classList.contains("flipped-horizontally")){
			flipImage.fx = fx = "1";
			img.classList.remove("flipped-horizontally")
		} else {
			flipImage.fx = fx = "-1";
			img.classList.add("flipped-horizontally")
		}
	}
	
	// img.style.transform = `scale(${fx}, ${fy})`;
	//img.style.transform = `scale(${flipImage.fx}, ${flipImage.fy})`;
	img.style.scale = `${flipImage.fx} ${flipImage.fy}`;
}
flipImage.fx = 1;flipImage.fy = 1;
function elementScrollIndicator(eleId, indicator) {
	var el = typeof eleId === 'string' ? document.querySelector(eleId) : eleId,
	indicator = typeof indicator === 'string' ? document.querySelector(indicator) : indicator, scrolled = 0;
	//if(!el || !indicator) return false;
	el.addEventListener("scroll",function() {
	    var customScrollTop = el.scrollTop;
		var customHeight = el.getBoundingClientRect().height;
	    var customScrollHeight = el.scrollHeight;
	    scrolled = (customScrollTop / (customScrollHeight - customHeight))*100;
		//alert(customHeight);
		indicator.style.width =  scrolled+ "%";
		if(scrolled < 49){
			// el.style.backgroundColor = "#28a745";
			indicator.style.backgroundColor = "#28a745";
		} else if(scrolled > 49 && scrolled < 79){
			// el.style.backgroundColor = "#ffc107";
			indicator.style.backgroundColor = "#ffc107";
		} else if(scrolled > 79){
			// el.style.backgroundColor = "#dc3545"/*'#ff0000'*/;
			indicator.style.backgroundColor = "#dc3545";
		}
	});
}
function changeToFileContent(input, output = "#source", as = "text", cb) {
	let file = isElement(input) ? input?.files[0]??null : input, 
	r_map = {
		"text": "readAsText", 
		"data": "readAsDataURL", "dataurl": "readAsDataURL", 
		"array": "readAsArrayBuffer", "arraybuffer": "readAsArrayBuffer", 
		"binary": "readAsBinaryString", "binarystring": "readAsBinaryString"
	}
	if(file && output) {
		const reader = new FileReader();
		reader.onload = function(event) {
			if(("the" in window) && the?.editor) {
				the.editor.setValue(event.target.result);
			} else if(isObject(output) && ("setValue" in output)) {
				output.setValue(event.target.result);
			} else {
				try{
					$(output).val(event.target.result);
				} catch(e){
					//console.log(output, e)
					// isElement(output) ? output.value = event.target.result : document.querySelector(output).value = event.target.result??null;
					output = isElement(output) ? output : document.querySelector(output);
					if(isElement(output)){
						output[("value" in output) ? "value" : (("src" in output) ? "src" : "textContent")] = event.target.result;
					}
				}
			}
			if(isFunction(cb)){
				cb.apply(null, [event.target.result, output])
			}
		};
		// reader.readAsText(file, "UTF-8");
		reader[r_map[as]](file, "UTF-8");
	}
}
const DEFALTFILTER = {
  brightness: 100,
  saturation: 100,
  inversion: 0,
  grayscale: 0, 
  contrast: 100, 
  sepia: 0, 
  hue: 0, 
  blur: 0
}

const DEFAULTTRANSFORM = {
	rotate: 0, 
	flipX: 1, 
	flipY: 1
}

let currentFilter = {
  brightness: 100,
  saturation: 100,
  inversion: 0,
  grayscale: 0, 
  contrast: 100, 
  sepia: 0, 
  hue: 0, 
  blur: 0
}


let currentTransform = {
  rotate: 0,
  flipX: 1,
  flipY: 1
}

const sliderMax = {
  brightness: 200,
  saturation: 200,
  inversion: 100,
  grayscale: 100, 
  contrast: 200, 
  sepia: 200, 
  hue: 360, 
  blur: 20
}
let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }, cameraZoom = 1,  
MAX_ZOOM = 10, MIN_ZOOM = 0.1, SCROLL_SENSITIVITY = 0.0005, isDragging = false,  dragStart = { x: 0, y: 0 }, 
initialPinchDistance = null, lastZoom = cameraZoom;

let _x_ = 0;
function buildViewer(input, media_type = "image", _append_to = "",  _uidn = null){
	//const blob = new Blob(input/*, {type:"text/html"}*/);
	const objectURL = input && isBlob(input) ? URL.createObjectURL(input) : input;
	var viewer = document.getElementById(`x-viewer-${_x_}`);
	_x_ = (isReallyDefined(_uidn) || isNumber(_uidn)) ? _uidn : _x_;
	if(!viewer){
		let str1 = "", str2 = "", name = input?.name??"", size = ("fileFuncs" in window) && fileFuncs.bytes(input?.size??"") || "", ext = "", type = input?.type??"";
		str1 += (media_type === "image" || media_type === "video" || media_type === "audio") ? `
		<span class="d-flex flex-center flex-wrap gap-2 p-3 w-auto mr-auto">
			<button class="viewer-expand-btn text-lg mr-auto" onclick="let viewer = document.getElementById('x-viewer-'+${_x_});viewer.classList.toggle('expanded');if(viewer.classList.contains('expanded')){this.textContent = '[]';Object.assign(viewer.style, {width: '100%', height: '100%', top: 0, left: 0, translate: '0 0', transition: 'height linear 0.5s, width linear 0.5s'});} else {this.textContent = '[  ]';Object.assign(viewer.style, {width: '60%', height: '60%', top: '40%', left: '40%', translate: '-40% -40%', transition: 'height linear 0.5s, width linear 0.5s'});}">[  ]</button>
			<button class="viewer-media-expand-btn py-5 text-lg mr-auto" onclick="let viewer = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media'), i = this.querySelector('i.fa');;viewer.classList.toggle('image-expanded');if(viewer.classList.contains('image-expanded')){Object.assign(viewer.style, {'max-width': '100%', width: 'auto', height: '100%', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-lock');i.classList.add('fa-unlock');} else {Object.assign(viewer.style, {'max-width': 'max-content', width: 'auto', height: 'auto', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-unlock');i.classList.add('fa-lock');}"><i class="fa fa-lock"></i></button>
			<button class="viewer-info-btn text-lg mr-auto py-5" onclick="let target = document.querySelector('#x-viewer-'+${_x_}+' .info'), i = this.querySelector('i.fa');target.classList.toggle('--active');if(target.classList.contains('--active')){target.classList.remove('slide-up');target.classList.add('slide-down');i.classList.remove('fa-chevron-down');i.classList.add('fa-chevron-up');} else {target.classList.remove('slide-down');target.classList.add('slide-up');i.classList.remove('fa-chevron-up');i.classList.add('fa-chevron-down');}"><i class="fa fa-chevron-down"></i></button>
			<button class="viewer-media-flip-v-btn py-5 text-lg mr-auto" onclick="let img = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media');flipImage(img, 'v');"><i class="fa fa-arrows-v"></i></button>
			<button class="viewer-media-flip-v-btn py-5 text-lg mr-auto" onclick="let img = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media');flipImage(img, 'h');"><i class="fa fa-arrows-h"></i></button>
			<button class="viewer-media-zoom-out-btn py-5 text-lg mr-auto" onclick="let img = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media');zoom(img, 1.5, 'out');"><i class="fa fa-minus"></i></button>
			<button class="viewer-media-zoom-in-btn py-5 text-lg mr-auto" onclick="let img = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media');zoom(img, 1.5, 'in');"><i class="fa fa-plus"></i></button>
			<input class="p-0" type="range" min="0" max="180" step="1" value="0" oninput="let viewer = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media');viewer.style.rotate = this.value + 'deg'" />
		</span>
		<span class="d-flex flex-center p-3 w-auto ml-auto">
			<select id="x-viewer-object-fit-select-${_x_}" class="p-4 text-md" onchange="let viewer = document.querySelector('.viewer-media');viewer.style.objectFit = this.value;" data-akd-select >
				<option value="cover">cover</option>
				<option value="contain" selected>contain</option>
				<option value="fill">fill</option>
				<option value="scale-down">scale-down</option>
				<option value="none">none</option>
			</select>
				
		</span>` : 
		`<span class="d-flex flex-center flex-wrap gap-2 p-3 w-auto mr-auto">
			<button class="viewer-expand-btn text-lg mr-auto" onclick="let viewer = document.getElementById('x-viewer-'+${_x_});viewer.classList.toggle('expanded');if(viewer.classList.contains('expanded')){this.textContent = '[]';Object.assign(viewer.style, {width: '100%', height: '100%', top: 0, left: 0, translate: '0 0', transition: 'height linear 0.5s, width linear 0.5s'});} else {this.textContent = '[  ]';Object.assign(viewer.style, {width: '60%', height: '60%', top: '40%', left: '40%', translate: '-40% -40%', transition: 'height linear 0.5s, width linear 0.5s'});}">[  ]</button>
			<button class="viewer-media-expand-btn py-5 text-lg mr-auto" onclick="let viewer = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media'), i = this.querySelector('i.fa');;viewer.classList.toggle('image-expanded');if(viewer.classList.contains('image-expanded')){Object.assign(viewer.style, {'max-width': '100%', width: 'auto', height: '100%', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-lock');i.classList.add('fa-unlock');} else {Object.assign(viewer.style, {'max-width': 'max-content', width: 'auto', height: 'auto', transition: 'height linear 0.5s, width linear 0.5s'});i.classList.remove('fa-unlock');i.classList.add('fa-lock');}"><i class="fa fa-lock"></i></button>
			<button class="viewer-info-btn text-lg mr-auto py-5" onclick="let target = document.querySelector('#x-viewer-'+${_x_}+' .info'), i = this.querySelector('i.fa');target.classList.toggle('--active');if(target.classList.contains('--active')){target.classList.remove('slide-up');target.classList.add('slide-down');i.classList.remove('fa-chevron-down');i.classList.add('fa-chevron-up');} else {target.classList.remove('slide-down');target.classList.add('slide-up');i.classList.remove('fa-chevron-up');i.classList.add('fa-chevron-down');}"><i class="fa fa-chevron-down"></i></button>
		</span>
		<span class="d-flex flex-center flex-wrap gap-2 p-3 w-auto ml-auto">
			<input id="x-viewer-font-size-input-${_x_}" class="x-viewer-font-size-input" type="range" min="8" max="48" step="1" value="16" title="font size input" />
			<input id="x-viewer-font-size-weight-${_x_}" class="x-viewer-font-weight-input" type="range" min="100" max="900" step="100" value="100" title="font weight input" />
		</span>`;
		if(media_type === "image" || media_type === "video" || media_type === "audio"){
			str2 += `<div id="x-viewer-${_x_}-body" class="x-viewer-body pos-rel isolate d-flex flex-center w-12 h-12" style="z-index: 3;overflow: auto;">
			${
				media_type === "image" ? 
					`<img id="viewer-media-${_x_}" class="viewer-media" src="${objectURL}" alt="${name}" />` : 
						(media_type === "audio" ? `<audio id="viewer-media-${_x_}" class="viewer-media"  src="${objectURL}" data-src="${objectURL}"></audio>`: `<video id="viewer-media" class="viewer-media" src="${objectURL}" data-src="${objectURL}" preload="metadata" controls ></video>`)
			}
			${(media_type === "audio" || media_type === "video") ? 
				`<div class="d-flex flex-center gap-3 w-11 h-max p-4 mt-auto my-auto bdr-4 bg-opaque-dark" style="position: absolute;top: auto;bottom: 1rem;">
					<button id="step-backward-button-${_x_}" class="step-backward-button media-button d-flex flex-center p-4 text-lg" onclick="let target = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media');if(target.currentTime > 10){target.currentTime -= 10;}" data-akd-button><i class="fa fa-backward-step"></i></button>
					<button id="stop-button-${_x_}" class="stop-button media-button d-flex flex-center p-8 text-lg" onclick="let target = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media');if(!target.paused){target.pause();}target.currentTime = 0;" data-akd-button><i class="fa fa-stop"></i></button>
					<button id="playpause-button-${_x_}" class="playpause-button media-button d-flex flex-center p-8 text-lg" onclick="let target = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media'), i = this.querySelector('i.fa');if(!target.paused){target.pause();i.classList.remove('fa-pause');i.classList.add('fa-play');} else {target.play();i.classList.remove('fa-play');i.classList.add('fa-pause');}" data-akd-button><i class="fa fa-play"></i></button>
					<button id="step-forward-button-${_x_}" class="step-forward-button media-button d-flex flex-center p-4 text-lg" onclick="let target = document.querySelector('#x-viewer-'+${_x_}+' .viewer-media');if(target.duration < (target.currentTime + 10)){target.currentTime += 10;}" data-akd-button><i class="fa fa-forward-step"></i></button>
				</div>` : ""
			}
			</div>
			<div class="editor-controls pos-rel isolate d-flex flex-center w-12 h-max slide-down" style="z-index: 110;position: absolute;top: auto;bottom: 0;overflow: visible;border-top: 2px solid #764ba2;background-color: var(--color, #fff);">
				<span class="editor-controls-button d-flex flex-center p-8 text-center text-white" style="z-index: 110;position: absolute;top: -30px;left: calc(50% - 25px);display: block;height: 30px;width: 50px;border-radius: 0.25rem 0.25rem 0 0;background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);transition: height linear 0.8s, top linear 0.8s;" onclick="let target = document.querySelector('#x-viewer-'+${_x_}+' .editor-controls'), i = this.querySelector('i.fa');target.classList.toggle('--active');if(target.classList.contains('--active')){target.classList.remove('slide-down');target.classList.add('slide-up');i.classList.remove('fa-chevron-up');i.classList.add('fa-chevron-down');} else {target.classList.remove('slide-up');target.classList.add('slide-down');i.classList.remove('fa-chevron-down');i.classList.add('fa-chevron-up');}"><i class="fa fa-chevron-up"></i></span>
				<div class="d-flex flex-center flex-wrap gap-8 p-8 w-12 h-12 text-violet" style="min-height: 18rem;max-height: 50%;overflow: auto;">
					<label for="filter-input-blur-${_x_}" class="d-flex flex-wrap gap-4 w-5">
						<span class="d-flex flex-center">blur :</span>
						<input id="filter-input-blur-${_x_}" class="filter-input-blur w-12" type="range" min="0" max="${sliderMax.blur}" step="1" value="${DEFALTFILTER.blur}" data-x-viewer-filter-input />
					</label>
					<label for="filter-input-contrast-${_x_}" class="d-flex flex-wrap gap-4 w-5">
						<span class="d-flex flex-center">contrast :</span>
						<input id="filter-input-contrast-${_x_}" class="filter-input-contrast w-12" type="range" min="0" max="${sliderMax.contrast}" step="1" value="${DEFALTFILTER.contrast}" data-x-viewer-filter-input />
					</label>
					<label for="filter-input-brightness-${_x_}" class="d-flex flex-wrap gap-4 w-5">
						<span class="d-flex flex-center">brightness :</span>
						<input id="filter-input-brightness-${_x_}" class="filter-input-brightness w-12" type="range" min="0" max="${sliderMax.brightness}" step="1" value="${DEFALTFILTER.brightness}" data-x-viewer-filter-input />
					</label>
					<label for="filter-input-saturation-${_x_}" class="d-flex flex-wrap gap-4 w-5">
						<span class="d-flex flex-center">saturation :</span>
						<input id="filter-input-saturation-${_x_}" class="filter-input-saturation w-12" type="range" min="0" max="${sliderMax.saturation}" step="1" value="${DEFALTFILTER.saturation}" data-x-viewer-filter-input />
					</label>
					<label for="filter-input-hue-rotate-${_x_}" class="d-flex flex-wrap gap-4 w-5">
						<span class="d-flex flex-center">hue-rotate :</span>
						<input id="filter-input-hue-rotate-${_x_}" class="filter-input-hue-rotate w-12" type="range" min="0" max="${sliderMax.hue}" step="1" value="${DEFALTFILTER.hue}" data-x-viewer-filter-input />
					</label>
					<label for="filter-input-sepia-${_x_}" class="d-flex flex-wrap gap-4 w-5">
						<span class="d-flex flex-center">sepia :</span>
						<input id="filter-input-sepia-${_x_}" class="filter-input-sepia w-12" type="range" min="0" max="${sliderMax.sepia}" step="1" value="${DEFALTFILTER.sepia}" data-x-viewer-filter-input />
					</label>
					<label for="filter-input-grayscale-${_x_}" class="d-flex flex-wrap gap-4 w-5">
						<span class="d-flex flex-center">grayscale :</span>
						<input id="filter-input-grayscale-${_x_}" class="filter-input-grayscale w-12" type="range" min="0" max="${sliderMax.grayscale}" step="1" value="${DEFALTFILTER.grayscale}" data-x-viewer-filter-input />
					</label>
					<label for="filter-input-inversion-${_x_}" class="d-flex flex-wrap gap-4 w-5">
						<span class="d-flex flex-center">invert :</span>
						<input id="filter-input-inversion-${_x_}" class="filter-input-inversion w-12" type="range" min="0" max="${sliderMax.inversion}" step="1" value="${DEFALTFILTER.inversion}" data-x-viewer-filter-input />
					</label>
					
					<div class="preset-filters d-flex flex-col w-12 p-4 bg-warning" style="position: sticky;top: auto;bottom: 0;background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
						<h6 class="d-block w-12 text-white text-center">Preset Filters</h6>
						<span class="d-flex flex-center flex-wrap gap-2 w-12 p-2">
							<span class="d-flex flex-center gap-2 w-max p-4 ">
								<button id="" class="brighten-filter-button btn btn-violet" data-x-viewer-filter-image-brighten-button >Brighten</button>
								<button id="" class="bw-filter-button btn btn-violet ws-nowrap" data-x-viewer-filter-image-bw-button >Black and White</button>
								<button id="" class="funky-filter-button btn btn-violet" data-x-viewer-filter-image-funky-button >Funky</button>
								<button id="" class="vintage-filter-button btn btn-violet" data-x-viewer-filter-image-vintage-button >Vintage</button>
							</span>
							<span class="d-flex flex-center gap-2 w-max p-4 ">
								<button id="" class="reset-image-button btn btn-violet ws-nowrap" data-x-viewer-filter-image-reset-button ><i class="fa fa-sync mr-2"></i>reset</button>
								<button id="" class="save-image-button btn btn-violet ws-nowrap" data-x-viewer-filter-image-save-button><i class="fa fa-edit mr-2"></i>save</button>
							</span>
						</span>
			        </div>
				</div>
			</div>`;
		} else {
			str2 += `<div id="x-viewer-${_x_}-body" class="x-viewer-body pos-rel isolate d-flex flex-center w-12 h-12" style="z-index: 3;overflow: auto;">
				<textarea id="viewer-text-element-${_x_}" class="viewer-text-element w-12 h-12" wrap="logical">${objectURL}</textarea>
			</div>
			<div class="editor-controls pos-rel isolate d-flex flex-center w-12 h-max slide-down" style="z-index: 110;position: absolute;top: auto;bottom: 0;overflow: visible;border-top: 2px solid #764ba2;background-color: var(--color, #fff);">
				<span class="editor-controls-button d-flex flex-center p-8 text-center text-white" style="z-index: 110;position: absolute;top: -30px;left: calc(50% - 25px);display: block;height: 30px;width: 50px;border-radius: 0.25rem 0.25rem 0 0;background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);transition: height linear 0.8s, top linear 0.8s;" onclick="let target = document.querySelector('#x-viewer-'+${_x_}+' .editor-controls'), i = this.querySelector('i.fa');target.classList.toggle('--active');if(target.classList.contains('--active')){target.classList.remove('slide-down');target.classList.add('slide-up');i.classList.remove('fa-chevron-up');i.classList.add('fa-chevron-down');} else {target.classList.remove('slide-up');target.classList.add('slide-down');i.classList.remove('fa-chevron-down');i.classList.add('fa-chevron-up');}"><i class="fa fa-chevron-up"></i></span>
				<div class="d-flex flex-center flex-wrap gap-8 p-8 w-12 h-12 text-violet" style="min-height: 18rem;max-height: 50%;overflow: auto;">
					<span class="d-flex flex-center flex-wrap gap-2 p-3 w-auto ml-auto">
						<label for="x-viewer-font-size-input-${_x_}" class="d-flex flex-wrap gap-4 w-5">
							<span class="d-flex flex-center">font-size :</span>
							<input id="x-viewer-font-size-input-${_x_}" class="x-viewer-font-size-input" type="range" min="8" max="48" step="1" value="16" title="font size input" oninput="let viewer = document.querySelector('#x-viewer-'+${_x_}+' .viewer-text-element');viewer.style.fontSize = this.value + 'px'" data-x-viewer-font-input />
						</label>
						<label for="x-viewer-font-weight-input-${_x_}" class="d-flex flex-wrap gap-4 w-5">
							<span class="d-flex flex-center">font-weight :</span>
							<input id="x-viewer-font-size-weight-${_x_}" class="x-viewer-font-weight-input" type="range" min="100" max="900" step="100" value="100" title="font weight input" oninput="let viewer = document.querySelector('#x-viewer-'+${_x_}+' .viewer-text-element');viewer.style.fontWeight = this.value" data-x-viewer-font-input />
						</label>
					</span>
					
				</div>
			</div>`;
		}
		var viewer = Object.assign(document.createElement("section"), {
			id: `x-viewer-${_x_}`, style: "display: grid;grid-template-columns: 100%;grid-template-rows: auto 1fr;background-color: rgba(255, 0, 0, 0.5);position: absolute;z-index: 100;width: 60%;height: 60%;top: 40%;left: 40%;translate: -40% -40%;box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);overflow: hidden;", 
			innerHTML: `<div class="pos-rel d-block p-0 w-12 overflow-visible">
				<div class="pos-rel d-flex flex-center p-3 w-12 overflow-hidden" style="z-index: 9;background-color: var(--color, #fff);">
					${str1}
					<span class="d-flex flex-center p-3 w-auto ml-auto">
						<button class="viewer-close-btn text-lg mr-auto" onclick="let target = document.getElementById('x-viewer-'+${_x_});target.style.display = 'none';">×</button>
					</span>
				</div>
				<div class="info d-flex flex-col slide-up bg-opaque-dark w-12 pl-4 text-white" style="z-index: 8;position: absolute;top: auto;bottom: 0;min-height: 100px;height: max-content;">
					<span class="d-block w-12">name: <span data-name>${name}</span>
					<span class="d-block w-12">size: <span data-size>${size}</span></span>
					<span class="d-block w-12">extension: <span data-ext>${ext}</span></span>
					<span class="d-block w-12">mime-type: <span data-mime>${type}</span></span>
				</div>
			</div>
			${str2}
			`
		});
		//if(_append_to){						
			_append_to = isElement(_append_to) ? _append_to : (isString(_append_to) ? document.querySelector(_append_to) : document.body)
		//}
		_append_to.appendChild(viewer);
		_x_++;
	}
	
	let editorControlsButton = viewer.querySelector(".editor-controls-button")
	let brightnessSlider = viewer.querySelector(".filter-input-brightness");
	let blurSlider = viewer.querySelector(".filter-input-blur");
	let contrastSlider = viewer.querySelector(".filter-input-contrast");
	let grayscaleSlider = viewer.querySelector(".filter-input-grayscale");
	let hueRotateSlider = viewer.querySelector(".filter-input-hue-rotate");
	let saturateSlider = viewer.querySelector(".filter-input-saturation");
	let sepiaSlider = viewer.querySelector(".filter-input-sepia");
	let inversionSlider = viewer.querySelector(".filter-input-inversion");
	let viewerMedia = viewer.querySelector(".viewer-media");
	
	function applyFilter() {
		let filterString = `blur(${blurSlider.value}px) brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%) grayscale(${grayscaleSlider.value}%) saturate(${saturateSlider.value}%) sepia(${sepiaSlider.value}%) hue-rotate(${hueRotateSlider.value}deg) invert(${inversionSlider.value}%)`;
		// console.log(viewerMedia, filterString)
		viewerMedia.style.filter = filterString;
	}
	
	function brightenFilter() {
		resetImage();
		brightnessSlider.value = 130;
		contrastSlider.value = 120;
		saturateSlider.value = 120;
		applyFilter();
	}
		
	function bwFilter() {
		resetImage();
		grayscaleSlider.value = 100;
		brightnessSlider.value = 120;
		contrastSlider.value = 120;
		applyFilter();
	}

	function funkyFilter() {
		resetImage();
		// Set a random hue rotation everytime
		hueRotateSlider.value = Math.floor(Math.random() * 360) + 1;
		contrastSlider.value = 120;
		applyFilter();
	}
	
	function vintageFilter() {
		resetImage();
		brightnessSlider.value = 120;
		saturateSlider.value = 120;
		sepiaSlider.value = 150;
		applyFilter();
	}
	// Reset all the slider values to there default values
	function resetImage() {
		brightnessSlider.value = 100;
		blurSlider.value = 0;
		contrastSlider.value = 100;
		grayscaleSlider.value = 0;
		hueRotateSlider.value = 0;
		saturateSlider.value = 100;
		sepiaSlider.value = 0;
		inversionSlider.value = 0;
		applyFilter();
	}
	// ------
	viewer.addEventListener("input", e => {
		//e.preventDefault();
		let target = e.target;
		
		if(!target) return;
		
		if(target.hasAttribute("data-x-viewer-filter-input")){
		// if(inArray(target.id, "filter-input-brightness,filter-input-contrast,filter-input-grayscale,filter-input-saturation,filter-input-sepia,filter-input-hue-rotate,filter-input-inversion,filter-input-blur".split(","))){
			// console.log(target.id, target);
			applyFilter(e);
		}
	});
	viewer.addEventListener("mouseover", e => {
		editorControlsButton.style.height = "50px";
		editorControlsButton.style.top = "-50px";
	});
	viewer.addEventListener("mouseout", e => {
		editorControlsButton.style.height = "30px";
		editorControlsButton.style.top = "-30px";
	});
	viewer.addEventListener("click", (e) => {
		//e.preventDefault();
		let target = e.target;
		if(!target) return;
		
		//console.log(cameraZoom, target, target.id)
		if(target.hasAttribute("data-x-viewer-filter-image-brighten-button")){
			brightenFilter();
		} else if(target.hasAttribute("data-x-viewer-filter-image-bw-button")){
			bwFilter();
		} else if(target.hasAttribute("data-x-viewer-filter-image-funky-button")){
			funkyFilter();
		} else if(target.hasAttribute("data-x-viewer-filter-image-vintage-button")){
			vintageFilter();
		} else if(target.hasAttribute("data-x-viewer-filter-image-save-button")){
			saveImage();
		} else if(target.hasAttribute("data-x-viewer-filter-image-reset-button")){
			resetImage();
		} /*else if((target.id === "zoom-in" || target.id === "zoom-out") && cameraZoom >= MIN_ZOOM && cameraZoom <= MAX_ZOOM){
			let dir = "in";
			if(target.id === "zoom-in"){
				cameraZoom *= 1.1;
				dir = "in";
			}
			if(target.id === "zoom-out"){
				cameraZoom /= 1.1;
				dir = "out";
			}
			// zoomImage(viewerMedia, dir, cameraZoom);
		} */
	});
	
	return viewer;
}
function myAI(params = {}){
	const chatBox = document.getElementById(params?.chatDisplay??"my-chat-box");
	const userInput = document.getElementById(params?.promptInput??"my-user-input");
	const sendButton = document.getElementById(params?.promptSend??"my-send-button");
	/* const utilitybarToggle = document.getElementById("utilitybar-toggle");
	const utilitybar = document.querySelector(".utilitybar");
	const modeToggleCheckbox = document.getElementById("mode-toggle-checkbox");
	const ai_ModelSelect = document.getElementById("ai-model-select");
	const ai_ModelDisplay = document.getElementById("selected-ai-model-display");
	let selectedModel = ai_ModelSelect.value;
	let selectedModelName = ai_ModelSelect.options[ai_ModelSelect.selectedIndex].textContent;
	let model_loaded = false;
	
	modeToggleCheckbox.addEventListener("change", () => {document.body.classList.toggle("dark-mode");});
	*/
	let selectedModelName = "myAI";
	let currentPrompt = null;
	let loader = Object.assign(document.createElement("div"), {"className": "loader", innerHTML: `<hr /><hr /><hr />`});
	
	// --------------------------------------------
	sendButton.addEventListener("click", sendMessage);
	userInput.addEventListener("keydown", (event) => {
		if(event.key === "Enter") {
			sendMessage();
		} /* else if((tagText = item?.name) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
			found.push(item);
		} 
		*/
	});
	chatBox.addEventListener("click", function(e){
		let target = e.target;
		if(target.hasAttribute("data-akd-ai-button")){
			let $type = target.getAttribute("data-open");
			let $fileElement = document.getElementById("myAI-file-input"), 
			$fileElementLabel = document.getElementById("myAI-file-input-label");
			if(document.body.contains($fileElement) || isElement($fileElement)){
				$type === "text" ? $fileElement.setAttribute("accept", `${$type}/*, application/*`) : $fileElement.setAttribute("accept", `${$type}/*`);
				$fileElementLabel.click();
			}
		}
	});
	
	// $fileElement.addEventListener("change", e => {
	chatBox.addEventListener("change", e => {
		let target = e.target;
		
		if(target.id === "myAI-file-input"){
			let file = e.target.files[0], fr = new FileReader(), $as = document.getElementById("myAI-file-input").getAttribute("accept").split("/")[0], 
			$oAs = $as, 
			ext = fileFuncs.ext(file.name).replace(".", ""), $out = "";
			
			$as = $as === "image" ? "dataURL" : $as;
			console.log(target.id, $as, `readAs${html.ucWord($as)}`)
			fr.addEventListener("load", e => {
				let result = e.target.result, div = document.createElement("div");
				$out = result;
				
				if($as === "text"){
					$out = `<pre class="w-10 w-max-6 h-6 p-4 mx-auto my-2 overflow-auto border bdr-2">
						<code>
							${html.escapeHTML(result)}
						</code>
					</pre>`;
				} else if($oAs === "image" || $as === "image"){
					$out = `<div class="w-10 w-max-6 h-6 p-4 mx-auto my-2 overflow-auto border bdr-2"><img class="w-12 h-12" src="${result}"/></div>`;
					/*const objectURL = URL.createObjectURL(input);
					frag1 += `<span class="icon-button local d-flex flex-col flex-center gap-8 w-12 h-12 bg-opaque bdr-4 border" onclick="let target = document.getElementById('fileops-viewer-${x}');target.style.display = 'grid';">
						${inArray(ext, imageFiles) ? `<img src="${objectURL}" alt="${input.name}" />`: `<i class="fa fa-(inArray(ext, audioFiles) ? 'music' : (inArray(ext, videoFiles) ? 'video' : ${ext}))" data-src="${objectURL}"></i>`}
						<b class="pos-abs bg-opaque-dark w-6 p-3 bdr-8 text-center text-white" style="top: auto;bottom: 1rem;" >${input.name.slice(0, 18)}</b>
					</span>`;*/
				}
				chatBox.appendChild(loader);
				chatBox.scrollTop = chatBox.scrollHeight;
				setTimeout(function(){
					chatBox.removeChild(loader);
					insertHtml(div, $out);
					insertHtml(chatBox, div, true);
					// chatBox.appendChild(div);
					chatBox.scrollTop = chatBox.scrollHeight;
					if($as === "text") {
						let $highlightElem = div.querySelector("pre");
						$highlightElem.classList.add(`language-${ext}`);
						Prism.highlightElement($highlightElem);
					}
					div = null;
				},1000);
			});
			//const blob = new Blob(input/*, {type:"text/html"}*/);
			//const objectURL = URL.createObjectURL(input);
			fr[`readAs${html.ucWord($as)}`](file);
			//fr.readAsDataURL(file)
		}
	});
	
	function sendMessage() {
		const message = userInput.value.trim();
		if (message !== "") {
			appendMessage("user", message);
			getResponse(message);
			userInput.value = "";
		}
	}
	function appendMessage(sender, message) {
		let loader = Object.assign(document.createElement("div"), {"className": "loader", innerHTML: `<hr /><hr /><hr />`});
		//chatBox.insertAdjacentHTML("beforeend", loader);
		let p = document.createElement("p");
		
		chatBox.appendChild(loader);
		chatBox.scrollTop = chatBox.scrollHeight;
		setTimeout(() => {
			chatBox.removeChild(loader);
			p.textContent = `${sender}: ${message}`;
			chatBox.appendChild(p);
			chatBox.scrollTop = chatBox.scrollHeight;
			p = null;
		}, 750);
	}
	function getResponse(message) {
		if(!message) {
			console.log("Please enter a prompt");
			return;
		}
		let response;
		const greetings = ["Hello!", "Hi there!", "Hey!", "Greetings!"];
		const affirmatives = ["Yes", "Certainly", "Of course", "Absolutely"];
		const negatives = ["No", "Sorry, I can't do that", "Unfortunately not", "I'm afraid not"];
		const thanks = ["You're welcome!", "No problem!", "Glad to help!", "Anytime!"];
		const commands = {
			"help": "You can ask me questions or chat about various topics.",
			"time": getCurrentTime(),
			"date": getCurrentDate(),
			"weather": getWeatherInfo(),
			"joke": getJoke(),
			"fact": getFact(),
			"quote": getQuote(),
			// Add more commands here as needed
		};
		
		message = message.trim().toLowerCase();
		currentPrompt = message;
		//console.log(message, currentPrompt )
		if(message === "open" || message.includes("open")) {
			response = "What should I open?";
			response += `<br /><ul class="d-flex flex-center gap-4 flex-wrap w-12 p-1 bg-opaque-dark bdr-2" style="list-style: none;">
				<li><button id="" class="btn btn-purple" type="button" title="" data-open="image" data-akd-ai-button><I class="fa fa-image"></i></button></li>
				<li><button id="" class="btn btn-purple" type="button" title="" data-open="text" data-akd-ai-button><I class="fa fa-file"></i></button></li>
				<li><button id="" class="btn btn-purple" type="button" title="" data-open="audio" data-akd-ai-button><I class="fa fa-music"></i></button></li>
				<li><button id="" class="btn btn-purple" type="button" title="" data-open="video" data-akd-ai-button><I class="fa fa-video"></i></button></li>
			</ul>`;
			let $fileElement = document.getElementById("myAI-file-input");
			let p = document.createElement("p");
			
			if(!chatBox.contains($fileElement) || !isElement($fileElement)){
			// if(!document.body.contains($fileElement) || !isElement($fileElement)){
				$fileElement = Object.assign(document.createElement("input"), {
					id: "myAI-file-input", 
					// className: "visually-hidden", 
					type: "file", 
					"accept": "*"
				});
				let $fileElementLabel = Object.assign(document.createElement("label"), {
					htmlFor: "myAI-file-input", 
					id: "myAI-file-input-label", 
					className: "visually-hidden"
				});
				// document.body.appendChild($fileElementLabel).appendChild($fileElement);
				chatBox.appendChild($fileElementLabel).appendChild($fileElement);
			}
			
			chatBox.appendChild(loader);
			chatBox.scrollTop = chatBox.scrollHeight;
			setTimeout(function(){
				chatBox.removeChild(loader);
				insertHtml(p, response);
				chatBox.appendChild(p);
				chatBox.scrollTop = chatBox.scrollHeight;
				p = null;
			},1000);
			// setTimeout(() => appendMessage(selectedModelName || 'myAI', response), 1000);
		} else if(message === "load" || message.includes("load")) {
			response = "What should I load?";
			setTimeout(() => appendMessage(selectedModelName || 'myAI', response), 1000);
		} else if(message === "weather") {
			const form = document.getElementById("weather-form");
			const searchInput = document.getElementById("weather-location");
			const typeInput = document.getElementById("weather-type");
			const asInput = document.getElementById("weather-output-as");
			const city = searchInput?.value || "Kingston";
			const type = typeInput?.value || "current";
			const $as = asInput?.value || "json";
			let p = document.createElement('p');
			
			chatBox.appendChild(loader);
			chatBox.scrollTop = chatBox.scrollHeight;
			
			setTimeout(function(){
				const uri = url(city, type, $as);
				const respData = getWeather(city, type, $as);
				console.log("1", url(city, type, $as), respData);
				/* fetch(url(city, type, $as), { origin: "cors" })
				.then(res => {
					console.log("2", url(city, type, $as));
					const respData = resp.json();
					return respData;
				})*/
				Promise.resolve(respData).then(data => {
					console.log("2", url(city, type, $as), message.toLowerCase());
					chatBox.removeChild(loader);
					//let data = res[0];
					console.log("3", url(city, type, $as), message.toLowerCase());
					let weather = data.current, location = data.location;
					p.innerHTML = `${selectedModelName || 'ChatGPT'}: <h2>Current Forcast: ${location.country}</h2>
					<h3> ${location.region}, ${location.name} - (${weather.temp_c}°C)</h3>
					<small class="text-sm">Last Updated: ${weather.last_updated}</small>
					<small class="text-sm">Wind: ${weather.wind_dir}, ${weather.wind_kph}kph</small>`;
					chatBox.appendChild(p);
					chatBox.scrollTop = chatBox.scrollHeight;
					p = null;
				})
				.catch((e) => {
					let sender = selectedModelName || "ChatGPT", message = getWeatherInfo();
					chatBox.removeChild(loader);
					p.textContent = `${sender}: ${message}`;
					chatBox.appendChild(p);
					chatBox.scrollTop = chatBox.scrollHeight;
					p = null;
				})
			}, 100);
		} else {
			if(message in commands) {
				response = commands[message.toLowerCase()];
			} else if(message.includes("thank")) {
				response = getRandomElement(thanks);
			} else if(message.includes("yes")) {
				response = getRandomElement(affirmatives);
			} else if(message.includes("no")) {
				response = getRandomElement(negatives);
			} else {
				response = getRandomElement(greetings);
			}
			
			setTimeout(() => appendMessage(selectedModelName || 'myAI', response), 1000);
		}
	}
	
	function getCurrentTime() {const now = new Date();return `Current time is ${now.toLocaleTimeString()}`;}
	function getCurrentDate() {const now = new Date();return `Today's date is ${now.toDateString()}`;}
	function getWeatherInfo() {
		// Simulate getting weather information from an API
		const weatherData = {
			temperature: getRandomNumber(10, 35),
			condition: getRandomElement(["Sunny", "Cloudy", "Rainy", "Windy"]),
		};
		return `Current weather: ${weatherData.temperature}°C, ${weatherData.condition}`;
	}
	//---------
	const weatherapi_apikey = "038266238bf54f2a83604914251905";
	const url = (city, type = "search", as = "json") =>`http://api.weatherapi.com/v1/${type}.${as?as:"json"}?key=${weatherapi_apikey}&q=${city}`;
	async function getWeather(city, type, as, el) {
		const resp = await fetch(url(city, type, as)/*, { origin: "cors" }*/);
		const respData = await resp.json();
		return respData;
	}
	async function getWeatherByLocation(city, type, as, el) {
		const resp = await fetch(url(city, type, as), { origin: "cors" });
		const respData = await resp.json();
		addWeatherToPage(respData, type, el);
	}
	
	function addWeatherToPage(data, type, $main) {
		// const temp = KtoC(data.main.temp);
		const div = document.createElement("div");
		div.classList.add("weather");
		if(type === "search"){
			let temp = data?.temp_c??34;
			div.innerHTML = `<h2>temperature: ${temp}°C </h2>
			<small>${data[0].name}</small>`;
		} else {
			let weather = data.current, location = data.location;
			div.innerHTML = `<h2>Current Forcast: ${location.country}</h2>
			<h3> ${location.region}, ${location.name} - (${weather.temp_c}°C)</h3>
			<small class="text-sm">Last Updated: ${weather.last_updated}</small>
			<small class="text-sm">Wind: ${weather.wind_dir}, ${weather.wind_kph}kph</small>`;
		}
		// cleanup
		/* $main.innerHTML = "";
		$main.appendChild(div);*/
		loader($main, div)
	}
	function KtoC(K) {return Math.floor(K - 273.15);}
	//----------
	function getJoke() {
		// Simulate getting a random joke
		const jokes = ["Why don't scientists trust atoms? Because they make up everything!",
			"Parallel lines have so much in common. It's a shame they'll never meet.",
			"I told my wife she was drawing her eyebrows too high. She looked surprised.",
			"Why did the scarecrow win an award? Because he was outstanding in his field!"
		];
		return getRandomElement(jokes);
	}

	function getFact() {
		// Simulate getting a random fact
		const facts = ["Ants stretch when they wake up in the morning.", 
			"A group of flamingos is called a flamboyance.", 
			"Honey never spoils.", 
			"The shortest war in history lasted only 38 minutes.", 
			"Octopuses have three hearts.", 
			"The bald eagle (Haliaeetus leucocephalus) is a bird of prey found in North America. A sea eagle, it has two known subspecies and forms a species pair with the white-tailed eagle (Haliaeetus albicilla), which occupies the same niche as the bald eagle in the Palearctic. Its range includes most of Canada and Alaska, all of the contiguous United States, and northern Mexico. It is found near large bodies of open water with an abundant food supply and old-growth trees for nesting.", 
			"The golden eagle (Aquila chrysaetos) is a bird of prey living in the Northern Hemisphere. It is the most widely distributed species of eagle. Like all eagles, it belongs to the family Accipitridae. They are one of the best-known birds of prey in the Northern Hemisphere. These birds are dark brown, with lighter golden-brown plumage on their napes. Immature eagles of this species typically have white on the tail and often have white markings on the wings. Golden eagles use their agility and speed combined with powerful feet and large, sharp talons to hunt a variety of prey, mainly hares, rabbits, and marmots and other ground squirrels.", 
			"The common tern (Sterna hirundo) is a seabird in the family Laridae. This bird has a circumpolar distribution, its four subspecies breeding in temperate and subarctic regions of Europe, Asia and North America. It is strongly migratory, wintering in coastal tropical and subtropical regions. Breeding adults have light grey upperparts, white to very light grey underparts, a black cap, orange-red legs, and a narrow pointed bill. Depending on the subspecies, the bill may be mostly red with a black tip or all black. There are several similar species, including the partly sympatric Arctic tern, which can be separated on plumage details, leg and bill colour, or vocalisations.", 
			"The great blue heron (Ardea herodias) is a large wading bird in the heron family Ardeidae, common near the shores of open water and in wetlands over most of North and Central America, as well as far northwestern South America, the Caribbean and the Galápagos Islands. It is occasionally found in the Azores and is a rare vagrant to Europe. An all-white population found in south Florida and the Florida Keys is known as the great white heron. Debate exists about whether these white birds are a color morph of the great blue heron, a subspecies of it, or an entirely separate species.", 
			`Hawks are birds of prey of the family Accipitridae. They are very widely distributed and are found on all continents except Antarctica.
			<ul>
				<li>The subfamily Accipitrinae includes goshawks, sparrowhawks, sharp-shinned hawks, and others. This subfamily are mainly woodland birds with short broad wings, long tails, and high visual acuity. They hunt by dashing suddenly from a concealed perch.</li>
				<li>In America, members of the Buteo group are also called hawks; this group is called buzzards in other parts of the world. Generally, buteos have broad wings and sturdy builds. They are relatively larger-winged and shorter-tailed than accipiters, and fly further distances in open areas. Buteos descend or pounce on their prey rather than hunting in a fast horizontal pursuit.</li>
			</ul>`
		];
		return getRandomElement(facts);
	}
	
	function getQuote() {
		// Simulate getting a random quote
		const quotes = ["The only way to do great work is to love what you do. – Steve Jobs",
			"In the middle of difficulty lies opportunity. – Albert Einstein",
			"Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill"
		];
		return getRandomElement(quotes);
	}
	
	function getRandomElement(array) {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	}
	
	function getRandomNumber(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min;}
					
}
function ready(callback){
	var state = document.readyState;
	if(state === "complete" || state === "interactive"){
		setTimeout(callback, 0);
	}
	
	document.addEventListener("DOMContentLoaded", callback);
}

/*var inventory, inventorystoragedata = localStorage.getItem("akd-inventory");
if(inventorystoragedata != null) {
	inventory = JSON.parse(inventorystoragedata);
} else {
	Promise.resolve(page.database("./data/json/db.json")).then(res=>{inventory = res.inventory;localStorage.setItem("akd-inventory", JSON.stringify(inventory));return inventory;});
}

document.addEventListener("DOMContentLoaded", e => {
	let $main = document.getElementById("main");
	$main.addEventListener("click", e => {
		let $target = e.target
	}, false);
});
*/
var $siteData = {};
PAGE.database("./data/_json/site.json")
	.then(res => {
		$siteData = res
	})
	.catch(err => console.log(err));
// Create app settings
var settings = {
	debug: false
};

/**
 * Update the settings object
 * @param  {String} key The setting key
 * @param  {*}      val The new value
 */
var setting = function (key, val, overwrite = false) {
	// if the setting doesn't exist, bail
	//if (!(key in settings)) return;
	if((key in settings) && overwrite === false) return;
	// Update the settings
	settings[key] = val;
};

/**
 * Get settings
 * @param  {String} key The setting key (optional)
 * @return {*}          The setting or object of settings
 */
var getSettings = function (key) {
	// If there's a key, get a specific setting
	if(key) {
		return settings[key];
	}
	// Otherwise return the whole settings object
	return Object.assign({}, settings);
};

// Extend myApp
PAGE.extend('setting', setting);
PAGE.extend('getSettings', getSettings);
PAGE.setting("pussy", "fucking");
PAGE.setting("defaultColor", "#10bdf6");
// console.log(PAGE.getSettings("defaultColor"), $siteData);

$(function() {
	
	let df_params = {
		"galleryList": [
			{"alt" : "_48crH8AzXBOrqzoGkadxCcXTsryIquEvagJrFl8MHs", "src" : "_48crH8AzXBOrqzoGkadxCcXTsryIquEvagJrFl8MHs.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "197548", "src" : "197548.png", "ext" : "png", "mime" : "image/png", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "afro_samurai_bloody_wallpaper_by_whit_3_d493zki-fullview", "src" : "afro_samurai_bloody_wallpaper_by_whit_3_d493zki-fullview.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "218942", "src" : "218942.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "54590", "src" : "54590.jpg", "ext" : "jpg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "548UY800", "src" : "548UY800.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "26769573", "src" : "26769573.png", "ext" : "png", "mime" : "image/png", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "Fat-pussy", "src" : "Fat-pussy.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "Fat-pussy1", "src" : "Fat-pussy1.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "download", "src" : "download.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
			{"alt" : "pussy-cream", "src" : "pussy-cream.jpeg", "ext" : "jpeg", "mime" : "image/jpeg", "width" : "", "height" : "", "dimensions" : "×"}, 
		]
	}, df_page = "fileops";
	
	setTimeout(()=>{
		// console.log(PAGE.getSettings("pussy"), $siteData, $siteData.settings.remember_last_page_visited);
		df_page = $siteData.settings.remember_last_page_visited === true && localStorage.getItem("akd-current-page") || "fileops";
		
		document.title = $siteData.site_name;
		PAGE.routes[df_page](df_params);
		$("#page-name").text(df_page);
		// authenticate(function(){page.routes[df_page](df_params)});
		// PAGE.routes.home();
	}, 1000);
	
	$("#finder-toggler").click(e => {$('.page-finder-wrapper').toggleClass("--active");$(e.target).toggleClass("is-active");});
	$("#dom-inspector-toggler").click(e => {$("#dom-inspector-container").toggleClass("--active");$(e.target).toggleClass("is-active");});
	
	// $("#options-toggler").click(e => {$('#options').slideToggle("slow")});
	$(`[data-target="${df_page}"]`).parent().addClass("active");
	$(".menu-toggler").click(e => {$('body').toggleClass("sidebar--active-left");$(".menu-toggler").toggleClass("is-active");/*$(e.target).toggleClass("is-active");$(".menu-mask").toggleClass("active");*/});
	$(".prompt-toggler").click(e => {$('body').toggleClass("sidebar--active-right");$(e.target).toggleClass("is-active");/*$(".menu-mask").toggleClass("active");*/});
	$("#prompt-expand-toggler").click(e => {$('body').toggleClass("sidebar--active-right-expanded");$(e.target).toggleClass("is-active");});
	$("#sidebar-navigation-expand-toggler").click(e => {$('body').toggleClass("sidebar--active-left-expanded");$(e.target).toggleClass("is-active");});
	$("#page-finder-submit").click(function(e){
		let val = $('#page-finder-input').val(), 
		$params = this.dataset.params || this.dataset.itemId || e.target.dataset.params || null;
		val = val.trim().toLowerCase();
		
		if(val && val.length >= 2 && isString(val)){
			if(isFunction(PAGE.routes[val])){
				if(inArray(val, PAGE.restrictedRoutes) && loggedIn === false) authenticate(function(){PAGE.routes[val]($params)});
				else PAGE.routes[val]($params);
				$(".nav-list-item").removeClass("active");
				$(`[data-target="${val}"]`).parent().addClass("active");
				
				$("#page-name").text(val);
			}
		}
	});
	
	$(document).on("click", "[data-akd-button], .menu-mask", function(e){
		e.preventDefault();
		let $this = e.target || this, $target = this.dataset.target || e.target.dataset.target || null, $params = this.dataset.params || this.dataset.itemId || e.target.dataset.params || null, 
		$action = this.dataset.action || e.target.dataset.action || null;
		
		if(!$params){
			$params = df_params
		}
		
		$($this).toggleClass("is-active");
		
		if($target && isString($target)){
			$target = $target.trim().toLowerCase();
			
			if(/*PAGE.strictMode === true && inArray($target, PAGE.allowedRoutes) &&*/ isFunction(PAGE.routes[$target])){
				if(inArray($target, PAGE.restrictedRoutes) && loggedIn === false) authenticate(function(){PAGE.routes[$target]($params)});
				else PAGE.routes[$target]($params);
				$(".nav-list-item").removeClass("active");
				$(this).parent().addClass("active");
				
				$("#page-name").text($target);
				localStorage.setItem("akd-current-page", $target) 
			}
		}
		
		if($action && isString($action)){
			$action = $action.trim().toLowerCase();
			
			if($action === "import-file"){
				var df_width = "60%", df_height = "60%", expd_width = "100%", expd_height = "100%";
				var inventorystoragedata = "{}" //localStorage.getItem("ims-inventory");
				var importer = Object.assign(document.createElement("section"), {
					id: "importer", style: `background-color: purple;position: absolute;z-index: 100;width: ${df_width};height: ${df_height};top: 40%;left: 40%;translate: -40% -40%;`, 
					innerHTML: `<div class="d-flex flex-center p-3 w-12">
						<span class="d-flex flex-center p-3 w-auto mr-auto">
							<input id="importer-input" class="" type="file" data-akd-input />
						</span>
						<span class="d-flex flex-center p-3 w-auto ml-auto gap-2">
							<button class="importer-expand-btn text-lg mr-auto">[  ]</button>
							<button id="importer-close-btn" class="text-lg mr-auto">×</button>
						</span>
					</div>
					<div id="importer-display-box" class="d-flex flex-center p-3 w-12">
						<!--<textarea class="w-12 h-12 ws-pre" onfocus="this.select();">${JSON.stringify(JSON.parse(inventorystoragedata), null, "\t")}</textarea>-->
					</div>
					<span id="importer-scroll-to-top" class="d-flex flex-center p-8 w-auto ml-auto bdr-8 bg-opaque-dark" style="position: fixed;top: auto;bottom: 1.5rem;right: 1.5rem;">
						<i class="fa fa-chevron-up"></i>
					</span>
					`
				});
				
				document.body.appendChild(importer);
				
				importer.querySelector("#importer-close-btn").addEventListener("click", e=>{
					document.body.removeChild(document.querySelector("#importer"))
				});
				importer.querySelector(".importer-expand-btn").addEventListener("click", e=>{
					// importer = importer || document.querySelector("#importer");
					importer.classList.toggle("expanded");
					if(importer.classList.contains("expanded")){
						e.target.textContent = "[]";
						Object.assign(importer.style, {width: expd_width, height: expd_height, top: 0, left: 0, translate: "0 0", transition: "all ease 0.015s"});
					} else {
						e.target.textContent = "[  ]";
						Object.assign(importer.style, {width: df_width, height: df_height, top: "40%", left: "40%", translate: "-40% -40%", transition: "height linear 0.5s, width linear 0.5s"});
					}
				});
				importer.querySelector("#importer-scroll-to-top").addEventListener("click", e=>{
					importer.querySelector("textarea").scrollTo(0, 0);
				});
				importer.querySelector("#importer-input").addEventListener("change", e=>{
					let file = e.target.files[0], fr = new FileReader();
					//if(isArray(file) || isArrayLike(file)){
					fr.onload = (e) => {
						let result = e.target.result;
						//console.log(result);
						buildViewer(result,"text");
					};
					fr.readAsText(file);
					//}
				});
				
			}
			
			if($action === "export-database"){
				
			}
			
			if($action === "view-database"){
				let localstoragedata = localStorage.getItem("akd-tasks"), inventorystoragedata = localStorage.getItem("ims-inventory");
				PAGE.database().then(res=>{
					//console.log(res);
					if(isObject(res)){
						inventorystoragedata = JSON.stringify(res);
					}
					var viewer = Object.assign(document.createElement("section"), {
						id: "viewer", style: "background-color: red;position: absolute;z-index: 100;width: 60%;height: 60%;top: 40%;left: 40%;translate: -40% -40%;", 
						innerHTML: `<div class="d-flex flex-center p-3 w-12">
							<span class="d-flex flex-center p-3 w-auto mr-auto">
								<button class="viewer-expand-btn text-lg mr-auto">[  ]</button>
							</span>
							<span class="d-flex flex-center p-3 w-auto ml-auto">
								<button id="viewer-close-btn" class="text-lg mr-auto">×</button>
							</span>
						</div>
						<textarea class="w-12 h-12 ws-pre" onfocus="this.select();">${JSON.stringify(JSON.parse(inventorystoragedata), null, "\t")}</textarea>
						<span id="viewer-scroll-to-top" class="d-flex flex-center p-8 w-auto ml-auto bdr-8 bg-opaque-dark" style="position: fixed;top: auto;bottom: 1.5rem;right: 1.5rem;">
							<i class="fa fa-chevron-up"></i>
						</span>
						`
					});
					
					document.body.appendChild(viewer);
					
					viewer.querySelector("#viewer-close-btn").addEventListener("click", e=>{
						document.body.removeChild(document.querySelector("#viewer"))
					});
					viewer.querySelector(".viewer-expand-btn").addEventListener("click", e=>{
						// viewer = viewer || document.querySelector("#viewer");
						viewer.classList.toggle("expanded");
						if(viewer.classList.contains("expanded")){
							e.target.textContent = "[]";
							Object.assign(viewer.style, {width: "100%", height: "100%", top: 0, left: 0, translate: "0 0", transition: "all ease 0.015s"});
						} else {
							e.target.textContent = "[  ]";
							Object.assign(viewer.style, {width: "60%", height: "60%", top: "40%", left: "40%", translate: "-40% -40%", transition: "height linear 0.5s, width linear 0.5s"});
						}
					});
					viewer.querySelector("#viewer-scroll-to-top").addEventListener("click", e=>{
						viewer.querySelector("textarea").scrollTo(0, 0);
					});
				})
				.catch(e=>console.log(e));
			}
		}
		
		if(/* $this.id !== "main-sidebar" &&*/$(e.target).hasClass("menu-mask") && $("body").hasClass("--sidebar-active")) {
			//console.log($target, this, e.target, e);
			$('body').removeClass("--sidebar-active");
			$(".menu-toggler").removeClass("is-active");
		}
		
		if($this.id === "filter-submit-button"){
			let tagText = "", found = [], items = [], 
			cat = $("#filter-category").val(), term = $("#filter-term").val(), isCaseSensitive = $("#filter-case-sensitive").prop("checked");
			term = term.trim();
			//console.log(cat, term, $siteData[cat], $siteData[cat].length)
			if(cat === "audio" || cat === "videos" || cat === "images" || cat === "snippets" || cat === "fragments"){
				items = cat === "audio" && $siteData.audio.files && isArray($siteData.audio.files) ? $siteData.audio.files : 
					(cat === "videos" && $siteData.video.files && isArray($siteData.video.files) ? $siteData.video.files : 
					(cat === "images" && $siteData.gallery.images && isArray($siteData.gallery.images) ? $siteData.gallery.images : 
					[]));
			} else if($siteData[cat] && isArray($siteData[cat]) && $siteData[cat].length > 0){
				items = $siteData[cat];
			}
			if(isArray(items) && items.length > 0){
				items.forEach(function(item, i){
					// title": "", "artist" : "", "genre" : "", "album": ""
					term = !isCaseSensitive ? term.toLowerCase() : term;
					if((tagText = item?.title?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					} else 
					if((tagText = item?.genre?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					} else 
					if((tagText = item?.artist?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					} else 
					if((tagText = item?.album?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					} else 
					if((tagText = item?.src?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					} else 
					if((tagText = item?.alt?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					} else 
					if((tagText = item?.mime?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					} else 
					if((tagText = item?.name?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					} else 
					if((tagText = item?.description?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					} else 
					if((tagText = item?.note?.toLowerCase()??null) && (tagText.indexOf(term) > -1 || tagText.includes(term))) {
						found.push(item);
					}
				});
				
				if(isArray(found) && found.length > 0){
					loader("#content-display", displayInventoryItem(found, cat))
						//.then(()=>{});
				}
				//console.log(items, term, found)
			}
		}
		
		if($this.id === "database-import-button"){
			let localstoragedata = localStorage.getItem("akd-tasks"), inventorystoragedata = localStorage.getItem("ims-inventory"), 
			dislayElem = $("#database-display")
			
			dislayElem.val(JSON.stringify(JSON.parse(inventorystoragedata), null, "\t"));
			//dislayElem.text(JSON.stringify(JSON.parse(inventorystoragedata), null, "\t"))
		}
		
		if($this.id === "database-update-button"){
			let localstoragedata = localStorage.getItem("akd-tasks"), inventorystoragedata = localStorage.getItem("ims-inventory"), 
			dislayElem = $("#database-display"), 
			val = dislayElem.val(), 
			//val = dislayElem.text(), 
			newVal = (isString(val) && val.length > 2) ? JSON.stringify(val) : ""
			
			console.log("ims-inventory", newVal)
			//localStorage.setItem("ims-inventory", newVal)
		}
		
		if($this.hasAttribute("data-akd-sidebar-toggle-button")){
			let $parent = $this.closest("[data-akd-window]"), $sidebar = $parent && $("[data-akd-window-sidebar]", $parent);
			//$sidebar.toggleClass("--sidebar-active");
			$sidebar.hasClass("right--side") ? $($parent).toggleClass("sidebar--active-right") : $($parent).toggleClass("sidebar--active-left");
		}
		
		if($this.hasAttribute("data-akd-toggle-button")){
			let _target = $this.getAttribute("data-toggle-target");
			console.log(_target)
			if(_target){
				$(_target).toggleClass("--active");
			}
		}
		
		if($this.matches(".detail-list-toggler")){
			let $i = $this.querySelector("i.fa"), $parent = $this.closest(".detail-list-box"), $dlist = $parent && $parent.querySelector(".detail-list");
			console.log($parent, $dlist, $dlist.scrollHeight)
			$dlist.classList.toggle("--toggled");
			if($dlist.classList.contains("--toggled")) {
				Object.assign($dlist.style, {height: 0, overflow: "hidden"});
				$i.classList.replace("fa-minus", "fa-plus");
			} else {
				Object.assign($dlist.style, {height: $dlist.scrollHeight + "px", overflow: "auto"});
				$i.classList.replace("fa-plus", "fa-minus");
			}
		}
	});
	
	// ----------------------------------------------------++++
	myAI({chatDisplay: "prompt-body", promptInput: "prompt-input", promptSend: "prompt-submit"});
	_.domInspector({parent: "#dom-inspector-container"/*"document.body#prompt-body"*/}).init();
});