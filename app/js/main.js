
const ADMIN_ID = "#00001";
var ACTIVE_USER_ID = ADMIN_ID // application starts with admin

// timespans need to be passed when creating SysManager object

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
            let classroomUsed = true;
            for (let i=0;i<this.existingClassrooms.length;i++) {
                if (bookingData[2][1] == this.existingClassrooms[i].data()[0][1]) {
                    classroomExists = true;
                    if (this.existingClassrooms[i].data()[3][1]) {
                        classroomUsed = false;
                    }
                }
            }
            
            let userIDExists = false;
            for (let i=0;i<this.existingUsers.length;i++) {
                if (bookingData[4][1] == this.existingUsers[i].data()[0][1]) {
                    userIDExists = true;
                }
            }
            
            if (userIDExists && timespanExists && classroomExists && classroomUsed == false) {
                
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
                    for (let i=0;i<this.existingClassrooms.length;i++) {
                        if (bookingData[2][1] == this.existingClassrooms[i].data()[0][1]) {
                            let modifiedClassroom = new Classroom(this.existingClassrooms[i].data()[0][1], this.existingClassrooms[i].data()[1][1], this.existingClassrooms[i].data()[2][1], false);
                            this.existingClassrooms[i] = modifiedClassroom;
                        }
                    }
                }
            }
            
        }
    }
    
    deleteExisting(type, requestingUser, targetID) {
        if (type == "user") {
            if (requestingUser == ADMIN_ID) { // only admin can remove users
                for (let i=0;i<this.existingUsers.length;i++) {
                    if (this.existingUsers[i].data()[0][1] == targetID) {
                        let index = this.existingUsers.indexOf(this.existingUsers[i]);
                        this.existingUsers.splice(index, 1);
                    }
            }
            
            }
            else {
                console.log("requestingUser not admin");
            }
        }
        
        else if (type == "classroom") {
            if (requestingUser == ADMIN_ID) { // only admin can remove classrooms
                for (let i=0;i<this.existingClassrooms.length;i++) {
                    if (this.existingClassrooms[i].data()[0][1] == targetID) {
                        if (this.existingClassrooms[i].data()[3][1]) {
                            let index = this.existingClassrooms.indexOf(this.existingClassrooms[i]);
                            this.existingClassrooms.splice(index, 1);   
                        }
                        else {
                            console.log("cannot remove classroom: there is a booking");
                        }
                    }
            }
            
            }
            else {
                console.log("requestingUser not admin");
            }
        }
        
        else if (type == "booking") {
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
                    for (let i=0;i<this.existingClassrooms.length;i++) {
                        if (targetBooking.data()[2][1] == this.existingClassrooms[i].data()[0][1]) {
                            let modifiedClassroom = new Classroom(this.existingClassrooms[i].data()[0][1], this.existingClassrooms[i].data()[1][1], this.existingClassrooms[i].data()[2][1], true);
                            this.existingClassrooms[i] = modifiedClassroom;
                        }
                    }
                }
                else {
                    console.log("requesting user doesnt exist or is not allowed to remove")
                }
            }
        }
    }
}


class User {
    constructor(id, name, dept, sysManager) {
        this.id = id;
        this.name = name;
        this.dept = dept;
        this.sysManager = sysManager;
    }
    
    data() {
        return [...this.getData()];
    }
    
    remove(sysManager) {
        this.sysManager.deleteExisting("user", ADMIN_ID, this.id);
    }
    
    *getData() {
        yield ["id", this.id];
        yield ["name", this.name];
        yield ["dept", this.dept];
    } 
    
}

class Classroom {
    constructor(id, capacity, dept_priority, available, sysManager) {
        this.id = id;
        this.capacity = capacity;
        this.dept_priority = dept_priority;
        this.available = available;
        this.sysManager = sysManager;
    }
    data() {
        return [...this.getData()];
        
    }
    
    remove() {
        this.sysManager.deleteExisting("classroom", ADMIN_ID, this.id);
    }
    
    *getData() {
        yield ["id", this.id];
        yield ["capacity", this.capacity];
        yield ["dept_priority", this.dept_priority];
        yield ["available", this.available];
    } 
    
}

class Booking {
    constructor(id, displayTitle, classroom, timespan, userID, sysManager) {
        this.id = id;
        this.displayTitle = displayTitle;
        this.classroom = classroom;
        this.timespan = timespan;
        this.userID = userID;
        this.sysManager = sysManager;
    }
    
    data() {
        return [...this.getData()];
        
    }
    
    remove() {
        this.sysManager.deleteExisting("booking", ADMIN_ID, this.id);
    }
    
    *getData() {
        yield ["id", this.id];
        yield ["displayTitle", this.displayTitle];
        yield ["classroom", this.classroom];
        yield ["timespan", this.timespan];
        yield ["userID", this.userID];
    } 
    
}


function updateTable() { // fix later: everytime this method is called, headers are gonna be duplicated if already there
    for (let i=0;i<sysManager.data()[4][1].length;i++) {
        var tr = document.getElementById("headers-row");
        tr.insertCell(1).outerHTML = "<th id=>"+sysManager.data()[4][1][i]["id"]+"</th>";

        for (let a=1;a<sysManager.data()[1][1].length;a++) {
            var trk = document.getElementsByTagName("tr")[a];
            trk.insertCell(1).outerHTML = "<td></td>";
        }
    }
}

function updateUser(actual) {
    var button = document.getElementById("user-button");
    button.innerHTML = actual.name;
}

// default data (should be modified in admin panel)

timespans = [
    [7000,7290],
    [7300,7590],

    [8000,8290],
    [8300,8590],

    [9000,9290],
    [9300,9590],

    [10000,10290],
    [10300,10590],

    [11000,11290],
    [11300,11590],

    [12000,12290],
    [12300,12590],

    [13000,13290],
    [13300,13590],

    [14000,14290],
    [14300,14590],

    [15000,15290],
    [15300,15590],

    [16000,16290],
    [16300,16590],

    [17000,17290],
    [17300,17590],

    [18000,18290],
    [18300,18590],

    [19000,19290],
    [19300,19590],

    [20000,20290],
    [20300,20590],

    [21000,21290],
    [21300,21590],

    [22000,22290],
    [22300,22590],

    [23000,23290],
    [23300,23590],

];

let sysManager = new SysManager([], timespans, [], [], []);
console.log("created sysManager: ", sysManager.data());

let classroom1 = new Classroom("SALA G203", 12, "math", true, sysManager);
sysManager.addToExisting("classroom", ADMIN_ID, classroom1);

let classroom2 = new Classroom("SALA F402", 24, "math", true, sysManager);
sysManager.addToExisting("classroom", ADMIN_ID, classroom2);

let classroom3 = new Classroom("SALA PROJETOR", 50, "math", true, sysManager);
sysManager.addToExisting("classroom", ADMIN_ID, classroom3);

let admin = new User(ADMIN_ID, "admin", "none", sysManager);
sysManager.addToExisting("user", ADMIN_ID, admin);

document.addEventListener("DOMContentLoaded", function () {
    updateTable();
    updateUser(admin);
});


// interactivity

const addBookingDialog = document.getElementById("add-booking-dialog");
const addBookingBtn = document.getElementById("add-booking-btn");
const addBookingClose = document.getElementById("add-booking-cancel-btn");
const finishAddBooking = document.getElementById("add-booking-finish-btn");

addBookingBtn.addEventListener("click", () => {
  addBookingDialog.showModal();
});

addBookingClose.addEventListener("click", () => {
  addBookingDialog.close();
});
