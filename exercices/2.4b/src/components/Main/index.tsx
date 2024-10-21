import "./Main.css";
import Users from "./User/users";
import UserCard from "./User/user_card";

const Main = () => {
  const title = "List of Users";
  const users = [
    {
      //index: 1,
      name: "John Doe",
      age: 25,
      isOnline: true,
    },
    {
      //index: 2,
      name: "Jane Doe",
      age: 22,
      isOnline: false,
    },
    {
      //index: 3,
      name: "James Smith",
      age: 30,
      isOnline: true,
    },
    {
      //index: 4,
      name: "Judy Smith",
      age: 28,
      isOnline: false,
    },
  ];

  return (
    <main>
      <Users title={title}>
        {users.map((user, index) => (
          <UserCard
            key={index}
            user={user.name}
            age={user.age}
            isOnline={user.isOnline}
          />
        ))}
      </Users>
    </main>
  );
};

export default Main;
