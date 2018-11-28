(function($) {
    jQuery(document).ready(function($){
        //OD ADDED
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 50000,
			values: [ 0, 0],
			slide: function( event, ui ) {
			  $( "#amount1" ).val(ui.values[ 0 ]);
			  $( "#amount2" ).val(ui.values[ 1 ]);
			}
		  });
		$( "#amount1" ).val( $( "#slider-range" ).slider( "values", 0 ));
        $( "#amount2" ).val( $( "#slider-range" ).slider( "values", 1 ));

        
        // var activeColor = 'rgb(166, 255, 77)'
        // var inactiveColor = 'rgb(233, 231, 231)'
        // $(".MonCatSel").click(function(){
        //     if($(this).css("backgroundColor") == inactiveColor )
        //         $(this).animate({backgroundColor: activeColor});
        //     else
        //         $(this).animate({backgroundColor: inactiveColor});
        // })
    });
})(jQuery);