_.AKD_PhotoEditor = function(id, cfg = {key: ''}){
	let $i = cfg.key || 0;
	const $this = this;
	//this[$i] = $i;
	////////////////////////////////////////////////////////////
	this.setup = function(){
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
		
		this.$container = $one(id);
		if(!isElement(this.$container)) return false;
		this.$parent = this.$container.hasAttribute('data-akd-photo-editor-parent') ? this.$container : $one('[data-akd-photo-editor-parent]', this.$container);
		this.$sourceImage = $one('[data-akd-photo-editor-source-image]', this.$container);
		this.$outputElement = $one('[data-akd-photo-editor-output]', this.$container);
		if(!isElement(this.$parent) || !isElement(this.$sourceImage) || !isElement(this.$outputElement)){
			let msg = '';
			if(!isElement(this.$parent)) msg += "The {parent} element is not valid\n";
			if(!isElement(this.$sourceImage)) msg += "The {sourceImage} element is not valid\n";
			if(!isElement(this.$outputElement)) msg += "The {outputElement} element is not valid\n";
			console.warn(msg);
			return false;
		}
		//console.log(id, this.$container)
		
		this.$canvas = this.tag("canvas", {id: "AKD-photo-editor-canvas-" + $i, 'class': "akd-photo-editor-canvas", width: this.$sourceImage.naturalWidth, height: this.$sourceImage.naturalHeight, style:{width: `${this.$sourceImage.naturalWidth}px`, height: `${this.$sourceImage.naturalHeight}px`}});
		//Object.assign(this.$canvas.style, {width: this.$sourceImage.naturalWidth, height: this.$sourceImage.naturalHeight});
		this.$ctx = this.$canvas.getContext("2d");
		this.$outputElement.appendChild(this.$canvas);
		
		this.$goLiveInput = $one('[data-akd-photo-editor-go-live]', this.$container);
		this.$filterInput = '';
		return this;
	}
	this.canvasFilter = function(filter_str){
		this.$ctx.filter = filter_str;
		this.$ctx.drawImage(this.$sourceImage, 0, 0, this.$canvas.width, this.$canvas.height);
		return this;
	}
	this.saveImage = function(newSource){
		let sourceImage = isElement(newSource) && isImage(newSource) ? newSource : this.$sourceImage;
		/* this.$ctx.filter = 'blur(20px)';
		this.$ctx.drawImage(sourceImage, 0, 0, this.$canvas.width, this.$canvas.height);
		console.log(this.$ctx.filter) */
		//this.copyImage(newSource);
		console.log("This feature is under construction!")
		return this;
	}
	this.copyImage = function(newSource){
		//this.flush().setup();
		let sourceImage = isElement(newSource) && isImage(newSource) ? newSource : this.$sourceImage;
		this.$ctx.drawImage(sourceImage, 0, 0, this.$canvas.width, this.$canvas.height);
		//this.$ctx.save();
		return this;
	}
	this.resetImage = function(){
		//this.flush().setup()/* .copyImage() */;
		this.$ctx.filter = 'none';
		//this.$ctx.drawImage(this.$sourceImage, 0, 0, this.$canvas.width, this.$canvas.height);
		this.$ctx.drawImage(this.$sourceImage, 0, 0, (this.$sourceImage.naturalWidth || this.$sourceImage.width || this.$canvas.width), (this.$sourceImage.naturalHeight || this.$sourceImage.height || this.$canvas.height));
		//this.$ctx.restore();
		return this;
	}
	this.init = function(newSource){
		this.flush().setup().copyImage(newSource).initDragger().initFilter(newSource);
		//this.initComparisons();
		return this;
	}
	this.flush = function(){
		if(isElement(this.$outputElement) && this.$outputElement.contains(this.$canvas)) this.$outputElement.removeChild(this.$canvas);
		this.$ctx = null;
		this.$canvas = null;
		return this;
	}
	////////////////////////////////////////////////////////////
	this.initFilter = function initFilter(newSource) {
		const $$this = this, 
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
		if($all(".filter-options > li", this.$container).length === 0){
			//FILTER_OPTIONS.forEach((option, index) => {
			let i = 0,  s=$this.$_skinz;
			this.FILTER_OPTIONS.forEach((option, index) => {
				s = i === 3 ? $this.shuffle($this.$_skinz) : s;
				let el = $this.tag("li", {"class": "filter-item flex flex--ai-str fx--jc-str gap--2 w--max"}, 
					$this.tag("button", {
						"class": `filter-option akd__btn btn--${s[0]} w--lg-10 w--md-8 w--sm-8 bdr--1 flex--justify-start` + (Number(index) === Number(selectedIndex) ? ' selected is-active' : ''), 
						"dataset": {index, min: option.range.min, max: option.range.max, step: option.range.step, value: option.value},
						onclick: (e) => {
							let $_this = isElement(this) ? this : e.target;
							//selectedIndex = $one(".filter-grid .filter-option > button.selected")?.dataset.index || 0;
							//selectedFilterOption = FILTER_OPTIONS[index] || FILTER_OPTIONS[0];
							$this.selectedIndex = Number(index) || 0;
							$this.selectedFilterOption = $this.FILTER_OPTIONS[$this.selectedIndex] || $this.FILTER_OPTIONS[0];
							$this.removeClass($all(".filter-option", $this.$container), "selected, is-active");
							$this.addClass($_this, "selected, is-active");
							Object.assign($this.$filterInput, {min: option.range.min, max: option.range.max, step: option.range.step, value: option.value})
							$_this.nextElementSibling.textContent = option.value.toString();
							//$_this.parentElement.querySelector(".filter-option-value").textContent = option.value.toString();
						}
					}, option.name), 
					$this.tag("span", {"class": `filter-option-value w--lg-2 w--md-4 w--sm-4 p--2 bdr--1 text--900 text--${s[0]} text--left bg--white`}, option.value.toString())
				);
				ofrag.appendChild(el);
				
				if(i === 3) i = 1; else i++;
				//(i % 2 == 3 ? 0 : i++);
			});
			//$one(".filter-options", this.$container).insertAdjacentElement('beforeend',ofrag);
			$one(".filter-options", this.$container).appendChild(ofrag);
			this.$filterInput = this.tag("input", {
				"id": "filter-input-"+$i, "class": "akd__input-range w--12 p--0", type: "range", min: this.selectedFilterOption.range.min, max: this.selectedFilterOption.range.max, step: this.selectedFilterOption.range.step, value: this.selectedFilterOption.value, 
				//dataset: {`${this.camelize('akd-photo-editor-filter-input')}`:''}, 
				dataset: {'akdPhotoEditorFilterInput':''}, 
				onchange: (e) => {
					let filter_str = '', filter_obj = {};
					//selectedFilterOption.value = e.target.value;
					$this.selectedFilterOption.value = e.target.value;
					//filter_str = `${$this.FILTER_OPTIONS.map(op=> `${op.property}(${op.value}${op.unit})`).join(' ')}`;
					//FILTER_OPTIONS.forEach(op=> {
					$this.FILTER_OPTIONS.forEach(op=> {
						filter_str += `${op.property}(${op.value}${op.unit}) `;
						filter_obj[$this.camelize(op.property)] = `${op.value}${op.unit}`;
					});
					
					$this.setNodeAttribute(FILTER_IMAGE,{
						'style': {filter: filter_str}, 
						'dataset': {...filter_obj}
					});
					//$one(".filter-option.selected").parentElement.querySelector(".filter-option-value").textContent = e.target.value.toString();
					$one(".filter-option.selected").nextElementSibling.textContent = e.target.value.toString();
					if($this.$goLiveInput.checked === true){
						$this.canvasFilter(filter_str);
					}
				}
			});
			//this.$filterInput.setAttribute("data-akd-photo-editor-filter-input", '');
			$one(".filter-input-wrapper", this.$container).appendChild(this.$filterInput);
		}
		/* this.on($one(".filter-image-file-input", this.$container), 'change',e=>{
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
	this.initDragger = function(dragHandle = ".img-comp-slider", dragPanel = ".img-comp-overlay", min = 1.5, max = 100) {
		var $dragging = false, mainPercentage, percentage = 100, $parent = window, 
		$dragHandle = $one(dragHandle, this.$container), $dragParentContainer = $dragHandle.parentElement, 
		$dragPanel = $one(dragPanel, this.$container), hw = ($dragHandle.offsetWidth + 2), hhw = (hw / 2);
		function dragstart(e){$dragging = true;e.preventDefault();}
		function dragend(e) {$dragging = false;}
		function dragmove(e) {
			if($dragging){
				//percentage = (e.pageX / ($dragParentContainer.offsetWidth??window.innerWidth)) * 100;
				percentage = ((e.pageX - hw) / $dragParentContainer.offsetWidth) * 100;
				if(percentage > min && percentage < max) {
					mainPercentage = 100-percentage;
					_.css($dragPanel,{'width':`${percentage}%`});
					_.css($dragHandle,{'left':`calc(${percentage}% - ${hhw}px)`});
				}
			}
		}
		if(isElement($dragHandle) && isElement($dragPanel)){
			_.css($dragHandle,{'left':`calc(${percentage}% - ${hhw}px)`,transition:"none"});
			_.css($dragPanel,{transition:"none"});
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
	this.emitEvent = function (type, elem, detail) {
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
	this.trigger = function(name){var that = this;return this.forEach(this.results, function() {var event = document.createEvent('HTMLEvents');if ( !event.target ) {event.target = this;}event.initEvent(name,true,false);this.dispatchEvent(event);});/* return this; */};

	return this
}

