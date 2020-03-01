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

  // do a heavy job
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  console.log("Done in " + (Date.now() - start) + 'ms');
}

performance.mark('BEFORE_COUNT');
count();

performance.mark('AFTER_COUNT');
performance.measure(
    'Elapsed time between BEFORE_COUNT and AFTER_COUNT: ', 
    'BEFORE_COUNT', 
    'AFTER_COUNT'
);

console.log("I can do other stuff now !");