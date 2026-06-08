//array('path_or_content'=>'tools/htmlbeautifier.min.js','type'=>'site'),
//console.log(navigator.userAgentData,' old - ',navigator.userAgent,navigator.platform);

const $_validExts = {
	text   : ["js","jsx","json","jsp","log","md","php","rem","sol","ts","tsx","txt"],
	script : ["c","h","js","jsx","jsp","rb","php","pl","py","ts","tsx","yml"],
	image  : ["jpg","jpeg","png","gif","jfif","avif"],
	audio  : ["mp3","ogg","aac","m4a","webma"],
	video  : ["mp4","ogv","avi","m4v","mkv","webm"],
	other  : ["gitignore"]
}, 
$_accept = {
	audio  : ["audio/aac", "audio/mp3", "audio/mpeg", "audio/ogg", "audio/oga", "audio/m4a"],
	video  : ["video/mp4", "video/mpeg", "video/webm", "video/ogv", "video/m4v"],
	text   : ["text/plain", "text/html", "text/css", "text/javascript", "text/php", "text/python", "text/json", "text/xml"],
	image  : ["image/svg+xml","image/png", "image/jpeg", "image/gif", "image/webp", "image/jfif", "image/avif", "image/svg+xml"],
	script : ["application/x-javascript", "application/json", "application/x-php", "application/x-python", "application/xml"],
	other  : ["image/svg+xml"]
}, 
$r_imFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i, 
$_mimeTypes = {
	'md'  :'text/plain',
	'log' :'text/plain',
	'txt' :'text/plain',
	'rb' :'text/plain',
	'gitignore' :'text/plain',
	'LICENSE' :'text/plain',
	'json':'application/json',
	'php' :'application/x-php',
	'py' :'application/x-python',
	'js'  :'application/x-javascript'
};
$placeholder = `// Example obfuscated code\nconst _0x38a2db = [\'\\x54\\x6f\\x74a\\x6c\', \'\\x6c\\x6f\\x67\', \'\\x3a\\x20\'];\nconst _0x9b58d9 = function(_0x39ddb7) {\n\treturn _0x38a2db[_0x39ddb7 + (-0x6d5 + 0x58 + 0x11 * 0x62)];\n}, _0x498b9b = function(_0x48d808, _0x14da1e) {\n    return _0x9b58d9(_0x48d808);\n}, _0x34c7bc = function(_0x16af1d, _0x27a29e) {\n    return _0x498b9b(_0x16af1d);\n}\nlet total = 0x2 * 0x109e + -0xc * -0x16a + -0x3234;\nfor (let i = 0x1196 + 0x97b * 0x3 + -0x2e07; i < -0x95 * -0x38 + -0x1a75 + -0x619; i++) {\n\ttotal += i;\n}\nconsole[_0x34c7bc(-(0x1e7c + -0x1 * -0x1367 + 0x2ef * -0x11))](_0x498b9b(-(0x1020 + 0x253 + 0x7 * -0x2a2)) + _0x34c7bc(-(0x12c5 + -0x1887 + -0x1 * -0x5c5)) + total);`, 
$codemirror_themes = [
	"default","3024-day","3024-night",
	"abbott","abcdef","ambiance","ayu-dark","ayu-mirage","base16-dark","base16-light","bespin","blackboard",
	"cobalt","colorforth","darcula","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark",
	"hopscotch","icecoder","idea","isotope","juejin","lesser-dark","liquibyte","lucario",
	"material","material-darker","material-palenight","material-ocean",
	"mbo","mdn-like","midnight","monokai","moxer","neat","neo","night","nord","oceanic-next",
	"panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue",
	"seti","shadowfox","solarized dark","solarized light",
	"the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight",
	"vibrant-ink","xq-dark","xq-light","yeti","yonce","zenburn"
];
	
