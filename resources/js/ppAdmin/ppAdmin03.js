/**
 * 
 */
let scrId = "ppAdmin03"


const context = '.'+scrId;
const exports = {};

let qriId 		= $("#reQriId").val();
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

iniFn();

commView.commUiInit("CNTCNTCNT_M02", ['calendar']);

let selectedPetBreedCode = undefined;


/**
 * event
 */
async function iniFn(){

	let petBirth = commUtil.getToday('YYYYMMDD');
	$("#petBirth").val(petBirth);

	//취소버튼
	$("#rePageGo").click(async function(){
		let status		= $("#reStatus").val();//가입상태
		let companyName	= $("#reCompanyName").val();

		let goParam = {
			"status"	: status
			,"rePage"		: "ok"
			,fromDate		: fromDate
			,toDate			: toDate
			,companyName 	: companyName
			,petComCnt		: petComCnt
			,petSizeType	: petSizeType
			,petGender		: petGender
			,petWeight		: petWeight
			,petWeightS		: petWeightS
			,petWeightE		: petWeightE
			,delSel			: delSel
		};


		ComUtil.submit('ppAdmin02', goParam);
	});

	$("#petType").change(function () {
		selectedPetBreedCode = undefined;
		$('#petBreedCode').empty();
		$('#petHairColorCode').empty();

		$("#petBreedCode").val();
		$("#petHairColorCode").val();

		$("#petBreedCode").parent().find(".select-button").first().find("span").first().text("선택");
		$("#petHairColorCode").parent().find(".select-button").first().find("span").first().text("선택");

		let petType = $(this).val();

		console.log("petType : ", petType);

		let param = {
			"url" 			: "getBreeds",
			"dataParam"		: {
				petType : petType
			}
		};

		ComUtil.request(param, function(res){

			console.log("품종 목록 성공===", res);
			const mapList = res.mapList;

			$('#petBreedCode').empty();
			$('#petBreedCode').append($('<option>', {
				value: "",
				text : "선택"
			}));
			$.each(mapList, function (i, item) {
				$('#petBreedCode').append($('<option>', {
					value: item.petBreedCode,
					text : item.petBreedName
				}));
			});

			 console.log("selectedPetBreedCode", selectedPetBreedCode);
			if (selectedPetBreedCode !== undefined) {
				$('#petBreedCode').val(selectedPetBreedCode);
			} else {
				$("#petBreedCode").parent().find(".select-button").first().attr('aria-label', "선택");
			}

		}, function(){
			console.log("실패");
		}, true, true);
	});

	$("#petBreedCode").change(function () {
		let petBreedCode = $('#petBreedCode').val();
		getHairColors(petBreedCode);
	});

	$("#modifyBtn").click(function () {
		const petType = $("#petType").val();
		const petRegNo = $("#petRegNo").val();
		const petBreedCode = $("#petBreedCode").val();
		if (petBreedCode.length === 0) {
			alert("품종을 선택해 주세요.")
			return;
		}
		const petName = $("#petName").val();
		const petGender = $("#petGender").val();
		const petNeuterYn = $("#petNeuterYn").val();
		let petWeight = $("#petWeight").val();
		if (petWeight.length === 0) {
			petWeight = "-1";
		}
		const petBirth = $("#petBirth").val();
		const petHairColorCode = $("#petHairColorCode").val();
		const petId = $("#petId").val();
		const petSizeType = $("#petSizeType").val();
		const isFierce = $("#isFierce").val();
		const petOrgNm = $("#petOrgNm").val();

		let param = {
			"url" 			: "modifyPet",
			"dataParam"		: {
				id: qriId,
				petType : petType,
				petRegNo : petRegNo,
				petBreedCode : petBreedCode,
				petName : petName,
				petGender : petGender,
				petNeuterYn : petNeuterYn,
				petWeight : petWeight,
				petBirth : petBirth,
				petHairColorCode : petHairColorCode,
				petId : petId,
				petSizeType : petSizeType,
				isFierce : isFierce,
				petOrgNm: petOrgNm
			}
		};

		ComUtil.request(param, function(res){

			console.log("Pet 수정 성공===", res);

			alert("저장되었습니다.");

			location.reload();

		}, function(){
			console.log("실패");
		}, true, true);
	});

	await mainSelcect();

}

