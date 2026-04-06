# Kanban Board App

A modern Kanban board application built with React, TypeScript, Zustand, and Drag & Drop functionality using dnd-kit.

---

##  Features

*  Add new tasks
*  Edit existing tasks (modal popup)
*  Delete tasks with confirmation
*  Search tasks by title or description
*  Drag & Drop tasks between columns
*  Columns:
  * Backlog
  * In Progress
  * Review
  * Done
*  Infinite scroll inside each column
*  Toast notifications for actions
*  Optimized state management using Zustand

## Tech Stack

* **Frontend:** React + TypeScript
* **State Management:** Zustand
* **Drag & Drop:** dnd-kit
* **Styling:** Bootstrap
* **API:** JSON Server (REST API)

##  Project Structure

src/
│── components/
│   ├── board/
│   │   └── Column.tsx
│   ├── TaskCard.tsx
│   ├── AddTask.tsx
│   ├── Toast.tsx
│
│── store/
│   └── useTaskStore.ts
│
│── types/
│   └── task.ts
│
│── api/
│   └── tasks.ts
│
│── App.tsx


## Installation

npm install

## Run the App

npm run dev

##  Run JSON Server

npx json-server --watch db.json --port 3000

## Key Concepts Used

* Drag & Drop with dnd-kit
* Global state with Zustand
* Component-based architecture
* Controlled forms (Add / Edit)
* Infinite scrolling using Intersection Observer
* API integration (CRUD operations)

---

##  Challenges & Solutions

###  Drag blocking button clicks

 Solved by using drag handle instead of full card

###  Empty cards during drag

 Fixed by ensuring full task object is updated

###  TypeScript issues with column

 Solved using union types and type casting

###  Infinite scroll breaking updates

 Fixed by resetting visible count on state change
 
##  Future Improvements

*  Reorder tasks inside same column
*  Better UI/UX animations
*  Authentication system
*  responsiveness improvements


##  Author

Ahmed Fathy
Frontend Developer


## ⭐ Give it a star if you like it!
