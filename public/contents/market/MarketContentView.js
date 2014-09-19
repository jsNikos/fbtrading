define(['../BaseContentView',
        'text!./market.html',
        'dataTableBootstrapJs',
        'css!./market.css',
        'css!dataTableBootstrapCss',
        'animojs'],
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
				columnDefs: [{targets: '_all', createdCell: onCreateCell, render: onRenderCell}]
			});		
		}		
		
		/**
		 * Can be used to format values based on column.
		 */
		function onRenderCell(data, type, row, meta){			
			return data;
		}
		
		/**
		 * Triggered when table creates cell (td).		 
		 * Note: this is called only at creation time. 
		 */
		function onCreateCell(cell, cellData, rowData, rowIndex, colIndex){
			jQuery(cell).attr('data-fieldname', columns[colIndex].name);				
		}			
		
		function onCreateRow(row, data, dataIndex){
			jQuery(row).attr('data-stockid', data.id);
		}		
		
		/**
		 * Triggers to update row corresponding to given stock.
		 */
		this.updateRow = function(stock){		
			var $row = $findRow(stock);			
			if(!$row.size()){
				return; //not visible
			}
			$stocksTable.DataTable()
						.row($row.get(0))
						.data(stock.toJSON());
			animatePriceChange($row, stock); 
		};
		
		/**
		 * Triggers animation of price-change for given row.
		 * @param $row 
		 * @param stock : Stock
		 */
		function animatePriceChange($row, stock){
			var $cell = $row.children('[data-fieldname="current_price"]');	
			var animationName;
			if(stock.get('current_price') > stock.get('previous_price')){
				$cell.addClass('priceUp');
				animationName = 'priceUpFlash';
			} else if(stock.get('current_price') < stock.get('previous_price')){
				$cell.addClass('priceDown');
				animationName = 'priceDownFlash';
			}

			animationName && $cell.animo({				
				animation: animationName, 
				duration: 0.6				
			});
			
		}
		
		function $findRow(stock){		
			return jQuery('[data-stockid="'+stock.get('id')+'"]', $stocksTable);			
		}
		
		init();
	}
});