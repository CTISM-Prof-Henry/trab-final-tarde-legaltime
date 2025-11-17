const SysManager = require("../classes.js");
const Classroom = require("../classes.js");
const User = require("../classes.js");
const Booking = require("../classes.js");
const ADMIN_ID = require("../classes.js");

// TEST BOOKING CREATION

sysManager = new SysManager([], [[1, 2], [4, 5], [6,7], [8,9], [11, 12], [23, 24]], [], [], []);

classroom1 = new Classroom("classroomtestid1", 123, "oabdbas", true);
classroom2 = new Classroom("classroomtestid2", 276, "oabdbas", true);
classroom3 = new Classroom("classroomtestid3", 276, "oabdbas", false);

user1 = new User("usertestid1", "wasa", "oabdbas");

sysManager.addToExisting("user", ADMIN_ID, user1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom2);
sysManager.addToExisting("classroom", ADMIN_ID, classroom3);

booking1 = new Booking("testid1", "math class", "classroomtestid1", [1, 2], "usertestid1");
booking2 = new Booking("testid2", "random presentation", "classroomtestid2", [4, 5], "usertestid1");
booking3 = new Booking("testid3", "some conference", "classroom231", [6,7], "usertestid1");
booking4 = new Booking("testid4", "dog showcase", "classroomtestid2", [10,12], "usertestid1");
booking5 = new Booking("testid5", "something special", "classroomtestid2", [8,9], "fakeuser");
booking6 = new Booking("testid2", "ted talk", "classroomtestid2", [11,12], "usertestid1");
booking7 = new Booking("testid7", "ted talk", "classroomtestid2", [1,2], "usertestid1");
booking8 = new Booking("testid8", "ted talk 2", "classroomtestid3", [23, 24], "usertestid1");

sysManager.addToExisting("booking", ADMIN_ID, booking1); // correct - should work
sysManager.addToExisting("booking", ADMIN_ID, booking2); // correct - should work
sysManager.addToExisting("booking", "random", booking3); // classroom doesnt exist - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking4); // timespan doesnt exist - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking5); // user not found - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking6); // non unique id - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking7); // timespan already in use - should not work
sysManager.addToExisting("booking", ADMIN_ID, booking8); // classroom already in use - should not work

// added classrooms and user for booking test

QUnit.module("SysManager", () => {
    QUnit.test("addToExisting adiciona apenas os booking1 e booking2", (assert) => {
        const expected = [booking1, booking2];
        assert.equal(sysManager.data()[2][1], expected);
    })
})

// TEST BOOKING DELETION

sysManager = new SysManager([], [[1, 2], [4, 5]], [], [], []);

classroom1 = new Classroom("classroomtestid1", 123, "oabdbas", false);
classroom2 = new Classroom("classroomtestid2", 276, "oabdbas", true);


user1 = new User("usertestid1", "wasa", "oabdbas");

sysManager.addToExisting("user", ADMIN_ID, user1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom2);

booking1 = new Booking("testid1", "math class", "classroomtestid1", [1, 2], "usertestid1");
booking2 = new Booking("testid2", "random presentation", "classroomtestid2", [4, 5], "usertestid1");

sysManager.addToExisting("booking", ADMIN_ID, booking1);
sysManager.addToExisting("booking", ADMIN_ID, booking2);

sysManager.deleteExisting("booking", "fakeuser", "testid2"); // no booking with given user id - should not work
sysManager.deleteExisting("booking", ADMIN_ID, "fakebooking"); // no booking with given id - should not work
sysManager.deleteExisting("booking", ADMIN_ID, "testid1"); // correct - should work;
sysManager.deleteExisting("booking", "usertestid1", "testid2"); // correct - should work;

QUnit.module("SysManager", () => {
    QUnit.test("deleteExisting remove com sucesso booking1 e booking2 ", (assert) => {
        const expected = [];
        assert.equal(sysManager.data()[2][1], expected);
    })
})

// TEST CLASSROOM REMOVAL

sysManager = new SysManager([], [], [], [], []);

classroom1 = new Classroom("testid1", 123, "oabdbas", false);
classroom2 = new Classroom("testid2", 276, "oabdbas", true);

sysManager.addToExisting("classroom", ADMIN_ID, classroom1);
sysManager.addToExisting("classroom", ADMIN_ID, classroom2);

sysManager.deleteExisting("classroom", ADMIN_ID, "testid2"); // correct - should work
sysManager.deleteExisting("classroom", "someotheruser", "testid1"); // not admin - should not work
sysManager.deleteExisting("classroom", ADMIN_ID, "fakeclassroom"); // classroom id does not exist - should not work

sysManager.deleteExisting("classroom", ADMIN_ID, "testid1"); // classroom booked (not available) - should not work

QUnit.module("SysManager", () => {
    QUnit.test("deleteExisting remove com sucesso classroom2", (assert) => {
        const expected = [classroom1];
        assert.equal(sysManager.data()[4][1], expected);
    })
})
