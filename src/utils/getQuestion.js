export const getQuestion = async (domain, level, code) => {
    let parsedResponse;
    try {
        const response = await fetch(`http://localhost:8000/rest/v1/assessment/questions?domain=${domain}&questionCode=${code}&difficultyLevel=${level}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        const body = await response.text()
        parsedResponse = JSON.parse(body);
        if(parsedResponse?.success===false){
            alert(parsedResponse?.errors)
        }
        return parsedResponse;
    } catch (error) {
        throw(error) 
    }
    return parsedResponse;
}