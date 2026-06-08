function go() {
			this.heading = 'The Vagina Monologue';
			this.albumPhotos = albumPhotos;
			this.imageList = this.albumPhotos?.images;
			/* $$$(document).find(".gallery").css({'display':'block','border':'4px solid #ff0000'}).slideShow(<?php echo $albumPhotos;?>);
			var v = $$$(".gallery").slideShow(<?php //echo $albumPhotos;?>);
			this.galleryContent = v.slideShow;
			*/
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
											<button class="akd__tab-button bdr--2" title="show crop tab" data-parent-tab="#akd-photo-editor-card-${i} .photo-editor-tab" data-target-tab="#crop-tab-${i}" data-akd-photo-editor-crop-tab></button>
										</div>
										<div class="akd__tab-panels">
											<div id="comparison-tab-${i}" class="akd__tab-panel active--tab flex--col" data-layout="flex">
												<div class="thumb-wrapper f--6"><img id="display-image-${i}" class="photo-thumb m--auto" src="${imgSrc}" alt="${_.filename(imgSrc)}" /></div>
											</div>
											<div id="filter-tab-${i}" class="akd__tab-panel flex--col" data-layout="flex">
												<div id="filter-grid-splitter-panel-1-${i}" class="splitter_panel first--half p--4 overflow--auto">
													<ul id="filter-options-${i}" class="filter-options grid gap--4 p--2 bdr--2 bg--info-gradient"></ul>
													<div id="filter-input-wrapper-${i}" class="filter-input-wrapper bg--info-gradient bdr--2 p--2 mt--4"></div>
												</div>
											</div>
											<div id="crop-tab-${i}" class="akd__tab-panel flex--col" data-layout="flex">
												
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
												<button id="copy-image-${i}" class="akd__btn btn--purple" type="button" title="show image edit" data-akd-photo-editor-edit-button>show edit</button>
												<button id="copy-image-${i}" class="akd__btn btn--purple" type="button" title="copy image" data-akd-photo-editor-copy-button>copy</button>
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
				/* <div class="thumb-wrapper p--0 bdr--2 ui-pattern-1" data-layout="grid-auto" data-layout-row-auto="auto 1fr auto" >
					<span class="flex gap--4 p--4 bdr--2-tl bdr--2-tr bg--darker"><button id="" class="view akd__btn btn--info mr--auto">&copy;</button><button id="" class="close akd__btn btn--danger ml--auto">&times;</button></span>
					<img class="thumb m--auto" src="${imgSrc}" alt="" />
					<span class="tools flex flex--wrap gap--4 p--4 bdr--2-bl bdr--2-br bg--darker">
						<span class="flex gap--4 mr--auto"><button id="" class="zoom-out akd__btn btn--warning">&minus;</button><button id="" class="zoom-in akd__btn btn--success">&plus;</button></span>
						<span class="flex gap--4 ml--auto"><button id="" class="magnify akd__btn btn--navy">[]</button><button id="" class="edit akd__btn btn--purple">edit</button></span>
					</span>
				</div> */
			}
			
}
function Resizer() {
    var startX, startY, startWidth, startHeight;
    this.options = (arguments[0] && typeof arguments[0] === "object") ? arguments[0] : {}
    //console.log("this.options",this.options)
    var _resizer = document.createElement('div'),node = document.querySelector(this.options.content);
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
		var ball = _$$(this.options.handle);
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
/* 
	<h1>Add a sticker to a thumbnail</h1>
	<div class="my-bitmoji-stickerpicker-icon-target"></div>
	<button id="generate-png" type="submit">Generate PNG</button>
	<div id="svg-container"><%= Video.first.thumb_svg.html_safe %></div>
	<canvas id="canvas" width="1920" height="1080"></canvas>
	<div id="png-container"></div>
 */
function bitmojiStickerPicker(){
	// Converts from SVG to PNG
	var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var DOMURL = window.URL;
	var img = new Image();
	var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
	var url = DOMURL.createObjectURL(svg);
	img.onload = function(){
		ctx.drawImage(img, 0, 0);
	};
	img.src = url;
	
	const resetCanvas = (cnv, img) => {
		cnv.drawImage(img, 0, 0);
	}
	const generatePNGBtn = document.querySelector('#generate-png');
	generatePNGBtn.addEventListener('click', function(e){
		e.preventDefault();
		var png = canvas.toDataURL("image/png");
		document.querySelector('#png-container').innerHTML = `<img id="thumg-png" src="${png}" />`;
		DOMURL.revokeObjectURL(png);
	});
	
	let stickerImg, currentX = canvas.width/2, currentY = canvas.height/2;
	window.snapKitInit = function(){
		var bitmojiWebPickerIconClass = "my-bitmoji-stickerpicker-icon-target";
		var uiOptions = {
			onStickerPickCallback: function onStickerPickCallback(bitmojiImgURL){
				stickerImg = new Image();
				stickerImg.src = bitmojiImgURL;
				stickerImg.crossOrigin = 'Anonymous';
				stickerImg.onload = function(){
					setInterval(() => {
						resetCanvas(canvas);
						//ctx.drawImage(stickerImg, 0, 0);
						ctx.drawImage(stickerImg, (currentX - stickerImg.width/2), (currentY - stickerImg.height/2));
					}, 200);
				}
				console.log(bitmojiImgURL)
			}
		}
	}
	let draggable = false;
	canvas.onmousedown = (e) => {
		if(e.layerX <= (currentX + stickerImg.width/2) && e.layerX >= (currentX - stickerImg.width/2) && e.layerY <= (currentY + stickerImg.height/2) && e.layerY >= (currentY - stickerImg.height/2)){
			draggable = true;
		}
	}
	canvas.onmousemove = (e) => {
		if(draggable === true){
			currentX = e.layerX;
			currentY = e.layerY;
		}
	}
	canvas.onmouseup = (e) => {draggable = false;}
	canvas.onmouseout = (e) => {draggable = false;}
}
/* 
<script src="CanvasStack-2v01.js"></script>
<canvas id="can"></canvas>
 */
function createCanvasLayer(){
	let canvas = document.querySelector('#can'), 
	ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	let canvas_stack = new CanvasStack('can');
	
	let layer1 = canvas_stack.createLayer();
	let layer1_ctx = document.getElementById(layer1).getContext('2d');
	
	let layer2 = canvas_stack.createLayer();
	let layer2_ctx = document.getElementById(layer2).getContext('2d');
	// use layer1 ctx
	layer1_ctx.fillRect(0, 0, 100, 100);
	// use layer2 ctx
	layer2_ctx.fillStyle = 'red';
	layer2_ctx.fillRect(100, 100, 100, 100);
	
	layer1_ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}
function addMask(img, maskSrc){
	var _ctx, imgSrc, imagecanvas = document.createElement('canvas'), imagecontext = imagecanvas.getContext('2d');

	/* uncomment do see the canvas to debug
	document.body.appendChild(imagecanvas);
	*/
	var newImg = document.createElement('img');
	if(img.tagName.toLowerCase() === 'canvas'){
		_ctx = img.getContext('2d');
		imgSrc = img.toDataURL();
	} else imgSrc = img.src;
	
	var width  = img.width;
	var height = img.height;
	//img.width = width;
	//img.height = height;
	//console.log(img.toDataURL())
	//$.resetCanvas(_ctx, newImg)
	newImg.onload = function() {
		var mask = document.createElement('img');
		mask.src = maskSrc;
		mask.onload = function() {
			if(img.tagName.toLowerCase() === 'canvas'){
				_ctx.drawImage(mask, 0, 0, width, height);
				_ctx.globalCompositeOperation = 'source-in';
				_ctx.drawImage(newImg, 0, 0);
			} else {
				imagecanvas.width  = width;
				imagecanvas.height = height;
				
				imagecontext.drawImage(mask, 0, 0, width, height);
				imagecontext.globalCompositeOperation = 'source-in';
				imagecontext.drawImage(img, 0, 0);
			
				img.src = imagecanvas.toDataURL();
			}
			newImg = null;
			mask = null;
		}
	}
	newImg.src = imgSrc
	
}

var ZOOM_OUT = [0, 0, 1, 1];
var $window = window//$(window);
var $document = document//$(document);
var $location = window.location;
var $navigator = window.navigator;
var ArrayBuffer = window.ArrayBuffer;
var Uint8Array = window.Uint8Array;
var DataView = window.DataView;
var btoa = window.btoa;

// RegExps 
var REGEXP_ACTIONS = /e|w|s|n|se|sw|ne|nw|all|crop|move|zoom/;
var REGEXP_DATA_URL = /^data\:/;
var REGEXP_DATA_URL_HEAD = /^data\:([^\;]+)\;base64,/;
var REGEXP_DATA_URL_JPEG = /^data\:image\/jpeg.*;base64,/;

// Data keys
var DATA_PREVIEW = 'preview';
var DATA_ACTION = 'action';

// Actions
var ACTION_EAST = 'e';
var ACTION_WEST = 'w';
var ACTION_SOUTH = 's';
var ACTION_NORTH = 'n';
var ACTION_SOUTH_EAST = 'se';
var ACTION_SOUTH_WEST = 'sw';
var ACTION_NORTH_EAST = 'ne';
var ACTION_NORTH_WEST = 'nw';
var ACTION_ALL = 'all';
var ACTION_CROP = 'crop';
var ACTION_MOVE = 'move';
var ACTION_ZOOM = 'zoom';
var ACTION_NONE = 'none';

// Supports
//var SUPPORT_CANVAS = $.isFunction($('<canvas>')[0].getContext);
var SUPPORT_CANVAS = typeof(document.createElement('canvas').getContext);
var IS_SAFARI = navigator && /safari/i.test(navigator.userAgent) && /apple computer/i.test(navigator.vendor);

// Maths
var num = Number;
var min = Math.min;
var max = Math.max;
var abs = Math.abs;
var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var round = Math.round;
var floor = Math.floor;

// Utilities
var fromCharCode = String.fromCharCode;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;
const $ = {};
$.is = (el, what) => el && el instanceof HTMLElement && el.tagName.toLowerCase() === what;
/**
* Check if the given value is an object.
* @param {*} value - The value to check.
* @returns {boolean} Returns `true` if the given value is an object, else `false`.
*/
$.isObject = function(value) {return typeof(value) === 'object' && value !== null;}
/**
* Check if the given value is a function.
* @param {*} value - The value to check.
* @returns {boolean} Returns `true` if the given value is a function, else `false`.
*/
$.isFunction = function(value) {return typeof value === 'function';}
$.isNumber = function(n) {return typeof n === 'number' && !isNaN(n);}
$.isUndefined = function(n) {return typeof n === 'undefined';}

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
* Check if the given value is a plain object.
* @param {*} value - The value to check.
* @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
*/
$.isPlainObject = function(value) {
	if (!$.isObject(value)) {
		return false;
	}
	try {
		var _constructor = value.constructor;
		var prototype = _constructor.prototype;
		return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
	} catch (error) {
		return false;
	}
}

/**
* Iterate the given data.
* @param {*} data - The data to iterate.
* @param {Function} callback - The process function for each element.
* @returns {*} The original data.
*/
$.forEach = function(data, callback) {
	if(data && $.isFunction(callback)) {
		if (Array.isArray(data) || $.isNumber(data.length) /* array-like */) {
			$.toArray(data).forEach(function (value, key) {
				callback.call(data, value, key, data);
			});
		} else if ($.isObject(data)) {
			Object.keys(data).forEach(function (key) {
				callback.call(data, data[key], key, data);
			});
		}
	}
	return data;
}
$.createImage = (attrs = {}) => {
  const container = document.createElement('div');
  const image = document.createElement('img');

  if (!attrs.src) {
    attrs.src = '/base/docs/images/picture.jpg';
  }

  Object.keys(attrs).forEach((attr) => {
    image[attr] = attrs[attr];
  });

  container.appendChild(image);
  document.body.appendChild(container);

  return image;
};

$.createEvent = (type, data) => {
  let event;

  if (typeof Event === 'function' && typeof CustomEvent === 'function') {
    if (typeof data === 'undefined') {
      event = new Event(type, {
        bubbles: true,
        cancelable: true,
      });
    } else {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true,
      });
    }
  } else if (typeof data === 'undefined') {
    event = document.createEvent('Event');
    event.initEvent(type, true, true);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);
  }

  event.buttons = 1;

  return event;
};
// Custom proxy to avoid jQuery's guid
$.proxy = function(fn, context) {
	var args = toArray(arguments, 2);

	return function () {
		return fn.apply(context, args.concat(toArray(arguments)));
	};
}

