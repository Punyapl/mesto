export default class UserInfo {
    constructor(nameSection, jobSection, avatarSection) {
        this._nameSection = nameSection;
        this._jobSection = jobSection;
        this._avatarSection = avatarSection;
        this._avatarSection.alt = "Аватар";
        this._id = null;
    }

    getUserInfo() {
        return {
            name: this._nameSection.textContent,
            job: this._jobSection.textContent,
            id: this._id,
        };
    }

    setUserInfo(name, job) {
        this._nameSection.textContent = name;
        this._jobSection.textContent = job;
    }

    setAvatar(avatar) {
        this._avatarSection.src = avatar;
    }

    setId(id){
        this._id = id;
    }
}
