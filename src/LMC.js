var boxes = [];                                             // Values of the mailboxes
var flag = 0;                                               // Flag that indicates if it is the first time that the user clicks step by step

// Transfer the values of the inputs (HTML) to an array (JavaScript)
function fill_data(){
    for(var i=0; i<100; i++){
        boxes[i] = document.getElementById("input" + i).value;
    }
}

//Global variables used for the step by step process
var step_calculator = document.getElementById("input100");  // Input for the step by step calculator
var step_pc = document.getElementById("input103");          // Input for the step by step program counter
var step_output = document.getElementById("input102");      // Input for the step by step output 
var step_interrupt = document.getElementById("interrupt");  // Input for the interrupt handler
var step_instruction = "";                                  // Variable for the instruction fetched
var step_mailbox = "";                                      // Variable for the address portion of the mailbox
var step_counter = 0;                                       // Variable for the step by step program counter
var temp_counter = 0;                                       // Variable to store the step by step program counter before an interrupt
var temp_calculator;                                        // Variable to store the step by step calculator value before an interrupt
var temp_output;                                            // Variable to store the step by step output value before an interrupt
var temp_mailbox;                                           // Variable to store the step by step mailbox value before an interrupt
var step_console = document.getElementById("console");      // Console variable
var lmc_console="";

// Reset the step by step program counter to 0 and turn off the flag to let execute again the step by step function for first time
function reset(){
    step_counter = 0;
    step_pc.value = "000";
    step_instruction = "111";
    step_interrupt.disabled = false;
    flag = 0;
    lmc_console = "";
    step_console.value = lmc_console;
}

// This is in charge of executing the program step by step
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
                lmc_console = "ADD " + step_mailbox + "\n" + lmc_console;
                step_console.value = lmc_console;
                break;
            case "2":
                step_calculator.value = parseInt(step_calculator.value) - parseInt(boxes[parseInt(step_mailbox)]);
                lmc_console = "SUB " + step_mailbox + "\n" + lmc_console;
                step_console.value = lmc_console;
                break;
            case "3":
                boxes[parseInt(step_mailbox)] = step_calculator.value;
                document.getElementById("input"+step_mailbox).value = boxes[parseInt(step_mailbox)];
                lmc_console = "STO " + step_mailbox + "\n" + lmc_console;
                step_console.value = lmc_console;
                break;
            case "4":
                var digits =  step_calculator.value.length;
                lmc_console = "STA " + step_mailbox + "\n" + lmc_console;
                step_console.value = lmc_console;
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
                lmc_console = "LOAD " + step_mailbox + "\n" + lmc_console;
                step_console.value = lmc_console;
                break;
            case "6":
                step_counter = parseInt(step_mailbox) - 1;
                lmc_console = "B " + step_mailbox + "\n" + lmc_console;
                step_console.value = lmc_console;
                break;
            case "7":
                if(document.getElementById("zero").checked){
                    step_counter = parseInt(step_mailbox) - 1;
                }
                lmc_console = "BZ " + step_mailbox + "\n" + lmc_console;
                step_console.value = lmc_console;
                break;
            case "8":
                if(document.getElementById("possitive").checked){
                    step_counter = parseInt(step_mailbox) - 1;
                }
                lmc_console = "BP " + step_mailbox + "\n" + lmc_console;
                step_console.value = lmc_console;
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
                    lmc_console = "INPUT\n" + lmc_console;
                    step_console.value = lmc_console;
                    step_calculator.value = value;
                }

                else if(step_instruction[1] == "0" && step_instruction[2] == "2"){
                    lmc_console = "OUTPUT\n" + lmc_console;
                    step_console.value = lmc_console;
                    step_output.value = step_calculator.value;
                }

                else if(step_instruction[1] == "9" && step_instruction[2] == "9"){
                    lmc_console = "RET\n" + lmc_console;
                    step_console.value = lmc_console;
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

    if(step_instruction[0] == "0"){
        lmc_console = "HALT\n" + lmc_console;
        step_console.value = lmc_console;
    }

}

// This is in charge of executing the full program
function execute(){
    fill_data();
    let ex_console = document.getElementById("console");
    let calculator = document.getElementById("input100");
    let pc = document.getElementById("input103");
    let output = document.getElementById("input102");
    let program_counter = 0;
    let instruction = "";
    let mailbox = "";
    let elmx_console="";


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
                elmx_console = "ADD " + mailbox + "\n" + elmx_console;
                ex_console.value = elmx_console;
                break;
            case "2":
                calculator.value = parseInt(calculator.value) - parseInt(boxes[parseInt(mailbox)]);
                elmx_console = "SUB " + mailbox + "\n" + elmx_console;
                ex_console.value = elmx_console;
                break;
            case "3":
                boxes[parseInt(mailbox)] = calculator.value;
                document.getElementById("input"+mailbox).value = boxes[parseInt(mailbox)];
                elmx_console = "STO " + mailbox + "\n" + elmx_console;
                ex_console.value = elmx_console;
                break;
            case "4":
                elmx_console = "STA " + mailbox + "\n" + elmx_console;
                ex_console.value = elmx_console;
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
                elmx_console = "LOAD " + mailbox + "\n" + elmx_console;
                ex_console.value = elmx_console;
                break;
            case "6":
                program_counter = parseInt(mailbox) - 1;
                elmx_console = "B " + mailbox + "\n" + elmx_console;
                ex_console.value = elmx_console;
                break;
            case "7":
                if(document.getElementById("zero").checked){
                    program_counter = parseInt(mailbox) - 1;
                }
                elmx_console = "BZ " + mailbox + "\n" + elmx_console;
                ex_console.value = elmx_console;
                break;
            case "8":
                if(document.getElementById("possitive").checked){
                    program_counter = parseInt(mailbox) - 1;
                }
                elmx_console = "BP " + mailbox + "\n" + elmx_console;
                ex_console.value = elmx_console;
                break;
            case "9":
                if (instruction[1] == "0" && instruction[2] == "1"){
                    var value = prompt("Enter a number:");
                    if(value == null){
                        value = 0;
                    }
                    calculator.value = value;
                    elmx_console = "INPUT\n" + elmx_console;
                    ex_console.value = elmx_console;
                }

                else if(instruction[1] == "0" && instruction[2] == "2"){
                    elmx_console = "OUTPUT\n" + elmx_console;
                    ex_console.value = elmx_console;
                    output.value = calculator.value;
                }
                break;
                
            default: 
                break;
        }
        program_counter++;
    }

    if(instruction[0] == "0"){
        elmx_console = "HALT\n" + elmx_console;
        ex_console.value = elmx_console;
    }
}

// Check the possitive flag
function check() {
    document.getElementById("possitive").checked = true;
}

// Uncheck the possitive flag
function uncheck(){
    document.getElementById("possitive").checked = false;
}

// Check the zero flag
function check2(){
    document.getElementById("zero").checked = true;
}

// Uncheck the zero flag
function uncheck2(){
    document.getElementById("zero").checked = false;
}