let iterations = 0;
let interval = setInterval(limitInterval, 10);

function limitInterval() {
  iterations++;
  draw();
  if(iterations > 2000) clearInterval(interval);
}

let focused = false;
// Using this as a way to set focus only once. Might not be a great idea.
if(!focused) focused = true;
// Have not figured out how to have the canvas have or maintain focus.
// It might have focus and just need to have a blur eventListener set on about a 20 ms
// e.g. : setTimeout(function () { c.focus(); }, 20); inside a blur eventListener
// c.tabIndex = 1;
// c.click();
// c.focus();

// Exercise: Make the ball move faster when it hits the paddle.
// Exercise: Try changing the number of bricks in a row or a column, or their positions.
// Exercise: Make size of game responsive.
// Exercise: Make ball change color when it collides with brick.
// Exercise: Add more points per brick hit, print out the number of collected points in the end game alert box.