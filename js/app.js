 

let countSpan = document.querySelector('.count-down');
let bulltsSpan = document.querySelector('.spans');
let bullts=document.querySelector(`.spans span`)
let quizeare = document.querySelector('.quizeare');
let answererea=document.querySelector('.answererea');
let button=document.querySelector('.submit-button');
let result=document.querySelector('.result')
let numquituin= 0;
let trueNswer=0;
let countIntrval;
let duration;
function data() {
    let myrequset = new XMLHttpRequest();
    myrequset.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let dataanswer = JSON.parse(this.response);
            // function the num answer
            let count=dataanswer.length;
            detnum(dataanswer.length);
      
            creatQuiz(dataanswer[numquituin],count);
            countDoun(10,count)
                 //check submit
        button.onclick= ()=>{
            let trueAnswer= dataanswer[numquituin].correct_option ;
            numquituin++
             checkedAnswer(trueAnswer,numquituin);


              //remoave data qiuz 
              quizeare.innerHTML="";
              answererea.innerHTML=""
              if(numquituin < dataanswer.length){
                creatQuiz(dataanswer[numquituin],count);
              } 
           
                
               // hundel span class
               hanselspan();
               showResults(count);
               clearInterval(countIntrval);
               countDoun(10,count)
     
             }
               
        }
        
   

    }
    myrequset.open("get", "../data/Data.json", true);
    myrequset.send();
}
data();

// create function the num answer
function detnum(num) {
    countSpan.innerHTML = num;

    // create span answer 
    for (let i = 0; i < num; i++) {
        let spananswer = document.createElement('span');
        bulltsSpan.appendChild(spananswer);

        // check is first span
        if (i === 0) {
            spananswer.className = "on";
        }
    }
}

// function create index quiz 
 
function creatQuiz(data ,numquituin) {

 
    let questiontitle = document.createElement('h2');
    let question = document.createTextNode(data['question']);
    // append h2 title quiz 
    questiontitle.appendChild(question);
    // append the h2 to quiz area
    quizeare.appendChild(questiontitle);

    for(let i=0; i<data.options.length; i++){
          //creat input answer
          let inputAnswer=document.createElement('input');
          let thelabel=document.createElement('label');
        //   name data type
        inputAnswer.name='answer';
        inputAnswer.type='radio';
        inputAnswer.id=`answer${i}`;
        inputAnswer.dataset.answer=data.options[i];
 
  // check input frist 
  if(   i === 0){
      inputAnswer.checked=true;
  }

      //craet lable 
      thelabel.htmlFor=`answer${i}`;
      thelabeltext=document.createTextNode(data.options[i]);
      thelabel.appendChild(thelabeltext);
      thelabel.className="thelabel";
      //add input+lable to main div
      answer=document.createElement('div');
      answer.className='answer'
      answer.appendChild(inputAnswer);
      answer.appendChild(thelabel);
      answererea.appendChild(answer);
};

 };
 
 
// checked answer troue or false
function checkedAnswer(trueAnswer, numQuestion) {
    let answers = document.querySelectorAll('input[name="answer"]');
    let indexChecked = null;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            indexChecked = answers[i].dataset.answer;
            
        }
    }
 
   if(trueAnswer ===indexChecked ){
    trueNswer++
 
   }
}

function hanselspan() {
    let bulltesSpan = document.querySelectorAll('.bullets .spans span');
    let arrayspan = Array.from(bulltesSpan);
    
    arrayspan.forEach((span, index) => {
        if (numquituin === index) {
            span.className = "on";
        } else if (numquituin > index) {
            span.className = "";
        }
    });
}

 

function  showResults(count){
    if(numquituin === count){
    let resulttext;
        button.disabled = true;
        let msg=document.createElement('h1');
        let tetxmsg=document.createTextNode="You have finished all the questions";
        msg.append(tetxmsg);
        quizeare.appendChild(msg);
        answererea.remove();
        button.remove();
        bulltsSpan.remove();
       
 
        if(trueNswer >(count / 2) && trueNswer < count ){
        
             resulttext=`<span class="good">Good  all answer</span> :${trueNswer}  \ \/ ${count}  `
   
    }else if(trueNswer  === count){
        resulttext=`<span class="prefect">prefect  all answer  </span>: ${trueNswer}  \ \/ ${count}`;
    
    }else{
        resulttext=`<span class="pad">pad ll answer </span>:  ${trueNswer} \ \/ ${count}`;

    }
    result.innerHTML=resulttext;
    result.style.padding="10px"
    result.style.padding="10px"
 }
}


 function countDoun(duration, count) {
    let minutes;
    let seconds;
     

    if (numquituin < count) {
        countIntrval = setInterval(() => {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
                 
            minutes=minutes<10?`0${minutes}`:minutes;
            seconds=minutes<10?`0${seconds}`: seconds;
            countSpan.innerHTML = `${minutes}:${seconds}`;

            if (--duration < 0) {
                clearInterval(countIntrval);
                button.click()
            }
        }, 1000);
    }
}


 
//test

















































































