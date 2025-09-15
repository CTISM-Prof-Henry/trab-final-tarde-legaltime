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
    
    addToExisting(type, requestingUser, targetUser) {
        if (type == "user") {
            if (requestingUser == ADMIN_ID) { // only admin can add new users
                let alreadyIn = false;
                for (let i=0;i<this.existingUsers.length;i++) {
                    if (targetUser.data()[0][1] == this.existingUsers[i].data()[0][1]) {
                        alreadyIn = true;
                    }
                }
                if (alreadyIn == false) {
                    this.existingUsers = this.existingUsers.concat([targetUser]);
                }
                else {
                    console.log("user ID already exists");
                } 
            }
            
            else {
                console.log("user not admin");
            }
        }
    }
}


class User {
    constructor(sysManager, id, name, dept) {
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
    constructor(sysManager, id, capacity, dept_priority, available) {
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
