define(['./PageView', 'contents/BaseContentController',
        'backbone', 'bootstrap', 'jquery', 'parseQuery'],
function(PageView, BaseContentController){	
	return PageController;
	
	function PageController(){
		var scope = this;
		var pageView = undefined;
		var currentContentController = undefined;	
		var router = undefined;
		
		// new content must register controller here, type: BaseContentController
		var contentRegister = {
			'market' : 'contents/market/MarketContentController',
			'stockDetails': 'contents/stockDetails/StockDetailsContentController'
		};
		
		function init(){
			jQuery.extend(true, window, {fbtrading: {handleError: handleError}});
			Backbone.URL_PREFIX = 'https://fbstocks.transportops.com/dummy';			
			initPageView();		
			initRouter();	
		}		
		
		/**
		 * Initializes the router. Path+QueryParams are extracted and
		 * delegated to 'showContent'.
		 */
		function initRouter(){
			var Router = Backbone.Router.extend({
				  routes: {
					    '*path': showContent,					 
					  }});
			router = new Router();
			Backbone.history.start({pushState: true});
		}
		
		/**
		 * Standard error-handling.
		 */
		function handleError(args){
			window.console && console.error(args);
		}
		
		function initPageView(){
			pageView = new PageView({controller: scope});
		}
		
		/**
		 * Base on the given parameters requires for the corresponding controller,
		 * initiates and triggers page-transition on pageView.
		 * @param path : url-path
		 * @param query : query-params, the 'content' is used to extract view, the rest is given the content-controller as argument
		 */
		function showContent(path, query){
			var urlState = jQuery.parseQuery(query);
			urlState.content = urlState.content || 'market';
			var controllerUri = contentRegister[urlState.content];			
			if(!controllerUri){
				throw new Error('This content-name is not registered, '+urlState.content);
			}
			require([controllerUri], function(Controller){				
				currentContentController = new Controller(urlState);
				currentContentController
				    .on(BaseContentController.READY, function(){	
						//TODO transition and remove all contents afterwards
						pageView.showContent(currentContentController);
					 })
					.on(BaseContentController.SYMBOL_CLICKED, handleSymbolClicked)
					.init();
			});
		}
		
		/**
		 * Handles click on symbol, triggers page navigation to stockDetails via router.
		 */
		function handleSymbolClicked(stock){
			var queryParams = _.extend({content: 'stockDetails'}, stock);
			router.navigate('index.html?'+jQuery.param(queryParams), {trigger: true});			
		}
		
		init();		
	}
	
});