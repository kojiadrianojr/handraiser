import React from "react";
import axios from "axios";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import { MoreVert } from "@material-ui/icons";
import MUIContainer from "@material-ui/core/Container";
import {toast} from 'react-toastify'
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 2rem 0;
  margin: auto auto;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  @media (max-width: 1000px) {
    width: 100%;
    margin-bottom: 1rem;
  }

  width: calc(100% / 2 - 50px);
  border: 1px solid #7e57c2;
  min-height: 100%;
  border-radius: 11px;
`;

const Head = styled.div`
  background: #7e57c2;
  color: white;
  text-align: center;
  padding: 16px;
  border-radius: 9px 9px 0 0;
`;
const Body = styled.div`
  padding 1rem;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    position: relative;

      img {
        border-radius: 100px;
        height: 60px;
        width: 60px;
        margin-right: 8px;
      }

      div {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;

        button.lg {
          padding: 0.8rem;
          margin: 3px 3px 3px 0px;
          color: white;
          background: #37b74a;
          border: none;
          text-transform: uppercase;
          border-radius: 3px;   
        }

        button.sm {
          padding: 0.8rem;
          margin: 3px 3px 3px 0px;
          background: inherit;
          border: none;
          text-transform: uppercase;
          border-radius: 3px; 
          outline:none;
          cursor: pointer;
          display: relative;  
        }
        
        .dropdown:hover .drop-menu{
          display: block;
        }

        .drop-menu {
          display: none;
          z-index: 1;
          border-radius:3px;
          background: white;
          box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
          position: absolute;
          right: 0;
          top: 30px;
          padding: 0;
          min-width: 100px;
          text-align: center;
          li {
            list-style: none;
            padding: 12px;
            text-transform: uppercase;
          }
          li:hover {
            background: #37b74a;
            color: white;
            cursor:pointer;
          }
        }

        button.lg:last-child {
          margin-right: 0;
        }

        @media (max-width: 1000px) {
          button.lg {
            display: none;
          }
        }
        @media (min-width: 1001px) {
          button.sm {
            display: none;
          }
        }
      }
      
  }
`;

const Notify = ({data}) =>{
  console.log(data)
}

export default function Mentor({ queueData }) {
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  
  const [count, setCount] = React.useState(0)
  const [names, addNames] = React.useState([])
  console.log(names)

  // React.useEffect(() => {
  //   queueData.map(data => {
  //     data.status === 'need help' && addNames([...names, data.user.name])
  //   })

  // }, addNames)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const removeHelp = (id, class_id) => {
    const body = {
      query: `
        mutation {
          delete_queue(where: {user_id: {_eq: "${id}"}, class_id: {_eq: "${class_id}"}}) {
            returning {
              user_id
            }
          }
        }              
      `
    };
    const options = {
      headers: {
        "x-hasura-admin-secret": process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET
      }
    };
    axios.post(
      "https://hasura-gatsby-demo.herokuapp.com/v1/graphql",
      body,
      options
    );
  };
  var list = [];

  const updateHelp = (status, id, class_id) => {
    const body = {
      query: `
            mutation {
                update_queue(where: {user_id: {_eq: "${id}"}, class_id: {_eq: "${class_id}"}}, _set: {status: "${status}"}) {
                  returning {
                    status
                  }
                }
              }
            `
    };
    const options = {
      headers: {
        "x-hasura-admin-secret": process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET
      }
    };
    axios.post(
      "https://hasura-gatsby-demo.herokuapp.com/v1/graphql",
      body,
      options
    );
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
    
  const notify = (data) => {
    var latest;
    list.push(data.user.name)
      latest = list[list.length-1]
  }
  return (
    <MUIContainer maxWidth="lg">
      <Container>
        <Card>
          <Head>Need Helped</Head>
          <Body>
            {queueData.map(needHelp =>
              needHelp.status === "need help" && (
                <div key={needHelp.user.googleId}>
                  {notify(needHelp)}
                  <div style={{display: 'none'}}>
                  </div>
                  <img src={needHelp.user.imageUrl} alt={needHelp.user.name} />
                  <p>{needHelp.user.name}</p>
                  <div>
                    <button
                      className="lg"
                      onClick={() =>
                        removeHelp(
                          needHelp.user.googleId,
                          needHelp.class.class_id
                        )
                      }
                    >
                      remove
                    </button>
                    <button
                      className="lg"
                      onClick={() =>
                        updateHelp(
                          "being helped",
                          needHelp.user.googleId,
                          needHelp.class.class_id
                        )
                      }
                    >
                      help
                    </button>
                    <div className="dropdown">
                      <button className="sm drop-btn">
                        <MoreVert style={{ color: "#7e57c2" }} />
                      </button>
                      <ul className="drop-menu">
                        <li
                          onClick={() =>
                            updateHelp(
                              "being helped",
                              needHelp.user.googleId,
                              needHelp.class.class_id
                            )
                          }
                        >
                          help
                        </li>
                        <li
                          onClick={() =>
                            removeHelp(
                              needHelp.user.googleId,
                              needHelp.class.class_id
                            )
                          }
                        >
                          remove
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            )}
          </Body>
        </Card>

        <Card>
          <Head>Being Helped</Head>
          <Body>
            {queueData.map(beingHelped =>
              beingHelped.status === "being helped" ? (
                <div key={beingHelped.user.googleId}>
                  <img
                    src={beingHelped.user.imageUrl}
                    alt={beingHelped.user.name}
                  />
                  <p>{beingHelped.user.name}</p>

                  <div>
                    <button
                      className="lg"
                      onClick={() =>
                        updateHelp(
                          "need help",
                          beingHelped.user.googleId,
                          beingHelped.class.class_id
                        )
                      }
                    >
                      back to queue
                    </button>
                    <button
                      className="lg"
                      onClick={() =>
                        removeHelp(
                          beingHelped.user.googleId,
                          beingHelped.class.class_id
                        )
                      }
                    >
                      done
                    </button>
                    <div className="dropdown">
                      <button className="sm drop-btn">
                        <MoreVert style={{ color: "#7e57c2" }} />
                      </button>
                      <ul className="drop-menu">
                        <li
                          onClick={() =>
                            updateHelp(
                              "need help",
                              beingHelped.user.googleId,
                              beingHelped.class.class_id
                            )
                          }
                        >
                          back to queue
                        </li>
                        <li
                          onClick={() =>
                            removeHelp(
                              beingHelped.user.googleId,
                              beingHelped.class.class_id
                            )
                          }
                        >
                          done
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </Body>
        </Card>
      </Container>
    </MUIContainer>
  );
}
