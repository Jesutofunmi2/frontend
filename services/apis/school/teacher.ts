import makeApiCall from ".."

export async function getTeachers(school_id: any) {
    const response = await makeApiCall(`/api/v1/teachers?school_id=${school_id}`, 'get')
     return response.data
   } 