const loadPetBreedsAndSet = function (petBreedCode, petBreedName) {
	$("#petType").trigger("change");
	selectedPetBreedCode = petBreedCode;
	$("#petBreedCode").parent().find(".select-button").first().find("span").first().text(petBreedName);
}

const getHairColors = function (petBreedCode, petHairColorCode) {
	let param = {
		"url" 			: "getHairColors",
		"dataParam"		: {
			petBreedCode : petBreedCode
		}
	};

	ComUtil.request(param, function(res){

		console.log("품종 목록 성공===", res);
		const mapList = res.mapList;

		$('#petHairColorCode').empty();
		$('#petHairColorCode').append($('<option>', {
			value: "",
			text : "선택"
		}));
		$.each(mapList, function (i, item) {
			$('#petHairColorCode').append($('<option>', {
				value: item.petHairColorCode,
				text : item.petHairColorName
			}));
		});

		console.log("petHairColorCode ", petHairColorCode);

		if (petHairColorCode !== undefined) {
			$('#petHairColorCode').val(petHairColorCode);
		} else {
			$("#petHairColorCode").parent().find(".select-button").first().find("span").first().text("선택");
		}

	}, function(){
		console.log("실패");
	}, true, true);
}


/**
 * 메인
 */
function mainSelcect(){
	console.log("sampleSelcect====");


	let param = {
		"url" 			: "ppadmin03Sel1",
		"dataParam"		: {
							qriIdVal : qriId
							}
	};

	ComUtil.request(param, function(res){

		console.log("mainSelcect 성공===", res);

		let reData		= res[0];

		let qrAccessType		= commUtil.getQrAccessType(reData.qrScanDatas, reData.ownIdx);
		let ownBirth 	= commUtil.isEmpty(reData.ownBirth) ? "-" : reData.ownBirth;	//생년월일
		let petTypeNm	= reData.petType=="D"? "강아지" : (reData.petType=="C" ? "고양이" : "");
		let petGender	= reData.petGender=="M"? "남아" : "여아";
		let petNeuterNm	= reData.petNeuterYn=="1"? "중성화" : "미중성화";
		let petWeight	= commUtil.isEmpty(reData.petWeight) || reData.petWeight === -1 ? "" : reData.petWeight;	//몸무게
		let petBirth	= commUtil.isEmpty(reData.petBirth) ? "" : commUtil.getDate(reData.petBirth,'YYYY.MM.DD');	//생년월일

		let petHeightBigYn	= commUtil.isEmpty(reData.petHeightBigYn) ? "-" : (reData.petHeightBigYn=="Y" ? "대형견" : "중소형견");	//체고

		let petSizeTypeNm		= "-";	//사이즈
		if (reData.petSizeType === "L") {
			petSizeTypeNm = "대형";
		} else if (reData.petSizeType === "M") {
			petSizeTypeNm = "중형";
		} else if (reData.petSizeType === "S") {
			petSizeTypeNm = "소형";
		}

		let petHairColor	= commUtil.isEmpty(reData.petHairColor) ? "선택" : reData.petHairColor;	//털색깔
		let petCompanyCount = commUtil.isEmpty(reData.petCompanyCount) ? "-" : reData.petCompanyCount;
		let ownName = commUtil.isEmpty(reData.ownName) ? "-" : reData.ownName;
		let registrantName = commUtil.isEmpty(reData.registrantName) ? "-" : reData.registrantName;
		let isFierceNm = commUtil.isEmpty(reData.isFierce) ? "아니오" : reData.isFierce === 1 ? "예" : "아니오";
		let isQrKW = (reData.qrScanDatas && reData.qrScanDatas.startsWith("/pems/PET_PASS_KW")) ? "Y" : "-";


		$("#companyName").text(reData.companyName);	//제휴처
		$("#createdAt").text(reData.createdAt);	//출입일시
		$("#qrAccessType").text(qrAccessType);	//출입QR

		$("#ownName").text(ownName);	//등록자명
		$("#registrantName").text(registrantName);	//보호자명
		$("#ownPhone").text( commUtil.formatTelNum(reData.ownPhone) );	//연락처
		$("#ownBirth").text(ownBirth);	//생년월일
		$("#petCompanyCount").text(petCompanyCount);	//동반출입인원
		$("#marketingYn").text(reData.marketingYn);	//마케팅수신동의
		$("#isTemp").text(reData.isTemp);	//임시QR여부
		$("#isQrKW").text(isQrKW);	//QR스캔데이터

		$("#petType").val(reData.petType);	//동물종류
		$("#petRegNo").val(reData.petRegNo);	//국가동물번호

		// $("#petBreedName").text(reData.petBreedName);	//품종
		$("#petName").val(reData.petName);	//동물이름
		$("#petGender").val(reData.petGender);	//성별
		$("#petNeuterYn").val(reData.petNeuterYn);	//중성화
		$("#petWeight").val(petWeight);	//무게
		$("#petBirth").val(petBirth);	//생년월일
		$("#petId").val(reData.petId);	//petId
		$("#petSizeType").val(reData.petSizeType);	//체고-->사이즈로변경
		// $("#petHairColorCode").text(petHairColor);	//털색깔
		$("#petOrgNm").val(reData.orgNm ?? "-");	// 담당지역

		$("#isFierce").val(reData.isFierce);	// 맹견여부

		loadPetBreedsAndSet(reData.petBreedCode, reData.petBreedName);
		getHairColors(reData.petBreedCode, reData.petHairColorCode);

		$("#petGender").parent().find(".select-button").first().find("span").first().text(petGender);
		$("#petNeuterYn").parent().find(".select-button").first().find("span").first().text(petNeuterNm);
		$("#petSizeType").parent().find(".select-button").first().find("span").first().text(petSizeTypeNm);
		$("#petHairColorCode").parent().find(".select-button").first().find("span").first().text(petHairColor);
		$("#isFierce").parent().find(".select-button").first().find("span").first().text(isFierceNm);

		$("#kwD001").text(isQrKW);
		$("#kwD004").text(isQrKW);

		if(reData.petType === "D"){
			$("#dBod").hide();
			$("#cBod").hide();
			$("#kwBod").show();
		}else{
			$("#dBod").hide();
			$("#cBod").show();
			$("#kwBod").hide();
		};

		/**
			companyName			:	"test8"
			createdAt			:	"2024-01-24 14:42"
			isKb				:	"N"
			marketingYn			:	"Y"
			ownBirth			:	""
			registrantName				:	"김대철"
			ownPhone			:	"01011111111"
			petBirth			:	null
			petCompanyCount		:	2
			petGender			:	"F"
			petHairColor		:	null
			petHairColorCode	:	null
			petHeightBigYn		:	"Y" 체고(N-중소형견, Y-대형견)
			petName				:	"경이"
			petNeuterYn			:	"0" 반려동물 중성화 여부 1-중성화, 0-미중성화
			petRegNo			:	"410100012587066"
			petType				:	"D"
			petVaccinateYn		:	null
			petWeight			:	null
		 */
	}, function(){
		console.log("실패");
	}, true, true);


	param.url="ppadmin03Sel2";
	ComUtil.request(param, function(res){

		console.log("접종내역 성공===[",res,"]");
		/**
		 * D001 종합예방
		 * D002 코로나장염
		 * D003 전염성기관지염(켄넬로프)
		 *
		 */
		for(let i=0; i<res.length; i++){
			let tmpData = res[i];

			$("#"+tmpData.vaccinateCode).text( commUtil.getDate(tmpData.vaccinateDt,'YYYY.MM.DD'));
			if(tmpData.vaccinateCode == "D001"){
				$("#D001C").text( commUtil.getDate(tmpData.vaccinateDt,'YYYY.MM.DD'));
			};

		};

	}, function(){
		console.log("실패");
	}, true, true);
};
