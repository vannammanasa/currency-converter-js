
//url for conversion of currency
const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdownSelects = document.querySelectorAll(".dropdown select");

const btnEl = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for(let select of dropdownSelects){
  for (currCode in countryList){
      //console.log(code,countryList[currCode]);

    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    //To select country codes  whenever we select options

    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";

    }
    else if(select.name === 'to' && currCode === 'INR'){
        newOption.selected = "selected";
  
      
    }



    select.append(newOption);
  }

    select.addEventListener("change",(evt) =>{
      updateFlag(evt.target);
    })

}



    //To update flags a.to selected options





// to convert the currency


const updateExchangeRate = async ()=>{

  let amount = document.querySelector(".amount input");

  let amtVal = amount.value;

  if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value="1";
  }


  

//console.log(fromCurr.value,toCurr.value);

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

let response = await fetch(URL);

let data = await response.json();

let rate = data[toCurr.value.toLowerCase()];

//console.log(rate);

let finalAmount = amtVal * rate;

msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};



const updateFlag = (element) =>{
  //console.log(element);
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;

  

};




btnEl.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updateExchangeRate();

})

window.addEventListener("load",()=>{
  updateExchangeRate();
});
  

