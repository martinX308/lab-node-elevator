class Elevator {
  constructor () {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.requests = [];
    this.passengers = [];
    this.waitingList = [];
    this.direction = 'up';
    this.intervalID;
  }

  start () {
    this.IntervalID = setInterval(this.update(), 1000);
  }
  stop () {
    clearInterval(this.IntervalID);
  }
  update () {
    // display current status
    this.log();
  }
  _passengersEnter (newFloor) {
    for (let i = 0; i < this.waitingList.length; i++) {
      if (this.waitingList[i].originFloor === newFloor) {
        let newPassenger = this.waitingList.splice(i, 1);
        this.passengers.push(newPassenger);
        this.requests.push(newPassenger.destinationFloor);
        console.log(`${newPassenger.name} has entered the elevator`);
      }
    }
  }
  _passengersLeave (newFloor) {
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i].destinationFloor === newFloor) {
        let leavingPassenger = this.passengers.splice(i, 1);
        console.log(`${leavingPassenger.name} has left the elevator`);
      }
    }
  }
  floorUp () {
    if (this.floor < this.MAXFLOOR) {
      this.floor++;
      this._passengersLeave(this.floor);
      this._passengersEnter(this.floor);
    } else {
      return false;
    }
  }
  floorDown () {
    if (this.floor > 0) {
      this.floor--;
      this._passengersLeave(this.floor);
      this._passengersEnter(this.floor);
    } else {
      return false;
    }
  }
  call (requester) {
    this.waitingList.push(requester);
    this.requests.push(requester.originFloor);
  }
  log () {
    console.log(`Direction:${this.direction} | Floor:${this.floor}`);
  }
}

module.exports = Elevator;
