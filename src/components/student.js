import React, {useState} from "react";
import axios from "axios";
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Delete } from "@material-ui/icons";
import { Icon } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem;
  max-width: 800px;
  margin: auto auto;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  @media (max-width: 800px) {
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
          color: #2F80ED;
          text-transform: uppercase;
          border-radius: 3px; 
          outline:none;
          cursor: pointer;
          display: relative;  
        }


        button.lg:last-child {
          margin-right: 0;
        }

        @media (max-width: 800px) {
          button.lg {
            display: none;
          }
        }
        @media (min-width: 801px) {
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
                    <IconButton onClick={()=>removeHelp(needHelp.class.class_id)}>
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
                  <CircularProgress color="secondary"/>
                </div>
              </div>
            ) : null
          )}
        </Body>
      </Card>
    </Container>
  );
}
