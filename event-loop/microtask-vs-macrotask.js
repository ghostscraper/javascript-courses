/**
 * Microtasks come solely from our code. 
 * They are usually created by promises: an execution of .then/catch/finally handler becomes a microtask. 
 * Microtasks are used “under the cover” of await as well, as it’s another form of promise handling.
 */

setImmediate(() => console.log("[Macro-task] Immediate done !")); // put into the macro-tasks queue
setTimeout(() => console.log("[Macro-task] Timeout done!")); // put into the macro-tasks queue

Promise.resolve()
  .then(() => console.log("[Micro-task] Promise done!"));  // put into the micro-tasks queue

let i = 0;
count();
console.log("I'm supposed to be done! Am I ?"); // regular synchronous call

function count() {

    // do a piece of the heavy job (*)
    do {
      i++;
      console.log(i);
    } while (i % 1e3 != 0);

    if (i < 1e6) {
      queueMicrotask(count);
    }
}