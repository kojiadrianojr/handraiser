import React, {useState} from "react";
import axios from "axios";
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Delete } from "@material-ui/icons";
<<<<<<< HEAD
import { Icon } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
=======
import MUIContainer from "@material-ui/core/Container";
>>>>>>> 033c75e457660494f13c442f3095a250addd1d33

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

export default function Student({ queueData, user }) {
  const [isEmpty, setEmpty] = useState(true)
  var c = 0;
  React.useEffect(() => {
    queueData.map(data => {
      if (!data.status === "need help"){
        return c = 0;
      }
    })
    queueData.map(data => {
      if (data.status === "need help"){
        c++;
      }
    })
     c !== 0? setEmpty(false) : setEmpty(true)
  })

  const removeHelp = class_id => {
    const body = {
      query: `
            mutation {
                delete_queue(where: {user_id: {_eq: "${user.googleId}"}, class_id: {_eq: "${class_id}"}}) {
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
  return (
<<<<<<< HEAD
    <Container>
      <Card>
        <Head>Need Help</Head>
        <Body>
          {!isEmpty? (queueData.map(needHelp =>
            needHelp.status === "need help" ? (
              <div key={needHelp.user.googleId}>
                <img src={needHelp.user.imageUrl} alt={needHelp.user.name} />
                <p>{needHelp.user.name}</p>
                <div>
                  {needHelp.user.googleId === user.googleId && (
                    <button className="lg" onClick={()=>removeHelp(needHelp.class.class_id)}>
                      remove
                    </button>
                  )}

                  {needHelp.user.googleId === user.googleId && (
                    <IconButton onClick={removeHelp}>
                      <Delete />
                    </IconButton>
                  )}
                </div>
              </div>
            ) : null
          )) : <p>Empty</p>}
        </Body>
      </Card>

      <Card>
        <Head style={style.head}>Being Helped</Head>
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
                  <CircularProgress />
                </div>
              </div>
            ) : null
          )}
        </Body>
      </Card>
    </Container>
=======
    <MUIContainer maxWidth="lg">
      <Container>
        <Card>
          <Head>Need Help</Head>
          <Body>
            {!isEmpty? (queueData.map(needHelp =>
              needHelp.status === "need help" ? (
                <div key={needHelp.user.googleId}>
                  <img src={needHelp.user.imageUrl} alt={needHelp.user.name} />
                  <p>{needHelp.user.name}</p>
                  <div>
                    {needHelp.user.googleId === user.googleId && (
                      <button className="lg" onClick={()=>removeHelp(needHelp.class.class_id)}>
                        remove
                      </button>
                    )}

                    {needHelp.user.googleId === user.googleId && (
                      <button className="sm" onClick={()=>removeHelp(needHelp.class.class_id)}>
                        <Delete style={{color: '#7e57c2'}}/>
                      </button>
                    )}
                  </div>
                </div>
              ) : null
            )) : <p>Empty</p>}
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
                </div>
              ) : null
            )}
          </Body>
        </Card>
      </Container>
    </MUIContainer>
>>>>>>> 033c75e457660494f13c442f3095a250addd1d33
  );
}