const filterIcons = _.throttle(value => {
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
const filterItems = _.throttle((e, id, odt) => {
	let val = isString(e) ? e : e.value, 
	__items = $all(id), 
	//__items = Array.from(document.getElementsByClassName(id)),
	//totalIconsInSet = icons.getAttribute("data-total-icons"), 
	$i = 0;
	
	/* if(isArray(__items) && __items.length > 0){
		// Respond to any input change, and show first few matches
		__items.forEach((li) => {
			li.style.display = "none";
			if(li.dataset.title.toLowerCase().indexOf(val) !== -1 || li.title.indexOf(val) !== -1 || li.dataset?.name.filename.toLowerCase().indexOf(val) !== -1){
				li.style.display = odt || "block";
			}
		});
	} */
	
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
}, 250);

document.addEventListener('DOMContentLoaded', function(e) {
	const albumPhotos = {};
	//var photos = fetch('./app/includes/loader.php?mode=images&section=gallery&action=all&format=json').then(data=>data.json()).then(res=>{return res}).catch(er=>console.error(er));
	var photos = _.fetchFile('./app/includes/loader.php?mode=images&section=gallery&action=all&format=json', 'json')
	Promise.resolve(photos).then(res=>{
		res = isString(res) ? JSON.parse(res) : res;
		Object.assign(albumPhotos, res);
		//console.log(albumPhotos, res);
	});/*  */
	const routes = {
		test: {
				title: "Welcome",
			links: [
				"Goggle", "CSS-Tricks", "Codrops"
			], 
			templateString: $one("#welcome-template").textContent
		}, 
		welcome: {
			title: "Welcome",
			links: [
				"Goggle", "CSS-Tricks", "Codrops"
			], 
			templateString: $one("#welcome-template").textContent
		}, 
		'/skills': {
			title: "My Skills",
			skills: [
				"css", "javascript", "php", "Optimization"
			], 
			showSkills: true, 
			/* templateString: `<h3><%this.title%>:</h3><%if(this.showSkills) {%><ul class="page-links"><%for(var index in this.skills){%><li data-route-link data-route="<%skills/<%this.skills[index]%>"><a href="#!skills/<%this.skills[index]%>"><%this.skills[index]%></a></li><%}%></ul><%} else {%><p>none</p><%}%>`, */
			templateString: `<h3><%=obj.title%>:</h3>
			<%if(obj.showSkills) {%>
				<ul class="page-links"> 
					<%for(var index in obj.skills){%>
					<li><a href="#!skills/<%=obj.skills[index]%>" data-route-link data-route="/skills/<%=obj.skills[index]%>"><%=obj.skills[index]%></a></li>
					<%}%>
				</ul> 
			<%} else {%>
				<p>none</p>
			<%}%>`
		}, 
		'/skills/css': {
			title: "Skills: CSS",
			links: [
				"welcome", "skills"
			], 
			templateString: `
			<h1><%= obj.title %></h1>
			<h3>Please visit our othe pages: </h3>
			<br />
			<ul class="page-links">
				<% for(var i = 0;i<obj.links.length;i++){ %>
				<li data-route-link data-route="<%= obj.links[i] %>"><%= obj.links[i] %></li>
				<% } %>
			</ul>
			`
		}, 
		'/404': {
			title: "404: Not Found!",
			links: [
				"welcome", "skills"
			], 
			templateString: `
			<h1><%= obj.title %></h1>
			<h3>Please visit our othe pages: </h3>
			<br />
			<ul class="page-links">
				<% for(var i = 0;i<obj.links.length;i++){ %>
				<li data-route-link data-route="<%= obj.links[i] %>"><%= obj.links[i] %></li>
				<% } %>
			</ul>
			`
		}
	};
	let templateView = $one("#template-view"), 
	absurdTemplateView = $one("#absurd-template-view"), 
	template = $one("#welcome-template"), 
	templateText = template.textContent
	//templateView.innerHTML = render(routes['welcome']);
	//render = Templater(templateText), 
	//render2 = absurdTemplater(routes['skills'].templateString, routes['skills']);
	
	//absurdTemplateView.innerHTML = render2;
	const currentRoute = localStorage.getItem("currentRoute"), 
	newTemplates = Object.assign({}, routes, AKD_routerTemplates), 
	linkId = "[data-akd-route-link]", 
	akdRouter = /* templater new*/ AKD_Router({
		viewId: 'template-view', 
		animation:'fade', 
		mode: 'click', 
		linkId, 
		preloads: [
			{globalVar: 'albumPhotos', url: './app/includes/loader.php?mode=images&section=gallery&action=all&format=json', format: 'json', extraData: {}}, 
			{globalVar: 'database', url: './app/data/database.json', format: 'json', extraData: {}},
			{globalVar: 'snippets', url: './app/data/snippets.json', format: 'json', extraData: {}}
		]
	});
	const _ALBUMPHOTOS = akdRouter.preloads.albumPhotos, _SNIPPETS = akdRouter.preloads.snippets;
	//hashRouter()
	akdRouter
		.route('/', 'home', function (){
			this.heading = 'Welcome Home!';
        	
		})
		.route('/page1', 'template1', function () {
			this.greeting = 'Hello world!';
			this.moreText = 'Bacon ipsum...';
			this.counter = 0;
			this.$on('.my-button', 'click', function () {
				this.counter += 1;
				this.$refresh();
			}.bind(this));
		})
		.route('/page2', 'template2', function () {
			this.heading = 'I\'m page two!';
        })
		.route('/tools', 'tools', {
			heading : 'All Tool Utilities!',
			greeting : '<strong>Welcome to the Tools page</strong>!',
			moreText : {
				summary:'<strong>Welcome to the Tools page</strong>! A wide variety of useful web utiliities and applications can be found here. click <a href="javascript:void(0);" onclick="show(\'.more\');">this link to show more</a> information about this section',
				description:'<div class="more hidden"><h2>Tools Index</h2><ul><li><a href="./">index</a></li></ul></div>'
			},
			link : {
				web:'<a href="web.php">web</a>',
				hash:'<a href="hash.php">hash</a>',
				return:'<a href="router.php">return</a>'
			}
		})
		.route('/vagina', 'vagina', function () {
			this.heading = 'The Vagina Monologue';
			this.albumPhotos = albumPhotos;
			this.imageList = this.albumPhotos?.images;
			/* $$$(document).find(".gallery").css({'display':'block','border':'4px solid #ff0000'}).slideShow(<?php echo $albumPhotos;?>);
			var v = $$$(".gallery").slideShow(<?php //echo $albumPhotos;?>);
			this.galleryContent = v.slideShow;
			*/
			console.log(_ALBUMPHOTOS, albumPhotos)
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
			this.$on('button', 'click', function (e) {
				let $this = e.target, $card = $this.closest('.akd-photo-editor-card'), 
				$sourceImage = $one('[data-akd-photo-editor-source-image]', $card), 
				$goLiveInput = $one('[data-akd-photo-editor-go-live]', $card);
				//_.AKD_PhotoEditor($one(".photo-main-area", $card), {})
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
							$one('[data-akd-photo-editor-comparison-tab]', $card).click();
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
					$one('[data-akd-photo-editor-comparison-tab]', $card).click();
				} else if($this.matches(".zoom-in")){
					let img = $card.querySelector('.photo-thumb');
					if(isElement(img)){
						_.zoomImage(img, 'in', 1.5);
					}
				} else if($this.matches(".zoom-out")){
					let img = $card.querySelector('.photo-thumb');
					if(isElement(img)){
						_.zoomImage(img, 'out', 1.5);
					}
				} else if($this.matches(".flip-H")){
					let img = $card.querySelector('.photo-thumb');
					if(isElement(img)){
						_.flipImage(img, 'h');
					}
				} else if($this.matches(".flip-V")){
					let img = $card.querySelector('.photo-thumb');
					if(isElement(img)){
						_.flipImage(img, 'v');
					}
				} else if($this.hasAttribute("data-akd-photo-editor-reset-button")){
					let $this = e.target.closest('.akd-photo-editor-card');
					if($card.classList.contains('full')) {
						pEditor.resetImage();
						pEditor.FILTER_OPTIONS = pEditor.FILTER_OPTIONS_CACHED;
					}
				} else if($this.hasAttribute("data-akd-photo-editor-edit-button")){
					if(pEditor.$goLiveInput.checked !== true && $card.classList.contains('full')) {
						//pEditor.FILTER_IMAGE.style.filter = filter_str;
						//$one(".filter-option.selected").parentElement.querySelector(".filter-option-value").textContent = e.target.value.toString();
						pEditor.canvasFilter(filter_str);
						//console.log(filter_str)
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
			this.$on('[data-akd-photo-editor-go-live]', 'change', function (e) {
				let $this = e.target, $card = $this.closest('.akd-photo-editor-card'), 
				$showButton = $card.querySelector('[data-akd-photo-editor-edit-button]');
				if($card.classList.contains('full') && isElement($showButton)) {
					if($this.checked === true) $showButton.setAttribute("disabled", '');
					else $showButton.removeAttribute("disabled");
				}
			}.bind(this));
			/* this.$on("#template-view", 'routerload', function (e) {
				console.log(e.target.innerHTML)
			}.bind(this)); */
		})
		.route('/snippets',  'snippets', function (globalData){
			let current = 0, total = 0;
			//this.ref = akdRouter;
			//console.log(_SNIPPETS)
			this.isAsync = true;
			this.i = 0;
			this.containerID = 'snippets-container';
			this.heading = 'Code Snippets';
			this.snippets = /* globalData?.snippets ||  */_SNIPPETS;
			this.snippetContent = `<p>These are a few code snippets collected from around the internet.</p>`;
			this.snippetLinks = '';
			this.snippetsViewNav = '';
			for(const languages in this.snippets){
				let language = this.snippets[languages];
				//let sections = this.snippets[language];
				console.log(languages)
				this.snippetLinks += `<div class="${languages}">
					<span class="p--4 h2 text--purple">${languages} Snippets</span>
					<div class="">`;
				this.snippetsViewNav += `<div class="accordion-section ${languages}">
					<span class="accordion-section-head p--4 h2 text--purple">${languages} Snippets</span>
					<div class="accordion-section-body snap-container y">`;
				if(isArray(language)){
					this.snippetsViewNav += `<ul class="snippet-view-nav flex flex--col f--6 h--6 h--min-6 p--4 overflow--auto ui-pattern-1">
						${language.map((key, i) => `<li><a class="snippet-view-link" href="#" data-href="${key.attributes.fileName}" data-target-template="#snippet-viewer-template" data-target="#snippet-viewer" data-snippet-index="${i}" data-snippet-section="${keys[i]}" data-snippet-id="${key.id}" data-snippet-language="${key.language}">${key.attributes.fileName}</a></li>`).join('')}
					</ul>`;
					this.snippetLinks += `<div class="flex flex--col">
						<span class="p--4 h3">snippet: ${languages}</span>
						<ul class="rectangle-list pl--x2 flex flex--col mb--8">
							${language.map((key, i) => `<li data-title="${key.id}"><a class="snippet-view-link" href="#" data-href="${key.attributes.fileName}" data-file-href="./app/data/md/${key.attributes.fileName}" data-target-template="#snippet-viewer-template" data-target="#snippet-viewer" data-snippet-index="${i}" data-snippet-section="${keys}" data-snippet-id="${key.id}" data-snippet-language="${key.language}">${key.attributes.fileName}</a></li>`).join('')}
						</ul>
					</div>`;
				} else if(isObject(language)){
					for(const section in language){
						let snips = language[section];
						if(isArray(snips)){
							/* this.snippetsViewNav += `<div class="flex flex--col f--6 h--6 h--min-6">
								<span class="p--4 h3">snippet: ${section}</span>
								<ul class="snippet-view-nav flex flex--col f--12 h--12 p--4 overflow--auto ui-pattern-1">
									${snips.map((key, i) => `<li data-title="${key.id}"><a class="snippet-view-link" href="#" data-href="${key.attributes.fileName}" data-target-template="#snippet-viewer-template" data-target="#snippet-viewer" data-snippet-index="${i}" data-snippet-section="${section}" data-snippet-id="${key.id}" data-snippet-language="${key.language}">${key.attributes.fileName}</a></li>`).join('')}
								</ul>
							</div>`; */
							this.snippetsViewNav += `<div class="snap-section flex--col p--0">
								<span class="p--4 h3">snippet: ${section}</span>
								<ul class="snippet-view-nav flex flex--col f--12 h--12 p--4 overflow--auto ui-pattern-1">
									${snips.map((key, i) => `<li data-title="${key.id}"><a class="snippet-view-link" href="#" data-href="${key.attributes.fileName}" data-target-template="#snippet-viewer-template" data-target="#snippet-viewer" data-snippet-index="${i}" data-snippet-section="${section}" data-snippet-id="${key.id}" data-snippet-language="${key.language}">${key.attributes.fileName}</a></li>`).join('')}
								</ul>
							</div>`;
							
							this.snippetLinks += `<div class="flex flex--col">
								<span class="p--4 h3">snippet: ${section}</span>
								<ul class="rectangle-list pl--x2 flex flex--col mb--8">
									${snips.map((key, i) => `<li data-title="${key.id}"><a class="snippet-view-link" href="#" data-href="${key.attributes.fileName}" data-file-href="./app/data/md/${key.attributes.fileName}" data-target-template="#snippet-viewer-template" data-target="#snippet-viewer" data-snippet-index="${i}" data-snippet-section="${section}" data-snippet-id="${key.id}" data-snippet-language="${key.language}">${key.attributes.fileName}</a></li>`).join('')}
								</ul>
							</div>`;
						}
					}
				}
				this.snippetsViewNav += `</div></div>`;
				this.snippetLinks += `</div></div>`;
			}
			//console.log(this.snippetList)
			this.$on(/* '.snippet-view-link' */document, 'click', function (e) {
				e.preventDefault();
				let $this = e.target; 
				if($this.matches(".snippet-view-link")){
					let $index = Number($this.dataset?.snippetIndex??0), $language = $this.dataset?.snippetLanguage??'javascript', $id = $this.dataset?.snippetId??'', $section = $this.dataset?.snippetSection??'extra', 
					$href = $this.dataset?.href??'', $target = $this.dataset?.target??'', $target_template = $this.dataset?.targetTemplate??'';
					console.log($index, $id, $section, $target, $target_template, $id, this.snippets[$language][$section][$index].id)
					if(this.snippets[$language] && this.snippets[$language][$section] && this.snippets[$language][$section][$index] && this.snippets[$language][$section][$index].id === $id) {
						let $data = this.snippets[$language][$section][$index], 
						total = isArray(this.snippets[$language][$section]) && this.snippets[$language][$section].length > 0 ? this.snippets[$language][$section].length : 0, 
						nextIndex = ($index + 1) % total, 
						prevIndex = ($index - 1 + total) % total;
						
						$data.index = $index;
						$data.snippets = this.snippets;
						
						$data.nextIndex = nextIndex;
						$data.nextSection = $section;
						$data.nextSnippet = $data.snippets[$language][$section][nextIndex];
						$data.nextSnippetId = $data.nextSnippet.id;
						
						$data.prevIndex = prevIndex;
						$data.prevSection = $section;
						$data.prevSnippet = $data.snippets[$language][$section][prevIndex];
						$data.prevSnippetId = $data.prevSnippet.id;
						
						const $controller = akdRouter.objectToController($data);
						akdRouter.routeTo($target_template, $controller, $target);
						
						$all(".snippet-view-link", akdRouter.viewEl).forEach(el => el.classList.remove("selected"));
						$one(`[data-snippet-id="${$id}"]`).classList.add("selected");
						$this.classList.add("selected");
					}
				} else if($this.matches('.collapse-bar') ) {
					$this.classList.toggle('toggled');
				} else if ($this.matches('.toggle-handle') ) {
					$this.classList.toggle('active');
					$this.parentElement.classList.toggle('toggled');
				}
			}.bind(this));
			/* this.$on('.toggle-handle', 'click', function (e) {
				e.preventDefault();
				let $this = isElement(this) ? this : e.target; 
				$this.classList.toggle('active');
				$this.parentElement.classList.toggle('toggled');
			}.bind(this)); */
			this.$on(document, 'keyup', function (e) {
				e.preventDefault();
				let $this = isElement(this) ? this : e.target; 
				if($this.matches(".snippet-filter-input")){
					filterItems($this.value, ".snippet-links .rectangle-list > li", "inline-block")
				}
				/* if($this.classList.contains('player-playlist-search-input')){
					filterItems(this.value, ".player-playlist-item", "flex")
				}
				
				if($this.id){
					if($this.id === 'images-filter-input'){
						filterItems($this.value, ".collection-item", "inline-flex")
					}
				} */
			}.bind(this));
			
			this.$on('#wrap-select', 'change', function (e) {
				e.preventDefault();
				let $this = isElement(this) ? this : e.target; 
				$this.classList.toggle('active');
				$this.parentElement.classList.toggle('toggled');
			}.bind(this));
		})
		.route('/editor',  'editor',  function (globalData){
			//console.log(globalData)
			this.title = "Router Code Editor";
			this.activeTab = "html";
			this.tabs = [
				{title: "Switch to {html} tab", text: "html", target: "#akd-router-editor-tab-html"}, 
				{title: "Switch to {css} tab", text: "css", target: "#akd-router-editor-tab-css"}, 
				{title: "Switch to {javascript} tab", text: "javascript", target: "#akd-router-editor-tab-javascript"}, 
				{title: "Show All", text: "all", target: ""}, 
				{title: "Add new file", text: "&plus;", target: null}
			];
			/* this.splitter = (() => {
				//alert('pop')
				//document.addEventListener("wheel", (e) => {console.log(e.target.id)});
				_.akdSplitter("#akd-router-editor-splitter-handle", "#akd-router-editor-tab", "#akd-router-editor-output", "V");
			})(); */
			this.templateString = `
			<header class="output-header">
				<h4 class="flex flex--center"><%= obj.title %></h4>
				<span class="ml--auto">
					<button class="init-splitter akd__btn btn--success" title="initiate splitter">&plus;</button>
					<span class="sep" style="width: 2px;height: inherit;margin: 0 4px;"></span>
					<button id="reset" class="reset" type="button">Reset</button>
					<button id="run" class="run" type="button">Run ›</button>
				</span>
			</header>
			<article id="akd-router-editor" class="splitter vertical flex flex--row h--12" data-ratio="50:50" data-splitter-orientation="vertical" akd-onload="load splitter">
				<section id="akd-router-editor-tab" class="akd__tabs splitter_panel first--half">
					<nav id="akd-router-editor-tab-buttons" class="akd__tab-buttons">
						<ul class="akd__tab-buttons- w--12 flex gap--2">
							<% for(var i = 0;i<obj.tabs.length;i++){ %>
							<!--<li><a href="javascript:void(0);" onclick="show(\'#manage-image-section-<%= obj.tabs[i] %>\');"><%= obj.tabs[i] %></a></li>-->
							<li<%= (obj.tabs[i]?.text === '&plus;' || obj.tabs[i]?.text === '+' ? ' class="ml--auto"' : '') %>><a class="akd__tab-button <%= (obj.tabs[i]?.text === 'html' ? 'active--tab' : '') %>" href="javascript:void(0);" title="<%= (obj.tabs[i]?.title ? obj.tabs[i].title : 'Switch to {'+obj.tabs[i]+'} tab') %>" data-parent-tab="#akd-router-editor-tab" data-target-tab="<%= (obj.tabs[i]?.target ? obj.tabs[i].target : '#akd-router-editor-tab-'+obj.tabs[i]) %>"><%= (obj.tabs[i]?.text ? obj.tabs[i].text : obj.tabs[i]) %></a></li>
							<% } %>
						</ul>
					</nav>
					<div id="akd-router-editor-tab-panels" class="akd__tab-panels">
						<div id="akd-router-editor-tab-html" class="akd__tab-panel active--tab" data-layout="grid-auto" data-layout-rows="1fr auto">
							<textarea id="akd-router-editor-textarea-html" class="akd__input-textarea" placeholder="enter html syntax"></textarea>
							<div id="" class="flex gap--4">
								<input id="akd-router-editor-input-checkbox" class="" type="checkbox" name="batchDelete" value="" />
								<input id="akd-router-editor-input-text" class="" type="text" value="" />
								<button id="akd-router-editor-submit-button" class="" type="submit">edit</button>
							</div>
						</div>
					</div>
				</section>
				<span id="akd-router-editor-splitter-handle" class="splitter_handle"></span>
				<section id="akd-router-editor-output" class="splitter_panel second--half">
					<div id="akd-router-editor-preview" class="">
						<iframe id="akd-router-editor-preview-iframe" src="./iframe.php?" frameborder="0" scrolling="yes" sandbox="allow-scripts allow-forms allow-same-origin-"></iframe>
					</div>
				</section>
			</article>`;
			//this.templateString += `<script><%= obj.splitter %></script>`;
			
			this.$on("#template-view", 'routerload', function (e) {
				this.$refresh();
				_.akdSplitter("#akd-router-editor-splitter-handle", "#akd-router-editor-tab", "#akd-router-editor-output", "V");
			}.bind(this));
			//this.$trigger('load').bind(this);
		})
		.route('/welcome', "welcome-template", routes['welcome'])
		.route('/test', "test-template", routes['test'])
		.loadTemplates(newTemplates);
		
	for(let e in newTemplates){
		let t = e.replace('/',''), t_id = t.replace('/','-') +'-template'
		akdRouter.route(e, t_id, newTemplates[e]);
	}
	
	akdRouter.initEvents({albumPhotos: _ALBUMPHOTOS, snippets: _SNIPPETS}).navigateTo(currentRoute||'welcome', templateView, {albumPhotos: _ALBUMPHOTOS, snippets: _SNIPPETS});
	
	const frag = document.createDocumentFragment();
	for(let i in akdRouter.routes){
		let t = i.replace('/',''), t_id = t.replace('/','-') +'-template', 
		li = document.createElement('li'), btn = document.createElement('a');
		btn.href = `#${i}`;
		btn.textContent = t;
		btn.setAttribute(linkId?.replace('[', '').replace(']', '').replace('.', '').replace('#', '') || "data-akd-route-link", true);
		btn.setAttribute(linkId?.replace('[', '').replace(']', '').replace('.', '').replace('#', '').replace('-link', '') || "data-akd-route", i);
		//Object.assign(btn, {"href":`#${i}`});
		li.appendChild(btn);
		frag.appendChild(li);
		
		//console.log(i, akdRouter.routes[i]);
	}
	$one('#router-main-nav').appendChild(frag);
	//Object.assign(akdRouter.routes, routes);
	//(akdRouter.routes)
	_.akdSplitter("#router-main-splitter-handle", "#router-main-splitter-navigation-area", "#router-main-splitter-views-area", "H")
	//_.akdSplitter("#akd-router-editor-splitter-handle", "#akd-router-editor-tab", "#akd-router-editor-output", "V")
	_.enable_akd_tabs_event(templateView);
	//console.log(_$("#main").html())
});
	