const escapeHTML = (str) => {return isString(str) ? str.replace(/[&<>'"]/g, function (tag) {return {'&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#39;','"': '&quot;'}[tag] || tag;}) : str;}
const unescapeHtml = (str) => {return isString(str) ? str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, function (tag) {return {'&amp;': '&','&lt;': '<','&gt;': '>','&#39;': "'",'&quot;': '"'}[tag] || tag;}) : str;}

const isBlob = (obj) => window.Blob && obj instanceof Blob;
const isFileList = (obj) => window.FileList && obj instanceof FileList;
const createUniqueName = str => isString(str) ? str.replace('./', '').replace(/["&'./:=?[\]]/gi, '-').replace(/(_)/gi, '-').replace(/(--)/gi, '') : str;

function changeBackgroundColor(ID,log){var contentBody = $one(ID);if(!isElement(contentBody)){return false;}var colorInfo = $one("#colorInfo"), textcolor = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6);var bgcolor = "#" + (Math.random() * 0xFFFFFF + 0x1000000).toString(16).substr(1,6);contentBody.style.backgroundColor = bgcolor;contentBody.style.color = textcolor;if(isElement(colorInfo)){colorInfo.innerHTML = "<p><strong>Changed background color to [[" + bgcolor + "]],and color to [[" + textcolor + "]]</strong>.</p>";}if(log == true) {console.log("Changed background color to " + bgcolor + " and text font color to " + textcolor);}}
function toggle_OL(ID){if(document.getElementsByTagName("ol")[0].style.listStyle.substr(0,4)=="none"){document.getElementsByTagName("ol")[0].style.listStyle="decimal-leading-zero inside";}else{document.getElementsByTagName("ol")[0].style.listStyle="none";}}
function toggle_line_number(tag,tagClass){var lineNum = document.getElementsByTagName(tag);for (var x=0; x<lineNum.length; x++) {if (lineNum[x].length!=0) {if(lineNum[x].className.match(tagClass)){if(lineNum[x].style.display.substr(0,4)=="none"){lineNum[x].style.display="table-row";lineNum[x].style.border="1px solid #ccc";lineNum[x].style.maxWidth="200px";lineNum[x].style.transition="all 600ms linear";}else{lineNum[x].style.border="none";lineNum[x].style.display="none";lineNum[x].style.transition="all 600ms linear";}}}}}
function selectText(e){if(document.selection){var tr = document.body.createTextRange();tr.moveToElementText($one(e));tr.select()} else if(window.getSelection){var tr=document.createRange();tr.selectNode($one(e));window.getSelection().addRange(tr)}}
function selectCode(a){var e = /* a.parentNode.getElementsByTagName('PRE')[0] ||  */$one(a);if (window.getSelection){var s = window.getSelection();if (s.setBaseAndExtent){s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);} else {var r = document.createRange();r.selectNodeContents(e);s.removeAllRanges();s.addRange(r);}} else if (document.getSelection){var s = document.getSelection();var r = document.createRange();r.selectNodeContents(e);s.removeAllRanges();s.addRange(r);} else if (document.selection){var r = document.body.createTextRange();r.moveToElementText(e);r.select();}}
function zoomIn(id,zoom) {zoom = zoom||0.5;var img = $one(id);var imgStyle = img.style, winW = img.width,winH = img.height;Object.assign(imgStyle,{"width":(winW*zoom) + "px","height": (winH*zoom) + "px","transition":"width 600ms linear,height 600ms linear"});/* fade(id,0,100,1900); */}
function zoomOut(id,zoom) {zoom = zoom||0.5;var img = $one(id);var imgStyle = img.style, winW = img.width,winH = img.height;Object.assign(imgStyle,{"width":(winW/zoom) + "px","height":(winH/zoom) + "px","transition":"width 600ms linear,height 600ms linear"});/* fade(id,0,100,1900); */}

function beautify_text_content(text, mode, opt, cp) {
	var out = '';
	if(cp){
		cp = cp.replace(/\'/g,'').replace(/\"/g,'');
		
		if ( !isNaN(parseInt(cp)) ) {  // argument is integer
			cp = parseInt(cp);
		} else {
			cp = cp ? cp : 4;
		}
	} else cp = 4;
	
	if(mode == 'xml' || mode == 'XML') {
		out =  vkbeautify.xml(text,cp);
	} else if(mode == 'json' || mode == 'JSON') {
		out =  vkbeautify.json(text,cp);
	} else if(mode == 'css' || mode == 'CSS') {
		out =  vkbeautify.css(text,cp);
	} else if(mode == 'sql' || mode == 'SQL') {
		out =  vkbeautify.sql(text,cp);
	} else if(mode == 'js' || mode == 'JS') {
		var options = opt && isObject(opt) ? opt : {
			arrays: {
				unpackArrays: true,
				removeArrays: true
			},
			proxyFunctions: {
				replaceProxyFunctions: true,
				removeProxyFunctions: true
			},
			expressions: {
				simplifyExpressions: true
			},
			miscellaneous: {
				beautify: true,
				simplifyProperties: true
			}
		}
		out =  deobfuscator.deobfuscate(text,options);
	} else if(mode == 'html' || mode == 'HTML') {
		var options = opt && isObject(opt) ? opt : {
			"indent_inner_html": false,
			"indent_size": 4,
			"indent_char": " ",
			"indent_scripts":"normal", //"keep"|"separate"|"normal"
			"indent_handlebars": false,
			"wrap_line_length":250,
			"brace_style": "collapse",//"collapse" | "expand" | "end-expand" | "none"
			"unformatted": ["a", "sub", "sup", "b", "i", "u"],
			"preserve_newlines": true,
			"max_preserve_newlines": 5,
			"extra_liners": ["/html"]
		}
		out = html_beautify(text, options);
	}
	//countChars();
	return out;
}

function minify_text_content(text, mode, preservecomm=true) {
	var out = '';
	
	if(mode == 'xml' || mode == 'XML') {
		out = preservecomm ? vkbeautify.xmlmin(text,true) : vkbeautify.xmlmin(text);
	} else if(mode == 'json' || mode == 'JSON') {
		out =  preservecomm ? vkbeautify.jsonmin(text) : vkbeautify.jsonmin(text);
	} else if(mode == 'css' || mode == 'CSS') {
		out =  preservecomm ? vkbeautify.cssmin(text,true) : vkbeautify.cssmin(text);
	} else if(mode == 'sql' || mode == 'SQL') {
		out =  vkbeautify.sqlmin(text);
	} else if(mode == 'js' || mode == 'JS') {
		out =  minify(text,{});
	} else if(mode == 'html' || mode == 'HTML') {
		out = html_minify(text, {collapseWhitespace:true/* ,minifyJS:true,minifyCSS:true */});
	}
	//countChars();
	return out;
}

function saveAsFile(filenameElem, savepathElem, permissionElem, contentElem, resultElem){
	if(filenameElem && contentElem){
		if(jQuery){
			$filename = isSelector(filenameElem) || isElement(filenameElem) ? $(filenameElem).val() : filenameElem, 
			$savepath = isSelector(savepathElem) || isElement(savepathElem) ? $(savepathElem).val() : savepathElem, 
			$permission = isSelector(permissionElem) || isElement(permissionElem) ? $(permissionElem).val() : permissionElem, 
			$content = isSelector(contentElem) || isElement(contentElem) ? $(contentElem).val() : contentElem, 
			$resultElem = isSelector(resultElem) || isElement(resultElem) ? $(resultElem) : resultElem,
			$url = `${MODULE_URL}views/ajax/fileHandler.php?do=save_file&fileName=${$filename}&savePath=${$savepath}&filePerms=${$permission}&content=${$content}`;
			$.ajax({
				url: $url, type: "POST",
				success: (res) =>{$resultElem.html(res)},
				error: (er) =>{console.log(er)},
				completed: (res) =>{}
			});
		} else {
			try{
				$filename = isSelector(filenameElem) || isElement(filenameElem) ? $one(filenameElem).value : filenameElem, 
				$savepath = isSelector(savepathElem) || isElement(savepathElem) ? $one(savepathElem).value : savepathElem, 
				$permission = isSelector(permissionElem) || isElement(permissionElem) ? $(permissionElem).value : permissionElem, 
				$content = isSelector(contentElem) || isElement(contentElem) ? $(contentElem).value : contentElem, 
				$resultElem = $one(resultElem),
				$url = `${MODULE_URL}views/ajax/fileHandler.php?do=save_file&fileName=${$fileName}&savePath=${$savepath}&filePerms=${$permission}&content=${$content}`;
				$formData = {};
				_.xhr.post({
					url: $url,
					data: $formData,
					success: (res)=>{$resultElem.innerHTML = res}
				});
			} catch(er){console.log(er);}
		}
	}
}

function createDevOpWindow(file_name, files,targetElem,cfgObj){
	console.log(file_name, files,cfgObj.readAs);
	if(file_name && files && isFileList(files)){
		var file = 'no match found', i = id = String(Math.random()).replace('.','');
		for(const x of files){if(x.name === file_name) {file = x;id = x.name.split(".")[0];}}
		
		if(!isObject(file)) return file;
		
		let type = 'unknown', ext = _.ext(file.name);
		
		if($_accept.image.indexOf(file.type) > -1 || inArray(ext,$_validExts["image"]) ||  /\.(jpe?g|png|gif)$/i.test(file.name) || $r_imFilter.test(file.type) ) {
			type = 'image';
		} else if($_accept.text.indexOf(file.type) > -1 || inArray(ext,$_validExts["text"]) || inArray(ext,$_validExts["script"])) {
			type = 'text';
		} else if($_accept.audio.indexOf(file.type) > -1 || inArray(ext,$_validExts["audio"])) {
			type = 'audio';
		} else if($_accept.video.indexOf(file.type) > -1 || inArray(ext,$_validExts["video"])) {
			type = 'video';
		}
		
		id = createUniqueName(id);
		
		let $url = `${BASE_URL}_ui-modules/Dev/views/ajax/devOpsWindows.php?type=${type}&ext=${ext}&id=${id}&fileName=${file.name}`,
		structure = `<div id="devOpsWindows__window-${id}-${i}-head" class="devOpsWindows__window-head flex flex--center">
			<div class="flex ml--auto">
				<button id="devOpsWindows__reload-btn-${id}-${i}" class="dev-button button warning" data-href="${$url}" title="Reload Tile"><i class="fa fa-sync"></i></button>
				<button id="devOpsWindows__expand-btn-${id}-${i}" class="dev-button button primary" data-href="${$url}" title="Expand Tile" disabled><i class="fa fa-expand"></i></button>
				<button id="devOpsWindows__close-btn-${id}-${i}" class="dev-button button danger" data-href="${$url}" title="Open Tile"><i class="fa fa-plus"></i></button>
				<button id="devOpsWindows__remove-btn-${id}-${i}" class="dev-button button danger" data-href="${$url}" data-target="#devOpsWindows__window-${id}-${i}" title="Remove/Delete Tile"><i class="fa fa-trash"></i></button>
			</div>
		</div>
		<div id="devOpsWindows__window-${id}-${i}-tile-icon" class="tile-icon">
			<img src="${BASE_URL}_ui-content/uploads/images/svg/${ext}.svg" alt="tile icon for : ${file.name}" />
		</div>
		<div id="devOpsWindows__window-${id}-${i}-body" class="devOpsWindows__window-body"></div>
		<div id="devOpsWindows__window-${id}-${i}-foot" class="devOpsWindows__window-foot flex flex--center"></div>
		`,
		$newWindow = $('<div />',{id:"devOpsWindows__window-"+id+"-"+i,"class":"devOpsWindows__window devOpsWindows__block no--margin"})
			.html(structure),
		$target = $(targetElem);
		
		$target.append($newWindow);
		
		var $newWindowBody = $target.find(`#devOpsWindows__window-${id}-${i}-body`),
		$reloadBtn = $target.find(`#devOpsWindows__reload-btn-${id}-${i}`),
		$expandBtn = $target.find(`#devOpsWindows__expand-btn-${id}-${i}`),
		$removeBtn = $target.find(`#devOpsWindows__remove-btn-${id}-${i}`),
		$closeBtn = $target.find(`#devOpsWindows__close-btn-${id}-${i}`);
		
		//console.log($reloadBtn,$expandBtn,$closeBtn);
		
		$.ajax({
			url:$url,
			type:"GET",
			before:function(data){},
			success:function(data){
				//previewFiles(files,newWindow);
				_.traverseFiles(file,(res, theFile) => {
					var W_ID = `${type}-${id}`, ext = _.ext(theFile.name),
					html = isFunction(prettyPrint) ? escapeHTML(res): _.w3CodeColorize(escapeHTML(res),ext),
					raw_content = `<textarea id="devOpsWindow-tile-raw-content" name="devOpsWindow-tile-raw-content" class="code-block-raw">${escapeHTML(res)}</textarea>`,
					content = (type === "text" || type === "script") ? `<pre class="code-wrapper ${ext}High prettyprint highlight language-${ext}">${html}</pre>` : res,
					temp = parseTemplate({name: theFile.name, type, content, raw_content}, data);
					
					//console.log(theFile,ext, type);
					
					$newWindowBody.html(temp);
					
					$reloadBtn.click(function(e){
						$newWindowBody.html(temp);
					});
					
					$removeBtn.click(function(e){
						if(e.target.dataset.target) $newWindow = $(e.target.dataset.target);
						//$target.remove($newWindow);
						$target[0].removeChild($newWindow[0]);
					});
					
					$expandBtn.click(function(e){
						$newWindow.toggleClass("expanded");
						var $i = $(this).find("i");
						
						//$("#photoshop-showcase-image img").toggleClass("actual-size,fit-to-window");
						$i.toggleClass("fa-compress fa-expand");
						
						if($newWindow.hasClass("expanded")){
							this.title = 'Restore Tile down';
						} else {
							this.title = 'Expand/Maximize Tile';
						}
					});
					
					$closeBtn.click(function(e){
						$newWindow.toggleClass("open");
						
						var $i = $(this).find('i');
						$i.toggleClass("fa-plus fa-minus");
						
						if($newWindow.hasClass("open")){
							this.title = 'Open Tile';
							$expandBtn.removeAttr("disabled");
						} else {
							this.title = 'Close Tile';
							$expandBtn.attr("disabled",true);
						}
						
						if($newWindow.hasClass("expanded")){
							$newWindow.removeClass("expanded");
							$i.removeClass("fa-compress").addClass("fa-expand");
						}
					});
					
					$(document).on("mousedown touchstart",`#devOpsWindow-tile-${W_ID}-drag-handle`,function(e){
						var $this = this, targetElem = e.target??$this;
						//if(targetElem.id === "devOpsWindows-drag-handle"){
							var $dragging = false, $dragHandle = targetElem, 
							$dragParentContainer = _.one(`#devOpsWindow-tile-${W_ID}`), 
							$dragPanel = _.one(`#devOpsWindow-tile-${W_ID}-sidebar`), 
							$parent = $target[0] || window;
							function dragstart(e){$dragging = true;/* e.preventDefault(); */}
							function dragend(e){$dragging = false;}
							function dragmove(e){
								if ($dragging){
									if(_.isElement($dragParentContainer) && _.isElement($dragPanel)){
										//percentage = ((e.pageX - 100) / ($dragParentContainer.offsetWidth??window.innerWidth)) * 100;
										percentage = (e.pageX / ($dragParentContainer.offsetWidth??window.innerWidth)) * 100;
										if (percentage > 0.15) {
											var mainPercentage = 100-percentage;
											_.css($dragPanel,{'width':`${percentage}%`/* ,transition:"none" */});
										}
									}
								}
							}
							$dragHandle.addEventListener("mousedown",function(e){dragstart(e);});
							$dragHandle.addEventListener("touchstart",function(e){dragstart(e);});
							$parent.addEventListener("mousemove",function(e){dragmove(e);});
							$parent.addEventListener("touchmove",function(e){dragmove(e);});
							$parent.addEventListener("mouseup",function(e){dragend(e);});
							$parent.addEventListener("touchend",function(e){dragend(e);});
						//}
					});
					
					if(isFunction(prettyPrint)) {
						prettyPrint();
						//resultObj = {result,rawContent,'formattedResult': `<pre class="code-wrapper prettyprint highlight language-${language} m--auto">${result}</pre>`};
					}
				});
			},
			complete:function(data){},
			fail:function(err){console.log('Error : '+err)},
		});
		
		return 
	}
	
	return false;
}

function createNewEditorInstance(obj = {}){
	var $i = 'akd-'+String(Math.random()).replace('.','').replace('-','');
	//const editors = [];
	const _editors = {};
	 
	_editors[$i] = {
		//use_codemirror: (!window.location.href.match(/without-codemirror/)),
		beautify_in_progress: false,
		editors: {
			using: "codemirror", 
			use_editor: true, 
			use_codemirror: true, 
			inputEditor: null, 
			outputEditor: null
		}
	}
	
	return _editors[$i]
}

let dd_tmpl = {
	image : `
	<input class="dd-checkbox" type="checkbox" name="dd-content{{ id }}" id="dd-content{{ id }}" />
	<input class="dd-expander-checkbox" type="checkbox" name="dd-content{{ id }}-expander" id="dd-content{{ id }}-expander" />
	<label class="dd-expander-btn" for="dd-content{{ id }}-expander">EX</label>
	<label class="dd-btn" for="dd-content{{ id }}">{{ name }}</label>
	<span class="dropdown pos--abs pt--1 pr--2 pb--1 pl--2" style="z-index:9;top:0;left:0;border:0;">
		<input class="dropdown-checkbox visually-hidden" id="dropdown-checkbox-{{ id }}" name="dropdown-checkbox-{{ id }}" type="checkbox" />
		<label for="dropdown-checkbox-{{ id }}" class="dropbtn flex-place-center flex-item-even m--0 pt--1 pr--2 pb--1 pl--2" style="height:max-content;width:auto;">
			&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="caret-wrapper">
			<i class="caret down"></i></span>&nbsp;
			<div class="clear"></div>
		</label>
		<div class="dropdown-content bg--white pos--abs p--2 new-tab-wrapper">
			<span class="caret-wrapper" style="top:-16px;left:12px;"><i class="caret up" style="border-bottom-color: #173459;"></i></span>
			<div class="dropdown-content-inner">
				<span class="block">{{ type }} tools: &not;</span>
				<ul class="block mb--1">
					<li class="tab-li"><span class="flex small">rotate&nbsp;:&nbsp;</span><input id="dd-content{{ id }}-rotator" class="" type="range" min="-180" max="180" step="1" value="0" oninput="var theImg = $one('#dd-content{{ id }}-image'),scaleInput = $one('#dd-content{{ id }}-scaler');theImg.style.transform='rotate('+this.value+'deg) scale('+scaleInput.value+')';this.title = this.value;" /></li>
					<li class="tab-li"><span class="flex small">scale&nbsp;:&nbsp;</span><input id="dd-content{{ id }}-scaler" class="" type="range" min="1" max="10" step=".1" value="1" oninput="var theImg = $one('#dd-content{{ id }}-image'),rotateInput = $one('#dd-content{{ id }}-rotator');theImg.style.transform='scale('+this.value+') rotate('+rotateInput.value+'deg)';this.title = this.value;" /></li>
					<li class="tab-li"><span class="flex small">zoom&nbsp;:&nbsp;</span><input id="dd-content{{ id }}-zoomer" class="" type="range" min="0" max="100" step=".5" value="0" oninput="var theImg = $one('#dd-content{{ id }}-image'), value = (100+Number(this.value))+'%';theImg.style.cssText +='width:auto;height:'+value+';';" /></li>
				</ul>
				<hr class="mb--1" style="color:#ddd;margin:5px;" />
			</div>
		</div>
	</span>
	<div class="dd-content theme-able">
		<img id="dd-content{{ id }}-image" src="{{ image_src }}" />
	</div>`,
	text : `
	<input class="dd-checkbox" type="checkbox" name="dd-content{{ id }}" id="dd-content{{ id }}" />
	<input class="dd-expander-checkbox" type="checkbox" name="dd-content{{ id }}-expander" id="dd-content{{ id }}-expander" />
	<label class="dd-expander-btn" for="dd-content{{ id }}-expander">EX</label>
	<label class="dd-btn" for="dd-content{{ id }}">{{ name }}</label>
	<span class="dropdown pos--abs pt--1 pr--2 pb--1 pl--2" style="z-index:9;top:0;left:0;border:0;">
		<input class="dropdown-checkbox visually-hidden" id="dropdown-checkbox-{{ id }}" name="dropdown-checkbox-{{ id }}" type="checkbox" />
		<label for="dropdown-checkbox-{{ id }}" class="dropbtn flex-place-center flex-item-even m--0 pt--1 pr--2 pb--1 pl--2" style="height:max-content;width:auto;">
			&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="caret-wrapper">
			<i class="caret down"></i></span>&nbsp;
			<div class="clear"></div>
		</label>
		<div class="dropdown-content pos--abs p--2 bg--white new-tab-wrapper">
			<span class="caret-wrapper" style="top:-16px;left:12px;"><i class="caret up" style="border-bottom-color: #173459;"></i></span>
			<div class="dropdown-content-inner">
				<span class="block">{{ type }} tools: &not;</span>
				<ul class="block mb--1">
					<li class="tab-li"><span class="flex small">padding&nbsp;:&nbsp;</span><input id="dd-content{{ id }}-padder" class="" type="range" min="0" max="100" step="1" value="0" oninput="var thePre = $one('#dd-content{{ id }}-text');thePre.style.cssText += 'padding:'+this.value+'px;';" /></li>
					<li class="tab-li"><span class="flex small">font-size&nbsp;:&nbsp;</span><input id="dd-content{{ id }}-sizer" class="" type="range" min="100" max="1000" step="1" value="100" oninput="var thePre = $one('#dd-content{{ id }}-text');thePre.style.cssText += 'font-size:'+this.value+'%;';" /></li>
					<li class="tab-li"><span class="flex small">zoom&nbsp;:&nbsp;</span><input id="dd-content{{ id }}-zoomer" class="" type="range" min="0" max="100" step=".5" value="0" oninput="var thePre = $one('#dd-content{{ id }}-text'), value = (100+Number(this.value))+'%';thePre.style.cssText +='width:auto;height:'+value+';';" /></li>
				</ul>
				<hr class="mb--1" style="color:#ddd;margin:5px;" />
				<div class="flex">
					<button class="button flex no-wrap-all" title="prettify" onclick="var thePre = $one('#dd-content{{ id }}-text'), theTextarea = $one('#dd-content{{ id }}-text-raw'), data = beautify_text_content(theTextarea.value,'{{ lang }}');thePre.innerHTML = _.w3CodeColorize(escapeHTML(data),'{{ lang }}')">
						<i class="fa fa-indent"></i>&nbsp;
						<span class="small-screen-hidden">prettify</span>
					</button>
					<button class="button flex no-wrap-all" title="minify" onclick="var thePre = $one('#dd-content{{ id }}-text'), theTextarea = $one('#dd-content{{ id }}-text-raw'), data = minify_text_content(theTextarea.value,'{{ lang }}');thePre.innerHTML = _.w3CodeColorize(escapeHTML(data),'{{ lang }}')">
						<i class="fa fa-compress"></i>&nbsp;
						<span class="small-screen-hidden">minify</span>
					</button>
				</div>
			</div>
		</div>
	</span>
	<div class="dd-content theme-able">
		<pre id="dd-content{{ id }}-text" class="code-wrapper prettyprint highlight language-{{ lang }}" style="padding:0;font-size:100%;">{{ text }}</pre>
		<textarea id="dd-content{{ id }}-text-raw" name="dd-content{{ id }}-text-raw" class="code-block-raw visually-hidden hidden">{{ raw_content }}</textarea>
	</div>`,
}
	
const parseTemplate = (item, tmpl) => {
	if(item && typeof(item) === "object" && tmpl && typeof(tmpl) === "string"){
		var i = 'akd-'+String(Math.random()).replace('.','').replace('-',''), tmp = '';
		tmp += tmpl.replace(new RegExp(_.escapeRegExp('{{ title }}'), 'g'),item?.title?.name??"???")
			.replace(new RegExp(_.escapeRegExp('{{ name }}'), 'g'),item.name??"???")
			.replace(new RegExp(_.escapeRegExp('{{ id }}'), 'g'),item.id??i)
			.replace(new RegExp(_.escapeRegExp('{{ src }}'), 'g'),item.src??'???')
			.replace(new RegExp(_.escapeRegExp('{{ text }}'), 'g'),item.text??'???')
			.replace(new RegExp(_.escapeRegExp('{{ content }}'), 'g'),item.content??'???')
			.replace(new RegExp(_.escapeRegExp('{{ lang }}'), 'g'),item.language??item.lang??'html')
			.replace(new RegExp(_.escapeRegExp('{{ raw_content }}'), 'g'),item.raw_content??item.text??'???')
			.replace(new RegExp(_.escapeRegExp('{{ image_src }}'), 'g'), item.image_src??item.src??'???')
			.replace(new RegExp(_.escapeRegExp('{{ type }}'), 'g'),item.type??'text')
			.replace(new RegExp(_.escapeRegExp('{{ mimetype }}'), 'g'),item.mimetype??'text/plain')
		return tmp;
	} else {
		var msg = "";
		if(Array.isArray(plObjArr)) msg += "template object is not in the correct format. It appears to be in [Array] format, but it has to be an object!";
	    else if(!isObject(item)) msg += "template object is not in the correct format. It has to be an object!";
		console.log(msg);
	}
}

function printFileInfo(file, as_html=true){
	let output = '';
	
	/* if(files && (!isArray(files) || !isArrayLike(files))){files = [files];}
	
	//Array.from(files).forEach(file => {
	//for(var i=0;i<files;i++){
	for(const file of files){
		//var file = files[i];
		console.log(file, file.name) */
		if(file && isObject(file) /* || isBlob(file) */){
			var ext = _.ext(file.name), filetype = file.type;
			if(filetype === "" || filetype === undefined){
				filetype = $_mimeTypes[ext] ? $_mimeTypes[ext] : "text/plain";
			}
			
			if(as_html === true) {
				output += `<ul class="akd__list-group grid-s-10 ml--auto mr--auto text--left">
					<li class="akd__list-group-item"><i class="fa fa-info-circle"></i>&nbsp;File information&nbsp;&raquo;&nbsp;</li>
					<li class="akd__list-group-item"><span class="file-name">name: <strong>${file.name}</strong></span></li>
					<li class="akd__list-group-item"><span class="file-type">type: <strong>${filetype}</strong></span></li>
					<li class="akd__list-group-item"><span class="file-size">size: <strong>${_.niceBytes(file.size)}</strong></span></li>
					<li class="akd__list-group-item"><span class="file-moddate">lastModified: <strong>${(file.lastModified? new Date(file.lastModified):'n/a')}</strong></span></li>
				</ul>`;
			} else {
				output += `
				Name : ${file.name}, 
				[ mime ] Type : ${file.type}, 
				Last Modified : ${(file.lastModified? new Date(file.lastModified):'n/a')}, 
				Size : ${_.niceBytes(file.size)}
				`;
			}
		}
	//}
	//});
	//let final_out = `<div style="max-height:300px;overflow:auto;">${output}</div>`;
	
	return output;
}

let read_as_arr = ["text","script","image","js","css","html","md"];
function getRecommendedOp(file){
	let output = '';
	
	if(file && isObject(file) /* || isBlob(file) */){
		var ext = _.ext(file.name), filetype = file.type;
		if(filetype === "" || filetype === undefined){
			filetype = $_mimeTypes[ext] ? $_mimeTypes[ext] : "text/plain";
		}
		
		let op_un = `<button class="button primary flex-place-center op-button op-unknown" title="perform default operations on ${file.name}" data-file="${file.name}" data-read-as="super"><i class="fa fa-puzzle-piece"></i>&nbsp;<span>File is unknown</span></button>`,
		
		op_text = `<button class="button default flex-place-center op-button op-text" title="perform text operations on ${file.name}" data-file="${file.name}" data-read-as="text"><i class="fa fa-text-width"></i>&nbsp;<span>Read as text</span></button>`,
		op_html = `<button class="button danger flex-place-center op-button op-html" title="perform HTML operation on ${file.name}" data-file="${file.name}" data-read-as="text"><i class="fab fa-html5"></i>&nbsp;<span>Read as HTML</span></button>`,
		op_css = `<button class="button orange flex-place-center op-button op-css" title="perform CSS operation on ${file.name}" data-file="${file.name}" data-read-as="text"><i class="fab fa-css3"></i>&nbsp;<span>Read as CSS</span></button>`,
		op_md = `<button class="button success flex-place-center op-button op-md" title="perform markdown operation on ${file.name}" data-file="${file.name}" data-read-as="text"><i class="fab fa-markdown"></i>&nbsp;<span>Read as markdown</span></button>`,
		
		op_script = `<button class="button default flex-place-center op-button op-script" title="perform script operations on ${file.name}" data-file="${file.name}" data-read-as="script"><i class="fa fa-scroll"></i>&nbsp;<span>Read as script</span></button>`,
		op_js = `<button class="button yellow flex-place-center op-button op-js" title="perform javascript operation on ${file.name}" data-file="${file.name}" data-read-as="script"><i class="fab fa-js fa-javascript"></i>&nbsp;<span>Read as javascript</span></button>`,
		
		op_audio = `<button class="button default flex-place-center op-button op-audio" title="perform audio operations on ${file.name}" data-file="${file.name}" data-read-as="media"><i class="fa fa-music"></i>&nbsp;<span>Read as audio</span></button>`,
		
		op_video = `<button class="button default flex-place-center op-button op-video" title="perform video operations on ${file.name}" data-file="${file.name}" data-read-as="media"><i class="fa fa-film"></i>&nbsp;<span>Read as video</span></button>`,
		
		op_image = `<button class="button info flex-place-center op-button op-image" title="perform image operations on ${file.name}" data-file="${file.name}" data-read-as="image"><i class="fa fa-image"></i>&nbsp;<span>Read as image</span></button>`,
		op_jpeg = `<button class="button teal flex-place-center op-button op-image-jpeg" title="perform JPEG operation on ${file.name}" data-file="${file.name}" data-read-as="image"><i class="fa fa-image"></i>&nbsp;<span>Read as jpeg</span></button>`,
		op_png = `<button class="button cyan flex-place-center op-button op-image-png" title="perform PNG operation on ${file.name}" data-file="${file.name}" data-read-as="image"><i class="fa fa-image"></i>&nbsp;<span>Read as png</span></button>`,
		op_gif = `<button class="button purple flex-place-center op-button op-image-gif" title="perform GIF operation on ${file.name}" data-file="${file.name}" data-read-as="image"><i class="fa fa-image"></i>&nbsp;<span>Read as gif</span></button>`,
		op_jfif = `<button class="button warning flex-place-center op-button op-image-jfif" title="perform JFIF operation on ${file.name}" data-file="${file.name}" data-read-as="image"><i class="fa fa-image"></i>&nbsp;<span>Read as jfif</span></button>`,
		op_avif = `<button class="button pink flex-place-center op-button op-image-avif" title="perform AVIF operation on ${file.name}" data-file="${file.name}" data-read-as="image"><i class="fa fa-image"></i>&nbsp;<span>Read as avif</span></button>`;
		
		output += `<li class="akd__list-group-item flex flex--wrap gap--1">
			<button class="button gray flex-place-center op-button op-super" title="perform super operations on ${file.name}" data-file="${file.name}" data-read-as="super"><i class="fa fa-object-ungroup"></i>&nbsp;<span></span></button>`;
			if(ext === "" || filetype === "" || !_.inArray(ext,$_validExts["text"]) || !_.inArray(ext,$_validExts["image"]) || !_.inArray(ext,$_validExts["script"]) || !_.inArray(ext,$_validExts["audio"]) || !_.inArray(ext,$_validExts["video"])) output += op_un;
			if(_.inArray(ext,$_validExts["script"])) output += op_script;
			if(_.inArray(ext,$_validExts["audio"])) output += op_audio;
			if(_.inArray(ext,$_validExts["video"])) output += op_video;
			if(_.inArray(ext,$_validExts["text"])) output += op_text;
			if(_.inArray(ext,$_validExts["image"])) output += op_image;
			if(ext === "avif") output += op_avif;
			if(ext === "css") output += op_css;
			if(ext === "gif") output += op_gif;
			if(ext === "htm" || ext === "html") output += op_html;
			if(ext === "jfif") output += op_jfif;
			if(ext === "jpeg") output += op_jpeg;
			if(ext === "js" || ext === "json") output += op_js;
			if(ext === "md") output += op_md;
			if(ext === "png") output += op_png;
			output += `<select id="" class="read-as-select button" style="width: max-content;">${read_as_arr.map(r=>`<option value="read-as-${r}">read-as-${r}</option>`)}</select>`;
		output += `</li>`;
	}
	//let final_out = `<div style="max-height:300px;overflow:auto;"><ul class="akd__list-group grid-s-10 ml--auto mr--auto text--left">${output}</ul></div>`;
	
	return output;
}
/* function saveImage(mainImage,$mime, $dataURLSource){
	var lastDot = selectedFile.name.lastIndexOf('.'), 
		outputFileName = (lastDot != -1) ? selectedFile.name.substring(0, lastDot) + '.' + opts.output.outputExt : selectedFile.name + '.' + opts.optput.outputExt, 
		fileName = outputFileName || 'my-canvas.jpeg', 
		imgType = $mime || "image/jpeg", imgQuality = 1.0, 
		canvas = document.createElement("canvas"), 
		ctx = canvas.getContext("2d");
		
	canvas.width = mainImage?.width?.naturalWidth;
	canvas.height = mainImage?.height?.naturalHeight;
	//ctx.filter = _.elementStyle(mainImage).filter;
	ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);
	// Convert canvas to image
	var dataURL = canvas.toDataURL(imgType, imgQuality);
	// if(window.navigator.msSaveBlob) {window.navigator.msSaveBlob(canvas.msToBlob(), fileName);e.preventDefault();} else { _.downloadImage(dataURL, fileName);}
	
	return {dataURL, download(cv,fn,du){if (window.navigator.msSaveBlob) {window.navigator.msSaveBlob(cv.msToBlob(), fn);e.preventDefault();} else {_.downloadImage(du, fn);}}};
}

function blobHandler (blob) {
	var lastDot = selectedFile.name.lastIndexOf('.');
	var outputFileName = (lastDot != -1) ? selectedFile.name.substring(0, lastDot) + '.' + opts.output.outputExt : selectedFile.name + '.' + opts.optput.outputExt;
	//saveAs(blob, outputFileName);
} */

function mkbase64ConvertTool (toolName, computeFn) {
	// file to base64 (copy-paste image-to-base64)
    if ($('#tool-'+ toolName).length) {
		var fileSelector = '#' + toolName+'-file-select';
		var submitSelector = '#' + toolName+'-submit';
        var selectedFile;
		
		$('#'+toolName+'-output').slideUp();
		$('#'+toolName+'-errors').hide();
		$('#'+toolName+'-stats').hide();
        // make file selector work
        $(fileSelector).on('change', function (ev) {
            $('#'+toolName+'-action-error').hide();
            var file = ev.target.files[0];
            selectedFile = file;
            //$(submitSelector).attr('disabled', false);
            $(submitSelector).removeAttr('disabled');
        });

        // make drag & drop work
        $('#'+toolName+'-drag-and-drop').on('dragover', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $('#'+toolName+'-drag-and-drop').addClass('hover');
        });
        $('#'+toolName+'-drag-and-drop').on('dragenter', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $('#'+toolName+'-drag-and-drop').addClass('hover');
        });
        $('#'+toolName+'-drag-and-drop').on('dragleave', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $('#'+toolName+'-drag-and-drop').removeClass('hover');
        });
        $('#'+toolName+'-drag-and-drop').on('dragend', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            $('#'+toolName+'-drag-and-drop').removeClass('hover');
        });
        $('#'+toolName+'-drag-and-drop').on('drop', function (ev) {
            ev.preventDefault();
            ev.stopPropagation(); 
            $('#'+toolName+'-drag-and-drop').removeClass('hover');
            $('#'+toolName+'-action-error').hide();
            $('#'+toolName+'-errors').hide();
            $('#'+toolName+'-stats').hide();
            ev.dataTransfer = ev.originalEvent.dataTransfer;
            var file = ev.dataTransfer.files[0];
            $('#'+toolName+'-drag-and-drop-selected').text("Selected " + file.name);
            selectedFile = file;
            //$(submitSelector).attr('disabled', false);
            $(submitSelector).removeAttr('disabled');
        });

        // make convert button work
        //
        $(submitSelector).click(function () {
            var reader = new FileReader();
            reader.onload = function () {
                // reader result
                var comma = reader.result.indexOf(',');
                var base64 = reader.result.substr(comma+1);

                $('#'+toolName+'-output textarea').val(base64);
                $('#'+toolName+'-output').slideDown();
            }
            reader.readAsDataURL(selectedFile);
        });
    }
}

