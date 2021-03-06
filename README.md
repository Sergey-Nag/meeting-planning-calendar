# Meeting planning calendar

[Go to the app](https://sergey-nag.github.io/meeting-planning-calendar/)

How to use:

- [Calendar](#calendar)
  - [Authorise](#authorise)
  - [Event card](#event-card)
  - [Remove event](#remove-event)
  - [Move events](#move-event)
  - [Filter events](#filter-events)
- [Create event](#create-event)
  - [Title](#title)
  - [Day](#day)
  - [Time](#time)
  - [Participants](#participants)
  - [Submit creating event](#submit-creating-event)
  - [Cancel creating event](#cancel-creating-event)

How to launch project locally:

- [Clone project](#clone-project)
- [Install dependencies](#install-dependencies)
- [Build ready app](#build-ready-app)
- [Run for development](#run-for-development)
- [Other commands](#other-commands-in-this-project)

## Calendar

The main view of the calendar page.

At the top of the page located page title, dropdouwn input for filter and button to create new event.
Below is the calendar with 6 columns and 10 row where on the titles displayed weekdays and on the rows displayed working hours.
![calendar page](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/1-calendar.png)

## Authorise

At first You need to authorise in app by choosing some persone in dropdown. After, click to "Confirm" button to continue using the app.

![authorise](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/1.1-authorise.png)

If You choose user with admin privelegies, You able to create, delete and edit event time by dragging. Ordinary users can only look and filter events by persons.

P.S. Users, who have admin privelegies is first two in list: Alex and Elizabeth.<br>
<sup>P.P.S. After creating an event You'll be redirected to calendar page where You need to athorise again. But it will be fixed in future.</sup>

## Event card

The displayed data on the event card is event name and images list as participants:

![event-card](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/2-event-card.png)

The hovered card view:

![event-card-hover](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/3-event-card-hover.png)

Over the hovered participant image displayed his name:

![event-card-participant-hover](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/4-event-card-participant-hover.png)

## Remove event

Clicking by the cross button on the event card pops up the alert in which you must confirm or cancel deleting event:

![confirm-alert-deleting-event](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/6-confirm-alert-deleting-event.png)

After confirm, event will delete. For close alert or cancel you need to click the appropriate button or click around of alert:
After that you'll seen result of your actions.

## Move events

That would to change event day and time you can drag the card to another free cell. At the start of dragging you'll seen blue dashed border on the free cell or red filled already booked cells, on which you won't put the dragging card.

![dragging-card-allow-cell](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/7-dragging-card-allow-cell.png)
![dragging-card-disallow-cell](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/8-dragging-card-disallow-cell.png)

After dropped the card to the new cell you'll see alert with confirmation of change event date and time:

![dragging-card-allert](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/9-dragging-card-allert.png)

## Filter events

By the input with dropdown users list you can choose by which user the event cards will be filtered:

![dropdown-filter-users](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/10-dropdown-filter-users.png)

After change value on the calendar will be left event cards of which contains chosen participant:

![filtered-users](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/11-filtered-users.png)

## Create event

To start create event click the "New Event" button.
Page consist 3 inputs at the left side and a scrolling list of all users on the right side. **All fields are required.**
At the bottom there are "Cancel" and "Submit" buttons.

![new-event-button](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/12-new-event-button.png)

You'll move on to the create event page where need to fill out the data:

![new-event-page](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/13-new-event-page.png)

## Title

The name of the event must be written into first text field:

![title-field](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/14-title-field.png)

The length of name must be from 3 to 40 symbols and value can't consist illegal characters.

![title-field-invalid](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/14.1-title-field-invalid.png)

## Day

For choose needed weekday for event choose the right variant from dropdown at the day field:

![date-field](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/15-date-field.png)

## Time

For choose needed time for event choose the right variant from dropdown at the time field:

![time-field](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/16-time-field.png)

## Participants

For choose a participants you need to click on the user from the list at right side:

![participants-choosen](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/17-participants-choosen.png)

When user chosen, his avatar and name add to participants field. You have multiple choise to add a several participants:

![several-participants](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/18-several-participants.png)

For removing some participant, you can click again to him in the users list or click to cross button which showed when cursor hovered to image across from participants field:

![participant-hover](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/19-participant-hover.png)

## Submit creating event

When you click submit button but not all data is filled in, you can see validation errors on the incorrect fields:

![incorect-validation](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/20-incorect-validation.png)

When event name field is filled worng you could seen validation notification below the input:

![text-validation-failed](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/21-text-validation-failed.png)

If event on this date and time is already exist, you'll seen the error message at top of the page, which you can close clicking by the cross button:

![booking-date-error](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/22-booking-date-error.png)

If no errors detected, after submitting form you'll seen successful message and be redirected to calendar page with updated events:

![new-event-created-alert](https://github.com/sergey-nag/meeting-planning-calendar/blob/doc-img/doc-img/23-new-event-created-alert.png)

## Cancel creating event

Clicking the cancel button just took you to the calendar page.

---

### Clone project

Clone project to local folder with this command

```shell
git clone https://github.com/Sergey-Nag/meeting-planning-calendar.git
```

### Install dependencies

Inside the downloaded folder run the command `npm install` and wait until all dependencies are loaded.

### Build ready app

For generate full compiled project use the command `npm run build` and wait until compilling is finished. After that full project will be placed in the **/dist** folder.

### Run for development

For development run the command `npm run dev`, then, after saving any file in this folder project will be recompiled.
Also, you can run command `npm run dev:serve` to run local server on 9000 port, and after saving any files page will be reloaded automatically with all changes.

### Other commands in this project

- `npm run test` - running tests.
- `npm run stylelint:fix` - fixing (where possible) errors in styles.
