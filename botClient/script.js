try{
  let element=document.getElementById("titleSection");

  const bot = document. createElement("div"); 
  bot.innerHTML=`
  <div id='adityaBotDiv'>
  <h3><img id='adityaImg' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslNGiuzYVVkt_JDBSN6PF22bgCIks-zpGishpK5Y&s'/></h3>
  <input type="text" id="adityaQuery" placeholder="type.." />
  <br />
  <button type="button" id="adityaButton">Ask</button>
  <div id='upperDiv'>
  <h4 id="adityaAnswer"></h4>
  <h4 id='confidenceh4'>My Confidence</h4>
  <div id="adityaborder">
    <div id='adityaColor'></div>
  </div>
  </div>
  </div>
  `

  element.appendChild(bot);


  const button = document.getElementById("adityaButton");

// button.addEventListener('click',async ()=>{

//     const text1=document.getElementById("feature-bullets").innerHTML;
//     const text2=document.getElementById("prodDetails").innerHTML;

//     const fulltext=text1+" "+text2;

//     const query=document.getElementById("adityaQuery").value;
//     const rawResponse = await fetch('http://127.0.0.1:8000/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"text":fulltext,"question":query})
//   });
//   const content = await rawResponse.json();
//   console.log(content);
//   const answer=document.getElementById("adityaAnswer")
//   answer.innerHTML=content.answer;
//   const confidence= document.getElementById("adityaConfidence")
//   confidence.innerHTML=content.confidence;
// })

function get(text){
  let arr=text.split("\n");
  let ans="";
  arr.forEach((e)=>{
    ans+=e.trim();
    ans+="."
  })
  return ans;
}

function getColor(confidence)
{
  if(confidence<40)
  return 'red';
  if(confidence<60)
  return 'purple';
  return 'lightgreen';
}


button.addEventListener('click',async ()=>{
  try{

  let text="";

  const table1=document.getElementById("productDetails_techSpec_section_1");
  const trs1=table1.querySelectorAll("tr")
  trs1.forEach((e)=>{
    let temptext=e.innerText.trim().split('\t');
    text+=get(temptext[0]);
    text+=" ";
    text+=get(temptext[1]);
    text+=".";
  })
  console.log(text);


  const table2=document.getElementById("productDetails_detailBullets_sections1");
  const trs2=table2.querySelectorAll("tr")
  trs2.forEach((e)=>{
    let temptext=e.innerText.trim().split('\t');
    text+=get(temptext[0]);
    text+=" ";
    text+=get(temptext[1]);
    text+=".";
  })
  console.log(text);

  
  const div=document.getElementById("feature-bullets")
  const spans=div.querySelectorAll("span");
  
  spans.forEach((e)=>{
    text+=e.innerHTML.trim();
    text+=".";
  })



  const query=document.getElementById("adityaQuery").value;

    const rawResponse = await fetch('http://127.0.0.1:8000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"text":text,"question":query})
  });

  const content = await rawResponse.json();
  
  console.log(content);
  const answer=document.getElementById("adityaAnswer")
  answer.innerHTML=content.answer;
  answer.style.color=getColor(content.confidence)
  const confidenceContainer=document.getElementById("adityaborder");
  confidenceContainer.style.display='block';
  const confidence= document.getElementById("adityaColor")
  confidence.style.height='24px'
  confidence.style.width=content.confidence+'%';
  confidence.style.background=getColor(content.confidence);

  const upperDiv=document.getElementById("upperDiv");
  upperDiv.style.display='block';
  const confidenceh4=document.getElementById("confidenceh4");
  confidenceh4.style.display='block';
}
catch(e){
  console.log(e);
  alert("Some error occured. Please try again");
}
})


}
catch(e){
  console.log(e);
  // alert("Some error occured.Please try again later");
}