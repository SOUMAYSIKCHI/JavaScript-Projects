const searchButton = document.getElementById('search-btn');
const userButton = document.getElementById('user-input');
const statsContainer = document.querySelector(".stats-container");
const easyProgressCircle = document.querySelector(".easy-progress");
const mediumProgressCircle = document.querySelector(".medium-progress");
const hardProgressCircle = document.querySelector(".hard-progress");
const easyLabel = document.getElementById("easy-label");
const mediumLabel = document.getElementById("medium-label");  // Corrected typo
const hardLabel = document.getElementById("hard-label");
const cardStatsContainer = document.querySelector(".stats-cards");

function validateUsername(username) {
    if (username.trim() === "") {
        alert("Username should not be empty");
        return false;
    }

    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
        alert("Invalid Username");
    }
    return isMatching;
}
const Label= (solved,total,lbl,circleprogress)=>{
    const progressDegree = (solved/total)*100;
    lbl.innerText= `${solved}/${total}`;
    circleprogress.style.setProperty("--progress-degree", `${progressDegree}%`);


}
const displayUserData = (data)=>{
    Label(data.easySolved,data.totalEasy,easyLabel,easyProgressCircle);
    Label(data.mediumSolved,data.totalMedium,mediumLabel,mediumProgressCircle);
    Label(data.hardSolved,data.totalHard,hardLabel,hardProgressCircle);
    userButton.placeholder="";
}
const fetchUserDetails = async(username) => {
    try {
        const targetUrl = `https://leetcode-api-faisalshohag.vercel.app/${username}`;
        const response = await fetch(targetUrl);
        const data = await response.json();
        if(data.errors){
            alert("User Not Found");
        }else{
            statsContainer.classList.add("start");
            console.log(data);
            displayUserData(data);
        }
    } catch (error) {
        alert(error);
    }finally {
        searchButton.disabled = false;
    }
}

searchButton.addEventListener('click', () => {
    let username = userButton.value;
    if (validateUsername(username)) {
        userButton.placeholder = `Searching ${username}...`;
        searchButton.disabled = true;
        fetchUserDetails(username);
    } else {
        alert("Invalid Username !!!...Please enter a correct username");
    }
});
