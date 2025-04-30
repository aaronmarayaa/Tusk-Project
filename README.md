# Workflow

- Hindi ko uupload sa github yung backend natin para hindi na iba-iba environment(iwas remote debugging). So basically, gagamit ako ng application para maging public yung hosting natin. Baka magkaroon lang tayo ng time kung kailan open yung hosting na’yon.
    >_Instead of using localhost:8080, gamitin niyo tong domain na to:_
    `https://stale-melodie-aaronmarayaa-f2e40747.koyeb.app`

- Everytime na kukuha tayo ng changes from master branch(sa github repository), git rebase gamitin natin(para hindi magulo git history natin), tas tsaka ko immerge sa main/master branch. 

- Para ma-rebase, git fetch gamitin niyo, huwag git pull, then i-rebase niyo sa working branch niyo. 
    >Ex. `git fetch` `git rebase <branch_name>`

- Huwag niyo directly i-edit yung main/master branch, create kayo ng branch niyo, and dun niyo ilagay mga changes na gagawin niyo.
Sa branching, gagamitin tayo ng simpleng naming convention(name-niyo/***feature-na-ginagawa-niyo***).
    >Ex. `git branch` ***`john/homepage`***

- Gamit din tayo ng message conventions sa git messages natin, make sure na descriptive and concise lalagay natin para madaling balikan yung history if ever may problem.
    - ***`feat:`*** kapag maglalagay lang ng panibagong feature sa api or UI.
        >Ex. feat: Add logout button in home page.
    - ***`ref:`*** kapag may binago sa code pero hindi nabago feature ng program 
        >Ex. ref: remove unused variables.
    - ***`style:`*** kapag maglalagay ng style or UI/UX related na design/changes.
        >Ex. style: change the background color.
    - ***`fix:`*** bago gamitin yung message convention na to, gagawa ulit kay ng branch, papangalanan niyo ng (name-niyo/bugfix/saang-part-yung-inaayos).
        >Ex. fix: configure the api fetching.
    - ***`docs:`*** kapag documentation lang uupload natin.
    - ***`add`***, kapag binubuo pa lang yung program pero gusto niyo na isave yung commit niyo.
        >Ex. add an input for username and password.

# API endpoints

### 🔐 **Authentications**
### Login API
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:** 
    - ```JSON
        {"username": "string", "password": "string"}
        ```
- **Response (Success):** 
    - **Status Code:** `200 OK`
    - ```nginx
        Login successful
        ```
- **Response (Failure):** 
    - **Status Code:** `401 Unauthorized`
    - ```nginx
        Invalid credentials
        ```

### Home API
- **URL:** `/api/auth/userHome`
- **Method:** `GET`
- **Authentication:** ***`Requires session cookie`***
- **Response (Success):**
    - **Status Code:** `200 OK`
    - ```JSON
        {"email": "email@example.com"}
        ```
- **Response (Unauthorized):**
    - **Status Code:** `401 Unauthorized`
    - ```JSON
        {"error": "Not logged in"}
        ```

### Registration
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Request Body**
    - ```JSON
        {"username": "string", "password": "string"}
        ```
- **Response (Success):**
    - **Status Code:** `200 OK`
    - ```JSON
        {"success": true, "message": "Registration successful!"}
        ```
- **Response (Unauthorized):**
    - **Status Code:** `400 Unauthorized`
    - ```JSON
        {"error": "User Already Exist!"}
        ```
    - **Status Code:** `400 Unauthorized`
    - ```JSON
        {"error": "Email must not be null or blank"}
        ```

---
### 💬 **Chat Sessions**
### Creating a new chat
- **URL:** `/api/chats/new-chat`
- **Method:** `GET`
- **Authentication:** ***`Requires session cookie`***
- **Response (Success):**
    - **Status Code:** `200 OK`
    - ```nginx
        New session created.
        ```
### Getting the chat index
- **URL:** `/api/chats/getChat`
- **Method:** `GET`
- **Authentication:** ***`Requires session cookie`***
- **Response (Success):** 
    - ```JSON
        [[...], [...]]
        ```
---
### 🤖 **Asking the chatbot**
### Getting the Chatbot answer
- **URL:** `/api/tusk/ask-pdf`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Authentication:** ***`Requires session cookie`***
- **Form Fields:**

    -   | **Field**     | **Type**    |  **Description**                 |
        | ------------  | ----------- | -------------------------------  | 
        | `file`        | file        | PDF file to upload               |
        | `question`    | String      | The question to ask the chatbot  |