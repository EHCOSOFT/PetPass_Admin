$(document).ready(function () {

    // 모바일 메뉴 이벤트
    // 사이드 메뉴 열기
    $('.btn-menu-open').on('click', function () {
        $('#aside').addClass('show'); // #aside에 'show' 클래스 추가
        window.addEventListener('wheel', removeDefaultEvent, { passive: false });
        window.addEventListener('touchmove', removeDefaultEvent, { passive: false });

    });

    // 사이드 메뉴 닫기
    $('.btn-aside-close').on('click', function () {
        $('#aside').removeClass('show'); // #aside에서 'show' 클래스 제거
        // 이벤트 제거
        window.removeEventListener('wheel', removeDefaultEvent);
        window.removeEventListener('touchmove', removeDefaultEvent);
    });


    // 선택적으로 메뉴 외부 클릭 시 사이드 메뉴 닫기
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#aside, .btn-menu-open').length) { // Check if click is outside
            $('#aside').removeClass('show');
            window.removeEventListener('wheel', removeDefaultEvent);
            window.removeEventListener('touchmove', removeDefaultEvent);
        }
    });
    

    // 클릭 이벤트 핸들러 등록
    $('#aside .depth-01 > li > a').on('click', function (e) {
        e.preventDefault(); // 기본 동작 방지

        const $parentLi = $(this).parent('li'); // 현재 클릭된 a의 부모 li

        // 기존의 active 클래스 제거
        $('#aside .depth-01 > li').removeClass('active');
        $('#aside .depth-02').removeClass('active');

        // 현재 클릭된 요소에 active 클래스 추가
        $parentLi.addClass('active');

        // depth-child가 있는 경우, 하위 depth-02에 active 클래스 추가
        if ($parentLi.hasClass('depth-child')) {
            $parentLi.find('.depth-02').addClass('active');
        }
    });

    // depth-02 하위 항목 클릭 이벤트 핸들러 등록
    $('#aside .depth-02 > li > a').on('click', function (e) {
        e.preventDefault(); // 기본 동작 방지

        const $parentLi = $(this).parent('li'); // 현재 클릭된 a의 부모 li

        // 기존의 active 클래스 제거
        $('#aside .depth-02 > li').removeClass('active');

        // 현재 클릭된 요소에 active 클래스 추가
        $parentLi.addClass('active');
    });

    // 블랙리스트 등록 > 사유(기타) > input
    $(document).on('click', '#petBlackListReasonOption li', function () {
        const $li = $(this);
        const $selectWrapper = $('#petBlackListReason').parent();
        const $input = $selectWrapper.next('.input');

        if ($li.is(':last-child')) {
            $input.prop('disabled', false).removeClass('hide').addClass('show');
        } else {
            $input.prop('disabled', true).removeClass('show').addClass('hide');
        }
    });

    /***
      * 드롭다운
    ****/

    // 드롭다운 버튼 클릭 이벤트 (토글)
    $(document).on('click', '.dropdown-button', function (event) {
        const dropdownContent = $(this).siblings('.dropdown-content');
        $('.dropdown-content').not(dropdownContent).hide(); // 다른 드롭다운 숨기기
        dropdownContent.toggle();
        event.stopPropagation();
    });

    // 페이지 외부 클릭 시 드롭다운 숨기기
    $(document).on('click', function () {
        $('.dropdown-content').hide();
    });

    // 드롭다운 항목 클릭 이벤트 (항목 선택 및 버튼 업데이트)
    $(document).on('click', '.dropdown-content a', function (event) {
        event.preventDefault();

        // 선택된 항목에 'selected' 클래스 추가
        $(this).closest('.dropdown-content').find('a').removeClass('selected');
        $(this).addClass('selected');

        // 버튼 내용 업데이트
        const selectedHtml = $(this).html(); // 선택된 항목의 HTML 가져오기
        const dropdownButton = $(this).closest('.dropdown').find('.dropdown-button');
        dropdownButton.html(selectedHtml); // 버튼 내용 업데이트

        // 드롭다운 메뉴 숨기기
        $(this).closest('.dropdown-content').hide();
    });

    /***
      * 모달 이벤트
    ****/

    function removeDefaultEvent(e) {
        e.preventDefault();
    }

    // 모달 열기 버튼 클릭 이벤트
    $(document).on('click', '.open-modal', function () {
        const modalId = $(this).data('modal-id'); // 모달 ID 가져오기
        const $modal = $('#' + modalId); // 모달 요소 선택

        $modal.addClass('active'); // 모달 활성화

        // 휠 이벤트 비활성화 (일부 모달에 대해)
        if (!$modal.hasClass('full-modal') && !$modal.hasClass('toggle-modal')) {
            window.addEventListener('wheel', removeDefaultEvent, { passive: false });
        }

        // 터치 이벤트 비활성화 (toggle-modal에 대해)
        if ($modal.hasClass('toggle-modal')) {
            window.addEventListener('touchmove', removeDefaultEvent, { passive: false });
        }
    });

    // 모달 닫기 버튼 클릭 이벤트
    $(document).on('click', '.btn-modal-close', function () {
        const $modal = $(this).closest('.modal-wrap'); // 가장 가까운 모달 찾기
        $modal.removeClass('active'); // 모달 비활성화

        // 이벤트 제거
        window.removeEventListener('wheel', removeDefaultEvent);
        window.removeEventListener('touchmove', removeDefaultEvent);
    });

    // 모달 외부 클릭 시 닫기 이벤트
    $(document).on('click', '.modal-wrap', function (e) {
        if ($(e.target).hasClass('modal-wrap')) {
            $(this).removeClass('active'); // 모달 비활성화

            // 이벤트 제거
            window.removeEventListener('wheel', removeDefaultEvent);
            window.removeEventListener('touchmove', removeDefaultEvent);
        }
    });

    // 모달 내부 클릭 시 닫기 방지
    $(document).on('click', '.modal-content', function (e) {
        e.stopPropagation();
    });

    // 템플릿 관리
    let counter = 1; // 고유 ID 생성을 위한 카운터 초기화
    let isDragging = false; // 상태 플래그
    let currentElement = null; // 현재 드래그 중인 요소
    let startY = 0; // 초기 마우스 Y 위치

    function disableBodyScroll() {
        $('body').css('overflow', 'hidden');
    }

    function enableBodyScroll() {
        $('body').css('overflow', '');
    }

    // .btn-move 버튼의 기본 동작 방지
    $(document).on('mousedown', '.btn-move', function (e) {
        e.preventDefault(); // 텍스트 선택 또는 버튼 활성화 방지
        console.log('1234');
    });

    // .btn-move 버튼으로 드래그 시작
    $(document).on('mousedown touchstart', '.btn-move', function (e) {
        e.preventDefault(); // 기본 동작 방지
        isDragging = true;
        currentElement = $(this).closest('li'); // 현재 클릭한 li
        startY = e.clientY || e.originalEvent.touches[0].clientY; // 마우스 또는 터치 Y 좌표 저장
        disableBodyScroll(); // 스크롤 비활성화
    });

    // 마우스 또는 터치 이동 이벤트
    $(document).on('mousemove touchmove', function (e) {
        if (!isDragging || !currentElement) return;

        const clientY = e.clientY || e.originalEvent.touches[0].clientY;
        const deltaY = clientY - startY; // 이동 거리 계산
        const threshold = 20; // 이동 임계값

        if (deltaY < -threshold) {
            // 위로 이동
            const prevElement = currentElement.prev();
            if (prevElement.length) {
                currentElement.insertBefore(prevElement); // li 순서 변경
                startY = clientY; // 시작 위치 업데이트
            }
        } else if (deltaY > threshold) {
            // 아래로 이동
            const nextElement = currentElement.next();
            if (nextElement.length) {
                currentElement.insertAfter(nextElement); // li 순서 변경
                startY = clientY; // 시작 위치 업데이트
            }
        }
    });

    // 마우스 업 이벤트로 드래그 종료
    $(document).on('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            currentElement = null;
            $('body').removeClass('no-select'); // 텍스트 선택 복원
        }
    });

    // 드래그 종료
    $(document).on('mouseup touchend', function () {
        if (isDragging) {
            isDragging = false;
            currentElement = null;
            enableBodyScroll(); // 스크롤 활성화
        }
    });

    // 모바일 스크롤 방지 클래스 (선택 사항)
    $('body').on('touchmove', function (e) {
        if (isDragging) {
            e.preventDefault(); // 드래그 중 터치 스크롤 방지
        }
    });

    // 추가 버튼 클릭 시 기본(단답형) 추가
    $('.btn-add-template').on('click', function () {
        const newTemplate = `
            <li class="form-move-item">
                <button type="button" class="btn-move">
                    <img src="/resources/image/ico/i-move.svg" alt="이동">
                </button>
                <div class="form-move-box">
                    <div class="form-move-option">
                        <div class="form-option-group">
                            <div class="dropdown">
                                <button class="dropdown-button">
                                    <img src="/resources/image/ico/i-template-01.svg" alt="단답형">단답형
                                </button>
                                <div class="dropdown-content">
                                    <a href="#" class="selected" value="templateText">
                                        <img src="/resources/image/ico/i-template-01.svg" alt="단답형">단답형
                                    </a>
                                    <a href="#" value="templateCheckbox">
                                        <img src="/resources/image/ico/i-template-02.svg" alt="체크박스">체크박스
                                    </a>
                                    <a href="#" value="templateRadio">
                                        <img src="/resources/image/ico/i-template-03.svg" alt="단일선택">단일선택
                                    </a>
                                    <a href="#" value="templateSelect">
                                        <img src="/resources/image/ico/i-template-04.svg" alt="목록선택형">목록선택형
                                    </a>
                                    <a href="#" value="templateRadioText">
                                        <img src="/resources/image/ico/i-template-03.svg" alt="단일선택+단답형">단일선택+단답형
                                    </a>
                                </div>
                            </div>
                            <div class="check-group">
                                <input type="checkbox" id="essentialText${counter}">
                                <label for="essentialText${counter}">필수</label>
                            </div>
                            <div class="check-group">
                                <input type="checkbox" id="activate${counter}">
                                <label for="activate${counter}">활성화 여부</label>
                            </div>
                        </div>
                        <button type="button" class="btn-move-close open-modal" data-modal-id="alertModal">
                            <img src="/resources/image/ico/i-move-close.svg" alt="템플릿 삭제">
                        </button>
                    </div>
                    <div class="template-change">
                        <div class="input w-100">
                            <input type="text" id="templateText" name="templateText" class="input-data" value="" placeholder="질문을 입력해주세요.(30byte)">
                        </div>
                    </div>
                </div>
            </li>`;

        // 새로운 템플릿을 목록에 추가
        $(this).parent('.form-head').next().children('.form-move').append(newTemplate);
        // $('.form-move').append(newTemplate);
        counter++;

        attachDropdownEvent(); // 새로운 템플릿에 이벤트 추가
    });

    function attachDropdownEvent() {
        $('.dropdown-content a').off('click').on('click', function (e) {
            e.preventDefault();
            const value = $(this).attr('value');
            const templateChange = $(this).closest('.form-move-box').find('.template-change');

            let newContent = '';

            switch (value) {
                case 'templateText':
                    newContent = `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="질문 입력(30byte)">
                </div>`
                    break;
                case 'templateCheckbox':
                    newContent = `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="질문 입력(30byte)">
                </div>`
                    counter++;
                    newContent += `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="항목 입력(8byte)">
                </div>`
                    counter++;
                    newContent += `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="항목 입력(8byte)">
                </div>`
                    counter++;
                    newContent += `<a href="#" class="add-check-item">항목 추가</a>`;
                    break;
                case 'templateRadio':
                    newContent = `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="질문 입력(30byte)">
                </div>`
                    counter++;
                    newContent += `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="항목 입력(8byte)">
                </div>`
                    counter++;
                    newContent += `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="항목 입력(8byte)">
                </div>`
                    counter++;
                    newContent += `<a href="#" class="add-radio-item">항목 추가</a>`;
                    break;
                case 'templateSelect':
                    newContent = `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="질문 입력(30byte)">
                </div>`
                    counter++;
                    newContent += `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="항목 입력(8byte)">
                </div>`
                    counter++;
                    newContent += `
                <div class="input w-100">
                    <input type="text" id="templateText${counter}" name="templateText${counter}"
                        class="input-data" value="" placeholder="항목 입력(8byte)">
                    <button type="button" class="btn-clear" aria-hidden="true"><span
                            class="sr-only">입력 내용
                            삭제</span></button>
                </div>`
                    counter++;
                    newContent += `<a href="#" class="add-option-item">항목 추가</a>`;
                    break;
                case 'templateRadioText':
                    newContent = `
                    <div class="input w-100" >
                        <input type="text" id="templateText${counter}" name="templateText${counter}"
                            class="input-data" value="" placeholder="질문 입력(30byte)">
                    </div>`
                    counter++;
                    newContent += `
                    <div class="radio-text-item">
                        <div class="input w-100">
                            <input type="text" id="templateText${counter}" name="templateText${counter}"
                                class="input-data" value="" placeholder="항목 입력(8byte)">
                            <button type="button" class="btn-input-close">
                                <img src="/resources/image/ico/i-move-close.svg" alt="항목 삭제">
                            </button>
                        </div>
                        <div class="check-group">
                            <input type="checkbox" id="textActive${counter}" class="text-active">
                            <label for="textActive${counter}">단답형 활성화</label>
                        </div>
                        <div class="input w-100">
                            <input type="text" id="ActiveTextInput${counter}" name="ActiveTextInput${counter}"
                                disabled class="input-data" value="" placeholder="단답형 입력(8byte)">
                            <button type="button" class="btn-clear" aria-hidden="true">
                                <span class="sr-only">입력 내용 삭제</span>
                            </button>
                        </div>
                    </div>
                    <a href="#" class="add-radio-text-item">항목 추가</a>`;
                    break;
                default:
                    newContent = '';
            }

            // 템플릿 내용 업데이트
            templateChange.html(newContent);
            counter++;

            // 새로 추가된 항목에 대해 `.text - active` 이벤트 재등록
            attachTextActiveHandler();
        });
    };

    attachDropdownEvent(); // 초기 드롭다운 이벤트 연결

    // 템플릿 : 체크박스 항목추가
    $(document).on('click', '.add-check-item', function (e) {
        e.preventDefault();

        const newItem = `
            <div class="input w-100">
                <input type="text" id="templateText${counter}" name="templateText${counter}"
                    class="input-data" value="" placeholder="항목 입력(8byte)">
                    <button type="button" class="btn-input-close">
                        <img src="/resources/image/ico/i-move-close.svg"
                            alt="항목 삭제">
                    </button>
                </div>
            `;

        $(this).before(newItem); // 새 항목을 추가 버튼 앞에 추가
        counter++;
    });

    // 템플릿 : 단일선택 항목추가
    $(document).on('click', '.add-radio-item', function (e) {
        e.preventDefault();

        const newItem = `
            <div class="input w-100">
                <input type="text" id="templateText${counter}" name="templateText${counter}"
                    class="input-data" value="" placeholder="항목 입력(8byte)">
                <button type="button" class="btn-input-close">
                    <img src="/resources/image/ico/i-move-close.svg"
                        alt="항목 삭제">
                </button>
            </div>
            `;

        $(this).before(newItem); // 새 항목을 추가 버튼 앞에 추가
        counter++;
    });

    // 템플릿 : 목록선택형 항목추가
    $(document).on('click', '.add-option-item', function (e) {
        e.preventDefault();

        const newItem = `
            <div class="input w-100">
                <input type="text" id="templateText${counter}" name="templateText${counter}"
                    class="input-data" value="" placeholder="항목 입력(8byte)">
                <button type="button" class="btn-input-close">
                    <img src="/resources/image/ico/i-move-close.svg"
                        alt="항목 삭제">
                </button>
            </div>`;

        $(this).before(newItem); // 새 항목을 추가 버튼 앞에 추가
        counter++;
    });

    // /.btn-input-close 클릭 시 항목 삭제
    $(document).on('click', '.btn-input-close', function () {
        $(this).closest('.input').remove();
    });

    // 템플릿 : 단일선택+단답형 항목추가
    $(document).on('click', '.add-radio-text-item', function (e) {
        e.preventDefault();

        const newItem = `
            <div class="radio-text-item">
                <div class="input w-100">
                    <input type="text" id="template${counter}" name="template${counter}"
                        class="input-data" value="" placeholder="항목 입력(8byte)">
                    <button type="button" class="btn-radio-item-close">
                        <img src="/resources/image/ico/i-move-close.svg" alt="항목 삭제">
                    </button>
                </div>
                <div class="check-group">
                    <input type="checkbox" id="textActive${counter}" class="text-active">
                    <label for="textActive${counter}">단답형 활성화</label>
                </div>
                <div class="input w-100">
                    <input type="text" id="template${counter}" name="template${counter}"
                        disabled class="input-data" value="" placeholder="항목 입력(8byte)">
                </div>
            </div> `;

        $(this).before(newItem); // 새 항목을 추가 버튼 앞에 추가
        counter++;
    });

    // 템플릿 : 단일선택+단답형 체크박스 활성화 시 단답형 입력 show
    function attachTextActiveHandler() {
        $(document).on('change', '.text-active', function () {
            const nextInput = $(this).closest('.radio-text-item').find('.input-data').last();
            nextInput.prop('disabled', !$(this).is(':checked'));
        });
    }

    // 페이지 로드 시 /.text-active 핸들러 연결
    attachTextActiveHandler();

    // /.btn-radio-item-close 클릭 시 항목 삭제
    // $(document).on('click', '.btn-radio-item-close', function () {
    //     $(this).closest('.radio-text-item').remove();
    // });
});

function setAppHeight() {
    const appHeight = window.innerHeight;
    document.documentElement.style.setProperty('--app-height', `${appHeight}px`);
}

window.addEventListener('DOMContentLoaded', setAppHeight);
window.addEventListener('resize', setAppHeight);
window.addEventListener('orientationchange', setAppHeight);