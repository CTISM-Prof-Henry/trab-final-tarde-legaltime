sysManager = new SysManager([], [], [], [], []);
console.log("created sysManager: ", sysManager.data());

classroom1 = new Classroom("testid1", 123, "oabdbas", false);
console.log("created classroom:", classroom1.data());

classroom2 = new Classroom("testid2", 276, "oabdbas", true);
console.log("created classroom:", classroom2.data());

sysManager.addToExisting("classroom", ADMIN_ID, classroom1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom2);

console.log("classrooms: ", sysManager.data()[4][1]);

sysManager.deleteExisting("classroom", ADMIN_ID, "testid2"); // correct - should work
sysManager.deleteExisting("classroom", "someotheruser", "testid1"); // not admin - should not work
sysManager.deleteExisting("classroom", ADMIN_ID, "fakeclassroom"); // classroom id does not exist - should not work

sysManager.deleteExisting("classroom", ADMIN_ID, "testid1"); // classroom booked (not available) - should not work

console.log("after removal: ", sysManager.data()[4][1]);
