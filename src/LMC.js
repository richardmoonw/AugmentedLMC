// Restringir inputs a 3 numeros y ninguna letra.
// Bloquear interrupt trigger
var boxes = [];
var flag = 0;

function fill_data(){

    for(var i=0; i<100; i++){
        boxes[i] = document.getElementById("input" + i).value;
    }
    
}

var step_calculator = document.getElementById("input100");
var step_pc = document.getElementById("input103");
var step_output = document.getElementById("input102");
var step_interrupt = document.getElementById("interrupt");
var step_instruction = "";
var step_mailbox = "";
var step_counter = 0;
var temp_counter = 0;
var temp_calculator;
var temp_output;
var temp_mailbox;

function reset(){
    step_counter = 0;
    step_pc.value = "000"
}

function step_by_step(){
    if(step_interrupt.checked == true){
        temp_counter = step_counter;
        step_counter = 60;
        step_interrupt.disabled = true;
        step_interrupt.checked = false;
        temp_calculator = step_calculator.value;
        temp_output = step_output.value;
        temp_mailbox = step_mailbox;
    }

    // If there is the first time to run the function initialize the array.
    if(flag == 0){
        fill_data();
        flag = 1;
    }

    if(step_instruction[0] != "0"){
        step_pc.value = step_counter;
        step_instruction = document.getElementById("input" + step_counter).value;
        step_mailbox = step_instruction[1] + step_instruction[2];

        if(step_calculator.value >= 0 && step_calculator.value != ""){
            check();
        }
        else {
            uncheck();
        }
        if(step_calculator.value == 0 && step_calculator.value != ""){
            check2();
        }
        else {
            uncheck2();
        }

        switch (step_instruction[0]){
            case "1":
                step_calculator.value = parseInt(step_calculator.value) + parseInt(boxes[parseInt(step_mailbox)]);
                break;
            case "2":
                step_calculator.value = parseInt(step_calculator.value) - parseInt(boxes[parseInt(step_mailbox)]);
                break;
            case "3":
                boxes[parseInt(step_mailbox)] = step_calculator.value;
                document.getElementById("input"+step_mailbox).value = boxes[parseInt(step_mailbox)];
                break;
            case "4":
                var digits =  step_calculator.value.length;
                if(digits == 1){
                    prev_value = boxes[parseInt(step_mailbox)][0] + boxes[parseInt(step_mailbox)][1];
                    boxes[parseInt(step_mailbox)] = prev_value + step_calculator.value[0];
                    document.getElementById("input"+step_mailbox).value = boxes[parseInt(step_mailbox)];
                }
                else if(digits == 2){
                    prev_value = boxes[parseInt(step_mailbox)][0];
                    boxes[parseInt(step_mailbox)] = prev_value + step_calculator.value[0] + step_calculator.value[1];
                    document.getElementById("input"+step_mailbox).value = boxes[parseInt(step_mailbox)];
                }
                else if(digits == 3){
                    prev_value = boxes[parseInt(step_mailbox)][0];
                    boxes[parseInt(step_mailbox)] = prev_value + step_calculator.value[1] + step_calculator.value[2];
                    document.getElementById("input"+step_mailbox).value = boxes[parseInt(step_mailbox)];
                }
                break;
            case "5":
                step_calculator.value = boxes[parseInt(step_mailbox)];
                break;
            case "6":
                step_counter = parseInt(step_mailbox) - 1;
                break;
            case "7":
                if(document.getElementById("zero").checked){
                    step_counter = parseInt(step_mailbox) - 1;
                }
                break;
            case "8":
                if(document.getElementById("possitive").checked){
                    step_counter = parseInt(step_mailbox) - 1;
                }
                break;
            case "9":
                if (step_instruction[1] == "0" && step_instruction[2] == "1"){
                    var value = prompt("Enter a number:");
                    if(value == null){
                        value = 0;
                    }
                    else if(value > 0){
                        check();
                        uncheck2();
                    }
                    else if(value == 0){
                        check();
                        check2();
                    }
                    else if(value < 0){
                        uncheck();
                        uncheck2();
                    }
                    step_calculator.value = value;
                }

                else if(step_instruction[1] == "0" && step_instruction[2] == "2"){
                    step_output.value = step_calculator.value;
                }

                else if(step_instruction[1] == "9" && step_instruction[2] == "9"){
                    step_counter = temp_counter - 1 ;
                    step_calculator.value = temp_calculator;
                    step_output.value = temp_output;
                    step_interrupt.disabled = false;
                    step_mailbox = temp_mailbox;
                    if(step_calculator.value == 0){
                        check();
                        check2();
                    }
                    else if(step_calculator.value >= 0){
                        check();
                    }
                    else if(step_calculator.value < 0){
                        uncheck();
                        uncheck2();
                    }
                }
                break;
                
            default: 
                break;
        }
        step_counter++;
    }

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

        if(calculator.value >= 0 && calculator.value != ""){
            check();
        }
        else {
            uncheck();
        }
        if(calculator.value == 0 && calculator.value != ""){
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
            case "4":
                var digits =  calculator.value.length;
                if(digits == 1){
                    prev_value = boxes[parseInt(mailbox)][0] + boxes[parseInt(mailbox)][1];
                    boxes[parseInt(mailbox)] = prev_value + calculator.value[0];
                    document.getElementById("input"+mailbox).value = boxes[parseInt(mailbox)];
                }
                else if(digits == 2){
                    prev_value = boxes[parseInt(mailbox)][0];
                    boxes[parseInt(mailbox)] = prev_value + calculator.value[0] + calculator.value[1];
                    document.getElementById("input"+mailbox).value = boxes[parseInt(mailbox)];
                }
                else if(digits == 3){
                    prev_value = boxes[parseInt(mailbox)][0];
                    boxes[parseInt(mailbox)] = prev_value + calculator.value[1] + calculator.value[2];
                    document.getElementById("input"+mailbox).value = boxes[parseInt(mailbox)];
                }
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
                if (instruction[1] == "0" && instruction[2] == "1"){
                    var value = prompt("Enter a number:");
                    if(value == null){
                        value = 0;
                    }
                    calculator.value = value;
                }

                else if(instruction[1] == "0" && instruction[2] == "2"){
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