$.isCrossOriginURL2 = function(url) {
	var parts = url.match(/^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i);
	return parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
}

var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
/**
 * Check if the given URL is a cross origin URL.
 * @param {string} url - The target URL.
 * @returns {boolean} Returns `true` if the given URL is a cross origin URL, else `false`.
*/
$.isCrossOriginURL = function(url) {var parts = url.match(REGEXP_ORIGINS);return parts !== null && (parts[1] !== $location.protocol || parts[2] !== $location.hostname || parts[3] !== $location.port);}
/**
 * Add timestamp to the given URL.
 * @param {string} url - The target URL.
 * @returns {string} The result URL.
*/
$.addTimestamp = function(url) {var timestamp = "timestamp=".concat(new Date().getTime());return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;}
$.getCrossOrigin = function(crossOrigin) {return crossOrigin ? ' crossOrigin="' + crossOrigin + '"' : '';}
$.getImageSize = function(image, callback) {
	var newImage;
	// Modern browsers (ignore Safari, #120 & #509)
	if (image.naturalWidth && !IS_SAFARI) {
		return callback(image.naturalWidth, image.naturalHeight);
	}
	// IE8: Don't use `new Image()` here (#319)
	newImage = document.createElement('img');
	newImage.onload = function () {callback(this.width, this.height);};
	newImage.src = image.src;
}
$.resetCanvas = function resetCanvas(_ctx, _img){_ctx.drawImage(_img, 0, 0);}
/**
 * Image zooming view that lets you zoom.
 */
