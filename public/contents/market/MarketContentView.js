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
	
	//TODO better use to render the dataTable -api, only the effects must be programmed myself
	function MarketContentView(){
		var scope = this;
		
		// el's
		var $stocksTable = undefined; 
		
		// templates
		var tableHeaderCol = _.template('<th data-colname="<%- name %>"><%- displayName %></th>');
		var tableRow = _.template('<tr data-stockid="<%- id %>"></tr>');
		var tableColumn = _.template('<td data-fieldname="<%- name %>"><%- value %></td>');
		
		var columns = 
			[{name: 'symbol', displayName: 'Symbol'},
			 {name: 'current_price', displayName: 'Current Price'},
			 {name: 'start_price', displayName: 'Start Price'},
			 {name: 'end_price', displayName: 'End Price'},
			 {name: 'total_shares', displayName: 'Total Shares'},
			 {name: 'available_shares', displayName: 'Available Shares'}];
		
		function init(){
			scope.$el = jQuery(html);
			$stocksTable = jQuery('table.stocks', scope.$el);
			initStockTable();
		}		
		
		function initStockTable(){
			createTableHeader();
			createRows();	
			$stocksTable.dataTable();
		}
		
		function createRows(){
			var $tableBody = jQuery('tbody', $stocksTable);
			scope.controller.stocks.forEach(function(stock){
				var $row = jQuery(tableRow({id: stock.get('id')}));
				_.each(columns, function(column){
					$row.append(tableColumn({name: column.name, value: stock.get(column.name)}));
				});
				$tableBody.append($row);
			});
		}
		
		function createTableHeader(){
			var $tr = jQuery('<tr></tr>');
			_.each(columns, function(column){
				$tr.append(tableHeaderCol(column));
			});			
			jQuery('thead', $stocksTable).append($tr);			
		}		
		
		/**
		 * Triggers to update row corresponding to given stock.
		 */
		this.updateRow = function(stock){			
			var row = $findRow(stock).get(0);
			if(row){
				return; //not visible
			}
			var test = $stocksTable.DataTable().row(row).data();
			//TODO
			
		};
		
		function $findRow(stock){		
			return jQuery('[data-stockid="'+stock.get('id')+'"]', $stocksTable);			
		}
		
		init();
	}
});