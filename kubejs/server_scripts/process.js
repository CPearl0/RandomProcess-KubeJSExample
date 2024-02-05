/**
 * process.js - Generate the process randomly.
 */

// Helper functions
/**
 * @type { number }
 */
var rand_number;

/**
 * @param { number } seed
 * @returns { void }
 */
function srand(seed) {
    rand_number = seed % 233280;
}

/**
 * @param { number } num
 * @returns { number }
 */
function rand(num) {
    rand_number = (rand_number * 9301 + 49297) % 233280;
    return Math.floor(rand_number / 233280.0 * num);
}

/**
 * @param { *[] } array
 * @returns { void }
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = rand(i + 1);
        var tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
}

// Generate the process
ServerEvents.recipes((event) => {
    // Get the world seed and set it
    const { server } = Utils;
    if (!server)
        return;
    const seed = server.persistentData.getLong("seed");
    srand(Math.abs(seed));

    // Shuffle the stages
    var stages = [];
    stage_list.forEach(stage => stages.push(stage));
    shuffle(stages);

    var stage_count = stages.length, processed_stage_count = 0;
    function next_stage() {
        return stages[processed_stage_count++];
    }

    // Generate the process
    console.info("Start generating, seed: " + Math.abs(seed));
    var wait_for_add_child_stages = [stage_final];
    var next_wait_for_add_child_stages = [];
    while (wait_for_add_child_stages.length > 0) {
        console.info("Start. waiting: " + wait_for_add_child_stages.length);
        wait_for_add_child_stages.forEach((stage) => {
            console.info("Begin parent: " + stage.id);
            var max_child = Math.min(stage_count - processed_stage_count, stage.default_start_items.length);
            console.info("max child: " + max_child);
            var child = (max_child == 0) ? 0 : (1 + rand(max_child));
            console.info("child count: " + child);
            var start_items = [];
            for (let i = 0; i < child; i++) {
                var child_stage = next_stage();
                console.info("child: " + child_stage.id);
                start_items.push(child_stage.end_item);
                next_wait_for_add_child_stages.push(child_stage);
            }
            stage.start_with(event, start_items);
            console.info("Succeed for parent stage " + stage.id);
            console.info("Next waiting: " + next_wait_for_add_child_stages.length);
        });
        wait_for_add_child_stages = [];
        next_wait_for_add_child_stages.forEach(stage => wait_for_add_child_stages.push(stage));
        next_wait_for_add_child_stages = [];
    }
});