(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.AKD_TemplateEngine = factory());
}(this, (function(){
	'use strict';
	
	function isFunction(val){return "undefined" !== typeof val;}
	function decamelize(str, sep) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}
		sep = typeof sep === 'undefined' ? '_' : sep;
		return str.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2').toLowerCase();
	}
	function dig(obj, target) {return target in obj ? obj[target] : Object.values(obj).reduce((acc, val) => {if (acc !== undefined) return acc;if (typeof val === 'object') return dig(val, target);}, undefined);}
	/* const data = {level1: {level2: {level3: 'some data'}}};
		dig(data, 'level3'); // 'some data'
		dig(data, 'level4'); // undefined
	*/
	async function includeFile(url, settings, callback) {
		if (!location.host) {
			return console.info('Miss the info bar? Run from a server to avoid a cross-origin error.');
		}
		const result = {};
		settings = typeof settings === "object" ? settings : {};
		var content = fetch(url, settings)
			.then(data=>data.text())
			.then(res=>{return res})
			.catch(er=>console.error(er));
			
		Promise.resolve(content).then(res=>{
			//result.content = res;
			Object.assign(result, {content: res});
		});
		return result;
	}
	var sleep = function sleep(ms) {
		return new Promise(function (resolve) {
			return setTimeout(resolve, ms);
		});
	};
	var cache = {};
	function tmpl(str, data, opts = {}, elem){
		const err = [], includes = [], variable = opts?.variable||"obj";
		var sleeping = true, content;
		
		/* const tpl1 = (str,data) => {var code = "var p = [],print = function(){p.push.apply(p,arguments);};with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');", fn = !/\W/.test(str) ? cache[str] = cache[str] || tpl1(tmpl.load(str)) : new Function("obj", code);return isFunction(fn) ? ( data ? fn(data) : fn) : function (data){return tpl1(data);};}, 
		tpl2 = (str,data) => {var code = "var p = [],print = function(){p.push.apply(p,arguments);};with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<#").join("\t").replace(/((^|#>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)#>/g, "',$1,'").split("\t").join("');").split("#>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');", fn = !/\W/.test(str) ? cache[str] = cache[str] || tpl2(tmpl.load(str)) : new Function("obj", code);return isFunction(fn) ? ( data ? fn(data) : fn) : function (data){return tpl2(data);};}, 
		tpl3 = (str,data) => {var code = "var p = [],print = function(){p.push.apply(p,arguments);};with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("{{").join("\t").replace(/((^|}})[^\t]*)'/g, "$1\r").replace(/\t=(.*?)}}/g, "',$1,'").split("\t").join("');").split("}}").join("p.push('").split("\r").join("\\'") + "');}return p.join('');", fn = !/\W/.test(str) ? cache[str] = cache[str] || tpl3(tmpl.load(str)) : new Function("obj", code);return isFunction(fn) ? ( data ? fn(data) : fn) : function (data){return tpl3(data);};}; */
		//console.log(/@@include\((.+?)\)/g.exec(str), str.match(/@@include/))
		try {
			/* 
			 * NOTE: @@include only works if a valid {elem} is provided
			 * valid formats: 
			 * @@include({"url": "app/fragments/html/dot.html","action":"message"})
			 * @@include(app/fragments/html/dot.html)
			 * invalid formats: 
			 * @@include({"url": app/fragments/html/dot.html , "action":message})
			 * @@include("app/fragments/html/dot.html")
			 */
			if(str.match(/@@include/) && elem instanceof HTMLElement){
				/* str = str.replace(/@@include\(([\w\.]*)\)/g,'<iframe src="$1"></iframe>')
				str = str.replace(/@@include(.+?)/g,"<iframe src='$1'></iframe>") */
				str.replace(/@@include\((.+?)\)/g, async function (match, key) {
					let url = key;
					try{
						let p = JSON.parse(key);
						url = p.url;
					} catch(e){}
					content = await includeFile(url, {method: 'GET'});
					//content = typeof content === "object" && (('content' in content) || content.content) ? content.content : content;
					includes.push({'url':url, 'content':content||''});
					sleeping = false;
					
					return key// || content || `<iframe src="${url}"></iframe>`;
				});
				setTimeout(function(){
					if(sleeping === false){
						let x = -1;
						str = str.replace(/@@include\((.+?)\)/g, function (match, key) {
							let url = key;
							x++;
							try{
								let p = JSON.parse(key);
								url = p.url;
							} catch(e){}
							return includes[x] && includes[x].url === url ? includes[x]?.content?.content : key;
						});
						var code = (str.match(/<#/) || str.match(/{{/)) ? "var p = [],print = function(){p.push.apply(p,arguments);};with("+ variable +"){p.push('" + str.replace(/\t(?![^#]*#>)/g,"\\t").replace(/(\r?\n)(?![^#]*#>)/g,"\\n").replace(/\t(?![^%]*%>)/g,"\\t").replace(/(\r?\n)(?![^%]*%>)/g,"\\n").replace(/\t(?![^{{]*}})/g,"\\t").replace(/(\r?\n)(?![^{{]*}})/g,"\\n")
							.replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").replace(/'(?=[^#]*#>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g,"',$1,'").split("<#").join("');").split("#>").join("p.push('").replace(/<%=(.+?)%>/g,"',$1,'").replace(/<%(.+?)%>/g,"',$1,'").split("<%").join("');").split("%>").join("p.push('").replace(/{{=(.+?)}}/g,"',$1,'").split("{{").join("');").split("}}").join("p.push('") + "');}return p.join('');"
						: "var p = [],print = function(){p.push.apply(p,arguments);};" + "with("+ variable +"){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');";
						var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(tmpl.load(str)) : new Function(variable, code);
						var output = isFunction(fn) ? ( data ? fn(data) : fn) : (function (data){return tmpl(data);})();
						
						elem.innerHTML = output;
					}
				}, 1000);
			} else {
				var code = (str.match(/<#/) || str.match(/{{/)) ? "var p = [],print = function(){p.push.apply(p,arguments);};with("+ variable +"){p.push('" + str.replace(/\t(?![^#]*#>)/g,"\\t").replace(/(\r?\n)(?![^#]*#>)/g,"\\n").replace(/\t(?![^%]*%>)/g,"\\t").replace(/(\r?\n)(?![^%]*%>)/g,"\\n").replace(/\t(?![^{{]*}})/g,"\\t").replace(/(\r?\n)(?![^{{]*}})/g,"\\n")
					.replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").replace(/'(?=[^#]*#>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g,"',$1,'").split("<#").join("');").split("#>").join("p.push('").replace(/<%=(.+?)%>/g,"',$1,'").replace(/<%(.+?)%>/g,"',$1,'").split("<%").join("');").split("%>").join("p.push('").replace(/{{=(.+?)}}/g,"',$1,'").split("{{").join("');").split("}}").join("p.push('") + "');}return p.join('');"
				: "var p = [],print = function(){p.push.apply(p,arguments);};" + "with("+ variable +"){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');";
				var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(tmpl.load(str)) : new Function(variable, code);
				var output = isFunction(fn) ? ( data ? fn(data) : fn) : (function (data){return tmpl(data);})();
				if(elem instanceof HTMLElement)
					elem.innerHTML = output;
				return output
			}
		} catch(er){
			err.push(er.message);
			try{
				return _templater(str, opts)(data);
			} catch(e){
				err.push(e.message);
				try{
					return absurdTemplateEngine(str, data);
				} catch(e){
					err.push(e.message);
					//console.error("'" + e.message + "'", " in \n\nCode:\n", str, "\n");
				}
			}
			console.error("Error in \n\nCode:\n", str, "\n\Messages:\n", ...err);
			return "<%= tmpl error: "+err.join(" \t\n")+" %>";
		}
	}
	tmpl.load = function (id) {return document.getElementById(id)?.innerHTML??'';}
	
	function _templater(templateText, opts){const err = [], variable = opts?.variable||"obj";return new Function(variable, "var output=" + JSON.stringify(templateText).replace(/<%=(.+?)%>/g, '"+($1)+"').replace(/<%(.+?)%>/g, '";$1\noutput+="') + ";return output;");}
	
	function absurdTemplateEngine(html, data, options){
		let re = options?.interpolate || /<%(.+?)%>/g, //<%=([\s\S]+?)%>/g
		variable = options?.variable || "obj", 
		reExp = /(^( )?(var|let|const|if|for|else|switch|case|break|forEach|{|}|;))(.*)?/g, 
		code = 'with('+variable+') { var r=[];\n', 
		cursor = 0, 
		result, match;
		
		var add = function(line, js) {
			js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') : (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
			return add;
		}
		while(match = re.exec(html)){
			add(html.slice(cursor, match.index))(match[1], true);
			cursor = match.index + match[0].length;
		}
		add(html.substr(cursor, html.length - cursor));
		code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
		try{result = new Function(variable, code).apply(data, [data]);} catch(err){console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n");}
		
		return result;
	}
	
	/* Nano Templates - https://github.com/trix/nano */
	function nano(template, data) {
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
	result:
		document.getElementById('testLayout').innerHTML = nano("<p>Hello {user.first_name} {user.last_name}! Your account is <strong>{user.account.status}</strong></p>", data);
	 */
	// ---- internal support stuff

	// Replace {{variable}} in `s` with the template data in `d`.
	function parseTemplate(s, d, o, elem) {
		const err = [], includes = [], variable = o?.interpolate || /{{([\s\S]+?)}}/g; // /\{{([a-zA-Z|\w\.]*)\}}/g
		var sleeping = true, content;
		
		s = (s instanceof HTMLElement ? s.innerHTML : s).replace(variable, function (str, key) {
		//.replace(/* /{{([a-zA-Z]+)}}/g *//\{{([a-zA-Z|\w\.]*)\}}/g, function (str, key) {
			//return d.hasOwnProperty(key) ? d[key] : (typeof v !== "undefined" && v !== null) ? v : str;
			return d.hasOwnProperty(key) ? d[key] : (function(d,key){
				var keys = key.split("."), v = d[keys.shift()];
				for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
				return (typeof v !== "undefined" && v !== null) ? v : ""
			})(d,key);
		});
		
		if(s.match(/@@include/) && elem instanceof HTMLElement){
			/* s = s.replace(/@@include\(([\w\.]*)\)/g,'<iframe src="$1"></iframe>')
			s = s.replace(/@@include(.+?)/g,"<iframe src='$1'></iframe>") */
			s.replace(/@@include\((.+?)\)/g, async function (match, key) {
				let url = key;
				try{
					let p = JSON.parse(key);
					url = p.url;
				} catch(e){}
				content = await includeFile(url, {method: 'GET'});
				//content = typeof content === "object" && (('content' in content) || content.content) ? content.content : content;
				includes.push({'url':url, 'content':content||''});
				sleeping = false;
				
				return key// || content || `<iframe src="${url}"></iframe>`;
			});
			sleep(1000).then
			//setTimeout
			(function(){
				if(sleeping === false){
					let x = -1;
					s = s.replace(/@@include\((.+?)\)/g, function (match, key) {
						let url = key;
						x++;
						try{
							let p = JSON.parse(key);
							url = p.url;
						} catch(e){}
						return includes[x] && includes[x].url === url ? includes[x]?.content?.content : key;
					});
					
					elem.innerHTML = s;
				}
			}, 1000);
		}
		return s;
	}
	
	function renderTemplate(str, data, opts, engine = 'default', guard = false){
		let out = '';
		str = str instanceof HTMLElement ? str.innerHTML : str;
		if(engine === "lodash" && isFunction(window['lodashTemplateEngine'])){
			out = lodashTemplateEngine(str, opts, guard)(data);
		} else if(engine === "underscore" && isFunction(window['underscoreTemplateEngine'])){
			out = underscoreTemplateEngine(str, data, opts);
		} else if(engine === "absurd" && isFunction(window['absurdTemplateEngine'])){
			out = absurdTemplateEngine(str, opts, data);
		} else if(engine === "custom" && isFunction(window['customTemplateEngine'])){
			out = customTemplateEngine(str, data, opts);
		} else if(engine === "nano"){
			out = nano(str, data, opts);
		} /* else if(engine === "default" || engine === "") */{
			out = tmpl(str, data, opts, engine);
		}
		
		return out;
	}
	
	var use = {
		lodash(str, data, opts, guard){
			if(isFunction(window['lodashTemplateEngine'])){return lodashTemplateEngine(str, opts, guard)(data);}
		}, 
		underscore(str, data, opts){
			if(isFunction(window['underscoreTemplateEngine'])){return underscoreTemplateEngine(str, data, opts);}
		}, 
		render: renderTemplate, 
		absurd: absurdTemplateEngine, 
		nano, 
		parseTemplate, 
		renderTemplate
	}
	//return renderTemplate;
	return use;
})));
var addEventListener = function(obj, evt, fnc) {
    if (obj.addEventListener) { // W3C model
        obj.addEventListener(evt, fnc, false);
        return true;
    } else if (obj.attachEvent) { // Microsoft model
        return obj.attachEvent('on' + evt, fnc);
    }
}
var cache = { events: {} };
var api = {};
api.__handleEvents = function(next) {		
	if(this.el) {
		var self = this;
		var registerEvent = function(el) {
			var attrValue = el.getAttribute('data-absurd-event');
			var processAttributes = function(attrValue) {
				attrValue = attrValue.split(":");
				if(attrValue.length >= 2) {
					var eventType = attrValue[0];
					var methodName = attrValue[1];
					attrValue.splice(0, 2);
					var args = attrValue;
					if(!cache.events[eventType] || cache.events[eventType].indexOf(el) < 0) {
						if(!cache.events[eventType]) cache.events[eventType] = [];
						cache.events[eventType].push(el);
						addEventListener(el, eventType, function(e) {
							if(typeof self[methodName] === 'function') {
								var f = self[methodName];
								f.apply(self, [e].concat(args));
							}
						});
					}
				}
			}
			attrValue = attrValue.split(/, ?/g);
			for(var i=0; i<attrValue.length; i++) processAttributes(attrValue[i]);
		}
		if(this.el.hasAttribute && this.el.hasAttribute('data-absurd-event')) {
			registerEvent(this.el);
		}
		var els = this.el.querySelectorAll ? this.el.querySelectorAll('[data-absurd-event]') : [];
		for(var i=0; i<els.length; i++) {
			registerEvent(els[i]);
		}
	}
	next();
	return this;
}

function onImageLoaded2(){
	var cropMarginX = 165,cropMarginY = 95,newWidth = 150,newHeight = 150,canvas = $('<canvas />').attr({id:'canvas-'+xi,width:imgObject.width,height:imgObject.height})
	.hide().appendTo('#page-file-parser-inner #croppedImage-'+xi),
	ctx = canvas.get(0).getContext('2d'),
	a = $('<a download="cropped-image" id="download-link-'+xi+'" title="click to download this image" />'),
	cimg = $('<img id="cimg-'+xi+'" />'),
	cropCoords = {
		topLeft : {x : cropMarginX,y : cropMarginY},
		bottomRight :{x : imgObject.width - cropMarginX,y : imgObject.height - cropMarginY},
		destX : newWidth,
		destY : newHeight,
	};
	ctx.drawImage(imgObject,cropCoords.topLeft.x,cropCoords.topLeft.y,cropCoords.bottomRight.x,cropCoords.bottomRight.y,0,0,imgObject.width,imgObject.height);
	//ctx.drawImage(imgObject,cropCoords.topLeft.x,cropCoords.topLeft.y,cropCoords.bottomRight.x,cropCoords.bottomRight.y,cropCoords.destX,cropCoords.destY,imgObject.width,imgObject.height);
	var base64ImageData = canvas.get(0).toDataURL();
	cimg.attr({'src':base64ImageData /* 'proxy.php?img='+encodeURIComponent()*/,'alt':'cropped image'}).css({'width':newWidth,'height':newHeight}).appendTo('#page-file-parser-inner #croppedImage');
	a.attr('href',base64ImageData).text('cropped image').appendTo('#page-file-parser-inner #croppedImage');
	a.clone().attr({id:'download-link-clone-'+xi,'href':imgObject.src,'download':'origial-image'}).text('origial image').appendTo('#page-file-parser-inner #croppedImage');
    canvas.remove();
	xi++;
}
function onImageLoaded(){
	if(loadTimer != null) clearTimeout(loadTimer);
	if(!imgObject.complete){
		loadTimer = setTimeout(function(){
			onImageLoaded();
		},3)
	} else {
		onPreloadComplete();
	}
}
function onPreloadComplete(){
	var newImg = getImagePortion(imgObject,120,150,150,80,2);
	document.getElementById('croppedImage').innerHTML = '<img alt="" src="'+newImg+'" />'
}
function getImagePortion(imgObj,newWidth,newHeight,startX,startY,ratio){
	var tnCanvas = document.createElement('canvas');
	var tnCanvasContext = tnCanvas.getContext('2d');
	tnCanvas.width = newWidth;
	tnCanvas.height = newHeight;
	var bufferCanvas = document.createElement('canvas');
	var bufferCanvasContext = bufferCanvas.getContext('2d');
	bufferCanvas.width = imgObj.width;
	bufferCanvas.height = imgObj.height;
	bufferCanvasContext.drawImage(imgObj,0,0);
	//tnCanvasContext.drawImage(bufferCanvas,startX,startY,newWidth * ratio,newHeight * ratio,0,0,newWidth,newHeight);
	tnCanvasContext.drawImage(bufferCanvas,startX,startY,newWidth * ratio,newHeight * ratio,0,0,imgObj.width,imgObj.height);
	return tnCanvas.toDataURL();
}
/**
     * Creates a new object of the provided class and will call the constructor with
     * any additional argument supplied.
     */
    function create(ctor) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var obj = Object.create(ctor.prototype);
        ctor.apply(obj, args);
        return obj;
    }
    /**
     * Copies all properties of source into destination. The optional parameter "overwrite" allows to control
     * if existing properties on the destination should be overwritten or not. Defaults to true (overwrite).
     */
    function mixin(destination, source, overwrite) {
        if (overwrite === void 0) { overwrite = true; }
        if (!types_1.isObject(destination)) {
            return source;
        }
        if (types_1.isObject(source)) {
            Object.keys(source).forEach(function (key) {
                if (key in destination) {
                    if (overwrite) {
                        if (types_1.isObject(destination[key]) && types_1.isObject(source[key])) {
                            mixin(destination[key], source[key], overwrite);
                        }
                        else {
                            destination[key] = source[key];
                        }
                    }
                }
                else {
                    destination[key] = source[key];
                }
            });
        }
        return destination;
    }
    
    function assign(destination) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        sources.forEach(function (source) { return Object.keys(source).forEach(function (key) { return destination[key] = source[key]; }); });
        return destination;
    }
    
    function equals(one, other) {
        if (one === other) {
            return true;
        }
        if (one === null || one === undefined || other === null || other === undefined) {
            return false;
        }
        if (typeof one !== typeof other) {
            return false;
        }
        if (typeof one !== 'object') {
            return false;
        }
        if ((Array.isArray(one)) !== (Array.isArray(other))) {
            return false;
        }
        var i;
        var key;
        if (Array.isArray(one)) {
            if (one.length !== other.length) {
                return false;
            }
            for (i = 0; i < one.length; i++) {
                if (!equals(one[i], other[i])) {
                    return false;
                }
            }
        } else {
            var oneKeys = [];
            for (key in one) {
                oneKeys.push(key);
            }
            oneKeys.sort();
            var otherKeys = [];
            for (key in other) {
                otherKeys.push(key);
            }
            otherKeys.sort();
            if (!equals(oneKeys, otherKeys)) {
                return false;
            }
            for (i = 0; i < oneKeys.length; i++) {
                if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
                    return false;
                }
            }
        }
        return true;
    }
    
    function arrayToHash(array) {
        var result = {};
        for (var i = 0; i < array.length; ++i) {
            result[array[i]] = true;
        }
        return result;
    }
    
    /**
     * Given an array of strings, returns a function which, given a string
     * returns true or false whether the string is in that array.
     */
    function createKeywordMatcher(arr, caseInsensitive) {
        if (caseInsensitive === void 0) { caseInsensitive = false; }
        if (caseInsensitive) {
            arr = arr.map(function (x) { return x.toLowerCase(); });
        }
        var hash = arrayToHash(arr);
        if (caseInsensitive) {
            return function (word) {
                return hash[word.toLowerCase()] !== undefined && hash.hasOwnProperty(word.toLowerCase());
            };
        }
        else {
            return function (word) {
                return hash[word] !== undefined && hash.hasOwnProperty(word);
            };
        }
    }
    
    var WindowManager = /** @class */ (function () {
        function WindowManager() {
            // --- Zoom Level
            this._zoomLevel = 0;
            this._lastZoomLevelChangeTime = 0;
            this._onDidChangeZoomLevel = new event_1.Emitter();
            this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
            // --- Accessibility
            this._accessibilitySupport = 0 /* Unknown */;
            this._onDidChangeAccessibilitySupport = new event_1.Emitter();
            this.onDidChangeAccessibilitySupport = this._onDidChangeAccessibilitySupport.event;
        }
        WindowManager.prototype.getZoomLevel = function () {
            return this._zoomLevel;
        };
        WindowManager.prototype.getTimeSinceLastZoomLevelChanged = function () {
            return Date.now() - this._lastZoomLevelChangeTime;
        };
        // --- Pixel Ratio
        WindowManager.prototype.getPixelRatio = function () {
            var ctx = document.createElement('canvas').getContext('2d');
            var dpr = window.devicePixelRatio || 1;
            var bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            return dpr / bsr;
        };
        WindowManager.prototype.getAccessibilitySupport = function () {
            return this._accessibilitySupport;
        };
        //WindowManager.INSTANCE = new WindowManager();
        return WindowManager;
    }());
    function getZoomLevel() {return WindowManager.INSTANCE.getZoomLevel();}
    /** Returns the time (in ms) since the zoom level was changed */
    function getTimeSinceLastZoomLevelChanged() {return WindowManager.INSTANCE.getTimeSinceLastZoomLevelChanged();}
    function onDidChangeZoomLevel(callback) {return WindowManager.INSTANCE.onDidChangeZoomLevel(callback);}
    function getPixelRatio() {return WindowManager.INSTANCE.getPixelRatio();}
    function getAccessibilitySupport() {return WindowManager.INSTANCE.getAccessibilitySupport();}
    function onDidChangeAccessibilitySupport(callback) {return WindowManager.INSTANCE.onDidChangeAccessibilitySupport(callback);}
    
    var userAgent = navigator.userAgent, 
    isIE = (userAgent.indexOf('Trident') >= 0), 
    isEdge = (userAgent.indexOf('Edge/') >= 0), 
    isEdgeOrIE = isIE || isEdge, 
    isFirefox = (userAgent.indexOf('Firefox') >= 0), 
    isWebKit = (userAgent.indexOf('AppleWebKit') >= 0), 
    isChrome = (userAgent.indexOf('Chrome') >= 0), 
    isSafari = (userAgent.indexOf('Chrome') === -1) && (userAgent.indexOf('Safari') >= 0), 
    isIPad = (userAgent.indexOf('iPad') >= 0), 
    isEdgeWebView = isEdge && (userAgent.indexOf('WebView/') >= 0);
    function show() {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        for (var _a = 0, elements_1 = elements; _a < elements_1.length; _a++) {
            var element = elements_1[_a];
            element.style.display = '';
            element.removeAttribute('aria-hidden');
        }
    }
    
    function hide() {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        for (var _a = 0, elements_2 = elements; _a < elements_2.length; _a++) {
            var element = elements_2[_a];
            element.style.display = 'none';
            element.setAttribute('aria-hidden', 'true');
        }
    }
   
    function clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    
    function removeNode(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    
    function isInDOM(node) {
        while (node) {
            if (node === document.body) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
    function append(parent) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) { return parent.appendChild(child); });
        return children[children.length - 1];
    }
    
    var SELECTOR_REGEX = /([\w\-]+)?(#([\w\-]+))?((.([\w\-]+))*)/;
    function $_(description, attrs) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var match = SELECTOR_REGEX.exec(description);
        if (!match) {
            throw new Error('Bad use of emmet');
        }
        var result = document.createElement(match[1] || 'div');
        if (match[3]) {
            result.id = match[3];
        }
        if (match[4]) {
            result.className = match[4].replace(/\./g, ' ').trim();
        }
        attrs = attrs || {};
        Object.keys(attrs).forEach(function (name) {
            var value = attrs[name];
            if (/^on\w+$/.test(name)) {
                result[name] = value;
            }
            else if (name === 'selected') {
                if (value) {
                    result.setAttribute(name, 'true');
                }
            }
            else {
                result.setAttribute(name, value);
            }
        });
        children
            .filter(function (child) { return !!child; })
            .forEach(function (child) {
            if (child instanceof Node) {
                result.appendChild(child);
            }
            else {
                result.appendChild(document.createTextNode(child));
            }
        });
        return result;
    }
	function findParentWithAttribute(node, attribute) {
        while (node) {
            if (node instanceof HTMLElement && node.hasAttribute(attribute)) {
                return node;
            }
            node = node.parentNode;
        }
        return null;
    }
    
    function renderText(text, options) {
        if (options === void 0) { options = {}; }
        var element = createElement(options);
        element.textContent = text;
        return element;
    }
    
    function renderFormattedText(formattedText, options) {
        if (options === void 0) { options = {}; }
        var element = createElement(options);
        _renderFormattedText(element, parseFormattedText(formattedText), options.actionHandler);
        return element;
    }
    
    /**
     * Create html nodes for the given content element.
     */
    function renderMarkdown(markdown, options) {
        if (options === void 0) { options = {}; }
        var element = createElement(options);
        // signal to code-block render that the
        // element has been created
        var signalInnerHTML;
        var withInnerHTML = new Promise(function (c) { return signalInnerHTML = c; });
        var renderer = new marked.Renderer();
        renderer.image = function (href, title, text) {
            var dimensions = [];
            if (href) {
                var splitted = href.split('|').map(function (s) { return s.trim(); });
                href = splitted[0];
                var parameters = splitted[1];
                if (parameters) {
                    var heightFromParams = /height=(\d+)/.exec(parameters);
                    var widthFromParams = /width=(\d+)/.exec(parameters);
                    var height = heightFromParams ? heightFromParams[1] : '';
                    var width = widthFromParams ? widthFromParams[1] : '';
                    var widthIsFinite = isFinite(parseInt(width));
                    var heightIsFinite = isFinite(parseInt(height));
                    if (widthIsFinite) {
                        dimensions.push("width=\"" + width + "\"");
                    }
                    if (heightIsFinite) {
                        dimensions.push("height=\"" + height + "\"");
                    }
                }
            }
            var attributes = [];
            if (href) {
                attributes.push("src=\"" + href + "\"");
            }
            if (text) {
                attributes.push("alt=\"" + text + "\"");
            }
            if (title) {
                attributes.push("title=\"" + title + "\"");
            }
            if (dimensions.length) {
                attributes = attributes.concat(dimensions);
            }
            return '<img ' + attributes.join(' ') + '>';
        };
        renderer.link = function (href, title, text) {
            // Remove markdown escapes. Workaround for https://github.com/chjj/marked/issues/829
            if (href === text) { // raw link case
                text = htmlContent_1.removeMarkdownEscapes(text);
            }
            title = htmlContent_1.removeMarkdownEscapes(title);
            href = htmlContent_1.removeMarkdownEscapes(href);
            if (!href
                || href.match(/^data:|javascript:/i)
                || (href.match(/^command:/i) && !markdown.isTrusted)
                || href.match(/^command:(\/\/\/)?_workbench\.downloadResource/i)) {
                // drop the link
                return text;
            }
            else {
                return "<a href=\"#\" data-href=\"" + href + "\" title=\"" + (title || href) + "\">" + text + "</a>";
            }
        };
        renderer.paragraph = function (text) {
            return "<p>" + text + "</p>";
        };
        if (options.codeBlockRenderer) {
            renderer.code = function (code, lang) {
                var value = options.codeBlockRenderer(lang, code);
                // when code-block rendering is async we return sync
                // but update the node with the real result later.
                var id = idGenerator_1.defaultGenerator.nextId();
                var promise = Promise.all([value, withInnerHTML]).then(function (values) {
                    var strValue = values[0];
                    var span = element.querySelector("div[data-code=\"" + id + "\"]");
                    if (span) {
                        span.innerHTML = strValue;
                    }
                }).catch(function (err) {
                    // ignore
                });
                if (options.codeBlockRenderCallback) {
                    promise.then(options.codeBlockRenderCallback);
                }
                return "<div class=\"code\" data-code=\"" + id + "\">" + strings_1.escape(code) + "</div>";
            };
        }
        if (options.actionHandler) {
            options.actionHandler.disposeables.push(DOM.addStandardDisposableListener(element, 'click', function (event) {
                var target = event.target;
                if (target.tagName !== 'A') {
                    target = target.parentElement;
                    if (!target || target.tagName !== 'A') {
                        return;
                    }
                }
                try {
                    var href = target.dataset['href'];
                    if (href) {
                        options.actionHandler.callback(href, event);
                    }
                }
                catch (err) {
                    errors_1.onUnexpectedError(err);
                }
                finally {
                    event.preventDefault();
                }
            }));
        }
        var markedOptions = {
            sanitize: true,
            renderer: renderer
        };
        element.innerHTML = marked.parse(markdown.value, markedOptions);
        signalInnerHTML();
        return element;
    }
	// Randomizes the order of the values of an array, returning a new array.
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
// Capitalizes the first letter of a string
const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
// Checks if current environment is Travis CI
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
const isTravisCronOrAPI = () =>
  process.env['TRAVIS_EVENT_TYPE'] === 'cron' || process.env['TRAVIS_EVENT_TYPE'] === 'api';
