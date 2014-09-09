define(['./PageView'], function(PageView){	
	return PageController;
	
	function PageController(){
		var scope = this;
		var pageView = undefined;
		
		function init(){
			pageView = new PageView({controller: scope});
		}
		
		init();		
	}
	
});