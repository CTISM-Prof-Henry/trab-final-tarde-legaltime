sysManager = new SysManager([], [], [], [], []);
console.log("created sysManager: ", sysManager.data());

someone1 = new User("testid1", "data", "data");
console.log("created user:", someone1.data());

someone2 = new User("testid2", "data", "data");
console.log("created user:", someone2.data());

sysManager.addToExisting("user", ADMIN_ID, someone1);
sysManager.addToExisting("user", ADMIN_ID, someone2);

console.log("added users to sysManager: ", sysManager.data()[3][1]);

sysManager.deleteExisting("user", ADMIN_ID, "testid2"); // correct - should work
sysManager.deleteExisting("user", "someuser", "testid1"); // not admin - should not work
sysManager.deleteExisting("user", ADMIN_ID, "fakeuserid") // target user doesnt exist - should not work

console.log("after removal: ", sysManager.data()[3][1]);
