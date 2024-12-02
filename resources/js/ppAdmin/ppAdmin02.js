/**
 * SALMHMMHM_M01
 */
	let scrId = "CNTCNTCNT_M02";
	let fromDate 	= "";
	let toDate 		= "";
	let companyName	= "";
	let petType 	= "";//동물종류
	let petComCnt 	= "";//동반인원
	let petSizeType = "";//체고
	
	let delSel 		= "";//상세조건
	
	//let //품종
	let petGender	= "";//성별
	let petWeight	= "";//몸무게
	
	let petWeightS	= 0;
	let petWeightE	= 0;
	
	let $pager;
	let perPageCnt = 10;	//화면출력수
	
	let excelParam	= {};
	
	let gIsAdmin	= $("#gIsAdmin").val();
	let gMemId		= $("#gMemId").val();

	commView.commUiInit("CNTCNTCNT_M02", ['calendar']);


	iniFn();
	delSelChgChk();
	
	/**
	 * event
	 */
	async function iniFn(){
		
		
		$("#noData").hide();
		$("#divE2").hide();
		$("#divE3").hide();
		
		let toDate		= commUtil.getToday('YYYYMMDD');
		let fromDate	= commUtil.getDayCal("days",toDate,-3);
		
		let rePage 		= $("#rePage").val();
		$("#toDate").val(toDate);
		$("#fromDate").val(fromDate);
		
		
		//전페이지에서 넘어왔을경우
		if(rePage == "ok"){
			
			let fromDate 	= $("#reFromDate").val();
			let toDate 		= $("#reToDate").val();
			let companyName = $("#reCompanyName").val();
			let petComCnt 	= $("#rePetComCnt").val();
			let petSizeType = $("#rePetSizeType").val();
			let petGender 	= $("#rePetGender").val();
			let petWeight 	= $("#rePetWeight").val();
			let petWeightS 	= $("#rePetWeightS").val();
			let petWeightE 	= $("#rePetWeightE").val();
			let delSel 		= $("#reDelSel").val();
			
			console.log("fromDate===[",fromDate,"]");
			console.log("toDate===[",toDate,"]");
			console.log("companyName===[",companyName,"]");
			console.log("petComCnt===[",petComCnt,"]");
			console.log("petSizeType===[",petSizeType,"]");
			console.log("petGender===[",petGender,"]");
			console.log("petWeight===[",petWeight,"]");
			
			//상세조회조건
			if(delSel == "D1"){
				$("#divE1").show();
				$("#divE2").hide();
				$("#divE3").hide();
			}else if(delSel == "D2"){
				$("#divE1").hide();
				$("#divE2").show();
				$("#divE3").hide();
			}else if(delSel == "D3"){
				$("#divE1").hide();
				$("#divE2").hide();
				$("#divE3").show();
			}
			
			
			
			if( !commUtil.isEmpty(companyName) ){
				$("#companyName").val(companyName);
			};
			
			$("#fromDate").val(fromDate);
			$("#toDate").val(toDate);
			
			//동반인원
			if( !commUtil.isEmpty(petComCnt) ){
				$("#selectB").setSelected(petComCnt);
			};
			
			//체고
			if( !commUtil.isEmpty(petSizeType) ){
				$("#selectC").setSelected(petSizeType);
			};
			
			//성별
			if( !commUtil.isEmpty(petGender) ){
				$("#selectE2").setSelected(petGender);
			};
			
			if( !commUtil.isEmpty(petWeight) ){
				$("#selectE3").setSelected(petWeight);
			};
			
			pp02MainSel(1);
		}else{
			pp02MainSel(1);
		};
		
		//검색
		$("#selBtn").click(function(){
			pp02MainSel(1);
		});
		
		
		//상세조건 : 퍼블적용때문에 감지가안됨..찾으면 setInterval 제거
		$("#selectD").off().on("change",  function(e){
			let thisVal = $(this).val();
			console.log("상세조건  thisVal===[",thisVal ,"]");
		});
		
		//엑셀다운로드
		$("#exlDw").click(function(){
			exlDwFn()
		});
	};
	
	//상세조회 셀렉트박스 변경감지
	function pp02MainSel(pagerNoDate){
			let msg			= '';
			let option		= {'title': '출입내역조회'};
			
			fromDate 	= ($("#fromDate").val()).replaceAll(".","");
			toDate 		= ($("#toDate").val()).replaceAll(".","");
			companyName	= $("#companyName").val();
			petType 	= $("#selectA").val();//동물종류
			petComCnt 	= $("#selectB").val();//동반인원
			petSizeType = $("#selectC").val();//체고
			
			delSel 		= $("#selectD").val();//상세조건
			
			//let //품종
			petGender	= $("#selectE2").val();//성별
			petWeight	= $("#selectE3").val();//몸무게
			
			petWeightS	= 0;
			petWeightE	= 0;
			
			if(petWeight=="3"){
				petWeightS	= 0;
				petWeightE	= 3;
			}else if(petWeight=="4"){
				petWeightS	= 4;
				petWeightE	= 6;
			}else if(petWeight=="7"){
				petWeightS	= 7;
				petWeightE	= 9;
			}else if(petWeight=="10"){
				petWeightS	= 10;
				petWeightE	= 12;
			}else if(petWeight=="13"){
				petWeightS	= 13;
				petWeightE	= 15;
			}else if(petWeight=="16"){
				petWeightS	= 16;
				petWeightE	= 18;
			}else if(petWeight=="19"){
				petWeightS	= 19;
				petWeightE	= 21;
			}else if(petWeight=="22"){
				petWeightS	= 22;
				petWeightE	= 99;
			}
			
			//조회기간-시작일
			if( commUtil.isEmpty(fromDate) ){
				msg = "조회기간 시작일을 선택해주세요";
				commMsg.alert(msg, $(this), option);
				return false;
			}else if( commUtil.isEmpty(toDate) ){
				msg = "조회기간 종료일을 선택해주세요";
				commMsg.alert(msg, $(this), option);
				return false;
			};
			
			//ppadmin02Sel1Total
			let totalCnt = 0;
			
			let paramTotal = {
							"url" 			: "ppadmin02Sel1Total",
							"dataParam"		: {
												fromDate		: fromDate
												,toDate			: toDate
												,companyName	: companyName
												,petType		: petType
												,petComCnt		: petComCnt
												,petSizeType	: petSizeType
												,petGender		: petGender
												,petWeight		: petWeight
												,petWeightS		: petWeightS
												,petWeightE		: petWeightE
												,delSel			: delSel
												}
						};
			
			if(gIsAdmin == "N" && !commUtil.isEmpty(gMemId)){
				paramTotal.dataParam.memberId = gMemId;
			};
			
			ComUtil.request(paramTotal, function(totalRes){
				console.log("성공 totalRes====[",totalRes,"]");
				$("#totCnt").text("총 : "+ commUtil.comma(totalRes.totalCount)+"건");
				let sCnt = pagerNoDate*10-10;
				
				
				let param = {
								"url" 			: "ppadmin02Sel1",
								"dataParam"		: {
													fromDate		: fromDate
													,toDate			: toDate
													,companyName	: companyName
													,petType		: petType
													,petComCnt		: petComCnt
													,petSizeType	: petSizeType
													,petGender		: petGender
													,petWeight		: petWeight
													,petWeightS		: petWeightS
													,petWeightE		: petWeightE
													,delSel			: delSel
													,sCnt:sCnt
													,perPageCnt:perPageCnt
													,selType:"page"
													}
							};
				if(gIsAdmin == "N" && !commUtil.isEmpty(gMemId)){
					param.dataParam.memberId = gMemId;
				};
				excelParam = param;
				
				console.log("ppadmin02Sel1  param====[",param,"]");
				
				ComUtil.request(param, function(res){
					console.log("성공 ppadmin02Sel1====[",res,"]");	
					
					if(res.length > 0){
						let tmpList = "";
						for(var i=0; i <res.length; i++){
							let resData 		= res[i];
							let no				= resData.rowNumber;
							let createdAt		= resData.createdAt;
							let petType			= resData.petType=="D"?"강아지":(resData.petType=="C" ? "고양이" : "");
							let companyName		= resData.companyName;
							let petSizeType		= commUtil.isEmpty(resData.petSizeType)?"-":resData.petSizeType;
							let registrantName			= commUtil.isEmpty(resData.registrantName)?"-":resData.registrantName;
							let ownName			= resData.ownName;
							let ownPhone		= commUtil.formatTelNum(resData.ownPhone);
							let petCompanyCount		= resData.petCompanyCount
							let isTemp		= resData.isTemp
							if (isTemp === undefined) {
								isTemp = "N";
							}
							let qrAccessType = commUtil.getQrAccessType(resData.qrScanDatas, resData.ownIdx);
							let qrOrgNm		= resData?.orgNm ?? "-";

							let tmpData = `<tr>
												<td>${no}</td>
												<td>
													<button type="button" name="clickName" data-qriId="${resData.qriId}" class="btn texted primary">
														<span>${createdAt}</span>
													</button>
												</td>
												<td>${companyName}</td>
												<td>${petType}</td>
												<td>${petSizeType}</td>
												<td>${ownName}</td>  
												<td>${registrantName}</td>  
												<td>${ownPhone}</td>
												<td>${petCompanyCount}명</td>
												<td>${isTemp}</td>
												<td>${qrAccessType}</td>
												<td>${qrOrgNm}</td>
											</tr>`;
							tmpList += tmpData;
						};
						
						$("#divData").show();
						$("#noData").hide();
						
						$("#dataList").empty();
						$("#dataList").append(tmpList);
						
						//페이징처리
						initPager();
						$pager.setPager(totalRes.totalCount,pagerNoDate);
						
						$("[name=clickName]").click(async function(e){
							let qriId		= $(this).attr('data-qriId');
							
							let goParam = {
								qriId 			: qriId
								,fromDate		: fromDate
								,toDate			: toDate
								,companyName	: companyName
								,petType		: petType
								,petComCnt		: petComCnt
								,petSizeType	: petSizeType
								,petGender		: petGender
								,petWeight		: petWeight
								,petWeightS		: petWeightS
								,petWeightE		: petWeightE
								,delSel			: delSel
							};
							ComUtil.submit('ppAdmin03', goParam);
							
						});
					}else{
						$("#divData").hide();
						$("#noData").show();
					}
					
					
				}, function(){
					console.log("실패");	
				}, true, true)
			}, function(){
				console.log("실패");	
			}, true, true)		
			
			
			
	};
	
	
	//상세조회 셀렉트박스 변경감지
	function delSelChgChk(){
		var prevText = $("[aria-controls='selectDOption']").find('span').text();
    
	    setInterval(function() {
	        // 현재 텍스트를 가져옵니다.
	        var currentText = $("[aria-controls='selectDOption']").find('span').text();
	        
	        // 이전 텍스트와 현재 텍스트를 비교하여 변경을 감지합니다.
	        if (prevText !== currentText) {
	            console.log('Text changed to:', currentText);
	            
	            // 변경된 텍스트를 이전 텍스트에 저장합니다.
	            prevText = currentText;
	            
	            if(currentText == "품종"){
					$("#divE1").show();
					$("#divE2").hide();
					$("#divE3").hide();
				}else if(currentText == "성별"){
					$("#divE1").hide();
					$("#divE2").show();
					$("#divE3").hide();
				}else if(currentText == "몸무게"){
					$("#divE1").hide();
					$("#divE2").hide();
					$("#divE3").show();
				}else if(currentText == "전체"){
					$("#divE1").show();
					$("#divE2").hide();
					$("#divE3").hide();
					$("#selectE1").val('')
				};
	        }
	    }, 300); // 0.5초마다 텍스트를 확인합니다.
	};
	
	function initPager(){
		$pager = new commApp.pager($("#pagingDiv"),{
			perPage : perPageCnt,
			itemCount : 5,
			onChange:(n)=>{
				pp02MainSel(n);
			}
			
		})
	};
	
	function exlDwFn(){
		
		excelParam.dataParam.selType="All";
		
		console.log("excelParam exlDwFn====[",excelParam,"]");	
		
		ComUtil.request(excelParam, function(res){
					console.log("성공 exlDwFn====[",res,"]");	
			
					
			excelParam.url = "ppadmin03Sel2"
			ComUtil.request(excelParam, function(resVacData){
				
				console.log("성공 resVacData====[",resVacData,"]");
				
					if(res.length > 0){
						let data = [
			                ["No", "출입일시", "제휴처", "출입QR", "동물구분","동물이름","품종",  "체고", "등록자명", "보호자명", "연락처", "동반인원","마케팅 수신동의", "임시QR 여부", "접종정보 제공동의","생년월일","동물종류","동물등록번호" ,"성별","중성화","몸무게",
			                "pet생일","맹견여부","털색깔", "고유번호","종합예방","코로나장염","전염성기관지염","광견병","담당지역"]
			            ];
						console.log(`res.length :: ${res.length}`)
						for(var i=0; i <res.length; i++){
							let resData 			= res[i];
							let no					= resData.rowNumber;
							let createdAt			= resData.createdAt;
							let petName				= resData.petName;
							let petBreedName		= resData.petBreedName
							let petType				= resData.petType=="D"?"강아지":(resData.petType=="C" ? "고양이" : "");
							let companyName			= resData.companyName;
							let petSizeType			= commUtil.isEmpty(resData.petSizeType)?"-":resData.petSizeType;
							let registrantName				= commUtil.isEmpty(resData.registrantName) ? "-" : resData.registrantName;
							let ownName				= resData.ownName;
							let ownPhone			= commUtil.formatTelNum(resData.ownPhone);
							let petCompanyCount		= resData.petCompanyCount


							let ownBirth 		= commUtil.isEmpty(resData.ownBirth) ? "-" : resData.ownBirth;	//생년월일
							let marketingYn			= resData.marketingYn ?? '-';
							let isTemp			= resData.isTemp ?? '-';
							let isQrKW           = (resData.qrScanDatas && resData.qrScanDatas.startsWith("/pems/PET_PASS_KW")) ? "Y" : "-";
							let petTypeNm		= resData.petType=="D"? "강아지" : (resData.petType=="C" ? "고양이" : "");
							let petRegNo		        = resData.petRegNo ?? '-';
							let petGender		= resData.petGender=="M"? "남아" : "여아";
							let petNeuterNm		= resData.petNeuterYn=="1"? "중성화" : "미중성화";
							let petWeight		= commUtil.isEmpty(resData.petWeight) ? "-" : resData.petWeight+"Kg";	//몸무게
							let petBirth		= commUtil.isEmpty(resData.petBirth) ? "-" : commUtil.getDate(resData.petBirth,'YYYY.MM.DD');	//생년월일
							let petHeightBigYn	= commUtil.isEmpty(resData.petHeightBigYn) ? "-" : (resData.petHeightBigYn=="Y" ? "대형견" : "중소형견");	//체고
							let petHairColor	= commUtil.isEmpty(resData.petHairColor) ? "-" : resData.petHairColor;	//털색깔
							let petId	    = resData.petId ?? '-';	//털색깔
							let d001 			= "-"; //종합예방
							let d002 			= "-"; //코로나장염
							let d003 			= "-"; //전염성기관지염(켄넬로프)
							let d004 			= "-"; //광견병
							let qrAccessType = commUtil.getQrAccessType(resData.qrScanDatas, resData.ownIdx);
							let orgNm	    = resData?.orgNm ?? '-';

							
							if(resVacData.length > 0){
								for(let x=0; x<resVacData.length; x++){
									if(resData.qriId == resVacData[x].qrInformationId && resVacData[x].vaccinateCode=="D001"){
										d001 = commUtil.getDate(resVacData[x].vaccinateDt,'YYYY.MM.DD');
									}else if(resData.qriId == resVacData[x].qrInformationId && resVacData[x].vaccinateCode=="D002"){
										d002 = commUtil.getDate(resVacData[x].vaccinateDt,'YYYY.MM.DD');
									}else if(resData.qriId == resVacData[x].qrInformationId && resVacData[x].vaccinateCode=="D003"){
										d003 = commUtil.getDate(resVacData[x].vaccinateDt,'YYYY.MM.DD');
									}else if(resData.qriId == resVacData[x].qrInformationId && resVacData[x].vaccinateCode=="D004"){
										d004 = commUtil.getDate(resVacData[x].vaccinateDt,'YYYY.MM.DD');
									};
								}
							}

							let tmpData = [no,createdAt,companyName,qrAccessType, petType,petName,petBreedName,petSizeType,ownName,registrantName,ownPhone, petCompanyCount+"명", marketingYn, isTemp, isQrKW,
											ownBirth,petTypeNm, petRegNo ,petGender,petNeuterNm,petWeight,petBirth,petHeightBigYn,petHairColor, petId,d001,d002,d003,d004,orgNm];
							console.log(`tmpData:: ${tmpData}`)
							data.push(tmpData);
						};
						
						console.log("엑셀테이터 data===[",data,"]");
						// 워크북 생성
			            var wb = XLSX.utils.book_new();
			            var ws = XLSX.utils.aoa_to_sheet(data);
			            
			            // 테두리를 적용할 셀 범위
						var range = { s: { r: 0, c: 0 }, e: { r: res.length, c: 8 } };

			            // 셀에 스타일 적용
						ws['!outline'] = true; // 테두리 적용
						ws['!cols'] = [{ width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }]; // 각 열의 너비 설정
						
						// 테두리 스타일 적용
						var borderStyle = {
						    top: { style: "thin" },
						    bottom: { style: "thin" },
						    left: { style: "thin" },
						    right: { style: "thin" }
						};
						
						for (var r = range.s.r; r <= range.e.r; ++r) {
						    for (var c = range.s.c; c <= range.e.c; ++c) {
						        var cellAddress = XLSX.utils.encode_cell({ r: r, c: c });
						        if (!ws[cellAddress]) ws[cellAddress] = {};
						        ws[cellAddress].s = borderStyle; // 테두리 스타일 적용
						    }
						}
			
			            // 워크북에 워크시트 추가
			            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
						
						fromDate 	= ($("#fromDate").val()).replaceAll(".","");
						toDate 		= ($("#toDate").val()).replaceAll(".","");
						
			            // 엑셀 파일 다운로드
			            XLSX.writeFile(wb, "PetPass_출입내역_{조회시작일"+fromDate+"}_{조회종료일"+toDate+"}.xlsx");
						
					};
					
				}, function(){
					console.log("실패");	
				}, true, true);
				
					
			}, function(){
				console.log("실패");	
			}, true, true)
				
				


            
	}
	
	