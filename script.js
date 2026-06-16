let transferType = "";
let selectedBank = "";
let currentBalance = 83450;

// BANK LISTS
const localBanks = [
"HSBC",
"Hong Leong Bank",
"Other"
];

const internationalBanks = [
"Bank of the Philippine Islands (BPI)",
"BDO Unibank, Inc",
"Union Bank of the Philippines (UnionBank)",
"Bank Mandiri",
"Bank Rakyat Indonesia (BRI)",
"Bank Negara Indonesia (BNI)",
"Vietcombank",
"VietinBank",
"BIDV",
"Other"
];

const wallets = [
"GCash",
"GoPay",
"Alipay",
"Maya",
"Western Union",
"Other"
];

// STEP CONTROL
function showStep(id){

document.querySelectorAll(".step")
.forEach(step=>{
step.classList.remove("active");
});

document.getElementById(id)
.classList.add("active");

}

// SELECT TRANSFER TYPE
function selectTransfer(type){

transferType = type;

let bankSelect =
document.getElementById("bankName");

bankSelect.innerHTML = "";

let list = [];

if(type === "Local Bank"){
list = localBanks;
}

if(type === "International Bank"){
list = internationalBanks;
}

if(type === "Other Wallet"){
list = wallets;
}

list.forEach(item=>{

let option = document.createElement("option");
option.value = item;
option.textContent = item;

bankSelect.appendChild(option);

});

// CUSTOM INPUT SHOW/HIDE
bankSelect.onchange = function(){

if(this.value === "Other"){
document.getElementById("customBank")
.style.display = "block";
}else{
document.getElementById("customBank")
.style.display = "none";
}

};

showStep("step2");

}

// STEP 2
function goToDetails(){

selectedBank =
document.getElementById("bankName").value;

if(selectedBank === "Other"){
selectedBank =
document.getElementById("customBank").value;
}

showStep("step3");

}

// STEP 3 REVIEW
function reviewTransfer(){

let senderName =
document.getElementById("senderName").value;

let senderAccount =
document.getElementById("senderAccount").value;

let receiverName =
document.getElementById("receiverName").value;

let receiverAccount =
document.getElementById("receiverAccount").value;

let amount =
parseFloat(document.getElementById("amount").value);

let country =
document.getElementById("country").value;

let currency =
document.getElementById("currency").value;

let purpose =
document.getElementById("purpose").value;

if(!amount || amount <= 0){
alert("Enter valid amount");
return;
}

// FEE CALCULATION
let fee = (amount / 100) * 5;
let total = amount + fee;

// BALANCE CHECK
if(total > currentBalance){
alert("Insufficient Balance");
return;
}

// REVIEW UI
document.getElementById("reviewBox").innerHTML = `

<h3>Transfer Review</h3>
<hr><br>

<b>Transfer Type:</b> ${transferType}<br>
<b>Bank / Wallet:</b> ${selectedBank}<br><br>

<b>Sender Name:</b> ${senderName}<br>
<b>Sender Account:</b> ${senderAccount}<br><br>

<b>Receiver Name:</b> ${receiverName}<br>
<b>Receiver Account:</b> ${receiverAccount}<br><br>

<b>Country:</b> ${country}<br>
<b>Currency:</b> ${currency}<br><br>

<b>Amount:</b> $${amount.toFixed(2)}<br>
<b>Fee:</b> $${fee.toFixed(2)}<br>
<b>Total Deduction:</b> $${total.toFixed(2)}<br><br>

<b>Purpose:</b> ${purpose}

`;

showStep("step4");

}

// STEP 4 PROCESSING
function startTransfer(){

showStep("step5");

// 15 SECOND PROCESSING
setTimeout(()=>{

completeTransfer();

},15000);

}

// FINAL SUCCESS
function completeTransfer(){

let senderName =
document.getElementById("senderName").value;

let senderAccount =
document.getElementById("senderAccount").value;

let receiverName =
document.getElementById("receiverName").value;

let receiverAccount =
document.getElementById("receiverAccount").value;

let amount =
parseFloat(document.getElementById("amount").value);

let country =
document.getElementById("country").value;

let currency =
document.getElementById("currency").value;

let purpose =
document.getElementById("purpose").value;

// FEE
let fee = (amount / 100) * 5;
let total = amount + fee;

// BALANCE UPDATE
currentBalance = currentBalance - total;

document.getElementById("balance").innerHTML =
"$" + currentBalance.toLocaleString() + " USD";

// TRANSACTION ID
let txid =
"GUB" + Math.floor(100000000 + Math.random() * 900000000);

// DATE TIME
let date = new Date().toLocaleString();

// RECEIPT
document.getElementById("receipt").innerHTML = `

<div style="text-align:center">

<h1>🏦</h1>
<h2>GLOBAL UNION BANK</h2>
<p>Official Transaction Receipt</p>

<hr>

</div>

<br>

<b>Transaction ID:</b> ${txid}<br>
<b>Date & Time:</b> ${date}<br><br>

<b>Sender:</b> ${senderName}<br>
<b>Sender Account:</b> ${senderAccount}<br><br>

<b>Receiver:</b> ${receiverName}<br>
<b>Receiver Account:</b> ${receiverAccount}<br><br>

<b>Transfer Type:</b> ${transferType}<br>
<b>Bank / Wallet:</b> ${selectedBank}<br><br>

<b>Country:</b> ${country}<br>
<b>Currency:</b> ${currency}<br><br>

<b>Amount:</b> $${amount.toFixed(2)}<br>
<b>Fee:</b> $${fee.toFixed(2)}<br>
<b>Total Deducted:</b> $${total.toFixed(2)}<br><br>

<b>Purpose:</b> ${purpose}<br><br>

<hr>

<div style="text-align:center">

<h3 style="color:green;">
TRANSACTION SUCCESSFUL
</h3>

<p style="font-size:12px;color:gray;">
This is a system generated receipt from Global Union Bank.
</p>

</div>

`;

showStep("step6");

}
