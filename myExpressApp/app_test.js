import React, { useState, useEffect } from "react";
//import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import Button from "react-bootstrap/Button";
import { ProfileData } from "./ProfileData";
import { callMsGraph } from "../../graph";
import { SignOutButton } from "./SignOutButton";
import { APIgroup } from "./APIgroup";

 

 

export function ProfileContent() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    //const [APIcall, setAPIcall] = useState(toString(APIgroup()));

 


    const name = accounts[0] && accounts[0].name;

 


    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

 

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }
    console.log(accounts)

 

    const userGroup = APIgroup();
    const [visitANSList, setVisitANSList] = React.useState([]);
    const fetchPost = () => {
        fetch(userGroup)
            .then((res) => {
                //const responseClone = res.clone();
                return res.json()
            })
            .then((res) => {
                console.log(res, "success")
                setVisitANSList(res)
            })
    }

 

    // function GroupsGrab() {
    //     //const { instance, accounts } = useMsal();

 

    //     var arr = accounts[0].idTokenClaims.groups
    //     var dat = "e741a0d6-2248-4dbe-98c0-b7ad53324fb9"

 

    //     //FOR LOOP THAT ITERATES THROUGH ACCOUNT GROUPS
    //     for (var i = 0; i < arr.length; i++) {
    //         if (arr[i] == dat) {

 

    //             fetchPost()
    //             return console.log("success");

 

    //         }
    //     }

 


    // }
    React.useEffect(() => {
        //GroupsGrab()
        //userGroup = APIgroup()
        fetchPost()
    }, [])

 

 

    // return (
    //     <>

 


    //         {/* <h5 className="card-title">Welcome {name}</h5>

 

    //         {graphData ? 
    //             <ProfileData graphData={graphData} />
    //             :
    //             <SignOutButton />
    //         } */}

 

    //     </>
    // );

 


};

 

export function ProfileName() {
    const { instance, accounts } = useMsal();
    //const [graphData, setGraphData] = useState(null);

 

    const name = accounts[0] && accounts[0].name;
    var names = name.split(/\s+/);

 

    // Replaces the first name with an initial, followed by a period.
    names[0] = names[0].substring(0, 1);
    names[1] = names[1].substring(0, 1);

 

    // Glue the pieces back together.
    var name_abbr = names.join('');

 

    return (
<>
            {name_abbr}
</>
    )

 


};

 


//MAKE FETCH BOOL TO CONNECT TO

 

// for (let i = 0; i < 5; i++) {
//     text += "The number is " + i + "<br>";
//   }