function ImageZoomer(options) {
	if(!(this instanceof ImageZoomer)) return new ImageZoomer(options);
	this.options = Object.assign({}, ImageZoomer.DEFAULTS, typeof(options) === "object" && options);
    //this.options = $.extend({}, ImageZoomer.DEFAULTS, $.isPlainObject(options) && options);
    //this.options = {};
    // Create the rendering contexts.
	let {sel, trg, src, dpr, element} = this.options;
	
	this.$element = document.querySelector(element);
    this.canvas = document.querySelector(sel);
	this.ctx = this.canvas.getContext('2d');
	this.container = this.canvas.parentElement;
	this.targetCanvas = document.querySelector(trg);
	if(this.targetCanvas && this.targetCanvas instanceof HTMLElement){
		this.targetCtx = this.targetCanvas.getContext('2d');
	} else {
		this.targetCanvas = this.canvas;
		this.targetCtx = this.ctx;
	}
	var containerWidth = this.container?.width??this.container.offsetWidth;
	var containerHeight = this.container?.height??this.container.offsetHeight;
	var canvasWidth = containerWidth;
	var canvasHeight = containerHeight;
	this.canvas.oldLeft = this.canvas.left = (containerWidth - canvasWidth) / 2;
	this.canvas.oldTop = this.canvas.top = (containerHeight - canvasHeight) / 2;
	//this.url = src;
    this.originalUrl = '';
    this.isLoaded = false;
    this.isBuilt = false;
    this.isCompleted = false;
    this.isRotated = false;
    this.isCropped = false;
    this.isDisabled = false;
    this.isReplaced = false;
    this.isLimited = false;
    this.wheeling = false;
    this.isImg = false;
    this.cropBox = null;
	this.$cropBox = document.querySelector('.cropper-crop-box');
	this.$face = document.querySelector('.cropper-face');
	
	this.initialImage = null;
	this.initialCanvas = null;
	// Keep track of selection.
	this.selectionStart = null;
	this.selectionEnd = null;
	this.bb = ZOOM_OUT;
	this.dpr = dpr || 0.85;
	this.image = null;
	this.init(src);
}
ImageZoomer.prototype = {
	constructor: ImageZoomer,
	init: function (url) {
		var $this = this.$element;
		var url;

		if ($.is($this, 'img')) {
			this.isImg = true;
			// Should use `$.fn.attr` here. e.g.: "img/picture.jpg"
			this.originalUrl = url = $this.getAttribute('src');
			// Stop when it's a blank image
			if (!url) {
				return;
			}
			// Should use `$.fn.prop` here. e.g.: "http://example.com/img/picture.jpg"
			//url = $this.prop('src');
		} else if ($.is($this, 'canvas') && SUPPORT_CANVAS) {
			url = $this.toDataURL();
		}

		this.load(url);
		//this.initContainer();
		//this.initCanvas();
		this.initCropBox();
	
		//this.renderCanvas();

		//if (this.isCropped) {
			this.renderCropBox();
		//}
		// Bind mouse events on the canvas.
		this.canvas.addEventListener('mousedown', this._onmousedown.bind(this));
		this.canvas.addEventListener('mousemove', this._onmousemove.bind(this));
		this.canvas.addEventListener('mouseup', this._onmouseup.bind(this));
	},
	load: function(url) {
		var options = this.options;
		var $this = this.$element;
		var read;
		var xhr;

		if (!url) {
			return;
		}
		this.url = url;
		//this.image = {};
		this.image = new Image();

		if (!options.checkOrientation || !ArrayBuffer) {
			return this.clone();
		}
		this.loadImage(url);
		//this.image.onload = this.render.bind(this);
		this.initialImage = this.image//Object.assign({}, this.image);
		this.initialCanvas = this.canvas//Object.assign({}, this.canvas);
		
	},
	clone: function () {
		var options = this.options;
		var $this = this.$element;
		var url = this.url;
		var crossOrigin = '';
		var crossOriginUrl;
		var $clone;

		if (options.checkCrossOrigin && $.isCrossOriginURL(url)) {
			crossOrigin = $this.prop('crossOrigin');

			if (crossOrigin) {
				crossOriginUrl = url;
			} else {
				crossOrigin = 'anonymous';
				// Bust cache (#148) when there is not a "crossOrigin" property
				crossOriginUrl = addTimestamp(url);
			}
		}

		this.crossOrigin = crossOrigin;
		this.crossOriginUrl = crossOriginUrl;
		this.$clone = $clone = $('<img' + getCrossOrigin(crossOrigin) + ' src="' + (crossOriginUrl || url) + '">');

		if(this.isImg) {
			//if ($this[0].complete) {
			if ($this.complete) {
				this.start();
			} else {
				$this.one(EVENT_LOAD, $.proxy(this.start, this));
			}
		} else {
			$clone.
				one(EVENT_LOAD, $.proxy(this.start, this)).
				one(EVENT_ERROR, $.proxy(this.stop, this)).
				addClass(CLASS_HIDE).
				insertAfter($this);
		}
	},
	initCropBox: function () {
		var options = this.options;
		var canvas = this.canvas;
		var aspectRatio = options.aspectRatio;
		var autoCropArea = num(options.autoCropArea) || 0.8;
		var cropBox = {
			width: canvas.width,
			height: canvas.height
		};
		if(aspectRatio && typeof aspectRatio === "number") {
			if (canvas.height * aspectRatio > canvas.width) {
				cropBox.height = cropBox.width / aspectRatio;
			} else {
				cropBox.width = cropBox.height * aspectRatio;
			}
		}
		//console.log(cropBox,aspectRatio, canvas.width, canvas.scrollWidth, canvas.offsetWidth)
		this.cropBox = cropBox;
		this.limitCropBox(true, true);

		// Initialize auto crop area
		cropBox.width = min(max(cropBox.width, cropBox.minWidth), cropBox.maxWidth);
		cropBox.height = min(max(cropBox.height, cropBox.minHeight), cropBox.maxHeight);

		// The width of auto crop area must large than "minWidth", and the height too. (#164)
		cropBox.width = max(cropBox.minWidth, cropBox.width * autoCropArea);
		cropBox.height = max(cropBox.minHeight, cropBox.height * autoCropArea);
		cropBox.oldLeft = cropBox.left = canvas.left + (canvas.width - cropBox.width) / 2;
		cropBox.oldTop = cropBox.top = canvas.top + (canvas.height - cropBox.height) / 2;

		this.initialCropBox = Object.assign({}, cropBox);
			
    },

    limitCropBox: function(isSizeLimited, isPositionLimited) {
		var options = this.options;
		var aspectRatio = options.aspectRatio;
		var container = this.container;
		var containerWidth = container?.width??container.offsetWidth;
		var containerHeight = container?.height??container.offsetHeight;
		var canvas = this.canvas;
		var cropBox = this.cropBox;
		var isLimited = this.isLimited;
		var minCropBoxWidth;
		var minCropBoxHeight;
		var maxCropBoxWidth;
		var maxCropBoxHeight;

		if(isSizeLimited) {
			minCropBoxWidth = num(options.minCropBoxWidth) || 0;
			minCropBoxHeight = num(options.minCropBoxHeight) || 0;

			// The min/maxCropBoxWidth/Height must be less than containerWidth/Height
			minCropBoxWidth = min(minCropBoxWidth, containerWidth);
			minCropBoxHeight = min(minCropBoxHeight, containerHeight);
			maxCropBoxWidth = min(containerWidth, isLimited ? canvas.width : containerWidth);
			maxCropBoxHeight = min(containerHeight, isLimited ? canvas.height : containerHeight);

			if(aspectRatio && typeof aspectRatio === "number") {
				if(minCropBoxWidth && minCropBoxHeight) {
					if(minCropBoxHeight * aspectRatio > minCropBoxWidth) {
						minCropBoxHeight = minCropBoxWidth / aspectRatio;
					} else {
						minCropBoxWidth = minCropBoxHeight * aspectRatio;
					}
				} else if (minCropBoxWidth) {
					minCropBoxHeight = minCropBoxWidth / aspectRatio;
				} else if (minCropBoxHeight) {
					minCropBoxWidth = minCropBoxHeight * aspectRatio;
				}

				if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
					maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
				} else {
					maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
				}
			}
			
			// The minWidth/Height must be less than maxWidth/Height
			cropBox.minWidth = min(minCropBoxWidth, maxCropBoxWidth);
			cropBox.minHeight = min(minCropBoxHeight, maxCropBoxHeight);
			cropBox.maxWidth = maxCropBoxWidth;
			cropBox.maxHeight = maxCropBoxHeight;
		}

		if (isPositionLimited) {
			if (isLimited) {
				cropBox.minLeft = max(0, canvas.left);
				cropBox.minTop = max(0, canvas.top);
				cropBox.maxLeft = min(containerWidth, canvas.left + canvas.width) - cropBox.width;
				cropBox.maxTop = min(containerHeight, canvas.top + canvas.height) - cropBox.height;
			} else {
				cropBox.minLeft = 0;
				cropBox.minTop = 0;
				cropBox.maxLeft = containerWidth - cropBox.width;
				cropBox.maxTop = containerHeight - cropBox.height;
			}
		}
	},

    adjustCropBox: function (cropBox) {
		if(cropBox) Object.assign(this.cropBox, cropBox);
		//console.log(this.$cropBox, cropBox)
		Object.assign(this.$cropBox.style, {
			width: `${cropBox.width}px`,
			height: `${cropBox.height}px`,
			left: `${cropBox.left}px`,
			top: `${cropBox.top}px`
		});
	},

    renderCropBox: function (obj) {
		if(obj) Object.assign(this.cropBox, obj);
		var options = this.options;
		var container = this.container;
		var containerWidth = container.width;
		var containerHeight = container.height;
		var cropBox = this.cropBox;

		if (cropBox.width > cropBox.maxWidth || cropBox.width < cropBox.minWidth) {
			cropBox.left = cropBox.oldLeft;
		}

		if (cropBox.height > cropBox.maxHeight || cropBox.height < cropBox.minHeight) {
			cropBox.top = cropBox.oldTop;
		}

		cropBox.width = min(max(cropBox.width, cropBox.minWidth), cropBox.maxWidth);
		cropBox.height = min(max(cropBox.height, cropBox.minHeight), cropBox.maxHeight);

		this.limitCropBox(false, true);

		cropBox.oldLeft = cropBox.left = min(max(cropBox.left, cropBox.minLeft), cropBox.maxLeft);
		cropBox.oldTop = cropBox.top = min(max(cropBox.top, cropBox.minTop), cropBox.maxTop);

		if (options.movable && options.cropBoxMovable) {
			// Turn to move the canvas when the crop box is equal to the container
			//this.$face.data(DATA_ACTION, (cropBox.width === containerWidth && cropBox.height === containerHeight) ? ACTION_MOVE : ACTION_ALL);
			this.$face.dataset[DATA_ACTION] = (cropBox.width === containerWidth && cropBox.height === containerHeight) ? ACTION_MOVE : ACTION_ALL;
		}
		
		//console.log(this.$cropBox, cropBox)
		Object.assign(this.$cropBox.style, {
			width: `${cropBox.width}px`,
			height: `${cropBox.height}px`,
			left: `${cropBox.left}px`,
			top: `${cropBox.top}px`
		});
		
		if (this.isCropped && this.isLimited) {
			this.limitCanvas(true, true);
		}
		
		if (!this.isDisabled) {
			//this.output();
			this.dragResizer({content:'.cropper-crop-box', handle: '.cropper-drag-box', snap: false})
		}
	}
}
ImageZoomer.prototype.dragResizer = function dragResizer() {
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
		console.log(sx, sy, sw, sh, dx, dy, dw, dh, x, y, w, h) */
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
			console.log(ratio, that.bb, that.getData()/* , e.offsetX, (e.clientX  - offset) */)
		}
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
/**
     * Get the cropped area position and size data (base on the original image)
     * @param {boolean} [rounded=false] - Indicate if round the data values or not.
     * @returns {Object} The result cropped data.
     */
