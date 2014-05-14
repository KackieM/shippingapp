$(document).ready(function(){

	shipfinder.shipping();

	});

var shipfinder= {

shipping: function(){	

$.ajax({
  type: "GET",
  url: "http://www.fleetmon.com/api/p/personal-v1/myfleet/?username=KackieM&api_key=3b0d1e55a7a00cef387c1d736899ed2d17420fd5&format=json",
  dataType: "jsonp",
  error:function(jqXHR, status, error){
  	console.log("Bermuda Triangle" + error);
  },
  success:function(data, dataType, jqXHR){
  	console.log("Land Ahoy!");
  }

});
}

}

