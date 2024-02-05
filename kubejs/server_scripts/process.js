/**
 * process.js - Generate the process randomly.
 */

// Helper functions
/** @type { Number } */
let randomNumber;

/**
 * @param { Number } seed
 * @returns { void }
 */
function setRandom(seed) {
  randomNumber = seed % 233280;
}

/**
 * @param { Number } number
 * @returns { Number }
 */
function getRandom(number) {
  randomNumber = (randomNumber * 9301 + 49297) % 233280;
  return Math.floor((randomNumber / 233280) * number);
}

/**
 * @param { Any[] } array
 * @returns { Any[] }
 */
function shuffle(array) {
  const newArray = Array.from(array);

  let i;
  for (i = newArray.length - 1; i > 0; i--) {
    let j = getRandom(i + 1);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Generate the process
ServerEvents.recipes((event) => {
  const { server } = Utils; // Get the world seed and set it
  if (!server) return;
  const seed = server.persistentData.getLong("seed");

  setRandom(Math.abs(seed));

  // Shuffle the stages
  let stages = shuffle(Array.from(stageList));

  let { length: stageCount } = stages,
    processedStageCount = 0;

  function nextStage() {
    return stages[processedStageCount++];
  }

  // Generate the process
  console.info(`Start generating, seed: ${Math.abs(seed)}`);

  let waitForAddChildStages = [stage_final],
    nextWaitForAddChildStages = [];

  while (waitForAddChildStages.length > 0) {
    console.info(`Start. waiting: ${waitForAddChildStages.length}`);

    waitForAddChildStages.forEach((stage) => {
      console.info(`Begin parent: ${stage.id}`);

      let maxChildren = Math.min(
        stageCount - processedStageCount,
        stage.defaultStartItems.length
      );
      console.info(`max child: ${maxChildren}`);

      let child = maxChildren || getRandom(maxChildren) + 1;
      console.info(`child count: ${child}`);

      let startItems = [],
        i = 0,
        childStage;
      for (i; i < child; i++) {
        childStage = nextStage();
        console.info(`child: ${childStage.id}`);

        startItems.push(childStage.endItem);
        nextWaitForAddChildStages.push(childStage);
      }
      stage.startWith(event, startItems);

      console.info(`Succeed for parent stage ${stage.id}`);
      console.info(`Next waiting: ${nextWaitForAddChildStages.length}`);
    });

    waitForAddChildStages = Array.from(nextWaitForAddChildStages);
    nextWaitForAddChildStages = [];
  }
});
