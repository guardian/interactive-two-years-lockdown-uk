console.log('===============================================================')
console.log('===============================================================')
console.log('===============================================================')
console.log('===========================v2.5==================================')
console.log('===============================================================')
console.log('===============================================================')

let slots = document.querySelectorAll('#interactive-slot-1');
let headersContent = document.querySelectorAll('h2 > strong');
let subHeadersContent = document.querySelectorAll('h2 > em');


let imgs = [
'Asset 2 1.png',
'Asset 2 1.png',
'Asset 2 1.png',
'Asset 2 1.png',
'Asset 2 1.png',
'Asset 2 1.png',
'Asset 2 1.png',
'Asset 3 2.png'
]

let content = []

slots.forEach((s,i) => {

	let header = headersContent[i].innerHTML
	let subheader = subHeadersContent[i].innerHTML

	content.push({header:header, subheader:subheader})

	s.innerHTML = 
	`<div id="section-${content[i].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}">
		<div class="section-header" id='header-${i}'> 
			<div class="section-image-wrapper"> 
				<img class="section-image" src="<%= path %>/${imgs[i]}" alt=""> 
			</div> 
			<div class="section-copy"> 
				<h3>${header}</h3> 
				<h4>${subheader}</h4> 
			</div> 
		</div>
	</div>`;

	headersContent[i].innerHTML = '';
	subHeadersContent[i].innerHTML = '';

})

let navSlots = document.querySelectorAll('#interactive-slot-2')

navSlots.forEach((n,i) => {

	if(i === 0)
	{
		n.innerHTML = `<div id='gv-buttons-menu'>
			<button value='${content[0].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[0].header}</button>
			<button value='${content[1].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[1].header}</button>
			<button value='${content[2].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[2].header}</button>
			<button value='${content[3].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[3].header}</button>
			<button value='${content[4].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[4].header}</button>
			<button value='${content[5].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[5].header}</button>
			<button value='${content[6].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[6].header}</button>
			<button value='${content[7].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[7].header}</button>
		</div>`

		let el = document.getElementById(`gv-buttons-menu`);

		let buttons = el.getElementsByTagName('button');

		for (let button of buttons) {
			button.addEventListener('click', e => {

				const y = document.getElementById(`section-${e.target.getAttribute('value')}`).getBoundingClientRect().top + window.pageYOffset - 10;

				scrollToSmoothly(y, 500);
			})
		}

		console.log('end')
	}


	if(i>0)
	{
		n.innerHTML = `
						<div class="gv-quicknav-left">
					      <span>Jump to a different section:</span> 
					      <select class="gv-jumpto" id="gv-select-${i-1}">
						      	<option value='${content[0].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[0].header}</option>
								<option value='${content[1].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[1].header}</option>
								<option value='${content[2].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[2].header}</option>
								<option value='${content[3].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[3].header}</option>
								<option value='${content[4].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[4].header}</option>
								<option value='${content[5].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[5].header}</option>
								<option value='${content[6].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[6].header}</option>
								<option value='${content[7].header.replace(/[^a-z]/g, d => d.toLowerCase().replace(' ', ''))}'>${content[7].header}</option>
					      </select> 
					    </div>`

		let el = document.getElementById(`gv-select-${i-1}`);

		el.options[i-1].selected = true;

		el.addEventListener('change', function() {

		  const y = document.getElementById(`section-${this.value}`).getBoundingClientRect().top + window.pageYOffset - 10;

		  scrollToSmoothly(y, 500);

		});
	}
})


//==============================HELPERS=========================


// from https://github.com/guardian/interactive-mental-wellbeing

const scrollToSmoothly = (pos, time = 500) => {

	/*Time is exact amount of time the scrolling will take (in milliseconds)*/
	/*Pos is the y-position to scroll to (in pixels)*/
	/*Code written by hev1*/

	if(typeof pos !== "number"){

		pos = parseFloat(pos);
	}

	if(isNaN(pos)){

		console.warn("Position must be a number or a numeric String.");
		throw "Position must be a number";
	}

	if(pos < 0 || time < 0){

		return;
	}

	let currentPos = window.scrollY || window.screenTop;

	let start = null;

	window.requestAnimationFrame(function step(currentTime){

		start = !start ? currentTime : start;

		if(currentPos<pos){

			let progress = currentTime - start;

			window.scrollTo(0, ((pos-currentPos)*progress/time)+currentPos);

			if(progress < time){

				window.requestAnimationFrame(step);

			}
			else{

				window.scrollTo(0, pos);

			}
		}
		else{

			let progress = currentTime - start;

			window.scrollTo(0, currentPos-((currentPos-pos)*progress/time));

			if(progress < time){

				window.requestAnimationFrame(step);

			}
			else{
				
				window.scrollTo(0, pos);
			}
		}
	});
}

