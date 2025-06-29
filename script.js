



function Gameboard(){

    rows = 3
    columns = 3
    Board = []
    

    Init_Board = ()=>{
        
        for(let i = 0;i<3;i++){
            Board[i] = [];
            for(let j=0;j<3;j++){

                Board[i][j] = ""
            }
            
        }
    }

    Add_Cell = (Value,Position)=>{

        if (Position <= 3) 
        {
            Board[0][Position-1] = Value
        }
        else{
            if(Position <=6){
                Board[1][Position-4] = Value
            }
            else
            {
                Board[2][Position-7] = Value
            }
        }
        
 
        
    }


    Display_Board = ()=>{

        for(let i = 0;i<rows;i++){
           
           console.log("\n\n Row " + i + "       " + Board[i][0] + "          " + Board[i][1] + "            " + Board[i][2] + "\n\n")
            
        }

    }
    


    return {Board,Init_Board,Add_Cell,rows,columns,Display_Board}
    }
 


function Player(name){

    Value = "" // X / O

    SetValue = (NewValue)=>{
        Value = NewValue 
    }
  

    return{name,Value,SetValue}
}


function Controller(){


Check = (Board)=>{


    //check horizontal
    for(let i = 0;i<3;i++){
           
        if((Board[i][0] == Board[i][1]) && (Board[i][1] == Board[i][2]) && Board[i][0] != ""){
            //winner
            return Board[i][0]
           
        }
            
    }

    //check Vertical

        for(let j = 0;j<3;j++){
           
            
        if((Board[0][j] == Board[1][j]) && (Board[1][j] == Board[2][j])&& Board[0][j] != ""){
             
            //winner
            return Board[0][j]
        }
            
    }

    //check cross_diagonal left > right


       
    if((Board[0][0] == Board[1][1]) && (Board[1][1] == Board[2][2] && (Board[0][0] != ""))){

    //winner
    return Board[0][0]

    }

    
    //check cross_diagonal right > left


       
    if((Board[0][2] == Board[1][1]) && (Board[1][1] == Board[2][0] && (Board[0][2] != ""))){

    //winner
    return Board[0][2]

    }


    return ""

}

Tie=0

decide = (result,P1,P2)=>{

    winner = document.querySelector(".Winner")
    h1 = document.createElement("h1")
        


    if(result=="X"){
        winner.textContent = ""
        h1.textContent  = "Winner : " + P1
            winner.style.display = "block"

    }
    else{
        if(result=="O"){
            winner.textContent = ""
                h1.textContent  = "Winner : " + P2
                    winner.style.display = "block"


        }
        else{
            winner.textContent = ""
                h1.textContent  = "Tie " 
                winner.style.display = "block"
        }
    
    }

    winner.appendChild(h1)
}




    return {Check,decide}
}

finish = false
let initialized = false;
let Value = "O";
function DOM(){
    

    let i = 0
    Tie = 0;
    Player1_name = ""
    Player2_name =""

    

    start = (Board1,C1,P1,P2)=>{
    
    Cells = document.querySelectorAll(".grid div")
    
if (initialized) return;
        initialized = true;
    Cells.forEach(Cell => {
    Cell.addEventListener("click",()=>{
        console.log(Value);
       


        if(Cell.innerText != "X" && Cell.innerText != "O" && finish == false){
           
             if(Value=="O"){
            Value ="X"
        }
        else{
            Value="O"
        }
            
            Cell.innerText = Value 


            Board1.Add_Cell(Value,Cell.id)
           //Board1.Display_Board()
            









            result = C1.Check(Board1.Board)

            if(result =="")
            {
                Tie++
                if(Tie==9){
                    finish = true;
                    C1.decide("Tie", P1, P2);
                    Tie=0;
                }
                
 // block listner (new marks)
            }
            else{
               finish = true
                decide(result,P1,P2)
            }

            i++
        }


    })

    
})
    }

 
    return {start,Board}
}

Board1 = Gameboard()
    Controller1 = Controller()
    dom = DOM()

Game = (name1,name2)=>{

    //Init Board
    
    Board1.Init_Board()
    //Board1.Display_Board()
    

    //Init Players / Start btn

 

    
   //lunch
    //DOM 
    dom.start(Board1,Controller1,name1,name2) //listener at each mark > updater board1 + display it , add C1 so we use it check function at each mark

    
    
}




    

    btn_start = document.querySelector(".start")
    restart_btn = document.querySelector(".restart")
    form_div = document.querySelector(".Names")
    Cells = document.querySelectorAll(".grid div")
    winner = document.querySelector(".Winner")

btn_start.addEventListener("click",(event)=>{
    event.preventDefault();
    grid = document.querySelector(".grid")
    grid.style.display = "grid"
    Tie = 0; 

    form = document.getElementById("myForm")
    data = new FormData(form)
    name1 = data.get("name1")
    name2 = data.get("name2")
        Value = "O";


    Game(name1,name2)

    form_div.style.display = "none"
    restart_btn.style.display = "block"

})

restart_btn.addEventListener("click",(event)=>{
event.preventDefault();

    form_div.style.display = "block"
    restart_btn.style.display = "none"
    winner.style.display = "none"
        grid.style.display = "none"

    finish = false
    Cells.forEach(Cell => {

            Cell.innerText = ""


    })

})




