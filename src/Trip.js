export default class Trip {
  constructor(id, userID, destinationID, count, date, duration, status, suggestedActivities) {
    this.id = id;
    this.userID = destinationID;
    this.count = count;
    this.date = date;
    this.duration = duration;
    this.status = status;
    this.suggestedActivities = suggestedActivities;
  }
}