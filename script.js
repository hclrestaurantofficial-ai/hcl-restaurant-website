let transferType = "";
let selectedBank = "";
let currentBalance = 83450;

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

function showStep(id){

    document.querySelectorAll(".step").forEach(step=>{
        step.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function selectTransfer(type){

    transferType = type;

    let bankSelect = document.getElementById("bankName");

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

    bankSelect.onchange = function(){

        if(this.value === "Other"){

            document.getElementById("customBank").style.display = "block";

        }else{

            document.getElementById("customBank").style.display = "none";

        }

    }

    showStep("step2");
}

function goToDetails(){

    selectedBank = document.getElementById("bankName").value;

    if(selectedBank === "Other"){

        selectedBank =
        document.getElementById("customBank").value;

    }

    showStep("step3");
}

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

    let fee = (amount / 100) * 5;

    let total = amount + fee;

    document.getElementById("reviewBox").innerHTML = `

    <b>Transfer Type:</b> ${transferType}<br>
    <b>Bank / Wallet:</b> ${selectedBank}<br><br>

    <b>Sender:</b> ${senderName}<br>
    <b>Sender Account:</b> ${senderAccount}<br><br>

    <b>Receiver:</b> ${receiverName}<br>
    <b>Receiver Account:</b> ${receiverAccount}<br><br>

    <b>Country:</b> ${country}<br>
    <b>Currency:</b> ${currency}<br>

    <b>Amount:</b> $${amount.toFixed(2)}<br>
    <b>Fee:</b> $${fee.toFixed(2)}<br>

    <b>Total Deduction:</b>
    $${total.toFixed(2)}<br><br>

    <b>Purpose:</b> ${purpose}

    `;

    showStep("step4");
}

function startTransfer(){

    showStep("step5");

    let seconds = 15;

    document.getElementById("countdown")
    .textContent = seconds;

    let timer = setInterval(()=>{

        seconds--;

        document.getElementById("countdown")
        .textContent = seconds;

        if(seconds <= 0){

            clearInterval(timer);

            completeTransfer();

        }

    },1000);
}

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

    let fee = (amount / 100) * 5;

    let total = amount + fee;

    currentBalance = currentBalance - total;

    let txid =
    "GUB" +
    Math.floor(Math.random()*999999999);

    let date =
    new Date().toLocaleString();

    document.querySelector(".balance-card h1")
    .innerHTML =
    "$" +
    currentBalance.toFixed(2) +
    " USD";

    document.getElementById("receipt").innerHTML = `

    <h3>Global Union Bank</h3>

    <hr><br>

    <b>Transaction ID:</b>
    ${txid}<br>

    <b>Date & Time:</b>
    ${date}<br><br>

    <b>Sender Name:</b>
    ${senderName}<br>

    <b>Sender Account:</b>
    ${senderAccount}<br><br>

    <b>Receiver Name:</b>
    ${receiverName}<br>

    <b>Receiver Account:</b>
    ${receiverAccount}<br><br>

    <b>Transfer Type:</b>
    ${transferType}<br>

    <b>Bank / Wallet:</b>
    ${selectedBank}<br>

    <b>Country:</b>
    ${country}<br>

    <b>Currency:</b>
    ${currency}<br><br>

    <b>Amount:</b>
    $${amount.toFixed(2)}<br>

    <b>Transfer Fee:</b>
    $${fee.toFixed(2)}<br>

    <b>Total Deducted:</b>
    $${total.toFixed(2)}<br><br>

    <b>Purpose:</b>
    ${purpose}<br><br>

    <b>Status:</b>
    Successful ✅

    `;

    showStep("step6");
}
