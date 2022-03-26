const addBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const resetBtn = document.getElementById("reset-btn");
const deleteBtn = document.querySelectorAll("#delete-btn");
const recordContainer = document.querySelector(".record-container");

// *******************************************************

const name = document.getElementById("name");
const address = document.getElementById("address");
const number = document.getElementById("contact-num");

let ContactArray = [];
let id = 0;

// Object contructor for Contact

function Contact(id, name, address, number) {
  this.id = id;
  this.name = name;
  this.address = address;
  this.number = number;
}

// Display availbale record

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("contacts") === null) {
    ContactArray = [];
  } else {
    ContactArray = JSON.parse(localStorage.getItem("contacts"));
  }
  ContactArray.forEach((ele) => {
    id++;
    addToList(ele);
  });
  addContact();
});

// Deletion of Record

recordContainer.addEventListener("click", (e) => {
  if (e.target.id === "delete-btn") {
    recordContainer.removeChild(e.target.parentElement);
    ContactArray.splice(e.target.id - 1, 1);
    localStorage.setItem("contacts", JSON.stringify(ContactArray));
  }
});

// Resetting everything (id will get to 0)

resetBtn.addEventListener("click", () => {
  ContactArray = [];
  localStorage.setItem("contacts", JSON.stringify(ContactArray));
  location.reload();
});

// Adding contact record

function addContact() {
  addBtn.addEventListener("click", () => {
    if (checkInputFields([name, address, number])) {
      setMessage("success", "Record added successfully!");
      id++;
      const contact = new Contact(id, name.value, address.value, number.value);
      ContactArray.push(contact);
      localStorage.setItem("contacts", JSON.stringify(ContactArray));
      clearInputFields();
      addToList(contact);
    } else {
      setMessage("error", "Empty input fields or Invalid Input!");
    }
  });
}

// Clearing Input Fields

cancelBtn.addEventListener("click", () => {
  clearInputFields();
});

function clearInputFields() {
  name.value = "";
  address.value = "";
  number.value = "";
}

// Displaying Status Message

function setMessage(status, message) {
  let messageBox = document.querySelector(".message");

  if (status == "error") {
    messageBox.innerHTML = message;
    messageBox.className = "message error";
    removeMessage(status, messageBox);
  }
  if (status == "success") {
    messageBox.innerHTML = message;
    messageBox.className = "message success";
    removeMessage(status, messageBox);
  }
}

// Removing Alerts

function removeMessage(status, messageBox) {
  setTimeout(function () {
    messageBox.className = "message";
  }, 2000);
}

// Adding to the list (on the dom)

function addToList(item) {
  const newRecordDiv = document.createElement("div");
  newRecordDiv.classList.add("record-item");
  newRecordDiv.innerHTML = `
    <div class="record-el">
    <span id="labelling">Contact ID :</span>
    <span id="name-content">${item.id}</span>
  </div>

  <div class="record-el">
    <span id="labelling">Name :</span>
    <span id="name-content">${item.name}</span>
  </div>

  <div class="record-el">
    <span id="labelling">Address :</span>
    <span id="address-content">${item.address}</span>
  </div>

  <div class="record-el">
    <span id="labelling">Contact Number :</span>
    <span id="contact-num-content">${item.number}</span>
  </div>

  <button id="delete-btn">
    <span>
      <i class="fas fa-trash"></i>
    </span>
    Delete
  </button> `;
  recordContainer.append(newRecordDiv);
}

// Input field validation

function checkInputFields(inputArr) {
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].value === "") {
      return false;
    }
  }
  if (!phoneNumberCheck(inputArr[2].value)) {
    return false;
  }
  return true;
}

function phoneNumberCheck(inputTxt) {
  let phoneNo = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (inputTxt.match(phoneNo)) {
    return true;
  } else return false;
}
