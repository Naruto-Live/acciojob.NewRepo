let scores = {
    Red:0,
    Blue:0,
    Green:0,
    Yellow:0
};

function updateBoard(){

    const board = document.getElementById("scoreBoard");

    board.innerHTML="";

    for(let color in scores){

        board.innerHTML += `
        <tr>
            <td>${color}</td>
            <td>${scores[color]}</td>
        </tr>
        `;
    }

}

function OpeningCeremony(callback){

    console.log("Opening Ceremony Started");

    document.getElementById("event").innerHTML="Opening Ceremony";

    updateBoard();

    setTimeout(()=>{

        callback(LongJump);

    },1000);

}

function Race100M(callback){

    document.getElementById("event").innerHTML="100 Meter Race";

    console.log("Previous Scores");

    console.log(scores);

    let race=[];

    for(let color in scores){

        race.push({
            color:color,
            time:Math.random()*6+10
        });

    }

    race.sort((a,b)=>a.time-b.time);

    scores[race[0].color]+=50;

    scores[race[1].color]+=25;

    console.log(race);

    console.log(scores);

    updateBoard();

    setTimeout(()=>{

        callback(HighJump);

    },3000);

}

function LongJump(callback){

    document.getElementById("event").innerHTML="Long Jump";

    console.log("Previous Scores");

    console.log(scores);

    let colors=Object.keys(scores);

    let winner=colors[Math.floor(Math.random()*colors.length)];

    scores[winner]+=150;

    console.log(winner+" wins Long Jump");

    updateBoard();

    console.log(scores);

    setTimeout(()=>{

        callback(AwardCeremony);

    },2000);

}

function HighJump(callback){

    document.getElementById("event").innerHTML="High Jump";

    console.log("Previous Scores");

    console.log(scores);

    let winner=prompt("Which color secured the highest jump?");

    if(scores.hasOwnProperty(winner)){

        scores[winner]+=100;

    }
    else{

        alert("Invalid Color");

    }

    updateBoard();

    console.log(scores);

    setTimeout(()=>{

        callback();

    },1000);

}

function AwardCeremony(){

    document.getElementById("event").innerHTML="Award Ceremony";

    let result=[];

    for(let color in scores){

        result.push({
            color:color,
            score:scores[color]
        });

    }

    result.sort((a,b)=>b.score-a.score);

    console.log("🏆 Final Result");

    console.log(result);

    alert(
        `🥇 ${result[0].color}
🥈 ${result[1].color}
🥉 ${result[2].color}`
    );

}


document.getElementById("startBtn").addEventListener("click",()=>{

    OpeningCeremony(Race100M);

});