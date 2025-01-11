# Project Management API

This is a RESTful API designed for managing projects and tasks. It is built using Node.js, Express, and Sequelize ORM.

## Project Setup Instructions

1. **Clone Repo and Install Dependencies**

```bash
git clone https://github.com/Shubham-S-Nimje/OneGreenDiary-Assignment
cd OneGreenDiary-Assignment
npm install
```

2. **Environment Setup**
   Create a `.env` file in the root directory with the following:

```env
BASE_URL=""
PORT=
DB_HOST=""
DB_PORT=""
DB_PASSWORD=""
DB_NAME=""
DB_USERNAME=""
JWT_SECRET=""
```

3. **Database Setup**

```bash
# If using MySQL

Connect to the database by adding credentials in your .env file
```

4. **Start the Server**

```bash
npm run dev
```

## Database Schemas

### Models

1. **User Model**

```javascript
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
```

2. **Project Model**

```javascript
const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);
```

3. **Task Model**

```javascript
const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("TODO", "IN_PROGRESS", "DONE"),
      defaultValue: "TODO",
    },
  },
  {
    timestamps: true,
  }
);
```

## Database Relationships

### Relationships

1. **User-Project Relationship (Many-to-Many)**

```javascript
User.belongsToMany(Project, { through: "UserProjects" });
Project.belongsToMany(User, { through: "UserProjects" });
```

Details :

- A junction table named "UserProjects"
- Users can be associated with multiple projects
- Projects can have multiple users assigned

2. **Project-Task Relationship (One-to-Many)**

```javascript
Project.hasMany(Task);
Task.belongsTo(Project);
```

Details :

- Each project can have multiple tasks
- Each task belongs to exactly one project
- Adds projectId foreign key to the Tasks table

## API Routes

### Authentication Routes

```javascript
POST /api/register - Register new user
POST /api/login    - User login
GET  /api/logout   - User logout (requires authentication)
```

### Project Routes

```javascript
GET    /api/projects     - Get all projects
POST   /api/projects/new - Create new project
GET    /api/projects/:id - Get project by ID
PUT    /api/projects/:id - Update project
DELETE /api/projects/:id - Delete project
```

### Task Routes

```javascript
GET    /api/tasks            - Get all tasks
GET    /api/tasks/:projectId - Get tasks by project ID
POST   /api/tasks/:projectId - Create new task
PUT    /api/tasks/:taskId    - Update task
DELETE /api/tasks/:taskId    - Delete task
```

All project and task routes require authentication via JWT token.
