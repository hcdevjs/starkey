#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const eventsFile = path.join(__dirname, "../data/events.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser() {
  console.log("\nEvent Management System");
  console.log("1. Add new event");
  console.log("2. List all events");
  console.log("3. Remove event");
  console.log("4. Exit");

  rl.question("\nSelect an option (1-4): ", (answer) => {
    switch (answer) {
      case "1":
        addEvent();
        break;
      case "2":
        listEvents();
        break;
      case "3":
        removeEvent();
        break;
      case "4":
        rl.close();
        break;
      default:
        console.log("Invalid option");
        promptUser();
    }
  });
}

const addEvent = () => {
  const event = {};
  console.log("\nAdding new event:");
  console.log("----------------");

  rl.question("Event title: ", (title) => {
    event.title = title;
    rl.question("Date (YYYY-MM-DD): ", (date) => {
      rl.question("Start time (HH:MM): ", (startTime) => {
        event.start = `${date}T${startTime}:00`;
        rl.question("End time (HH:MM): ", (endTime) => {
          event.end = `${date}T${endTime}:00`;

          console.log("\nLocation Details:");
          console.log("----------------");
          rl.question("Venue name: ", (venueName) => {
            rl.question("Street address: ", (street) => {
              rl.question("City: ", (city) => {
                rl.question("State: ", (state) => {
                  rl.question("ZIP code: ", (zip) => {
                    event.location = `${venueName}, ${street}, ${city}, ${state} ${zip}`;

                    rl.question(
                      "Venue website URL (or press enter to skip): ",
                      (venueUrl) => {
                        if (venueUrl) event.venueUrl = venueUrl;

                        console.log("\nEvent Details:");
                        console.log("----------------");
                        rl.question("Description: ", (description) => {
                          event.description = description;

                          // Read existing events
                          fs.readFile(eventsFile, "utf8", (err, data) => {
                            if (err) {
                              console.error("Error reading events file:", err);
                              promptUser();
                              return;
                            }

                            const events = JSON.parse(data);
                            events.events.push(event);

                            // Write updated events back to file
                            fs.writeFile(
                              eventsFile,
                              JSON.stringify(events, null, 2),
                              (err) => {
                                if (err) {
                                  console.error("Error saving event:", err);
                                } else {
                                  console.log("\nEvent added successfully!");
                                  console.log("----------------");
                                  console.log("Title:", event.title);
                                  console.log("Date:", date);
                                  console.log(
                                    "Time:",
                                    `${startTime} - ${endTime}`
                                  );
                                  console.log("Location:", event.location);
                                  if (event.venueUrl)
                                    console.log("Venue URL:", event.venueUrl);
                                }
                                promptUser();
                              }
                            );
                          });
                        });
                      }
                    );
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

const listEvents = () => {
  fs.readFile(eventsFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading events file:", err);
      promptUser();
      return;
    }

    const events = JSON.parse(data).events;
    console.log("\nCurrent Events:");
    console.log("----------------");
    events.forEach((event, index) => {
      console.log(`\n${index + 1}. ${event.title}`);
      console.log(`   Date: ${event.start.split("T")[0]}`);
      console.log(
        `   Time: ${event.start.split("T")[1]} - ${event.end.split("T")[1]}`
      );
      console.log(`   Location: ${event.location}`);
      if (event.venueUrl) console.log(`   Venue URL: ${event.venueUrl}`);
      if (event.description)
        console.log(`   Description: ${event.description}`);
    });
    promptUser();
  });
};

function removeEvent() {
  listEvents();
  rl.question("\nEnter the number of the event to remove: ", (index) => {
    fs.readFile(eventsFile, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading events file:", err);
        promptUser();
        return;
      }

      const events = JSON.parse(data);
      const eventIndex = parseInt(index) - 1;

      if (eventIndex >= 0 && eventIndex < events.events.length) {
        const removedEvent = events.events[eventIndex];
        events.events.splice(eventIndex, 1);
        fs.writeFile(eventsFile, JSON.stringify(events, null, 2), (err) => {
          if (err) {
            console.error("Error removing event:", err);
          } else {
            console.log("\nEvent removed successfully!");
            console.log("----------------");
            console.log("Removed:", removedEvent.title);
            console.log("Date:", removedEvent.start.split("T")[0]);
            console.log("Location:", removedEvent.location);
          }
          promptUser();
        });
      } else {
        console.log("Invalid event number");
        promptUser();
      }
    });
  });
}

console.log("Welcome to the Event Management System\n");
promptUser();
