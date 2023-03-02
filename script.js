// const bodyPart = document.querySelector("#mainBox");
// const compList = document.querySelector(".listLeftContainer");
// const list = document.getElementById("lst");
// const shipList = list.querySelectorAll("li");
// const fullInfo = document.querySelector(".cargoContainer");
// const companyName = document.getElementById("companyName");
// const email = document.getElementById("email");
// const numOfItems = document.getElementById("numInput");
// const box = document.querySelector(".numberOfBoxes");
// const searchBar = document.querySelector(".searchBar");



import {compList, list, shipList, fullInfo, companyName, email, numOfItems, box , searchBar} from './helper.js'
const hamburger = document.querySelector('.hamburger');






let compNamesList = [];
let orderBoxes;







function fetchedData() {
  return fetch(
    "https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json"
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
       
    })
    .catch((err) => console.error(err));
}






async function init() {                                                        
  const compInfos = await fetchedData();
  
  compNamesList = compInfos.map((item)=> {
  const compNamesItem = document.createElement('li')
  compNamesItem.textContent = item.name;
  compNamesItem.addEventListener('click', () =>  {
    companyName.textContent = item.name;
    email.textContent = item.email;
    numOfItems.value = item.boxes;
      if(numOfItems.value){
        let numsArray = item.boxes.split(',');
        
        const sum = numsArray.map(parseFloat).reduce((acc, curr) => acc + curr, 0);

        orderBoxes = Math.ceil(sum/10);
        return box.innerHTML = orderBoxes;
      
      }else{
        
        return box.innerHTML = "There is no order under this company";
  }})
  
  
  return compNamesItem;
})

    
list.append(...compNamesList);



};

init();





async function searchEngine(){
  const dataInfo = await fetchedData();

  searchBar.addEventListener('input', () => {

    const searchTerm = searchBar.value.toLowerCase();
    
    dataInfo.forEach((element) =>{
      const name = element.name.toLowerCase();
      if(name.includes(searchTerm)){
        companyName.textContent = element.name;
        email.textContent = element.email;
        numOfItems.value = element.boxes;
          if(numOfItems.value){
           let numsArray = element.boxes.split(',');
          
            const sum = numsArray.map(parseFloat).reduce((acc, curr) => acc + curr, 0);
  
            orderBoxes = Math.ceil(sum/10);
            return box.innerHTML = orderBoxes;
        
         }else{
          
           return box.innerHTML = "There is no order under this company";
     }
          
       
      
    }
    

    })
    
  })

  

  
}


searchEngine();




hamburger.addEventListener('click', function(){
  this.classList.toggle('is-active');
  compList.classList.toggle("is-active")
});