/**
 * 
 */
        let scrId 	= "ppAdmin06"
	
		const context = '.'+scrId;
		const exports = {};


		iniFn();
		
	
		/**
		 * event
		 */
		async function iniFn(){
			
			console.log("memId===[",$("#memId").val(),"]");
			//메인조회
			mainSelcect();
			
			//여기다 체크를할것인가. commUtil.isEmail($(this).val())			
			$("#contactEmail").change(async function(){
				
			});
			
			
			//수정버튼
			$("#updateBtn").click(async function(){
				let contactEmail 	= $("#contactEmail").val();
				let businessPhone	= $("#businessPhone").val();
				let contactPhone	= $("#contactPhone").val();
				
				let option = {
								"title": "수정"
							};
				//체크사항
				if(!commUtil.isEmail(contactEmail)){
					await commMsg.alert("담당자eMail 형식이 올바르지않습니다.",$(this),option);
					return false;
				};
				
				if(!commUtil.isInt(businessPhone)){
					await commMsg.alert("사업장 번화번호는 숫자만 입력해주세요.",$(this),option);
					return false;
				};
				
				if(!commUtil.isInt(contactPhone)){
					await commMsg.alert("담당자 HP는 숫자만 입력해주세요.",$(this),option);
					return false;
				};
				
				memUpdate();
			});
			
			
			//취소버튼
			$("#canBtn").click(async function(){
				let status		= $("#reStatus").val();//가입상태
				let companyName	= $("#reCompanyName").val();
				
				let goParam = {
					"status"	: status,
					"rePage"	: "ok",
					"companyName" : companyName
				};
				ComUtil.submit('ppAdmin04', goParam);
			});
		};
		
		/**
		 * 메인 조회
		 */
		function mainSelcect(){
			console.log("ppadmin01CompSel====");
			
			
			let param = {
				"url" 			: "ppadmin01CompSel",
				//"url" 			: "viewSample",
				"dataParam"		: {
									memId: $("#memId").val()
									}
			};
			
			ComUtil.request(param, function(res){
				console.log("mainSelcect 성공===[",res,"]");
				let reData		= res[0];
				let businessNo 		= reData.businessNo;
					businessNo 		= businessNo.substr(0,3) + "-" + businessNo.substr(3,2) + "-" + businessNo.substr(5,5);
				

				let appliDt	= "";
				if(commUtil.isEmpty(reData.appliDt)){
					appliDt = "-";
				}else{
					appliDt = reData.appliDt;
				};
				
				let withdraDt	= "";
				if(commUtil.isEmpty(reData.withdraDt)){
					withdraDt = "-";
				}else{
					withdraDt = reData.withdraDt;
				};
				/**
				 * 업체명			: companyName
				 * 사업자번호		: businessNo
				 * 사업장 주소		: businessAddress, businessAddressDetail
				 * 사업장전화번호	: businessPhone
				 * 신청/탈퇴일		: accDt / withdraDt
				 * 상태			: status
				 * 담당자이름		: contactName
				 * 담당자 HP		: contactPhone
				 * 담당자eMail	: contactEmail
				 * 시설구분		: businessClassificationId
				 * QR스캔설정		: qrScanKb , qrScanPetPass
				 * 입장구분		: largeYn
				 * 국가동물등록 필수여부	: regRequiredYn
				 */
				$("#companyName").text(reData.companyName);
				$("#businessNo").text(businessNo);
				
				$("#businessAddress").text(reData.businessAddress+" "+reData.businessAddressDetail);
				
				$("#businessPhone").val(reData.businessPhone);
				$("#accDt").text(appliDt+"/"+withdraDt);
				
				$("input[name='status'][value="+reData.status+"]").prop("checked", true);
				
				$("#contactName").val(reData.contactName);
				$("#contactPhone").val(reData.contactPhone);
				$("#contactEmail").val(reData.contactEmail);
				
				$("#businessClassificationId").setSelected(reData.businessClassificationId);
				
				//QR스캔설정
				if(reData.qrScanKb=="1"){
					$("#qrScanKb").prop('checked',false);
				}else{
					$("#qrScanKb").prop('checked',true);
				};
				
				if(reData.qrScanPetPass=="1"){
					$("#qrScanPetPass").prop('checked',false);
				}else{
					$("#qrScanPetPass").prop('checked',true);
				};
				
				//입장구분
				$("input[name='inYn'][value='"+reData.largeYn+"']").prop("checked", true);
				//국가동물등록 필수여부
				$("input[name='regRequiredYn'][value="+reData.regRequiredYn+"]").prop("checked", true);
				let tmpList = "";
				if(res.length > 1){
					for(let i= 1; i <res.length; i++){
						let resData = res[i];
						let qrId = resData.id;
						let productId = resData.productId;
						let productTitle = resData.productTitle;
						let qrRecognizerCreatedAt = resData.createdAt;

						let tmpData = `<tr>
												<td class="align">
													<p name="productIdTd" style=" text-overflow: ellipsis;
														overflow: hidden;
														white-space: nowrap;
														width: 330px;">${productId}</p>
												</td>
												<td class="align">
													<p name="productTitleTd" style="text-overflow: ellipsis;
														overflow: hidden;
														white-space: nowrap;
														width: 330px;">${productTitle}</p>
													<input type="text" maxlength="200" name="editProductTitle" title="QR 인식기 Content 입력" class="input-data" placeholder="입력해 주세요" value="${productTitle}" style="display: none;">
												</td>
												<td class="align">${qrRecognizerCreatedAt}</td>
												<td class="align">
													<button type="button" name="editQrRecognizer" data-qrId="${qrId}" class="btn texted primary">
														<span>수정</span>
													</button>
													<button type="button" name="editSaveQrRecognizer" data-qrId="${qrId}" class="btn texted primary" style="display: none; margin: 0;">
														<span>저장</span>
													</button>
												</td>
												<td class="align">
													<button type="button" name="deleteQrRecognizer" data-qrId="${qrId}" class="btn texted highlight delete">
														<span>삭제</span>
													</button>
													<button type="button" name="editCancelQrRecognizer" data-qrId="${qrId}" class="btn texted highlight delete" style="display: none; margin: 0;">
														<span>수정 취소</span>
													</button>
												</td>
											</tr>`;
						tmpList += tmpData;
					}
				}
				if (tmpList !== "") {
					$("#qrRecognizerDivData").show();
					$("#noData").hide();

					$("#qrRecognizerDatas").empty();
					$("#qrRecognizerDatas").append(tmpList);
				} else {
					$("#qrRecognizerDivData").hide();
					$("#noData").show();
					$("#dataList").empty();
				}
			}, function(){
				console.log("실패");	
			}, true, true)
	    };

		$(document).ready(function () {

			$(document).on("click", "[name=deleteQrRecognizer]", async function(e) {
				if(confirm("QR 인식기 ID를 삭제하시겠습니까?")){
					let qrId = $(this).attr('data-qrId');
					let params = {
						"url": "delQrRecognizer",
						"dataParam"		: {
							"id" : qrId
						}

					};

					ComUtil.request(params,function(res){
						if (res === 1) {
							alert("삭제하였습니다.");
							mainSelcect();
						} else {
							alert("오류가 발생했습니다.");
						}
					});

				}
			});


			$(document).on("click", "[name=editQrRecognizer]", async function(e) {
				let tr = $(this).closest("tr");

				tr.find("[name=productTitleTd]").hide();
				tr.find("[name=editQrRecognizer]").hide();
				tr.find("[name=deleteQrRecognizer]").hide();

				tr.find("[name=editProductTitle]").show();
				tr.find("[name=editSaveQrRecognizer]").show();
				tr.find("[name=editCancelQrRecognizer]").show();

			});

			$(document).on("click", "[name=editCancelQrRecognizer]", async function(e) {
				let tr = $(this).closest("tr");

				tr.find("[name=productTitleTd]").show();
				tr.find("[name=editQrRecognizer]").show();
				tr.find("[name=deleteQrRecognizer]").show();

				tr.find("[name=editProductTitle]").hide();
				tr.find("[name=editSaveQrRecognizer]").hide();
				tr.find("[name=editCancelQrRecognizer]").hide();

			});

			$(document).on("click", "[name=editSaveQrRecognizer]", async function(e) {
				let tr = $(this).closest("tr");
				let productTitle = tr.find("[name=editProductTitle]").val();

				if (productTitle === "") {
					alert("QR 인식기 설명을 입력해 주세요");
					return;
				}

				if (productTitle.length > 255) {
					alert("QR 인식기 설명이 너무 깁니다.");
					return;
				}

				let qrId = $(this).attr('data-qrId');
				let params = {
					"url": "editQrRecognizer",
					"dataParam"		: {
						"id" : qrId,
						"productTitle" : productTitle
					}

				};

				ComUtil.request(params,function(res){
					if (res === 1) {
						mainSelcect();
					} else {
						alert("오류가 발생했습니다.");
					}
				});



			});

			$(document).on("click", "#addQrRecognizer", async function(e) {
				let memberId = $("#memId").val();
				let productId = generateUUID();
				let productTitle = $("#addProductTitle").val();

				if (productTitle === "") {
					alert("QR 인식기 설명을 입력해 주세요");
					return;
				}


				if (productTitle.length > 255) {
					alert("QR 인식기 설명이 너무 깁니다.");
					return;
				}

				let params = {
					"url": "createQrRecognizer",
					"dataParam"		: {
						"memberId" : memberId,
						"productId" : productId,
						"productTitle" : productTitle
					}

				};

				ComUtil.request(params,function(res){
					if (res === 1) {
						alert("등록 되었습니다.");
						$("#addProductTitle").val("");
						mainSelcect();
					} else {
						alert("오류가 발생했습니다.");
					}
				});

			});
		});

		async function memUpdate(){
			/**
			  	
			 	사업장전화번호		: businessPhone----
			 	상태				: status------
			 	담당자이름			: contactName-----
			 	담당자 HP			: contactPhone----
			 	담당자eMail		: contactEmail----
			 	시설구분			: businessClassificationId----
				QR스캔설정			: qrScanKb	1 - 스캔 불가, 2 - 스캔 가능
								: qrScanPetPass
				입장구분			: largeYn	대형견('Y'), 중소형견('N')
				국가동물등록 필수여부	: regRequiredYn
			 */
			let businessPhone 				= $("#businessPhone").val();
			let status						= $('[name=status]:checked').val();
			let contactName 				= $("#contactName").val();
			let contactPhone 				= $("#contactPhone").val();
			let contactEmail 				= $("#contactEmail").val();
			let businessClassificationId 	= $("#businessClassificationId").val();
			let qrScanPetPass				= "";
			if($("#qrScanPetPass").prop("checked")){
				qrScanPetPass=2;
			}else{
				qrScanPetPass=1;
			};
			let qrScanKb 					= "";
			if($("#qrScanKb").prop("checked")){
				qrScanKb=2;
			}else{
				qrScanKb=1;
			};
			
			
			let largeYn 					= $("[name=inYn]:checked").val();
			let regRequiredYn 				= $("[name=regRequiredYn]:checked").val();
			
			
			let param = {
				"url" 			: "ppadmin06Up1",
				"dataParam"		: {
									memId:$("#memId").val(),
									businessPhone:businessPhone,
									status:status,
									contactName:contactName,
									contactPhone:contactPhone,
									contactEmail:contactEmail,
									businessClassificationId:businessClassificationId,
									qrScanPetPass:qrScanPetPass,
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
				

		};

function generateUUID() {
	let d = new Date().getTime();
	if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
		d += performance.now();
	}
	const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

		
		
		
		