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

[calendar page](/doc-img/1-calendar.png)

## Event card
The displayed data on the event card is event name and images list as participants.

| img 2

The hovered card view

| img 3

Over the hovered participan displayed his name

| img 4

## Remove event
Clicking by the cross button on the event card pops up the alert in witch you must confirm or cancel deleting event

| img 5

After confirm, event will delete. For close alert or cancel you need to click the appropriate button or click around of alert.

| img 6

After that you'll seen result of your actions.

## Move event
That would to change event day and time you can drag the card to another free cell. At the start of dragging you'll seen blue dashed border on the free cell or red filled already booked cells, on which you won't puted the dragging card.

| img 7
| img 8

After dropped the card to the new cell you'll see alert with confirmation of change event date and time.

| img 9

## Filter events
By the input with dropdown users list you can choose by which user the event cards will be filtered.

| img 10

After change value on the calendar will be left event cards of which contains chosen participant.

| img 11

## Create event
To start create event click the "New Event" button.
Page consist 3 inputs at the left side and a scrolling list of all users on the right side. **All fields are required.**
At the bottom there are "Cancel" and "Submit" buttons.

| img 12

You'll moved to create event page where need to fill out the data.

| img 13

## Title
The name of the event must be written into first text field.

| img 14

The length of name must be from 3 to 40 symbols and value can't consist illegal characters.

## Day
For choose needed weekday for event choose the right variant from dropdown at the day field.

| img 15

## Time
For choose needed time for event choose the right variant from dropdown at the time field.

| img 16

## Participants
For choose a participants you need to click on the user from the list at right side.

| img 17

When user chosen, his avatar and name add to participants field. You have multiple choise to add a several participants.

| img 18

For removing some participant, you can click again to him in the users list or click to cross button which showed when cursor hovered to image across from participants field. 

| img 19

## Submit creating event
When you click submit button but not all data is filled in, you can see validation errors on the incorrect fields.

| img 20

When event name field is filled worng you could seen validation notification below the input.

| img 21

If event on this date and time is already exist, you'll seen the error message at top of the page, which you can close clicking by the cross button.

| img 22

If no errors detected, after submitting form you'll seen successful message and be redirected to calendar page with updated events.

## Cancel creating event

Clicking the cancel button just took you to the calendar page.