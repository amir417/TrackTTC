import { useEffect, useState } from "react";
import styled from 'styled-components';

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vw;
  margin: 20vh 0;
`;

const TitleLine1 = styled.div`
  text-decoration: solid;
  text-align: center;
  padding: min(1.5vw, 0.5rem);
  color: #fff;
  width: 2rem;
  height: 2rem;
  border-color: #fff;
  border-style: solid;
  border-radius: 100px;
  background-color: #E64A19;
`;

const Line = styled.p`
  vertical-align: center;
  font-size: min(3vw, 1rem);
  bottom: 10px;
  position: relative;
`;

const CustomTable = styled.table`
  display: flex;
  background: white;
  width: min(80vw, 50rem);
  border-radius: 20px;
  overflow-wrap: anywhere;
`;

const Table = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://alerts.ttc.ca/api/alerts/list', {
      method: "GET",
      crossDomain: true,
      // headers: {
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // },
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // const curData = data;
          setPosts(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <>
    <div>
    Total Number of alerts (accessibility & Routes) :     {posts.total} <br/>
    Last Updated:   {posts.lastUpdated}
  </div>
    <TableWrapper>
      {posts.routes?.map((post) => {
          return (

          <CustomTable id={post.id}>
              <thead>
                  <tr>
                      <td><TitleLine1><Line>{post.route}</Line></TitleLine1></td>
                  </tr>
              </thead>
              <tfoot>
                  <tr><td>{post.routeType}</td></tr>
                  <tr><td>{post.title}</td></tr>
                  <tr><td>active period (start): {post.activePeriod.start}</td></tr>
                  <tr><td>active period (end): {post.activePeriod.end}</td></tr>
              </tfoot>
          </CustomTable>);
      })}
    </TableWrapper>
    </>);
}

export default Table;