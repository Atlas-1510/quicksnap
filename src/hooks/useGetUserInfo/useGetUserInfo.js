import { useState, useEffect } from "react";
import getUserInfo from "../../utils/getUserInfo/getUserInfo";

function useGetUserInfo(id) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await getUserInfo(id);
      setUserInfo(user);
    })();
  }, [id]);

  return userInfo;
}

export default useGetUserInfo;
