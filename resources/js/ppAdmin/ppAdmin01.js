/**
 * SALGANGAN_S03
 */
// const { isEmpty } = require("../../../com/commUtil");
        let scrId = "ppAdmin01"

		commView.commUiInit("CNTCNTCNT_M02", ['calendar']);
		const context = '.'+scrId;
		const exports = {};
		let chartRadD1 = null;
		let chartRadD2 = null; 

        let dl290;

        let chartLabels1 	= new Array();
        let chartLabels2 	= new Array();
        
        let chartData1N   	= new Array();
        let chartData1Y   	= new Array();
        
        let chartData2		= new Array();

		iniFn();
		
		let toDate		= commUtil.getToday('YYYYMMDD');
		let toMonth		= toDate.substr(0,4)+"."+toDate.substr(4,2);
		
		let gIsAdmin	= $("#gIsAdmin").val();
		let gMemId		= $("#gMemId").val();
		
		if(gIsAdmin == "Y"){
			$("#adminDiv").show();
			$("#companyNameTit").hide();
		}else{
			$("#adminDiv").hide();
			$("#companyNameTit").show();
		};
		
		$("#monthVal").val(toMonth);
		$("#toDateVal").text(toDate.substr(0,4)+"."+toDate.substr(4,2)+"."+toDate.substr(6,2));
	
		/**
		 * event
		 */
		async function iniFn(){
			await compSel();
			await mainSelcect();
			await chart1Selcect();
			
			
			monthValChgChk();
			comValChgChk();
			
			$("#monthVal").change(function(){
				console.log("monthVal===");
			})
		};
		
		/**
		 * 회원목록
		 */
		async function compSel(){
			
			let param = {
				"url" 			: "ppadmin01CompSel",
				"dataParam"		: {
									dateVal: ($("#monthVal").val()).replaceAll(".","")
									,status : "2"
									}
			};
			
			ComUtil.request(param,async function(res){
				
				console.log("회원목록 compSel 성공===[",res,"]");
				let arrOptions 	= [];
				
				let baParam = {};
				baParam.value 	= "All"; 
				baParam.text 	= "제휴사 전체";
				
				arrOptions.push(baParam);
				
				await res.forEach((item, idx)=>{
					
					let param = {};
					
					param.value = item.id; 
					param.text 	= item.companyName;
					
					arrOptions.push(param);
				});
				
				$("#comList").setSelectOption(arrOptions);
				
			}, function(){
				console.log("회원목록 compSel 실패");	
			}, true, true)
		};
		
		
		/**
		 * 메인통계
		 */
		async function mainSelcect(){
			console.log("mainSelcect sampleSelcect====");
			
			
			let param = {
				"url" 			: "ppadmin01Sel3",
				//"url" 			: "viewSample",
				"dataParam"		: {
									dateVal:toDate,
									memId : $("#comList").val()
									}
			};
			
			if(gIsAdmin == "N" && !commUtil.isEmpty(gMemId)){
				param.dataParam.memId = gMemId;
			};
			
			
			ComUtil.request(param, function(res){
				console.log("mainSelcect 성공===[",res,"]");
				let totCnt		= 0;
				let totPeoCnt 	= 0;
				let cnt1	= 0;
				let cnt2	= 0;
				let cnt3	= 0;
				
				for(let i=0; i<res.length; i++){
					totCnt 		+= res[i].cnt;
					totPeoCnt	+= res[i].petCompanyCount;
					
					if(res[i].petSizeType == "S"){
						cnt1 = res[i].cnt;
					}else if(res[i].petSizeType == "M"){
						cnt2 = res[i].cnt;
					}else if(res[i].petSizeType == "L"){
						cnt3 = res[i].cnt;
					}
				};
					
				$("#totCnt").html(totCnt+`<span>마리(소형: ${cnt1}/중형: ${cnt2}/대형: ${cnt3})</span>`);
				$("#totPeoCnt").html(totPeoCnt+`<span> 명</span>`);
			}, function(){
				console.log("실패");	
			}, true, true);
			
			
			//신규방문
			let param2 = {
				"url" 			: "ppadmin01Sel4",
				//"url" 			: "viewSample",
				"dataParam"		: {
									//dateVal : toDate.substr(0,6)
									dateVal : toDate
									,memId : $("#comList").val()
									}
			};
			
			if(gIsAdmin == "N" && !commUtil.isEmpty(gMemId)){
				param2.dataParam.memId = gMemId;
			};
			
			ComUtil.request(param2, function(res){
				console.log("newCnt 성공===[",res,"]");
				$("#newCnt").html(res.length+`<span>마리</span>`);
			}, function(){
				console.log("실패");	
			}, true, true);
			
	    };
	    
		
		/**
		 * 1번차트
		 */
	    async function chart1Selcect(){
			console.log("sampleSelcect====");
			let param = {
				"url" 			: "ppadmin01Sel1",
				"dataParam"		: {
									dateVal:($("#monthVal").val()).replaceAll(".","")
									,memId : $("#comList").val()
									}
				
			};
			
			if(gIsAdmin == "N" && !commUtil.isEmpty(gMemId)){
				param.dataParam.memId = gMemId;
			};
			
			ComUtil.request(param, async function(res){
				console.log("성공===[",res,"]");
					
				chartLabels1 	= new Array();
				chartData1S   	= new Array();
				chartData1M   	= new Array();
				chartData1L   	= new Array();
				
				for(var i=0; i < res.length; i++){
				
					let mapData = res[i];
					//console.log("차트1 데이터 mapData===[",mapData,"]");	
					
					

					/**
						cnt			:104
						createdAt	:"2023-11-01"						
						petHeBigYn	:"N"
					 */
					
					if(mapData.petSizeType == "S"){
						chartData1S.push(mapData.cnt);
					}else if(mapData.petSizeType == "M"){
						chartData1M.push(mapData.cnt);
					}else if(mapData.petSizeType == "L"){
						chartData1L.push(mapData.cnt);
					};
					
					//라벨
					if( (i< res.length-1 && res[i].createdAt != res[i+1].createdAt) || i== res.length-1){
						chartLabels1.push(res[i].createdAt);
						
						if(chartLabels1.length != chartData1S.length){
							chartData1S.push(0);
						};
						
						if(chartLabels1.length != chartData1M.length){
							chartData1M.push(0);
						};
						
						if(chartLabels1.length != chartData1L.length){
							chartData1L.push(0);
						};
					};
					
				};
				console.log("chartData1S===[",chartData1S,"]");
				console.log("chartData1M===[",chartData1M,"]");	
				
			    setChart1();
			}, function(){
				console.log("실패");	
			}, true, true);
		    
	    };



        function setChart1(){
			console.log("setChart1===");	
			
            var chartAreaRadar1 = document.getElementById("chartRadar1").getContext("2d");
            let optionsData = {

                plugins : {
                    title:{
                        display:true,
                        test:'ssssssss'
                    }
                },
                responsice:true
            }

            chartRadD1 = new Chart(chartAreaRadar1, {
                type : "bar" ,
                data : {
                    labels: chartLabels1, // ["Red","Blue","Yellow","Green","Purple","Orange"],
                    datasets:[
                        {
                            label:"소형",
                            data :chartData1S, //[12,18,4,6,10,8],
                            backgroundColor:"rgba(255,99,132,0.2)",
                            //borderColor:"rgba(255,99,132,1)",
                            //borderWidth: 1
                        },
                        {
                            label:"중형",
                            data :chartData1M,
                            backgroundColor:"rgba(75,192,192,0.2)",
                            //borderColor:"rgba(75,192,192,1)",
                            //borderWidth: 1
                        },
                        {
                            label:"대형",
                            data :chartData1L,
                            backgroundColor:"rgba(150,255,30,0.2)",
                            //borderColor:"rgba(75,192,192,1)",
                            //borderWidth: 1
                        }
    

                    ]
                },
                options: optionsData
            });

            
            
            chart2Selcect();
        };
        
        
        /**
		 * 2번차트
		 */
        function chart2Selcect(){
			console.log("chart2Selcect====");
			let param = {
				"url" 			: "ppadmin01Sel2",
				//"url" 			: "viewSample",
				"dataParam"		: {
									dateVal:($("#monthVal").val()).replaceAll(".","")
									,memId : $("#comList").val()
									}
				
			};
			
			if(gIsAdmin == "N" && !commUtil.isEmpty(gMemId)){
				param.dataParam.memId = gMemId;
			};
			
			ComUtil.request(param, function(res){
				console.log("성공===[",res,"]");	
				chartLabels2 	= new Array();
				chartData2		= new Array();
				
				for(var i=0; i < res.length; i++){
				//	uniqueLabels1[i].createdAt
					let mapData = res[i];
					
					//totPeoCnt =+ mapData.cnt;
					
					//라벨
					chartLabels2.push(mapData.createdAt);
					chartData2.push(mapData.cnt);
				};
				
				console.log("차트라벨2===[",chartLabels1,"]");	
				
				
		        setChart2();
			}, function(){
				console.log("실패");	
			}, true, true)
	    };
	    
	    function setChart2(){
			var chartAreaRadar2 = document.getElementById("chartRadar2").getContext("2d");
		
            let optionsData = {

                plugins : {
                    title:{
                        display:true,
                        test:'ssssssss'
                    }
                },
                responsice:true,
                maintainAspectRatio: false, // 캔버스의 가로 세로 비율 유지
                scales: {
		            y: {
		                beginAtZero: true
		            }
		        }
            };


            chartRadD2 = new Chart(chartAreaRadar2, {
                type : "bar" ,
                data : {
                    labels: chartLabels2, // ["Red","Blue","Yellow","Green","Purple","Orange"],
                    datasets:[
                        {
                            label:"일별인원",
                            data :chartData2, //[12,18,4,6,10,8],
                            backgroundColor:"rgba(10,219,10,0.2)",
                            borderColor:"rgba(10,219,10,1)",
                            borderWidth: 1
                        }

                    ]
                },
                options: {
					scales: {
			            y: {
			                beginAtZero: true
			            }
			        }
				}
            });

        

setTimeout(function() {
  console.log('Function executed after 2000 milliseconds');
            //$(".fn-fold-btn").click(); //차트 몽땅 열기....
            if( $("#chartBtn1").attr("aria-expanded")=="false" ){
				$("#chartBtn1").click();
			};
			
			if( $("#chartBtn2").attr("aria-expanded")=="false" ){
				$("#chartBtn2").click();
			};
}, 500); // 


        };


	//월 변경감지
	function monthValChgChk(){
		var prevText = $("#monthVal").val();
    
	    setInterval(async function() {
	        // 현재 텍스트를 가져옵니다.
	        var currentText = $("#monthVal").val();
	        
	        // 이전 텍스트와 현재 텍스트를 비교하여 변경을 감지합니다.
	        if (prevText !== currentText) {
				// 차트 제거
				chartRadD1.destroy();
				chartRadD2.destroy();
				
	            console.log('Text changed to:', currentText);
	            
	            // 변경된 텍스트를 이전 텍스트에 저장합니다.
	            prevText = currentText;
	            
	            await mainSelcect();
				await chart1Selcect();
	            
	        }
	    }, 300); // 0.5초마다 텍스트를 확인합니다.
	};
        
        
	function comValChgChk(){
		var prevText = $("#comList").val();
    
	    setInterval(async function() {
	        // 현재 텍스트를 가져옵니다.
	        var currentText = $("#comList").val();
	        
	        // 이전 텍스트와 현재 텍스트를 비교하여 변경을 감지합니다.
	        if (prevText !== currentText) {
				// 차트 제거
				chartRadD1.destroy();
				chartRadD2.destroy();

	            console.log('Text changed to:', currentText);
	            
	            // 변경된 텍스트를 이전 텍스트에 저장합니다.
	            prevText = currentText;
	            
	            await mainSelcect();
				await chart1Selcect();
	            
	        }
	    }, 300); // 0.5초마다 텍스트를 확인합니다.
	};


