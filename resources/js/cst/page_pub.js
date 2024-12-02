document.addEventListener("DOMContentLoaded", () => {
	
	const clientCalendarAction =() => {
		const calendar = document.querySelector('.client-calendar ul');
		if( calendar ){
			//현재날짜 - 한국시간 체크
			const now = new Date(); // 현재 시간
			const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); 
			const koreaTimeDiff = 9 * 60 * 60 * 1000;
			const koreaNow = new Date(utcNow + koreaTimeDiff); 
			
			const currentDay = koreaNow.getDate();

			const days = calendar.querySelectorAll('li');
			let daySize;

			//현재날짜 'today' 클래스 추가
			days.forEach(function(item){
				item.classList.remove('today');
				daySize = item.clientWidth + parseInt(getComputedStyle(item).marginLeft);
				
			});
			days[currentDay-1].classList.add('today');
			const pos = (daySize*(currentDay-1));
			//console.log(pos, '전체스크롤', calendar.scrollWidth - calendar.clientWidth )

			//스크롤위치변경
			if( currentDay > 6 ){			
				calendar.scrollLeft = pos/1.5;
			} 
			if( currentDay > 18 ){
				calendar.scrollLeft = pos/1.3;
			}
			if( currentDay > 27 ){
				calendar.scrollLeft = pos;
			}
		}		
	};
	clientCalendarAction();

	const treeAction = () => {
		const tree = document.querySelector('.tree');
		if( tree ){
			const treeItem = tree.querySelectorAll('li');
			tree.setAttribute('role', 'tree');
			treeItem.forEach(function(item, idx){
				//초기 속성 설정
				item.setAttribute('role', 'treeitem');
				item.setAttribute('aria-expanded', 'false');
				item.querySelector('a').setAttribute('tabindex', 1);
				item.classList.contains('is-open') ? item.setAttribute('aria-expanded', 'true') : null;			

				//하위요소 없을 시 아이콘 - 'ico-file' 추가
				const itemArray = [item];
				const subElement = item.querySelectorAll('ul');
				itemArray.filter((it)=>{
					subElement.length === 0 ? it.classList.add('ico-file') : null;
				});				

				
				//클릭 시
				item.querySelector('a').addEventListener('click', function(){
					if( item.closest('li').classList.contains('ico-file') ){	
						tree.querySelectorAll('li').forEach(function(treeLi){
							treeLi.classList.remove('is-active')
						});
					}
					
					if( !this.closest('li').classList.contains('is-open') ){
						this.closest('li').classList.add('is-active', 'is-open');
						this.closest('li').setAttribute('aria-expanded', 'true');
						tree.querySelectorAll('a').forEach(function(treeLi){
							treeLi.setAttribute('tabindex', 1);
						});
					} else {
						this.closest('li').classList.remove('is-active', 'is-open');
						this.closest('li').setAttribute('aria-expanded', 'false');
						tree.querySelectorAll('a').forEach(function(treeLi){
							treeLi.setAttribute('tabindex', 0);
						});
					}
				})	
			});
		}
	}
	treeAction();
});