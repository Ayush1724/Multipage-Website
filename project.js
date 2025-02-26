let fname=""
function val() {
    let fname = document.querySelector('#fname').value
    let lname = document.querySelector('#lname').value
    let mob1 = document.querySelector('#mob1').value
    let mob2 = document.querySelector('#mob2').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#pass').value
    let address = document.querySelector('#address').value
    let abc = {
        gmail :document.querySelector("#email").value,
        passw :document.querySelector("#pass").value
    }
    localStorage.setItem("userdata",JSON.stringify(abc))

    if (fname == '') {
        alert("Please enter your First Name");
        document.querySelector('#fname').focus();
        return false;
    }
    if (lname == '') {
        alert("Please enter your Last Name");
        document.querySelector('#lname').focus();
        return false;
    }
    if (mob1 == '' || isNaN(Number(mob1)) || mob1.length !== 10) {
        alert("Please enter a valid 10-digit mobile number for Mobile Number 1");
        document.querySelector('#mob1').focus();
        return false;
    }
    if (mob2 == '' || isNaN(Number(mob2)) || mob2.length !== 10) {
        alert("Please enter a valid 10-digit mobile number for Mobile Number 2");
        document.querySelector('#mob2').focus();
        return false;
    }
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        document.querySelector('#email').focus();
        return false;
    }
    if (password == '' || !password.match(/[\W_]/)) {
        alert("Please enter a password with at least one special character");
        document.querySelector('#pass').focus();
        return false;
    }
    if (address == '') {
        alert("Please enter your address");
        document.querySelector('#address').focus();
        return false;
    }

    let paymentMethods = document.querySelectorAll('input[name="a"]');
    let selected = false;
    paymentMethods.forEach((method) => {
        if (method.checked) selected = true;
    });
    if (!selected) {
        alert("Please select a payment method");
        return false;
    }

    if (!document.querySelector('#cb').checked) {
        alert("Please accept the terms and conditions");
        return false;
    }

    return true;
}
let data=JSON.parse(localStorage.getItem("userdata"))
const up =()=>{
    let obj ={
        smail :document.querySelector("#mail").value,
        pword :document.querySelector("#pword").value,
    }
    
    if(data.gmail !=obj.smail)
    {
        alert("Please enter correct Email")
        return false
    }
    else if (data.passw!=obj.pword){
        alert("Please enter correct Password")
        return false
    }

    
}
let selectedSize = "";

// Function to highlight selected size button and set size
function selectSize(size, buttonId) {
    document.querySelectorAll(".sz button").forEach(btn => btn.classList.remove("abc"));

    let btn = document.getElementById(buttonId);
    btn.classList.add("abc");

    selectedSize = size;
}

// Fetch and display data from the server
async function fetchData() {
    try {
        // Show loading state
        document.querySelector('#data').innerHTML = "<tr><td colspan='9'>Loading...</td></tr>";

        // Fetch data from the API
        let response = await fetch("http://localhost:3000/consumer");
        if (!response.ok) throw new Error("Failed to fetch data");

        // Parse the JSON data
        let data = await response.json();

        // Generate table rows
        let tableContent = data.map((e) => `
            <tr>
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.lname}</td>
                <td>${e.pname}</td>
                <td>${e.size}</td>
                <td>${e.quantity}</td>
                <td>$${e.price}</td>
                <td>$${e.total}</td>
                <td><button onclick="deleteItem('${e.id}')">Remove</button></td>
            </tr>
        `).join("");

        // Update the table content
        document.querySelector('#data').innerHTML = tableContent;
    } catch (error) {
        console.error("Error fetching data:", error);
        // Display an error message to the user
        document.querySelector('#data').innerHTML = "<tr><td colspan='9'>Error loading data. Please try again later.</td></tr>";
    }
}

// Call the function to fetch the data
fetchData();

// Define the deleteItem function
function deleteItem(id) {
    console.log(`Deleting item with ID: ${id}`);
    // Add your logic to delete the item here
}