ImageZoomer.prototype.getData = function getData() {
	var rounded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var options = this.options,
	imageData = this.image,
	canvasData = this.canvas,
	cropBoxData = this.cropBox;
	var data;
	if(!this.ready && !this.cropped) {
		data = {
			x: cropBoxData.left - canvasData.left,
			y: cropBoxData.top - canvasData.top,
			width: cropBoxData.width,
			height: cropBoxData.height
		};
		var ratio = imageData.width / imageData.naturalWidth;
		$.forEach(data, function (n, i) {
			data[i] = n / ratio;
		});
		if(rounded) {
			// In case rounding off leads to extra 1px in right or bottom border
			// we should round the top-left corner and the dimension (#343).
			var bottom = Math.round(data.y + data.height);
			var right = Math.round(data.x + data.width);
			data.x = Math.round(data.x);
			data.y = Math.round(data.y);
			data.width = right - data.x;
			data.height = bottom - data.y;
		}
	} else {
		data = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
	}
	if (options.rotatable) {
		data.rotate = imageData.rotate || 0;
	}
	if (options.scalable) {
		data.scaleX = imageData.scaleX || 1;
		data.scaleY = imageData.scaleY || 1;
	}
	return data;
}
    
ImageZoomer.prototype.render = function() {
	var ratio = window.devicePixelRatio / (this.ctx.webkitBackingStorePixelRatio || this.dpr);

	this.targetCanvas.width = this.image.width * ratio;
	this.targetCanvas.height = this.image.height * ratio;
	this.targetCtx.scale(ratio, ratio);
	this.targetCtx.drawImage(this.image,
		this.image.width * this.bb[0],
		this.image.height * this.bb[1],
		this.image.width * this.bb[2],
		this.image.height * this.bb[3],
		0, 0, this.targetCanvas.width/ratio, this.targetCanvas.height/ratio);
};
ImageZoomer.prototype.render2 = function() {var ratio = window.devicePixelRatio / (this.ctx.webkitBackingStorePixelRatio || this.dpr);this.canvas.width = this.image.width * ratio;this.canvas.height = this.image.height * ratio;this.ctx.scale(ratio, ratio);this.ctx.drawImage(this.image,this.image.width * this.bb[0],this.image.height * this.bb[1],this.image.width * this.bb[2],this.image.height * this.bb[3],0, 0, this.canvas.width/ratio, this.canvas.height/ratio);};

