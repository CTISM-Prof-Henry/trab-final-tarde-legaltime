sysManager = new SysManager([], [[1, 2], [4, 5]], [], [], []);
console.log("created sysManager: ", sysManager.data()); // test timespans

classroom1 = new Classroom("classroomtestid1", 123, "oabdbas", false);
console.log("created classroom:", classroom1.data());

classroom2 = new Classroom("classroomtestid2", 276, "oabdbas", true);
console.log("created classroom:", classroom2.data());

user1 = new User("usertestid1", "wasa", "oabdbas");
console.log("created user:", user1.data());

sysManager.addToExisting("user", ADMIN_ID, user1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom2);

booking1 = new Booking("testid1", "math class", "classroomtestid1", [1, 2], "usertestid1");
console.log("created booking:", booking1.data());

booking2 = new Booking("testid2", "random presentation", "classroomtestid2", [4, 5], "usertestid1");
console.log("created booking:", booking2.data());
sysManager.addToExisting("booking", ADMIN_ID, booking1);
sysManager.addToExisting("booking", ADMIN_ID, booking2);

console.log(sysManager.data()[2][1]);

sysManager.deleteExisting("booking", "fakeuser", "testid2"); // no booking with given user id - should not work
sysManager.deleteExisting("booking", ADMIN_ID, "fakebooking"); // no booking with given id - should not work
sysManager.deleteExisting("booking", ADMIN_ID, "testid1"); // correct - should work;
sysManager.deleteExisting("booking", "usertestid1", "testid2"); // correct - should work;

console.log("after removal: ", sysManager.data()[2][1]);
