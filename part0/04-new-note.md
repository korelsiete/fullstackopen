sequenceDiagram
    participant browser
    participant server

    Note right of browser: A value is entered in the entry and the save button is pressed

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note

    activate server

    Note left of server: The server formats the received note and adds it to the notes array.
    Note left of server: The server sends the response with HTTP status code 302 and the Location header indicates the new URL

    server-->>browser: Status Code: 302 FOUND - Location: /exampleapp/notes
    deactivate server

    Note right of browser: The browser understands the response and temporarily redirects to the location that was sent to it.
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes

    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css

    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js

    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server