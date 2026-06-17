const DEMO_PIN = "1234";

let transferType = "";
let selectedBank = "";
let currentBalance = 83450;

// Demo Transactions

let transactions = [
{
receiver:"Michael Johnson",
bank:"HSBC",
amount:"12500.00",
type:"Sent",
date:"05/12/2026 09:15 AM"
},
{
receiver:"Sarah Williams",
bank:"Hong Leong Bank",
amount:"8200.00",
type:"Received",
date:"05/10/2026 03:42 PM"
},
{
receiver:"David Brown",
bank:"BDO Unibank",
amount:"15750.00",
type:"Sent",
date:"05/08/2026 11:25 AM"
},
{
receiver:"Emma Davis",
bank:"GCash",
amount:"5400.00",
type:"Received",
date:"05/05/2026 08:10 PM"
},
{
receiver:"James Wilson",
bank:"Bank Mandiri",
amount:"22000.00",
type:"Sent",
date:"05/03/2026 01:35 PM"
},
{
receiver:"Olivia Taylor",
bank:"Vietcombank",
amount:"11800.00",
type:"Received",
date:"04/29/2026 10:05 AM"
},
{
receiver:"Daniel Martinez",
bank:"UnionBank",
amount:"9800.00",
type:"Sent",
date:"04/25/2026 04:55 PM"
},
{
receiver:"Sophia Anderson",
bank:"Maya",
amount:"6300.00",
type:"Received",
date:"04/22/2026 09:30 AM"
},
{
receiver:"William Thomas",
bank:"BRI",
amount:"18500.00",
type:"Sent",
date:"04/18/2026 07:45 PM"
},
{
receiver:"Charlotte Moore",
bank:"Alipay",
amount:"7200.00",
type:"Received",
date:"04/14/2026 02:20 PM"
},
{
receiver:"Benjamin White",
bank:"BPI",
amount:"14100.00",
type:"Sent",
date:"04/10/2026 11:00 AM"
},
{
receiver:"Amelia Harris",
bank:"Western Union",
amount:"8900.00",
type:"Received",
date:"04/07/2026 05:15 PM"
},
{
receiver:"Lucas Martin",
bank:"VietinBank",
amount:"26500.00",
type:"Sent",
date:"04/03/2026 12:40 PM"
},
{
receiver:"Mia Thompson",
bank:"BIDV",
amount:"9600.00",
type:"Received",
date:"03/30/2026 08:25 AM"
},
{
receiver:"Alexander Garcia",
bank:"BNI",
amount:"31000.00",
type:"Sent",
date:"03/26/2026 06:50 PM"
}
];

// Bank Lists

const localBanks = [
"HSBC",
"Hong Leong Bank",
"Other"
];

const internationalBanks = [
"Bank of the Philippine Islands (BPI)",
"BDO Unibank",
"UnionBank",
"Bank Mandiri",
"BRI",
"BNI",
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

// Login

function login(){

const pin =
document.getElementById("pin").value;

if(pin !== DEMO_PIN){

document.getElementById("loginError")
.innerHTML =
"Invalid PIN";

return;
}

document.getElementById("loginScreen")
.style.display = "none";

document.getElementById("bankApp")
.style.display = "block";

}

// Step Control

function showStep(id){

document.querySelectorAll(".step")
.forEach(step=>{
step.classList.remove("active");
});

document.getElementById(id)
.classList.add("active");

}

// History Page

function openHistoryPage(){

updateTransactionHistory();

showStep("historyPage");

}

// Transfer Type

function selectTransfer(type){

transferType = type;

const bankSelect =
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

const option =
document.createElement("option");

option.value = item;
option.textContent = item;

bankSelect.appendChild(option);

});

bankSelect.onchange = function(){

document.getElementById("customBank")
.style.display =
this.value === "Other"
? "block"
: "none";

};

showStep("step2");

}

// Continue

function goToDetails(){

selectedBank =
document.getElementById("bankName").value;

if(selectedBank === "Other"){

selectedBank =
document.getElementById("customBank").value;

}

showStep("step3");

}

// Review

