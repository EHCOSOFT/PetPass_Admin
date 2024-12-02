/* ⚠ 산출물 확인용으로 서버에 배포 금지 */

/* 푸터 공통 */
if (document.querySelector('#footer')) {
	document.querySelector('#footer').innerHTML = 
		`<div class="footer-summary">
		<button type="button" class="btn-footer-info"><span class="txt">신한EZ손해보험(주) 사업자정보</span></button>
	</div>
	<div class="footer-detail">
		<div class="footer-inner">
			<div class="company-info">
				<div class="info-group">
					<span class="address">서울시 중구 남대문로 113 (다동 103) DB다동빌딩 5층</span>
					<span class="ceo">대표이사 : 강병관</span>
				</div>
				<div class="info-group">
					<span class="license">사업자등록번호 : 220-86-65241</span>
					<a href="https://www.shinhanez.co.kr" target="_blank" class="btn-txt-link"><span>신한EZ손해보험 홈페이지</span></a>
				</div>
			</div>
			<div class="footer-logo"><span class="sr-only">신한EZ손해보험</span></div>
		</div>
	</div>
	<button type="button" class="btn-page-top"><span class="sr-only">TOP</span></button>`;
}

if (document.querySelector('#gnb')) {
	document.querySelector('#gnb').innerHTML = `
	<div class="gnb-inner">
					<!-- .util -->
					<div class="util">
						<ul class="util-list">
							<li class="util-item main"><a href="../../../man/man/man/MANMANMAN_M01.html"><span class="sr-only">메인</span></a></li>
							<li class="util-item logout"><a href="javascript:;"><span class="sr-only">로그아웃</span></a></li>
							<li class="util-mypage">
								<a href="javascript:;">
									<span class="avatar type8"><span class="sr-only">캐릭터 레이</span></span>
									<!-- [D]캐릭터 종류별
										<span class="avatar type1"><span class="sr-only">캐릭터 쏠</span></span>
										<span class="avatar type2"><span class="sr-only">캐릭터 몰리</span></span>
										<span class="avatar type3"><span class="sr-only">캐릭터 리노</span></span>
										<span class="avatar type4"><span class="sr-only">캐릭터 슈</span></span>
										<span class="avatar type5"><span class="sr-only">캐릭터 도레미</span></span>
										<span class="avatar type6"><span class="sr-only">캐릭터 루루라라</span></span>
										<span class="avatar type7"><span class="sr-only">캐릭터 폴리</span></span>
										<span class="avatar type8"><span class="sr-only">캐릭터 레이</span></span>
									-->
									<span class="txt"><em>김신한</em> 설계사님</span>
								</a>
							</li>
							<li class="util-item close"><button type="button" class="btn-menu-close"><span class="sr-only">메뉴 닫기</span></button></li>
						</ul>
					</div>
					<!--// .util -->
					<!-- .bookmark -->
					<div class="bookmark">
						<div class="bookmark-wrap fn-fold-wrap is-open" data-fold-slide="true">
							<div class="bookmark-head">
								<h2 class="bookmark-title fn-fold-link"><span class="txt">즐겨찾기 메뉴</span></h2>
								<button type="button" class="btn-fold fn-fold-btn" aria-expanded="false"><span class="sr-only">열기</span></button>
							</div>
							<div class="bookmark-inner fn-fold-item">
								<ul class="bookmark-list">
									<!-- [D]기본출력 -->
									<li class="bookmark-item">
										<a href="../../../cst/csi/csi/CSTCSICSI_M04.html" class="link">고객등록</a>
									</li>
									<!-- [D]순서변경 버튼 클릭 시 메뉴 이동 버튼 활성화 -->
									<li class="bookmark-item">
										<a href="../../../cnt/inp/inp/CNTINPINP_M04.html" class="link">보험료설계</a>
										<button type="button" class="btn ico-move"><span class="sr-only">메뉴 이동</span></button>
									</li>
									<li class="bookmark-item">
										<a href="../../../sal/sci/sci/SALSCISCI_M01.html" class="link">추천고객리스트</a>
										<button type="button" class="btn ico-move"><span class="sr-only">메뉴 이동</span></button>
									</li>
								</ul>
								<button type="button" class="btn texted gnb-order"><span>순서변경</span></button>
								<!-- [D]순서변경 버튼 클릭 시 .primary 클래스 추가 -->
								<!-- <button type="button" class="btn texted primary gnb-order"><span>저장</span></button> -->
							</div>
						</div>
						<button type="button" class="btn-bookmark"><span class="txt">즐겨찾기 <em></em></span></button>
					</div>
					<!--// .bookmark -->
					<!-- .gnb* -->
					<div class="gnb-wrap">
						<ul class="gnb-list">
							<li class="gnb-item fn-fold-wrap is-open" data-fold-slide="true">
								<span class="txt fn-fold-link">상품보기</span>
								<button type="button" class="btn-fold fn-fold-btn" aria-expanded="false"><span class="sr-only">열기</span></button>
								<ul class="snb-list fn-fold-item">
									<li class="snb-item">
										<label for="bookmark1a" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark1a" class="control" checked>
										</label>
										<a href="../../../prd/pus/pus/PRDPUSPUS_M01.html" class="link">상품URL발송</a>
									</li>
									<li class="snb-item is-active"><!-- [D]메뉴 활성화 .is-active 클래스 추가 -->
										<label for="bookmark1b" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark1b" class="control">
										</label>
										<a href="javascript:;" class="link">운전자보험 간편설계</a>
									</li>
									<li class="snb-item">
										<label for="bookmark1c" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark1c" class="control">
										</label>
										<a href="javascript:;" class="link">건강보험 간편설계</a>
									</li>
									<li class="snb-item">
										<label for="bookmark1d" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark1d" class="control">
										</label>
										<a href="javascript:;" class="link">보험상품보기</a>
									</li>
								</ul>
							</li>
							<li class="gnb-item fn-fold-wrap is-open" data-fold-slide="true">
								<span class="txt fn-fold-link">고객관리</span>
								<button type="button" class="btn-fold fn-fold-btn" aria-expanded="false"><span class="sr-only">열기</span></button>
								<ul class="snb-list fn-fold-item">
									<li class="snb-item">
										<label for="bookmark2a" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark2a" class="control">
										</label>
										<a href="../../html/cst/csi/csi/CSTCSICSI_M04.html" class="link">고객등록</a>
									</li>
									<li class="snb-item">
										<label for="bookmark2b" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark2b" class="control">
										</label>
										<a href="javascript:;" class="link">고객정보조회</a>
									</li>
									<li class="snb-item">
										<label for="bookmark2c" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark2c" class="control">
										</label>
										<a href="javascript:;" class="link">고객기념일</a>
									</li>
								</ul>
							</li>
							<li class="gnb-item fn-fold-wrap is-open" data-fold-slide="true">
								<span class="txt fn-fold-link">계약관리</span>
								<button type="button" class="btn-fold fn-fold-btn" aria-expanded="false"><span class="sr-only">열기</span></button>
								<ul class="snb-list fn-fold-item">
									<li class="snb-item">
										<label for="bookmark3a" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark3a" class="control">
										</label>
										<a href="javascript:;" class="link">설계상태조회</a>
									</li>
									<li class="snb-item">
										<label for="bookmark3b" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark3b" class="control">
										</label>
										<a href="javascript:;" class="link">보험료설계</a>
									</li>
									<li class="snb-item">
										<label for="bookmark3c" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark3c" class="control">
										</label>
										<a href="javascript:;" class="link">보유계약관리</a>
									</li>
									<li class="snb-item">
										<label for="bookmark3d" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark3d" class="control">
										</label>
										<a href="javascript:;" class="link">해피콜완료</a>
									</li>
								</ul>
							</li>
							<li class="gnb-item fn-fold-wrap is-open" data-fold-slide="true">
								<span class="txt fn-fold-link">영업지원</span>
								<button type="button" class="btn-fold fn-fold-btn" aria-expanded="false"><span class="sr-only">열기</span></button>
								<ul class="snb-list fn-fold-item">
									<li class="snb-item">
										<label for="bookmark4a" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark4a" class="control">
										</label>
										<a href="javascript:;" class="link">추천고객리스트</a>
									</li>
									<li class="snb-item">
										<label for="bookmark4b" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark4b" class="control">
										</label>
										<a href="javascript:;" class="link">보장분석</a>
									</li>
									<li class="snb-item">
										<label for="bookmark4c" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark4c" class="control">
										</label>
										<a href="javascript:;" class="link">매니저도움관리</a>
									</li>
									<li class="snb-item">
										<label for="bookmark4d" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark4d" class="control">
										</label>
										<a href="javascript:;" class="link">이벤트</a>
									</li>
									<li class="snb-item">
										<label for="bookmark4e" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark4e" class="control">
										</label>
										<a href="javascript:;" class="link">새소식알림</a>
									</li>
									<li class="snb-item">
										<label for="bookmark4f" class="checkbox-item option-bookmark">
											<input type="checkbox" name="" id="bookmark4f" class="control">
										</label>
										<a href="javascript:;" class="link">소득조회</a>
									</li>
								</ul>
							</li>
						</ul>
						<div class="gnb-btn-wrap">
							<button type="button" class="btn primary gnb-save"><span>즐겨찾기 저장</span></button>
						</div>
					</div>
					<!-- .gnb* -->
				</div>
	`;
}

/* 새로고침 시 마지막 스크롤 위치 고정 */
/* const rootPage = document.querySelector('#page');
if (rootPage) {
	let finalScrollTop = localStorage.getItem('dataFinalScrollTop');
	if (finalScrollTop !== null) {
		rootPage.scrollTop = parseInt(finalScrollTop, 10);
	}
	window.addEventListener('beforeunload', () => {
		localStorage.setItem('dataFinalScrollTop', rootPage.scrollTop);
	});
} */

/* CSS 변수 제어하기 참고 */
// 가상 클래스 요소 얻기
// let root = document.querySelector(':root');

// window.getComputedStyle 메서드를 이용하면, 해당 요소에 전역적으로 적용된 모든 형태의 style을 반환한다
// let variables = getComputedStyle(root);

// 변수 값 얻기
// variables.getPropertyValue('--hover');