function mkDNDTool(toolName, onChangeCB, onDropCB) {
	//if ($('#tool-' + toolName).length == 0) return;
	//var fileSelector = '#file-select';
	//var submitSelector = '#submit';
	var fileSelector = '#' + toolName + '-file-select';
	var submitSelector = '#' + toolName + '-submit';
	var selectedFile;
	// make file selector work
	/* $(fileSelector).on('change', function (ev) {
		$('#action-error').hide();
		var file = ev.target.files[0];
		if (file.type != inputOpts.inputMime) {
			$('#action-error').show();
			$('#action-error').text("Selected file is not a " + inputOpts.inputHumanFormat);
			return;
		}
		selectedFile = file;
		//$(submitSelector).attr('disabled', false);
		$(submitSelector).removeAttr('disabled');
	}); */

	$(fileSelector).on('change', onChangeCB);
	// make drag & drop work
	$('#' + toolName + '-drag-and-drop').on('dragover', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#' + toolName + '-drag-and-drop').addClass('hover');
	});
	
	$('#' + toolName + '-drag-and-drop').on('dragenter', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#' + toolName + '-drag-and-drop').addClass('hover');
	});
	
	$('#' + toolName + '-drag-and-drop').on('dragleave', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#' + toolName + '-drag-and-drop').removeClass('hover');
	});
	
	$('#' + toolName + '-drag-and-drop').on('dragend', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#' + toolName + '-drag-and-drop').removeClass('hover');
	});
	
	$('#' + toolName + '-drag-and-drop').on('drop', onDropCB||onChangeCB);
}

function mkImageConvertTool (toolName, inputOpts, outputOpts, computeFn) {
	if ($('#tool-' + toolName).length == 0) return;

	//var fileSelector = '#file-select';
	//var submitSelector = '#submit';
	var fileSelector = '#' + toolName + '-file-select';
	var submitSelector = '#' + toolName + '-submit';
	var selectedFile;

	// make file selector work
	$(fileSelector).on('change', function (ev) {
		$('#action-error').hide();
		var file = ev.target.files[0];
		if (file.type != inputOpts.inputMime) {
			$('#action-error').show();
			$('#action-error').text("Selected file is not a " + inputOpts.inputHumanFormat);
			return;
		}
		selectedFile = file;
		//$(submitSelector).attr('disabled', false);
		$(submitSelector).removeAttr('disabled');
	});

	// make drag & drop work
	$('#drag-and-drop').on('dragover', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#drag-and-drop').addClass('hover');
	});
	$('#drag-and-drop').on('dragenter', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#drag-and-drop').addClass('hover');
	});
	$('#drag-and-drop').on('dragleave', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#drag-and-drop').removeClass('hover');
	});
	$('#drag-and-drop').on('dragend', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#drag-and-drop').removeClass('hover');
	});
	$('#drag-and-drop').on('drop', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#drag-and-drop').removeClass('hover');
		$('#action-error').hide();
		ev.dataTransfer = ev.originalEvent.dataTransfer;
		var file = ev.dataTransfer.files[0];
		if (file.type != inputOpts.inputMime) {
			$('#action-error').show();
			$('#action-error').text("Selected file is not a " + inputOpts.inputHumanFormat);
			return;
		}
		$('#drag-and-drop-selected').text("Selected " + file.name);
		selectedFile = file;
		//$(submitSelector).attr('disabled', false);
		$(submitSelector).removeAttr('disabled');
	});

	// make convert button work
	//
	$(submitSelector).click(function () {
		var reader = new FileReader();
		reader.onload = function () {
			var img = new Image;
			img.onload = function () {
				var canvas = $('<canvas>')[0];
				canvas.width = img.width;
				canvas.height = img.height;
				var canvasCtx = canvas.getContext('2d');
				canvasCtx.drawImage(img, 0, 0);
				function blobHandler (blob) {
					var lastDot = selectedFile.name.lastIndexOf('.');
					if (lastDot != -1) {
						var outputFileName = selectedFile.name.substring(0, lastDot) + '.' + outputOpts.outputExt;
					} else {
						var outputFileName = selectedFile.name + '.' + optputOpts.outputExt;
					}
					saveAs(blob, outputFileName);
				}
				canvas.toBlob(blobHandler, outputOpts.outputMime);
			}
			img.src = reader.result;
		}
		reader.readAsDataURL(selectedFile);
	});
}

