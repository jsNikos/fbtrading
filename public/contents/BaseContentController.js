define(['EventEmitter'], function(EventEmitter){
	return function(args){
		BaseContentController.prototype = new EventEmitter();
		return new BaseContentController(args);
	};
	
	/**
	 * Abstract-layer for all content-controller.
	 */
	function BaseContentController(){
		this.view = undefined; 
		
		// events
		BaseContentController.READY = 'ready'; // to be fired when data are loaded and view is ready for calls on 'show'
		
		/**
		 * Triggers the view to add initialized content ($el) to given $content.
		 * @param $content, the content in which the view to render
		 */
		this.show = function($content){
			this.view.show($content);
		};
	}	
	
});