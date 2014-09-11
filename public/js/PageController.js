define(['./PageView'], function(PageView){	
	return PageController;
	
	function PageController(){
		var scope = this;
		var pageView = undefined;
		var currentContentController = undefined;		
		
		// new content must register controller here, type: BaseContentController
		var contentRegister = {
			'market' : 'contents/market/MarketContentController'
		};
		
		function init(){
			initPageView();
			showContent();			
		}
		
		function initPageView(){
			pageView = new PageView({controller: scope});
		}
		
		/**
		 * Base on the given content-name requires for the corresponding controller,
		 * initiates and triggers page-transition on pageView.
		 * @param name : String, if undefined default content is initialized.
		 */
		function showContent(name){
			var controllerUri = contentRegister['market'];
			if(name){
				controllerUri = contentRegister[name];
			}
			if(!controllerUri){
				throw new Error('This content-name is not registered, '+name);
			}
			require([controllerUri], function(Controller){
				currentContentController = new Controller();
			});
		}
		
		init();		
	}
	
});