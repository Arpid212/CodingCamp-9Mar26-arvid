# Requirements Document

## Introduction

The To-Do List Dashboard is a standalone web application that provides a productivity dashboard with time-based greeting, focus timer, task management, and quick links. The application runs entirely in the browser using vanilla JavaScript with no backend server, storing all data in browser Local Storage.

## Glossary

- **Dashboard**: The main web application interface
- **Local_Storage**: Browser Local Storage API for client-side data persistence
- **Focus_Timer**: A countdown timer component for time management
- **Task_List**: The to-do list component for managing tasks
- **Task**: A single to-do item with text content and completion status
- **Quick_Links**: A collection of user-defined website shortcuts
- **Greeting_Display**: The component showing time, date, and personalized greeting
- **Time_Period**: Morning (5:00-11:59), Afternoon (12:00-16:59), Evening (17:00-20:59), Night (21:00-4:59)

## Technical Constraints

- **TC-1**: HTML for structure, CSS for styling, Vanilla JavaScript only (no frameworks)
- **TC-2**: Browser Local Storage API for all data persistence, client-side only
- **TC-3**: Must work in Chrome, Firefox, Edge, and Safari (modern versions)

## Requirements

### Requirement 1: Display Current Time and Date

**User Story:** As a user, I want to see the current time and date so that I can stay aware of the time while working.

#### Acceptance Criteria

1. THE Greeting_Display SHALL display the current time in 12-hour format with AM/PM indicator
2. THE Greeting_Display SHALL display the current date including day of week, month, and day number
3. THE Greeting_Display SHALL update the time display every second

### Requirement 2: Display Time-Based Greeting

**User Story:** As a user, I want to see a greeting that changes based on the time of day so that the dashboard feels personalized.

#### Acceptance Criteria

1. WHEN the current time is between 5:00 AM and 11:59 AM, THE Greeting_Display SHALL display "Good Morning"
2. WHEN the current time is between 12:00 PM and 4:59 PM, THE Greeting_Display SHALL display "Good Afternoon"
3. WHEN the current time is between 5:00 PM and 8:59 PM, THE Greeting_Display SHALL display "Good Evening"
4. WHEN the current time is between 9:00 PM and 4:59 AM, THE Greeting_Display SHALL display "Good Night"

### Requirement 3: Focus Timer Operation

**User Story:** As a user, I want a 25-minute focus timer so that I can use the Pomodoro technique for productivity.

#### Acceptance Criteria

1. THE Focus_Timer SHALL initialize with a duration of 25 minutes
2. WHEN the start button is clicked, THE Focus_Timer SHALL begin counting down
3. WHEN the stop button is clicked, THE Focus_Timer SHALL pause the countdown
4. WHEN the reset button is clicked, THE Focus_Timer SHALL reset to 25 minutes
5. WHEN the countdown reaches zero, THE Focus_Timer SHALL display a completion indicator
6. THE Focus_Timer SHALL display remaining time in MM:SS format

### Requirement 4: Task Creation

**User Story:** As a user, I want to add new tasks to my to-do list so that I can track what I need to accomplish.

#### Acceptance Criteria

1. WHEN a user enters text and submits a new task, THE Task_List SHALL create a Task with the entered text
2. WHEN a new Task is created, THE Task_List SHALL save the Task to Local_Storage
3. WHEN a new Task is created, THE Task_List SHALL display the Task in the list
4. IF the user submits an empty task, THEN THE Task_List SHALL not create a Task

### Requirement 5: Task Editing

**User Story:** As a user, I want to edit existing tasks so that I can update task details as needed.

#### Acceptance Criteria

1. WHEN a user activates edit mode for a Task, THE Task_List SHALL display an editable text field with the current task text
2. WHEN a user saves edited task text, THE Task_List SHALL update the Task with the new text
3. WHEN a Task is edited, THE Task_List SHALL save the updated Task to Local_Storage

### Requirement 6: Task Completion

**User Story:** As a user, I want to mark tasks as done so that I can track my progress.

#### Acceptance Criteria

1. WHEN a user marks a Task as complete, THE Task_List SHALL update the Task completion status to true
2. WHEN a Task completion status changes, THE Task_List SHALL save the updated Task to Local_Storage
3. WHEN a Task is marked complete, THE Task_List SHALL display visual indication of completion
4. WHEN a user marks a completed Task as incomplete, THE Task_List SHALL update the Task completion status to false

### Requirement 7: Task Deletion

**User Story:** As a user, I want to delete tasks so that I can remove tasks I no longer need.

#### Acceptance Criteria

1. WHEN a user deletes a Task, THE Task_List SHALL remove the Task from the list
2. WHEN a Task is deleted, THE Task_List SHALL remove the Task from Local_Storage
3. WHEN a Task is deleted, THE Task_List SHALL remove the Task from the display

### Requirement 8: Task Persistence

**User Story:** As a user, I want my tasks to be saved automatically so that I don't lose my work when I close the browser.

#### Acceptance Criteria

1. WHEN the Dashboard loads, THE Task_List SHALL retrieve all saved Tasks from Local_Storage
2. WHEN the Dashboard loads, THE Task_List SHALL display all retrieved Tasks
3. FOR ALL Task operations, THE Task_List SHALL persist changes to Local_Storage immediately

### Requirement 9: Quick Links Management

**User Story:** As a user, I want to save and access quick links to my favorite websites so that I can navigate quickly.

#### Acceptance Criteria

1. WHEN a user adds a quick link with a URL, THE Quick_Links SHALL save the link to Local_Storage
2. WHEN a user clicks a quick link, THE Quick_Links SHALL open the URL in a new browser tab
3. WHEN the Dashboard loads, THE Quick_Links SHALL retrieve and display all saved links
4. WHEN a user deletes a quick link, THE Quick_Links SHALL remove the link from Local_Storage

### Requirement 10: Code Organization

**User Story:** As a developer, I want organized code files so that the project is easy to maintain.

#### Acceptance Criteria

1. THE Dashboard SHALL contain exactly one CSS file in a `css/` directory
2. THE Dashboard SHALL contain exactly one JavaScript file in a `js/` directory
3. THE Dashboard SHALL contain an HTML entry file in the root directory

## Optional Requirements (3 of 5 chosen)

### Optional Requirement 1: Light/Dark Mode Toggle

#### Acceptance Criteria

1. THE Dashboard SHALL provide a toggle control for switching between light and dark themes
2. WHEN a user selects a theme, THE Dashboard SHALL apply it to all interface elements
3. WHEN a user selects a theme, THE Dashboard SHALL save the preference to Local_Storage
4. WHEN the Dashboard loads, THE Dashboard SHALL apply the saved theme preference

### Optional Requirement 2: Custom Name in Greeting

#### Acceptance Criteria

1. THE Greeting_Display SHALL allow users to set a custom name
2. WHEN a custom name is set, THE Greeting_Display SHALL include the name in the greeting message
3. WHEN a custom name is set, THE Dashboard SHALL save the name to Local_Storage
4. WHEN the Dashboard loads, THE Greeting_Display SHALL display the saved custom name

### Optional Requirement 3: Prevent Duplicate Tasks

#### Acceptance Criteria

1. WHEN a user attempts to create a Task with text identical to an existing Task, THE Task_List SHALL not create the duplicate
2. WHEN a duplicate is prevented, THE Task_List SHALL display a notification to the user
3. THE Task_List SHALL perform case-insensitive comparison for duplicate detection
