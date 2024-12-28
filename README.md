# Whatsapp Web Application

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
8. [Acknowledgments](#acknowledgments)


## Introduction

Introduction
Web WhatsApp Messenger is a web-based chat application inspired by WhatsApp, built using ReactJS for the frontend and InstantDB for the real-time database functionality. This application allows users to send and receive messages instantly, providing a seamless chat experience in a web browser. With a user-friendly interface and real-time message synchronization, users can engage in private conversations, making it a great tool for anyone looking to chat quickly and efficiently.

## Features
Instant Messaging: Messages are sent and received in real time without needing to refresh the page.
User Authentication: Secure login system using a simple authentication flow.
Message History: Chat history is stored and displayed for each user.
Responsive Design: Optimized for both desktop and mobile devices, ensuring a smooth experience on all screen sizes.
Simple Interface: Clean and minimalistic chat UI, similar to WhatsApp's design, making it easy for users to navigate and interact.
This project utilizes InstantDB, a powerful real-time database tool that ensures messages are stored and retrieved quickly, offering low-latency communication between users. By combining ReactJS with InstantDB, the application delivers a fast, efficient, and scalable messaging experience.

## Technologies Used

List the main technologies and libraries that were used in the project.

- **React** - JavaScript library for building user interfaces.
- **React Router** - For handling routing within the app.
- **CSS/Styled-Components** - For styling the components.
- **Axios/Fetch API** - For making HTTP requests.
- **LocalStorage/IndexedDB** - For persisting data locally.
- **S3 Bucket** - For saving the image which uplaod in chat.
- **Express js** - For uploading the image to s3.




## Installation

Follow these steps to get the development environment up and running:

1. Clone the repository:
   ```bash
   git clone https://github.com/divyaamate/27-dec-assignment.git
Navigate into the project directory: divya_project


      please follow for run local backend >>>>
      for start backend on local server for uploading images please follow these below steps:
      
        1. cd backend/
        2. npm install
        3. node server.js
        4. this will running your backend project on 5000 port.



       cd 27-dec-assignment/divya_project
       
Install dependencies:

       npm install
      
Start the development server:

      npm run dev
This will open the app in your browser at http://localhost:5173.


## Usage

1. Real-Time Chat
Send Messages: Simply type your message in the text input box at the bottom of the chat window and hit Enter or click the Send button. Your message will appear in the conversation immediately, and the recipient will receive it in real-time.
Receive Messages: Messages sent by other users will instantly appear in your chat window without needing to refresh the page, thanks to InstantDB's real-time messaging capabilities.
2. Uploading Images
Send Images: To upload an image, click the Attach button (usually represented by a paperclip or camera icon) next to the text input box. Select the image from your device, and it will be uploaded and sent as part of your message.
View Images: Click on any image in the chat to view it in full size. Images will be displayed inline within the chat window, making it easy to see shared media instantly.
3. Share Emojis
Send Emojis: To make your messages more expressive, you can add emojis! Click the Emoji button (typically a smiley face) next to the message input field. A list of emojis will appear, and you can click to insert one into your message. Once selected, the emoji will appear in the chat window.
React with Emojis: You can also react to messages with emojis by clicking the Emoji Reaction button next to any message and selecting your preferred emoji to express your feelings.
4. Forwarding Messages
Forward a Message: If you want to share a specific message with another contact, simply hover over the message you want to forward, click the Forward icon (usually represented by a right arrow), and select the recipient(s) from your contact list. The selected message will be forwarded to the new chat.
Multiple Recipients: You can forward messages to more than one recipient at a time, making it easy to share important information or media with multiple contacts.
5. Deleting Messages
Delete Your Messages: If you want to remove a message that you've sent, hover over the message and click the Delete icon (usually represented by a trash can). You will have the option to Delete for Me or Delete for Everyone.
Delete for Me: Removes the message from your chat window.
Delete for Everyone: Removes the message from both your and the recipient's chat window.
Message Deletion Notifications: If you delete a message for everyone, the recipient will be notified that the message was deleted.



## Acknowledgement

I would like to express my gratitude to the following resources and individuals who helped me in the development of this project:

React: A powerful JavaScript library used to build the user interface of this application. React made it easy to manage state and render components dynamically, allowing for smooth and efficient development.

InstantDB: A real-time, NoSQL database that powers the instant messaging and data synchronization features of the app. Its simplicity and scalability made it an ideal choice for building this real-time chat application.

Font Awesome: The icons used throughout the app, such as the message bubbles, paperclip, and emoji buttons, were provided by Font Awesome. Their extensive library of icons made it easy to build an intuitive and user-friendly interface.

Emoji Mart: Used for implementing the emoji picker in the application. This library provided an easy way to integrate a rich emoji set, enhancing the user experience.

Unsplash: For providing high-quality free images, which were used as placeholders during development and testing.

React Router: React Router was used for handling navigation and routing between different views within the app, ensuring a smooth single-page application experience.

Stack Overflow: The community-driven Q&A site that helped me solve numerous technical challenges during the development of this project. I relied heavily on Stack Overflow for solutions to various bugs and implementation issues.

GitHub: For hosting and version controlling the project code, and for providing a collaborative platform to track issues and progress.

Inspiration: This project was inspired by WhatsApp’s core features and design, aimed at creating a simple, real-time chat application that can be accessed easily in a web browser.

Thank you to all the contributors, libraries, and tools that made this project possible!

  