const isNotTravisCronOrAPI = () => !isTravisCronOrAPI();
// Creates a hash for a value using the SHA-256 algorithm.
const hashData = val =>
  crypto
    .createHash('sha256')
    .update(val)
    .digest('hex');
// Gets the code blocks for a snippet file.
const getCodeBlocks = str => {
  const regex = /```[.\S\s]*?```/g;
  let results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex)
      regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  results = results.map(v => v.replace(/```js([\s\S]*?)```/g, '$1').trim());
  return {
    es6: results[0],
    es5: babel.transformSync(results[0], { presets: ['@babel/preset-env'] }).code.replace('"use strict";\n\n', ''),
    example: results[1]
  };
};
// Gets the textual content for a snippet file.
const getTextualContent = str => {
  const regex = /###.*\n*([\s\S]*?)```/g;
  const results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex)
      regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  return results[1];
};
function isWindow(value) {
  var toString = Object.prototype.toString.call(value);
  return toString == '[object global]' || toString == '[object Window]' || toString == '[object DOMWindow]';
}
function isPlainObject(obj) {
  let hasOwn = Object.prototype.hasOwnProperty;
  // Must be an Object.
  if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj)) {
    return false;
  }
  try {
    if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
      return false;
    }
  } catch (e) {
    return false;
  }
  let key;
  for (key in obj) {}
  return key === undefined || hasOwn.call(obj, key);
}