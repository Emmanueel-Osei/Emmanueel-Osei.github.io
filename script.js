// Short, easy-to-read 5-question quiz
(function(){
  const questions = [
    {q:' In HTML5, which element is used to embed scalable vector graphics directly into a webpage?', choices:['<img>','<canvas>','<svg>','<object>'], a:2},
    {q:'In CSS, what is the difference between relative and absolute positioning?', choices:['Relative is positioned relative to the parent element, absolute is positioned relative to the viewport','Relative is positioned relative to the viewport, absolute is positioned relative to the parent element','Both are positioned relative to the parent element','Both are positioned relative to the viewport'], a:0},
    {q:'What is the main difference between localStorage and sessionStorage in web browsers?', choices:['localStorage stores data permanently, sessionStorage stores until the tab/session ends','Both store data permanently','Both store data until the cache is cleared','localStorage stores data until browser is closed,sessionStorage stores permanently'], a:0},
    {q:"In responsive design, what does the CSS unit 'vw' represent?", choices:['Variable width','Viewport width','Vertical width','Virtual window'], a:1},
    {q:'Which JavaScript method is used to stop event bubbling in the DOM?', choices:['event.stopImmediatePropagation()','event.cancelBubble()','event.stopPropagation()','event.preventDefault()'], a:2}
  ];

  const $ = id => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', ()=>{
    const total = $('total'), current = $('current'), question = $('question'),
          choices = $('choices'), next = $('nextBtn'), result = $('result'),
          quiz = $('quiz'), scoreText = $('scoreText'), retry = $('retryBtn');

    let i=0, score=0, sel=null;
    total.textContent = questions.length;

    function render(){
      const item = questions[i];
      current.textContent = i+1;
      question.textContent = item.q;
      choices.innerHTML=''; sel=null; next.disabled=true;
      item.choices.forEach((c,idx)=>{
        const b=document.createElement('button');
        b.className='choice-btn'; b.textContent=c;
        b.onclick=()=>{ Array.from(choices.children).forEach(x=>x.classList.remove('selected')); b.classList.add('selected'); sel=idx; next.disabled=false };
        choices.appendChild(b);
      });
    }

    next.onclick = ()=>{
      if(sel===null) return;
      if(sel===questions[i].a) score++;
      if(i<questions.length-1){ i++; render() }
      else{ quiz.classList.add('hidden'); result.classList.remove('hidden'); scoreText.textContent=`You scored ${score} / ${questions.length}` }
    };

    retry.onclick = ()=>{ i=0; score=0; quiz.classList.remove('hidden'); result.classList.add('hidden'); render() };

    render();
  });
})();
