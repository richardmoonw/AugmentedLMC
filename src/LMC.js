// Restringir inputs a 3 numeros y ninguna letra.
// STA 
var boxes = [];
var flag = 0;

function fill_data(){

    for(var i=0; i<100; i++){
        boxes[i] = document.getElementById("input" + i).value;
    }
    
}

var step_counter = 0;

function step_by_step(){
    if(flag == 0){
        fill_data();
        flag = 1;
    }
    
    let calculator = document.getElementById("input100");
    let pc = document.getElementById("input103");
    let output = document.getElementById("input102");
    let instruction = "";
    let mailbox = "";


    while(instruction[0] != "0"){
        pc.value = step_counter;
        instruction = document.getElementById("input" + step_counter).value;
        mailbox = instruction[1] + instruction[2];

        if(calculator.value >= 0){
            check();
        }
        else {
            uncheck();
        }
        if(calculator.value == 0){
            check2();
        }
        else {
            uncheck2();
        }
        switch (instruction[0]){
            case "1":
                calculator.value = parseInt(calculator.value) + parseInt(boxes[parseInt(mailbox)]);
                break;
            case "2":
                calculator.value = parseInt(calculator.value) - parseInt(boxes[parseInt(mailbox)]);
                break;
            case "3":
                boxes[parseInt(mailbox)] = calculator.value;
                document.getElementById("input"+mailbox).value = boxes[parseInt(mailbox)];
                break;
            case "5":
                calculator.value = boxes[parseInt(mailbox)];
                break;
            case "6":
                program_counter = parseInt(mailbox) - 1;
                break;
            case "7":
                if(document.getElementById("zero").checked){
                    program_counter = parseInt(mailbox) - 1;
                }
                break;
            case "8":
                if(document.getElementById("possitive").checked){
                    program_counter = parseInt(mailbox) - 1;
                }
                break;
            case "9":
                if (instruction[2] == "1"){
                    var value = prompt("Enter a number:");
                    if(value == null){
                        value = 0;
                    }
                    calculator.value = value;
                }

                else if(instruction[2] == "2"){
                    output.value = calculator.value;
                }
                break;
                
            default: 
                break;
        }
    }
    step_counter++;
}


function execute(){
    fill_data();
    let calculator = document.getElementById("input100");
    let pc = document.getElementById("input103");
    let output = document.getElementById("input102");
    let program_counter = 0;
    let instruction = "";
    let mailbox = "";


    while(instruction[0] != "0"){
        pc.value = program_counter;
        instruction = document.getElementById("input" + program_counter).value;
        mailbox = instruction[1] + instruction[2];

        if(calculator.value >= 0){
            check();
        }
        else {
            uncheck();
        }
        if(calculator.value == 0){
            check2();
        }
        else {
            uncheck2();
        }
        switch (instruction[0]){
            case "1":
                calculator.value = parseInt(calculator.value) + parseInt(boxes[parseInt(mailbox)]);
                break;
            case "2":
                calculator.value = parseInt(calculator.value) - parseInt(boxes[parseInt(mailbox)]);
                break;
            case "3":
                boxes[parseInt(mailbox)] = calculator.value;
                document.getElementById("input"+mailbox).value = boxes[parseInt(mailbox)];
                break;
            case "5":
                calculator.value = boxes[parseInt(mailbox)];
                break;
            case "6":
                program_counter = parseInt(mailbox) - 1;
                break;
            case "7":
                if(document.getElementById("zero").checked){
                    program_counter = parseInt(mailbox) - 1;
                }
                break;
            case "8":
                if(document.getElementById("possitive").checked){
                    program_counter = parseInt(mailbox) - 1;
                }
                break;
            case "9":
                if (instruction[2] == "1"){
                    var value = prompt("Enter a number:");
                    if(value == null){
                        value = 0;
                    }
                    calculator.value = value;
                }

                else if(instruction[2] == "2"){
                    output.value = calculator.value;
                }
                break;
                
            default: 
                break;
        }
        program_counter++;

    }
}

function check() {
    document.getElementById("possitive").checked = true;
}

function uncheck(){
    document.getElementById("possitive").checked = false;
}

function check2(){
    document.getElementById("zero").checked = true;
}

function uncheck2(){
    document.getElementById("zero").checked = false;
}