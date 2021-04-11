import { useEffect, useState } from "react";

const UserProfile = (props) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userName } = props;

  useEffect(() => {
    setIsLoading(true);
    fetch("https://simple-1db1e-default-rtdb.firebaseio.com/users.json")
      .then((jsonData) => jsonData.json())
      .then((data) => {
        const transformedData = [];
        for (let key in data) {
          transformedData.push({
            id: key,
            name: data[key].name,
            volume: data[key].volume,
          });
        }
        setUserData(transformedData);
        setIsLoading(false);
      });
  }, []);

  if (!userData) {
    return <p> Loading... </p>;
  }

  if (isLoading) {
    return <p> Loading..... </p>;
  }

  return (
    <div>
      <h1> {userName} </h1>
      {userData.map((data) => {
        return (
          <p key={data.id}>
            {data.name} - {data.volume}
          </p>
        );
      })}
    </div>
  );
};

export default UserProfile;

export const getServerSideProps = async () => {
  return {
    props: {
      userName: "Thilina",
    },
  };
};
