import React, {useCallback, useEffect, useState} from "react";
import CustomFetch from "../utils/CustomFetch";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import axios from "axios";

function Main() {
  const [gitName, setGitName] = useState('');
  const [name, setName] = useState('');
  const [hasCommitsToday, setHasCommitsToday] = useState(false);
  const getTodayCommit = useCallback(async (username) => {
    try {
      const gitKey = process.env.REACT_APP_GITHUB_TOKEN;
      const response = await axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        headers: {
          'Authorization': `Bearer ${gitKey}`,
        },
        data: {
          query: `
            query($username:String!) { 
              user(login:$username) { 
                contributionsCollection(from:"${new Date().toISOString()}") { 
                  contributionCalendar { 
                    totalContributions
                  } 
                }
              }
            }`,
          variables: {
            username,
          },
        },
      });

      const totalContributions = response.data.data.user.contributionsCollection.contributionCalendar.totalContributions;

      if (totalContributions > 0) {
        setHasCommitsToday(true);
      } else {
        setHasCommitsToday(false);
      }

    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await CustomFetch(`/user/api`);

        if (!response.ok) throw new Error(`서버에 문제가 발생했습니다. 상태 코드: ${response.status}`);

        const data = await response.json();

        setGitName(data.gitName);
        setName(data.username);
        // gitName 갱신 후 getTodayCommit 호출
        getTodayCommit(data.gitName);

      } catch (e) {
        console.error(e);
      }
    }

    getUserInfo();
  }, [getTodayCommit]);

  const renderContent = () => {
    if (gitName) {
      return (
              <>
                <br></br>
                {hasCommitsToday ? "✅오늘 커밋을 하셨군요!!" : "❎오늘 커밋이 안 되어 있습니다."}
                <h2>{gitName}님의 잔디🌱</h2>
                <img src={`https://ghchart.rshah.org/${gitName}`} alt={"잔디"}/>
                <br></br>
                <Link to={"/"}><Button variant={"contained"} color={"secondary"} size={"large"}
                >홈으로 가기</Button></Link>
              </>
      );
    } else if (name) {
      return (
              <div><p>깃허브 이름을 입력해주세요</p>

              </div>
      );
    } else {
      return (
              <div><p>사용자 정보를 읽어오는데 실패했습니다!</p>
                <Link to={"/"}><Button variant={"contained"} color={"secondary"} size={"large"}
                >홈으로 가기</Button></Link></div>);
    }
  }
  return <div>{renderContent()}</div>;

}

export default Main;