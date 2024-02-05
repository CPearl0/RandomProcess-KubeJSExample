ServerEvents.loaded((event) => {
  const { server } = event;
  const seed = server.worldData.worldGenOptions().seed();

  if (server.persistentData.getLong("seed") !== seed) {
    server.persistentData.putLong("seed", seed);

    server.scheduleInTicks(10, (schedule) => {
      server.runCommandSilent("reload");
    });
  }
});
