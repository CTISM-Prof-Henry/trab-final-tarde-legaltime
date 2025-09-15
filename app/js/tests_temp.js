// tests:

sysManager = new SysManager([], [], [], [], []);
console.log("created sysManager: ", sysManager.data());

// testing function addToExisting of class SysManager:
// - for type = "user"

someone1 = new User(sysManager, "testid1", "wasa", "oabdbas");
console.log("created user:", someone1.data()); // unique id - should work

someone2 = new User(sysManager, "testid2", "wasa", "oabdbas");
console.log("created user:", someone2.data()); // unique id - should work

someone3 = new User(sysManager, "testid3", "wasa", "oabdbas");
console.log("created user:", someone3.data()); // unique id but not admin - should not work

someone4 = new User(sysManager, "testid2", "wasa", "oabdbas");
console.log("created user:", someone4.data()); // non unique id - should not work

sysManager.addToExisting("user", ADMIN_ID, someone1); // unique id - should work
sysManager.addToExisting("user", ADMIN_ID, someone2); // unique id - should work
sysManager.addToExisting("user", "random", someone3); // unique id but not admin - should not work
sysManager.addToExisting("user", ADMIN_ID, someone4); // non unique id - should not work

console.log(sysManager.data());
