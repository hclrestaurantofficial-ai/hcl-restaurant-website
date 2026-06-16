let balance = 83450;

let history = [];

function login(){
  let pin = document.getElementById("pin").value;

  if(pin === "1234"){
    show("dashPage");
  } else {
    alert("Wrong PIN (Demo: 1234)");
  }
}

function openPage(id){
  show(id);
}

function show(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function sendMoney(){

  let name = document.getElementById("name").value;
  let amount = parseInt(document.getElementById("amount").value);

  if(!name || !amount){
    alert("Fill fields");
    return;
  }

  if(amount > balance){
    alert("Insufficient Balance");
    return;
  }

  let progress = 0;
  document.getElementById("status").innerText = "Processing...";

  let t = setInterval(()=>{

    progress += 5;
    document.getElementById("progress").style.width = progress + "%";

    if(progress >= 100){
      clearInterval(t);

      balance -= amount;
      document.getElementById("balance").innerText = "$" + balance + " USD";

      let txn = "TXN" + Math.floor(Math.random()*999999);

      history.push(`Sent $${amount} to ${name} (${txn})`);

      document.getElementById("status").innerText =
      "Success ✔ " + txn;

      loadHistory();
    }

  },100);
}

function loadHistory(){
  let box = document.getElementById("history");
  box.innerHTML = "";

  history.forEach(h=>{
    let p = document.createElement("p");
    p.innerText = h;
    box.appendChild(p);
  });
}
