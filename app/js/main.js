
const ADMIN_ID = "#00001";
var active_user = null // application starts with admin

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
            
            let timespanExists = false; // check if timespan exists --> updated 24/10: checks if bounds for given timespan exist  
            var treatedOption1 = parseInt(String(bookingData[3][1][0])[0]+String(bookingData[3][1][0])[1]+String(bookingData[3][1][0])[3]);
            var treatedOption2 = parseInt(String(bookingData[3][1][1])[0]+String(bookingData[3][1][1])[1]+String(bookingData[3][1][1])[3]);

            if (treatedOption1 < 100) {
                treatedOption1 = parseInt(String(bookingData[3][1][0])[0]+String(bookingData[3][1][0])[1]+String(bookingData[3][1][0])[3]);
            }

            if (treatedOption2 < 100) {
                treatedOption2 = parseInt(String(bookingData[3][1][1])[0]+String(bookingData[3][1][1])[1]+String(bookingData[3][1][1])[3]);
            }


            for (let i=0;i<this.availableTimespans.length;i++) {
                if (treatedOption1 == this.availableTimespans[i]) {
                    for (let x=0;x<this.availableTimespans.length;x++) {
                        if (treatedOption2 == this.availableTimespans[x]) {
                            timespanExists = true;
                        }
                    }
                }
            }

            
            let classroomExists = false; // check if classroom exists and if is being used
            let classroomUsed = false;
            for (let i=0;i<this.existingClassrooms.length;i++) {
                if (bookingData[2][1] == this.existingClassrooms[i].data()[0][1]) {
                    classroomExists = true;
                    var treatedGivenStart = parseInt(bookingData[3][1][0][0]+bookingData[3][1][0][1]+bookingData[3][1][0][3]);
                    var treatedGivenEnd = parseInt(bookingData[3][1][1][0]+bookingData[3][1][1][1]+bookingData[3][1][1][3]);
                    for (let m=0;m<this.existingClassrooms[i].data()[3][1].length;m++) {
                        var treatedExistingStart = parseInt(this.existingClassrooms[i].data()[3][1][m][0][0]+this.existingClassrooms[i].data()[3][1][m][0][1]+this.existingClassrooms[i].data()[3][1][m][0][3]);
                        var treatedExistingEnd = parseInt(this.existingClassrooms[i].data()[3][1][m][1][0]+this.existingClassrooms[i].data()[3][1][m][1][1]+this.existingClassrooms[i].data()[3][1][m][1][3]);
                        if (treatedGivenStart >= treatedExistingStart && treatedGivenEnd <= treatedExistingEnd) {
                            classroomUsed = true;
                        }

                        else if (treatedGivenStart >= treatedExistingStart && treatedGivenStart <= treatedExistingEnd) {
                            classroomUsed = true;
                        }
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
                
                let bookIDUsed = false;
                for (let i=0;i<this.existingBookings.length;i++) {
                    if (bookingData[0][1] == this.existingBookings[i].data()[0][1]) {
                    bookIDUsed = true;
                    }
                }
                
                if (bookIDUsed == false) {
                    this.existingBookings = this.existingBookings.concat([target]);
                    for (let i=0;i<this.existingClassrooms.length;i++) {
                        if (bookingData[2][1] == this.existingClassrooms[i].data()[0][1]) {
                            var updatedUsageTimes = this.existingClassrooms[i].data()[3][1].concat([bookingData[3][1]]);
                            let modifiedClassroom = new Classroom(this.existingClassrooms[i].data()[0][1], this.existingClassrooms[i].data()[1][1], this.existingClassrooms[i].data()[2][1], updatedUsageTimes, sysManager);
                            this.existingClassrooms[i] = modifiedClassroom;
                            return 1;
                        }
                    }
                }
            }
        
        return 0;
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
    constructor(id, capacity, dept_priority, usageTimes, sysManager) {
        this.id = id;
        this.capacity = capacity;
        this.dept_priority = dept_priority;
        this.usageTimes = usageTimes;
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
        yield ["usageTimes", this.usageTimes];
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

        for (let a=0;a<sysManager.data()[1][1].length;a++) {
            var trk = document.getElementsByTagName("tr")[a+1];
            trk.insertCell(1).outerHTML = '<td id="'+String(sysManager.data()[4][1][i]["id"])+";"+sysManager.data()[1][1][a]+'"></td>';
        }
    }
}

function updateBookingOpts() {
    var select = document.getElementById("classroom-book-opts");

    for (let i=0;i<sysManager.data()[4][1].length;i++) {
        select.add(new Option(sysManager.data()[4][1][i]["id"]));
    }

    var select1 = document.getElementById("time-book-opts-start");
    var select2 = document.getElementById("time-book-opts-end");
    for (let i=0;i<sysManager.data()[1][1].length;i++) {
        var opt = sysManager.data()[1][1][i];
        if (opt < 100) {
            select1.add(new Option("0"+String(opt)[0]+":"+String(opt)[1]+"0"));
            select2.add(new Option("0"+String(opt)[0]+":"+String(opt)[1]+"0"));
        }

        else {
            select1.add(new Option(String(opt)[0]+String(opt)[1]+":"+String(opt)[2]+"0"));
            select2.add(new Option(String(opt)[0]+String(opt)[1]+":"+String(opt)[2]+"0"));
        }    
    }

}

function selectedUser() {
    for (let i=0;i<sysManager.data()[3][1].length;i++) {
        if (sysManager.data()[3][1][i]["name"] == document.getElementById("user-button").value) {
            active_user = document.getElementById("user-button").value;
        }
    }
}

function addUserOpts() {
    var select = document.getElementById("user-button");
    for (let i=0;i<sysManager.data()[3][1].length;i++) {
        select.add(new Option(sysManager.data()[3][1][i]["name"]));
    }
}

// default data (should be modified in admin panel)

timespans = [
    70, 73,
    80, 83,
    90, 93,
    100, 103,
    110, 113,
    120, 123,
    130, 133,
    140, 143,
    150, 153,
    160, 163,
    170, 173,
    180, 183,
    190, 193,
    200, 203,
    210, 213,
    220, 223,
    230, 233
]

let sysManager = new SysManager([], timespans, [], [], []);
console.log("created sysManager: ", sysManager.data());

let classroom1 = new Classroom("SALA G203", 12, "math", [], sysManager);
sysManager.addToExisting("classroom", ADMIN_ID, classroom1);

let classroom2 = new Classroom("SALA F402", 24, "math", [], sysManager);
sysManager.addToExisting("classroom", ADMIN_ID, classroom2);

let classroom3 = new Classroom("SALA PROJETOR", 50, "math", [], sysManager);
sysManager.addToExisting("classroom", ADMIN_ID, classroom3);

let admin = new User(ADMIN_ID, "admin", "none", sysManager);
sysManager.addToExisting("user", ADMIN_ID, admin);

active_user = admin;

let testUser = new User("test", "test", "test user", sysManager);
sysManager.addToExisting("user", ADMIN_ID, testUser);

document.addEventListener("DOMContentLoaded", function () {
    addUserOpts();
    updateTable();
    updateBookingOpts();
});


// interactivity

const addBookingDialog = document.getElementById("add-booking-dialog");
const addBookingBtn = document.getElementById("add-booking-btn");
const addBookingClose = document.getElementById("add-booking-cancel-btn");
const finishAddBooking = document.getElementById("add-booking-finish-btn");
const userSelect = document.getElementById("user-button");


addBookingBtn.addEventListener("click", () => {
  addBookingDialog.showModal();
});

addBookingClose.addEventListener("click", () => {
  addBookingDialog.close();
});


finishAddBooking.addEventListener("click", () => {
    var eventTitle = document.getElementById("input-event-title").value;
    var selectedClassroom = document.getElementById("classroom-book-opts").value;
    var startTime = document.getElementById("time-book-opts-start").value;
    var endTime = document.getElementById("time-book-opts-end").value;
    var timespan = [startTime, endTime];
    var requestedColor = document.getElementById("color-choice").value;
    let ready = false;

    if (String(eventTitle) != "" && parseInt(startTime[0]+startTime[1]) < parseInt(endTime[0]+endTime[1])) {
        ready = true;
        addBookingDialog.close();
    }

    else if (String(eventTitle) != "" && parseInt(startTime[0]+startTime[1]) == parseInt(endTime[0]+endTime[1])) {
        if (parseInt(startTime[3]+startTime[4]) < parseInt(endTime[3]+endTime[4])) {
            ready = true;
            addBookingDialog.close();
        }
    }

    if (ready) {
        var thisBooking = new Booking(eventTitle, eventTitle, selectedClassroom, timespan, ADMIN_ID, sysManager);
        var success = sysManager.addToExisting("booking", ADMIN_ID, thisBooking);
        if (success == 1) {
            var treatedStart = parseInt(thisBooking.data()[3][1][0][0]+thisBooking.data()[3][1][0][1]+thisBooking.data()[3][1][0][3]);
            var treatedEnd = parseInt(thisBooking.data()[3][1][1][0]+thisBooking.data()[3][1][1][1]+thisBooking.data()[3][1][1][3]);
            var first = false;
            for (let i=0;i<timespans.length;i++) {
                if (timespans[i] >= treatedStart && timespans[i] <= treatedEnd) {
                    var pertinentCell = document.getElementById(String(selectedClassroom+";"+String(timespans[i])));
                    pertinentCell.style.background = requestedColor;
                    if (first == false) {
                        pertinentCell.innerHTML = String(eventTitle+" | "+startTime+" - "+endTime);
                        first = true;
                    }
                }
            }
        }
    }
  });
