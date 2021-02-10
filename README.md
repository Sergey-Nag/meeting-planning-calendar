# meeting-planning-calendar

[Go to the app](https://sergey-nag.github.io/meeting-planning-calendar/dist/)

 - [Calendar](#calendar)
    - [Event card](#event-card)
    - [Remove event](#remove-event)
    - [Move event](#move-event)
    - [Filter events](#filter-events)
 - [Create event](#create-event)
    - [Title](#title)
    - [Day](#day)
    - [Time](#time)
    - [Participants](#participants)
    - [Submit creating event](#submit-creating-event)
    - [Cancel creating event](#cancel-creating-event)

## Calendar
The main view of the calendar page.
At the top of the page located page title, select input for filter and button to create new event.
Below, contains the calendar with 6 columns and 10 row where on the titles displayed weekdays and on the rows displayed working hours.
![calendar page](/doc-img/1-calendar.png)

## Event card
The displayed data on the event card is event name and images list as participants:

![calendar page](/doc-img/2-event-card.png)

The hovered card view:

![calendar page](/doc-img/3-event-card-hover.png)

Over the hovered participan displayed his name:

![calendar page](/doc-img/4-event-card-participant-hover.png)

## Remove event
Clicking by the cross button on the event card pops up the alert in which you must confirm or cancel deleting event:

![calendar page](/doc-img/5-event-card-remove-btnpng.png)

After confirm, event will delete. For close alert or cancel you need to click the appropriate button or click around of alert:

![calendar page](/doc-img/6-confirm-alert-deleting-event.png)

After that you'll seen result of your actions.

## Move event
That would to change event day and time you can drag the card to another free cell. At the start of dragging you'll seen blue dashed border on the free cell or red filled already booked cells, on which you won't puted the dragging card.

![calendar page](/doc-img/7-dragging-card-allow-cell.png)
![calendar page](/doc-img/8-dragging-card-disallow-cell.png)

After dropped the card to the new cell you'll see alert with confirmation of change event date and time:

![calendar page](/doc-img/9-dragging-card-allert.png)

## Filter events
By the input with dropdown users list you can choose by which user the event cards will be filtered:

![calendar page](/doc-img/10-dropdown-filter-users.png)

After change value on the calendar will be left event cards of which contains chosen participant:

![calendar page](/doc-img/11-filtered-users.png)

## Create event
To start create event click the "New Event" button.
Page consist 3 inputs at the left side and a scrolling list of all users on the right side. **All fields are required.**
At the bottom there are "Cancel" and "Submit" buttons.

![calendar page](/doc-img/12-new-event-button.png)

You'll move on to the create event page where need to fill out the data:

![calendar page](/doc-img/13-new-event-page.png)

## Title
The name of the event must be written into first text field:

![calendar page](/doc-img/14-title-field.png)

The length of name must be from 3 to 40 symbols and value can't consist illegal characters.

![calendar page](/doc-img/14.1-title-field-invalid.png)

## Day
For choose needed weekday for event choose the right variant from dropdown at the day field:

![calendar page](/doc-img/15-date-field.png)

## Time
For choose needed time for event choose the right variant from dropdown at the time field:

![calendar page](/doc-img/16-time-field.png)

## Participants
For choose a participants you need to click on the user from the list at right side:

![calendar page](/doc-img/17-participants-choosen.png)

When user chosen, his avatar and name add to participants field. You have multiple choise to add a several participants:

![calendar page](/doc-img/18-several-participants.png)

For removing some participant, you can click again to him in the users list or click to cross button which showed when cursor hovered to image across from participants field: 

![calendar page](/doc-img/19-participant-hover.png)

## Submit creating event
When you click submit button but not all data is filled in, you can see validation errors on the incorrect fields:

![calendar page](/doc-img/20-incorect-validation.png)

When event name field is filled worng you could seen validation notification below the input:

![calendar page](/doc-img/21-text-validation-failed.png)

If event on this date and time is already exist, you'll seen the error message at top of the page, which you can close clicking by the cross button:

![calendar page](/doc-img/22-booking-date-error.png)

If no errors detected, after submitting form you'll seen successful message and be redirected to calendar page with updated events:

![calendar page](/doc-img/23-new-event-created-alert.png)

## Cancel creating event

Clicking the cancel button just took you to the calendar page.
