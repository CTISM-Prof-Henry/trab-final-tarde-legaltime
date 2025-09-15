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
