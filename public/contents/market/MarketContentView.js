define(['../BaseContentView',
        'text!./index.html',
        'dataTableBootstrapJs',
        'css!./index.css',
        'css!dataTableBootstrapCss'],
function(BaseContentView, html){
	return function(args){
		MarketContentView.prototype = new BaseContentView(args);
		return new MarketContentView;
	};
		
	function MarketContentView(){
		var scope = this;
		
		// el's
		var $stocksTable = undefined;		
				
		var columns = 
			[{data:'symbol', name:'symbol', title:'Symbol'},
			 {data:'current_price', name:'current_price', title:'Current Price'},
			 {data:'start_price', name:'start_price', title:'Start Price'},
			 {data:'end_price', name:'end_price', title:'End Price'},
			 {data:'total_shares', name:'total_shares', title:'Total Shares'},
			 {data:'available_shares', name:'available_shares', title:'Available Shares'}];		
		
		function init(){
			scope.$el = jQuery(html);
			$stocksTable = jQuery('table.stocks', scope.$el);
			initStockTable();
		}		
		
		function initStockTable(){
			$stocksTable.dataTable({
				data: scope.controller.stocks.toJSON(),				
				columns: columns,
				createdRow: onCreateRow,
				deferRender: true,
				columnDefs: [{targets: '_all', createCell: onCreateCell, render: onRenderCell}]
			});		
		}		
		
		/**
		 * Can be used to format values base on column.
		 */
		function onRenderCell(data, type, row, meta){
			return data;
		}
		
		/**
		 * Triggered when table creates cell (td).		 
		 * Note: this is called only at creation time. 
		 */
		function onCreateCell(cell, cellData, rowData, rowIndex, colIndex){			
			jQuery(cell).attr('data-columnname', columns[colIndex].name);				
		}			
		
		function onCreateRow(row, data, dataIndex){
			jQuery(row).attr('data-stockid', data.id);
		}		
		
		/**
		 * Triggers to update row corresponding to given stock.
		 */
		this.updateRow = function(stock){		
			var row = $findRow(stock).get(0);
			if(!row){
				return; //not visible
			}
			$stocksTable.DataTable()
						.row(row)
						.data(stock.toJSON())
						.draw();		
		};
		
		function $findRow(stock){		
			return jQuery('[data-stockid="'+stock.get('id')+'"]', $stocksTable);			
		}
		
		init();
	}
});