ImageZoomer.prototype.renderSelection = function() {
	var bb = this._getSelectionBoundingBox();
	this.targetCtx.strokeWidth = 3;
	this.targetCtx.strokeRect(this.image.width * bb[0], this.image.height * bb[1], this.image.width * bb[2], this.image.height * bb[3]);
	
	this.ctx.drawImage(this.image, 0, 0, this.image.width , this.image.height);
	this.ctx.fillStyle = '#0000ff';
	this.ctx.strokeStyle = '#0000ff';
	this.ctx.strokeWidth = 3;
	this.ctx.strokeRect(this.image.width * bb[0], this.image.height * bb[1], this.image.width * bb[2], this.image.height * bb[3]);
	/* 
	this.adjustCropBox({left: this.image.width * bb[0], top: this.image.height * bb[1], height: this.image.width * bb[2], width: this.image.height * bb[3]})
	
	console.log(this.image.width * bb[0], this.image.height * bb[1], this.image.width * bb[2], this.image.height * bb[3], 
	{width: this.cropBox.width * bb[0], height: this.cropBox.height * bb[1], top: this.image.width * bb[2], left: this.image.height * bb[3]});
	this.adjustCropBox({width: this.cropBox.width * bb[0], height: this.cropBox.height * bb[1], left: this.image.width * bb[2], top: this.image.height * bb[3]});
	*/
};

