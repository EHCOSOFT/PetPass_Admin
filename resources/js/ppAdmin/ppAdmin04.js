/**
 * SALMHMMHM_M01
 */
	let scrId 		= "CNTCNTCNT_M01";
	let totalCount 	= 0;
	let $pager;
	let perPageCnt = 10;	//화면출력수

	let gIsAdmin	= $("#gIsAdmin").val();
	let gMemId		= $("#gMemId").val();
	
	if(gIsAdmin == "Y"){
		$("#adminDiv").show();
	}else{
		$("#adminDiv").hide();
	};
	
	iniFn();
	
	
	/**
	 * event
	 */
	async function iniFn(){
		let rePage	= $("#rePage").val();
		let status	= $("#reStatus").val();
		let reCompanyName	= $("#reCompanyName").val();
		
		console.log("rePage===[",rePage,"]");
		console.log("status===[",status,"]");
		
		//전페이지에서 넘어왔을경우
		if(rePage == "ok"){
			if( !commUtil.isEmpty(status) ){
				$("#status").setSelected(status);
			};
			
			if( !commUtil.isEmpty(reCompanyName) ){
				$("#companyName").val(reCompanyName);
			};
			
			await mainTotCntSel();
			await mainSel(1);
		}else{
			await mainTotCntSel();
			await mainSel(1);
			
		};
		
		
		$("#divData").hide();
		$("#noData").show();
		
		//검색
		$("#selBtn").click(async function(){
			await mainTotCntSel();
			await mainSel(1);
		});
		
		//회원등록화면
		$("#insertPageGo").click(function(){
			let url 		= "ppAdmin05";
			ComUtil.submit(url);
		});
		
		
		//상세조건
		$("#selectD").on("change",  function(e){

			let thisVal = $(this).val();
			
			console.log("상세조건  thisVal===[",thisVal ,"]");
		});
		
	};
	
	
	async function mainTotCntSel(){
			
			let companyName	= $("#companyName").val();
			let status 		= $("#status").val();//가입상태
			
			let param = {
				"url" 			: "ppadmin01CompSelTotal",
				"dataParam"		: {
									status		: status
									,companyName: companyName
									}
			};
			
			if(gIsAdmin == "N" && !commUtil.isEmpty(gMemId)){
				param.dataParam.memId = gMemId;
			};
			
			ComUtil.request(param, async function(totalRes){
				console.log("mainTotCntSel 성공 ====[",totalRes,"]");
				$("#totCnt").text("총 : "+ commUtil.comma(totalRes.totalCount)+"건");
				totalCount = totalRes.totalCount;
			}, function(){
				console.log("실패");	
			}, true, true)
		
	};
	
	async function mainSel(pagerNoDate){
			
			let companyName	= $("#companyName").val();
			let status 		= $("#status").val();//가입상태
			let sCnt 		= pagerNoDate*10-10;
			
			let param = {
				"url" 			: "ppadmin04CompSel",
				"dataParam"		: {
									status		: status
									,companyName: companyName
									,sCnt		: sCnt
									,perPageCnt	: perPageCnt
									}
			};
			
			if(gIsAdmin == "N" && !commUtil.isEmpty(gMemId)){
				param.dataParam.memId = gMemId;
			};
			
			ComUtil.request(param, function(res){
				console.log("성공 목록리스트 ====[",res,"]");
				if(res.length > 0){
					let tmpList = "";
					for(var i=0; i <res.length; i++){
						let resData 		= res[i];
						let no				= resData.rowNumber;
						let businessNo 		= resData.businessNo;
							businessNo 		= businessNo.substr(0,3) + "-" + businessNo.substr(3,2) + "-" + businessNo.substr(5,5);
						let businessPhone	= commUtil.formatTelNum(resData.businessPhone);
						let statNm 			= "";
						//1-승인대기, 2-승인, 3-반려, 4-탈퇴처리
						if(resData.status=="1"){
							statNm="승인대기";
						}else if(resData.status=="2"){
							statNm="승인";
						}else if(resData.status=="3"){
							statNm="반려";
						}else if(resData.status=="4"){
							statNm="탈퇴처리";
						};
						
						let appliDt	= "";
						if(commUtil.isEmpty(resData.appliDt)){
							appliDt = "-";
						}else{
							appliDt = resData.appliDt;
						};
						
						let withdraDt	= "";
						if(commUtil.isEmpty(resData.withdraDt)){
							withdraDt = "-";
						}else{
							withdraDt = resData.withdraDt;
						};
						
						let tmpData = `<tr>
											<td>${no}</td>
											<td><button type="button" name="clickName" data-memId="${resData.id}" class="btn texted primary">
													<span>${resData.companyName}</span>
												</button>
											</td>
											<td>${businessNo}</td>
											<td>${businessPhone}</td>
											<td>${appliDt}</td>
											<td>${withdraDt}</td>  
											<td>${statNm}</td>
											<td></td>
										</tr>`;
						tmpList += tmpData;
					};
					
					$("#divData").show();
					$("#noData").hide();
					
					$("#dataList").empty();
					$("#dataList").append(tmpList);
					
					//페이징처리
					initPager();
					$pager.setPager(totalCount,pagerNoDate);
					
					//
					$("[name=clickName]").click(async function(e){
						let memId		= $(this).attr('data-memId');
						let status		= $("#status").val();//가입상태
						let companyName	= $("#companyName").val();//가입상태
						
						console.log("qqqqq");
						
						let goParam = {
							"memId" 	: memId
							,"status"	: status
							,"companyName" : companyName
						};
						ComUtil.submit('ppAdmin06', goParam);
						
					});
				}else{
					$("#divData").hide();
					$("#noData").show();
				};
				
				
			}, function(){
				console.log("실패");	
			}, true, true)
		
	};
	
	function initPager(){
		$pager = new commApp.pager($("#pagingDiv"),{
			perPage : perPageCnt,
			itemCount : 5,
			onChange:(n)=>{
				mainSel(n);
			}
			
		})
	};