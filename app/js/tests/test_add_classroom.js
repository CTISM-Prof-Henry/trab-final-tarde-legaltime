sysManager = new SysManager([], [], [], [], []);
console.log("created sysManager: ", sysManager.data());

classroom1 = new Classroom("testid1", 123, "oabdbas", false);
console.log("created classroom:", classroom1.data());

classroom2 = new Classroom("testid2", 276, "oabdbas", true);
console.log("created classroom:", classroom2.data());

classroom3 = new Classroom("testid3", 12, "oabdbas", false);
console.log("created classroom:", classroom3.data());

classroom4 = new Classroom("testid2", 29, "oabdbas", true);
console.log("created classroom:", classroom4.data());

sysManager.addToExisting("classroom", ADMIN_ID, classroom1); // unique id - should work
sysManager.addToExisting("classroom", ADMIN_ID, classroom2); // unique id - should work
sysManager.addToExisting("classroom", "random", classroom3); // unique id but not admin - should not work
sysManager.addToExisting("classroom", ADMIN_ID, classroom4); // non unique id - should not work

console.log(sysManager.data());
