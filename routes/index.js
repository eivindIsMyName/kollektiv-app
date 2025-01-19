var express = require('express');
var router = express.Router();
const fs = require('fs').promises;


let jobs = ["Clean the kitchen", "Clean the living room", "Do the dishes all week", "Clean the toilets", "Clean the hall", "Clean the showers", "Take out the trash all week", "Chill week (help other chores if needed)"]


//-----------------------------------------------------------Week tracker---------------------------------------------

// Function to get the week number of a given date
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// To track the last week and check for new week
let lastCheckedWeek = getWeekNumber(new Date());

setInterval(() => {
  const now = new Date();
  const currentWeek = getWeekNumber(now);

  if (currentWeek !== lastCheckedWeek) {
      console.log("A new week has started!");
      lastCheckedWeek = currentWeek;
      updateJobs();

      // Perform your new-week logic here
  }
}, 1000 * 60 * 60); // Check every hour



//--------------------------------------------------Weekly job update function--------------------------------------

async function updateJobs() {
  try {
    // Step 1: Read the JSON file
    const jsonString = await fs.readFile('./data/rooms.JSON', 'utf8');
    const data = JSON.parse(jsonString);

    // Step 2: Update job numbers
    const updatedData = data.map(entry => {
      const newJob = (entry.job + 1) % 8; // Increment job, wrap to 0 if >= 8
      return { ...entry, job: newJob };
    });

    // Step 3: Overwrite the JSON file with updated data
    await fs.writeFile('./data/rooms.JSON', JSON.stringify(updatedData, null, 2), 'utf8');
    console.log('Jobs updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}



//------------------------------------------------GET TRIGGER---------------------------------------------------

router.get('/', function (req, res, next) {
  fs.readFile('./data/rooms.JSON', 'utf8')
    .then(jsonString => {
      const data = JSON.parse(jsonString);
      const room31job = jobs[data[0].job];
      const room33job = jobs[data[1].job];
      const room34job = jobs[data[2].job];
      const room35job = jobs[data[3].job];
      const room36job = jobs[data[4].job];
      const room37job = jobs[data[5].job];
      const room38job = jobs[data[6].job];
      const room39job = jobs[data[7].job];

      res.render('index', {
        room31: room31job,
        room33: room33job,
        room34: room34job,
        room35: room35job,
        room36: room36job,
        room37: room37job,
        room38: room38job,
        room39: room39job,
      });
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
