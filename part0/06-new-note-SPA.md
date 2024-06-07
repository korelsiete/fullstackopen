sequenceDiagram
    participant browser
    participant server

    Note right of browser: A value is entered in the entry and the save button is pressed

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    activate server

    Note left of server: The server formats the received note and adds it to the notes array.
    Note left of server: The server sends a response message with the HTTP status code 201
    
    server-->>browser: Status Code: 201 CREATED - Response: {"message":"note created"}
    deactivate server
