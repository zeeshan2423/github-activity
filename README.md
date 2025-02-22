# **GitHub User Activity CLI** 🚀

A simple **command-line tool** built with **Node.js** to fetch and display recent GitHub user activity. This CLI tool interacts with the **GitHub API** to retrieve actions like commits, issues, stars, and pull requests.

🔗 **Project URL:** [GitHub User Activity on Roadmap.sh](https://roadmap.sh/projects/github-user-activity)

---

## **Features** ✨

✅ Fetch recent GitHub activity of any user\
✅ Displays push events, issue activities, stars, and pull requests\
✅ Uses only built-in **Node.js** modules (no external dependencies)\
✅ Handles errors gracefully (invalid username, API failures, rate limits)\
✅ Simple and lightweight CLI tool

---

## **Installation** 🛠️

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/zeeshan2423/github-activity.git
cd github-activity-cli
```

### **2️⃣ Install Node.js (if not installed)**

Download and install **Node.js** from [nodejs.org](https://nodejs.org/).

### **3️⃣ Run the CLI tool**

You can run the tool without installing it globally:

```sh
node index.js <GitHub-username>
```

Alternatively, you can link it globally for easier access:

```sh
npm link
```

Now you can run:

```sh
github-activity <GitHub-username>
```

---

## **Usage** 📌

### **Fetch Recent GitHub Activity**

```sh
github-activity nodejs
```

📌 **Example Output:**

```sh
Pushed 1 commits to nodejs/jenkins-alerts
Starred nodejs/node
Closed an issue in nodejs/node-gyp
Pushed 1 commits to nodejs/snap
Pushed 1 commits to nodejs/jenkins-alerts
Starred nodejs/node
Forked nodejs/node
Starred nodejs/undici
Pushed 1 commits to nodejs/jenkins-alerts
Opened a pull request in nodejs/node
Pushed 1 commits to nodejs/jenkins-alerts
Pushed 1 commits to nodejs/jenkins-alerts
Starred nodejs/node-v0.x-archive
Starred nodejs/node
Opened a new issue in nodejs/node
Starred nodejs/node
Pushed 1 commits to nodejs/jenkins-alerts
```

---

## **Error Handling** ⚠️

- If the username does not exist: `User '<username>' not found.`
- If the API rate limit is exceeded: `API rate limit exceeded. Please try again later.`
- If GitHub API is unreachable: `API request failed.`

---

## **Testing** 🧪

This project includes test cases using **node:test** to verify functionality.

### **Run Tests**

```sh
npm test
```

### **Example Test Case Output:**

```sh
✔ Format PushEvent correctly
✔ Format IssuesEvent opened action
✔ Format WatchEvent correctly
✔ Return null for unknown event type
ℹ tests 4
ℹ suites 0
ℹ pass 4
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms
```

---

## **Uninstalling the CLI** ❌

To remove the CLI tool:

```sh
npm unlink
```

---

## **Contributing** 🤝

Feel free to fork this project, improve it, and submit a **pull request**.

---

## **License** 📜

This project is licensed under the **MIT License**.

---

## **Author** ✨

👨‍💻 Developed by **Mohammad Zeeshan Khan**\
📧 Contact: [zeeshan2423@gmail.com](mailto:zeeshan2423@gmail.com)
