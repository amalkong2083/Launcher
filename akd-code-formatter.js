/* -------------------------------------------------------------------- */
const validConvOps = ["IMAGE-TO-BASE64",/* "FILE-TO-BASE64", */"JPG-TO-PNG","PNG-TO-JPG","GIF-TO-JPG","GIF-TO-PNG","BMP-TO-JPG","BMP-TO-PNG"];

/* var selectedFile;
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
		let output = 'no output!', source = $image_converters_input.val(), val = ($image_converters_file_type_select.val()).toUpperCase();
		
		$image_converters_error.fadeOut("fast");
		$image_converters_stats.fadeOut("fast");
		
		if($current_image_converter === "IMAGE-TO-BASE64" || $current_image_converter === "FILE-TO-BASE64" ){
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
}); */
		
/**
* vkBeautify - javascript plugin to pretty-print or minify text in XML, JSON, CSS and SQL formats.
*  
* Version - 0.99.00.beta 
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vkbeautify/
* 
* MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
*   Pretty print
*
*        AKD_Formatter.xml(text [,indent_pattern]);
*        AKD_Formatter.json(text [,indent_pattern]);
*        AKD_Formatter.css(text [,indent_pattern]);
*        AKD_Formatter.sql(text [,indent_pattern]);
*
*        @text - String; text to beatufy;
*        @indent_pattern - Integer | String;
*                Integer:  number of white spaces;
*                String:   character string to visualize indentation ( can also be a set of white spaces )
*   Minify
*
*        AKD_Formatter.xmlmin(text [,preserve_comments]);
*        AKD_Formatter.jsonmin(text);
*        AKD_Formatter.cssmin(text [,preserve_comments]);
*        AKD_Formatter.sqlmin(text);
*
*        @text - String; text to minify;
*        @preserve_comments - Bool; [optional];
*                Set this flag to true to prevent removing comments from @text ( minxml and mincss functions only. )
*
*   Examples:
*        AKD_Formatter.xml(text); // pretty print XML
*        AKD_Formatter.json(text, 4 ); // pretty print JSON
*        AKD_Formatter.css(text, '. . . .'); // pretty print CSS
*        AKD_Formatter.sql(text, '----'); // pretty print SQL
*
*        AKD_Formatter.xmlmin(text, true);// minify XML, preserve comments
*        AKD_Formatter.jsonmin(text);// minify JSON
*        AKD_Formatter.cssmin(text);// minify CSS, remove comments ( default )
*        AKD_Formatter.sqlmin(text);// minify SQL
*
*/

