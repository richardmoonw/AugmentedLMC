Hi, this is a Super Saiyajin version of the Little Man Computer, this document will help you to understand its functionality and to know the minimum requirements to run it. Let's begin.

Minimum requirements:
For running this program you need a browser.

Folder Contents:
AugmentedLMC
     |
     |- README.md
     |- src
         |
         |- LMC.html
         |- LMC.js
         |- goku.png
         |- css
             |
             |- bootstrap.min.css
             |- bootstrap.css
         |- js
             |- bootstrap.bundle.js
             |- bootstrap.bundle.min,js

Instructions:
The LMC model is based on the concept of a little man shut in a closed mail room (analogous to a computer in this scenario). At one end of the room, there are 100 mailboxes (memory), numbered 0 to 99, that can each contain a 3 digit instruction or data (ranging from 000 to 999). Furthermore, there are two mailboxes at the other end labeled INBOX and OUTBOX which are used for receiving and outputting data. In the center of the room, there is a work area containing a simple two function (addition and subtraction) calculator known as the Accumulator and a resettable counter known as the Program Counter. The Program Counter holds the address of the next instruction the Little Man will carry out. This Program Counter is normally incremented by 1 after each instruction is executed, allowing the Little Man to work through a program sequentially. Branch instructions allow iteration (loops) and conditional programming structures to be incorporated into a program. The latter is achieved by setting the Program Counter to a non-sequential memory address if a particular condition is met (typically the value stored in the accumulator being zero or positive).

The list of instructions includes:
---------------------------------------------------------------------------------------------
| Format    | Meaning                                                                       |
|-----------|-------------------------------------------------------------------------------|
| 1xx       | Adds the contents of mailbox xx to the calculator display                     |
|-----------|-------------------------------------------------------------------------------|
| 2xx       | Substracts the contents of mailbox xx to the calculator display               |
|-----------|-------------------------------------------------------------------------------|
| 3xx       | Stores the calculator value into mailbox xx                                   |
|-----------|-------------------------------------------------------------------------------|
| 4xx       | Stores the address portion of the calculator value (last 2 digits) into the   |
|           | address portion of the instruction in mailbox xx                              |
|-----------|-------------------------------------------------------------------------------|
| 5xx       | Loads the contents of mailbox xx into the calculator                          |
|-----------|-------------------------------------------------------------------------------|
| 6xx       | The instruction sets the instruction counter to the number xx, thus           |
|           | effectively branching to mailbox xx                                           |
|-----------|-------------------------------------------------------------------------------|
| 7xx       | IF the calculator value is zero, THEN set the instruction counter to the      |
|           | number xx, thus effectively branching to mailbox xx                           |
|-----------|-------------------------------------------------------------------------------|
| 8xx       | IF the calculator value is positive, THEN set the instruction counter to the  |
|           | number xx, thus effectively branching to mailbox xx. NOTE: ZERO is considered |
|           | POSITIVE                                                                      |
|-----------|-------------------------------------------------------------------------------|
| 901       | READ a number from the IN basket and key it into the calculator               |
|-----------|-------------------------------------------------------------------------------|
| 902       | Copy the number inthe calculator onto a slip of paper and place it into the   |
|           | OUTPUT basket                                                                 |
|-----------|-------------------------------------------------------------------------------|
| 000       | Stops the computer - the Little Man rests                                     |
|-----------|-------------------------------------------------------------------------------|
| 999       | Marks the end of the interrupt handler                                        |
|-----------|-------------------------------------------------------------------------------|













