import React from "react";
import axios from "axios";
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import { MoreVert } from "@material-ui/icons";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem;
  margin: auto auto;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  @media (max-width: 1000px) {
    width: 100%;
    margin-bottom: 24px;
  }

  width: calc(100% / 2 - 50px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  min-height: 100%;
  border-radius: 10px;
`;

const Head = styled.div`
  background: #56ccf2;
  background: -webkit-linear-gradient(to right, #2f80ed, #56ccf2);
  background: linear-gradient(to right, #2f80ed, #56ccf2);
  color: white;
  text-align: center;
  padding: 10px;
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
          padding: 14px;
          margin: 3px 3px 3px 0px;
          color: white;
          background: #2F80ED;
          border: none;
          text-transform: uppercase;
          border-radius: 3px;   
        }

        button.sm {
          padding: 14px;
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
            background: #2F80ED;
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

export default function Mentor({ queueData, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const removeHelp = id => {
    const body = {
      query: `
        mutation {
          delete_queue(where: {user_id: {_eq: "${id}"}}) {
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

  const updateHelp = (status, id) => {
    const body = {
      query: `
            mutation {
                update_queue(where: {user_id: {_eq: "${id}"}}, _set: {status: "${status}"}) {
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

  return (
    <Container>
      <Card>
        <Head>Need Helped</Head>
        <Body>
          {queueData.map(needHelp =>
            needHelp.status === "need help" ? (
              <div key={needHelp.user.googleId}>
                <img src={needHelp.user.imageUrl} alt={needHelp.user.name} />
                <p>{needHelp.user.name}</p>
                <div>
                  {/* <button
                    className="lg"
                    onClick={() => removeHelp(needHelp.user.googleId)}
                  >
                    remove
                  </button>
                  <button
                    className="lg"
                    onClick={() =>
                      updateHelp("being helped", needHelp.user.googleId)
                    }
                  >
                    help
                  </button> */}
                  <IconButton onClick={handleClick}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => handleClose()}
                  >
                    <MenuItem onClick={() =>{
                          updateHelp("being helped", needHelp.user.googleId);
                          handleClose();
                        }}>
                      Help
                    </MenuItem>
                    <MenuItem onClick={() => {
                      removeHelp(needHelp.user.googleId);
                      handleClose();
                      }}>
                      Remove
                    </MenuItem>
                  </Menu>
                  {/* <div className="dropdown">
                    <button className="sm drop-btn">
                      <MoreVert />
                    </button>
                    <ul className="drop-menu">
                      <li
                        onClick={() =>
                          updateHelp("being helped", needHelp.user.googleId)
                        }
                      >
                        help
                      </li>
                      <li onClick={() => removeHelp(needHelp.user.googleId)}>
                        remove
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            ) : null
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
                  {/* <button
                    className="lg"
                    onClick={() =>{
                      updateHelp("need help", beingHelped.user.googleId);
                      handleClose();
                    }}
                  >
                    back to queue
                  </button>
                  <button
                    className="lg"
                    onClick={() => {
                      removeHelp(beingHelped.user.googleId);
                      handleClose();
                    }}
                  >
                    done
                  </button> */}
                  <IconButton onClick={handleClick}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => handleClose()}
                  >
                    <MenuItem
                      onClick={() =>{
                        updateHelp("need help", beingHelped.user.googleId);
                        handleClose();
                      }}
                    >
                      Back to queue
                    </MenuItem>
                    <MenuItem onClick={() => {
                      removeHelp(beingHelped.user.googleId)
                      handleClose();
                      }}>
                      Done
                    </MenuItem>
                  </Menu>
                  {/* <div className="dropdown">
                    <button className="sm drop-btn">
                      <MoreVert />
                    </button>
                    <ul className="drop-menu">
                      <li
                        onClick={() =>
                          updateHelp("need help", beingHelped.user.googleId)
                        }
                      >
                        back to queue
                      </li>
                      <li onClick={() => removeHelp(beingHelped.user.googleId)}>
                        done
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            ) : null
          )}
        </Body>
      </Card>
    </Container>
  );
}