(function() {
	let $this = this;
	function createShiftArr(step) {
		var space = '    ';
		
		if ( isNaN(parseInt(step)) ) {  // argument is string
			space = step;
		} else { // argument is integer
			switch(step) {
				case 1: space = ' '; break;
				case 2: space = '  '; break;
				case 3: space = '   '; break;
				case 4: space = '    '; break;
				case 5: space = '     '; break;
				case 6: space = '      '; break;
				case 7: space = '       '; break;
				case 8: space = '        '; break;
				case 9: space = '         '; break;
				case 10: space = '          '; break;
				case 11: space = '           '; break;
				case 12: space = '            '; break;
			}
		}

		var shift = ['\n']; // array of shifts
		for(ix=0;ix<100;ix++){
			shift.push(shift[ix]+space); 
		}
		return shift;
	}

	function AKD_Formatter(){
		this.step = '\t'; // 4 spaces
		this.shift = createShiftArr(this.step);
		$this = this;
		//return this;
	};

	AKD_Formatter.prototype.xml = function(text,step) {
		var ar = text.replace(/>\s{0,}</g,"><")
				 .replace(/</g,"~::~<")
				 .replace(/\s*xmlns\:/g,"~::~xmlns:")
				 .replace(/\s*xmlns\=/g,"~::~xmlns=")
				 .split('~::~'),
		len = ar.length,
		inComment = false,
		deep = 0,
		str = '',
		ix = 0,
		shift = step ? createShiftArr(step) : $this.shift;

		for(ix=0;ix<len;ix++) {
			// start comment or <![CDATA[...]]> or <!DOCTYPE //
			if(ar[ix].search(/<!/) > -1) { 
				str += shift[deep]+ar[ix];
				inComment = true; 
				// end comment  or <![CDATA[...]]> //
				if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) { 
					inComment = false; 
				}
			} else 
			// end comment  or <![CDATA[...]]> //
			if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) { 
				str += ar[ix];
				inComment = false; 
			} else 
			// <elm></elm> //
			if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
				/^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) { 
				str += ar[ix];
				if(!inComment) deep--;
			} else
			 // <elm> //
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
				str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
			} else 
			 // <elm>...</elm> //
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
				str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
			} else 
			// </elm> //
			if(ar[ix].search(/<\//) > -1) { 
				str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
			} else 
			// <elm/> //
			if(ar[ix].search(/\/>/) > -1 ) { 
				str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
			} else 
			// <? xml ... ?> //
			if(ar[ix].search(/<\?/) > -1) { 
				str += shift[deep]+ar[ix];
			} else 
			// xmlns //
			if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1) { 
				str += shift[deep]+ar[ix];
			} else {
				str += ar[ix];
			}
		}
		
		return  (str[0] == '\n') ? str.slice(1) : str;
	}

	AKD_Formatter.prototype.json = function(text,step) {
		var step = step ? step : $this.step;
		
		if (typeof JSON === 'undefined' ) return text; 
		
		if ( typeof text === "string" ) return JSON.stringify(JSON.parse(text), null, step);
		if ( typeof text === "object" ) return JSON.stringify(text, null, step);
			
		return text; // text is not string nor object
	}

	AKD_Formatter.prototype.css = function(text, step) {
		var ar = text.replace(/\s{1,}/g,' ')
			.replace(/\{/g,"{~::~")
			.replace(/\}/g,"~::~}~::~")
			.replace(/\;/g,";~::~")
			.replace(/\/\*/g,"~::~/*")
			.replace(/\*\//g,"*/~::~")
			.replace(/~::~\s{0,}~::~/g,"~::~")
			.split('~::~'),
			len = ar.length,
			deep = 0,
			str = '',
			ix = 0,
			shift = step ? createShiftArr(step) : $this.shift;
			
		for(ix=0;ix<len;ix++) {
			if( /\{/.exec(ar[ix]))  { 
				str += shift[deep++]+ar[ix];
			} else if( /\}/.exec(ar[ix]))  { 
				str += shift[--deep]+ar[ix];
			} else if( /\*\\/.exec(ar[ix]))  { 
				str += shift[deep]+ar[ix];
			} else {
				str += shift[deep]+ar[ix];
			}
		}
		return str.replace(/^\n{1,}/,'');
	}

	AKD_Formatter.prototype.yaml = function(text, params = {}) {
		if((window["YAML"] || ("YAML" in window)) && typeof window["YAML"] === "function"){
			try{
				text = YAML.parse(text, params);
			} catch (e){
				if(params._error_elem){
					let el = params._error_elem;
					el[("value" in el) ? "value" : "textContent"] = e.message||e.stack||e;
				} 
				console.error(e)
			}
		}
		
		return text;
	}

	AKD_Formatter.prototype.js = function(text, params) {
		try{
			//text = js_beautify(text, params);
			text = beautifier.js(text, params);
		} catch (e){
			if(params._error_elem){
				let el = params._error_elem;
				el[("value" in el) ? "value" : "textContent"] = e.message||e.stack||e;
			} else 
			console.error(e)
		}
		
		return text;
	}

	AKD_Formatter.prototype.html = function(text, params) {
		try{
			// text = html_beautify(text, params);
			text = beautifier.html(text, params);
		} catch (e){
			if(params._error_elem){
				let el = params._error_elem;
				el[("value" in el) ? "value" : "textContent"] = e.message||e.stack||e;
			} 
			// console.error(e)
		}
		
		return text;
	}

	//----------------------------------------------------------------------------
	function isSubquery(str, parenthesisLevel) {
		return  parenthesisLevel - (str.replace(/\(/g,'').length - str.replace(/\)/g,'').length )
	}

	function split_sql(str, tab) {
		return str.replace(/\s{1,}/g," ")
			.replace(/ AND /ig,"~::~"+tab+tab+"AND ")
			.replace(/ BETWEEN /ig,"~::~"+tab+"BETWEEN ")
			.replace(/ CASE /ig,"~::~"+tab+"CASE ")
			.replace(/ ELSE /ig,"~::~"+tab+"ELSE ")
			.replace(/ END /ig,"~::~"+tab+"END ")
			.replace(/ FROM /ig,"~::~FROM ")
			.replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ")
			.replace(/ HAVING /ig,"~::~HAVING ")
			//.replace(/ SET /ig," SET~::~")
			.replace(/ IN /ig," IN ")
			
			.replace(/ JOIN /ig,"~::~JOIN ")
			.replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ")
			.replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ")
			.replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ")
			.replace(/ RIGHT~::~{1,}JOIN /ig,"~::~RIGHT JOIN ")
			
			.replace(/ ON /ig,"~::~"+tab+"ON ")
			.replace(/ OR /ig,"~::~"+tab+tab+"OR ")
			.replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ")
			.replace(/ OVER /ig,"~::~"+tab+"OVER ")

			.replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ")
			.replace(/\)\s{0,}SELECT /ig,")~::~SELECT ")
			
			.replace(/ THEN /ig," THEN~::~"+tab+"")
			.replace(/ UNION /ig,"~::~UNION~::~")
			.replace(/ USING /ig,"~::~USING ")
			.replace(/ WHEN /ig,"~::~"+tab+"WHEN ")
			.replace(/ WHERE /ig,"~::~WHERE ")
			.replace(/ WITH /ig,"~::~WITH ")
			
			//.replace(/\,\s{0,}\(/ig,",~::~( ")
			//.replace(/\,/ig,",~::~"+tab+tab+"")

			.replace(/ ALL /ig," ALL ")
			.replace(/ AS /ig," AS ")
			.replace(/ ASC /ig," ASC ")	
			.replace(/ DESC /ig," DESC ")	
			.replace(/ DISTINCT /ig," DISTINCT ")
			.replace(/ EXISTS /ig," EXISTS ")
			.replace(/ NOT /ig," NOT ")
			.replace(/ NULL /ig," NULL ")
			.replace(/ LIKE /ig," LIKE ")
			.replace(/\s{0,}SELECT /ig,"SELECT ")
			.replace(/\s{0,}UPDATE /ig,"UPDATE ")
			.replace(/ SET /ig," SET ")
						
			.replace(/~::~{1,}/g,"~::~")
			.split('~::~');
	}

	AKD_Formatter.prototype.sql = function(text,step) {
		var ar_by_quote = text.replace(/\s{1,}/g," ").replace(/\'/ig,"~::~\'").split('~::~'),
			len = ar_by_quote.length,
			ar = [],
			deep = 0,
			tab = $this.step,//+$this.step,
			inComment = true,
			inQuote = false,
			parenthesisLevel = 0,
			str = '',
			ix = 0,
			//shift = step ? createShiftArr(step) : $this.shift;;
			shift = step ? createShiftArr(step) : $this.shift;

		for(ix=0;ix<len;ix++) {
			if(ix%2) {
				ar = ar.concat(ar_by_quote[ix]);
			} else {
				ar = ar.concat(split_sql(ar_by_quote[ix], tab) );
			}
		}
		
		len = ar.length;
		for(ix=0;ix<len;ix++) {
			parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);
			if( /\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix]))  { 
				ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
			} 
			
			if( /\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix]))  { 
				ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
			} 
			
			if( /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix]))  { 
				deep++;
				str += shift[deep]+ar[ix];
			} else if( /\'/.exec(ar[ix]) )  { 
				if(parenthesisLevel<1 && deep) {
					deep--;
				}
				str += ar[ix];
			} else  { 
				str += shift[deep]+ar[ix];
				if(parenthesisLevel<1 && deep) {
					deep--;
				}
			} 
			var junk = 0;
		}

		str = str.replace(/^\n{1,}/,'').replace(/\n{1,}/g,"\n");
		return str;
	}

	AKD_Formatter.prototype.xmlmin = function(text, preserveComments) {
		var str = preserveComments ? text : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"").replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns');
		return  str.replace(/>\s{0,}</g,"><"); 
	}

	AKD_Formatter.prototype.jsonmin = function(text) {
		if (typeof JSON === 'undefined' ) return text; 
		return JSON.stringify(JSON.parse(text), null, 0);
	}
	/*
	** JSON.minify()
	** v0.1 (c) Kyle Simpson
	** MIT License
	** https://github.com/getify/JSON.minify/tree/javascript
	*/
	AKD_Formatter.prototype.json_minify = function(json) {
		var tokenizer = /"|(\/\*)|(\*\/)|(\/\/)|\n|\r/g,
			in_string = false,
			in_multiline_comment = false,
			in_singleline_comment = false,
			tmp, tmp2, new_str = [], ns = 0, from = 0, lc, rc;

		tokenizer.lastIndex = 0;

		while(tmp = tokenizer.exec(json)) {
			lc = RegExp.leftContext;
			rc = RegExp.rightContext;
			if (!in_multiline_comment && !in_singleline_comment) {
				tmp2 = lc.substring(from);
				if (!in_string) {
					tmp2 = tmp2.replace(/(\n|\r|\s)*/g,"");
				}
				new_str[ns++] = tmp2;
			}
			from = tokenizer.lastIndex;

			if (tmp[0] == "\"" && !in_multiline_comment && !in_singleline_comment) {
				tmp2 = lc.match(/(\\)*$/);
				if (!in_string || !tmp2 || (tmp2[0].length % 2) == 0) {	// start of string with ", or unescaped " character found to end string
					in_string = !in_string;
				}
				from--; // include " character in next catch
				rc = json.substring(from);
			} else if (tmp[0] == "/*" && !in_string && !in_multiline_comment && !in_singleline_comment) {
				in_multiline_comment = true;
			} else if (tmp[0] == "*/" && !in_string && in_multiline_comment && !in_singleline_comment) {
				in_multiline_comment = false;
			} else if (tmp[0] == "//" && !in_string && !in_multiline_comment && !in_singleline_comment) {
				in_singleline_comment = true;
			} else if ((tmp[0] == "\n" || tmp[0] == "\r") && !in_string && !in_multiline_comment && in_singleline_comment) {
				in_singleline_comment = false;
			} else if (!in_multiline_comment && !in_singleline_comment && !(/\n|\r|\s/.test(tmp[0]))) {
				new_str[ns++] = tmp[0];
			}
		}
		new_str[ns++] = rc;
		return new_str.join("");
	}
	
	AKD_Formatter.prototype.cssmin = function(text, preserveComments) {
		var str = preserveComments ? text: text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"") ;

		return str.replace(/\s{1,}/g,' ')
				  .replace(/\{\s{1,}/g,"{")
				  .replace(/\}\s{1,}/g,"}")
				  .replace(/\;\s{1,}/g,";")
				  .replace(/\/\*\s{1,}/g,"/*")
				  .replace(/\*\/\s{1,}/g,"*/");
	}

	AKD_Formatter.prototype.sqlmin = function(text) {
		return text.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")");
	}

	AKD_Formatter.prototype.yamlmin = function(text, step) {
		if(window["YAML"] && typeof window["YAML"] === "function"){
			text = YAML.stringify(text);
		}
		
		return text;
	}
	AKD_Formatter.prototype.yamlmin = function(text, params = {}) {
		if((window["YAML"] || ("YAML" in window)) && typeof window["YAML"] === "function"){
			try{
				text = YAML.stringify(text);
			} catch (e){
				if(params._error_elem){
					let el = params._error_elem;
					el[("value" in el) ? "value" : "textContent"] = e.message||e.stack||e;
				} 
				// console.error(e)
			}
		}
		
		return text;
	}

	AKD_Formatter.prototype.jsmin = function(otext, params = {}) {
		let text = otext;
		try{
			// text = js_minify(otext, params);
			let res = minify(otext);
			if (res.error) {
				if(params._error_elem){
					let el = params._error_elem;
					el[("value" in el) ? "value" : "textContent"] = res.error;
				} //else 
				throw res.error;
			}
	
			text = res.code //|| '/* no output! */';
			// $stats.innerHTML = res.code.length + ' bytes, saved ' + ((1 - res.code.length / otext.length) * 100 || 0).toFixed(2) + '%';
		} catch (e){
			if(params._error_elem){
				let el = params._error_elem;
				el[("value" in el) ? "value" : "textContent"] = e.message||e.stack||e;
			} 
			// console.error(e)
		}
		
		return text;
	}

	AKD_Formatter.prototype.minify = function (content, cfg={}) {
		content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
		// now all comments, newlines and tabs have been removed
		content = content.replace( / {2,}/g, ' ' );
		// now there are no more than single adjacent spaces left
		// now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
		content = content.replace( / ([{:}]) /g, '$1' );
		content = content.replace( /([;,]) /g, '$1' );
		content = content.replace( / !/g, '!' );
		return content;
	}
			
	// --------------------------------------------------------------------
	AKD_Formatter.prototype.beautify_text = function (text, mode, opt, cp) {
		let out = text;
		cp = cp || opt.cp || null;
		
		if(cp){
			if(typeof cp === 'string') cp = cp.replace(/\'/g,'').replace(/\"/g,'');
			
			if ( !isNaN(parseInt(cp)) ) {  // argument is integer
				cp = parseInt(cp);
			} else {
				cp = cp ? cp : 4;
			}
		} else cp = 4;
		
		if(mode == 'xml' || mode == 'XML') {
			out =  this.xml(text, cp);
		} else if(mode == 'json' || mode == 'JSON') {
			out =  this.json(text, cp);
		} else if(mode == 'css' || mode == 'CSS') {
			out =  this.css(text, cp);
		} else if(mode == 'sql' || mode == 'SQL') {
			out =  this.sql(text, cp);
		}  else if(mode == 'yaml' || mode == 'YAML') {
			out =  this.yaml(text, opt);
		} else if(mode == 'js' || mode == 'JS') {
			let options = opt && typeof(opt) === "object" ? opt : {
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
			//out =  deobfuscator.deobfuscate(text,options);
			out =  window["js_beautify"] ? js_beautify(text, options) : this.js(text);
		} else if(mode == 'html' || mode == 'HTML') {
			let options = opt && typeof(opt) === "object" ? opt : {
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
			out = window["html_beautify"] ? html_beautify(text, options) : this.html(text);
		}
		//countChars();
		return out;
	}

	AKD_Formatter.prototype.minify_text = function (text, mode, preservecomm=true) {
		let out = text;
		
		if(mode == 'xml' || mode == 'XML') {
			out = preservecomm ? this.xmlmin(text,true) : this.xmlmin(text);
		} else if(mode == 'json' || mode == 'JSON') {
			out =  preservecomm ? this.jsonmin(text) : this.jsonmin(text);
		} else if(mode == 'css' || mode == 'CSS') {
			out =  preservecomm ? this.cssmin(text,true) : this.cssmin(text);
		} else if(mode == 'sql' || mode == 'SQL') {
			out =  this.sqlmin(text);
		} else if(mode == 'yaml' || mode == 'YAML') {
			out =  this.yamlmin(text,{});
		} else if(mode == 'html' || mode == 'HTML' || mode == 'js' || mode == 'JS') {
			out = window["html_minify"] ? html_minify(text, {collapseWhitespace:true/* ,minifyJS:true,minifyCSS:true */}) : this.minify(text,{});
		} else {
			out =  this.minify(text, {mode, preservecomm});
		}
		
		return out;
	}
	//const isValidJSON = (str) => {try {JSON.parse(str);return true;} catch (e) {console.log(e);return false;}};

	// --------------------------------------------------------------------
	AKD_Formatter.prototype.xml2json = function (text, tab = "	", attrs) {
		try{
			var parser = new DOMParser(),
			doc = parser.parseFromString(text, "application/xml"),
			parsed = xml2json(doc, tab, attrs);
		} catch (err) {
			throw new Error("Invalid XML" + err); // rethrow for exceptionFn
		}
		return parsed;
	}
	/*	This work is licensed under Creative Commons GNU LGPL License.

		License: http://creativecommons.org/licenses/LGPL/2.1/
		Version: 0.9
		Author:  Stefan Goessner/2006
		Web:     http://goessner.net/ 
	*/
	AKD_Formatter.prototype._json2xml = function _json2xml(o, tab) {
		let toXml = function(v, name, ind) {
			var xml = "";
			if (v instanceof Array) {
				for (var i=0, n=v.length; i<n; i++)
				xml += ind + toXml(v[i], name, ind+"\t") + "\n";
			} else if (typeof(v) == "object") {
				var hasChild = false;
				xml += ind + "<" + name;
				for (var m in v) {
					if (m.charAt(0) == "@") xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
					else hasChild = true;
				}
				xml += hasChild ? ">" : "/>";
				if (hasChild) {
					for (var m in v) {
						if (m == "#text")
						xml += v[m];
						else if (m == "#cdata")
						xml += "<![CDATA[" + v[m] + "]]>";
						else if (m.charAt(0) != "@")
						xml += toXml(v[m], m, ind+"\t");
					}
					xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
				}
			} else {
				xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
			}
			return xml;
		}, _xml="";
	   
		for (let m in o) _xml += toXml(o[m], m, "");
	   
	    return  tab ? _xml.replace(/\t/g, tab) : _xml.replace(/\t|\n/g, "");
	}
	
	AKD_Formatter.prototype.json2xml = function json2xml(text, tab) {
		let parsed = "";
		try {
			parsed = JSON.parse(text);
		} catch (err) {
			throw new Error("Invalid JSON"); // rethrow for exceptionFn
		}
		
		let converted = $this.xml($this._json2xml(parsed));
		return converted;
	}
	
	
	AKD_Formatter.prototype.json2base64 = function (text) {
        var bytes = [];
        for (var i = 0; i < text.length; i++) {
            var realBytes = unescape(encodeURIComponent(text[i]));
            for (var j = 0; j < realBytes.length; j++) {
                bytes.push(realBytes[j].charCodeAt(0));
            }
        }
		// var encoded = encode64(bytes);
        var B64 = new Base64Thing;
        var encoded = B64.uint8ToBase64(bytes);
        return encoded;
    }
	AKD_Formatter.prototype.json2yaml = function json2yaml(text) {
		if(!window["YAML"] && typeof window["YAML"] !== "function") return text;
		try {
			var parsed = JSON.parse(text);
		}
		catch (err) {
			throw new Error("Invalid JSON"); // rethrow for exceptionFn
		}

		return YAML.stringify(parsed);
	}
	AKD_Formatter.prototype._json2text = function _json2text(text) {
		return text.toString();
	}
	AKD_Formatter.prototype.json2text = function json2text(text) {
		try {
			var parsed = JSON.parse(text);
		}
		catch (err) {
			throw new Error("Invalid JSON"); // rethrow for exceptionFn
		}

		return $this._json2text(parsed);
	}
	
	AKD_Formatter.prototype.json_escape = function json_escape(text) {
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
	
	AKD_Formatter.prototype.yaml2json = function yaml2json(text) {
		if(!window["YAML"] && typeof window["YAML"] !== "function") return text;
		
		try {
			var jsonObj = YAML.parse(text);
		}
		catch (err) {
			throw new Error("Invalid YAML"); // rethrow for exceptionFn
		}

		return JSON.stringify(jsonObj, 0, 2);
	}
	
	AKD_Formatter.prototype.yaml2xml = function yaml2xml(text) {
		if(!window["YAML"] && typeof window["YAML"] !== "function") return text;
		// first convert yaml to json
		try {
			var jsonObj = YAML.parse(text);
		}
		catch (err) {
			throw new Error("Invalid YAML"); // rethrow for exceptionFn
		}

		// then convert json to xml
		return this.xml($this._json2xml(jsonObj));
	}
	
	AKD_Formatter.prototype.json2csv = function json2csv(text) {
		if(!window["CSVJSON"] && typeof window["CSVJSON"] !== "function") return text;
		try {
			var parsed = JSON.parse(text);
		}
		catch (err) {
			console.error(err)
			throw new Error("Invalid JSON"); // rethrow for exceptionFn
		}
		return CSVJSON.json2csv(parsed);
	}
	
	AKD_Formatter.prototype.csv2json = function csv2json(text) {
		if(!window["CSVJSON"] && typeof window["CSVJSON"] !== "function") return text;
		
		return CSVJSON.csv2json(text);
	}
	
	AKD_Formatter.prototype.yaml2csv = function yaml2csv(text) {
		if(!window["YAML"] && typeof window["YAML"] !== "function") return text;
		// first convert yaml to json
		try {
			var jsonObj = YAML.parse(text);
		}
		catch (err) {
			throw new Error("Invalid YAML"); // rethrow for exceptionFn
		}

		// then convert json to csv
		var converted = $this.json2csv({
			data : jsonObj
		});

		return converted
	}
	AKD_Formatter.prototype.jade2Html = function (text) {
		if(!window["jade"] && typeof window["jade"] !== "function") return text;
		
		var jadeText = jade.render(text, { pretty : true });
		jadeText = jadeText.replace(/^\n/, '');
		return jadeText;
	}
	AKD_Formatter.prototype.html2jade = function html2jade(text, asyncResultFn) {
		if(!window["Html2Jade"] && typeof window["Html2Jade"] !== "function") return text;
		text = Html2Jade.convertHtml(text, null/* , function (err, ret) {
			if (err) {
				throw new Error(err.toString());
			}
			asyncResultFn(ret);
		} */);
		return text;
	}
	/* asyncResultFn : function (result) {
		$('#html-to-jade-text').val(result);
	} */
	
	AKD_Formatter.prototype.hex2rgb = function hex2rgb(text) {
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
				console.log("Invalid Hex value. Should be #RRGGBB or #RGB");
				return text;
			}

			var rDec = parseInt(r,16);
			var gDec = parseInt(g,16);
			var bDec = parseInt(b,16);

			if (isNaN(rDec)) {
				console.log("Invalid RED value");
				return text;
			} else if (isNaN(gDec)) {
				console.log("Invalid GREEN value");
				return text;
			} else if (isNaN(bDec)) {
				console.log("Invalid BLUE value");
				return text;
			}

			ret += lines[i] + ' rgb(' + rDec + ', ' + gDec + ', ' + bDec + ')\n';
		}
		
		return ret;
	}

    AKD_Formatter.prototype.rgb2hex = function rgb2hex(text) {
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
				console.log("Invalid color on line " + (i+1));
				return text;
			}
		}
		return ret;
	}
	
	AKD_Formatter.prototype.miles2km = function miles2km(text) {
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

	AKD_Formatter.prototype.km2miles = function km2miles(text) {
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

	AKD_Formatter.prototype.cel2far = function cel2far(text) {
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

	AKD_Formatter.prototype.far2cel = function far2cel(text) {
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

	AKD_Formatter.prototype.deg2rad = function deg2rad(text) {
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

	AKD_Formatter.prototype.rad2deg = function rad2deg(text) {
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

	AKD_Formatter.prototype.kg2lbs = function kg2lbs(text) {
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
	
	AKD_Formatter.prototype.lbs2kg = function lbs2kg(text) {
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
	
	AKD_Formatter.prototype.seconds2hms = function seconds2hms(text) {
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
	
	AKD_Formatter.prototype.hms2seconds = function hms2seconds(text) {
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
	
	AKD_Formatter.prototype.md2html = function md2html(text){
		let output = text;
		
		return output;
	}
	
	AKD_Formatter.prototype.html2md = function html2md(text, options){
		if(!window["TurndownService"] || typeof window["TurndownService"] !== "function") return text;
		
		options = options || html_to_md_options()
		var turndownService = new window.TurndownService(options);
		// strip leading whitespace so it isn\'t evaluated as code
		var leadingWs = text.match(/^\n?(\s*)/)[1].length,
		leadingTabs = text.match(/^\n?(\t*)/)[1].length;
		var output = text;
		
		if(leadingTabs > 0){
			output = text.replace(new RegExp('\n?\t{' + leadingTabs + '}','g'), '\n');
		} else if(leadingWs > 1){
			output = text.replace(new RegExp('\n? {' + leadingWs + '}','g'), '\n');
		}
		
		output = turndownService.turndown(output);
		
		return output
	}
	/**
	* parseHTML
	*
	* function parseHTML(html, context){
		var t = (context || document).createElement('template');
		t.innerHTML = html;
		return t.content;
	}
	*/
	AKD_Formatter.prototype.parseHTML = (function(){
		let rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, 
		rtagName = /<([\w:]+)/, 
		rhtml = /<|&#?\w+;/, 
		// We have to close these tags to support XHTML (#13200)
		wrapMap = {
			// support: IE9
			option: [1, '<select multiple="multiple">', '</select>'],
			thead: [1, '<table>', '</table>'],
			col: [2, '<table><colgroup>', '</colgroup></table>'],
			tr: [2, '<table><tbody>', '</tbody></table>'],
			td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
			
			_default: [0, "", ""]
		};
		
		/**
		* @param {String} elem A string containing html
		* @param {Document} context
		*/
		return function parseHTML(elem, context){
			context = context || document;
			let tmp, tag, wrap, j, fragment = context.createDocumentFragment();
			if(!rhtml.test(elem)){
				fragment.appendChild(context.createTextNode(elem));
			} else {
				tmp = fragment.appendChild(context.createElement("div"));
				
				// Deserialize a standard representation
				tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
				wrap = wrapMap[tag] || wrapMap._default;
				tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
				
				// Descend through wrappers to the right content
				j = wrap[0];
				while(j--){
					tmp = tmp.lastChild;
				}
				
				// Remove wrappers and append created nodes to fragment
				fragment.removeChild(fragment.firstChild);
				while(tmp.firstChild){
					fragment.appendChild(tmp.firstChild);
				}
			}
			
			return fragment;
		};
	})();
	/**
	* Sanitize an HTML string
	* @param {String}  str The HTML string to sanitize.
	* @param {Boolean}  nodes If true, returrns HTML nodes instead of a string;
	* @param {String|NodeList}  The sanitized strin or nodes.
	*/
	AKD_Formatter.prototype.cleanHTML = function(str, nodes){
		/**
		* Convert the string to an HTML document
		* @return {Node} An HTML document
		*/
		function stringToHTML(){
			let parser = new DOMParser();
			let doc = parser.parseFromString(str, "text/html");
			return doc.body || document.createElement('body');
		}
		
		/**
		* Check if the attribute is potentially dangerous
		* @param {String} name The attribute name
		* @param {String} value The attribute value
		* @return {Boolean} If true, the attribute is potentially dangerous
		*/
		function isPotentiallyDangerous(name, value){
			let val = value.replace(/\s+/g).toLowerCase();
			if(['src','href','xlink:href'].includes(name)){
				if(val.includes('javascript') || val.includes('data:text/html')) return true;
			}
			if(name.startsWith('on')) return true;
		}
		
		/**
		* Remove potentially dangerous attributes from an element
		* @param {Node} elem The element
		*/
		function removeAttributes(elem){
			// if the node is not an element, bail
			if(elem.nodeType !== 1) return;
			
			// Otherwise, loop through each attribute. If it's dangerous remove it
			let atts = elem.attributes;
			for(let {name, value} of atts){
				if(!isPotentiallyDangerous(name, value)) continue;
				elem.removeAttribute(name);
			}
		}
		
		/**
		* Remove <script> elements
		* @param {Node} html The HTML
		*/
		function removeScripts(html){
			let scripts = html.querySelectorAll('script');
			for(let script of scripts){
				script.remove();
			}
		}
		
		/**
		* Remove dangerous stuff from the HTML document's nodes
		* @param {Node} elem The HTML document
		*/
		function cleanHTML(html){
			let nodes = html.childNodes;
			for(let node of nodes){
				removeAttributes(node);
				cleanHTML(node);
			}
		}
		
		// Convert the string to HTML
		let html = stringToHTML();
		
		// Sanitize it
		cleanHTML(html);
		removeScripts(html);
		
		// If the user wants HTML nodes back, return them. Otherwise, pass a sanitized string back.
		return nodes ? html.childNodes : html.innerHTML;
	}
	// -- usage --
	// let div = document.querySelector('#app'), dangerousString = `<p><img src=x onerror="alert('XSS Attack');" /></p><p><a href="javascript:alert('Another XSS Attack');">view my profile</a></p>`
	// let cleaned = cleanHTML(dangerousString);
	
	// return sanitized string
	// app.innerHTML = cleaned;
	
	// return sanitized nodes
	// let cleanedNodes = cleanHTML(dangerousString, true);
	// app.append(...cleanedNodes);
	
	AKD_Formatter.prototype.encodeHTML = (str) => {
		return str.replace(/data:/gi, '').replace(/javascript:/gi, '').replace(/[^\w-_.]/gi, function(c){
			return `&#${c.charCode(0)}`;
		});
	}
	// -- usage --
	// let thirdPartyString = <img src=x onerror="alert('XSS Attack');" />, thirdPartyURL = `javascript:alert('Another XSS Attack');`
	// div.innerHTML = `<p>${thirdPartyString}</p><p><a href="${thirdPartyURL}">view my profile</a></p>`
	
	AKD_Formatter.prototype.decodeHTML = (html) => {
		let txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
		
	}
	AKD_Formatter.prototype.dedupe = (arr) => Array.from(new Set(arr));
	/**
	* Generate an unique alpha-mumeric identifier.
	* To get the same permutation as RFC-4122 use len=24.
	* @param {Number|Integer} len Length of the UUID.
	* @param {Boolean} hyphenate When set to true, hyphebs are added to the UUID.
	* @return {String} The UUID
	*/
	AKD_Formatter.prototype.uuid = (len, hyphenate = false) => {
		let count = 1, id = ('x').repeat(len || 10).replace(/x/g, function(){
			return ((count++ % 5) ? '' : '-') + (Math.random() * 100 % 36 | 0).toString(36);
		});
		return hyphenate ? id : id.replace(/-/g, '');
	}
	/*
	Math.uuid.js (v1.4)
	http://www.broofa.com
	mailto:robert@broofa.com
	Copyright (c) 2010 Robert Kieffer
	Dual licensed under the MIT and GPL licenses.
	
	var Dd;(function(){var a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");Dd=function(){for(var b=Array(36),c=0,d,e=0;36>e;e++)8==e||13==e||18==e||23==e?b[e]="-":14==e?b[e]="4":(2>=c&&(c=33554432+16777216*Math.random()|0),d=c&15,c>>=4,b[e]=a[19==e?d&3|8:d]);return b.join("")}})();
	*/
	
	/* 
	* Create an immutable copy of a wide variety of data types
	* 
	*/
	AKD_Formatter.prototype.immutableCopy = function(obj){
		function copyProps(){
			for(let key in obj){
				if(Object.prototype.hasOwnProperty.call(obj, key)){
					clone[key] = immutableCopy(obj[key]);
				}
			}
		}
		
		function cloneObj(){
			let clone = {};
			copyProps(clone);
			return clone;
		}
		
		function cloneArr(){return obj.map(function(item){return immutableCopy(item);})}
		function cloneMap(){
			let clone = new Map();
			for(let [key, val] of obj){
				clone.set(key, immutableCopy(val));
			}
			return clone;
		}
		function cloneSet(){
			let clone = new Map();
			for(let item of obj){
				clone.add(immutableCopy(item));
			}
			return clone;
		}
		
		function cloneFunctions(){
			let clone = obj.bind(this);
			copyProps(clone)
			return clone;
		}
		
		let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
		
		if(type === "object") return cloneObj();
		if(type === "array") return cloneArr();
		if(type === "map") return cloneMap();
		if(type === "set") return cloneSet();
		if(type === "function") return cloneFunctions();
		return obj;
	}
	
	AKD_Formatter.prototype.textInfo = function(text){
        let length = text.length;
        let wordCount = text.match(/\S+/g).length;
        let lineCount = text.split('\n').length;

        let paragraphs = text.split(/\n\n+/g);
        let paragraphCount = 0;
        for (let i = 0; i < paragraphs.length; i++) {
            if (paragraphs[i].length != 0) {
                paragraphCount++;
            }
        }

        let textSentences = text.split(/[.?!]+/);
        let sentenceCount = 0;
        for (let i = 0; i < textSentences.length; i++) {
            if (/\w/.test(textSentences[i])) {
                sentenceCount++;
            }
        }

        let charStats = {};
        let wordStats = {};

        let asciiCount = 0;
        let extendedAsciiCount = 0;
        let unicodeCount = 0;

        let chars = text.split('');
        for (let i = 0; i < chars.length; i++) {
            let char = chars[i];
            if (charStats[char] === undefined) {
                charStats[char] = 1;
            }
            else {
                charStats[char]++;
            }

            let charCode = char.charCodeAt(0);
            if (charCode >= 0 && charCode <= 127) {
                asciiCount++;
            }
            else if (charCode > 127 && charCode <= 255) {
                extendedAsciiCount++;
            }
            else {
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
            }
            else {
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
            let key = sortedCharStatsKeys[i];
            let strKey = key;
            if (key.charCodeAt(0) == "10") {
                strKey = "↵"; 
            }
            else if (key.charCodeAt(0) == "32") {
                strKey = "⎵";
            }

            retText += strKey + ": " + charStats[key] + "\n";
        }   

        return retText;
    }
	AKD_Formatter.prototype.html_tag_printer = function(content,dspElem,type,editable){
		const log = true;
		const isContentEditable = editable || true;
		const scriptType = type || "script";
		const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const proccess = (code,dspElem) => {
			var random_id = String(Math.random()).replace('.','').replace('-','');
			//var s = document.querySelector('script');
			var pre = document.createElement('div');
			//pre.className = 'code';
			pre.id = `htp-${random_id}`;
			
			if(!code || code.length === 0) {console.log(`a script was found without a "src" attribute, but it would appear that the "innerHTML" for the script is empty which makes it invalid for this proccess!`);return;}
			
			var lines = code.split(/\n/);
			lines.shift();
			lines.pop();
			lines.forEach(function(line,i){
				if (line.indexOf('!#') !== -1) {
					lines[i] = '<strong>'+lines[i].replace('//!#','')+'</strong>';
				}
			});
			
			var out = `<nav class="flex p--2">
					<button id="code-toggler-${random_id}" class="button primary" >toggle height</button>
				</nav>
				<ol id="code-${random_id}" class="code" contenteditable="${isContentEditable}" data-toggle-event="none">
					<li>
						${lines.join('</li><li>')}
					</li>
				</ol>`;
			//console.log(pre);
			pre.innerHTML = out;
			if(dspElem && dspElem instanceof HTMLElement){
				dspElem.appendChild(pre);
			} else {
				s.parentNode.insertBefore(pre,s);
			}
			
			const codeBlock = document.getElementById(`code-${random_id}`);
			if(codeBlock && codeBlock instanceof HTMLElement){
				const _cacheHeight = codeBlock.style.height;
				
				document.getElementById(`code-toggler-${random_id}`).addEventListener('click', e => {
					e.preventDefault();
					codeBlock.classList.toggle('toggled');
					if(codeBlock.classList.contains('toggled')){
						codeBlock.style.height = "100%";
						//codeBlock.style.height = codeBlock.scrollHeight + "px";
						codeBlock.setAttribute('data-toggle-event','click');
					} else {
						codeBlock.style.height = _cacheHeight || "25vh";
						codeBlock.setAttribute('data-toggle-event','none');
					}
				});
				codeBlock.addEventListener('focus', e => {
					if(!e.target.classList.contains('toggled')) {
						e.target.classList.add('toggled');
						e.target.style.height = "100%";
						document.getElementById(`code-toggler-${random_id}`).classList.add('is-active');
					}
				});
				codeBlock.addEventListener('blur', e => {
					if(e.target.getAttribute('data-toggle-event') !== 'click' && e.target.classList.contains('toggled')) {
						e.target.classList.remove('toggled');
						e.target.style.height = _cacheHeight || "25vh";
						document.getElementById(`code-toggler-${random_id}`).classList.remove('is-active');
					}
				});
			}
			// Remove link to parent if included in iframe
			if (parent.frames.length > 0) {
				document.querySelector('p').style.display = 'none';
			}
			
			return out;
		}
		
		//if(content && (content instanceof HTMLElement || (typeof content === "string" && content.length > 0) || (content.length && content.length > 0)) && dspElem){
		if(content && (content instanceof HTMLElement || (content.length && content.length > 0)) && dspElem){
			let start = Date.now();
			if(log) console.log("proccessing content start... at "+start);
			if(typeof(content) === "object" && content.length > 0){
				content.forEach(cont => {
					cont = cont instanceof HTMLElement ? cont.innerHTML : cont;
					var code = cont.replace(new RegExp(escapeRegExp('<'), 'g'),"&lt;");
					proccess(code,dspElem);
				});
			} else {
				content = typeof content === "string" ? content : content.innerHTML;
				var code = content.replace(new RegExp(escapeRegExp('<'), 'g'),"&lt;");
				proccess(code,dspElem);
			}
			if(log) {
				let end = Date.now();
				let total = end - start;
				console.log("proccessing content ended at ..." + end);
				console.log("this proccess took ..." + total + "ms");
			}
			return;
		}
		
		var scripts = document.querySelectorAll(scriptType);
		if(!scripts || scripts.length === 0) {console.log('no script found, or invalid script type entered!',scriptType);return;}
		
		Array.from(scripts).forEach( s => {
			if(s && s.hasAttribute("src") && s.getAttribute("src").length > 3) {console.log(`a script was found with a valdated "src" attribute which makes it invalid for this proccess, only inline script are allowed!`);return;}
			if(!s.classList.contains("noshow")){
				var code = s.innerHTML.replace(new RegExp(escapeRegExp('<'), 'g'),"&lt;");
				//code = code.trim();
				proccess(code,dspElem);
			}
		});
		
		return this;
	}
	//==============================================================================
	
	function html_to_md_options () {
		let opts = {}
		let inputs = $html_to_md_optionsForm[0].getElementsByTagName('select')
		for (let i = 0; i < inputs.length; i++) {
			let input = inputs[i]
			opts[input.name] = input.value
		}
		return opts
	}
	
	function encode64(input) {
		let output = "", i = 0, l = input.length,
		key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", 
		chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		while (i < l) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) enc3 = enc4 = 64;
			else if (isNaN(chr3)) enc4 = 64;
			output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
		}
		return output;
	}

	// https://github.com/beatgammit/base64-js
	// mit license

	function Base64Thing () {
		'use strict'

		let lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		let Arr = (typeof Uint8Array !== 'undefined') ? Uint8Array : Array

		let PLUS = '+'.charCodeAt(0)
		let SLASH = '/'.charCodeAt(0)
		let NUMBER = '0'.charCodeAt(0)
		let LOWER = 'a'.charCodeAt(0)
		let UPPER = 'A'.charCodeAt(0)
		let PLUS_URL_SAFE = '-'.charCodeAt(0)
		let SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			let code = elt.charCodeAt(0)
			if (code === PLUS || code === PLUS_URL_SAFE) return 62 // '+'
			if (code === SLASH || code === SLASH_URL_SAFE) return 63 // '/'
			if (code < NUMBER) return -1 // no match
			if (code < NUMBER + 10) return code - NUMBER + 26 + 26
			if (code < UPPER + 26) return code - UPPER
			if (code < LOWER + 26) return code - LOWER + 26
		}

		this.b64ToByteArray = function (b64) {
			let i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			let len = b64.length
			placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			let L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		this.uint8ToBase64 = function (uint8) {
			let i
			let extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
			let output = ''
			let temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
				default:
					break
			}

			return output
		}
	}
	//==============================================================================
/**
 * cssmin.js
 * Author: Stoyan Stefanov - http://phpied.com/
 * This is a JavaScript port of the CSS minification tool
 * distributed with YUICompressor, itself a port 
 * of the cssmin utility by Isaac Schlueter - http://foohack.com/ 
 * Permission is hereby granted to use the JavaScript version under the same
 * conditions as the YUICompressor (original YUICompressor note below).
 */
 
/*
* YUI Compressor
* Author: Julien Lecomte - http://www.julienlecomte.net/
* Copyright (c) 2009 Yahoo! Inc. All rights reserved.
* The copyrights embodied in the content of this file are licensed
* by Yahoo! Inc. under the BSD (revised) open source license.
*/
//( function() {
	var cssminify = function (css, linebreakpos) {
		var startIndex = 0, 
			endIndex = 0,
			iemac = false,
			preserve = false,
			i = 0, max = 0,
			preservedTokens = [],
			token = '';

		// preserve strings so their content doesn't get accidentally minified
		css = css.replace(/("([^\\"]|\\.|\\)*")|('([^\\']|\\.|\\)*')/g, function(match) {
			var quote = match[0];
			preservedTokens.push(match.slice(1, -1));
			return quote + "___YUICSSMIN_PRESERVED_TOKEN_" + (preservedTokens.length - 1) + "___" + quote;
		});

		// Remove all comment blocks...
		while ((startIndex = css.indexOf("/*", startIndex)) >= 0) {
			preserve = css.length > startIndex + 2 && css[startIndex + 2] === '!';
			endIndex = css.indexOf("*/", startIndex + 2);
			if (endIndex < 0) {
				if (!preserve) {
					css = css.slice(0, startIndex);
				}
			} else if (endIndex >= startIndex + 2) {
				if (css[endIndex - 1] === '\\') {
					// Looks like a comment to hide rules from IE Mac.
					// Leave this comment, and the following one, but shorten them
					css = css.slice(0, startIndex) + "/*\\*/" + css.slice(endIndex + 2);
					startIndex += 5;
					iemac = true;
				} else if (iemac && !preserve) {
					css = css.slice(0, startIndex) + "/**/" + css.slice(endIndex + 2);
					startIndex += 4;
					iemac = false;
				} else if (!preserve) {
					css = css.slice(0, startIndex) + css.slice(endIndex + 2);
				} else {
					// preserve
					token = css.slice(startIndex+3, endIndex); // 3 is "/*!".length
					preservedTokens.push(token);
					css = css.slice(0, startIndex+2) + "___YUICSSMIN_PRESERVED_TOKEN_" + (preservedTokens.length - 1) + "___" + css.slice(endIndex);
					if (iemac) iemac = false;
					startIndex += 2;
				}
			}
		}
		
		// Normalize all whitespace strings to single spaces. Easier to work with that way.
		css = css.replace(/\s+/g, " ");

		// Remove the spaces before the things that should not have spaces before them.
		// But, be careful not to turn "p :link {...}" into "p:link{...}"
		// Swap out any pseudo-class colons with the token, and then swap back.
		css = css.replace(/(^|\})(([^\{:])+:)+([^\{]*\{)/g, function(m) {
			return m.replace(":", "___YUICSSMIN_PSEUDOCLASSCOLON___");
		});
		css = css.replace(/\s+([!{};:>+\(\)\],])/g, '$1');
		css = css.replace(/___YUICSSMIN_PSEUDOCLASSCOLON___/g, ":");

		// retain space for special IE6 cases
		css = css.replace(/:first-(line|letter)({|,)/g, ":first-$1 $2");
			
		// no space after the end of a preserved comment
		css = css.replace(/\*\/ /g, '*/'); 
		
		 
		// If there is a @charset, then only allow one, and push to the top of the file.
		css = css.replace(/^(.*)(@charset "[^"]*";)/gi, '$2$1');
		css = css.replace(/^(\s*@charset [^;]+;\s*)+/gi, '$1');
		
		// Put the space back in some cases, to support stuff like
		// @media screen and (-webkit-min-device-pixel-ratio:0){
		css = css.replace(/\band\(/gi, "and (");
		

		// Remove the spaces after the things that should not have spaces after them.
		css = css.replace(/([!{}:;>+\(\[,])\s+/g, '$1');

		// remove unnecessary semicolons
		css = css.replace(/;+}/g, "}");

		// Replace 0(px,em,%) with 0.
		css = css.replace(/([\s:])(0)(px|em|%|in|cm|mm|pc|pt|ex)/gi, "$1$2");

		// Replace 0 0 0 0; with 0.
		css = css.replace(/:0 0 0 0;/g, ":0;");
		css = css.replace(/:0 0 0;/g, ":0;");
		css = css.replace(/:0 0;/g, ":0;");
		// Replace background-position:0; with background-position:0 0;
		css = css.replace(/background-position:0;/gi, "background-position:0 0;");

		// Replace 0.6 to .6, but only when preceded by : or a white-space
		css = css.replace(/(:|\s)0+\.(\d+)/g, "$1.$2");

		// Shorten colors from rgb(51,102,153) to #336699
		// This makes it more likely that it'll get further compressed in the next step.
		css = css.replace(/rgb\s*\(\s*([0-9,\s]+)\s*\)/gi, function(){
			var rgbcolors = arguments[1].split(',');
			for (var i = 0; i < rgbcolors.length; i++) {
				rgbcolors[i] = parseInt(rgbcolors[i], 10).toString(16);
				if (rgbcolors[i].length === 1) {
					rgbcolors[i] = '0' + rgbcolors[i];
				}
			}
			return '#' + rgbcolors.join('');
		});
		

		// Shorten colors from #AABBCC to #ABC. Note that we want to make sure
		// the color is not preceded by either ", " or =. Indeed, the property
		//     filter: chroma(color="#FFFFFF");
		// would become
		//     filter: chroma(color="#FFF");
		// which makes the filter break in IE.
		css = css.replace(/([^"'=\s])(\s*)#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])/gi, function(){ 
			var group = arguments;
			if (
				group[3].toLowerCase() === group[4].toLowerCase() &&
				group[5].toLowerCase() === group[6].toLowerCase() &&
				group[7].toLowerCase() === group[8].toLowerCase()
			) {
				return (group[1] + group[2] + '#' + group[3] + group[5] + group[7]).toLowerCase();
			} else {
				return group[0].toLowerCase();
			}
		});
		

		// Remove empty rules.
		css = css.replace(/[^\};\{\/]+\{\}/g, "");

		if (linebreakpos >= 0) {
			// Some source control tools don't like it when files containing lines longer
			// than, say 8000 characters, are checked in. The linebreak option is used in
			// that case to split long lines after a specific column.
			startIndex = 0; 
			i = 0;
			while (i < css.length) {
				if (css[i++] === '}' && i - startIndex > linebreakpos) {
					css = css.slice(0, i) + '\n' + css.slice(i);
					startIndex = i;
				}
			}
		}

		// Replace multiple semi-colons in a row by a single one
		// See SF bug #1980989
		css = css.replace(/;;+/g, ";");

		// restore preserved comments and strings
		for(i = 0, max = preservedTokens.length; i < max; i++) {
			css = css.replace("___YUICSSMIN_PRESERVED_TOKEN_" + i + "___", preservedTokens[i]);
		}
		
		// Trim the final string (for any leading or trailing white spaces)
		css = css.replace(/^\s+|\s+$/g, "");
		return css;
	};
	
	AKD_Formatter.prototype.cssminify = cssminify
	/* //Node.js
	if ( typeof module === "object" && typeof exports === "object" && module.exports === exports ) {
		exports.cssminify = cssminify;
	}

	//web browser
	else if ( typeof window === "object" ) {
		if ( typeof AKD !== "object" ) {
			AKD = { compressor: { cssmin:cssminify, cssminify:cssminify } };
		}
		else if ( typeof AKD.compressor !== "object" ) {
			AKD.compressor = { cssmin:cssminify, cssminify:cssminify };
		}
		else {
			AKD.compressor.cssmin = AKD.compressor.cssminify = cssminify;
		}
	}
})(); */
	//==============================================================================
	/*
 Copyright (c) 2013, Rodrigo González, Sapienlab All Rights Reserved.
 Available via MIT LICENSE. See https://github.com/roro89/jsonpack/blob/master/LICENSE.md for details.

(function(define) {
	define([], function() {
 */
	AKD_Formatter.prototype.jsonpack = function() {
		let TOKEN_TRUE = -1, TOKEN_FALSE = -2, 
		TOKEN_NULL = -3, TOKEN_EMPTY_STRING = -4, 
		TOKEN_UNDEFINED = -5;

		let pack = function(json, options) {
			// Canonizes the options
			options = options || {};
			// A shorthand for debugging
			let verbose = options.verbose || false;
			verbose && console.log('Normalize the JSON Object');
			// JSON as Javascript Object (Not string representation)
			json = typeof json === 'string' ? this.JSON.parse(json) : json;
			verbose && console.log('Creating a empty dictionary');
			// The dictionary
			let dictionary = {
				strings : [],
				integers : [],
				floats : []
			};

			verbose && console.log('Creating the AST');

			// The AST
			var ast = (function recursiveAstBuilder(item) {
				verbose && console.log('Calling recursiveAstBuilder with ' + this.JSON.stringify(item));
				// The type of the item
				var type = typeof item;
				// Case 7: The item is null
				if (item === null) {
					return {
						type : 'null',
						index : TOKEN_NULL
					};
				}
				
				//add undefined 
				if (typeof item === 'undefined') {
					return {
						type : 'undefined',
						index : TOKEN_UNDEFINED
					};
				}

				// Case 1: The item is Array Object
				if ( item instanceof Array) {
					// Create a new sub-AST of type Array (@)
					var ast = ['@'];
					// Add each items
					for (var i in item) {
						if (!item.hasOwnProperty(i)) continue;
						ast.push(recursiveAstBuilder(item[i]));
					}
					// And return
					return ast;
				}

				// Case 2: The item is Object
				if (type === 'object') {
					// Create a new sub-AST of type Object ($)
					var ast = ['$'];
					// Add each items
					for (var key in item) {
						if (!item.hasOwnProperty(key))
							continue;
						ast.push(recursiveAstBuilder(key));
						ast.push(recursiveAstBuilder(item[key]));
					}
					// And return
					return ast;
				}

				// Case 3: The item empty string
				if (item === '') {
					return {
						type : 'empty',
						index : TOKEN_EMPTY_STRING
					};
				}

				// Case 4: The item is String
				if (type === 'string') {
					// The index of that word in the dictionary
					var index = _indexOf.call(dictionary.strings, item);
					// If not, add to the dictionary and actualize the index
					if (index == -1) {
						dictionary.strings.push(_encode(item));
						index = dictionary.strings.length - 1;
					}
					// Return the token
					return {
						type : 'strings',
						index : index
					};
				}

				// Case 5: The item is integer
				if (type === 'number' && item % 1 === 0) {
					// The index of that number in the dictionary
					var index = _indexOf.call(dictionary.integers, item);
					// If not, add to the dictionary and actualize the index
					if (index == -1) {
						dictionary.integers.push(_base10To36(item));
						index = dictionary.integers.length - 1;
					}
					// Return the token
					return {
						type : 'integers',
						index : index
					};
				}

				// Case 6: The item is float
				if (type === 'number') {
					// The index of that number in the dictionary
					var index = _indexOf.call(dictionary.floats, item);
					// If not, add to the dictionary and actualize the index
					if (index == -1) {
						// Float not use base 36
						dictionary.floats.push(item);
						index = dictionary.floats.length - 1;
					}
					// Return the token
					return {
						type : 'floats',
						index : index
					};
				}
				// Case 7: The item is boolean
				if (type === 'boolean') {
					return {
						type : 'boolean',
						index : item ? TOKEN_TRUE : TOKEN_FALSE
					};
				}
				// Default
				throw new Error('Unexpected argument of type ' + typeof (item));
			})(json);

			// A set of shorthands proxies for the length of the dictionaries
			var stringLength = dictionary.strings.length;
			var integerLength = dictionary.integers.length;
			var floatLength = dictionary.floats.length;

			verbose && console.log('Parsing the dictionary');

			// Create a raw dictionary
			var packed = dictionary.strings.join('|');
			packed += '^' + dictionary.integers.join('|');
			packed += '^' + dictionary.floats.join('|');

			verbose && console.log('Parsing the structure');

			// And add the structure
			packed += '^' + (function recursiveParser(item) {
				verbose && console.log('Calling a recursiveParser with ' + this.JSON.stringify(item));
				// If the item is Array, then is a object of
				// type [object Object] or [object Array]
				if ( item instanceof Array) {
					// The packed resulting
					var packed = item.shift();
					for (var i in item) {
						if (!item.hasOwnProperty(i)) 
							continue;
						packed += recursiveParser(item[i]) + '|';
					}

					return (packed[packed.length - 1] === '|' ? packed.slice(0, -1) : packed) + ']';
				}

				// A shorthand proxies
				var type = item.type, index = item.index;

				if (type === 'strings') {
					// Just return the base 36 of index
					return _base10To36(index);
				}

				if (type === 'integers') {
					// Return a base 36 of index plus stringLength offset
					return _base10To36(stringLength + index);
				}

				if (type === 'floats') {
					// Return a base 36 of index plus stringLength and integerLength offset
					return _base10To36(stringLength + integerLength + index);
				}

				if (type === 'boolean') {
					return item.index;
				}

				if (type === 'null') {
					return TOKEN_NULL;
				}

				if (type === 'undefined') {
					return TOKEN_UNDEFINED;
				}

				if (type === 'empty') {
					return TOKEN_EMPTY_STRING;
				}

				throw new TypeError('The item is alien!');
			})(ast);

			verbose && console.log('Ending parser');

			// If debug, return a internal representation of dictionary and stuff
			if (options.debug)
				return {
					dictionary : dictionary,
					ast : ast,
					packed : packed
				};
				
			return packed;
		};

		var unpack = function(packed, options) {
			// Canonizes the options
			options = options || {};
			// A raw buffer
			var rawBuffers = packed.split('^');
			// Create a dictionary
			options.verbose && console.log('Building dictionary');
			var dictionary = [];
			// Add the strings values
			var buffer = rawBuffers[0];
			if (buffer !== '') {
				buffer = buffer.split('|');
				options.verbose && console.log('Parse the strings dictionary');
				for (var i=0, n=buffer.length; i<n; i++){
					dictionary.push(_decode(buffer[i]));
				}
			}

			// Add the integers values
			buffer = rawBuffers[1];
			if (buffer !== '') {
				buffer = buffer.split('|');
				options.verbose && console.log('Parse the integers dictionary');
				for (var i=0, n=buffer.length; i<n; i++){
					dictionary.push(_base36To10(buffer[i]));
				}
			}

			// Add the floats values
			buffer = rawBuffers[2];
			if (buffer !== '') {
				buffer = buffer.split('|')
				options.verbose && console.log('Parse the floats dictionary');
				for (var i=0, n=buffer.length; i<n; i++){
					dictionary.push(parseFloat(buffer[i]));
				}
			}
			// Free memory
			delete buffer;

			options.verbose && console.log('Tokenizing the structure');

			// Tokenizer the structure
			var number36 = '';
			var tokens = [];
			var len=rawBuffers[3].length;
			for (var i = 0; i < len; i++) {
				var symbol = rawBuffers[3].charAt(i);
				if (symbol === '|' || symbol === '$' || symbol === '@' || symbol === ']') {
					if (number36) {
						tokens.push(_base36To10(number36));
						number36 = '';
					}
					symbol !== '|' && tokens.push(symbol);
				} else {
					number36 += symbol;
				}
			}

			// A shorthand proxy for tokens.length
			var tokensLength = tokens.length;
			// The index of the next token to read
			var tokensIndex = 0;
			options.verbose && console.log('Starting recursive parser');
			return (function recursiveUnpackerParser() {
				// Maybe '$' (object) or '@' (array)
				var type = tokens[tokensIndex++];
				options.verbose && console.log('Reading collection type ' + (type === '$' ? 'object' : 'Array'));
				// Parse an array
				if (type === '@') {
					var node = [];
					for (; tokensIndex < tokensLength; tokensIndex++) {
						var value = tokens[tokensIndex];
						options.verbose && console.log('Read ' + value + ' symbol');
						if (value === ']')
							return node;
						if (value === '@' || value === '$') {
							node.push(recursiveUnpackerParser());
						} else {
							switch(value) {
								case TOKEN_TRUE:
									node.push(true);
									break;
								case TOKEN_FALSE:
									node.push(false);
									break;
								case TOKEN_NULL:
									node.push(null);
									break;
								case TOKEN_UNDEFINED:
									node.push(undefined);
									break;
								case TOKEN_EMPTY_STRING:
									node.push('');
									break;
								default:
									node.push(dictionary[value]);
							}

						}
					}

					options.verbose && console.log('Parsed ' + this.JSON.stringify(node));

					return node;
				}

				// Parse a object
				if (type === '$') {
					var node = {};
					for (; tokensIndex < tokensLength; tokensIndex++) {
						var key = tokens[tokensIndex];
						if (key === ']') return node;

						if (key === TOKEN_EMPTY_STRING) key = '';
						else key = dictionary[key];

						var value = tokens[++tokensIndex];

						if (value === '@' || value === '$') {
							node[key] = recursiveUnpackerParser();
						} else {
							switch(value) {
								case TOKEN_TRUE:
									node[key] = true;
									break;
								case TOKEN_FALSE:
									node[key] = false;
									break;
								case TOKEN_NULL:
									node[key] = null;
									break;
								case TOKEN_UNDEFINED:
									node[key] = undefined;
									break;
								case TOKEN_EMPTY_STRING:
									node[key] = '';
									break;
								default:
									node[key] = dictionary[value];
							}

						}
					}

					options.verbose && console.log('Parsed ' + this.JSON.stringify(node));

					return node;
				}

				throw new TypeError('Bad token ' + type + ' isn\'t a type');
			})();
		}
		/**
		 * Get the index value of the dictionary
		 * @param {Object} dictionary a object that have two array attributes: 'string' and 'number'
		 * @param {Object} data
		 */
		var _indexOfDictionary = function(dictionary, value) {
			// The type of the value
			var type = typeof value;
			// If is boolean, return a boolean token
			if(type === 'boolean') return value ? TOKEN_TRUE : TOKEN_FALSE;
			// If is null, return a... yes! the null token
			if(value === null) return TOKEN_NULL;

			//add undefined
			if(typeof value === 'undefined') return TOKEN_UNDEFINED;


			if(value === '') {
				return TOKEN_EMPTY_STRING;
			}

			if(type === 'string') {
				value = _encode(value);
				var index = _indexOf.call(dictionary.strings, value);
				if (index === -1) {
					dictionary.strings.push(value);
					index = dictionary.strings.length - 1;
				}
			}

			// If has an invalid JSON type (example a function)
			if (type !== 'string' && type !== 'number') {
				throw new Error('The type is not a JSON type');
			};

			if (type === 'string') {// string
				value = _encode(value);
			} else if (value % 1 === 0) {// integer
				value = _base10To36(value);
			} else {// float

			}

			// If is number, "serialize" the value
			value = type === 'number' ? _base10To36(value) : _encode(value);
			// Retrieve the index of that value in the dictionary
			var index = _indexOf.call(dictionary[type], value);
			// If that value is not in the dictionary
			if (index === -1) {
				// Push the value
				dictionary[type].push(value);
				// And return their index
				index = dictionary[type].length - 1;
			}

			// If the type is a number, then add the '+'  prefix character
			// to differentiate that they is a number index. If not, then
			// just return a 36-based representation of the index
			return type === 'number' ? '+' + index : index;

		};

		var _encode = function(str) {
			if ( typeof str !== 'string')
				return str;

			return str.replace(/[\+ \|\^\%]/g, function(a) {
				return ({
				' ' : '+',
				'+' : '%2B',
				'|' : '%7C',
				'^' : '%5E',
				'%' : '%25'
				})[a]
			});
		};

		var _decode = function(str) {
			if ( typeof str !== 'string')
				return str;

			return str.replace(/\+|%2B|%7C|%5E|%25/g, function(a) {
				return ({
				'+' : ' ',
				'%2B' : '+',
				'%7C' : '|',
				'%5E' : '^',
				'%25' : '%'
				})[a]
			})
		};

		var _base10To36 = function(number) {
			return Number.prototype.toString.call(number, 36).toUpperCase();
		};

		var _base36To10 = function(number) {
			return parseInt(number, 36);
		};

		var _indexOf = Array.prototype.indexOf ||
		function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};

		return {
			JSON : JSON,
			pack : pack,
			unpack : unpack
		};

	}

	
	function xml2json(xml, tab, attributes) {
	attributes = typeof attributes === 'undefined' ? true : !!attributes;
	var space = !!tab.length;
	var X = {
		toObj: function (xml) {
			var o = {};
			if (xml.nodeType == 1) {   // element node ..
				if (attributes && xml.attributes.length)   // element with attributes  ..
					for (var i = 0; i < xml.attributes.length; i++)
						o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
				if (xml.firstChild) { // element has child nodes ..
					var textChild = 0, cdataChild = 0, hasElementChild = false;
					for (var n = xml.firstChild; n; n = n.nextSibling) {
						if (n.nodeType == 1) hasElementChild = true;
						else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
						else if (n.nodeType == 4) cdataChild++; // cdata section node
					}
					if (hasElementChild) {
						if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
							X.removeWhite(xml);
							for (var n = xml.firstChild; n; n = n.nextSibling) {
								if (n.nodeType == 3)  // text node
									o["#text"] = X.escape(n.nodeValue);
								else if (n.nodeType == 4)  // cdata node
									o["#cdata"] = X.escape(n.nodeValue);
								else if (o[n.nodeName]) {  // multiple occurence of element ..
									if (o[n.nodeName] instanceof Array)
										o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
									else
										o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
								}
								else  // first occurence of element..
									o[n.nodeName] = X.toObj(n);
							}
						}
						else { // mixed content
							if (!xml.attributes.length)
								o = X.escape(X.innerXml(xml));
							else
								o["#text"] = X.escape(X.innerXml(xml));
						}
					}
					else if (textChild) { // pure text
						if (attributes && xml.attributes.length)
							o["#text"] = X.escape(X.innerXml(xml));
						else
							o = X.escape(X.innerXml(xml));
					}
					else if (cdataChild) { // cdata
						if (cdataChild > 1)
							o = X.escape(X.innerXml(xml));
						else
							for (var n = xml.firstChild; n; n = n.nextSibling)
								o["#cdata"] = X.escape(n.nodeValue);
					}
				}
				if (!xml.attributes.length && !xml.firstChild) o = null;
			}
			else if (xml.nodeType == 9) { // document.node
				o = X.toObj(xml.documentElement);
			}
			else
				alert("unhandled node type: " + xml.nodeType);
			return o;
		},
		toJson: function (o, name, ind) {
			var json = name ? ("\"" + name + "\"") : "";
			if (o instanceof Array) {
				for (var i = 0, n = o.length; i < n; i++)
					o[i] = X.toJson(o[i], "", ind + "\t");
				json += (name ? (space ? ": [" : ":[") : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
			}
			else if (o == null)
				json += (name && ":") + "null";
			else if (typeof(o) == "object") {
				var arr = [];
				for (var m in o)
					arr[arr.length] = X.toJson(o[m], m, ind + "\t");
				json += (name ? (space ? ": {" : ":{") : "{") + (arr.length >= 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
			}
			else if (typeof(o) == "string")
				json += (name && (space ? ": " : ":")) + "\"" + o.toString() + "\"";
			else
				json += (name && (space ? ": " : ":")) + o.toString();
			return json;
		},
		innerXml: function (node) {
			var s = ""
			if ("innerHTML" in node)
				s = node.innerHTML;
			else {
				var asXml = function (n) {
					var s = "";
					if (n.nodeType == 1) {
						s += "<" + n.nodeName;
						for (var i = 0; i < n.attributes.length; i++)
							s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
						if (n.firstChild) {
							s += ">";
							for (var c = n.firstChild; c; c = c.nextSibling)
								s += asXml(c);
							s += "</" + n.nodeName + ">";
						}
						else
							s += "/>";
					}
					else if (n.nodeType == 3)
						s += n.nodeValue;
					else if (n.nodeType == 4)
						s += "<![CDATA[" + n.nodeValue + "]]>";
					return s;
				};
				for (var c = node.firstChild; c; c = c.nextSibling)
					s += asXml(c);
			}
			return s;
		},
		escape: function (txt) {
			return txt.replace(/[\\]/g, "\\\\")
				.replace(/[\"]/g, '\\"')
				.replace(/[\n]/g, '\\n')
				.replace(/[\r]/g, '\\r');
		},
		removeWhite: function (e) {
			e.normalize();
			for (var n = e.firstChild; n;) {
				if (n.nodeType == 3) {  // text node
					if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
						var nxt = n.nextSibling;
						e.removeChild(n);
						n = nxt;
					}
					else
						n = n.nextSibling;
				}
				else if (n.nodeType == 1) {  // element node
					X.removeWhite(n);
					n = n.nextSibling;
				}
				else                      // any other node
					n = n.nextSibling;
			}
			return e;
		}
	};
	if (xml.nodeType == 9) // document node
		xml = xml.documentElement;
	var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
	return "{" + (space ? "\n" : "") + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + (space ? "\n" : "") + "}";
}
	
	var XMLParser = (function() {
	
	/** *********************************************************************
	 * @param xmlStr
	 * @returns {String}
	 */
	function parse(xmlStr) {
		
		var parser = new DOMParser(),
			doc = parser.parseFromString(xmlStr, "application/xml"),
			err;
		
		return process((err = doc.getElementsByTagName('parsererror')).length ? err : doc.childNodes);
	}
	
	function process(nodes, level) {
		
		var parsed = '',
			i = 0, l = nodes.length;
		
		level = level || 0;
		
		for (; i < l; i++) {
			
			if (nodes[i].nodeType != 1) continue;
			
			parsed += openTag(nodes[i], level);
			
			if (nodes[i].childElementCount) {
				parsed += process(nodes[i].childNodes, level + 1);
				parsed += closeTag(nodes[i], level);
			}
		}
		
		return parsed;
	}
	
	function openTag(node, level) {
		
	    var span = '<div>',
	    	cls  = node.nodeName + '-' + level;

	    span += (new Array(level * 4 + 1).join('&nbsp;')) + 
			    '<span class="tag tag-open ' + cls + '" data-tag="' + cls + '">&lt;' + 
			    node.nodeName + getAttrs(node) + 
			    (hasContent(node) ? '<span class="tag ' + cls + '" data-tag="' + cls + '">&gt;</span>' : '') + '</span>';
		
		if (node.childElementCount) span += '\n';
		else {
			if (node.firstChild) span += node.firstChild.nodeValue;
			span += '<span class="tag ' + cls + '" data-tag="' + cls + '">&lt;/' + node.nodeName + '&gt;</span>';
		}
		
	    return span + '</div>';
	}
	
	function getAttrs(node) {
	    
	    var attrStr = '',
	        attrs = node.attributes,
	        l = attrs.length;
	    
	    for (var i = 0; i < l; i++) {
	        attrStr += ' ' + '<span class="atn">' + attrs[i].nodeName + '</span>' +
				'<span class="pun">' + '=</span><span class="atv">"' + attrs[i].nodeValue + '"</span>';
	    }
		
	    return attrStr ? '</span>' + attrStr : '';
	}
	
	function closeTag(node, level) {

	    var span = '<div>',
	    	cls  = node.nodeName + '-' + level;

		if (node.childElementCount) {
			span += (new Array(level * 4 + 1).join('&nbsp;'));
		}
		if (hasContent(node)) {
			span += '<span class="tag ' + cls + '" data-tag="' + cls + '">&lt;/' + node.nodeName + '&gt;</span>\n';
		}
		else span += '<span class="tag ' + cls + '" data-tag="' + cls + '">/&gt;</span>\n';
		return span + '</div>';
	}
	
	function hasContent(node) {
		return !!node.childNodes.length;
	}

	function toJSON(xmlString, tag, attributes, inline) {
		
		var xml = (new DOMParser()).parseFromString(xmlString, "application/xml"),
			nsRes = (function(element) {
					var nsResolver = element.ownerDocument.createNSResolver(element),
						defaultNamespace = element.getAttribute('xmlns');
					return function(prefix) {
						return nsResolver.lookupNamespaceURI(prefix) || defaultNamespace;
					};
			})(xml.documentElement),
			nsPrefix = xml.documentElement.getAttribute('xmlns') ? 'default:' : '',
			xpath = (new Array(+tag[1] + 1).join('/*')) + '/' + nsPrefix + tag[0],
			nodes = xml.evaluate(xpath, xml, nsRes, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null),
			node  = nodes.iterateNext();
		
		inline = typeof inline === 'undefined' ? false : !!inline;
		return xml2json(node, inline ? "" : "    ", attributes);
	}
	
	return {
		parse: parse,
		toJSON: toJSON
	}
	
})();
/* })( typeof define == 'undefined' || !define.amd ? function(deps, factory) {
	var jsonpack = factory();
	if ( typeof exports != 'undefined')
		for (var key in jsonpack)
		exports[key] = jsonpack[key];
	else
		window.jsonpack = jsonpack;
} : define); */

	//==============================================================================
	window.AKD_Formatter = new AKD_Formatter();

})();
