const os = require('os');
const config = require('config');

let statConfig = config.reactor.services.definitions.status.config;
var interval = statConfig.history.interval;
var seconds = statConfig.history.count;

// Add up the total machine idle and processing time
function machineCPUTotal(cpus) {
  if (!cpus) cpus = os.cpus();
  var c = {user: 0, nice: 0, sys: 0, idle: 0, irq: 0, total: 0};
  for (var cpu in cpus){
    if (!cpus.hasOwnProperty(cpu)) continue;
    c.user += cpus[cpu].times.user;
    c.nice += cpus[cpu].times.nice;
    c.sys += cpus[cpu].times.sys;
    c.irq += cpus[cpu].times.irq;
    c.idle += cpus[cpu].times.idle;
  }
  c.total = c.user + c.nice + c.sys + c.idle + c.irq;
  return { 'idle': c.idle, 'total': c.total };  
}

function getStats(previous, interval) {
  // Get the cpu usage since the last interval...
  var cpu = previous ? process.cpuUsage(previous.process.cpu) : process.cpuUsage();
  cpu.percent = (cpu.system + cpu.user) / (interval * 1000);

  // Get the total server CPU usage...
  var cpus = os.cpus();
  // Store the difference...
  var difference =  {
    process: {
      cpu,
      mem: process.memoryUsage()
    },
    system: {
      cpu: os.cpus(),
      mem: os.totalmem() - os.freemem()
    },
    
  };
  return difference;
}

function simplifyStats(stat, interval) {
  // Reduce each CPU stats...
  if (!stat) return;
  var stats1 = machineCPUTotal(lastCPU);
  var stats2 = machineCPUTotal();
  var startIdle = stats1.idle;
  var startTotal = stats1.total;
  var endIdle = stats2.idle;
  var endTotal = stats2.total;

  var idle 	= endIdle - startIdle;
  var total 	= endTotal - startTotal;
  var perc	= idle / total;
    
  var systemCPU = (1-perc) * 100;
  //console.log(systemCPU)
  lastCPU = os.cpus();

  return {
    process: {
      cpu: stat.process.cpu.percent.toFixed(2) + '%',
      mem: (stat.process.mem.rss / (1024 * 1024)).toFixed(2) + 'MB'
    },
    system: {
      cpu: systemCPU.toFixed(2) + '%',
      mem: (stat.system.mem / (1024 * 1024)).toFixed(2) + 'MB'
    }
  };
}

var stats = []; // Stores the last X seconds of stats in detail.
var statsSimple = []; // Stores the last X seconds of stats.
var lastCPU = os.cpus();
var cpuStart = { user: 0, nice: 0, sys: 0, irq: 0, idle: 0 };

setInterval(() => {
  statsSimple.unshift(simplifyStats(stats[0], interval));
  stats.unshift(getStats(stats[0], interval)); // Get the current stats by passing the last stats, and then adding it to the stats array

  if (stats.length > seconds) stats.pop();
  if (statsSimple.length > seconds) {
    statsSimple.pop();
  }
}, interval);

// This takes a while, only call it once every 5 seconds or more...
const getDisk = async function(lastDisk, seconds) {
  const disk = require('check-disk-space');
  console.log('disk:', __dirname);
  return await disk('C:').then((space) => {
    space.percentUsed = (100 - (space.free / space.size) * 100).toFixed(2) + '%';
    space.free = (space.free / 1024 / 1024).toFixed(2) + 'MB';
    space.size = (space.size / 1024 / 1024).toFixed(2) + 'MB';
    return { data: space, age: new Date() };
  });
};

module.exports = {
  disk: getDisk,
  stats: statsSimple
};