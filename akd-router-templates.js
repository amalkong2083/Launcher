window.AKD_routerTemplates = {
	'/manager': {
		title: "Router Manager",
		links: [
			"templates", "images", "files", "Optimization"
		], 
		showLinks: true,
		templateString: `<h3><%=obj.title%>:</h3>
		<%if(obj.showLinks) {%>
			<ul class="page-links"> 
				<%for(var index in obj.manager){%>
				<li><a href="#!manager/<%=obj.links[index]%>" data-route-link data-route="/manager/<%=obj.links[index]%>"><%=obj.links[index]%></a></li>
				<%}%>
			</ul> 
		<%} else {%>
			<p>none</p>
		<%}%>`
	}, 
	'/manager/images': function (globalData){
		//console.log(globalData)
		this.title = "Router Manager: Images";
		this.links = [
			"add", "edit", "delete"
		]; 
		this.albumPhotos = globalData?.albumPhotos??{};
		this.imageList = this.albumPhotos?.images;
		/* $$$(document).find(".gallery").css({'display':'block','border':'4px solid #ff0000'}).slideShow(<?php echo $albumPhotos;?>);
		var v = $$$(".gallery").slideShow(<?php //echo $albumPhotos;?>);
		this.galleryContent = v.slideShow;
		*/
		this.galleryContent = '<p>gallery content<\/p>';
		if(Array.isArray(this.imageList) && this.imageList.length > 0){
			this.galleryContent += `<div class="gallery">
				${this.imageList.map(imgSrc=>{return `<img class="thumb" src="${imgSrc}" alt="" />`}).join('')}
			<\/div>`;
		}
		this.templateString = `
		<h1><%= obj.title %></h1>
		<h3>All Images: </h3>
		<%= obj.galleryContent %>
		<br />
		<ul class="page-links">
			<% for(var i = 0;i<obj.links.length;i++){ %>
			<!--<li><a href="#/manager/images/<%= obj.links[i] %>" data-akd-route-link data-akd-route="<%= obj.links[i] %>"><%= obj.links[i] %></a></li>-->
			<li><a href="javascript:void(0);" onclick="show(\'#manage-image-section-<%= obj.links[i] %>\');"><%= obj.links[i] %></a></li>
			<% } %>
		</ul>
		<div id="manage-image-section-add" class="section hidden">
			<h3>Add image</h3>
			<form id="manage-image-form-add" class="router-form" method="" action="">
				<input id="manage-image-form-edit-input-file" class="" type="file" accept="image/jpeg image/png image/gif" multple />
				<button id="" class="" type="submit">add</button>
			</form>
		</div>
		<div id="manage-image-section-edit" class="section hidden">
			<h3>Edit image</h3>
			<form id="manage-image-form-edit" class="router-form" method="" action="">
				<input id="manage-image-form-edit-input-text" class="" type="text" value="" />
				<button id="" class="" type="submit">edit</button>
			</form>
		</div>
		<div id="manage-image-section-delete" class="section hidden">
			<h3>Delete image</h3>
			<form id="manage-image-form-delete" class="router-form" method="" action="">
				<input id="manage-image-form-edit-input-checkbox" class="" type="checkbox" name="batchDelete" value="" />
				<button id="" class="" type="submit">delete</button>
			</form>
		</div>
		`;
	}, 
	'/manager/templates': {
		title: "Router Manager: Templates",
		links: [
			"add", "edit", "delete"
		], 
		templateString: `
		<h1><%= obj.title %></h1>
		<h3>Manager router templates</h3>
		<br />
		<ul class="page-links">
			<% for(var i = 0;i<obj.links.length;i++){ %>
			<li data-route-link data-route="<%= obj.links[i] %>"><%= obj.links[i] %></li>
			<% } %>
		</ul>
		`
	}/* , 
	'/editor': function (globalData){
		//console.log(globalData)
		this.title = "Router Code Editor";
		this.links = [
			"html", "css", "javascript", "all"
		]; 
		this.albumPhotos = globalData?.albumPhotos??{};
		this.imageList = this.albumPhotos?.images;
		
		this.galleryContent = '<p>gallery content<\/p>';
		if(Array.isArray(this.imageList) && this.imageList.length > 0){
			this.galleryContent += `<div class="gallery">
				${this.imageList.map(imgSrc=>{return `<img class="thumb" src="${imgSrc}" alt="" />`}).join('')}
			<\/div>`;
		}
		
		this.splitter = () => {
			alert('pop')
			document.addEventListener("wheel", (e) => {
				console.log(e.target.id)
			});
			//_.akdSplitter("#akd-router-editor-splitter-handle", "#akd-router-editor-tab", "#akd-router-editor-output", "V");
		}
		this.templateString = `
		<h1 class="flex flex--center"><%= obj.title %><span class="ml--auto"><button class="init-splitter">&plus;</button></span></h1>
		<article id="akd-router-editor" class="splitter vertical flex flex--row h--12" data-ratio="50:50" data-splitter-orientation="vertical" akd-onload="load splitter">
			<section id="akd-router-editor-tab" class="akd__tabs splitter_panel first--half">
				<nav id="akd-router-editor-tab-buttons" class="akd__tab-buttons">
					<ul class="akd__tab-buttons-">
						<% for(var i = 0;i<obj.links.length;i++){ %>
						<!--<li><a href="javascript:void(0);" onclick="show(\'#manage-image-section-<%= obj.links[i] %>\');"><%= obj.links[i] %></a></li>-->
						<li><a class="akd__tab-button" href="javascript:void(0);" data-parent-tab="#akd-router-editor-tab" data-target-tab="#akd-router-editor-tab-<%= obj.links[i] %>"><%= obj.links[i] %></a></li>
						<% } %>
					</ul>
				</nav>
				<div id="akd-router-editor-tab-panels" class="akd__tab-panels">
					<div id="akd-router-editor-tab-html" class="akd__tab-panel" data-layout="grid-auto" data-layout-rows="ifr-auto">
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
					<iframe src="./iframe.php?" frameborder="0" scrolling="yes" sandbox="allow-scripts allow-forms allow-same-origin"></iframe>
				</div>
			</section>
		</article>
		<%= obj.splitter %>`;
		
		this.$on('.my-button', 'click', function () {
			_.akdSplitter("#akd-router-editor-splitter-handle", "#akd-router-editor-tab", "#akd-router-editor-output", "V");
			//this.counter += 1;
			//this.$refresh();
		}.bind(this));
	} */
};