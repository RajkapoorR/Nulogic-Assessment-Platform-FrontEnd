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
        return parsedResponse;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    return parsedResponse;
}