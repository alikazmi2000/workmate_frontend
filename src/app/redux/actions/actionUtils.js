// import { userSignOut } from "./sessionExpired";
import _ from 'lodash'

const ROOT_URL = process.env.REACT_APP_ROOT_URL;
console.log(ROOT_URL);
// const history = useHistory();

export const DataRequestAction = (method, type, data, redirectUrl, showNotification = true, Loading = "LOADING") => {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        try {
            // resetState(dispatch);

            // if (type === 'userAuthentication' || type === 'userRegistration' || type === 'customerRegistration' || type === 'barberRegistration') RequestProgress(dispatch, `${Loading}_START`);
            return fetch(`${ROOT_URL}/${type}`, {
                method,
                headers: new Headers({
                    "Content-Type": "application/json",
                    'authorization': 'Bearer ' + token
                }),
                body: JSON.stringify(data)
            }).then((response) => {
                response.json().then((response) => {
                    RequestSuccess(dispatch, type, response, data);
                })

            }).catch((err) => {
                RequestFail(dispatch, type, "Request Fail", err);

                // if (type === 'userAuthentication' || type === 'userRegistration' || type === 'customerRegistration' || type === 'barberRegistration') RequestProgress(dispatch, `${Loading}_STOP`);
                // addNotification(dispatch, err, "error");
            })
        } catch (error) {
            RequestFail(dispatch, type, "Request Fail", error);
            // if (type === 'userAuthentication' || type === 'userRegistration' || type === 'customerRegistration' || type === 'barberRegistration') RequestProgress(dispatch, `${Loading}_STOP`);
            // addNotification(dispatch, error, "error");
        }
    };
};


export const DataGetAction = (type, data, query) => {
    return function (dispatch) {
        const token = localStorage.getItem('token');
        generateRequest(dispatch, type);
        let headers = {
            "Content-Type": "application/json",
            'authorization': token
        };
        // resetState(dispatch);

        try {
            // RequestProgress(dispatch,`${Loading}_START`);

            if (data !== "") {
                data = "/" + data;
            }

            return fetch(_.isEmpty(query) ? `${ROOT_URL}/${type}${data}` : `${ROOT_URL}/${type}${data}?${query}`, { headers })
                .then((response) => {
                    response.json().then((response) => {
                        if (response.status === "Error") {
                            console.log("error");
                            // userSignOut()
                        } else {
                            // RequestProgress(dispatch,`${Loading}_STOP`);
                            RequestSuccess(dispatch, type, response, data);
                        }
                    })
                }).catch(err => {
                    // RequestProgress(dispatch,`${Loading}_STOP`);
                    RequestFail(dispatch, type, "Request Fail outer", err);
                })
        } catch (error) {
            // RequestProgress(dispatch,`${Loading}_STOP`);
            RequestFail(dispatch, type, "Request Fail", error);
        }
    };
};


export const updateAllState = (type) => {
    return function (dispatch) {
        dispatch({
            type: `${type}_UPDATE`
        });
    }
}


export const restNotificationState = () => {
    return function (dispatch) {
        dispatch({
            type: `REST_NOTIFICATION`
        });
    }
}



function resetState(dispatch) {
    dispatch({
        type: 'RESET_STATE'
    });
}

// function addNotification(dispatch, message, level, redirectUrl = "") {
//     dispatch({
//         type: 'SHOW_NOTIFICATION',
//         message,
//         level,
//         redirectUrl
//     });
// }

function generateRequest(dispatch, type) {
    dispatch({
        type: `${type}`
    });
}


function RequestFail(dispatch, type, message, error) {
    dispatch({
        type: `${type}_FAILURE`,
        payload: message,
        error
    });
}

function RequestSuccess(dispatch, type, data, reqData) {
    dispatch({
        type: `${type}_SUCCESS`,
        payload: data,
        reqData,
        dispatch
    });
}

function RequestProgress(dispatch, type) {
    dispatch({
        type: `${type}`
    });
}

// export const RequestProgress = (type) => {
//     return function (dispatch) {
//         dispatch({
//             type: `${type}`,
//         });
//     }
// }


