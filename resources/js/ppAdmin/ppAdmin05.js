/**
 * 
 */
		
        let scrId 	= "ppAdmin05"
	
		const context = '.'+scrId;
		const exports = {};


		iniFn();
		
	
		/**
		 * event
		 */
		async function iniFn(){
			
			$("#intBtn").click(async function(){
				await maxIdSel();
			});
			
			//주소검색
			$("#addrSch").click(async function(){
				addrSchFn();
			});
			
		};

		async function maxIdSel(){
			let param = {
				"url" 			: "ppadmin05Sel1"
			};
			
			ComUtil.request(param, function(res){
				console.log("res 성공===[",res,"]");
				/**
				  	업체명			: companyName
				 	사업자번호 			: businessNo
				 	사업장 주소			: businessAddress
				 	사업장 상세주소		: businessAddressDetail
				 	사업장전화번호		: businessPhone
				 	담당자이름			: contactName
				 	담당자 HP			: contactPhone
				 	담당자eMail		: contactEmail
				 	시설구분			: businessClassificationId	1- 놀이터, 2- 카페, 3- 공원, 4- 유치원
					QR스캔설정			: qrScanKb	1 - 스캔 불가, 2 - 스캔 가능
					입장구분			: largeYn	대형견('Y'), 중소형견('N')
					국가동물등록 필수여부	: regRequiredYn
				 */
				let maxId					= res.maxId;
				let companyName 			= $("#companyName").val();
				let businessNo 				= $("#businessNo").val();
				let businessAddress 		= $("#businessAddress").val();
				let businessAddressDetail 	= $("#businessAddressDetail").val();
				let businessPhone 			= $("#businessPhone").val();
				let contactName 			= $("#contactName").val();
				let contactPhone 			= $("#contactPhone").val();
				let contactEmail 			= $("#contactEmail").val();
				let businessClassificationId 	= $("#businessClassificationId").val();
				let qrScanKb 					= $("[name=qrScanKb]:checked").val();
				let largeYn 					= $("[name=inYn]:checked").val();
				let regRequiredYn 				= $("[name=regRequiredYn]:checked").val();
				
				
				
				let param = {
					"url" 			: "ppadmin05Int1",
					"dataParam"		: {
										maxId:maxId,
										companyName:companyName,
										businessNo:businessNo,
										businessAddress:businessAddress,
										businessAddressDetail:businessAddressDetail,
										businessPhone:businessPhone,
										contactName:contactName,
										contactPhone:contactPhone,
										contactEmail:contactEmail,
										businessClassificationId:businessClassificationId,
										qrScanKb:qrScanKb,
										largeYn:largeYn,
										regRequiredYn:regRequiredYn
									}
				};
				
				console.log("insert param===[",param,"]");
				
				ComUtil.request(param, function(res){
					console.log("insert res===[",res,"]");
	
				}, function(){
					console.log("실패");	
				}, true, true);
				

			}, function(){
				console.log("실패");	
			}, true, true);
			
		};
		
		
		async function addrSchFn(){
			
			new daum.Postcode({
		        oncomplete: function(data) {
		            console.log("주소검색====data[",data,"]");
		            
		            $("#businessAddress").val(data.address);
		            if( !commUtil.isEmpty(data.buildingName)){
						$("#businessAddressDetail").val(data.buildingName);	
					};
		            
		        }
		    }).open();
			
		};
		
		
