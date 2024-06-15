/* eslint-disable no-undef */
// 1. Find all the topics and tasks which are thought in the month of October ?

db.tasks.find().map((name) => name.task_name);
db.attendance.find().map((name) => name.topic);

// 2. Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020 ?
db.company_drives.find({ placement_Date: { $regex: "2020-10" } });

// 3. Find all the company drives and students who are appeared for the placement ?
db.company_drives.find().map((name) => name.company_name);
db.users.find({ attendedPlacement: { $eq: "Yes" } }).count();

// 4. Find the number of problems solved by the user in codekata ?
db.users.aggregate([
  { $group: { _id: "$name", Solved_Problems: { $sum: "$codeKata" } } },
  { $project: { _id: 0, Name: "$_id", Solved_Problems: 1 } },
]);

// 5. Find all the mentors with who has the mentee's count more than 15 ?
db.tasks.aggregate([
  { $match: { totalStudents: { $gt: 15 } } },
  { $group: { _id: "$mentor" } },
  { $project: { _id: 0, Mentor: "$_id" } },
]);

// 6. Find the number of users who are absent and task is not submitted between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([
  {
    $match: {
      Date: { $gte: ISODate("2020-10-15"), $lt: ISODate("2020-10-31") },
    },
  },
  { $group: { _id: "$absentees" } },
  { $project: { _id: 0, Absentees: "$_id" } },
]);

db.tasks.aggregate([
  {
    $match: {
      Date: { $gte: ISODate("2020-10-15"), $lt: ISODate("2020-10-31") },
    },
  },
  { $group: { _id: "$notCompleted" } },
  { $project: { _id: 0, Task_Not_Submitted: "$_id" } },
]);