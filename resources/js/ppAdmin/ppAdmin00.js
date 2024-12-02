			
		iniMenu();
		
		$("#goPage01").on("click", function(){
			let url 		= "ppAdmin01";
			let dataParam 	= "";
			
			fnGoPage(url,dataParam);
		});
		
		$("#goPage02").on("click", function(){
			let url 		= "ppAdmin02";

			fnGoPage(url);
		});
		
		
		$("#goPage04").on("click", function(){
			let url 		= "ppAdmin04";
			let goParam = {
					"status"	: "All",
					"rePage"	: "",
					"companyName" : ""
				};
			fnGoPage(url,goParam);
		});
		
		$("#logOutBtn").on("click", function(){
			ComUtil.submit('/logout');
		});
		
		function fnGoPage(url,goParam){
			
			ComUtil.submit(url, goParam);
		};
		
		
		function iniMenu(){
			
			let gIsAdmin = $("#gIsAdmin").val();
			
			console.log("gIsAdmin===[",gIsAdmin,"]")
			
			if(gIsAdmin != "Y"){
				$("#goPage04Li").hide();
			}else{
				$("#goPage04Li").show();
			}
		};
        


