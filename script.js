var buttons = document.querySelectorAll("button.box");
var but = [...buttons];

var turn = 0;
var grid = [["","",""],
            ["","",""],
            ["","",""]];

var player = ['X','O'];

var fill = function(){
    let index=1;
    for(let row of grid)
    {console.log(row)
        for(let i of row)
        {
            buttons[index-1].innerHTML=i;
            index++;
        }
    }
};

var next = function(current){
    let currentPlayer = turn%2 == 0 ? 0 : 1 ;
    
    let pos = current.getAttribute("id") - 0;
    grid[Math.floor((pos-1)/3)][(pos-1) % 3] = current.innerText = player[currentPlayer];
    if(x=checkWinner())
    {
        document.querySelector("h2").innerHTML = x=="Tie" ? "Game is a Tie" : `${x} is the winner!!!`;
        for(let b of buttons) b.setAttribute("onclick","err(1)");
        document.querySelector("button.reset").style.display = "block";
        return ;
    }
    current.setAttribute("onclick","err()");
    turn++;
    if(!currentPlayer)
    aiTurn();
    // randomClick();
};

var scores = {
    X : -10,
    O : 10,
    Tie : 0
}

var aiTurn = function(){
    let bestScore = -Infinity;
    let bestMove = {};

    for(let i=0; i<3; i++){
        for(let j=0;j<3;j++){
            if(grid[i][j]==""){
                grid[i][j] = "O";
                let score = minimax(grid, false);
                console.log(score);
                grid[i][j] = "";
                if(score>bestScore){
                    bestScore = score;
                    bestMove = {i,j};
                }
            }
        }
    }
    console.log(bestMove);
    buttons[bestMove.i*3 + bestMove.j].click();
};

var minimax = function(new_grid, isPlayer_O){
    if(x = checkWinner()) {return scores[x];}

    if(isPlayer_O){
        let bestScore = -Infinity;
        for (let i = 0 ; i < 3 ; i++){
            for(let j = 0 ; j < 3 ; j++){
                if(grid[i][j] ==""){
                    grid[i][j] = "O";
                    let score = minimax(grid, false);
                    grid[i][j] = "";
                    bestScore = Math.max(score, bestScore);
                }
                }
         }
        return bestScore;
    }
    else{
        let bestScore = Infinity;
        for (let i = 0 ; i < 3 ; i++){
            for(let j = 0 ; j < 3 ; j++){
                if(grid[i][j] ==""){
                    grid[i][j] = "X";
                    let score = minimax(grid, true);
                    grid[i][j] = "";
                    bestScore = Math.min(score, bestScore);
                }
                }
         }
         return bestScore;
    }
};

var err = function(num=0){
    if(!num)
    alert(`Hey, You can't press it again`);
    else{
    alert("Game is finished, Reset to play again!!!");
    }
};

var checkWinner=function (){
    // console.log(grid[0],"\n",grid[1],"\n",grid[2],"\n");
    for(let i=0;i<3;i++)
    {
        if(equal3(grid[i][0],grid[i][1],grid[i][2])) return grid[i][0];
        if(equal3(grid[0][i],grid[1][i],grid[2][i])) return grid[0][i];
    }

    if(equal3(grid[0][0],grid[1][1],grid[2][2])) return grid[1][1];
    if(equal3(grid[0][2],grid[1][1],grid[2][0])) return grid[1][1];

    // if(!but.some((b)=>(b.innerHTML == ""))) return "Tie";
    if(!grid.some((b)=>(b.some((a)=>(a==""))))) return "Tie";
    return "";
};

var equal3 = function(a,b,c){
    return (a==b) && (b==c) && (c==a) && a!='';
}

var randomClick = function(){

    let num = Math.floor(Math.random()*9);

    while(buttons[num].innerHTML !== "")
    {
        num = Math.floor(Math.random()*9);
    }

    buttons[num].click();
}

var rematch = function(){
    grid = [["","",""],
            ["","",""],
            ["","",""]];

    for(let b of buttons) {
        b.setAttribute("onclick","next(this)");
        b.innerText = "";
    }
    document.querySelector("h2").innerHTML = "";
    document.querySelector("button.reset").style.display = "none";
    turn = 0;
};
