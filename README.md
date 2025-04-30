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

### Authentications
- Login API
    - `/api/auth/login`
- Home API
    - `/api/auth/userHome`
- Registration API
    - `/api/auth/register`

### Chat Sessions
- Creating a new chat
    - `/api/chats/new-chat`
- Getting the chat index
    - `/api/chats/getChat`

### Asking the chatbot
- Getting the Chatbot answer
    - `/api/tusk/ask-pdf`