/**
 * Changes the zoom level of a canvas in bounding box sized as a percentage of
 * each dimension (in floats): [0.1, 0.1, 0.2, 0.2].
 */
ImageZoomer.prototype.zoom = function(bb) {
	this.doZoom(bb);
	if(this.callback) {
		this.callback(bb);
	}
};

ImageZoomer.prototype.doZoom = function(bb) {
	this.isZoomed = (bb != ZOOM_OUT);
	// Set the cursor on the canvas.
	this.canvas.style.cursor = (this.isZoomed ? 'zoom-out' : 'zoom-in');
	this.bb = bb;
	this.render();
}

ImageZoomer.prototype.onZoomChanged = function(callback) {this.callback = callback;};
ImageZoomer.prototype.loadImage = function(src) {
	const $this = this;
	this.image.src = src;
	//if(!this.isImg){
		this.image.onload = function(e){
			$this.ctx.drawImage($this.image, 0, 0, $this.canvas.width, $this.canvas.height)
			$this.render.bind($this);
			//console.log(img)
		}
		//this.image.onload = this.render.bind(this);
	//}
};

ImageZoomer.prototype._getSelectionBoundingBox = function(opts) {
	opts = opts || {};
	var isSameAspect = !!opts.isSameAspect;
	var x = Math.min(this.selectionStart[0], this.selectionEnd[0]);
	var y = Math.min(this.selectionStart[1], this.selectionEnd[1]);
	var w = Math.abs(this.selectionStart[0] - this.selectionEnd[0]);
	var h = Math.abs(this.selectionStart[1] - this.selectionEnd[1]);

	if(isSameAspect && w != 0 && h != 0) {
		var ratio = this.image.height/this.image.width;
		// Only allow zoom in the same aspect ratio.
		if (w * ratio > h) {
			w = h / ratio;
		} else {
			h = w * ratio;
		}
	}
	// Convert to percentage-based units.
	x /= this.canvas.clientWidth;
	w /= this.canvas.clientWidth;
	y /= this.canvas.clientHeight;
	h /= this.canvas.clientHeight;
	return [x, y, w, h];
};

ImageZoomer.prototype._onmousedown = function(e) {
	this.selectionStart = [e.offsetX, e.offsetY];
	this.isMouseDown = true;
};
ImageZoomer.prototype._onmousemove = function(e) {
	if(this.isMouseDown) {
		this.selectionEnd = [e.offsetX, e.offsetY];
		
		// Render the selection.
		this.render();
		this.renderSelection();
	}
};
ImageZoomer.prototype._onmouseup = function(e) {
	this.isMouseDown = false;
	this.selectionEnd = [e.offsetX, e.offsetY];
	
	this.zoom(ZOOM_OUT);
	// Compute the bounding box as a result of the selection.
	var bb = this._getSelectionBoundingBox({isSameAspect: true});
	if(!this.isZoomed && bb[2] != 0 && bb[3] != 0) {
		this.zoom(bb);
	} else {
		//this.zoom(ZOOM_OUT);
	}
};
ImageZoomer.DEFAULTS = {

    // Define the view mode of the cropper
    viewMode: 0, // 0, 1, 2, 3

    // Define the dragging mode of the cropper
    dragMode: 'crop', // 'crop', 'move' or 'none'

    // Define the aspect ratio of the crop box
    aspectRatio: NaN,

    // An object with the previous cropping result data
    data: null,

    // A jQuery selector for adding extra containers to preview
    preview: '',

    // Re-render the cropper when resize the window
    responsive: true,

    // Restore the cropped area after resize the window
    restore: true,

    // Check if the current image is a cross-origin image
    checkCrossOrigin: true,

    // Check the current image's Exif Orientation information
    checkOrientation: true,

    // Show the black modal
    modal: true,

    // Show the dashed lines for guiding
    guides: true,

    // Show the center indicator for guiding
    center: true,

    // Show the white modal to highlight the crop box
    highlight: true,

    // Show the grid background
    background: true,

    // Enable to crop the image automatically when initialize
    autoCrop: true,

    // Define the percentage of automatic cropping area when initializes
    autoCropArea: 0.8,

    // Enable to move the image
    movable: true,

    // Enable to rotate the image
    rotatable: true,

    // Enable to scale the image
    scalable: true,

    // Enable to zoom the image
    zoomable: true,

    // Enable to zoom the image by dragging touch
    zoomOnTouch: true,

    // Enable to zoom the image by wheeling mouse
    zoomOnWheel: true,

    // Define zoom ratio when zoom the image by wheeling mouse
    wheelZoomRatio: 0.1,

    // Enable to move the crop box
    cropBoxMovable: true,

    // Enable to resize the crop box
    cropBoxResizable: true,

    // Toggle drag mode between "crop" and "move" when click twice on the cropper
    toggleDragModeOnDblclick: true,

    // Size limitation
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: 200,
    minContainerHeight: 100,

    // Shortcuts of events
    build: null,
    built: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null
};
(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

   /*  navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    ); */
	
	getVideo();

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    
    clearphoto();
  }

	function getVideo() {
		navigator.mediaDevices.getUserMedia({video : true, audio: false})
			.then(localMediaStream => {
				var vendorURL = window.URL || window.webkitURL;
				video.src = vendorURL.createObjectURL(new Blob([localMediaStream]));
				video.play();
			})
			.catch(err => {
				console.error(err);
				alert('GIVE PERMISSION TO ACCESS VIDEO PLAYER');
			});
	}
  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  //window.addEventListener('load', startup, false);
})();

