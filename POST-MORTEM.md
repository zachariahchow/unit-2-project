## Project Post Mortem

#### Approach and Process

1. What in my process and approach to this project would I do differently next time?

Would like to try using different CSS methodologies --> OOCSS / Atomic (which will require me to spend some time thinking about and planning my styles before execution, rather than doing a piecemeal on-the-go trial-and-error approach, which I find very time-consuming). 

Plan out internal API endpoints while designing my backend.

1. What in my process and approach to this project went well that I would repeat next time?

Wireframing my routes more comprehensively. Gives me a good idea of what is needed in the DOM and what needs to be interactive or dynamic (so I know for sure, this is a change to the UI and relies on an AJAX call engaged from the DOM, so a separate view is unnecessary etc.)

Re: MVC, I had previously built my MVC apps around my controllers, so I would write both my query logic / data manipulation within the controllers itself before refactoring out the model methods etc. This time, I planned what methods my models should have and put everything where it should belonged from the start. This saved some time and also helped clarify my thought process.
--

#### Code and Code Design

1. What in my code and program design in the project would I do differently next time?

- DOM functions not DRY, which is a huge problem in maintainability because every change to my views (classNames, new elements etc) requires correponding changes. Lots of Search and Replace which is a bad sign. I kept telling my self I would refactor my code later, but perhaps doing it earlier would save alot of unnecessary hassle. 

- My first instinct to adding event listeners is to write individual handlers for a specific type of element, but in actual fact, I realised that some of them could easily be grouped together, and using a general event handler with bound arguments could save alot of repetitive code. 

1. What in my code and program design in the project went well? Is there anything I would do the same next time?

- Using the data attribute in HTML els has been a good way to avoid polluting the request object (which I had previously done (eg. storing and accessing req.somethingIWantToStoreForAParticularRequest).

#### WDI Unit 2 Post Mortem
1. What habits did I use during this unit that helped me?

- I spent alot more time thinking and planning what I'm trying to build before diving straight into the code. I find this has helped me stay focused because it is clear what exactly (or at least approximately) I need to achieve. 

2. What habits did I have during this unit that I can improve on?

- Naming conventions for classes got lazy after awhile. Led to some repetitive and conflicting style declarations in the end.

- Just pigheadedly repeating code when I know it can and should be refactored.

- Sometimes its hard to resist the temptation to just plug and play a package without understanding how it really works.   

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)

- Found the course materials generally helpful. Liked that there is supplementary material on the GitBook (eg. Websockets, MongoDB) that we can explore even after the unit is over. 

- Instructions have been helpful and clear as always. 
