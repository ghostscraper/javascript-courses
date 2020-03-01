const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {

  items.getEntries().forEach(entry => {
      console.log(
        entry.name,
        `${Math.round(entry.duration)/1000}s`
      );
  });
  //performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });


let i = 0;
let start = Date.now();

function count() {

  // do a piece of the heavy job (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    console.log("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count); // schedule the new call (**)
  }
}

function count_2() {

  // move the scheduling to the beginning
  if (i < 1e9 - 1e6) {
    setTimeout(count_2); // schedule the new call
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    console.log("Done in " + (Date.now() - start) + 'ms');
  }

}

function count_3() {

  setTimeout(() => {

    // do a heavy job
    for (let j = 0; j < 1e9; j++) {
      i++;
    }

    console.log("Done in " + (Date.now() - start) + 'ms');
  });
}

performance.mark('BEFORE_COUNT');
count_3();
//count_2();
//count();

performance.mark('AFTER_COUNT');
performance.measure(
    'Elapsed time between BEFORE_COUNT and AFTER_COUNT: ', 
    'BEFORE_COUNT', 
    'AFTER_COUNT'
);

console.log("I can do other stuff now !");