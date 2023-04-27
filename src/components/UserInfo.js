export default class UserInfo {
    constructor(nameSection, jobSection) {
        this._nameSection = nameSection;
        this._jobSection = jobSection;
    }

    getUserInfo() {
        return {
            name: this._nameSection.textContent,
            job: this._jobSection.textContent,
        };
    }

    setUserInfo({ name, job }) {
        this._nameSection.textContent = name;
        this._jobSection.textContent = job;
    }
}
