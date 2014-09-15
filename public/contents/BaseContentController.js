define(['EventEmitter'], function(EventEmitter){
	return function(args){
		BaseContentController.prototype = new EventEmitter();
		return new BaseContentController(args);
	};
	
	/**
	 * Abstract-layer for all content-controller.
	 */
	function BaseContentController(){
		
	}	
	
});