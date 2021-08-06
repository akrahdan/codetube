export interface LocationState {
    query: Query
    pathname: string;
    params: Params
    payload: {

    }
    type: string
    
}

interface Query {
    alertMessage: string;
    alertType: string;
    currentQuestionIndex: string;
}

interface Params {
    pathSlug: string;
}