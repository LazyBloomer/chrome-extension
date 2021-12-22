let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delelteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

//fetch leads array from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// const savedLocalLeads = JSON.parse(localStorage.getItem("mySavedLeads"));

//checking if the local storage is null or has something
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  render(myLeads);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
});

delelteBtn.addEventListener("dblclick", function () {
  window.localStorage.clear();
  myLeads = [];
  render(myLeads);
  // ulEl.innerHTML = ""; // BETTER SOLUTION WILL BE TO RENDER OUT LEADS ARRAY AS  IT IS EMPTY NOW

  // console.log(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

//----------------------------converting array in to string then back to array[for storing it into local storage]----------------
// let myLeads = `["www.awesomelead.com"]`

// // 1. Turn the myLeads string into an array
// // 2. Push a new value to the array
// // 3. Turn the array into a string again
// // 4. Console.log the string using typeof to verify that it's a string
// myLeads=JSON.parse(myLeads);
// myLeads.push("www.google.com");
// myLeads=JSON.stringify(myLeads);
// console.log(typeof myLeads);

//-----------------------------method to store array into local storage----------
//localStorage.setItem("key", "value");
//eg.- localStorage.setItem("myLeads","google.com");
//localStorage.getItem("myLeads");// get item from local storage
//localStorage.clear()// clear local storage
