# Campus-Event-Hub
## User Stories 👩‍💻 
## Admin
* As an Admin, I want to approve events, so that I can ensure they are official campus events

* As an Admin, I want to upload events, so that students can find different events to attend

* As an Admin, I want to add/delete user accounts, so that I can maintain active users

* As an Admin, I want to add/delete events, so that only active events are visible

* As an Admin, I want to edit event dates and information, so that events  have the latest information available

* As an Admin, I want to be able to see how many students are interested/saved the event, so that we can track popular event types

## Students
* As a student, I want to search by type of event, so that I can attend the events base upon my interests

* As a Student, I want to view events on campus, so that I can meet other students

* As a student, I want to know information about the event, so that I can decide to go to the event

* As a student, I want to save events, so that I can easily access the event information and I don't miss out.

* As a student, I want to create an account, so that I can view future events I save

* As a student, I want to share an event, so that I can bring my friend to the event

* As a student, I want to submit events, so that I can share events to other students

* As a student, I want to edit and delete an event I submit, so that the event can have the latest information

## Figma 🎨
https://www.figma.com/file/P8tmvTYt1H0Et5hkN3kiQK/My-Student-Wellbeing---Campus-Event-Hub?type=design&node-id=0-1&mode=design&t=4r2yyeJO134k1NVd-0

## Database Diagram 💿
https://drive.google.com/file/d/1W7SFcBgQLPi31u1PaKrLVHIoLa1PwnIf/view

## Entity Relationship Model

### Entities:

- User
- Events
- Event_Interests

### Relationship:

- A user may save 0 or more events. Events can be saved by 0 or more users.
- Institution may have 0 or many event; An event belongs to one and only one university.

### Relational Model

- User (user_id (pk), email, password, created_at, updated_at, deleted_at, is_admin)
- Events (event_id (pk), name, type, date, start_time, end_time, name_of_venue, address, city, postal_code, description, short_description, event_format, virtual_link , image, contact_name, contact_email, contact_phone, name_of_org, name_of_inst, price, created_at, updated_at, is_approved, user_id(fk))
- Event_Interests (event_interests_id, created_at, updated_at, user_id (fk), event_id (fk))
