define(['../BaseContentView',
        'text!./profile.html',
        'dataTableBootstrapJs',
        'css!./profile.css',
        'css!dataTableBootstrapCss'],
function(BaseContentView, html){
	return function(args){
		ProfileContentView.prototype = new BaseContentView(_.extend({html: html}, args));
		ProfileContentView.prototype.constructor = ProfileContentView;
		return new ProfileContentView;
	};
		
	function ProfileContentView(args){
		var scope = this;
		
		// el's		
		var $pagesTable = undefined;  	
		
		// templates
		var pageImgTmpl = _.template('<img src="<%- url %>" />');
		
		var columns = 
			[{data:'picture', name:'picture', title:''},
			 {data:'name', name:'name', title:'Name'},
			 {data:'likes', name:'likes', title:'Likes'}];	
		
		function init(){
			$pagesTable = jQuery('table.pages', scope.$el);
			initPagesTable();
		}		
		
		/**
		 * Shows those pages available for registration.
		 */
		function initPagesTable(){
			$pagesTable.dataTable({
				data: scope.controller.pages.toJSON(),				
				columns: columns,
				createdRow: onCreateRow,
				deferRender: true,
				columnDefs: [{targets: '_all', createdCell: onCreateCell, render: onRenderCell}]
			});	
			//TODO listeners
		}		
		
		/**
		 * Invoked whenever row is created.
		 */
		function onCreateRow(row, data, dataIndex){
			jQuery(row).attr('data-pageid', data.id);
		}
		
		/**
		 * Can be used to format values based on column.
		 */
		function onRenderCell(data, type, row, meta){			
			if(columns[meta.col].data === 'picture'){
				return pageImgTmpl(data.data);
			}
			return data;
		}
		
		/**
		 * Triggered when table creates cell (td).		 
		 * Note: this is called only at creation time. 
		 */
		function onCreateCell(cell, cellData, rowData, rowIndex, colIndex){
			jQuery(cell).attr('data-fieldname', columns[colIndex].name);				
		}	
		
		
		
		init();
	}
});