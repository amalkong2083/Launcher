import {COMPONENTS_CALLBACK_QUEUE, WINDOWS_CALLBACK_QUEUE, findById, fetchFile, playMedia, showFile, loader, 
	zoomIn, zoomOut, zoomImage, 
	createKeyValuePair, createFormKeyValuePair, keyValuePairsToObject, updateEndTime, updateResponseDetails, 
	updateResponseHeaders, updateResponseContainers, updateResponseEditor, updateResponseJson, elementScrollIndicator,
	domInspector, walk, visualizeElement, drawer, destructure
} from "./modules/utility.module.js";
import AKD_MediaPlayer from "./modules/media.module.js";

async function fetchFile2(url, resType="json", cfg={}, cb) {
	if(!isString(url)) return {};
	//url = url || `${DATA_URL}json/database.json`;
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
function paste(target){
	let $out = $(target);
	if("clipboard" in navigator){
		navigator.clipboard.readText(text.trim())
			.then(text => {
				$out.focus().html(text)
				console.log('Text pasted');
			})
			.catch(() => console.log('Failed to paste text'));
	} else {
		$out.focus();
		document.execCommand("paste");
	}
}
function copy(el){
	let $el = $(el) ;
	const text = $el.val() || $el.text() || $el.html();
	if("clipboard" in navigator){
		navigator.clipboard.writeText(text.trim()).then(() => console.log('Text copied')).catch(() => console.log('Failed to copy text'));
	} else {
		const textArea = document.createElement("textarea");
		textArea.value = text.trim();
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		document.body.removeChild(textArea);
	}
	///////////////////////////////////
	///////////////////////////////////
	let tst = document.createElement('div');
	tst.classList = 'toast ripple';
	tst.innerHTML = 'Snippet copied to clipboard!';
	document.body.appendChild(tst);
	setTimeout(function() {
		tst.style.opacity = 0;
		setTimeout(function() {
			document.body.removeChild(tst);
		}, 300);
	},1700);
}

const $OS = 'linux';
const $AUDIO_PATH = $OS === 'linux' ? '/home/amalkong/Music' : 'C:/User/M/Music/';
const appsWindowsCategoryArray = ['accessories', 'office', 'art-and-graphics', 'administration', 'internet', 'sound-and-video', 'artificial-intelligence', 'ide-and-code-editor', 'game'];
const pluginsArray = [
	{id:'', name: 'adminer', title: '', category: 'administration', source: {icon: 'static/images/icon.png'}, author: {}, status: 0, version: '1.0'}, 
	{id:'', name: 'jPlayer', title: 'jPlayer player', category: 'media', source: {icon: 'static/images/icon.png'}, author: {}, status: 1, version: '1.0'}, 
	{id:'', name: 'DPlayer', title: '', category: 'media', source: {icon: 'static/images/icon.png'}, status: 1, author: {}, version: '1.0'}, 
	{id:'', name: 'zipView', title: 'Archive Preview', category: 'document', source: {icon: 'static/images/icon.png'}, author: {}, status: 1, version: '1.0'}, 
	{id:'', name: 'picasa', title: 'Picasa image', category: 'image', source: {className: 'x-item-file x-png', icon: ''}, author: {}, status: 1, version: '1.0'}, 
	{id:'', name: 'aceEditor', title: 'Ace Editor', category: 'editor', source: {icon: 'static/images/icon.png'}, author: {}, status: 1, version: '1.0'}, 
	{id:'', name: 'VLCPlayer', title: 'VLCPlayer', category: 'media', source: {icon: 'static/images/icon.png'}, author: {}, status: 1, version: '1.0'}, 
	{id:'', name: 'officeLive', title: '', category: 'document', source: {icon: 'static/images/icon.png'}, author: {}, description: '', status: 1, version: '1.0'}
];
const windowsArray = [
	{
		id:'browser-window', name:'browser', icon:`${IMAGES_URL}icons/fileExplorer.png`, type:'', category:'office', ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', 
		attrs:{
			className: "window window-solid window--danger", 
			dataset:{name: 'browser', title: 'browser window', wallpaper: '',}
		},
		sidebar_content: `<div class="history__wrapper toggled">
			<div class="history__wrapper-inner">
				<ul class="history__list">
					<li class="history-entry">
						<a class="history-link ${AJAX_CLASS}" href="${BASE_URL}?action=forms">${BASE_URL}?action=forms</a>
						<span class="history-ops">
							<button class="history-entry-save"><i class="fa fa-save"></i></button>
							<button class="history-entry-copy"><i class="fa fa-copy"></i></button>
							<button class="history-entry-trash"><i class="fa fa-trash"></i></button>
						</span>
					</li>
				</ul>
			</div>
			<div class="history__wrapper-buttons">
				<button id="" class="" type="button"><i class="fa fa-save"></i></button>
				<button id="" class="" type="button"><i class="fa fa-copy"></i></button>
				<button id="" class="" type="button"><i class="fa fa-trash-alt"></i></button>
			</div>
		</div>`,
		body_content: `<div class="p--8 mb--8"><span class="text--900 bdr--8 p--8 bg:opaque">Select An Operation.</span></div>
		<div class="cards gap--4 p--8 flex--justify-center" data-layout="grid" data-layout-cols="3">
			<div class="akd__card offset-card pos--rel w--12 bdr--4 bg--success">
				<span class="akd__card-header-success"><span class="akd__card-header-text">Home</span><i class="fa fa-globe mr--4 akd__card-icon"></i></span>
				<div class="akd__card-body">
					<a class="${AJAX_CLASS} block w--12 h--12 vh--min-2" href="${BASE_URL}app/fragments/ajax/browser.php?action=browse&ajax_target=browser-ajax-window&ajax_target_type=id" data-ajax-target="#browser-ajax-window" data-ajax-target-type="id">
						<i class="fa fa-globe w--12 h--12 flex-place-center text--xxl hidden"></i>
						<span style="background-image: url('${IMAGES_URL}icons/Computer.png');" class="h--12 w--12 flex bg--contain bg--no-repeat bg--center bdr--3"></span>
					</a>
				</div>
				<span class="akd__card-footer akd__card-footer-success">
					<button class="akd__btn btn--" title="configure this operation"><i class="fa fa-cogs"></i></button>
				</span>
			</div>
			<div class="akd__card offset-card pos--rel w--12 bdr--4 bg--info">
				<span class="akd__card-header-info"><span class="akd__card-header-text">Files</span><i class="fa fa-file-alt mr--4 akd__card-icon"></i></span>
				<div class="akd__card-body">
					<a class="${AJAX_CLASS} block w--12 h--12 vh--min-2" href="${BASE_URL}app/fragments/ajax/browser.files.php?action=browse&ajax_target=browser-ajax-window&ajax_target_type=id" data-ajax-target="#browser-ajax-window" data-ajax-target-type="id">
						<i class="fa fa-file-alt w--12 h--12 flex-place-center text--xxl hidden"></i>
						<span style="background-image: url('${IMAGES_URL}icons/portfolio.png');" class="h--12 w--12 flex bg--contain bg--no-repeat bg--center bdr--3"></span>
					</a>
				</div>
				<span class="akd__card-footer akd__card-footer-info">
					<button class="akd__btn btn--" title="configure this operation"><i class="fa fa-cogs"></i></button>
				</span>
			</div>
			<div class="akd__card offset-card pos--rel w--12 bdr--4 bg--purple">
				<span class="akd__card-header-purple"><span class="akd__card-header-text">Folders</span><i class="fa fa-folder-open mr--4 akd__card-icon"></i></span>
				<div class="akd__card-body">
					<a class="${AJAX_CLASS} block w--12 h--12 vh--min-2" href="${BASE_URL}app/fragments/ajax/browser.folders.php?action=browse&ajax_target=browser-ajax-window&ajax_target_type=id" data-ajax-target="#browser-ajax-window" data-ajax-target-type="id">
						<i class="fa fa-folder-open w--12 h--12 flex-place-center text--xxl hidden"></i>
						<span style="background-image: url('${IMAGES_URL}icons/filemanager.png');" class="h--12 w--12 flex bg--contain bg--no-repeat bg--center bdr--3"></span>
					</a>
				</div>
				<span class="akd__card-footer akd__card-footer-purple">
					<button class="akd__btn btn--" title="configure this operation"><i class="fa fa-cogs"></i></button>
				</span>
			</div>
			<div class="akd__card offset-card pos--rel w--12 bdr--4 bg--warning">
				<span class="akd__card-header-warning"><span class="akd__card-header-text">FTP</span><i class="fa fa-braille mr--4 akd__card-icon"></i></span>
				<div class="akd__card-body">
					<a class="${AJAX_CLASS} block w--12 h--12 vh--min-2" href="${BASE_URL}app/fragments/ajax/browser.ftp.php?action=browse&ajax_target=browser-ajax-window&ajax_target_type=id" data-ajax-target="#browser-ajax-window" data-ajax-target-type="id">
						<i class="fa fa-braille w--12 h--12 flex-place-center text--xxl hidden"></i>
						<span style="background-image: url('${IMAGES_URL}icons/system_domain_names.png');" class="h--12 w--12 flex bg--contain bg--no-repeat bg--center bdr--3"></span>
					</a>
				</div>
				<span class="akd__card-footer akd__card-footer-warning">
					<button class="akd__btn btn--" title="configure this operation"><i class="fa fa-cogs"></i></button>
				</span>
			</div>
		</div>`,
		/* sidebar_links: [
			{title: 'Home', href: BASE_URL + 'app/fragments/ajax/browser.php', ajaxClass: AJAX_CLASS, ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-globe"></i>'},
			{title: 'Files', href: BASE_URL + 'app/fragments/ajax/browser.files.php', ajaxClass: AJAX_CLASS, ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-hashtag"></i>'},
		], */
		components: [
			{id: 'browser-body-component',type: 'bodyComponent',structure: '{{--body--}}'/* addComponent({ // TODO: fix this because, Adding a component here returns undefined
					type: 'navComponent', 
					location: 'body', 
					nav_links: [
						{title: 'Home', href:  `${BASE_URL}app/fragments/ajax/browser.php?action=browse&ajax_target=browser-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-globe"></i>'},
						{title: 'Files', href: `${BASE_URL}app/fragments/ajax/browser.files.php?action=browse&type=files&ajax_target=browser-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-file"></i>'},
						{title: 'Folders', href: `${BASE_URL}app/fragments/ajax/browser.folders.php?action=browse&type=folders&ajax_target=browser-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-folder"></i>'},
					]
				}) */
			},
			{id: 'browser-nav-component',type: 'navComponent', nav_links: [
				{title: 'Home', href:  `${BASE_URL}app/fragments/ajax/browser.php?action=browse&ajax_target=browser-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-globe"></i>'},
				{title: 'Files Browser', href: `${BASE_URL}app/fragments/ajax/browser.files.php?action=browse&type=files&ajax_target=browser-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-file"></i>'},
				{title: 'Folders Browser', href: `${BASE_URL}app/fragments/ajax/browser.folders.php?action=browse&type=folders&ajax_target=browser-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-folder"></i>'},
				{title: 'FTP Browser', href: `${BASE_URL}app/fragments/ajax/browser.ftp.php?action=browse&type=folders&ajax_target=browser-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-braille"></i>'},
			]},
			{id: 'browser-search-component',type: 'searchComponent', ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id',
				datalist : [
					[BASE_URL + 'app/fragments/ajax/browser.php?action=browse&filePath=./&ajax_target=browser-ajax-window&ajax_target_type=id' , 'root'],
					[BASE_URL + 'app/fragments/ajax/browser.php?action=browse&filePath=C:/xampp/htdocs/www/&ajax_target=browser-ajax-window&ajax_target_type=id' , '/www/'],
					[BASE_URL + 'app/fragments/ajax/browser.php?action=browse&filePath=C:/xampp/htdocs/www/_data/&ajax_target=browser-ajax-window&ajax_target_type=id' , '/www/_data/']
				]
			},
			{id: 'browser-splitter-component',type: 'splitterComponent',min:'0',max: '100',step: '1',value: '50',target: '#files-folders-block'},
		],
		wallpaper: 'bg--samurai', 
		config:{
			shortcut: {add_to_dextop: true, display_title: true, icon_size: 'default', expand_on_click: false}, 
			'window': {dimensions:'[\'50%\',\'50%\']'}
		},
		callbacks: ($) => {
			//elementScrollIndicator('#browser-container', '#browser-scroll-indicator')
			//const { Configuration, OpenAIApi } = require('openai');
			$('#browser-search-component-search-component-button').click(function(e){
			//$(".search-component").on("submit",function(e){
				e.preventDefault();
				let $url = '', $targetElem = isElement(this) ? this : e.target, 
				$parent = $targetElem.parentElement, $input = $.one('input',$parent)
				if($.isElement($input)) $url = $input.value;
				else $url = $('#browser-search-component-search-component-input').val();
				console.log($url)
				$.get({
					url: $url,
					//data : formdata,
					/* success: data => {
						let $ajax_target = $targetElem.dataset.ajaxTarget;
						//if(!$targetElem.classList.contains("history-link")) addToHistory($url,$ajax_target)
						loader($($ajax_target), data, 1000)
					},
					error: err => {} */
				})
				.success(data => {
					let $ajax_target = $targetElem.dataset.ajaxTarget;
					//if(!$targetElem.classList.contains("history-link")) addToHistory($url,$ajax_target)
					loader($($ajax_target), data, 1000)
				})
				.fail(e => console.error('fail',e))
			})
		}, 
		cell_id:1
	},
	{
		id:'terminal-window', name:'terminal', icon:`${IMAGES_URL}icons/terminal.png`, type:'', category:'administration', ajaxTarget: '#terminal-ajax-window', ajaxTargetType: 'id',
		attrs: '',
		components: [
			{id: 'terminal',type: 'searchComponent', ajaxTarget: '#terminal-ajax-window', ajaxTargetType: 'id'},
			{id: 'terminal',type: 'navComponent', nav_links: [
				{title: 'bash', href: BASE_URL + 'app/fragments/ajax/terminal.php', ajaxClass: AJAX_CLASS, ajaxTarget: '#terminal-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-terminal"></i>'},
				{title: 'cli', href: BASE_URL + 'app/fragments/ajax/terminal.cli.php', ajaxClass: AJAX_CLASS, ajaxTarget: '#terminal-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-hashtag"></i>'},
			]},
			{id: 'terminal-splitter-component',type: 'splitterComponent',min:'0',max: '100',step: '1',value: '50',target: '#files-folders-block'},
		],
		wallpaper: '', 
		config:{
			shortcut: {add_to_dextop: true, display_title: true, icon_size: 'default', expand_on_click: false}, 
			'window': {dimensions:''}
		},
		cell_id:2
	},
	{id:'settings-window', name:'settings', icon:`${IMAGES_URL}icons/settings.svg`, type:'', category:'administration', ajaxTarget: '#settings-ajax-window', ajaxTargetType: 'id',
		attrs:{
			className: "window window--purple", 
			dataset:{name: 'settings', title: 'settings window', wallpaper: '', 'side-placement':'right'}
		},
		//wallpaper: 'bg--samurai', 
		wallpaper: {
			backgroundImage: `${IMAGES_URL}wallpapers/404.jpg`, 
			backgroundColor: '', 
			backgroundSize: 'cover', 
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'local',
			backgroundPosition: 'center center',
			backgroundBlendMode: 'normal',
		}, 
		config:{
			shortcut: {add_to_dextop: true, display_title: false, icon_size: 'default', expand_on_click: false}, 
			'window': {dimensions:'', }
		},
		cell_id:3
	},
	{id:'modules-window', name:'modules', icon:`${IMAGES_URL}icons/plugins.png`, type:'', category:'administration', ajaxTarget: '#modules-ajax-window', ajaxTargetType: 'id',
		attrs: '',
		wallpaper: '', 
		config:{
			shortcut: {add_to_dextop: true, display_title: false, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'', }
		},
		cell_id:4
	},
	{id:'media-window', name: 'media', icon: `${IMAGES_URL}icons/media.png`, type: '', category:'sound-and-video', ajaxTarget: '#media-ajax-window', ajaxTargetType: 'id',
		attrs:{
			className: "window window-solid window--info", 
			//dataset:{name: 'browser', title: 'browser window', wallpaper: '',}
		},
		sidebar_content: `
			<div class="" data-layout="flex" data-layout-gap="4" data-layout-flow="col" data-layout-breakpoint="500">
				{{--media-component:playlist--}}
			</div>
			<div class="" data-layout="flex" data-layout-gap="4" data-layout-flow="col">
				{{--media-component:playlist--}}
			</div>
		`, 
		body_content: `
		<section class="loading-wrapper">
			<div class="loading-bg"></div>
			<div class="loading-text">0%</div>
		</section>
		<!-- <h6 class="h3">media</h6>-->
		<!-- loading playlists and media elements (audio & video) -->
		<!--<section class="media-section-wrapper h--6 w--12 p--4 overflow--auto" data-layout="grid" data-layout-cols="2" data-layout-gap="4">
			<div class="" data-layout="flex" data-layout-gap="4" data-layout-flow="col" data-layout-breakpoint="500">
				<span class="flex flex--center gap--4">
					<button id="{id}-media-component-button" class="flex-s-2" name="{id}-media-component-button" type="submit" ><i class="fa fa-search"></i></button>
				</span>
				<div class="component media-component flex gap--4 nowrap w--lg-12 w--md-12 w--s-12 w--sm-12 w--xs-12">
					<div id="{id}-media-component-playlist" class="playlist flex flex--col flex--center w--lg-6 w--md-6 w--s-6 w--sm-12 w--xs-12 gap--4">
						{{--media-component:audio::playlist/--}}
					</div>
					<div id="{id}-media-component-player-wrapper" class="media-component-player-wrapper flex flex--center w--lg-6 w--md-6 w--s-6 w--sm-12 w--xs-12 gap--4">
						{{--media-component:video::playlist/--}}
					</div>
				</div>
			</div>
		</section>-->
		
		<div id="media-splitter-1" class="splitter vertical flex nowrap h--12 p--4 pos--rel overflow--hidden" data-ratio="30:70">
			<!-- loading only playlists (audio & video) -->
			<section id="media-splitter-panel-1" class="splitter_panel first--half media-section-wrapper h--6 w--12 p--4 overflow--auto" data-layout="grid" data-layout-cols="2" data-layout-gap="4">
				<div class="" data-layout="flex" data-layout-gap="4" data-layout-flow="col" data-layout-breakpoint="500">
					{{--media-component:playlist--}}
				</div>
				<div class="" data-layout="flex" data-layout-gap="4" data-layout-flow="col">
					{{--media-component:playlist--}}
				</div>
			</section>
			
			<span id="media-splitter-handle-1" class="splitter_handle"></span>
			
			<!-- loading only media elements (audio & video) -->
			<section id="media-splitter-panel-2" class="splitter_panel second--half media-section-wrapper h--6 w--12 overflow--auto" data-layout="grid" data-layout-row="2" data-layout-gap="4">
				<div class="media-component-player-wrapper audio p--4 pos--abs" data-layout="flex" data-layout-gap="4" data-layout-flow="col">
					<div class="media-button overlay-play-button" data-media-parent="#media-splitter-1" data-media-target="#media-splitter-1 .media-component-player-wrapper.toggled .media-element"><i class="fa fa-play"></i></div>
					<div class="media-wrapper pos--abs w--12 h--12">
						<div class="media-art-wrapper w--12 h--12">
							<div class="media-art" style="background-image: url('https://ui.akd/_ui-content/developer-tabs/app/assets/img/album-art.png');"></div>
						</div>
						{{--media-component:audio--}}
					</div>
				</div>
				<div class="media-component-player-wrapper video toggled p--4 pos--abs">
					<div class="flex-align-center gap--2 p--4 text--center overflow--auto-x bg--info-gradient">
						<div class="flex flex--col">
							<span class="flex-align-center ml--auto font--small">repeat?</span>
							<div class="onoffswitch ml--1">
								<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="repeat_onoffswitch" data-dextop-input>
								<label class="onoffswitch-label" for="repeat_onoffswitch">
									<div class="onoffswitch-inner">
										<div class="onoffswitch-active">
											<div class="onoffswitch-switch">ON</div>
										</div>
										<div class="onoffswitch-inactive">
											<div class="onoffswitch-switch">OFF</div>
										</div>
									</div>
								</label>
							</div>
						</div>
						<div class="flex flex--col">
							<span class="flex-align-center ml--auto font--small">autoplay?</span>
							<div class="onoffswitch ml--1">
								<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="autoplay_onoffswitch" data-dextop-input>
								<label class="onoffswitch-label" for="autoplay_onoffswitch">
									<div class="onoffswitch-inner">
										<div class="onoffswitch-active">
											<div class="onoffswitch-switch">ON</div>
										</div>
										<div class="onoffswitch-inactive">
											<div class="onoffswitch-switch">OFF</div>
										</div>
									</div>
								</label>
							</div>
						</div>
						
						<div class="flex flex--col">
							<span class="flex-align-center ml--auto font--small">object fit</span>
							<div class="flex-align-center ml--1 gap--2 w--3">
								<select class="py--3 w--auto" id="object-fit-select" name="object-fit-select" data-media-target="#media-splitter-1 .media-component-player-wrapper.toggled .media-element" onchange="let target = $one(this.dataset.mediaTarget);target.style.objectFit = this.value;" data-dextop-input>
									<option value="none">none</option>
									<option value="cover">cover</option>
									<option value="contain">contain</option>
									<option value="scale-down">scale-down</option>
									<option value="fill">fill</option>
									<option value="initial">initial</option>
									<option value="inherit">inherit</option>
									<option value="revert">revert</option>
								</select>
							</div>
						</div>
						
						<div class="flex flex--col w--auto">
							<span class="flex-align-center ml--auto font--small">aspect ratio</span>
							<div class="flex-align-center ml--1 gap--2 w--6">
								<input class="py--2 w--6" id="aspect-ratio-left-val" name="aspect-ratio-left-val" type="number" step="1" min="1" max="235" value="1" data-media-target="#media-splitter-1 .media-component-player-wrapper.toggled .media-element" onchange="let target = $one(this.dataset.mediaTarget), left_val = this.value, right_val = $one('#aspect-ratio-right-val').value;target.style.aspectRatio = left_val+'/'+right_val;" data-dextop-input />
								<input class="py--2 w--6" id="aspect-ratio-right-val" name="aspect-ratio-right-val" type="number" step="1" min="1" max="15" value="1" data-media-target="#media-splitter-1 .media-component-player-wrapper.toggled .media-element" onchange="let target = $one(this.dataset.mediaTarget), left_val = $one('#aspect-ratio-left-val').value, right_val = this.value;target.style.aspectRatio = left_val+'/'+right_val;" data-dextop-input />
							</div>
						</div>
					</div>
					
					<div class="flex-align-center h--12 my--0 p--0 overflow--auto-y">
						{{--media-component:video--}}
					</div>
				</div>
			</section>
			<div class="player-controls show-onhover pos--abs bottom-0 w--12 h--max to-front bg--info-gradient">
				<div class="control-bar main-control">
					<div class="start-bar media-details">
						<div class="media-thumbnail" style="background-image:url('{{ artwork }}');"></div>
						<div class="media-meta">
							<span class="media-title">{{ trunc_title }}</span>
							<span class="media-presenter">{{ user }}</span>
						</div>
					</div>
					<div class="middle-bar controls">
						<div class="flex-place-center">
							<button id="skip-backward-button" class="media-button skip-backward-button btn--inherit" title="Skip to back 10 seconds" data-tooltip="Skip Back" data-media-parent="#media-splitter-1" data-media-target="#media-splitter-1 .media-component-player-wrapper.toggled .media-element" data-seek-by="10"><i class="fa fa-fast-backward"></i></button>
							<button id="previous-media-button" class="media-button previous-media-button btn--inherit" title="Skip to previous media" data-tooltip="Previous" data-media-target="#media-splitter-1 .media-component-player-wrapper.toggled .media-element"><i class="fa fa-step-backward"></i></button>
							<button id="play-pause-button" class="media-button play-pause-button btn--inherit mx--2" title="Play media" data-tooltip="Play" data-media-parent="#media-splitter-1" data-media-target="#media-splitter-1 .media-component-player-wrapper.toggled .media-element"><i class="fa fa-play"></i></button>
							<button id="next-media-button" class="media-button next-media-button btn--inherit" title="Skip to next media" data-tooltip="Next" data-media-target="#media-splitter-1 .media-component-player-wrapper.toggled .media-element"><i class="fa fa-step-forward"></i></button>
							<button id="skip-forward-button" class="media-button skip-forward-button btn--inherit" title="Skip to forward 10 seconds" data-tooltip="Skip Forward" data-media-parent="#media-splitter-1" data-media-target="#media-splitter-1 .media-component-player-wrapper.toggled .media-element" data-seek-by="10"><i class="fa fa-fast-forward"></i></button>
						</div>
						<span class="playback-bar">
							<span class="current-time">00:00</span>
							<span class="seek-wrapper">
								<input id="" class="seek-slider" type="range" min="0" max="" step="1" value="0" data-dextop-input />
							</span>
							<span class="duration-time">00:00</span>
						</span>
					</div>
					<div class="end-bar flex-place-center">
						<button id="" class="media-button show-queue-button btn--inherit" title="Show Playlists" data-tooltip="Show Playlists" data-dextop-button><i class="fa fa-list"></i></button>
						<button id="" class="media-button connect-devices-button btn--inherit" title="Show Playlists" data-tooltip="Show Playlists" data-dextop-button><i class="fa fa-clipboard"></i></button>
						<span class="volume-wrapper flex-place-center mx--2">
							<span id="" class="volume-level-idicator mr--1" title="" data-tooltip="Current Volume: 40%"><i class="fa fa-volume-low"></i></span>
							<input id="" class="volume-slider" type="range" min="0" max="1" step="0.1" value="0.4" data-dextop-input />
						</span>
						<button id="" class="media-button fullscreen-button btn--inherit" title="Toggle Fullscreen" data-tooltip="Enter Fullscreen?" data-dextop-button><i class="fa fa-expand-arrows-alt"></i><!-- <i class="fa fa-compress-arrows-alt"></i> --></button>
					</div>
				</div>
			</div>
			
		</div>
		`,
		components: [
			//NOTE: if loading a playlist without a media element, use the [attach_to] property to specify another media element to use
			{parent_window_id:'media-window', id: 'audio-media-component1', type: 'mediaComponent', attach_to: 'audio-media-component2', media_type:'audio', has_playlist: true, 
				datalist : [
					['woxh' , '21 Savage x Metro Boomin - Brand New Draco.mp3', 'Brand New Draco', `${BASE_AUDIO_URL}?action=stream&filePath=${$AUDIO_PATH}21 Savage\/&fileName=21 Savage x Metro Boomin - Brand New Draco.mp3&mimeType=audio/mp3`, 'audio/mp3', false, false, false, true],
					['xjdh', '450 - Purge.mp3' , 'Purge', `${BASE_AUDIO_URL}?action=stream&filePath=${$AUDIO_PATH}&fileName=450 - Purge.mp3&mimeType=audio/mp3`, 'audio/mp3', false, false, false, true],
					['ndty', 'SAINt JHN - THE BEST PART OF LIFE.mp3' , 'THE BEST PART OF LIFE', `${BASE_AUDIO_URL}?action=stream&filePath=${$AUDIO_PATH}&fileName=SAINt JHN - THE BEST PART OF LIFE.mp3&mimeType=audio/mp3`, 'audio/mp3', false, false, false, true]
				]
			}, 
			{parent_window_id:'media-window', id: 'video-media-component1',type: 'mediaComponent', attach_to: 'video-media-component2', media_type:'video', has_playlist: true, 
				playlist : [
					{'id': 2390, 'name': 'thick_ass_jamaican_girl_yaride_a_murder_dem.mp4', 'title': 'Thick Ass Jamaican Girl Yaride a Murder Dem', 'url': `${BASE_VIDEO_URL}thick_ass_jamaican_girl_yaride_a_murder_dem.webm`, mimetype: 'video/webm', poster: '', muted: false, autoplay: false, loop: false, controls: true, video_click_play_toggle: true},
					{'id': 1134, 'name': 'twerking2.mp4', 'title': 'Mad gyal in Mobay', 'url': `${BASE_VIDEO_URL}twerking2.mp4`, mimetype: 'video/mp4', poster: '', muted: false, autoplay: false, loop: false, controls: true, video_click_play_toggle: true},
					{'id': 3903, 'name': 'VID-20181116-WA0005.mp4', 'title': 'Life Lessons', 'url': `${BASE_VIDEO_URL}VID-20181116-WA0005.mp4`,  mimetype: 'video/mp4', poster: '', muted: false, autoplay: false, loop: false, controls: true, video_click_play_toggle: true}
				]
			}, 
			{parent_window_id:'media-window', id: 'audio-media-component2',type: 'mediaComponent', media_type:'audio', has_playlist: false, src: `${BASE_AUDIO_URL}?filePath=${$AUDIO_PATH}&fileName=450 - Purge.mp3&mimeType=audio/mp3`, mimetype: 'audio/mp3', muted: false, autoplay: false, loop: false, controls: true}, 
			{parent_window_id:'media-window', id: 'video-media-component2',type: 'mediaComponent', media_type:'video', has_playlist: false, src: `${BASE_VIDEO_URL}twerking2.mp4`, mimetype: 'video/mp4', poster: '', muted: false, autoplay: false, loop: false, controls: true, video_click_play_toggle: true}, 
			{parent_window_id:'media-window', id: 'media-search-component',type: 'searchComponent', ajaxTarget: '#media-ajax-window', ajaxTargetType: 'id',
				/* datalist : [
					[BASE_URL + 'app/fragments/ajax/tools.php?action=browse&ajax_target=tools-ajax-window&ajax_target_type=id' , 'root'],
					[BASE_URL + 'app/fragments/ajax/tools.php?action=browse&ajax_target=tools-ajax-window&ajax_target_type=id' , '/www/'],
					[BASE_URL + 'app/fragments/ajax/tools.php?action=browse&ajax_target=tools-ajax-window&ajax_target_type=id' , '/www/_data/']
				] */
			}
		],
		//wallpaper: 'bg--samurai', 
		wallpaper: {
			backgroundImage: `${IMAGES_URL}wallpapers/mike-howie-energyfield-01.jpg`, 
			backgroundColor: '', 
			backgroundSize: 'cover', 
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'local',
			backgroundPosition: 'center center',
			backgroundBlendMode: 'normal',
		}, 
		config:{
			shortcut: {add_to_dextop: true, display_title: false, icon_size: 'default', expand_on_click: false}, 
			'window': {dimensions: '', }
		},
		cell_id:5
	},
	{id:'media2-window', name: 'media2', icon: `${IMAGES_URL}icons/movies.png`, type: '', category:'sound-and-video', ajaxTarget: '#media2-ajax-window', ajaxTargetType: 'id',
		attrs:{
			className: "window window-solid window--purple", 
			//dataset:{name: 'browser', title: 'browser window', wallpaper: '',}
		},
		sidebar_content: `
			<div class="" data-layout="flex" data-layout-gap="4" data-layout-flow="col" data-layout-breakpoint="500">
				{{--media-component:playlist--}}
			</div>
			<div class="" data-layout="flex" data-layout-gap="4" data-layout-flow="col">
				{{--media-component:playlist--}}
			</div>
		`, 
		body_content: `
		<section class="loading-wrapper">
			<div class="loading-bg"></div>
			<div class="loading-text">0%</div>
		</section>
		
		<div id="media2-splitter-1" class="splitter vertical flex nowrap h--12 p--4 pos--rel overflow--hidden" data-ratio="95:5">
			<!-- loading only playlists (audio & video) -->
			<section id="media2-splitter-panel-1" class="splitter_panel first--half media2-section-wrapper h--6 w--12 p--4 overflow--auto overflow-hidden-on-minimized" data-layout="grid" data-layout-cols="auto" data-layout-gap="4" style="grid-template-rows: 1fr auto; grid-template-columns: 100%;">
				<div id="" class="pos--rel h--12 overflow--hidden">
					<div class="media-component-player-wrapper audio p--4 pos--abs w--12 h--12 p--4 overflow--auto" data-layout="flex" data-layout-gap="4" data-layout-flow="col">
						<div class="media-button overlay-play-button" data-media-parent="#media2-splitter-1" data-media-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-element"><i class="fa fa-play"></i></div>
						<div id="media2-audio-playlist-wrapper" class="media-playlist-wrapper pos--abs w--12 h--12 p--4 overflow--auto">
							<div class="h--12" data-layout="flex" data-layout-gap="4" data-layout-flow="col" data-layout-breakpoint="500">
								{{--media-component:playlist--}}
							</div>
						</div>
						
						<div class="media-wrapper pos--abs w--12 h--12">
							<div class="media-art-wrapper w--12 h--12">
								<div class="media-art" style="background-image: url('https://ui.akd/_ui-content/developer-tabs/app/assets/img/album-art.png');"></div>
							</div>
							{{--media-component:audio--}}
						</div>
					</div>
					
					<div class="media-component-player-wrapper video toggled p--0 pos--abs overflow--hidden" style="grid-template-rows: 5rem calc(100% - 5rem);">
						<div class="flex-align-center gap--2 pos--rel h--max p--4 text--center overflow--auto-x bg--info-gradient">
							<div class="flex flex--col">
								<span class="flex-align-center ml--auto font--small">repeat?</span>
								<div class="onoffswitch ml--1">
									<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="repeat_onoffswitch" data-dextop-input>
									<label class="onoffswitch-label" for="repeat_onoffswitch">
										<div class="onoffswitch-inner">
											<div class="onoffswitch-active">
												<div class="onoffswitch-switch">ON</div>
											</div>
											<div class="onoffswitch-inactive">
												<div class="onoffswitch-switch">OFF</div>
											</div>
										</div>
									</label>
								</div>
							</div>
							<div class="flex flex--col">
								<span class="flex-align-center ml--auto font--small">autoplay?</span>
								<div class="onoffswitch ml--1">
									<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="autoplay_onoffswitch" data-dextop-input />
									<label class="onoffswitch-label" for="autoplay_onoffswitch">
										<div class="onoffswitch-inner">
											<div class="onoffswitch-active">
												<div class="onoffswitch-switch">ON</div>
											</div>
											<div class="onoffswitch-inactive">
												<div class="onoffswitch-switch">OFF</div>
											</div>
										</div>
									</label>
								</div>
							</div>
							
							<div class="flex flex--col">
								<span class="flex-align-center ml--auto font--small">object fit</span>
								<div class="flex-align-center ml--1 gap--2 w--3">
									<select class="py--3 w--auto" id="object-fit-select" name="object-fit-select" data-media-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-element" onchange="let target = $one(this.dataset.mediaTarget);target.style.objectFit = this.value;" data-dextop-input>
										<option value="none">none</option>
										<option value="cover">cover</option>
										<option value="contain">contain</option>
										<option value="scale-down">scale-down</option>
										<option value="fill">fill</option>
										<option value="initial">initial</option>
										<option value="inherit">inherit</option>
										<option value="revert">revert</option>
									</select>
								</div>
							</div>
							
							<div class="flex flex--col w--auto">
								<span class="flex-align-center ml--auto font--small">aspect ratio</span>
								<div class="flex-align-center ml--1 gap--2 w--6">
									<input class="py--2 w--6" id="aspect-ratio-left-val" name="aspect-ratio-left-val" type="number" step="1" min="1" max="235" value="1" data-media-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-element" onchange="let target = $one(this.dataset.mediaTarget), left_val = this.value, right_val = $one('#aspect-ratio-right-val').value;target.style.aspectRatio = left_val+'/'+right_val;" data-dextop-input />
									<input class="py--2 w--6" id="aspect-ratio-right-val" name="aspect-ratio-right-val" type="number" step="1" min="1" max="15" value="1" data-media-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-element" onchange="let target = $one(this.dataset.mediaTarget), left_val = $one('#aspect-ratio-left-val').value, right_val = this.value;target.style.aspectRatio = left_val+'/'+right_val;" data-dextop-input />
								</div>
							</div>
						</div>
						
						<div id="media2-video-playlist-wrapper" class="media-playlist-wrapper pos--abs w--12 h--12 p--4 overflow--auto">
							<div class="h--12" data-layout="flex" data-layout-gap="4" data-layout-flow="col" data-layout-breakpoint="500">
								{{--media-component:playlist--}}
							</div>
						</div>
						<div class="media-wrapper pos--rel w--12 h--12">
							<div class="flex-align-center h--12 my--0 p--0 overflow--auto-y">
								{{--media-component:video--}}
							</div>
						</div>
					</div>
				</div>
				
				<div class="player-controls show-onhover- pos--rel bottom-0 w--12 h--max to-front bg--info-gradient">
					<div class="control-bar main-control">
						<div class="start-bar media-details">
							<div class="media-thumbnail" style="background-image:url('{{ artwork }}');"></div>
							<div class="media-meta">
								<span class="media-title">{{ trunc_title }}</span>
								<span class="media-presenter">{{ user }}</span>
							</div>
						</div>
						<div class="middle-bar controls">
							<div class="flex-place-center">
								<button id="skip-backward-button" class="media-button skip-backward-button btn--inherit" title="Skip to back 10 seconds" data-tooltip="Skip Back" data-media-parent="#media2-splitter-1" data-media-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-element" data-seek-by="10" data-dextop-button><i class="fa fa-fast-backward"></i></button>
								<button id="previous-media-button" class="media-button previous-media-button btn--inherit" title="Skip to previous media" data-tooltip="Previous" data-media-parent="#media2-splitter-1" data-media-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-element" data-dextop-button><i class="fa fa-step-backward"></i></button>
								<button id="play-pause-button" class="media-button play-pause-button btn--inherit mx--2" title="Play media" data-tooltip="Play" data-media-parent="#media2-splitter-1" data-media-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-element" data-dextop-button><i class="fa fa-play"></i></button>
								<button id="next-media-button" class="media-button next-media-button btn--inherit" title="Skip to next media" data-tooltip="Next" data-media-parent="#media2-splitter-1" data-media-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-element" data-dextop-button><i class="fa fa-step-forward"></i></button>
								<button id="skip-forward-button" class="media-button skip-forward-button btn--inherit" title="Skip to forward 10 seconds" data-tooltip="Skip Forward" data-media-parent="#media2-splitter-1" data-media-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-element" data-seek-by="10" data-dextop-button><i class="fa fa-fast-forward"></i></button>
							</div>
							<span class="playback-bar">
								<span class="current-time">00:00</span>
								<span class="seek-wrapper">
									<input id="" class="seek-slider" type="range" min="0" max="" step="1" value="0" data-dextop-input />
								</span>
								<span class="duration-time">00:00</span>
							</span>
						</div>
						<div class="end-bar flex-place-center gap--2">
							<span class="flex-place-center gap--2">
								<button id="" class="media-button toggle-playlist-button btn--inherit" title="Show Playlists" data-tooltip="Show Playlists" data-target="#media2-splitter-1 .media-component-player-wrapper.toggled .media-playlist-wrapper" data-dextop-button><i class="fa fa-list"></i></button>
								<button id="" class="media-button show-queue-button btn--inherit" title="Show Queue" data-tooltip="Show Queue" data-dextop-button><i class="fa fa-clipboard"></i></button>
								<button id="" class="media-button connect-devices-button btn--inherit" title="Connect Devices" data-tooltip="Connect Devices" data-dextop-button><i class="fa fa-list"></i></button>
							</span>
							<span class="volume-wrapper flex-place-center gap--1 mx--2">
								<span id="" class="volume-level-idicator mr--1" title="" data-tooltip="Current Volume: 40%"><i class="fa fa-volume-low"></i></span>
								<input id="" class="volume-slider" type="range" min="0" max="1" step="0.1" value="0.4" data-dextop-input />
							</span>
							<button id="" class="media-button fullscreen-button btn--inherit" title="Toggle Fullscreen" data-tooltip="Enter Fullscreen?" data-dextop-button><i class="fa fa-expand-arrows-alt"></i><!-- <i class="fa fa-compress-arrows-alt"></i> --></button>
						</div>
					</div>
				</div>
			</section>
			
			<span id="media2-splitter-handle-1" class="splitter_handle"></span>
			
			<!-- loading only media elements (audio & video) -->
			<section id="media2-splitter-panel-2" class="splitter_panel second--half media2-section-wrapper h--6 w--12 overflow--auto" data-layout="grid" data-layout-row="2" data-layout-gap="4">
				<div class="" data-layout="flex" data-layout-gap="4" data-layout-flow="col">
					
				</div>
			</section>
		</div>`,
		components: [
			//NOTE: if loading a playlist without a media element, use the [attach_to] property to specify another media element to use
			{parent_window_id:'media2-window', id: 'audio-media2-component1', type: 'mediaComponent', attach_to: 'audio-media2-component2', media_type:'audio', has_playlist: true, 
				/* datalist : [
					['woxh' , '21 Savage x Metro Boomin - Brand New Draco.mp3', 'Brand New Draco', `${BASE_AUDIO_URL}?action=stream&filePath=${$AUDIO_PATH}21 Savage\/&fileName=21 Savage x Metro Boomin - Brand New Draco.mp3&mimeType=audio/mp3`, 'audio/mp3', `https://localhost/www/resources/IMG/IMG_20210712_003317_591.jpg`, `${IMAGES_URL}album-art/`, false, false, false, true],
					['xjdh', '450 - Purge.mp3' , 'Purge', `${BASE_AUDIO_URL}?action=stream&filePath=${$AUDIO_PATH}&fileName=450 - Purge.mp3&mimeType=audio/mp3`, 'audio/mp3', `https://localhost/www/resources/IMG/purge.jpg`, false, false, false, true],
					['ndty', 'SAINt JHN - THE BEST PART OF LIFE.mp3' , 'THE BEST PART OF LIFE', `${BASE_AUDIO_URL}?action=stream&filePath=${$AUDIO_PATH}&fileName=SAINt JHN - THE BEST PART OF LIFE.mp3&mimeType=audio/mp3`, 'audio/mp3', `https://localhost/www/resources/IMG/quote-4.jpg`, false, false, false, true]
				] */
				playlist : [
					{'id': 'woxh' , 'name': '21 Savage x Metro Boomin - Brand New Draco.mp3', 'title': 'Brand New Draco', 'artist': '21 Savage x Metro Boomin', 'url': `${BASE_AUDIO_URL}?action=stream&filePath=${$AUDIO_PATH}21 Savage\/&fileName=21 Savage x Metro Boomin - Brand New Draco.mp3&mimeType=audio/mp3`, mimetype: 'audio/mp3', artwork: `http://localhost/www/resources/IMG/IMG_20210712_003317_591.jpg`,/*  artwork: `${IMAGES_URL}album-art/`, */ muted: false, autoplay: false, loop: false, controls: true},
					{'id': 'xjdh', 'name': '450 - Purge.mp3' , 'title': 'Purge', 'artist': '450', 'url': `${BASE_AUDIO_URL}?action=stream&filePath=${$AUDIO_PATH}&fileName=450 - Purge.mp3&mimeType=audio/mp3`, mimetype: 'audio/mp3', artwork: `http://localhost/www/resources/IMG/purge.jpg`, muted: false, autoplay: false, loop: false, controls: true},
					{'id': 'ndty', 'name': 'SAINt JHN - THE BEST PART OF LIFE.mp3' , 'title': 'THE BEST PART OF LIFE', 'artist': 'SAINt JHN', 'url': `${BASE_AUDIO_URL}?action=stream&filePath=${$AUDIO_PATH}&fileName=SAINt JHN - THE BEST PART OF LIFE.mp3&mimeType=audio/mp3`, mimetype: 'audio/mp3', artwork: `http://localhost/www/resources/IMG/quote-4.jpg`, muted: false, autoplay: false, loop: false, controls: true}
				]
			}, 
			{parent_window_id:'media2-window', id: 'video-media2-component1',type: 'mediaComponent', attach_to: 'video-media2-component2', media_type:'video', has_playlist: true, 
				playlist : [
					{'id': 2390, 'name': 'thick_ass_jamaican_girl_yaride_a_murder_dem.mp4', 'title': 'Thick Ass Jamaican Girl Yaride a Murder Dem', 'actors': 'Yaride', 'url': `${BASE_VIDEO_URL}thick_ass_jamaican_girl_yaride_a_murder_dem.webm`, mimetype: 'video/webm', poster: '', muted: false, autoplay: false, loop: false, controls: true, video_click_play_toggle: true},
					{'id': 1134, 'name': 'twerking2.mp4', 'title': 'Mad gyal in Mobay', 'actors': '', 'url': `${BASE_VIDEO_URL}twerking2.mp4`, mimetype: 'video/mp4', poster: '', muted: false, autoplay: false, loop: false, controls: true, video_click_play_toggle: true},
					{'id': 3903, 'name': 'VID-20181116-WA0005.mp4', 'title': 'Life Lessons', 'actors': '', 'url': `${BASE_VIDEO_URL}VID-20181116-WA0005.mp4`,  mimetype: 'video/mp4', poster: '', muted: false, autoplay: false, loop: false, controls: true, video_click_play_toggle: true}
				]
			}, 
			{parent_window_id:'media2-window', id: 'audio-media2-component2',type: 'mediaComponent', media_type:'audio', has_playlist: false, src: `${BASE_AUDIO_URL}?filePath=${$AUDIO_PATH}&fileName=450 - Purge.mp3&mimeType=audio/mp3`, mimetype: 'audio/mp3', muted: false, autoplay: false, loop: false, controls: true, callback: ()=>{
				let $media_id = '#audio-media2-component2', $media_type = 'audio', defaultTrackPath, defaultPlaylist;
				const $audio$media2$component2_player = new AKD_MediaPlayer({
					mediaElem: `${$media_id}-media-element`, 
					mediaType : $media_type, 
					mediaSrcPrefix : `${INCLUDES_URL}loader.php?action=stream&mediaType=${$media_type}&src=`, 
					mediaSrc : `${defaultTrackPath}`, 
					//mediaSrc : `${BASE_URL}inc/fh.php?action=stream&mediaType=audio&src=${defaultTrackPath}&mime=${defaultTrackMime}`, 
					mediaList : '.player-playlist-item-content', 
					activeItemClass: "selected", 
					autoplay: false, 
					// initialVolume: 0.4, 
					playlist : defaultPlaylist, 
					/* nowPlayingElem: $mediaPlayerTitle[0], 
					currentTimeElem : $currentTime[0], 
					durationTimeElem : $durationTime[0], 
					seekElem : $seekSlider[0], 
					volumeElem : $volumeSlider[0],  */
					coverArtElem: ".media-art",
					default_album_art : `${IMAGES_URL}album-art.png`,
					template : {
						/* item_parent: "div",
						item_class: "player-playlist-item clickable bdr--2 mb--2 px--4 py--8",
						item_template */
					},
					//enable_logger: true
				});
				
				$(`${$media_id}-volume-slider`).val($audio$media2$component2_player.config.initialVolume)/* .change() */;
			}}, 
			{parent_window_id:'media2-window', id: 'video-media2-component2',type: 'mediaComponent', media_type:'video', has_playlist: false, src: `${BASE_VIDEO_URL}VID-20181116-WA0005.mp4`, mimetype: 'video/mp4', poster: '', muted: false, autoplay: false, loop: false, controls: true, video_click_play_toggle: true}, 
			{parent_window_id:'media2-window', id: 'media2-search-component',type: 'searchComponent', ajaxTarget: '#media2-ajax-window', ajaxTargetType: 'id',
				/* datalist : [
					[BASE_URL + 'app/fragments/ajax/tools.php?action=browse&ajax_target=tools-ajax-window&ajax_target_type=id' , 'root'],
					[BASE_URL + 'app/fragments/ajax/tools.php?action=browse&ajax_target=tools-ajax-window&ajax_target_type=id' , '/www/'],
					[BASE_URL + 'app/fragments/ajax/tools.php?action=browse&ajax_target=tools-ajax-window&ajax_target_type=id' , '/www/_data/']
				] */
			}
		],
		wallpaper: {
			backgroundImage: `${IMAGES_URL}wallpapers/enlightenment.jpg`, 
			backgroundColor: '', 
			backgroundSize: 'cover', 
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'local',
			backgroundPosition: 'center center',
			backgroundBlendMode: 'normal',
		}, 
		config:{
			shortcut: {add_to_dextop: true, display_title: false, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions: '', }
		},
		cell_id:8
	},
	{id:'tools-window', name:'tools', icon: `${IMAGES_URL}/icons/project.png`, type:'', category:'administration', ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id',
		attrs: '',
		sidebar_content: ``,
		body_content: `<div class="history__wrapper-buttons">
				<button id="" class="" type="button"><i class="fa fa-save"></i></button>
				<button id="" class="" type="button"><i class="fa fa-copy"></i></button>
				<button id="" class="" type="button"><i class="fa fa-trash-alt"></i></button>
			</div>`,
		components: [
			{id: 'tools-body-component',type: 'bodyComponent', /* structure : {head: '',body: '',sidebar: '',foot: ''}, */ 
				structure : `<div class="tools-grid">
					<div class="tools-grid-head tools-grid-optionsbar gap--2 p--4">
						<span class="flex gap--2 ml--auto">
							<button id="" class="akd__btn btn--success flex-place-center bdr--8 px--6" type="button" title=""><i class="fa fa-cog"></i><span class="ml--2">options</span></button>
							<button id="" class="akd__btn btn--purple flex-place-center bdr--2" type="button" title="reset pane layout" onclick="let handle = document.querySelector('.tools-grid-body-handle'), handle_dim = (handle.offsetHeight/2) +'px';document.querySelector('#tools-input-wrapper').style.height = 'calc(50% - '+handle_dim+')';handle.style.top = 'calc(50% - '+ handle_dim +')';document.querySelector('#tools-output-wrapper').style.height = 'calc(50% - '+ handle_dim +')';"><i class="fa fa-columns"></i></button>
							<button id="" class="akd__btn btn--pink flex-place-center bdr--2" type="button" title=""><i class="fa fa-copy"></i></button>
							<button id="" class="akd__btn btn--info flex-place-center bdr--2" type="button" title=""><i class="fa fa-trash-alt"></i></button>
						</span>
					</div>
					<div class="tools-grid-body" data-splitter-orientation="vertical">
						<div id="tools-input-wrapper" class="akd__tabs z-index-1">
							<div id="" class="tools-buttons">
								<span id="" class="tool-title flex w--3 mr--auto">Input</span>
								
								<span id="" class="tool-tabs-links w--6 flex mr--auto ml--auto overflow--hidden-y overflow--auto-x">
									<ul class="akd__tab-buttons"></ul>
								</span>
								
								<span class="flex gap--2 w--3 ml--auto">
									<button id="new-tool-tab-button" class="akd__btn btn--inherit rounded flex-place-center ml--auto" type="button" title="add new input tab" data-dextop-button><i class="fa fa-plus"></i></button>
									<button id="" class="akd__btn btn--inherit rounded flex-place-center" type="button" title="open folder as input" data-dextop-button><i class="fa fa-folder"></i></button>
									<label id="" class="akd__btn btn--inherit rounded flex-place-center" for="tools-file-input" title="open file as input">
										<i class="fa fa-file"></i>
										<input id="tools-file-input" class="visually--hidden" type="file" multiple data-dextop-input />
									</label>
									<button id="" class="akd__btn rounded flex-place-center" type="button" title="clear input and output" data-dextop-button><i class="fa fa-trash-alt"></i></button>
								</span>
							</div>
							<div id="tools-input" class="tools-content flex akd__tab-panels">
								<div class="dropzone pos--abs w--11 h--12 to-front-"></div>
							</div>
						</div>
						
						<span id="tools-grid-body-handle" class="tools-grid-body-handle z-index-3"></span>
						
						<div id="tools-output-wrapper" class="akd__tabs z-index-2">
							<div id="" class="tools-buttons">
								<span id="" class="tool-title flex w--3 mr--auto">Output</span>
								
								<span id="" class="tool-tabs-links w--6 flex mr--auto ml--auto overflow--hidden-y overflow--auto-x">
									<ul class="akd__tab-buttons"></ul>
								</span>
								
								<span class="flex gap--2 w--3 ml--auto">
									<button id="" class="akd__btn btn--inherit rounded flex-place-center" type="button" title="save output to file" data-dextop-button><i class="fa fa-save"></i></button>
									<button id="" class="akd__btn btn--inherit rounded flex-place-center" type="button" title="replace input with output" data-dextop-button><i class="fa fa-sync"></i></button>
									<button id="" class="akd__btn btn--inherit rounded flex-place-center" type="button" title="copy raw output to the clipboard" data-dextop-button><i class="fa fa-copy"></i></button>
									<button id="" class="akd__btn btn--inherit rounded flex-place-center" type="button" title="maximize output pane" onclick="maximizeSplitterPane({parentContainer:'.tools-grid-body', targetPanel:'#tools-output-wrapper', otherPanel:'#tools-input-wrapper', handle:'#tools-grid-body-handle',orientation:'vertical'}, true);" data-dextop-button><i class="fa fa-expand"></i></button>
									<!--<button id="" class="akd__btn btn--inherit rounded flex-place-center" type="button" title="maximize output pane" onclick="let parent = document.querySelector('.tools-grid-body'), target = document.querySelector('#tools-output-wrapper'), other = document.querySelector('#tools-input-wrapper'), handle = document.querySelector('#tools-grid-body-handle');if(parent.dataset.splitterOrientation === 'vertical'){target.style.height = '100%';other.style.height = '0%';handle.style.top = '0%';} else {target.style.width = '100%';other.style.width = '0%';handle.style.left = '0%';}" data-dextop-button><i class="fa fa-expand"></i></button>-->
								</span>
							</div>
							<div id="tools-output" class="tools-content akd__tab-panels"></div>
						</div>
					</div>
				</div>`
			},
			{id: 'tools-nav-component1',type: 'navComponent', nav_links: [
				{title: 'Home', href:  `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-globe"></i>', 
					children:[
						{title: 'Home: page1', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-folder-open"></i>'},
						{title: 'Home: page2', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>'}
					]
				},
				{title: 'Files', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-file"></i>'},
				{title: 'Folders', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-folder"></i>'},
			]},
			{id: 'tools-nav-component2',type: 'navComponent', nav_links: [
				{title: 'Code Tidy', href:  `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-globe"></i>', 
					children:[
						{title: 'Syntax Highlighter', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-folder-open"></i>', description: ''},
						{title: 'Genereric Code Beautifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: ''},
						{title: 'Javascript Beautifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: ''},
						{title: 'Javascript Minifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Compress Javascript code'},
						{title: 'JSON Beautifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Indent and prettify Javascript code'},
						{title: 'JSON Minifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Compress Javascript Object Notation (JSON) code'},
						{title: 'CSS Beautifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Indent and prettify Javascript Object Notation (JSON) code'},
						{title: 'CSS Minifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Compress Cascading Style Sheet (CSS) code'},
						{title: 'SQL Beautifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Indent and prettify Cascading Style Sheet (CSS) code'},
						{title: 'SQL Minifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Compress Structured Query Language (SQL) code'},
						{title: 'XML Beautifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Indent and prettify Extensible Markup Language (XML) code'},
						{title: 'XML Minifier', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Compress Extensible Markup Language (XML) code'},
						{title: 'CSS Selector', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Extract information from a HTML document using the CSS selector provided'},
						{title: 'Strip HTML Tags', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Remove HTML tags from input'},
						{title: 'Render Markdown', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-magic"></i>', description: 'Render input Markdown as HTML'},
					]
				},
				{title: 'Files', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-file"></i>'},
				{title: 'Folders', href: `${BASE_URL}index.php?action=dextop2&ajax_target=tools-ajax-window&ajax_target_type=id`, ajaxClass: AJAX_CLASS, ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id', icon: '<i class="fa fa-folder"></i>'},
			]},
			{id: 'tools-search-component',type: 'searchComponent', ajaxTarget: '#tools-ajax-window', ajaxTargetType: 'id',
				datalist : [
					[BASE_URL + 'app/fragments/ajax/tools.php?action=browse&ajax_target=tools-ajax-window&ajax_target_type=id' , 'root'],
					[BASE_URL + 'app/fragments/ajax/tools.php?action=browse&ajax_target=tools-ajax-window&ajax_target_type=id' , '/www/'],
					[BASE_URL + 'app/fragments/ajax/tools.php?action=browse&ajax_target=tools-ajax-window&ajax_target_type=id' , '/www/_data/']
				]
			}
		], 
		template: `
		<aside class="window__side grid-s- side--grid">
			{{--search-component--}}
			<div class="dd">
				{{--nav-component--}}
				{{--nav-component--}}
			</div>
			<nav class="window__side-nav bottom">
				<ul>
					<li>
						<a class="${AJAX_CLASS} refresh" href="#" data-ajax-target="#" data-ajax-target-type="id">
							<span class="link-icon"><i class="fa fa-redo"></i></span>
							<span class="link-title">refresh</span>
						</a>
					</li>
				</ul>
			</nav>
		</aside>
		<section id="" class="window__body-inner grid-s-">
			{{--body-component--}}
		</section>
		`,
		wallpaper: '', 
		config:{
			shortcut: {add_to_dextop: true, display_title: true, icon_size: 'default', expand_on_click: false}, 
			'window': {dimensions:'[\'80%\',\'50%\']', }
		},
		cell_id:37
	},
	{id:'image-display-window', name:'image-display', icon:`${IMAGES_URL}icons/image-preview.png`, type:'', category:'art-and-graphics', ajaxTarget: '#images-ajax-window', ajaxTargetType: 'id',
		attrs:'class="window window-solid window--info" data-name="image-display" data-title="image display window" data-wallpaper=""',
		sidebar_content: ``,
		footer_content: `<div class="--buttons flex flex--center gap--4 px--4 py--2">
			<button id="" class="akd__btn btn--danger py--2 px--6 text--sm" type="button" title=""><i class="fa fa-chevron-up"></i></button>
			<button id="" class="akd__btn btn--danger py--2 px--6 text--sm" type="button" title=""><i class="fa fa-plus"></i></button>
			<button id="" class="akd__btn btn--danger py--2 px--6 text--sm" type="button" title=""><i class="fa fa-columns"></i></button>
			<button id="" class="akd__btn btn--danger py--2 px--6 text--sm" type="button" title=""><i class="fa fa-trash-alt"></i></button>
		</div>`,
		body_content: `<div id="photos-showcase" class="photos-showcase"></div>`, 
		template: `
		<aside class="window__side grid-s- side--grid">
			<nav class="utility-buttons flex flex--even gap--4 px--4 py--2">
				<button id="" class="akd__btn btn--success" type="button" title="save/download image"><i class="fa fa-save"></i></button>
				<button id="" class="akd__btn btn--default" type="button" title="copy image"><i class="fa fa-copy"></i></button>
				<button id="" class="akd__btn btn--danger" type="button" title="remove image" onclick="_.empty($one('#photoshop-showcase-image'));"><i class="fa fa-trash-alt"></i></button>
			</nav>
			<div id="photos-showcase-nav" class="photos-showcase-nav">
				<nav class="utility-buttons flex flex--even gap--4 px--4 py--2">
					<button id="" class="akd__btn btn--purple" type="button" title="flip image vertically" onclick="flipImage('#photoshop-showcase-image img', 'vertical');"><i class="fa fa-save"></i></button>
					<button id="" class="akd__btn btn--info" type="button" title="flip image horizontally" onclick="flipImage('#photoshop-showcase-image img', 'horizontal');"><i class="fa fa-save"></i></button>
				</nav>
				<div class="utility--buttons flex-place-center flex--wrap p--8 gap--2 bg--primary overflow--auto" style="height: calc(100% - var(--q8-rem));">
					<button id="loop-media-button" class="media-button" title="Loop"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-loop" d="m 13,13 h 10 v 3 l 4,-4 -4,-4 v 3 H 11 v 6 h 2 z M 23,23 H 13 v -3 l -4,4 4,4 v -3 h 12 v -6 h -2 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="stop-media-button" class="media-button" title="Stop"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-stop" d="M 9.9999997,10 H 26 V 26 H 9.9999997 Z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="reverse-playlist-button" class="media-button" title="Reverse playlist"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-reverse-playlist" d="M 12,11 V 23 H 9 l 4,4 4,-4 H 14 V 13 11 Z m 11,-2 -4,4 h 3 v 10 2 h 2 V 13 h 3 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="efyt-volume-booster" class="media-button" data-on="M 18.799896,16.4 V 10 l -4.8,9.6 h 3.2 V 26 l 4.8,-9.6 z m -7.101273,7.901273 1.349363,-1.349363 C 11.775002,21.678925 10.998482,19.934936 10.998482,18 c 0,-1.934936 0.789249,-3.678925 2.049504,-4.951911 L 11.698623,11.698726 C 10.081933,13.315417 9.089005,15.543139 9.089005,18 c 0,2.456859 0.992928,4.684583 2.609618,6.301273 z M 25.001311,18 c 0,1.934936 -0.789252,3.678925 -2.049506,4.95191 l 1.349363,1.349363 C 25.917859,22.684583 26.910787,20.456859 26.910787,18 c 0,-2.456861 -0.992928,-4.684583 -2.609619,-6.301274 l -1.349363,1.349363 C 24.212059,14.321075 25.001311,16.065064 25.001311,18 Z M 6.679373,18 c 0,-2.978784 1.209334,-5.69024 3.169731,-7.650635 L 8.499741,9 c -2.304102,2.304102 -3.729845,5.486563 -3.729845,9 0,3.513437 1.425743,6.695898 3.729845,9 L 9.849104,25.650636 C 7.888707,23.69024 6.679373,20.978784 6.679373,18 Z m 24.550731,0 c 0,-3.513437 -1.425742,-6.695898 -3.729845,-9 l -1.349363,1.349365 c 1.960395,1.960395 3.169731,4.671851 3.169731,7.650635 0,2.978784 -1.209336,5.69024 -3.169731,7.650636 L 27.500259,27 c 2.304103,-2.304102 3.729845,-5.486563 3.729845,-9 z" data-off="M 8.5 9 C 6.195898 11.304103 4.7695312 14.486564 4.7695312 18 C 4.7695312 21.513437 6.195898 24.695899 8.5 27 L 9.8496094 25.650391 C 7.8892134 23.689995 6.6796875 20.978784 6.6796875 18 C 6.6796875 15.021216 7.8892134 12.310004 9.8496094 10.349609 L 8.5 9 z M 27.5 9 L 26.150391 10.349609 C 28.110787 12.310004 29.320313 15.021216 29.320312 18 C 29.320312 20.978784 28.110787 23.689995 26.150391 25.650391 L 27.5 27 C 29.804102 24.695899 31.230469 21.513437 31.230469 18 C 31.230469 14.486564 29.804102 11.304103 27.5 9 z M 18.800781 10 L 14 19.599609 L 17.199219 19.599609 L 17.199219 26 L 22 16.400391 L 18.800781 16.400391 L 18.800781 10 z M 11.699219 11.699219 C 10.082529 13.31591 9.0898437 15.54314 9.0898438 18 C 9.0898438 20.45686 10.082529 22.684091 11.699219 24.300781 L 13.048828 22.951172 C 11.775844 21.678187 10.998047 19.934936 10.998047 18 C 10.998047 16.065064 11.788574 14.321814 13.048828 13.048828 L 11.699219 11.699219 z M 24.300781 11.699219 L 22.951172 13.048828 C 24.211427 14.321814 25.001953 16.065064 25.001953 18 C 25.001953 19.934936 24.211427 21.678187 22.951172 22.951172 L 24.300781 24.300781 C 25.917473 22.684091 26.910156 20.45686 26.910156 18 C 26.910156 15.54314 25.917473 13.31591 24.300781 11.699219 z M 18.384766 11.726562 L 18.384766 16.853516 L 21.298828 16.853516 L 17.615234 24.273438 L 17.615234 19.146484 L 14.755859 19.146484 L 18.384766 11.726562 z" data-tooltip="Boost volume" hidden=""><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-volume-booster" d="M 8.5 9 C 6.195898 11.304103 4.7695312 14.486564 4.7695312 18 C 4.7695312 21.513437 6.195898 24.695899 8.5 27 L 9.8496094 25.650391 C 7.8892134 23.689995 6.6796875 20.978784 6.6796875 18 C 6.6796875 15.021216 7.8892134 12.310004 9.8496094 10.349609 L 8.5 9 z M 27.5 9 L 26.150391 10.349609 C 28.110787 12.310004 29.320313 15.021216 29.320312 18 C 29.320312 20.978784 28.110787 23.689995 26.150391 25.650391 L 27.5 27 C 29.804102 24.695899 31.230469 21.513437 31.230469 18 C 31.230469 14.486564 29.804102 11.304103 27.5 9 z M 18.800781 10 L 14 19.599609 L 17.199219 19.599609 L 17.199219 26 L 22 16.400391 L 18.800781 16.400391 L 18.800781 10 z M 11.699219 11.699219 C 10.082529 13.31591 9.0898437 15.54314 9.0898438 18 C 9.0898438 20.45686 10.082529 22.684091 11.699219 24.300781 L 13.048828 22.951172 C 11.775844 21.678187 10.998047 19.934936 10.998047 18 C 10.998047 16.065064 11.788574 14.321814 13.048828 13.048828 L 11.699219 11.699219 z M 24.300781 11.699219 L 22.951172 13.048828 C 24.211427 14.321814 25.001953 16.065064 25.001953 18 C 25.001953 19.934936 24.211427 21.678187 22.951172 22.951172 L 24.300781 24.300781 C 25.917473 22.684091 26.910156 20.45686 26.910156 18 C 26.910156 15.54314 25.917473 13.31591 24.300781 11.699219 z M 18.384766 11.726562 L 18.384766 16.853516 L 21.298828 16.853516 L 17.615234 24.273438 L 17.615234 19.146484 L 14.755859 19.146484 L 18.384766 11.726562 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="efyt-whitelist" class="media-button" title="Add to whitelist" data-action="add" data-add="m 27.56842,14.925603 -6.879695,-0.593242 -2.688726,-6.334295 -2.688726,6.343863 -6.8796947,0.583674 5.2243577,4.525863 -1.569221,6.7266 5.913284,-3.569021 5.913284,3.569021 -1.559652,-6.7266 z m -9.568421,5.894147 -3.597726,2.172032 0.956842,-4.095284 -3.176716,-2.755706 4.190968,-0.3636 1.626632,-3.856073 1.6362,3.865642 4.190969,0.3636 -3.176716,2.755705 0.956842,4.095284 z" data-remove="M 18,22.609045 23.913284,26.178066 22.344063,19.451465 27.56842,14.925603 20.688726,14.341929 18,7.998066 l -2.688727,6.343863 -6.8796943,0.583674 5.2243583,4.525862 -1.569221,6.726601 z"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-whitelist" d="m 27.56842,14.925603 -6.879695,-0.593242 -2.688726,-6.334295 -2.688726,6.343863 -6.8796947,0.583674 5.2243577,4.525863 -1.569221,6.7266 5.913284,-3.569021 5.913284,3.569021 -1.559652,-6.7266 z m -9.568421,5.894147 -3.597726,2.172032 0.956842,-4.095284 -3.176716,-2.755706 4.190968,-0.3636 1.626632,-3.856073 1.6362,3.865642 4.190969,0.3636 -3.176716,2.755705 0.956842,4.095284 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="efyt-not-interested" class="media-button" title="Remove ads"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-not-interested" d="M 16.180125,26.178066 V 23.905807 H 6.8638711 V 10.272258 H 27.314195 v 2.850303 h 2.272258 V 8.0000001 H 4.5916129 V 26.178066 Z M 25.05636,15.295943 c -3.506321,0 -6.35203,2.845709 -6.35203,6.352029 0,3.506319 2.845709,6.352027 6.35203,6.352027 3.506319,0 6.352026,-2.845708 6.352026,-6.352027 0,-3.50632 -2.845707,-6.352029 -6.352026,-6.352029 z m -5.081625,6.352029 c 0,-2.807597 2.274028,-5.081624 5.081625,-5.081624 1.175123,0 2.254969,0.400178 3.112495,1.073493 l -7.120625,7.120625 c -0.673316,-0.857524 -1.073494,-1.937369 -1.073495,-3.112494 z m 5.081625,5.081621 c -1.175126,0 -2.254972,-0.400176 -3.112496,-1.07349 l 7.120627,-7.120627 c 0.673313,0.857524 1.07349,1.93737 1.07349,3.112496 0,2.807597 -2.274026,5.081621 -5.081621,5.081621 z M 19.063879,15.034555 q 0,-0.244758 -0.17277,-0.374336 -0.17277,-0.132457 -0.621973,-0.276432 -0.449202,-0.146855 -0.711237,-0.28795 -0.714117,-0.385854 -0.714117,-1.039501 0,-0.339782 0.190046,-0.604696 0.192928,-0.267794 0.549986,-0.417528 0.359938,-0.149734 0.806261,-0.149734 0.449203,0 0.800503,0.164131 0.351298,0.161253 0.544226,0.457841 0.195806,0.29659 0.195806,0.673805 h -0.863851 q 0,-0.287951 -0.181409,-0.446324 -0.181408,-0.161252 -0.509672,-0.161252 -0.316746,0 -0.492395,0.135337 -0.17565,0.132457 -0.17565,0.351299 0,0.204445 0.204445,0.342661 0.207324,0.138216 0.607575,0.259155 0.737153,0.221723 1.074055,0.549986 0.336902,0.328263 0.336902,0.817779 0,0.544226 -0.411769,0.855213 -0.411769,0.308107 -1.108609,0.308107 -0.483757,0 -0.881128,-0.17565 -0.397372,-0.178529 -0.607576,-0.486637 -0.207324,-0.308107 -0.207324,-0.714117 h 0.86673 q 0,0.693961 0.829298,0.693961 0.308107,0 0.480877,-0.123818 0.17277,-0.126699 0.17277,-0.3513 z m -6.208675,1.09997 v -4.192558 h 1.290018 q 0.552865,0 0.98767,0.250518 0.437684,0.247636 0.682442,0.708357 0.244758,0.457842 0.244758,1.042381 v 0.192927 q 0,0.584539 -0.241878,1.0395 -0.238999,0.454963 -0.676683,0.705479 -0.437686,0.250517 -0.98767,0.253396 z m 0.863851,-3.492838 v 2.798878 h 0.417529 q 0.506792,0 0.774586,-0.331143 0.267794,-0.331143 0.273553,-0.947357 v -0.221721 q 0,-0.63925 -0.264915,-0.967514 -0.264913,-0.331143 -0.774586,-0.331143 z m -2.87072,2.628987 H 9.3337166 L 9.0457662,16.134525 H 8.1272044 l 1.5606912,-4.192558 h 0.8005014 l 1.56933,4.192558 h -0.918562 z m -1.2813786,-0.69972 h 1.0481386 l -0.526949,-1.569329 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="efyt-cards-end-screens" class="media-button" title="Toggle cards/end screens visibility" data-on="m 23.585753,15.31167 c -4.224201,0 -7.831669,2.627453 -9.293243,6.336303 1.461574,3.708847 5.069042,6.3363 9.293243,6.3363 4.224201,0 7.831669,-2.627453 9.293242,-6.3363 -1.461573,-3.70885 -5.069041,-6.336303 -9.293242,-6.336303 z m 0,10.560503 c -2.331759,0 -4.224201,-1.892442 -4.224201,-4.2242 0,-2.331759 1.892442,-4.224202 4.224201,-4.224202 2.331758,0 4.224201,1.892443 4.224201,4.224202 0,2.331758 -1.892443,4.2242 -4.224201,4.2242 z m 0,-6.758721 c -1.402435,0 -2.534521,1.132087 -2.534521,2.534521 0,1.402434 1.132086,2.53452 2.534521,2.53452 1.402434,0 2.53452,-1.132086 2.53452,-2.53452 0,-1.402434 -1.132086,-2.534521 -2.53452,-2.534521 z M 7.5464614,12.108004 h 8.9170356 v 3.889561 H 7.5464614 Z M 12.520348,23.921535 H 5.3932636 V 10.287985 H 25.843588 v 2.855964 h 2.272258 V 8.0157271 H 3.1210054 V 26.193793 h 9.3993426 z m -0.66097,-3.803731 a 2.1564575,2.1564575 0 0 1 -2.1564585,2.156458 2.1564575,2.1564575 0 0 1 -2.1564581,-2.156458 2.1564575,2.1564575 0 0 1 2.1564581,-2.156458 2.1564575,2.1564575 0 0 1 2.1564585,2.156458 z" data-off="m 16.333008,13.997071 -1.191407,1.201172 2.265625,2.265625 c -1.377916,1.082045 -2.470175,2.518256 -3.121094,4.183593 1.462453,3.711076 5.072089,6.339844 9.298829,6.339844 1.284929,0 2.511765,-0.251825 3.644531,-0.691406 l 0.691406,0.691406 1.19336,-1.193359 z m 7.251953,1.310547 c -1.073592,0 -2.104021,0.169644 -3.076172,0.482421 l 1.833984,1.833985 c 0.397314,-0.118349 0.81106,-0.203125 1.242188,-0.203125 2.333161,0 4.228515,1.893401 4.228515,4.226562 0,0.431127 -0.08478,0.845516 -0.203125,1.234375 l 2.585938,2.587891 c 1.175034,-1.039778 2.10421,-2.342265 2.6875,-3.830078 -1.462452,-3.702623 -5.072088,-6.332031 -9.298828,-6.332031 z m 0.279297,3.830078 2.232421,2.232422 c -0.126803,-1.183487 -1.057388,-2.105619 -2.232421,-2.232422 z m -4.091797,0.701172 1.328125,1.328125 c -0.02536,0.152163 -0.05078,0.311398 -0.05078,0.480468 0,1.403277 1.131879,2.53711 2.535157,2.53711 0.16907,0 0.321805,-0.02674 0.482421,-0.06055 l 1.328126,1.328125 c -0.549476,0.270511 -1.159629,0.421875 -1.810547,0.421875 -2.33316,0 -4.226563,-1.893403 -4.226563,-4.226563 0,-0.650919 0.152005,-1.267571 0.414063,-1.808593 z M 3.1162108,8.0126954 V 26.19043 H 12.522155 V 23.918946 H 5.3876952 V 10.28418 H 25.836914 v 2.857422 h 2.273437 V 8.0126954 Z"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-cards-end-screens" d="m 23.585753,15.31167 c -4.224201,0 -7.831669,2.627453 -9.293243,6.336303 1.461574,3.708847 5.069042,6.3363 9.293243,6.3363 4.224201,0 7.831669,-2.627453 9.293242,-6.3363 -1.461573,-3.70885 -5.069041,-6.336303 -9.293242,-6.336303 z m 0,10.560503 c -2.331759,0 -4.224201,-1.892442 -4.224201,-4.2242 0,-2.331759 1.892442,-4.224202 4.224201,-4.224202 2.331758,0 4.224201,1.892443 4.224201,4.224202 0,2.331758 -1.892443,4.2242 -4.224201,4.2242 z m 0,-6.758721 c -1.402435,0 -2.534521,1.132087 -2.534521,2.534521 0,1.402434 1.132086,2.53452 2.534521,2.53452 1.402434,0 2.53452,-1.132086 2.53452,-2.53452 0,-1.402434 -1.132086,-2.534521 -2.53452,-2.534521 z M 7.5464614,12.108004 h 8.9170356 v 3.889561 H 7.5464614 Z M 12.520348,23.921535 H 5.3932636 V 10.287985 H 25.843588 v 2.855964 h 2.272258 V 8.0157271 H 3.1210054 V 26.193793 h 9.3993426 z m -0.66097,-3.803731 a 2.1564575,2.1564575 0 0 1 -2.1564585,2.156458 2.1564575,2.1564575 0 0 1 -2.1564581,-2.156458 2.1564575,2.1564575 0 0 1 2.1564581,-2.156458 2.1564575,2.1564575 0 0 1 2.1564585,2.156458 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="cinema-mode-button" class="media-button" title="Cinema mode"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-cinema-mode" d="m 8,8.1430084 c -1.375,0 -2.4882814,1.125 -2.4882812,2.4999996 L 5.5,23.679025 c 0,1.375 1.125,2.5 2.4999999,2.5 H 28 c 1.375,0 2.5,-1.125 2.5,-2.5 V 7.9999999 h -5 L 28,11.75 h -3.75 l -2.5,-3.7500001 h -2.5 L 21.75,11.75 H 18 L 15.5,7.9999999 H 13 L 15.5,11.75 H 11.75 L 9.2500001,8.1430084 Z M 7.7714843,14.017578 H 28.207031 v 9.856759 H 7.7714843 Z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="expand-player-button" class="media-button" title="Expand" data-expand="M 5.390625,7.9999999 V 26.179687 h 25.21875 V 7.9999999 Z M 7.410156,10.009766 H 28.589844 V 24.169922 H 7.410156 Z m 4.040294,4.050342 h 3.029835 V 12.040219 H 9.430562 v 5.049722 h 2.019888 z m 15.118897,3.029833 h -2.019888 v 3.029834 h -3.029834 v 2.019889 h 5.049722 z" data-shrink="m 5.390625,8 v 18.179687 h 25.21875 V 8 Z m 2.019531,2.009765 H 28.589844 V 24.169922 H 7.410156 Z M 19.45325,22.331983 h 1.762511 V 19.688214 H 23.85953 V 17.925702 H 19.45325 Z M 14.784019,14.491472 H 12.14025 v 1.762512 h 4.406281 v -4.40628 h -1.762512 z m 0,5.196743 H 12.14025 v -1.762512 h 4.406281 v 4.40628 h -1.762512 z m 4.669231,-7.840512 h 1.762511 v 2.643769 h 2.643769 v 1.762512 h -4.40628 z"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-size" d="M 5.390625,7.9999999 V 26.179687 h 25.21875 V 7.9999999 Z M 7.410156,10.009766 H 28.589844 V 24.169922 H 7.410156 Z m 4.040294,4.050342 h 3.029835 V 12.040219 H 9.430562 v 5.049722 h 2.019888 z m 15.118897,3.029833 h -2.019888 v 3.029834 h -3.029834 v 2.019889 h 5.049722 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="pop-up-player-button" class="media-button" title="Pop-up player"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-pop-up-player" d="m 21.554375,7.9999999 h 2.02 V 10.02 h -2.02 z m 4.04,0 h 2.02 V 10.02 h -2.02 z M 5.394375,16.08 h 2.02 v 2.02 h -2.02 z m 0,-4.04 h 2.02 v 2.02 h -2.02 z m 0,8.08 h 2.02 v 2.02 h -2.02 z m 12.12,-12.1200001 h 2.02 V 10.02 h -2.02 z M 30.605625,26.18 H 9.434375 V 12.04 h 21.17125 z m -2.02,-12.12 h -17.13125 v 10.1 h 17.13125 z M 13.474375,7.9999999 h 2.02 V 10.02 h -2.02 z m -4.04,0 h 2.02 V 10.02 h -2.02 z m -4.04,0 h 2.02 V 10.02 h -2.02 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="playback-speed-minus-button" class="media-button" title="Increase Speed" data-decrease-speed-by="0.1"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-speed-minus" d="M 24.505859 8 C 21.820495 8 19.640625 10.17987 19.640625 12.865234 C 19.640625 15.550597 21.820495 17.730469 24.505859 17.730469 C 27.191222 17.730469 29.371094 15.550597 29.371094 12.865234 C 29.371094 10.17987 27.191222 8 24.505859 8 z M 18.320312 8.0058594 A 11.389523 11.389523 0 0 0 11.833984 9.8027344 L 13.941406 11.203125 A 9.1116182 9.1116182 0 0 1 18.539062 10.265625 C 18.881721 9.48098 19.375712 8.7787333 19.982422 8.1914062 A 11.389523 11.389523 0 0 0 18.320312 8.0058594 z M 9.9550781 11.283203 L 16.400391 20.953125 A 2.2779046 2.2779046 0 0 0 19.623047 20.953125 A 2.2779046 2.2779046 0 0 0 19.623047 17.728516 L 9.9550781 11.283203 z M 21.103516 12.185547 L 23.826172 12.185547 L 25.185547 12.185547 L 26.738281 12.185547 L 27.908203 12.185547 L 27.908203 13.544922 L 25.455078 13.544922 L 25.185547 13.544922 L 23.826172 13.544922 L 23.367188 13.544922 L 21.103516 13.544922 L 21.103516 12.185547 z M 8.4628906 13.150391 A 11.389523 11.389523 0 0 0 8.1542969 25.041016 A 2.2779046 2.2779046 0 0 0 10.136719 26.179688 L 25.910156 26.179688 A 2.2779046 2.2779046 0 0 0 27.869141 25.041016 A 11.389523 11.389523 0 0 0 29.179688 17.386719 C 28.592758 17.993284 27.89155 18.487267 27.107422 18.830078 A 9.1116182 9.1116182 0 0 1 25.910156 23.902344 L 10.125 23.902344 A 9.1116182 9.1116182 0 0 1 9.875 15.269531 L 8.4726562 13.162109 L 8.4628906 13.150391 z " fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="playback-speed-button" class="media-button" title="Normal Speed"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-speed" d="m 27.526463,13.161756 -1.400912,2.107062 a 9.1116182,9.1116182 0 0 1 -0.250569,8.633258 H 10.089103 A 9.1116182,9.1116182 0 0 1 22.059491,11.202758 L 24.166553,9.8018471 A 11.389523,11.389523 0 0 0 8.1301049,25.041029 2.2779046,2.2779046 0 0 0 10.089103,26.179981 H 25.863592 A 2.2779046,2.2779046 0 0 0 27.845369,25.041029 11.389523,11.389523 0 0 0 27.537852,13.150367 Z M 16.376119,20.95219 a 2.2779046,2.2779046 0 0 0 3.223235,0 l 6.446471,-9.669705 -9.669706,6.44647 a 2.2779046,2.2779046 0 0 0 0,3.223235 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="playback-speed-plus-button" class="media-button" title="Decrease Speed" data-increase-speed-by="0.1"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-speed-plus" d="m 11.494141,8 c -2.6853634,0 -4.8652346,2.17987 -4.8652348,4.865234 0,2.685363 2.1798714,4.865235 4.8652348,4.865235 2.685364,0 4.865234,-2.179872 4.865234,-4.865235 C 16.359375,10.17987 14.179505,8 11.494141,8 Z m -0.679688,1.4609375 h 1.359375 v 2.7246095 h 2.722656 v 1.359375 h -2.722656 v 2.722656 H 10.814453 V 13.544922 H 8.0917969 v -1.359375 h 2.7226561 z m 6.865235,-1.4550784 a 11.389523,11.389523 0 0 0 -1.66211,0.185547 c 0.60671,0.587327 1.100701,1.289573 1.44336,2.0742189 a 9.1116182,9.1116182 0 0 1 4.597656,0.9375 l 2.107422,-1.4003909 a 11.389523,11.389523 0 0 0 -6.486328,-1.796875 z m 8.365234,3.2773439 -9.667969,6.445313 a 2.2779046,2.2779046 0 0 0 0,3.224609 2.2779046,2.2779046 0 0 0 3.222656,0 z m 1.492187,1.867188 -0.0098,0.01172 -1.402344,2.107422 a 9.1116182,9.1116182 0 0 1 -0.25,8.632813 H 10.089844 A 9.1116182,9.1116182 0 0 1 8.8925783,18.830078 C 8.1084503,18.487267 7.4072416,17.993284 6.8203125,17.386719 a 11.389523,11.389523 0 0 0 1.3105468,7.654297 2.2779046,2.2779046 0 0 0 1.9589847,1.138672 h 15.773437 a 2.2779046,2.2779046 0 0 0 1.982422,-1.138672 11.389523,11.389523 0 0 0 -0.308594,-11.890625 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="filters-toggle-button" class="media-button" title="Media filters"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-video-filters" d="m 22.899051,15.920251 -1.037187,2.272983 -1.037186,-2.272983 -2.272983,-1.037187 2.272983,-1.037186 1.037186,-2.272983 1.037187,2.272983 2.272983,1.037186 z m -6.278288,3.65222 -1.379238,3.034322 -1.379237,-3.034322 -3.034322,-1.379237 3.034322,-1.379237 1.379237,-3.034323 1.379238,3.034323 3.034322,1.379237 z M 5.390625,8 v 18.179688 h 25.21875 V 8 Z m 2.0195312,2.009766 H 28.589844 V 24.169922 H 7.4101562 Z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="flip-horizontally-button" class="akd__btn btn--purple media-button" title="Flip horizontally" onclick="flipImage('#photoshop-showcase-image img', 'horizontal');"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-flip-horizontally" d="m 8.897825,20.136232 v 2.022705 h 2.022705 v -2.022705 z m 12.136233,4.04541 v 2.022707 h 2.022705 v -2.022707 z m 6.068116,-16.181643 -18.204349,0 v 6.068116 h 2.022705 v -4.045411 l 14.158938,0 v 4.045411 h 2.022706 z m 0,16.181643 h -2.022706 v 2.022707 h 2.022706 z M 6.87512,16.090821 v 2.022706 h 22.24976 v -2.022706 z m 6.068116,8.090821 v 2.022707 h 2.022706 v -2.022707 z m 12.136232,-4.04541 v 2.022705 h 2.022706 v -2.022705 z m -8.090822,4.04541 v 2.022707 h 2.022706 v -2.022707 z m -8.090821,0 v 2.022707 h 2.022705 v -2.022707 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="flip-vertically-button" class="akd__btn btn--info media-button" title="Flip vertically" onclick="flipImage('#photoshop-showcase-image img', 'vertical');"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-flip-vertically" d="m 21.034058,26.204349 h 2.022705 v -2.022705 h -2.022705 z m 4.04541,-12.136233 h 2.022707 V 12.045411 H 25.079468 Z M 8.897825,8 v 18.204349 h 6.068116 V 24.181644 H 10.92053 V 10.022706 h 4.045411 V 8 Z m 16.181643,0 v 2.022706 h 2.022707 V 8 Z m -8.090821,20.227054 h 2.022706 V 5.9772944 h -2.022706 z m 8.090821,-6.068116 h 2.022707 v -2.022706 h -2.022707 z m -4.04541,-12.136232 h 2.022705 V 8 h -2.022705 z m 4.04541,8.090822 h 2.022707 v -2.022706 h -2.022707 z m 0,8.090821 h 2.022707 v -2.022705 h -2.022707 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="screenshot-button" class="media-button" title="Screenshot"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-screenshot" d="M 26.079999,10.02 H 22.878298 L 21.029999,8 h -6.06 l -1.8483,2.02 H 9.9200015 c -1.111,0 -2.02,0.909 -2.02,2.02 v 12.12 c 0,1.111 0.909,2.02 2.02,2.02 H 26.079999 c 1.111,0 2.019999,-0.909 2.019999,-2.02 V 12.04 c 0,-1.111 -0.909,-2.02 -2.019999,-2.02 z m 0,14.14 H 9.9200015 V 12.04 h 4.0904965 l 1.8483,-2.02 h 4.2824 l 1.8483,2.02 h 4.0905 z m -8.08,-11.11 c -2.7876,0 -5.05,2.2624 -5.05,5.05 0,2.7876 2.2624,5.05 5.05,5.05 2.7876,0 5.049999,-2.2624 5.049999,-5.05 0,-2.7876 -2.262399,-5.05 -5.049999,-5.05 z m 0,8.08 c -1.6665,0 -3.03,-1.3635 -3.03,-3.03 0,-1.6665 1.3635,-3.03 3.03,-3.03 1.6665,0 3.03,1.3635 3.03,3.03 0,1.6665 -1.3635,3.03 -3.03,3.03 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="media-keyboard-shortcuts" class="media-button" title="Keyboard shortcuts 🗗"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-keyboard-shortcuts" d="m 24.492861,11.895714 h 2.597142 v 2.597143 h -2.597142 z m 0,3.895714 h 2.597142 v 2.597144 h -2.597142 z m -3.895714,-3.895714 h 2.597143 v 2.597143 h -2.597143 z m 0,3.895714 h 2.597143 v 2.597144 h -2.597143 z m -7.791429,3.895715 H 23.19429 v 2.597143 H 12.805718 Z M 8.9100043,11.895714 h 2.5971427 v 2.597143 H 8.9100043 Z m 0,3.895714 h 2.5971427 v 2.597144 H 8.9100043 Z m 3.8957137,0 h 2.597143 v 2.597144 h -2.597143 z m 0,-3.895714 h 2.597143 v 2.597143 h -2.597143 z m 3.895715,3.895714 h 2.597142 v 2.597144 h -2.597142 z m 0,-3.895714 h 2.597142 v 2.597143 H 16.701433 Z M 7.6113281,8 C 6.1828991,8 5.0273437,9.1692275 5.0273438,10.597656 l -0.013672,12.984375 c 0,1.428429 1.1692272,2.597657 2.5976562,2.597657 H 28.388672 c 1.428429,0 2.597656,-1.169228 2.597656,-2.597657 V 10.597656 C 30.986328,9.1692274 29.817101,8 28.388672,8 Z M 8.7617188,9.8496094 H 27.238281 c 1.27016,0 2.308594,0.9307206 2.308594,2.0683596 v 10.341797 c 0,1.13764 -1.038434,2.068359 -2.308594,2.068359 H 8.7617188 c -1.2701601,0 -2.3085938,-0.930719 -2.3085938,-2.068359 l 0.011719,-10.341797 c -10e-8,-1.137639 1.026715,-2.0683596 2.296875,-2.0683596 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="custom-script-toggle-button" class="media-button" title="Custom script"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-custom-script" d="m 19.658,22.84 5.75,-5.75 -5.75,-5.75 1.75,-1.7499999 7.5,7.4999999 -7.5,7.5 z m -3.316,0 -5.75,-5.75 5.75,-5.75 -1.75,-1.7499999 -7.5,7.4999999 7.5,7.5 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="options-toggle-button" class="akd__btn btn--pink media-button" title="Media Options"><svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><path id="efyt-options" d="m 17.215778,7.9998438 -0.121201,1.8617668 a 7.2941366,7.2941366 0 0 0 -2.61169,0.8471364 l -1.19138,-1.433778 -0.19737,0.143504 -0.437247,0.3173086 -0.436823,0.3177284 -0.197372,0.143504 0.993587,1.573917 a 7.2941366,7.2941366 0 0 0 -1.611792,2.223684 l -1.8070586,-0.459551 -0.075748,0.231879 -0.1666512,0.513838 -0.1670707,0.513838 -0.075329,0.232299 1.7271025,0.688064 a 7.2941366,7.2941366 0 0 0 -0.133827,1.374862 7.2941366,7.2941366 0 0 0 0.136352,1.374021 l -1.7296275,0.689325 0.075329,0.231879 0.1670707,0.513837 0.1666512,0.513838 0.075748,0.231877 1.8066396,-0.459549 a 7.2941366,7.2941366 0 0 0 1.614314,2.220318 l -0.99569,1.577282 0.197372,0.143505 0.436823,0.31773 0.437247,0.317306 0.19737,0.143506 1.187172,-1.42831 a 7.2941366,7.2941366 0 0 0 2.615898,0.844193 l 0.121201,1.859242 h 0.244084 0.53993 0.540349 0.244083 l 0.1212,-1.861768 a 7.2941366,7.2941366 0 0 0 2.611271,-0.847137 l 1.1918,1.43378 0.197372,-0.143506 0.437244,-0.317306 0.436827,-0.31773 0.19737,-0.143505 -0.993589,-1.573917 a 7.2941366,7.2941366 0 0 0 1.611792,-2.223683 l 1.807059,0.459549 0.07575,-0.231878 0.166648,-0.513837 0.16707,-0.513838 0.07533,-0.231879 -1.727521,-0.688483 a 7.2941366,7.2941366 0 0 0 0.134246,-1.374863 7.2941366,7.2941366 0 0 0 -0.13635,-1.37402 l 1.729625,-0.688905 -0.07533,-0.232299 -0.16707,-0.513838 -0.166648,-0.513838 -0.07575,-0.231879 -1.806636,0.459551 A 7.2941366,7.2941366 0 0 0 22.981616,11.774298 L 23.977308,10.197014 23.779938,10.05351 23.343111,9.7357816 22.905867,9.418473 22.708495,9.274969 21.521325,10.703277 A 7.2941366,7.2941366 0 0 0 18.905424,9.8590851 l -0.1212,-1.8592413 h -0.244083 -0.540349 -0.53993 z m 0.784434,3.9903412 a 5.0996903,5.0996903 0 0 1 5.099659,5.099659 5.0996903,5.0996903 0 0 1 -5.099659,5.09966 5.0996903,5.0996903 0 0 1 -5.100078,-5.09966 5.0996903,5.0996903 0 0 1 5.100078,-5.099659 z m 0,1.292801 a 3.8068902,3.8068902 0 0 0 -3.807279,3.806858 3.8068902,3.8068902 0 0 0 3.807279,3.80686 3.8068902,3.8068902 0 0 0 3.806859,-3.80686 3.8068902,3.8068902 0 0 0 -3.806859,-3.806858 z m 0,0.804632 a 3.0021577,3.0021577 0 0 1 3.001804,3.002226 3.0021577,3.0021577 0 0 1 -3.001804,3.002225 3.0021577,3.0021577 0 0 1 -3.002226,-3.002225 3.0021577,3.0021577 0 0 1 3.002226,-3.002226 z" fill="var(--efyt-control-bar-color)"></path></svg></button>
					<button id="download-button" class="akd__btn btn--warning media-button" title="Download Media"><svg version="1.1" viewBox="0 0 24 24" height="24" width="24" fill-rule="evenodd" clip-rule="evenodd"><path id="efyt-download" d="M6 16h-5v6h22v-6h-5v-1h6v8h-24v-8h6v1zm14 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5-17v14.884l4.736-5.724.764.645-5.979 7.195-6.021-7.205.765-.644 4.735 5.732v-14.883h1z"></path></svg></button>
				</div>
			</div>
			<nav class="window__side-nav bottom">
				<ul>
					<li>
						<a class="${AJAX_CLASS} refresh" href="#" data-ajax-target="#" data-ajax-target-type="id">
							<span class="link-icon"><i class="fa fa-redo"></i></span>
							<span class="link-title">refresh</span>
						</a>
					</li>
				</ul>
			</nav>
		</aside>
		<section id="" class="window__body-inner grid-s-">
			<div id="photos-showcase" class="photoshop photos-showcase grid">
				<div id="photos-showcase-toolbar" class="photos-showcase-toolbar no-wrap w--12 h--auto overflow--auto-x overflow--hidden-y">
					<span class="flex gap--2 mr--auto">
						<button id="" class="button" title="zoom image in" onclick="zoomIn('#photoshop-showcase-image img',0.5);" data-dextop-button><i class="fa fa-search-minus"></i></button>
						<button id="" class="button" title="zoom image out" onclick="zoomOut('#photoshop-showcase-image img',0.5);" data-dextop-button><i class="fa fa-search-plus"></i></button>
						<button id="" class="button" title="toggle image size" onclick="var $i = $(this).find('i');$('#photoshop-showcase-image img').toggleClass('actual-size,fit-to-window');$i.toggleClass('fa-compress,fa-expand');if($i.hasClass('fa-compress')){this.title = 'Fit image to window';} else {this.title='Display image in actual size';}" data-dextop-button><i class="fa fa-compress"></i></button>
					</span>
					<span class="m--auto flex-align-center">
						<!--<button id="" class="button" title="rotate image anti-clockwise 5 deg" onClick="$one('#photoshop-showcase-image img').style.transform = 'rotate(-5deg)';" data-dextop-button><i class="fa fa-undo"></i></button>
						<button id="" class="button" title="rotate image clockwise 5 deg" onClick="$one('#photoshop-showcase-image img').style.transform = 'rotate(5deg)';" data-dextop-button><i class="fa fa-redo"></i></button>
						-->
						<input type="range" min="0" max="360" step="1" value="0" oninput="$one('#photoshop-showcase-image img').style.transform = 'rotate('+this.value+'deg)';" data-dextop-input />
					</span>
					<span class="flex gap--2 ml--auto">
						<button id="" class="button" onclick="$('.photos-showcase-sidebar').toggleClass('toggled');$(this).toggleClass('is-active');" title="toggle showcase sidebar" data-dextop-button><i class="fa fa-exchange-alt"></i></button>
						<button id="" class="button" onclick="$('.photos-showcase .photos-showcase-thumbnails-wrapper').toggleClass('toggled');$('.photos-showcase').toggleClass('thumbnails-wrapper-toggled');" title="toggle thumbnails" data-dextop-button><i class="fa fa-images"></i></button>
						<button id="init-filters" class="button" title="initiate filters" data-dextop-button><i class="fa fa-sliders-h"></i></button>
					</span>
				</div>
				<div id="" class="" style="position:relative;top:0;width:100%;height:100%;">
					<!-- photos-showcase-sidebar start-->
					<div id="photos-showcase-sidebar" class="photos-showcase-sidebar">
						<div id="photos-showcase-window" class="photos-showcase-window">
							<div class="css-accordions">
								<div class="accordion">
									<input type="checkbox" name="accordion-1" id="accordion-1" checked="" class="accordion-switch">
									<label for="accordion-1" class="accordion-label">Accordion One</label>
									<div class="accordion-content">
										Content One
										<button class="-button"><svg class="loader-" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0094dd" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path></svg></button>
									</div>
								</div>
								<div class="accordion">
									<input type="checkbox" name="accordion-1" id="accordion-2" class="accordion-switch">
									<label for="accordion-2" class="accordion-label">Crop &amp; Rotate</label>
									<div class="accordion-content">
										Content Two
										<button class="-button" style="padding: 2rem;"><div class="arrow-icon "><div class=""></div></div></button>
									</div>
								</div>
								<div class="accordion">
									<input type="checkbox" name="accordion-1" id="accordion-3" class="accordion-switch">
									<label for="accordion-3" class="accordion-label">Filter</label>
									<div class="accordion-content h25">
										Content Three
									</div>
								</div>
							</div>
						</div>
						<div id="photos-showcase-editor" class="photos-showcase-editor">
							<div id="photos-showcase-editor-image" class="photos-showcase-editor-image"></div>
							<div id="" class="aspect">
								<button id="" class="button aspect-btn" title="toggle image size" onclick="var $i = $(this).find('i');$('#photos-showcase-editor-image img').toggleClass('actual-size,fit-to-window');$i.toggleClass('fa-compress,fa-expand');if($i.hasClass('fa-compress')){this.title = 'Fit image to window';} else {this.title='Display image in actual size';}" data-dextop-button><i class="fa fa-compress"></i></button>
								<button id="" class="button aspect-btn" title="zoom image in" onclick="zoomIn('#photos-showcase-editor-image img',0.75);" data-dextop-button><i class="fa fa-search-minus"></i></button>
								<button id="" class="button aspect-btn" title="zoom image out" onclick="zoomOut('#photos-showcase-editor-image img',0.75);" data-dextop-button><i class="fa fa-search-plus"></i></button>
							</div>
						</div>
						<div id="photos-showcase-drag-handle" class="showcase-drag-handle pos--abs h--12 z-index-9 top-0 bottom-0 right-0" style="left: auto;"></div>
					</div>
					<!-- photos-showcase-sidebar end-->
					
					<!-- photoshop-showcase-panels-wrapper start-->
					<div id="photoshop-showcase-panels-wrapper" class="photoshop-showcase-panels-wrapper h--12 w--12 pos--abs top-0">
						<div id="" class="splitter horizontal flex h--12">
							<div id="toolset" class="first--half no-border">
								<div id="" class="view-mode-content-wrapper splitter vertical flex h--12 overflow--auto">
									
									<div id="" class="file-viewer splitter_panel first--half no-border">
										<div id="" class="flex-place-center h--12 overflow--auto">
											<ul class="breadcrumbs"></ul>
											<input id="photoshop-files-input" class="photoshop-drop-area" type="file" accepts="" data-dextop-input>
											<div id="" class="drop-area-result"></div>
										</div>
									</div>
									
									<div id="first-first-half-resize-handle" class="splitter_handle showcase-drag-handle horizontal" style="z-index:8;"></div>
									
									<div id="" class="file-viewer splitter_panel second--half no-border">
										<div id="" class="h--12 overflow--auto">
											<div class="responsive-tabs">
												<input class="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked="">
												<input class="state" type="radio" title="tab-two" name="tabs-state" id="tab-two">
												<input class="state" type="radio" title="tab-three" name="tabs-state" id="tab-three">
												<div class="r-tabs flex-tabs">
													<label for="tab-one" id="tab-one-label" class="r-tab"><i class="fa fa-crop"></i><span class="ml--1">Crop &amp; Rotate</span></label>
													<label for="tab-two" id="tab-two-label" class="r-tab"><i class="fa fa-filter"></i><span class="ml--1">Filters</span></label>
													<label for="tab-three" id="tab-three-label" class="r-tab"><i class="fa fa-paint-brush"></i><span class="ml--1">Adjustments</span></label>
													<div id="filter-controls" class="reader-input flex nowrap">
														<!--<div class="progress-indicator-wrapper loading grid-12"><div id="reader-progress-indicator" class="progress-indicator" style="width:40%;"></div></div>-->
													</div>
													<div class="clear pos-rel"></div>
													<div id="tab-one-panel" class="r-panel pos-rel active">
														<div id="transforms-root" class=""></div>
													</div>
													<div id="tab-two-panel" class="r-panel transparent pos-rel">
														<div id="filters-root" class="panel- block" style="display:block;"></div>
														<!--<pre id="text-display" class="reader-display"></pre>-->
													</div>
													<div id="tab-three-panel" class="r-panel transparent pos-rel">
														<div id="adjustments-root" class="panel- block" style="display:block;"></div>
													</div>
													<div id="tab-four-panel" class="r-panel pos-rel active">
														<div id="reader-file-info" class="reader-file-info pos-fixed block text-left"></div>
														<h3>Panel 1</h3>
														<pre class="with-line-number" contenteditable="true">
															<span>def print_hi(name)</span>
															<span>  puts "Hi, #{name}"</span>
															<span>end</span>
															<span></span>
															<span>print_hi('Tom')</span>
															<span>#=&gt; prints 'Hi, Tom' to STDOUT.</span>
														</pre>
														<pre class="with-line-number" contenteditable="true">
															<span>def print_hi(name)</span>
															<span>  puts "Hi, #{name}"</span>
															<span>end</span>
															<span></span>
															<span>print_hi('Tom')</span>
															<span>#=&gt; prints 'Hi, Tom' to STDOUT.</span>
														</pre>
														<pre class="with-line-number" contenteditable="true">
															<span>def print_hi(name)</span>
															<span>  puts "Hi, #{name}"</span>
															<span>end</span>
															<span></span>
															<span>print_hi('Tom')</span>
															<span>#=&gt; prints 'Hi, Tom' to STDOUT.</span>
														</pre>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div id="drag-shield" class="drag-shield" style="display:none;position:absolute;z-index:9;top:0;width:100%;height:100%;"></div>
							</div>
							
							<div id="second-first-half-resize-handle" class="splitter_handle showcase-drag-handle left" style="z-index:8;"></div>
							
							<div id="photoshop-showcase-image" class="photoshop-showcase-image splitter_panel second--half no-border overflow-auto">
								
							</div>
						</div>
						<div id="drag-shield" class="drag-shield" style="display:none;position:absolute;z-index:9;top:0;width:100%;height:100%;"></div>
					</div>
					<!-- photoshop-showcase-panels-wrapper end-->
					
					<!-- photoshop-showcase-thumbnails-wrapper start-->
					<div id="photos-showcase-thumbnails-wrapper" class="photos-showcase-thumbnails-wrapper">
						<div id="photos-showcase-thumbnails-info" class="photos-showcase-thumbnails-info"></div>
						<div id="photos-showcase-thumbnails" class="photos-showcase-thumbnails"></div>
					</div>
				</div>
			</div>
		</section>`,
		components: [],
		wallpaper: '', 
		config:{
			shortcut: {add_to_dextop: true, display_title: true, icon_size: 'default', expand_on_click: false}, 
			'window': {dimensions:'[\'50%\',\'60%\']', sidebar_placement: 'right'}
		},
		cell_id: 6
	},
	{
		id: 'experiments-window', 
		name: 'experiments', 
		icon: `${IMAGES_URL}icons/lab.png`, 
		type: '', 
		category:'administration', 
		ajaxTarget: '#experiments-ajax-window', 
		ajaxTargetType: 'id',
		attrs:{
			className: "window window--purple", 
			dataset:{name: 'experiments', title: 'experiments window', wallpaper: '', 'side-placement':'right'}
		},
		attrs:'class="window window-solid window--purple" data-name="experiments" data-title="experiments window" data-wallpaper=""',
		sidebar_content: `<div class="sidebar-head px--8 py--3 flex bg:opaque">
			<input id="experiments-filter-input" class="akd__input-text bdr--x2 w--12" placeholder="filter experiment options" data-filter-item="#experiments-nav > .nav-item" data-filter-item-display="flex" data-experiments-window-input />
		</div>
		<div class="sidebar-body">
			<nav id="experiments-nav" class="experiments-nav w--12 h--12 overflow--auto" style="grid-template-rows: max-content;align-content: start;" data-layout="grid" data-layout-cols="2" data-layout-gap="4">
				<!-- <div class="nav-item vh--2 flex flex--col bg:opaque">
					<span class="bg--center bg--no-repeat bg--contain w--12 h--12 block bg--red" style="background-image: url('./app/assets/img/icons/blog.png');"></span>
					<span class="w--12 text--center">Text</span>
				</div> -->
			</nav>
		</div>`,
		footer_content: `<span class="flex-place-center mr--auto">
			<button class="akd__btn btn--success bdr--50 p--4 nav-item" data-name="home" data-target="#experiments-ajax-window" data-experiments-window-button=""><i class="fa fa-home"></i></button>
		</span>`,
		body_content: ``, 
		template: ``, 
		//components: [],
		//wallpaper: '', 
		//wallpaper: 'bg--samurai', 
		wallpaper: {
			//backgroundImage: `${IMAGES_URL}wallpapers/404.jpg`, 
			backgroundImage: `${IMAGES_URL}other/4.jfif`, 
			backgroundColor: '', 
			backgroundSize: 'cover', 
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'local',
			backgroundPosition: 'center center',
			backgroundBlendMode: 'normal',
			
		}, 
		config: {
			shortcut: {add_to_dextop: true, display_title: false, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions: '', wallpaper_opacity: 0.5, sidebar_placement:'right'}
		},
		cell_id: 7, 
		callbacks: ($) => {
			let experimentsCateories = [
				{text: "Text", icon: `${IMAGES_URL}icons/text.png`, bgColor: "bg--info"},
				{text: "Javascript", icon: `${IMAGES_URL}icons/js.png`, bgColor: "bg--yellow"},
				{text: "HTML", icon: `${IMAGES_URL}icons/html.png`, bgColor: "bg--red"},
				{text: "SVG", icon: `${IMAGES_URL}icons/graphql.png`, bgColor: "bg--dark"},
				{text: "Canvas", icon: `${IMAGES_URL}icons/frames.png`, bgColor: "bg--default"},
				//{text: "", icon: `${IMAGES_URL}icons/.png`, bgColor: "bg--"},
			], 
			navItems = experimentsCateories.map(cat => {
				return `<div class="nav-item vh--2 flex flex--col bg:opaque cursor-pointer" data-name="${cat.text}" data-target="#experiments-ajax-window" data-experiments-window-button>
					<span class="block w--12 h--12 bg--center bg--no-repeat bg--contain ${cat.bgColor}" style="background-image: url('${cat.icon}');pointer-events: none;"></span>
					<span class="w--12 text--center" style="pointer-events: none;">${cat.text}</span>
				</div>`;
			}).join('');
			
			$("#experiments-nav").append(navItems);
			
			//$(".experiments-nav > .nav-item").click((e) => {
			$(document).on("change input","[data-experiments-window-input]", function(e){
				let $this = $.isElement(this) ? this : e.target;
				if($this.id.startsWith("text-")){
					if($this.id === "text-experiments-wrap-options"){
						let $val = $this.value, $target = $this.dataset.target || "#text-experiments-text-input";
						$.one($target).style.whiteSpace = $val;
					} else if($this.id === "text-experiments-converter-options"){
					} else if($this.id === "text-experiments-format-options"){
						let $selectedOption = $this.value || "lowercase", $target = $this.dataset.target || "#text-experiments-text-input", 
						$content = $.one($target).textContent;
						if($.isFunction($[$selectedOption])){
							$.one($target).textContent = $[$selectedOption]($content);
						} else {}
					} else if($this.id === "text-experiments-file-input"){
						let $target = $this.dataset.target || "#text-experiments-text-input", 
						$files = $this.files, $file = $files[0], fr = new FileReader(), as = 'Text';
						fr.onload = function(e){
							$.one($target).textContent = this.result;
							$.one("#text-experiments-hidden-input").value = this.result;
						}
						//fr.onerror = function(e) { reject(new Error('Error reading' + file.name + ': ' + e.target.result)) }
						fr['readAs' + as]($file);
					}
				} else if($this.id.startsWith("svg-")){
					let $svgElement = $.one("#svg-experiments-display-container > svg");
					if($this.id === "svg-experiments-file-input"){
						let $files = $this.files, $file = $files[0], fr = new FileReader(), as = 'Text';
						fr.onload = function(e){
							let $size = $.one("#svg-experiments-size-input").value, $unit = $.one("#svg-experiments-size-unit-select").value;
							$("#svg-experiments-display-container").empty().append(this.result).find("svg").css({width: `${$size}${$unit}`, height: `${$size}${$unit}`, "stroke": $.one("#svg-experiments-stroke-input").value, "fill": $.one("#svg-experiments-fill-input").value});
							//$("#svg-experiments-element").text(this.result);
							let el = $.tag("div", {"innerHTML":this.result});
							//$("#svg-experiments-element").html(destructure(el.firstChild));
							visualizeElement($("#svg-experiments-element"), el.firstChild);
						
							console.log($file, this.result)
						}
						//fr.onerror = function(e) { reject(new Error('Error reading' + file.name + ': ' + e.target.result)) }
						fr['readAs' + as]($file);
					} else if($this.id === "svg-experiments-size-input"){
						let $unit = $.one("#svg-experiments-size-unit-select").value;
						Object.assign($svgElement.style, {width: `${$this.value}${$unit}`, height: `${$this.value}${$unit}`});
						$.one("#svg-experiments-size-display").textContent = `${$this.value}${$unit}`;
					} else if($this.id === "svg-experiments-element-depth-input"){
						//let $unit = $.one("#svg-experiments-size-unit-select").value;
						//Object.assign($svgElement.style, {width: `${$this.value}${$unit}`, height: `${$this.value}${$unit}`});
						$.one("#svg-experiments-element-depth-display").textContent = `${$this.value}`;
					} else if($this.id === "svg-experiments-size-unit-select"){
						if($this.value === "px") {
							$this.setAttribute('min','24');
							$this.setAttribute('max', '500');
							//Object.assign($this, {min: '24', max: '500'});
						} else {
							$this.setAttribute('min','1');
							$this.setAttribute('max', '100');
							//Object.assign($this, {min: '1', max: '100'});
						}
						console.log($this.value)
					} else if($this.id === "svg-experiments-stroke-linecap-input"){
						$svgElement.style.strokeLinecap = $this.value;
					} else if($this.id === "svg-experiments-stroke-linejoin-input"){
						$svgElement.style.strokeLinejoin = $this.value;
					} else if($this.id === "svg-experiments-stroke-opacity-input"){
						$svgElement.style.strokeOpacity = $this.value;
					} else if($this.id === "svg-experiments-fill-opacity-input"){
						$svgElement.style.fillOpacity = $this.value;
					} else if($this.id === "svg-experiments-stroke-input"){
						$svgElement.style.stroke = $this.value;
						$.one("#svg-experiments-stroke-current-color").style.backgroundColor = $this.value;
					} else if($this.id === "svg-experiments-fill-input"){
						$svgElement.style.fill = $this.value;
						$.one("#svg-experiments-fill-current-color").style.backgroundColor = $this.value;
					} else if($this.id === "svg-experiments-stroke-width-input"){
						$svgElement.style.strokeWidth = `${$this.value}px`;
					} else if($this.id === "svg-experiments-stroke-dashoffset-input"){
						$svgElement.style.strokeDashoffset = $this.value;
					} else if($this.id === "svg-experiments-stroke-dasharray-input"){
						$svgElement.style.strokeDasharray = $this.value;
					} else if($this.id === "svg-experiments-stroke-miterlimit-input"){
						$svgElement.style.strokeMiterlimit = $this.value;
					}
				}
			});

			$(document).on("keyup","[data-experiments-window-input]", function(e){
				let $this = $.isElement(this) ? this : e.target;
				if($this.id === "experiments-filter-input"){
					// filterItems(".notepad-notes-list-item")
					console.log(e.target.value)
					let $val = $this.value, $filterItem = $this.dataset.filterItem, $origFiterItemDisplay = $this.dataset.filterItemDisplay || "flex", 
					$filterProp = "name";
					filterItems($val, $filterItem, $origFiterItemDisplay, $filterProp);
				} else if($this.id === "text-experiments-text-input"){
					$.one("#text-experiments-hidden-input").value = $this.textContent;
				}
			});

			$(document).on("click","[data-experiments-window-button]", function(e){
				let $this = $.isElement(this) ? this : e.target;
				if($this.matches(".nav-item")){
					let $exp = $this.dataset.name, $target = $this.dataset.target, $content = loadExperimentUI($exp);
					loader($($target), $content, 1000).then(()=>{
						if($exp.toLowerCase() === "html"){
							_.dragElement('#html-experiments-main-splitter-handle', '#html-experiments-main-splitter > #html-experiments-main-splitter-panel-1', '#html-experiments-main-splitter > #html-experiments-main-splitter-panel-2', 'H');
						} else if($exp.toLowerCase() === "svg"){
							SVGIconsCreator.addIcon("AddInd",[
								{"path":{d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}},
								],{name:"AddInd", as: "object"}
							);
							let fragm = document.createDocumentFragment(), 
							icons = SVGIconsCreator.icons({as: "object"});
							for(let i in icons){
								let svg, title;
								if(isObject(icons[i])){
									svg = icons[i].svg;
									title = icons[i].name;
								} else {
									svg = icons[i];
									title = i;
								}
								let img = $.tag("div", {'class':'svg-icon-wrapper bg--inherit'},
									$.tag("span", {'class':'svg-icon akd__btn btn--inherit','title': title, 'innerHTML': svg}), 
									$.tag("span", {'class':'svg-icon-title bg--opaque','title': title}, title)
								);
								$.on(img, "click", (e) => {
									let $size = $.one("#svg-experiments-size-input").value, $unit = $.one("#svg-experiments-size-unit-select").value;
									$("#svg-experiments-display-container").empty().append(svg).find("svg").css({width: `${$size}${$unit}`, height: `${$size}${$unit}`, "stroke": $.one("#svg-experiments-stroke-input").value, "fill": $.one("#svg-experiments-fill-input").value});
									$(".svg-icon-wrapper .svg-icon").removeClass("is-active");
									$(img).find(".svg-icon").addClass("is-active");
									///////////////////////////////////////////////
									
									let el = $.tag("div", {"innerHTML":svg}), $depth = $.one("#svg-experiments-element-depth-input").value || 1;
									visualizeElement($("#svg-experiments-element"), el.firstChild, Number($depth));
									//$("#svg-experiments-element").html(destructure(el.firstChild));
									//$("#svg-experiments-element").html(destructure(el.firstChild));
									//console.log(svg, el, el.firstChild)
									el = null;
								});
								fragm.appendChild(img);
							}
							$.one("#svg-icons-list").appendChild(fragm);
							fragm = null;
							_.dragElement('#svg-experiments-main-splitter-handle', '#svg-experiments-main-splitter > #svg-experiments-main-splitter-panel-1', '#svg-experiments-main-splitter > #svg-experiments-main-splitter-panel-2', 'V');
							drawer("#svg-experiments-main-drawer", "#svg-experiments-main-drawer-handle", "bottom")
						}
						console.log(`Initiating ${$exp} splitter`)
					});
					$(".nav-item").each(el => {el.classList.remove("bg--black","text-white")})
					$($this).addClass("bg--black text-white")
				} else if($this.matches(".experiments-copy-button")){
					let $target = $this.dataset.copyTarget;
					copy($target);
				} else if($this.matches(".experiments-paste-button")){
					let $target = $this.dataset.pasteTarget;
					paste($target);
				} else if($this.matches(".experiments-info-button")){
					let $target = $.one($this.dataset.infoTarget);
					let $text = $target.value??$target.textContent;
					console.log($text);
					$text = textInfo($text);
					$("#text-experiments-info-container").removeClass("h--0").addClass("h--6").text($text);
				} else if($this.id === "text-experiments-info-toggler-button") {
					$("#text-experiments-info-container").toggleClass("h--0 h--6").toggleClass("p--0 p--8");
				} else if($this.id === "html-experiments-reset-button") {
					alert("working on it");
				} else if($this.id === "html-experiments-run-button") {
					let $i = $.one('i', $this);
					//$('i', $this).removeClass("fa-running").addClass("fa-spinner fa-spin")
					$($this).removeClass("btn--danger").addClass("btn--primary").find("i").removeClass("fa-running").addClass("fa-spinner fa-spin")
					run({html_code: $.one(`#html-experiments-html-input`).value, css_code: $.one(`#html-experiments-css-input`).value, js_code: $.one(`#html-experiments-js-input`).value});
					setTimeout(()=>{
						$($this).removeClass("btn--primary").addClass("btn--danger").find("i").removeClass("fa-spinner fa-spin").addClass("fa-running");
					}, 2000);
				} else if($this.id === "svg-experiments-main-sidebar-toggler") {
					$($this).toggleClass("is-active");
					if($this.classList.contains("is-active")){
						$("#svg-experiments-main-sidebar").removeClass("w--4").addClass("w--0");
					} else {
						$("#svg-experiments-main-sidebar").removeClass("w--0").addClass("w--4");
					}
				}
			});

			loader($("#experiments-ajax-window"), loadExperimentUI(), 1000);

			function loadExperimentUI(exp='home'){
				let tmp = '', finalOutput = '', selExp = exp.toLocaleLowerCase() || 'home';
				if(selExp === '' || selExp === 'home'){
					tmp = `<nav id="experiments-inner-nav" class="experiments-nav w--12 h--12 p--8 overflow--auto" style="grid-template-rows: max-content;align-content: start;" data-layout="grid" data-layout-cols="2" data-layout-gap="4">
						${navItems}
					</nav>`;
				} else if(selExp === 'text'){
					tmp = `<div class="w--12 h--12 p--0 overflow--hidden">
						<pre id="text-experiments-text-input" class="w--12 h--11 m--0 no--resize" style="inset -2px -2px 1px 0px var(--color), inset 1px 1px 15px 3px #444;padding: 1.125rem;" contenteditable data-experiments-window-input></pre>
						<div class="flex flex--center flex--between gap--4 w--12 px--8 h--1 bg:opaque overflow--auto">
							<span class="flex flex--center gap--4">
								<label class="akd__btn btn--inherit" for="text-experiments-file-input"><i class="fa fa-upload"></i><input id="text-experiments-file-input" class="visually--hidden akd__input-file" type="file" accepts="text/*" data-target="#text-experiments-text-input" data-experiments-window-input /></label>
								<button id="text-experiments-info-toggler-button" class="akd__btn btn-- group-btn" type="button" title="toggle text info container" data-info-target="#text-experiments-info-container" data-experiments-window-button><i class="fa fa-exchange-alt"></i></button>
							</span>
							<span class="ws--nw">
								<select id="text-experiments-converter-options" class="akd__input-select" title="convert text" data-experiments-window-input>
									<option value="" class="text--sm">--select converter--</option>
									<option value="text-to-base64">TEXT-TO-BASE64</option>
									<option value=""></option>
								</select>
								<select id="text-experiments-format-options" class="akd__input-select" title="format text" data-experiments-window-input>
									<option value="" class="text--sm">--select format--</option>
									<option value="lowercase">lowercase</option>
									<option value="uppercase">uppercase</option>
									<option value="hyphenate">hyphenate</option>
									<option value="dasherize">dasherize</option>
									<option value="capitalize">capitalize</option>
									<option value="camelCase">camelcase</option>
									<option value="camelize">camelize</option>
									<option value="uppercase-word">uppercase-word</option>
								</select>
							</span>
							<span class="flex gap--2">
								<select id="text-experiments-wrap-options" class="akd__input-select" data-experiments-window-input>
									<option value="break-spaces">break-spaces</option>
									<option value="normal">normal</option>
									<option value="pre">pre</option>
									<option value="pre-line">pre-line</option>
									<option value="pre-wrap">pre-wrap</option>
									<option value="nowrap">nowrap</option>
								</select>
								<span class="flex flex--center gap--2">
									<button id="text-experiments-copy-button" class="experiments-copy-button akd__btn btn-- group-btn" type="button" title="copy text" data-copy-target="#text-experiments-text-input" data-experiments-window-button><span class="mr--3">copy</span><i class="fa fa-copy"></i></button>
									<button id="text-experiments-paste-button" class="experiments-paste-button akd__btn btn-- group-btn" type="button" title="paste text" data-paste-target="#text-experiments-text-input" data-experiments-window-button><span class="mr--3">paste</span><i class="fa fa-paste"></i></button>
									<button id="text-experiments-info-button" class="experiments-info-button akd__btn btn-- group-btn" type="button" title="show text info" data-info-target="#text-experiments-text-input" data-experiments-window-button><span class="mr--3">info</span><i class="fa fa-info"></i></button>
								</span>
							</span>
						</div>
						<div id="text-experiments-info-container" class="pos--abs bottom--1 w--6 h--0 p--0 ws--pre overflow--auto bg--blue-green-gradient">
						</div>
						<textarea id="text-experiments-hidden-input" class="visually--hidden"></textarea>
					</div>`;
				} else if(selExp === 'javascript'){
					tmp = `<textarea class="w--12 h--11 no--resize" style="inset -2px -2px 1px 0px var(--color), inset 1px 1px 15px 3px #444;padding: 1.125rem;"></textarea>
					<div class="flex flex--center gap--4 h--1 bg:opaque">
						<div class="btn-group w--12 flex-important flex--justify-center">
							<button id="javsscript-experiments-run-button" class="group-btn" type="button" title="run experiment" data-experiments-window-button><span class="mr--3">run</span><i class="fa fa-running"></i></button>
							<button id="javsscript-experiments-reset-button" class="group-btn" type="button" title="reset experiment" data-experiments-window-button><span class="mr--3">reset</span><i class="fa fa-sync"></i></button>
							<button id="" class="group-btn" type="button" title="" data-experiments-window-button><i class="fa fa-running"></i></button>
						</div>
					</div>`;
				} else if(selExp === 'html'){
					tmp = `<div id="html-experiments-main-splitter" class="splitter horizontal flex nowrap w--12 h--12 p--0" data-splitter-ratio="60:40" data-splitter-orientation="horizontal">
						<div id="html-experiments-main-splitter-panel-1" class="splitter_panel first--half flex-s-5" style="display: grid;grid-template-rows: auto 1fr auto;">
							<div class="flex gap--4">
							</div>
							<div class="pos--rel" data-layout="grid" data-layout-rows="3" data-layout-gap="2">
								<div class="show-content-divider pos--rel pl--4 py--4" data-layout="grid-auto" data-layout-cols="1fr-auto" data-layout-gap="4">
									<textarea id="html-experiments-html-input" class="akd__input-textarea w--12 h--12 no--resize" placeholder="Enter HTML Content" data-experiments-window-input></textarea>
								</div>
								<div class="show-content-divider pos--rel pl--4 py--4" data-layout="grid-auto" data-layout-cols="1fr-auto" data-layout-gap="4">
									<textarea id="html-experiments-css-input" class="akd__input-textarea w--12 h--12 no--resize" placeholder="Enter CSS Content" data-experiments-window-input></textarea>
								</div>
								<div class="show-content-divider pos--rel pl--4 py--4" data-layout="grid-auto" data-layout-cols="1fr-auto" data-layout-gap="4">
									<textarea id="html-experiments-js-input" class="akd__input-textarea w--12 h--12 no--resize" placeholder="Enter Javascript Content" data-experiments-window-input></textarea>
								</div>
							</div>
							<div class="flex gap--4 py--2 bg:opaque">
								<span class="btn-group flex-important flex--justify-center w--7">
									<button id="html-experiments-run-button" class="akd__btn btn--danger group-btn" type="button" title="run experiment" data-experiments-window-button><span class="mr--3">run</span><i class="fa fa-running"></i></button>
									<button id="html-experiments-reset-button" class="akd__btn btn--warning group-btn" type="button" title="reset experiment"  data-experiments-window-button><span class="mr--3">reset</span><i class="fa fa-sync"></i></button>
								</span>
								<span class="flex flex--center gap--4 w--5">
									<label for="html-experiments-live-edit-checkbox">Live Edit?</label>
									<input id="html-experiments-live-edit-checkbox" class="" type="checkbox" data-experiments-window-input />
								</span>
							</div>
						</div>
						<span id="html-experiments-main-splitter-handle" class="splitter_handle"></span>
						<div id="html-experiments-main-splitter-panel-2" class="splitter_panel second--half pos--rel flex-s-7 grid-important" data-layout="grid-auto" data-layout-rows="1fr-auto">
							<iframe id="html-experiments-iframe" class="w--12 h--12 bg--white" style="pointer-events: none;" sandbox="allow-scripts" frameborder="0" crossorigin="anonymous" src="" srcdoc=""></iframe>
							<div class="flex--align-center py--2 px--4 flex--between">
								<span class="bdr--x2 bg:opaque flex gap--2 py--2 px--6 py--4">
									<button class="akd__btn btn--primary py--2 px--8" title="reload iframe"onclick="document.getElementById('html-experiments-iframe').src = document.getElementById('html-experiments-iframe-url-input').value"><i class="fa fa-sync"></i></button>
									<button class="akd__btn btn--success py--2 px--8" title="visit url" onclick="let el = document.getElementById('html-experiments-iframe');el.src = document.getElementById('html-experiments-iframe-url-input').value;if(el.hasAttribute('srcdoc')){el.removeAttribute('srcdoc');}"><i class="fa fa-paper-plane"></i></button>
								</span>
								<span class="bdr--x2 bg:opaque flex gap--2 py--2 px--6"><input id="html-experiments-iframe-url-input" class="akd__input-text w--12 py--2 bdr--x2" data-experiments-window-input /></span>
							</div>
						</div>
					</div>`;
				} else if(selExp === 'svg'){
					tmp = `<div id="" class="flex nowrap w--12 h--12 p--0">
						<div id="svg-experiments-main-sidebar" class="pos-rel flex flex--col gap--4 w--4 h--12 overflow--auto">
							<div class="flex flex--col pos--rel w--12 gap--4">
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-stroke-width-input">stroke width</label>
									<input id="svg-experiments-stroke-width-input" class="akd__input-range" type="range" min="1" max="25" step="1" value="1" data-experiments-window-input />
								</div>
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-stroke-miterlimit-input">stroke miterlimit</label>
									<input id="svg-experiments-stroke-miterlimit-input" class="akd__input-range" type="range" min="0" max="50" step="1" value="0" data-experiments-window-input />
								</div>
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-stroke-dasharray-input">stroke dasharray</label>
									<input id="svg-experiments-stroke-dasharray-input" class="akd__input-range" type="range" min="0" max="50" step="1" value="0" data-experiments-window-input />
								</div>
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-stroke-dashoffset-input">stroke dashoffset</label>
									<input id="svg-experiments-stroke-dashoffset-input" class="akd__input-range" type="range" min="0" max="50" step="1" value="0" data-experiments-window-input />
								</div>
							</div>

							<div class="flex flex--col pos--rel w--12 gap--4">
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-stroke-opacity-input">stroke opacity</label>
									<input id="svg-experiments-stroke-opacity-input" class="akd__input-range" type="range" min="0" max="1" step="0.01" value="1" data-experiments-window-input />
								</div>
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-fill-opacity-input">fill opacity</label>
									<input id="svg-experiments-fill-opacity-input" class="akd__input-range" type="range" min="0" max="1" step="0.01" value="1" data-experiments-window-input />
								</div>
							</div>

							<div class="flex flex--col pos--rel w--12 gap--4">
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-stroke-input">stroke <sup class="text--tn">(color)</sup></label>
									<!-- <input id="svg-experiments-stroke-input" class="akd__input-color w--12" type="color" data-experiments-window-input /> -->
									<div class="flex p--2">
										<div class=""><button id="svg-experiments-stroke-current-color" class="no--bg-image no--border no--outline w--1 h--12 bdr--0-br bdr--2-bl bdr--0-tr bdr--2-tl" style="background-color: #ff0000;width: 40px;"></button></div>
										<div class="flex-item-even"><input id="svg-experiments-stroke-input" class="bdr--2-br bdr--0-bl bdr--2-tr bdr--0-tl text--sm w--12 bg--white type="text" value="#ff0000" placeholder="rgba(17, 0, 187, 0.867)" style="border-top: 1px solid rgb(221, 221, 221);border-right: 1px solid rgb(221, 221, 221);border-bottom: 1px solid rgb(221, 221, 221);border-image: initial;color: rgb(0, 0, 0);border-left: none;outline: none;" data-experiments-window-input /></div>
									</div>
								</div>
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-fill-input">fill <sup class="text--tn">(color)</sup></label>
									<!-- <input id="svg-experiments-fill-input" class="akd__input-color w--12" type="color" data-experiments-window-input /> -->
									<div class="flex p--2">
										<div class=""><button id="svg-experiments-fill-current-color" class="no--bg-image no--border no--outline w--1 h--12 bdr--0-br bdr--2-bl bdr--0-tr bdr--2-tl" style="background-color: purple;width: 40px;"></button></div>
										<div class="flex-item-even"><input id="svg-experiments-fill-input" class="bdr--2-br bdr--0-bl bdr--2-tr bdr--0-tl text--sm w--12 bg--white type="text" value="purple" placeholder="rgba(17, 0, 187, 0.867)" style="border-top: 1px solid rgb(221, 221, 221);border-right: 1px solid rgb(221, 221, 221);border-bottom: 1px solid rgb(221, 221, 221);border-image: initial;color: rgb(0, 0, 0);border-left: none;outline: none;" data-experiments-window-input /></div>
									</div>
								</div>
							</div>

							<div class="flex flex--col pos--rel w--12 gap--4">
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-stroke-linecap-input">stroke linecap</label>
									<select id="svg-experiments-stroke-linecap-input" class="akd__input-select" data-experiments-window-input>
										<option value="butt">butt</option>
										<option value="round">round</option>
										<option value="square">square</option>
									</select>
								</div>
								<div class="flex flex--col gap--2 bg:opaque p--4">
									<label class="taxt--sm text--900" for="svg-experiments-stroke-linejoin-input">stroke linejoin</label>
									<select id="svg-experiments-stroke-linejoin-input" class="akd__input-select" data-experiments-window-input>
										<option value="bevel">bevel</option>
										<option value="miter">miter</option>
										<option value="square">square</option>
									</select>
								</div>
							</div>
						</div>
						<div id="svg-experiments-main-splitter" class="splitter vertical flex flex-item-even nowrap w--8 h--12 p--0" data-splitter-ratio="60:40" data-splitter-orientation="vertical">
							<div id="svg-experiments-main-splitter-panel-1" class="splitter_panel first--half flex flex--col w--12 bg--info pos--rel">
								<div id="svg-experiments-display-container" class="flex-place-center h--12 p--8 bg--black" style="background-image: url('${IMAGES_URL}bg/dot.svg');" data-experiments-window-dropzone>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style="width: 100%;height: 100%;stroke: red;fill: purple;fill-opacity: 0.75;stroke-dashoffset: 12%;stroke-dasharray: context-value;stroke-linecap: square;stroke-width: 4px;stroke-opacity: 0.5;stroke-linejoin: bevel;stroke-miterlimit: 5;"><g fill="#a2a2a2" style="fill: black;"><path d="M0 0h.3L0 .3V0zM35.7 174.7c9.4-9.3 18.6-19 28.3-28 5.4 4.8 9 11.2 14.7 15.6 1.7 1.6 4.1.8 6.2.9C74.2 173.8 63.7 184.5 53 195c-2 2.4-5.8 3-8.4 1.3-3-2.2-5.4-5.2-8.2-7.7-2-2-4.8-4.3-4.4-7.6-.3-2.8 2-4.6 3.7-6.3z"></path></g><path fill="#ccc" d="M0 40.3C1.3 36 5 31.8 9.9 32h78.2v32H0V40.3z"></path><path fill="#999" d="M88 32h84v32H88V32z"></path><path fill="#666" d="M172 32h74c4.7-.2 8 3.6 10 7.3v24.6h-84V32z"></path><path fill="#454545" d="M0 64a51685.4 51685.4 0 00172 0c28 0 56-.2 84-.1v152.8c-1.9 2.5-3.8 5.2-6.7 6.6-3.7.8-7.5.3-11.3.4l-220 .2c-3.8 0-7.7.4-11.4-.6-3-1.2-4.8-4-6.6-6.6V64m38.4 33.4c-2.5 2.9-6.8 5.3-6.4 9.6-.2 2.2 1.3 3.9 2.7 5.3l31.6 31.5-2.3 3c-9.7 9-18.9 18.6-28.3 27.9-1.7 1.7-4 3.6-3.7 6.3-.4 3.3 2.3 5.5 4.4 7.6 2.8 2.5 5.1 5.5 8.2 7.7 2.6 1.8 6.4 1 8.4-1.3 10.7-10.5 21.2-21.2 31.9-31.8l3-3.1c3.7-3.4 7.1-7 10.7-10.5 1.5-1.5 3.2-3.3 3-5.6.2-2.6-1.8-4.4-3.5-6.1a6973 6973 0 01-43-43c-2-2-4-4.6-7-4.4-4.4.1-6.7 4.4-9.7 7m84.8 78.7c-1.8.9-3.4 2.7-3.2 4.8 0 5-.1 10 .1 15 .3 2.7 3.3 4.3 5.9 4 24.3 0 48.7 0 73-.2 2.7.2 5-2.1 4.8-4.8 0-5.2.4-10.5-.1-15.8-1-2.8-4.1-3.4-6.7-3.1-24.6.1-49.2-.4-73.8.1z"></path><g fill="#dfdfdf"><path d="M38.4 97.4c3-2.5 5.3-6.8 9.6-6.9 3.1-.2 5.1 2.5 7.1 4.4a6973 6973 0 0043 43c1.7 1.7 3.7 3.5 3.6 6.1 0 2.3-1.6 4-3.1 5.6L88 160c-2.5-.3-5.4.1-7.2-2l-14.5-14.3-31.6-31.5c-1.4-1.4-2.9-3.1-2.8-5.3-.3-4.3 4-6.7 6.5-9.6zM123.2 176.2c24.6-.5 49.2 0 73.8-.1 2.6-.3 5.8.3 6.7 3.1.5 5.3.1 10.6.1 15.8.3 2.7-2.1 5-4.8 4.8l-73 .2c-2.6.3-5.6-1.3-5.9-4-.2-5 0-10 0-15-.3-2.1 1.3-4 3-4.8z"></path></g><path fill="#7f7f7f" d="M66.3 143.8l14.5 14.3c1.8 2.1 4.7 1.7 7.2 2l-3.1 3.1c-2-.1-4.5.7-6.2-.9-5.6-4.4-9.3-10.8-14.7-15.5l2.3-3z"></path></svg>
								</div>
								<div id="svg-experiments-main-drawer" class="akd__drawer flex-place-center w--12 bg--black" data-drawer-position="bottom">
									<span id="svg-experiments-main-drawer-handle" class="drawer-handle w--12 bg--white" style="height: 4px;cursor: grab;">
										<span class="drawer-knob"></span>
									</span>
									<div id="svg-experiments-element" class="drawer-contents flex flex--col w--12 h--12 p--8 ui-pattern-1 overflow--auto"></div>
								</div>
							</div>

							<span id="svg-experiments-main-splitter-handle" class="splitter_handle"></span>
							
							<div id="svg-experiments-main-splitter-panel-2" class="splitter_panel second--half pos--rel flex gap--4 p--4" data-layout="grid-auto" data-layout-rows="1fr-auto" style="height: 28.702%;">
								<div class="f--6 w--min-6 bg:opaque bdr--8 shadow p--8">
									<input id="svg-experiments-file-input" class="akd__input-file w--12" type="file" accepts="image/svg+xml" data-target="#text-experiments-display-container" data-experiments-window-input>
									<div class="colorrow flex p--2 gap--2">
										<button id="svg-experiments-main-sidebar-toggler" class="akd__btn btn--" title="toggle sidebar controls" data-experiments-window-button><i class="fa fa-th-large"></i></button><div class="colorgroup"><button id="hexbutton" style="background-color: rgba(17, 0, 187, 0.867);width: 40px;" class="no--bg-image no--border no--outline w--1 h--12 bdr--0-br bdr--2-bl bdr--0-tr bdr--2-tl"></button></div>
										<div class="colorinput flex-item-even">
											<input id="hexinput" class="bdr--2-br bdr--0-bl bdr--2-tr bdr--0-tl text--sm w--12 bg--white type=" text"="" value="#000000" style="border-top: 1px solid rgb(221, 221, 221);border-right: 1px solid rgb(221, 221, 221);border-bottom: 1px solid rgb(221, 221, 221);border-image: initial;color: rgb(0, 0, 0);border-left: none;outline: none;" />
										</div>
									</div>
									<div class="flex flex--col gap--2 bg:opaque p--4" title="SVG element size input">
										<label class="taxt--sm text--900" for="svg-experiments-size-input">Size</label>
										<div class="flex flex--center gap--2">
											<span id="svg-experiments-size-display" class="text--900 text--inherit">24px</span>
											<input id="svg-experiments-size-input" class="akd__input-range" type="range" min="1" max="100" step="0.5" value="24" data-experiments-window-input />
											<select id="svg-experiments-size-unit-select" class="akd__input-select py--2" data-experiments-windo-input="" title="select size unit">
												<option value="px" selected>px</option>
												<option value="%">%</option>
											</select>
										</div>
									</div>
									<div class="flex flex--col gap--2 bg:opaque p--4" title="element visulizer depth input">
										<label class="taxt--sm text--900" for="svg-experiments-element-depth-input">Depth</label>
										<div class="flex flex--center gap--2">
											<span id="svg-experiments-element-depth-display" class="text--900 text--inherit">2</span>
											<input id="svg-experiments-element-depth-input" class="akd__input-range" type="range" min="1" max="100" step="1" value="2" data-experiments-window-input />
										</div>
									</div>
								</div>
								<div id="svg-experiments-icons-tabs" class="akd__tabs f--12 p--8 bdr--8 bg:opaque shadow" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="4">
									<div class="akd__tab-buttons w--12 h--auto p--4 bg--darker">
										<button id="" class="center-menu-expand-button nav-button" type="button"><span class="svg">C-EX</span></button>
										<span class="flex ml--auto">
											<button id="" class="akd__tab-button text--sm text--500 active--tab" title="show svg icons" data-target-tab="#svg-icons" data-parent-tab="#svg-experiments-icons-tabs">SVG</button>
											<button id="" class="akd__tab-button text--sm text--500" title="show emojis" data-target-tab="#emoji-icons" data-parent-tab="#svg-experiments-icons-tabs">Emoji</button>
										</span>
									</div>
									<div class="akd__tab-panels">
										<div id="svg-icons" class="akd__tab-panel active--tab">
											<div id="svg-icons-list" class="akd__tab-panel flex gap--4 w--12 h--12 overflow--auto"></div>
										</div>
										<div id="emoji-icons" class="akd__tab-panel">
											<div id="emojis-list" class="w--12 h--12 overflow--auto"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>`;
				} else if(selExp === 'canvas'){
					tmp = `<canvas class="w--12 h--11"></canvas>
					<div class="flex flex--center gap--4 h--1 bg:opaque">
						<div class="btn-group w--12 flex-important flex--justify-center">
							<button id="canvas-experiments-run-button" class="akd__btn btn--success group-btn" type="button" title="run experiment" data-experiments-window-button><span class="mr--3">run</span><i class="fa fa-running"></i></button>
							<button id="canvas-experiments-reset-button" class="akd__btn btn--danger group-btn" type="button" title="reset experiment"  data-experiments-window-button><span class="mr--3">reset</span><i class="fa fa-sync"></i></button>
							<button id="canvas-experiments--button" class="group-btn" type="button" title="" data-experiments-window-button><i class="fa fa-running"></i></button>
						</div>
					</div>`;
				}

				finalOutput = `<div id="experiments-ui-container" class="${selExp} pos--rel h--12">
					${tmp}
				</div>`;
				return finalOutput;
			}
			function run({html_code, css_code, js_code}, $i=0){
				let _iframe = $.one('#html-experiments-iframe');
				//storage.set('html_code', html_code);
				//storage.set('css_code', css_code);
				//storage.set('js_code', js_code);
				//__akd._cache.editors[$i].html.ops_cache.add('html_code', html_code);
				//__akd._cache.editors[$i].html.lastSaved.content = html_code;
				//__akd._cache.editors[$i].css.ops_cache.add('css_code', css_code);
				//__akd._cache.editors[$i].css.lastSaved.content = css_code;
				//__akd._cache.editors[$i].js.ops_cache.add('js_code', js_code);
				//__akd._cache.editors[$i].js.lastSaved.content = js_code;
				//console.log(js_ops_cache.keys)
				//_iframe = getIframeDocument(`#akd-editor-output-iframe-${$i}`);
				//_iframe = tag$1("iframe", {id:`#akd-editor-output-iframe-${$i}`, "class": "w--12 h--12 bg--white bdr--2 p--2", sandbox: "allow-scripts", frameborder: "0", crossorigin: "anonymous"});
				//document.body.appendChild(_iframe)
				//_iframe.contentWindow.body.innerHTML = 
				//_iframe.srcdoc = `<style>${storage.get('css_code')}</style><main>${storage.get('html_code')}</main><script>${storage.get('js_code')}</script>`;
				_iframe.srcdoc = `<style>${css_code}</style><main>${html_code}</main><script>${js_code}</script>`;
				//_iframe.contentWindow.body.innerHTML = `<style>${css_code}</style><main>${html_code}</main><script>${js_code}</script>`;
				//_iframe.contentWindow.eval(storage.get('js_code'));
				
				/* _iframe.srcdoc = `<style>${css_code.value}</style><main>${html_code}</main><script>${js_code}</script>`; */
			};
			function textInfo(text){
				if(!text) return 'Enter a body text to get information about it';
				let length = text.length, wordCount = text.match(/\S+/g).length, lineCount = text.split('\n').length;
		
				let paragraphs = text.split(/\n\n+/g), paragraphCount = 0;
				for (let i = 0; i < paragraphs.length; i++) {
					if (paragraphs[i].length != 0) {
						paragraphCount++;
					}
				}
		
				let textSentences = text.split(/[.?!]+/), sentenceCount = 0;
				for (let i = 0; i < textSentences.length; i++) {
					if (/\w/.test(textSentences[i])) {
						sentenceCount++;
					}
				}
		
				let charStats = {}, wordStats = {};
				let asciiCount = 0, extendedAsciiCount = 0, unicodeCount = 0;
				let chars = text.split('');
				for (let i = 0; i < chars.length; i++) {
					let char = chars[i];
					if (charStats[char] === undefined) {
						charStats[char] = 1;
					} else {
						charStats[char]++;
					}
		
					let charCode = char.charCodeAt(0);
					if (charCode >= 0 && charCode <= 127) {
						asciiCount++;
					} else if (charCode > 127 && charCode <= 255) {
						extendedAsciiCount++;
					} else {
						unicodeCount++;
					}
				}
		
				let words = text.split(/\s+/g);
				for (let i = 0; i < words.length; i++) {
					let word = words[i].toLowerCase();
					word = word.replace(/[,.?!]+/, '');
					if (!word.length) {
						continue;
					}
					if (wordStats[word] === undefined) {
						wordStats[word] = 1;
					} else {
						wordStats[word]++;
					}
				}
		
				let retText = 
					"Text statistics:\n" + 
					"Length:      " + length + "\n" +
					"Words:       " + wordCount + "\n" +
					"Sentences:   " + sentenceCount + "\n" +
					"Lines:       " + lineCount + "\n" +
					"Paragraphs:  " + paragraphCount + "\n" +
					"\n" +
					"Ascii Characters (0-127):            " + asciiCount + "\n" +
					"Extended Ascii Characters (127-255): " + extendedAsciiCount + "\n" +
					"All Ascii Characters (0-255):        " + (extendedAsciiCount + asciiCount) + "\n" +
					"Unicode Characters (255+):           " + unicodeCount + "\n" +
					"\n" +
					"Word statistics:\n";
		
				let sortedWordStatsKeys = Object.keys(wordStats).sort(function (a, b) {
					return wordStats[b] - wordStats[a];
				});
				for (let i = 0; i < sortedWordStatsKeys.length; i++) {
					let key = sortedWordStatsKeys[i];
					retText += key + ": " + wordStats[key] + "\n";
				}   
		
				retText +=
					"\n" + 
					"Character statistics:\n";
		
				let sortedCharStatsKeys = Object.keys(charStats).sort(function (a, b) {
					return charStats[b] - charStats[a];
				});
				for (let i = 0; i < sortedCharStatsKeys.length; i++) {
					let key = sortedCharStatsKeys[i], strKey = key;
					if (key.charCodeAt(0) == "10") {
						strKey = "↵"; 
					} else if (key.charCodeAt(0) == "32") {
						strKey = "⎵";
					}
		
					retText += strKey + ": " + charStats[key] + "\n";
				}   
		
				return retText;
			}
		}
	}
];
let $theme_select = '';

try{
	fetchFile(BASE_URL+'app/third_party/prettify/prettify_themes.json', 'json')
	//.then(data => data.json())
	.then($themes => {
		$theme_select += `<select id="editor-theme-select" class="editor-theme-select pad-by-5">
			<option value="" data-theme-id="Google" data-theme-title="Google" data-theme-type="light" data-ported-by="<a href=\'https://cdn.rawgit.com/google/code-prettify/\'>Google</a>" data-original="<a href=\'https://cdn.rawgit.com/google/code-prettify/\'>Google</a>">default</option>`;
			if($.isArray($themes) && $themes.length > 0){
				//for($i=0;$i<sizeof($themes);$i++){
				$themes.forEach(($theme) => {
					let $css_theme = `${BASE_URL}app/third_party/prettify/css/themes/${$theme.id}.min.css`;
					$theme_select += `<option value="${$css_theme}" data-theme-id="${$theme.id}" data-theme-title="${$theme.name}" data-theme-type="'${$theme.type}" data-ported-by="${$theme.ported_by?$theme.ported_by:'???'}" data-original="${$theme.original?$theme.original:'???'}">${$theme.id}</option>`;
				});
			}
		$theme_select += '</select>';
	})
} catch(er){console.error(er)}/*  */
const appsArray = [
	{
		id:'api-papi-app', name: 'api-papi', icon: `${IMAGES_URL}icons/autodesk.png`, type: '', category:'internet', ajaxTarget: '#api-papi-app-ajax-window', ajaxTargetType: 'id', 
		//attrs:'class="window window-solid window--purple" data-name="experiments" data-title="experiments window" data-wallpaper=""',
		attrs:'', 
		sidebar_content: ``,
		footer_content: ``,
		body_content: ``, 
		template: ``, 
		components: [],
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {},
		//cell_id: 7
	}, 
	{
		id:'calculator-app', name: 'calculator', icon: `${IMAGES_URL}icons/calculator.png`, type: '', category:'accessories', ajaxTarget: '#calculator-app-ajax-window', ajaxTargetType: 'id', 
		//attrs:'class="window window-solid window--purple" data-name="experiments" data-title="experiments window" data-wallpaper=""',
		attrs:'', 
		sidebar_content: ``,
		footer_content: ``,
		body_content: ``, 
		template: ``, 
		components: [],
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {},
		//cell_id: 7
	}, 
	{
		id:'calendar-app', name:'calendar', icon:`${IMAGES_URL}icons/calendar.png`, type: '', category:'accessories', ajaxTarget: '#calendar-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions :'[\'50%\',\'50%\']', }
		}, 
		wallpaper: {}
	}, 
	{
		id:'search-app', name:'search', icon:`${IMAGES_URL}icons/search.svg`, type: '', category:'office', ajaxTarget: '#search-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	}, 
	{
		id:'snip-sketch-app', name: 'snip-sketch', icon:`${IMAGES_URL}icons/snipSketch.png`, type: '', category:'art-and-graphics', ajaxTarget: '#snip-sketch-app-ajax-window', ajaxTargetType: 'id', 
		//customWindow: ``, 
		sidebar_content: `<div class="sidebar-head">
		</div>
		<div class="sidebar-body">
		</div>`,
		body_content: `<div id="snip-sketch-main-container" class="akd__tabs h--12" data-layout="grid-auto" data-layout-rows="auto-1fr">
			<div class="akd__tab-buttons w--fit flex--wrap px--5 px--8 bg:opaque">
				<button class="akd__tab-button bdr--x2 active--tab" type="button" data-parent-tab="#snip-sketch-main-container" data-target-tab="[data-camera-tab-panel]" data-akd-tab-button>Camera <i class="fa fa-camera ml--2"></i></button>
				<button class="akd__tab-button bdr--x2" data-parent-tab="#snip-sketch-main-container" type="button" data-target-tab="[data-pixel-art-tab-panel]" data-akd-tab-button>Pixel Art<i class="fa fa-palette ml--2"></i></button>
			</div>
			<div class="akd__tab-panels">
				<div class="akd__tab-panel contentarea active--tab" data-camera-tab-panel>
					<h1>MDN - navigator.mediaDevices.getUserMedia(): Still photo capture demo</h1>
					<p>This example demonstrates how to set up a media stream using your built-in webcam, fetch an image from that stream, and create a PNG using that image.</p>
					<div class="flex gap--4 px--4 my--8">
						<div class="camera w--6 f--12 pos--rel isolate">
							<video id="video" class="w--12 h--12 bdr--2 bd bdc--black shadow object-cover">Video stream not available.</video>
							<button id="snapPictureButton" class="akd__btn btn--success pos--abs bottom-0 left-0 opacity-hover-show opacity--5 shadow-3 bdr--x2" style="bottom: 1rem !important;left: 1rem !important;" title="take photo">Take photo</button>
						</div>
						<canvas id="canvas" class="hidden"></canvas>
						<div class="output w--6 f--12 pos--rel isolate">
							<img id="photo" class="w--12 h--12 bdr--2 bd bdc--black shadow-3" alt="The screen capture will appear in this box." />
						</div>
					</div>
					<div class="flex gap--4 px--4 my--8">
						<button id="start-stream-button" class="akd__button btn--purple px--x4 py--8 mx--auto" title="start stream">Start Stream</button>
						<span class="flex gap--4 w--6 px--4">
							<button id="playButton" class="akd__btn btn--success opacity-hover-show opacity--5 shadow-3 bdr--x2" title="play stream">Play Stream</button>
							<button id="stop-stream-Button" class="akd__btn btn--danger 3 bdr--x2" title="play stream">Stop Stream</button>
						</span>
					</div>
	  			</div>
				<div class="akd__tab-panel" data-layout="grid-auto" data-layout-rows="auto-1fr" data-pixel-art-tab-panel>
					<span class="flex w--12 flex--justify-end px--4 text--dark bg:opaque">Pixel Art Studio</span>
					<div class="pixel-art-studio w--inherit overflow--auto">
						<div class="pixel-art-studio-canvas-wrapper">
							<div id="pixel-art-guide"></div>
							<canvas id="pixel-art-canvas" class="w--inherit h--12"></canvas>
						</div>
						<div class="pixel-art-studio-controls-wrapper">
							<span class="flex gap--4 flex--center flex--justify-center f--12 px--2 py--4 bdr--8 bg:opaque">
								<label class="text--truncate" for="pixel-art-color-input">Set Color</label>
								<input id="pixel-art-color-input" class="akd__input-color" type="color" />
								<input id="pixel-art-guide-toggler" class="akd__input-color" type="checkbox" checked />
							</span>
							<span class="flex flex--justify-center gap--4 f--12 px--2 py--4 bdr--8 bg:opaque">
								<select id="pixel-art-pixel-size-select" class="akd__input-select">
									<option value="1"> -- options -- </option>
								</select>
							</span>
							<span class="flex flex--justify-center gap--4 f--12 px--2 py--4 bdr--8 bg:opaque">
								<button id="pixel-art--button" class="akd__btn btn--info" type="button" title=""><i class="fa fa-"></i></button>
								<button id="pixel-art-reset-button" class="akd__btn btn--danger" type="button" title=""><i class="fa fa-trash-alt"></i></button>
							</span>
						</div>
					</div>
				</div>
				<div id="snip-sketch-app-ajax-window" class="akd__tab-panel" data-snip-sketch-app-ajax-window-tab-panel>
				</div>
	  		</div>
		</div>`, 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}, 
		callbacks: ($) => {
			(() => {
				let $canvas = $.one("#pixel-art-canvas"), $colorInput = $.one("#pixel-art-color-input"), $guide = $.one("#pixel-art-guide"), $guideToggler = $.one("#pixel-art-guide-toggler"), $clearButton = $.one("#pixel-art-reset-button");
				let CELL_SIDE_COUNT = 5, opts = [1,2,3,4,5,6,7,8,9,10,12,15,20,25].map(num => `<option value="${num}">${num}</option>`).join('');
				let cellPixelLength = $canvas.width / CELL_SIDE_COUNT;
				let cellPixelLengthX = $canvas.width / CELL_SIDE_COUNT, cellPixelLengthY = $canvas.height / CELL_SIDE_COUNT;
				const $ctx = $canvas.getContext("2d");
				const colorHistory = {};

				let $canvasParent = $canvas.parentElement, 
				paddingX = (Number($.css($canvasParent, 'padding-top').replace('px', '')) + Number($.css($canvasParent, 'padding-bottom').replace('px', ''))), 
				paddingY = (Number($.css($canvasParent, 'padding-left').replace('px', '')) + Number($.css($canvasParent, 'padding-right').replace('px', '')));
				
				$canvas.width = ($canvasParent.offsetWidth - (paddingX || 0));
				$canvas.height = ($canvasParent.offsetHeight - (paddingY || 0));
				console.log($canvasParent.offsetWidth,paddingX, $canvasParent.offsetWidth - (paddingX || 0));
				$colorInput.value = "#10bdf0";
				populate();
				/* $ctx.fillStyle = "#ffffff";
				$ctx.fillRect(0, 0, $canvas.width, $canvas.height);
				{
					$guide.style.width = `${$canvas.width}px`;
					$guide.style.height = `${$canvas.height}px`;
					$guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
					$guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

					[...Array(CELL_SIDE_COUNT ** 2)].forEach(() => $guide.insertAdjacentHTML("beforeend", '<div></div>'));
				} */
				function handleCanvasMousedown(e){
					if(e.button !== 0){
						return;
					}

					const canvasBoundingRect = $canvas.getBoundingClientRect();
					const x = e.clientX - canvasBoundingRect.left;
					const y = e.clientY - canvasBoundingRect.top;
					//const cellX = Math.floor(x / cellPixelLength);
					//const cellY = Math.floor(y / cellPixelLength);
					const cellX = Math.floor(x / cellPixelLengthX);
					const cellY = Math.floor(y / cellPixelLengthY);
					const currentColor = colorHistory[`${cellX}_${cellY}`];

					if(e.ctrlKey){
						if(currentColor){
							$colorInput.value = currentColor
						}
					} else {
						fillCell(cellX, cellY);
					}
					//console.log(x, y);
				}
				function handleCanvasClearbuttonClick(){
					const yes = confirm("Are you sure you wish to clear the canvas?");

					if(!yes) return;

					$ctx.fillStyle = "#ffffff";
					$ctx.fillRect(0, 0, $canvas.width, $canvas.height);
				}
				function handleToggleGuideChange(e){
					$guide.style.display = $guideToggler.checked ? null : "none";
				}
				function fillCell(cellX, cellY){
					//const startX = cellX * cellPixelLength;
					//const startY = cellY * cellPixelLength;
					const startX = cellX * cellPixelLengthX;
					const startY = cellY * cellPixelLengthY;

					$ctx.fillStyle = $colorInput.value;
					//$ctx.fillRect(startX, startY, cellPixelLength, cellPixelLength);
					$ctx.fillRect(startX, startY, cellPixelLengthX, cellPixelLengthY);
					colorHistory[`${cellX}_${cellY}`] = $colorInput.value;
				}
				function populate(size){
					paddingX = (Number($.css($canvasParent, 'padding-top').replace('px', '')) + Number($.css($canvasParent, 'padding-bottom').replace('px', '')));
					paddingY = (Number($.css($canvasParent, 'padding-left').replace('px', '')) + Number($.css($canvasParent, 'padding-right').replace('px', '')));
					let newWidth = ($canvasParent.offsetWidth - (paddingX || 0)), newHeight = ($canvasParent.offsetHeight - (paddingY || 0));
					$canvas.width = newWidth;
					$canvas.height = newHeight;
					//Object.assign($canvas.style, {width: `${newWidth}px`, height: `${newHeight}px`});
					//console.log($canvasParent.offsetWidth,$.css($canvasParent, 'padding-top').replace("px",""),Number($.css($canvasParent, 'padding-bottom').replace("px","")), $canvasParent.offsetWidth - (paddingX || 0));
					
					/* let frag = document.createDocumentFragment();
					for(let i=0;i<size * size;i++){
						const div = document.createElement("div");
						div.classList.add("pixel");
						frag.appendChild(div);
					}
					$container.appendChild(frag); */
					$ctx.fillStyle = "#ffffff";
					$ctx.fillRect(0, 0, $canvas.width, $canvas.height);
					{
						$guide.style.width = `${$canvas.width}px`;
						$guide.style.height = `${$canvas.height}px`;
						$guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
						$guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

						[...Array(CELL_SIDE_COUNT ** 2)].forEach(() => $guide.insertAdjacentHTML("beforeend", '<div></div>'));
					}
					cellPixelLength = $canvas.width / CELL_SIDE_COUNT;
					cellPixelLengthX = $canvas.width / CELL_SIDE_COUNT;
					cellPixelLengthY = $canvas.height / CELL_SIDE_COUNT;
				}

				$("#pixel-art-pixel-size-select").append(opts).change(e => {console.log(e.target.value);CELL_SIDE_COUNT = e.target.value;populate();});
				$canvas.addEventListener("mousedown", handleCanvasMousedown);
				$clearButton.addEventListener("click", handleCanvasClearbuttonClick);
				$guideToggler.addEventListener("change", handleToggleGuideChange);
				////////////////////////////////////////////////////////////////////
				// The width and height of the captured photo. We will set the
				// width to the value defined here, but the height will be
				// calculated based on the aspect ratio of the input stream.
			  
				const width = 320; // We will scale the photo width to this
				let height = 0; // This will be computed based on the input stream
			  
				// |streaming| indicates whether or not we're currently streaming
				// video from the camera. Obviously, we start at false.
			  
				let streaming = false;
			  
				// The various HTML elements we need to configure or control. These
				// will be set by the startup() function.
			  
				let video = null;
				let canvas = null;
				let photo = null;
				let snapPictureButton = null;
				let startbutton = null;
				
				function showViewLiveResultButton() {
				  	if (window.self !== window.top) {
						// Ensure that if our document is in a frame, we get the user
						// to first open it in its own tab or window. Otherwise, it
						// won't be able to request permission for camera access.
						document.querySelector(".contentarea").remove();
						const button = document.createElement("button");
						button.textContent = "View live result of the example code above";
						document.body.append(button);
						button.addEventListener("click", () => window.open(location.href));
						return true;
				  	}
				  	return false;
				}
			  
				function startup() {
				  	if (showViewLiveResultButton()) {
						return;
				  	}
				  	video = document.getElementById("video");
				  	canvas = document.getElementById("canvas");
				  	photo = document.getElementById("photo");
				  	snapPictureButton = document.getElementById("snapPictureButton");
				  	playPauseButton = document.getElementById("playButton");
			  
				  	navigator.mediaDevices
						.getUserMedia({ video: true, audio: false })
						.then((stream) => {
					  		video.srcObject = stream;
					  		video.play();
						})
						.catch((err) => {
					  		console.error(`An error occurred: ${err}`);
						});
			  
				  	video.addEventListener("canplay", (ev) => {
					  	if (!streaming) {
							height = video.videoHeight / (video.videoWidth / width);
			  
							// Firefox currently has a bug where the height can't be read from
							// the video, so we will make assumptions if this happens.
			  
							if (isNaN(height)) {
						  		height = width / (4 / 3);
							}
			  
							video.setAttribute("width", width);
							video.setAttribute("height", height);
							canvas.setAttribute("width", width);
							canvas.setAttribute("height", height);
							streaming = true;
					  	}
					}, false);
			  
				  	snapPictureButton.addEventListener("click", (ev) => {
					  	takepicture();
					  	ev.preventDefault();
					}, false);
			  
				  	playPauseButton.addEventListener("click", (ev) => {
					  	ev.preventDefault();
						if(video.playing){
							video.pause();
							playPauseButton.title = 'Play Stream';
							playPauseButton.textContent = 'Play Stream';
						} else {
							video.play();
							playPauseButton.title = 'Pause Stream';
							playPauseButton.textContent = 'Pause Stream';
						}
					}, false);
			  
				  	clearphoto();
				}
			  
				// Fill the photo with an indication that none has been
				// captured.
			  
				function clearphoto() {
				  	const context = canvas.getContext("2d");
				  	context.fillStyle = "#AAA";
				  	context.fillRect(0, 0, canvas.width, canvas.height);
			  
				  	const data = canvas.toDataURL("image/png");
				  	photo.setAttribute("src", data);
				}
			  
				// Capture a photo by fetching the current contents of the video
				// and drawing it into a canvas, then converting that to a PNG
				// format data URL. By drawing it on an offscreen canvas and then
				// drawing that to the screen, we can change its size and/or apply
				// other changes before drawing it.
			  
				function takepicture() {
				  	const context = canvas.getContext("2d");
				  	if (width && height) {
						canvas.width = width;
						canvas.height = height;
						context.drawImage(video, 0, 0, width, height);
			  
						const data = canvas.toDataURL("image/png");
						photo.setAttribute("src", data);
				  	} else {
						clearphoto();
				  	}
				}
			  
				// Set up our event listener to run the startup process
				// once loading is complete.
				//window.addEventListener("load", startup, false);
				window.addEventListener("load", (e) => {
					startbutton = document.getElementById("start-stream-button");
					startbutton.addEventListener("click", startup);
				}, false);
			})();			  
		}
	}, 
	{
		id:'whiteboard-app', name: 'whiteboard', icon:`${IMAGES_URL}icons/whiteboard.png`, type: '', category:'art-and-graphics', ajaxTarget: '#canvas-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	}, 
	{
		id:'security-app', name: 'security', icon:`${IMAGES_URL}icons/windows-defender.png`, type: '', category:'administration', ajaxTarget: '#security-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	}, 
	{
		id:'tasks-app', name: 'tasks', icon:`${IMAGES_URL}icons/toDo.svg`, type: '', category:'', ajaxTarget: '#tasks-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	}, 
	{
		id:'notepad-app', name: 'notepad', icon:`${IMAGES_URL}icons/notepad.png`, type: '', category:'office', ajaxTarget: '#sticky-notes-app-ajax-window', ajaxTargetType: 'id', 
		sidebar_content: `<nav id="notepad-notes-nav" class="notepad-notes-nav">
			<ul id="notepad-notes-list" class="notepad-notes-list pos--rel">
				<li class="notepad-notes-list-item sticky-bottom"><a id="show-all-notes" href="javascript:void(0);" data-notepad-action-button>All Notes</a></li>
			</ul>
		</nav>`, 
		body_content: `<div id="notepad-container" class="flex flex--col h--12" data-layout="grid-auto" data-layout-cols="auto-1fr">
			<nav class="flex gap--4">
				<span class="flex gap--4 flex-item-even">
					<button id="add-new-note" class="akd__btn btn--"><i class="fa fa-plus"></i></button>
				</span>
			</nav>
			<section id="notepad-output-container" class="flex flex--col p--8 gap--4 h--12"></section>
		</div>`, 
		components: [
			{id: 'notepad-search-component',type: 'searchComponent', ajaxTarget: '#browser-ajax-window', ajaxTargetType: 'id'},
		], 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {},
		callbacks: ($) => {
			const notesContainer = $.one("#notepad-container"), 
			notesListContainer = $.one("#notepad-notes-list"), 
			notesOutputContainer = $.one("#notepad-output-container"), 
			addNoteButton = $.one("#add-new-note", notesContainer);
			let ni = 0;
			/* getNotes().forEach(note => {
				const noteElement = createNoteElement(note.id, note.content, note.title);
				//notesContainer.insertBefore(noteElement, addNoteButton)
				notesOutputContainer.append(noteElement);
				const listElement = $.tag("li", {"class":"notepad-notes-list-item", dataset: {title: note.title}}, $.tag("a", {"class":"", href: "javascript:void(0);"}, note.title??'note-'+(ni + 1)));
				notesListContainer.append(listElement);
				{ id: 100000.30928698085, content: "The principle of polarity states that, everything has a dual nature to it" }
			}); */
			allNotes();
			//$.on(addNoteButton, "click", addNote);
			$.on(addNoteButton, "click", (e) => {noteEditor()});
			$(document).on("click", "[data-notepad-action-button]", (e) => {
				let $this = $.isElement(this) ? this : e.target, note_id = $this.dataset.noteId;
				if($this.matches(".edit-note")){
					noteEditor(note_id);
				} else if($this.matches(".delete-note")){
					let $target = $this.closest(".notepad-note");
					console.log(note_id, $target);
					//noteEditor(note_id);
					const doDelete = prompt("Are you sure you want to delete this note")
					if(doDelete){
						deleteNote(note_id, $target);
					}
				} else if($this.matches(".view-note")){
					noteViewer(note_id);
				} else if($this.id === "notepad-editor-action-button"){
					let title = $("#notepad-editor-title").val(), content = $("#notepad-editor-content").val()
					updateNote(note_id, content, title);
				} else if($this.id === "show-all-notes" || $this.matches(".show-all-notes")){
					allNotes();
				}
			});
			$("#notepad-search-component-search-component-input").on("keyup", e => {
				// filterItems(".notepad-notes-list-item")
				console.log(e.target.value)
			});
			
			function allNotes(){
				let noteStr = `<div id="notepad-all-notes" class="notepad-all-notes p--8" data-layout="grid" data-layout-cols="3" data-layout-gap="4">`;
				getNotes().forEach(note => {
					noteStr += `<div id="note-${(ni+1)}" class="notepad-note note" data-title="${note.title??'note-'+(ni+1)}">
						<span class="notepad-note-title">${note.title??'note-'+(ni+1)}</span>
						<span class="notepad-note-text h--max-12">${note.content}</span>
						<span class="flex gap--4 flex--even">
							<button class="view-note akd__btn btn--pink f--12" type="button" title="view this note" data-note-id="${note.id}" data-notepad-action-button><i class="fa fa-eye"></i></button>
							<button class="edit-note akd__btn btn--pink f--12" type="button" title="edit this note" data-note-id="${note.id}" data-notepad-action-button><i class="fa fa-edit"></i></button>
							<button class="delete-note akd__btn btn--pink f--12" type="button" title="delete this note" data-note-id="${note.id}" data-notepad-action-button><i class="fa fa-trash-alt"></i></button>
						</span>
					</div>`;
					
				});
				noteStr += `</div>`;
				$(notesOutputContainer).empty().append(noteStr);
				//notesOutputContainer.innerHTML = '';
				//notesOutputContainer.insertAdjacentHTML('beforeend', noteStr);
			}
			function noteEditor(noteObject){
				let note_id = 0, is_editing = noteObject && (!$.isEmptyObject(noteObject) || $.isNumeric(noteObject)) ? true : false;
				if($.isNumeric(noteObject)){
					note_id = Number(noteObject);
					const notes = getNotes();
					noteObject = notes.filter(note => note.id === note_id)[0];
				} else note_id = noteObject?.id??0;

				let noteStr = `<div id="notepad-editor" class="notepad-editor flex flex--col gap--4 p--8 h--12" data-layout="grid-auto" data-layout-cols="auto-1fr-auto">
					<input id="notepad-editor-title" class="notepad-editor-title" type="text" value="${is_editing ? noteObject.title : ''}" maxlength="255" />
					<textarea id="notepad-editor-content" class="notepad-editor-content h--12" required>${is_editing ? noteObject.content : ''}</textarea>
					<span class="flex gap--8">
						<button id="notepad-editor-action-button" class="akd__btn btn--${is_editing ? 'primary' : 'success'} py--8 flex-item-even gap--2" type="button" data-note-id="${note_id}" data-notepad-action-button><i class="fa fa-${is_editing ? 'edit' : 'save'}"></i><span class="">${is_editing ? 'edit' : 'save'}</span></button>
						<button id="" class="akd__btn py--8 flex-item-even btn--warning gap--2 show-all show-all-notes" type="button" data-notepad-action-button><i class="fa fa-home"></i><span class="">return</span></button>
					</span>
				</div>`;
				$(notesOutputContainer).empty().append(noteStr);
				//notesOutputContainer.innerHTML = '';
				//notesOutputContainer.insertAdjacentHTML('beforeend', noteStr);
			}
			function noteViewer(noteObject){
				let note_id = 0, is_editing = noteObject && (!$.isEmptyObject(noteObject) || $.isNumeric(noteObject)) ? true : false;
				if($.isNumeric(noteObject)){
					note_id = Number(noteObject);
					const notes = getNotes();
					noteObject = notes.filter(note => note.id === note_id)[0];
				} else note_id = noteObject?.id??0;

				console.log(noteObject)
				let noteStr = `<div id="notepad-viewer" class="notepad-viewer flex flex--col gap--4 h--12 p--8">
					<span id="notepad-viewer-title" class="notepad-viewer-title flex-align-center text--900 text--primary px--8 py--4 bdr--x2 bg:opaque bg--gray-gradient">
						<span class="text--df">${is_editing ? noteObject.title : ''}</span>
						<input id="" type="number" min="12" max="24" step="0.5" value="12" class="akd__input-number ml--auto w--2 py--1" onchange="let $parent = this.closest('.notepad-viewer'), $textarea = $parent.querySelector('.notepad-viewer-content');$textarea.style.fontSize = this.value + 'px';">
					</span>
					<textarea id="notepad-viewer-content" class="notepad-viewer-content bg--gray-gradient h--12 bdr--3 bdr--x2 overflow--auto" disabled>${is_editing ? noteObject.content : ''}</textarea>
					<span class="flex gap--4 flex--even">
						<!--<button type="button" class="akd__btn btn--pink view-note f--12 bdr--x2" title="view this note" data-note-id="${note_id}" data-notepad-action-button><i class="fa fa-eye"></i></button>-->
						<button class="akd__btn btn--pink edit-note f--12 bdr--x2" type="button" title="edit this note" data-note-id="${note_id}" data-notepad-action-button><i class="fa fa-edit"></i></button>
						<button type="button" class="akd__btn btn--pink delete-note f--12 bdr--x2" title="delete this note" data-note-id="${note_id}" data-notepad-action-button><i class="fa fa-trash-alt"></i></button>
					</span>
				</div>`;
				$(notesOutputContainer).empty().append(noteStr);
				//notesOutputContainer.innerHTML = '';
				//notesOutputContainer.insertAdjacentHTML('beforeend', noteStr);
			}
			/////////////////////////////////////////////////////////
			function getNotes(){
				let notes = JSON.parse(localStorage.getItem("notepad-notes") || "[]");
				if(notes && !$.isArray(notes)) notes = [notes];
				return notes;
				//return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]")
			}
			function createNoteElement(id, content, title){
				const element = $.tag("textarea", {"class":"note", "placeholder":"Empty Sticky Note"});
				element.value = content;
				
				$.on(element, "change", ()=>{
					updateNote(id, element.value, title);
				});
				
				$.on(element, "dblclick", ()=>{
					const doDelete = prompt("Are you sure you want to delete this note")
					if(doDelete){
						deleteNote(id, element);
					}
				});
				
				return element;
			}
			function addNote(title, content){
				const existingNotes = getNotes();
				const noteObject = {
					id: Math.random() + 100000, 
					title: title??"", 
					content: content??""
				};
				
				const noteElement = createNoteElement(noteObject.id, noteObject.content, noteObject.title);
				//notesContainer.insertBefore(noteElement, addNoteButton);
				notesOutputContainer.append(noteElement);
				const listElement = $.tag("li", {"class":"notepad-notes-list-item", dataset: {title: noteObject.title}}, $.tag("a", {"class":"", href: "javascript:void(0);"}, noteObject.title));
				notesListContainer.append(listElement);

				existingNotes.push(noteObject);
				saveNotes(existingNotes);
			}
			function updateNote(id, newContent, newTitle){
				if($.isNumeric(id)){
					id = Number(id);
				}
				const notes = getNotes();
				if(id && id !== "undefined"){
					const targetNote = notes.filter(note => note.id === id)[0];
					targetNote.title = newTitle;
					targetNote.content = newContent;
				} else {
					const noteObject = {
						id: Math.random() + 100000, 
						title: newTitle??"", 
						content: newContent??""
					};
					notes.push(noteObject);
				}
				saveNotes(notes);
			}
			function deleteNote(id, element){
				if($.isNumeric(id)){
					id = Number(id);
				}
				const notes = getNotes().filter(note => note.id !== id)[0];
				
				saveNotes(notes);
				//notesContainer.removeChild(element);
				if(element && $.isElement(element)){
					let allNotesContainer = $.one("#notepad-all-notes", notesOutputContainer);
					if(allNotesContainer && allNotesContainer.contains(element)) allNotesContainer.removeChild(element);
					else if(notesOutputContainer.contains(element)) notesOutputContainer.removeChild(element);
				}
				
			}
			function saveNotes(notes){
				localStorage.setItem("notepad-notes", JSON.stringify(notes))
			}
		}
	}, 
	{
		id:'games-app', name: 'games', icon:`${IMAGES_URL}icons/game.png`, type: '', category:'entertainment', ajaxTarget: '#games-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	}, 
	{
		id:'router-app', name: 'router', icon:`${IMAGES_URL}icons/safari.png`, type: '', category:'office', ajaxTarget: '#router-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	}, 
	{
		id:'movies-app', name: 'movies', icon:`${IMAGES_URL}icons/movies.png`, type: '', category:'sound-and-video', ajaxTarget: '#movies-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	}, 
	{
		id:'oexe-app', name: 'oexe', icon:`${IMAGES_URL}icons/oexe.png`, type: '', category:'programming', ajaxTarget: '#oexe-app-ajax-window', ajaxTargetType: 'id', 
		sidebar_content: ``, 
		body_content: `<div class="pos--rel w--12 h--12 block ui-pattern-1">
			<div id="oexe-app-drawer-top" class="akd__drawer flex-place-center w--12 bg--black" data-drawer-position="top">
				<span id="oexe-app-drawer-top-handle" class="drawer-handle w--12 bg--white">
					<span class="drawer-knob"></span>
				</span>
				<div id="" class="flex flex--col w--12 h--12 p--8 bg--info-gradient text-white overflow--auto"></div>
			</div>
			<div id="oexe-app-drawer-right" class="akd__drawer flex-place-center h--12 bg--black" data-drawer-position="right">
				<span id="oexe-app-drawer-right-handle" class="drawer-handle w--12 bg--white">
					<span class="drawer-knob"></span>
				</span>
				<div id="" class="flex flex--col w--12 h--12 p--8 text-white bg--success overflow--auto"></div>
			</div>
			<div id="oexe-app-drawer-bottom" class="akd__drawer flex-place-center w--12 bg--black" data-drawer-position="bottom">
				<span id="oexe-app-drawer-bottom-handle" class="drawer-handle w--12 bg--white" style="height: 4px;cursor: grab;">
					<span class="drawer-knob"></span>
				</span>
				<div id="" class="flex flex--col w--12 h--12 p--8 text-white bg--warning-gradient overflow--auto"></div>
			</div>
			<div id="oexe-app-drawer-left" class="akd__drawer flex-place-center h--12 bg--black" data-drawer-position="left">
				<span id="oexe-app-drawer-left-handle" class="drawer-handle w--12 bg--white">
					<span class="drawer-knob"></span>
				</span>
				<div id="" class="flex flex--col w--12 h--12 p--8 text-white bg--gray-gradient overflow--auto"></div>
			</div>
		</div>`, 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}, 
		callbacks: ($) => {
			drawer("#oexe-app-drawer-top", "#oexe-app-drawer-top-handle", "top");
			drawer("#oexe-app-drawer-right", "#oexe-app-drawer-right-handle", "right");
			drawer("#oexe-app-drawer-bottom", "#oexe-app-drawer-bottom-handle", "bottom");
			drawer("#oexe-app-drawer-left", "#oexe-app-drawer-left-handle", "left");
		}
	}, 
	{
		id:'cloud-app', name: 'cloud', icon:`${IMAGES_URL}icons/icloud.png`, type: '', category:'internet', ajaxTarget: '#cloud-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	}, 
	{
		id:'map-app', name: 'map', icon:`${IMAGES_URL}icons/map.png`, type: '', category:'accessories', ajaxTarget: '#map-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	}, 
	{
		id:'youtube-app', name: 'youtube', icon:`${IMAGES_URL}icons/souhu.jpg`, type: '', category:'sound-and-video', ajaxTarget: '#youtube-app-ajax-window', ajaxTargetType: 'id', 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	},  
	{
		id:'markdown-viewer-app', name: 'markdown-viewer', icon:`${IMAGES_URL}icons/md.png`, type: '', category:'ide-and-code-editor', ajaxTarget: '#markdown-viewer-app-ajax-window', ajaxTargetType: 'id', 
		//customWindow: ``, 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {},
		//callbacks: ($) => {}
	}, 
	{
		id:'svg-viewer-app', name: 'svg-viewer', icon:`${IMAGES_URL}icons/sitx.png`, type: '', category:'art-and-graphics', ajaxTarget: '#svg-app-ajax-window', ajaxTargetType: 'id', 
		//customWindow: ``, 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {},
		//callbacks: ($) => {}
	}, 
	{
		id:'zip-viewer-app', name: 'zip-viewer', icon:`${IMAGES_URL}icons/terminal.svg`, type: '', category:'accessories', ajaxTarget: '#zip-viewer-app-ajax-window', ajaxTargetType: 'id', 
		//customWindow: ``, 
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {},
		//callbacks: ($) => {}
	}, 
	{
		id:'openai-app', name: 'openai', icon:`${IMAGES_URL}icons/naotu.png`, type: '', category:'artificial-intelligence', ajaxTarget: '#openai-app-ajax-window', ajaxTargetType: 'id', 
		customWindow: `<article id="openai-app" class="window window-solid openai inner-body-toggled" style="top: 25%;left: 25%;width: 50%;height: 50%;--color:#191c35;" data-theme="#191c35" data-custom-theme="true">
			<header class="window__head flex flex--col" draggable="true">
				<div class="flex bg--inherit z-index-9 w--12 h--12">
					<nav class="window__head-nav push-left flex-place-center px--4 mr--auto">
						<ul class="inline-flex gap--2">
							<li><a href="#" class="window__utility-menu-toggler place-center m--auto" title="toggle additional options" data-window-id="#openai-app"><i class="fa fa-chevron-down"></i></a></li>
							<li><a href="#" class="window__body-inner-toggler place-center m--auto" title="toggle this window sidebar" data-window-id="#openai-app"><i class="fa fa-expand"></i></a></li>
						</ul>
					</nav>
					<span class="window__title flex place-center mx--auto text--trunc">Open AI Image Generator</span>
					<nav class="window__head-nav push-right flex-place-center px--4 ml--auto">
						<ul class="inline-flex gap--2">
							<li><a href="#" class="window__button window__minimize-button" title="minimize window"><i class="fa fa-window-minimize"></i></a></li>
							<li><a href="#" class="window__button window__maximize-button" title="maximize window"><i class="fa fa-window-maximize"></i></a></li>
							<li><a href="#" class="window__button window__close-button" title="close window"><i class="fa fa-window-close"></i></a></li>
						</ul>
					</nav>
				</div>
			</header>
			<div id="openai-app-window-body" class="window__body side--left grid">
				<aside class="window__side side--grid">
					<div class="openai-search-bar">
						<span class="search-button fa fa-search"></span>
						<span class="search-close-button fa fa-times"></span>
						<input type="text" placeholder="search" onkeyup="if(this.value.length > 0){this.previousElementSibling.classList.add('is-visible')} else {this.previousElementSibling.classList.remove('is-visible')}" />
					</div>
					<div class="app-menu-left menu-left">	
						<ul class="setting">
							<a data-type="install" data-key="1" data-prop="appInstalled"><i class="font-icon fa fa-download"></i>Installed</a>
							<a data-type="update"><i class="font-icon fa fa-sync"></i>Update</a>
						</ul>
						<div class="line">classification</div>
						<ul class="setting">
							<a data-type="all" data-prop=""><i class="font-icon fa fa-bars"></i>All</a>
							<a data-type="file" data-prop="appCategory"><i class="font-icon fa fa-folder-open"></i>File enhancement</la>
							<a data-type="safe" data-prop="appCategory"><i class="font-icon fa fa-book"></i>Safety tools</a>
							<a data-type="tools" data-prop="appCategory"><i class="font-icon fa fa-suitcase"></i>Utilities</a>
							<a data-type="image" data-prop="appCategory"><i class="font-icon fa fa-images"></i>Image</a>
							<a data-type="media" data-prop="appCategory"><i class="font-icon fa fa-film"></i>Media</a>
							<a data-type="others" data-prop="appCategory"><i class="font-icon fa fa-ellipsis-h"></i>Other</a>
						</ul>
					</div>
					<nav class="window__side-nav bottom">
						<ul>
							<li><a class="${AJAX_CLASS} refresh" href="${BASE_URL}app/includes/loader.php" data-ajax-target="#openai-app-ajax-window" data-ajax-target-type="id"><span class="link-icon"><i class="fa fa-redo"></i></span><span class="link-title">refresh</span></a></li>
						</ul>
					</nav>
				</aside>
				<section id="openai-app-ajax-window" class="window__body-inner">
					<div class="app-content flex flex--col h--12">
						<div class="input pos--rel flex-place-center px--x8 py--x4 flex--col gap--8 w--12 h--5 bg--warning ">
							<span class="text--xl">Describe An Image</span>
							<input id="prompt" class="akd__input-text w--12 p--8 bg--white text-darker no--border" type="text" placeholder="Enter Text" onkeyup="if(this.value.length > 0){this.previousElementSibling.classList.add('is-visible')} else {this.previousElementSibling.classList.remove('is-visible')}" style="">
							<select id="size" class="akd__input-select w--12 p--8 bg--white text-darker" name="size">
								<option value="small">small</option>
								<option value=" medium" selected>medium</option>
								<option value="large">large</option>
							</select>
							<button class="akd__btn btn--primary p--x2" type="submit">Generate</button>
						</div>
						<section class="image output pos--rel grid w--12 h--7 p--8 overflow--auto">
							<div class="image-container">
								<h2 class="msg"></h2>
								<img src="" alt="" id="image" />
							</div>
						</section>
					</div>
					<div class="spinner"></div>
				</section>
			</div>
			<footer class="window__foot">
				<div class="handle" title="drag to resize"></div>
			</footer>
		</article>`,
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {},
		/* callbacks: ($) => {
			const { Configuration, OpenAIApi } = require('openai');

			const configuration = new Configuration({
				apiKey: process.env.OPENAI_API_KEY,
			});
			const openai = new OpenAIApi(configuration);

			const generateImage = async (req, res) => {
				const { prompt, size } = req.body;

				const imageSize =
					size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

				try {
					const response = await openai.createImage({
					prompt,
					n: 1,
					size: imageSize,
					});

					const imageUrl = response.data.data[0].url;

					res.status(200).json({
					success: true,
					data: imageUrl,
					});
				} catch (error) {
					if (error.response) {
					console.log(error.response.status);
					console.log(error.response.data);
					} else {
					console.log(error.message);
					}

					res.status(400).json({
					success: false,
					error: 'The image could not be generated',
					});
				}
			};
			///////////////////////////////////////////////////////////////
			function onSubmit(e) {
				e.preventDefault();

				document.querySelector('.msg').textContent = '';
				document.querySelector('#image').src = '';

				const prompt = document.querySelector('#prompt').value;
				const size = document.querySelector('#size').value;

				if (prompt === '') {
					alert('Please add some text');
					return;
				}

				generateImageRequest(prompt, size);
			}

			async function generateImageRequest(prompt, size) {
				try {
					showSpinner();

					const response = await fetch('/openai/generateimage', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							prompt,
							size,
						}),
					});

					if (!response.ok) {
						removeSpinner();
						throw new Error('That image could not be generated');
					}

					const data = await response.json();
					// console.log(data);

					const imageUrl = data.data;

					document.querySelector('#image').src = imageUrl;

					removeSpinner();
				} catch (error) {
					document.querySelector('.msg').textContent = error;
				}
			}

			function showSpinner() {
				document.querySelector('.spinner').classList.add('show');
			}

			function removeSpinner() {
				document.querySelector('.spinner').classList.remove('show');
			}

			document.querySelector('#image-form').addEventListener('submit', onSubmit);
		} */
	}, 
	{
		id:'css-theme-generator-app', name: 'css-theme-generator', icon:`${IMAGES_URL}icons/css.png`, type: '', category:'ide-and-code-editor', ajaxTarget: '#css-theme-generator-app-ajax-window', ajaxTargetType: 'id', 
		customWindow: `<article id="css-theme-generator-app" class="window window-solid css-theme-generator inner-body-toggled" style="top: 25%;left: 25%;width: 50%;height: 50%;--color:#10bdf0;" data-theme="#10bdf0" data-custom-theme="true">
			<header class="window__head flex flex--col" draggable="true">
				<div class="flex bg--inherit z-index-9 w--12 h--12">
					<nav class="window__head-nav push-left flex-place-center px--4 mr--auto">
						<ul class="inline-flex gap--2">
							<li><a href="#" class="window__utility-menu-toggler place-center m--auto" title="toggle additional options" data-window-id="#css-theme-generator-app"><i class="fa fa-chevron-down"></i></a></li>
							<li><a href="#" class="window__body-inner-toggler place-center m--auto" title="toggle this window sidebar" data-window-id="#css-theme-generator-app"><i class="fa fa-expand"></i></a></li>
						</ul>
					</nav>
					<span class="window__title flex place-center mx--auto text--trunc">CSS Theme Generator</span>
					<nav class="window__head-nav push-right flex-place-center px--4 ml--auto">
						<ul class="inline-flex gap--2">
							<li><a href="#" class="window__button window__minimize-button" title="minimize window"><i class="fa fa-window-minimize"></i></a></li>
							<li><a href="#" class="window__button window__maximize-button" title="maximize window"><i class="fa fa-window-maximize"></i></a></li>
							<li><a href="#" class="window__button window__close-button" title="close window"><i class="fa fa-window-close"></i></a></li>
						</ul>
					</nav>
				</div>
			</header>
			<div id="css-theme-generator-app-window-body" class="window__body side--left grid">
				<aside class="window__side side--grid">
					<div class="css-theme-generator-search-bar">
						<span class="search-button fa fa-search"></span>
						<span class="search-close-button fa fa-times"></span>
						<input type="text" placeholder="search" onkeyup="if(this.value.length > 0){this.previousElementSibling.classList.add('is-visible')} else {this.previousElementSibling.classList.remove('is-visible')}" />
					</div>
					<div class="app-menu-left menu-left">	
						<ul class="setting">
							<a data-type="install" data-key="1" data-prop="appInstalled"><i class="font-icon fa fa-download"></i>Installed</a>
							<a data-type="update"><i class="font-icon fa fa-sync"></i>Update</a>
						</ul>
						<div class="line">classification</div>
						<ul class="setting">
							<a data-type="all" data-prop=""><i class="font-icon fa fa-bars"></i>All</a>
							<a data-type="file" data-prop="appCategory"><i class="font-icon fa fa-folder-open"></i>File enhancement</la>
							<a data-type="safe" data-prop="appCategory"><i class="font-icon fa fa-book"></i>Safety tools</a>
							<a data-type="tools" data-prop="appCategory"><i class="font-icon fa fa-suitcase"></i>Utilities</a>
							<a data-type="image" data-prop="appCategory"><i class="font-icon fa fa-images"></i>Image</a>
							<a data-type="media" data-prop="appCategory"><i class="font-icon fa fa-film"></i>Media</a>
							<a data-type="others" data-prop="appCategory"><i class="font-icon fa fa-ellipsis-h"></i>Other</a>
						</ul>
					</div>
					<nav class="window__side-nav bottom">
						<ul>
							<li><a class="${AJAX_CLASS} refresh" href="${BASE_URL}app/includes/loader.php" data-ajax-target="#css-theme-generator-app-ajax-window" data-ajax-target-type="id"><span class="link-icon"><i class="fa fa-redo"></i></span><span class="link-title">refresh</span></a></li>
						</ul>
					</nav>
				</aside>
				<section id="css-theme-generator-app-ajax-window" class="window__body-inner">
					<div class="app-content flex flex--col h--12 overflow--hidden">
						<div id="css-theme-generator-main" class="block w--12 h--12 float--left pt--8 px--x2 pb--x2 overflow--auto">
							<h1>W3.CSS <span class="color_h1">Color Generator</span></h1>
							<hr />
							<p>With this color generator you can create your own private themes.</p>
							<p>Input a color in the yellow box below or select a color from colors of the year.</p>
							<hr />
							<div id="controls" class="w--5 w--lg-3 w--md-5 w--sm-5 my--auto">
								<div class="navigationResizeBar">
									<span class="show-hide-navigation nav-open" data-toggle-target="#controls" data-toggle-class="controls-toggled" data-toggler-toggle-class="nav-closed" data-toggle-button></span>
								</div>
								<div class="flex gap--4 flex--center flex--col">
									<div class="w3-half w--12 flex gap--4">
										<input id="color" class="akd__input-text flex-item-even py--7 bg--yellow no--border no--radius bd bdc--default text-darker" type="text" size="8" style="height:42px;padding-left:4px" value="#00c792" data-css-create-theme-input>
										<button class="w3-btn akd__btn btn--success py--4 px--8 no--border no--radius" data-css-create-theme-button>Create Theme</button>
									</div>
									<div class="w3-half w--12">
										<select id="select01" class="akd__input-select w--12 p--8 bg--default" name="option">
											<option value="" disabled="disabled" selected="selected">Colors of the Year</option>
											<option style="color:#000;background-color:#F0EDE5" value="#F0EDE5">2018 Coconut Milk</option>
											<option style="color:#000;background-color:#C0AB8E" value="#C0AB8E">2018 Warm Sand</option>
											<option style="color:#000;background-color:#B4B7BA" value="#B4B7BA">2018 Harbor Mist</option>
											<option style="color:#fff;background-color:#2E4A62" value="#2E4A62">2018 Sailor Blue</option>
											<option style="color:#000;background-color:#BFD641" value="#BFD641">2018 Lime Punch</option>
											<option style="color:#fff;background-color:#BC70A4" value="#BC70A4">2018 Spring Crocus</option>
											<option style="color:#000;background-color:#EADEDB" value="#EADEDB">2018 Almost Mauve</option>
											<option style="color:#fff;background-color:#6B5B95" value="#6B5B95">2018 Ultra Violet</option>
											<option style="color:#fff;background-color:#6C4F3D" value="#6C4F3D">2018 Emperador</option>
											<option style="color:#fff;background-color:#00A591" value="#00A591">2018 Arcadia</option>
											<option style="color:#000;background-color:#EC9787" value="#EC9787">2018 Blooming Dahlia</option>
											<option style="color:#000;background-color:#DBB1CD" value="#DBB1CD">2018 Pink Lavender</option>
											<option style="color:#fff;background-color:#944743" value="#944743">2018 Chili Oil</option>
											<option style="color:#000;background-color:#6F9FD8" value="#6F9FD8">2018 Little Boy Blue</option>
											<option style="color:#fff;background-color:#E94B3C" value="#E94B3C">2018 Cherry Tomato</option>
											<option style="color:#000;background-color:#ECDB54" value="#ECDB54">2018 Meadowlark</option>
											<option style="color:#000;background-color:#95dee3" value="#95dee3">2018 Meerkat</option>
											<option style="color:#000;background-color:#BCBCBE" value="#BCBCBE">2018 Quiet Gray</option>
											<option style="color:#000;background-color:#D1B894" value="#D1B894">2018 Almond Buff</option>
											<option style="color:#000;background-color:#EAE6DA" value="#EAE6DA">2018 Tofu</option>
											<option style="color:#fff;background-color:#485167" value="#485167">2018 Sargasso Sea</option>
											<option style="color:#fff;background-color:#006E6D" value="#006E6D">2018 Quetzal Green</option>
											<option style="color:#000;background-color:#F1EA7F" value="#F1EA7F">2018 Limelight</option>
											<option style="color:#000;background-color:#BE9EC9" value="#BE9EC9">2018 Crocus Petal</option>
											<option style="color:#fff;background-color:#E47A2E" value="#E47A2E">2018 Russet Orange</option>
											<option style="color:#fff;background-color:#766F57" value="#766F57">2018 Martini Olive</option>
											<option style="color:#000;background-color:#D5AE41" value="#D5AE41">2018 Ceylon Yellow</option>
											<option style="color:#fff;background-color:#3F69AA" value="#3F69AA">2018 Nebulas Blue</option>
											<option style="color:#fff;background-color:#BD3D3A" value="#BD3D3A">2018 Valiant Poppy</option>
											<option style="color:#fff;background-color:#7F4145" value="#7F4145">2018 Red Pear</option>
											<option style="color:#000;background-color:#cfb095" value="#cfb095">2017 Hazelnut</option>
											<option style="color:#fff;background-color:#5a7247" value="#5a7247">2017 Kale</option>
											<option style="color:#fff;background-color:#ce3175" value="#ce3175">2017 Pink Yarrow</option>
											<option style="color:#000;background-color:#edcdc2" value="#edcdc2">2017 Pale Dogwood</option>
											<option style="color:#000;background-color:#95dee3" value="#95dee3">2017 Island Paradise</option>
											<option style="color:#fff;background-color:#f2552c" value="#f2552c">2017 Flame</option>
											<option style="color:#fff;background-color:#004b8d" value="#004b8d">2017 Lapis Blue</option>
											<option style="color:#fff;background-color:#f6d155" value="#f6d155">2017 Primrose Yellow</option>
											<option style="color:#fff;background-color:#578ca9" value="#578ca9">2017 Niagara</option>
											<option style="color:#fff;background-color:#d2691e" value="#d2691e">2017 Autumn Maple</option>
											<option style="color:#fff;background-color:#4F84C4" value="#4F84C4">2017 Marina</option>
											<option style="color:#fff;background-color:#9c9a40" value="#9c9a40">2017 Golden Lime</option>
											<option style="color:#fff;background-color:#005960" value="#005960">2017 Shaded Spruce</option>
											<option style="color:#fff;background-color:#898e8c" value="#898e8c">2017 Neutral Gray</option>
											<option style="color:#fff;background-color:#223a5e" value="#223a5e">2017 Navy Peony</option>
											<option style="color:#fff;background-color:#c48f65" value="#c48f65">2017 Butterum</option>
											<option style="color:#000;background-color:#f3d6e4" value="#f3d6e4">2017 Ballet Slipper</option>
											<option style="color:#fff;background-color:#672e3b" value="#672e3b">2017 Tawny Port</option>
											<option style="color:#fff;background-color:#dc4c46" value="#dc4c46">2017 Grenadine</option>
											<option style="color:#fff;background-color:#92b558" value="#92b558">2017 Greenery</option>
											<option style="color:#fff;background-color:#4c6a92" value="#4c6a92">2016 Riverside</option>
											<option style="color:#fff;background-color:#92b6d5" value="#92b6d5">2016 Airy Blue</option>
											<option style="color:#fff;background-color:#838487" value="#838487">2016 Sharkskin</option>
											<option style="color:#fff;background-color:#b93a32" value="#b93a32">2016 Aurora Red</option>
											<option style="color:#fff;background-color:#af9483" value="#af9483">2016 Warm Taupe</option>
											<option style="color:#fff;background-color:#ad5d5d" value="#ad5d5d">2016 Dusty Cedar</option>
											<option style="color:#fff;background-color:#006e51" value="#006e51">2016 Lush Medow</option>
											<option style="color:#fff;background-color:#d8ae47" value="#d8ae47">2016 Spicy Mustard</option>
											<option style="color:#fff;background-color:#9e4624" value="#9e4624">2016 Potter's Clay</option>
											<option style="color:#fff;background-color:#b76ba3" value="#b76ba3">2016 Bodacious</option>
											<option style="color:#000;background-color:#f7cac9" value="#f7cac9">2016 Rose Quarts</option>
											<option style="color:#fff;background-color:#92a8d1" value="#92a8d1">2016 Serenity</option>
											<option style="color:#fff;background-color:#f7786b" value="#f7786b">2016 Peach Echo</option>
											<option style="color:#fff;background-color:#034f84" value="#034f84">2016 Snorkel Blue</option>
											<option style="color:#000;background-color:#98ddde" value="#98ddde">2016 Limpet Shell</option>
											<option style="color:#fff;background-color:#9896a4" value="#9896a4">2016 Lilac Grey</option>
											<option style="color:#fff;background-color:#b18f6a" value="#b18f6a">2016 Iced Coffe</option>
											<option style="color:#fff;background-color:#dd4132" value="#dd4132">2016 Fiesta</option>
											<option style="color:#000;background-color:#fae03c" value="#fae03c">2016 Buttercup</option>
											<option style="color:#fff;background-color:#79c753" value="#79c753">2016 Green Flash</option>
											<option style="color:#fff;background-color:#955251" value="#955251">2015 Marsala</option>
											<option style="color:#fff;background-color:#b565a7" value="#b565a7">2014 Radiand Orchid</option>
											<option style="color:#fff;background-color:#009b77" value="#009b77">2013 Emerald</option>
											<option style="color:#fff;background-color:#dd4124" value="#dd4124">2012 Tangerine Tango</option>
											<option style="color:#fff;background-color:#d65076" value="#d65076">2011 Honeysucle</option>
											<option style="color:#fff;background-color:#45b8ac" value="#45b8ac">2010 Turquise</option>
											<option style="color:#fff;background-color:#efc050" value="#efc050">2009 Mimosa</option>
											<option style="color:#fff;background-color:#5b5ea6" value="#5b5ea6">2008 Blue Izis</option>
											<option style="color:#fff;background-color:#9b2335" value="#9b2335">2007 Chili Pepper</option>
											<option style="color:#000;background-color:#dfcfbe" value="#dfcfbe">2006 Sand Dollar</option>
										</select>
									</div>
								</div>
						
								<div class="w3-row my--8 w--12 flex gap--4 flex--wrap">
									<div class="flex gap--4 w--12">
										<input id="hue" class="flex-item-even py--7 pl--2 text--center no--border no--radius" type="text" size="8" style="min-height:34px;padding-left:4px" value="164" disabled="disabled">
										<button class="akd__btn btn--success w--5 py--4 px--8 no--border no--radius" data-css-hue-minus>Hue -</button>
										<button class="akd__btn btn--success w--5 py--4 px--8 no--border no--radius" data-css-hue-plus>Hue +</button>
									</div>
									<div class="flex gap--4 w--12">
										<input id="saturation" class="flex-item-even py--7 pl--2 text--center no--border no--radius" type="text" size="8" style="min-height:34px;padding-left:4px" value="1.00" disabled="disabled">
										<button class="akd__btn btn--success w--5 py--4 px--8 no--border no--radius" data-css-saturation-minus>Sat -</button>
										<button class="akd__btn btn--success w--5 py--4 px--8 no--border no--radius" data-css-saturation-plus>Sat +</button>
									</div>
								</div>
								<div class="flex gap--4 my--8 fx--jc-ev w--12">
									<button class="akd__btn btn--success flex-item-even gap--2 py--4 px--8 text--lg no--radius" title="copy created theme to clipboard" style="text-transform: none;" data-css-copy-button><i class="fa fa-clipboard mr--auto bd bdc--dark bdr--50 py--2 px--4 bg:opaque text--info"></i><span class="bd bdc--dark px--6 bdr--x2 bg:opaque bdc--success flex-place-center text--center pb--2 text--df">Copy</span></button>
									<button class="akd__btn btn--success flex-item-even gap--2 py--4 px--8 text--lg no--radius" title="save created theme" style="text-transform: none;" data-css-save-button><i class="fa fa-save mr--auto bd bdc--dark bdr--50 py--2 px--4 bg:opaque text--info"></i><span class="bd bdc--dark px--6 bdr--x2 bg:opaque bdc--success flex-place-center text--center pb--2 text--df">Save</span></button>
								</div>
							</div>
						
							<div id="demo-h1" class="flex flex--center" style="background-color: rgb(0, 159, 117); color: rgb(255, 255, 255);">
								<div class="w3-hide-medium w3-hide-small w--2 w--lg-2 w--md-2 w--sm-3 px--8 py--8 text-xl opacity--6 opacity-hover-show">
									<i class="text-xl fa fa-bars"></i>
								</div>
						
								<div class="flex w--10 w--lg-10 w--md-10 w--sm-7 px--8 py--8 text--l">
									<input id="demo-input" class="w3-show-inline-block no--radius no--border" style="background-color: rgb(0, 179, 131);">
									<span class="akd__btn btn--primary p--8 no--radius""><i class="text-xl fa fa-search"></i></span>
								</div>
						
								<div class="w3-hide-medium w3-hide-small flex w--2 w--lg-2 w--md-2 w--sm-2 px--8 py--1 ml--auto">
									<img class="bdr--50" src="http://localhost/www/sites/W3/W3.CSS%20Color%20Generator_files/img_avtar.jpg" style="height:45px"><br>
								</div>
							</div>
						
							<div id="demo-h2" class="px--8 py--x2" style="background-color: rgb(0, 199, 146); color: rgb(255, 255, 255);">
								<h2>W3.CSS Themes Example</h2>
							</div>
						
							<div class="flex px--8 my--8" style="margin-left:-16px;margin-right:-16px">
								<div class="w--4 px--4">
									<div class="shadow-3">
										<img src="http://localhost/www/sites/W3/W3.CSS%20Color%20Generator_files/img_5terre.jpg" style="width:100%">
										<div class="px--8 py--1">
											<h4>Cinque Terre</h4>
											<p>The Cinque Terre (five lands) is a portion of the Italian Riviera.
											The coastline with five villages: Monterosso, Vernazza, Corniglia, Manarola, and Riomaggiore
											is a UNESCO World Heritage Site.</p>
										</div>
									</div>
								</div>
						
								<div class="w--4 px--4">
									<div class="shadow-3">
										<img src="http://localhost/www/sites/W3/W3.CSS%20Color%20Generator_files/img_monterosso.jpg" style="width:100%">
										<div class="px--8 py--1">
											<h4>Monterosso</h4>
											<p>Monterosso al Mare is located at the center of a small natural gulf, protected by a small artificial reef,
											in the Riviera of La Spezia. It is the northernmost village of the Cinque Terre.</p>
										</div>
									</div>
								</div>
						
								<div class="w--4 px--4">
									<div class="shadow-3">
										<img src="http://localhost/www/sites/W3/W3.CSS%20Color%20Generator_files/img_vernazza.jpg" style="width:100%">
										<div class="px--8 py--1">
											<h4>Vernazza</h4>
											<p>Vernazza is another of the five towns in the Cinque Terre region.
											Vernazza is the fourth town heading north. It has no car traffic, and is one of the truest
											"fishing villages" on the Italian Riviera.
											</p>
										</div>
									</div>
								</div>
							</div>
						
							<div id="demo-list" class="flex text--sm" style="background-color:black">
								<div class="w--4 p--8" style="color:#ccc">
									<a class="w3-hover-text-white" href="https://www.w3schools.com/html/default.asp"> HTML Tutorial </a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/css/default.asp">CSS Tutorial</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/js/default.asp">JavaScript Tutorial</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/w3css/default.asp">W3.CSS Tutorial</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/bootstrap/default.asp">Bootstrap Tutorial</a><br>
								</div>
						
								<div class="w--4 p--8" style="color:#ccc">
									<a class="w3-hover-text-white" href="https://www.w3schools.com/tags/default.asp">HTML Reference</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/cssref/default.asp">CSS Reference</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/jsref/default.asp">JavaScript Reference</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/w3css/w3css_references.asp">W3.CSS Reference</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/browsers/default.asp">Browser Statistics</a><br>
								</div>
						
								<div class="w--4 p--8" style="color:#ccc">
									<a class="w3-hover-text-white" href="https://www.w3schools.com/html/html_examples.asp">HTML Examples</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/css/css_examples.asp">CSS Examples</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/js/js_examples.asp">JavaScript Examples</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/w3css/w3css_examples.asp">W3.CSS Examples</a><br>
									<a class="w3-hover-text-white" href="https://www.w3schools.com/js/js_dom_examples.asp">HTML DOM Examples</a><br>
								</div>
							</div>
							
							<div id="demo-footer" class="px--8 py--1 opacity--6 opacity-hover-show" style="background-color: rgb(0, 159, 117); color: rgb(255, 255, 255);">
								<h3>Footer</h3>
							</div>
						
							<hr>
							<div class="w--12 px--4 flex gap--4" style="margin:0 -16px">
								<div class="w--6 px--4">
									<h2>Created Theme</h2>
									<table class="palette w--12">
										<tbody>
											<tr style="height:59px;"><td id="t1l5" style="color: rgb(0, 0, 0); background-color: rgb(236, 255, 250);">#ecfffa w3-theme-l5</td></tr>
											<tr style="height:59px"><td id="t1l4" style="color: rgb(0, 0, 0); background-color: rgb(193, 255, 238);">#c1ffee w3-theme-l4</td></tr>
											<tr style="height:58px"><td id="t1l3" style="color: rgb(0, 0, 0); background-color: rgb(131, 255, 222);">#83ffde w3-theme-l3</td></tr>
											<tr style="height:59px"><td id="t1l2" style="color: rgb(0, 0, 0); background-color: rgb(68, 255, 205);">#44ffcd w3-theme-l2</td></tr>
											<tr style="height:58px"><td id="t1l1" style="color: rgb(0, 0, 0); background-color: rgb(6, 255, 189);">#06ffbd w3-theme-l1</td></tr>
											<tr style="height:59px"><td id="t1d0" style="background-color: rgb(0, 199, 146); color: rgb(255, 255, 255);">#00c792 w3-theme</td></tr>
											<tr style="height:58px"><td id="t1d1" style="background-color: rgb(0, 179, 131); color: rgb(255, 255, 255);">#00b383 w3-theme-d1</td></tr>
											<tr style="height:59px"><td id="t1d2" style="background-color: rgb(0, 159, 117); color: rgb(255, 255, 255);">#009f75 w3-theme-d2</td></tr>
											<tr style="height:58px"><td id="t1d3" style="background-color: rgb(0, 139, 102); color: rgb(255, 255, 255);">#008b66 w3-theme-d3</td></tr>
											<tr style="height:59px"><td id="t1d4" style="background-color: rgb(0, 119, 88); color: rgb(255, 255, 255);">#007758 w3-theme-d4</td></tr>
											<tr style="height:58px"><td id="t1d5" style="background-color: rgb(0, 99, 73); color: rgb(255, 255, 255);">#006349 w3-theme-d5</td></tr>
										</tbody>
									</table>
								</div>
						
								<div class="w--6 px--4">
									<h2>Theme In Use:</h2>
									<div class="bordered bdc--default">
										<div id="mt1-top" class="flex px--2 py--4" style="background: rgb(0, 139, 102) none repeat scroll 0% 0%; color: rgb(255, 255, 255);">
											<div class="flex-place-center gap--2 ml--auto">
												<i class="fa fa-cube"></i>
												<i class="fa fa-sort"></i>
												<i class="fa fa-trash"></i>
												<span>12:30</span>
											</div>
										</div>
										<header id="mt1-header" class="px--8 py--1" style="background: rgb(0, 199, 146) none repeat scroll 0% 0%; color: rgb(255, 255, 255);">
											<h2>Movies</h2>
										</header>
										<div id="mt1-back" class="p--8" style="position: relative; min-height: 465px; background: rgb(236, 255, 250) none repeat scroll 0% 0%;">
											<a id="mt1-action" class="w3-right akd__btn bdr--50 text--xl" style="position: absolute; top: -30px; right: 16px; background: rgb(0, 99, 73) none repeat scroll 0% 0%; color: rgb(255, 255, 255);">+</a>
											<div class="flex gap--2">
												<div class="w3-col" style="width:100px">
													<img class="bdr--50" src="http://localhost/www/sites/W3/W3.CSS%20Color%20Generator_files/img_avatar.jpg" alt="avatar">
												</div>
												<div class="overflow--hidden px--8 py--1">
													<h3 id="mt1-h1" style="color: rgb(0, 199, 146);">Frozen</h3>
													<p>The response to the animations was ridiculous.</p>
												</div>
											</div>  
											<hr>
											<div class="flex gap--2">
												<div id="mt1-graphic" class="w3-col" style="width: 100px; color: rgb(0, 199, 146);">
													<i class="fab fa-rebel" style="font-size:96px;"></i>
												</div>
												<div class="overflow--hidden px--8 py--1">
													<h3 id="mt1-h2" style="color: rgb(0, 199, 146);">Star Wars</h3>
													<p>People were excited for the new Star Wars movie.</p>
												</div>
											</div>
											<hr>
											<div class="flex gap--2">
												<div class="w3-col" style="width:100px">
													<img class="bdr--50" src="http://localhost/www/sites/W3/W3.CSS%20Color%20Generator_files/img_avatar.jpg" alt="avatar">
												</div>
												<div class="overflow--hidden px--8 py--1">
													<h3 id="mt1-h3" style="color: rgb(0, 199, 146);">The Avengers</h3>
													<p>A huge success for Marvel and Disney.</p>
												</div>
											</div>
										</div>
										<div id="mt1-footer" class="px--8 py--1" style="background: rgb(0, 199, 146) none repeat scroll 0% 0%; color: rgb(255, 255, 255);">
											<p>W3Schools 2016</p>
										</div>
										<div id="mt1-bottom" class="flex px--8 py--1 text--xl" style="background: rgb(0, 99, 73) none repeat scroll 0% 0%; color: rgb(255, 255, 255);">
											<span class="mr--auto">«</span><span class="ml-auto">»</span>
										</div>
									</div>
								</div>
							</div>
						
							<hr>
							<h2 class="mt--8">Generated CSS:</h2>
							<div id="css1" class="cssHigh w--auto ww--bw px--6 py--4 my--8 bd bdc--default text--df">.w3-theme-l5 {color:#000 !important; background-color:#ecfffa !important}<br>.w3-theme-l4 {color:#000 !important; background-color:#c1ffee !important}<br>.w3-theme-l3 {color:#000 !important; background-color:#83ffde !important}<br>.w3-theme-l2 {color:#000 !important; background-color:#44ffcd !important}<br>.w3-theme-l1 {color:#000 !important; background-color:#06ffbd !important}<br>.w3-theme-d1 {color:#fff !important; background-color:#00b383 !important}<br>.w3-theme-d2 {color:#fff !important; background-color:#009f75 !important}<br>.w3-theme-d3 {color:#fff !important; background-color:#008b66 !important}<br>.w3-theme-d4 {color:#fff !important; background-color:#007758 !important}<br>.w3-theme-d5 {color:#fff !important; background-color:#006349 !important}<br><br>.w3-theme-light {color:#000 !important; background-color:#ecfffa !important}<br>.w3-theme-dark {color:#fff !important; background-color:#006349 !important}<br>.w3-theme-action {color:#fff !important; background-color:#006349 !important}<br><br>.w3-theme {color:#fff !important; background-color:#00c792 !important}<br>.w3-text-theme {color:#00c792 !important}<br>.w3-border-theme {border-color:#00c792 !important}<br><br>.w3-hover-theme:hover {color:#fff !important; background-color:#00c792 !important}<br>.w3-hover-text-theme:hover {color:#00c792 !important}<br>.w3-hover-border-theme:hover {border-color:#00c792 !important}<br></div>
							<textarea id="css-theme-generator-hidden-textarea" class="visually-hidden">.w3-theme-l5 {color:#000 !important; background-color:#ecfffa !important}\n.w3-theme-l4 {color:#000 !important; background-color:#c1ffee !important}\n.w3-theme-l3 {color:#000 !important; background-color:#83ffde !important}\n.w3-theme-l2 {color:#000 !important; background-color:#44ffcd !important}\n.w3-theme-l1 {color:#000 !important; background-color:#06ffbd !important}\n.w3-theme-d1 {color:#fff !important; background-color:#00b383 !important}\n.w3-theme-d2 {color:#fff !important; background-color:#009f75 !important}\n.w3-theme-d3 {color:#fff !important; background-color:#008b66 !important}\n.w3-theme-d4 {color:#fff !important; background-color:#007758 !important}\n.w3-theme-d5 {color:#fff !important; background-color:#006349 !important}\n\n.w3-theme-light {color:#000 !important; background-color:#ecfffa !important}\n.w3-theme-dark {color:#fff !important; background-color:#006349 !important}\n.w3-theme-action {color:#fff !important; background-color:#006349 !important}\n\n.w3-theme {color:#fff !important; background-color:#00c792 !important}\n.w3-text-theme {color:#00c792 !important}\n.w3-border-theme {border-color:#00c792 !important}\n\n.w3-hover-theme:hover {color:#fff !important; background-color:#00c792 !important}\n.w3-hover-text-theme:hover {color:#00c792 !important}\n.w3-hover-border-theme:hover {border-color:#00c792 !important}\n</textarea>
							<hr>
						
							<div id="mypagediv2" style="position:relative;text-align:center;"></div>
							<br>
						</div>
					</div>
					<div class="spinner"></div>
				</section>
			</div>
			<footer class="window__foot">
				<div class="handle" title="drag to resize"></div>
			</footer>
		</article>`,
		config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {},
		callbacks: ($) => {
			createTheme(-1);
			$("#select01").change(function(e){
				createSuggestion();
			});
			$("[data-css-saturation-plus]").click(function(e){
				saturationPlus(0.05);
			});
			$("[data-css-saturation-minus]").click(function(e){
				saturationPlus(-0.05);
			});
			$("[data-css-hue-plus]").click(function(e){
				huePlus(+5);
			});
			$("[data-css-hue-minus]").click(function(e){
				huePlus(-5);
			});
			$("[data-css-create-theme-button]").click(function(e){
				createTheme(-1);
			});
			$("[data-css-create-theme-input]").change(function(e){
				createTheme(-1);
			});
			$("[data-css-paste-button]").click(function(e){
				let $out = $(this.dataset.target);
				if("clipboard" in navigator){
					navigator.clipboard.readText(text.trim())
						.then(text => {
							$out.focus().html(text)
							console.log('Text pasteded');
						})
						.catch(() => console.log('Failed to paste text'));
				} else {
					$out.focus();
					document.execCommand("paste");
				}
			});
			$("[data-css-copy-button]").click(function(e){
				let $el = $("#css-theme-generator-hidden-textarea") ;
				const text = $el.val() || $el.text() || $el.html();
				if("clipboard" in navigator){
					navigator.clipboard.writeText(text.trim()).then(() => console.log('Text copied')).catch(() => console.log('Failed to copy text'));
				} else {
					const textArea = document.createElement("textarea");
					textArea.value = text.trim();
					document.body.appendChild(textArea);
					textArea.select();
					document.execCommand("Copy");
					document.body.removeChild(textArea);
				}
				///////////////////////////////////
				///////////////////////////////////
				let tst = document.createElement('div');
				tst.classList = 'toast ripple';
				tst.innerHTML = 'Snippet copied to clipboard!';
				document.body.appendChild(tst);
				setTimeout(function() {
					tst.style.opacity = 0;
					setTimeout(function() {
						document.body.removeChild(tst);
					}, 300);
				},1700);
			});
			/* $(document).on("paste", function(e){
				e.preventDefault();
				if(("clipboard" in navigator) && ("getText" in navigator.clipboard)){
					navigator.clipboard.getText()
						.then(text => console.log('Updated clipboard content: ' + text))
						//.catch(() => console.log('Failed to copy text'));
				} else {}
			}); */
			//////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////
			function huePlus(amount) {
				var x,y;
				x = document.getElementById("color").value;
				y = w3color(x).toHsl();  
				y.h = y.h + amount;
				if (y.h < 0) {y.h = 355;}
				document.getElementById("color").value = w3color("hsl(" + y.h + "," + y.s + "," + y.l + ")").toHexString();  
				createTheme(-1);
			}
			function saturationPlus(amount) {
				var x,y;
				x = document.getElementById("color").value;
				y = w3color(x).toHsl();  
				y.s = y.s + amount;
				if (y.s > 0.98) {y.s = 100;}
				if (y.s < 0.02) {y.s = 0.01;}
				document.getElementById("color").value = w3color("hsl(" + y.h + "," + y.s + "," + y.l + ")").toHexString();  
				createTheme(-1);
			}
			function createSuggestion() {
				document.getElementById("color").value = document.getElementById("select01").value;
				createTheme(-1); 
			}
			function createTheme(inVar) {
				var theme1 = new Object;
				var i,c,h,s,l,b,v;  
				var x, y, z, txt, sat, light, hex, col, ele;
				var y = document.getElementById("color").value;
		
				x = w3color(y).toHsl();
		
				document.getElementById("hue").value = x.h.toFixed(0);
				document.getElementById("saturation").value = x.s.toFixed(2);
				document.getElementById("color").value = w3color(y).toHexString(); 
		
				x = w3color(y).toHsl();
				sat = x.s;
				light = x.l;
		
				x.l= light + ((1.0-light)/5) * 4.7
				hex = w3color("hsl(" + x.h + "," + sat + "," + x.l + ")").toHexString();
				z = document.getElementById("t1l5");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-l5";
				theme1.l5 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.tl5 = col;
		
				x.l= light + ((1.0-light)/5) * 4
				hex = w3color("hsl(" + x.h + "," + sat + "," + x.l + ")").toHexString();
				z = document.getElementById("t1l4");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-l4";
				theme1.l4 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.tl4 = col;
		
				x.l= light + ((1.0-light)/5) * 3
				hex = w3color("hsl(" + x.h + "," + sat + "," + x.l + ")").toHexString();
				z = document.getElementById("t1l3");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-l3";
				theme1.l3 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.tl3 = col;
		
				x.l= light + ((1.0-light)/5) * 2
				hex = w3color("hsl(" + x.h + "," + sat + "," + x.l + ")").toHexString();
				z = document.getElementById("t1l2");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-l2";
				theme1.l2 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.tl2 = col;
		
				x.l= light + ((1.0-light)/5) * 1
				hex = w3color("hsl(" + x.h + "," + sat + "," + x.l + ")").toHexString();
				z = document.getElementById("t1l1");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-l1";
				theme1.l1 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
		
				theme1.tl1 = col;
				x.l= light
				hex = w3color(y).toHexString();
				z = document.getElementById("t1d0");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme";
				theme1.d0 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.td0 = col;
		
				x.l= light - ((light)/5) * 0.5
				hex = w3color("hsl(" + x.h + "," + x.s + "," + x.l + ")").toHexString();
				z = document.getElementById("t1d1");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-d1";
				theme1.d1 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.td1 = col;
		
				x.l= light - ((light)/5) * 1
				hex = w3color("hsl(" + x.h + "," + x.s + "," + x.l + ")").toHexString();
				z = document.getElementById("t1d2");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-d2";
				theme1.d2 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.td2 = col;
		
				x.l= light - ((light)/5) * 1.5
				hex = w3color("hsl(" + x.h + "," + x.s + "," + x.l + ")").toHexString();
				z = document.getElementById("t1d3");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-d3";
				theme1.d3 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.td3 = col;
		
				x.l= light - ((light)/5) * 2;
				hex = w3color("hsl(" + x.h + "," + x.s + "," + x.l + ")").toHexString();
				z = document.getElementById("t1d4");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-d4";
				theme1.d4 = hex;
				col = "#000";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.td4 = col;
		
				x.l= light - ((light)/5) * 2.5;
				hex = w3color("hsl(" + x.h + "," + x.s + "," + x.l + ")").toHexString();
				z = document.getElementById("t1d5");
				z.style.backgroundColor = hex;
				z.innerHTML = hex + " w3-theme-d5";
				theme1.d5 = hex;
				col = "#";
				if (w3color(hex).isDark(165)) {col = "#fff"};
				z.style.color = col;
				theme1.td5 = col;
		
				txt = ".w3-theme-l5 {color:" + theme1.tl5 + " !important; background-color:" + theme1.l5 +" !important}<br>";
				txt += ".w3-theme-l4 {color:" + theme1.tl4 + " !important; background-color:" + theme1.l4 +" !important}<br>";
				txt += ".w3-theme-l3 {color:" + theme1.tl3 + " !important; background-color:" + theme1.l3 +" !important}<br>";
				txt += ".w3-theme-l2 {color:" + theme1.tl2 + " !important; background-color:" + theme1.l2 +" !important}<br>";
				txt += ".w3-theme-l1 {color:" + theme1.tl1 + " !important; background-color:" + theme1.l1 +" !important}<br>";
				txt += ".w3-theme-d1 {color:" + theme1.td1 + " !important; background-color:" + theme1.d1 +" !important}<br>";
				txt += ".w3-theme-d2 {color:" + theme1.td2 + " !important; background-color:" + theme1.d2 +" !important}<br>";
				txt += ".w3-theme-d3 {color:" + theme1.td3 + " !important; background-color:" + theme1.d3 +" !important}<br>";
				txt += ".w3-theme-d4 {color:" + theme1.td4 + " !important; background-color:" + theme1.d4 +" !important}<br>";
				txt += ".w3-theme-d5 {color:" + theme1.td5 + " !important; background-color:" + theme1.d5 +" !important}<br><br>";
		
				txt += ".w3-theme-light {color:" + theme1.tl5 + " !important; background-color:" + theme1.l5 +" !important}<br>";
				txt += ".w3-theme-dark {color:" + theme1.td5 + " !important; background-color:" + theme1.d5 +" !important}<br>";
				txt += ".w3-theme-action {color:" + theme1.td5 + " !important; background-color:" + theme1.d5 +" !important}<br><br>";
		
				txt += ".w3-theme {color:" + theme1.td0 + " !important; background-color:" + theme1.d0 +" !important}<br>";
				txt += ".w3-text-theme {color:" + theme1.d0 + " !important}<br>";
				txt += ".w3-border-theme {border-color:" + theme1.d0 + " !important}<br><br>";
		
				txt += ".w3-hover-theme:hover {color:" + theme1.td0 + " !important; background-color:" + theme1.d0 +" !important}<br>";
				txt += ".w3-hover-text-theme:hover {color:" + theme1.d0 + " !important}<br>";
				txt += ".w3-hover-border-theme:hover {border-color:" + theme1.d0 + " !important}<br>";
		
				document.getElementById("css-theme-generator-hidden-textarea").value = txt;
				document.getElementById("css1").innerHTML = w3CodeColorize(txt, 'css');
				
				ele = document.getElementById("mt1-top")
				ele.style.background = theme1.d3;
				ele.style.color = theme1.td3;
		
				ele = document.getElementById("mt1-header")
				ele.style.background = theme1.d0;
				ele.style.color = theme1.td0;
		
				ele = document.getElementById("mt1-footer")
				ele.style.background = theme1.d0;
				ele.style.color = theme1.td0;
		
				ele = document.getElementById("mt1-bottom")
				ele.style.background = theme1.d5;
				ele.style.color = theme1.td5;
		
				ele = document.getElementById("mt1-action")
				ele.style.background = theme1.d5;
				ele.style.color = theme1.td5;
		
				ele = document.getElementById("mt1-graphic")
				ele.style.color = theme1.d0;
		
				ele = document.getElementById("mt1-back")
				ele.style.background = theme1.l5;
		
				ele = document.getElementById("mt1-h1")
				ele.style.color = theme1.d0
				ele = document.getElementById("mt1-h2")
				ele.style.color = theme1.d0
				ele = document.getElementById("mt1-h3")
				ele.style.color = theme1.d0
		
				displayDemo(theme1);
			}
			function displayDemo(theme) {
				document.getElementById("demo-h1").style.backgroundColor = theme.d2;
				document.getElementById("demo-h1").style.color = theme.td2;
				document.getElementById("demo-input").style.backgroundColor = theme.d1;
				document.getElementById("demo-h2").style.backgroundColor = theme.d0;
				document.getElementById("demo-h2").style.color = theme.td0;
				document.getElementById("demo-footer").style.backgroundColor = theme.d2;
				document.getElementById("demo-footer").style.color = theme.td2;
			}
		}
	}, 
	{
		id:'store-app-window', name: 'store', icon:`${IMAGES_URL}icons/store.png`, type: '', category:'administration', ajaxTarget: '#store-app-ajax-window', ajaxTargetType: 'id', 
		customWindow: `<article id="store-app-window" class="window window-solid store" style="top: 25%;left: 25%;width: 50%;height: 50%;--color:#191c35;" data-theme="#191c35" data-custom-theme="true">
			<header class="window__head flex flex--col" draggable="true">
				<div class="flex bg--inherit z-index-9 w--12 h--12">
					<nav class="window__head-nav push-left flex-place-center px--4 mr--auto">
						<ul class="inline-flex gap--2">
							<li><a href="#" class="window__utility-menu-toggler place-center m--auto" title="toggle additional options" data-window-id="#store-app-window"><i class="fa fa-chevron-down"></i></a></li>
							<li><a href="#" class="window__body-inner-toggler place-center m--auto" title="toggle this window sidebar" data-window-id="#store-app-window"><i class="fa fa-compress"></i></a></li>
						</ul>
					</nav>
					<span class="window__title flex place-center mx--auto">Store App</span>
					<nav class="window__head-nav push-right flex-place-center px--4 ml--auto">
						<ul class="inline-flex gap--2">
							<li><a href="#" class="window__button window__minimize-button" title="minimize window"><i class="fa fa-window-minimize"></i></a></li>
							<li><a href="#" class="window__button window__maximize-button" title="maximize window"><i class="fa fa-window-maximize"></i></a></li>
							<li><a href="#" class="window__button window__close-button" title="close window"><i class="fa fa-window-close"></i></a></li>
						</ul>
					</nav>
				</div>
			</header>
			<div id="store-app-window-body" class="window__body side--left grid">
				<aside class="window__side side--grid">
					<div class="store-search-bar">
						<span class="search-button fa fa-search"></span>
						<span class="search-close-button fa fa-times"></span>
						<input type="text" placeholder="search" onkeyup="if(this.value.length > 0){this.previousElementSibling.classList.add('is-visible')} else {this.previousElementSibling.classList.remove('is-visible')}" />
					</div>
					<div class="app-menu-left menu-left">	
						<ul class="setting">
							<a data-type="install" data-key="1" data-prop="appInstalled"><i class="font-icon fa fa-download"></i>Installed</a>
							<a data-type="update"><i class="font-icon fa fa-sync"></i>Update</a>
						</ul>
						<div class="line">classification</div>
						<ul class="setting">
							<a data-type="all" data-prop=""><i class="font-icon fa fa-bars"></i>All</a>
							<a data-type="file" data-prop="appCategory"><i class="font-icon fa fa-folder-open"></i>File enhancement</la>
							<a data-type="safe" data-prop="appCategory"><i class="font-icon fa fa-book"></i>Safety tools</a>
							<a data-type="tools" data-prop="appCategory"><i class="font-icon fa fa-suitcase"></i>Utilities</a>
							<a data-type="image" data-prop="appCategory"><i class="font-icon fa fa-images"></i>Image</a>
							<a data-type="media" data-prop="appCategory"><i class="font-icon fa fa-film"></i>Media</a>
							<a data-type="others" data-prop="appCategory"><i class="font-icon fa fa-ellipsis-h"></i>Other</a>
						</ul>
					</div>
					<nav class="window__side-nav bottom">
						<ul>
							<li><a class="${AJAX_CLASS} refresh" href="${BASE_URL}app/includes/loader.php" data-ajax-target="#store-app-ajax-window" data-ajax-target-type="id"><span class="link-icon"><i class="fa fa-redo"></i></span><span class="link-title">refresh</span></a></li>
						</ul>
					</nav>
				</aside>
				<section id="store-app-ajax-window" class="window__body-inner">
					<div class="app-content app-plugins">
						<div class="app-model app-content-box pos--abs top--0 left--0 right--0 overflow--auto bottom--0 p--8">
							<div class="h1 text--400 text--lg bd--b bdc--default pb--8 m--0">Plugins</div>
							<ul class="app-list flex flex--between flex--wrap pt--4 pb--x2 mt--4"></ul>
						</div>
						<div class="app-model app-descript can-select can-right-menu hidden"></div>
					</div>
				</section>
			</div>
			<footer class="window__foot">
				<div class="handle" title="drag to resize"></div>
			</footer>
		</article>`,
		config: {
			shortcut: {add_to_dextop: true, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {},
		callbacks: ($) => {
			const appList = [...windowsArray, ...appsArray];
			//console.log(appList)
			let nameToClassName=function(a){
				for(var b=["bg-red-6","bg-red-8","bg-red-10","bg-green-6","bg-green-8","bg-green-10","bg-blue-6","bg-blue-8","bg-blue-10","bg-purple-6","bg-purple-8","bg-purple-10","bg-cyan-6","bg-cyan-8","bg-cyan-10","bg-pink-6","bg-pink-8","bg-pink-10","bg-orange-6","bg-orange-8","bg-orange-10","bg-yellow-6","bg-yellow-8","bg-yellow-10","bg-grey-6","bg-grey-8","bg-grey-10"],c=0,d=0;d<a.length;d++)c+=a[d].charCodeAt();var e=c%b.length;return b[e];
			}, 
			showPluginDescription = function(item){
				if(typeof item === "string"){
					item = pluginsArray.filter(e => e.id === item || e.name === item)[0];
				}
				//console.log(item)
				if(typeof item !== "object") return;
				let $icon = '', $action = '';
				if(item.source.className && item.source.className.length > 0) $icon = `<div class="content"><i class="${item.source.className}"></i></div>`
				else if(item.source.thumb && item.source.thumb.length > 0) $icon = `<img src="${item.source.thumb}" draggable="false" style="width:100%;height:100%" />`
				else if(item.source.icon && item.source.icon.length > 0) $icon = `<img src="../../../plugins/${item.name}/${item.source.icon}" draggable="false" style="padding-top: 10px;">`
				else if(item.icon) $icon = `<img src="../../../plugins/${item.name}/${item.icon}" draggable="false" style="padding-top: 10px;">`
				else $icon = `<div class="content"><i class="fa words bg--blue bg-blue-7 ${item.name || nameToClassName}">${item.name.substr(0,2)}</i></div>`
				
				let final_out = `<div class="plugin">
					<div class="header">
						<button class="btn btn--default" type="button" action="historyBack" onclick="showAllPlugins();"><i class=" fa-chevron-left pr-10"></i>Back</button>
						<div class="name">${item.name}</div>
					</div>
					<div class="left-content align-center data-app" data-app="${item.id}">
						<div class="icon">${$icon}</div>
						<div class="app-title">${item.title}</div>
						<div class="action btn-group">`;
						if(item.status == 1){
							if(item.server && kod.window.parseFloat(item.server.version) > kod.window.parseFloat(item.version))
								final_out += `<button class="btn btn--default" type="button"action='appUpdate'><span>Update the plugin</span></button>`;
							else if(item.appOpen) final_out += `<button class="btn btn--default" type="button" action='appOpen'><span>Turn on</span></button>`;
							else final_out += `<button class="btn btn--default" type="button" action='appConfig'><i class="fa fa-cog"></i><span>Configure</span></button>`;
						
							final_out += `<button class="btn btn--default dropdown-toggle" type="button" data-toggle="dropdown"><span class="caret"></span><span class="sr-only"></span></button>
							<ul class="dropdown-menu align-left" role="menu">`;
								if (item.server && kod.window.parseFloat(item.server.version) > kod.window.parseFloat(item.version)){
									final_out += `<li><a action="appUpdate" href="javascript:;"><i class="fa fa-cog"></i>Update the plugin</a></li>
									<li role="separator" class="divider"></li>`;
								}
								final_out += `<li><a action="appConfig" href="javascript:;"><i class="fa fa-cog"></i>Configure</a></li>
									<li><a action="appDisable" href="javascript:;"><i class="fa fa-ban-circle"></i>Disabled</a></li>
									<li><a action="appRemove" href="javascript:;"><i class="fa fa-trash"></i>Uninstall</a></li>
							</ul>`;
						} else if (item.status == 0){
								final_out += `<button class="btn btn-warning" type="button" action=\'appEnable\'><i class="fa fa-check"></i>Enable</button>
								<button class="btn btn--warning dropdown-toggle" type="button" data-toggle="dropdown"><span class="caret"></span><span class="sr-only"></span></button>
								<ul class="dropdown-menu align-left" role="menu">
									<li><a action="appEnable" href="javascript:;"><i class="fa fa-check"></i>Enable</a></li>
									<li><a action="appRemove" href="javascript:;"><i class="fa fa-trash"></i>Uninstall</a></li>
								</ul>`;
						} else{
							if(item.price > 'A' && kod.core.versionType == 'A')
								final_out += `<button class="btn btn--warning" type="button" action=\'appInstall\'><i class="fa fa-angle-right"></i><span>Purchase authorization</span></button>`;
							else
								final_out += `<button class="btn btn--success" type="button" action=\'appInstall\'><i class="fa fa-download-alt"></i>	<span>Install</span></button>
								<button class="btn btn--success dropdown-toggle" type="button" data-toggle="dropdown">	<span class="caret"></span><span class="sr-only"></span></button>
								<ul class="dropdown-menu" role="menu">
									<li><a action="installSelf" href="javascript:;"><i class="fa fa-download-alt"></i>Manual installation</a></li>
								</ul>`
						}
						final_out += `</div>
						<div class='progress hidden'><span class='total-size'></span><span class='download-speed'></span><div class='progress-bar'></div></div>
						<div class="align-left">
							<div class="line"></div>
							<div class="title">Status</div>`;
							if(item.status == 1){
								if(item.server && kod.window.parseFloat(item.server.version) > kod.window.parseFloat(item.version))
									final_out += `<div class="p green-9">There is an update(Ver ${item.server.version})</div>`;
								else
									final_out += `<div class="p green-6">Activated</div>`;
							} else if (item.status == 0)
								final_out += `<div class="p yellow-6">Not Enabled</div>`;
							else
								final_out += `<div class="p grey-6">Not Installed</div>`;
							
							if(item.author.copyright){
								final_out += `<div class="title">The author</div>
								<div class="p">${item.author.homePage ? `<a href="${item.author.homePage}" target="_blank">${item.author.copyright}</a>` : item.author.copyright}</div>`;
							}
							final_out += `<div class="title">Version</div>
							<div class="p">${item.version}</div>`;
							if(item.server){
								final_out += `<div class="title">Size</div>
								<div class="p">${item.server.size || pathTools.fileSize}</div>`;
							}
						final_out += `</div>
					</div>
					<div class="right-content">`;
						if(item.source && item.source.screenshot){
							final_out += `<div class="sliders">
								<div id="plugin-slider" class="carousel slide" data-ride="carousel" data-interval="40000">
									<ol class="carousel-indicators">
										${item.source.screenshot.map((picture, index) => `<li data-target="#plugin-slider" data-slide-to="${index}" class="${index == 0 ? 'active' : ''}"></li>`).join('')}
									</ol>
									<div class="carousel-inner" role="listbox">
										${item.source.screenshot.map((picture, index) => `<div class="item ${index == 0 ? 'active': ''}"><img src="${picture}" data-holder-rendered="true" /></div>`).join('')}
									</div>`;
									if(item.source.screenshot.length > 1){
										final_out += `<a class="left carousel-control" href="#plugin-slider" role="button" data-slide="prev"><span class="glyphicon fa-angle-left fa-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a>
										<a class="right carousel-control" href="#plugin-slider" role="button" data-slide="next"><span class="glyphicon fa-angle-right fa-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a>`;
									}
								final_out += `</div>
							</div>`;
						}
						final_out += `<div class="description">`;
							if(item.description) final_out += `<h4 class="title">Description :</h4><div class="text mb-30">${item.description}</div>`;
							if(item.configItem && item.configItem.fileExt) final_out += `<h4 class="title">{{LNG[\'Plugin.Config.fileExt\']}} :</h4><div class="text mb-20">${item.configItem.fileExt.value}</div>`;
						final_out += `</div>
					</div>
				</div>`;
				var b=$(".app-plugins .app-descript");
				$(".app-plugins .app-model").addClass("hidden");
				b.removeClass("hidden").empty().append(final_out);
				//return final_out;
			},
			showAllPlugins = function(){
				$(".app-plugins .app-model").removeClass("hidden");
				$(".app-plugins .app-descript").addClass("hidden");
			}, 
			buildPluginsList = function(){
				const $pluginsHost = 'http://localhost/www/_tests/KodExplorer/plugins/', 
				apps_str = pluginsArray.map(item => {
					let $icon = '', $action = '';
					if(item.source){
						if(item.source.className && item.source.className.length > 0) $icon = `<div class="content"><i class="${item.source.className}"></i></div>`
						else if(item.source.thumb && item.source.thumb.length > 0) $icon = `<img src="${item.source.thumb}" draggable="false" style="width:100%;height:100%" />`
						else if(item.source.icon && item.source.icon.length > 0) $icon = `<img src="${$pluginsHost}${item.name}/${item.source.icon}" draggable="false" style="padding-top: 10px;">`
					} else if(item.icon) $icon = `<img src="${item.icon}" draggable="false" style="padding-top: 10px;">`
					else $icon = `<div class="content"><i class="fa words bg--blue bg-blue-7 ${item.name || nameToClassName}">${item.name.substr(0,2)}</i></div>`
					
					if(item.status == 1){
						if(item.appOpen) $action += '<button class="btn btn-sm btn--default" type="button" action="appOpen"><span>Turn on</span></button>'
						else $action += '<button class="btn btn-sm btn--default" type="button" action="appConfig"><i class="fa fa-cog"></i><span>Configure</span></button>';
						$action += `<button class="btn btn-sm btn--default dropdown-toggle" type="button" data-toggle-target="#${item.name}-dropdown-menu" data-toggle-class="toggled" data-toggle-button><span class="caret"></span><span class="sr-only"></span></button>
						<ul id="${item.name}-dropdown-menu" class="dropdown-menu" role="menu">
							${item.server && kod.window.parseFloat(item.server.version) > kod.window.parseFloat(item.version) ? 
								`<li><a action="appUpdate" href="javascript:;"><i class="fa fa-cog"></i>Update the plugin</a></li>
								<li role="separator" class="divider"></li>` : ''
							}
							<li><a action="appConfig" href="javascript:;"><i class="fa fa-cog"></i>Configure</a></li>
							<li><a action="appDisable" href="javascript:;"><i class="fa fa-ban-circle"></i>Disabled</a></li>
							<li><a action="appRemove" href="javascript:;"><i class="fa fa-trash"></i>Uninstall</a></li>
						</ul>`;
					} else if (item.status == 0){
						$action += `<button class="btn btn-sm btn--warning" type="button" action='appEnable'><i class="fa fa-check"></i>Enable</button>
						<button class="btn btn-sm btn--warning dropdown-toggle" type="button" data-toggle-target="#${item.name}-dropdown-menu" data-toggle-class="toggled" data-toggle-button><span class="caret"></span><span class="sr-only"></span></button>
						<ul id="${item.name}-dropdown-menu" class="dropdown-menu" role="menu">
							<li><a action="appEnable" href="javascript:;"><i class="fa fa-check"></i>Enable</a></li>
							<li><a action="appRemove" href="javascript:;"><i class="fa fa-trash"></i>Uninstall</a></li>
						</ul>`;
					}/*  else {
						if(item.price > 'A' && kod.core.versionType == 'A')
							$action += `<button class="btn btn-sm btn--warning" type="button" action='appInstall'><i class="fa fa-angle-right"></i><span>Purchase authorization</span></button>`;
						else{
							$action += `<button class="btn btn-sm btn--success" type="button" action='appInstall'>\<i class="fa fa-download-alt"></i><span>Install</span></button>
							<button class="btn btn-sm btn--success dropdown-toggle" type="button" data-toggle="dropdown"><span class="caret"></span><span class="sr-only"></span></button>
							<ul class="dropdown-menu" role="menu">
								<li><a action="installSelf" href="javascript:;"><i class="fa fa-download-alt"></i>Manual installation</a></li>
							</ul>`
						}
					} */
					let final_out = `<li class="app-li ripple-item data-app" title="${item.title}" action="appDescription" data-app="${item.id}" data-app-name="${item.name}" data-app-category="${item.category}" data-app-installed="${item.status}" onclick="if(!window.event.target.classList.contains('btn')) showPluginDescription('${item.name}');">
						${item.status == 1 ?
							`${item.server && kod.window.parseFloat(item.server.version) > kod.window.parseFloat(item.version) ? 
								`<div class="flag-box"><div class="flag bg--yellow bg-yellow-6">There is an update</div></div>` 
								: `<div class="flag-box"><div class="flag bg--green bg-green-7">Activated</div></div>`}`
							: ''
						}
						<span class="price-label label label-success">FREE</span>
						<div class="app-icon">
							${$icon}
						</div>
						<div class="text">
							<div class="name">${item.name}</div>
							<div class="copyright">${item?.author?.copyright||''}</div>
						</div>
						<div class="action btn-group" data-akd-dropdown>
							${$action}
						</div>
						<div class='progress hidden'><span class='total-size'></span><span class='download-speed'></span><div class='progress-bar'></div></div>
					</li>`;
					return final_out;
				}).join('');
				//console.log(apps_str);
				$(".app-list").append(apps_str);
			}, 
			filterPlugins = function(e, pr){
				//const filterItems = _.throttle((e, id, odt, prop, parent) => {
				let val = typeof(e) === "string" ? e : e.value ?? e.textContent,
					__items = Array.from(document.querySelectorAll('.app-li')),
					odt = "block", prop = pr || "appCategory", 
					$i = 0;
				//console.log(__items)
				if(Array.isArray(__items) && __items.length > 0) {
					// Respond to any input change, and show first few matches
					if (val && val !== "") {
						__items.forEach((_item) => {
							_item.style.display = "none";
							let _prop = _item[prop] ?? _item.dataset[prop] ?? _item.dataset.name ?? _item.dataset.title ?? _item.title ?? "";
							if ((_prop && _prop.indexOf(val) !== -1) || _item.textContent.toLowerCase().indexOf(val) !== -1) {
								_item.style.display = odt || "inline-flex";
								$i++;
							}
						});
					} else {
						__items.forEach((_item) => { _item.style.display = odt || "inline-flex"; });
					}
				}
			}

			buildPluginsList();
			/* if($){} */
			$('ul.setting > a[data-type]').click(function(e){
				filterPlugins(e.target.dataset.key || e.target.dataset.type, e.target.dataset.prop)
				//filterPlugins(this.dataset.key || this.dataset.type, this.dataset.prop)
				//console.log(this,e)
			});
			$('.store-search-bar > .search-close-button ').click(function(e){
				$('.store-search-bar > input[type="text"]')[0].value = "";
				$(this).removeClass('is-visible');
				filterPlugins('all');
			})
			$('.store-search-bar > input[type="text"]').keyup(function(e){
				filterPlugins(this.value||e.target.value, 'appName')
			})
		}
	}, 
	{
		id:'postman-app', name: 'postman', icon: `${IMAGES_URL}icons/pages.png`, type: '', category:'internet', ajaxTarget: '#postman-app-ajax-window', ajaxTargetType: 'id', 
		//attrs:'class="window window-solid window--purple" data-name="experiments" data-title="experiments window" data-wallpaper=""',
		attrs:'class="window window-solid postman"', 
		sidebar_content: ``,
		footer_content: ``,
		body_content: ``, 
		template: `<aside class="window__side side--grid-auto">
			<div class="py--4 px--8">
				<span class="flex flex--center inherit--radius bg--white px--8 bdr--x2">
					<span><i class="fa fa-search"></i></span>
					<input id="postman-filter-input" class="postman-filter-input w--12 no--border" type="search" name="postman-filter-input" placeholder="Filter" data-dextop-input />
				</span>
			</div>
			<div class="dd">
				<div id="sidebar-tabs" class="tabs-wrapper h--12" data-sidebar-tabs>
					<ul class="tabs-nav" role="tablist">
						<li class="tab-nav-item flex-item-even text--truncate text--sm" role="presentation"><button id="postman-history-tab" class="nav-item-link active w--12" type="button" data-target="#tab-postman-history" role="tab" aria-controls="tab-postman-history" aria-selected="true">History <i class="fa fa-"></i></button></li>
						<li class="tab-nav-item flex-item-even text--truncate text--sm" role="presentation"><button id="postman-collections-tab" class="nav-item-link w--12" type="button" data-target="#tab-postman-collections" role="tab" aria-controls="tab-postman-collections" aria-selected="false">Collections <i class="fa fa-"></i></button></li>
					</ul>
					<div class="tabs-container active">
						<div id="tab-postman-history" class="tab-pane fade show active flex-important flex--col gap--4" role="tabpanel" aria-labelledby="postman-history-tab">
						</div>
						<div id="tab-postman-collections" class="tab-pane fade" role="tabpanel" aria-labelledby="postman-collections-tab">
							<span class="flex flex-place-center flex--col">
								<img class="w--3" src="${IMAGES_URL}icons/pptv.jpg" />
								<p class="text--900">You don't have any collections</p>
								<p class="text--sm">Collections let you group related requests, making them easier to access and run.</p>
								<button class="text--danger"><i class="fa fa-plus mr--1"></i> Create Collection</button>
							</span>
						</div>
					</div>
				</div>
			</div>
			<nav class="window__side-nav bottom">
				<ul>
					<li>
						<a class="${AJAX_CLASS} refresh" href="#" data-ajax-target="#" data-ajax-target-type="id">
							<span class="link-icon"><i class="fa fa-redo"></i></span>
							<span class="link-title">refresh</span>
						</a>
					</li>
				</ul>
			</nav>
		</aside>
		<section id="" class="window__body-inner grid-s-" data-layout="grid-auto" data-layout-rows="auto-1fr">
			<div class="flex flex--row gap--8">
				<span class="p--4 mr--auto"></span>
				<span class="p--4 mx--auto">
					<i class="fa-th-la fa fa-th-large mr--2"></i>
					<span>My Workspace</span>
				</span>
				<span class="p--4 ml--auto"></span>
			</div>
			<div class="flex flex--row break-at-600 bd--t bdc--default">
				<div class="request" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="4" data-request-container>
					<h2 class="flex flex--center p--4 no--margin">
						Request
						<button class="akd__btn btn--inherit ml--auto py--2 px--6" onclick="let $target = $.one('[data-response-container]'), $i = $.one('i.fa', this);$target.classList.toggle('hidden');this.classList.toggle('is-active');if($target.classList.contains('hidden')){$i.classList.replace('fa-plus', 'fa-minus');} else {$i.classList.replace('fa-minus', 'fa-plus');}"><i class="fa fa-plus"></i></button>
					</h2>
					<form class="flex-important flex--col gap--4 bd--t bdc--default pt--8" action="" data-form>
						<div class="input-group mx--8 mb--0">
							<select id="postman-method" class="form-select" name="postman-method" title="select a request method" data-postman-method>
								<option value="GET" selected>GET</option>
								<option value="POST">POST</option>
								<option value="PUT">PUT</option>
								<option value="PATCH">PATCH</option>
								<option value="DELETE">DELETE</option>
							</select>
							<input id="postman-url" class="form-control" name="postman-url" type="url" placeholder="http://localhost.com" list="postman-default-urls-list" onfocus="this.select();" data-postman-url required />
							<datalist id="postman-default-urls-list">
								<option value="http://localhost/www/">localhost/www</option>
								<option value="http://localhost/www/sites/">localhost/www/sites</option>
								<option value="http://localhost/www/_tests/">localhost/www/_tests</option>
								<option value="${BASE_URL}">home</option>
								<option value="${BASE_URL}app/includes/loader.php">loader</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=articles&ajax_target=loader-main-view">articles</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=snippets&ajax_target=loader-main-view">snippets</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=pages&ajax_target=loader-main-view">pages</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=users&ajax_target=loader-main-view">users</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=frameworks&ajax_target=loader-main-view">frameworks</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=browser&action=browse&format=string&ajax_target=loader-main-view">browser</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=media&ajax_target=loader-main-view">media</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=ext-snippets&ajax_target=loader-main-view">ext-snippets</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=api&ajax_target=loader-main-view">api</option>
								<option value="${BASE_URL}app/includes/loader.php?mode=images&ajax_target=loader-main-view">images</option>
							</datalist>
							<button id="postman-submit-btn" class="" type="submit" data-postman-submit-btn>send</button>
							<select id="postman-datatype" class="form-select" name="postman-datatype" title="select request data type" style="text-transform: lowercase;" data-postman-datatype>
								<option value="text" selected="">text</option>
								<option value="html">html</option>
								<option value="json">json</option>
								<option value="xml">xml</option>
								<option value="binary">binary</option>
							</select>
						</div>
						
						<div id="request-tabs" class="tabs-wrapper h--12" data-request-tabs>
							<ul class="tabs-nav mx--8 mb--4" role="tablist">
								<li class="tab-nav-item text--truncate text--sm" role="presentation"><button type="button" class="nav-item-link active" id="query-params-tab" data-target="#tab-query-params" role="tab" aria-controls="tab-query-params" aria-selected="true">Params <i class="fa fa-"></i></button></li>
								<li class="tab-nav-item text--truncate text--sm" role="presentation"><button type="button" class="nav-item-link" id="headers-tab" data-target="#tab-request-headers" role="tab" aria-controls="tab-headers" aria-selected="false">Headers <i class="fa fa-"></i></button></li>
								<li class="tab-nav-item text--truncate text--sm" role="presentation"><button type="button" class="nav-item-link" id="request-body-tab" data-target="#tab-request-body" role="tab" aria-controls="tab-request-body" aria-selected="false">Body <i class="fab fa-json"></i></button></li>
								<li class="tab-nav-item offset-left-auto" role="button"><button type="button" class="" id="request-tabs-toggle" data-target="#request-tabs .tabs-container" role="tab" aria-controls="request-tabs" aria-selected="false"><i class="fa fa-chevron-down"></i></button></li>
							</ul>
							<div class="tabs-container active">
								<div id="tab-query-params" class="tab-pane fade show active" role="tabpanel" aria-labelledby="query-params-tab">
									<div data-query-params></div>
									<button data-add-query-param-btn type="button" class="button success">add</button>
								</div>
								<div id="tab-request-headers" class="tab-pane fade" role="tabpanel" aria-labelledby="headers-tab">
									<div data-request-headers></div>
									<button data-add-request-headers-btn type="button" class="button success">add</button>
								</div>
								<div id="tab-request-body" class="akd__tabs grid-important tab-pane fade" role="tabpanel" aria-labelledby="request-body-tab" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0">
									<div class="akd__tab-buttons w--fit flex--wrap px--5 px--8 bg:opaque">
										<button class="akd__tab-button text--tn active--tab" type="button" data-parent-tab="#tab-request-body" data-target-tab="[data-json-request-body]" data-akd-tab-button>JSON <i class="fab fa-json"></i></button>
										<button class="akd__tab-button text--tn" data-parent-tab="#tab-request-body" type="button" data-target-tab="[data-xml-request-body]" data-akd-tab-button>XML</button>
										<button class="akd__tab-button text--tn" data-parent-tab="#tab-request-body" type="button" data-target-tab="[data-text-request-body]" data-akd-tab-button>Text</button>
										<button class="akd__tab-button text--tn" data-parent-tab="#tab-request-body" type="button" data-target-tab="[data-form-request-body]" data-akd-tab-button>Form</button>
										<button class="akd__tab-button text--tn" data-parent-tab="#tab-request-body" type="button" data-target-tab="[data-form-encode-request-body]" data-akd-tab-button>Form-encode</button>
										<button class="akd__tab-button text--tn" data-parent-tab="#tab-request-body" type="button" data-target-tab="[data-graphql-request-body]" data-akd-tab-button>Graphql</button>
										<button class="akd__tab-button text--tn" data-parent-tab="#tab-request-body" type="button" data-target-tab="[data-binary-request-body]" data-akd-tab-button>Binary</button>
										<span class="pos--abs right--0 flex gap--2 p--1 text--xs">
											<button class="akd__btn btn--purple bdr--50 px--5" type="button" title="prettify content" data-postman-button data-postman-prettify-button><i class="fa fa-magic"></i></button>
											<button class="akd__btn btn--purple bdr--50 px--5" type="button" title="minify content" data-postman-button data-postman-minify-button><i class="fa fa-compress-arrows-alt"></i></button>
										</span>
									</div>
									<div class="akd__tab-panels" style="width:100%;height:100%;/*! max-height: 200px;*/" data-request-body>
										<div class="akd__tab-panel active--tab overflow-auto" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0" data-request-format="json" data-json-request-body>
											<span class="w--12">JSON Content</span>
											<textarea id="" class="request-body-textarea w--12 h--12 text--df no--resize ui-pattern-1 text--white" placeholder='{\"name\":\"Andre\",\"occupation\":\"Programmer\"}' data-request-body-textarea></textarea>
										</div>
										<div class="akd__tab-panel overflow-auto" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0" data-request-format="xml" data-xml-request-body>
											<span class="w--12">XML Content</span>
											<textarea id="" class="request-body-textarea w--12 h--12 text--df no--resize ui-pattern-1 text--white" name="" placeholder='<idCard><name>Andre</name><occupation>Programmer</occupation></idCard>' data-request-body-textarea></textarea>
										</div>
										<div class="akd__tab-panel overflow-auto" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0" data-request-format="text" data-text-request-body>
											<span class="w--12">Text Content</span>
											<textarea id="" class="request-body-textarea w--12 h--12 text--df no--resize ui-pattern-1 text--white" name="" placeholder='<idCard><name>Andre</name><occupation>Programmer</occupation></idCard>' data-request-body-textarea></textarea>
										</div>
										<div class="akd__tab-panel overflow-auto" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0" data-request-format="form" data-form-request-body>
											<span class="w--12">Form Content</span>
											<div class="overflow--auto" data-request-body-form>
											</div>
											<span class="sticky-bottom flex-place-center flex--wrap gap--4 bg--gray p--4">
												<button class="akd__btn btn--success" type="button" title="add text input" data-input-type="text" data-add-form-input-btn><i class="fa fa-text-height mr--2"></i><span class="resized--hidden">text</span></button>
												<button class="akd__btn btn--success" type="button" title="add number input" data-input-type="number" data-add-form-input-btn><i class="fa fa-not-equal mr--2"></i><span class="resized--hidden">number</span></button>
												<button class="akd__btn btn--success" type="button" title="add file input" data-input-type="file" data-add-form-input-btn><i class="fa fa-file mr--2"></i><span class="resized--hidden">file</span></button>
												<button class="akd__btn btn--success" type="button" title="add textarea input" data-input-type="textarea" data-add-form-input-btn><i class="fa fa-text-width mr--2"></i><span class="resized--hidden">textarea</span></button>
											</span>
										</div>
										<div class="akd__tab-panel overflow-auto" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0" data-form-encode-request-body>
											<span class="w--12">Form-Encode Content</span>
											<textarea id="" class="request-body-textarea w--12 h--12 text--df no--resize ui-pattern-1 text--white" placeholder='{\"name\":\"Andre\",\"occupation\":\"Programmer\"}' data-request-body-textarea></textarea>
										</div>
										<div class="akd__tab-panel overflow-auto" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0" data-graphql-request-body>
											<span class="w--12">Graphql Content</span>
											<textarea id="" class="request-body-textarea w--12 h--12 text--df no--resize ui-pattern-1 text--white" placeholder='{\"name\":\"Andre\",\"occupation\":\"Programmer\"}' data-request-body-textarea></textarea>
										</div>
										<div class="akd__tab-panel overflow-auto" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0" data-binary-request-body>
											<span class="w--12">Binary Content</span>
											<div class="" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0">
												<input class="akd__input-file w--12" type="file" data-dextop-input />
												<div id="binary-content-preview" class="w--12 h--12 ui-pattern-1">
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>

				<div class="response hidden" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="4" data-response-container>
					<h2 class="flex flex--center p--4 no--margin">
						Response
						<button class="akd__btn btn--inherit ml--auto py--2 px--6" onclick="let $target = $.one('[data-request-container]'), $i = $.one('i.fa', this);$target.classList.toggle('hidden');this.classList.toggle('is-active');if($target.classList.contains('hidden')){$i.classList.replace('fa-plus', 'fa-minus');} else {$i.classList.replace('fa-minus', 'fa-plus');}"><i class="fa fa-plus"></i></button>
					</h2>
					<div class="pt--8 bd--t bdc--default" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="4">
						<div class="response__details flex flex--center mx--8 mb--0">
							<div class="text--900">Status: <span data-status>???</span></div>
							<div class="text--900">Time: <span class="text--info" data-time>0</span>ms</div>
							<div class="text--900">Size: <span class="text--purple" data-size>0B</span></div>
							<button class="download-button akd__btn btn--purple flex flex--center py--2 ml--auto text--sm" data-download-target="#response-editor-raw" data-dextop-button><i class="fa fa-download mr--2"></i><em class="resized--hidden">Download</em></button>
						</div>
						<div id="response-tabs" class="tabs-wrapper" data-response-tabs>
							<ul class="tabs-nav wrap mx--8 mb--4" role="tablist">
								<li class="tab-nav-item text--truncate text--sm" role="presentation"><button type="button" class="nav-item-link active" id="body-tab" data-target="#tab-body" role="tab" aria-controls="tab-body" aria-selected="true">Body <i class="fa fa-"></i></button></li>
								<li class="tab-nav-item text--truncate text--sm" role="presentation"><button type="button" class="nav-item-link" id="response-headers-tab" data-target="#tab-response-headers" role="tab" aria-controls="tab-response-headers" aria-selected="false">Headers <i class="fa fa-"></i></button></li>
								<li class="tab-nav-item text--truncate text--sm" role="presentation"><button type="button" class="nav-item-link" id="response-json-tab" data-target="#tab-response-json" role="tab" aria-controls="tab-response-json" aria-selected="false">JSON <i class="fab fa-node"></i></button></li>
								<li class="tab-nav-item ml--auto mr--1" role="">${$theme_select}</li>
								<li class="tab-nav-item" role="">
									<select id="editor-skin-select" class="">
										<option value="">default</option>
										<option value="dark-turmoil">dark-turmoil</option>
										<option value="soft-pink">soft-pink</option>
									</select>
								</li>
							</ul>
							<div class="tabs-container active">
								<div id="tab-body" class="akd__tabs tab-pane fade show active grid-important" role="tabpanel" aria-labelledby="body-tab" data-layout="grid-auto" data-layout-rows="auto-1fr" data-layout-gap="0">
									<div class="akd__tab-buttons w--fit flex--wrap px--5 px--8 bg:opaque">
										<button class="akd__tab-button text--tn active--tab" type="button" data-parent-tab="#tab-body" data-target-tab="#response-editor" data-akd-tab-button="">Pretty</button>
										<button class="akd__tab-button text--tn" data-parent-tab="#tab-body" type="button" data-akd-tab-button="" data-target-tab="#response-editor-raw">Raw</button>
										<button class="akd__tab-button text--tn" data-parent-tab="#tab-body" type="button" data-target-tab="#response-editor-previewer" data-akd-tab-button="">Preview</button>
									</div>
									<div class="akd__tab-panels" style="width:100%;height:100%;/*! max-height: 200px;*/" data-response-body></div>
								</div>
								<div id="tab-response-headers" class="tab-pane fade" role="tabpanel" aria-labelledby="response-headers-tab">
									<div data-response-headers></div>
								</div>
								<div id="tab-response-json" class="tab-pane fade" role="tabpanel" aria-labelledby="response-json-tab">
									<div data-json-response-body ></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--<template data-key-value-template>
					<div class="input-group" data-key-value-pair>
						<input type="text" class="form-control" placeholder="key" data-key>
						<input type="text" class="form-control" placeholder="value" data-value>
						<button class="button button-outline-danger" type="button" data-remove-btn>Remove</button>
					</div>
				</template>-->
				<template data-key-value-template>
					<div class="input-group w--12 flex flex--nowrap gap--2 mb--8" data-key-value-pair>
						<input type="text" class="w--s-6 p--3 m--0 bdr--0-tr bdr--0-br" placeholder="key" data-key>
						<input type="text" class="w--s-6 p--3 m--0 bdr--0-tl bdr--0-bl" placeholder="value" data-value>
						<button class="akd__btn btn--danger button-outline-danger --outline ml--4" title="remove this parameter" type="button" data-remove-btn>
							<span class="mobile--hidden text--xs mr--1">Remove</span>
							<i class="fak fak-times fa fa-times"></i>
						</button>
					</div>
				</template>
				
				<template data-headers-key-value-template>
					<div class="input-group w--12 flex flex--nowrap gap--2 mb--8" data-key-value-pair>
						<span class="w--s-4 p--3 m--0 bdr--0-tr bdr--0-br" onclick="this.nextElementSibling.focus()" data-key></span>
						<input type="text" class="w--s-8 p--3 m--0 bdr--0-tl bdr--0-bl" placeholder="value" readonly data-value />
					</div>
				</template>
			</div>
		</section>`, 
		components: [],
		config: {
			shortcut: {add_to_dextop: true, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'70%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'left'}
		}, 
		wallpaper: {},
		//installationStatus: 'install',
		callbacks: ($) => {
			if($){
				const form = document.querySelector('[data-form]')
				const queryParamsContainer = document.querySelector('[data-query-params]')
				const requestHeadersContainer = document.querySelector('[data-request-headers]')
				const requestBodyFormContainer = document.querySelector('[data-request-body-form]')
				//const {requestEditor, updateResponseEditor} = setupEditors()
				const  registeredThemes = ["default","dark","light"];

				queryParamsContainer.append(createKeyValuePair())
				requestHeadersContainer.append(createKeyValuePair())
				$('[data-add-query-param-btn]').on('click',e=>{
					queryParamsContainer.append(createKeyValuePair())
				})

				$('[data-add-request-headers-btn]').on('click',e=>{
					requestHeadersContainer.append(createKeyValuePair())
				})

				$('[data-add-form-input-btn]').on('click',e=>{
					let type = e.target.dataset.inputType || "text";
					requestBodyFormContainer.append(createFormKeyValuePair(type))
				//console.log(keyValuePairsToObject(requestBodyFormContainer))
				})

				$.ajax.intertceptors.request.use(request=>{
					request.customData = request.customData || {}
					request.customData.startTime = new Date().getTime()
					return request
				})
				$.ajax.intertceptors.response.use(updateEndTime, e=>{
					return Promise.reject(updateEndTime(e.response))
				})
				/* ------------------------------------------------------- */
				//$clog(location,$bytes().parse('100kb'))
				//form.addEventListener('submit',e=>{
				$('[data-postman-submit-btn]').on('click',e =>{
					e.preventDefault()
					let data;
					try{
						data = JSON.parse(responseEditor.state.doc.toString() || null)
					} catch(e){
						console.log('JSON data is malformed')
						//return
					}
					data = keyValuePairsToObject(queryParamsContainer);

					let uri = document.querySelector('[data-postman-url]').value, 
					method = document.querySelector('[data-postman-method]').value, 
					dataType = document.querySelector('[data-postman-datatype]').value, 
					baseAuthentication = btoa('amalkong:pussy1234567');

					const auth = `Basic ${baseAuthentication}`;
					const activeRequestBody = $.one('[data-request-body] .akd__tab-panel.active--tab');
					const activeRequestBodyTextarea = $.one('[data-request-body-textarea]', activeRequestBody);
					//const activeRequestBodyTextarea = $.one('[data-request-body] .akd__tab-panel.active--tab [data-request-body-textarea]');
					let formatted = '', inputVal = activeRequestBodyTextarea.value, operation = $.one('[data-request-body] .akd__tab-panel.active--tab').dataset.requestFormat??'json';
					if(activeRequestBody && activeRequestBody.hasAttribute("data-form-request-body")){
						data = keyValuePairsToObject(requestBodyFormContainer);
					} else if(inputVal && inputVal.length > 0){
						data = inputVal;
					}
					/* let h = new Headers()
					//h.append('Accept','application/json')
					//h.append('Authorization', 'Basic username:password')
					h.append('Authorization', auth)
					let req = new Request(uri, {
						method: "GET",
						headers: h,
						mode: "cors", // optional
						//credentials: "include" //['include','same-origin']// when authenticating
					}) */
					//console.log(document.querySelector('[data-method]').value, keyValuePairsToObject(queryParamsContainer))
					console.log(data);
					$.ajax({
						url: uri, 
						method, 
						dataType, 
						//data: keyValuePairsToObject(queryParamsContainer),
						data, 
						headers: keyValuePairsToObject(requestHeadersContainer), 
						sendFullResponse: true
					})
					.done((res, req) => {
						document.querySelector('[data-response-container]').classList.remove('hidden')
						//document.querySelector('[data-postman-url]').value = res.uri
						//console.log(res.responseHeaders)
						let //dataType = fileext(file.name),
						language = dataType == 'js' ? 'javascript' : dataType,
						filetype = res.mimetype;
						if(filetype === "" || filetype === undefined){
							filetype = ($.ext_mimeTypes[dataType]) ? $.ext_mimeTypes[dataType] : "application/octet-stream";
						}
						let cfg = {mode: filetype};
						updateResponseEditor(res.data, 'textarea', language, cfg);
						updateResponseJson(res, req);
						updateResponseHeaders(res.responseHeaders, res.uri);
						updateResponseDetails(res);
					})
					.fail(e => console.error('fail',e))
					//.always(() => console.log('always'))
				});

				$("[data-postman-button]").on("click", (e) => {
					e.preventDefault();
					let $this = $.isElement(this) ? this : e.target;
					if($this.hasAttribute("data-postman-minify-button") || $this.hasAttribute("data-postman-prettify-button")){
						const inputArea = $.one('[data-request-body] .akd__tab-panel.active--tab [data-request-body-textarea]');
						let formatted = '', inputVal = inputArea.value, operation = $.one('[data-request-body] .akd__tab-panel.active--tab').dataset.requestFormat??'json', 
						cp = 4, preservecomm = true;
						
						if($this.hasAttribute("data-postman-prettify-button")){
							formatted = AKD_Formatter.beautify_text(inputVal, operation, {}, cp);
						} else if($this.hasAttribute("data-postman-minify-button")){
							formatted = AKD_Formatter.minify_text(inputVal, operation, preservecomm);
						}
						inputArea.value = formatted;
					} 
				});

				$('.nav-item-link').on("click",e=>{
					//let parent = e.target.parentElement.parentElement.parentElement||null
					let parent = e.target.closest(".tabs-wrapper")
					//log(parent) 
					$('.nav-item-link, .tab-pane, .tab-nav-item',parent).removeClass('active')
					$(e.target).addClass('active')
					$(e.target.parentElement).addClass('active')
					$(e.target.dataset.target).addClass('active')
				});
				
				$('#request-tabs-toggle').on("click",e=>{
					$(e.target.dataset.target).toggleClass("active")
				});
			}
		}
		//cell_id: 7
	}, 
	/* {
		id:'-app', name: '', icon:`${IMAGES_URL}icons/.png`, type: '', category:'', ajaxTarget: '#-app-ajax-window', ajaxTargetType: 'id',
		attrs:'', 
		sidebar_content: ``,
		footer_content: ``,
		body_content: ``, 
		template: ``, 
		components: [],
		 config: {
			shortcut: {add_to_dextop: false, display_title: true, icon_size: 'default', expand_on_click: true}, 
			'window': {dimensions:'[\'50%\',\'50%\']', wallpaper_opacity: 1, sidebar_placement:'right'}
		}, 
		wallpaper: {}
	},  */
];
const DATABASE_OBJ = {
	Users:{},
	Posts:{},
	Messages:{},
	Conversations:{},
	Site:{articles:[],snippets:[],pages:[]},
	Media:{audio:[],video:[],podcast:[]}
}, _dataArr = fetchFile(DATA_URL+"json/database.json", 'json');

Promise.resolve(_dataArr).then(data=>{
//_dataArr.then(data=>{
	Object.assign(DATABASE_OBJ, data);
	/* window['DATABASE_OBJ'] = DATABASE_OBJ; */
});
window['DATABASE_OBJ'] = DATABASE_OBJ;
window['windowsArray'] = windowsArray;
window['appsArray'] = appsArray;
window['pluginsArray'] = pluginsArray;
window['appsWindowsCategoryArray'] = appsWindowsCategoryArray;

export {
	windowsArray, appsArray, pluginsArray, appsWindowsCategoryArray, DATABASE_OBJ
}