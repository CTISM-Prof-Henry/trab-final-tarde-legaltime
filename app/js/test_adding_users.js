sysManager = new SysManager([], [[1, 2], [4, 5]], [], [], []);
console.log("created sysManager: ", sysManager.data()); // test timespans

someone1 = new User("testid1", "data", "data");
console.log("created user:", someone1.data());

someone2 = new User("testid2", "data", "data");
console.log("created user:", someone2.data());

someone3 = new User("testid3", "data", "data");
console.log("created user:", someone3.data());

someone4 = new User("testid2", "data", "data");
console.log("created user:", someone4.data());

sysManager.addToExisting("user", ADMIN_ID, someone1); // unique id - should work
sysManager.addToExisting("user", ADMIN_ID, someone2); // unique id - should work
sysManager.addToExisting("user", "random", someone3); // unique id but not admin - should not work
sysManager.addToExisting("user", ADMIN_ID, someone4); // non unique id - should not work

console.log(sysManager.data());