function reviewTransfer(){

const amount =
parseFloat(
document.getElementById("amount").value
);

if(!amount || amount <= 0){

alert("Enter valid amount");
return;

}

const fee =
(amount / 100) * 5;

const total =
amount + fee;

if(total > currentBalance){

alert("Insufficient Balance");
return;

}

document.getElementById("reviewBox")
.innerHTML = `

<b>Transfer Type:</b> ${transferType}<br>

<b>Bank / Wallet:</b> ${selectedBank}<br><br>

<b>Amount:</b> $${amount.toFixed(2)}<br>

<b>Transfer Fee:</b> $${fee.toFixed(2)}<br>

<b>Total Deduction:</b> $${total.toFixed(2)}

`;

showStep("step4");

}

// Processing

function startTransfer(){

showStep("step5");

setTimeout(()=>{

completeTransfer();

},15000);

}

// Complete Transfer

function completeTransfer(){

const senderName =
document.getElementById("senderName").value;

const senderAccount =
document.getElementById("senderAccount").value;

const receiverName =
document.getElementById("receiverName").value;

const receiverAccount =
document.getElementById("receiverAccount").value;

const amount =
parseFloat(
document.getElementById("amount").value
);

const country =
document.getElementById("country").value;

const currency =
document.getElementById("currency").value;

const purpose =
document.getElementById("purpose").value;

const fee =
(amount / 100) * 5;

const total =
amount + fee;

currentBalance =
currentBalance - total;

document.getElementById("balance")
.innerHTML =
"$" +
currentBalance.toLocaleString() +
" USD";

const txid =
"GUB" +
Math.floor(
100000000 +
Math.random()*900000000
);

const date =
new Date().toLocaleString();

// Add New Transaction

transactions.unshift({

receiver: receiverName,
bank: selectedBank,
amount: amount.toFixed(2),
type: "Sent",
date: date

});

// Receipt

document.getElementById("receipt")
.innerHTML = `

<div style="text-align:center">

<h1>🏦</h1>

<h2>GLOBAL UNION BANK</h2>

<p>Official Transfer Receipt</p>

<hr>

</div>

<br>

<b>Transaction ID:</b>
${txid}<br>

<b>Date & Time:</b>
${date}<br><br>

<h3>Sender Details</h3>

<b>Name:</b>
${senderName}<br>

<b>Account Number:</b>
${senderAccount}<br><br>

<h3>Receiver Details</h3>

<b>Name:</b>
${receiverName}<br>

<b>Account Number:</b>
${receiverAccount}<br><br>

<h3>Transfer Information</h3>

<b>Transfer Type:</b>
${transferType}<br>

<b>Bank / Wallet:</b>
${selectedBank}<br>

<b>Country:</b>
${country}<br>

<b>Currency:</b>
${currency}<br>

<b>Amount:</b>
$${amount.toFixed(2)}<br>

<b>Transfer Fee:</b>
$${fee.toFixed(2)}<br>

<b>Total Deducted:</b>
$${total.toFixed(2)}<br><br>

<b>Purpose:</b>
${purpose}<br><br>

<hr>

<div style="text-align:center">

<h3 style="color:green;">
TRANSACTION SUCCESSFUL
</h3>

</div>

`;

showStep("step6");

}

// History List

function updateTransactionHistory(){

const container =
document.getElementById("transactionHistory");

container.innerHTML = "";

transactions.forEach((tx,index)=>{

const color =
tx.type === "Received"
? "green"
: "#dc2626";

const sign =
tx.type === "Received"
? "+"
: "-";

container.innerHTML += `

<div class="history-item"
onclick="openTransaction(${index})">

<div class="history-title">
${tx.receiver}
</div>

<div>
${tx.bank}
</div>

<div class="history-date">
${tx.date}
</div>

<div style="
font-weight:bold;
color:${color};
">

${sign}$${tx.amount}
(${tx.type})

</div>

</div>

`;

});

}

// Transaction Detail

function openTransaction(index){

const tx =
transactions[index];

document.getElementById(
"transactionDetailContent"
).innerHTML = `

<h3>${tx.receiver}</h3>

<hr><br>

<b>Bank:</b>
${tx.bank}<br>

<b>Type:</b>
${tx.type}<br>

<b>Amount:</b>
$${tx.amount}<br>

<b>Date:</b>
${tx.date}<br>

`;

showStep("transactionDetail");

  }
