sysManager = new SysManager([], [[1, 2], [4, 5], [6,7], [8,9], [11, 12], [23, 24]], [], [], []);
console.log("created sysManager: ", sysManager.data()); // test timespans

classroom1 = new Classroom("classroomtestid1", 123, "oabdbas", true, sysManager);
console.log("created classroom:", classroom1.data());

classroom2 = new Classroom("classroomtestid2", 276, "oabdbas", true);
console.log("created classroom:", classroom2.data());

user1 = new User("usertestid1", "wasa", "oabdbas", sysManager);
console.log("created user:", user1.data());

user2 = new User("usertestid2", "wasa", "oabdbas");
console.log("created user:", user2.data());

sysManager.addToExisting("user", ADMIN_ID, user1);
sysManager.addToExisting("user", ADMIN_ID, user2);
sysManager.addToExisting("classroom", ADMIN_ID, classroom1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom2);

booking1 = new Booking("testid1", "math class", "classroomtestid1", [1, 2], "usertestid1", sysManager);
console.log("created booking:", booking1.data());

booking2 = new Booking("testid2", "random presentation", "classroomtestid2", [4, 5], "usertestid1");
console.log("created booking:", booking2.data());

sysManager.addToExisting("booking", ADMIN_ID, booking1);
sysManager.addToExisting("booking", ADMIN_ID, booking2);

console.log(sysManager.data()[4]);

try {
    test1 = sysManager.data()[3][1][0];
    test2 = sysManager.data()[3][1][1];
    test1.remove(); // User object's sysManager was given - should work
    test2.remove(); // User object's sysManager is undefined - should not work
} catch (e){
    console.log(e);
}

try {
    test1 = sysManager.data()[4][1][0];
    test2 = sysManager.data()[4][1][1];
    test1.remove(); // Classroom object's sysManager was given - should work
    test2.remove(); // Classroom object's sysManager is undefined - should not work
} catch (e){
    console.log(e);
}

try {
    test1 = sysManager.data()[2][1][0];
    test2 = sysManager.data()[2][1][1];
    test1.remove(); // Booking object's sysManager was given - should work
    test2.remove(); // Booking object's sysManager is undefined - should not work
} catch (e){
    console.log(e);
}

console.log(sysManager.data());
