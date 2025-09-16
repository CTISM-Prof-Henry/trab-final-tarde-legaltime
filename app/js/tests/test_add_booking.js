sysManager = new SysManager([], [[1, 2], [4, 5], [6,7], [8,9], [11, 12], [23, 24]], [], [], []);
console.log("created sysManager: ", sysManager.data()); // test timespans

classroom1 = new Classroom("classroomtestid1", 123, "oabdbas", true);
console.log("created classroom:", classroom1.data());

classroom2 = new Classroom("classroomtestid2", 276, "oabdbas", true);
console.log("created classroom:", classroom2.data());

classroom3 = new Classroom("classroomtestid3", 276, "oabdbas", false);
console.log("created classroom:", classroom3.data());

user1 = new User("usertestid1", "wasa", "oabdbas");
console.log("created user:", user1.data());

sysManager.addToExisting("user", ADMIN_ID, user1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom2);
sysManager.addToExisting("classroom", ADMIN_ID, classroom3);

// added classrooms and user for booking test

booking1 = new Booking("testid1", "math class", "classroomtestid1", [1, 2], "usertestid1");
console.log("created booking:", booking1.data());

booking2 = new Booking("testid2", "random presentation", "classroomtestid2", [4, 5], "usertestid1");
console.log("created booking:", booking2.data());

booking3 = new Booking("testid3", "some conference", "classroom231", [6,7], "usertestid1");
console.log("created booking:", booking3.data());

booking4 = new Booking("testid4", "dog showcase", "classroomtestid2", [10,12], "usertestid1");
console.log("created booking:", booking4.data());

booking5 = new Booking("testid5", "something special", "classroomtestid2", [8,9], "fakeuser");
console.log("created booking:", booking5.data());

booking6 = new Booking("testid2", "ted talk", "classroomtestid2", [11,12], "usertestid1");
console.log("created booking:", booking6.data());

booking7 = new Booking("testid7", "ted talk", "classroomtestid2", [1,2], "usertestid1");
console.log("created booking:", booking7.data());

booking8 = new Booking("testid8", "ted talk 2", "classroomtestid3", [23, 24], "usertestid1");
console.log("created booking:", booking8.data());

sysManager.addToExisting("booking", ADMIN_ID, booking1); // correct - should work
sysManager.addToExisting("booking", ADMIN_ID, booking2); // correct - should work
sysManager.addToExisting("booking", "random", booking3); // classroom doesnt exist - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking4); // timespan doesnt exist - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking5); // user not found - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking6); // non unique id - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking7); // timespan already in use - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking8); // classroom already in use - should not work

console.log(sysManager.data()[2][1]);
