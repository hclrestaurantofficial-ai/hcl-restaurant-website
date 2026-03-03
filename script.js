const supabase = window.supabase.createClient(
"https://vcaqgvcdttzzkkpziyiw.supabase.co",
"sb_publishable_s5P3XguntDCh98k-_kyElA_nDAXK_kR"
);

emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Replace with your EmailJS key

const steps=document.querySelectorAll(".form-step");
let current=0;
function showStep(i){steps.forEach((s,index)=>s.classList.toggle("active",index===i));}
document.querySelectorAll(".next").forEach(btn=>btn.onclick=()=>{if(validate()){current++;showStep(current);}});
document.querySelectorAll(".prev").forEach(btn=>btn.onclick=()=>{current--;showStep(current);});

function validate(){
const inputs=steps[current].querySelectorAll("input,select");
for(let i of inputs){
if(!i.checkValidity()) return alert("Fill all fields"),false;
if(i.type==="file" && i.files[0].size>2*1024*1024) return alert("File must ≤2MB"),false;
}
if(current===0){
let dob=new Date(document.querySelector("[name='dob']").value);
let age=new Date().getFullYear()-dob.getFullYear();
if(age<18) return alert("Must be 18+"),false;
}
return true;
}

document.getElementById("multiStepForm").onsubmit=async(e)=>{
e.preventDefault();
let f=new FormData(e.target);

// Upload files to Supabase Storage
const cvPath="cv/"+Date.now()+f.get("cv").name;
await supabase.storage.from("applications").upload(cvPath,f.get("cv"));
const photoPath="photo/"+Date.now()+f.get("photo").name;
await supabase.storage.from("applications").upload(photoPath,f.get("photo"));
const passportPath="passport/"+Date.now()+f.get("passport_file").name;
await supabase.storage.from("applications").upload(passportPath,f.get("passport_file"));
const certPath="certificate/"+Date.now()+f.get("certificate").name;
await supabase.storage.from("applications").upload(certPath,f.get("certificate"));

// Insert data into Supabase
await supabase.from("job_applications").insert([{
full_name:f.get("full_name"),
father_name:f.get("father_name"),
dob:f.get("dob"),
email:f.get("email"),
phone:f.get("phone"),
nationality:f.get("nationality"),
address:f.get("address"),
city:f.get("city"),
state:f.get("state"),
postal_code:f.get("postal_code"),
qualification:f.get("qualification"),
institute:f.get("institute"),
passing_year:f.get("passing_year"),
company_name:f.get("company_name"),
job_role:f.get("job_role"),
experience:f.get("experience"),
experience_location:f.get("experience_location"),
job_position:f.get("job_position"),
passport_number:f.get("passport_number"),
passport_issue:f.get("passport_issue"),
passport_expiry:f.get("passport_expiry"),
cv_url:cvPath,
photo_url:photoPath,
passport_url:passportPath,
certificate_url:certPath,
status:"Application Received"
}]);

// Send confirmation email
emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{to_email:f.get("email"),message:"Your application has been received. HR team will contact you."});

alert("Application Submitted Successfully");
location.reload();
};
showStep(current);
