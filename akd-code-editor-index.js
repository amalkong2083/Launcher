function Grid(width, height) {
	this.width = width;
	this.height = height;
	this.cells = new Array(width * height);
}
Grid.prototype.valueAt = function(point) {
	return this.cells[point.y * this.width + point.x];
};
Grid.prototype.setValueAt = function(point, value) {
	this.cells[point.y * this.width + point.x] = value;
};
Grid.prototype.isInside = function(point) {
	return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
};
Grid.prototype.moveValue = function(from, to) {
	this.setValueAt(to, this.valueAt(from));
	this.setValueAt(from, undefined);
};
document.addEventListener('DOMContentLoaded', function(e) {
	"use strict"
	const akdCodeEditor = AKD_CodeEditor({})
		.buildUI({container:"#editor-container",style:"vscode"})
		//.buildUIFromScratch({container:"#akd-editor-view"})
		//.buildUI({container:"#akd-editor-view2"});
	
	/* const grid = new Grid(5, 5);
	grid.setValueAt({x:10,y:11}, 'go-go')
	
	console.log(grid.cells) */
});