const ADMIN_ID = "#00001";

class SysManager {
    constructor(activeBookings, availableTimespans, existingBookings, existingUsers, existingClassrooms) {
        this.activeBookings = activeBookings;
        this.availableTimespans = availableTimespans;
        this.existingBookings = existingBookings;
        this.existingUsers = existingUsers;
        this.existingClassrooms = existingClassrooms;
    }
    
    data() {
        return [...this.getData()];
        
    }
    
    *getData() {
        yield ["activeBookings", this.activeBookings];
        yield ["availableTimespans", this.availableTimespans];
        yield ["existingBookings", this.existingBookings];
        yield ["existingUsers", this.existingUsers];
        yield ["existingClassrooms", this.existingClassrooms];
    } 
    
    bookReset() {
        this.existingBookings = [];
        this.activeBookings = [];
    }
    
    addToExisting(type, requestingUser, target) {
        if (type == "user") {
            if (requestingUser == ADMIN_ID) { // only admin can add new users
                let alreadyIn = false;
                for (let i=0;i<this.existingUsers.length;i++) {
                    if (target.data()[0][1] == this.existingUsers[i].data()[0][1]) {
                        alreadyIn = true;
                    }
                }
                if (alreadyIn == false) {
                    this.existingUsers = this.existingUsers.concat([target]);
                }
                else {
                    console.log("user ID already exists");
                } 
            }
            
            else {
                console.log("user not admin");
            }
        }
        
        else if (type == "classroom") {
            if (requestingUser == ADMIN_ID) { // only admin can add new classrooms
                let alreadyIn = false;
                for (let i=0;i<this.existingClassrooms.length;i++) {
                    if (target.data()[0][1] == this.existingClassrooms[i].data()[0][1]) {
                        alreadyIn = true;
                    }
                }
                if (alreadyIn == false) {
                    this.existingClassrooms = this.existingClassrooms.concat([target]);
                }
                else {
                    console.log("classroom ID already exists");
                } 
            }
            
            else {
                console.log("user not admin");
            }
        }
        
        else if (type == "booking") {
            let bookingData = target.data();
            let existingUserIDS = [];
            let existingClassroomsIDS = [];
            for (let i=0;i<this.existingUsers.length;i++) {
                existingUserIDS = existingUserIDS.concat([this.existingUsers[i].data()[0][1]])
            }
            for (let i=0;i<this.existingClassrooms.length;i++) {
                existingClassroomsIDS = existingClassroomsIDS.concat([this.existingClassrooms[i].data()[0][1]])
            }
            
            let timespanExists = false;
            for (let i=0;i<this.availableTimespans.length;i++) {
                if (bookingData[3][1][0] == this.availableTimespans[i][0] && bookingData[3][1][1] == this.availableTimespans[i][1]) {
                    timespanExists = true;
                }
            }
            
            let classroomExists = false;
            for (let i=0;i<this.existingClassrooms.length;i++) {
                if (bookingData[2][1] == this.existingClassrooms[i].data()[0][1]) {
                    classroomExists = true;
                }
            }
            
            let userIDExists = false;
            for (let i=0;i<this.existingUsers.length;i++) {
                if (bookingData[4][1] == this.existingUsers[i].data()[0][1]) {
                    userIDExists = true;
                }
            }
            
            if (userIDExists && timespanExists && classroomExists) {
                
                let timespanUsed = false;
                for (let i=0;i<this.existingBookings.length;i++) {
                    if (bookingData[3][1][0] == this.existingBookings[i].data()[3][1][0] && bookingData[3][1][1] == this.existingBookings[i].data()[3][1][1]) {
                    timespanUsed = true;
                    }
                }
                
                let bookIDUsed = false;
                for (let i=0;i<this.existingBookings.length;i++) {
                    if (bookingData[0][1] == this.existingBookings[i].data()[0][1]) {
                    bookIDUsed = true;
                    }
                }
                
                if (bookIDUsed == false && timespanUsed == false) {
                    this.existingBookings = this.existingBookings.concat([target]);
                }
            }
            
        }
    }
    
    deleteExisting(type, requestingUser, targetID) {
        if (type == "booking") {
            let targetBooking = null;
            for (let i=0;i<this.existingBookings.length;i++) {
                if (this.existingBookings[i].data()[0][1] == targetID) {
                    targetBooking = this.existingBookings[i];
                }
            }
            if (targetBooking != null) {
                if (requestingUser == ADMIN_ID || requestingUser == targetBooking.data()[4][1]) {
                    let index = this.existingBookings.indexOf(targetBooking);
                    this.existingBookings.splice(index, 1);
                }
                else {
                    console.log("requesting user doesnt exist or is not allowed to remove")
                }
            }
        }
    }
}


class User {
    constructor(id, name, dept) {
        this.id = id;
        this.name = name;
        this.dept = dept;
    }
    
    data() {
        return [...this.getData()];
        
    }
    
    *getData() {
        yield ["id", this.id];
        yield ["name", this.name];
        yield ["dept", this.dept];
    } 
    
}

class Classroom {
    constructor(id, capacity, dept_priority, available) {
        this.id = id;
        this.capacity = capacity;
        this.dept_priority = dept_priority;
        this.available = available;
    }
    data() {
        return [...this.getData()];
        
    }
    
    *getData() {
        yield ["id", this.id];
        yield ["capacity", this.capacity];
        yield ["dept_priority", this.dept_priority];
        yield ["available", this.available];
    } 
    
}

class Booking {
    constructor(id, displayTitle, classroom, timespan, userID) {
        this.id = id;
        this.displayTitle = displayTitle;
        this.classroom = classroom;
        this.timespan = timespan;
        this.userID = userID;
    }
    data() {
        return [...this.getData()];
        
    }
    
    *getData() {
        yield ["id", this.id];
        yield ["displayTitle", this.displayTitle];
        yield ["classroom", this.classroom];
        yield ["timespan", this.timespan];
        yield ["userID", this.userID];
    } 
    
}

// test

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