document.addEventListener('DOMContentLoaded', function(e) {
	"use strict";
	/* setTimeout(()=>{
		let resizer = dragResizer({
			content:'.resize-window', 
			handle: '.resize-window .handle', 
			canvas: '.img-preview', 
			image: '.image-workspace img'
		});
		const $IMAGE_ZOOMER2 = new ImageZoomer({sel: ".image-workspace-img", trg: ".img-preview", src: "./app/assets/img/other/7.jpg", element: ".cropper-container"});
	}, 1000) */
	const akdPhotoEditor = AKD_PhotoEditor({container:"#main",style:"vscode"})
		.buildUI({container:"#main",style:"vscode"})
		.initEvents()
		//.buildUIFromScratch({container:"#akd-editor-view"})
		//.buildUI({container:"#akd-editor-view2"});
	let $main = document.getElementById("main"), 
	$mainContent = $main.querySelector(".main-content"), 
	$body = document.body, 
	actionButton = document.querySelectorAll(".action-button button"), 
	side_controls_shifter = document.querySelectorAll(".side-controls-shifter button"), 
	side_control_page_1 = document.querySelector(".side-control-page-1"), 
	side_control_page_2 = document.querySelector(".side-control-page-2"), 
	preview_container = document.querySelector(".preview-container"), 
	preview_container_span = preview_container.querySelector("span"), 
	image_workspace = document.querySelector(".image-workspace"), 
	image_workspace_img = image_workspace.querySelector(".image-workspace-img"), 
	image_workspace_span = image_workspace.querySelector("span"), 
	hiddenUpload = document.querySelector(".hidden-upload"), 
	maskSelect = document.querySelector(".mask-select");
	var Cropper = window.Cropper;
	var URL = window.URL || window.webkitURL;
	var options = {
		aspectRatio: 16 / 9,
		dragMode: 'move', 
		preview: '.img-preview', 
		viewMode: 2, 
		//modal: false, 
		//background: false, 
		ready: function(){
			console.log('cropper ready');
		}
	}
	var cropper = new Cropper(image_workspace_img, options)
	//$(image_workspace_img).cropper(options)
	var originalImageURL = image_workspace_img.src;
	var uploadedImageType = 'image/jpeg';
	var uploadedImageName = 'cropped.jpg';
	var uploadedImageURL;
	
	//akdPhotoEditor.loadPageSection('./image.html', '.slides-container', (r, err) => console.log(r, err));
	side_controls_shifter[0].onclick = () => {
		side_control_page_1.style.display = 'block';
		side_control_page_2.style.display = 'none';
		side_controls_shifter[0].classList.add('active');
		side_controls_shifter[1].classList.remove('active');
	}
	side_controls_shifter[1].onclick = () => {
		side_control_page_1.style.display = 'none';
		side_control_page_2.style.display = 'block';
		side_controls_shifter[0].classList.remove('active');
		side_controls_shifter[1].classList.add('active');
	}
	actionButton[0].onclick = () => hiddenUpload.click();
	hiddenUpload.onchange = (e) => {
		var _ctx, _img, file = hiddenUpload.files[0], 
		url = window.URL.createObjectURL(new Blob([file], {type: (file.type || 'image/jpeg')}));
		if(image_workspace_img.tagName.toLowerCase() === 'canvas'){
			image_workspace_img.width = image_workspace_img.parentElement.offsetWidth, 
			image_workspace_img.height = image_workspace_img.parentElement.offsetHeight, 
			_ctx = image_workspace_img.getContext('2d'), _img = new Image();
			//console.log(image_workspace_img, _ctx)
			_img.onload = (e) => {
				image_workspace_img.width = e.target.naturalWidth, 
				image_workspace_img.height = e.target.naturalHeight;
				_ctx.drawImage(_img, 0, 0, _img.naturalWidth, _img.naturalHeight);
				const $IMAGE_ZOOMER2 = new ImageZoomer({sel: ".image-workspace-img", trg: ".img-preview", src: url, element: ".cropper-container"});
				//console.log(image_workspace_img.tagName.toLowerCase(), _img.naturalWidth, e.target.naturalWidth, _img.naturalHeight, e.target.naturalHeight)
				window.URL.revokeObjectURL(url);
				_img = null;
			}
			_img.src = url;
		} else image_workspace_img.src = url;
		image_workspace_span.style.display = 'none';
		preview_container_span.style.display = 'none';
		
		// Import image
		//var hiddenUpload = document.getElementById('inputImage');
		if(URL){
			//hiddenUpload.onchange = function () {
			var files = this.files || e.target.files;
			var file;

			if(files && files.length) {
				file = files[0];
				if(/^image\/\w+/.test(file.type)) {
					uploadedImageType = file.type;
					uploadedImageName = file.name;

					if (uploadedImageURL) {
						URL.revokeObjectURL(uploadedImageURL);
					}

					image_workspace_img.src = uploadedImageURL = URL.createObjectURL(file);

					if (cropper) {
						cropper.destroy();
					}

					cropper = new Cropper(image_workspace_img, options);
					hiddenUpload.value = null;
				} else {
					window.alert('Please choose an image file.');
				}
			}
			//};
		} else {
			hiddenUpload.disabled = true;
			hiddenUpload.parentNode.className += ' disabled';
		}
	}
	const _cached_canvas = image_workspace_img;
	maskSelect.onchange = (e) => {
		var _ctx, imgSrc, newImg = document.createElement('img');
		if(_cached_canvas.tagName.toLowerCase() === 'canvas'){
			_ctx = _cached_canvas.getContext('2d');
			imgSrc = _cached_canvas.toDataURL();
		} else imgSrc = _cached_canvas.src;
		newImg.src = imgSrc;
		
		_ctx.drawImage(newImg, 0,0)
		//resetCanvas(_ctx, newImg)
		//console.log('./app/assets/img/masks/' + e.target.value)
		image_workspace_img = _cached_canvas;
		addMask(image_workspace_img, './app/assets/img/masks/' + e.target.value)
	}
	//const num = 123456789;
	//const f = new Intl.NumberFormat(undefined, {notation: 'compact'});
	//const f = new Intl.NumberFormat('en-us, {currency: 'USD', style: 'currency'});
	//console.log(f.format(num))
	/* document.addEventListener("click", function(e){
	//this.$on('button', 'click', function (e) {
		let $this = this instanceof HTMLElement ? this : e.target, 
		$card = $this.closest('.akd-photo-editor-card'), 
		$sourceImage = $one('[data-akd-photo-editor-source-image]', $card), 
		$goLiveInput = $one('[data-akd-photo-editor-go-live]', $card);
				
		if($this.id === "main-sidebar-toggler"){
			let $fa = $this.querySelector('.fa');
			$this.classList.toggle("is-active");
			$body.classList.toggle("main-sidebar-toggled");
			if($body.classList.contains("main-sidebar-toggled")){
				$fa.classList.replace("fa-chevron-right", "fa-chevron-left");
			} else $fa.classList.replace("fa-chevron-left", "fa-chevron-right");
		}
		if($this.id === "utility-sidebar-toggler"){
			let $fa = $this.querySelector('.fa');
			$this.classList.toggle("is-active");
			$body.classList.toggle("utility-sidebar-toggled");
			if($body.classList.contains("utility-sidebar-toggled")){
				$fa.classList.replace("fa-chevron-left", "fa-chevron-right");
			} else $fa.classList.replace("fa-chevron-right", "fa-chevron-left");
		}
		//	}.bind(this));
	});
	this.$on('[data-akd-photo-editor-go-live]', 'change', function (e) {
		let $this = e.target, $card = $this.closest('.akd-photo-editor-card'), 
		$showButton = $card.querySelector('[data-akd-photo-editor-edit-button]');
		if($card.classList.contains('full') && isElement($showButton)) {
			if($this.checked === true) $showButton.setAttribute("disabled", '');
			else $showButton.removeAttribute("disabled");
		}
	}.bind(this));
	this.$on("#template-view", 'routerload', function (e) {
		console.log(e.target.innerHTML)
	}.bind(this)); */
	/* $mainContent.addEventListener("dragover", function(e){
		e.preventDefault();
		e.stopPropagation();
		this.classList.add('drag-over');
	});
	$mainContent.addEventListener("dragleave", function(e){
		e.preventDefault();
		e.stopPropagation();
		this.classList.remove('drag-over');
	});
	$mainContent.addEventListener("drop", function(e){
		e.preventDefault();
		e.stopPropagation();
		this.classList.remove('drag-over');
		let $file = e.dataTransfer.files[0], reader = new FileReader();
		//$imgSrc = URL.createEventObject($file);
		reader.onload = function(e){
			$mainContent.innerHTML = akdPhotoEditor.buildCard(e.target.result)
			console.log(e.target.result)
		}
		reader.readAsDataURL($file);
		//console.log(e.dataTransfer, $file)
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
			
	<section id="books">
				<h1>Murach Books</h1>
				<img src="images/book1.jpg" draggable="true" ondragstart="drag(this, event)" id="SQL Server 2008">
				<img src="images/book2.jpg" draggable="true" ondragstart="drag(this, event)" id="PHP and MySQL">
				<img src="images/book3.jpg" draggable="true" ondragstart="drag(this, event)" id="Visual Basic 2010">
				<img src="images/book5.jpg" draggable="true" ondragstart="drag(this, event)" id="ASP.NET 4 with VB 2010">
				<div id="cart"
					 ondrop="drop(this, event)" 
					 ondragenter="return false" 
					 ondragover="return false">
					<strong>Shopping Cart (Drag books here)</strong>
				</div>
	
	console.log(grid.cells) */
});