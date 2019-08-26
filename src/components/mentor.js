import React from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  div.container {
    border: 1px dotted blue;
    display: flex;
    justify-content: space-around;
    height: 100%;
    padding: 50px 280px;
  }
`;

const Card = styled.div`
  width: calc(100% / 2 - 100px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  min-height: 100%;
  border-radius: 10px;

  .head {
    background: #56CCF2;
    background: -webkit-linear-gradient(to right, #2F80ED, #56CCF2); 
    background: linear-gradient(to right, #2F80ED, #56CCF2);
    color: white;
    text-align: center;
    padding: 10px;
    border-radius: 9px 9px 0 0;
  }

  .body {
      padding 8px;

      div {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        position: relative;

          img {
              border-radius: 100px
              height: 60px;
              width: 60px;
              margin-right: 8px;
          }

          div {
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;

            button {
                padding: 8px
                margin: 3px 3px 3px 0px;
                color: white;
                background: #2F80ED;
                border: none;
                text-transform: uppercase;
                border-radius: 3px;
            }

            button:last-child {
                margin-right: 0;
            }
          }
          
      }
  }
`;

const style = {
  body: {
    minHeight: "200px"
  },
  head: {
    backgroundColor: "green",
    color: "white",
    textAlign: "center",
    padding: "10px"
  }
};

export default function Mentor({ queueData, user }) {
  const removeHelp = (id) => {
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

  return (
    <Container>
      <div className="container">
        <Card>
          <div className="head">Need Helped</div>
          <div className="body">
            {queueData.map(needHelp =>
              needHelp.status === "need help" ? (
                <div key={needHelp.user.googleId}>
                  <img src={needHelp.user.imageUrl} alt={needHelp.user.name} />
                  <p>{needHelp.user.name}</p>
                  <div>
                    <button onClick={() => removeHelp(needHelp.user.googleId)}>remove</button>
                    <button
                      onClick={() =>
                        updateHelp("being helped", needHelp.user.googleId)
                      }
                    >
                      help
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </Card>

        <Card>
          <div className="head">Being Helped</div>
          <div className="body">
            {queueData.map(beingHelped =>
              beingHelped.status === "being helped" ? (
                <div key={beingHelped.user.googleId}>
                  <img src={beingHelped.user.imageUrl} alt={beingHelped.user.name} />
                  <p>{beingHelped.user.name}</p>
                  <div>
                    <button
                      onClick={() =>
                        updateHelp("need help", beingHelped.user.googleId)
                      }
                    >
                      back to queue
                    </button>
                    <button onClick={() => removeHelp(beingHelped.user.googleId)}>done</button>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </Card>
      </div>
    </Container>
  );
}
