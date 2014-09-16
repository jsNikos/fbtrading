define([ './MarketContentView', '../BaseContentController', 'q'], function(MarketContentView, BaseContentController, Q) {
	return function(args){
		MarketContentController.prototype = new BaseContentController(args);
		return new MarketContentController(args);
	};

	function MarketContentController() {
		var scope = this;
		
		// model-declarations
		var Stock = Backbone.Model.extend({
			url : Backbone.URL_PREFIX + '/stock'
		});
		var Stocks = Backbone.Collection.extend({
			model: Stock,
			url: Backbone.URL_PREFIX + '/stocks.php'
		});
		
		// model-instances
		this.stocks = new Stocks();
		
		// events
		
		function init() {		
			fetchStocks().then(initPageView)
						 .then(scope.fire.bind(scope, BaseContentController.READY))
						 .done();			
		}
		
		function initPageView(){
			var deferred = Q.defer();
			try{
				scope.view = new MarketContentView({controller: scope});
				deferred.resolve();
			}catch(e){				
				fbtrading.handleError(e);
				deferred.reject(e);
			}
			return deferred.promise;
		}
		
		/**
		 * Fetches stocks from server with given paging restrictions.
		 * Omitting restrictions results in fetching all.
		 * @return Q.promise
		 */
		function fetchStocks(page, size){
			//TODO use given page and size ?page=1&size=100
			var deferred = Q.defer();
			scope.stocks.url = scope.stocks.url;
			scope.stocks.fetch({
			error : function(coll, err) {
				fbtrading.handleError(err);
				deferred.reject(new Error('Data could not be fetched!'));
			},
			success : function(stocks) {
				deferred.resolve(stocks);
			}});
			return deferred.promise;
		}

		init();
	}
	;
});