function previewFiles(elem, previewElem,progresElem, d="prepend"){
	var reader,i=0,
	accept = $_accept || {
		audio  : ["audio/aac", "audio/mp3", "audio/mpeg", "audio/ogg", "audio/oga", "audio/m4a"],
		video  : ["video/mp4", "video/mpeg", "video/webm", "video/ogv", "video/m4v"],
		text   : ["text/plain", "text/html", "text/css", "text/javascript", "text/php", "text/json", "text/xml"],
		image  : ["image/svg+xml","image/png", "image/jpeg", "image/gif", "image/webp", "image/jfif", "image/avif", "image/svg+xml"],
		script : ["application/x-javascript", "application/json", "application/x-php", "application/xml"],
		other  : ["image/svg+xml"]
	}, 
	r_imFilter = $r_imFilter || /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
	
	var progress_bar = $one(progresElem||'#progress_bar'), 
	progress = $one('.percent',progress_bar), 
	preview = $one(previewElem||'#reader-preview');
	var files = (isArray(elem) || isArrayLike(elem)) ? elem : ((isElement(elem) && ("files" in elem)) ? elem.files : (isObject(elem) ? elem?.dataTransfer?.files||elem?.target?.files||false : $one('input[type=file]').files));
	
	function abortRead() {reader.abort();}
	function errorHandler(evt){
		switch(evt.target.error.code) {
			case evt.target.error.NOT_FOUND_ERR: _.handleError('File Not Found!');break;
			case evt.target.error.NOT_READABLE_ERR:_.handleError('File is not readable');break;
			case evt.target.error.ABORT_ERR:break; // noop
			default:_.handleError('An error occurred reading this file.');
		};
	}
	function updateProgress(evt) {
		// evt is an ProgressEvent.
		if (evt.lengthComputable) {
			var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
			// Increase the progress bar length.
			if(percentLoaded < 100){
				//progress.style.width = percentLoaded + '%';
				progress.style.cssText += `width:${percentLoaded}%;transition:width .3s linear;`;
				progress.textContent = percentLoaded + '%';
			}
		}
	}
	function readAndPreview(file) {
		var ext = _.ext(file.name),
		filetype = file.type;
		if(filetype === "" || filetype === undefined){
			filetype = $_mimeTypes[ext] ? $_mimeTypes[ext] : "text/plain";
		}
		
		var reader = new FileReader();
		reader.onerror = errorHandler;
		reader.onprogress = updateProgress;
		reader.onabort = function(e){_.handleError('File read cancelled');};
		reader.onloadstart = function(e) {progress_bar.classList.add('loading');};
		if (accept.image.indexOf(filetype) > -1 ||  /\.(jpe?g|png|gif|webp)$/i.test(file.name) || r_imFilter.test(filetype) ) {
			reader.addEventListener("load", function () {
				//console.log(this.result)
				i = String(Math.random()).replace('.','');
				var imageWrapper = document.createElement("div");
				var _temp = parseTemplate({id:i, name:file.name, image_src:this.result, type: 'image'}, dd_tmpl["image"]);
				
				if(d === "append"){
					imageWrapper.className = "dd-wrapper";
					imageWrapper.innerHTML = _temp;
					preview.appendChild(imageWrapper);
				} else {
					preview.insertAdjacentHTML("afterbegin",`<div class="dd-wrapper">${_temp}<\/div>`);
				}
				// Ensure that the progress bar displays 100% at the end.
				progress.style.cssText += `width:100%;transition:width .3s linear;`;
				progress.textContent = '100%';
				setTimeout("progress_bar.className='';", 2000);
			}, false);
			reader.readAsDataURL(file);
		} else if ((accept.audio.indexOf(filetype) > -1 ||  /\.(mp3|ogg|aac|m4a)$/i.test(file.name)) || (accept.video.indexOf(filetype) > -1 ||  /\.(mp4|avi|mov|flac)$/i.test(file.name))) {
			reader.addEventListener("load", function () {
				i = String(Math.random()).replace('.','');
				var mediaWrapper = document.createElement("div"),
				mTag = (accept.audio.indexOf(filetype) > -1 ||  /\.(mp3|ogg|aac|m4a)$/i.test(file.name)) ? 'audio' : 'video',
				_temp = `<input class="dd-checkbox" type="checkbox" name="dd-content${i}" id="dd-content${i}" />
				<input class="dd-expander-checkbox" type="checkbox" name="dd-content${i}-expander" id="dd-content${i}-expander" />
				<label class="dd-expander-btn" for="dd-content${i}-expander">EX</label>
				<label class="dd-btn" for="dd-content${i}">${file.name}</label>
				<span class="dropdown pos--abs pt--1 pr--2 pb--1 pl--2" style="z-index:9;top:0;left:0;border:0;">
					<input class="dropdown-checkbox visually-hidden" id="dropdown-checkbox-${i}" name="dropdown-checkbox-${i}" type="checkbox" />
					<label for="dropdown-checkbox-${i}" class="dropbtn flex-place-center flex-item-even pt--1 pr--2 pb--1 pl--2 m--0" style="height:max-content;width:auto;color:#10bdf4;">&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="caret-wrapper"><i class="caret down"></i></span>&nbsp;<div class="clear"></div></label>
					<div class="dropdown-content p--2 bg--white new-tab-wrapper">
						<span class="caret-wrapper" style="top:-16px;left:12px;"><i class="caret up" style="border-bottom-color: #173459;"></i></span>
						<div class="dropdown-content-inner">
							<span class="block">image tools: &not;</span>
							<ul class="block mb--1">
								<li class="tab-li"><span class="flex small">rotate&nbsp;:&nbsp;</span><input id="dd-content${i}-rotator" class="" type="range" min="-180" max="180" step="1" value="0" oninput="var theMedia = $one('#dd-content${i}-media'),scaleInput = $one('#dd-content${i}-scaler');theMedia.style.transform='rotate('+this.value+'deg) scale('+scaleInput.value+')';this.title = this.value;" /></li>
								<li class="tab-li"><span class="flex small">scale&nbsp;:&nbsp;</span><input id="dd-content${i}-scaler" class="" type="range" min="1" max="10" step=".1" value="1" oninput="var theMedia = $one('#dd-content${i}-media'),rotateInput = $one('#dd-content${i}-rotator');theMedia.style.transform='scale('+this.value+') rotate('+rotateInput.value+'deg)';this.title = this.value;" /></li>
								<li class="tab-li"><span class="flex small">zoom&nbsp;:&nbsp;</span><input id="dd-content${i}-zoomer" class="" type="range" min="0" max="100" step=".5" value="0" oninput="var theMedia = $one('#dd-content${i}-media'), value = (100+Number(this.value))+'%';theMedia.style.cssText +='width:auto;height:'+value+';';" /></li>
								<li class="tab-li"><span class="flex small">object-fit&nbsp;:&nbsp;</span><select id="dd-content${i}-object-fitter" class="" onchange="var theMedia = $one('#dd-content${i}-media');theMedia.style.cssText +='object-fit:'+this.value+';';">
									<option value="contain" selected>contain</option>
									<option value="cover">cover</option>
									<option value="fill">fill</option>
									<option value="scale-down">scale-down</option>
									<option value="revert">revert</option>
									<option value="none">none</option>
								</select></li>
							</ul>
							<hr class="mb--1" style="color:#ddd;margin:5px;" />
						</div>
					</div>
				</span>
				<div class="dd-content theme-able">
					<${mTag} id="dd-content${i}-media" src="${this.result}" preload="metadata" controls></${mTag}>
				</div>`;
				if(d === "append"){
					mediaWrapper.className = "dd-wrapper";
					mediaWrapper.innerHTML = _temp;
					preview.appendChild(mediaWrapper);
				} else {
					preview.insertAdjacentHTML("afterbegin",`<div class="dd-wrapper">${_temp}<\/div>`);
				}
				// Ensure that the progress bar displays 100% at the end.
				progress.style.cssText += `width:100%;transition:width .3s linear;`;
				progress.textContent = '100%';
				setTimeout("progress_bar.className='';", 2000);
			}, false);
			reader.readAsDataURL(file);
		} else if (accept.text.indexOf(filetype) > -1 || filetype.indexOf("application") == 0) {
			var lang = ext == 'js' ? 'javascript' : (ext || "html"),
			highlighted_code = "";
			
			reader.addEventListener("load", function () {
				i = String(Math.random()).replace('.','');
				var p = document.createElement("div");
				
				/* if(ext === "htm" || ext === "html") {
					//content = (this.result).replace(new RegExp(_.escapeRegExp('<'), 'g'),"&lt;").replace(new RegExp(_.escapeRegExp('/>'), 'g'),"/&gt;")
					//content = _.replaceAll(this.result,'<',"&lt;");//content = _.replaceAll(content,'>',"&gt;");
					content = escapeHTML(this.result);
				}if(filetype.match("javascript")){
					out = this.result.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				} else if(filetype.match("json")){
					var jsonObj = JSON.parse(this.result);
					out = JSON.stringify(jsonObj, null, 2);
					out = out.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				} else {
					out = this.result.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				} else content = this.result; */
				content = escapeHTML(this.result);
				
				if(isFunction(_.w3CodeColorize)) {
					//out = `<pre class="code-wrapper ${ext}High">${_.w3CodeColorize(out,ext)}</pre>`;
					//highlighted_code = _.w3CodeColorize(content, lang);
					//highlighted_code = _.parseContent(content,lang).formattedResult;
					highlighted_code = content;
				} else {
					highlighted_code = _.parseContent(content,lang).formattedResult;
				}
				
				var _temp = parseTemplate({id:i, name:file.name, text:highlighted_code, raw_content:content, type: 'text', lang}, dd_tmpl['text']);
				
				if(d === "append"){
					p.className = "dd-wrapper";
					p.innerHTML = _temp;
					preview.appendChild(p);
				} else {
					preview.insertAdjacentHTML("afterbegin",`<div class="dd-wrapper">${_temp}<\/div>`);
				}
				
				if(isFunction(prettyPrint)) {
					prettyPrint();
					//resultObj = {result,rawContent,'formattedResult': `<pre class="code-wrapper prettyprint highlight language-${language} m--auto">${result}</pre>`};
				}
				// Ensure that the progress bar displays 100% at the end.
				progress.style.cssText += `width:100%;transition:width .3s linear;`;
				progress.textContent = '100%';
				setTimeout("progress_bar.className='';", 2000);
			}, false);
			reader.readAsText(file);
		}
		i++;
	}
	
	if(files && files.length > 0){
		[].forEach.call(files, readAndPreview);
	} else {
		console.log("No file selected. Select at least one file to process",elem, files);
	}
}
;(function(){
	/* const $the = {
		//use_codemirror: (!window.location.href.match(/without-codemirror/)),
		beautify_in_progress: false,
		editors: {
			using: "codemirror", 
			use_codemirror: true, 
			inputEditor: null, 
			outputEditor: null
		}
	}, */
	const $the = createNewEditorInstance(),
	$body = $("body");
	
	let codemirrorThemeSelect = $("#codemirror-theme-select");
	let $codemirror_themes_str = '';
	if($codemirror_themes && Array.isArray($codemirror_themes) && $codemirror_themes.length > 0){
		$codemirror_themes.forEach($cm_str=>{
			$codemirror_themes_str += '<option value="'+$cm_str+'">'+$cm_str+'</option>';
		});
		codemirrorThemeSelect.html($codemirror_themes_str);
		
		codemirrorThemeSelect.on("change",function(e){
			//var theme = codemirrorThemeSelect.options[codemirrorThemeSelect.selectedIndex].textContent;
			var theme = $(this).val();
			$("#codemirror-active-theme").attr("href",BASE_URL+"_ui-includes/vendors/codemirror/theme/"+theme+".css");
			//$the.editor.setOption("theme", theme);
			$the.editors.inputEditor.setOption("theme", theme);
			$the.editors.outputEditor.setOption("theme", theme);
			//location.hash = "#" + theme;
		});
		
	}
	
	$(".swappable-input").each(function(i, el){
		let $id = $(el).attr("id"),$title = _.replaceAll(($(el).attr("data-output-title") || $id),"_"," ");
		//$("<option />").val("choose option").appendTo(".pass-to-select");
		let $option = $("<option />",{"class":"clickable"})
			.val($id)
			.html($title)
			.appendTo(".pass-to-select")
	});
	
	$(".pass-to-select").change(function(e){
		let $closest_output = $(this).closest(".akd__panel").find(".swappable-output"),
		$closest_output_id = $closest_output.attr("id");
		
		let $closest_input = $(this).closest(".akd__panel").find(".swappable-input"),
		$closest_input_id = $closest_input.attr("id");
		
		let $target_input_id = this.value;
		
		if($target_input_id !== $closest_input_id){
			//console.log($target_input_id, $(`#${$target_input_id}`));
			
			let source = $closest_output_id === "prettify_output" && $the.editors.use_editor ? $the.editors.outputEditor.getValue() : $(`#${$closest_output_id}`).val();
			($target_input_id === "prettify_input" || $closest_input_id === "prettify_input") && $the.editors.use_editor ? $the.editors.inputEditor.setValue(source) : $(`#${$target_input_id}`).val(source);
			/* //$parents = $(this).parents().is(".akd__panel") */
			//console.log(e.target.value, this.id, $closest_output_id, $target_input_id);
		}
	});
	
	$('#copy-to-clipboard').click(function (ev) {
        ev.preventDefault();
        $('textarea').is(":focus").select();
        document.execCommand('copy');
    });
	
	mkbase64ConvertTool("image-to-base64", (out)=>{return out;});
	//mkbase64ConvertTool("image-converters", (out)=>{return out;});
	/* mkImageConvertTool('jpg-to-png', {inputMime : 'image/jpeg',inputHumanFormat : 'JPEG'},{outputMime : 'image/png',outputExt : 'png'},function () {});
    mkImageConvertTool('png-to-jpg', {inputMime : 'image/png',inputHumanFormat : 'PNG'},{outputMime : 'image/jpeg',outputExt : 'jpg'},function () {});
    mkImageConvertTool('gif-to-png', {inputMime : 'image/gif',inputHumanFormat : 'GIF'},{outputMime : 'image/png',outputExt : 'png'},function () {});
    mkImageConvertTool('gif-to-jpg', {inputMime : 'image/gif',inputHumanFormat : 'GIF'},{outputMime : 'image/jpeg',outputExt : 'jpg'},function () {});
    mkImageConvertTool('bmp-to-png', {inputMime : 'image/bmp',inputHumanFormat : 'BMP'},{outputMime : 'image/png',outputExt : 'png'},function () {});
    mkImageConvertTool('bmp-to-jpg', {inputMime : 'image/bmp',inputHumanFormat : 'BMP'},{outputMime : 'image/jpeg',outputExt : 'jpg'},function () {});
	*/
	
	// ------------------------- Prettifiers ----------------------
	var $prettify_input = $('#prettify_input'),
	$prettify_output = $('#prettify_output'),
	$prettify_optionsForm = $('#prettify_options'),
	
	$deobfuscateBtn = $("#deobfuscateButton"),
	$prettifyBtn = $("#prettifyButton"),
	$json_prettifyBtn = $("#json_prettifyButton"),
	
	$prettify_file_type_select = $('#prettify-file-type-select'),
	$prettify_file_input_type = $('#prettify-file-input-type'),
	$prettify_file_output_type = $('#prettify-file-output-type');
	
	var $prettify_error = $("#prettify-errors");
	$prettify_error.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $prettify_stats = $("#prettify-stats");
	$prettify_stats.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $prettify_ait = $("#prettify-cb-as-i-type");
	var $current_prettifier = ($prettify_file_type_select.val()).toUpperCase();
	
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
	
	$the.editors.inputEditor = CodeMirror.fromTextArea($prettify_input[0],{
		theme: "default",
		lineNumbers: true,
		indentUnit: 4,
		mode: mixedMode,//mode: \'javascript\',
		selectionPointer: true,
		extraKeys: {
			"Ctrl-Space": "autocomplete",
			"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
			"F11": function(cm) {
				cm.setOption("fullScreen", !cm.getOption("fullScreen"));
			},
			"Esc": function(cm) {
				if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
			}
		},
		foldGutter: true,
		gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
	});
	
	$the.editors.outputEditor = CodeMirror.fromTextArea($prettify_output[0],{
		theme: "default",
		lineNumbers: true,
		indentUnit: 4,
		mode: mixedMode,//mode: \'javascript\',//mode: "text/html",
		selectionPointer: true,
		readOnly: true,
		/* matchTags: {bothTags: true},
		extraKeys: {"Ctrl-J": "toMatchingTag"}, */
		extraKeys: {
			"Ctrl-Space": "autocomplete",
			"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
			"F11": function(cm) {
				cm.setOption("fullScreen", !cm.getOption("fullScreen"));
			},
			"Esc": function(cm) {
				if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
			}
		},
		foldGutter: true,
		gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
	});

	
	$prettify_file_type_select.on("change", function(e){
		let val = ($(this).val()).toUpperCase();
		
		$current_prettifier = val;
		
		$prettify_file_input_type.html(val);
		$prettify_file_output_type.html(val);
		
		if(val === "HTML" || val === "CSS" || val === "JSON2"){
			if($the.editors.use_editor){
				/* if($the.editors.inputEditor.getValue() === ""){
					$the.editors.inputEditor.setValue($placeholder);
				}
				$the.editors.inputEditor.setOption("mode", htmlmixed);
				$the.editors.outputEditor.setOption("mode", htmlmixed); */
				if(val === "CSS"){
					$the.editors.inputEditor.setOption("mode", "text/css");
					$the.editors.outputEditor.setOption("mode", "text/css");
				} else {
					$the.editors.inputEditor.setOption("mode", "text/html");
					$the.editors.outputEditor.setOption("mode", "text/html");
				}
				$the.editors.outputEditor.setOption("matchTags", {bothTags: true});
				$the.editors.outputEditor.setOption("extraKeys", {"Ctrl-J": "toMatchingTag"});
				
			}
			$("#prettify_options").removeClass("hidden");
			$("#configurations").addClass("hidden");
		} else if(val === "JS"){
			if($the.editors.use_editor){
				if($the.editors.inputEditor.getValue() === ""){
					$the.editors.inputEditor.setValue($placeholder);
				}
				$the.editors.inputEditor.setOption("mode", "javascript");
				$the.editors.outputEditor.setOption("mode", "javascript");
			} else {
				if($prettify_input.val() == "") $prettify_input.val($placeholder);
			}
			
			$("#configurations").removeClass("hidden");
			$("#prettify_options").addClass("hidden");
		} else if(val === "JSON"){
			if($the.editors.use_editor){
				if($the.editors.inputEditor.getValue() === ""){
					//$the.editors.inputEditor.setValue($placeholder);
				}
				$the.editors.inputEditor.setOption("mode", "javascript");
				$the.editors.outputEditor.setOption("mode", "javascript");
			} else {
				//if($prettify_input.val() == "") $prettify_input.val($placeholder);
			}
			
			$("#configurations").removeClass("hidden");
			$("#prettify_options").addClass("hidden");
		}
	});
	
	$prettify_ait.on("change",function(e){
		if($prettify_ait.get(0).checked || this.checked){
			//if($current_prettifier === "HTML") $prettify_input.on('input', html_prettify_update);//html_prettify_update(html_prettify_options())
			$the.editors.use_editor = true;
			$the.editors.use_codemirror = true;
			if($the.editors.use_codemirror){
				let $inputElem = $the.editors.inputEditor,
				$outputElem = $the.editors.outputEditor;
			} else {
				let $inputElem = $prettify_input,
				$outputElem = $prettify_output,
				source = $inputEditor.val();
			}
			
			if($current_prettifier === "HTML") {
				$inputElem.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(prettify_html_content($inputElem.getValue(), html_prettify_options())) : 
						$outputElem.val(prettify_html_content($inputElem.val(), html_prettify_options()));
				});
			} else if($current_prettifier === "JS") {
				$input.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(prettify_js_content($inputElem.getValue(), getConfig())) : 
						$outputElem.val(prettify_js_content($inputElem.val(), getConfig()));
				});
			} else if($current_prettifier === "JSON") {
				$input.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(prettify_json_content($inputElem.getValue())) : 
						$outputElem.val(prettify_json_content($inputElem.val()));
				});
			} else if($current_prettifier === "XML") {
				$input.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(prettify_xml_content($inputElem.getValue())) : 
						$outputElem.val(prettify_xml_content($inputElem.val()));
				});
			} else if($current_prettifier === "SQL") {
				$input.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(prettify_sql_content($inputElem.getValue())) : 
						$outputElem.val(prettify_sql_content($inputElem.val()));
				});
			}
		}
	});

	$("#prettify-select-text").on("click", function(e){
		let sel = $the.editors.outputEditor.getSelection();
		console.log(sel)
	});
	
	$prettifyBtn.on("click", function(e){
		let output = '/* no output! */', source = $the.editors.use_editor ? $the.editors.inputEditor.getValue() : $prettify_input.val(), val = ($prettify_file_type_select.val()).toUpperCase();
		try{
			$prettify_error.fadeOut("fast");
			$prettify_stats.fadeOut("fast");
			
			if($current_prettifier === "HTML" /* val === "HTML" */){
				output = prettify_html_content(source, html_prettify_options())
			} else if($current_prettifier === "CSS" /* val === "CSS" */){
				output = prettify_css_content(source);
			} else if($current_prettifier === "JS" /* val === "JS" */){
				output = prettify_js_content(source, getConfig());
			} else if($current_prettifier === "JSON" /* val === "JSON" */){
				output = prettify_json_content(source);
			} else if($current_prettifier === "XML" /* val === "XML" */){
				output = prettify_xml_content(source);
			} else if($current_prettifier === "SQL" /* val === "SQL" */){
				output = prettify_sql_content(source);
			}
			
			if($the.editors.use_editor){$the.editors.outputEditor.setValue(output);}
			else $prettify_output.val(output);
			$prettify_stats.fadeIn("fast").html(output.length + " bytes, increased " + ((1 - source.length / output.length) * 100 || 0).toFixed(2) + "%");
		} catch(e) {
			//$converter_error.html(e);
			if (e instanceof JS_Parse_Error) {
				// the options are actually okay, just the code that"s bad
				show_error(e, $prettify_input.val(), $prettify_error, $prettify_stats);
				return true;
			} else {
				//uglify_options = old_options;
				show_error(e, null, $prettify_error, $prettify_stats);
				return false;
			}
		}
	});
	
	// ------------------------- XML Prettify -------------------------
	function prettify_css_content(text) {
        var output = vkbeautify.css(text);
        return output;
    }
	
	// ------------------------- XML Prettify -------------------------
	function prettify_sql_content(text) {
        var output = vkbeautify.sql(text);
        return output;
    }
	
	// ------------------------- XML Prettify -------------------------
	function prettify_xml_content(text) {
        var output = vkbeautify.xml(text);
        return output;
    }
	
	// ------------------------- JSON Prettify -------------------------
	function prettify_json_content(text, options){
		options = options || {};
		//let jsonObj = JSON.parse(text);
		//let output = JSON.stringify(jsonObj, null, 2);
		var output = vkbeautify.json(text);
        
		return output;
	}
	
	// ------------------------ JS Prettify ---------------------------
	function getConfig() {
		return {
			arrays: {
				unpackArrays: document.getElementById('unpackArrays').checked,
				removeArrays: document.getElementById('removeArrays').checked
			},
			proxyFunctions: {
				replaceProxyFunctions: document.getElementById('replaceProxyFunctions').checked,
				removeProxyFunctions: document.getElementById('removeProxyFunctions').checked
			},
			expressions: {
				simplifyExpressions: document.getElementById('simplifyExpressions').checked
			},
			miscellaneous: {
				beautify: document.getElementById('beautify').checked,
				simplifyProperties: document.getElementById('simplifyProperties').checked
			}
		};
	}

	function prettify_js_content(text, options){
		options = options || getConfig();
		let output = deobfuscator.deobfuscate(text, options);
		
		/* var ast = UglifyJS.parse(text);
		ast.figure_out_scope();
		var output = ast.print_to_string({ beautify : true }); */
		
		return output;
	}
	
	function deobfuscate_js_content(text, options){
		options = options || getConfig();
		let output = deobfuscator.deobfuscate(text, options);
            
		return output;
	}
	
	// ----------------------- HTML Prettify --------------------------
	var defaultOptions = {
		"indent_inner_html": false,
		"indent_size": 4,
		"indent_char": " ",
		"indent_scripts":"normal", //"keep"|"separate"|"normal"
		"indent_handlebars": false,
		"wrap_line_length":250,
		"brace_style": "collapse",//"collapse" | "expand" | "end-expand" | "none"
		"unformatted": ["a", "sub", "sup", "b", "i", "u"],
		"preserve_newlines": true,
		"max_preserve_newlines": 5,
		"extra_liners": ["/html"]
	}
	
	$prettify_optionsForm.on('change', function () {
		//$prettify_output.val(html_beautify($prettify_input.val(), html_prettify_options()));
		html_prettify_update(html_prettify_options())
	});
	
	$prettify_optionsForm.on('input', function () {
		//$prettify_output.val(html_beautify($prettify_input.val(), html_prettify_options()));
		html_prettify_update(html_prettify_options())
	});
	
	function prettify_html_content(text, options){
		options = options || html_prettify_options();
		let output = html_beautify(text, options);
		
		return output;
	}
	
	function html_prettify_options(e){
		var opts = {}
		var select_inputs = $prettify_optionsForm[0].getElementsByTagName('select');
		var inputs = $prettify_optionsForm[0].getElementsByTagName('input');
		for(var i = 0; i < select_inputs.length; i++) {
			var input = select_inputs[i]
			opts[input.name] = input.value
		}
		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i]
			opts[input.name] = input.value
		}
		
		var options = extend(opts,defaultOptions)
		return options
	}
	
	function html_prettify_update(options){
		options = options || {};
		if($the.editors.use_editor){
			let source = $the.editors.inputEditor.getValue();
			let output = html_beautify(source, options);
			$the.editors.outputEditor.setValue(output);
		} else 
			$prettify_output.val(html_beautify($prettify_input.val(),options));
	}
	
	/* --------------------------------------- */
	var $minify_input = $('#minify_input'),
	$minify_output = $('#minify_output'),
	$minify_optionsForm = $('#minify_options'),
	
	$minifyBtn = $("#minifyButton"),
	
	$minify_file_type_select = $('#minify-file-type-select'),
	$minify_file_input_type = $('#minify-file-input-type'),
	$minify_file_output_type = $('#minify-file-output-type');
	
	var $minify_error = $("#minify-errors");
	$minify_error.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $minify_stats = $("#minify-stats");
	$minify_stats.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $minify_ait = $("#minify-cb-as-i-type");
	var $current_minifier = ($minify_file_type_select.val()).toUpperCase();
	
	$minify_file_type_select.on("change", function(e){
		let val = ($(this).val()).toUpperCase();
		
		$current_minifier = val;
		
		$minify_file_input_type.html(val);
		$minify_file_output_type.html(val);
		
		if(val === "HTML" || val === "CSS"){
			
		} else if(val === "JSON"){
			
		} else if(val === "JS"){
			//$("#minify-html-buttons").addClass("hidden");
			//$("header-link").onclick = go_to_start;
			//$js_minifyBtn.get(0).onclick = go;
			//$btn_options_show.get(0).onclick = show_options;
			$btn_options_save.onclick = set_options;
			$("btn-options-reset").onclick = reset_options;
			//$in.oninput = $in.onkeyup = $in.onblur = $in.onfocus = go_ait;
			$minify_ait.get(0).onclick = set_options_ait;
			//$out.onfocus = select_text;

			var default_options_text;
			set_options_initial();
		}
	});
	
	$minify_ait.on("change",function(e){
		if($minify_ait.get(0).checked || this.checked){
			//if($current_minifier === "HTML") $minify_input.on('input', html_minify_c);//html_minify_update(html_minify_options())
			$the.editors.use_codemirror = false;
			$the.editors.use_editor = false;
			
			if($the.editors.use_codemirror){
				let $inputElem = $the.editors.inputEditor,
				$outputElem = $the.editors.outputEditor;
			} else {
				let $inputElem = $minify_input,
				$outputElem = $minify_output,
				source = $inputEditor.val();
			}
			
			if($current_minifier === "HTML") {
				$inputElem.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(minify_html_content($inputElem.getValue())) : 
						$outputElem.val(minify_html_content($inputElem.val()));
				});
			} else if($current_minifier === "JS") {
				$input.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(minify_js_content($inputElem.getValue())) : 
						$outputElem.val(minify_js_content($inputElem.val()));
				});
			} else if($current_minifier === "JSON") {
				$input.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(minify_json_content($inputElem.getValue())) : 
						$outputElem.val(minify_json_content($inputElem.val()));
				});
			} else if($current_minifier === "XML") {
				$input.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(minify_xml_content($inputElem.getValue())) : 
						$outputElem.val(minify_xml_content($inputElem.val()));
				});
			} else if($current_minifier === "SQL") {
				$input.on('input', () => {
					$the.editors.use_codemirror ? 
						$outputElem.setValue(minify_sql_content($inputElem.getValue())) : 
						$outputElem.val(minify_sql_content($inputElem.val()));
				});
			}
		}
	});
	
	$minifyBtn.on("click", function(e){
		let output = '/* no output! */', 
		//source = $the.editors.use_editor ? $the.editors.inputEditor.getValue() : $minify_input.val(), 
		source = $minify_input.val(), 
		val = ($minify_file_type_select.val()).toUpperCase();
		
		try{
			$minify_error.fadeOut("fast");
			$minify_stats.fadeOut("fast");
			
			if($current_minifier === "HTML" /* val === "HTML" */){
				output = minify_html_content(source)
			} else if($current_minifier === "CSS" /* val === "CSS" */){
				output = minify_css_content(source);
			} else if($current_minifier === "JS" /* val === "JS" */){
				output = minify_js_content(source);
			} else if($current_minifier === "JSON" /* val === "JSON" */){
				output = minify_json_content(source);
			} else if($current_minifier === "XML" /* val === "XML" */){
				output = minify_xml_content(source);
			} else if($current_minifier === "SQL" /* val === "SQL" */){
				output = minify_sql_content(source);
			}
			
			/* if($the.editors.use_editor){$the.editors.outputEditor.setValue(output);}
			else  */$minify_output.val(output);
			$minify_stats.fadeIn("fast").html(output.length + " bytes, saved " + ((1 - output.length / source.length) * 100 || 0).toFixed(2) + "%");
		} catch(e) {
			//$converter_error.html(e);
			if (e instanceof JS_Parse_Error) {
				// the options are actually okay, just the code that"s bad
				show_error(e, $minify_input.val(), $minify_error, $minify_stats);
				return true;
			} else {
				//uglify_options = old_options;
				show_error(e, null, $minify_error, $minify_stats);
				return false;
			}
		}
	});
	
	function minify_json_content(){
		let text = $minify_input.val();
		try {
			JSON.parse(text);
		}
		catch (err) {
			throw new Error("Invalid JSON"); // re-throw to exceptionFn handler
		}
		// https://github.com/getify/JSON.minify/issues/40
		var output = JSON.minify(text + "\n");
		//var output = vkbeautify.jsonmin(text);
		
		//$minify_output.val(output);
		return output
	}
	
	function minify_html_content(){
		let output = html_minify($minify_input.val(), {collapseWhitespace:true/* ,minifyJS:true,minifyCSS:true */});
		//$minify_output.val(output);
		return output
	}

    function minify_xml_content(text) {
        var output = vkbeautify.xmlmin(text);
        return output;
    }
	
    function minify_css_content(text) {
        var output = vkbeautify.cssmin(text);
        return output;
    }
	
	function minify_sql_content(text) {
        var output = vkbeautify.sqlmin(text);
        return output;
    }
	
	/* var input = document.getElementById(\'input\')
	var output = document.getElementById(\'output\')
	input.addEventListener(\'input\', update)
	
	update() */
	
	//function update () {
	//	output.value = minify(input.value, {collapseWhitespace:true/* ,minifyJS:true,minifyCSS:true */});
	//}
	
	var default_options = {};
	// Handle the UI
	var uglify_options;
	var $options = $("#minify_options").get(0);
	var $out = $("#minify_output").get(0);
	var $in = $("#minify_input").get(0);
	var $error = $("#error");
	$error.fadeOut("fast");
	var $stats = $("#stats");
	$stats.fadeOut("fast");
	var $mbody = document.body;
	var $btn_options_show = $("#btn-options-show");
	var $btn_options_save = $("#btn-options-save").get(0);
	var $cb_as_i_type = $("#cb-as-i-type").get(0);

	$btn_options_show.click(function(e){
		e.preventDefault();
		let $target = $('#options-wrapper');
		if($target.length){
			//$target.toggleClass('showing');
			if($target.hasClass('showing')){
				$target.removeClass('showing').fadeOut('fast');
			} else {
				$target.addClass('showing').fadeIn('fast');
				$('html,body').animate({scrollTop: $target.offset().top-30}, 1000);
			}
		}
	});
	/* //$("header-link").onclick = go_to_start;
	$js_minifyBtn.get(0).onclick = go;
	//$btn_options_show.get(0).onclick = show_options;
	$btn_options_save.onclick = set_options;
	$("btn-options-reset").onclick = reset_options;
	$in.oninput = $in.onkeyup = $in.onblur = $in.onfocus = go_ait;
	$cb_as_i_type.onclick = set_options_ait;
	$out.onfocus = select_text;

	var default_options_text;
	set_options_initial(); */
	
	//var last_input;
	function minify_js_content(text, throw_on_error) {
        //var output = go(text);
        var output = '';
		var input = $minify_input.val();
		last_input = input;

		if (throw_on_error === true) {
			output = main();
		} else {
			try {
				output = main();
			} catch (e) {
				show_error(e, input);
			}
		}

		function main() {
			if (!input || input === $minify_input.get(0).textContent) {
				go_to_start();
				return;
			}

			var res = minify(input, uglify_options);
			if (res.error) {
				throw res.error;
			}

			$error.fadeOut("fast");
			//hide("s-info s-error");
			//show("s-output");
			//$out.value = res.code || "/* no output! */";
			$stats.fadeIn("fast").html(res.code.length + " bytes, saved " + ((1 - res.code.length / input.length) * 100 || 0).toFixed(2) + "%");
			return res.code || "/* no output! */";
		}
		
        return output;
    }
	
	function hide(class_name) {
		var names = class_name.split(" ");
		var cur = " " + $mbody.className + " ";
		for (var i = 0; i < names.length; i++) {
			while (cur.indexOf(" " + names[i] + " ") >= 0) {
				cur = cur.replace(" " + names[i] + " ", " ");
			}
		}
		$mbody.className = cur.replace(/^\s+|\s+$/g, "");
	}

	function show(class_name) {$mbody.className += " " + class_name;}
	function show_options(){show("s-options");hide("s-input");}
	function get_options(value) {/*jshint evil:true */return new Function("return (" + (value || $options.value) + ");")();}

	function set_options() {
		var old_options = uglify_options;
		try {
			uglify_options = get_options();

			// The options could be parsed. Try to update localStorage.
			try {
				if (default_options_text === $options.value)localStorage.removeItem("uglify-options");
				else localStorage.setItem("uglify-options", $options.value);
			} catch (e) {}

			// Run Uglify with the new options.
			go(true);
			show("s-input");
			hide("s-options");
			return true;
		} catch (e) {
			if (e instanceof JS_Parse_Error) {
				// the options are actually okay, just the code that"s bad
				show_error(e, $in.value);
				return true;
			} else {
				uglify_options = old_options;
				show_error(e);
				return false;
			}
		}
	}
	
	function reset_options() {$options.value = default_options_text;set_options();}
	function set_options_ait() {
		try {
			if ($cb_as_i_type.checked)
				localStorage.removeItem("uglify-options-disable-ait");
			else
				localStorage.setItem("uglify-options-disable-ait", 1);
		} catch (e) {}
	}

	function set_options_initial() {
		default_options_text = $options.textContent || $options.innerText;
		default_options = get_options(default_options_text);

		// If there are options saved with localStorage, load them now.
		try {
			var options_text = localStorage.getItem("uglify-options");
			if (options_text) {
				$options.value = options_text;
			}
			$cb_as_i_type.checked = !localStorage.getItem("uglify-options-disable-ait");
		} catch (e) {}

		try {
			uglify_options = get_options();
		} catch (e) {
			// if it didn"t work, reset the textarea
			$options.value = default_options_text;
			uglify_options = default_options;
		}
	}

	function encodeHTML(str) {return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");}

	var last_input;
	function go(throw_on_error) {
		var input = $in.value;
		last_input = input;

		if (throw_on_error === true) {
			main();
		} else {
			try {
				main();
			} catch (e) {
				show_error(e, input);
			}
		}

		function main() {
			if (!input || input === $in.textContent) {
				go_to_start();
				return;
			}

			var res = minify(input, uglify_options);
			if (res.error) {
				throw res.error;
			}

			$error.fadeOut("fast");
			//hide("s-info s-error");
			//show("s-output");
			$out.value = res.code || "/* no output! */";
			$stats.fadeIn("fast").html(res.code.length + " bytes, saved " + ((1 - res.code.length / input.length) * 100 || 0).toFixed(2) + "%");
		}
	}

	// As I type (AIT) functionality. Spend at least half of the time idle.
	var ait_timeout;
	var ait_last_duration = 50;
	function go_ait() {
		if (!$cb_as_i_type.checked) return;

		var input = $in.value;
		if (input === last_input) return;

		last_input = input;
		clearTimeout(ait_timeout);
		ait_timeout = setTimeout(function () {
			var start = new Date();
			go();
			ait_last_duration = new Date() - start;
		}, ait_last_duration);
	}

	function show_error(e, param, errorElem, statsElem) {
		let $errorElem = errorElem || $error || $('<div/>',{id:'error','class':'error-element'}), 
		$statsElem = statsElem || $stats || $('<div/>',{id:'stats','class':'stats-element'});
		
		console.error("Error", e);
		//hide("s-info s-output");
		//show("s-error");
		//$stats.fadeOut("fast");
		//$error.fadeIn("fast");
		$statsElem.fadeOut("fast");
		$errorElem.fadeIn("fast");
		if (e instanceof JS_Parse_Error) {
			var input = param;
			var lines = input.split("\n");
			var line = lines[e.line - 1];
			e = "Parse error: <strong>" + encodeHTML(e.message) + "</strong>\n" +
				"<small>Line " + e.line + ", column " + (e.col + 1) + "</small>\n\n" +
				(lines[e.line-2] ? (e.line - 1) + ": " + encodeHTML(lines[e.line-2]) + "\n" : "") +
				e.line + ": " +
					encodeHTML(line.substr(0, e.col)) +
					"<mark>" + encodeHTML(line.substr(e.col, 1) || " ") + "</mark>" +
					encodeHTML(line.substr(e.col + 1)) + "\n" +
				(lines[e.line] ? (e.line + 1) + ": " + encodeHTML(lines[e.line]) : "");
		} else if (e instanceof Error) {
			e = e.name + ": <strong>" + encodeHTML(e.message) + "</strong>";
		} else {
			e = "<strong>" + encodeHTML(e) + "</strong>";
		}
		//$error.html(e);
		$errorElem.html(e);
	}

	function go_to_start() {
		clearTimeout(ait_timeout);
		//hide("s-options s-error s-output");
		//show("s-input s-info");
		$stats.fadeOut("fast");
		$error.fadeOut("fast");
		return false;
	}
	
	/* -------------------------------------------------------------------- */
	var $converter_input = $('#converter_input'),
	$converter_output = $('#converter_output'),
	$converter_optionsForm = $('#converter_options'),
	$html_to_md_optionsForm = $('#html-to-md-options'),
	
	$converterBtn = $("#converterButton"),
	
	$converter_file_type_select = $('#converter-file-type-select'),
	$converter_file_input_type = $('#converter-file-input-type'),
	$converter_file_output_type = $('#converter-file-output-type');
	
	var $converter_error = $("#converter-errors");
	$converter_error.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $converter_stats = $("#converter-stats");
	$converter_stats.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $convert_ait = $("#converter-cb-as-i-type");
	var $current_converter = ($converter_file_type_select.val()).toUpperCase();
	
	$converter_file_type_select.on("change", function(e){
		let val = ($(this).val()).toUpperCase();
		$current_converter = val;
		
		$converter_file_input_type.html(val);
		$converter_file_output_type.html(val);
		
		if(val === "HTML-TO-MARKDOWN"){
			
		}
	});

	$html_to_md_optionsForm.on('change', function () {
		//turndownService = new window.TurndownService(html_to_md_options())
		$converter_output.val(html_to_md_converter());
	});
	
	/* $convert_ait.on('change', function () {
		if($convert_ait.get(0).checked || this.checked){
			$the.editors.use_codemirror = false;
			$the.editors.use_editor = false;
			
			if($the.editors.use_codemirror){
				let $inputElem = $the.editors.inputEditor,
				$outputElem = $the.editors.outputEditor;
			} else {
				let $inputElem = $converter_input,
				$outputElem = $converter_output,
				source = $inputEditor.val();
			}
			
			if($current_converter === "HTML-TO-MARKDOWN") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(html_to_md_converter($inputElem.getValue(), html_to_md_options())) : 
							$outputElem.val(html_to_md_converter($inputElem.val(), html_to_md_options()));
				});
			} else if($current_converter === "MARKDOWN-TO-HTML") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(md_to_html_converter($inputElem.getValue())) : 
							$outputElem.val(md_to_html_converter($inputElem.val()));
				});
			} else if($current_converter === "HTML-TO-JADE") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(html_to_jade_converter($inputElem.getValue())) : 
							$outputElem.val(html_to_jade_converter($inputElem.val()));
				});
			} else if($current_converter === "JSON-ESCAPE") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(json_escape_converter($inputElem.getValue())) : 
							$outputElem.val(json_escape_converter($inputElem.val()));
				});
			} else if($current_converter === "JSON-TO-BASE64") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(json_to_base64_converter($inputElem.getValue())) : 
							$outputElem.val(json_to_base64_converter($inputElem.val()));
				});
			} else if($current_converter === "JSON-TO-TEXT") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(json_to_text_converter($inputElem.getValue())) : 
							$outputElem.val(json_to_text_converter($inputElem.val()));
				});
			} else if($current_converter === "JSON-TO-XML") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(json_to_xml_converter($inputElem.getValue())) : 
							$outputElem.val(json_to_xml_converter($inputElem.val()));
				});
			} else if($current_converter === "JSON-TO-YAML") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(json_to_yaml_converter($inputElem.getValue())) : 
							$outputElem.val(json_to_yaml_converter($inputElem.val()));
				});
			} else if($current_converter === "YAML-TO-CSV") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(yaml_to_csv_converter($inputElem.getValue())) : 
							$outputElem.val(yaml_to_csv_converter($inputElem.val()));
				});
			} else if($current_converter === "YAML-TO-XML") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(yaml_to_xml_converter($inputElem.getValue())) : 
							$outputElem.val(yaml_to_xml_converter($inputElem.val()));
				});
			} else if($current_converter === "YAML-TO-JSON") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(yaml_to_json_converter($inputElem.getValue())) : 
							$outputElem.val(yaml_to_json_converter($inputElem.val()));
				});
			} else if($current_converter === "HEX-TO-RGB") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(hex_to_rgb_converter($inputElem.getValue())) : 
							$outputElem.val(hex_to_rgb_converter($inputElem.val()));
				});
			} else if($current_converter === "RGB-TO-HEX") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(rgb_to_hex_converter($inputElem.getValue())) : 
							$outputElem.val(rgb_to_hex_converter($inputElem.val()));
				});
			}
		}
	}); */
	
	$converterBtn.on("click", function(e){
		let output = '/* no output! */', source = $converter_input.val(), val = ($converter_file_type_select.val()).toUpperCase();
		try{
			$converter_error.fadeOut("fast");
			$converter_stats.fadeOut("fast");
			
			if($current_converter === "HTML-TO-MARKDOWN" /* val === "HTML-TO-MARKDOWN" */){
				//var turndownService = new window.TurndownService(html_to_md_options())
				output = html_to_md_converter(source, html_to_md_options());
			} else if($current_converter === "MARKDOWN-TO-HTML" /* val === "MARKDOWN-TO-HTML" */){
				output = md_to_html_converter(source);
			} else if($current_converter === "HTML-TO-JADE" /* val === "HTML-TO-JADE" */){
				output = html_to_jade_converter(source);
			} else if($current_converter === "JSON-ESCAPE" /* val === "JSON-ESCAPE" */){
				output = json_escape_converter(source);
			} else if($current_converter === "JSON-TO-XML" /* val === "JSON-TO-XML" */){
				output = json_to_xml_converter(source);
			} else if($current_converter === "JSON-TO-TEXT" /* val === "JSON-TO-TEXT" */){
				output = json_to_text_converter(source);
			} else if($current_converter === "JSON-TO-BASE64" /* val === "JSON-TO-BASE64" */){
				output = json_to_base64_converter(source);
			} else if($current_converter === "JSON-TO-YAML" /* val === "JSON-TO-YAML" */){
				output = json_to_yaml_converter(source);
			} else if($current_converter === "YAML-TO-CSV" /* val === "YAML-TO-CSV" */){
				output = yaml_to_csv_converter(source);
			} else if($current_converter === "YAML-TO-JSON" /* val === "YAML-TO-JSON" */){
				output = yaml_to_json_converter(source);
			} else if($current_converter === "YAML-TO-XML" /* val === "YAML-TO-XML" */){
				output = yaml_to_xml_converter(source);
			} else if($current_converter === "HEX-TO-RGB" /* val === "HEX-TO-RGB" */){
				output = hex_to_rgb_converter(source);
			} else if($current_converter === "RGB-TO-HEX" /* val === "RGB-TO-HEX" */){
				output = rgb_to_hex_converter(source);
			} else if($current_converter === "MILES-TO-KM" /* val === "MILES-TO-KM" */){
				output = miles_to_km_converter(source);
			} else if($current_converter === "KM-TO-MILES" /* val === "KM-TO-MILES" */){
				output = km_to_miles_converter(source);
			} else if($current_converter === "LBS-TO-KG" /* val === "LBS-TO-KG" */){
				output = lbs_to_kg_converter(source);
			} else if($current_converter === "KG-TO-LBS" /* val === "KG-TO-LBS" */){
				output = kg_to_lbs_converter(source);
			} else if($current_converter === "RAD-TO-DEG" /* val === "RAD-TO-DEG" */){
				output = rad_to_deg_converter(source);
			} else if($current_converter === "DEG-TO-RAD" /* val === "DEG-TO-RAD" */){
				output = deg_to_rad_converter(source);
			} else if($current_converter === "CEL-TO-FAR" /* val === "CEL-TO-FAR" */){
				output = cel_to_far_converter(source);
			} else if($current_converter === "FAR-TO-CEL" /* val === "FAR-TO-CEL" */){
				output = far_to_cel_converter(source);
			} else if($current_converter === "SECONDS-TO-HMS" /* val === "SECONDS-TO-HMS" */){
				output = seconds_to_hms_converter(source);
			} else if($current_converter === "HMS-TO-SECONDS" /* val === "HMS-TO-SECONDS" */){
				output = hms_to_seconds_converter(source);
			}
			
			$converter_output.val(output);
			
			//$converter_stats.fadeIn("fast").html(output.length + " bytes, saved " + ((1 - output.length / source.length) * 100 || 0).toFixed(2) + "%");
		} catch(e) {
			//$converter_error.html(e);
			if (e instanceof JS_Parse_Error) {
				// the options are actually okay, just the code that"s bad
				show_error(e, $converter_input.val(), $converter_error, $converter_stats);
				return true;
			} else {
				//uglify_options = old_options;
				show_error(e, null, $converter_error, $converter_stats);
				return false;
			}
		}
	});
	
	
	function json_to_yaml_converter(text) {
		try {
			var parsed = JSON.parse(text);
		}
		catch (err) {
			throw new Error("Invalid JSON"); // rethrow for exceptionFn
		}

		return YAML.stringify(parsed);
	}
	
	function json_to_xml_converter(text) {
		try {
			var parsed = JSON.parse(text);
		}
		catch (err) {
			throw new Error("Invalid JSON"); // rethrow for exceptionFn
		}
		var converted = vkbeautify.xml(json2xml(parsed));
		return converted;
	}
	
	function json_to_text_converter(text) {
		try {
			var parsed = JSON.parse(text);
		}
		catch (err) {
			throw new Error("Invalid JSON"); // rethrow for exceptionFn
		}

		return jsonToText(parsed);
	}
	
	function json_to_base64_converter(text) {
        var bytes = [];
        for (var i = 0; i < text.length; i++) {
            var realBytes = unescape(encodeURIComponent(text[i]));
            for (var j = 0; j < realBytes.length; j++) {
                bytes.push(realBytes[j].charCodeAt(0));
            }
        }
        var B64 = new Base64Thing;
        var encoded = B64.uint8ToBase64(bytes);
        return encoded;
    }
	
	function json_escape_converter(text) {
		// validate if text parses, if it doesnt this will throw an exception
		JSON.parse(text);

		text = text.replace(/[\\]/g, '\\\\');
		text = text.replace(/[\/]/g, '\\/');
		text = text.replace(/[\b]/g, '\\b');
		text = text.replace(/[\f]/g, '\\f');
		text = text.replace(/[\n]/g, '\\n');
		text = text.replace(/[\r]/g, '\\r');
		text = text.replace(/[\t]/g, '\\t');
		text = text.replace(/[\"]/g, '\\"');
		return text;
	}
	
	function yaml_to_json_converter(text) {
		try {
			var jsonObj = YAML.parse(text);
		}
		catch (err) {
			throw new Error("Invalid YAML"); // rethrow for exceptionFn
		}

		return JSON.stringify(jsonObj, 0, 2);
	}
	
	function yaml_to_xml_converter(text) {
		// first convert yaml to json

		try {
			var jsonObj = YAML.parse(text);
		}
		catch (err) {
			throw new Error("Invalid YAML"); // rethrow for exceptionFn
		}

		// then convert json to xml
		return vkbeautify.xml(json2xml(jsonObj));
	}
	
	
	function yaml_to_csv_converter(text) {
		// first convert yaml to json

		try {
			var jsonObj = YAML.parse(text);
		}
		catch (err) {
			throw new Error("Invalid YAML"); // rethrow for exceptionFn
		}

		// then convert json to csv
		var converted = json2csv({
			data : jsonObj
		});

		return converted
	}
	
	function html_to_jade_converter(text, asyncResultFn) {
		Html2Jade.convertHtml(text, null, function (err, ret) {
			if (err) {
				throw new Error(err.toString());
			}
			asyncResultFn(ret);
		});
	}
	/* asyncResultFn : function (result) {
		$('#html-to-jade-text').val(result);
	} */
	
	function hex_to_rgb_converter(text) {
		$('#converter-errors').fadeOut("fast");

		var lines = text.split('\n');
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			if (line.length == 0) {
				ret += '\n';
				continue;
			}
			line = line.replace(/\s+/g, "");
			line = line.replace(/^#/, "");
			if (line.length == 3) {
				var r = line[0].toString() + line[0].toString();
				var g = line[1].toString() + line[1].toString();
				var b = line[2].toString() + line[2].toString();
			}
			else if (line.length == 6) {
				var r = line[0].toString() + line[1].toString();
				var g = line[2].toString() + line[3].toString();
				var b = line[4].toString() + line[5].toString();
			}
			else {
				$('#converter-errors').text("Invalid Hex value. Should be #RRGGBB or #RGB").fadeIn("fast");
				return text;
			}

			var rDec = parseInt(r,16);
			var gDec = parseInt(g,16);
			var bDec = parseInt(b,16);

			if (isNaN(rDec)) {
				$('#converter-errors').text("Invalid RED value").fadeIn("fast");
				return text;
			}
			else if (isNaN(gDec)) {
				$('#converter-errors').text("Invalid GREEN value").fadeIn("fast");
				return text;
			}
			else if (isNaN(bDec)) {
				$('#converter-errors').text("Invalid BLUE value").fadeIn("fast");
				return text;
			}

			ret += lines[i] + ' rgb(' + rDec + ', ' + gDec + ', ' + bDec + ')\n';
		}
		
		return ret;
	}

    function rgb_to_hex_converter(text) {
		//$('#action-error').hide();

		var lines = text.split('\n');
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			if (line.length == 0) {
				ret += '\n';
				continue;
			}
			line = line.replace(/,/g, " ");
			line = line.replace(/\./g, " ");
			var m = line.match(/(\d+)\s+(\d+)\s+(\d+)/);
			if (m) {
				var r = parseInt(m[1],10);
				var g = parseInt(m[2],10);
				var b = parseInt(m[3],10);

				var rHex = r.toString(16);
				if (rHex.length == 1) {
					rHex = "0" + rHex;
				}
				var gHex = g.toString(16);
				if (gHex.length == 1) {
					gHex = "0" + gHex;
				}
				var bHex = b.toString(16);
				if (bHex.length == 1) {
					bHex = "0" + bHex;
				}

				ret += lines[i] + ' #' + rHex + gHex + bHex + "\n";
				continue;
			} else {
				$('#converter-errors').text("Invalid color on line " + (i+1)).fadeIn("fast");
				return text;
			}
		}
		return ret;
	}
	
	function miles_to_km_converter(text) {
		var lines = text.split("\n");
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var miles = parseFloat(line);
			if (miles == NaN) {
				ret += line + "\n";
			}
			else {
				var km = miles * 1.609344;
				ret += km.toFixed(4) + "\n";
			}
		}
		return ret;
	}

	function km_to_miles_converter(text) {
		var lines = text.split("\n");
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var km = parseFloat(line);
			if (km == NaN) {
				ret += line + "\n";
			}
			else {
				var miles = km / 1.609344;
				ret += miles.toFixed(4) + "\n";
			}
		}
		return ret;
	}

	function cel_to_far_converter(text) {
		var lines = text.split("\n");
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var c = parseFloat(line);
			if (c == NaN) {
				ret += line + "\n";
			}
			else {
				var f = c * 1.8 + 32;
				ret += f.toFixed(4) + "\n";
			}
		}
		return ret;
	}

	function far_to_cel_converter(text) {
		var lines = text.split("\n");
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var f = parseFloat(line);
			if (f == NaN) {
				ret += line + "\n";
			}
			else {
				var c = (f - 32)/1.8;
				ret += c.toFixed(4) + "\n";
			}
		}
		return ret;
	}

	function deg_to_rad_converter(text) {
		var lines = text.split("\n");
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var deg = parseFloat(line);
			if (deg == NaN) {
				ret += line + "\n";
			}
			else {
				var rad = deg * Math.PI / 180;
				ret += rad.toFixed(4) + "\n";
			}
		}
		return ret;
	}

	function rad_to_deg_converter(text) {
		var lines = text.split("\n");
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var rad = parseFloat(line);
			if (rad == NaN) {
				ret += line + "\n";
			}
			else {
				var deg = rad * 180 / Math.PI;
				ret += deg.toFixed(4) + "\n";
			}
		}
		return ret;
	}

	function kg_to_lbs_converter(text) {
		var lines = text.split("\n");
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var kg = parseFloat(line);
			if (kg == NaN) {
				ret += line + "\n";
			}
			else {
				var lbs = kg * 2.2046226218;
				ret += lbs.toFixed(4) + "\n";
			}
		}
		return ret;
	}

	function lbs_to_kg_converter(text) {
		var lines = text.split("\n");
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var lbs = parseFloat(line);
			if (lbs == NaN) {
				lbs += line + "\n";
			}
			else {
				var kg = lbs / 2.2046226218;
				ret += kg.toFixed(4) + "\n";
			}
		}
		return ret;
	}
	
	function seconds_to_hms_converter(text) {
		text = text.replace(/\r\n/g, '\n');
		var lines = text.split('\n');
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			if (/(\d+)/.test(line)) {
				var seconds = line;

				var hours = Math.floor(seconds / 3600);
				var minutes = Math.floor(seconds / 60);
				var seconds = seconds % 60;

				ret += hours + ':' + minutes + ':' + seconds;
			}
			else {
				ret += line;
			}
			ret += '\n';
		}

		return ret;
	}
	
	function hms_to_seconds_converter(text) {
		text = text.replace(/\r\n/g, '\n');
		var lines = text.split('\n');
		var ret = '';
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			if (/(\d+)/.test(line)) {
				var parts = line.split(':');
				var hours = parseInt(parts[0], 10);
				var minutes = parseInt(parts[1], 10);
				var seconds = parseInt(parts[2], 10);
				ret += (hours*3600 + minutes*60 + seconds).toString();
			}
			else {
				ret += line;
			}
			ret += '\n';
		}

		return ret;
	}
	
	function md_to_html_converter (text) {
		let output;
		
		return output;
	}
	
	/* 
	function html_to_md_converter () {
		var turndownService = new window.TurndownService(html_to_md_options())
		// strip leading whitespace so it isn\'t evaluated as code
		var leadingWs = $converter_input[0].value.match(/^\n?(\s*)/)[1].length,
		leadingTabs = $converter_input[0].value.match(/^\n?(\t*)/)[1].length;
		if( leadingTabs > 0 ) {
			var text = $converter_input[0].value.replace( new RegExp('\n?\t{' + leadingTabs + '}','g'), '\n' );
		} else if( leadingWs > 1 ) {
			var text = $converter_input[0].value.replace( new RegExp('\n? {' + leadingWs + '}','g'), '\n' );
		} else var text = $converter_input[0].value;
		text = turndownService.turndown(text);
		
		//$converter_output[0].value = turndownService.turndown(text);
		//output.value = toMarkdown($converter_input[0].value);
		
		return text
	}
	 */
	function html_to_md_converter (text, options) {
		options = options || html_to_md_options()
		var turndownService = new window.TurndownService(options);
		// strip leading whitespace so it isn\'t evaluated as code
		var leadingWs = text.match(/^\n?(\s*)/)[1].length,
		leadingTabs = text.match(/^\n?(\t*)/)[1].length;
		
		if( leadingTabs > 0 ) {
			var output = text.replace( new RegExp('\n?\t{' + leadingTabs + '}','g'), '\n' );
		} else if( leadingWs > 1 ) {
			var output = text.replace( new RegExp('\n? {' + leadingWs + '}','g'), '\n' );
		} else var output = text || $converter_input[0].value;
		
		output = turndownService.turndown(output);
		
		//$converter_output[0].value = turndownService.turndown(output);
		//output.value = toMarkdown($converter_input[0].value);
		
		return output
	}
	
	function html_to_md_options () {
		var opts = {}
		var inputs = $html_to_md_optionsForm[0].getElementsByTagName('select')
		for (var i = 0; i < inputs.length; i++) {
			var input = inputs[i]
			opts[input.name] = input.value
		}
		return opts
	}
	
	/* -------------------------------------------------------------------- */
	const validConvOps = ["IMAGE-TO-BASE64",/* "FILE-TO-BASE64", */"JPG-TO-PNG","PNG-TO-JPG","GIF-TO-JPG","GIF-TO-PNG","BMP-TO-JPG","BMP-TO-PNG"];
	
	var selectedFile;
	var opts = {
		input: {inputMime : 'image/jpeg',inputHumanFormat : 'JPEG'},
        output: {outputMime : 'image/png',outputExt : 'png'}
	}
	var $image_converters_input = $('#image-converters_input'),
	$image_converters_output = $('#image-converters_output'),
	$image_converters_file_select = $('#image-converters-file-select'),
	$image_converters_options_wrapper = $('#image-converters-options-wrapper'),
	$image_converters_optionsForm = $('#image-converters-options'),
	
	$image_convertersBtn = $("#image-converters-submit"),
	$image_converters_saveBtn = $("#image-converters-save"),
	
	$image_converters_file_type_select = $('#image-converters-file-type-select'),
	$image_converters_file_input_type = $('#image-converters-file-input-type'),
	$image_converters_file_output_type = $('#image-converters-file-output-type'),
	
	$image_converters_output_wrapper = $("#image-converters-output");
	$image_converters_display = $("#image-converters-display");
	
	var $image_converters_error = $("#image-converters-errors") || $("#image-converters-action-error");
	$image_converters_error.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $image_converters_stats = $("#image-converters-stats") || $("#image-converters-action-stats");
	$image_converters_stats.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $current_image_converter = ($image_converters_file_type_select.val()).toUpperCase();
	
	// -----------------------------------------------------------
	$image_converters_output_wrapper.slideUp();
	
	$image_converters_file_type_select.on("change", function(e){
		let val = ($(this).val()).toUpperCase();
		$current_image_converter = val;
		
		$image_converters_file_input_type.html(val);
		$image_converters_file_output_type.html(val);
		
		if(val === "IMAGE-TO-BASE64" || val === "FILE-TO-BASE64"){
			
		} else if(val === "JPG-TO-PNG"){
			opts = {
				input: {inputMime : 'image/jpeg',inputHumanFormat : 'JPEG'},
				output: {outputMime : 'image/png',outputExt : 'png'}
			}
		} else if(val === "PNG-TO-JPG"){
			opts = {
				input: {inputMime : 'image/png',inputHumanFormat : 'PNG'},
				output: {outputMime : 'image/jpeg',outputExt : 'jpeg'}
			}
		} else if(val === "GIF-TO-PNG"){
			opts = {
				input: {inputMime : 'image/gif',inputHumanFormat : 'GIF'},
				output: {outputMime : 'image/png',outputExt : 'png'}
			}
		} else if(val === "GIF-TO-JPG"){
			opts = {
				input: {inputMime : 'image/gif',inputHumanFormat : 'GIF'},
				output: {outputMime : 'image/jpeg',outputExt : 'jpeg'}
			}
		} else if(val === "BMP-TO-PNG"){
			opts = {
				input: {inputMime : 'image/bmp',inputHumanFormat : 'BMP'},
				output: {outputMime : 'image/png',outputExt : 'png'}
			}
		} else if(val === "BMP-TO-JPG"){
			opts = {
				input: {inputMime : 'image/bmp',inputHumanFormat : 'BMP'},
				output: {outputMime : 'image/jpeg',outputExt : 'jpeg'}
			}
		} else {
			$image_convertersBtn.attr('disabled',true);
			$image_converters_saveBtn.attr({title:'','disabled':true});
		}
	});

	$image_converters_optionsForm.on('change', function () {
		//$image_converters_output.val();
	});
	
	// make drag & drop work
	$('#image-converters-drag-and-drop').on('dragover', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#image-converters-drag-and-drop').addClass('hover');
	});
	
	$('#image-converters-drag-and-drop').on('dragenter', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#image-converters-drag-and-drop').addClass('hover');
	});
	
	$('#image-converters-drag-and-drop').on('dragleave', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#image-converters-drag-and-drop').removeClass('hover');
	});
	
	$('#image-converters-drag-and-drop').on('dragend', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#image-converters-drag-and-drop').removeClass('hover');
	});
	
	$('#image-converters-drag-and-drop').on('drop', function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$('#image-converters-drag-and-drop').removeClass('hover');
		$image_converters_error.hide();
		ev.dataTransfer = ev.originalEvent.dataTransfer;
		var file = ev.dataTransfer.files[0];
		var base64_op = ($current_image_converter === "IMAGE-TO-BASE64" || $current_image_converter === "FILE-TO-BASE64")
			
		if (!base64_op && file.type != opts.input.inputMime) {
			$image_converters_error.show().text("Selected file is not a " + opts.input.inputHumanFormat);
			return;
		}
		if(_.inArray($current_image_converter,validConvOps)) $image_convertersBtn.removeAttr('disabled');
		$('#image-converters-drag-and-drop-selected').html("Selected " + printFileInfo(file));
		selectedFile = file;
	});

	// make file selector work
	$image_converters_file_select.on('change', function (ev) {
		$image_converters_error.hide();
		var file = ev.target.files[0];
		var base64_op = ($current_image_converter === "IMAGE-TO-BASE64" || $current_image_converter === "FILE-TO-BASE64")
			
		if (!base64_op && file.type != opts.input.inputMime) {
			$image_converters_error.show().text("Selected file is not a " + opts.input.inputHumanFormat);
			return;
		}
		if(_.inArray($current_image_converter,validConvOps)) $image_convertersBtn.removeAttr('disabled');
		$('#image-converters-drag-and-drop-selected').html("Selected " + printFileInfo(file));
		selectedFile = file;
	});
	
	$image_convertersBtn.on("click", function(e){
		//console.log(opts);
		//return;
		try{
			let output = '/* no output! */', source = $image_converters_input.val(), val = ($image_converters_file_type_select.val()).toUpperCase();
			
			$image_converters_error.fadeOut("fast");
			$image_converters_stats.fadeOut("fast");
			
			if($current_image_converter === "IMAGE-TO-BASE64" /* val === "IMAGE-TO-BASE64" */ || $current_image_converter === "FILE-TO-BASE64" /* val === "FILE-TO-BASE64" */){
				if (accept.image.indexOf(selectedFile.type) > -1 ||  /\.(jpe?g|png|gif|webp|jfif|avif)$/i.test(selectedFile.name) || r_imFilter.test(selectedFile.type) ) {
					var reader = new FileReader();
					reader.onload = function () {
						var ext = _.ext(selectedFile.name), mime = selectedFile.type;
						if(mime === "" || mime === undefined){
							mime = $_mimeTypes[ext] ? $_mimeTypes[ext] : "image/jpeg";
						}
						// reader result
						var comma = reader.result.indexOf(',');
						var base64 = reader.result.substr(comma+1);
						
						$image_converters_output.val(base64);
						$image_converters_output_wrapper.slideDown();
						//$('#image-converters-output').slideDown();
						//data:image/svg+xml;base64,
						if($current_image_converter === "IMAGE-TO-BASE64") $image_converters_display.append(`<img src="data:${mime};base64,${base64}" alt="${selectedFile.name}" />`);
						else if($current_image_converter === "FILE-TO-BASE64") $image_converters_display.append(`<iframe src="data:${mime};base64,${base64}" alt="${selectedFile.name}"></iframe>`);
						//$image_converters_stats.fadeIn("fast").html(output.length + " bytes, saved " + ((1 - output.length / source.length) * 100 || 0).toFixed(2) + "%");
					}
					reader.readAsDataURL(selectedFile);
				} else show_error(`Invalid image file or invalid image type : ==> [image: ${selectedFile.name}],[mime-type: ${selectedFile.type}]`, null, $image_converters_error, $image_converters_stats);
			} else if($current_image_converter === "JPG-TO-PNG" || $current_image_converter === "PNG-TO-JPG" || $current_image_converter === "GIF-TO-JPG" || $current_image_converter === "GIF-TO-PNG" || $current_image_converter === "BMP-TO-JPG" || $current_image_converter === "BMP-TO-PNG"){
				var reader = new FileReader();
				reader.onload = function (){
					var quality = 1.0, ext = _.ext(selectedFile.name), mime = selectedFile.type;
					if(mime === '' || mime === undefined){
						mime = $_mimeTypes[ext] ? $_mimeTypes[ext] : "image/jpeg";
					}
					
					var lastDot = selectedFile.name.lastIndexOf('.');
					if (lastDot != -1) {
						var outputFileName = selectedFile.name.substring(0, lastDot) + '.' + opts.output.outputExt;
					} else {
						var outputFileName = selectedFile.name + '.' + opts.optput.outputExt;
					}
					
					var img = new Image;
					
					img.onload = function (){
						var canvas = $('<canvas>')[0];
						canvas.width = img.width;
						canvas.height = img.height;
						var canvasCtx = canvas.getContext('2d');
						canvasCtx.drawImage(img, 0, 0);
						var dataURL = canvas.toDataURL(mime, quality);
						
						//canvas.toBlob(blobHandler, opts.output.outputMime);
						$image_converters_display.append(`<img src="${dataURL}" alt="${selectedFile.name}" />`);
						$image_converters_saveBtn
							.removeAttr('disabled').attr("title",`Save image as ${outputFileName}`)
							.click(function(e){
								_.downloadImage(dataURL, outputFileName)
							});
					}
					
					img.src = reader.result;
					
					//$image_converters_display.append(img);
					$image_converters_stats.fadeIn("fast").html(`The file <strong>${selectedFile.name}</strong> was converted to <strong>${outputFileName}</strong>`);
					//$image_converters_stats.fadeIn("fast").html(output.length + " bytes, saved " + ((1 - output.length / source.length) * 100 || 0).toFixed(2) + "%");
				}
				reader.readAsDataURL(selectedFile);
			}
		} catch(e) {
			//$image_converters_error.html(e);
			if (e instanceof JS_Parse_Error) {
				// the options are actually okay, just the code that"s bad
				show_error(e, $image_converters_input.val(), $image_converters_error, $image_converters_stats);
				return true;
			} else {
				//uglify_options = old_options;
				show_error(e, null, $image_converters_error, $image_converters_stats);
				return false;
			}
		}
	});
		
	/* -------------------------------------------------------------------- */
	
	var $selectedReadFiles;
	var $file_reader_input = $('#file-reader_input'),
	$file_reader_output = $('#file-reader_output'),
	$file_reader_file_select = $('#file-reader-file-select'),
	$file_reader_options_wrapper = $('#file-reader-options-wrapper'),
	$file_reader_optionsForm = $('#file-reader-options'),
	
	$file_readerBtn = $("#file-reader-submit"),
	$file_reader_saveBtn = $("#file-reader-save"),
	
	$file_reader_file_type_select = $('#file-reader-file-type-select'),
	$file_reader_file_input_type = $('#file-reader-file-input-type'),
	$file_reader_file_output_type = $('#file-reader-file-output-type'),
	
	$file_reader_output_wrapper = $("#file-reader-output"),
	$file_reader_display = $("#file-reader-display"),
	
	$file_reader_error = $("#file-reader-errors") || $("#file-reader-action-error"),
	$file_reader_stats = $("#file-reader-stats") || $("#file-reader-action-stats"),
	
	$current_file_reader_op = ($file_reader_file_type_select.val()).toUpperCase();
	
	// -----------------------------------------------------------
	$file_reader_error.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	$file_reader_stats.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	$file_reader_output_wrapper.slideUp();
	$file_reader_display.slideUp();
	
	$file_reader_file_type_select.on("change", function(e){
		let val = ($(this).val()).toUpperCase();
		$current_file_reader_op = val;
		
		$file_reader_file_input_type.html(val);
		$file_reader_file_output_type.html(val);
	});
	
	mkDNDTool(
		"file-reader", 
		function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			
			var files = ev.target.files, file = ev.target.files[0], i=0, file_info = '', recommendations = '', title = 'read the file'+(files.length>1?'':'s');
			
			//$selectedReadFiles = file;
			$selectedReadFiles = files;
			
			console.log('file change event'/* ,$selectedReadFiles.files,ev */);
			$file_reader_error.hide();
			
			for(const $file of files){
				file_info += printFileInfo($file);
				recommendations += getRecommendedOp($file);
				title += `${$file.name},`;
			}
			
		
			$('#file-reader-drag-and-drop-selected').html(
				`<hr />Selected ==> <div style="max-height:300px;overflow:auto;">${file_info}</div>
				<br />Recommended operation <ul class="akd__list-group grid-s-10 ml--auto mr--auto text--left">${recommendations}</ul>`
			);
			
			$file_readerBtn.removeAttr("disabled").attr("title",title);
			//$file_reader_display.slideDown("fast");
			//previewFiles(ev.target, previewElem,progresElem,"prepend")
		}, 
		function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			
			ev.dataTransfer = ev.originalEvent.dataTransfer;
			var files = ev.dataTransfer.files,file = ev.dataTransfer.files[0], file_info = '', recommendations = '', title = 'read the file'+(files.length>1?'':'s');
			//$selectedReadFiles = file;
			$selectedReadFiles = ev.dataTransfer.files;
			
			console.log('file drop event'/* ,$selectedReadFiles,ev */);
			
			$('#file-reader-drag-and-drop').removeClass('hover');
			$file_reader_error.hide();
			
			for(const $file of files){
				file_info += printFileInfo($file);
				recommendations += getRecommendedOp($file);
				title += `${$file.name},`;
			}
			
			$('#file-reader-drag-and-drop-selected').html(
				`<hr />Selected ==> <div style="max-height:300px;overflow:auto;">${file_info}</div>
				<br />Recommended operation <ul class="akd__list-group grid-s-10 ml--auto mr--auto text--left">${recommendations}</ul>`
			);
			
			$file_readerBtn.removeAttr("disabled").attr("title",title);
			//$file_reader_display.slideDown("fast");
			//previewFiles(ev.target, previewElem,progresElem,"prepend")
		}
	);
	
	$file_readerBtn.click(function(e){
		previewFiles($selectedReadFiles/* , previewElem,progresElem, d="prepend" */)
		//$file_reader_output_wrapper.slideDown();
		$file_reader_display.slideDown();
	
	});
	
	$("#toggle-output-panel-body").click(function(e){
		$file_reader_display.toggleClass("toggled").slideToggle("slow");
		if($file_reader_display.hasClass("toggled")){
			const images_output = document.getElementById('file-reader_output');
			if(images_output.classList.contains('expand-on-focus')){
				images_output.classList.add('expand-on-focus');
			}
			images_output.classList.toggle('expand-on-click');
			if(images_output.classList.contains('expand-on-click')){
				$(this).html('<i class="fa fa-caret-down"></i><i class="fa fa-caret-up"></i>');
			} else {
				$(this).html('<i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i>');
			}
		}
	});
	
	$(document).on("dblclick","#devOpsWindows__main-display",function(e){
		$("#devOpsWindows__main-display").toggleClass("fullscreen");
		/* $("#devOpsWindows").removeClass("active");$("body").removeClass("in--fullscreen"); */
	});
	
	$(document).on("click",".dev-button,.op-button",function(e){
		let $target = $(e.target);
		if(e.target.id === "devOpsWindows__close-btn"){
			$("#devOpsWindows").removeClass("active");
			$("body").removeClass("in--fullscreen");
		} else if(e.target.id === "devOpsWindows__reload-btn"){
			$href = $target.data("href") || $target.attr("href");
			//$("body").removeClass("in--fullscreen");
			console.log($href);
		} else if($target.hasClass("op-button")){
			let $file_name = e.target.dataset.file;
			//console.log($target.siblings(".read-as-select").val());
			$("body").addClass("in--fullscreen");
			$("#devOpsWindows").addClass("active");
			createDevOpWindow($file_name, $selectedReadFiles,"#devOpsWindows__main-display",{
				readAs: $target.siblings(".read-as-select").val() || "",
			});
			/* if($target.hasClass(".op-text")){
				// $file_reader_file_type_select.val("read-as-text");
				$file_reader_file_type_select.find("option").removeAttr("selected");
				$file_reader_file_type_select.find("option[value='read-as-text']").attr("selected",true);
				//$file_reader_file_type_select.change();
			} */
			//console.log($file_reader_file_type_select.val(), $target[0].className)
		}
	});
	/* -------------------------------------------------------------------- */
	var $regex_input = $('#regex_input'),
	$regex_output = $('#regex_output'),
	$regex_optionsForm = $('#regex_options'),
	
	$regexBtn = $("#regexButton"),
	
	$regex_file_type_select = $('#regex-file-type-select'),
	$regex_file_input_type = $('#regex-file-input-type'),
	$regex_file_output_type = $('#regex-file-output-type');
	
	var $regex_error = $("#regex-errors");
	$regex_error.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $regex_stats = $("#regex-stats");
	$regex_stats.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $regex_ait = $("#regex-cb-as-i-type");
	var $current_regex_op = ($regex_file_type_select.val()).toUpperCase();
	
	$regex_file_type_select.on("change", function(e){
		let val = ($(this).val()).toUpperCase();
		$current_regex_op = val;
		
		$regex_file_input_type.html(val);
		$regex_file_output_type.html(val);
		
		if(val === "HTML-TO-MARKDOWN"){
			
		}
	});

	$regex_optionsForm.on('change', function () {
		//$regex_output.val();
	});
	
	/* $regex_ait.on('change', function () {
		if($regex_ait.get(0).checked || this.checked){
			$the.editors.use_codemirror = false;
			$the.editors.use_editor = false;
			
			if($the.editors.use_codemirror){
				let $inputElem = $the.editors.inputEditor,
				$outputElem = $the.editors.outputEditor;
			} else {
				let $inputElem = $regex_input,
				$outputElem = $regex_output,
				source = $inputEditor.val();
			}
			
			if($current_regex_op === "REGEX-REPLACE") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(regex_replace($inputElem.getValue())) : 
							$outputElem.val(regex_replace($inputElem.val()));
				});
			} else if($current_regex_op === "REGEX-EXTRACT-MATCHES") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(regex_extract_matches($inputElem.getValue())) : 
							$outputElem.val(regex_extract_matches($inputElem.val()));
				});
			} else if($current_regex_op === "TEXT-FROM-REGEX") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(text_from_regex($inputElem.getValue())) : 
							$outputElem.val(text_from_regex($inputElem.val()));
				});
			}
		}
	}); */
	
	$regexBtn.on("click", function(e){
		let output = '/* no output! */', source = $regex_input.val(), val = ($regex_file_type_select.val()).toUpperCase();
		try{
			$regex_error.fadeOut("fast");
			$regex_stats.fadeOut("fast");
			
			if($current_regex === "REGEX-REPLACE" /* val === "REGEX-REPLACE" */){
				output = regex_replace(source);
			} else if($current_regex === "REGEX-EXTRACT-MATCHES" /* val === "REGEX-EXTRACT-MATCHES" */){
				output = regex_extract_matches(source);
			} else if($current_regex === "TEXT-FROM-REGEX" /* val === "TEXT-FROM-REGEX" */){
				output = text_from_regex(source);
			}
			
			$regex_output.val(output);
			
			//$regex_stats.fadeIn("fast").html(output.length + " bytes, saved " + ((1 - output.length / source.length) * 100 || 0).toFixed(2) + "%");
		} catch(e) {
			//$regex_error.html(e);
			if (e instanceof JS_Parse_Error) {
				// the options are actually okay, just the code that"s bad
				show_error(e, $regex_input.val(), $regex_error, $regex_stats);
				return true;
			} else {
				//uglify_options = old_options;
				show_error(e, null, $regex_error, $regex_stats);
				return false;
			}
		}
	});
	
	function text_from_regex(text, _regex, _howMany) {
		var howMany = _howMany || parseInt($('#text-from-regex-how-many').val(), 10) || 5;
		var regex = _regex || $('#text-from-regex-regex').val();
		var ret = '';
		for (var i = 1; i <= howMany; i++) {
			var r = new RandExp(regex);
			ret += r.gen();
			ret += "\n";
		}
		return ret;
	}

    function regex_replace(text, _regex, _replaceTo) {
		var regex = _regex || $('#regex-replace-regex').val();
		var regexParts = regex.match(/^\/(.*?)\/([gimuy]*)$/);
		if (regexParts) {
			var r = new RegExp(regexParts[1], regexParts[2]);
		} else {
			var r = new RegExp(regex);
		}
		var replaceTo = _replaceTo || $('#regex-replace-to').val();
		text = text.replace(r, replaceTo);
		return text;
	}

	function regex_extract_matches(text, _regex) {
		var regex = _regex || $('#regex-extract-matches-regex').val();

		var regexParts = regex.match(/^\/(.*?)\/([gimuy]*)$/);
		if (regexParts) {
			var r = new RegExp(regexParts[1], regexParts[2]);
		} else {
			var r = new RegExp(regex);
		}
		var matches = text.match(r);
		var ret = '';
		if (matches) {
			for (var i = 0; i < matches.length; i++) {
				ret += matches[i];
				ret += "\n";
			}
		}
		return ret;
	}
	
	/* -------------------------------------------------------------------- */
	var $misc_input = $('#misc_input'),
	$misc_output = $('#misc_output'),
	$misc_optionsForm = $('#misc_options'),
	
	$miscBtn = $("#miscButton"),
	
	$misc_file_type_select = $('#misc-file-type-select'),
	$misc_file_input_type = $('#misc-file-input-type'),
	$misc_file_output_type = $('#misc-file-output-type');
	
	var $misc_error = $("#misc-errors");
	$misc_error.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $misc_stats = $("#misc-stats");
	$misc_stats.css({"max-height":"100px","overflow":"auto"}).fadeOut("fast");
	
	var $misc_ait = $("#misc-cb-as-i-type");
	var $current_misc_op = ($misc_file_type_select.val()).toUpperCase();
	
	$misc_file_type_select.on("change", function(e){
		let val = ($(this).val()).toUpperCase();
		$current_misc_op = val;
		
		$misc_file_input_type.html(val);
		$misc_file_output_type.html(val);
		
		if(val === "HTML-TO-MARKDOWN"){
			
		}
	});

	$misc_optionsForm.on('change', function () {
		//$misc_output.val();
	});
	
	/* $misc_ait.on('change', function () {
		if($misc_ait.get(0).checked || this.checked){
			$the.editors.use_codemirror = false;
			$the.editors.use_editor = false;
			
			if($the.editors.use_codemirror){
				let $inputElem = $the.editors.inputEditor,
				$outputElem = $the.editors.outputEditor;
			} else {
				let $inputElem = $misc_input,
				$outputElem = $misc_output,
				source = $inputEditor.val();
			}
			
			if($current_misc_op === "EXTRACT-EMAILS") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(extract_emails($inputElem.getValue())) : 
							$outputElem.val(extract_emails($inputElem.val()));
				});
			} else if($current_misc_op === "EXTRACT-URLS") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(extract_urls($inputElem.getValue())) : 
							$outputElem.val(extract_urls($inputElem.val()));
				});
			} else if($current_misc_op === "EXTRACT-NUMBERS") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(extract_numbers($inputElem.getValue())) : 
							$outputElem.val(extract_numbers($inputElem.val()));
				});
			} else if($current_misc_op === "EXTRACT-LINES") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(extract_lines($inputElem.getValue())) : 
							$outputElem.val(extract_lines($inputElem.val()));
				});
			} else if($current_misc_op === "TEXT-INFO") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(text_info($inputElem.getValue())) : 
							$outputElem.val(text_info($inputElem.val()));
				});
			} else if($current_misc_op === "WORD-WRAP") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(word_wrap($inputElem.getValue())) : 
							$outputElem.val(word_wrap($inputElem.val()));
				});
			} else if($current_misc_op === "WORD-SPLIT") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(word_split($inputElem.getValue())) : 
							$outputElem.val(word_split($inputElem.val()));
				});
			} else if($current_misc_op === "WORD-SORT") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(word_sort($inputElem.getValue())) : 
							$outputElem.val(word_sort($inputElem.val()));
				});
			} else if($current_misc_op === "WORD-COUNT") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(word_count($inputElem.getValue())) : 
							$outputElem.val(word_count($inputElem.val()));
				});
			} else if($current_misc_op === "LINE-COUNT") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(line_count($inputElem.getValue())) : 
							$outputElem.val(line_count($inputElem.val()));
				});
			} else if($current_misc_op === "PARAGRAPH-COUNT") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(paragraph_count($inputElem.getValue())) : 
							$outputElem.val(paragraph_count($inputElem.val()));
				});
			} else if($current_misc_op === "FILTER-LINES") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(filter_lines($inputElem.getValue())) : 
							$outputElem.val(filter_lines($inputElem.val()));
				});
			} else if($current_misc_op === "EMPTY-LINES-REMOVAL") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(empty_lines_removal($inputElem.getValue())) : 
							$outputElem.val(empty_lines_removal($inputElem.val()));
				});
			} else if($current_misc_op === "DUPLICATE-LINES-REMOVAL") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(duplicate_lines_removal($inputElem.getValue())) : 
							$outputElem.val(duplicate_lines_removal($inputElem.val()));
				});
			} else if($current_misc_op === "IDN-DECODE") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(idn_decode($inputElem.getValue())) : 
							$outputElem.val(idn_decode($inputElem.val()));
				});
			} else if($current_misc_op === "IDN-ENCODE") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(idn_encode($inputElem.getValue())) : 
							$outputElem.val(idn_encode($inputElem.val()));
				});
			} else if($current_misc_op === "REMOVE-PUNCTUATION") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(remove_punctuation($inputElem.getValue())) : 
							$outputElem.val(remove_punctuation($inputElem.val()));
				});
			} else if($current_misc_op === "REMOVE-WHITESPACE") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(remove_whitespace($inputElem.getValue())) : 
							$outputElem.val(remove_whitespace($inputElem.val()));
				});
			} else if($current_misc_op === "REMOVE-ALL-WHITESPACE") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(remove_all_whitespace($inputElem.getValue())) : 
							$outputElem.val(remove_all_whitespace($inputElem.val()));
				});
			} else if($current_misc_op === "ADD-SLASHES") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(add_slashes($inputElem.getValue())) : 
							$outputElem.val(add_slashes($inputElem.val()));
				});
			} else if($current_misc_op === "STRIP-SLASHES") {
				$inputElem.on('input', () => {
					($the.editors.use_editor === true || $the.editors.use_codemirror === true) ? 
						$outputElem.setValue(strip_slashes($inputElem.getValue())) : 
							$outputElem.val(strip_slashes($inputElem.val()));
				});
			}
		}
	}); */
	
	$miscBtn.on("click", function(e){
		let output = '/* no output! */', source = $misc_input.val(), val = ($misc_file_type_select.val()).toUpperCase();
		try{
			$misc_error.fadeOut("fast");
			$misc_stats.fadeOut("fast");
			
			if($current_misc_op === "EXTRACT-EMAILS" /* val === "EXTRACT-EMAILS" */){
				output = extract_emails(source);
			} else if($current_misc_op === "EXTRACT-URLS" /* val === "EXTRACT-URLS" */){
				output = extract_urls(source);
			} else if($current_misc_op === "EXTRACT-NUMBERS" /* val === "EXTRACT-NUMBERS" */){
				output = extract_numbers(source);
			} else if($current_misc_op === "EXTRACT-LINES" /* val === "EXTRACT-LINES" */){
				output = extract_lines(source);
			} else if($current_misc_op === "TEXT-INFO" /* val === "TEXT-INFO" */){
				output = text_info(source);
			} else if($current_misc_op === "WORD-WRAP" /* val === "WORD-WRAP" */){
				output = word_wrap(source);
			} else if($current_misc_op === "WORD-SPLIT" /* val === "WORD-SPLIT" */){
				output = word_split(source);
			} else if($current_misc_op === "WORD-SORT" /* val === "WORD-SORT" */){
				output = word_sort(source);
			} else if($current_misc_op === "WORD-COUNT" /* val === "WORD-COUNT" */){
				output = word_count(source);
			} else if($current_misc_op === "LINE-COUNT" /* val === "LINE-COUNT" */){
				output = line_count(source);
			} else if($current_misc_op === "PARAGRAPH-COUNT" /* val === "PARAGRAPH-COUNT" */){
				output = paragraph_count(source);
			} else if($current_misc_op === "FILTER-LINES" /* val === "FILTER-LINES" */){
				output = filter_lines(source);
			} else if($current_misc_op === "EMPTY-LINES-REMOVAL" /* val === "EMPTY-LINES-REMOVAL" */){
				output = empty_lines_removal(source);
			} else if($current_misc_op === "DUPLICATE-LINES-REMOVAL" /* val === "DUPLICATE-LINES-REMOVAL" */){
				output = duplicate_lines_removal(source);
			} else if($current_misc_op === "IDN-DECODE" /* val === "IDN-DECODE" */){
				output = idn_decode(source);
			} else if($current_misc_op === "IDN-ENCODE" /* val === "IDN-ENCODE" */){
				output = idn_encode(source);
			} else if($current_misc_op === "REMOVE-PUNCTUATION" /* val === "REMOVE-PUNCTUATION" */){
				output = remove_punctuation(source);
			} else if($current_misc_op === "REMOVE-WHITESPACE" /* val === "REMOVE-WHITESPACE" */){
				output = remove_whitespace(source);
			} else if($current_misc_op === "REMOVE-ALL-WHITESPACE" /* val === "REMOVE-ALL-WHITESPACE" */){
				output = remove_all_whitespace(source);
			} else if($current_misc_op === "SPACES-TO-NEWLINES" /* val === "SPACES-TO-NEWLINES" */){
				output = spaces_to_newlines(source);
			} else if($current_misc_op === "NEWLINES-TO-SPACES" /* val === "NEWLINES-TO-SPACES" */){
				output = newlines_to_spaces(source);
			} else if($current_misc_op === "ADD-SLASHES" /* val === "ADD-SLASHES" */){
				output = add_slashes(source);
			} else if($current_misc_op === "STRIP-SLASHES" /* val === "STRIP-SLASHES" */){
				output = strip_slashes(source);
			}
			
			$misc_output.val(output);
			
			//$misc_stats.fadeIn("fast").html(output.length + " bytes, saved " + ((1 - output.length / source.length) * 100 || 0).toFixed(2) + "%");
		} catch(e) {
			//$misc_error.html(e);
			if (e instanceof JS_Parse_Error) {
				// the options are actually okay, just the code that"s bad
				show_error(e, $misc_input.val(), $misc_error, $misc_stats);
				return true;
			} else {
				//uglify_options = old_options;
				show_error(e, null, $misc_error, $misc_stats);
				return false;
			}
		}
	});
	
	function word_wrap(text, _len = 250) {
        var len = $('#word-wrap-length').val() || _len;
        var ww = wordwrap(len);
        return ww(text);
    }

    function word_split(text) {
        var parts = text.split(/\s+/g);
        return parts.join("\n");
    }
	
	function word_sort(text) {
        text = text.replace(/[?.,!"]/g, ' ');
        text = text.replace(/\s+$/g, '');
        text = text.replace(/^\s+/g, '');
        var words = text.split(/\s+/);
        words.sort(function (a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });
        return words.join(' ');
    }
	
    function word_count(text) {
        return text.match(/\S+/g).length;
    }

    function line_count(text) {
        return text.split('\n').length;
    }

    function paragraph_count(text) {
        var paragraphs = text.split(/\n\n+/g);
        var paragraphCount = 0;
        for (var i = 0; i < paragraphs.length; i++) {
            if (paragraphs[i].length != 0) {
                paragraphCount++;
            }
        }
        return paragraphCount;
    }
	
	function filter_lines(text, _pattern, _invertMatches) {
        text = text.replace(/\r\n/g, '\n');
        var lines = text.split('\n');
        var ret = '';
        var pattern = $('#filter-lines-pattern').val() || _pattern || ' ';
        var invertMatches = $('#filter-lines-invert').is(':checked') || _invertMatches || false;
        for (var i = 0; i < lines.length; i++) {
            if (invertMatches) {
                if (!(lines[i].indexOf(pattern) >= 0)) {
                    ret += lines[i] + "\n";
                }
            }
            else {
                if (lines[i].indexOf(pattern) >= 0) {
                    ret += lines[i] + "\n";
                }
            }
        }
        return ret;
    }
	
	function duplicate_lines_removal(text) {
        text = text.replace(/\r\n/g, '\n');
        var lines = text.split('\n');
        var seen = {};
        var ret = '';

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (seen[line]) {
                continue;
            }
            seen[line] = 1;
            ret += line + '\n';
        }
        return ret;
    }

	function empty_lines_removal(text) {
        text = text.replace(/\r\n/g, '\n');
        var lines = text.split('\n');
        var ret = '';

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (/^[\s\t]*$/.test(line)) {
                continue;
            }
            ret += line + '\n';
        }
        return ret;
    }
	
	function extract_lines(text, _start, _end) {
        var start = $('#extract-lines-start').val() || _start || ' ';
        var end = $('#extract-lines-end').val() || _end || '.';
        text = text.replace(/\r\n/g, '\n');
        var lines = text.split('\n');
        var ret = '';
        for (var i = start-1; i <= end-1; i++) {
            if (i >= lines.length) {
                break;
            }
            ret += lines[i] + "\n";
        }
        return ret;
    }
	
	function remove_whitespace(text) {
        text = text.replace(/ +/g, ' ');
        text = text.replace(/\t+/g, ' ');
        text = text.replace(/^\s+/g, '');
        text = text.replace(/\s+$/g, '');
        return text;
    }
	
	function remove_all_whitespace(text) {
        text = text.replace(/\s+/g, '');
        return text;
    }

    function remove_punctuation(text) {
        var puntuationRe = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
        text = text.replace(puntuationRe, '');
        return text;
    }
	
	function spaces_to_newlines(text) {
        return text.replace(/\s+/g, "\n");
    }

	function newlines_to_spaces(text) {
        text = text.replace(/\r\n/g, '\n');
        var lines = text.split('\n');
        var retLines = [];
        for (var i = 0; i < lines.length; i++) {
            if (/\w/.test(lines[i])) {
                retLines.push(lines[i]);
            }
        }
        return retLines.join(' ');
    }

	function add_slashes(text) {
        text = text.replace(/\\/g, '\\\\');
        text = text.replace(/\t/g, '\\t');
        text = text.replace(/\n/g, '\\n');
        text = text.replace(/'/g, "\\'");
        text = text.replace(/"/g, '\\"');
        return text;
    }

	function strip_slashes(text) {
        return text.replace(/\\(.?)/g, function (match, char) {
            if (char == '\\') return '\\';
            if (char == 't') return '\t';
            if (char == 'n') return '\n';
            if (char == '') return '';
            return char;
        });
    }
	
	function idn_encode(text) {
        return punycode.toASCII(text);
    }
	
	function idn_decode(text) {
        return punycode.toUnicode(text);
    }
	
	function extract_emails(text) {
		var matches = text.match(/[a-z0-9._%+-]+@[a-z0-9-]+\.([a-z0-9]+)/gi);
		var ret = '';
		if (matches) {
			for (var i = 0; i < matches.length; i++) {
				ret += matches[i];
				ret += "\n";
			}
		}
		return ret;
	}
	
	function extract_urls(text) {
		// https://gist.github.com/dperini/729294
		var urlRegex = new RegExp(
			// protocol identifier
			"(?:(?:https?|ftp)://)" +
			// user:pass authentication
			"(?:\\S+(?::\\S*)?@)?" +
			"(?:" +
			  // IP address exclusion
			  // private & local networks
			  "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
			  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
			  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
			  // IP address dotted notation octets
			  // excludes loopback network 0.0.0.0
			  // excludes reserved space >= 224.0.0.0
			  // excludes network & broacast addresses
			  // (first & last IP address of each class)
			  "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
			  "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
			  "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
			"|" +
			  // host name
			  "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
			  // domain name
			  "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
			  // TLD identifier
			  "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
			  // TLD may end with dot
			  "\\.?" +
			")" +
			// port number
			"(?::\\d{2,5})?" +
			// resource path
			"(?:[/?#]\\S*)?",
		  "gi"
		);
		var matches = text.match(urlRegex);
		var ret = '';
		if (matches) {
			for (var i = 0; i < matches.length; i++) {
				ret += matches[i];
				ret += "\n";
			}
		}
		return ret;
	}
	
	function extract_numbers(text) {
		var matches = text.match(/-?[0-9](\.[0-9]+)?/gi);
		var ret = '';
		if (matches) {
			for (var i = 0; i < matches.length; i++) {
				ret += matches[i];
				ret += "\n";
			}
		}
		return ret;
	}
	
	function text_info(text) {
        var length = text.length;
        var wordCount = text.match(/\S+/g).length;
        var lineCount = text.split('\n').length;

        var paragraphs = text.split(/\n\n+/g);
        var paragraphCount = 0;
        for (var i = 0; i < paragraphs.length; i++) {
            if (paragraphs[i].length != 0) {
                paragraphCount++;
            }
        }

        var textSentences = text.split(/[.?!]+/);
        var sentenceCount = 0;
        for (var i = 0; i < textSentences.length; i++) {
            if (/\w/.test(textSentences[i])) {
                sentenceCount++;
            }
        }

        var charStats = {};
        var wordStats = {};

        var asciiCount = 0;
        var extendedAsciiCount = 0;
        var unicodeCount = 0;

        var chars = text.split('');
        for (var i = 0; i < chars.length; i++) {
            var char = chars[i];
            if (charStats[char] === undefined) {
                charStats[char] = 1;
            } else {
                charStats[char]++;
            }

            var charCode = char.charCodeAt(0);
            if (charCode >= 0 && charCode <= 127) {
                asciiCount++;
            } else if (charCode > 127 && charCode <= 255) {
                extendedAsciiCount++;
            } else {
                unicodeCount++;
            }
        }

        var words = text.split(/\s+/g);
        for (var i = 0; i < words.length; i++) {
            var word = words[i].toLowerCase();
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

        var retText = 
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

        var sortedWordStatsKeys = Object.keys(wordStats).sort(function (a, b) {
            return wordStats[b] - wordStats[a];
        });
        for (var i = 0; i < sortedWordStatsKeys.length; i++) {
            var key = sortedWordStatsKeys[i];
            retText += key + ": " + wordStats[key] + "\n";
        }   

        retText +=
            "\n" + 
            "Character statistics:\n";

        var sortedCharStatsKeys = Object.keys(charStats).sort(function (a, b) {
            return charStats[b] - charStats[a];
        });
        for (var i = 0; i < sortedCharStatsKeys.length; i++) {
            var key = sortedCharStatsKeys[i];
            var strKey = key;
            if (key.charCodeAt(0) == "10") {
                strKey = "â†µ"; 
            } else if (key.charCodeAt(0) == "32") {
                strKey = "âŽµ";
            }

            retText += strKey + ": " + charStats[key] + "\n";
        }   

        return retText;
    }
	
	// ----------------------------------------------------
	function extend(source,destination){
		for(var key in source){
			if (source.hasOwnProperty(key)) destination[key] = source[key];
		}
		return destination
	}
	
	function select_text() {
		/*jshint validthis:true */
		var self = this;
		self.select();
		self.onmouseup = self.onkeyup = function() {
			// Prevent further mouseup intervention
			self.onmouseup = self.onkeyup = null;
			self.scrollTop = 0;
			return false;
		};
		return false;
	}
	
	function copyToClipboard(text) {
		var textArea = document.createElement("textarea");
		textArea.value = text;
		
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		document.execCommand('copy');
		document.body.removeChild(textArea);
	}
	
	function selectCodemirrorTheme() {
		var theme = codemirrorThemeSelect.options[codemirrorThemeSelect.selectedIndex].textContent;
		$the.editor.setOption("theme", theme);
		location.hash = "#" + theme;
		$("#codemirror-active-theme").attr("href",BASE_URL+"_ui-includes/vendors/codemirror/theme/"+theme+".css");
	}
	
})();