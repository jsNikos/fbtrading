define(['EventEmitter'], function(EventEmitter){
	var Constructor = function(args){
		BaseContentController.prototype = new EventEmitter();
		return new BaseContentController(args);
	};
	// events
	Constructor.READY =  'ready'; // to be fired when data are loaded and view is ready for calls on 'show';	
	Constructor.SYMBOL_CLICKED = 'symbolClicked'; // fired whenever a symbol is clicked in order to view stock-details page
	
	/**
	 * Abstract-layer for all content-controller.
	 * @param args : urlState (query-params from current-url)
	 */
	function BaseContentController(args){
		this.view = undefined;	
		
		/**
		 * Triggers the view to add initialized content ($el) to given $content.
		 * @param $content, the content in which the view to render
		 */
		this.show = function($content){
			this.view.show($content);
		};
	}	
	
	return Constructor;
	
});