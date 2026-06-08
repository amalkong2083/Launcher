;(function (_global){
	let rcomma = /,/,rspace = /\s/g,
	rhash = /#.*$/,
	$i = 0;
	function d(t) {return Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}
	const extend = ( first, second ) => {"use strict";for( var prop in second ) {if( second.hasOwnProperty( prop ) ) {first[prop] = second[prop];}}return first;}	
	const isClass = (t) => "function" === d(t) && /^\s*class\s+/.test(t.toString());
	const isEmptyObject = (t) => !t || 0 === Object.keys(t).length && t.constructor === Object;
	const isElement = (obj) => {return (typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string");}
	const isFunction = (t) => "function" === d(t);
	const isPlainObject = (val) =>  !!val && typeof(val) === 'object' && val.constructor === Object;
	const isString = (val) => typeof(val) === 'string';
	function $id(selector){return selector instanceof HTMLElement ? selector : document.getElementById(selector);}
	function $qs(selector, ctx){return isElement(ctx) ? ctx.querySelector(selector) : document.querySelector(selector);}
	function $qsa(selector, ctx) {
		let list = [],
		nodeList = isElement(ctx) ? ctx.querySelectorAll(selector) : document.querySelectorAll(selector);
	  
		if(nodeList && nodeList.length > 0) {
			list = Array?.from(nodeList)??Array.prototype.slice.call(nodeList);
		}
		return list;
	}
	const $ = {};
	$.id = $id;
	/**
	 * get single element
	 * @public
	 */
	$.one = $qs;

	/**
	 * get multiple elements
	 * @public
	 */
	$.all = $qsa;
	/* // Teroy : The smallest javascript state-based component UI renderer
	(function(){
		class Teroy {
			constructor(element, component){
				this.element = document.querySelector(element);
				
				if(!this.element){
					throw `TEROY : ${element} not found!`;
				}
				
				if(!component.render || typeof component.render !== "function"){
					throw `TEROY : No render() function found in component!`;
				}
				
				//if(typeof component.render() !== "string"){
				//	throw `TEROY : Please return a string from the  render() function!`;
				//}
				
				this.html = component.render || "";
				this.rendered = false;
				this.data = new Proxy(component.data || {}, {
					component: this, 
					set(target, prop, val){
						target[prop] = val;
						return this.component.update();
					}, 
					get(target, value){
						if(this.component.proxyPaused){
							return target[value];
						} else {
							if(this.component.rendered){
								// @Note nice use of raF here. Great for performance.
								// You might consider add debouncing in case someone updates a few different properties at once
								// It will minimize lag from back-to-back renders
								window.requestAnimationFrame(() => {
									this.component.update();
								});
							}
							
							return target[value];
						}
					}
				});
			}
			
			select(selector){
				return this.element.querySelector(selector);
			}
			
			selectAll(selector){
				return this.element.querySelectorAll(selector);
			}
			
			parse(string){
				return new DOMParser().parseFromString(string, "text/html");
			}
			
			show(){
				if(this.rendered){
					return console.warn("TEROY: Component is already showing on page, no need to show it again.");
				}
				
				this.DOM = this.parse(this.html());
				
				Array.from(this.DOM.body.childNodes).forEach(child => {
					this.element.appendChild(child);
				});
				
				this.rendered = true;
			}
			
			update(){
				this.proxyPaused = true;
				this.DOM = this.parse(this.html.apply(this));
				
				const OLDDOMCHILDREN = Array.from(this.element.childNodes);
				const NEWDOMCHILDREN = Array.from(this.DOM.querySelector("body").childNodes);
				
				const  maxLength = Math.max(OLDDOMCHILDREN.length, NEWDOMCHILDREN.length);
				
				for(let i = 0; i< maxLength;i++){
					if(!OLDDOMCHILDREN[i]){
						this.element.appendChild(NEWDOMCHILDREN[i]);
					} else if(!NEWDOMCHILDREN[i]){
						this.element.removeChild(OLDDOMCHILDREN[i]);
					} else if(NEWDOMCHILDREN[i].outerHTML !== OLDDOMCHILDREN[i].outerHTML || NEWDOMCHILDREN[i].wholeText !== OLDDOMCHILDREN[i].wholeText){
						this.element.replaceChild(OLDDOMCHILDREN[i], OLDDOMCHILDREN[i]);
					}
				}
				delete this.proxyPaused;
			}
		}
		
		if(typeof define === "function" && define.amd){
			define(function(){
				return Teroy;
			});
		} else if(typeof module === "function" && module.exports){
			module.exports = Teroy;
		} else {
			this.Teroy = Teroy;
		}
	//})()
	}.call(this));
	let ter = new Teroy("#empty-view", {}); */
	var routes = {};
	// An array of the current route's events:
	var events = [];
	// The element where the routes are rendered:
	var el = null;
	// Context functions shared between all controllers:
	var ctx = {
		on: function (selector, evt, handler) {
			events.push([selector, evt, handler]);
		},
		refresh: function (listeners) {
			listeners.forEach(function (fn) { fn(); });
		},
		trigger: function (evt, selector) {
			//document.dispatchEvent(evt);
		}
	};
	function AKD_Router(params={}){
		if(!(this instanceof AKD_Router)) return  new AKD_Router(params);
		$i++;
		const $this = this, default_params = {mode: 'hash', viewId: 'view', linkId: '[data-route-link]', linkActiveClass: 'active', animation: null, loader: null, lsKey: ''},
		//params = arguments && arguments.length > 0 && isPlainObject(arguments[0]) ? arguments[0] : {}, 
		$key = params?.lsKey??$i;
		//this.instance = {};
		//this.instance[$i] = {};
		this.params = isPlainObject(params) ? extend(default_params,params) : default_params;
		this.loader = this.params.loader || '<div style="position: absolute;top: 50%;left: 50%;translate: -50% -50%;"><div class="dot-revolution"></div></div>';
		this.currentRoute = localStorage.getItem(this.params.lsKey + 'currentRoute') || null;// stored route
		this.routerUrl = this.currentRoute || location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
		this.routerView = '';
		// A hash to store our routes:
		this.routes = {};
		this.preloads = {};
		this.err = [];
		this.templateEl = '';
		this.viewEl = isElement(this.params.viewId) ? this.params.viewId : $id(this.params.viewId);
		if(isElement(this.viewEl) && this.viewEl.classList && typeof this.params.animation === 'string'){this.viewEl.classList.remove(this.params.animation);}
		
		if(this.params.preloads && isArray(this.params.preloads) && this.params.preloads.length > 0){
			let newMethodNames = [], newAsyncMethods = [], i=0;
			this.params.preloads.forEach(pre => {
				//newObj = {}//newObj[pre.globalVar] = _.fetchFile(pre.url);
				//this[pre.globalVar] = _.fetchFile(pre.url, pre.format, pre.extraData?.cfg??pre.extraData).then(res => res);
				this.preloads[pre.globalVar] = {};
				newMethodNames.push(pre.globalVar);
				newAsyncMethods.push(_.fetchFile(pre.url, pre.format, pre.extraData?.cfg??pre.extraData)/* .then(res => res) */);
			});
			
			Promise.all(newAsyncMethods).then((newAsyncMethod)=>{
				for(;i<newAsyncMethod.length;i++) {
					isObject(newAsyncMethod[i]) ? Object.assign($this.preloads[newMethodNames[i]], newAsyncMethod[i]) : $this.preloads[newMethodNames[i]] = newAsyncMethod[i];
					//console.log($this.preloads[newMethodNames[i]], newMethodNames[i], newAsyncMethod[i])
				}
			});
		}
		return this;
	}
	var fnid = 0;
	function emptyController(obj){
		this.fnid = fnid++;
		return function(){
			Object.assign(this, obj);
			return this;
		}
	}
	AKD_Router.prototype.objectToController = function objectToController(obj) {
		if(!isObject(obj)){
			return obj;
		}
		var controller = emptyController(obj);
		/* for(let x in obj){
			controller.prototype[x] = obj[x];
			//controller[x] = obj[x];
			//Object.defineProperty(controller.prototype, x, {value: obj[x]});
		}
		console.log(obj, controller, new controller()) */
		return controller;
	}
	AKD_Router.prototype.forEachEventElement = function forEachEventElement(fnName) {
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
	AKD_Router.prototype.addEventListeners = function addEventListeners() {
		this.forEachEventElement('addEventListener');
	}
	AKD_Router.prototype.removeEventListeners = function removeEventListeners() {
		this.forEachEventElement('removeEventListener');
	}
	AKD_Router.prototype.triggerEvents = function triggerEvents(evt) {
		//this.forEachEventElement('removeEventListener');
		for (var i = 0, len = events.length; i < len; i++) {
			var els = this.viewEl.querySelectorAll(events[i][0]);
			for (var j = 0, elsLen = els.length; j < elsLen; j++) {
				//els[j][fnName].apply(els[j], events[i].slice(1));
				//els[j].dispatchEvent(events[evt]);
				els[j].dispatchEvent(evt);
			}
		}
	}
	
	// Put John's template engine code here...
	var cache = {};
	var _tmplCache = {};
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
					return absurdTemplater(str, data);
				} catch(e){
					err.push(e.message);
					//console.error("'" + e.message + "'", " in \n\nCode:\n", str, "\n");
				}
			}
			console.error("Error in \n\nCode:\n", str, "\n\Messages:\n", ...err);
			return tmpl("<%= <h2>tmpl error: </h2>\n<p>"+err.join("</p><p>\t\n")+"</p> %>", {});
		}
	}
	tmpl.load = function (id) {return $id(id)?.innerHTML??'';}
	AKD_Router.prototype.tmpl = tmpl;
	
	function _templater(templateText, opts){const err = [], variable = opts?.variable||"obj";return new Function(variable, "var output=" + JSON.stringify(templateText).replace(/<%=(.+?)%>/g, '"+($1)+"').replace(/<%(.+?)%>/g, '";$1\noutput+="') + ";return output;");}
	AKD_Router.prototype._templater = _templater;
	
	function absurdTemplater(html, data, options){
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
		//try{result = new Function(variable, code).apply(data, [data]);} catch(err){console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n");}
		result = new Function(variable, code).apply(data, [data]);
		return result;
	}
	AKD_Router.prototype.absurdTemplateEngine = absurdTemplater;
	
	AKD_Router.prototype.notfound = function(url) {
		let $el, str = null, id = 'not-found', insert = '';
		this.routerUrl = url || location.hash.slice(1) || '/';
		if($el = $id('not-found')){
			str = $el.innerHTML, id = 'not-found';
		} else if($el = $id('not-found-template')){
			str = $el.innerHTML, id = 'not-found';
		}
		if(!this.routerUrl) insert += `<li>the route path/url <strong>${url}</strong>, is invalid!</li>`;
		if(!this.routes[this.routerUrl]) insert += `<li>the route <strong>${url}</strong>, is invalid!</li>`;
		if(this.routes[this.routerUrl] && (!this.routes[this.routerUrl].templateId || (this.routes[this.routerUrl].templateId && !$id(this.routes[this.routerUrl].templateId)))) insert += `<li>the template <strong>${this.routes[this.routerUrl].templateId}</strong> was not found</li>`;
        return {
			templateId: id,
			controller:{
				message: `<div class="message error">
					<p style="margin: 1rem 0;">It would appear that link to the requested page is broken because.&not;</p>
					<ol style="list-style: inside decimal-leading-zero;">${insert}</ol>
				</div>`, 
				page: this.routerUrl
			},
			templateString: str ? str : '<h2>Not Found</h2><p>Sorry! I cannot find that page.</p>'
		};
    }
	
	// Defines a route:
	AKD_Router.prototype.route = function route (path, templateId, controller) {
		if (typeof templateId === 'function') {
			controller = templateId;
			templateId = null;
		}
		var listeners = [];
		if(isPlainObject(controller)){
			Object.assign(controller, {'$on': ctx.on});
			Object.assign(controller, {'$trigger': ctx.trigger});
			Object.assign(controller,{'$refresh': ctx.refresh.bind(undefined, listeners)});
			
		} else {
			Object.defineProperty(controller.prototype, '$on', {value: ctx.on});
			Object.defineProperty(controller.prototype, '$trigger', {value: ctx.trigger});
			Object.defineProperty(controller.prototype, '$refresh', {value: ctx.refresh.bind(undefined, listeners)});
		}
		this.routes[path] = {templateId: templateId, controller: controller, onRefresh: listeners.push.bind(listeners)};
	    return this;
    }
	
	AKD_Router.prototype.render = function render(){
		var tmp,i=0;
		var url = location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
	    var _route2 = this.routes[url];// Get route by url:
		str = str || ((_route2 && $id(_route2.templateId)) ? $id(_route2.templateId).innerHTML : ((_route2 && $id(_route2.templateId + '-template')) ? $id(_route2.templateId + '-template').innerHTML : this.notfound(url).templateString));
		el = this.viewEl || $id(this.params.viewId);
		tpl = arguments && arguments.length >= 1 ? arguments[0] : this.routes[url];
	    if(isFunction(tpl)){
			el.innerHTML = tpl(str,el,tmpl);
			/* var callbackFunction = tpl;var callbackParams = [str,el];if(typeof callbackFunction === "function") tmp = callbackFunction.apply(null,callbackParams);else{var fn = window[callbackFunction];if(typeof fn === "function") tmp = fn.apply(null,callbackParams);}el.innerHTML = tmp; */
		} else if(isPlainObject(tpl)){
			el.innerHTML = tmpl(tpl.templateId,(isPlainObject(tpl.controller) ? tpl.controller : new tpl.controller));
		} else if(isString(tpl)) {
			el.innerHTML = tpl;
		} else {
			el.innerHTML = tmpl(_route2.templateId,(isPlainObject(_route2.controller) ? _route2.controller : new _route2.controller));
		}
		return this;
	}
	AKD_Router.prototype.router = function router(){
		let el = $id(this.params.viewId), 
		url = location.hash.slice(1) || '/', // Current route url (getting rid of '#' in hash as well):
		_route = this.routes[url];
		
		// Remove current event listeners:
		this.removeEventListeners();
		// Clear events, to prepare for next render:
		events = [];
		
		if(_route&&_route.templateId&&_route.controller){
			// Do we have both a view and a route?
			str = str || ($id(_route.templateId) ? $id(_route.templateId)?.innerHTML : ($id(_route.templateId + '-template') ? $id(_route.templateId + '-template')?.innerHTML : ""));
			if(isElement(el) && _route.controller /* && str */) {
				if(isString(this.params.animation)){el.classList.add(this.params.animation);}
				// Render route template with John Resig's template engine:
				//el.innerHTML = tmpl(_route.templateId,(isPlainObject(_route.controller) ? _route.controller : new _route.controller));
				this.render(tmpl(_route.templateId,(isPlainObject(_route.controller) ? _route.controller : new _route.controller)));
			}
		} else {
			let _nf = this.notfound(url);
			_route = {templateId: _nf.templateId, controller: _nf.controller, templateString: _nf.templateString};
			//this.render(this.tmpl(_route.templateString,(isPlainObject(_route.controller) ? _route.controller : new _route.controller)));
			this.render(_nf.templateString);
		}
		return this;
	}
	AKD_Router.prototype.routeTo = function routeTo(str, controller, view, extra={}) {
		let _route, viewEl, ctrl = '', listeners = [];
		str = $qs(str)?.innerHTML??str;
		if(!isElement(viewEl = $.one(view))) viewEl = this.viewEl;
		
		if(!('$on' in controller)){
			if(isPlainObject(controller)){
				Object.assign(controller, {'$on': ctx.on});
				Object.assign(controller, {'$trigger': ctx.trigger});
				Object.assign(controller,{'$refresh': ctx.refresh.bind(undefined, listeners)});
				
			} else {
				Object.defineProperty(controller.prototype, '$on', {value: ctx.on});
				Object.defineProperty(controller.prototype, '$trigger', {value: ctx.trigger});
				Object.defineProperty(controller.prototype, '$refresh', {value: ctx.refresh.bind(undefined, listeners)});
			}
		}
		//let selectedRoute = {templateId: str?.id??str, controller: controller, onRefresh: listeners.push.bind(listeners)};

		if(isElement(viewEl)){
			viewEl.innerHTML = this.loader;
			if(isString(str) && str.length > 0) {
				let $this = this;
				/* let akd_event = /akd-on/.exec(str) ? replace(/<#=(.+?)#>/g,"',$1,'")console.log(akd_event); */
				setTimeout(function(){
					//ctrl = new controller();
					ctrl = isPlainObject(controller) ? Object.assign(controller, extra) : new controller(extra);
					let isAsync = ctrl.isAsync && ctrl.isAsync === true;
					// Listen on route refreshes:
					//selectedRoute.onRefresh(function () {
						$this.removeEventListeners();
						// Render route template with John Resig's template engine:
						//$this.tmpl(str, ctrl, extra, viewEl);
						if(isAsync === true){
							setTimeout(() => {viewEl.innerHTML = $this.tmpl(str, ctrl, extra)}, 1000);
						} else 
							viewEl.innerHTML = $this.tmpl(str, ctrl, extra);
						$this.addEventListeners();
					//});
					// Trigger the first refresh:
					ctrl.$refresh();
					$this.emitEvent("routerload", viewEl);
				}, 1000);
			} else {
				_route = this.notfound(url);
				viewEl.innerHTML = this.tmpl(_route.templateString, _route.controller);
			}
		} else console.log('Unable to display view, a valid view element was not found!');
		return this;
	}
	AKD_Router.prototype.navigateTo = function navigateTo(url, view, extra={}) {
		// Remove current event listeners:
		this.removeEventListeners();
		// Clear events, to prepare for next render:
		events = [];
		// Current route url (getting rid of '#' in hash as well):
		url = url || location.hash.slice(1) || '/';
		// Get route by url:
		this.routerUrl = url;
		// Lazy load view element:
		let viewEl = isElement(view) ? view : isString(view) ? $id(view) : (this.viewEl || $id(this.params.viewId)), 
		selectedRoute = this.routes[url], 
		_route = selectedRoute;
		// Do we have both a view and a route?
		if(isElement(viewEl)){
			viewEl.innerHTML = this.loader;
			if(selectedRoute) {
				let $this = this, 
				str = $id(selectedRoute.templateId) ? $id(selectedRoute.templateId)?.innerHTML : 
					$id(selectedRoute.templateId + '-template') ? $id(selectedRoute.templateId + '-template')?.innerHTML : 
					isPlainObject(selectedRoute.controller) ? selectedRoute.controller?.templateString : 
					new selectedRoute.controller(extra)?.templateString;
				
				/* let akd_event = /akd-on/.exec(str) ? replace(/<#=(.+?)#>/g,"',$1,'")
				console.log(akd_event); */
				// Render route template with John Resig's template engine:
				setTimeout(function(){
					if(isString(str) && str.length > 0){
						if(isFunction(selectedRoute)){
							selectedRoute(str,viewEl,$this.tmpl);
							/* var callbackFunction = tpl;var callbackParams = [str,el];if(typeof callbackFunction === "function") tmp = callbackFunction.apply(null,callbackParams);else{var fn = window[callbackFunction];if(typeof fn === "function") tmp = fn.apply(null,callbackParams);}el.innerHTML = tmp; */
						} else if(isPlainObject(selectedRoute)){
							let ctrl = '';
							if(isPlainObject(selectedRoute.controller)) {
								ctrl = selectedRoute.controller;
								//Object.assign(ctrl, extra);
							} else {
								ctrl = new selectedRoute.controller(extra);
							}
							let isAsync = ctrl?.isAsync === true;
							// Listen on route refreshes:
							console.log(ctrl);
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
							ctrl.$refresh();
						} else if(isString(selectedRoute)) {
							viewEl.innerHTML = selectedRoute;
						} else {
							//viewEl.innerHTML = $this.tmpl(selectedRoute.templateId,(isPlainObject(selectedRoute.controller) ? selectedRoute.controller : new selectedRoute.controller));
							viewEl.innerHTML = $this.tmpl(str, $this.notfound(url).controller);
						}
						$this.emitEvent("routerload", viewEl);
					} else {
						_route = $this.notfound(url);
						viewEl.innerHTML = $this.tmpl(_route.templateString, _route.controller);
					}
				}, 1000);
			} else {
				_route = this.notfound(url);
				viewEl.innerHTML = this.tmpl(_route.templateString, _route.controller);
			}
		} else console.log('Unable to display view, a valid view element was not found!');
		
		return this;
	}
    
	AKD_Router.prototype.loadTemplates = /* async  */function loadTemplates(tmplArr) {
		if(!tmplArr) return this;
		const frag = document.createDocumentFragment();
		
		const _build = (str, id) => {
			let tmplEl = document.createElement('script');
			tmplEl.id = id;
			tmplEl.type = 'text/template';
			tmplEl.innerHTML = str;
			frag.appendChild(tmplEl);
		}
		if(Array.isArray(tmplArr)) {
			tmplArr.forEach(ta => {_build(isPlainObject(ta) ? ta.templateString : new ta().templateString)})
		} else if(isPlainObject(tmplArr)) {
			for(ta in tmplArr){
				let t = ta.replace('/',''), t_id = t.replace('/','-') +'-template';
				_build(isPlainObject(tmplArr[ta]) ? tmplArr[ta].templateString : new tmplArr[ta]().templateString, t_id);}
		} else {
			_build(isPlainObject(tmplArr) ? tmplArr?.templateString : new tmplArr().templateString)
		}
		
		document.body.appendChild(frag);
		
		return this;
	}
	/*!
	 * Emit a custom event
	 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {String} type   The event type
	 * @param  {Node}   elem   The element to attach the event to
	 * @param  {Object} detail Any details to pass along with the event
	 */
	AKD_Router.prototype.emitEvent = function (type, elem, detail) {
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
	AKD_Router.prototype.trigger = function(name){var that = this;return this.forEach(this.results, function() {var event = document.createEvent('HTMLEvents');if ( !event.target ) {event.target = this;}event.initEvent(name,true,false);this.dispatchEvent(event);});/* return this; */};

	AKD_Router.prototype.initEvents = function initEvents(extra={}) {
		const that = this;
		///////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////
		// Listen on hash change:
		//this.addEventListener('hashchange', router);
		// Listen on page load:
		//this.addEventListener('load', router);
		// Expose the route register function:
		//this.route = route;
		//////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////
		/* $one("#template-view").addEventListener('routerload', function (e) {
			console.log(e.target.innerHTML)
		}); */
		if(this.params.mode === "hash"){
			// Listen on hash change:
			window.addEventListener('hashchange', this.router);
			// Listen on page load:
			window.addEventListener('load', this.router);
		} else if(this.params.mode === "history"){
			// Listen on popstate:
			window.addEventListener('popstate', this.router);
		} else if(this.params.mode === "click"){
			window.addEventListener('load', function(e) {
				let btns = $qsa(that.params.linkId), 
				btn = $qs(`[data-route="${that.currentRoute}"]`);
				
				if(Array.isArray(btns)) btns.forEach(b => b.classList.remove(that.params.linkActiveClass));
				if(btn) btn.classList.add(that.params.linkActiveClass);
			});
			document.addEventListener('click', function(e) {
				let $this = isElement(this) ? this : e.target, 
				trimmed = that.params.linkId.replace('[', '').replace(']', '').replace('.', '').replace('#', '');
				if($this.hasAttribute(trimmed) || $this.hasAttribute('data-akd-route-link') || $this.hasAttribute('data-route-link')) {
					e.preventDefault();
					let route = $this.getAttribute('data-akd-route') || $this.getAttribute('data-route'), btns = $qsa(that.params.linkId)
					if(isString(route) && (/#/.test.route || route.match(/^.*#/) || route.match(/^#/))){
						route = route.slice(1);
					}
					//console.log(route, that.routes[route], Object.keys(that.routes))
					if(route){
						that.currentRoute = route;
						localStorage.setItem(that.params.lsKey + 'currentRoute', that.currentRoute);
						that.navigateTo(that.currentRoute, that.viewEl, extra);
						if(Array.isArray(btns)) btns.forEach(b => b.classList.remove(that.params.linkActiveClass));
						$this.classList.add(that.params.linkActiveClass);
					}
				}
			});
		} else {
			
		}
		
		return this;
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
	document.getElementById('testLayout').innerHTML = nano("<p>Hello {user.first_name} {user.last_name}! Your account is <strong>{user.account.status}</strong></p>", data);
	
	// ---- internal support stuff

	// Replace {{variable}} in `s` with the template data in `d`.
	function renderTemplate(s, d) {
		return s.replace(/{{([a-zA-Z]+)}}/g, function (match, key) {
			return d.hasOwnProperty(key) ? d[key] : match;
		});
	} */

	// if(AKD_Router.observeMutations === true) window.addEventListener("load", observeMutations, false);
	//window.AKD_Router = AKD_Router;
	_global.AKD_Router = AKD_Router;
	return AKD_Router;
})(window);