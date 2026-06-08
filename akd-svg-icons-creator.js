(function() {
	const camelize = (stringToCamelize) => {if (String(stringToCamelize).indexOf('-') == -1){return stringToCamelize;}var oStringList = String(stringToCamelize).split('-');var isFirstEntry = true;var camelizedString = '';for(var i=0; i < oStringList.length; i++){if(oStringList[i].length>0){if(isFirstEntry){camelizedString = oStringList[i];isFirstEntry = false;} else {var s = oStringList[i];camelizedString += s.charAt(0).toUpperCase() + s.substring(1);}}}return camelizedString;};
	const decamelize = (str, sep) => {if (typeof str !== 'string') {throw new TypeError('Expected a string');}sep = typeof sep === 'undefined' ? '_' : sep;return str.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2').toLowerCase();}
	const isset = (str) => str && (typeof(arr) !== null || typeof(arr) !== "null" || typeof(arr) !== undefined || typeof(arr) !== "undefined");
	//const is_array = (arr) => isset(arr) && Array.isArray(arr);
	//const is_string = (str) => isset(str) && typeof(arr) === "string";
	//const is_object = (obj) => isset(obj) && typeof(obj) === "object";
	const isEmpty = (item) => !isset(item) || isArray(item) && item.length === 0 || isString(item) && item.length === 0;
	/* // Zepto camelize function
	const camelize = (str) => str.replace(/-+(.)?/g, function (match, chr) {return chr ? chr.toUpperCase() : '';});
	// Zepto dasherize function */
	const dasherize = (str) => str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();

	const deepClone = (obj) => {
		let clone = Object.assign({}, obj);
		Object.keys(clone).forEach(key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]));
		return Array.isArray(obj) && obj.length
			? (clone.length = obj.length) && Array.from(clone)
				: Array.isArray(obj)
					? Array.from(obj)
						: clone;
	}

	const assign = function assignSingleSource(target, source) {
		return Object.keys(source).reduce(function (acc, key) {
			acc[key] = source[key];
			return acc;
		}, target);
	}
	function extendObj(){
		let options, name, src, copy, copyIsArray, clone,target = arguments[ 0 ] || {},
		i = 1,length = arguments.length,deep = false;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[ i ] || {};
			i++;
		}
		if(typeof target !== "object" && typeof target !== "function") {
			target = {};
		}
		if(i === length){
			target = this;
			i--;
		}
		for(;i < length; i++){
			if ((options = arguments[ i ]) != null) {
				for(name in options) {
					src = target[ name ];
					copy = options[ name ];
					// Prevent never-ending loop
					if( target === copy ) {
						continue;
					}
					if(deep && copy && (typeof copy === "object" || (copyIsArray = Array.isArray(copy)))){
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && Array.isArray( src ) ? src : [];
						} else {
							clone = src &&  typeof src === "object" ? src : {};
						}
						// Never move original objects, clone them
						target[ name ] = extendObj( deep, clone, copy );
						// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		return target;
	}
	function createSvgIcon(obj, as="string"){
		let _svg = '';
		const defObj = {
			name: "",
			root:{
				userSelect: 'none',
				width: '1em',
				height: '1em',
				display: 'inline-block',
				fill: 'currentColor',
				fillRule:"evenodd" ,
				clipRule:"evenodd",
				flexShrink: 0,
				viewBox: "0 0 24 24",
				role:"img",
				/*fontSize: theme.typography.pxToRem(24),
				transition: theme.transitions.create('fill', {
					duration: theme.transitions.duration.shorter
				})*/
			},
			_sections: []
		}
		
		const loopRoot = (o)=> {
			if(typeof o !== "object") return '';
			
			let out = '';
			for(var i in o){
				if(typeof o[i] === "object"){
					let no = o[i]
					for(var x in no){
						/* if(typeof no[x] === "object"){
							out += `><${x} `;
							for(var z in no[x]){
								out += `${z}="${no[x][z]}" `;
							}
							out += ` />`;
						} else {*/
							let dx = x !== "viewBox" ? dasherize(x) : camelize(x);
							out += `${dx}="${no[x]}" `;
						//}
					}
				} else {
					let di = i !== "viewBox" ? dasherize(i) : camelize(i);
					out += `${di}="${o[i]}" `;
				}
			}
			return out;
		}
		
		// TODO: Find a better way of extending the @defObj object
		let clone = deepClone(defObj);
		let o = extendObj(defObj, obj);
		o.root = extendObj(clone.root,o.root);
		
		if(typeof o === "object"){
			//root = !isEmptyObject(o.root) ? o.root : defObj.root;
			root = !isEmpty(o.root) ? o.root : defObj.root;
			sections = o._sections || [];
			//console.log(o)
			
			_svg = '<svg xmlns="http://www.w3.org/2000/svg" ' + loopRoot(root) + '>';
				_svg += '<title>' + o.name + '</title>';
				if(Array.isArray(sections)){
					for(var x=0;x<sections.length;x++){
						//console.log(sections[x])
						if(typeof sections[x] === "object"){
							for(var z in sections[x]){
								_svg += `<${z} `;
								if(typeof sections[x][z] === "object"){
									let no = sections[x][z];
									for(var y in no){
										let dy = dasherize(y);
										_svg += `${dy}="${no[y]}" `;
									}
								} else {
									let dz = dasherize(z);
									_svg += `${dz}="${sections[x][z]}" `;
								}
								_svg += ` />`;
							}
						}
					}
				} else if(typeof sections === "object"){
					for(x in sections){
						_svg += `<${x} `;
						if(typeof sections[x] === "object"){
							for(var z in sections[x]){
								_svg += `${z}="${sections[x][z]}" `;
							}
						}
						_svg += ` />`;
					}
				}
			_svg += '</svg>';
		} else {
			_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width?o.width:'24'}" height="${o.height?o.height:'24'}" fill="${o.fill?o.fill:'currentColor'}" fill-rule="${o.fillRule?o.fillRule:'evenodd'}" clip-rule="evenodd"><path d="${o}"/></svg>`;
		}
		
		return as === "object" ? {...o,svg:_svg} : _svg;
	}
	const _defaultIcons = {};
	function addIcon(name = "",_sections = [], root = {width:"24", height:"24", color:"currentColor", viewBox:"0 0 24 24", _fillRule : null, as: "string"}){
		
		Object.assign(_defaultIcons, {name : createSvgIcon({name,root,_sections}, root.as)});
		return this;
	}
	function addIcons(objArr){
		if(!Array.isArray(objArr)) {console.error('Expecting an ARRAY, but got'+ (typeof objArr));return this;}
		objArr.forEach(obj => addIcon(obj.name, obj._sections, obj.root));
	}
	function icons({width="24", height="24", color="currentColor", viewBox/* ="0 0 24 24" */, _fillRule = null, as = "string"} = {}){
		color = color || "red";//"#1040e2"
		viewBox = viewBox || `0 0 ${width} ${height}`;
		var fillRule = _fillRule || "evenodd";
		let root = {width, height, fill: color, viewBox, fillRule, as}
		return Object.assign(_defaultIcons, {
			// Material Icons
			Add: createSvgIcon({
				name:"Add",root,_sections:[
					{"path":{d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}},
				]
			}, as),
			AddToPhotos: createSvgIcon({
				name:"Add",root,_sections:[
					{"path":{d: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"}},
				]
			}, as),
			Adjust: createSvgIcon({
				name:"Adjust",root,_sections:[
					{"path":{d: "M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"}},
				]
			}, as),
			AngleUp: createSvgIcon({
				name:"AngleUp",root: extendObj({},root,{viewBox:'0 0 329 457'}, as),_sections:[
					{"path":{d: "M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"}},
				]
			}, as),
			AngleDown: createSvgIcon({
				name:"AngleDown",root: extendObj({},root,{viewBox:'0 0 329 457'}, as),_sections:[
					{"path":{d: "M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"}},
				]
			}, as),
			Apps: createSvgIcon({
				name:"Apps",root,_sections:[
					{"path":{d: "M6 6h-6v-6h6v6zm9-6h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6z"}},
				]
			}, as),
			AspectRatio: createSvgIcon({
				name:"AspectRatio",root,_sections:[
					{"path":{d: "M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"}}
				]
			}, as),
			AspectRatioOutlined: createSvgIcon({
				name:"AspectRatioOutlined",root,_sections:[
					{"path":{d: "M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"}}
				]
			}, as),
			AttachFile: createSvgIcon({
				name:"AttachFile",root,_sections:[
					{"path":{d: "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"}},
				]
			}, as),
			AttachFileOutlined: createSvgIcon({
				name:"AttachFileOutlined",root,_sections:[
					{"path":{d: "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"}},
				]
			}, as),
			Attachment: createSvgIcon({
				name:"Attachment",root,_sections:[
					{"path":{d: "M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"}},
				]
			}, as),
			AttachmentOutlined: createSvgIcon({
				name:"AttachmentOutlined",root,_sections:[
					{"path":{d: "M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z"}},
				]
			}, as),
			Audiotrack: createSvgIcon({
				name:"Audiotrack",root,_sections:[
					{"path":{d: "M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"}},
				]
			}, as),
			AudiotrackOutlined: createSvgIcon({
				name:"AudiotrackOutlined",root,_sections:[
					{"path":{d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"}},
				]
			}, as),
			AvTimer: createSvgIcon({
				name:"AvTimer",root,_sections:[
					{"path":{d: "M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9h-1zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"}},
				]
			}, as),
			AvTimerOutlined: createSvgIcon({
				name:"AvTimerOutlined",root,_sections:[
					{"path":{d: "M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9h-1zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"}},
				]
			}, as),
			Backward: createSvgIcon({
				name:"Backward",root: extendObj({},root,{viewBox:'0 0 512 384'}, as),_sections:[
					{"path":{d: "M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"}},
				]
			}, as),
			Backup: createSvgIcon({
				name:"Backup",root,_sections:[
					{"path":{d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"}},
				]
			}, as),
			BackupOutlined: createSvgIcon({
				name:"BackupOutlined",root,_sections:[
					{"path":{d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"}},
				]
			}, as),
			BarChart: createSvgIcon({
				name:"BarChart",root,_sections:[
					{"path":{d: "M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"}},
				]
			}, as),
			BarChartOutlined: createSvgIcon({
				name:"BarChartOutlined",root,_sections:[
					{"path":{d: "M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"}},
				]
			}, as),
			Book: createSvgIcon({
				name:"Book",root,_sections:[
					{"path":{d: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"}},
				]
			}, as),
			Bookmark: createSvgIcon({
				name:"Bookmark",root,_sections:[
					{"path":{d: "M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"}},
				]
			}, as),
			Brush: createSvgIcon({
				name:"Brush",root,_sections:[
					{"path":{d: "M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.9959.9959 0 00-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"}},
				]
			}, as),
			BrushOutlined: createSvgIcon({
				name:"BrushOutlined",root,_sections:[
					{"path":{d: "M7 16c.55 0 1 .45 1 1 0 1.1-.9 2-2 2-.17 0-.33-.02-.5-.05.31-.55.5-1.21.5-1.95 0-.55.45-1 1-1M18.67 3c-.26 0-.51.1-.71.29L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41l-1.34-1.34c-.2-.2-.45-.29-.7-.29zM7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z"}},
				]
			}, as),
			Cancel: createSvgIcon({
				name:"Cancel",root,_sections:[
					{"path":{d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}},
				]
			}, as),
			CancelOutlined: createSvgIcon({
				name:"CancelOutlined",root,_sections:[
					{"path":{d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"}},
				]
			}, as),
			Camera: createSvgIcon({
				name:"Camera",root,_sections:[
					{"path":{d: "M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z"}},
				]
			}, as),
			CameraAlt: createSvgIcon({
				name:"CameraAlt",root,_sections:[
					{"circle":{cx: "12",cy: "12",r:"3.2"}},
					{"path":{d: "M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"}},
				]
			}, as),
			CameraAltOutlined: createSvgIcon({
				name:"CameraAltOutlined",root,_sections:[
					{"path":{d: "M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"}},
				]
			}, as),
			Category: createSvgIcon({
				name:"Category",root,_sections:[
					{"path":{d: "M12 2l-5.5 9h11z"}},
					{"circle":{cx: "17.5",cy: "17.5",r:"4.5"}},
					{"path":{d: "M3 13.5h8v8H3z"}},
				]
			}, as),
			CategoryOutlined: createSvgIcon({
				name:"CategoryOutlined",root,_sections:[
					{"path":{d: "M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"}},
				]
			}, as),
			ChangeHistory: createSvgIcon({
				name:"ChangeHistory",root,_sections:[
					{"path":{d: "M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"}},
				]
			}, as),
			Chat: createSvgIcon({
				name:"Chat",root,_sections:[
					{"path":{d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"}},
				]
			}, as),
			ChatBubble: createSvgIcon({
				name:"ChatBubble",root,_sections:[
					{"path":{d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"}},
				]
			}, as),
			ChatBubbleOutline: createSvgIcon({
				name:"ChatBubbleOutline",root,_sections:[
					{"path":{d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"}},
				]
			}, as),
			Clipboard: createSvgIcon({
				name:"Clipboard",root,_sections:[
					{"path":{d: "M13 17h4v1h-4v-1zm0-1h4v-1h-4v1zm9-14v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-7 9h4v-1h-4v1zm0-2h4v-1h-4v1zm-6.5.077l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.288c-.963.841-1.669 1.777-2.686 3.6-.626-.738-1.044-1.208-1.814-1.923zm.098 5l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.289c-.963.841-1.669 1.777-2.686 3.6-.627-.739-1.045-1.209-1.814-1.924z"}},
				]
			}, as),
			CloudDownload: createSvgIcon({
				name:"CloudDownload",root,_sections:[
					{"path":{d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"}},
				]
			}, as),
			CloudDownloadOutlined: createSvgIcon({
				name:"CloudDownloadOutlined",root,_sections:[
					{"path":{d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-5.55-8h-2.9v3H8l4 4 4-4h-2.55z"}},
				]
			}, as),
			CloudOff: createSvgIcon({
				name:"CloudOff",root,_sections:[
					{"path":{d: "M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"}},
				]
			}, as),
			CloudOffOutlined: createSvgIcon({
				name:"CloudOffOutlined",root,_sections:[
					{"path":{d: "M24 15c0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4c-1.33 0-2.57.36-3.65.97l1.49 1.49C10.51 6.17 11.23 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 .99-.48 1.85-1.21 2.4l1.41 1.41c1.09-.92 1.8-2.27 1.8-3.81zM4.41 3.86L3 5.27l2.77 2.77h-.42C2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h11.73l2 2 1.41-1.41L4.41 3.86zM6 18c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73l8 8H6z"}},
				]
			}, as),
			CloudQueue: createSvgIcon({
				name:"CloudQueue",root,_sections:[
					{"path":{d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"}},
				]
			}, as),
			CloudUpload: createSvgIcon({
				name:"CloudUpload",root,_sections:[
					{"path":{d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"}},
				]
			}, as),
			CloudUploadOutlined: createSvgIcon({
				name:"CloudUploadOutlined",root,_sections:[
					{"path":{d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"}},
				]
			}, as),
			Collections: createSvgIcon({
				name:"Collections",root,_sections:[
					{"path":{d: "M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"}},
				]
			}, as),
			CollectionsOutlined: createSvgIcon({
				name:"CollectionsOutlined",root,_sections:[
					{"path":{d: "M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"}},
				]
			}, as),
			CollectionsBookmark: createSvgIcon({
				name:"CollectionsBookmark",root,_sections:[
					{"path":{d: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"}},
					{"path":{d: "M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z"}},
				]
			}, as),
			CollectionsBookmarkOutlined: createSvgIcon({
				name:"CollectionsBookmarkOutlined",root,_sections:[
					{"path":{d: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 2v5l-1-.75L15 9V4h2zm3 12H8V4h5v9l3-2.25L19 13V4h1v12z"}},
				]
			}, as),
			Comment: createSvgIcon({
				name:"Comment",root,_sections:[
					{"path":{d: "M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"}},
				]
			}, as),
			Crop: createSvgIcon({
				name:"Crop",root,_sections:[
					{"path":{d: "M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"}},
				]
			}, as),
			CropFree: createSvgIcon({
				name:"CropFree",root,_sections:[
					{"path":{d: "M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"}},
				]
			}, as),
			CropFreeOutlined: createSvgIcon({
				name:"CropFreeOutlined",root,_sections:[
					{"path":{d: "M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"}},
				]
			}, as),
			CropLandscape: createSvgIcon({
				name:"CropLandscape",root,_sections:[
					{"path":{d: "M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"}},
				]
			}, as),
			CropLandscapeOutlined: createSvgIcon({
				name:"CropLandscapeOutlined",root,_sections:[
					{"path":{d: "M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"}},
				]
			}, as),
			CropOriginal: createSvgIcon({
				name:"CropOriginal",root,_sections:[
					{"path":{d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"}},
				]
			}, as),
			
			CropOriginalOutlined: createSvgIcon({
				name:"CropOriginalOutlined",root,_sections:[
					{"path":{d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"}},
				]
			}, as),
			CropOutlined: createSvgIcon({
				name:"CropOutlined",root,_sections:[
					{"path":{d: "M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"}},
				]
			}, as),
			CropPortrait: createSvgIcon({
				name:"CropPortrait",root,_sections:[
					{"path":{d: "M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z"}},
				]
			}, as),
			CropPortraitOutlined: createSvgIcon({
				name:"CropPortraitOutlined",root,_sections:[
					{"path":{d: "M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z"}},
				]
			}, as),
			CropRotate: createSvgIcon({
				name:"CropRotate",root,_sections:[
					{"path":{d: "M7.47 21.49C4.2 19.93 1.86 16.76 1.5 13H0c.51 6.16 5.66 11 11.95 11 .23 0 .44-.02.66-.03L8.8 20.15l-1.33 1.34zM12.05 0c-.23 0-.44.02-.66.04l3.81 3.81 1.33-1.33C19.8 4.07 22.14 7.24 22.5 11H24c-.51-6.16-5.66-11-11.95-11zM16 14h2V8c0-1.11-.9-2-2-2h-6v2h6v6zm-8 2V4H6v2H4v2h2v8c0 1.1.89 2 2 2h8v2h2v-2h2v-2H8z"}},
				]
			}, as),
			CropRotateOutlined: createSvgIcon({
				name:"CropRotateOutlined",root,_sections:[
					{"path":{d: "M7.47 21.49C4.2 19.93 1.86 16.76 1.5 13H0c.51 6.16 5.66 11 11.95 11 .23 0 .44-.02.66-.03L8.8 20.15l-1.33 1.34zM12.05 0c-.23 0-.44.02-.66.04l3.81 3.81 1.33-1.33C19.8 4.07 22.14 7.24 22.5 11H24c-.51-6.16-5.66-11-11.95-11zM16 14h2V8c0-1.11-.9-2-2-2h-6v2h6v6zm-8 2V4H6v2H4v2h2v8c0 1.1.89 2 2 2h8v2h2v-2h2v-2H8z"}},
				]
			}, as),
			Dashboard: createSvgIcon({
				name:"Dashboard",root,_sections:[
					{"path":{d: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"}},
				]
			}, as),
			DashboardOutlined: createSvgIcon({
				name:"DashboardOutlined",root,_sections:[
					{"path":{d: "M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"}},
				]
			}, as),
			DashboardTwoTone: createSvgIcon({
				name:"DashboardTwoTone",root,_sections:[
					{"path":{d: "M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z",opacity: ".3"}},
					{"path":{d: "M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z"}},
				]
			}, as),
			DeveloperBoard: createSvgIcon({
				name:"DeveloperBoard",root,_sections:[
					{"path":{d: "M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"}},
				]
			}, as),
			DeveloperBoardOutlined: createSvgIcon({
				name:"DeveloperBoardOutlined",root,_sections:[
					{"path":{d: "M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6v-4zm6-6h4v3h-4V7zM6 7h5v5H6V7zm6 4h4v6h-4v-6z"}},
				]
			}, as),
			DeveloperMode: createSvgIcon({
				name:"DeveloperMode",root,_sections:[
					{"path":{d: "M7 5h10v2h2V3c0-1.1-.9-1.99-2-1.99L7 1c-1.1 0-2 .9-2 2v4h2V5zm8.41 11.59L20 12l-4.59-4.59L14 8.83 17.17 12 14 15.17l1.41 1.42zM10 15.17L6.83 12 10 8.83 8.59 7.41 4 12l4.59 4.59L10 15.17zM17 19H7v-2H5v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v2z"}},
				]
			}, as),
			DeveloperModeOutlined: createSvgIcon({
				name:"DeveloperModeOutlined",root,_sections:[
					{"path":{d: "M7 5h10v2h2V3c0-1.1-.9-1.99-2-1.99L7 1c-1.1 0-2 .9-2 2v4h2V5zm8.41 11.59L20 12l-4.59-4.59L14 8.83 17.17 12 14 15.17l1.41 1.42zM10 15.17L6.83 12 10 8.83 8.59 7.41 4 12l4.59 4.59L10 15.17zM17 19H7v-2H5v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v2z"}},
				]
			}, as),
			DeviceHub: createSvgIcon({
				name:"DeviceHub",root,_sections:[
					{"path":{d: "M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z"}},
				]
			}, as),
			DeviceHubOutlined: createSvgIcon({
				name:"DeviceHubOutlined",root,_sections:[
					{"path":{d: "M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z"}},
				]
			}, as),
			Devices: createSvgIcon({
				name:"Devices",root,_sections:[
					{"path":{d: "M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"}},
				]
			}, as),
			DevicesOutlined: createSvgIcon({
				name:"DevicesOutlined",root,_sections:[
					{"path":{d: "M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"}},
				]
			}, as),
			EjectThin: createSvgIcon({
				name:"EjectThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M24 24h-24v-5h24v5zm-1-4h-22v3h22v-3zm1-3h-24l12-17 12 17zm-22.07-1h20.14l-10.07-14.266-10.07 14.266z"}},
				]
			}, as),
			EllipsisH: createSvgIcon({
				name:"EllipsisH",root,_sections:[
					{"path":{d: "M16 12c0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3-3-1.344-3-3zm1 0c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm-8 0c0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3-3-1.344-3-3zm1 0c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm-8 0c0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3-3-1.344-3-3zm1 0c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2z"}},
				]
			}, as),
			EllipsisV: createSvgIcon({
				name:"EllipsisV",root,_sections:[
					{"path":{d: "M12 16c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"}},
				]
			}, as),
			EmojiEmotions: createSvgIcon({
				name:"EmojiEmotions",root,_sections:[
					{"path":{d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zM12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4zm3.5-7c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"}},
				]
			}, as),
			EmojiEmotionsOutlined: createSvgIcon({
				name:"EmojiEmotionsOutlined",root,_sections:[
					{"circle":{cx: "15.5",cy: "9.5",r:"1.5"}},
					{"circle":{cx: "8.5",cy: "9.5",r:"1.5"}},
					{"path":{d: "M12 18c2.28 0 4.22-1.66 5-4H7c.78 2.34 2.72 4 5 4z"}},
					{"path":{d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}}
				]
			}, as),
			Event: createSvgIcon({
				name:"Event",root,_sections:[
					{"path":{d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"}},
				]
			}, as),
			FastBackward: createSvgIcon({
				name:"FastBackward",root: extendObj({},root,{viewBox:'0 0 512 384'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M0 436V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v151.9L235.5 71.4C256.1 54.3 288 68.6 288 96v131.9L459.5 71.4C480.1 54.3 512 68.6 512 96v320c0 27.4-31.9 41.7-52.5 24.6L288 285.3V416c0 27.4-31.9 41.7-52.5 24.6L64 285.3V436c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12z"}},
				]
			}, as),
			FastBackward2: createSvgIcon({
				name:"FastBackward2",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M9 12l15-9v18l-15-9zm-9 0l13 8v-3.268l-7.888-4.732 7.888-4.732v-3.268l-13 8z"}},
				]
			}, as),
			FastForward: createSvgIcon({
				name:"FastForward",root: extendObj({},root,{viewBox:'0 0 512 384'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M512 76v360c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V284.1L276.5 440.6c-20.6 17.2-52.5 2.8-52.5-24.6V284.1L52.5 440.6C31.9 457.8 0 443.4 0 416V96c0-27.4 31.9-41.7 52.5-24.6L224 226.8V96c0-27.4 31.9-41.7 52.5-24.6L448 226.8V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12z"}},
				]
			}, as),
			FastForward2: createSvgIcon({
				name:"FastForward2",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M0 21v-18l15 9-15 9zm11-17v3.268l7.888 4.732-7.888 4.732v3.268l13-8-13-8z"}},
				]
			}, as),
			Favorite: createSvgIcon({
				name:"Favorite",root,_sections:[
					{"path":{d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}},
				]
			}, as),
			FavoriteOutlined: createSvgIcon({
				name:"FavoriteOutlined",root,_sections:[
					{"path":{d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}},
				]
			}, as),
			Feedback: createSvgIcon({
				name:"Feedback",root,_sections:[
					{"path":{d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"}},
				]
			}, as),
			FeedbackOutlined: createSvgIcon({
				name:"FeedbackOutlined",root,_sections:[
					{"path":{d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9-4h2v2h-2zm0-6h2v4h-2z"}},
				]
			}, as),
			FeaturedPlayList: createSvgIcon({
				name:"FeaturedPlayList",root,_sections:[
					{"path":{d: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 8H3V9h9v2zm0-4H3V5h9v2z"}},
				]
			}, as),
			FeaturedPlayListOutlined: createSvgIcon({
				name:"FeaturedPlayListOutlined",root,_sections:[
					{"path":{d: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 10h9v2H5zm0-3h9v2H5z"}},
				]
			}, as),
			FeaturedPlayListTwoTone: createSvgIcon({
				name:"FeaturedPlayListTwoTone",root,_sections:[
					{"path":{d: "M3 19h18V5H3v14zM5 7h9v2H5V7zm0 3h9v2H5v-2z",opacity: ".3"}},
					{"path":{d: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 10h9v2H5zm0-3h9v2H5z"}},
				]
			}, as),
			FeaturedVideo: createSvgIcon({
				name:"FeaturedVideo",root,_sections:[
					{"path":{d: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 9H3V5h9v7z"}},
				]
			}, as),
			FeaturedVideoOutlined: createSvgIcon({
				name:"FeaturedVideoOutlined",root,_sections:[
					{"path":{d: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM4 6h9v7H4z"}},
				]
			}, as),
			Forward: createSvgIcon({
				name:"Forward",root: extendObj({},root,{viewBox:'0 0 512 384'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"}},
				]
			}, as),
			FullscreenThin: createSvgIcon({
				name:"FullscreenThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-4 7h-1v-3.241l-11.241 11.241h3.241v1h-5v-5h1v3.241l11.241-11.241h-3.241v-1h5v5z"}},
				]
			}, as),
			GoogleLens: createSvgIcon({
				name:"GoogleLens",root,_sections:[
					{"path":{d: "M12 16.667a4.666 4.666 0 100-9.333 4.666 4.666 0 000 9.333m8 6a2.666 2.666 0 100-5.333 2.666 2.666 0 000 5.333m-13.333-2a3.343 3.343 0 01-3.334-3.334v-2.666H0v2.666A6.665 6.665 0 006.667 24h2.666v-3.333zm-3.334-14c0-1.834 1.5-3.334 3.334-3.334h2.666V0H6.667A6.665 6.665 0 000 6.667v2.666h3.333zm14-3.334c1.834 0 3.334 1.5 3.334 3.334v2.666H24V6.667A6.665 6.665 0 0017.333 0h-2.666v3.333Z"}},
				]
			}, as),
			Group: createSvgIcon({
				name:"Group",root,_sections:[
					{"path":{d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"}},
				]
			}, as),
			Help: createSvgIcon({
				name:"Help",root,_sections:[
					{"path":{d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"}},
				]
			}, as),
			HelpOutline: createSvgIcon({
				name:"HelpOutline",root,_sections:[
					{"path":{d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"}},
				]
			}, as),
			HelpOutlined: createSvgIcon({
				name:"HelpOutlined",root,_sections:[
					{"path":{d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"}},
				]
			}, as),
			Hdd: createSvgIcon({
				name:"Hdd",root: extendObj({},root,{viewBox:'0 0 576 384'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M576 304v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48zm-48-80a79.557 79.557 0 0 1 30.777 6.165L462.25 85.374A48.003 48.003 0 0 0 422.311 64H153.689a48 48 0 0 0-39.938 21.374L17.223 230.165A79.557 79.557 0 0 1 48 224h480zm-48 96c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm-96 0c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"}},
				]
			}, as),
			Home: createSvgIcon({
				name:"Home",root,_sections:[
					{"path":{d: "M3 14.828v9.172h18v-9.172l-9-8.375-9 8.375zm11 7.172h-4v-6h4v6zm10-9.852l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148z"}},
				]
			}, as),
			Launch: createSvgIcon({
				name:"Launch",root,_sections:[
					{"path":{d: "M17.281 8.991l3.706 1.97-2.261 2.013.011.006 2.25 3.09-2.25 1.228v3.096l-6.75 3.606-6.75-3.606v-3.091l-2.25-1.225 2.234-3.075-2.234-1.966 3.747-2.043c-.108.371-.197.808-.245 1.272l-1.769.964 1.181 1.04.624-.345c.056.339.146.672.279.984l-.823.456 6.028 3.124 5.978-3.119-.812-.451c.145-.299.245-.618.31-.944l.531.293 1.234-1.098-1.707-.907c-.05-.464-.146-.9-.262-1.272zm-4.798 8.217v5.393l5.256-2.807v-1.951l-3.502 1.91-1.754-2.545zm-6.247.639v1.947l5.249 2.804v-5.388l-1.748 2.543-3.501-1.906zm-1.772-2.103l4.96 2.7 1.099-1.599-4.983-2.582-1.076 1.481zm8.989 1.11l1.096 1.59 4.96-2.706-1.073-1.475-4.983 2.591zm-1.199-1.691h-.625l.003-2.728h.625l-.003 2.728zm-1.159-1.424h-.625l.009-1.739h.625l-.009 1.739zm2.358-.014h-.626l-.009-1.725h.625l.01 1.725zm-3.094-2.468l-.318-.734c-.732.269-2.155 2.284-2.155 2.284-1.195-2.607.161-4.846 1.243-5.659-.083-.699-.644-4.168 2.817-7.113l.041-.035.041.035c3.462 2.945 2.901 6.414 2.817 7.113 1.083.813 2.438 3.052 1.243 5.659 0 0-1.423-2.015-2.155-2.284l-.317.734-1.629.005-1.628-.005zm1.628-9.919c-1.093.923-2.432 3.393-1.854 6.223-.726.6-1.58 1.454-1.712 3.089.577-.77 1.419-1.21 2.091-1.356 0 0 .424.782.507.973l.968.003.969-.003c.083-.191.507-.973.507-.973.671.146 1.513.586 2.091 1.356-.133-1.635-.967-2.472-1.693-3.072.586-2.722-.771-5.295-1.861-6.229l-.013-.011zm-.044 5.693c-.284-.001-.515-.231-.515-.516 0-.285.231-.515.515-.515.284 0 .514.23.514.515 0 .285-.23.515-.514.516zm0-1.844c-.569 0-1.029-.462-1.03-1.031.001-.57.461-1.031 1.03-1.031s1.029.461 1.029 1.031c0 .569-.46 1.03-1.029 1.031zm0-1.434c.214 0 .388.174.388.389 0 .215-.174.389-.388.389-.215 0-.389-.174-.389-.389 0-.215.174-.389.389-.389z"}},
				]
			}, as),
			Label: createSvgIcon({
				name:"Label",root,_sections:[
					{"path":{d: "M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"}},
				]
			}, as),
			Load: createSvgIcon({
				name:"Load",root: extendObj({},root,{viewBox:'0 0 495 496'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"}},
				]
			}, as),
			Loop: createSvgIcon({
				name:"Loop",root: extendObj({},root,{viewBox:'0 0 633 390'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"}},
				]
			}, as),
			LoopThin: createSvgIcon({
				name:"LoopThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M24 20h-21.888l2.885 2.247-.665.753-4.475-3.503 4.478-3.497.665.753-2.882 2.247h20.882v-11h1v12zm-2.118-16l-2.882-2.247.665-.753 4.478 3.497-4.475 3.503-.665-.753 2.885-2.247h-20.888v11.145h-1v-12.145h21.882z"}},
				]
			}, as),
			LoopOne: createSvgIcon({
				name:"LoopOne",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M6.09 18h-.09c-3.313 0-6-2.687-6-6s2.687-6 6-6h2v-3l6 4-6 4v-3h-2c-2.206 0-4 1.794-4 4s1.794 4 4 4h.09c-.055.326-.09.658-.09 1s.035.674.09 1zm11.91-12h-2v2h2c2.206 0 4 1.794 4 4s-1.794 4-4 4h-.09c.055.326.09.658.09 1s-.035.674-.09 1h.09c3.313 0 6-2.687 6-6s-2.687-6-6-6zm-6 7c-2.209 0-4 1.791-4 3.999 0 2.209 1.791 4.001 4 4.001s4-1.792 4-4.001c0-2.208-1.791-3.999-4-3.999zm1.016 6.188h-1.055v-3.109c-.022 0-.884.413-.904.423l-.179-.936 1.241-.574h.896v4.196z"}},
				]
			}, as),
			Menu: createSvgIcon({
				name:"Menu",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"}},
					{"path":{d: "M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z"}},
				]
			}, as),
			Menu2: createSvgIcon({
				name:"Menu2",root: extendObj({},root,{viewBox:'0 0 430 375'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"}},
				]
			}, as),
			MinimizeThin: createSvgIcon({
				name:"MinimizeThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M24 22h-24v-20h24v20zm-23-9v8h10v-8h-10zm22 8v-18h-22v9h11v9h11zm-4-9h-5v-5h1v3.241l5.241-5.241.759.759-5.241 5.241h3.241v1z"}},
				]
			}, as),
			More: createSvgIcon({
				name:"More",root,_sections:[
					{"path":{d: "M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.97.89 1.66.89H22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"}},
				]
			}, as),
			MoreHoriz: createSvgIcon({
				name:"MoreHoriz",root,_sections:[
					{"path":{d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}},
				]
			}, as),
			MoreVert: createSvgIcon({
				name:"MoreVert",root,_sections:[
					{"path":{d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}},
				]
			}, as),
			NextThin: createSvgIcon({
				name:"NextThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M2 24l18-12-18-12v24zm19-24v24h1v-24h-1zm-2.803 12l-15.197 10.132v-20.263l15.197 10.131z"}},
				]
			}, as),
			Notifications: createSvgIcon({
				name:"Notifications",root,_sections:[
					{"path":{d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"}},
				]
			}, as),
			Pages: createSvgIcon({
				name:"Pages",root,_sections:[
					{"path":{d: "M3 5v6h5L7 7l4 1V3H5c-1.1 0-2 .9-2 2zm5 8H3v6c0 1.1.9 2 2 2h6v-5l-4 1 1-4zm9 4l-4-1v5h6c1.1 0 2-.9 2-2v-6h-5l1 4zm2-14h-6v5l4-1-1 4h5V5c0-1.1-.9-2-2-2z"}},
				]
			}, as),
			PagesOutlined: createSvgIcon({
				name:"PagesOutlined",root,_sections:[
					{"path":{d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 2h6v6h-3l1-4-4 1V5zM5 5h6v3L7 7l1 4H5V5zm6 14H5v-6h3l-1 4 4-1v3zm8 0h-6v-3l4 1-1-4h3v6zm-4.37-4.37L12 13.72l-2.63.91.91-2.63-.91-2.63 2.63.91 2.63-.91-.91 2.63.91 2.63z"}},
				]
			}, as),
			Person: createSvgIcon({
				name:"Person",root,_sections:[
					{"path":{d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"}},
				]
			}, as),
			PermMedia: createSvgIcon({
				name:"PermMedia",root,_sections:[
					{"path":{d: "M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			PermMediaOutlined: createSvgIcon({
				name:"PermMediaOutlined",root,_sections:[
					{"path":{d: "M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm5 9h14l-3.5-4.5-2.5 3.01L11.5 9zM22 4h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 12H6V4h5.17l1.41 1.41.59.59H22v10z"}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			PlayCircleOutline: createSvgIcon({
				name:"PlayCircleOutline",root,_sections:[
					{"path":{d: "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}},
				]
			}, as),
			PlayCircleFilledOutlined: createSvgIcon({
				name:"PlayCircleFilledOutlined",root,_sections:[
					{"path":{d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			PlaylistAdd: createSvgIcon({
				name:"PlaylistAdd",root,_sections:[
					{"path":{d: "M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"}},
				]
			}, as),
			PlaylistAddCheck: createSvgIcon({
				name:"PlaylistAddCheck",root,_sections:[
					{"path":{d: "M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z"}},
				]
			}, as),
			PlaylistPlay: createSvgIcon({
				name:"PlaylistPlay",root,_sections:[
					{"path":{d: "M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z"}},
				]
			}, as),
			PlaylistPlayOutlined: createSvgIcon({
				name:"PlaylistPlayOutlined",root,_sections:[
					{"path":{d: "M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z"}},
				]
			}, as),
			PostAdd: createSvgIcon({
				name:"PostAdd",root,_sections:[
					{"path":{d: "M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z"}},
					{"path":{d: "M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zM7 12v2h8v-2h-3zM7 15h8v2H7z"}},
				]
			}, as),
			Play: createSvgIcon({
				name:"Play",root: extendObj({},root,{viewBox:'0 0 448 512'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"}},
				]
			}, as),
			PlayThin: createSvgIcon({
				name:"PlayThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z"}},
				]
			}, as),
			PlayCircle: createSvgIcon({
				name:"PlayCircle",root: extendObj({},root,{viewBox:'0 0 496 496'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"}},
				]
			}, as),
			PreviousThin: createSvgIcon({
				name:"PreviousThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M22 24l-18-12 18-12v24zm-19-24v24h-1v-24h1zm2.803 12l15.197 10.132v-20.263l-15.197 10.131z"}},
				]
			}, as),
			Pause: createSvgIcon({
				name:"Pause",root: extendObj({},root,{viewBox:'0 0 448 448'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"}},
				]
			}, as),
			PauseThin: createSvgIcon({
				name:"PauseThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z"}},
				]
			}, as),
			PauseCircle: createSvgIcon({
				name:"PauseCircle",root: extendObj({},root,{viewBox:'0 0 496 496'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"}},
				]
			}, as),
			RandomThin: createSvgIcon({
				name:"RandomThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z"}},
				]
			}, as),
			Redo: createSvgIcon({
				name:"Redo", root, _sections:[
					{"path":{d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"}},
				]
			}, as),
			RedoRounded: createSvgIcon({
				name:"RedoRounded", root, _sections:[
					{"path":{d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.16 0-7.74 2.42-9.44 5.93-.32.67.04 1.47.75 1.71.59.2 1.23-.08 1.5-.64 1.3-2.66 4.03-4.5 7.19-4.5 1.95 0 3.73.72 5.12 1.88l-1.91 1.91c-.63.63-.19 1.71.7 1.71H21c.55 0 1-.45 1-1V9.41c0-.89-1.08-1.34-1.71-.71l-1.89 1.9z"}},
				]
			}, as),
			Redo2: createSvgIcon({
				name:"Redo",root: extendObj({},root,{viewBox:'0 0 504 504'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"}},
				]
			}, as),
			ReloadThin: createSvgIcon({
				name:"ReloadThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"}},
				]
			}, as),
			Remove: createSvgIcon({
				name:"Remove",root,_sections:[
					{"path":{d: "M19 13H5v-2h14v2z"}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			Room: createSvgIcon({
				name:"Room",root,_sections:[
					{"path":{d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			RoomOutlined: createSvgIcon({
				name:"RoomOutlined",root,_sections:[
					{"path":{d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"}},
					{"circle":{cx: "12",cy: "9",r:"2.5"}}
				]
			}, as),
			RssFeed: createSvgIcon({
				name:"RssFeed",root,_sections:[
					{"path":{d: "M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			RssFeedOutlined: createSvgIcon({
				name:"RssFeedOutlined",root,_sections:[
					{"path":{d: "M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			Save: createSvgIcon({
				name:"Save",root: extendObj({},root,{viewBox:'0 0 448 448'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"}},
				]
			}, as),
			School: createSvgIcon({
				name:"School",root,_sections:[
					{"path":{d: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			SchoolOutlined: createSvgIcon({
				name:"SchoolOutlined",root,_sections:[
					{"path":{d: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			Search: createSvgIcon({
				name:"Search",root,_sections:[
					{"path":{d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}}
				]
			}, as),
			SearchThin: createSvgIcon({
				name:"SearchThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"}},
				]
			}, as),
			Shuffle: createSvgIcon({
				name:"Shuffle",root: extendObj({},root,{viewBox:'0 0 512 448'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596 53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 176h84l52.781 56.551 53.333-57.143-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z"}},
				]
			}, as),
			SwapVert: createSvgIcon({
				name:"SwapVert",root,_sections:[
					{"path":{d: "M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"}}
				]
			}, as),
			SwapHoriz: createSvgIcon({
				name:"SwapHoriz",root,_sections:[
					{"path":{d: "M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"}}
				]
			}, as),
			Stop: createSvgIcon({
				name:"Stop",root: extendObj({},root,{viewBox:'0 0 448 448'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"}},
				]
			}, as),
			StopCircle: createSvgIcon({
				name:"StopCircle",root: extendObj({},root,{viewBox:'0 0 496 496'})/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm96 328c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16v160z"}},
				]
			}, as),
			StreamMusic: createSvgIcon({
				name:"StreamMusic", root, _sections:[
					{"path":{d: "M20 11.92v5.444c-.004 3.11-2.34 4.636-4.479 4.636-1.806 0-3.521-1.089-3.521-3.232 0-2.477 3.025-4.729 6-4.141v-2.707c.737.107 1.263.107 2 0zm-7.925-7.89l-6.071 1.555v11.04c-2.979-.589-6.004 1.671-6.004 4.154 0 2.137 1.671 3.221 3.485 3.221 2.155 0 4.512-1.528 4.515-4.638v-8.9l5.37-1.32c-1.053-1.428-1.561-3.205-1.295-5.112zm2.642-.697c1.306 0 1.398.905 1.691 1.755.129.373.164.56.275.56.13 0 .177-.23.324-.691.204-.633.509-1.628 1.22-1.628.685 0 .978.91 1.235 1.669.137.406.191.65.308.65.122 0 .202-.245.339-.65.248-.747.516-1.669 1.205-1.669.678 0 .985.891 1.171 1.479.256.814.332 1.025.806 1.025h.635c.045-.271.074-.548.074-.833 0-2.761-2.238-5-5-5-2.177 0-4.023 1.392-4.711 3.333h.428zm8.992 3.334c-.687 1.941-2.532 3.333-4.709 3.333-2.762 0-5-2.239-5-5 0-.285.029-.562.074-.833h.684c.458 0 .503.196.755 1.014.171.553.484 1.479 1.171 1.479.694 0 .988-.941 1.253-1.722.145-.423.176-.598.291-.598.123 0 .158.195.3.622.256.771.55 1.698 1.243 1.698.622 0 .92-.765 1.136-1.379.247-.702.282-.964.408-.964.128 0 .152.228.373.864.358 1.026.586 1.485 1.543 1.485h.478z"}},
				]
			}, as),
			StreamVideo: createSvgIcon({
				name:"StreamVideo",root,_sections:[
					{"path":{d: "M19 12c-.341 0-.673-.033-1-.08v1.08h-2v-1.683c-.749-.356-1.427-.837-2-1.422v3.105h-8v-6h6.294c-.19-.634-.294-1.305-.294-2h-12v19h20v-12.08c-.327.047-.659.08-1 .08zm-15 10h-2v-2h2v2zm0-4h-2v-2h2v2zm0-5h-2v-2h2v2zm0-4h-2v-2h2v2zm10 13h-8v-6h8v6zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2zm-3.711-14.667c.688-1.941 2.534-3.333 4.711-3.333 2.762 0 5 2.239 5 5 0 .285-.029.562-.074.833h-.635c-.474 0-.55-.211-.806-1.025-.186-.589-.493-1.479-1.171-1.479-.689 0-.957.923-1.205 1.669-.137.405-.217.65-.339.65-.116 0-.171-.245-.308-.65-.258-.759-.551-1.669-1.235-1.669-.711 0-1.016.995-1.22 1.628-.147.46-.194.691-.324.691-.111 0-.146-.187-.275-.56-.293-.85-.386-1.755-1.691-1.755h-.428zm8.941 3.334c-.957 0-1.185-.459-1.543-1.485-.221-.636-.245-.864-.373-.864-.126 0-.161.262-.408.964-.216.615-.514 1.379-1.136 1.379-.693 0-.987-.927-1.243-1.698-.142-.427-.177-.622-.3-.622-.115 0-.146.175-.291.598-.265.781-.559 1.722-1.253 1.722-.687 0-1-.926-1.171-1.479-.252-.818-.297-1.014-.755-1.014h-.684c-.044.27-.073.547-.073.832 0 2.761 2.238 5 5 5 2.177 0 4.022-1.392 4.709-3.333h-.479z"}},
				]
			}, as),
			TheaterMode: createSvgIcon({
				name:"TheaterMode", root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path": {d: "M17 17h-10v-10h10v10zm7 3l-5-3v-10l5-3v16zm-24-16l5 3v10l-5 3v-16z"}},
				]
			}, as),
			Undo: createSvgIcon({
				name:"Undo", root, _sections:[
					{"path": {d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"}}
				]
			}, as), 
			UndoRounded: createSvgIcon({
				name:"UndoRounded", root, _sections:[
					{"path": {d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L3.71 8.71C3.08 8.08 2 8.52 2 9.41V15c0 .55.45 1 1 1h5.59c.89 0 1.34-1.08.71-1.71l-1.91-1.91c1.39-1.16 3.16-1.88 5.12-1.88 3.16 0 5.89 1.84 7.19 4.5.27.56.91.84 1.5.64.71-.23 1.07-1.04.75-1.72C20.23 10.42 16.65 8 12.5 8z"}}
				]
			}, as), 
			Upload: createSvgIcon({
				name:"Upload", root, _sections:[
					{"path":{d: "M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z"}},
				]
			}, as),
			Usb: createSvgIcon({
				name:"Usb", root, _sections:[
					{"path":{d: "M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2.07c.7-.37 1.2-1.08 1.2-1.93 0-1.21-.99-2.2-2.2-2.2-1.21 0-2.2.99-2.2 2.2 0 .85.5 1.56 1.2 1.93V13c0 1.11.89 2 2 2h3v3.05c-.71.37-1.2 1.1-1.2 1.95 0 1.22.99 2.2 2.2 2.2 1.21 0 2.2-.98 2.2-2.2 0-.85-.49-1.58-1.2-1.95V15h3c1.11 0 2-.89 2-2v-2h1V7h-4z"}},
				]
			}, as),
			UsbOutlined: createSvgIcon({
				name:"UsbOutlined",root,_sections:[
					{"path":{d: "M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2.07c.7-.37 1.2-1.08 1.2-1.93 0-1.21-.99-2.2-2.2-2.2S4.8 7.79 4.8 9c0 .85.5 1.56 1.2 1.93V13c0 1.11.89 2 2 2h3v3.05c-.71.37-1.2 1.1-1.2 1.95 0 1.22.99 2.2 2.2 2.2s2.2-.98 2.2-2.2c0-.85-.49-1.58-1.2-1.95V15h3c1.11 0 2-.89 2-2v-2h1V7h-4z"}},
				]
			}, as),
			Update: createSvgIcon({
				name:"Update",root,_sections:[
					{"path":{d: "M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58s9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"}},
				]
			}, as),
			UpdateOutlined: createSvgIcon({
				name:"UpdateOutlined",root,_sections:[
					{"path":{d: "M11 8v5l4.25 2.52.77-1.28-3.52-2.09V8H11zm10 2V3l-2.64 2.64C16.74 4.01 14.49 3 12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9h-2c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7c1.93 0 3.68.79 4.95 2.05L14 10h7z"}},
				]
			}, as),
			Video: createSvgIcon({
				name:"Video",root:{ viewBox:"0 0 576 512"},_sections:[
					{"path":{d: "M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"}},
				]
			}, as),
			Videocam: createSvgIcon({
				name:"Videocam",root,_sections:[
					{"path":{d: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"}},
				]
			}, as),
			VideocamOff: createSvgIcon({
				name:"VideocamOff",root,_sections:[
					{"path":{d: "M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z"}},
				]
			}, as),
			
			VideocamOffOutlined: createSvgIcon({
				name:"VideocamOffOutlined",root,_sections:[
					{"path":{d: "M9.56 8l-2-2-4.15-4.14L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18L19.73 21l1.41-1.41-8.86-8.86L9.56 8zM5 16V8h1.73l8 8H5zm10-8v2.61l6 6V6.5l-4 4V7c0-.55-.45-1-1-1h-5.61l2 2H15z"}},
				]
			}, as),
			VideoLabel: createSvgIcon({
				name:"VideoLabel",root,_sections:[
					{"path":{d: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"}},
				]
			}, as),
			
			VideoLabelRounded: createSvgIcon({
				name:"VideoLabelRounded",root,_sections:[
					{"path":{d: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10z"}},
				]
			}, as),
			VideoLibrary: createSvgIcon({
				name:"VideoLibrary",root,_sections:[
					{"path":{d: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"}},
				]
			}, as),
			VideoLibraryOutlined: createSvgIcon({
				name:"VideoLibraryOutlined",root,_sections:[
					{"path":{d: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5z"}},
				]
			}, as),
			VideoLibraryRounded: createSvgIcon({
				name:"VideoLibraryRounded",root,_sections:[
					{"path":{d: "M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"}},
				]
			}, as),
			VideoLibrarySharp: createSvgIcon({
				name:"VideoLibrarySharp",root,_sections:[
					{"path":{d: "M4 6H2v16h16v-2H4V6zm18-4H6v16h16V2zM12 14.5v-9l6 4.5-6 4.5z"}},
				]
			}, as),
			VideoLibraryTwoTone: createSvgIcon({
				name:"VideoLibraryTwoTone",root,_sections:[
					{"path":{d: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5z"}},
				]
			}, as),
			VoiceChat: createSvgIcon({
				name:"VoiceChat",root,_sections:[
					{"path":{d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12l-4-3.2V14H6V6h8v3.2L18 6v8z"}},
				]
			}, as),
			VoiceChatOutlined: createSvgIcon({
				name:"VoiceChatOutlined",root,_sections:[
					{"path": {d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zm-6-5.4l3 2.4V7l-3 2.4V7H7v6h7z"}},
				]
			}, as),
			VoiceChatRounded: createSvgIcon({
				name:"VoiceChatRounded",root,_sections:[
					{"path": {d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3.62 10.7L14 10.8V13c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v2.2l2.38-1.9c.65-.52 1.62-.06 1.62.78v3.84c0 .84-.97 1.3-1.62.78z"}},
				]
			}, as),
			VoiceChatTwoTone: createSvgIcon({
				name:"VoiceChatTwoTone",root,_sections:[
					{"path": {d: "M4 17.17L5.17 16H20V4H4v13.17zM7 7h7v2.4L17 7v6l-3-2.4V13H7V7z", opacity: ".3"}},
					{"path": {d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zm-6-5.4l3 2.4V7l-3 2.4V7H7v6h7z"}}
				]
			}, as),
			Voicemail: createSvgIcon({
				name:"Voicemail",root,_sections:[
					{"path":{d: "M18.5 6C15.46 6 13 8.46 13 11.5c0 1.33.47 2.55 1.26 3.5H9.74c.79-.95 1.26-2.17 1.26-3.5C11 8.46 8.54 6 5.5 6S0 8.46 0 11.5 2.46 17 5.5 17h13c3.04 0 5.5-2.46 5.5-5.5S21.54 6 18.5 6zm-13 9C3.57 15 2 13.43 2 11.5S3.57 8 5.5 8 9 9.57 9 11.5 7.43 15 5.5 15zm13 0c-1.93 0-3.5-1.57-3.5-3.5S16.57 8 18.5 8 22 9.57 22 11.5 20.43 15 18.5 15z"}},
				]
			}, as),
			VolumeDown: createSvgIcon({
				name:"VolumeDown",root,_sections:[
					{"path": {d: "M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"}},
				]
			}, as),
			VolumeDownOutlined: createSvgIcon({
				name:"VolumeDownOutlined",root,_sections:[
					{"path": {d: "M16 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02 0-1.77-1.02-3.29-2.5-4.03zM5 9v6h4l5 5V4L9 9H5zm7-.17v6.34L9.83 13H7v-2h2.83L12 8.83z"}},
				]
			}, as),
			VolumeDownTwoTone: createSvgIcon({
				name:"VolumeDownTwoTone",root,_sections:[
					{"path":{d: "M7 13h2.83L12 15.17V8.83L9.83 11H7z",opacity: ".3"}},
					{"path":{d: "M16 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02 0-1.77-1.02-3.29-2.5-4.03zM5 9v6h4l5 5V4L9 9H5zm7-.17v6.34L9.83 13H7v-2h2.83L12 8.83z"}},
				]
			}, as),
			VolumeMute: createSvgIcon({
				name:"VolumeMute",root,_sections:[
					{"path":{d: "M7 9v6h4l5 5V4l-5 5H7z"}},
				]
			}, as),
			VolumeMuteOutlined: createSvgIcon({
				name:"VolumeMuteOutlined",root,_sections:[
					{"path":{d: "M14 8.83v6.34L11.83 13H9v-2h2.83L14 8.83M16 4l-5 5H7v6h4l5 5V4z"}},
				]
			}, as),
			VolumeOff: createSvgIcon({
				name:"VolumeOff",root,_sections:[
					{"path":{d: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"}},
				]
			}, as),
			VolumeOffOutlined: createSvgIcon({
				name:"VolumeOffOutlined",root,_sections:[
					{"path":{d: "M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.41v3.76zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"}},
				]
			}, as),
			VolumeOffTwoTone: createSvgIcon({
				name:"VolumeOffTwoTone",root,_sections:[
					{"path":{d: "M7.83 11H5v2h2.83L10 15.17v-3.76l-1.29-1.29z",opacity: ".3"}},
					{"path":{d: "M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.41v3.76zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"}},
				]
			}, as),
			VolumeUp: createSvgIcon({
				name:"VolumeUp",root,_sections:[
					{"path":{d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"}},
				]
			}, as),
			VolumeUpOutlined: createSvgIcon({
				name:"VolumeUpOutlined",root,_sections:[
					{"path":{d: "M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"}},
				]
			}, as),
			VolumeUpTwoTone: createSvgIcon({
				name:"VolumeUpTwoTone",root,_sections:[
					{"path":{d: "M5 13h2.83L10 15.17V8.83L7.83 11H5z",opacity: ".3"}},
					{"path":{d: "M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zm4-.86v8.05c1.48-.73 2.5-2.25 2.5-4.02 0-1.77-1.02-3.29-2.5-4.03zm0-4.74v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"}},
				]
			}, as),
			WindowMove: createSvgIcon({
				name:"WindowMove",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M7 0h4v2h-4v-2zm9 2v3h2v-5h-5v2h3zm-16 9h2v-4h-2v4zm4 5h-2v-3h-2v5h4v-2zm-2-11v-3h3v-2h-5v5h2zm22 2v17h-18v-17h18zm-2 5h-14v10h14v-10z"}},
				]
			}, as),
			Wrench: createSvgIcon({
				name:"Wrench",root,_sections:[
					{"path":{d: "M17.959 24c-1.729 0-3.376-.742-4.522-2.037-1.146-1.293-1.683-3.018-1.474-4.731.042-.343-.08-.693-.325-.938l-4.198-4.208c-.274-.274-.654-.432-1.043-.432l-.111.004c-1.683.129-3.373-.481-4.584-1.692-1.098-1.099-1.702-2.561-1.702-4.117 0-1.044.293-2.385.715-3.278l3.81 3.811c.435-.074.967-.394 1.404-.935.283-.35.427-.675.466-.91l-3.826-3.827c.889-.418 2.219-.71 3.255-.71 1.533 0 3.043.601 4.143 1.702 1.239 1.241 1.82 2.881 1.679 4.743-.023.328.096.651.329.885l4.3 4.31c.248.249.593.369.943.325 3.609-.46 6.782 2.411 6.782 5.994 0 3.331-2.71 6.041-6.041 6.041zm-11.563-14.343c.915 0 1.81.371 2.456 1.018l4.2 4.208c.676.678 1.009 1.646.892 2.593-.139 1.145.221 2.299.987 3.165.768.867 1.871 1.363 3.027 1.363 2.229 0 4.044-1.814 4.044-4.043 0-2.398-2.123-4.323-4.536-4.013-.981.122-1.923-.212-2.606-.896l-4.3-4.312c-.643-.647-.973-1.537-.906-2.445.097-1.283-.273-2.353-1.1-3.181-.493-.492-1.098-.833-1.758-1l1.49 1.491c.217 1 .125 1.946-.804 3.097-1.004 1.246-2.297 1.93-3.878 1.585l-1.49-1.491c.166.661.508 1.266 1 1.76.797.795 1.9 1.201 3.017 1.112l.265-.011zm11.275 7.222l1.079.289.289 1.079-.791.791-1.079-.29-.29-1.079.792-.79zm-.447-1.671l-2.015 2.014.737 2.75 2.749.738 2.014-2.014-.736-2.75-2.749-.738z"}},
				]
			}, as),
			Youtube: createSvgIcon({
				name:"Youtube",root,_sections:[
					{"path":{d: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"}},
				]
			}, as),
			ZoomInThin: createSvgIcon({
				name:"ZoomInThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5zm-4.5 8h4v-4h1v4h4v1h-4v4h-1v-4h-4v-1z"}},
				]
			}, as),
			ZoomOutThin: createSvgIcon({
				name:"ZoomOutThin",root/* {width:"24", height:"24",fillRule:"evenodd", clipRule:"evenodd"} */,_sections:[
					{"path":{d: "M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5zm-4.5 8h9v1h-9v-1z"}},
				]
			}, as),
			Wallpaper: createSvgIcon({
				name:"Wallpaper",root,_sections:[
					{"path":{d: "M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"}},
				]
			}, as),
			Work: createSvgIcon({
				name:"Work",root,_sections:[
					{"path":{d: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"}},
				]
			}, as),
			WorkOff: createSvgIcon({
				name:"WorkOff",root,_sections:[
					{"path":{d: "M23 21.74l-1.46-1.46L7.21 5.95 3.25 1.99 1.99 3.25l2.7 2.7h-.64c-1.11 0-1.99.89-1.99 2l-.01 11c0 1.11.89 2 2 2h15.64L21.74 23 23 21.74zM22 7.95c.05-1.11-.84-2-1.95-1.95h-4V3.95c0-1.11-.89-2-2-1.95h-4c-1.11-.05-2 .84-2 1.95v.32l13.95 14V7.95zM14.05 6H10V3.95h4.05V6z"}},
				]
			}, as),
			WorkOffOutline: createSvgIcon({
				name:"WorkOffOutline",root,_sections:[
					{"path":{d: "M10 4h4v2h-3.6l2 2H20v7.6l2 2V8c0-1.11-.89-2-2-2h-4V4c0-1.11-.89-2-2-2h-4c-.99 0-1.8.7-1.96 1.64L10 5.6V4zM3.4 1.84L1.99 3.25 4.74 6H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h15.74l2 2 1.41-1.41L3.4 1.84zM4 19V8h2.74l11 11H4z"}},
				]
			}, as),
			WorkOffRounded: createSvgIcon({
				name:"WorkOffRounded",root,_sections:[
					{"path":{d: "M4.11 2.54a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L4.74 6H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h15.74l1.29 1.29c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.11 2.54zM10 4h4v2h-3.6L22 17.6V8c0-1.11-.89-2-2-2h-4V4c0-1.11-.89-2-2-2h-4c-.99 0-1.8.7-1.96 1.64L10 5.6V4z"}},
				]
			}, as),
			WorkOutline: createSvgIcon({
				name:"WorkOutline",root,_sections:[
					{"path":{d: "M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"}},
				]
			}, as),
			WorkOutlined: createSvgIcon({
				name:"WorkOutlined",root,_sections:[
					{"path":{d: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"}},
				]
			}, as),
			/* : createSvgIcon({
				name:"",root,_sections:[
					{"path":{d: ""}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			: createSvgIcon({
				name:"",root,_sections:[
					{"path":{d: ""}},
					//{"circle":{cx: "",cy: "",r:""}}
				]
			}, as),
			 */
			error404 : '',
			angleUp : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 320 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>angleUp</title><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"/></svg>',
			apps : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>apps</title><g class="style-scope yt-icon"><path d="M16,4v4h4V4H16z M19,7h-2V5h2V7z M16,10v4h4v-4H16z M19,13h-2v-2h2V13z M10,4v4h4V4H10z M13,7h-2V5h2V7z M10,10v4h4v-4H10z M13,13h-2v-2h2V13z M16,16v4h4v-4H16z M19,19h-2v-2h2V19z M10,16v4h4v-4H10z M13,19h-2v-2h2V19z M4,4v4h4V4H4z M7,7H5V5h2V7z M4,10 v4h4v-4H4z M7,13H5v-2h2V13z M4,16v4h4v-4H4z M7,19H5v-2h2V19z" class="style-scope yt-icon"></path></g></svg>',
			appsAlt : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>appsAlt</title><path d="M6 6h-6v-6h6v6zm9-6h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6z"/></svg>',
			backward : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 512 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>backward</title><path d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"/></svg>',
			clipboard : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>clipboard</title><path d="M13 17h4v1h-4v-1zm0-1h4v-1h-4v1zm9-14v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-7 9h4v-1h-4v1zm0-2h4v-1h-4v1zm-6.5.077l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.288c-.963.841-1.669 1.777-2.686 3.6-.626-.738-1.044-1.208-1.814-1.923zm.098 5l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.289c-.963.841-1.669 1.777-2.686 3.6-.627-.739-1.045-1.209-1.814-1.924z"/></svg>',
			createVideo : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>create</title><g class="style-scope yt-icon"><path d="M14,13h-3v3H9v-3H6v-2h3V8h2v3h3V13z M17,6H3v12h14v-6.39l4,1.83V8.56l-4,1.83V6 M18,5v3.83L22,7v8l-4-1.83V19H2V5H18L18,5 z" class="style-scope yt-icon"></path></g></svg>',
			ejectThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>ejectThin</title><path d="M24 24h-24v-5h24v5zm-1-4h-22v3h22v-3zm1-3h-24l12-17 12 17zm-22.07-1h20.14l-10.07-14.266-10.07 14.266z"/></svg>',
			explore : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>explore</title><g class="style-scope yt-icon"><path d="M9.8,9.8l-3.83,8.23l8.23-3.83l3.83-8.23L9.8,9.8z M13.08,12.77c-0.21,0.29-0.51,0.48-0.86,0.54 c-0.07,0.01-0.15,0.02-0.22,0.02c-0.28,0-0.54-0.08-0.77-0.25c-0.29-0.21-0.48-0.51-0.54-0.86c-0.06-0.35,0.02-0.71,0.23-0.99 c0.21-0.29,0.51-0.48,0.86-0.54c0.35-0.06,0.7,0.02,0.99,0.23c0.29,0.21,0.48,0.51,0.54,0.86C13.37,12.13,13.29,12.48,13.08,12.77z M12,3c4.96,0,9,4.04,9,9s-4.04,9-9,9s-9-4.04-9-9S7.04,3,12,3 M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2 L12,2z" class="style-scope yt-icon"></path></g></svg>',
			exploreThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>Safari icon</title><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-.75c6.213 0 11.25-5.037 11.25-11.25S18.213.75 12 .75.75 5.787.75 12 5.787 23.25 12 23.25zM12 2a.25.25 0 0 1 .25.25v1a.25.25 0 1 1-.5 0v-1A.25.25 0 0 1 12 2zm0 18.5a.25.25 0 0 1 .25.25v1a.25.25 0 1 1-.5 0v-1a.25.25 0 0 1 .25-.25zm7.071-15.571a.25.25 0 0 1 0 .353l-.707.708a.25.25 0 0 1-.354-.354l.708-.707a.25.25 0 0 1 .353 0zM5.99 18.01a.25.25 0 0 1 0 .354l-.708.707a.25.25 0 1 1-.353-.353l.707-.708a.25.25 0 0 1 .354 0zM4.929 4.93a.25.25 0 0 1 .353 0l.708.707a.25.25 0 0 1-.354.354l-.707-.708a.25.25 0 0 1 0-.353zM18.01 18.01a.25.25 0 0 1 .354 0l.707.708a.25.25 0 1 1-.353.353l-.708-.707a.25.25 0 0 1 0-.354zM2 12a.25.25 0 0 1 .25-.25h1a.25.25 0 1 1 0 .5h-1A.25.25 0 0 1 2 12zm18.5 0a.25.25 0 0 1 .25-.25h1a.25.25 0 1 1 0 .5h-1a.25.25 0 0 1-.25-.25zm-4.593-9.205a.25.25 0 0 1 .133.328l-.391.92a.25.25 0 1 1-.46-.195l.39-.92a.25.25 0 0 1 .328-.133zM8.68 19.825a.25.25 0 0 1 .132.327l-.39.92a.25.25 0 0 1-.46-.195l.39-.92a.25.25 0 0 1 .328-.133zM21.272 8.253a.25.25 0 0 1-.138.325l-.927.375a.25.25 0 1 1-.188-.464l.927-.374a.25.25 0 0 1 .326.138zm-17.153 6.93a.25.25 0 0 1-.138.326l-.927.374a.25.25 0 1 1-.188-.463l.927-.375a.25.25 0 0 1 .326.138zM8.254 2.728a.25.25 0 0 1 .325.138l.375.927a.25.25 0 0 1-.464.188l-.374-.927a.25.25 0 0 1 .138-.326zm6.93 17.153a.25.25 0 0 1 .326.138l.374.927a.25.25 0 1 1-.463.188l-.375-.927a.25.25 0 0 1 .138-.326zM2.795 8.093a.25.25 0 0 1 .328-.133l.92.391a.25.25 0 0 1-.195.46l-.92-.39a.25.25 0 0 1-.133-.328zm17.03 7.228a.25.25 0 0 1 .327-.132l.92.39a.25.25 0 1 1-.195.46l-.92-.39a.25.25 0 0 1-.133-.328zM12.879 12.879L11.12 11.12l-4.141 5.9 5.899-4.142zm6.192-7.95l-5.834 8.308-8.308 5.834 5.834-8.308 8.308-5.834z"/></svg>',
			'export' : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>export</title><path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"/></svg>',
			ellipsisH : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>ellipsisH</title><path d="M16 12c0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3-3-1.344-3-3zm1 0c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm-8 0c0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3-3-1.344-3-3zm1 0c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm-8 0c0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3-3-1.344-3-3zm1 0c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2z"/></svg>',
			ellipsisV : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>ellipsisV</title><path d="M12 16c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"/></svg>',
			eraser : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>eraser</title><path d="M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm.456-11.429l-4.528 4.528 5.658 5.659 4.527-4.53-5.657-5.657z"/></svg>',
			fullscreenThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>fullscreenThin</title><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-4 7h-1v-3.241l-11.241 11.241h3.241v1h-5v-5h1v3.241l11.241-11.241h-3.241v-1h5v5z"/></svg>',
			fastForward : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 512 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>fastForward</title><path d="M512 76v360c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V284.1L276.5 440.6c-20.6 17.2-52.5 2.8-52.5-24.6V284.1L52.5 440.6C31.9 457.8 0 443.4 0 416V96c0-27.4 31.9-41.7 52.5-24.6L224 226.8V96c0-27.4 31.9-41.7 52.5-24.6L448 226.8V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12z"/></svg>',
			fastForward2 : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>fastForward2</title><path d="M0 21v-18l15 9-15 9zm11-17v3.268l7.888 4.732-7.888 4.732v3.268l13-8-13-8z"/></svg>',
			fastBackward : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 512 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>fastBackward</title><path d="M0 436V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v151.9L235.5 71.4C256.1 54.3 288 68.6 288 96v131.9L459.5 71.4C480.1 54.3 512 68.6 512 96v320c0 27.4-31.9 41.7-52.5 24.6L288 285.3V416c0 27.4-31.9 41.7-52.5 24.6L64 285.3V436c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12z"/></svg>',
			fastBackward2 : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>fastBackward2</title><path d="M9 12l15-9v18l-15-9zm-9 0l13 8v-3.268l-7.888-4.732 7.888-4.732v-3.268l-13 8z"/></svg>',
			forward : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 512 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>forward</title><path d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"/></svg>',
			googleAnalytics : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>Google Analytics icon</title><path d="M7.36 21.14A2.86 2.86 0 014.5 24a2.86 2.86 0 01-2.86-2.86 2.86 2.86 0 012.86-2.87 2.86 2.86 0 012.86 2.87zM9.14 12v8.86C9.14 22.88 10.53 24 12 24c1.36 0 2.86-.95 2.86-3.14v-8.72c0-1.85-1.36-3-2.86-3A2.91 2.91 0 009.14 12zm7.5-9.14v18c0 2.02 1.39 3.14 2.86 3.14 1.36 0 2.86-.95 2.86-3.14V3c0-1.85-1.36-3-2.86-3a2.91 2.91 0 00-2.86 2.86Z"/></svg>',
			googleCast : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>Google Cast icon</title><path d="M0 18.5455v3.2727h3.2727c0-1.811-1.4618-3.2727-3.2727-3.2727zm0-4.3637v2.1818c3.011 0 5.4545 2.4437 5.4545 5.4546h2.1819c0-4.2218-3.4146-7.6364-7.6364-7.6364zm0-4.3636V12c5.4218 0 9.8182 4.3964 9.8182 9.8182H12c0-6.6327-5.3782-12-12-12zm21.8182-7.6364H2.1818C.9818 2.1818 0 3.1636 0 4.3636v3.2728h2.1818V4.3636h19.6364v15.2728h-7.6364v2.1818h7.6364c1.2 0 2.1818-.9818 2.1818-2.1818V4.3636c0-1.2-.9818-2.1818-2.1818-2.1818Z"/></svg>',
			googleLens : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>Google Lens icon</title><path d="M12 16.667a4.666 4.666 0 100-9.333 4.666 4.666 0 000 9.333m8 6a2.666 2.666 0 100-5.333 2.666 2.666 0 000 5.333m-13.333-2a3.343 3.343 0 01-3.334-3.334v-2.666H0v2.666A6.665 6.665 0 006.667 24h2.666v-3.333zm-3.334-14c0-1.834 1.5-3.334 3.334-3.334h2.666V0H6.667A6.665 6.665 0 000 6.667v2.666h3.333zm14-3.334c1.834 0 3.334 1.5 3.334 3.334v2.666H24V6.667A6.665 6.665 0 0017.333 0h-2.666v3.333Z"/></svg>',
			googlePodcast : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>Google Podcasts icon</title><path d="M1.5 9.68c-.83 0-1.5.67-1.5 1.5V12.81a1.5 1.5 0 1 0 3 0v-1.63c0-.83-.67-1.5-1.5-1.5zM22.5 9.68c-.83 0-1.5.67-1.5 1.5V12.81a1.5 1.5 0 1 0 3 0v-1.63c0-.83-.67-1.5-1.5-1.5zM6.68 14.59c-.83 0-1.5.67-1.5 1.5V17.72a1.5 1.5 0 1 0 3 0V16.1c0-.83-.67-1.5-1.5-1.5zM6.68 4.77c-.83 0-1.5.67-1.5 1.5V11.63a1.5 1.5 0 0 0 3 0V6.26c0-.83-.67-1.5-1.5-1.5zM17.32 4.77c-.83 0-1.5.67-1.5 1.5V7.91a1.5 1.5 0 0 0 3 0V6.27c0-.83-.67-1.5-1.5-1.5zM12 0c-.83 0-1.5.67-1.5 1.5v1.63a1.5 1.5 0 1 0 3 0V1.5C13.5.67 12.83 0 12 0zM12 19.36c-.83 0-1.5.67-1.5 1.5V22.5a1.5 1.5 0 1 0 3 .01v-1.64c0-.82-.67-1.5-1.5-1.5zM17.32 10.9c-.83 0-1.5.68-1.5 1.5v5.33a1.5 1.5 0 0 0 3 0V12.4c0-.83-.67-1.5-1.5-1.5zM12 6.13c-.83 0-1.5.68-1.5 1.5v8.73a1.5 1.5 0 0 0 3 0V7.64c0-.83-.67-1.5-1.5-1.5z"/></svg>',
			googleSearch : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>Google Search Console icon</title><path d="M8.548 1.156L6.832 2.872v1.682h1.716zm0 3.398v.035H6.832v-.035H3.386L0 7.844v3.577h2.826V8.94c0-.525.429-.954.954-.954h16.476c.525 0 .954.43.954.954v2.48h2.754V7.844l-3.386-3.29H17.3v.035h-1.717v-.035zm7.035 0H17.3V2.872l-1.717-1.716zM8.679 1.188V2.84h6.773V1.188zm11.471 7.07a.834.834 0 00-.132.01l-.543.002c-5.216.014-10.432-.008-15.648.01-.435-.063-.794.436-.716.883v2.264h17.812c-.016-.888.045-1.782-.034-2.666-.104-.342-.427-.502-.739-.502zm-15.422.634a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zm2.134 0a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zM.036 11.645v9.156c0 1.05.858 1.908 1.907 1.908h.883V11.645zm21.174 0v11.064h.882c1.05 0 1.908-.858 1.908-1.908v-9.156zM4.057 13.133v6.85h6.137v-6.85zm13.243.021v3.777l-1.708.977-1.708-.977v-3.758a4.006 4.006 0 000 7.23v2.441h3.457v-2.442a4.006 4.006 0 00-.041-7.248zm-13.243 8.26v1.43h7.925v-1.43z"/></svg>',
			hdd : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 576 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>hdd</title><path d="M576 304v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48zm-48-80a79.557 79.557 0 0 1 30.777 6.165L462.25 85.374A48.003 48.003 0 0 0 422.311 64H153.689a48 48 0 0 0-39.938 21.374L17.223 230.165A79.557 79.557 0 0 1 48 224h480zm-48 96c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm-96 0c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"/></svg>',
			'history' : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>history</title><g class="style-scope yt-icon"><path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z" class="style-scope yt-icon"></path></g></svg>',
			home : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>home</title><path d="M3 14.828v9.172h18v-9.172l-9-8.375-9 8.375zm11 7.172h-4v-6h4v6zm10-9.852l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148z"/></svg>', 
			homeThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>homeThin</title><path d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z"/></svg>',
			'import' : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>import</title><path d="M24 22h-20v-7h2v5h16v-16h-16v5h-2v-7h20v20zm-13-11v-4l6 5-6 5v-4h-11v-2h11z"/></svg>',
			launch : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>launch</title><path d="M17.281 8.991l3.706 1.97-2.261 2.013.011.006 2.25 3.09-2.25 1.228v3.096l-6.75 3.606-6.75-3.606v-3.091l-2.25-1.225 2.234-3.075-2.234-1.966 3.747-2.043c-.108.371-.197.808-.245 1.272l-1.769.964 1.181 1.04.624-.345c.056.339.146.672.279.984l-.823.456 6.028 3.124 5.978-3.119-.812-.451c.145-.299.245-.618.31-.944l.531.293 1.234-1.098-1.707-.907c-.05-.464-.146-.9-.262-1.272zm-4.798 8.217v5.393l5.256-2.807v-1.951l-3.502 1.91-1.754-2.545zm-6.247.639v1.947l5.249 2.804v-5.388l-1.748 2.543-3.501-1.906zm-1.772-2.103l4.96 2.7 1.099-1.599-4.983-2.582-1.076 1.481zm8.989 1.11l1.096 1.59 4.96-2.706-1.073-1.475-4.983 2.591zm-1.199-1.691h-.625l.003-2.728h.625l-.003 2.728zm-1.159-1.424h-.625l.009-1.739h.625l-.009 1.739zm2.358-.014h-.626l-.009-1.725h.625l.01 1.725zm-3.094-2.468l-.318-.734c-.732.269-2.155 2.284-2.155 2.284-1.195-2.607.161-4.846 1.243-5.659-.083-.699-.644-4.168 2.817-7.113l.041-.035.041.035c3.462 2.945 2.901 6.414 2.817 7.113 1.083.813 2.438 3.052 1.243 5.659 0 0-1.423-2.015-2.155-2.284l-.317.734-1.629.005-1.628-.005zm1.628-9.919c-1.093.923-2.432 3.393-1.854 6.223-.726.6-1.58 1.454-1.712 3.089.577-.77 1.419-1.21 2.091-1.356 0 0 .424.782.507.973l.968.003.969-.003c.083-.191.507-.973.507-.973.671.146 1.513.586 2.091 1.356-.133-1.635-.967-2.472-1.693-3.072.586-2.722-.771-5.295-1.861-6.229l-.013-.011zm-.044 5.693c-.284-.001-.515-.231-.515-.516 0-.285.231-.515.515-.515.284 0 .514.23.514.515 0 .285-.23.515-.514.516zm0-1.844c-.569 0-1.029-.462-1.03-1.031.001-.57.461-1.031 1.03-1.031s1.029.461 1.029 1.031c0 .569-.46 1.03-1.029 1.031zm0-1.434c.214 0 .388.174.388.389 0 .215-.174.389-.388.389-.215 0-.389-.174-.389-.389 0-.215.174-.389.389-.389z"/></svg>',
			library : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>library</title><g class="style-scope yt-icon"><path d="M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z" class="style-scope yt-icon"></path></g></svg>',
			likedVideos : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>likedVideos</title><g class="style-scope yt-icon"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" class="style-scope yt-icon"></path></g></svg>',
			list : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>list</title><path d="M2 23h-2v-2h2v2zm0-12h-2v2h2v-2zm0 5h-2v2h2v-2zm0-15h-2v2h2v-2zm2 0v2h20v-2h-20zm-2 5h-2v2h2v-2zm2 7h20v-2h-20v2zm0 10h20v-2h-20v2zm0-15h20v-2h-20v2zm0 10h20v-2h-20v2z"/></svg>',
			load : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 496 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>load</title><path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"/></svg>',
			loop : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 640 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>loop</title><path d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"/></svg>',
			loopThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>loopThin</title><path d="M24 20h-21.888l2.885 2.247-.665.753-4.475-3.503 4.478-3.497.665.753-2.882 2.247h20.882v-11h1v12zm-2.118-16l-2.882-2.247.665-.753 4.478 3.497-4.475 3.503-.665-.753 2.885-2.247h-20.888v11.145h-1v-12.145h21.882z"/></svg>',
			menu : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 448 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>menu</title><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>',
			menu2 : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill-rule="evenodd" clip-rule="evenodd" fill="#1040e2"><title>menu2</title><path d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"/><path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z"/></svg>',
			//nextThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>nextThin</title><path d="M2 24l18-12-18-12v24zm19-24v24h1v-24h-1zm-2.803 12l-15.197 10.132v-20.263l15.197 10.131z"/></svg>',
			notifications : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>notifications</title><g class="style-scope yt-icon"><path d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z" class="style-scope yt-icon"></path></g></svg>',
			play : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 448 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>play</title><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/></svg>',
			playThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>playThin</title><path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z"/></svg>',
			playCircle : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 512 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>playCircle</title><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"/></svg>',
			playlist : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>playlist</title><g class="style-scope yt-icon"><path d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z" class="style-scope yt-icon"></path></g></svg>',
			//previousThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>previousThin</title><path d="M22 24l-18-12 18-12v24zm-19-24v24h-1v-24h1zm2.803 12l15.197 10.132v-20.263l-15.197 10.131z"/></svg>',
			pause : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 448 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>pause</title><path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/></svg>',
			pauseThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>pauseThin</title><path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z"/></svg>',
			pauseCircle : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 512 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>pauseCircle</title><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"/></svg>',
			randomThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>randomThin</title><path d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z"/></svg>',
			redo : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 512 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>redo</title><path d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"/></svg>',
			reloadThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>reloadThin</title><path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"/></svg>',
			save : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 448 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>save</title><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"/></svg>',
			searchThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>searchThin</title><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/></svg>',
			shuffle : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 512 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>shuffle</title><path d="M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596 53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 176h84l52.781 56.551 53.333-57.143-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z"/></svg>',
			showMore : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>showMore</title><g class="style-scope yt-icon"><path d="M12,15.7L5.6,9.4l0.7-0.7l5.6,5.6l5.6-5.6l0.7,0.7L12,15.7z" class="style-scope yt-icon"></path></g></svg>',
			stop : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 448 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>stop</title><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"/></svg>',
			stopCircle : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 512 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>stopCircle</title><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm96 328c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16v160z"/></svg>',
			subscription : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>subscription</title><g class="style-scope yt-icon"><path d="M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z" class="style-scope yt-icon"></path></g></svg>',
			upload : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>upload</title><path d="M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z"/></svg>',
			video : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 576 512" width="'+width+'" height="'+height+'" fill="'+color+'"><title>video</title><path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"/></svg>',
			videoThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>videoThin</title><path d="M24 23h-24v-21h24v21zm-20-1v-4h-3v4h3zm15 0v-19h-14v19h14zm4 0v-4h-3v4h3zm-6-9.5l-9 5v-10l9 5zm3 .5v4h3v-4h-3zm-16 4v-4h-3v4h3zm5-1.2l5.941-3.3-5.941-3.3v6.6zm11-7.8v4h3v-4h-3zm-16 4v-4h-3v4h3zm16-9v4h3v-4h-3zm-16 4v-4h-3v4h3z"/></svg>',
			voiceSearch : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>voiceSearch</title><g class="style-scope yt-icon"><path d="M12 3C10.34 3 9 4.37 9 6.07V11.93C9 13.63 10.34 15 12 15C13.66 15 15 13.63 15 11.93V6.07C15 4.37 13.66 3 12 3ZM18.5 12H17.5C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12H5.5C5.5 15.24 7.89 17.93 11 18.41V21H13V18.41C16.11 17.93 18.5 15.24 18.5 12Z" class="style-scope yt-icon"></path></g></svg>',
			watchLater : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" focusable="false" style="pointer-events: none;" class="style-scope yt-icon"><title>watchLater</title><g class="style-scope yt-icon"><path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z" class="style-scope yt-icon"></path></g></svg>',
			wrench : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>wrench</title><path d="M17.959 24c-1.729 0-3.376-.742-4.522-2.037-1.146-1.293-1.683-3.018-1.474-4.731.042-.343-.08-.693-.325-.938l-4.198-4.208c-.274-.274-.654-.432-1.043-.432l-.111.004c-1.683.129-3.373-.481-4.584-1.692-1.098-1.099-1.702-2.561-1.702-4.117 0-1.044.293-2.385.715-3.278l3.81 3.811c.435-.074.967-.394 1.404-.935.283-.35.427-.675.466-.91l-3.826-3.827c.889-.418 2.219-.71 3.255-.71 1.533 0 3.043.601 4.143 1.702 1.239 1.241 1.82 2.881 1.679 4.743-.023.328.096.651.329.885l4.3 4.31c.248.249.593.369.943.325 3.609-.46 6.782 2.411 6.782 5.994 0 3.331-2.71 6.041-6.041 6.041zm-11.563-14.343c.915 0 1.81.371 2.456 1.018l4.2 4.208c.676.678 1.009 1.646.892 2.593-.139 1.145.221 2.299.987 3.165.768.867 1.871 1.363 3.027 1.363 2.229 0 4.044-1.814 4.044-4.043 0-2.398-2.123-4.323-4.536-4.013-.981.122-1.923-.212-2.606-.896l-4.3-4.312c-.643-.647-.973-1.537-.906-2.445.097-1.283-.273-2.353-1.1-3.181-.493-.492-1.098-.833-1.758-1l1.49 1.491c.217 1 .125 1.946-.804 3.097-1.004 1.246-2.297 1.93-3.878 1.585l-1.49-1.491c.166.661.508 1.266 1 1.76.797.795 1.9 1.201 3.017 1.112l.265-.011zm11.275 7.222l1.079.289.289 1.079-.791.791-1.079-.29-.29-1.079.792-.79zm-.447-1.671l-2.015 2.014.737 2.75 2.749.738 2.014-2.014-.736-2.75-2.749-.738z"/></svg>',
			yourVideos : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>yourVideos</title><path d="M10 20v-6l5 3-5 3zm14-15.625l-.008-.042-1.008-4.333-21.169 4.196c-1.054.209-1.815 1.134-1.815 2.207v14.597c0 1.657 1.343 3 3 3h18c1.656 0 3-1.343 3-3v-14h-12.734l12.734-2.625zm-3.89-2.618l2.396 1.604-2.994.595-2.398-1.605 2.996-.594zm-5.897 1.169l2.399 1.606-2.993.595-2.402-1.607 2.996-.594zm-5.905 1.171l2.403 1.608-2.993.595-2.406-1.61 2.996-.593zm2.538 3.903l-2.039 2h-3.054l2.039-2h3.054zm8.978 0h3.054l-2.038 2h-3.055l2.039-2zm-6.012 0h3.053l-2.039 2h-3.053l2.039-2zm8.188 4v8.75c0 .69-.56 1.25-1.25 1.25h-17.5c-.69 0-1.25-.56-1.25-1.25v-8.75h20z"/></svg>',
			youtube : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>YouTube icon</title><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>',
			youtubeTv : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>YouTube TV icon</title><path d="M17.36 20.988H6.536c-.306 0-.51-.205-.51-.511 0-.306.204-.51.51-.51h10.928c.306 0 .51.204.51.51 0 .306-.306.51-.612.51zM1.635 3.012C.714 3.012 0 3.73 0 4.648v12.56c0 .92.714 1.634 1.634 1.634h20.73c.92 0 1.636-.714 1.636-1.633V4.648c0-.92-.716-1.636-1.636-1.636zm7.863 4.393l6.23 3.472-6.23 3.575Z"/></svg>',
			youtubeMusic : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>YouTube Music icon</title><path d="M9.818182 15.136364l5.318182-3.272728-5.318182-3zM12 6.278182c3.155455 0 5.721818 2.566363 5.721818 5.721818S15.155455 17.721818 12 17.721818 6.278182 15.155455 6.278182 12 8.844545 6.278182 12 6.278182m0-.550909C8.535 5.727273 5.727273 8.535 5.727273 12S8.535 18.272727 12 18.272727 18.272727 15.465 18.272727 12 15.465 5.727273 12 5.727273zM24 12a12 12 0 01-12 12A12 12 0 010 12 12 12 0 0112 0a12 12 0 0112 12"/></svg>',
			youtubeGaming : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'"><title>YouTube Gaming icon</title><path d="M24 13.2v-6l-6-3.6-6 3.6-6-3.6-6 3.6v6l12 7.2zM8.4 10.8H6v2.4H4.8v-2.4H2.4V9.6h2.4V7.2H6v2.4h2.4zm7.2 2.4a1.2 1.2 0 01-1.2-1.2c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 .66-.54 1.2-1.2 1.2zm3.6-2.4A1.2 1.2 0 0118 9.6c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 .66-.54 1.2-1.2 1.2Z"/></svg>',
			zoomInThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>zoomInThin</title><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5zm-4.5 8h4v-4h1v4h4v1h-4v4h-1v-4h-4v-1z"/></svg>',
			zoomOutThin : '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="'+viewBox+'" width="'+width+'" height="'+height+'" fill="'+color+'" fill-rule="evenodd" clip-rule="evenodd"><title>zoomOutThin</title><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5zm-4.5 8h9v1h-9v-1z"/></svg>',
			//comment : '',
			//chat : '',
			//favourite : '',
			play_alt : '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="'+width+'" height="'+height+'" viewBox="'+viewBox+'"><path d="M4.018 14L14.41 8 4.018 2z"></path></svg>',
			pause_alt : '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="'+width+'" height="'+height+'" viewBox="'+viewBox+'"><path fill="none" d="M0 0h16v16H0z"></path><path d="M3 2h3v12H3zm7 0h3v12h-3z"></path></svg>',
			connectDevices : '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="'+width+'" height="'+height+'" viewBox="'+viewBox+'" aria-label="Connect to a device"><path d="M0 3v8c0 .55.45 1 1 1h5v-1H1V3h5V2H1c-.55 0-1 .45-1 1zm3 11.5c0 .275.225.5.5.5H6v-1H3.5c-.275 0-.5.225-.5.5zM15 2H9c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H9V3h6v11zm-3-8a.75.75 0 100-1.5.75.75 0 000 1.5zm0 6a2 2 0 100-4 2 2 0 000 4zm0-3c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1z"></path></svg>',
			skipBack : '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="'+width+'" height="'+height+'" viewBox="'+viewBox+'"><path d="M10 4.001H6V2.5l-3.464 2L6 6.5V5h4c2.206 0 4 1.794 4 4s-1.794 4-4 4v1c2.75 0 5-2.25 5-5s-2.25-4.999-5-4.999zM2.393 8.739c-.083.126-.19.236-.32.332a1.642 1.642 0 01-.452.229 1.977 1.977 0 01-.56.092v.752h1.36V14h1.096V8.327h-.96c-.027.15-.081.287-.164.412zm5.74 2.036a1.762 1.762 0 00-.612-.368 2.295 2.295 0 00-.78-.128c-.191 0-.387.031-.584.092a1.188 1.188 0 00-.479.268l.327-1.352H8.38v-.96H5.252l-.688 2.872c.037.017.105.042.204.076l.308.108.309.107.212.076c.096-.112.223-.205.38-.28.157-.075.337-.112.54-.112.133 0 .264.021.392.063.128.043.24.105.336.188a.907.907 0 01.233.316c.059.128.088.275.088.44a.927.927 0 01-.628.916 1.19 1.19 0 01-.404.068c-.16 0-.306-.025-.435-.076a1.046 1.046 0 01-.34-.212.992.992 0 01-.229-.32 1.171 1.171 0 01-.1-.4l-1.04.248c.021.225.086.439.195.645.109.205.258.388.444.548.187.16.406.287.66.38.253.093.534.14.844.14.336 0 .636-.052.9-.156.264-.104.487-.246.672-.424.184-.179.325-.385.424-.62.099-.235.148-.485.148-.752 0-.298-.049-.565-.145-.8a1.686 1.686 0 00-.399-.591z"></path></svg>',
			skipForward : '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="'+width+'" height="'+height+'" viewBox="'+viewBox+'"><path d="M6 5h4v1.5l3.464-2L10 2.5V4H6C3.25 4 1 6.25 1 9s2.25 5 5 5v-1c-2.206 0-4-1.794-4-4s1.794-4 4-4zm1.935 3.739a1.306 1.306 0 01-.32.332c-.13.096-.281.172-.451.228a1.956 1.956 0 01-.562.092v.752h1.36v3.856h1.096V8.327h-.96c-.026.15-.08.287-.163.412zm6.139 2.628a1.664 1.664 0 00-.399-.592 1.747 1.747 0 00-.612-.368 2.295 2.295 0 00-.78-.128c-.191 0-.387.03-.584.092-.197.061-.357.15-.479.268l.327-1.352h2.376v-.96h-3.128l-.688 2.872c.037.016.106.041.204.076l.308.108.309.108.212.076c.096-.112.223-.206.38-.28.157-.075.337-.112.54-.112.133 0 .264.021.392.064a.97.97 0 01.336.188.907.907 0 01.233.316c.058.128.088.274.088.44a.941.941 0 01-.3.721.995.995 0 01-.328.196 1.19 1.19 0 01-.404.068c-.16 0-.306-.025-.436-.076a1.03 1.03 0 01-.569-.532 1.171 1.171 0 01-.1-.4l-1.04.248c.02.224.086.439.195.644.109.205.258.388.444.548.186.16.406.287.66.38.253.093.534.14.844.14.336 0 .636-.052.9-.156.264-.104.487-.245.672-.424.184-.179.325-.385.424-.62a1.91 1.91 0 00.148-.752c0-.3-.049-.566-.145-.801z"></path></svg>',
			fullscreenThin_alt : '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="'+width+'" height="'+height+'" viewBox="'+viewBox+'"><path d="M6.064 10.229l-2.418 2.418L2 11v4h4l-1.647-1.646 2.418-2.418-.707-.707zM11 2l1.647 1.647-2.418 2.418.707.707 2.418-2.418L15 6V2h-4z"></path></svg>',
			queue : '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="'+width+'" height="'+height+'" viewBox="'+viewBox+'"><path d="M2 2v5l4.33-2.5L2 2zm0 12h14v-1H2v1zm0-4h14V9H2v1zm7-5v1h7V5H9z"></path></svg>',
		});
	}

	//==============================================================================
	window.SVGIconsCreator = {create: createSvgIcon,icons, addIcon, addIcons};

})();
